import Image from "next/image";
import wavingHand from "@/public/assets/icons/WavingHand.png";
import {articles} from "@/constants";
import Feed from "@/components/Feed";

export default function Page() {
    return (
        <div className="w-2/4 m-auto">
            <h1 className=' text-4xl font-bold felx items-center py-10  '>
                <Image src={wavingHand} alt='waving hand' height={70} width={70}
                       className=' inline-block mr-3'></Image> Welcome Back <span
                className='purple_gradient'>Moderator</span>
            {/*  TODO: change it to get the name of the moderator  */}
            </h1>


            <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl font-medium mb-4">Articles you need to review</h2>
            <Feed articles={articles} documentImagePath="/assets/icons/unverifiedDocument.svg"/>
            </div>
        </div>
    );
}