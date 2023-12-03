"use client";

import { useState } from "react";
import Equip from "@/components/Equip";

export default function EquipBox({ itemInfos }) {
    const EquipBoxOrder = ["RING", null, "CAP", null, "EMBLEM", "RING", "PENDANT", "FORE HEAD", null, "BADGE", "RING", "PENDANT", "EYEACC", "EARACC", "MEDAL", "RING", "WEAPON", "CLOTHES", "SHOULDER", "SUB WEAPON", "POKET", "BELT", "PANTS", "GLOVES", "CAPE", null, null, "SHOES", "ANDROID", "HEART"];
    let usedItemInfos = [...itemInfos];

    return (
        <div className=" bg-gradient-to-b from-[#ECECEC] to-[#CDCDCD] rounded-md border-[10px] p-3 border-[#3E444C]">
            <span className=" text-[#3E444C] text-[12px] font-bold">EQUIPMENT</span>
            <div className="grid grid-cols-5 p-5">
                {EquipBoxOrder.map((order, i) => {
                    const reverseIndex = usedItemInfos
                        .slice()
                        .reverse()
                        .findIndex((info) => info.slot === order);
                    const index = reverseIndex >= 0 ? usedItemInfos.length - 1 - reverseIndex : -1;
                    const itemInfo = index > -1 ? usedItemInfos[index] : null;
                    if (itemInfo) {
                        usedItemInfos = [...usedItemInfos.slice(0, index), ...usedItemInfos.slice(index + 1)];
                    }
                    return <Equip key={i} itemInfo={itemInfo} />;
                })}
            </div>
        </div>
    );
}
