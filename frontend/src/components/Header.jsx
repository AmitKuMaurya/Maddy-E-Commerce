import "./Header.css";

import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Header() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};

	return (
		<div className="fixing">
			<header className="header_n">
			<h2>E-<span style={{color:"black",fontWeight:"normal"}}  >Commerce</span></h2>
			<nav ref={navRef}  >
				{/* <a href="#">Home</a>
				<a href="#about">About</a>
				<a href="#techStack">Skills</a>
				<a href="#stats">Github Stats</a>
				<a href="#project">Projects</a>
				<a href="#contact">Contact Me</a> */}
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button className="nav-btn" onClick={showNavbar}>
				<FaBars />
			</button>
		</header >
		</div>
	);
}

export default Header;