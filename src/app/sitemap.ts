export default async function sitemap() {
    return [
      {
        url: 'https://proxy-checker-next.vercel.app',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
      },
    ];
  }