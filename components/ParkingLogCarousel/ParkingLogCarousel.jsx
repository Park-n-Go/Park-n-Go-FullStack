"use client"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { Badge } from "../ui/badge"
const ParkingLogCarousel = ({imageUrls}) => {
  return (
    <Carousel className="w-full ">
      <CarouselContent>
        {imageUrls.map((element, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <div>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <Image src={element.url} className="font-semibold"
                  width={500}
                  height={500}
                  alt="Picture of the author"
                  />
                  
                </CardContent>
                <CardFooter className="w-full flex justify-center items-center space-x-2 -mt-28">
    <Badge className="text-base ">Source</Badge><p>{element.source}</p>
  </CardFooter>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default ParkingLogCarousel