"use client";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function Home() {
    const [charName, setCharName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            console.log({ charName });
            const response = await axios.post("/api/addJob", { charName });
            setCharName("");
            setIsSubmitting(false);
            window.location.href = `/info/${encodeURIComponent(charName)}`;
        } catch (error) {
            console.error(error);   
        }
    };
    const handleChange = (e) => {
        setCharName(e.target.value);
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen gap-8 ">
            <h4 className="text-4xl font-bold ">캐릭터 검색</h4>
            <form onSubmit={handleSubmit}>
                <input name="name" type="text" onChange={handleChange} value={charName} placeholder="캐릭터명" className=" m-2 font-bold text-neutral-800 p-1 pl-3" />
                <button type="submit" disabled={isSubmitting} className=" border-solid border p-1 rounded border-[#FEFEFE] disabled:text-gray-300 disabled:border-gray-300">
                    검색
                </button>
            </form>
        </div>
    );
}
