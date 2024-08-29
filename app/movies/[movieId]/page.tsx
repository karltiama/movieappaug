import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchMovieDetails } from "@/app/movies/actions"; // Import server action for fetching movie details
import { Heart, Star } from "lucide-react";

interface MovieDetailsProps {
	params: {
		movieId: string;
	};
}

export default async function MovieDetails({ params }: MovieDetailsProps) {
	const movieId = params.movieId;
	const movie = await fetchMovieDetails(movieId);

	return (
		<Card className="p-4 md:p-6 lg:p-8 max-w-2xl mx-auto">
			<div className="grid md:grid-cols-2 gap-6">
				<div className="relative aspect-[2/3] overflow-hidden rounded-lg">
					<img
						src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
						alt={movie.title}
						width="300"
						height="400"
						className="object-cover w-full h-full"
						style={{ aspectRatio: "300/400", objectFit: "cover" }}
					/>
					<div className="absolute top-4 right-4 bg-background/70 rounded-full p-2 flex items-center justify-center">
						<div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center">
							<span className="text-primary-foreground font-bold text-lg">
								{movie.vote_average}
							</span>
						</div>
					</div>
				</div>
				<div className="grid gap-4">
					<h2 className="text-2xl font-bold">{movie.title}</h2>
					<div className="flex items-center gap-2">
						<Button variant="ghost" size="icon">
							<Heart className="w-5 h-5 fill-primary" />
							<span className="sr-only">Like</span>
						</Button>
						<Button variant="ghost" size="icon">
							<Star className="w-5 h-5 fill-primary" />
							<span className="sr-only">Add to Favorites</span>
						</Button>
					</div>
					<div className="grid gap-4 text-sm">
						<div>
							<span className="font-medium">Director:</span> {movie.director}
						</div>
						<div>
							<span className="font-medium">Starring:</span>{" "}
							{movie.cast.join(", ")}
						</div>
						<div>
							<span className="font-medium">Genre:</span>{" "}
							{movie.genres.join(", ")}
						</div>
						<div>
							<span className="font-medium">Runtime:</span> {movie.runtime}{" "}
							minutes
						</div>
						<div>
							<span className="font-medium">Release Date:</span>{" "}
							{new Date(movie.release_date).toLocaleDateString()}
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
}
