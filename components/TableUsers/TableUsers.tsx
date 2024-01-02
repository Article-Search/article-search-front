"use client"
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Tooltip,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Button,
    Input,
    Modal,
    useDisclosure,
    ModalFooter,
    ModalBody,
    ModalContent,
    ModalHeader,
} from "@nextui-org/react";
    import { EditIcon } from "@/public/assets/icons/editIcon";
    import { DeleteIcon } from "@/public/assets/icons/DeleteIcon";
    import { EyeIcon } from "@/public/assets/icons/EyeIcon";
import { use, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { User } from "@/types";
import Image from "next/image";
import plus from "@/public/assets/icons/plus.svg";

type ColumnType = {
    name: string;
    uid: string;
};

    export default function TableUsers({ columns }: { columns: ColumnType[] }) {
    const [userDetails, setUserDetails] = useState<Record<string, User>>({});
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User>(users[0]);
    const [dataFetched, setDataFetched] = useState(false);
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } =
        useDisclosure();
    const [newUser, setNewUser] = useState<User>({
        id: "",
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        role: "Moderator",
    });

    const handleInputChange = (key: string, value: string) => {
        setNewUser((prevUser) => ({ ...prevUser, [key]: value }));
    };

    const handleFirstNameChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) =>
        handleInputChange("first_name", e.target.value),
        []
    );

    const handleLastNameChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) =>
        handleInputChange("last_name", e.target.value),
        []
    );

    const handleEmailChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) =>
        handleInputChange("email", e.target.value),
        []
    );

    const handleUsernameChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) =>
        handleInputChange("username", e.target.value),
        []
    );

    const handlePasswordChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) =>
        handleInputChange("password", e.target.value),
        []
    );

    const handleSubmitNewUser = useCallback(() => {
        setUsers((prevUsers) => [...prevUsers, newUser]);
        toast.success("User added successfully");
    }, [newUser]);

    const fetchData = async () => {
      // TODO: Make a request to fetch user data from API
      // const response = await fetch("URL");
      // const data = await response.json();
      // setUsers(data);
        setUsers([
        {
            id: "1",
            first_name: "Tony",
            last_name: "Reichert",
            role: "Moderator",
            username: "tony.reichert",
            email: "tony.reichert@example.com",
        },
        {
            id: '2',
            first_name: "Zoey",
            last_name: "Lang",
            username: "zoey.lang",
            role: "Technical Lead",
            email: "zoey.lang@example.com",
        },
        {
            id: '3',
            first_name: "Jane",
            last_name: "Fisher",
            username: "jane.fisher",
            role: "Senior Developer",
            email: "jane.fisher@example.com",
        },
        {
            id: '4',
            first_name: "William",
            last_name: "Howard",
            username: "william.howard",
            role: "Community Manager",
            email: "william.howard@example.com",
        },
        {
            id: '5',
            first_name: "Kristen",
            last_name: "Copper",
            username: "kristen.copper",
            role: "Sales Manager",
            email: "kristen.cooper@example.com",
        },
        ]);
        setDataFetched(true);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const initialUserDetails = users.reduce(
        (acc, user) => ({ ...acc, [user.id]: user }),
        {} as Record<string, User>
        );
        setUserDetails(initialUserDetails);
    }, [users]);

    const handleSubmit = async (userId: string) => {
        const user = userDetails[userId];
        setUsers((prevUsers) => {
        const index = prevUsers.findIndex((user) => user.id === userId);
        const newUsers = [...prevUsers];
        newUsers[index] = user;
        return newUsers;
        });
      // TODO: Make the API request to update the user's details and return a toast
        console.log(user);
    };

    const handleDelete = async (userId: string) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      // TODO: Make the API request to delete the user and return a toast
    };

    const renderCell = useCallback(
        (user: User, columnKey: ColumnType) => {
        switch (columnKey.uid) {
            case "name":
            return (
                <p className="font-semibold">
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
                        <EyeIcon />
                    </span>
                    </PopoverTrigger>
                    <PopoverContent className="py-5 px-6 items-start">
                    <p className=" font-bold text-gray-500">
                        First Name : <span className=" font-normal text-black"> {user.first_name} </span>
                    </p>
                    <p className=" font-bold text-gray-500">
                        Last Name : <span className=" font-normal text-black"> {user.last_name} </span>
                    </p>
                    <p className=" font-bold text-gray-500">
                        Email : <span className=" font-normal text-black"> {user.email} </span>
                    </p>
                    <p className=" font-bold text-gray-500">
                        Username : <span className=" font-normal text-black"> {user.username} </span>
                    </p>
                    <p className=" font-bold text-gray-500">
                        Role : <span className=" font-normal text-black"> {user.role} </span>
                    </p>
                    </PopoverContent>
                </Popover>

                <span
                    onClick={() => {
                    setSelectedUser(user);
                    onOpen();
                    }}
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                >
                    <EditIcon />
                </span>
                <Popover placement="bottom">
                    <PopoverTrigger>
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                        <DeleteIcon />
                    </span>
                    </PopoverTrigger>
                    <PopoverContent className="p-5">
                    <p className=" font-bold text-gray-500">
                        Are you sure you want to delete this user ?
                    </p>
                    <Button color="danger" variant="light" onClick={()=>{handleDelete(user.id)}}  >
                        Delete
                    </Button>
                    </PopoverContent>
                </Popover>
                </div>
            );
            default:
            return "";
        }
        },
        []
    );

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
        <>
        {dataFetched && users.length > 0 && (
            <>
            <Button className="mt-4 font-bold" size="sm" color="primary" onClick={onOpen2}>
                <Image src={plus} width={15} height={15} alt="plus" className="mr-2" />
                Add Moderator
            </Button>
            <Table className="w-full mx-auto my-4">
                <TableHeader columns={columns}>
                {columns.map(renderHeader)}
                </TableHeader>
                <TableBody items={users}>
                {users.map(renderRow)}
                </TableBody>
            </Table>
            </>
        )}

        {dataFetched && users.length === 0 && (
        <div className="flex flex-col items-center justify-center h-96">
            <p className="text-2xl font-bold text-gray-500">No Moderators found</p>
        </div>)
    }
    
    {!dataFetched && (
        <div className="flex flex-col items-center justify-center h-96">
            <p className="text-2xl font-bold text-gray-500">Loading...</p>
        </div>)
    }
    {/*TODO : use real loading animation*/}

    

    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(closeModal) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Edit User</ModalHeader>
                        <ModalBody>
                            <form>
                                <Input className=" my-1" label="first name" type="text" value={userDetails[selectedUser.id]?.first_name || ''} onChange={e => setUserDetails({...userDetails, [selectedUser.id]: {...userDetails[selectedUser.id], first_name: e.target.value}})} />
                                <Input className=" my-1" label="last name" type="text" value={userDetails[selectedUser.id]?.last_name||''} onChange={e => setUserDetails({...userDetails, [selectedUser.id]: {...userDetails[selectedUser.id], last_name: e.target.value}})} />
                                <Input className=" my-1" label="email" type="email" value={userDetails[selectedUser.id]?.email||''} onChange={e => setUserDetails({...userDetails, [selectedUser.id]: {...userDetails[selectedUser.id], email: e.target.value}})} />
                                <Input className=" my-1" label="username" type="text" value={userDetails[selectedUser.id]?.username||''} onChange={e => setUserDetails({...userDetails, [selectedUser.id]: {...userDetails[selectedUser.id], username: e.target.value}})} />
                                <Input className=" my-1"  label="role" type="text" value={userDetails[selectedUser.id]?.role||''} onChange={e => setUserDetails({...userDetails, [selectedUser.id]: {...userDetails[selectedUser.id], role: e.target.value}})} />
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={closeModal}>
                                Cancel
                            </Button>
                            <Button color="primary" onPress={() => {
                                selectedUser && handleSubmit(selectedUser.id);
                                closeModal();
                            }}>
                                Save
                            </Button>
                        </ModalFooter>
                    </>
                    )}
                </ModalContent>
            </Modal>


            {/*new user modal */}
            <Modal isOpen={isOpen2} onOpenChange={onOpenChange2}>
                <ModalContent>
                    {(closeModal) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Edit User</ModalHeader>
                        <ModalBody>
                            <form>
                                <Input className=" my-1" label="first name" type="text" onChange={handleFirstNameChange}  />
                                <Input className=" my-1" label="last name" type="text" onChange={handleLastNameChange}  />
                                <Input className=" my-1" label="email" type="email" onChange={handleEmailChange}  />
                                <Input className=" my-1" label="username" type="text" onChange={handleUsernameChange}  />
                                <Input className=" my-1" label="password" type="password" onChange={handlePasswordChange}  />
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={closeModal}>
                                Cancel
                            </Button>
                            <Button color="primary" onClick={() => {
                                handleSubmitNewUser();
                                closeModal();
                            }}>
                                Save
                            </Button>
                        </ModalFooter>
                    </>
                    )}
                </ModalContent>
            </Modal>
    </>
    );
}