import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

function getNotes() {
  const notesDir = path.resolve('src/content/notes');
  const notes: { title: string; date: string; slug: string; excerpt: string }[] = [];

  if (!fs.existsSync(notesDir)) return notes;

  const categories = fs.readdirSync(notesDir).filter(f => {
    const stat = fs.statSync(path.join(notesDir, f));
    if (!stat.isDirectory()) return false;
    if (f.includes('二掌柜')) return false;
    if (f.startsWith('.')) return false;
    return true;
  });

  for (const category of categories) {
    const catDir = path.join(notesDir, category);
    const files = fs.readdirSync(catDir).filter(f => {
      if (!f.endsWith('.md')) return false;
      if (f === 'README.md') return false;
      if (f.includes('归档规范') || f.includes('排版规范') || f.includes('模板')) return false;
      return true;
    });

    for (const file of files) {
      const content = fs.readFileSync(path.join(catDir, file), 'utf-8');
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      let title = file.replace('.md', '');
      let date = '';
      let tags: string[] = [];

      if (frontmatterMatch) {
        const fm = frontmatterMatch[1];
        const titleMatch = fm.match(/title:\s*(.+)/);
        const dateMatch = fm.match(/date:\s*(.+)/);
        const tagsMatch = fm.match(/tags:\s*\[([^\]]*)\]/);
        if (titleMatch) title = titleMatch[1].trim();
        if (dateMatch) {
          let rawDate = dateMatch[1].trim();
          // Handle non-standard formats like "2026 第17周 (4.20-4.26)"
          const weekMatch = rawDate.match(/(\d{1,2})\.(\d{1,2})-(\d{1,2})/);
          if (weekMatch) {
            const year = rawDate.match(/(\d{4})/)?.[1] || new Date().getFullYear();
            date = `${year}-${weekMatch[2].padStart(2, '0')}-${weekMatch[3].padStart(2, '0')}`;
          } else {
            date = rawDate.split(' ')[0];
          }
        }
        if (tagsMatch) tags = tagsMatch[1].split(',').map(t => t.trim().replace(/['"]/g, ''));
      }

      const body = content.replace(/^---[\s\S]*?---\s*/, '').trim();
      const lines = body.split('\n').filter(l => l.trim() && !l.startsWith('#') && !l.startsWith('!['));
      const excerpt = lines.slice(0, 3).join(' ').replace(/[#*\-_>`\[\]|]/g, '').trim().slice(0, 200);

      notes.push({
        title,
        date,
        slug: `${category}/${file.replace('.md', '')}`,
        excerpt: excerpt || title,
      });
    }
  }

  return notes.sort((a, b) => (b.date > a.date ? 1 : -1));
}

export const GET: APIRoute = ({ site }) => {
  const notes = getNotes();

  const items = notes.map(note => `
    <item>
      <title><![CDATA[${note.title}]]></title>
      <link>${site}notes/${note.slug}/</link>
      <guid>${site}notes/${note.slug}/</guid>
      ${note.date ? `<pubDate>${new Date(note.date).toUTCString()}</pubDate>` : ''}
      <description><![CDATA[${note.excerpt}]]></description>
    </item>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>白也的小窝</title>
    <description>来自 Obsidian 的知识沉淀</description>
    <link>${site}</link>
    <atom:link href="${site}rss.xml" rel="self" type="application/rss+xml" />
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
