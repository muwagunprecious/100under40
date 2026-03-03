'use client';

export default function StructuredData() {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': '100 Under 40 Awards',
        'url': 'https://100under40.org',
        'logo': 'https://100under40.org/logo.png', // Assuming logo path
        'description': 'Africa\'s premier recognition platform for young achievers under 40.',
        'sameAs': [
            'https://twitter.com/emmanuelagida',
            'https://facebook.com/100under40',
            'https://www.instagram.com/100under40?igsh=MWo1MjJrY3Jvend6aA=='
        ],
        'founder': {
            '@type': 'Person',
            'name': 'Emmanuel Agida'
        },
        'award': '100 Under 40 Awards',
        'location': {
            '@type': 'Place',
            'name': 'Lagos, Nigeria'
        }
    };

    const awardSchema = {
        '@context': 'https://schema.org',
        '@type': 'Award',
        'name': '100 Under 40 Achievers Award',
        'description': 'Identifying and honoring 100 outstanding young Africans under 40 across strategic sectors.',
        'provider': {
            '@type': 'Organization',
            'name': 'Emmanuel Agida International'
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(awardSchema) }}
            />
        </>
    );
}
