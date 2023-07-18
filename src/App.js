import React, { useEffect, useState, useRef  } from "react";
import "./tesk.css";

const CircleComponent = () => {
  const [rotatedText, setRotatedText] = useState("");

  useEffect(() => {
    const originalText =  '      CONTACT-US-0772940951';          
    const transformedText = originalText
      .split("")
      .map(
        (char, i) =>
        `<span style="transform:rotate(${90 + i * (360 / originalText.length)}deg)">${char}</span>`
      )
      .join("");
    setRotatedText(transformedText);
  }, []);

  return (
    <div className="circle">
      <div className="logo">                         
        <video
          className="video"
          src="../../video/test.mp4"
          controls
          autoPlay
        ></video></div>
      <div className="text">
     
        <p dangerouslySetInnerHTML={{ __html: rotatedText }} />
      </div>
    </div>
  );
};


const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    // Update any progress bar or time display components if needed
    // Example: Update current time and total duration
    // const currentTime = videoRef.current.currentTime;
    // const duration = videoRef.current.duration;
  };

  return (
    <div>
      <video
        ref={videoRef}
        src="../../video/test.mp4"
        onTimeUpdate={handleTimeUpdate}
      />

      <button onClick={handlePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};


const App = () => {
  return (
    <div className="App">
      <div className="vertical-container">
        <div className="bottom-right">
        
          <CircleComponent />
          
        </div>
  
      </div>
    </div>
  );
};

export default App;
