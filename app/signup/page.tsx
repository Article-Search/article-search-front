"use client"
import React, { useState, useContext } from 'react';
import SignupCard from "@/components/Signup/Signup";

const Signup = () => {
    return (
        <div className=' h-screen flex items-center'>
            <SignupCard/>
        </div>
    );
};

export default Signup;
