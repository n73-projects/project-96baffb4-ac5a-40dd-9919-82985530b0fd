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
          We Build Digital
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {" "}Solutions
          </span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
          n5 is a cutting-edge software development agency that transforms ideas into powerful digital experiences.
          We craft scalable, modern applications that drive business growth.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
          <Button size="lg" className="text-lg px-8">
            Start Your Project
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8">
            View Our Work
          </Button>
        </div>
      </div>
    </section>
  )
}