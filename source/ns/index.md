---
title: Nintendo Switch
date: 2026-09-21 00:40:00
layout: page
banner_img: /img/top.jpg
lazyload: false
---

<div class="ns-page">
  <div class="ns-hero">
    <div><span class="ns-kicker">PLAY HISTORY</span><h1>我的 Nintendo Switch</h1><p id="ns-updated">正在读取游戏记录…</p></div>
    <div class="ns-summary"><div><strong id="ns-game-count">—</strong><span>款游戏</span></div><div><strong id="ns-hours">—</strong><span>小时</span></div><div><strong id="ns-days">—</strong><span>游玩天数</span></div></div>
  </div>
  <div class="ns-toolbar" hidden><input id="ns-search" type="search" placeholder="搜索游戏" aria-label="搜索游戏"><select id="ns-sort" aria-label="排序方式"><option value="minutes">按游玩时长</option><option value="recent">按最近游玩</option><option value="name">按名称</option></select></div>
  <div id="ns-games" class="ns-grid"></div>
  <div id="ns-empty" class="ns-empty" hidden><h2>还没有导入 NS 数据</h2><p>在本机通过 Nintendo 官方登录页授权并导出历史记录，然后运行：</p><pre><code>npm run ns:import -- 路径\history_日期.json</code></pre><p>令牌文件不要放进博客；本站只发布游戏名称、封面和游玩统计。</p></div>
</div>

<style>
.ns-page{--ns-red:#e60012;color:var(--text-color)}.ns-hero{display:flex;justify-content:space-between;gap:2rem;align-items:center;padding:2rem;border-radius:22px;background:linear-gradient(135deg,#e60012 0 49.5%,#00b9d7 50%);color:#fff;box-shadow:0 14px 36px rgba(0,0,0,.18)}.ns-hero h1{margin:.25rem 0;font-size:clamp(1.8rem,4vw,3rem);color:#fff}.ns-hero p{margin:0;opacity:.86}.ns-kicker{font-size:.72rem;letter-spacing:.22em;font-weight:700}.ns-summary{display:flex;gap:1.6rem;text-align:center}.ns-summary div{display:flex;flex-direction:column}.ns-summary strong{font-size:1.8rem;line-height:1.1}.ns-summary span{font-size:.72rem;opacity:.84;white-space:nowrap}.ns-toolbar{display:flex;gap:.75rem;margin:1.5rem 0}.ns-toolbar input,.ns-toolbar select{border:1px solid rgba(128,128,128,.25);border-radius:12px;padding:.72rem 1rem;background:var(--board-bg-color);color:inherit}.ns-toolbar input{flex:1}.ns-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:1.15rem;margin-top:1.5rem}.ns-card{overflow:hidden;border-radius:16px;background:var(--board-bg-color);box-shadow:0 6px 20px rgba(0,0,0,.1);transition:transform .2s}.ns-card:hover{transform:translateY(-4px)}.ns-cover{width:100%;aspect-ratio:1/1;object-fit:cover;background:#eee}.ns-info{padding:1rem}.ns-info h3{font-size:1rem;line-height:1.35;margin:0 0 .7rem}.ns-time{font-size:1.15rem;font-weight:700;color:var(--ns-red)}.ns-meta{display:block;margin-top:.35rem;font-size:.75rem;opacity:.68}.ns-empty{text-align:center;padding:3rem 1rem}.ns-empty pre{display:inline-block;text-align:left;max-width:100%;overflow:auto}@media(max-width:720px){.ns-hero{align-items:flex-start;flex-direction:column}.ns-summary{width:100%;justify-content:space-between;gap:.5rem}.ns-toolbar{flex-direction:column}.ns-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:.75rem}}
</style>

<script>
(() => {
  const grid=document.querySelector('#ns-games'),empty=document.querySelector('#ns-empty'),toolbar=document.querySelector('.ns-toolbar'),search=document.querySelector('#ns-search'),sort=document.querySelector('#ns-sort');let games=[];
  const esc=value=>String(value??'').replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const date=value=>value?new Intl.DateTimeFormat('zh-CN',{dateStyle:'medium'}).format(new Date(value)):'未知';
  const render=()=>{const keyword=search.value.trim().toLocaleLowerCase();const list=games.filter(game=>game.name.toLocaleLowerCase().includes(keyword)).sort((a,b)=>sort.value==='name'?a.name.localeCompare(b.name,'zh-CN'):sort.value==='recent'?String(b.lastPlayedAt).localeCompare(String(a.lastPlayedAt)):b.minutes-a.minutes);grid.innerHTML=list.map(game=>`<article class="ns-card"><img class="ns-cover" src="${esc(game.image)}" alt="${esc(game.name)}" loading="lazy"><div class="ns-info"><h3>${esc(game.name)}</h3><div class="ns-time">${(game.minutes/60).toFixed(1)} 小时</div><span class="ns-meta">${game.days} 天 · 最近 ${date(game.lastPlayedAt)}</span></div></article>`).join('')};
  fetch('/ns/data.json',{cache:'no-cache'}).then(response=>response.ok?response.json():Promise.reject()).then(data=>{games=Array.isArray(data.games)?data.games:[];document.querySelector('#ns-updated').textContent=games.length?`数据更新于 ${date(data.updatedAt)}`:'等待首次导入';document.querySelector('#ns-game-count').textContent=games.length;document.querySelector('#ns-hours').textContent=Math.round(games.reduce((sum,game)=>sum+game.minutes,0)/60);document.querySelector('#ns-days').textContent=games.reduce((sum,game)=>sum+game.days,0);empty.hidden=games.length>0;toolbar.hidden=games.length===0;render()}).catch(()=>{document.querySelector('#ns-updated').textContent='数据读取失败';empty.hidden=false});search.addEventListener('input',render);sort.addEventListener('change',render);
})();
</script>
