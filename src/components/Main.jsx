import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PatternFormat } from "react-number-format";

const Main = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState(JSON.parse(localStorage.getItem("data") || "[]"));
    const [edit, setEdit] = useState(null);

    useEffect(() => {
        if (data.length) {
            localStorage.setItem("data", JSON.stringify(data));
        }
    }, [data]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (edit) {
            // update
            const updatedUser = {
                id: edit.id,
                username,
                password,
            };
            setData((prev) => prev.map((item) => (item.id === edit.id ? updatedUser : item)));
            setEdit(null);
        } else {
            // create
            const newUser = {
                id: uuidv4(),
                username,
                password,
            };
            setData((prev) => [...prev, newUser]);
        }
        setUsername("");
        setPassword("");
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure?")) {
            setData((prev) => prev.filter((item) => item.id !== id));
            
        }
    };

    const handleEdit = (item) => {
        setUsername(item.username);
        setPassword(item.password);
        setEdit(item);
    };

    return (
        <div className="flex gap-5">
            <form className="w-80 p-5 bg-slate-200 h-screen" onSubmit={handleSubmit}>
                
                <input
                    required
                    className="w-full h-10 px-3 mb-3"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="username"
                />
                <input
                    required
                    className="w-full h-10 px-3 mb-3"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                />
               
                <PatternFormat
                    format="+998 (##) ### ## ##"
                    allowEmptyFormatting
                    mask="_"
                    className="w-full h-10 px-3 mb-3"
                /> 
                <button className="w-full h-10 px-3 mb-3 bg-blue-400">Create</button>
               
            </form>
            <div className="flex-1 flex gap-3 flex-wrap items-start content-start py-5">
                {data.map((item) => (
                    <div key={item.id} className="w-72 p-3 shadow text-center flex flex-col gap-2">
                        <div className="w-20 h-20 bg-slate-300 rounded-full mx-auto"></div>
                        <h3>{item.username}</h3>
                        <p>{item.password}</p>
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="bg-red-300 p-1 rounded-lg"
                            >
                                delete
                            </button>
                            
                        <label htmlFor="text">aaaa</label>
                        <label htmlFor=""></label>
                            <button
                                onClick={() => handleEdit(item)}
                                className="bg-green-300 p-1 rounded-lg"
                            >
                                edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Main;



// let user = {
//     fname: "",
//     lname: "",
//     username: "", // unique
//     password: "", // min - 6
//     country: "", 
//     gender: "", 
//     birthdate: "", 
//     tel: "", 
// }
 //  localStorage.setItem("data", JSON.stringify([...data, newUser]))