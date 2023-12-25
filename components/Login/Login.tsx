"use client"
import React, { useContext, useState } from "react";
import { Card } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { toast } from 'sonner';
// import css module
import styles from "./Login.module.css";
//auth context
import { AuthContext } from "@/app/Context/authContext";

export default function LoginCard() {
    const API_URL = process.env.API_URL || 'localhost:9000';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [emailIsTouched , setEmailIsTouched] = useState(false);
    const [passwordIsTouched , setpasswordIsTouched] = useState(false);

    const isEmailValid= email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) !== null;
    const isPasswordValid= password.length >= 8;

    const emailError= isEmailValid || !emailIsTouched ? '' : 'Please enter a valid email';
    const passwordError= isPasswordValid || !passwordIsTouched ? '' : 'Password must be at least 8 characters long';






    const { setUser } = useContext(AuthContext);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail( e.target.value);
    };

    const handleBlurEmail= ()=>{
        setEmailIsTouched(true);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleBlurPassword=()=>{
        setpasswordIsTouched(true);
    }

    
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        //add validation for all fields before submitting
        setEmailIsTouched(true);
        setpasswordIsTouched(true);

        if(!isEmailValid || !isPasswordValid){
            //add a pop message
            toast.error('Please fill all the fields correctly');
            return;
        }
    
        try{
        const response = await fetch(`http://${API_URL}/auth/login`, { // replace with your actual API URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        });

    
        if (response.ok) {
            const data = await response.json();
            setUser(data.user);
            localStorage.setItem('token', data.token);
            toast.success('🎉 Login successful');
            // Handle successful registration (e.g., navigate to another page, show a success message, etc.)
        } else {
            const error = await response.json();
            // Handle error (e.g., show an error message)
        }
    }catch(error){
        console.log(error);
    }
    };


    return (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 justify-center items-center">
            <Card shadow="lg"  className=" w-5/12 py-6">
                <div className="flex flex-col justify-center items-center">
                    <h1 className={`text-3xl font-black mb-3   ${styles.loginTitle} `}>Login</h1>
                    <p className=" text-sm font-light text-gray-400"> Welcome back !</p>
                    <form className="flex flex-col gap-4 w-full py-5">
                        <Input
                            label="Email"
                            className="w-3/5 self-center "
                            variant="bordered"
                            isClearable
                            onClear={() => { 
                                setEmail('');
                            }}
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            onBlur={handleBlurEmail}
                            isInvalid={!isEmailValid && emailIsTouched}
                            errorMessage={emailError}
                        />
                        <Input
                            label="Password"
                            className="w-3/5 self-center"
                            variant="bordered"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            onBlur={handleBlurPassword}
                            isInvalid={!isPasswordValid && passwordIsTouched}
                            errorMessage={passwordError}
                        />
                        <Button
                            type="submit"
                            size="lg"
                            radius="lg"
                            className="w-2/5 self-center bg-black text-white font-bold shadow-md hover:shadow-xl"
                            onClick={handleLogin}
                        >
                            Confirm
                        </Button>
                        </form>
                        <div className="flex flex-col justify-center items-center">
                            <p className="text-sm">Don&#39;t have an account? <Link showAnchorIcon>Signup</Link></p>
                        </div>
                </div>
            </Card>
        </div>
    );
}
