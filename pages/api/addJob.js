import queue from "/lib/queue";


export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const job = await queue.add(req.body);
            res.status(200).json({ jobId: job.id });
        } catch (error) {
            console.error("작업 추가 중 오류 :", error);
            res.status(500).json({ error: "작업 추가 중 오류 " });
        }
    } else {
        res.status(405).end();
    }
}
