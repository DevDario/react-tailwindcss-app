import { useState } from 'react'
import './App.css'

function App() {

  const [inputText, setInputText] = useState('')

  async function searchBook(query:string):Promise<void>{
    const data = await fetch(`https://example/${query}`, {
      headers: {
        'method': 'GET',
        'type': 'application/json'
      }
    })
    const response = await data.json()
    return console.log(response)
  }

  return (
    <div className='md:container flex items-left flex-col p-8'>
      <h1 className='text-3xl font-bold text-purple-800'>
          Find your next Book
      </h1>

      <div className='flex items-start flex-row justify-start my-5 content-between'>
          <input 
            type='text' 
              className='rounded p-1 border w-45 border-solid border-violet-950 hover:border-violet-900 outline-none h-11' 
                value={inputText} 
                  placeholder='search for a book here'
                    onChange={(e)=>{setInputText(e.target.value)}}
        /> 

          <button 
            className='bg-purple-950 text-white p-1 rounded mx-2 hover:bg-purple-900 w-24 h-11 font-semibold' 
              onClick={searchBook(inputText)}>Search</button>
      </div>

    </div>
  )
}

export default App
