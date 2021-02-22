import React from "react";

function Song({ currentSong, isPlaying, songInfo }) {
  const gambarMuter = () => {
    if (songInfo.currentTime > 0 && isPlaying) {
      return "img-rotate-actived";
    } else {
      return ".img-rotate-paused";
    }
  };
  // console.log(gambarMuter());
  return (
    <div className="song-container">
      <img
        alt={currentSong.name}
        src={currentSong.cover}
        className={gambarMuter()}
      ></img>
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
}

export default Song;
