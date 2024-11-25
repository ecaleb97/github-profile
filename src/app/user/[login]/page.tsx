"use client";

import { ProfileLoading } from "@/components/profile-loading";
import { UserProfile } from "@/components/profile/profile";
import UserNotFound from "@/components/user-not-found";
import { useSearchUser } from "@/features/users/api/use-search-user";

export default function UserProfilePage({
	params,
}: {
	params: { login: string };
}) {
	const { data: userData, isLoading } = useSearchUser(params.login);

	return (
		<div>
			{!userData && !isLoading && <UserNotFound />}
			{isLoading && <ProfileLoading />}
			{userData && <UserProfile user={userData} />}
		</div>
	);
}
