"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, UserRound, Building2, Users, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const routes = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Doctors",
      path: "/doctors",
      icon: UserRound,
    },
    {
      name: "Hospitals",
      path: "/hospitals",
      icon: Building2,
    },
    {
      name: "Patients",
      path: "/patients",
      icon: Users,
    },
  ]

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </Button>

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-md border-r transform transition-transform duration-200 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:w-64
      `}
      >
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold">Hospital Management</h1>
        </div>
        <nav className="p-4 space-y-2">
          {routes.map((route) => {
            const isActive = pathname === route.path
            return (
              <Link key={route.path} href={route.path} onClick={() => setIsOpen(false)}>
                <div
                  className={`
                  flex items-center gap-3 px-4 py-3 rounded-md transition-colors
                  ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-foreground"}
                `}
                >
                  <route.icon className="h-5 w-5" />
                  <span>{route.name}</span>
                </div>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/20 z-30 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}

