"use client";
import { useState } from "react";
import Snackbar from "@/components/Snackbar";

export default function Home() {
    const [characterName, setCharacterName] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [snackBar, setSnackBar] = useState<false|string>(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const ocid = await (await fetch(`/api/getOcid?characterName=${characterName}`)).json();
            if (!ocid) {
                setSnackBar("ocid");
                return;
            }
            const res = await fetch(`/api/getItemEquipment?ocid=${ocid}`);
            res.status === 200 || 409 ? (window.location.href = `/info/${ocid}`) : setSnackBar("ocid");
        } catch (error) {
            console.error(error);
            setSnackBar("ocid");
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
            <span className=" text-white opacity-80">
                Ex ) <button onClick={() => setCharacterName("도적")}>도적</button>,<button onClick={() => setCharacterName("전사")}>전사</button>,<button onClick={() => setCharacterName("궁수")}>궁수</button>
            </span>
            {snackBar == "ocid" && <Snackbar message={"접속기록이 없는 캐릭터 명 입니다."} setSnackBar={setSnackBar}></Snackbar>}
        </div>
    );
}
