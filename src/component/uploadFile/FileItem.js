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
        <p className='item_name_upload_file'>{window.location.pathname.includes('chi-tiet-lop-hoc') ? file.file_path_document : file.name_document}</p>
        <div className="actions">
          <div className="loading"></div>
          {file.isUploading && <FontAwesomeIcon
            icon={faSpinner} className="fa-spin"
            onClick={() => deleteFile(file.file_path_document, file.document_class_id)} />
          }
          {!file.isUploading &&
            <FontAwesomeIcon icon={faTrash}
              onClick={() => deleteFile(file.file_path_document, file.document_class_id)} />
          }
        </div>
      </li>
    </>
  )
}

export default FileItem