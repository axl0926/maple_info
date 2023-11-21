import axios from "axios";
import * as cheerio from "cheerio";

const getCharacterUrl = async (characterName) => {
    const url = `https://maplestory.nexon.com/N23Ranking/World/Total?c=${characterName}&w=254`;
    const html = (await axios.get(url)).data;
    const $ = cheerio.load(html);
    if ($("div.none_list2").length > 0) {
        return null;
    }
    const characterUrl = $(`a:contains("${characterName}")`).first().attr("href").split("?")[1];
    return characterUrl;
};

export default async function handler(req, res) {
    try {
        const characterUrl = await getCharacterUrl(req.body.characterName);
        res.status(200).json(characterUrl);
    } catch (error) {
        console.error("/getCharacterUrl 오류");
        res.status(500).json({ error: " /getCharacterUrl 오류 " });
    }
}
