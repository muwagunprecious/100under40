// Mock Data for 100 Under 40 Awards Platform

export const categories = [
    {
        id: '1',
        name: 'Technology & Innovation',
        description: 'Celebrating tech entrepreneurs, developers, and innovators building digital solutions for Africa.',
        order: 1
    },
    {
        id: '2',
        name: 'Business & Entrepreneurship',
        description: 'Recognizing founders and business leaders driving economic growth and job creation.',
        order: 2
    },
    {
        id: '3',
        name: 'Social Impact & Philanthropy',
        description: 'Honoring individuals dedicated to solving social challenges and uplifting communities.',
        order: 3
    },
    {
        id: '4',
        name: 'Creative Arts & Culture',
        description: 'Spotlighting artists, musicians, filmmakers, and cultural ambassadors.',
        order: 4
    },
    {
        id: '5',
        name: 'Media & Journalism',
        description: 'Celebrating storytellers, journalists, and media personalities shaping the narrative.',
        order: 5
    },
    {
        id: '6',
        name: 'Leadership & Governance',
        description: 'Recognizing young leaders in public service, policy making, and governance.',
        order: 6
    },
    {
        id: '7',
        name: 'Agriculture & Agribusiness',
        description: 'Honoring innovation and leadership in food security and agricultural value chains.',
        order: 7
    },
    {
        id: '8',
        name: 'Education & Academia',
        description: 'Celebrating educators and researchers advancing knowledge and learning.',
        order: 8
    },
    {
        id: '9',
        name: 'Health & Wellness',
        description: 'Recognizing contributions to public health, medicine, and wellness.',
        order: 9
    },
    {
        id: '10',
        name: 'Sports',
        description: 'Honoring athletes and sports administrators making a mark globally.',
        order: 10
    }
];

export const nominees = [
    {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah@techfarm.com',
        age: 28,
        categoryId: '1',
        category: categories[0],
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
        categoryId: '2',
        category: categories[1],
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
        categoryId: '3',
        category: categories[2],
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
        categoryId: '1',
        category: categories[0],
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
        categoryId: '4',
        category: categories[3],
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
        categoryId: '5',
        category: categories[4],
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
        categoryId: '1',
        category: categories[0],
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
        categoryId: '2',
        category: categories[1],
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
        categoryId: '9',
        category: categories[8],
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
        { category: 'Social Impact & Philanthropy', votes: 2100, percentage: 17 },
        { category: 'Creative Arts & Culture', votes: 1800, percentage: 14 },
        { category: 'Media & Journalism', votes: 1200, percentage: 10 },
        { category: 'Health & Wellness', votes: 900, percentage: 7 },
        { category: 'Sports', votes: 450, percentage: 4 }
    ],
    topNominees: [
        { name: 'Sarah Johnson', category: 'Technology & Innovation', votes: 1850 },
        { name: 'David Osei', category: 'Business & Entrepreneurship', votes: 1620 },
        { name: 'Zainab Ahmed', category: 'Social Impact & Philanthropy', votes: 1340 },
        { name: 'Michael Kibuuka', category: 'Technology & Innovation', votes: 1180 },
        { name: 'Amara Diop', category: 'Creative Arts & Culture', votes: 980 },
        { name: 'Kwame Mensah', category: 'Media & Journalism', votes: 850 }
    ]
};

// Admin credentials
export const adminCredentials = {
    email: 'admin@example.com',
    password: 'admin123'
};
