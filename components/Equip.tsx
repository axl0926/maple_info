"use client";

const tierColors = {
    레전드리: "border-[#1CFA1C] border-[2.5px] rounded-[0.8px]",
    유니크: "border-[#F7C912] border-[2.5px] rounded-[0.8px]",
    에픽: "border-[#C368FD] border-[2.5px] rounded-[0.8px]",
    레어: "border-[#74BAFF] border-[2.5px] rounded-[0.8px]",
};

export default function Equip({ itemInfo, slotLabel }) {
    const color = itemInfo?.potential_option_grade ? tierColors[itemInfo.potential_option_grade] : "rounded-sm";
    const visibility = slotLabel ? `bg-[#B7C9C8] relative ${color} border-solid shadow-[inset_0_2px_10px_0_rgb(0,0,0,0.25)] sh flex  justify-center items-center ` : "invisible";
    return (
        <div className={` h-[60px] w-[60px] m-[2px]   ${visibility}`}>
            {slotLabel && (
                <>
                    {itemInfo && (
                        <>
                            <img src={itemInfo.item_icon} className=" scale-[1.3] z-10" /> <div className="absolute top-[70%] w-[20px] h-[5px] bg-black blur-sm"></div>
                        </>
                    )}

                    <span className="absolute top-0 left-[2px] text-[8px] max-w-[45px] whitespace-normal font-bold text-opacity-50 text-gray-100 ">{slotLabel}</span>
                </>
            )}
        </div>
    );
}
