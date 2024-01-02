"use client";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, Input, ModalFooter, useDisclosure} from "@nextui-org/react";
import {EditIcon} from "@/public/assets/icons/editIcon";
import {DeleteIcon} from "@/public/assets/icons/DeleteIcon";
import {EyeIcon} from "@/public/assets/icons/EyeIcon";
import {columns, users} from "./data";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import TableUsers from "@/components/TableUsers/TableUsers";



export default function App() {
    
    return(<div className=" w-2/3 m-auto">
        <p className='purple_gradient font-black text-3xl my-4'> Moderators </p>
        <p className="font-semibold">you can edit moderators from here </p>
        <TableUsers columns={columns}/>
        
    </div>)
}
