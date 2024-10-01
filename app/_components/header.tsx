import React from "react"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { quickSearchOptions } from "../_constants/search"
import { Avatar, AvatarImage } from "./ui/avatar"
import Link from "next/link"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Image src="/logo.png" alt="Barber shop logo" width={120} height={18} />

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            {/* Avatar  */}

            <div className="flex items-center gap-3 border-b border-solid py-5">
              <Avatar>
                <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              </Avatar>

              <div className="">
                <p className="font-bold">Flavio Gomes</p>
                <p className="text-xs">flavio.gpinheiro@outlook.com</p>
              </div>
            </div>

            {/* Home and Appointments */}
            <div className="flex flex-col gap-2 border-b border-solid py-5">
              <SheetClose asChild>
                <Button
                  asChild
                  variant={"ghost"}
                  className="justify-start gap-2"
                >
                  <Link href="/">
                    <HomeIcon size={18} />
                    Inicio
                  </Link>
                </Button>
              </SheetClose>
              <Button variant={"ghost"} className="justify-start gap-2">
                <CalendarIcon size={18} />
                Agendamentos
              </Button>
            </div>
            {/* Categories */}
            <div className="flex flex-col gap-2 border-b border-solid py-5">
              {quickSearchOptions.map((option) => (
                <Button
                  key={option.title}
                  variant={"ghost"}
                  className="justify-start gap-2"
                >
                  <Image
                    alt={option.title}
                    src={option.imageUrl}
                    height={18}
                    width={18}
                  />
                  {option.title}
                </Button>
              ))}
            </div>
            {/* End Session  */}
            <div className="flex flex-col gap-2 py-5">
              <Button variant={"ghost"} className="justify-start gap-2">
                <LogOutIcon size={18} />
                Sair da conta
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
