"use client";

import React, { useEffect, useState } from "react";
import { fetchMovies, addToWatchlist } from "./actions"; // Import server-side functions
import MovieCard from "@/components/MovieCard"; // Import the MovieCard component
import SearchMovies from "@/components/SearchMovies";

interface Movie {
	id: number;
	title: string;
	overview: string;
	poster_path: string;
	vote_average: number; // Include vote_average
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
			const movie = movies.find((m) => m.id === movieId);
			if (movie) {
				await addToWatchlist(movie.id, movie.title, movie.poster_path); // Add movie to watchlist
				alert("Movie added to watchlist!");
			}
		} catch (error) {
			console.error("Error adding to watchlist:", error);
		}
	};

	return (
		<section className="w-full py-12 md:py-24 lg:py-32">
			<div className="container space-y-12 px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-2">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
							Your Search Results
						</h2>
						<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							Explore the movies matching your search query.
						</p>
					</div>
				</div>
				<SearchMovies /> {/* Search Component */}
				{movies.length > 0 ? (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{movies.map((movie) => (
							<MovieCard
								key={movie.id}
								movie={movie}
								onAddToWatchlist={() => handleAddToWatchlist(movie.id)} // Pass the function
							/>
						))}
					</div>
				) : (
					<p>No movies found.</p>
				)}
			</div>
		</section>
	);
}
