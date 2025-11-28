import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import MusicPlayer from "./components/MusicPlayer";
import { Role, Song } from './types';
import { Shield, User, Leaf } from 'lucide-react';

const App: React.FC = () => {
  const [role, setRole] = useState<Role>(null);
  
  // Shared Player State
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlaySong = (song: Song) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    // Mock Next Logic (Random for now)
    console.log("Next song");
  };

  const handlePrev = () => {
    // Mock Prev Logic
    console.log("Prev song");
  };

  // Login Screen
  if (!role) {
    return (
      <div className="min-h-screen bg-autumn-bg flex flex-col items-center justify-center relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-autumn-red/10 rounded-full blur-[100px] animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-autumn-gold/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '1s' }}></div>
        
        {/* Falling Leaves Effect (Simulated with simple div animations) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
           <div className="absolute top-0 left-[10%] text-autumn-red/20 text-4xl animate-leaf-fall">🍁</div>
           <div className="absolute top-0 left-[30%] text-autumn-gold/20 text-2xl animate-leaf-fall" style={{animationDelay: '2s'}}>🍁</div>
           <div className="absolute top-0 left-[70%] text-autumn-orange/20 text-3xl animate-leaf-fall" style={{animationDelay: '4s'}}>🍁</div>
        </div>

        <div className="z-10 text-center space-y-12">
          <div className="space-y-4 flex flex-col items-center">
            <div className="text-6xl mb-4 drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">🍁</div>
            <h1 className="text-7xl font-display font-bold text-white tracking-tight drop-shadow-lg">
              Autumn <span className="text-transparent bg-clip-text bg-gradient-to-r from-autumn-red via-autumn-orange to-autumn-gold">Winds</span>
            </h1>
            <p className="text-autumn-light/60 text-lg uppercase tracking-[0.2em] font-light">"Freedom has many names"</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <button 
              onClick={() => setRole('user')}
              className="group relative w-64 h-40 bg-autumn-card/50 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-autumn-card hover:border-autumn-gold/50 transition-all duration-500 flex flex-col items-center justify-center gap-4 hover:-translate-y-2 shadow-xl"
            >
              <div className="p-4 rounded-full bg-autumn-gold/10 text-autumn-gold group-hover:scale-110 transition-transform border border-autumn-gold/20">
                <User size={32} />
              </div>
              <span className="text-xl font-bold text-white font-display">Fan Portal</span>
            </button>

            <button 
              onClick={() => setRole('admin')}
              className="group relative w-64 h-40 bg-autumn-card/50 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-autumn-card hover:border-autumn-red/50 transition-all duration-500 flex flex-col items-center justify-center gap-4 hover:-translate-y-2 shadow-xl"
            >
              <div className="p-4 rounded-full bg-autumn-red/10 text-autumn-red group-hover:scale-110 transition-transform border border-autumn-red/20">
                <Shield size={32} />
              </div>
              <span className="text-xl font-bold text-white font-display">Admin Access</span>
            </button>
          </div>
        </div>
        
        <p className="absolute bottom-8 text-gray-600 text-xs tracking-widest">© 2024 Autumn Winds Music</p>
      </div>
    );
  }

  return (
    <>
      {role === 'admin' ? (
        <AdminDashboard 
          onPlaySong={handlePlaySong}
          currentSong={currentSong}
          isPlaying={isPlaying}
        />
      ) : (
        <UserDashboard 
            onPlaySong={handlePlaySong} 
            currentSong={currentSong} 
            isPlaying={isPlaying} 
        />
      )}
      
      {/* Shared Music Player Overlay */}
      <MusicPlayer 
        currentSong={currentSong} 
        isPlaying={isPlaying} 
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onNext={handleNext}
        onPrev={handlePrev}
      />

      {/* Role Switcher (Development Helper) */}
      <div className="fixed bottom-4 right-4 z-[100] group">
          <button 
            onClick={() => setRole(null)} 
            className="w-10 h-10 bg-black/50 backdrop-blur border border-white/20 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all shadow-lg"
            title="Switch Role"
          >
              <User size={16} />
          </button>
      </div>
    </>
  );
};

export default App;
