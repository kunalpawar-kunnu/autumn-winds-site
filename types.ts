export type Role = 'admin' | 'user' | null;

export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  albumArt: string;
  genre: string;
  url?: string; // Mock URL
  mood?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  ticketLink?: string;
  googleMapsLink?: string;
  status: 'upcoming' | 'past';
  imageUrl: string;
}

export interface Booking {
  id: string;
  clientName: string;
  email: string;
  eventType: string;
  date: string;
  budget: string;
  status: 'pending' | 'approved' | 'rejected';
  details: string;
}

export interface Setlist {
  id: string;
  name: string;
  songs: Song[];
  vibe: string;
  createdDate: string;
  aiGeneratedDescription?: string;
}

export interface SongRequest {
  id: string;
  songTitle: string;
  artistName: string;
  userMessage: string;
  status: 'pending' | 'accepted' | 'played' | 'rejected';
  eventId: string;
}