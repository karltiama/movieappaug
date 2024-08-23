"use client";

import React, { useEffect, useState } from "react";
import { fetchMovies, addToWatchlist } from "./actions"; // Import server-side functions
import { Star, Plus } from "lucide-react";

interface Movie {
	id: number;
	title: string;
	overview: string;
	poster_path: string;
}

export default function MovieSearch({
	searchParams,
}: {
	searchParams: { query: string };
}) {
	const [movies, setMovies] = useState<Movie[]>([]);

	useEffect(() => {
		const getMovies = async () => {
			if (!searchParams.query) return;

			try {
				const results = await fetchMovies(searchParams.query); // Call server-side function
				setMovies(results);
			} catch (error) {
				console.error("Error fetching movies:", error);
			}
		};

		getMovies();
	}, [searchParams.query]);

	const handleAddToWatchlist = async (movieId: number) => {
		try {
			await addToWatchlist(movieId, "user-id-placeholder"); // Replace with actual user ID
			alert("Movie added to watchlist!");
		} catch (error) {
			console.error("Error adding to watchlist:", error);
		}
	};

	return (
		<div className="grid gap-8 max-w-4xl mx-auto px-4 py-12">
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
				{movies.map((movie) => (
					<div key={movie.id} className="grid gap-2 relative">
						<img
							src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
							alt={`${movie.title} Poster`}
							width={300}
							height={450}
							className="rounded-lg object-cover aspect-[2/3]"
						/>
						<div className="grid gap-1">
							<h3 className="font-semibold text-lg">{movie.title}</h3>
							<p className="text-muted-foreground text-sm line-clamp-2">
								{movie.overview}
							</p>
						</div>
						<div className="absolute top-4 right-4 flex space-x-2">
							<button
								title="Rate"
								className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition">
								<Star className="w-5 h-5" />
							</button>
							<button
								onClick={() => handleAddToWatchlist(movie.id)}
								title="Add to Watchlist"
								className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition">
								<Plus className="w-5 h-5" />
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
