import ObjectDetection from '@/component/Object-dection'
import React from 'react'

const index = () => {
  return (
    <main className='flex min-h-screen flex-col items-center p-8'>
      <h1 className='bg-gradient-to-b  from-white via-gray-400 to-gray-600 bg-clip-text text-transparent font-extrabold text-3xl md:text-6xl lg:text-8xl tracking-tighter '>
        Object Detection App
      </h1>
      <ObjectDetection/>
    </main>
  )
}

export default index