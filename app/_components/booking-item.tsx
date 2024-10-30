"use client"

import React, { useState } from "react"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Prisma } from "@prisma/client"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Image from "next/image"
import Phoneitem from "./phone-item"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { deleteBooking } from "../_action/delete-booking"
import { toast } from "sonner"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: { service: { include: { barberShop: true } } }
  }>
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const handleCancelBooking = async () => {
    try {
      deleteBooking(booking.id)
      toast.success("Reserva cancelada com sucesso!")
      setIsSheetOpen(false)
    } catch (error) {
      console.error(error)
      toast.error("Erro ao cancelar a reserva. Tente novamente.")
    }
  }

  const handleSheetOpenChange = (isOpen: boolean) => setIsSheetOpen(isOpen)

  const {
    service: { barberShop },
  } = booking
  const isConfirmed = isFuture(booking.date)
  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger className="w-full">
        <Card className="min-w-[90%]">
          <CardContent className="flex justify-between p-0">
            {/* Left */}
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge
                className="w-fit"
                variant={isConfirmed ? "default" : "secondary"}
              >
                {isConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>
              <h3 className="font-bold">{booking.service.name}</h3>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.service.barberShop.imageUrl} />
                </Avatar>
                <p className="text-sm">{booking.service.barberShop.name}</p>
              </div>
            </div>
            {/* Right */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", { locale: ptBR })}
              </p>
              <p className="text-2xl">
                {format(booking.date, "dd", { locale: ptBR })}
              </p>
              <p className="text-sm">
                {format(booking.date, "HH:mm", { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="w-[85%]">
        <SheetHeader>
          <SheetTitle className="text-left">Informações da Reserva</SheetTitle>
        </SheetHeader>

        <div className="relative mt-6 flex h-[180px] w-full items-end">
          <Image
            src="/map.png"
            alt={`Mapa da barbearia ${barberShop.name}`}
            fill
            className="rounded-xl object-cover"
          />

          <Card className="z-10 mx-5 mb-3 w-full rounded-xl">
            <CardContent className="flex items-center gap-3 px-5 py-3">
              <Avatar>
                <AvatarImage src={barberShop.imageUrl} />
              </Avatar>
              <div>
                <h3 className="font-bold">{barberShop.name}</h3>
                <p className="text-xs">{barberShop.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Badge
            className="w-fit"
            variant={isConfirmed ? "default" : "secondary"}
          >
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>
        </div>

        <Card className="mb-6 mt-3">
          <CardContent className="space-y-3 p-3">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">{booking.service.name}</h2>
              <p className="text-sm font-bold">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(booking.service.price))}
              </p>
            </div>
            {/* Data */}
            <div className="flex items-center justify-between">
              <h2 className="text-sm text-gray-400">Data</h2>
              <p className="text-sm">
                {format(booking.date, "d 'de' MMMM", {
                  locale: ptBR,
                })}
              </p>
            </div>
            {/* Horário */}
            <div className="flex items-center justify-between">
              <h2 className="text-sm text-gray-400">Horário</h2>
              <p className="text-sm">
                {format(booking.date, "HH:mm", { locale: ptBR })}
              </p>
            </div>
            {/* Barbearia */}
            <div className="flex items-center justify-between">
              <h2 className="text-sm text-gray-400">Barbearia</h2>
              <p className="text-sm">{barberShop.name}</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {barberShop.phones.map((phone, index) => (
            <Phoneitem key={phone + index.toString()} phone={phone} />
          ))}
        </div>

        <SheetFooter className="mt-6">
          <div className="flex items-center gap-3">
            <SheetClose asChild>
              <Button variant={"outline"} className="w-full">
                Voltar
              </Button>
            </SheetClose>
            {isConfirmed && (
              <Dialog>
                <DialogTrigger className="w-full">
                  <Button variant={"destructive"} className="w-full">
                    Cancelar reserva
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[90%]">
                  <DialogHeader>
                    <DialogTitle>
                      Você deseja cancelar sua reserva?{" "}
                    </DialogTitle>
                    <DialogDescription>
                      Ao cancelar você perderá sua reserva e poderá não
                      recuperá-la. Essa ação é irreversível
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter className="flex-row gap-3">
                    <DialogClose asChild>
                      <Button variant={"secondary"} className="w-full">
                        Voltar
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        variant={"destructive"}
                        className="w-full"
                        onClick={handleCancelBooking}
                      >
                        Confirmar
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default BookingItem
