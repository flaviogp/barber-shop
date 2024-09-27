import React from "react"
import { Card, CardContent } from "./ui/card"

const Footer = () => {
  return (
    <footer>
      <Card>
        <CardContent className="px-5 py-6 text-center">
          <p className="text-sm text-gray-400">
            Projeto FSW, com alterações feitas por Flavio Gomes
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}

export default Footer
