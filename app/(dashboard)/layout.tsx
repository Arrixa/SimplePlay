"use client"

import { useState } from "react"
import { Sidebar } from "@/components/ui/sidebar"
import { Header } from "@/components/dashboard/header"
import { 
  BarChart3, 
  Bug, 
  BugOff, 
  FileText, 
  Home, 
  LucideCheckCircle, 
  Settings, 
  Shield, 
  Target
} from "lucide-react"

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Targets",
    href: "/dashboard/targets",
    icon: Target,
  },
  {
    title: "Vulnerabilities",
    href: "/dashboard/vulnerabilities",
    icon: Bug,
  },
  {
    title: "Compliance",
    href: "/dashboard/compliance",
    icon: Shield,
  },
  {
    title: "Tests",
    href: "/dashboard/tests",
    icon: LucideCheckCircle,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: FileText,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen">
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        className="hidden lg:block"
        navItems={sidebarNavItems}
        title="Snaptest"
        user={{
          name: "John Doe",
          role: "Admin",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces"
        }}
      />
      <div className="flex-1">
        <Header>
          <Sidebar.Mobile>
            <Sidebar
              isCollapsed={false}
              navItems={sidebarNavItems}
              title="Snaptest"
              user={{
                name: "John Doe",
                role: "Admin",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces"
              }}
            />
          </Sidebar.Mobile>
        </Header>
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}