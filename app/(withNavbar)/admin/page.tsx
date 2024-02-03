"use client"
import NavigationBar from '@/components/navigationBar'
import wavingHand from '@/public/assets/icons/WavingHand.png'
import { Button, Card, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import edit from '@/public/assets/icons/edit-primary.svg'
import Image from 'next/image'
import FileUpload from '@/components/FileUpload/FileUpload'
import drive from '@/public/assets/icons/google-drive.svg'
import Link from 'next/link'
import isAuth from '@/components/isAuth'
import { use, useEffect, useState } from 'react'
import { toast } from 'sonner'
const API_URL = process.env.API_URL || 'http://localhost:8000';
function Admin() {
    //TODO : make all components dynamic by fetching data from api , i need format of the data to do that and to not make a lot of changes in the code
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [link, setlink] = useState('');
    const [first3mods , setfirst3mods] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);
    const handlelinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setlink(e.target.value);
    }
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchModerators = async () => {
        const response = await fetch(`${API_URL}/moderators/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        //get 3 first modrators 
        // console.log(data);

        setfirst3mods(data.users.slice(0,3));
        setDataFetched(true);
        };
        fetchModerators();
    }, []);

    const validatelink = () => {
        //TODO : send link to api 
        toast.success('articles added successfully');
    }

    function isValidUrl(string: string | URL) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;  
        }
    }
    


    return (
        <div>
            <div className=' w-2/3 m-auto pb-7'>
                <h1 className=' text-4xl font-bold felx items-center py-10  '>
                    <Image src={wavingHand} alt='waving hand' height={70} width={70} className=' inline-block mr-3'></Image> Welcome Back <span className='purple_gradient'>Admin</span>
                </h1>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-14 p-3'>
                    <Card className=' px-7 py-3'>
                        <p className=' font-bold text-xl text-gray-500'>Total Users</p>
                        <p className='m-auto text-5xl font-black px-24 pt-5 pb-8'>25</p>
                    </Card>
                    <Card className=' px-7 py-3'>
                        <p className=' font-bold text-xl text-gray-500'>Total Articles</p>
                        <p className='m-auto text-5xl font-black px-24 pt-5 pb-8'>32</p>
                    </Card>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-14 p-3'>
                <Card className=' px-7 py-3'>
                        <p className=' font-bold text-xl text-gray-500'>Add Articles</p>
                        <div className=' flex justify-center w-full '>
                            <FileUpload/>
                        </div>
                        <p className='mx-auto text-gray-500 '>-or-</p>
                        <Button onPress={onOpen}  size='sm' className='w-2/5 m-auto primary-50 primary mt-2 '>
                            <Image src="/assets/icons/google-drive.svg" width={20} height={20} alt="edit"></Image>
                            Drive link
                        </Button>
                    </Card>
                    <Card className=' px-7 py-3'>
                    <p className=' font-bold text-xl text-gray-500 mb-2'>Moderators</p>
                        {first3mods.map((mod:any) => {
                            return(
                                <div key={mod.id} className=' flex flex-row justify-between my-1 '>
                                    <div className=' ml-1'>
                                        <p className=' font-semibold text-sm '>{mod.first_name +' '+ mod.last_name}</p>
                                        <p className=' text-gray-500 font-normal text-xs'>{mod.email}</p>
                                    </div>
                                    <p className=' text-xs text-gray-500'>moderator</p>
                                </div>
                            )
                        })}
                        
                        <Link href='/admin/editMods' className='m-auto w-2/5'>
                        <Button size='sm' className='w-full primary-50 primary mt-4 mb-1'>
                            <Image src="/assets/icons/edit-primary.svg" width={20} height={20} alt="edit"></Image>
                            manage all
                        </Button>
                        </Link>
                    </Card>
                    
                </div>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                            <ModalContent>
                                {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Google drive link to articles</ModalHeader>
                                    <ModalBody>
                                        <Input
                                        label="drive link"
                                        className="w-3/5 self-center"
                                        variant="bordered"
                                        value={link}
                                        onChange={handlelinkChange}
                                        />
                                    </ModalBody>
                                    <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={()=>{
                                        if(isValidUrl(link)){
                                            validatelink();
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
    )
}
export default isAuth(Admin,1);
