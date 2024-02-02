"use client"
import React, { useState, useContext ,useEffect } from 'react';
import {Card , Button, Link , useDisclosure , Modal , ModalContent , ModalFooter , ModalBody , ModalHeader, Input} from "@nextui-org/react";
import { AuthContext } from '../../Context/authContext';
import edit from "@/public/assets/icons/edit.svg"
import Image from 'next/image'
import adminRole from "@/public/assets/images/Role-admin.svg"
import lockImage from "@/public/assets/images/LockImage.svg"
import favoritesImage from "@/public/assets/images/FavoritesImage.svg"
import NavigationBar from '@/components/navigationBar';
import ProfileField from '@/components/ProfileField/ProfileField';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import isAuth from '@/components/isAuth';
import { useRouter } from 'next/navigation';

const API_URL = process.env.API_URL || 'http://localhost:8000';

const ProfilePage = () => {
    const accessToken = localStorage.getItem('accessToken');
    {/*TODO uncomment this code */}
    {/*//////////////////////////////// */}
    const { user , setUser } = useContext(AuthContext); // get the user from AuthContext
    //
    const [firstName, setFirstName] = useState(user?.first_name || '');
    const [lastName, setLastName] = useState(user?.last_name || '');
    const [emailAccount, setEmailAccount] = useState(user?.email || '');

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         if (user) {
    //             const response = await fetch(`${API_URL}/user/`); //TODO update the endpoint
    //             const data = await response.json();
    
    //             // Initialize the state variables with the fetched data
    //             setFirstName(data.firstName);
    //             setLastName(data.lastName);
    //             setEmailAccount(data.email);
    //         }
    //     };
    
    //     if (user) {
    //         fetchUserData();
    //     }
    // }, []);



    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         // Initialize the state variables with the fetched data
    //         setFirstName(firstName);
    //         setLastName(lastName);
    //         setEmailAccount(emailAccount);
    //     };
    //
    //     fetchUserData();
    // }, []);


        const updateUserData = async (field:string,newValue:string) => {
            let newfirstname = firstName;
            let newlastname = lastName;
            let newemail = emailAccount;
            if(field==='FirstName'){
                setFirstName(newValue);
                newfirstname = newValue;
            }else if(field==='LastName'){
                setLastName(newValue);
                newlastname = newValue;
            }else if(field==='Email'){
                setEmailAccount(newValue);
                newemail = newValue;
            }
            if(!user) return;
            const {first_name , last_name , email ,...otherFileds}=user;
            const response = await fetch(`${API_URL}/profile/update/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    first_name: newfirstname,
                    last_name: newlastname,
                    email: newemail,
                }),
            });
            const data = await response.json();
            if(response.status === 200){
                setUser(data);//update the context
                toast.success("profile updated successfully");
            }else{
                toast.error("profile wasn't updated");
            }
        };




    {/*//////////////////////////////// */}

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordIsTouched , setNewPasswordIsTouched] = useState(false);
    const isNewPasswordValid= newPassword.trim().length>=8;
    const newPasswordError= isNewPasswordValid || !newPasswordIsTouched ? '' : "password must contain at least 8 characters";
    const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
    }
    const handleBlurNewPassword= ()=>{
        setNewPasswordIsTouched(true);
    }
    const validateNewPassword= async ()=>{
        if(!user) return;
        const response = await fetch(`${API_URL}/auth/reset_password/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                email: user.email,
                password: newPassword,
            }),
        });
        const data = await response.json();
        if(response.status === 200){
            toast.success("password updated successfully");
        }else{
            toast.error("password wasn't updated");
        }
    }

    return (
        <div className=" flex w-full flex-col gap-4 justify-center items-center">
            {/* <NavigationBar returnHome={true} /> */}
            <Card shadow="lg"  className=" w-7/12 py-6 px-5 m-5 ">
                <p className='purple_gradient font-black text-4xl mx-8 my-4'> Profile </p>
                <div className=' border-2 border-solid border-gray-300 rounded-md shadow-sm p-7 my-1 mx-8'>
                    <ProfileField  fieldName='First name' fieldData={firstName} returnedValue={(newVal)=>{setFirstName(newVal);updateUserData("FirstName",newVal)}} confirmData={(newData)=>{return newData.trim().length>=2;}} errorMessage='first name must contain at least 2 letters'/>
                    <ProfileField  fieldName='Last name' fieldData={lastName} returnedValue={(newVal)=>{setLastName(newVal);updateUserData("LastName",newVal)}} confirmData={(newData)=>{return newData.trim().length>=2;}} errorMessage='last name must contain at least 2 letters'/>
                    <ProfileField  fieldName='Email account' fieldData={emailAccount} returnedValue={(newVal)=>{setEmailAccount(newVal);updateUserData("Email",newVal)}} confirmData={(newData)=>{return newData.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) !== null;}} errorMessage='Please enter a valid email'/>
                </div>
                <div className='border-2 border-solid border-gray-300 rounded-md shadow-sm pl-7 my-1 mx-8 flex flex-row justify-between items-center'>
                    <div>
                        <p className='font-bold text-lg text-gray-500'> Role </p>
                        <p className=' font-medium text-md'>{user?.role === 1 ? "admin" : user?.role === 2 ? "Moderator" : "User"  }</p>
                    </div>
                    {/* */}

                    <Image src="/assets/images/Role-admin.svg" width={100} height={100}  alt="adminRole" className=' h-full  rounded-r-sm-md ' />
                </div>

                <div className='border-2 border-solid border-gray-300 rounded-md shadow-sm pl-7 my-1 mx-8 flex flex-row justify-between items-center'>
                    <div>
                        <p className='font-bold text-lg text-gray-500'> Password </p>
                        <p className=' font-medium text-md'> change password from <Link showAnchorIcon onPress={onOpen}>Here</Link> </p>
                    </div>
                    {/* */}

                    <Image src="/assets/images/LockImage.svg" width={100} height={100}   alt="lock" className=' h-full  rounded-r-sm-md ' />
                </div>

                <div className='border-2 border-solid border-gray-300 rounded-md shadow-sm pl-7 my-1 mx-8 flex flex-row justify-between items-center'>
                    <div>
                        <p className='font-bold text-lg text-gray-500'> Favorites </p>
                        <p className=' font-medium text-md'> Read your favorite artciles from <Link showAnchorIcon href='/profile/favorites'>Here</Link> </p>
                    </div>
                    {/* */}

                    <Image src="/assets/images/FavoritesImage.svg" width={100} height={100} alt="favorites" className=' h-full  rounded-r-sm-md ' />
                </div>
            </Card>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                            <ModalContent>
                                {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">New Password</ModalHeader>
                                    <ModalBody>
                                        <Input
                                        label="New Password"
                                        className="w-3/5 self-center"
                                        variant="bordered"
                                        value={newPassword}
                                        onChange={handleNewPasswordChange}
                                        onBlur={handleBlurNewPassword}
                                        isInvalid={!isNewPasswordValid && newPasswordIsTouched}
                                        errorMessage={newPasswordError}
                                        />
                                    </ModalBody>
                                    <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={()=>{
                                        if(isNewPasswordValid){
                                            validateNewPassword();
                                            onClose();
                                        }
                                    }}>
                                        Confirm
                                    </Button>
                                    </ModalFooter>
                                </>
                                )}
                            </ModalContent>
                        </Modal>
        </div>
    );
};

export default isAuth(ProfilePage,0);
