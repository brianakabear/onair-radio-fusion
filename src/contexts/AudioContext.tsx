import React, { createContext, useContext, useRef, useState, useEffect } from 'react';

interface RadioStream {
  id: string;
  name: string;
  url: string;
  genre: string;
  description: string;
  bitrate: string;
}

interface TrackMetadata {
  title?: string;
  artist?: string;
  album?: string;
  artwork?: string;
}

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number[];
  currentStream: RadioStream | null;
  currentTrack: TrackMetadata | null;
  isLoading: boolean;
  audioRef: React.RefObject<HTMLAudioElement>;
  streams: RadioStream[];
  selectStream: (stream: RadioStream) => void;
  togglePlay: () => void;
  toggleMute: () => void;
  handleVolumeChange: (newVolume: number[]) => void;
  getStreamMetadata: (streamId: string) => TrackMetadata | null;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

const defaultStreams: RadioStream[] = [
  {
    id: '1',
    name: 'Link Up Radio Main',
    url: 'https://c2.radioboss.fm:8967/stream',
    genre: 'Caribbean Mix',
    description: 'Main Caribbean music stream featuring reggae, dancehall, soca, and more',
    bitrate: '128 kbps'
  },
  {
    id: '2',
    name: 'Reggae Vibes',
    url: 'https://streams.radio.co/s2c5c4c5c4/listen',
    genre: 'Reggae',
    description: 'Pure reggae classics and modern hits',
    bitrate: '320 kbps'
  },
  {
    id: '3',
    name: 'Dancehall Heat',
    url: 'https://streams.radio.co/s8b9c1d2e3/listen',
    genre: 'Dancehall',
    description: 'Latest dancehall bangers and underground hits',
    bitrate: '256 kbps'
  },
  {
    id: '4',
    name: 'BrianAkaBear Radio',
    url: 'https://cast1.my-control-panel.com/proxy/bandoradio/stream',
    genre: 'Beats & Music',
    description: 'Beats and Music By Brian',
    bitrate: '128 kbps'
  }
];

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([0.7]);
  const [currentStream, setCurrentStream] = useState<RadioStream>(defaultStreams[0]);
  const [currentTrack, setCurrentTrack] = useState<TrackMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [streamMetadata, setStreamMetadata] = useState<Record<string, TrackMetadata>>({});
  
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0];
      
      // Add metadata event listeners
      const audio = audioRef.current;
      
      const handleMetadata = () => {
        // Try to extract metadata from the stream
        if (audio.duration && !isNaN(audio.duration)) {
          // For live streams, duration is usually Infinity or NaN
          // We can try to get metadata from other sources
        }
      };

      const handleLoadedMetadata = () => {
        // This fires when metadata is loaded
        setCurrentTrack(null); // Reset for live streams
      };

      // Listen for title changes in the stream (if supported)
      const handleTitleUpdate = (event: any) => {
        if (event.target && event.target.title) {
          const title = event.target.title;
          // Parse common formats like "Artist - Title"
          const parts = title.split(' - ');
          let trackData: TrackMetadata;
          
          if (parts.length >= 2) {
            trackData = {
              artist: parts[0].trim(),
              title: parts.slice(1).join(' - ').trim()
            };
          } else {
            trackData = {
              title: title.trim()
            };
          }
          
          setCurrentTrack(trackData);
          // Store metadata for the current stream
          if (currentStream) {
            setStreamMetadata(prev => ({
              ...prev,
              [currentStream.id]: trackData
            }));
          }
        }
      };

      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('metadata', handleMetadata);
      
      // Some streams provide metadata through custom events
      audio.addEventListener('titlechange', handleTitleUpdate);
      
      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('metadata', handleMetadata);
        audio.removeEventListener('titlechange', handleTitleUpdate);
      };
    }
  }, [volume]);

  const selectStream = (stream: RadioStream) => {
    if (audioRef.current && stream.id !== currentStream?.id) {
      setIsLoading(true);
      setCurrentTrack(null); // Reset metadata when changing streams
      
      audioRef.current.pause();
      
      // Set up event listeners for the new stream
      const handleCanPlay = () => {
        if (audioRef.current) {
          audioRef.current.play().catch((error) => {
            console.error("Error playing new stream:", error);
            setIsPlaying(false);
          }).finally(() => {
            setIsLoading(false);
          });
          // Remove the event listener after use
          audioRef.current.removeEventListener('canplay', handleCanPlay);
        }
      };
      
      const handleLoadError = () => {
        console.error("Error loading stream");
        setIsLoading(false);
        setCurrentTrack(null);
        if (audioRef.current) {
          audioRef.current.removeEventListener('error', handleLoadError);
        }
      };
      
      // Add event listeners
      audioRef.current.addEventListener('canplay', handleCanPlay);
      audioRef.current.addEventListener('error', handleLoadError);
      
      // Set new source and load
      audioRef.current.src = stream.url;
      audioRef.current.load(); // Explicitly load the new source
      setCurrentStream(stream);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        setIsLoading(true);
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
        }).finally(() => {
          setIsLoading(false);
        });
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume[0];
    }
  };

  const getStreamMetadata = (streamId: string): TrackMetadata | null => {
    return streamMetadata[streamId] || null;
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isMuted,
        volume,
        currentStream,
        currentTrack,
        isLoading,
        audioRef,
        streams: defaultStreams,
        selectStream,
        togglePlay,
        toggleMute,
        handleVolumeChange,
        getStreamMetadata,
      }}
    >
      {children}
      <audio
        ref={audioRef}
        src={currentStream?.url}
        onPlay={() => {
          setIsPlaying(true);
          setIsLoading(false);
        }}
        onPause={() => setIsPlaying(false)}
        onLoadStart={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        onError={(e) => {
          console.error("Audio error:", e);
          setIsPlaying(false);
          setIsLoading(false);
        }}
      />
    </AudioContext.Provider>
  );
};