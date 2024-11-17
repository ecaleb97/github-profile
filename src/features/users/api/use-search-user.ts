import type { GithubProfileResponse } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export function useSearchUser(search?: string) {
	const query = useQuery({
		enabled: !!search,
		queryKey: ["searchUser", search],
		queryFn: async () => {
			const response = await fetch(`https://api.github.com/users/${search}`);

			if (!response.ok)
				throw new Error(`Error searching user: ${response.status}`);

			const data = (await response.json()) as GithubProfileResponse;
			return data;
		},
	});

	return query;
}
