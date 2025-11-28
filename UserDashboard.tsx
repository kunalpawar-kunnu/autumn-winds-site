
import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Play, Star, ArrowRight, Mic2, X, Instagram, Phone, Music, Loader2, Info, Map, Trophy, Radio, Building2, User, ChevronDown, ChevronUp, Sun, Moon } from 'lucide-react';
import { Song, Event, Booking, SongRequest } from '../types';
import { db } from '../services/db';
import { SEED_AWARDS, SEED_CITIES_VENUES } from '../constants';

interface UserDashboardProps {
  onPlaySong: (song: Song) => void;
  currentSong: Song | null;
  isPlaying: boolean;
}

const BAND_MEMBERS = [
  {
    name: "Pratyancha Dhore",
    role: "Singer",
    image: "https://images.unsplash.com/photo-1606509939527-37651a1460c5?auto=format&fit=crop&q=80&w=400&h=450", // Female with glasses/casual
    instagram: "https://instagram.com/pratyancha_dhore",
    whatsapp: "https://wa.me/917620157862"
  },
  {
    name: "Sukruth Shankar",
    role: "Drummer",
    image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&q=80&w=400&h=450", // Drummer
    instagram: "https://instagram.com/sukishankar",
    whatsapp: "https://wa.me/919008177367"
  },
  {
    name: "Chaitanya Parulekar",
    role: "Bassist",
    image: "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&q=80&w=400&h=450", // Bassist/Guitarist
    instagram: "https://instagram.com/chaitanyaparulekar129",
    whatsapp: "https://wa.me/917715887399"
  },
  {
    name: "Yash Wadhwe",
    role: "Guitarist",
    image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=400&h=450", // Curly hair / Guitarist vibe
    instagram: "https://instagram.com/yazh_typ1cal",
    whatsapp: "https://wa.me/13158789986"
  },
  {
    name: "Kunal Pawar",
    role: "Singer",
    image: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&q=80&w=400&h=450", // Male Singer with Mic
    instagram: "#",
    whatsapp: "https://wa.me/8169442087"
  }
];

const UserDashboard: React.FC<UserDashboardProps> = ({ onPlaySong, currentSong, isPlaying }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'music' | 'events'>('home');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showAwardsModal, setShowAwardsModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  
  // New State for Show Details
  const [selectedShow, setSelectedShow] = useState<Event | null>(null);
  
  // Event History State
  const [expandedYear, setExpandedYear] = useState<string | null>('2024');

  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Auto-scroll ref
  const bandScrollRef = useRef<HTMLDivElement>(null);

  // Data
  const [songs, setSongs] = useState<Song[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
      name: '', email: '', date: '', details: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);

  // Request Form State
  const [requestForm, setRequestForm] = useState({
      song: '', artist: '', message: ''
  });
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        try {
            const [s, e] = await Promise.all([db.songs.list(), db.events.list()]);
            setSongs(s);
            setEvents(e);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    fetchData();
  }, []);

  // Auto-Scroll Effect for Band Section
  useEffect(() => {
    if (activeTab === 'home') {
      const interval = setInterval(() => {
        if (bandScrollRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = bandScrollRef.current;
          // If we reached the end, loop back
          if (scrollLeft + clientWidth >= scrollWidth - 10) {
            bandScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            bandScrollRef.current.scrollBy({ left: 280, behavior: 'smooth' });
          }
        }
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmittingBooking(true);
      const newBooking: Booking = {
          id: `b_${Date.now()}`,
          clientName: bookingForm.name,
          email: bookingForm.email,
          date: bookingForm.date,
          details: bookingForm.details,
          budget: 'TBD',
          eventType: 'Inquiry',
          status: 'pending'
      };
      
      await db.bookings.create(newBooking);
      setBookingSuccess(true);
      setIsSubmittingBooking(false);
      
      setTimeout(() => {
          setShowBookingModal(false);
          setBookingSuccess(false);
          setBookingForm({ name: '', email: '', date: '', details: '' });
      }, 2000);
  };

  const handleRequestSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if(!selectedEventId) return;

      setIsSubmittingRequest(true);
      const newRequest: SongRequest = {
          id: `r_${Date.now()}`,
          songTitle: requestForm.song,
          artistName: requestForm.artist,
          userMessage: requestForm.message,
          eventId: selectedEventId,
          status: 'pending'
      };

      await db.requests.create(newRequest);
      setRequestSuccess(true);
      setIsSubmittingRequest(false);

      setTimeout(() => {
          setShowRequestModal(false);
          setRequestSuccess(false);
          setRequestForm({ song: '', artist: '', message: '' });
          setSelectedEventId('');
      }, 2000);
  };

  const openRequestModal = (eventId: string = '') => {
      setSelectedEventId(eventId);
      setShowRequestModal(true);
  };

  const handleVenueClick = (event: Event) => {
      setSelectedShow(event);
  }

  const toggleYear = (year: string) => {
    setExpandedYear(expandedYear === year ? null : year);
  }

  if (loading) {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-autumn-bg text-autumn-gold">
            <Loader2 size={48} className="animate-spin" />
        </div>
    );
  }

  // Theme Wrapper
  // Default is Dark (isDarkMode=true). If false, apply warm orange gradient override.
  const themeClass = isDarkMode ? 'bg-autumn-bg text-white' : 'bg-gradient-to-br from-[#FFB26B] to-[#FF914D] text-[#2B1B12]';
  const cardClass = isDarkMode ? 'bg-autumn-card border-white/5' : 'bg-[#FFF5EB] border-[#C06C47]/10 shadow-lg text-[#2B1B12]';
  const textPrimary = isDarkMode ? 'text-white' : 'text-[#2B1B12]';
  const textSecondary = isDarkMode ? 'text-gray-400' : 'text-[#3a2c26]';
  const navClass = isDarkMode ? 'bg-autumn-bg/90' : 'bg-[#FF914D]/90';

  const renderHero = () => (
    <div className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
      {/* Animated Particles */}
      <div className="particles">
        <div className="particle" style={{ left: '10%', animationDuration: '9s' }}></div>
        <div className="particle" style={{ left: '40%', animationDuration: '11s' }}></div>
        <div className="particle" style={{ left: '70%', animationDuration: '13s' }}></div>
        <div className="particle" style={{ left: '90%', animationDuration: '10s' }}></div>
        <div className="particle" style={{ left: '25%', animationDuration: '14s' }}></div>
      </div>

      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <img 
            src="https://images.unsplash.com/photo-1508710903995-12a8f8313395?q=80&w=2670&auto=format&fit=crop" 
            alt="Autumn Leaves Background" 
            className="w-full h-full object-cover opacity-50 mix-blend-overlay"
         />
         <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-t from-autumn-bg via-autumn-bg/80 to-transparent' : 'bg-gradient-to-t from-[#FF914D] via-transparent to-transparent'}`}></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        <div className="mb-6 animate-float">
             <span className="text-6xl">🍁</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 tracking-tight drop-shadow-2xl animate-in slide-in-from-bottom-10 duration-1000">
          Autumn <span className="text-transparent bg-clip-text bg-gradient-to-r from-autumn-red via-autumn-orange to-autumn-gold">Winds</span>
        </h1>

        <div className={`${isDarkMode ? 'bg-black/30 text-gray-200' : 'bg-white/20 text-[#2B1B12]'} backdrop-blur-sm p-8 rounded-2xl border border-autumn-gold/10 mb-10 max-w-3xl`}>
            <p className="text-xl md:text-2xl font-display italic leading-relaxed">
              "Autumn is more of an emotion than a season. You can consider Autumn winds as a metaphor... 
              We believe in hope.. And for us Autumn winds is Music..." 🎼
            </p>
            <div className="h-px w-24 bg-autumn-gold/50 mx-auto mt-6"></div>
        </div>

        {/* Stats Section */}
        <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className={`${cardClass} backdrop-blur-md p-4 rounded-xl flex flex-col items-center justify-center text-center transform hover:scale-105 transition-transform hover:border-autumn-gold/30`}>
                <Music className="mb-2 text-autumn-gold" size={24} />
                <span className={`text-2xl font-bold font-display ${textPrimary}`}>{songs.length}</span>
                <span className={`text-xs uppercase tracking-wider ${textSecondary}`}>Total Songs</span>
            </div>
            
            <div className={`${cardClass} backdrop-blur-md p-4 rounded-xl flex flex-col items-center justify-center text-center transform hover:scale-105 transition-transform hover:border-autumn-orange/30`}>
                <span className="mb-2 text-2xl">🍂</span>
                <span className={`text-2xl font-bold font-display ${textPrimary}`}>8 Years</span>
                <span className={`text-xs uppercase tracking-wider ${textSecondary}`}>Est. 2016</span>
            </div>

            <button 
                onClick={() => setShowHistoryModal(true)}
                className={`${cardClass} backdrop-blur-md p-4 rounded-xl flex flex-col items-center justify-center text-center transform hover:scale-105 transition-all hover:bg-autumn-red/10 hover:border-autumn-red/50 cursor-pointer`}
            >
                <Radio className="mb-2 text-autumn-red" size={24} />
                <span className={`text-2xl font-bold font-display ${textPrimary}`}>190+ Gigs</span>
                <span className="text-[10px] text-autumn-gold/80 mt-1 uppercase tracking-wide">in 7+ Cities</span>
            </button>

            <button 
                onClick={() => setShowAwardsModal(true)}
                className={`${cardClass} backdrop-blur-md p-4 rounded-xl flex flex-col items-center justify-center text-center transform hover:scale-105 transition-all hover:bg-yellow-400/10 hover:border-yellow-400/50 cursor-pointer`}
            >
                <Trophy className="mb-2 text-yellow-400" size={24} />
                <span className={`text-2xl font-bold font-display ${textPrimary}`}>30+</span>
                <span className={`text-xs uppercase tracking-wider ${textSecondary}`}>Music Awards</span>
            </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button 
            onClick={() => setActiveTab('events')}
            className="px-8 py-4 bg-autumn-red text-white font-bold rounded-lg hover:bg-autumn-orange transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(139,30,30,0.4)] flex items-center gap-2 border border-autumn-red/50"
          >
            <Calendar size={20} /> See Tour Dates
          </button>
          <button 
            onClick={() => setShowBookingModal(true)}
            className={`px-8 py-4 bg-transparent border-2 border-autumn-gold/50 text-autumn-gold font-bold rounded-lg hover:bg-autumn-gold hover:text-black transition-all transform hover:scale-105 flex items-center gap-2 ${!isDarkMode && 'border-white text-white hover:text-[#2B1B12]'}`}
          >
            <Star size={20} /> Book The Band
          </button>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6">
            <a href="https://www.instagram.com/autumnwinds_music/" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 transition-colors group ${isDarkMode ? 'text-gray-400 hover:text-pink-500' : 'text-[#2B1B12] hover:text-pink-600'}`}>
                <div className="p-3 rounded-full bg-white/5 group-hover:bg-pink-500/10 border border-white/10 group-hover:border-pink-500/50 transition-all">
                    <Instagram size={24} />
                </div>
                <span className="hidden md:inline font-medium">@autumnwinds_music</span>
            </a>
            <a href="https://wa.me/?text=Hi%20Autumn%20Winds,%20I%20would%20like%20to%20know%20more..." target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 transition-colors group ${isDarkMode ? 'text-gray-400 hover:text-green-500' : 'text-[#2B1B12] hover:text-green-600'}`}>
                <div className="p-3 rounded-full bg-white/5 group-hover:bg-green-500/10 border border-white/10 group-hover:border-green-500/50 transition-all">
                    <Phone size={24} />
                </div>
                <span className="hidden md:inline font-medium">WhatsApp Us</span>
            </a>
        </div>
      </div>
    </div>
  );

  const renderBand = () => (
    <section className="py-20 relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-autumn-red/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4">
        <h2 className={`text-4xl md:text-5xl font-display font-bold text-center mb-16 animate-in fade-in duration-700 ${textPrimary}`}>
          Meet the Band – <span className="text-transparent bg-clip-text bg-gradient-to-r from-autumn-orange to-autumn-gold">Autumn Winds</span>
        </h2>

        {/* Auto Scrolling Container */}
        <div ref={bandScrollRef} className="flex gap-8 overflow-x-auto pb-12 snap-x scrollbar-hide px-4 md:justify-center band-scroll">
          {BAND_MEMBERS.map((member, index) => (
            <div 
              key={index} 
              className={`min-w-[280px] w-[280px] ${cardClass} p-6 rounded-2xl border hover:border-autumn-orange/50 transition-all duration-300 hover:-translate-y-2 snap-center shadow-xl group`}
            >
              <div className="p-1 rounded-xl bg-gradient-to-br from-autumn-red via-autumn-orange to-autumn-gold mb-6 group-hover:rotate-1 transition-transform">
                <div className="overflow-hidden rounded-lg aspect-[4/5]">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                  />
                </div>
              </div>
              
              <div className="text-center">
                <h3 className={`text-2xl font-display font-bold mb-1 group-hover:text-autumn-gold transition-colors ${textPrimary}`}>{member.name}</h3>
                <p className="text-autumn-orange uppercase tracking-widest text-xs font-bold mb-6">{member.role}</p>
                
                <div className="flex justify-center gap-4">
                  <a 
                    href={member.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-pink-500 hover:bg-pink-500/10 transition-all"
                  >
                    <Instagram size={20} />
                  </a>
                  <a 
                    href={member.whatsapp} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-green-500 hover:bg-green-500/10 transition-all"
                  >
                    <Phone size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderMusic = () => (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="flex justify-between items-end mb-10">
        <div>
            <h2 className={`text-4xl font-display font-bold ${textPrimary} mb-2 pl-6 border-l-4 border-autumn-gold`}>Latest Releases</h2>
            <p className={`${textSecondary} pl-7 italic`}>Melodies carried by the wind. <span className="text-autumn-gold font-bold">({songs.length} Tracks)</span></p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {songs.map((song, index) => (
          <div 
            key={song.id} 
            className={`group flex items-center justify-between p-4 rounded-xl ${isDarkMode ? 'bg-autumn-card/50 hover:bg-autumn-card border-white/5' : 'bg-[#FFF5EB] hover:bg-white border-[#C06C47]/10'} border hover:border-autumn-gold/30 transition-all cursor-pointer shadow-lg`}
            onClick={() => onPlaySong(song)}
          >
            <div className="flex items-center gap-6">
              <span className="text-autumn-gold font-display text-xl w-8">{index + 1}</span>
              <div className="relative w-16 h-16 rounded-lg overflow-hidden shadow-lg">
                  <img src={song.albumArt} alt={song.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0" />
                  <div className={`absolute inset-0 bg-black/50 flex items-center justify-center ${currentSong?.id === song.id && isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                      <Play size={24} className="text-autumn-gold fill-autumn-gold" />
                  </div>
              </div>
              <div>
                <h3 className={`text-xl font-display font-bold ${currentSong?.id === song.id ? 'text-autumn-gold' : textPrimary}`}>{song.title}</h3>
                <p className={`${textSecondary} text-sm font-light tracking-wide`}>{song.artist}</p>
              </div>
            </div>
            <div className="flex items-center gap-8">
                <span className="hidden md:block text-xs uppercase tracking-wider text-autumn-orange/80 border border-autumn-orange/20 px-2 py-1 rounded bg-autumn-orange/5">{song.genre}</span>
                <span className="text-gray-500 font-mono text-sm">{song.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEvents = () => {
    // Separate Upcoming and Past
    const upcoming = events.filter(e => e.status === 'upcoming');
    const past = events.filter(e => e.status === 'past');

    // Group Past Events by Year
    const eventsByYear: Record<string, Event[]> = {};
    past.forEach(e => {
      const year = new Date(e.date).getFullYear().toString();
      if (!eventsByYear[year]) eventsByYear[year] = [];
      eventsByYear[year].push(e);
    });
    
    // Sort years descending
    const sortedYears = Object.keys(eventsByYear).sort((a, b) => Number(b) - Number(a));

    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
          
          {/* UPCOMING SECTION */}
          <div className="mb-16">
              <div className="mb-10">
                  <h2 className={`text-4xl font-display font-bold ${textPrimary} mb-2 pl-6 border-l-4 border-autumn-red`}>Upcoming Tours</h2>
                  <p className={`${textSecondary} pl-7 italic`}>Join us where the leaves fall. <span className="text-autumn-red font-bold">({upcoming.length} Shows Announced)</span></p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {upcoming.map(event => (
                      <div key={event.id} className={`${cardClass} rounded-xl overflow-hidden border hover:border-autumn-red/50 transition-all hover:-translate-y-2 duration-300 shadow-2xl group flex flex-col`}>
                          <div className="h-56 bg-cover bg-center relative overflow-hidden">
                              <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                              <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-autumn-card' : 'from-[#FFF5EB]'} via-transparent to-transparent`}></div>
                              <div className="absolute top-4 right-4 bg-autumn-red/90 text-white px-3 py-1 rounded text-sm font-bold border border-white/10 shadow-lg font-display">
                                  {new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                              </div>
                          </div>
                          <div className="p-6 relative flex-1 flex flex-col">
                              <h3 className={`text-2xl font-display font-bold ${textPrimary} mb-2 cursor-pointer hover:text-autumn-orange transition-colors`} onClick={() => handleVenueClick(event)}>{event.title}</h3>
                              <div className="flex items-center gap-2 text-autumn-light/70 mb-4 text-sm font-bold text-autumn-orange">
                                  <MapPin size={16} />
                                  {event.location}
                              </div>
                              <p className={`${textSecondary} text-sm mb-6 line-clamp-2 flex-1`}>{event.description}</p>
                              <div className="flex gap-3">
                                <button onClick={() => handleVenueClick(event)} className="flex-1 py-3 bg-white/5 hover:bg-autumn-gold hover:text-black border border-autumn-gold/30 text-autumn-gold font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                                    Details <Info size={16} />
                                </button>
                                <button onClick={() => openRequestModal(event.id)} className="px-4 py-3 bg-white/5 hover:bg-autumn-red hover:text-white border border-autumn-red/30 text-autumn-red rounded-lg transition-colors" title="Request a song">
                                    <Mic2 size={20} />
                                </button>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* HISTORY SECTION */}
          <div>
            <div className="mb-10">
                <h2 className={`text-4xl font-display font-bold ${textPrimary} mb-2 pl-6 border-l-4 border-gray-600`}>Performance Archive</h2>
                <p className={`${textSecondary} pl-7 italic`}>A timeline of our journey from 2016 to today.</p>
            </div>

            <div className="space-y-4">
              {sortedYears.map(year => (
                <div key={year} className={`${cardClass} border rounded-xl overflow-hidden`}>
                  <button 
                    onClick={() => toggleYear(year)}
                    className="w-full flex items-center justify-between p-6 bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl font-display font-bold text-autumn-gold">{year}</span>
                      <span className="text-sm text-gray-500 uppercase tracking-wider">{eventsByYear[year].length} Shows</span>
                    </div>
                    {expandedYear === year ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                  </button>
                  
                  {expandedYear === year && (
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in slide-in-from-top-4">
                      {eventsByYear[year].map(event => (
                        <div key={event.id} className="p-4 bg-black/20 rounded-lg border border-white/5 hover:border-autumn-gold/20 transition-colors">
                          <p className="text-autumn-orange text-xs font-bold mb-1">
                             {new Date(event.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
                          </p>
                          <h4 className="text-white font-bold mb-1 truncate" title={event.title}>{event.title}</h4>
                          <p className="text-gray-500 text-xs truncate">{event.location}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen pb-24 transition-colors duration-500 ${themeClass}`}>
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-40 backdrop-blur-md border-b border-white/5 shadow-lg ${navClass}`}>
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('home')}>
             <div className="text-2xl group-hover:rotate-12 transition-transform">🍁</div>
             <div className="flex flex-col">
                <span className={`font-display font-bold text-xl tracking-wider leading-none ${isDarkMode ? 'text-white' : 'text-[#2B1B12]'}`}>AUTUMN</span>
                <span className={`font-sans text-xs tracking-[0.3em] ${isDarkMode ? 'text-autumn-gold' : 'text-white'}`}>WINDS</span>
             </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => setActiveTab('home')} className={`text-sm font-bold uppercase tracking-widest hover:text-autumn-gold transition-colors ${activeTab === 'home' ? 'text-autumn-gold' : (isDarkMode ? 'text-gray-500' : 'text-[#2B1B12]/60')}`}>Home</button>
            <button onClick={() => setActiveTab('music')} className={`text-sm font-bold uppercase tracking-widest hover:text-autumn-gold transition-colors ${activeTab === 'music' ? 'text-autumn-gold' : (isDarkMode ? 'text-gray-500' : 'text-[#2B1B12]/60')}`}>Music</button>
            <button onClick={() => setActiveTab('events')} className={`text-sm font-bold uppercase tracking-widest hover:text-autumn-gold transition-colors ${activeTab === 'events' ? 'text-autumn-gold' : (isDarkMode ? 'text-gray-500' : 'text-[#2B1B12]/60')}`}>Events</button>
            
            {/* Dark Mode Toggle */}
            <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full transition-all ${isDarkMode ? 'bg-white/10 text-yellow-400' : 'bg-[#2B1B12]/10 text-[#2B1B12]'}`}
                title="Toggle Theme"
            >
                {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
          <button onClick={() => setShowBookingModal(true)} className="bg-gradient-to-r from-autumn-red to-autumn-orange text-white px-6 py-2 rounded-full font-bold hover:brightness-110 transition-all shadow-[0_0_15px_rgba(200,90,23,0.3)]">Book Us</button>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-20">
          {activeTab === 'home' && (
            <>
              {renderHero()}
              {renderBand()}
            </>
          )}
          {activeTab === 'music' && renderMusic()}
          {activeTab === 'events' && renderEvents()}
      </div>

      {/* Awards Modal */}
      {showAwardsModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
              <div className={`${cardClass} w-full max-w-2xl rounded-xl border border-yellow-500/30 shadow-[0_0_40px_rgba(212,175,55,0.1)] p-8 relative animate-in fade-in zoom-in-95 duration-300 max-h-[80vh] overflow-y-auto custom-scrollbar`}>
                  <button onClick={() => setShowAwardsModal(false)} className={`absolute top-4 right-4 transition-colors ${textSecondary} hover:text-autumn-red`}>
                      <X size={24} />
                  </button>
                  <div className="text-center mb-8">
                      <Trophy className="mx-auto text-yellow-400 mb-4 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" size={48} />
                      <h3 className={`text-3xl font-display font-bold ${textPrimary} mb-2`}>Hall of Fame</h3>
                      <p className={textSecondary}>Celebrating excellence in independent music.</p>
                  </div>
                  <div className="grid gap-3">
                      {SEED_AWARDS.map((award, index) => (
                          <div key={index} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/5 hover:border-yellow-500/30 hover:bg-yellow-500/5 transition-all group">
                              <span className="text-autumn-gold font-bold font-display text-lg w-8">#{index + 1}</span>
                              <div className="flex-1">
                                  <span className={`${isDarkMode ? 'text-gray-200 group-hover:text-white' : 'text-[#2B1B12]'} transition-colors`}>{award}</span>
                              </div>
                              <Star size={16} className="text-gray-600 group-hover:text-yellow-400 transition-colors" />
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      )}

      {/* Cities & Venues Modal */}
      {showHistoryModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
              <div className={`${cardClass} w-full max-w-4xl rounded-xl border border-autumn-red/30 shadow-[0_0_40px_rgba(139,30,30,0.1)] p-8 relative animate-in fade-in zoom-in-95 duration-300 max-h-[85vh] overflow-y-auto custom-scrollbar`}>
                  <button onClick={() => setShowHistoryModal(false)} className={`absolute top-4 right-4 transition-colors ${textSecondary} hover:text-autumn-red`}>
                      <X size={24} />
                  </button>
                  <div className="text-center mb-10">
                      <MapPin className="mx-auto text-autumn-red mb-4 drop-shadow-[0_0_15px_rgba(139,30,30,0.5)]" size={48} />
                      <h3 className={`text-3xl font-display font-bold ${textPrimary} mb-2`}>Tour History</h3>
                      <p className={textSecondary}>Venues we've conquered across 7+ cities.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {Object.entries(SEED_CITIES_VENUES).map(([city, venues]) => (
                          <div key={city} className="bg-black/30 rounded-lg p-5 border border-white/5 hover:border-autumn-red/40 transition-all hover:-translate-y-1">
                              <div className="flex items-center gap-2 mb-4">
                                  <Building2 size={20} className="text-autumn-orange" />
                                  <h4 className="text-xl font-display font-bold text-white">{city}</h4>
                              </div>
                              <ul className="space-y-2">
                                  {venues.map((venue, idx) => (
                                      <li key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                                          <span className="w-1.5 h-1.5 rounded-full bg-autumn-gold mt-1.5 shrink-0"></span>
                                          {venue}
                                      </li>
                                  ))}
                              </ul>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
              <div className={`${cardClass} w-full max-w-lg rounded-xl border border-autumn-gold/20 shadow-2xl p-8 relative animate-in fade-in zoom-in-95 duration-300`}>
                  <button onClick={() => setShowBookingModal(false)} className={`absolute top-4 right-4 transition-colors ${textSecondary} hover:text-autumn-red`}>
                      <X size={24} />
                  </button>
                  
                  {bookingSuccess ? (
                      <div className="text-center py-10">
                          <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                              <Star size={32} fill="currentColor" />
                          </div>
                          <h3 className={`text-2xl font-display font-bold ${textPrimary} mb-2`}>Request Received</h3>
                          <p className={textSecondary}>Thank you for believing in hope. We will contact you soon.</p>
                      </div>
                  ) : (
                    <>
                        <h3 className={`text-3xl font-display font-bold ${textPrimary} mb-1`}>Book Autumn Winds</h3>
                        <p className={`${textSecondary} mb-6 text-sm italic`}>"Autumn is more of an emotion than a season..."</p>
                        <form onSubmit={handleBookingSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-autumn-gold uppercase mb-1">Your Name</label>
                                <input required value={bookingForm.name} onChange={e => setBookingForm({...bookingForm, name: e.target.value})} type="text" className="w-full bg-black/40 border border-white/10 rounded p-3 text-white focus:border-autumn-gold outline-none transition-colors" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-autumn-gold uppercase mb-1">Email Address</label>
                                <input required value={bookingForm.email} onChange={e => setBookingForm({...bookingForm, email: e.target.value})} type="email" className="w-full bg-black/40 border border-white/10 rounded p-3 text-white focus:border-autumn-gold outline-none transition-colors" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-autumn-gold uppercase mb-1">Event Date</label>
                                <input required value={bookingForm.date} onChange={e => setBookingForm({...bookingForm, date: e.target.value})} type="date" className="w-full bg-black/40 border border-white/10 rounded p-3 text-white focus:border-autumn-gold outline-none transition-colors" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-autumn-gold uppercase mb-1">Details & Vibe</label>
                                <textarea required value={bookingForm.details} onChange={e => setBookingForm({...bookingForm, details: e.target.value})} rows={3} className="w-full bg-black/40 border border-white/10 rounded p-3 text-white focus:border-autumn-gold outline-none transition-colors" placeholder="Tell us about the atmosphere you want to create..."></textarea>
                            </div>
                            <button disabled={isSubmittingBooking} type="submit" className="w-full py-4 bg-gradient-to-r from-autumn-red to-autumn-orange text-white font-bold rounded-lg hover:brightness-110 transition-all shadow-lg shadow-autumn-red/20 border border-white/10 flex justify-center">
                                {isSubmittingBooking ? <Loader2 className="animate-spin" /> : 'Send Inquiry'}
                            </button>
                            <p className="text-center text-xs text-gray-500 mt-4">Or contact us at autumnwinds.music101@gmail.com</p>
                        </form>
                    </>
                  )}
              </div>
          </div>
      )}

      {/* Song Request Modal */}
      {showRequestModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
              <div className={`${cardClass} w-full max-w-lg rounded-xl border border-autumn-gold/20 shadow-2xl p-8 relative animate-in fade-in zoom-in-95 duration-300`}>
                  <button onClick={() => setShowRequestModal(false)} className={`absolute top-4 right-4 transition-colors ${textSecondary} hover:text-autumn-red`}>
                      <X size={24} />
                  </button>
                  
                  {requestSuccess ? (
                      <div className="text-center py-10">
                          <div className="w-16 h-16 bg-autumn-gold/20 text-autumn-gold rounded-full flex items-center justify-center mx-auto mb-4 border border-autumn-gold/30">
                              <Music size={32} />
                          </div>
                          <h3 className={`text-2xl font-display font-bold ${textPrimary} mb-2`}>Request Sent</h3>
                          <p className={textSecondary}>Your song has been whispered to the winds.</p>
                      </div>
                  ) : (
                    <>
                        <h3 className={`text-3xl font-display font-bold ${textPrimary} mb-1`}>Request a Song</h3>
                        <p className={`${textSecondary} mb-6 text-sm`}>
                            For: <span className="text-autumn-gold">{events.find(e => e.id === selectedEventId)?.title || 'Upcoming Event'}</span>
                        </p>
                        <form onSubmit={handleRequestSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-autumn-gold uppercase mb-1">Song Title</label>
                                    <input required value={requestForm.song} onChange={e => setRequestForm({...requestForm, song: e.target.value})} type="text" className="w-full bg-black/40 border border-white/10 rounded p-3 text-white focus:border-autumn-gold outline-none transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-autumn-gold uppercase mb-1">Artist</label>
                                    <input required value={requestForm.artist} onChange={e => setRequestForm({...requestForm, artist: e.target.value})} type="text" className="w-full bg-black/40 border border-white/10 rounded p-3 text-white focus:border-autumn-gold outline-none transition-colors" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-autumn-gold uppercase mb-1">Message (Optional)</label>
                                <textarea value={requestForm.message} onChange={e => setRequestForm({...requestForm, message: e.target.value})} rows={2} className="w-full bg-black/40 border border-white/10 rounded p-3 text-white focus:border-autumn-gold outline-none transition-colors" placeholder="Why does this song matter?"></textarea>
                            </div>
                            <button disabled={isSubmittingRequest} type="submit" className="w-full py-4 bg-gradient-to-r from-autumn-gold to-autumn-orange text-black font-bold rounded-lg hover:brightness-110 transition-all shadow-lg shadow-autumn-gold/20 flex justify-center">
                                {isSubmittingRequest ? <Loader2 className="animate-spin"/> : 'Submit Request'}
                            </button>
                        </form>
                    </>
                  )}
              </div>
          </div>
      )}

      {/* Event Details Modal */}
      {selectedShow && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <div className={`${cardClass} w-full max-w-lg rounded-xl border border-autumn-red/20 shadow-2xl p-0 relative animate-in fade-in zoom-in-95 duration-300 overflow-hidden`}>
                <button onClick={() => setSelectedShow(null)} className="absolute top-4 right-4 z-10 text-white bg-black/20 hover:bg-black/50 rounded-full p-1 transition-colors">
                    <X size={24} />
                </button>
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${selectedShow.imageUrl})` }}>
                    <div className={`h-full w-full bg-gradient-to-t ${isDarkMode ? 'from-autumn-card' : 'from-[#FFF5EB]'} to-transparent flex items-end p-6`}>
                        <h2 className={`text-3xl font-display font-bold ${textPrimary} leading-none`}>{selectedShow.title}</h2>
                    </div>
                </div>
                <div className="p-6">
                    <div className="flex items-center gap-2 text-autumn-gold font-bold mb-4">
                        <Calendar size={18} />
                        {new Date(selectedShow.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div className={`flex items-start gap-2 ${textSecondary} mb-6`}>
                        <MapPin size={18} className="mt-1 text-autumn-orange shrink-0" />
                        <span>{selectedShow.location}</span>
                    </div>
                    <p className={`${textSecondary} mb-8 leading-relaxed border-l-2 border-autumn-red pl-4`}>
                        {selectedShow.description}
                    </p>
                    
                    {selectedShow.googleMapsLink && (
                        <a 
                            href={selectedShow.googleMapsLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full py-4 bg-white/5 hover:bg-autumn-red hover:text-white text-autumn-red border border-autumn-red/30 rounded-lg transition-all flex items-center justify-center gap-2 font-bold group"
                        >
                            <Map size={20} className="group-hover:animate-bounce" />
                            View on Google Maps
                        </a>
                    )}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
