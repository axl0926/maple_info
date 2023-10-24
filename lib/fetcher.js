import axios from "axios";
import * as cheerio from "cheerio";

const baseUrl = "https://maplestory.nexon.com";
const statType = ["STR", "DEX", "INT", "LUK", "MaxHP", "MaxMP", "공격력", "마력", "물리방어력", "올스탯", "이동속도", "몬스터 방어력 무시", "보스 몬스터공격 시 데미지", "데미지", "점프력", "착용 레벨 감소"];

const getBasicInfo = async (characterBasicInfoUrl) => {
    const html = (await axios.get(characterBasicInfoUrl)).data;
    const $ = cheerio.load(html);
    const getBasicInfoValue = (category) => {
        return $(`table:nth-child(2) > tbody > tr > th > span:contains('${category}')`).parent().next().find("span").text();
    };
    const imageUrl = $("div.char_img >div> img").attr("src");
    const world = getBasicInfoValue("월드");
    const job = getBasicInfoValue("직업");
    const guild = getBasicInfoValue("길드");

    return { world: world, job: job, guild: guild, imageUrl: imageUrl };
};
const getItem = async (itemUrl) => {
    const itemHtml = (await axios.get(baseUrl + itemUrl, { headers: { "x-requested-with": "XMLHttpRequest" } })).data.view;
    const cleanedHTML = itemHtml.replace(/\r?\n|\r/g, "");
    const item$ = cheerio.load(cleanedHTML);
    const itemInfo = {
        title: item$(".item_img>img").attr("alt"),
        starForce: +item$(".item_memo_title>h1>em").text().replace(/\D/g, "") || 0,
        type: item$("span:contains('장비분류') > em").text(),
        imageUrl: item$(".item_img>img").attr("src"),
        stat: {},
        potential: {},
    };
    item$("ul li").each((i, e) => {
        const statName = item$(e).find(".stet_th span").text().trim();
        const statValue = item$(e).find(".point_td").text().trim();

        if (statType.includes(statName)) {
            itemInfo.stat[statName] = parseInt(statValue.replace("+", ""), 10);
        } else if (statName.includes("잠재옵션") && !statName.includes("에디셔널") && !statValue.includes("해당")) {
            itemInfo.potential.tier = statName.split("(")[1].split(")")[0].split(" ")[0];
            itemInfo.potential.statList = item$(e).find(".point_td").html().split("<br>");
        }
    });
    return itemInfo;
};
const getItems = async (characterEquipUrl) => {
    const html = (await axios.get(characterEquipUrl)).data;
    const $ = cheerio.load(html);

    const itemList = [];
    for (let i = 1; i <= 30; i++) {
        const itemUrl = $(`div.weapon_wrap > ul > li:nth-child(${i})>span>a`).attr("href");
        if (!itemUrl) continue;
        const itemInfo = await getItem(itemUrl);
        itemList.push(itemInfo);
        await new Promise((resolve) => setTimeout(resolve, 100));
    }
    return itemList;
};
const getCharacterUrlParam = async (charName) => {
    const url = `${baseUrl}/N23Ranking/World/Total?c=${charName}&w=254`;
    const html = (await axios.get(url)).data;
    const $ = cheerio.load(html);
    if ($("div.none_list2").length > 0) {
        return false;
    }
    return $(`a:contains("${charName}")`).first().attr("href").split("?")[1];
};

const getEquip = async (charName) => {
    try {
        const characterUrlParam = await getCharacterUrlParam(charName);
        if (!characterUrlParam) return "character not found";
        const characterBasicInfoUrl = `${baseUrl}/Common/Character/Detail/${charName}?${characterUrlParam}`;
        const characterEquipUrl = `${baseUrl}/Common/Character/Detail/${charName}/Equipment?${characterUrlParam}`;
        const bascicInfo = await getBasicInfo(characterBasicInfoUrl);
        const itemsInfo = await getItems(characterEquipUrl);
        return { name: charName, ...bascicInfo, equip: itemsInfo };
    } catch (e) {
        console.log(e);
        return "error: " + e.message;
    }
};

export default getEquip;

