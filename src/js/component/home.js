import React, { useRef, useState, useEffect } from "react";

export function Home() {
	let [songList, setSongListAsync] = useState([]);

	useEffect(() => {
		obtenerList();
	}, []);

	const obtenerList = async () => {
		try {
			const res = await fetch(
				"https://assets.breatheco.de/apis/sound/songs"
			);
			const data = await res.json();
			setSongListAsync(data);
		} catch (error) {
			console.log(error);
		}
	};

	let music = useRef();

	const [isPlaying, setPlaying] = useState(false);

	const playPause = () => {
		if (music.current.paused) {
			music.current.play();

			setPlaying(true);
		} else if (!music.current.paused) {
			music.current.pause();
			setPlaying(false);
		}
	};

	// CAMBIAR CANCION

	const [songActual, setSongActual] = useState();

	const prevSong = () => {
		let prev = songActual - 1;
		if (prev <= 0) {
			prev = songList.length - 1;
		}
		cambiarSrc(songList[prev].url, prev);
	};
	const nextSong = () => {
		let next = songActual + 1;
		if (next > songList.length - 1) {
			next = 0;
		}
		cambiarSrc(songList[next].url, next);
	};

	//SRC AUDIO

	const cambiarSrc = (url, song) => {
		let string = "https://assets.breatheco.de/apis/sound/";
		music.current.src = string + url;
		setSongActual(song);
		music.current.play();
		setPlaying(true);
	};

	return (
		<div>
			<div id="sidebar">
				<img src="http://assets.stickpng.com/thumbs/5ece4ff9123d6d0004ce5f89.png" />
			</div>
			<div id="content">
				{songList.map((objeto, index) => {
					return (
						<div
							className="song"
							key={index}
							onClick={() => {
								cambiarSrc(objeto.url, index);
							}}>
							<div>
								<span>
									{objeto.id}
									{" - "}
								</span>
								<span>{objeto.name}</span>
							</div>
						</div>
					);
				})}
			</div>
			<audio ref={music} src={songList.url}></audio>
			<div className="btn-group text-center playbar margin-left">
				<button className="btn  btn-sm p-0" onClick={prevSong}>
					<i className="fas fa-caret-square-left fa-2x boton" />
				</button>
				<button className="btn  btn-sm p-0" onClick={playPause}>
					{isPlaying ? (
						<i className="fas fa-pause fa-2x boton"></i>
					) : (
						<i className="fas fa-play fa-2x boton"></i>
					)}
				</button>
				<button className="btn  btn-sm p-0" onClick={nextSong}>
					<i className="fas fa-caret-square-right fa-2x boton" />
				</button>
			</div>
		</div>
	);
}
