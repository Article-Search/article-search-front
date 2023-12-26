"use client"
import React, { useState, useContext } from 'react';
import {Card , Button, Link} from "@nextui-org/react";
import edit from "@/public/assets/icons/edit.svg"
import Image from 'next/image'
import adminRole from "@/public/assets/images/Role-admin.svg"
import lockImage from "@/public/assets/images/LockImage.svg"
import favoritesImage from "@/public/assets/images/FavoritesImage.svg"
import NavigationBar from '@/components/navigationBar';

const Login = () => {
    const firstName = 'Mohamed Ilyes';
    const lastName = 'Arabet';
    const emailAccount = "arabetilyes@gmail.com";
    return (
        <div className=" flex w-full flex-col gap-4 justify-center items-center">
            <NavigationBar returnHome={true} />
            <Card shadow="lg"  className=" w-7/12 py-6 px-5 m-5 ">
                <p className='purple_gradient font-black text-4xl mx-8 my-4'> Profile </p>
                <div className=' border-2 border-solid border-gray-300 rounded-md shadow-sm p-7 my-1 mx-8'>
                    <div className='my-2'>
                        <p className='font-bold text-lg text-gray-500'> First Name </p>
                        <div className=' flex flex-row justify-between items-center'>
                            <p className=' font-medium text-md'> {firstName} </p>
                            <Button className='flex flex-row justify-around items-center'>
                                <Image src={edit} alt="edit" width={20} height={20} />
                                <p className=' font-bold'>Edit</p>
                            </Button>
                        </div>
                    </div>
                    <div className='my-2'>
                        <p className='font-bold text-lg text-gray-500'> Last Name </p>
                        <div className=' flex flex-row justify-between items-center'>
                            <p className=' font-medium text-md'> {lastName} </p>
                            <Button className='flex flex-row justify-around items-center'>
                                <Image src={edit} alt="edit" width={20} height={20} />
                                <p className=' font-bold'>Edit</p>
                            </Button>
                        </div>
                    </div>
                    <div className='my-2'>
                        <p className='font-bold text-lg text-gray-500'> Email account </p>
                        <div className=' flex flex-row justify-between items-center'>
                            <p className=' font-medium text-md'> {emailAccount} </p>
                            <Button className='flex flex-row justify-around items-center'>
                                <Image src={edit} alt="edit" width={20} height={20} />
                                <p className=' font-bold'>Edit</p>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='border-2 border-solid border-gray-300 rounded-md shadow-sm pl-7 my-1 mx-8 flex flex-row justify-between items-center'>
                    <div>
                        <p className='font-bold text-lg text-gray-500'> Role </p>
                        <p className=' font-medium text-md'> Administator </p>
                    </div>
                    {/* */}

                    <Image src={adminRole} alt="adminRole" className=' h-full  rounded-r-sm-md ' />
                </div>

                <div className='border-2 border-solid border-gray-300 rounded-md shadow-sm pl-7 my-1 mx-8 flex flex-row justify-between items-center'>
                    <div>
                        <p className='font-bold text-lg text-gray-500'> Password </p>
                        <p className=' font-medium text-md'> change password from <Link showAnchorIcon>Here</Link> </p>
                    </div>
                    {/* */}

                    <Image src={lockImage} alt="adminRole" className=' h-full  rounded-r-sm-md ' />
                </div>

                <div className='border-2 border-solid border-gray-300 rounded-md shadow-sm pl-7 my-1 mx-8 flex flex-row justify-between items-center'>
                    <div>
                        <p className='font-bold text-lg text-gray-500'> Favorites </p>
                        <p className=' font-medium text-md'> Read your favorite artciles from <Link showAnchorIcon>Here</Link> </p>
                    </div>
                    {/* */}

                    <Image src={favoritesImage} alt="adminRole" className=' h-full  rounded-r-sm-md ' />
                </div>
            </Card>
        </div>
    );
};

export default Login;
