import { useState } from "react"
import { Audio,Vortex } from 'react-loader-spinner'

export default function Home() {
  const [prompt,setPrompt]=useState('')
  const [loading,setLoading]=useState(false)
  const [music,setMusic]=useState('')
  const generateMusic=async()=>{
    setLoading(true)
    try{
      const res=await fetch('/api/generator',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({prompt:prompt})
      })
      const {music}=await res.json()
      setMusic(music)
    }catch(err){
      console.log(err)
    }
    setLoading(false)
    setPrompt('')
  }
  return (  
  <div className="flex flex-col items-center justify-center min-h-screen border bg-gray-200 ">
    <div className="bg-white shadow-lg rounded-lg p-6 w-96 space-y-4 ">
    {loading ?(
      <div className="flex justify-normal items-center text-2xl gap-4 font-semibold text-green-600">
      <Audio
  height="100"
  width="100"
  color="#4fa94d"
  ariaLabel="audio-loading"
  wrapperStyle={{}}
  wrapperClass="wrapper-class"
  visible={true}
/>
    <h2>Loading music....(This may take upto 3-5 minutes)</h2>
    </div>  
    ):(<><h1 className="text-3xl text-center font-bold mb-6 bg-gradient-to-r from-pink-800 to-blue-600  text-black p-2 rounded-xl">HarmoniAI</h1>
    <input type="text"
    placeholder="Type of music you want"
    required 
    value={prompt}
    onChange={(e)=>setPrompt(e.target.value)}
    className={`text-center w-full px-12 py-2 text-black border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-gray-400`}/>
    <button 
    className="bg-purple-600 text-white rounded-md py-2 px-4 w-full hover:bg-purple-800 hover:scale-90  duration-500 focus:outline-none focus:ring-2  focus:ring-blue-400"
    onClick={generateMusic}
    disabled={loading || !prompt}>{loading?'Generating music...':'Generate Music'}
    </button>
    {music && <audio className="mt-4 w-full" controls src={music}/>}</>)}
    </div>
  </div>
)
}
