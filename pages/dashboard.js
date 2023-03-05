import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import supabase from '../utils/supabaseClient'
import ImageUploading,{ ImageListType } from 'react-images-uploading'
import {useRouter} from 'next/router'

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated]=useState(false);
  const [userId,setUserId]=useState('');
  const [title,setTitle]=useState('');
  const [url, setUrl]=useState('');
  const[links,setlinks]=useState([])
  const [images,setImages]=useState([])
  const router=useRouter()
const onChange=(imageList)=>{
  setImages(imageList)
}

  useEffect(()=>{
      const getUser=async()=>{ 
      const user= await supabase.auth.getUser();
      console.log(user)
      if(user){
        const userId=user.data.user?.id;
        setIsAuthenticated(true);
        setUserId(userId);
      } else {router.push('/login')}
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
    setlinks(data)
  }}
  catch (error){
    console.log("error:", error)
  }
  }
  const uploadProfilePicture=async()=>{
    if(images.length>0){
      const images=images[0]
      try{
      if(image.file&&uderId){
        const {data, error }=await supabase.storage
        .from('public')
        .upload(`${userId}/${image.file.name}`, image.file, {upsert:true});
        if(error)throw error; 
        const resp=supabase.storage.from("public").getPublicUrl(data.path);
        const publicUrl=resp.data.publicUrl;
        const updateUserResponse= await supabase
        .from('users')
        .update({profile_picture_url:publicUrl})
        .eq("id ")
        if(updateUserResponse.error)throw error;
      }
    } catch(error){
      console.log(error);

    }
  } 
  }


  
  return (
    <div>
    <h1 className="text-3xl font-bold underline">
    Hello world!
  </h1>
 
  <div className='flex flex-col w-full justify-center items-center mt-4'>
  {links.map(link=>(
    <div key={link.id}>{link.title}</div>
  ))}

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

      {/* Images uploading  */}
      <div className='bg-neutral-200 px-8 rounded-lg'>
        <h1>Image uploading </h1>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={3}
        dataURLKey="data_url"
     >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>

      <button type="button"
      className="inline-flex items-ceenter rounded-md border bg-indigo-600 text-white p-4 my-4"
      onClick={uploadProfilePicture}>
        Upload
      </button>

      </div>


      </>
    )}
  </div>
  </div>
  )
}
