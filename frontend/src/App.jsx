import { useState } from 'react'
import './App.css'
import { Jobs } from '../components/jobs.jsx'

function App() {

  return (
    <>
      <h1 className='text-xl text-white font-bold p-4 w-full text-center'>Job Listing</h1>
      <div className='h-screen w-screen flex px-30'>
        <Jobs />
      </div>
    </>
  )
}

export default App
