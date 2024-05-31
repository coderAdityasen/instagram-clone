import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import { FaFolderOpen } from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setHasMore, uploadpost } from "../redux/Actions/postAction";

function Uploadpost() {
	const dispatch = useDispatch()
  const [file, setFile] = useState();
  const {register, handleSubmit} = useForm()

  function handleChange() {
    console.log("hii");
    // console.log(e.target.files);
    // setFile(URL.createObjectURL(e.target.files[0]));
    // console.log(file);
}

  const onsubmit =async (data)=>{
    const imageFormdata = new FormData();
	imageFormdata.append('file', data.image[0]);
	imageFormdata.append('upload_preset', 'adityasenhulala'); 

	const response = await axios.post(
	  'https://api.cloudinary.com/v1_1/dj3gpszjr/image/upload', 
	  imageFormdata
	);

	 const secureUrl =  response.data.secure_url
    const form = {
      image : secureUrl,
      content : data.content
    }
    dispatch(uploadpost(form))
    toast.success("post uploaded successfully")
    dispatch(setHasMore(true))
  }

  return (
    <>
    <Toaster containerStyle={{ position: 'absolute' }} />
    <form onSubmit={handleSubmit(onsubmit)} className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
    <div className="">
      
      {file ? (
        <img
        src={file}
          alt="Preview"
          className="w-full h-64 my-5 object-cover rounded-lg"
        />
      ) : (
        <div className="h-64 my-5 bg-white px-2">
          <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
            <div className="md:flex">
              <div className="w-full p-3">
                <div className="relative border-dotted h-48 rounded-lg  border-2 border-blue-700 bg-gray-100 flex justify-center items-center">
                  <div className="absolute">
                    <div className="flex flex-col items-center">
                      <FaFolderOpen className="fa-4x text-blue-700" />
                      <span className="block text-gray-400 font-normal">Attach your files here</span>
                    </div>
                  </div>
                
                  <input className="h-full w-full opacity-0" type="file" onChange={handleChange}
                  
                  {...register("image")}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
   
    <label
      htmlFor="caption"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      Caption
    </label>
    <input
      type="text"
      id="caption"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Write a caption..."
      required
      {...register("content")}
    />
  <button type="submit" className="relative inline-flex items-center justify-center  p-4 px-10 my-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group">
<span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease"></span>
<span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
<span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md"></span>
<span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md"></span>
</span>
<span className="relative text-white">Post</span>
</button>

  </form>
  </>);
}

export default Uploadpost;
