"use client"

import { BarberShop, BarberShopService, Booking } from "@prisma/client"

import Image from "next/image"
import React, { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"
import { Calendar } from "@/components/ui/calendar"
import { ptBR } from "date-fns/locale"
import { addDays, format, set } from "date-fns"
import { createBooking } from "../_action/create-booking"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { getBookings } from "../_action/get-bookings"

interface ServiceItemProps {
  service: BarberShopService
  barberShop: Pick<BarberShop, "name">
}

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:30",
  "10:00",
  "11:30",
  "11:00",
  "12:30",
  "12:00",
  "13:30",
  "13:00",
  "14:30",
  "14:00",
  "15:30",
  "15:00",
  "16:30",
  "16:00",
  "17:30",
  "17:00",
  "18:30",
  "18:00",
]

const getTimeList = (bookings: Booking[]) => {
  return TIME_LIST.filter((time) => {
    const hour = Number(time.split(":")[0])
    const minutes = Number(time.split(":")[1])

    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minutes,
    )

    if (hasBookingOnCurrentTime) {
      return false
    }
    return true
  })
}

function ServiceItem({ service, barberShop }: ServiceItemProps) {
  const { data } = useSession()
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )
  const [dayBookings, setDayBookings] = useState<Booking[]>([])
  const [bookingsSheetIsOpen, setBookingsSheetIsOpen] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      if (!selectedDay) return

      const bookings = await getBookings({
        date: selectedDay,
        serviceID: service.id,
      })

      setDayBookings(bookings)
    }

    fetch()
  }, [selectedDay, service.id])

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date)
  }
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleCreateBooking = async () => {
    try {
      if (!selectedDay || !selectedTime) return

      const hour = Number(selectedTime.split(":")[0])
      const minute = Number(selectedTime.split(":")[1])

      const newDate = set(selectedDay, {
        minutes: minute,
        hours: hour,
      })
      await createBooking({
        serviceId: service.id,
        //eslint-disable-next-line
        userId: (data?.user as any).id,
        date: newDate,
      })
      handleBookingSheetOpenChange()
      toast.success("Reserva criada com sucesso!")
    } catch (error) {
      console.error(error)
      toast.error("Erro ao criar a reserva!")
    }
  }

  const handleBookingSheetOpenChange = () => {
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setDayBookings([])
    setBookingsSheetIsOpen(false)
  }

  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-3">
        {/* Image  */}
        <div className="max'-w-[110px] relative max-h-[110px] min-h-[110px] min-w-[110px]">
          <Image
            src={service.imageUrl}
            fill
            className="rounded-lg object-cover"
            alt={service.name}
          />
        </div>

        {/* Right  */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">{service.name}</h3>
          <p className="text-sm text-gray-400">{service.description}</p>

          {/* Price & Button  */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-primary">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>
            <Sheet
              open={bookingsSheetIsOpen}
              onOpenChange={handleBookingSheetOpenChange}
            >
              <Button
                variant={"secondary"}
                size={"sm"}
                onClick={() => setBookingsSheetIsOpen(true)}
              >
                Reservar
              </Button>
              <SheetContent className="px-0">
                <SheetHeader>
                  <SheetTitle>Fazer Reserva</SheetTitle>
                </SheetHeader>

                <div className="border-b border-solid py-5">
                  <Calendar
                    selected={selectedDay}
                    onSelect={handleDateSelect}
                    fromDate={addDays(new Date(), 1)}
                    mode="single"
                    locale={ptBR}
                    styles={{
                      head_cell: {
                        width: "100%",
                        textTransform: "capitalize",
                      },
                      cell: {
                        width: "100%",
                      },
                      button: {
                        width: "100%",
                      },
                      nav_button_previous: {
                        width: "32px",
                        height: "32px",
                      },
                      nav_button_next: {
                        width: "32px",
                        height: "32px",
                      },
                      caption: {
                        textTransform: "capitalize",
                      },
                    }}
                  />
                </div>
                {selectedDay && (
                  <div className="flex gap-3 overflow-x-auto border-b border-solid p-5 [&::-webkit-scrollbar]:hidden">
                    {getTimeList(dayBookings).map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className="rounded-full"
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                )}

                {selectedTime && selectedDay && (
                  <div className="p-5">
                    <Card>
                      <CardContent className="space-y-3 p-3">
                        <div className="flex items-center justify-between">
                          <h2 className="font-bold">{service.name}</h2>
                          <p className="text-sm font-bold">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(Number(service.price))}
                          </p>
                        </div>
                        {/* Data */}
                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-gray-400">Data</h2>
                          <p className="text-sm">
                            {format(selectedDay, "d 'de' MMMM", {
                              locale: ptBR,
                            })}
                          </p>
                        </div>
                        {/* Horário */}
                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-gray-400">Horário</h2>
                          <p className="text-sm">{selectedTime}</p>
                        </div>
                        {/* Barbearia */}
                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-gray-400">Barbearia</h2>
                          <p className="text-sm">{barberShop.name}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                <SheetFooter className="mt-5 px-5">
                  <Button
                    onClick={handleCreateBooking}
                    disabled={!selectedDay || !selectedTime}
                  >
                    Confirmar
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
