"use client";
const tierColors = {
    레전드리: "border-[#1CFA1C] border-[2.5px] rounded-[0.8px]",
    유니크: "border-[#F7C912] border-[2.5px] rounded-[0.8px]",
    에픽: "border-[#C368FD] border-[2.5px] rounded-[0.8px]",
    레어: "border-[#74BAFF] border-[2.5px] rounded-[0.8px]",
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
    const fullStar = "★★★★★    ".repeat(Math.floor(itemInfo.starforce / 5));
    const star = "★".repeat(itemInfo.starforce % 5);
    const stars = `${fullStar} ${star}`;

    return (
        <div className="relative flex flex-col overflow-hidden rounded-md border-[#B0B2B3] border-2 bg-[#2E2E2E] shadow-[inset #1C1C1C 0px 0px 1px 1px]">
            <div className="absolute top-0 left-0 border-0 h-[2rem] border-l-[2rem] border-b-[2rem] border-solid border-transparent border-l-[#d5d5d538]"></div>
            <div>
                {itemInfo.starforce !== 0 && <div>{stars}</div>}
                <div>{itemInfo.item_name}</div>
                {itemInfo.potential_option_grade && <div>( {itemInfo.potential_option_grade} 아이템 )</div>}
            </div>
            <div className="flex flex-row">
                <div>
                    <img src={itemInfo.item_icon} />
                </div>
            </div>
            <div className="flex flex-col">
                <span>장비분류 : {itemInfo.item_equipment_part}</span>
                {statOrder.map((v, i) => itemInfo.item_total_option[v] != 0 && <StatBox key={i} stat={v} itemInfo={itemInfo}></StatBox>)}
            </div>
            {itemInfo.potential_option_grade && (
                <div className="flex flex-col">
                    <span>잠재옵션</span>
                    <span>{itemInfo.potential_option_1}</span>
                    <span>{itemInfo.potential_option_2}</span>
                    <span>{itemInfo.potential_option_3}</span>
                </div>
            )}
            {itemInfo.additional_potential_option_grade && (
                <div className="flex flex-col">
                    <span>에디셔널 잠재옵션</span>
                    <span>{itemInfo.additional_potential_option_1}</span>
                    <span>{itemInfo.additional_potential_option_2}</span>
                    <span>{itemInfo.additional_potential_option_3}</span>
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
                <span className={isUpgraded && "text-[#5EEBEB]"}>
                    {statList[stat].name} : {totalOption}
                    {statList[stat]?.unit}{" "}
                </span>

                {isUpgraded && (
                    <span>
                        ( {bassOption}
                        {statList[stat]?.unit}
                        {addOption && (
                            <span className="text-[#C9FA01]">
                                {" "}
                                +{addOption}
                                {statList[stat]?.unit}
                            </span>
                        )}
                        {starforceOption && (
                            <span className="text-[#F2C203]">
                                {" "}
                                +{starforceOption}
                                {statList[stat]?.unit}
                            </span>
                        )}{" "}
                        )
                    </span>
                )}
            </span>
        </>
    );
}
