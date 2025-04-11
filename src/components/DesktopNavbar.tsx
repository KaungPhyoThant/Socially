"use client";
import { useUser } from '@clerk/nextjs';
import React from 'react';
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
import { Button } from '@/components/ui/button';
import ModeToggle from '@/components/ModeToggle';
import { Bell, Home } from 'lucide-react';
import Link from 'next/link';

const DesktopNavbar = () => {
    const { isLoaded, isSignedIn, user } = useUser();

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (!isSignedIn) {
        return <div className='hidden md:flex'>
            <ModeToggle />
            <Button variant="ghost" className="border flex items-center ms-3" asChild>
                <Link href="/">
                    <Home className="w-4 h-4" />
                    <span className="hidden lg:inline">Home</span>
                </Link>
            </Button>
            <SignedOut>
                <SignInButton mode='modal'>
                    <Button variant='ghost' className='border cursor-pointer mx-3'>
                        Sign In
                    </Button>
                </SignInButton>
            </SignedOut>
        </div>;
    }

    return (
        <div className='hidden md:flex justify-evenly space-x-3'>
            <ModeToggle />
            <Button variant="ghost" className="border flex items-center gap-2" asChild>
                <Link href="/">
                    <Home className="w-4 h-4" />
                    <span className="hidden lg:inline">Home</span>
                </Link>
            </Button>
            <Button variant="ghost" className="border flex items-center gap-2" asChild>
                <Link href="/notifications">
                    <Bell className="w-4 h-4" />
                    <span className="hidden lg:inline">Notifications</span>
                </Link>
            </Button>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    );
};

export default DesktopNavbar;
