"use client"
import React, { useState, useContext } from 'react';
import {Card , Button, Link , useDisclosure , Modal , ModalContent , ModalFooter , ModalBody , ModalHeader, Input} from "@nextui-org/react";
import edit from "@/public/assets/icons/edit.svg"
import Image from 'next/image'

export default function ProfileField(props :{fieldData : string , fieldName:string ,returnedValue :(value: string) => void , confirmData :(value : string)=>boolean , errorMessage:string }) {

    const data = props.fieldData;
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [newData, setNewData] = useState('');
    const [newDataIsTouched , setNewDataIsTouched] = useState(false);
    const isNewDataValid= props.confirmData(newData);
    const newDataError= isNewDataValid || !newDataIsTouched ? '' : props.errorMessage;
    const handleNewDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewData(e.target.value);
    }
    const handleBlurNewData= ()=>{
        setNewDataIsTouched(true);
    }
    return (
        <div className='my-2'>
                        <p className='font-bold text-lg text-gray-500'> {props.fieldName} </p>
                        <div className=' flex flex-row justify-between items-center'>
                            <p className=' font-medium text-md'> {data} </p>
                            <Button  onPress={onOpen} className='flex flex-row justify-around items-center'>
                                <Image src={edit} alt="edit" width={20} height={20} />
                                <p className=' font-bold'>Edit</p>
                            </Button>
                        </div>

                        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                            <ModalContent>
                                {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">New {props.fieldName}</ModalHeader>
                                    <ModalBody>
                                        <Input
                                        label={props.fieldName}
                                        className="w-3/5 self-center"
                                        variant="bordered"
                                        value={newData}
                                        onChange={handleNewDataChange}
                                        onBlur={handleBlurNewData}
                                        isInvalid={!isNewDataValid && newDataIsTouched}
                                        errorMessage={newDataError}
                                        />
                                    </ModalBody>
                                    <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={()=>{
                                        if(isNewDataValid){
                                            props.returnedValue(newData);
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
}
