"use client";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Popover , PopoverContent ,PopoverTrigger} from "@nextui-org/react";
import {EditIcon} from "@/public/assets/icons/editIcon";
import {DeleteIcon} from "@/public/assets/icons/DeleteIcon";
import {EyeIcon} from "@/public/assets/icons/EyeIcon";
import {columns, users} from "./data";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import TableUsers from "@/components/TableUsers/TableUsers";

type ColumnType = typeof columns[0];

//TODO : define realtype of user we used in db
type User = typeof users[0];



export default function App() {
    return(<div>
        
        <TableUsers columns={columns}/>
    </div>)
}
