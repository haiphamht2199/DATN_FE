import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'

const FileItem = ({ file, deleteFile }) => {
 return (
  <>
   <li
    className="file-item"
    key={file.name}>
    <FontAwesomeIcon icon={faFileAlt} />
    <p className='item_name_upload_file'>{file.nameDocumentClass}</p>
    <div className="actions">
     <div className="loading"></div>
     {file.isUploading && <FontAwesomeIcon
      icon={faSpinner} className="fa-spin"
      onClick={() => deleteFile(file.nameDocumentClass)} />
     }
     {!file.isUploading &&
      <FontAwesomeIcon icon={faTrash}
       onClick={() => deleteFile(file.nameDocumentClass)} />
     }
    </div>
   </li>
  </>
 )
}

export default FileItem