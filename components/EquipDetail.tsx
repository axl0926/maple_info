"use client";
const tierBorders = {
    레전드리: "border-[#00CC99] border-[3px]",
    유니크: "border-[#F7C912] border-[3px] ",
    에픽: "border-[#7700CC] border-[3px]",
    레어: "border-[#0085CB] border-[3px] ",
};
const tierColors = {
    레전드리: "text-[#C8F901] ",
    유니크: "text-[#F7C912]",
    에픽: "text-[#C368FD] ",
    레어: "text-[#74BAFF] ",
};
const statOrder = ["str", "dex", "int", "luk", "max_hp", "max_mp", "attack_power", "magic_power", "armor", "speed", "jump", "boss_damage", "ignore_monster_armor", "all_stat", "damage", "equipment_level_decrease", "max_hp_rate", "max_mp_rate"];
const statList = {
    str: { name: "STR" },
    dex: { name: "DEX" },
    int: { name: "INT" },
    luk: { name: "LUK" },
    max_hp: { name: "최대 HP" },
    max_mp: { name: "최대 MP" },
    attack_power: { name: "공격력" },
    magic_power: { name: "마력" },
    armor: { name: "방어력" },
    speed: { name: "이동속도" },
    jump: { name: "점프력" },
    boss_damage: { name: "보스 몬스터 공격 시 데미지", unit: "%" },
    ignore_monster_armor: { name: "몬스터 방어력 무시", unit: "%" },
    all_stat: { name: "올스탯", unit: "%" },
    damage: { name: "데미지", unit: "%" },
    equipment_level_decrease: { name: "착용 레벨 감소" },
    max_hp_rate: { name: "최대 HP", unit: "%" },
    max_mp_rate: { name: "최대 MP", unit: "%" },
};
export default function EquipDetail({ itemInfo }) {
    const starGroups = Array.from({ length: Math.ceil(itemInfo.starforce / 5) }, (_, i) => "★".repeat(Math.min(5, itemInfo.starforce - i * 5)) + "☆".repeat(Math.max(0, 5 - itemInfo.starforce + i * 5)));
    return (
        <div className="flex flex-col rounded-md border-gray-300 border-2 bg-dark w-[400px] ">
            <div className="absolute w-20 overflow-hidden h-20  pt-2">
                <div className=" absolute top-[-50px] left-[-50px] h-[100px] w-[100px] -rotate-45 opacity-60 bg-gradient-to-t from-[#3F3F3F] to-white  "></div>
            </div>
            <div className="flex flex-col items-center equip-detail-border">
                <div className={`flex flex-row gap-2 w-[60%] flex-wrap justify-center  text-sm ${itemInfo.starforce_scroll_flag == "미사용" ? "text-yellow-500" : " text-sky-500"}`}>{itemInfo.starforce !== 0 && starGroups.map((group, i) => <div key={i}>{group}</div>)}</div>
                <div className=" text-lg font-bold">{itemInfo.item_name}</div>
                {itemInfo.potential_option_grade && <div className=" text-sm">( {itemInfo.potential_option_grade} 아이템 )</div>}
            </div>
            <div className="flex flex-row equip-detail-border ">
                <div className={` bg-gradient-to-t from-[#C0C0C0] to-[#898989] ${tierBorders[itemInfo?.potential_option_grade]}  rounded-md relative flex justify-center items-center w-20 h-20`}>
                    <img src={itemInfo.item_icon} className=" scale-150  z-10" />
                    <div className="absolute top-[80%] w-[20px] h-[5px] bg-black blur-sm"></div>
                </div>
                <div className="flex items-center justify-center text-center">
                    <span className=" text-yellow-400">▪ REQ LEV : {itemInfo.item_base_option.base_equipment_level}</span>
                </div>
            </div>
            <div className="flex flex-col equip-detail-border ">
                <span>장비분류 : {itemInfo.item_equipment_part}</span>
                {statOrder.map((v, i) => itemInfo.item_total_option[v] != 0 && <StatBox key={i} stat={v} itemInfo={itemInfo}></StatBox>)}
            </div>
            {itemInfo.potential_option_grade && (
                <div className={`flex flex-col p-2 ${(itemInfo.item_description || itemInfo.soul_name || itemInfo.additional_potential_option_grade) && "equip-detail-border"} `}>
                    <span className={tierColors[itemInfo?.potential_option_grade]}>잠재옵션</span>
                    <span>{itemInfo.potential_option_1}</span>
                    <span>{itemInfo.potential_option_2}</span>
                    <span>{itemInfo.potential_option_3}</span>
                </div>
            )}
            {itemInfo.additional_potential_option_grade && (
                <div className={`flex flex-col p-2 ${(itemInfo.item_description || itemInfo.soul_name) && "equip-detail-border"}`}>
                    <span className={tierColors[itemInfo?.additional_potential_option_grade]}>에디셔널 잠재옵션</span>
                    <span>{itemInfo.additional_potential_option_1}</span>
                    <span>{itemInfo.additional_potential_option_2}</span>
                    <span>{itemInfo.additional_potential_option_3}</span>
                </div>
            )}
            {itemInfo.item_description && (
                <div className={`flex flex-col p-2 ${itemInfo.soul_name && "equip-detail-border"}`}>
                    <span>{itemInfo.item_description}</span>
                    {itemInfo.special_ring_level !== 0 && (
                        <span className=" text-orange-400">
                            [ 특수 스킬 반지 ] {itemInfo.item_name} {itemInfo.special_ring_level} 레벨
                        </span>
                    )}
                </div>
            )}
            {itemInfo.soul_name && (
                <div className="flex flex-col p-2 ">
                    <span className=" text-yellow-400">{itemInfo.soul_name}</span>
                    <span>{itemInfo.soul_option}</span>
                </div>
            )}
        </div>
    );
}

function StatBox({ stat, itemInfo }) {
    const totalOption = itemInfo.item_total_option[stat];
    const bassOption = itemInfo.item_base_option[stat];
    const addOption = itemInfo.item_add_option[stat] && itemInfo.item_add_option[stat] != 0 ? itemInfo.item_add_option[stat] : false;
    const starforceOption = itemInfo.item_base_option[stat] && itemInfo.item_starforce_option[stat] != 0 ? itemInfo.item_starforce_option[stat] : false;
    const isUpgraded = addOption || starforceOption;
    return (
        <>
            <span>
                <span className={isUpgraded ? "text-[#5EEBEB] pr-1" : undefined}>
                    {statList[stat].name} : {totalOption}
                    {statList[stat]?.unit}
                </span>

                {isUpgraded && (
                    <span>
                        ( {bassOption}
                        {statList[stat]?.unit}
                        {addOption && (
                            <span className="text-[#C9FA01] pl-1">
                                +{addOption}
                                {statList[stat]?.unit}
                            </span>
                        )}
                        {starforceOption && (
                            <span className="text-[#F2C203]  px-1">
                                +{starforceOption}
                                {statList[stat]?.unit}
                            </span>
                        )}
                        )
                    </span>
                )}
            </span>
        </>
    );
}
