import fs from 'fs';

async function scrape(url, label) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    const html = await res.text();
    fs.writeFileSync(`limoraf_${label}.html`, html);

    // Clean text extraction
    const cleanText = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, '\n')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/\n\s*\n/g, '\n')
      .trim();

    fs.writeFileSync(`limoraf_${label}_text.txt`, cleanText);

    // Extract all headings
    const headings = [...html.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi)]
      .map(m => m[2].replace(/<[^>]+>/g, '').trim())
      .filter(Boolean);

    // Extract all images
    const images = [...html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)]
      .map(m => m[1])
      .filter(u => u.includes('wp-content'));

    // Extract all links
    const links = [...html.matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)]
      .map(m => ({ href: m[1], text: m[2].replace(/<[^>]+>/g, '').trim() }))
      .filter(l => l.text && !l.href.startsWith('#'));

    console.log(`=== ${label.toUpperCase()} (${url}) ===`);
    console.log('Headings:\n', headings.join('\n'));
    console.log('\nSample Images:\n', [...new Set(images)].join('\n'));
    console.log('\nNavigation / Links:\n', links.slice(0, 30).map(l => `${l.text} -> ${l.href}`).join('\n'));
  } catch (err) {
    console.error(`Error scraping ${url}:`, err);
  }
}

async function main() {
  await scrape('https://limoraf.com/fr/', 'fr');
  await scrape('https://limoraf.com/en/', 'en');
}

main();
