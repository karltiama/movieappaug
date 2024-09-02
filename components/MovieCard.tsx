// app/components/MovieCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Star } from "lucide-react";

interface MovieCardProps {
	movie: {
		id: number;
		title: string;
		overview: string;
		poster_path: string;
		vote_average: number;
	};
}

const MovieCard = ({ movie }: MovieCardProps) => {
	return (
		<Card
			key={movie.id}
			className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
			<Link
				href={`/movies/${movie.id}`}
				className="absolute inset-0 z-10"
				prefetch={false}>
				<span className="sr-only">View Movie</span>
			</Link>
			<div className="absolute top-4 right-4 z-20 flex items-center gap-2">
				<Button variant="ghost" size="icon">
					<Plus className="h-4 w-4" />
					<span className="sr-only">Add to Watchlist</span>
				</Button>
				<Button variant="ghost" size="icon">
					<Star className="h-4 w-4" />
					<span className="sr-only">Add to Favorites</span>
				</Button>
			</div>
			<div className="relative">
				<img
					src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
					alt={`${movie.title} Poster`}
					className="object-cover w-full aspect-[2/3]"
				/>
				<div className="absolute top-4 left-4 z-20 flex items-center justify-center bg-primary text-primary-foreground rounded-full w-12 h-12">
					<span className="text-sm font-bold">
						{movie.vote_average.toFixed(1)}
					</span>
				</div>
			</div>
			<CardContent className="p-4 bg-background">
				<h3 className="text-xl font-bold">{movie.title}</h3>
				<p className="text-sm text-muted-foreground line-clamp-2">
					{movie.overview}
				</p>
			</CardContent>
		</Card>
	);
};

export default MovieCard;
