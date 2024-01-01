"use client";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Popover , PopoverContent ,PopoverTrigger} from "@nextui-org/react";
import {EditIcon} from "@/public/assets/icons/editIcon";
import {DeleteIcon} from "@/public/assets/icons/DeleteIcon";
import {EyeIcon} from "@/public/assets/icons/EyeIcon";
import {columns, users} from "./data";
import { useCallback } from "react";
import { toast } from "sonner";

type ColumnType = typeof columns[0];

//TODO : define realtype of user we used in db
type User = typeof users[0];


export default function App() {
    const renderCell = useCallback((user: User, columnKey: ColumnType) => {
    switch (columnKey.uid) {
        case "name":
        return (
            <p className=" font-semibold">
                {user.first_name} {user.last_name}
            </p>
            
        );
        case "email":
        return (
            <div className="flex flex-col">
            <p className="text-gray-500 text-sm capitalize">{user.email}</p>
            </div>
        );
        case "actions":
        return (
            <div className="relative flex items-center gap-2">
            
            <Popover placement="bottom">
                <PopoverTrigger>                
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EyeIcon/>
                    </span>
                </PopoverTrigger>
                <PopoverContent className="py-5 px-6">
                    <p className=" font-semibold">
                        First Name : <span className=" font-normal"> {user.first_name} </span>
                    </p>
                    <p className=" font-semibold">
                        Last Name : <span className=" font-normal"> {user.last_name} </span>
                    </p>
                    <p className=" font-semibold">
                        Email : <span className=" font-normal"> {user.email} </span>
                    </p>
                    <p className=" font-semibold">
                        Username : <span className=" font-normal"> {user.username} </span>
                    </p>
                    <p className=" font-semibold">
                        Role : <span className=" font-normal"> {user.role} </span>
                    </p>
                </PopoverContent>
            </Popover>
            
            <Popover placement="bottom">
                <PopoverTrigger>                
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EditIcon/>
                    </span>
                </PopoverTrigger>
                <PopoverContent>
                    <p>hello</p>
                </PopoverContent>
            </Popover>
            <Popover placement="bottom">
                <PopoverTrigger>                
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteIcon/>
                    </span>
                </PopoverTrigger>
                <PopoverContent>
                    <p>hello</p>
                </PopoverContent>
            </Popover>
            </div>
        );
        default:
        return "";
    }
    }, []);

    const renderHeader = (column: ColumnType) => (
    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
        {column.name}
    </TableColumn>
    );

    const renderRow = (item: User) => (
        <TableRow key={item.id}>
            {columns.map((column) => (
            <TableCell key={column.uid}>{renderCell(item, column)}</TableCell>
            ))}
        </TableRow>
    );

    return (
    <Table className=" w-2/3 mx-auto my-8">
        <TableHeader columns={columns}>
            {columns.map(renderHeader)}
        </TableHeader>
        <TableBody items={users}>
            {users.map(renderRow)}
        </TableBody>
    </Table>
    );
}
