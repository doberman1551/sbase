import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import supabase from '../utils/supabaseClient'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated]=useState('false');
  const [userId,setUserId]=useState('');
  const [title,setTitle]=useState('');
  const [url, setUrl]=useState('');
  useEffect(()=>{
      const getUser=async()=>{ 
      const user= await supabase.auth.getUser();
      console.log(user)
      if(user){
        const userId=user.data.user?.id;
        setIsAuthenticated(true);
        setUserId(userId);
      }
      };
      getUser()
  },[])
// Adding link
  const addNewLink=async ()=>{
    try{
    if(title&&url&&userId){
    const {data, error }=await supabase.from('onboardLinks').insert({
      title:title,
      url:url,
      user_id:userId

    })
    .select();
    if (error) throw error;
    console.log(data)
  }}
  catch (error){
    console.log("error:", error)
  }
  }
  return (
    <div>
    <h1 className="text-3xl font-bold underline">
    Hello world!
  </h1>
  <div className='flex flex-col w-full justify-center items-center mt-4'>
    {isAuthenticated&&(
    <>
    	<label className="font-semibold text-xs mt-3" htmlFor="title">Title</label>
      <input className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
       type="text"
        name="title"
        onChange={(e)=>setTitle(e.target.value)}/>
      <label className="font-semibold text-xs mt-3" htmlFor="url">Url</label>
      <input className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
      type="text" name="url"
      onChange={(e)=>setUrl(e.target.value)}/>
      <button type="button"
      className="inline-flex items-ceenter rounded-md border bg-indigo-600 text-white p-4 my-4"
      onClick={addNewLink}>
        Create Onboarding
      </button>
      </>
    )}
  </div>
  </div>
  )
}
