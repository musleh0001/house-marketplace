import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const CreateListing = () => {
	const [geoLocationEnabled, setGeoLocationEnabled] = useState(true);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		tyep: "rent",
		name: "",
		bedrooms: 1,
		bathrooms: 1,
		parking: false,
		furnished: false,
		address: "",
		offer: false,
		regularPrice: 0,
		discountedPrice: 0,
		images: {},
		latitude: 0,
		longitude: 0,
	});
	const auth = getAuth();
	const navigate = useNavigate();
	const isMounted = useRef(true);

	useEffect(() => {
		if (isMounted) {
			onAuthStateChanged(auth, (user) => {
				if (user) {
					setFormData({ ...FormDataEvent, userRef: user.uid });
				} else {
					navigate("/sign-in");
				}
			});
		}

		return () => {
			isMounted.current = false;
		};
	}, [isMounted]);

	if (loading) {
		return <Spinner />;
	}

	return <div>CreateListing</div>;
};

export default CreateListing;
