import PdfViewer from "@/components/PdfViewer";
const testingFilePath="https://drive.google.com/file/d/19iwQ6RAikVDVJ9AWRt9wi9p1or5VUjIU/view"
const localFilePath="/Article_01.pdf"
export default function Page() {
    return (
        <div>
            <PdfViewer filePath={localFilePath}/>
        </div>
    );
}