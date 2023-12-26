"use client";

import { useState } from "react";
import LayerPopup from "@/components/LayerPopup";

const tierColors = {
    레전드리: "bg-green-500",
    유니크: "bg-yellow-500",
    에픽: "bg-purple-500",
    레어: "bg-blue-500",
};

export default function ItemBox({ itemInfo }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    return (
        <div className="flex bg-gray-100 text-black m-1 h-15 w-96 rounded-md p-2 gap-1 items-center shrink-0" onClick={() => setIsPopupOpen(true)}>
            <div className="flex items-center min-w-[28px] ml-1 mr-1 justify-center">
                <img src={itemInfo.imageUrl} className=" max-h-7 max-w-[28px] object-contain" />
            </div>
            <div className="flex flex-col w-96">
                <div className="flex h-4 text-xs items-center gap-1">
                    {itemInfo.starForce !== 0 && <div className=" bg-lime-500 text-white pl-1 pr-1 p-[1px] rounded-sm">{"+" + itemInfo.starForce}</div>}
                    {/* <div className=" bg-blue-500 text-white pl-1 pr-1 p-[1px] rounded-sm">{itemInfo.type}</div> */}
                    {itemInfo.potential.tier && <div className={` text-white pl-1 pr-1 p-[1px] rounded-sm ${tierColors[itemInfo.potential.tier]}`}>{itemInfo.potential.tier}</div>}
                </div>
                <div>{itemInfo.title}</div>
            </div>
            {isPopupOpen && <LayerPopup onClose={() => setIsPopupOpen(false)} itemInfo={itemInfo}></LayerPopup>}
        </div>
    );
}
