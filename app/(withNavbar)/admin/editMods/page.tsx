import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, ChipProps, getKeyValue} from "@nextui-org/react";
import {EditIcon} from "@/public/assets/icons/editIcon";
import {DeleteIcon} from "@/public/assets/icons/DeleteIcon";
import {EyeIcon} from "@/public/assets/icons/EyeIcon";
import {columns, users} from "./data";
import { useCallback } from "react";

const statusColorMap: Record<string, ChipProps["color"]>  = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};
// TODO define ColumnType
type ColumnType = typeof columns[0];

type User = typeof users[0];

export default function App() {
    const renderCell = useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];
    

    switch (columnKey) {
        case "name":
        return (
            <User
            avatarProps={{radius: "lg", src: user.avatar}}
            description={user.email}
            name={cellValue}
            >
            {user.email}
            </User>
        );
        case "role":
        return (
            <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
            </div>
        );
        case "status":
        return (
            <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
            </Chip>
        );
        case "actions":
        return (
            <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
                </span>
            </Tooltip>
            <Tooltip content="Edit user">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
                </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
                </span>
            </Tooltip>
            </div>
        );
        default:
        return cellValue;
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
            <TableCell key={column.uid}>{renderCell(item, column.uid)}</TableCell>
            ))}
        </TableRow>
    );

    return (
    <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
        {columns.map(renderHeader)}
        </TableHeader>
        <TableBody items={users}>
        {users.map(renderRow)}
        </TableBody>
    </Table>
    );
}
