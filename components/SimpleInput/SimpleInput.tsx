"use client"
import { Input } from "@nextui-org/react";
import { useState } from "react";

export default function SimpleInput({title, returnedValue} : {title : string , returnedValue : (value : string) => void }){
    const [value , setvalue] = useState('');
    return(<>
        <div className="my-2">
            <p className='font-bold text-lg text-gray-500'> {title} : </p>
            <Input
                label={title}
                className="self-center bg-white rounded-xl ml-10  "
                variant="bordered"
                value={value}
                onChange={(e)=>setvalue(e.target.value)}
                onBlur={()=>returnedValue(value)}
            />
        </div>
    </>);
}