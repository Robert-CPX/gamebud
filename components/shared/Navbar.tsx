import Image from 'next/image'
import React from 'react'
import SearchItem from './SearchItem'
import { Clapperboard } from "lucide-react"
import {
  SignedIn,
  SignedOut,
  UserButton
} from "@clerk/nextjs";
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='flex-center fixed top-0 h-[5rem] w-full justify-between gap-8 p-4'>
      <Link href='/' className='flex-center gap-4 hover:invert-[0.1]'>
        <Image src='/icons/invader.svg' alt='invader' width={46} height={46} />
        <div className='flex flex-col max-lg:hidden'>
          <p className='text-xl font-bold'>Gamebud</p>
          <p className='text-sm font-normal text-muted-foreground'>Let&apos;s play</p>
        </div>
      </Link>
      <div className='flex gap-0 max-lg:w-full lg:w-[28rem]'>
        <SearchItem />
      </div>
      <div className='flex-center gap-4'>
        <SignedIn>
          <Link href='/' className='flex invert-[0.4] hover:invert-0'>
            <Clapperboard className="mr-2 h-6 w-6 max-lg:hidden" /> Dashboard
          </Link>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in">Sign in</Link>
        </SignedOut>
      </div>
    </nav>
  )
}

export default Navbar
