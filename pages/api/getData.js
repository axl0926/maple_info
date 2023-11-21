import { connectDB } from "/lib/database";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const characterName = req.body.characterName;
            const db = (await connectDB).db("maple");
            let result = await db.collection("character").findOne({ name: characterName });
            res.status(200).json(result);
        } catch (error) {
            console.error(" 오류 :", error);
            res.status(500).json({ error: "오류 " });
        }
    } else {
        res.status(405).end();
    }
}
