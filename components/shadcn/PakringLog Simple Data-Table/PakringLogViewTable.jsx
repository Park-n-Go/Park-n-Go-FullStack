import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
const PakringLogViewTable = ({Heads,Data,Caption,For}) => {
  return (
    <Table>
  <TableCaption>{Caption}</TableCaption>
  <TableHeader>
    <TableRow>
        {Heads?.map((Head)=>(
            <TableHead>{Head}</TableHead>
        )) 
}
    </TableRow>
  </TableHeader>
  <TableBody>

  
 {Data?.map((data,index)=>(
        <TableRow key={index}>
        { For.toLowerCase() === "company" ?   
        <>
        <TableCell>{data?.vehicleNumber}</TableCell>
  <TableCell>{data?.entryAt}</TableCell>
  <TableCell>{data?.exitAt}</TableCell>  
  <TableCell>{data?.duration}</TableCell>
  <TableCell>{data?.paymentStatus}</TableCell>
        </>
               :
       <>
       <TableCell>{data?.name}</TableCell>
        <TableCell>{data?.vehicleNumber}</TableCell>
        <TableCell>{data?.visitorFor}</TableCell>
        <TableCell>{data?.visitorType}</TableCell>
        <TableCell>{data?.entryAt}</TableCell>
        <TableCell>{data?.exitAt}</TableCell>
        <TableCell>{data?.isApproved}</TableCell>
       </>}
        </TableRow>
        ))
 }
  </TableBody>
</Table>

  )
}

export default PakringLogViewTable