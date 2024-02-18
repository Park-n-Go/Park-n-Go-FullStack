'use client'

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { fetchData } from '@/Utils/API Call/fetchData.js';







export default function Home(props) {
const [data,setData]= useState(props.data)
const [fetchCount,setFetchCount]= useState(0)




  return (
    <div className="h-screen text-white flex items-center justify-center">
     Home Page
    </div>
  )
}
