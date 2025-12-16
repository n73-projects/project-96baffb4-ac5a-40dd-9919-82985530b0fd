import React, { useState, useMemo } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Calendar as CalendarIcon, User, MessageSquare, Timer } from "lucide-react"
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

const meetingDurations = [
  { value: 30, label: "30 minutes" },
  { value: 60, label: "1 hour" },
  { value: 90, label: "1.5 hours" },
  { value: 120, label: "2 hours" }
]

export function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [selectedDuration, setSelectedDuration] = useState<number>(30)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Calculate end time based on start time and duration
  const calculateEndTime = (startTime: string, durationMinutes: number) => {
    const [hours, minutes] = startTime.split(':').map(Number)
    const startMinutes = hours * 60 + minutes
    const endMinutes = startMinutes + durationMinutes
    const endHours = Math.floor(endMinutes / 60)
    const endMins = endMinutes % 60
    return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`
  }

  // Filter available time slots based on selected duration
  const availableTimeSlots = useMemo(() => {
    return timeSlots.filter(slot => {
      const endTime = calculateEndTime(slot, selectedDuration)
      const [endHour] = endTime.split(':').map(Number)
      return endHour <= 17 // Must end by 17:00
    })
  }, [selectedDuration])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedDate || !selectedTime || !formData.name || !formData.email) {
      toast.error("Please fill in all required fields")
      return
    }

    const endTime = calculateEndTime(selectedTime, selectedDuration)

    // Here you would typically send the data to your backend
    toast.success(`Meeting request submitted! ${selectedDuration} minutes from ${selectedTime} to ${endTime}. I'll get back to you within 24 hours.`)

    // Reset form
    setSelectedDate(undefined)
    setSelectedTime("")
    setSelectedDuration(30)
    setFormData({ name: "", email: "", company: "", message: "" })
  }

  // Reset selected time when duration changes and current time is no longer valid
  const handleDurationChange = (duration: number) => {
    setSelectedDuration(duration)
    if (selectedTime) {
      const newAvailableSlots = timeSlots.filter(slot => {
        const endTime = calculateEndTime(slot, duration)
        const [endHour] = endTime.split(':').map(Number)
        return endHour <= 17
      })
      if (!newAvailableSlots.includes(selectedTime)) {
        setSelectedTime("")
      }
    }
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

          {/* Duration Selector */}
          {selectedDate && (
            <div>
              <Label className="text-sm font-medium mb-3 block flex items-center gap-2">
                <Timer className="h-4 w-4" />
                Meeting Duration
              </Label>
              <Select value={selectedDuration.toString()} onValueChange={(value) => handleDurationChange(Number(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {meetingDurations.map((duration) => (
                    <SelectItem key={duration.value} value={duration.value.toString()}>
                      {duration.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Time Slots */}
          {selectedDate && (
            <div>
              <Label className="text-sm font-medium mb-3 block">
                Available Times ({selectedDuration} minutes each)
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {availableTimeSlots.map((time) => {
                  const endTime = calculateEndTime(time, selectedDuration)
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
              {availableTimeSlots.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No available time slots for {selectedDuration} minute meetings on this day.
                </p>
              )}
            </div>
          )}

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
                {selectedTime} - {calculateEndTime(selectedTime, selectedDuration)} ({selectedDuration} minutes)
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
                    <li>• Flexible meeting duration (30 min - 2 hours)</li>
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