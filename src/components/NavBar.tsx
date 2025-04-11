import Link from 'next/link'
import React from 'react'
import DesktopNavbar from './DesktopNavbar'
import MobileNavbar from './MobileNavbar'
import { syncUser } from '@/actions/user.action'
import { currentUser } from '@clerk/nextjs/server'

async function NavBar() {
    const user = currentUser();
    if (user) await syncUser();
    return (
        <nav className='sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50'>
            <div className='mx-auto max-w-7xl px-4'>
                <div className='flex items-center justify-between h-16'>
                    <div className='flex items-center'>
                        <Link href={"/"} className='text-xl font-bold text-primary font-mono tracking-wider'>
                            Socially
                        </Link>
                    </div>
                    <DesktopNavbar />
                    <MobileNavbar />
                </div>
            </div>
        </nav>
    )
}

export default NavBar
