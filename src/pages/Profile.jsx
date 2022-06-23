import React, { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { updateDoc, doc } from "firebase/firestore";

import { db } from "../firebase.config";
import { toast } from "react-toastify";

const Profile = () => {
	const auth = getAuth();
	const [changeDetails, setChangeDetails] = useState(false);
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

	const onSubmit = async () => {
		try {
			if (auth.currentUser.displayName !== name) {
				// update display name
				await updateProfile(auth.currentUser, {
					displayName: name,
				});

				// update in firestore
				const userRef = doc(db, "users", auth.currentUser.uid);
				await updateDoc(userRef, {
					name,
				});
			}
		} catch (error) {
			toast, error("Could not update profile details");
		}
	};

	const handleChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	return (
		<div className="profile">
			<header className="profileHeader">
				<p className="pageHeader">My Profile</p>
				<button type="button" className="logOut" onClick={onLogout}>
					Logout
				</button>
			</header>

			<main>
				<div className="profileDetailsHeader">
					<p className="profileDetailsText">Personal Details</p>
					<p
						className="changePersonalDetails"
						onClick={() => {
							changeDetails && onSubmit();
							setChangeDetails((prevState) => !prevState);
						}}
					>
						{changeDetails ? "done" : "change"}
					</p>
				</div>

				<div className="profileCard">
					<form method="POST">
						<input
							type="text"
							id="name"
							className={!changeDetails ? "profileName" : "profileNameActive"}
							disabled={!changeDetails}
							value={name}
							onChange={handleChange}
						/>
						<input
							type="text"
							id="email"
							className={!changeDetails ? "profileEmail" : "profileEmailActive"}
							disabled={!changeDetails}
							value={email}
							onChange={handleChange}
						/>
					</form>
				</div>
			</main>
		</div>
	);
};

export default Profile;
