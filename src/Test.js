import React from "react";
import { Space, Table, Tag } from "antd";
const { Column, ColumnGroup } = Table;
const data = [
    {
        key: "1",
        firstName: "John",
        lastName: "Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "developer"],
    },
    {
        key: "2",
        firstName: "Jim",
        lastName: "Green",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: ["loser"],
    },
    {
        key: "3",
        firstName: "Joe",
        lastName: "Black",
        age: 32,
        address: "Sydney No. 1 Lake Park",
        tags: ["cool", "teacher"],
    },
];
const App = () => {
    return (
        <div>
            <form></form>
            <label>Avatar</label>
            <img
                src="http://localhost:8802/thanhtai-1704418401164.png"
                alt=""
            />
        </div>
    );
};
export default App;
