import { useState } from "react";

function Uploadpost() {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>('');
  
	const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	  const file = event.target.files?.[0];
	  if (file) {
		setSelectedFile(file);
		const reader = new FileReader();
		reader.onloadend = () => {
		  setPreviewUrl(reader.result);
		};
		reader.readAsDataURL(file);
	  }
	};
  return (
	<>
	
	<div>
      {previewUrl && (
        <img
          src={previewUrl.toString()}
          alt="Preview"
		  className="w-full h-[20rem] object-cover mx-auto"
        />
      )}
	  <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help"
	   accept="image/*"
	   onChange={handleFileInputChange}
	     type="file"></input>

<label htmlFor="first_name" className="block mb-2 mx-2 text-sm font-medium text-gray-900 dark:text-white ml-5">Caption</label>
            <input type="text" id="first_name" className="mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[90%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="caption" required />

			
    </div>
	</>
  )
}

export default Uploadpost