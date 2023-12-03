"use client";

import { useState } from "react";

const tierColors = {
    레전드리: "border-[#00FF00] border-[1.5px]",
    유니크: "border-[#FFCC00] border-[1.5px]",
    에픽: "border-[#CC66FF] border-[1.5px]",
    레어: "border-[#74BAFF] border-[1.5px]",
};
export default function Equip({ itemInfo }) {
    const color = itemInfo?.potential.tier ? tierColors[itemInfo.potential.tier] : "rounded-sm";
    const visibility = itemInfo ? `bg-[#B7C9C8] relative ${color} border-solid shadow-inner shadow-gray-500 flex justify-center items-center ` : "invisible";
    return (
        <div className={` h-[40px] w-[40px] m-[1px]   ${visibility}`}>
            {itemInfo && (
                <>
                    <img src={itemInfo.imageUrl} className="max-h-[30px] max-w-[30px] object-contain z-10 " />
                    <span className="absolute top-0 left-[2px] text-[6px] max-w-[30px] whitespace-normal font-bold text-opacity-50 text-gray-100 ">{itemInfo.slot}</span>
                </>
            )}
        </div>
    );
}

 