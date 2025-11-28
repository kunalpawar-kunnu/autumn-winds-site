import React, { useState, useEffect } from 'react';
import { 
  Music, Calendar, Users, DollarSign, Plus, Trash2, Check, X, Mic2, Sparkles, LayoutDashboard, Disc, Loader2
} from 'lucide-react';
import { Booking, Event, Song, Setlist, SongRequest } from '../types';
import { generateSetlistSuggestion, analyzeBookingInquiry, analyzeSongRequest } from '../services/geminiService';
import { db } from '../services/db';

interface AdminDashboardProps {
  onPlaySong: (song: Song) => void;
  currentSong: Song | null;
  isPlaying: boolean;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onPlaySong, currentSong, isPlaying }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'bookings' | 'setlists' | 'requests' | 'music'>('overview');
  const [loading, setLoading] = useState(true);

  // Data State
  const [events, setEvents] = useState<Event[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [requests, setRequests] = useState<SongRequest[]>([]);
  const [setlists, setSetlists] = useState<Setlist[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  
  // Forms
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({});
  const [showSongForm, setShowSongForm] = useState(false);
  const [newSong, setNewSong] = useState<Partial<Song>>({});

  // AI & Analysis
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [bookingAnalysis, setBookingAnalysis] = useState<{[key: string]: string}>({});
  const [requestAnalysis, setRequestAnalysis] = useState<{[key: string]: string}>({});

  // Initial Data Load
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [e, b, r, s, sl] = await Promise.all([
        db.events.list(),
        db.bookings.list(),
        db.requests.list(),
        db.songs.list(),
        db.setlists.list()
      ]);
      setEvents(e);
      setBookings(b);
      setRequests(r);
      setSongs(s);
      setSetlists(sl);
    } catch (err) {
      console.error("Failed to load data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date) return;
    const event: Event = {
      id: `e${Date.now()}`,
      title: newEvent.title,
      date: newEvent.date,
      location: newEvent.location || 'TBA',
      description: newEvent.description || '',
      status: 'upcoming',
      imageUrl: newEvent.imageUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800&h=400',
      googleMapsLink: newEvent.googleMapsLink
    };
    await db.events.create(event);
    setEvents([event, ...events]);
    setShowEventForm(false);
    setNewEvent({});
  };

  const handleDeleteEvent = async (id: string) => {
      if(confirm('Are you sure you want to delete this event?')) {
          await db.events.delete(id);
          setEvents(events.filter(e => e.id !== id));
      }
  }

  const handleAddSong = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!newSong.title || !newSong.artist) return;
      const song: Song = {
          id: `s_${Date.now()}`,
          title: newSong.title,
          artist: newSong.artist,
          duration: newSong.duration || '0:00',
          genre: newSong.genre || 'Unknown',
          mood: newSong.mood || 'Neutral',
          albumArt: newSong.albumArt || `https://images.unsplash.com/photo-1459749411177-287ce14650db?auto=format&fit=crop&q=80&w=300&h=300`
      };
      await db.songs.create(song);
      setSongs([...songs, song]);
      setShowSongForm(false);
      setNewSong({});
  };

  const handleDeleteSong = async (id: string) => {
      if(confirm('Remove this song from library?')) {
          await db.songs.delete(id);
          setSongs(songs.filter(s => s.id !== id));
      }
  }

  const handleBookingAction = async (id: string, status: 'approved' | 'rejected') => {
    await db.bookings.updateStatus(id, status);
    setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
  };

  const handleRequestAction = async (id: string, status: 'accepted' | 'rejected') => {
      await db.requests.updateStatus(id, status);
      setRequests(requests.map(r => r.id === id ? { ...r, status } : r));
  };

  const generateSetlist = async () => {
    if (!aiPrompt) return;
    setIsGenerating(true);
    const result = await generateSetlistSuggestion(aiPrompt, songs);
    
    const newSetlist: Setlist = {
      id: `s${Date.now()}`,
      name: result.name,
      vibe: aiPrompt,
      songs: result.songIds.map(id => songs.find(s => s.id === id)!).filter(Boolean),
      createdDate: new Date().toISOString().split('T')[0],
      aiGeneratedDescription: result.description
    };
    
    await db.setlists.create(newSetlist);
    setSetlists([newSetlist, ...setlists]);
    setIsGenerating(false);
    setAiPrompt('');
  };

  const analyzeBooking = async (bookingId: string, details: string) => {
      const summary = await analyzeBookingInquiry(details);
      setBookingAnalysis(prev => ({...prev, [bookingId]: summary}));
  };

  const analyzeRequest = async (requestId: string, song: string, artist: string) => {
      const summary = await analyzeSongRequest(song, artist);
      setRequestAnalysis(prev => ({...prev, [requestId]: summary}));
  };

  if (loading) {
      return (
          <div className="flex items-center justify-center h-screen bg-autumn-bg text-autumn-gold">
              <Loader2 size={48} className="animate-spin" />
          </div>
      );
  }

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {[
        { title: 'Upcoming Tours', value: events.filter(e => e.status === 'upcoming').length, icon: Calendar, color: 'text-autumn-orange' },
        { title: 'Pending Inquiries', value: bookings.filter(b => b.status === 'pending').length, icon: DollarSign, color: 'text-autumn-gold' },
        { title: 'Song Requests', value: requests.filter(r => r.status === 'pending').length, icon: Mic2, color: 'text-autumn-red' },
        { title: 'Total Songs', value: songs.length, icon: Music, color: 'text-white' },
      ].map((stat, i) => (
        <div key={i} className="bg-autumn-card border border-white/5 p-6 rounded-xl hover:border-autumn-gold/20 transition-colors shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm font-medium">{stat.title}</span>
            <stat.icon className={`${stat.color} opacity-80`} size={20} />
          </div>
          <div className="text-3xl font-display font-bold text-white">{stat.value}</div>
        </div>
      ))}
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-bold text-white mb-4">Booking Inquiries</h2>
      {bookings.length === 0 && <p className="text-gray-500">No bookings yet.</p>}
      {bookings.map(booking => (
        <div key={booking.id} className="bg-autumn-card p-6 rounded-xl border border-white/5 flex flex-col md:flex-row gap-4 justify-between items-start shadow-md">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-white">{booking.clientName}</h3>
                <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                    booking.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                    booking.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
                }`}>{booking.status}</span>
            </div>
            <p className="text-gray-400 text-sm mb-1">{booking.email} • {booking.eventType} • {booking.date}</p>
            <p className="text-autumn-gold font-bold mb-2">{booking.budget}</p>
            <p className="text-gray-300 text-sm italic border-l-2 border-autumn-red pl-3">"{booking.details}"</p>
            
            <div className="mt-3">
                 {bookingAnalysis[booking.id] ? (
                     <div className="text-xs text-autumn-light border border-autumn-gold/30 p-2 rounded bg-autumn-gold/5 animate-in fade-in">
                        <Sparkles size={12} className="inline mr-1 text-autumn-gold" />
                        AI Summary: {bookingAnalysis[booking.id]}
                     </div>
                 ) : (
                     <button onClick={() => analyzeBooking(booking.id, booking.details)} className="text-xs text-autumn-gold hover:text-white flex items-center gap-1 transition-colors">
                         <Sparkles size={12} /> Analyze Tone
                     </button>
                 )}
            </div>
          </div>
          {booking.status === 'pending' && (
            <div className="flex gap-2">
              <button onClick={() => handleBookingAction(booking.id, 'approved')} className="p-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-colors">
                <Check size={20} />
              </button>
              <button onClick={() => handleBookingAction(booking.id, 'rejected')} className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors">
                <X size={20} />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderRequests = () => (
      <div className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-white mb-4">Fan Song Requests</h2>
          {requests.length === 0 && <p className="text-gray-500">No active song requests.</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {requests.map(req => {
                  const event = events.find(e => e.id === req.eventId);
                  return (
                      <div key={req.id} className="bg-autumn-card p-6 rounded-xl border border-white/5 relative overflow-hidden shadow-md">
                          <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                              req.status === 'pending' ? 'bg-yellow-500' :
                              req.status === 'accepted' ? 'bg-green-500' :
                              'bg-red-500'
                          }`}></div>
                          <div className="flex justify-between items-start mb-2 pl-3">
                              <div>
                                  <h3 className="text-lg font-bold text-white">{req.songTitle}</h3>
                                  <p className="text-sm text-gray-400">{req.artistName}</p>
                              </div>
                              <span className={`text-xs px-2 py-1 rounded uppercase font-bold ${
                                  req.status === 'pending' ? 'text-yellow-400 bg-yellow-400/10' :
                                  req.status === 'accepted' ? 'text-green-400 bg-green-400/10' :
                                  'text-red-400 bg-red-400/10'
                              }`}>{req.status}</span>
                          </div>
                          <div className="pl-3">
                              <p className="text-xs text-autumn-gold mb-2">{event?.title || 'Unknown Event'}</p>
                              <p className="text-gray-300 text-sm italic mb-4">"{req.userMessage}"</p>
                              
                              {requestAnalysis[req.id] ? (
                                <div className="text-xs text-autumn-light border border-autumn-gold/30 p-2 rounded bg-autumn-gold/5 animate-in fade-in mb-3">
                                    <Sparkles size={12} className="inline mr-1 text-autumn-gold" />
                                    {requestAnalysis[req.id]}
                                </div>
                              ) : (
                                <button onClick={() => analyzeRequest(req.id, req.songTitle, req.artistName)} className="text-xs text-autumn-gold hover:text-white flex items-center gap-1 transition-colors mb-3">
                                    <Sparkles size={12} /> AI Vibe Check
                                </button>
                              )}

                              {req.status === 'pending' && (
                                  <div className="flex gap-2 mt-2">
                                      <button onClick={() => handleRequestAction(req.id, 'accepted')} className="flex-1 py-2 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30 transition-colors text-sm font-bold">Accept</button>
                                      <button onClick={() => handleRequestAction(req.id, 'rejected')} className="flex-1 py-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors text-sm font-bold">Reject</button>
                                  </div>
                              )}
                          </div>
                      </div>
                  );
              })}
          </div>
      </div>
  );

  const renderLibrary = () => (
      <div className="space-y-6">
          <div className="flex justify-between items-center">
              <h2 className="text-2xl font-display font-bold text-white">Music Library</h2>
              <button 
                onClick={() => setShowSongForm(!showSongForm)}
                className="bg-autumn-red/10 text-autumn-red hover:bg-autumn-red hover:text-white border border-autumn-red transition-all px-4 py-2 rounded-lg flex items-center gap-2 font-bold"
              >
                  <Plus size={18} /> Upload Media
              </button>
          </div>

          {showSongForm && (
              <form onSubmit={handleAddSong} className="bg-white/5 p-6 rounded-xl border border-white/10 animate-in fade-in slide-in-from-top-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <input type="text" placeholder="Title" required className="bg-black/50 border border-white/20 rounded p-3 text-white outline-none focus:border-autumn-gold" value={newSong.title || ''} onChange={e => setNewSong({...newSong, title: e.target.value})} />
                      <input type="text" placeholder="Artist" required className="bg-black/50 border border-white/20 rounded p-3 text-white outline-none focus:border-autumn-gold" value={newSong.artist || ''} onChange={e => setNewSong({...newSong, artist: e.target.value})} />
                      <input type="text" placeholder="Genre" className="bg-black/50 border border-white/20 rounded p-3 text-white outline-none focus:border-autumn-gold" value={newSong.genre || ''} onChange={e => setNewSong({...newSong, genre: e.target.value})} />
                      <input type="text" placeholder="Duration" className="bg-black/50 border border-white/20 rounded p-3 text-white outline-none focus:border-autumn-gold" value={newSong.duration || ''} onChange={e => setNewSong({...newSong, duration: e.target.value})} />
                      <input type="text" placeholder="Mood" className="bg-black/50 border border-white/20 rounded p-3 text-white outline-none focus:border-autumn-gold" value={newSong.mood || ''} onChange={e => setNewSong({...newSong, mood: e.target.value})} />
                      <input type="text" placeholder="Album Art URL" className="bg-black/50 border border-white/20 rounded p-3 text-white outline-none focus:border-autumn-gold" value={newSong.albumArt || ''} onChange={e => setNewSong({...newSong, albumArt: e.target.value})} />
                  </div>
                  <div className="flex justify-end gap-2">
                      <button type="button" onClick={() => setShowSongForm(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                      <button type="submit" className="px-6 py-2 bg-autumn-red text-white font-bold rounded hover:brightness-110 transition-colors">Add Song</button>
                  </div>
              </form>
          )}

          <div className="bg-autumn-card rounded-xl border border-white/5 overflow-hidden shadow-lg">
              <table className="w-full text-left">
                  <thead className="bg-white/5 text-autumn-light/50 uppercase text-xs">
                      <tr>
                          <th className="p-4">Song</th>
                          <th className="p-4">Artist</th>
                          <th className="p-4 hidden md:table-cell">Genre</th>
                          <th className="p-4 hidden md:table-cell">Mood</th>
                          <th className="p-4 text-right">Action</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                      {songs.map(song => (
                          <tr key={song.id} className="hover:bg-white/5 transition-colors">
                              <td className="p-4 flex items-center gap-3">
                                  <img src={song.albumArt} alt="" className="w-10 h-10 rounded shadow border border-white/10" />
                                  <span className="font-bold text-white">{song.title}</span>
                              </td>
                              <td className="p-4 text-gray-300">{song.artist}</td>
                              <td className="p-4 text-gray-400 hidden md:table-cell">{song.genre}</td>
                              <td className="p-4 text-gray-400 hidden md:table-cell">{song.mood}</td>
                              <td className="p-4 text-right flex justify-end">
                                  <button onClick={() => onPlaySong(song)} className="text-autumn-gold hover:text-white mr-3">
                                      {currentSong?.id === song.id && isPlaying ? <div className="h-4 w-4 bg-autumn-gold animate-pulse rounded-full"/> : <Disc size={18} />}
                                  </button>
                                  <button onClick={() => handleDeleteSong(song.id)} className="text-gray-500 hover:text-red-500">
                                      <Trash2 size={18} />
                                  </button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
  );

  const renderSetlists = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-autumn-red/10 to-autumn-orange/10 p-6 rounded-xl border border-white/10">
        <h3 className="text-xl font-display font-bold text-white mb-2 flex items-center gap-2">
            <Sparkles className="text-autumn-gold" /> AI Setlist Creator
        </h3>
        <div className="flex gap-4">
            <input 
                type="text" 
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Describe the vibe (e.g., 'Acoustic evening under stars')"
                className="flex-1 bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-autumn-gold transition-colors"
            />
            <button 
                onClick={generateSetlist}
                disabled={isGenerating || !aiPrompt}
                className="bg-autumn-red hover:bg-autumn-orange text-white font-bold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
                {isGenerating ? <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"/> : <Sparkles size={18} />}
                Generate
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {setlists.map(list => (
            <div key={list.id} className="bg-autumn-card p-6 rounded-xl border border-white/5 hover:border-autumn-gold/30 transition-all shadow-md">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h4 className="text-xl font-bold text-white">{list.name}</h4>
                        <span className="text-xs text-autumn-gold uppercase tracking-wider">{list.vibe}</span>
                    </div>
                    <span className="text-xs text-gray-500">{list.createdDate}</span>
                </div>
                {list.aiGeneratedDescription && (
                    <p className="text-gray-400 text-sm mb-4 italic border-l-2 border-autumn-red pl-3">
                        {list.aiGeneratedDescription}
                    </p>
                )}
                <div className="space-y-2">
                    {list.songs.map((song, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm text-gray-300 bg-white/5 p-2 rounded">
                            <span className="text-gray-500 w-4">{idx + 1}.</span>
                            <span className="font-medium text-white">{song.title}</span>
                            <span className="text-gray-500">- {song.artist}</span>
                        </div>
                    ))}
                </div>
            </div>
        ))}
      </div>
    </div>
  );

  const renderEvents = () => (
      <div className="space-y-6">
          <div className="flex justify-between items-center">
              <h2 className="text-2xl font-display font-bold text-white">Events Management</h2>
              <button 
                onClick={() => setShowEventForm(!showEventForm)}
                className="bg-autumn-orange/10 text-autumn-orange hover:bg-autumn-orange hover:text-white border border-autumn-orange transition-all px-4 py-2 rounded-lg flex items-center gap-2 font-bold"
              >
                  <Plus size={18} /> Add Event
              </button>
          </div>

          {showEventForm && (
              <form onSubmit={handleCreateEvent} className="bg-white/5 p-6 rounded-xl border border-white/10 animate-in fade-in slide-in-from-top-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input 
                        type="text" placeholder="Event Title" required
                        className="bg-black/50 border border-white/20 rounded p-3 text-white focus:border-autumn-orange outline-none"
                        value={newEvent.title || ''} onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                      />
                      <input 
                        type="date" required
                        className="bg-black/50 border border-white/20 rounded p-3 text-white focus:border-autumn-orange outline-none"
                        value={newEvent.date || ''} onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                      />
                      <input 
                        type="text" placeholder="Location"
                        className="bg-black/50 border border-white/20 rounded p-3 text-white focus:border-autumn-orange outline-none"
                        value={newEvent.location || ''} onChange={e => setNewEvent({...newEvent, location: e.target.value})}
                      />
                      <input 
                        type="text" placeholder="Image URL (Optional)"
                        className="bg-black/50 border border-white/20 rounded p-3 text-white focus:border-autumn-orange outline-none"
                        value={newEvent.imageUrl || ''} onChange={e => setNewEvent({...newEvent, imageUrl: e.target.value})}
                      />
                      <input 
                        type="text" placeholder="Google Maps Link (Optional)"
                        className="bg-black/50 border border-white/20 rounded p-3 text-white focus:border-autumn-orange outline-none"
                        value={newEvent.googleMapsLink || ''} onChange={e => setNewEvent({...newEvent, googleMapsLink: e.target.value})}
                      />
                  </div>
                  <textarea 
                    placeholder="Description"
                    className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-autumn-orange outline-none mb-4 h-24"
                    value={newEvent.description || ''} onChange={e => setNewEvent({...newEvent, description: e.target.value})}
                  />
                  <div className="flex justify-end gap-2">
                      <button type="button" onClick={() => setShowEventForm(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                      <button type="submit" className="px-6 py-2 bg-autumn-orange text-white font-bold rounded hover:bg-autumn-red transition-colors">Save Event</button>
                  </div>
              </form>
          )}

          <div className="grid grid-cols-1 gap-4">
              {events.map(event => (
                  <div key={event.id} className="group relative overflow-hidden rounded-xl bg-autumn-card border border-white/5 flex flex-col md:flex-row h-auto md:h-32 shadow-md">
                      <div className="md:w-48 h-32 md:h-full bg-cover bg-center" style={{ backgroundImage: `url(${event.imageUrl})` }}>
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-center">
                          <h3 className="text-xl font-bold text-white">{event.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                              <span className="flex items-center gap-1"><Calendar size={14} /> {event.date}</span>
                              <span className="flex items-center gap-1"><Users size={14} /> {event.location}</span>
                          </div>
                          <p className="text-gray-500 text-sm mt-2 line-clamp-1">{event.description}</p>
                      </div>
                      <div className="p-4 flex items-center justify-end">
                          <button onClick={() => handleDeleteEvent(event.id)} className="text-gray-500 hover:text-red-500 transition-colors p-2">
                              <Trash2 size={20} />
                          </button>
                      </div>
                  </div>
              ))}
          </div>
      </div>
  );

  return (
    <div className="flex h-screen bg-autumn-bg text-white overflow-hidden font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-black/50 backdrop-blur-md border-r border-white/10 hidden md:flex flex-col">
        <div className="p-8">
          <div className="flex items-center gap-2 mb-1">
             <span className="text-2xl">🍁</span>
             <h1 className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-autumn-red to-autumn-gold">
               AUTUMN
             </h1>
          </div>
          <p className="text-xs text-gray-500 tracking-[0.3em] pl-8">WINDS</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {[
            { id: 'overview', icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'events', icon: Calendar, label: 'Events' },
            { id: 'bookings', icon: DollarSign, label: 'Bookings' },
            { id: 'requests', icon: Mic2, label: 'Song Requests' },
            { id: 'music', icon: Disc, label: 'Music Library' },
            { id: 'setlists', icon: Music, label: 'Setlists' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id 
                ? 'bg-autumn-red/10 text-autumn-red border border-autumn-red/50 shadow-[0_0_10px_rgba(139,30,30,0.2)]' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-autumn-red to-autumn-gold border border-white/10"></div>
             <div>
                 <p className="text-sm font-bold text-white">Band Manager</p>
                 <p className="text-xs text-gray-500">Admin</p>
             </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 relative bg-wood-pattern">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-0 w-full h-96 bg-autumn-red/5 blur-[100px] pointer-events-none -z-10"></div>
          
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'events' && renderEvents()}
          {activeTab === 'bookings' && renderBookings()}
          {activeTab === 'requests' && renderRequests()}
          {activeTab === 'music' && renderLibrary()}
          {activeTab === 'setlists' && renderSetlists()}
      </div>
    </div>
  );
};

export default AdminDashboard;