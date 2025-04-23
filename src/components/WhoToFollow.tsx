import { getRandomUser } from '@/actions/user.action'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Link from 'next/link';
import { Avatar, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import FollowButton from './FollowButton';

async function WhoToFollow() {
    const users = await getRandomUser();
    if (users.length === 0) return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Who To Follow
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className='space-y-4'>
                    {users.map((user) => (
                        <div key={user.id} className='flex gap-2 items-center justify-between'>
                            <div className='flex gap-1 items-center'>
                                <Link href={`/profile/${user.username}`}>
                                    <Avatar>
                                        <AvatarImage src={user.image ?? "/avatar.png"} />
                                    </Avatar>
                                </Link>
                                <div className='text-xs'>
                                    <Link href={`/profile/${user.username}`} className='font-medium cursor-pointer'>
                                        {user.name}
                                    </Link>
                                    <p className='text-muted-foreground'>@{user.username}</p>
                                    <p className='text-muted-foreground'>{user._count.followers} Followers</p>
                                </div>
                            </div>
                            <FollowButton userId={user.id} />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default WhoToFollow
