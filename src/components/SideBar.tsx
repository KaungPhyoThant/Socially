import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { currentUser } from '@clerk/nextjs/server'
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { Button } from './ui/button';
import { getUserByClerkId } from '@/actions/user.action';
import Link from 'next/link';
import { Avatar, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { LinkIcon, MapPinIcon } from 'lucide-react';

async function SideBar() {
    const authUser = await currentUser();
    if (!authUser) return unAuthenticatedSidebar();
    const user = await getUserByClerkId(authUser.id)
    if (!user) return null;

    console.log({ user });

    return (
        <div className='sticky top-20'>
            <Card>
                <CardContent className='pt-6'>
                    <Link href={`/profile/${authUser.username ?? authUser.emailAddresses[0].emailAddress.split("@")[0]}`}
                        className='flex flex-col items-center justify-center'
                    >
                        <Avatar className='w-20 h-20 border-2'>
                            <AvatarImage src={user.image || "/avatar.png"} />
                        </Avatar>

                        <div className='mt-4 space-y-1 text-center'>
                            <h3 className='font-semibold'>{user.name}</h3>
                            <p className='text-sm text-muted-foreground'>@{user.username}</p>
                        </div>
                    </Link>
                    {user.bio && <p className='mt-3 text-sm text-muted-foreground'>{user.bio}</p>}
                    <div className='w-full'>
                        <Separator className='my-4' />
                        <div className='flex justify-between text-center'>
                            <div>
                                <p className='font-medium'>{user._count.followers}</p>
                                <p className='text-xs text-muted-foreground'>Followers</p>
                            </div>
                            <Separator orientation="vertical" />
                            <div>
                                <p className='font-medium'>{user._count.following}</p>
                                <p className='text-xs text-muted-foreground'>Following</p>
                            </div>
                        </div>
                        <Separator className='my-4' />
                    </div>

                    <div className='w-full space-y-2 text-sm'>
                        <div className='flex items-center text-muted-foreground'>
                            <MapPinIcon className='w-4 h-4 mr-2' />
                            {user.location || "No location"}
                        </div>
                        <div className='flex items-center text-muted-foreground'>
                            <LinkIcon className='w-4 h-4 mr-2 shrink-0' />
                            {user.website ? (
                                <a href={`${user.website}`} className='hover:underline truncate'>
                                    {user.website}
                                </a>
                            ) : (
                                "No website"
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default SideBar

const unAuthenticatedSidebar = () => (
    <div className='sticky top-20'>
        <Card >
            <CardHeader>
                <CardTitle className='text-center text-xl font-semibold'>
                    Welcome
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className='text-center text-muted-foreground mb-4'>
                    Login to access your profile and connect with people.
                </p>
                <SignInButton mode='modal'>
                    <Button variant='ghost' className='border cursor-pointer w-full'>
                        Sign In
                    </Button>
                </SignInButton>
                <SignUpButton mode='modal'>
                    <Button variant='default' className='border cursor-pointer mt-3 w-full'>
                        Sign up
                    </Button>
                </SignUpButton>
            </CardContent>
        </Card>
    </div>
)
