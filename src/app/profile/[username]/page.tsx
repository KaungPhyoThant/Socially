import { cache } from 'react';
import {
    getProfileByUsername,
    getUserLikedPosts,
    getUserPosts,
    isFollowing,
} from "@/actions/profile.action";
import { notFound } from "next/navigation";
import ProfilePageClient from "./ProfilePageClient";
import type { Metadata } from 'next';

interface PageProps {
    params: { username: string };
    searchParams: { [key: string]: string | string[] | undefined };
}

// Cache the profile fetch to avoid duplicate calls
const getCachedProfile = cache(getProfileByUsername);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    try {
        const user = await getCachedProfile(params.username);
        if (!user) return {};

        return {
            title: `${user.name ?? user.username} | YourAppName`,
            description: user.bio || `Check out ${user.username}'s profile on YourAppName.`,
            openGraph: {
                images: user.image ? [user.image] : [],
            },
        };
    } catch (error) {
        console.error('Metadata generation failed:', error);
        return {};
    }
}

export default async function Page({ params }: PageProps) {
    try {
        const user = await getCachedProfile(params.username);
        if (!user) notFound();

        const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
            getUserPosts(user.id),
            getUserLikedPosts(user.id),
            isFollowing(user.id),
        ]);

        return (
            <ProfilePageClient
                user={user}
                posts={posts}
                likedPosts={likedPosts}
                isFollowing={isCurrentUserFollowing}
            />
        );
    } catch (error) {
        console.error('Profile page error:', error);
        notFound();
    }
}
