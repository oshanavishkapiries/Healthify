import SitemapGenerator from 'sitemap-generator';

// Create generator
const generator = SitemapGenerator('https://healthstation24.com', {
  stripQuerystring: true,
  filepath: './public/sitemap.xml',
  maxDepth: 0,
  timeout: 10000,
});

// Register event listeners
generator.on('done', () => {
  console.log('✅ Sitemap generated!');
});

generator.on('error', (error) => {
  console.error('❌ Error:', error);
});

// Start the crawler
generator.start();