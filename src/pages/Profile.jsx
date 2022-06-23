import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
	const auth = getAuth();
	const [formData, setFormData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
	});
	const { name, email } = formData;
	const navigate = useNavigate();

	const onLogout = () => {
		auth.signOut();
		navigate("/sign-in");
	};

	return (
		<div className="profile">
			<header className="profileHeader">
				<p className="pageHeader">My Profile</p>
				<button type="button" className="logOut" onClick={onLogout}>
					Logout
				</button>
			</header>
		</div>
	);
};

export default Profile;