"use server";

import { createClient } from "@/utils/supabase/server";

// Fetches the user's watchlist from the database
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
