/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { api } from '@/convex/_generated/api';
import { SignOutButton, useUser } from '@clerk/nextjs';
import { useConvex } from 'convex/react';
import { ChevronDown, LogOut, Plus, Settings } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils';



export interface Team {
  _id: string;
  teamName: string;
  createdBy: string;
}


function SideNavTopSection({ user, setActiveTeamInfo }: any) {

    const router = useRouter();
  const convex = useConvex();
  const menu = [
    {
      id: 1,
      name: "create team",
      path: "/team/create",
      icon: <Plus size={16} className="mr-2" />,
    },
    {
      id: 2,
      name: "settings",
      path: "/settings",
      icon: <Settings size={16} className="mr-2" />,
    },
  ];
  const [activeTeam, setActiveTeam] = useState<Team>();
  const [teamList, setTeamList] = useState([] as Team[]);

    const getTeamList = async () => {
    const result = await convex.query(api.teams.getTeams, {
      email: user?.user?.primaryEmailAddress?.emailAddress || "",
    });
    setTeamList(result as Team[]);
    setActiveTeam(result[0]);
    return result;
  };

   useEffect(() => {
    if (user) {
      getTeamList();
    }
  }, [user]);


   useEffect(() => {
    activeTeam ? setActiveTeamInfo(activeTeam) : null;
  }, [activeTeam]);
  

  const  [isOpen, setIsOpen] = useState(false);

  return (
    
      <DropdownMenu>
      <DropdownMenuTrigger asChild className="outline-none">
        <div
          className={cn(
            "flex items-center w-fit hover:bg-neutral-600 gap-2 cursor-pointer rounded-md px-2 mt-4 ml-2",
            { "bg-neutral-600": isOpen }
          )}
        >
          <Image src="/logo.svg" alt="logo" width={100} height={100} />
          <h2 className="text-sm font-semibold">{activeTeam?.teamName}</h2>
          <ChevronDown size={16} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-neutral-800 gap-1 rounded-lg text-white border-neutral-600 w-60 ml-4 mt-2">
        {teamList &&
          teamList.map((team) => (
            <DropdownMenuItem
              key={team.teamName}
              onClick={() => setActiveTeam(team)}
              className={cn(
                "cursor-pointer focus:bg-neutral-700 focus:text-white",
                {
                  "bg-blue-500 text-white":
                    activeTeam?.teamName === team.teamName,
                }
              )}
            >
              {team.teamName}
            </DropdownMenuItem>
          ))}

        <DropdownMenuSeparator className="bg-neutral-600" />
        {menu.map((item) => (
          <DropdownMenuItem
            key={item.id}
            onClick={() => {
              router.push(item.path);
            }}
            className="cursor-pointer focus:bg-neutral-700 focus:text-white"
          >
            {item.icon}
            {item.name}
          </DropdownMenuItem>
        ))}
        <SignOutButton>
          <DropdownMenuItem className="cursor-pointer focus:bg-neutral-700 focus:text-white">
            <LogOut size={16} className="mr-2" />
            Logout
          </DropdownMenuItem>
        </SignOutButton>
        <DropdownMenuSeparator className="bg-neutral-600" />
        <div className="flex items-center space-x-2 p-2 rounded-lg">
          <div>
            <Image
              src={
              user?.user?.imageUrl  ??
                "https://img.freepik.com/free-vector/graphic-designer-man_78370-159.jpg?size=626&ext=jpg&ga=GA1.1.1395880969.1709251200&semt=ais"
              }
              alt="user picture"
              className="rounded-full h-8 w-8 object-cover"
            />
          </div>
          <div className="-space-y-1">
            <p className="text-sm font-semibold">
              {user?.user?.fullName}{" "}
            </p>
            <p className="text-xs font-light">{user?.user?.primaryEmailAddress?.emailAddress }</p>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SideNavTopSection