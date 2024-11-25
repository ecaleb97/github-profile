import { Skeleton } from "@/components/ui/skeleton";

export function ProfileLoading() {
	return (
		<div className="min-h-screen">
			<div>
				<div className="container mx-auto max-w-xl my-4 p-4 bg-muted animate-pulse rounded-xl h-12" />
				<main className="container max-w-[1100px] mx-auto px-4 py-8">
					<div className="flex flex-col items-start gap-4">
						<Skeleton className="rounded-2xl size-24" />
					</div>
					<div className="my-4 flex flex-col gap-4">
						<Skeleton className="max-w-[200px] h-8" />
						<Skeleton className="max-w-[300px] h-8" />
					</div>
					{/* Profile Stats */}
					<div className="flex flex-wrap gap-4 py-2 mb-4">
						<div className="flex items-center gap-2 rounded-xl">
							<Skeleton className="w-[50px] h-6" />
							<Skeleton className="w-[50px] h-6" />
						</div>
						<div className="flex items-center gap-2 rounded-xl">
							<Skeleton className="w-[50px] h-6" />
							<Skeleton className="w-[50px] h-6" />
						</div>
						<div className="flex items-center gap-2 rounded-xl">
							<Skeleton className="w-[50px] h-6" />
							<Skeleton className="w-[50px] h-6" />
						</div>
					</div>
					{/* Repositories */}
					<ReposLoading />
				</main>
			</div>
		</div>
	);
}

function ReposLoading() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
			<Skeleton className="w-full h-28" />
			<Skeleton className="w-full h-28" />
			<Skeleton className="w-full h-28" />
			<Skeleton className="w-full h-28" />
		</div>
	);
}

export function SearchProfileLoading() {
	return (
		<div className="flex gap-4">
			<div className="bg-muted animate-pulse rounded-lg" />
			<div className="flex flex-col">
				<div className="w-full h-4 bg-muted animate-pulse" />
				<div className="w-full h-4 bg-muted animate-pulse" />
			</div>
		</div>
	);
}
