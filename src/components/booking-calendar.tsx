import React, { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Clock, Calendar as CalendarIcon } from "lucide-react"
import toast from "react-hot-toast"

// Specific time slots as requested
const timeSlots = [
  "10:00",
  "11:00",
  "13:00",
  "14:00"
]

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
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Calendar Section */}
        <Card className="xl:col-span-1">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Select Date
            </CardTitle>
            <CardDescription>
              Choose your preferred day for the consultation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={disabledDays}
              className="rounded-md border w-full"
              required
            />
          </CardContent>
        </Card>

        {/* Time & Info Section */}
        <Card className="xl:col-span-2">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Complete Your Booking
            </CardTitle>
            <CardDescription>
              Select a time slot and provide your details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Time Selection */}
              <div className="space-y-6">
                {/* Time Slots */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">
                    Available Time Slots
                  </Label>
                  <p className="text-sm text-muted-foreground mb-4">
                    All sessions are 30 minutes long
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {availableTimeSlots.map((time) => {
                      const endTime = calculateEndTime(time)
                      return (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTime(time)}
                          className="h-16 flex flex-col gap-1 text-sm"
                        >
                          <span className="font-semibold">{time}</span>
                          <span className="text-xs opacity-70">to {endTime}</span>
                        </Button>
                      )
                    })}
                  </div>
                </div>

                {/* Selected DateTime Display */}
                {selectedDate && selectedTime && (
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-primary">Your Meeting</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        {formatDate(selectedDate)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedTime} - {calculateEndTime(selectedTime)} (30 minutes)
                      </p>
                    </div>
                  </div>
                )}

                {/* What to Expect */}
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-3 text-sm">What to Expect:</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                      30-minute consultation meeting
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                      Discussion of your project requirements
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                      Technical recommendations and timeline
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                      Custom proposal and next steps
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right: Contact Form */}
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-2 block">
                    Your Information
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Tell me about your project so I can prepare for our call
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Your full name"
                        required
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm font-medium">
                      Company
                    </Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      placeholder="Your company name (optional)"
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">
                      Project Details *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Describe your project, goals, timeline, and any specific requirements..."
                      className="min-h-[120px] resize-none"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-semibold"
                    size="lg"
                    disabled={!selectedDate || !selectedTime || !formData.name || !formData.email || !formData.message}
                  >
                    Book Your Consultation
                  </Button>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}