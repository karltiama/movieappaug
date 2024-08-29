import { fetchUserWatchlist } from "../movies/actions"; // Adjust the import path as necessary
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

// Server-side function to fetch the user's ID
async function getUserId() {
	const supabase = createClient();
	const { data } = await supabase.auth.getUser();

	if (!data.user) {
		throw new Error("User not authenticated");
	}

	return data.user.id;
}

export default async function WatchlistPage() {
	const userId = await getUserId(); // Get the user's ID
	const watchlist = await fetchUserWatchlist(userId); // Fetch the user's watchlist

	return (
		<div className="max-w-4xl mx-auto px-4 py-12">
			<h1 className="text-2xl font-bold mb-6">Your Watchlist</h1>
			{watchlist.length > 0 ? (
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
					{watchlist.map((movie) => (
						<div key={movie.movie_id} className="grid gap-2">
							<Image
								src={
									movie.poster_path
										? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
										: "/placeholder.svg"
								}
								alt={`${movie.movie_title} Poster`}
								width={300}
								height={450}
								className="rounded-lg object-cover aspect-[2/3]"
							/>
							<div className="grid gap-1">
								<h3 className="font-semibold text-lg">{movie.movie_title}</h3>
							</div>
						</div>
					))}
				</div>
			) : (
				<p>Your watchlist is empty.</p>
			)}
		</div>
	);
}
