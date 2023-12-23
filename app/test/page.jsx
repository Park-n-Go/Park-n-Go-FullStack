import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="h-screen">
      Protected page
      <UserButton afterSignOutUrl="/"/>
    </div>
  )
}
