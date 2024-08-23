// app/components/SearchMovies.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchMovies = () => {
	const [query, setQuery] = useState("");
	const router = useRouter();

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (query.trim()) {
			router.push(`/movies?query=${encodeURIComponent(query)}`);
		}
	};

	return (
		<form onSubmit={handleSearch} className="flex items-center space-x-4">
			<Input
				type="text"
				placeholder="Search for movies..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<Button type="submit">Search</Button>
		</form>
	);
};

export default SearchMovies;
