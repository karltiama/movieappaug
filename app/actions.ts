"use server";

import { createClient } from "@/utils/supabase/server";

// Fetches trending movies
export async function fetchTrendingMovies() {
	const response = await fetch(
		`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
	);

	if (!response.ok) {
		throw new Error("Failed to fetch trending movies");
	}

	const data = await response.json();
	return data.results;
}
