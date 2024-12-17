"use client"

import Link from 'next/link'
import { Code2, Github } from 'lucide-react'
import { ModeToggle } from '@/components/mode-toggle'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 container mx-auto">
        <Link href="/" className="flex items-center gap-2 font-semibold mr-6">
          <Code2 className="h-6 w-6" />
          <span>Code Editor By dcoso.dev</span>
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="https://github.com/dcosodev/code-editor" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="https://dcoso.dev" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Portfolio
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center gap-2">
          <div className="md:hidden flex gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://github.com/dcoso/code-editor">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://dcoso.dev">
                <span className="text-sm font-medium">DC</span>
              </Link>
            </Button>
          </div>
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}