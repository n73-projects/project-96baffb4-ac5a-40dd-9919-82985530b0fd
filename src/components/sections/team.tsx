import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const team = [
  {
    name: "Alex Rodriguez",
    role: "Lead Developer",
    expertise: ["React", "Node.js", "TypeScript"],
    avatar: "/api/placeholder/100/100",
    initials: "AR"
  },
  {
    name: "Sarah Chen",
    role: "UI/UX Designer",
    expertise: ["Design Systems", "Figma", "User Research"],
    avatar: "/api/placeholder/100/100",
    initials: "SC"
  },
  {
    name: "Michael Johnson",
    role: "Backend Engineer",
    expertise: ["Python", "PostgreSQL", "AWS"],
    avatar: "/api/placeholder/100/100",
    initials: "MJ"
  },
  {
    name: "Emily Davis",
    role: "Mobile Developer",
    expertise: ["React Native", "Flutter", "iOS"],
    avatar: "/api/placeholder/100/100",
    initials: "ED"
  }
]

export function Team() {
  return (
    <section id="team" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our talented team of developers, designers, and engineers are passionate about creating exceptional digital solutions
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="text-lg">{member.initials}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                <p className="text-muted-foreground mb-3">{member.role}</p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {member.expertise.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}