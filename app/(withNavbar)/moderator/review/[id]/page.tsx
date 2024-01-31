"use client"
import PdfReview from "@/components/PdfReview/PdfReview";
import SimpleInput from "@/components/SimpleInput/SimpleInput";
import { Button } from "@nextui-org/react";

export default function ReviewArticle(){
    let title="";
    const getTitle=async (value : string )=>{
        title=value;
    }
    let keywords="";
    const getKeywords= async (value : string )=>{
        keywords=value;
    }
    let summary="";
    const getSummary= async (value : string )=>{
        summary=value;
    }
    let authors="";
    const getAuthors=async (value : string )=>{
        authors=value;
    }
    let institutions="";
    const getInstitutions=async (value : string )=>{
        institutions=value;
    }

    const handleSubmit = ()=>{
        console.log(title);
        console.log(keywords);
        console.log(summary);
        console.log(authors);
        console.log(institutions);
    }

    const handleConfirm = ()=>{
        console.log(title);
        console.log(keywords);
        console.log(summary);
        console.log(authors);
        console.log(institutions);
    ////put/post request here
    }

    const handleDelete = ()=>{
    ////Delete request here
    }

    
    return(<>
        <div className=" flex flex-row  w-full justify-around items-center">
            
            <div className="">
                <SimpleInput title="Title" returnedValue={getTitle} />
                <SimpleInput title="Keywords" returnedValue={getKeywords}></SimpleInput>
                <SimpleInput title="Summary" returnedValue={getSummary}></SimpleInput>
                <SimpleInput title="Authors" returnedValue={getAuthors}></SimpleInput>
                <SimpleInput title="Institutions" returnedValue={getInstitutions}></SimpleInput>
            </div>

            <div className="flex justify-center items-center">
                <PdfReview filePath="https://arxiv.org/pdf/quant-ph/0410100.pdf"></PdfReview>
            </div>

        </div>
        <div className=" w-full flex justify-center items-center mt-10 p-5 flex-row gap-20">
        <Button
            type="submit"
            size="lg"
            radius="md"
            color="primary"
            className="w-32 self-center text-white font-medium shadow-md hover:shadow-xl"
            onClick={handleConfirm}
        >
            Confirm
        </Button>
        <Button
            type="submit"
            size="lg"
            radius="md"
            color="danger"
            className="w-32 self-center text-white font-medium shadow-md hover:shadow-xl"
            onClick={handleDelete}
        >
            Delete
        </Button>
        </div>
    </>);
}