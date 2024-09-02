"use client";

import React, { useEffect, useState } from "react";
import {
	fetchTrendingMovies,
	fetchTopRatedMovies,
	fetchPopularActors,
	addToWatchlist, // Import the addToWatchlist function
} from "./actions"; // Adjust the path if needed
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import MovieCard from "@/components/MovieCard"; // Import the MovieCard component
import ActorCard from "@/components/ActorCard"; // Import the ActorCard component
import SearchMovies from "@/components/SearchMovies";

interface Movie {
	id: number;
	title: string;
	overview: string;
	poster_path: string;
	vote_average: number;
}

interface Actor {
	id: number;
	name: string;
	profile_path: string;
	popularity: number;
}

export default function HomePage() {
	const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
	const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
	const [popularActors, setPopularActors] = useState<Actor[]>([]);

	useEffect(() => {
		const getTrendingMovies = async () => {
			try {
				const movies = await fetchTrendingMovies();
				setTrendingMovies(movies);
			} catch (error) {
				console.error("Error fetching trending movies:", error);
			}
		};

		const getTopRatedMovies = async () => {
			try {
				const movies = await fetchTopRatedMovies();
				setTopRatedMovies(movies);
			} catch (error) {
				console.error("Error fetching top-rated movies:", error);
			}
		};

		const getPopularActors = async () => {
			try {
				const actors = await fetchPopularActors();
				setPopularActors(actors);
			} catch (error) {
				console.error("Error fetching popular actors:", error);
			}
		};

		getTrendingMovies();
		getTopRatedMovies();
		getPopularActors();
	}, []);

	const handleAddToWatchlist = async (
		movieId: number,
		title: string,
		posterPath: string
	) => {
		try {
			await addToWatchlist(movieId, title, posterPath); // Call the server-side function
			alert("Movie added to watchlist!");
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
							Discover the Best Movies
						</h2>
						<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							Explore our curated selection of trending, top-rated, and popular
							movies.
						</p>
					</div>
				</div>
				<SearchMovies />
				<Tabs defaultValue="trending" className="w-full">
					<TabsList className="grid w-full grid-cols-3 border-b">
						<TabsTrigger value="trending">Trending</TabsTrigger>
						<TabsTrigger value="top-rated">Top Rated</TabsTrigger>
						<TabsTrigger value="popular-actors">Popular Actors</TabsTrigger>
					</TabsList>
					<TabsContent value="trending">
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
							{trendingMovies.map((movie) => (
								<MovieCard
									key={movie.id}
									movie={movie}
									onAddToWatchlist={() =>
										handleAddToWatchlist(
											movie.id,
											movie.title,
											movie.poster_path
										)
									}
								/>
							))}
						</div>
					</TabsContent>
					<TabsContent value="top-rated">
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
							{topRatedMovies.map((movie) => (
								<MovieCard
									key={movie.id}
									movie={movie}
									onAddToWatchlist={() =>
										handleAddToWatchlist(
											movie.id,
											movie.title,
											movie.poster_path
										)
									}
								/>
							))}
						</div>
					</TabsContent>
					<TabsContent value="popular-actors">
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
							{popularActors.map((actor) => (
								<ActorCard key={actor.id} actor={actor} />
							))}
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}
