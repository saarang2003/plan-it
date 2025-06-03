import React from 'react'

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <div>DashboardLayout
        {children}
    </div>
  )
}

export default DashboardLayout