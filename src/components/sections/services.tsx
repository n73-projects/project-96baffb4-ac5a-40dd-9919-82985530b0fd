import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Smartphone, Globe, Zap, Shield, Headphones } from "lucide-react"

const services = [
  {
    icon: Code,
    title: "Custom Development",
    description: "Bespoke software solutions tailored to your unique business needs and requirements."
  },
  {
    icon: Globe,
    title: "Web Applications",
    description: "Modern, responsive web applications built with cutting-edge technologies."
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Native and cross-platform mobile apps that deliver exceptional user experiences."
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Speed up your applications and improve user satisfaction with our optimization expertise."
  },
  {
    icon: Shield,
    title: "Security Solutions",
    description: "Implement robust security measures to protect your data and users."
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Continuous support and maintenance to keep your applications running smoothly."
  }
]

export function Services() {
  return (
    <section id="services" className="py-20 px-6 bg-muted/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We offer comprehensive software development services to help your business thrive in the digital age
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}