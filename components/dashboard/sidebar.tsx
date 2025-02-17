"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { 
  BarChart3, 
  Bug, 
  ChevronRight,
  FileText, 
  Home, 
  Menu,
  Settings, 
  Shield, 
  Target, 
  TestTube
} from "lucide-react"
import { Label } from "recharts"

const sidebarItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Target, label: "Targets", href: "/dashboard/targets" },
  {icon: TestTube, Label:"Test", href:"/dashboard/tests"},
  { icon: Bug, label: "Vulnerabilities", href: "/dashboard/vulnerabilities" },
  { icon: Shield, label: "Compliance", href: "/dashboard/compliance" },
  { icon: FileText, label: "Reports", href: "/dashboard/reports" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean
}

export function Sidebar({ className, isCollapsed }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("flex flex-col h-screen", className)}>
      <div className={cn(
        "h-[52px] flex items-center justify-center",
        isCollapsed ? "h-[52px]" : "px-6"
      )}>
        {!isCollapsed && (
          <h1 className="text-2xl font-bold text-primary">Snaptest</h1>
        )}
      </div>
      <ScrollArea className="flex-1">
        <div className={cn("flex flex-col gap-2 p-2")}>
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                  pathname === item.href
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground",
                  isCollapsed && "justify-center"
                )}
              >
                <Icon className="h-4 w-4" />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </div>
      </ScrollArea>
      <div className={cn("h-[52px] flex items-center justify-center border-t")}>
        <div className="flex items-center gap-2 p-2">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces"
            alt="Profile"
            className="h-8 w-8 rounded-full"
          />
          {!isCollapsed && (
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface MobileSidebarProps {
  isCollapsed: boolean
}

export function MobileSidebar({ isCollapsed }: MobileSidebarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-[270px]">
        <Sidebar isCollapsed={isCollapsed} />
      </SheetContent>
    </Sheet>
  )
}