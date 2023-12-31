"use client";

import Equip from "@/components/Equip";
export default function EquipBox({ itemEquipment }) {
    const equipmentSlot = {
        RING1: "반지1",
        RING2: "반지2",
        RING3: "반지3",
        RING4: "반지4",
        CAP: "모자",
        EMBLEM: "엠블렘",
        PENDANT: "펜던트",
        PENDANT2: "펜던트2",
        "FORE HEAD": "얼굴장식",
        BADGE: "뱃지",
        EYEACC: "눈장식",
        EARACC: "귀고리",
        MEDAL: "훈장",
        CLOTHES: "상의",
        SHOULDER: "어깨장식",
        POKET: "포켓 아이템",
        BELT: "벨트",
        PANTS: "하의",
        GLOVES: "장갑",
        CAPE: "망토",
        SHOES: "신발",
        ANDROID: "안드로이드",
        HEART: "기계 심장",
        "SUB WEAPON": "보조무기",
        WEAPON: "무기",
    };
    const EquipBoxOrder = ["RING4", null, "CAP", null, "EMBLEM", "RING3", "PENDANT2", "FORE HEAD", null, "BADGE", "RING2", "PENDANT", "EYEACC", "EARACC", "MEDAL", "RING1", "WEAPON", "CLOTHES", "SHOULDER", "SUB WEAPON", "POKET", "BELT", "PANTS", "GLOVES", "CAPE", null, null, "SHOES", "ANDROID", "HEART"];
 
    return (
        <div className=" bg-gradient-to-b from-[#ECECEC] to-[#CDCDCD] rounded-md border-[10px] p-3 border-[#3E444C] md:w-96 w-4/5">
            <span className=" text-[#3E444C] text-[12px] font-bold">EQUIPMENT</span> 
            <div className="flex flex-row flex-wrap gap-1 m-5 justify-center">
                {EquipBoxOrder.map((order, i) => {
                    const index = itemEquipment.findIndex((info) => order && info.item_equipment_slot === equipmentSlot[order]);
                    const itemInfo = index > -1 ? itemEquipment[index] : null;

                    return <Equip key={i} itemInfo={itemInfo} slotLabel={order} />;
                })}
            </div>
        </div>
    );
}
