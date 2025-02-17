import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ChevronRight, Menu } from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  isCollapsed?: boolean
  setIsCollapsed?: (collapsed: boolean) => void
  navItems: {
    title: string
    href: string
    icon: React.ComponentType<{ className?: string }>
  }[]
  user?: {
    name: string
    role: string
    image: string
  }
}

export function Sidebar({
  title,
  isCollapsed = false,
  setIsCollapsed,
  navItems,
  user,
  className,
}: SidebarProps) {
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "relative flex h-screen flex-col border-r bg-sidebar text-sidebar-foreground",
        isCollapsed ? "w-[80px]" : "w-[270px]",
        className
      )}
    >
      <div
        className={cn(
          "flex h-[60px] items-center border-b px-6",
          isCollapsed && "justify-center px-2"
        )}
      >
        {!isCollapsed && (
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold">{title}</span>
          </Link>
        )}
        {setIsCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-3 top-7 h-6 w-6 rounded-full"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <ChevronRight
              className={cn("h-3 w-3 transition-all", isCollapsed && "rotate-180")}
            />
          </Button>
        )}
      </div>
      <ScrollArea className="flex-1 py-2">
        <nav className="grid gap-1 px-2">
          {navItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  pathname === item.href && "bg-sidebar-accent text-sidebar-accent-foreground",
                  isCollapsed && "justify-center"
                )}
              >
                <Icon className="h-4 w-4" />
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>
      {user && (
        <div className="border-t p-4">
          <div className="flex items-center gap-2">
            <img
              src={user.image}
              alt={user.name}
              className="h-8 w-8 rounded-full"
            />
            {!isCollapsed && (
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-sidebar-foreground/60">{user.role}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

interface SidebarMobileProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

Sidebar.Mobile = function SidebarMobile({
  children,
  className,
}: SidebarMobileProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[270px] p-0">
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation Menu</SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}