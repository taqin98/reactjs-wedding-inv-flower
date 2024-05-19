import React, { useEffect, useRef, useState } from 'react';

const AudioPlayer = ({cbPlayAudio}) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const uri = process.env.REACT_APP_PUBLIC_URL;

  const playAudio = () => {
    if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play().catch(error => {
            console.error('Autoplay failed:', error);
          });
        }
  
        setIsPlaying(!isPlaying);
      }
  
  };

  useEffect(() => {
    if (cbPlayAudio) {
      playAudio();
    }
  }, [cbPlayAudio]);


  useEffect(() => {
    // Cleanup: Pause the audio when the component is unmounted
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);


  return (
    <div>
      <audio controls={false} ref={audioRef} src={uri + "assets/sounds/lamunan.mp3"} type="audio/mp3" />
      <button className="controls-button"
      onClick={playAudio}>
      <svg viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" aria-label="music note list" xmlns="http://www.w3.org/2000/svg" fill="white" className="bi-music-note-list b-icon bi" data-v-5955985f=""><g data-v-5955985f=""><path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z"></path><path fillRule="evenodd" d="M12 3v10h-1V3h1z"></path><path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z"></path><path fillRule="evenodd" d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"></path></g></svg>
      </button>
    </div>
  );
};

export default AudioPlayer;
