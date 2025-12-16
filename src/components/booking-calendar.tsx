import React, { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Clock, Calendar as CalendarIcon, User, MessageSquare } from "lucide-react"
import toast from "react-hot-toast"

// Generate time slots from 10:00 to 17:00 in 30-minute intervals
const generateTimeSlots = () => {
  const slots = []
  for (let hour = 10; hour <= 17; hour++) {
    if (hour === 17) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`)
    } else {
      slots.push(`${hour.toString().padStart(2, '0')}:00`)
      slots.push(`${hour.toString().padStart(2, '0')}:30`)
    }
  }
  return slots
}

const timeSlots = generateTimeSlots()

// Only 30-minute meetings are allowed
const meetingDuration = 30

// Helper functions
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

// Get the first available weekday (today or next weekday if today is weekend/past)
const getFirstAvailableDate = () => {
  const today = new Date()
  let date = new Date(today)

  // If it's weekend or past time, start from next day
  if (isWeekend(today) || isPastDate(today)) {
    date.setDate(date.getDate() + 1)
  }

  // Find next weekday
  while (isWeekend(date) || isPastDate(date)) {
    date.setDate(date.getDate() + 1)
  }

  return date
}

export function BookingCalendar() {

  const [selectedDate, setSelectedDate] = useState<Date>(getFirstAvailableDate())
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

  // Calculate end time based on start time (always 30 minutes)
  const calculateEndTime = (startTime: string) => {
    const [hours, minutes] = startTime.split(':').map(Number)
    const startMinutes = hours * 60 + minutes
    const endMinutes = startMinutes + meetingDuration
    const endHours = Math.floor(endMinutes / 60)
    const endMins = endMinutes % 60
    return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`
  }

  // All time slots are available since all meetings are 30 minutes
  const availableTimeSlots = timeSlots

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedDate || !selectedTime || !formData.name || !formData.email) {
      toast.error("Please fill in all required fields")
      return
    }

    const endTime = calculateEndTime(selectedTime)

    // Here you would typically send the data to your backend
    toast.success(`Meeting request submitted! 30 minutes from ${selectedTime} to ${endTime}. I'll get back to you within 24 hours.`)

    // Reset form
    setSelectedDate(getFirstAvailableDate())
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
          <div className="w-full">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={disabledDays}
              className="rounded-md border w-full"
              required
            />
          </div>

          {/* Time Slots */}
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Available Times (30 minutes each)
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {availableTimeSlots.map((time) => {
                const endTime = calculateEndTime(time)
                return (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                    className="text-xs h-auto py-2 flex flex-col gap-1"
                  >
                    <span className="font-medium">{time}</span>
                    <span className="text-[10px] opacity-70">to {endTime}</span>
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Selected DateTime Display */}
          {selectedDate && selectedTime && (
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                <span className="font-medium">Selected Meeting:</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {formatDate(selectedDate)}
              </p>
              <p className="text-sm font-medium">
                {selectedTime} - {calculateEndTime(selectedTime)} (30 minutes)
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div className="space-y-2">
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

            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                placeholder="Your company name (optional)"
              />
            </div>

            <div className="space-y-2">
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
              <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">What to expect:</p>
                  <ul className="text-muted-foreground mt-1 space-y-1">
                    <li>• 30-minute consultation meeting</li>
                    <li>• Available 10:00 AM - 5:00 PM, weekdays only</li>
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