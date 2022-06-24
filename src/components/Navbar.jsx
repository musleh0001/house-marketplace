import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import OfferIcon from "../assets/svg/localOfferIcon.svg?component";
import ExploreIcon from "../assets/svg/exploreIcon.svg?component";
import PersonOutlineIcon from "../assets/svg/personOutlineIcon.svg?component";

const Navbar = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const pathMatchRoute = (route) => {
		if (route === location.pathname) {
			return true;
		}
	};

	return (
		<footer className="navbar">
			<nav className="navbarNav">
				<ul className="navbarListItems">
					<li className="navbarListItem" onClick={() => navigate("/")}>
						<ExploreIcon width="36px" height="36px" fill={pathMatchRoute("/") ? "#2c2c2c" : "#8f8f8f"} />
						{/* <img> src={ExploreIcon} width="36px" height="36px" style={{ fill: pathMatchRoute("/") ? "#2c2c2c" : "#8f8f8f" }} alt="" /> */}
						<p className={pathMatchRoute("/") ? "navbarListItemNameActive" : "navbarListItemName"}>Explore</p>
					</li>
					<li className="navbarListItem" onClick={() => navigate("/offers")}>
						<OfferIcon width="36px" height="36px" fill={pathMatchRoute("/offers") ? "#2c2c2c" : "#8f8f8f"} />
						{/* <img src={OfferIcon} width="36px" height="36px" style={{ fill: pathMatchRoute("/offers") ? "#2c2c2c" : "#8f8f8f" }} alt="" /> */}
						<p className={pathMatchRoute("/offers") ? "navbarListItemNameActive" : "navbarListItemName"}>Offers</p>
					</li>
					<li className="navbarListItem" onClick={() => navigate("/profile")}>
						<PersonOutlineIcon width="36px" height="36px" fill={pathMatchRoute("/profile") ? "#2c2c2c" : "#8f8f8f"} />
						<p className={pathMatchRoute("/profile") ? "navbarListItemNameActive" : "navbarListItemName"}>Profile</p>
					</li>
				</ul>
			</nav>
		</footer>
	);
};

export default Navbar;
