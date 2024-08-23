"use server";

import { createClient } from "@/utils/supabase/server";

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
