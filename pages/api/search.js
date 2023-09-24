import axios from "axios";
import * as cheerio from "cheerio";
import { connectDB } from "/util/database";

const baseUrl = "https://maplestory.nexon.com";
const statType = ["STR", "DEX", "INT", "LUK", "MaxHP", "MaxMP", "공격력", "마력", "물리방어력", "올스탯", "이동속도", "몬스터 방어력 무시", "보스 몬스터공격 시 데미지", "데미지", "점프력", "착용 레벨 감소"];

const getItem = async (charName) => {
    try {
        const html = (await axios.get(`${baseUrl}/N23Ranking/World/Total?c=${charName}&w=254`)).data;
        const $ = cheerio.load(html);
        const pageUrl = `${baseUrl}/Common/Character/Detail/${charName}/Equipment?` + $(`a:contains("${charName}")`).first().attr("href").split("?")[1];
        const pageHtml = (await axios.get(pageUrl)).data;
        const page$ = cheerio.load(pageHtml);
        const itemList = [];
        for (let i = 1; i <= 30; i++) {
            const charUrl = page$(`#container > div.con_wrap > div.contents_wrap > div > div.tab01_con_wrap > div.weapon_wrap > ul > li:nth-child(${i})>span>a`).attr("href");
            if (!charUrl) continue;
            const itemHtml = (
                await axios.get(baseUrl + charUrl, {
                    headers: {
                        "x-requested-with": "XMLHttpRequest",
                    },
                })
            ).data.view;
            const cleanedHTML = itemHtml.replace(/\r?\n|\r/g, "");
            const item$ = cheerio.load(cleanedHTML);
            const itemInfo = { title: item$(".item_img>img").attr("alt"), starForce: +item$(".item_memo_title>h1>em").text().replace(/\D/g, "") || 0, type: item$("span:contains('장비분류') > em").text(), stat: {}, potential: {} };
            item$("ul li").each((i, e) => {
                const statName = item$(e).find(".stet_th span").text().trim();
                const statValue = item$(e).find(".point_td").text().trim();
                if (statType.includes(statName)) {
                    itemInfo["stat"][statName] = parseInt(statValue.replace("+", ""), 10);
                } else if (statName.includes("잠재옵션") && !statName.includes("에디셔널") && !statValue.includes("해당")) {
                    itemInfo["potential"]["tier"] = statName.split("(")[1].split(")")[0].split(" ")[0];
                    itemInfo["potential"]["statList"] = item$(e).find(".point_td").html().split("<br>");
                }
            });
            itemList.push(itemInfo);
            await new Promise((resolve) => setTimeout(resolve, 200));
        }
        return { name: charName, equip: itemList };
    } catch (e) {
        console.log(e);
    }
};

export default async function handler(req, res) {
    const name = req.body.name;
    const db = (await connectDB).db("maple");
    const collection = db.collection("char");
    const existingItem = await collection.findOne({ name: name });

    if (!existingItem) {
        const searchResult = await getItem(name);
        if (searchResult) {
            let dbResult = await collection.insertOne(searchResult);
            console.log(`insert success: ${dbResult.insertedId}`);
            res.redirect(302, `/info/${encodeURIComponent(name)}`);
        } else {
            console.log("undefiend");
        }
    } else {
        console.log("이미 존재함");
        res.redirect(302, `/info/${encodeURIComponent(name)}`);
    }
}
