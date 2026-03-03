// Mock Data for 100 Under 40 Awards Platform

export const categories = [
    {
        id: '1',
        name: 'Business & Entrepreneurship',
        description: 'Recognizing visionary founders and corporate leaders driving economic growth and sustainable job creation across the continent.',
        order: 1
    },
    {
        id: '2',
        name: 'Technology & Innovation',
        description: 'Celebrating the architects of Africa\'s digital future, from fintech pioneers to deep-tech innovators.',
        order: 2
    },
    {
        id: '3',
        name: 'Governance, Policy & Public Service',
        description: 'Honoring young leaders in public office and policy advocacy committed to institutional excellence and transparent governance.',
        order: 3
    },
    {
        id: '4',
        name: 'Finance & Investment',
        description: 'Spotlighting the financiers and investment strategists shaping Africa\'s capital markets and economic resilience.',
        order: 4
    },
    {
        id: '5',
        name: 'Creative & Cultural Industries',
        description: 'Celebrating the vanguard of African creativity, from film and fashion to visual arts and cultural preservation.',
        order: 5
    },
    {
        id: '6',
        name: 'Media & Digital Influence',
        description: 'Honoring the storytellers and digital architects shaping Africa\'s narrative and global media presence.',
        order: 6
    },
    {
        id: '7',
        name: 'Healthcare & Wellness',
        description: 'Recognizing the medical pioneers and wellness advocates advancing public health and medical innovation.',
        order: 7
    },
    {
        id: '8',
        name: 'Education & Human Capital Development',
        description: 'Celebrating the educators and skill-builders empowering the next generation of African talent.',
        order: 8
    },
    {
        id: '9',
        name: 'Agriculture & Food Systems',
        description: 'Honoring the innovators securing Africa\'s food future through sustainable agribusiness and technology.',
        order: 9
    },
    {
        id: '10',
        name: 'Social Innovation, Philanthropy & Development',
        description: 'Spotlighting the change-makers building resilient communities and solving complex social challenges.',
        order: 10
    }
];

export const nominees = [
    {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah@techfarm.com',
        age: 28,
        categoryId: '2',
        category: categories[1],
        bio: 'Founder of TechFarm, an AI-driven agricultural platform helping small-scale farmers optimize yields.',
        achievements: 'Developed proprietary AI algorithm for soil analysis\nRaised $2M in seed funding\nPartnered with Ministry of Agriculture\nNamed in Forbes Africa 30 Under 30',
        photoUrl: null,
        published: true
    },
    {
        id: '2',
        name: 'David Osei',
        email: 'david@panafricanlogistics.com',
        age: 35,
        categoryId: '1',
        category: categories[0],
        bio: 'CEO of Pan-African Logistics, expanding trade routes across 15 countries.',
        achievements: 'Expanded operations to 15 countries in 5 years\nBuilt a digital tracking system used by 2000+ clients\nWinner of the African Business Hero Award\nEmploying 500+ staff',
        photoUrl: null,
        published: true
    },
    {
        id: '3',
        name: 'Zainab Ahmed',
        email: 'zainab@educationforall.org',
        age: 32,
        categoryId: '10',
        category: categories[9],
        bio: 'Director of the "Education for All" initiative in Northern Nigeria.',
        achievements: 'Built 50+ schools in underserved communities\nProvided scholarships to 5,000+ students\nRecipient of the UN Humanitarian Award\nAdvocate for girl-child education',
        photoUrl: null,
        published: true
    },
    {
        id: '4',
        name: 'Michael Kibuuka',
        email: 'michael@finconnect.ug',
        age: 29,
        categoryId: '2',
        category: categories[1],
        bio: 'CTO of FinConnect, revolutionizing mobile payments across East Africa.',
        achievements: 'Processed $100M+ in transactions\nServing 2 million active users\nIntegrated with 15+ banks\nReduced transaction costs by 60%',
        photoUrl: null,
        published: true
    },
    {
        id: '5',
        name: 'Amara Diop',
        email: 'amara@studio.sn',
        age: 27,
        categoryId: '5',
        category: categories[4],
        bio: 'Award-winning contemporary artist and sculptor.',
        achievements: 'Exhibited in 20+ countries\nWinner of the African Art Prize 2024\nFeatured in Vogue Africa\nMentor to 100+ young artists',
        photoUrl: null,
        published: true
    },
    {
        id: '6',
        name: 'Kwame Mensah',
        email: 'kwame@newsghana.com',
        age: 33,
        categoryId: '6',
        category: categories[5],
        bio: 'Investigative journalist exposing corruption and championing transparency.',
        achievements: 'Published 50+ investigative reports\nWinner of the CNN African Journalist Award\nUncovered $20M corruption scandal\nFounded independent media house',
        photoUrl: null,
        published: true
    }
];

export const nominations = [
    {
        id: '1',
        nomineeName: 'Sarah Johnson',
        nomineeEmail: 'sarah@techfarm.com',
        nomineeAge: 28,
        categoryId: '2',
        category: categories[1],
        achievements: 'Developed proprietary AI algorithm for soil analysis. Raised $2M in seed funding.',
        nominatorName: 'John Doe',
        nominatorEmail: 'john@example.com',
        status: 'approved',
        createdAt: new Date('2024-12-15'),
    },
    {
        id: '2',
        nomineeName: 'Jane Smith',
        nomineeEmail: 'jane@startup.com',
        nomineeAge: 26,
        categoryId: '1',
        category: categories[0],
        achievements: 'Founded a fintech startup serving 10,000+ users.',
        nominatorName: 'Alice Brown',
        nominatorEmail: 'alice@example.com',
        status: 'pending',
        createdAt: new Date('2024-12-20'),
    },
    {
        id: '3',
        nomineeName: 'Peter Mwangi',
        nomineeEmail: 'peter@health.ke',
        nomineeAge: 38,
        categoryId: '7',
        category: categories[6],
        achievements: 'Pioneered telemedicine in rural Kenya, serving 50,000+ patients.',
        nominatorName: 'Mary Johnson',
        nominatorEmail: 'mary@example.com',
        status: 'rejected',
        createdAt: new Date('2024-12-10'),
    }
];

export const adminStats = {
    totalNominations: 156,
    pendingNominations: 42,
    approvedNominees: 87,
    totalVotes: 12450,
    recentNominations: nominations.slice(0, 5)
};

export const votingStats = {
    categoryVotes: [
        { category: 'Technology & Innovation', votes: 3200, percentage: 26 },
        { category: 'Business & Entrepreneurship', votes: 2800, percentage: 22 },
        { category: 'Social Innovation, Philanthropy & Development', votes: 2100, percentage: 17 },
        { category: 'Creative & Cultural Industries', votes: 1800, percentage: 14 },
        { category: 'Media & Digital Influence', votes: 1200, percentage: 10 },
        { category: 'Healthcare & Wellness', votes: 900, percentage: 7 },
        { category: 'Education & Human Capital Development', votes: 450, percentage: 4 }
    ],
    topNominees: [
        { name: 'Sarah Johnson', category: 'Technology & Innovation', votes: 1850 },
        { name: 'David Osei', category: 'Business & Entrepreneurship', votes: 1620 },
        { name: 'Zainab Ahmed', category: 'Social Innovation, Philanthropy & Development', votes: 1340 },
        { name: 'Michael Kibuuka', category: 'Technology & Innovation', votes: 1180 },
        { name: 'Amara Diop', category: 'Creative & Cultural Industries', votes: 980 },
        { name: 'Kwame Mensah', category: 'Media & Digital Influence', votes: 850 }
    ]
};

// Admin credentials
export const adminCredentials = {
    email: 'admin@100under40.org',
    password: 'admin123'
};
