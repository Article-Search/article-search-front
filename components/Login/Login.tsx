"use client"
import React, { useContext, useState } from "react";
import axios from '@/utils/axios'
import { Card } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { toast } from 'sonner';
// import css module
import styles from "./Login.module.css";
//auth context
import { AuthContext } from "@/app/Context/authContext";
import { RedirectType, redirect, useRouter } from "next/navigation";

export default function LoginCard() {
    const API_URL = process.env.API_URL || 'http://localhost:8000';
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailIsTouched, setEmailIsTouched] = useState(false);
    const [passwordIsTouched, setpasswordIsTouched] = useState(false);

    const isEmailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) !== null;
    const isPasswordValid = password.length >= 8;

    const emailError = isEmailValid || !emailIsTouched ? '' : 'Please enter a valid email';
    const passwordError = isPasswordValid || !passwordIsTouched ? '' : 'Password must be at least 8 characters long';

    const { setUser } = useContext(AuthContext);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleBlurEmail = () => {
        setEmailIsTouched(true);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleBlurPassword = () => {
        setpasswordIsTouched(true);
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        //add validation for all fields before submitting
        setEmailIsTouched(true);
        setpasswordIsTouched(true);

        if (!isEmailValid || !isPasswordValid) {
            //add a pop message
            toast.error('Please fill all the fields correctly');
            return;
        }

        try {
            // const response = await axios.post('auth/login/', {
            //     email: email,
            //     password: password
            // });
            const response= await fetch(`${API_URL}/auth/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            // save the infos
            setUser(data.user);
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);

            // show a success alert
            toast.success('🎉 Login successful');

            // redirect to the right page
            const role = data.user.role;

            switch (role) {
                case 1:
                    router.push('/admin');
                    break;
                case 2:
                    router.push('/moderator');
                    break;
                case 3:
                    router.push('/search');
                    break;
                default:
                    router.push('/search');
                    break;
            }

        } catch (errorResponse) {
            // const error = errorResponse.response.data
            console.log(errorResponse)
            
            toast.error('🤔 Login failed: ' + errorResponse);
        }
    };

    return (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 justify-center items-center">
            <Card shadow="lg" className=" w-5/12 py-6">
                <div className="flex flex-col justify-center items-center">
                    <h1 className={`text-3xl font-black mb-3 ${styles.loginTitle}`}>Login</h1>
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
                        <p className="text-sm">Don&#39;t have an account? <Link href="/signup" showAnchorIcon>Signup</Link></p>
                    </div>
                </div>
            </Card>
        </div>
    );
}
