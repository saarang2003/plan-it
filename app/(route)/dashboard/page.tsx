"use client";
import { SignedIn, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function Dashboard() {
  return (
   <header className="bg-black dark:bg-gray-900">
  <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between">
      <div className="flex-1 md:flex md:items-center md:gap-12">
        <a className="block text-teal-600 dark:text-teal-300" href="#">
          <span className="sr-only">Home</span>
        <Image src="./logo.svg" width={50} height={50} alt="logo" />
        </a>
      </div>

      <div className="md:flex md:items-center md:gap-12">
        <div className="flex items-center gap-4">
          <div className="sm:flex sm:gap-4">


            <div className="hidden sm:flex">
                <SignedIn>
            <UserButton/>
                </SignedIn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>
  )
}

export default Dashboard