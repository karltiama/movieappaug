"use client";

import React, { useEffect, useState } from "react";
import { fetchTrendingMovies } from "./actions"; // Adjust the path if needed
import Link from "next/link";
import { Search } from "lucide-react";
import SearchMovies from "@/components/SearchMovies";

interface Movie {
	id: number;
	title: string;
	overview: string;
	poster_path: string;
}

export default function HomePage() {
	const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);

	useEffect(() => {
		const getTrendingMovies = async () => {
			try {
				const movies = await fetchTrendingMovies(); // Fetch trending movies
				setTrendingMovies(movies);
			} catch (error) {
				console.error("Error fetching trending movies:", error);
			}
		};

		getTrendingMovies();
	}, []);

	return (
		<div className="max-w-6xl mx-auto px-4 py-12">
			<SearchMovies />
			<h1 className="text-2xl font-bold m-6">Trending Movies</h1>
			{trendingMovies.length > 0 ? (
				<div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 items-start">
					{trendingMovies.map((movie) => (
						<div key={movie.id} className="grid gap-2">
							<Link href={`/movies/${movie.id}`}>
								<img
									src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
									alt={`${movie.title} Poster`}
									width={300}
									height={450}
									className="rounded-lg object-cover aspect-[2/3]"
								/>
							</Link>
							<div className="grid gap-1">
								<Link href={`/movies/${movie.id}`}>
									<h3 className="font-semibold text-lg">{movie.title}</h3>
									<p className="text-muted-foreground text-sm line-clamp-2">
										{movie.overview}
									</p>
								</Link>
							</div>
						</div>
					))}
				</div>
			) : (
				<p>No trending movies found.</p>
			)}
		</div>
	);
}
