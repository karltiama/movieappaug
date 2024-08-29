"use server";

import { createClient } from "@/utils/supabase/server";

// Fetches movies based on a search query
export async function fetchMovies(query: string) {
	if (!query) return [];

	const response = await fetch(
		`https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${query}`
	);

	if (!response.ok) {
		throw new Error("Failed to fetch movies");
	}

	const data = await response.json();
	return data.results;
}

// Adds a movie to the user's watchlist
export async function addToWatchlist(movieId: number, userId: string) {
	const supabase = createClient();

	const { data, error } = await supabase
		.from("user_movie_list")
		.insert({ user_id: userId, movie_id: movieId });

	if (error) {
		throw new Error(error.message);
	}

	return data;
}

// Fetches detailed information for a single movie
export async function fetchMovieDetails(movieId: string) {
	const response = await fetch(
		`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=credits`
	);

	if (!response.ok) {
		throw new Error("Failed to fetch movie details");
	}

	const data = await response.json();

	// Extract relevant details
	const movieDetails = {
		id: data.id,
		title: data.title,
		overview: data.overview,
		poster_path: data.poster_path,
		vote_average: data.vote_average,
		director:
			data.credits.crew.find((member: any) => member.job === "Director")
				?.name || "N/A",
		cast: data.credits.cast.slice(0, 3).map((actor: any) => actor.name),
		genres: data.genres.map((genre: any) => genre.name),
		runtime: data.runtime,
		release_date: data.release_date,
	};

	return movieDetails;
}
