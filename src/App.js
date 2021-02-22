import React, { useState, useRef } from "react";

// import Styles
import "./styles/app.scss";
// import component
import Nav from "./component/Nav";
import Song from "./component/Song";
import Player from "./component/Player";
import Library from "./component/Library";
// import data lagu
import data from "./data";
// set playing promise

function App() {
  // Ref
  const audioRef = useRef(null);
  // state
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  //   state
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);
  const timeHandler = (e) => {
    const currentT = e.target.currentTime;
    const duration = e.target.duration;
    // calculate percentage
    const roundedCurrent = Math.round(currentT);
    const roundedDuration = Math.round(duration);
    const animationPercentage = Math.round(
      (roundedCurrent / roundedDuration) * 100
    );

    setSongInfo({
      ...songInfo,
      currentTime: currentT,
      duration: duration,
      animationPercentage: animationPercentage,
    });
    console.log(songInfo);
  };

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav setLibraryStatus={setLibraryStatus} libraryStatus={libraryStatus} />
      <Song
        currentSong={currentSong}
        songInfo={songInfo}
        isPlaying={isPlaying}
      />
      <Player
        setSongs={setSongs}
        songs={songs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <Library
        libraryStatus={libraryStatus}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        setCurrentSong={setCurrentSong}
        songs={songs}
        audioRef={audioRef}
        setSongs={setSongs}
      />
      <audio
        onTimeUpdate={timeHandler}
        onLoadedMetadata={timeHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default App;
