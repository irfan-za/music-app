import React from "react";
import { playAudio } from "../util";
function LibrarySong({
  song,
  songs,
  setCurrentSong,
  id,
  audioRef,
  isPlaying,
  setIsPlaying,
  setSongs,
}) {
  const songSelectHandler = () => {
    // actived song
    const newSongs = songs.map((song) => {
      if (song.id === id) {
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

    // versi rumit
    // const selectedSong = songs.filter((state) => state.id === id);
    // setCurrentSong(selectedSong[0]);
    console.log(audioRef);
    // versi simple
    setCurrentSong(song);
    // cek song isplaying
    playAudio(isPlaying, audioRef, setIsPlaying);
  };

  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? "actived" : ""}`}
    >
      <img alt={song.name} src={song.cover}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
}

export default LibrarySong;
