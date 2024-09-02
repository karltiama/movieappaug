import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchMovieDetails } from "@/app/movies/actions"; // Import server action for fetching movie details
import { Heart, Star } from "lucide-react";
import Link from "next/link";

interface MovieDetailsProps {
	params: {
		movieId: string;
	};
}

interface Actor {
	name: string;
	profile_path: string | null;
}

export default async function MovieDetails({ params }: MovieDetailsProps) {
	const movieId = params.movieId;
	const movie = await fetchMovieDetails(movieId);

	return (
		<Card className="p-4 md:p-6 lg:p-8 max-w-2xl mx-auto">
			<div className="grid md:grid-cols-2 gap-6">
				<div className="flex flex-col items-center">
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
									{movie.vote_average.toFixed(1)}
								</span>
							</div>
						</div>
					</div>
					<div className="mt-6 text-center">
						<h3 className="font-medium mb-2">Starring:</h3>
						<div className="flex gap-2 justify-center">
							{movie.cast.map((actor: Actor) => (
								<div key={actor.name} className="text-center">
									<img
										src={
											actor.profile_path
												? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
												: "/placeholder.svg"
										}
										alt={actor.name}
										width={60}
										height={60}
										className="rounded-full"
										style={{ aspectRatio: "60/60", objectFit: "cover" }}
									/>
									<div
										className="text-xs mt-1 truncate w-[60px]"
										title={actor.name}>
										{actor.name}
									</div>
								</div>
							))}
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
							<span className="font-medium">Runtime:</span> {movie.runtime}{" "}
							minutes
						</div>
						<div>
							<span className="font-medium">Release Date:</span>{" "}
							{new Date(movie.release_date).toLocaleDateString()}
						</div>
					</div>
					<div className="grid gap-4 text-sm">
						<div>
							<span className="font-medium">Description:</span> {movie.overview}
						</div>
					</div>
					<div className="mt-6 flex gap-2 flex-wrap">
						{movie.genres.map((genre: string) => (
							<Link
								href="#"
								key={genre}
								className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/50"
								prefetch={false}>
								{genre}
							</Link>
						))}
					</div>
				</div>
			</div>
		</Card>
	);
}
