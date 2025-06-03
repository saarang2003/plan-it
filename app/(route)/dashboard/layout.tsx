"use client";
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useConvex } from 'convex/react';
import { useRouter } from 'next/navigation';

import React, { useEffect } from 'react'
import SideNav from './_components/SideNav';

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


    const user = useUser();
    const convex = useConvex();
    const router = useRouter();

     useEffect(() => {
    if (user) {
      checkTeam();
    }
  }, [user]);

   const checkTeam = async () => {
    const result = await convex.query(api.teams.getTeams, {
      email: user?.user?.primaryEmailAddress?.emailAddress || "",
    });
    if (!result.length) {
      router.push("/team/create");
    }
  };


  return (
    <div>DashboardLayout
        <div className="grid sm:grid-cols-5 ">
          <div className="sm:col-span-1">
            <SideNav />
          </div>
          <div className="sm:col-span-4 h-screen overscroll-x-none overflow-y-auto w-full">
            {children}
          </div>
        </div>
    </div>
  )
}

export default DashboardLayout