import type { GithubReposResponse } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export function useGetUserRepos(search?: string) {
	const query = useQuery({
		queryKey: ["getUserRepos", search],
		queryFn: async () => {
			const response = await fetch(
				`https://api.github.com/users/${search}/repos`,
			);

			if (!response.ok)
				throw new Error(`Error searching user: ${response.status}`);

			const data = (await response.json()) as GithubReposResponse[];
			return data;
		},
	});

	return query;
}
