import React from "react";
const columns = [
  {name: "NAME", uid: "name"},
  {name: "Email", uid: "email"},
  {name: "ACTIONS", uid: "actions"},
];

const users = [
  {
    id: '1',
    first_name: "Tony",
    last_name: "Reichert",
    role: "Moderator",
    username: "tony.reichert",
    email: "tony.reichert@example.com",
  },
  {
    id: '2',
    // name: "Zoey Lang",
    first_name: "Zoey",
    last_name: "Lang",
    username: "zoey.lang",
    role: "Technical Lead",
    email: "zoey.lang@example.com",
  },
  {
    id: '3',
    // name: "Jane Fisher",
    first_name: "Jane",
    last_name: "Fisher",
    username: "jane.fisher",
    role: "Senior Developer",
    email: "jane.fisher@example.com",
  },
  {
    id: '4',
    // name: "William Howard",
    first_name: "William",
    last_name: "Howard",
    username: "william.howard",
    role: "Community Manager",
    email: "william.howard@example.com",
  },
  {
    id: '5',
    // name: "Kristen Copper",
    first_name: "Kristen",
    last_name: "Copper",
    username: "kristen.copper",
    role: "Sales Manager",
    email: "kristen.cooper@example.com",
  },
];

export {columns, users};
