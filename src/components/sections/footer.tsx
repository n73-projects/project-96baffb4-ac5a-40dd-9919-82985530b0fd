import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin, Github, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/50 py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">n5</h3>
            <p className="text-muted-foreground mb-4">
              Transforming ideas into powerful digital solutions since 2020.
            </p>
            <div className="flex gap-4">
              <Github className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="hover:text-primary cursor-pointer transition-colors">Web Development</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Mobile Apps</li>
              <li className="hover:text-primary cursor-pointer transition-colors">UI/UX Design</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Consulting</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Technologies</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="hover:text-primary cursor-pointer transition-colors">React & Next.js</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Node.js</li>
              <li className="hover:text-primary cursor-pointer transition-colors">TypeScript</li>
              <li className="hover:text-primary cursor-pointer transition-colors">AWS Cloud</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">hello@n5.dev</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2024 n5 Software Development Agency. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}