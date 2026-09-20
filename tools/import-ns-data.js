'use strict';
const fs=require('fs');const path=require('path');const input=process.argv[2];
if(!input){console.error('用法: npm run ns:import -- <history.json>');process.exit(1)}
const inputPath=path.resolve(input),outputPath=path.resolve(__dirname,'..','source','ns','data.json');
const raw=JSON.parse(fs.readFileSync(inputPath,'utf8'));const histories=raw.playHistories||raw.play_histories||raw.games;
if(!Array.isArray(histories)){console.error('无法识别该文件：未找到 playHistories 数组。');process.exit(1)}
const games=histories.map(game=>({id:String(game.titleId||game.title_id||''),name:String(game.titleName||game.title_name||game.name||'未知游戏'),image:String(game.imageUrl||game.image_url||''),minutes:Math.max(0,Number(game.totalPlayedMinutes||game.total_played_minutes||game.minutes||0)),days:Math.max(0,Number(game.totalPlayedDays||game.total_played_days||game.days||0)),firstPlayedAt:game.firstPlayedAt||game.first_played_at||null,lastPlayedAt:game.lastPlayedAt||game.last_played_at||null})).filter(game=>game.id||game.name!=='未知游戏');
fs.writeFileSync(outputPath,`${JSON.stringify({updatedAt:new Date().toISOString(),games},null,2)}\n`,'utf8');console.log(`已导入 ${games.length} 款游戏到 ${outputPath}`);
