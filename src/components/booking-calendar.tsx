import React, { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Clock, Calendar as CalendarIcon, User, MessageSquare } from "lucide-react"
import toast from "react-hot-toast"

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
]

export function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedDate || !selectedTime || !formData.name || !formData.email) {
      toast.error("Please fill in all required fields")
      return
    }

    // Here you would typically send the data to your backend
    toast.success("Meeting request submitted! I'll get back to you within 24 hours.")

    // Reset form
    setSelectedDate(undefined)
    setSelectedTime("")
    setFormData({ name: "", email: "", company: "", message: "" })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const isWeekend = (date: Date) => {
    const day = date.getDay()
    return day === 0 || day === 6
  }

  const isPastDate = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const disabledDays = (date: Date) => {
    return isWeekend(date) || isPastDate(date)
  }

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Calendar Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Select Date & Time
          </CardTitle>
          <CardDescription>
            Choose your preferred date and time for our consultation call
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Calendar */}
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={disabledDays}
              className="rounded-md border"
            />
          </div>

          {/* Time Slots */}
          {selectedDate && (
            <div>
              <Label className="text-sm font-medium mb-3 block">Available Times</Label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                    className="text-sm"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Selected DateTime Display */}
          {selectedDate && selectedTime && (
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                <span className="font-medium">Selected:</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {formatDate(selectedDate)} at {selectedTime}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Booking Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Your Information
          </CardTitle>
          <CardDescription>
            Tell me about your project and how I can help you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                placeholder="Your company name (optional)"
              />
            </div>

            <div>
              <Label htmlFor="message">Project Details *</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="Tell me about your project, goals, timeline, and any specific requirements..."
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900 dark:text-blue-100">What to expect:</p>
                  <ul className="text-blue-700 dark:text-blue-300 mt-1 space-y-1">
                    <li>• 30-minute consultation call</li>
                    <li>• Discussion of your project requirements</li>
                    <li>• Technical recommendations and timeline</li>
                    <li>• Custom proposal and next steps</li>
                  </ul>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={!selectedDate || !selectedTime || !formData.name || !formData.email || !formData.message}
              >
                Book Consultation Call
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}