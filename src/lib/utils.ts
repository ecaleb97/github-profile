import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
	new Date(date).toLocaleString("en-US", {
		month: "short",
		day: "2-digit",
		year: "numeric",
	});
}

export function formatRelativeTime(date: Date) {
	const now = new Date();
	const differenceInSeconds = (now.getTime() - date.getTime()) / 1000;

	if (differenceInSeconds < 60) return "Just now";
	if (differenceInSeconds < 3600)
		return `${Math.round(differenceInSeconds / 60)}m ago`;
	if (differenceInSeconds < 86400)
		return `${Math.round(differenceInSeconds / 3600)}h ago`;
	if (differenceInSeconds < 604800)
		return `${Math.round(differenceInSeconds / 86400)}d ago`;
	return format(date, "MMM/d/yyyy");
}
