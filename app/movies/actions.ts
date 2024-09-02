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
export async function addToWatchlist(
	movieId: number,
	movieTitle: string,
	posterPath: string
) {
	const supabase = createClient();

	// Fetch the current user from the Supabase server-side client
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		throw new Error("User not authenticated");
	}

	const { data, error } = await supabase.from("user_movie_list").insert({
		user_id: user.id,
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
		cast: data.credits.cast.slice(0, 3).map((actor: any) => ({
			name: actor.name,
			profile_path: actor.profile_path,
		})),
		genres: data.genres.map((genre: any) => genre.name),
		runtime: data.runtime,
		release_date: data.release_date,
	};

	return movieDetails;
}

// Fetches the user's watchlist
export async function fetchUserWatchlist(userId: string) {
	const supabase = createClient();

	const { data, error } = await supabase
		.from("user_movie_list")
		.select("movie_id, movie_title, poster_path, status")
		.eq("user_id", userId);

	if (error) {
		throw new Error(error.message);
	}

	return data;
}

// Fetches trending movies from TMDB
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

// Fetches top-rated movies from TMDB
export async function fetchTopRatedMovies() {
	const response = await fetch(
		`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
	);

	if (!response.ok) {
		throw new Error("Failed to fetch top-rated movies");
	}

	const data = await response.json();
	return data.results;
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
	return data.results.map((actor: any) => ({
		id: actor.id,
		name: actor.name,
		profile_path: actor.profile_path,
		popularity: actor.popularity,
	}));
}
