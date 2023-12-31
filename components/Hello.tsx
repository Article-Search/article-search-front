'use client'
import Image from "next/image";
import wavingHand from "@/public/assets/icons/WavingHand.png";
import {useContext} from "react";
import {AuthContext} from "@/app/Context/authContext";

export default function Hello() {
    const {user} = useContext(AuthContext);
    return (
        <h1 className='head_text text-center'>
            <Image src={wavingHand} alt='waving hand' height={80} width={80}
                   className=' inline-block mr-3'/>
            Welcome Back
            <br className="max-md:hidden"/>
            <span className='purple_gradient text-center'>{user ? user.first_name : "there"}</span>
        </h1>
    );
}