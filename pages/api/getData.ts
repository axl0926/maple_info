import { connectDB } from "@/lib/database";

export default async function handler(req, res) {
    try {
        const ocid = req.query.ocid;
        const db = (await connectDB).db("maplestory");
        let result = await db.collection("character").findOne({ ocid: ocid });
        res.status(200).json(result);
    } catch (error) {
        console.error(" 오류 :", error);
        res.status(500).json({ error: "오류 " });
    }
}
