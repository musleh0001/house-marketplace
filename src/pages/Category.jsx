import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ListingItem from "../components/ListingItem";
import Spinner from "../components/Spinner";

import { db } from "../firebase.config";

const Category = () => {
	const [listings, setListings] = useState(null);
	const [loading, setLoading] = useState(true);

	const params = useParams();

	useEffect(() => {
		const fetchListings = async () => {
			try {
				// Get reference
				const listingsRef = collection(db, "listings");
				// create a query
				const q = query(listingsRef, where("type", "==", params.categoryName), orderBy("timestamp", "desc"), limit(10));
				// execute query
				const querySnap = await getDocs(q);

				const listings = [];
				querySnap.forEach((doc) => {
					return listings.push({
						id: doc.id,
						data: doc.data(),
					});
				});

				setListings(listings);
				setLoading(false);
			} catch (error) {
				toast.error("Could not fetch listings");
			}
		};
		fetchListings();
	}, [params.categoryName]);

	return (
		<div className="category">
			<header>
				<p className="pageHeader">{params.categoryName === "rent" ? "Places for rent" : "Places for sell"}</p>
			</header>

			{loading ? (
				<Spinner />
			) : listings && listings.length > 0 ? (
				<>
					<main>
						<ul className="categoryListings">
							{listings.map((listing) => (
								<ListingItem key={listing.id} listing={listing.data} id={listing.id} />
							))}
						</ul>
					</main>
				</>
			) : (
				<p>No listings for {params.categoryName}</p>
			)}
		</div>
	);
};

export default Category;
