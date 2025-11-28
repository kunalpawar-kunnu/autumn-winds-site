import React from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music2 } from 'lucide-react';
import { Song } from '../types';

interface MusicPlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ currentSong, isPlaying, onPlayPause, onNext, onPrev }) => {
  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-autumn-card/95 backdrop-blur-xl border-t border-autumn-gold/20 p-4 z-50 animate-in slide-in-from-bottom duration-500 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Song Info */}
        <div className="flex items-center gap-4 w-1/3">
          <div className="relative group">
            <img src={currentSong.albumArt} alt={currentSong.title} className="w-16 h-16 rounded-md shadow-lg shadow-black/50 border border-white/5" />
            <div className="absolute inset-0 bg-black/30 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Music2 className="text-autumn-gold" size={20} />
            </div>
          </div>
          <div className="overflow-hidden">
            <h4 className="text-white font-display font-bold text-lg leading-tight truncate">{currentSong.title}</h4>
            <p className="text-autumn-gold/80 text-sm truncate">{currentSong.artist}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center w-1/3">
          <div className="flex items-center gap-6">
            <button onClick={onPrev} className="text-gray-400 hover:text-autumn-gold transition-colors">
              <SkipBack size={24} />
            </button>
            <button 
              onClick={onPlayPause}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-autumn-red to-autumn-orange flex items-center justify-center text-white shadow-lg shadow-autumn-red/30 hover:scale-105 transition-transform border border-autumn-gold/20"
            >
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
            </button>
            <button onClick={onNext} className="text-gray-400 hover:text-autumn-gold transition-colors">
              <SkipForward size={24} />
            </button>
          </div>
          <div className="w-full max-w-xs mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
             <div className="h-full bg-gradient-to-r from-autumn-gold to-autumn-red w-1/3 animate-pulse"></div>
          </div>
        </div>

        {/* Volume */}
        <div className="flex items-center justify-end gap-2 w-1/3 text-gray-400">
          <Volume2 size={20} />
          <div className="w-24 h-1 bg-white/10 rounded-full">
            <div className="h-full bg-gray-400 w-2/3 hover:bg-autumn-gold cursor-pointer transition-colors"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MusicPlayer;