import { fetchUserWatchlist } from "../movies/actions"; // Adjust the import path as necessary
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import SearchMovies from "@/components/SearchMovies";

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
		<div className="grid gap-6 max-w-3xl mx-auto px-4 py-12">
			<SearchMovies />
			<div className="flex flex-col items-center">
				<h2 className="text-2xl font-bold">My Watchlist</h2>
			</div>
			{watchlist.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{watchlist.map((movie) => (
						<Card
							key={movie.movie_id}
							className="w-full rounded-lg overflow-hidden shadow-lg flex flex-row">
							<Image
								src={
									movie.poster_path
										? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
										: "/placeholder.svg"
								}
								alt={`${movie.movie_title} Poster`}
								width={200}
								height={300}
								className="object-cover w-1/2 aspect-[2/3]"
							/>
							<CardContent className="p-6 flex flex-col gap-4 w-1/2">
								<h3 className="text-xl font-bold">{movie.movie_title}</h3>
								{/* <p className="text-muted-foreground text-base line-clamp-3">
									{movie.overview || "No overview available."}
								</p> */}
								<div className="flex items-center gap-2 mt-auto">
									{/* Assuming you have a rating system */}
									<Star className="w-5 h-5 fill-primary" />
									<Star className="w-5 h-5 fill-primary" />
									<Star className="w-5 h-5 fill-primary" />
									<Star className="w-5 h-5 fill-primary" />
									<Star className="w-5 h-5 fill-muted stroke-muted-foreground" />
									<span className="text-sm text-muted-foreground">4.5</span>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			) : (
				<p>Your watchlist is empty.</p>
			)}
		</div>
	);
}
