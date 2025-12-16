import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Hero() {
  return (
    <section className="py-20 px-6 text-center">
      <div className="container mx-auto max-w-4xl">
        <Badge variant="secondary" className="mb-6 animate-fade-in">
          ✨ Innovation Through Code
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up">
          We Turn Ideas Into
          <span className="text-white">
            {" "}Software
          </span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
          x73 is a modern software agency turning ideas into fast, scalable digital products. We build clean, high-performance applications that help businesses grow.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
          <Button size="lg" className="text-lg px-8" asChild>
            <a href="#booking">Start Your Project</a>
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8" asChild>
            <a href="#services">View My Services</a>
          </Button>
        </div>
      </div>
    </section>
  )
}