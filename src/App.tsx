import { useState } from 'react'
import './App.css'

type Book = {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
  }
}

function App() {

  const [inputText, setInputText] = useState('')
  const [books, setBooks] = useState<Book[]>([])

  async function searchBook(query:string):Promise<void>{

    const apiKey:string = import.meta.env.VITE_API_KEY

    const url:string = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`
    
    try{

      const data = await fetch(url)

      const response = await data.json()

      const books = response.items.slice(0,4)

      setBooks(books)

    }catch(error){
      console.log("Error while fetching")
    }
  }

  async function handleSearch(){
    if(inputText.length === 0) return 
    await searchBook(inputText)
  }

  return (
    <div className='md:container flex items-left flex-col p-8'>
      <h1 className='text-3xl font-bold text-purple-800'>
          Find a new Book
      </h1>

      <div className='flex items-start flex-row justify-start my-5 content-between'>
          <input 
            type='text' 
              className='rounded p-1 border w-45 border-solid border-violet-950 hover:border-violet-900 outline-none h-11 hover:w-52' 
                value={inputText} 
                  placeholder='search for a book here'
                    onChange={(e)=>{setInputText(e.target.value)}}
        /> 

          <button 
            className='bg-purple-950 text-white p-1 rounded mx-2 hover:bg-purple-900 w-24 h-11 font-semibold' 
              onClick={handleSearch}>Search</button>
      </div>

      <div className='flex flex-row items-left justify-between content-between flex-wrap gap-24'>

      { books.length ? (
        books.map((book) => (

          <div key={book.id} className="p-8 text-purple-800 bg-slate-300 rounded-md hover:bg-slate-500">

            <h1 className="font-bold">{book.volumeInfo.title}</h1>
            <p className='font-semibold'>Author(s): {book.volumeInfo.authors?.join(', ')}</p>
            <p>Publisher: {book.volumeInfo.publisher}</p>
            <p>Published Date: {book.volumeInfo.publishedDate}</p>

          </div>
      )) ):(
          <p className='font-medium text-purple-500'>search for books</p>
          )
      }


    </div>

    </div>
  )
}

export default App
