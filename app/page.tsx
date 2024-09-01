"use client";

import React, { useEffect, useState } from "react";
import {
	fetchTrendingMovies,
	fetchTopRatedMovies,
	fetchPopularActors,
} from "./actions"; // Adjust the path if needed
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Star } from "lucide-react";
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

	const renderMovieCard = (movie: Movie) => (
		<Card
			key={movie.id}
			className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
			<Link
				href={`/movies/${movie.id}`}
				className="absolute inset-0 z-10"
				prefetch={false}>
				<span className="sr-only">View Movie</span>
			</Link>
			<div className="absolute top-4 right-4 z-20 flex items-center gap-2">
				<Button variant="ghost" size="icon">
					<Plus className="h-4 w-4" />
					<span className="sr-only">Add to Watchlist</span>
				</Button>
				<Button variant="ghost" size="icon">
					<Star className="h-4 w-4" />
					<span className="sr-only">Add to Favorites</span>
				</Button>
			</div>
			<div className="relative">
				<img
					src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
					alt={`${movie.title} Poster`}
					className="object-cover w-full h-64"
					style={{ aspectRatio: "2/3", objectFit: "cover" }}
				/>
				<div className="absolute top-4 left-4 z-20 flex items-center justify-center bg-primary text-primary-foreground rounded-full w-12 h-12">
					<span className="text-sm font-bold">
						{movie.vote_average.toFixed(1)}
					</span>
				</div>
			</div>
			<CardContent className="p-4 bg-background">
				<h3 className="text-xl font-bold">{movie.title}</h3>
				<p className="text-sm text-muted-foreground line-clamp-2">
					{movie.overview}
				</p>
			</CardContent>
		</Card>
	);

	const renderActorCard = (actor: Actor) => (
		<Card
			key={actor.id}
			className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
			<Link href="#" className="absolute inset-0 z-10" prefetch={false}>
				<span className="sr-only">View Actor</span>
			</Link>
			<div className="relative">
				<img
					src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
					alt={`${actor.name} Portrait`}
					className="object-cover w-full h-64"
					style={{ aspectRatio: "2/3", objectFit: "cover" }}
				/>
				<div className="absolute top-4 left-4 z-20 flex items-center justify-center bg-primary text-primary-foreground rounded-full w-12 h-12">
					<span className="text-sm font-bold">
						{actor.popularity.toFixed(1)}
					</span>
				</div>
			</div>
			<CardContent className="p-4 bg-background">
				<h3 className="text-xl font-bold">{actor.name}</h3>
				<p className="text-sm text-muted-foreground">
					Actor description goes here.
				</p>
			</CardContent>
		</Card>
	);

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
						<div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
							{trendingMovies.map(renderMovieCard)}
						</div>
					</TabsContent>
					<TabsContent value="top-rated">
						<div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
							{topRatedMovies.map(renderMovieCard)}
						</div>
					</TabsContent>
					<TabsContent value="popular-actors">
						<div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
							{popularActors.map(renderActorCard)}
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}
