import type { GithubReposResponse } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export function useGetUserRepos(search?: string, repoCount?: number) {
	const query = useQuery({
		queryKey: ["getUserRepos", search, repoCount],
		queryFn: async () => {
			const response = await fetch(
				`https://api.github.com/users/${search}/repos`,
			);

			if (!response.ok)
				throw new Error(`Error searching user: ${response.status}`);

			const data = (await response.json()) as GithubReposResponse[];
			const slicedData = data.slice(0, repoCount);
			return { data, slicedData };
		},
	});

	return query;
}
