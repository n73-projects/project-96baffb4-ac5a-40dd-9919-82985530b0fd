import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold">
            n<span className="text-primary">5</span>
          </h1>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">
              Services
            </a>
            <a href="#team" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button size="sm">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  )
}