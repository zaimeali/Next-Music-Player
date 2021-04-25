import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faForward,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";

const Player = () => {
  const [title, setTitle] = useState("");
  const [song, setSong] = useState("");
  const [img, setImg] = useState("");
  const [songIndex, setSongIndex] = useState(0);
  const [play, setPlay] = useState(false);

  const progressBar = useRef();
  const player = useRef();
  const progressRef = useRef();

  const songs = [
    "Bollywood Medley",
    "Zemo Low",
    "Remembrance",
    "The Way",
    "Yeh Mera Deewanapan hai",
  ];

  useEffect(() => {
    setTitle(songs[songIndex]);
    setSong(`/musics/${songs[songIndex]}.mp3`);
    setImg(`/images/${songs[songIndex]}.jpg`);
  }, []);

  useEffect(() => {
    if (play) {
      player.current.play();
    } else {
      player.current.pause();
    }
  }, [!play]);

  useEffect(() => {
    if (songIndex <= songs.length - 1 && songIndex >= 0) {
      setTitle(songs[songIndex]);
      setSong(`/musics/${songs[songIndex]}.mp3`);
      setImg(`/images/${songs[songIndex]}.jpg`);
    } else {
      setSongIndex(0);
    }
  }, [songIndex]);

  const nextSong = () => {
    if (play) {
      setPlay(false);
    }
    setSongIndex(songIndex + 1);
  };

  const prevSong = () => {
    if (play) {
      setPlay(false);
    }
    if (songIndex === 0) {
      setSongIndex(songs.length - 1);
    } else {
      setSongIndex(songIndex - 1);
    }
  };

  const progressUpdate = () => {
    const { currentTime, duration } = player.current;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.current.style.width = `${progressPercent}%`;

    if (currentTime === duration) {
      nextSong();
      progressBar.current.style.width = "0%";
    }
  };

  const clickProgress = (e) => {
    const width = progressRef.current.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const duration = player.current.duration;
    player.current.currentTime = (clickX / width) * duration;
  };

  return (
    <div className={play ? "music-container play" : "music-container"}>
      <div className="music-info">
        <h4>{title}</h4>
        <div
          className="progress-container"
          ref={progressRef}
          onClick={(e) => clickProgress(e)}
        >
          <div className="progress" ref={progressBar} />
        </div>
      </div>
      <audio ref={player} src={song} onTimeUpdate={(e) => progressUpdate()} />

      <div className="img-container">
        <img src={img} alt={`${title}-Cover`} />
      </div>

      <div className="navigation">
        <button className="action-btn" onClick={prevSong}>
          <FontAwesomeIcon icon={faBackward} />
        </button>
        <button
          className="action-btn action-btn-big"
          onClick={() => {
            setPlay(!play);
          }}
        >
          <FontAwesomeIcon icon={play ? faPause : faPlay} />
        </button>
        <button className="action-btn" onClick={nextSong}>
          <FontAwesomeIcon icon={faForward} />
        </button>
      </div>
    </div>
  );
};

export default Player;
