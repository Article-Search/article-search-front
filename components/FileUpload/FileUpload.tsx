"use client"
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import upload from '@/public/assets/icons/upload.svg'
import Image from 'next/image';
import uploadfunction from "@/services/uploadFile"

interface FileWithPreview extends File {
    preview?: string;
}

const FileUpload = () => {
    const [uploadedFiles, setUploadedFiles] = useState<FileWithPreview[]>([]);
    const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: FileWithPreview[]) => {
        acceptedFiles.forEach(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
        }));
        setUploadedFiles(acceptedFiles);
        console.log("a file has been uploaded")
        /////////
        // 
        uploadfunction.upload(uploadedFiles, (progressEvent: { loaded: number; total: number; }) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log(`File upload progress: ${progress}%`);
        })
        .then((response: any) => {
            console.log('File upload response:', response);
            // TODO: Handle the response from the server
        })
        .catch((error: any) => {
            console.error('File upload error:', error);
            // TODO: Handle the error
        });
    },
    });

    return (
    <div {...getRootProps()} >
        <input {...getInputProps()} />
        <div className=' rounded-2xl shadow-inner  bg-gray-100 flex items-center justify-center px-10 my-2'>
            <Image src="/assets/icons/upload.svg" alt="upload" width={150} height={150} className='my-5 mx-3' />

        </div>
        {// TODO : change this behaviour and show a toast at the end of the upload if files acceoted or not
        }
        {/* <ul>
        {uploadedFiles.map((file) => (
            <li key={file.name}>{file.name}</li>
        ))}
        </ul> */}
    </div>
    );
};

export default FileUpload;