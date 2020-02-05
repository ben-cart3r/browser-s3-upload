import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone'

const FileUploadInput = (props) => {
  const { isDragActive, getRootProps, getInputProps, isDragReject, acceptedFiles, rejectedFiles } = useDropzone({
    onDrop: props.onDrop,
    multiple: false
  });

  return (
    <div className="container text-center mt-5">
      <div {...getRootProps()}>
        <input {...getInputProps()} name="file" disabled={props.disabled}/>
        {!isDragActive && 'Click here or drop a file to upload!'}
        {isDragReject && "File type not accepted, sorry!"}
      </div>
    </div>
  );
};

export default FileUploadInput;