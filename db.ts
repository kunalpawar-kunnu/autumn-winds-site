import { Event, Song, Booking, SongRequest, Setlist } from '../types';
import { SEED_EVENTS, SEED_SONGS, SEED_BOOKINGS, SEED_REQUESTS, SEED_SETLISTS } from '../constants';

// Simulated Network Delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Database Keys - Updated to v7 to force refresh of seed data with new Events (Carter Road, etc)
const KEYS = {
  EVENTS: 'aw_events_v7',
  SONGS: 'aw_songs_v7',
  BOOKINGS: 'aw_bookings_v7',
  REQUESTS: 'aw_requests_v7',
  SETLISTS: 'aw_setlists_v7',
};

// Generic Helper to get or seed data
const getCollection = <T>(key: string, seed: T[]): T[] => {
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(seed));
    return seed;
  }
  return JSON.parse(stored);
};

const saveCollection = <T>(key: string, data: T[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const db = {
  events: {
    list: async (): Promise<Event[]> => {
      await delay(300);
      return getCollection<Event>(KEYS.EVENTS, SEED_EVENTS);
    },
    create: async (event: Event): Promise<Event> => {
      await delay(400);
      const events = getCollection<Event>(KEYS.EVENTS, SEED_EVENTS);
      const newEvents = [event, ...events];
      saveCollection(KEYS.EVENTS, newEvents);
      return event;
    },
    delete: async (id: string): Promise<void> => {
      await delay(300);
      const events = getCollection<Event>(KEYS.EVENTS, SEED_EVENTS);
      saveCollection(KEYS.EVENTS, events.filter(e => e.id !== id));
    }
  },

  songs: {
    list: async (): Promise<Song[]> => {
      await delay(300);
      return getCollection<Song>(KEYS.SONGS, SEED_SONGS);
    },
    create: async (song: Song): Promise<Song> => {
      await delay(400);
      const songs = getCollection<Song>(KEYS.SONGS, SEED_SONGS);
      const newSongs = [...songs, song];
      saveCollection(KEYS.SONGS, newSongs);
      return song;
    },
    delete: async (id: string): Promise<void> => {
        await delay(300);
        const songs = getCollection<Song>(KEYS.SONGS, SEED_SONGS);
        saveCollection(KEYS.SONGS, songs.filter(s => s.id !== id));
    }
  },

  bookings: {
    list: async (): Promise<Booking[]> => {
      await delay(300);
      return getCollection<Booking>(KEYS.BOOKINGS, SEED_BOOKINGS);
    },
    create: async (booking: Booking): Promise<Booking> => {
      await delay(500);
      const bookings = getCollection<Booking>(KEYS.BOOKINGS, SEED_BOOKINGS);
      const newBookings = [booking, ...bookings];
      saveCollection(KEYS.BOOKINGS, newBookings);
      return booking;
    },
    updateStatus: async (id: string, status: Booking['status']): Promise<void> => {
      await delay(300);
      const bookings = getCollection<Booking>(KEYS.BOOKINGS, SEED_BOOKINGS);
      const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
      saveCollection(KEYS.BOOKINGS, updated);
    }
  },

  requests: {
    list: async (): Promise<SongRequest[]> => {
      await delay(300);
      return getCollection<SongRequest>(KEYS.REQUESTS, SEED_REQUESTS);
    },
    create: async (req: SongRequest): Promise<SongRequest> => {
      await delay(400);
      const requests = getCollection<SongRequest>(KEYS.REQUESTS, SEED_REQUESTS);
      const newRequests = [req, ...requests];
      saveCollection(KEYS.REQUESTS, newRequests);
      return req;
    },
    updateStatus: async (id: string, status: SongRequest['status']): Promise<void> => {
      await delay(300);
      const requests = getCollection<SongRequest>(KEYS.REQUESTS, SEED_REQUESTS);
      const updated = requests.map(r => r.id === id ? { ...r, status } : r);
      saveCollection(KEYS.REQUESTS, updated);
    }
  },

  setlists: {
    list: async (): Promise<Setlist[]> => {
      await delay(300);
      return getCollection<Setlist>(KEYS.SETLISTS, SEED_SETLISTS);
    },
    create: async (setlist: Setlist): Promise<Setlist> => {
      await delay(400);
      const setlists = getCollection<Setlist>(KEYS.SETLISTS, SEED_SETLISTS);
      const newSetlists = [setlist, ...setlists];
      saveCollection(KEYS.SETLISTS, newSetlists);
      return setlist;
    }
  }
};