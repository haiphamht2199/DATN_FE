import { useState } from 'react'
import FileList from './FileList';
import UploadFile from './UploadFile';




const UploadDocument = () => {
 const [files, setFiles] = useState([])
 const removeFile = (filename) => {
  setFiles(files.filter(file => file.name !== filename))
 }

 return (
  <div className="App">
   <div className="title">Upload file</div>
   <UploadFile files={files} setFiles={setFiles}
    removeFile={removeFile} />
   <FileList files={files} removeFile={removeFile} />
  </div>
 )
}

export default UploadDocument