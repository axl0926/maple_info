
import queue from "@/lib/queue"; 

export default async function handler(req, res) {

    if (req.method === "POST") {
        try {
            const exampleData = { charName: req.body.name };
            await addJob(exampleData);
            res.redirect(302, `/info/${encodeURIComponent(req.body.name)}`);
        } catch (error) {
            console.error("작업 추가 중 오류 :", error);
            res.status(500).json({ error: "작업 추가 중 오류 " });
        }
    } else {
        res.status(405).end(); 
    }
}

async function addJob(data) {
    try {
        const job = await queue.add(data);
        console.log(`작업 추가 완료. Job ID: ${job.id}`);
    } catch (error) {
        throw new Error("작업 추가 중 오류 ");
    }
}
