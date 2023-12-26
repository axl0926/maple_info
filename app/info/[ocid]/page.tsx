"use client";

import { useQuery } from "react-query";
import EquipBox from "@/components/EquipBox";
import EquipDetail from "@/components/EquipDetail";

export default function Info({ params }) {
    const ocid = params.ocid;
    const {data} = useQuery({
        queryKey: [`fetchData${ocid}`],
        queryFn: () => fetchData(ocid),
    });
    return (
        <div>
            {data && (
                <div className="flex items-start ">
                    <div className=" w-fit text-gray-900 font-bold rounded-md flex  items-center shrink-0">
                        <img src={data.character_image} />
                        <div className="">
                            <p>{data.character_name}</p>
                            <p>서버 : {data.world_name}</p>
                            <p>직업 : {data.character_class}</p>
                            <p>길드 : {data.character_guild_name}</p>
                            <p>레벨 : {data.character_level}</p>
                        </div>
                    </div>
                    <div className="flex flex-col flex-wrap h-[80vh]">
                        <EquipBox itemEquipment={data.item_equipment}></EquipBox>
                        <EquipDetail itemInfo={data.item_equipment[0]}></EquipDetail>
                    </div>
                </div>
            )}
        </div>
    );
}

async function fetchData(ocid) {
    const response = await fetch(`/api/getData?ocid=${ocid}`);
    return response.json();
}
