import SignUpForm from '@/components/SignUpForm'
import React from 'react'

export default function page() {
  return (
    <div className="bg-[url('/signimage.jpg')] bg-no-repeat bg-cover flex  h-screen overflow-hidden m-auto  ">
        <SignUpForm />
    </div>
  )
}
