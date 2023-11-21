"use client";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import Snackbar from "@/components/Snackbar";

export default function Home() {
    const [characterName, setCharacterName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [snackBar, setSnackBar] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const characterUrl = (await axios.post("/api/getCharacterUrl", { characterName })).data;
            if (!characterUrl) {
                setSnackBar("characterUrl");
                return;
            }
            const job = await axios.post("/api/addJob", { characterName: characterName, characterUrl: characterUrl },{ timeout: 10000 });
            window.location.href = `/info/${encodeURIComponent(characterName)}`;
        } catch (error) {
            console.error(error);
            setSnackBar("job");
        } finally {
            setIsSubmitting(false);
        }
    };
    const handleChange = (e) => {
        setCharacterName(e.target.value);
    };
    return (
        <div className="flex flex-col justify-center items-center h-full gap-8 ">
            <h4 className="text-4xl font-bold ">캐릭터 검색</h4>
            <form onSubmit={handleSubmit}>
                <input name="name" type="text" onChange={handleChange} value={characterName} placeholder="캐릭터명" className=" m-2 font-bold text-neutral-800 p-1 pl-3" />
                <button type="submit" disabled={isSubmitting} className=" border-solid border p-1 rounded border-[#FEFEFE] disabled:text-gray-300 disabled:border-gray-300">
                    검색
                </button>
            </form>
            {snackBar=="characterUrl" && <Snackbar message={"존재하지 않는 캐릭터 명 입니다."} setSnackBar={setSnackBar}></Snackbar>}
            {snackBar=="job" && <Snackbar message={"작업 서버의 응답이 없습니다."} setSnackBar={setSnackBar}></Snackbar>}
        </div>
    );
}
