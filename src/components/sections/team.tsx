import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const team = [
  {
    name: "Valentin Bontus",
    role: "Full Stack Developer & Founder",
    expertise: ["React", "Node.js", "TypeScript", "SEO", "UI/UX Design"],
    avatar: "/api/placeholder/100/100",
    initials: "VB"
  }
]

export function Team() {
  return (
    <section id="team" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hi, I'm Valentin - a passionate full-stack developer dedicated to creating exceptional digital solutions for your business
          </p>
        </div>
        <div className="flex justify-center">
          <div className="max-w-sm">
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
      </div>
    </section>
  )
}