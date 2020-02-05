import React, { useCallback, useState } from "react";
import FileUploadInput from "./file-upload-input";

const S3UploadForm = () => {

    // Flag to prevent user interaction
    const [isPending, setIsPending] = useState(false);
    
    // File to be sent to S3
    const [uploadFile, setUploadFile] = useState(null);
    
    // Data to be included in request to S3
    const [formData, setFormData] = useState(null); 

    // Builds a FormData object
    const generateRequestData = () => {
        let data = new FormData();

        Object.keys(formData.fields).forEach((key) => {
            data.append(key, formData.fields[key])
        });

        data.append("file", uploadFile);

        return data;
    }

    // Post a file to S3
    const uploadToS3 = (body) => {
        fetch(formData.url, {
            method: "POST",
            body
        })
        .then((result) => {
            console.log("Success:", result);
        })
        .catch((error) => {
            console.log("Error:", error);
        })
    }

    // Catch the form submit and send to S3
    const handleSubmit = (event) => {
        event.preventDefault();

        if(uploadFile == null) {
            console.log("No file selected");
            return;
        }

        uploadToS3(generateRequestData());
    }

    // Get a signed url from the server
    const getUploadUrl = (object_name) => {
        return fetch(`api/upload_url/${object_name}`)
            .then(r => r.json())
            .catch(error => (console.error(error), null))
    }

    // Catch the file drop event
    const handleFileDrop = useCallback(files => {
        if (files.length == 1) {
            setIsPending(false);
            setUploadFile(files[0]);

            getUploadUrl(files[0].name)
                .then((data) => setFormData(data))
                .then(() => setIsPending(false))
                .catch((error) => {
                    setIsPending(false);
                    setFormData(null);
                    console.error(error);
                })
        }
        else {
            console.error("Invalid number of files selected");
        }
    });

    return (
        <form onSubmit={handleSubmit}>
            <FileUploadInput onDrop={handleFileDrop} disabled={isPending}/>
            <input type="submit" name="submit" disabled={formData == null || isPending == true} value="Upload to Amazon S3" />
        </form>
    );
}

export default S3UploadForm;