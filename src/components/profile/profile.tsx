import shield from "@/assets/images/Chield_alt.svg";
import nesting from "@/assets/images/Nesting.svg";
import github from "@/assets/images/github.svg";
import Github from "@/components/icons/github";
import { ReposLoading } from "@/components/repos-loading";
import { SearchUsers } from "@/components/search-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useGetUserRepos } from "@/features/users/api/use-get-user-repos";
import { formatRelativeTime } from "@/lib/utils";
import type { GithubProfileResponse } from "@/types/types";
import { ArrowUpRight, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function UserProfile({ user }: { user: GithubProfileResponse }) {
	const [repoCount, setRepoCount] = useState(6);
	const { data: repos, isLoading } = useGetUserRepos(user.login, repoCount);
	const reposLength = repos?.data.length
	console.log(repos, reposLength);

	function handleViewMoreRepos() {
		setRepoCount((prev) => prev + 6);
	}

	return (
		<>
			{user && (
				<div className="min-h-screen">
					<div className="relative">
						<SearchUsers />
						<main className="container max-w-[1100px] mx-auto px-4 py-8">
							{/* Profile Section */}
							<div className="flex flex-col items-start gap-4">
								<Avatar className="rounded-2xl size-24">
									<AvatarImage
										src={user?.avatar_url}
										alt="Avatar"
										className="rounded-2xl"
									/>
									<AvatarFallback className="rounded-2xl">"GH"</AvatarFallback>
								</Avatar>
								<div className="">
									<h1 className="text-3xl font-bold">{user.name}</h1>
									<p className="text-muted-foreground text-sm">{user.bio}</p>
								</div>
								{/* Profile Stats */}
								<div className="flex flex-wrap gap-6 py-2 text-sm">
									<div className="flex items-center gap-2 rounded-xl">
										<span>Followers</span>
										<span className="font-semibold">{user.followers}</span>
									</div>
									{/* <Minus className="rotate-90" /> */}
									<div className="flex items-center gap-2 rounded-xl">
										<span>Following</span>
										<span className="font-semibold">{user.following}</span>
									</div>
									{/* <Minus className="rotate-90" /> */}
									<div className="flex items-center gap-2 rounded-xl">
										<span>Location</span>
										<span className="font-semibold">{user.location}</span>
									</div>
								</div>
								{/* Repositories */}
								{isLoading && <ReposLoading />}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
									{repos?.slicedData.map((repo) => (
										<Card
											key={repo.id}
											className="flex flex-col justify-between"
										>
											<CardHeader className="p-4 flex flex-row justify-between">
												<Link
													href={repo.html_url}
													target="_blank"
													className="group flex items-center gap-[6px] font-medium decoration-neutral-500 decoration-dotted underline-offset-[5px] hover:underline"
												>
													<CardTitle className="text-base font-medium flex items-center gap-2 hover:text-black">
														<span>{repo.name}</span>
														<ArrowUpRight className="size-3 opacity-50 duration-200 group-hover:translate-x-[1.5px] group-hover:opacity-100" />
													</CardTitle>
												</Link>
												<Link href={repo.html_url} className="rounded-full">
													<Github className="size-4" />
												</Link>
											</CardHeader>
											<CardContent className="px-4 py-0">
												<p className="truncate text-sm font-light">
													{repo.description}
												</p>
											</CardContent>
											<CardFooter className="p-4 flex gap-2">
												{/* <div className="flex items-center gap-1">
													<Image
														src={shield}
														alt="Shield"
														width={20}
														height={20}
													/>
													<span className="text-muted-foreground">
														{repo.license ? repo.license : "No License"}
													</span>
												</div> */}
												<div className="flex items-center gap-1">
													<Star className="size-4 text-muted-foreground hover:text-yellow-500" />
													<span className="text-muted-foreground text-sm">
														{repo.stargazers_count}
													</span>
												</div>
												<small className="text-muted-foreground">
													updated{" "}
													{formatRelativeTime(new Date(repo.updated_at))}
												</small>
											</CardFooter>
										</Card>
									))}
								</div>
								{repoCount < (reposLength ?? 0) ? (
									<Button
										className="mx-auto"
										variant="link"
										onClick={handleViewMoreRepos}
									>
										View more repos
									</Button>
								) : (
									<div className="w-full mx-auto">
										<p className="text-center text-muted-foreground text-sm">
											No more repositories to show
										</p>
									</div>
								)}
							</div>
						</main>
					</div>
				</div>
			)}
		</>
	);
}
