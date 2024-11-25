"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSearchUser } from "@/features/users/api/use-search-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebounce } from "@uidotdev/usehooks";
import { Search } from "lucide-react";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SearchProfileLoading } from "./profile-loading";

const searchSchema = z.object({
	search: z.string(),
});

export function SearchUsers() {
	const [searchQuery, setSearchQuery] = useQueryState("search", {
		history: "push",
	});

	const debouncedSearchQuery = useDebounce(searchQuery, 500);

	const { data: usersData, isLoading } = useSearchUser(
		debouncedSearchQuery ? debouncedSearchQuery : "",
	);

	const form = useForm<z.infer<typeof searchSchema>>({
		resolver: zodResolver(searchSchema),
		defaultValues: {
			search: "",
		},
	});

	return (
		<div className="container mx-auto px-4 py-4">
			<Form {...form}>
				<form className="max-w-xl mx-auto">
					<FormField
						name="search"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<div className="relative max-w-xl mx-auto">
										<Search className="absolute left-2 top-3 size-4 text-muted-foreground" />
										<Input
											{...field}
											placeholder="username"
											className="pl-8"
											onChange={(e) => {
												field.onChange(e.target.value);
												setSearchQuery(e.target.value);
											}}
										/>
									</div>
								</FormControl>
							</FormItem>
						)}
					/>
				</form>
			</Form>
			{/* {!usersData && !isLoading && (
				<div className="max-w-xl mx-auto border my-4 rounded-lg p-4">
					<p className="text-center">No results found for your search query</p>
				</div>
			)} */}
			{isLoading && (
				<div className="max-w-xl mx-auto border my-4 rounded-lg p-4">
					<SearchProfileLoading />
					{/* <p className="text-center">Loading...</p> */}
				</div>
			)}
			{usersData && (
				<div className="max-w-xl mx-auto border my-4 rounded-lg p-4">
					<div>
						<Link href={`/user/${usersData.login}`}>
							<div className="flex items-center gap-3">
								<Avatar className="rounded-lg">
									<AvatarImage
										src={usersData.avatar_url}
										className="rounded-lg"
									/>
									<AvatarFallback className="rounded-lg">"GH"</AvatarFallback>
								</Avatar>
								<div>
									<p className="font-semibold text-sm">{usersData.name}</p>
									<p className="font-light text-gray-500 text-xs">
										{usersData.bio}
									</p>
								</div>
							</div>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
}
