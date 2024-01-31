"use client"
import React, { useContext, useState } from "react";
import { Card } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { toast } from 'sonner';
// import css module
import styles from "./Signup.module.css";
//auth context
import { AuthContext } from "@/app/Context/authContext";
import { redirect, useRouter } from "next/navigation";


export default function SignupCard() {
    const router = useRouter();

    const API_URL = process.env.API_URL || 'localhost:9000';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState(''); 
    const [lastName, setLastName] = useState(''); 

    const [emailIsTouched , setEmailIsTouched] = useState(false);
    const [passwordIsTouched , setpasswordIsTouched] = useState(false);
    const [firstNameIsTouched , setFirstNameIsTouched] = useState(false);
    const [lastNameIsTouched , setLastNameIsTouched] = useState(false);

    const isEmailValid= email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) !== null;
    const isPasswordValid= password.length >= 8;
    const isFirstNameValid= firstName.length >= 2;
    const isLastNameValid= lastName.length >= 2;
    const emailError= isEmailValid || !emailIsTouched ? '' : 'Please enter a valid email';
    const passwordError= isPasswordValid || !passwordIsTouched ? '' : 'Password must be at least 8 characters long';
    const firstNameError= isFirstNameValid || !firstNameIsTouched ? '' : 'First name is required';
    const lastNameError= isLastNameValid || !lastNameIsTouched ? '' : 'Last name is required';






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

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    };

    const handleBlurFirstName=()=>{
        setFirstNameIsTouched(true);
    }

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    };

    const handleBlurLastName=()=>{
        setLastNameIsTouched(true);
    }

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        //add validation for all fields before submitting
        setEmailIsTouched(true);
        setpasswordIsTouched(true);
        setFirstNameIsTouched(true);
        setLastNameIsTouched(true);

        if(!isEmailValid || !isPasswordValid || !isFirstNameValid || !isLastNameValid){
            //add a pop message
            toast.error('Please fill all the fields correctly');
            
            return;
        }
        let role=0;
        try{
        const response = await fetch(`http://localhost:8000/auth/register/`, { // replace with your actual API URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                first_name:firstName,
                last_name:lastName,

            }),
        });

    
        if (response.ok) {
            const data = await response.json();
            setUser(data.user);
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);
            toast.success('🎉 Signup successful');
            // Handle successful registration (e.g., navigate to another page, show a success message, etc.)
            role=data.user.role;
            
        } else {
            const error = await response.json();
            // Handle error (e.g., show an error message)
        }
    }catch(error){
        console.log(error);
    }finally{
        if(role === 1){
            router.push('/admin');
        }
        if(role === 2){
            router.push('/moderator');
        }
        if(role === 3){
            router.push('/search');
        }
    }
    };


    return (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 justify-center items-center">
            <Card shadow="lg"  className=" w-5/12 py-6">
                <div className="flex flex-col justify-center items-center">
                    <h1 className={`text-3xl font-black mb-3   ${styles.signupTitle} `}>Sign up</h1>
                    <p className=" text-sm font-light text-gray-400"> Start your journey with us now !</p>
                    <form className="flex flex-col gap-4 w-full py-5">
                        <Input
                            label="First Name"
                            className="w-3/5 self-center "
                            variant="bordered"
                            isClearable
                            onClear={() => { 
                                setFirstName('');
                            }}
                            value={firstName}
                            onChange={handleFirstNameChange}
                            onBlur={handleBlurFirstName}
                            isInvalid={!isFirstNameValid && firstNameIsTouched}
                            errorMessage={firstNameError}
                        />
                        <Input
                            label="Last Name"
                            className="w-3/5 self-center "
                            variant="bordered"
                            isClearable
                            onClear={() => { 
                                setLastName('');
                            }}
                            value={lastName}
                            onChange={handleLastNameChange}
                            onBlur={handleBlurLastName}
                            isInvalid={!isLastNameValid && lastNameIsTouched}
                            errorMessage={lastNameError}
                        />
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
                            onClick={handleSignup}
                        >
                            Confirm
                        </Button>
                        </form>
                        <div className="flex flex-col justify-center items-center">
                            <p className="text-sm">Already have an account? <Link href="/login" showAnchorIcon>Login</Link></p>
                        </div>
                </div>
            </Card>
        </div>
    );
}
