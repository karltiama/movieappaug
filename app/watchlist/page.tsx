import { fetchUserWatchlist } from "../movies/actions"; // Adjust the import path as necessary
import { createClient } from "@/utils/supabase/server";
import MovieCard from "@/components/MovieCard";
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
		<section className="w-full py-12 md:py-24 lg:py-32">
			<div className="container space-y-12 px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-2">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
							My Watchlist
						</h2>
						<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							Explore your saved movies.
						</p>
					</div>
				</div>
				{/* <SearchMovies />  */}
				{watchlist.length > 0 ? (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{watchlist.map((movie) => (
							<MovieCard
								key={movie.movie_id}
								movie={{
									id: movie.movie_id,
									title: movie.movie_title,
									overview: "", // No overview in watchlist data, pass empty string
									poster_path: movie.poster_path,
									vote_average: 0, // Assuming vote_average is not stored, set to 0 or a default value
								}}
							/>
						))}
					</div>
				) : (
					<p>Your watchlist is empty.</p>
				)}
			</div>
		</section>
	);
}
