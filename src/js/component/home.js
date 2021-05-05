import React, { useRef, useEffect, useState } from "react";

export function Home() {
	const [songList, setSongList] = useState([]);

	useEffect(() => {
		obtenerLista();
	}, []);

	const obtenerLista = async () => {
		try {
			const res = await fetch(
				"https://assets.breatheco.de/apis/sound/songs"
			);
			const data = await res.json();
			setSongList(data);
		} catch (error) {
			console.log(error);
		}
	};

	let music = useRef();

	const playPause = () => {
		if (music.current.paused) {
			music.current.play();
		} else if (!music.current.paused) {
			music.current.pause();
		}
	};

	return (
		<div>
			<div id="sidebar">
				<img src="http://assets.stickpng.com/thumbs/5ece4ff9123d6d0004ce5f89.png" />
			</div>
			<div id="content">
				{songList.map((objeto, index) => {
					return (
						<div className="song margin-bottom" key={index}>
							<div onClick={() => {}}>
								<span>{objeto.id}</span>
								{" - "}
								<span>{objeto.name}</span>
							</div>
						</div>
					);
				})}
			</div>
			<div
				className="btn-group text-center playbar margin-left"
				aria-label="Button group with nested dropdown">
				<button type="button" className="btn btn-secondary">
					<i className="fas fa-fast-backward"></i>
				</button>
				<button
					type="button"
					className="btn btn-secondary"
					onClick={playPause}>
					<i className="far fa-play-circle"></i>
				</button>
				<button type="button" className="btn btn-secondary">
					<i className="fas fa-fast-forward"></i>
				</button>
				<div className="btn-group" role="group">
					<div
						className="dropdown-menu"
						aria-labelledby="btnGroupDrop1">
						<a className="dropdown-item" href="#">
							<audio ref={music} src="" controls />
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
