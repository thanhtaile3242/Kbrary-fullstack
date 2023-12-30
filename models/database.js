import mongoose from "mongoose";
const dbState = [
    { value: 0, label: "disconnected" },
    { value: 1, label: "connected" },
    { value: 2, label: "connecting" },
];
const connection = async () => {
    await mongoose.connect("mongodb://localhost:27017/Kbrary");
    const state = Number(mongoose.connection.readyState);
    console.log(dbState.find((f) => f.value).label, "to DB");
};
export default connection;
