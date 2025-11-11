export type Incident = {
  id: string;
  type: 'Harassment' | 'Theft' | 'Assault' | 'Unsafe Area' | 'Other';
  description: string;
  location: {
    name: string;
    lat: number;
    lng: number;
  };
  reportedAt: string;
  reportedBy: string;
};

export type SafetyTip = {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
};

export type Contributor = {
  id: string;
  name: string;
  avatar: string;
  contributions: number;
  reputation: number;
};

export type EmergencyContact = {
  id: string;
  name: string;
  phone: string;
  relation: string;
  avatar: string;
};

export type SafeSpot = {
    id: string;
    type: 'Police Station' | 'Hospital' | 'Safe Zone';
    name: string;
    lat: number;
    lng: number;
}

export const incidents: Incident[] = [
  {
    id: 'inc1',
    type: 'Unsafe Area',
    description: 'Poorly lit street, have seen suspicious activity multiple times.',
    location: { name: 'Market Street Alley', lat: 34.0522, lng: -118.2437 },
    reportedAt: '2024-07-28T10:00:00Z',
    reportedBy: 'User123',
  },
  {
    id: 'inc2',
    type: 'Harassment',
    description: 'A group of men were catcalling and following women near the bus stop.',
    location: { name: 'Central Park Bus Stop', lat: 34.055, lng: -118.245 },
    reportedAt: '2024-07-27T18:30:00Z',
    reportedBy: 'User456',
  },
  {
    id: 'inc3',
    type: 'Theft',
    description: 'My bag was snatched while walking through this area.',
    location: { name: 'Riverside Walk', lat: 34.05, lng: -118.25 },
    reportedAt: '2024-07-26T15:45:00Z',
    reportedBy: 'User789',
  },
];

export const safeSpots: SafeSpot[] = [
    { id: 'safe1', type: 'Police Station', name: 'Downtown Police Dept.', lat: 34.054, lng: -118.24 },
    { id: 'safe2', type: 'Hospital', name: 'General Hospital', lat: 34.058, lng: -118.248 },
    { id: 'safe3', type: 'Safe Zone', name: 'Community Center', lat: 34.051, lng: -118.249 },
];

export const safetyTips: SafetyTip[] = [
  {
    id: 'tip1',
    title: 'Share Your Location with a Friend',
    content: 'Before going out, especially at night, share your live location with a trusted friend or family member for the duration of your trip.',
    author: 'Anika Sharma',
    createdAt: '2024-07-25T09:00:00Z',
  },
  {
    id: 'tip2',
    title: 'Be Aware of Your Surroundings',
    content: 'Avoid using headphones with loud music in both ears. Stay alert and observe people and vehicles around you.',
    author: 'Priya Singh',
    createdAt: '2024-07-24T14:20:00Z',
  },
  {
    id: 'tip3',
    title: 'Carry a Personal Safety Alarm',
    content: 'A small, loud personal alarm can be a powerful deterrent. It draws attention and can startle a potential attacker.',
    author: 'Anika Sharma',
    createdAt: '2024-07-23T11:00:00Z',
  },
];

export const trustedContributors: Contributor[] = [
  {
    id: 'con1',
    name: 'Anika Sharma',
    avatar: 'user-avatar-1',
    contributions: 42,
    reputation: 98,
  },
  {
    id: 'con2',
    name: 'Priya Singh',
    avatar: 'user-avatar-2',
    contributions: 28,
    reputation: 95,
  },
  {
    id: 'con3',
    name: 'Sunita Patel',
    avatar: 'user-avatar-3',
    contributions: 15,
    reputation: 92,
  },
];

export const emergencyContacts: EmergencyContact[] = [
  {
    id: 'ec1',
    name: 'Rahul Kumar',
    phone: '+91 98765 43210',
    relation: 'Brother',
    avatar: 'emergency-contact-1',
  },
  {
    id: 'ec2',
    name: 'Sneha Verma',
    phone: '+91 87654 32109',
    relation: 'Friend',
    avatar: 'emergency-contact-2',
  },
];
