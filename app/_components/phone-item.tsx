"use client"

import { SmartphoneIcon } from "lucide-react"
import React from "react"
import { Button } from "./ui/button"
import { toast } from "sonner"

interface PhoneItemProps {
  phone: string
}

const Phoneitem = ({ phone }: PhoneItemProps) => {
  const handleCopyphoneClick = (phone: string) => {
    navigator.clipboard.writeText(phone)
    toast.success("Telefone copiado!")
  }

  return (
    <div className="flex justify-between">
      {/* Left */}
      <div className="flex items-center">
        <SmartphoneIcon />
        <p className="gap-2 text-sm">{phone}</p>
      </div>

      {/* Right  */}
      <Button
        variant={"outline"}
        size={"sm"}
        onClick={() => handleCopyphoneClick(phone)}
      >
        Copiar
      </Button>
    </div>
  )
}

export default Phoneitem
