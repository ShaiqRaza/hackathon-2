import { useState } from 'react'
import './App.css'
import { Jobs } from '../components/jobs.jsx'

function App() {

  return (
    <>
      <h1 className='text-2xl text-white font-bold p-4 w-full text-center bg-gray-700'>Job Listing</h1>
      <div className='h-full w-full flex sm:p-10 p-5 bg-gray-700 min-h-[100vh]'>
        <Jobs />
      </div>
    </>
  )
}

export default App
