import { Skeleton } from "@/components/ui/skeleton";

export function ReposLoading() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
			<Skeleton className="w-full h-28" />
			<Skeleton className="w-full h-28" />
			<Skeleton className="w-full h-28" />
			<Skeleton className="w-full h-28" />
		</div>
	);
}
