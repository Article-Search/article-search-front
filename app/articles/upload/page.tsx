'use client'
import UploadService from '@/services/uploadFile'
import { FormEventHandler, useState } from 'react'

const UploadPage = () => {
    const [articles, setFiles] = useState([])

    const uploadArticles:FormEventHandler = (e) => {
        e.preventDefault();
        
        UploadService.upload(articles)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
    
    return (
        <>
            <div>
                This is the upload page
            </div>

            <form onSubmit={uploadArticles}>
                <input type="file" multiple onChange={e=> setFiles(e.target.files)}/>
                <button type="submit">Upload files</button>
            </form>
        </>
    )
}

export default UploadPage;
