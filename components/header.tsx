"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, TestTube, ArrowLeft } from "lucide-react"
import { trackClick } from "@/lib/analytics"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const shouldShowBackButton = pathname?.includes("/test") || false
  const backHref = shouldShowBackButton 
    ? (pathname?.includes("/tests/") 
        ? pathname?.split("/test")[0] || "/tests" 
        : pathname?.split("/test")[0] || "/")
    : "/"

  const handleNavClick = (item: string) => {
    trackClick(`nav_${item}`, pathname || "")
    setIsOpen(false)
  }

  const navItems = [
    { href: "/", label: "홈", icon: Home },
    { href: "/tests", label: "테스트", icon: TestTube },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {shouldShowBackButton && (
          <Link
            href={backHref}
            className="mr-4 flex items-center text-sm font-medium transition-colors hover:text-foreground/80"
            onClick={() => handleNavClick("back")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
        )}

        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2" onClick={() => handleNavClick("logo")}>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="hidden font-bold sm:inline-block">테몬 MBTI</span>
            </div>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-1 transition-colors hover:text-foreground/80 text-foreground/60"
                  onClick={() => handleNavClick(item.label.toLowerCase())}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">메뉴 토글</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link href="/" className="flex items-center space-x-2" onClick={() => handleNavClick("mobile_logo")}>
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="font-bold">테몬 MBTI</span>
            </Link>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                      onClick={() => handleNavClick(`mobile_${item.label.toLowerCase()}`)}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link
              href="/"
              className="flex items-center space-x-2 md:hidden"
              onClick={() => handleNavClick("mobile_logo_center")}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="font-bold">테몬 MBTI</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
