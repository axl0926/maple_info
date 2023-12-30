"use client";
import { Tooltip } from "react-tooltip";
import EquipDetail from "@/components/EquipDetail";
const tierColors = {
    레전드리: "border-[#1CFA1C] border-[2.5px] rounded-sm",
    유니크: "border-[#F7C912] border-[2.5px] rounded-sm",
    에픽: "border-[#C368FD] border-[2.5px] rounded-sm",
    레어: "border-[#74BAFF] border-[2.5px] rounded-sm",
};

export default function Equip({ itemInfo, slotLabel }) {

    const color = itemInfo?.potential_option_grade ? tierColors[itemInfo.potential_option_grade] : "rounded-md";
    const visibility = slotLabel ? `bg-[#B7C9C8]  ${color}  border-solid shadow-[inset_0_2px_10px_0_rgb(0,0,0,0.25)] flex  justify-center items-center ` : "invisible";
    return (
        <div className=" w-1/6 ">
            <a data-tooltip-id={itemInfo?.item_name}>
                <div className={`relative  aspect-square box-border  ${visibility}`} >
                    {slotLabel && (
                        <>
                            {itemInfo && (
                                <>
                                    <img src={itemInfo.item_icon}  className="max-w-[80%] max-h-[80%] z-10 md:scale-100 sm:scale-125 scale-100" /> <div className="absolute top-[70%] w-[20px] h-[5px] bg-black blur-sm"></div>
                                </>
                            )}

                            <span className="absolute top-0 left-[2px] text-[8px] max-w-[45px] whitespace-normal font-bold text-opacity-50 text-gray-100 ">{slotLabel}</span>
                        </>
                    )}
                </div>
            </a>
            <Tooltip id={itemInfo?.item_name} place="right" className="z-50 !p-0 !rounded-lg" opacity={0.9} arrowColor="#b0b2b3">
                <EquipDetail itemInfo={itemInfo} />
            </Tooltip>
        </div>
    );
}
