import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/api/'], // Protect admin and API routes from indexing
        },
        sitemap: 'https://100under40.org/sitemap.xml',
    };
}
