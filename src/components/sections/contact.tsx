import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, MessageCircle, Calendar } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Let's discuss how we can bring your ideas to life. Get in touch with our team today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-center mb-2">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-lg">Email Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Send us an email and we'll get back to you within 24 hours.</p>
              <Button variant="outline" className="w-full">
                hello@x73.dev
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-center mb-2">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-lg">Live Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Chat with our team in real-time for immediate assistance.</p>
              <Button variant="outline" className="w-full">
                Start Chat
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-center mb-2">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-lg">Schedule Call</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Book a 30-minute consultation call to discuss your project.</p>
              <Button variant="outline" className="w-full">
                Book Call
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="text-center">
          <CardContent className="p-8">
            <Badge variant="secondary" className="mb-4">
              🚀 Free Consultation
            </Badge>
            <h3 className="text-2xl font-bold mb-4">Start Your Digital Transformation</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Ready to take your business to the next level? Let's build something amazing together.
            </p>
            <Button size="lg" className="text-lg px-8">
              Get Free Consultation
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}