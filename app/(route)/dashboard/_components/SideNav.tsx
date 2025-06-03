

import React from 'react'
import SideNavTopSection from './SideNavTopSection'

function SideNav() {
  return (
    <div className="text-white h-screen hidden sm:fixed max-w-64 py-4 px-4 sm:flex border-r border-neutral-800 flex-col">
          <div className="flex-1">
          <SideNavTopSection />
        </div>
    </div>
  )
}

export default SideNav