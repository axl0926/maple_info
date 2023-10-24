import { connectDB } from "@/lib/database";
import getEquip from "@/lib/fetcher";

export default async function handler(req, res) {
    const name = req.body.name;
    const collection = (await connectDB).db("maple").collection("char");
    const existingItem = await collection.findOne({ name: name });

    if (!existingItem) {
        const searchResult = await getEquip(name);
        if (searchResult.name) {
            let dbResult = await collection.insertOne(searchResult);
            console.log(`insert success: ${dbResult.insertedId}`);
            res.redirect(302, `/info/${encodeURIComponent(name)}`);
        } else {
            console.log("캐릭터를 찾을 수 없습니다.");
            res.redirect(302, `/`);
        }
    } else {
        console.log("이미 존재함");
        res.redirect(302, `/info/${encodeURIComponent(name)}`);
    }
}
