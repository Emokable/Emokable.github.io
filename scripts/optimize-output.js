'use strict';

async function routeToString(route) {
  const chunks = [];
  for await (const chunk of route) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks).toString('utf8');
}

hexo.extend.filter.register('after_generate', async () => {
  const route = hexo.route.get('local-search.xml');
  if (route) {
    const xml = await routeToString(route);
    const compact = xml.replace(/<entry>([\s\S]*?)<\/entry>/g, (entry, body) => {
      const title = body.match(/<title>([\s\S]*?)<\/title>/)?.[1] || '';
      return entry.replace(
        /<content type="html"><!\[CDATA\[[\s\S]*?\]\]><\/content>/,
        `<content type="html"><![CDATA[${title}]]></content>`
      );
    });
    hexo.route.set('local-search.xml', compact);
  }

  // Fluid's template is otherwise copied as a second, unusable public XML.
  hexo.route.remove('xml/local-search.xml');
});
