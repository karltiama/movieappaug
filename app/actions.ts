"use server";

import { createClient } from "@/utils/supabase/server";

// Fetches trending movies from TMDB
export async function fetchTrendingMovies() {
	const response = await fetch(
		`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
	);

	if (!response.ok) {
		throw new Error("Failed to fetch trending movies");
	}

	const data = await response.json();
	return data.results; // Return the list of trending movies
}

// Fetches top-rated movies from TMDB
export async function fetchTopRatedMovies() {
	const response = await fetch(
		`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
	);

	if (!response.ok) {
		throw new Error("Failed to fetch top-rated movies");
	}

	const data = await response.json();
	return data.results; // Return the list of top-rated movies
}

// Fetches popular actors from TMDB
export async function fetchPopularActors() {
	const response = await fetch(
		`https://api.themoviedb.org/3/person/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
	);

	if (!response.ok) {
		throw new Error("Failed to fetch popular actors");
	}

	const data = await response.json();
	return data.results; // Return the list of popular actors
}
