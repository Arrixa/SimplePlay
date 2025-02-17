'use client'

import { useState } from 'react'


export default function FileUploader() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [uploadStatus, setUploadStatus] = useState<string>('')

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0])
        }
    }

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus('Please select a file first')
            return
        }
        
        const formData = new FormData()
        formData.append('file', selectedFile)

        try {
            setUploadStatus('Uploading...')
            console.log(formData);
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            })
            console.log(response);
            if(response.status == 200)
                setUploadStatus(`File uploaded successfully`)
            else
                setUploadStatus(`File uploaded failed : ${response.statusText}`)
            
        } catch (error) {
            console.error('Upload error:', error)
            setUploadStatus('Upload failed')
        }
    }

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    )
}