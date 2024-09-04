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

// Adds a movie to the user's watchlist
export async function addToWatchlist(
	userId: string,
	movieId: number,
	movieTitle: string,
	posterPath: string
) {
	const supabase = createClient();

	// Check if the movie is already in the user's watchlist
	const { data: existingMovie, error: checkError } = await supabase
		.from("user_movie_list")
		.select("id")
		.eq("user_id", userId)
		.eq("movie_id", movieId)
		.single();

	if (checkError && checkError.code !== "PGRST116") {
		// Handle any unexpected error, ignore if the error is "No matching rows found" (code PGRST116)
		throw new Error(checkError.message);
	}

	if (existingMovie) {
		// If the movie already exists, return a specific error
		const error = new Error("Movie is already in the watchlist");
		error.name = "MovieAlreadyExists";
		throw error;
	}

	// Add the movie to the user's watchlist if it's not already there
	const { data, error } = await supabase.from("user_movie_list").insert({
		user_id: userId,
		movie_id: movieId,
		movie_title: movieTitle,
		poster_path: posterPath,
		status: "watchlist",
		created_at: new Date(),
	});

	if (error) {
		throw new Error(error.message);
	}

	return data;
}
