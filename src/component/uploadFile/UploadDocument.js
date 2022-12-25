import { useState } from 'react'
import FileList from './FileList';
import UploadFile from './UploadFile';




const UploadDocument = () => {
 const [files, setFiles] = useState([])
 // const removeFile = (filename) => {
 //  setFiles(files.filter(file => file.nameDocumentClass !== filename))
 // }

 return (
  <div className="App">
   <div className="title">Upload file</div>
   <UploadFile files={files} setFiles={setFiles}
   />
   <FileList files={files} />
  </div>
 )
}

export default UploadDocument