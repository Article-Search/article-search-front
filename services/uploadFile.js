import axios from '../utils/axios.js';

class UploadArticleService {
    upload(articles, onUploadProgress) {
        let formData = new FormData();

        // formData.append("article", article);
        
        for (const article  of articles) {
            formData.append('articles', article);
        }

        return axios.post("articles/upload/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });
    }

    // getFiles() {
    //     return axios.get("/files");
    // }
}

export default new UploadArticleService();
