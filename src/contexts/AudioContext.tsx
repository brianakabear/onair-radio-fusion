import React, { createContext, useContext, useRef, useState, useEffect } from 'react';

interface RadioStream {
  id: string;
  name: string;
  url: string;
  genre: string;
  description: string;
  bitrate: string;
}

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number[];
  currentStream: RadioStream | null;
  isLoading: boolean;
  audioRef: React.RefObject<HTMLAudioElement>;
  selectStream: (stream: RadioStream) => void;
  togglePlay: () => void;
  toggleMute: () => void;
  handleVolumeChange: (newVolume: number[]) => void;
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
  }
];

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([0.7]);
  const [currentStream, setCurrentStream] = useState<RadioStream>(defaultStreams[0]);
  const [isLoading, setIsLoading] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0];
    }
  }, [volume]);

  const selectStream = (stream: RadioStream) => {
    if (audioRef.current && stream.id !== currentStream?.id) {
      setIsLoading(true);
      
      audioRef.current.pause();
      audioRef.current.src = stream.url;
      setCurrentStream(stream);
      
      // Autoplay when stream is selected
      audioRef.current.play().catch((error) => {
        console.error("Error playing new stream:", error);
        setIsPlaying(false);
      }).finally(() => {
        setIsLoading(false);
      });
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

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isMuted,
        volume,
        currentStream,
        isLoading,
        audioRef,
        selectStream,
        togglePlay,
        toggleMute,
        handleVolumeChange,
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