import Queue from "bull";
import getEquip from "@/lib/fetcher";
import { connectDB } from "@/lib/database";
const queue = new Queue("maple", "redis://127.0.0.1:6666");

queue.process(async (job) => {
    console.log(`작업 ${job.id} 처리 중: `, job.data);

    const name = job.data.charName;
    const collection = (await connectDB).db("maple").collection("char");
    const existingItem = await collection.findOne({ name: name });

    if (!existingItem) {
        const searchResult = await getEquip(name);
        if (searchResult.name) {
            let dbResult = await collection.insertOne(searchResult);
            console.log(`insert success: ${dbResult.insertedId}`);
            return "insert success";
        } else {
            console.log("캐릭터를 찾을 수 없습니다.");
            return "character not found";
        }
    } else {
        console.log("이미 존재함");
        return "character already exists";
    }
});

module.exports = queue;
