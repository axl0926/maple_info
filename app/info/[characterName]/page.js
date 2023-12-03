"use client";

import { useQuery } from "react-query";
import ItemBox from "@/components/ItemBox";
import Equip from "@/components/Equip";
import EquipBox from "@/components/EquipBox";
export default function Info({ params }) {
    const characterName = params.characterName;

    const jobStatus = useQuery({
        queryKey: [`fetchJobStatus${characterName}`],
        queryFn: () => fetchJobStatus(characterName),
        retry: true,
        retryDelay: () => 2000,
    });

    const data = useQuery({
        queryKey: [`fetchData${characterName}`],
        queryFn: () => fetchData(characterName),
        enabled: jobStatus.data?.jobState === "completed",
    });
    return (
        <div>
            {data.data && (
                <div className="flex items-start ">
                    <div className=" w-fit text-gray-900 font-bold rounded-md flex  items-center shrink-0">
                        <img src={data.data.imageUrl} />
                        <div className="">
                            <p>{data.data.name}</p>
                            <p>서버 : {data.data.world}</p>
                            <p>직업 : {data.data.job}</p>
                            <p>길드 : {data.data.guild}</p>
                        </div>
                    </div>
                    <div className="flex flex-col flex-wrap h-[80vh]">
                        <EquipBox itemInfos={data.data.equip}></EquipBox>
                    </div>
                </div>
            )}
        </div>
    );
}

async function fetchData(characterName) {
    const response = await fetch(`/api/getData`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ characterName: decodeURI(characterName) }),
    });
    return response.json();
}
async function fetchJobStatus(characterName) {
    const response = await fetch(`/api/getJobStatus?characterName=${characterName}`, {
        method: "GET",
    });
    const data = await response.json();

    const status = data.jobPosition === -1 ? data.jobState : data.jobPosition + "번째 대기중";
    console.log(status);
    if (data.jobState !== "completed") {
        throw new Error(`Job state is not completed: ${data.jobState}`);
    }
    return data;
}
