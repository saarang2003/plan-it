/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import { api } from '@/convex/_generated/api';
import { SignedIn, UserButton, useUser } from '@clerk/nextjs'
import { useConvex, useMutation, useQuery } from 'convex/react';
import Image from 'next/image'
import React, { useEffect } from 'react'

export function Dashboard() {

    const convex = useConvex();

    const user = useUser();
    console.log(":user detail" , user)
    console.log("user" , user?.user?.primaryEmailAddress?.emailAddress);
    const getUser = useQuery(api.user.getUser , {email : user?.user?.primaryEmailAddress?.emailAddress ?? ""});

    const createUser = useMutation(api.user.createUser);
    useEffect(() => {
      const checkUser = async () => {
        const result = await convex.query(api.user.getUser, { email: user?.user?.primaryEmailAddress?.emailAddress || "" });

        if (!result.length) {
          createUser({
            name: user?.user?.fullName || "",
            email: user?.user?.primaryEmailAddress?.emailAddress || "",
            image:
              user?.user?.imageUrl ||
              "https://img.freepik.com/free-vector/graphic-designer-man_78370-159.jpg?size=626&ext=jpg&ga=GA1.1.1395880969.1709251200&semt=ais",
          }).then((res) => {
            console.log(res);
          });
        }
      };

      if (user) {
        checkUser();
      }
    }, [user]);


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