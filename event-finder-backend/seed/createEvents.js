import Events from '../models/eventSchema.js';

export const createEvents = async () => {
    const events = [
        {
            title: 'Music Concert',
            description: 'An amazing night of live music.',
            startDate: new Date('2024-11-01T18:00:00Z'),
            endDate: new Date('2024-11-01T21:00:00Z'),
            location: 'Stadium A',
            maxAttendees: 500,
            attendees: [],
            isPublic: true,
            secretInfo: 'VIP access available',
            isPaymentRequired: true,
            price: 50,
            isRegisterRequired: true,
            needApproval: false,
            ageLimit: 18,
        },
        {
            title: 'Art Exhibition',
            description: 'A showcase of modern art.',
            startDate: new Date('2024-12-05T10:00:00Z'),
            endDate: new Date('2024-12-05T17:00:00Z'),
            location: 'Gallery B',
            maxAttendees: 200,
            attendees: [],
            isPublic: false,
            secretInfo: 'Artist meet-and-greet available',
            isPaymentRequired: false,
            isRegisterRequired: true,
            needApproval: true,
            ageLimit: 12,
        },
        {
            title: 'Coding Workshop',
            description: 'Learn to code with experts.',
            startDate: new Date('2024-11-15T09:00:00Z'),
            endDate: new Date('2024-11-15T17:00:00Z'),
            location: 'Tech Hub',
            maxAttendees: 100,
            attendees: [],
            isPublic: true,
            secretInfo: 'Bring your own laptop',
            isPaymentRequired: false,
            isRegisterRequired: true,
            needApproval: false,
            ageLimit: 16,
        },
        {
            title: 'Charity Run',
            description: '5K run for charity.',
            startDate: new Date('2024-11-20T07:00:00Z'),
            endDate: new Date('2024-11-20T11:00:00Z'),
            location: 'City Park',
            maxAttendees: 1000,
            attendees: [],
            isPublic: true,
            secretInfo: 'Free T-shirts for participants',
            isPaymentRequired: true,
            price: 10,
            isRegisterRequired: true,
            needApproval: false,
            ageLimit: 0,
        },
        {
            title: 'Food Festival',
            description: 'Explore delicious cuisines from around the world.',
            startDate: new Date('2024-11-10T12:00:00Z'),
            endDate: new Date('2024-11-10T20:00:00Z'),
            location: 'Food Plaza',
            maxAttendees: 300,
            attendees: [],
            isPublic: true,
            secretInfo: 'Free tasting session at 2 PM',
            isPaymentRequired: false,
            isRegisterRequired: false,
            needApproval: false,
            ageLimit: 0,
        },
    ];

    try {
        await Events.insertMany(events);
        console.log('5 events created successfully!');
    } catch (error) {
        console.error('Error creating events:', error);
    }
}