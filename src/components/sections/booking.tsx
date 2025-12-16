import { BookingCalendar } from "@/components/booking-calendar"

export function Booking() {
  return (
    <section id="booking" className="py-20 px-6 bg-muted/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Book a Consultation</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to discuss your project? Schedule a free 30-minute consultation call to explore how we can bring your ideas to life. Available weekdays from 10:00 AM to 5:00 PM.
          </p>
        </div>

        <BookingCalendar />
      </div>
    </section>
  )
}