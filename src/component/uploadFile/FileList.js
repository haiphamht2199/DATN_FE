import axios from 'axios'
import React, { ueState } from 'react'
import FileItem from './FileItem';
import { useDispatch, useSelector } from "react-redux";
const FileList = ({ files, removeFile }) => {
  const dispatch = useDispatch();
  const LitsFile = useSelector((state) => state._class.documentList);
  console.log("LitsFile:", LitsFile)
  const deleteFileHandler = (_name) => {
    axios.delete(`http://localhost:8080/upload?name=${_name}`)
      .then((res) => removeFile(_name))
      .catch((err) => console.error(err));
  }
  return (
    <ul className="file-list">
      {
        LitsFile.length ?
          LitsFile.map(f => (<FileItem
            key={f.pathFileDocument}
            file={f}
            deleteFile={deleteFileHandler} />)) : ""
      }
    </ul>
  )
}

export default FileList