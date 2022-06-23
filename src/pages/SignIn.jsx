import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

import ArrowRightIcon from "../assets/svg/keyboardArrowRightIcon.svg?component";
import VisibilityIcon from "../assets/svg/visibilityIcon.svg";

const SignIn = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const { email, password } = formData;
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const auth = getAuth();
			const userCredential = await signInWithEmailAndPassword(auth, email, password);

			if (userCredential.user) {
				navigate("/");
			}
		} catch (error) {
			toast.error("Bad user Credentials");
		}
	};

	return (
		<>
			<div className="pageContainer">
				<header>
					<p className="pageHeader">Welcome Back!</p>
				</header>

				<main>
					<form method="POST" onSubmit={handleSubmit}>
						<input type="email" className="emailInput" placeholder="Email" id="email" value={email} onChange={handleChange} />

						<div className="passwordInputDiv">
							<input
								type={showPassword ? "text" : "password"}
								placeholder="Password"
								className="passwordInput"
								id="password"
								value={password}
								onChange={handleChange}
							/>

							<img
								src={VisibilityIcon}
								alt="show password"
								className="showPassword"
								onClick={() => setShowPassword((prevState) => !prevState)}
							/>
						</div>

						<Link to="/forgot-password" className="forgotPasswordLink">
							Forgot Password
						</Link>

						<div className="signInBar">
							<p className="signInText">Sign In</p>
							<button className="signInButton">
								<ArrowRightIcon fill="#fff" width="34px" height="34px" />
							</button>
						</div>
					</form>

					<Link to="/sign-up" className="registerLink">
						Sign Up Instead
					</Link>
				</main>
			</div>
		</>
	);
};

export default SignIn;
