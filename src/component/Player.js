import React from "react";
import { playAudio } from "../util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleRight,
  faAngleLeft,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

function Player({
  setIsPlaying,
  isPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  setCurrentSong,
  currentSong,
  songs,
  setSongs,
}) {
  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  };
  // ini Play Handler
  const playSongHandler = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };
  // play handler pakai keyboard space
  // window.addEventListener("keyup", (e) => {
  //   if (e.keyCode === 32) {
  //     setIsPlaying(!isPlaying);
  //     if (isPlaying) {
  //       audioRef.current.pause();
  //     } else {
  //       audioRef.current.play();
  //     }
  //   }
  // });

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTracker = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-back") {
      if (currentIndex === 0) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
        playAudio(isPlaying, audioRef, setIsPlaying);
        return;
      }
      await setCurrentSong(songs[currentIndex - 1]);
      activeLibraryHandler(songs[currentIndex - 1]);
    }
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    playAudio(isPlaying, audioRef, setIsPlaying);
  };

  // auto play ketika lagu habis

  // if (songInfo.currentTime === songInfo.duration) {
  //   // if (isPlaying !== undefined) {
  //   //   const playPromise = audioRef.current.play();
  //   //   if (playPromise !== undefined) {
  //   //     playPromise.then(() => {
  //   //       audioRef.current.play();
  //   //       setIsPlaying(true);
  //   //     });
  //   //   }
  //   // }
  //   setCurrentSong(songs[currentIndex + 1]);
  // }
  // style percent music range
  const trackAnim = {
    transform: `translateX( ${songInfo.animationPercentage}%)`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          className="track"
          style={{
            background: `linear-gradient(-45deg, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
            name="music-range"
            id=""
            className="range-music"
          />
          <div className="animate-track" style={trackAnim}></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTracker("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          className="play"
          icon={isPlaying ? faPause : faPlay}
          size="2x"
          onClick={playSongHandler}
        />
        <FontAwesomeIcon
          onClick={() => skipTracker("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
}

export default Player;
