import queue from "/lib/queue";



const getJobPosition = async (job, watingJobs) => {
    for (let i = 0; i < watingJobs.length; i++) {
        console.log(watingJobs[i].id, job.id);
        if (watingJobs[i].id === job.id) {
            return i + 1;
        }
    }
    return -1;
};
export default async function handler(req, res) {
    if (req.method === "GET") {
        const characterName = req.query.characterName;
        const activeJobs = await queue.getActive();
        const waitingJobs = await queue.getWaiting();
        const completedJobs = await queue.getCompleted();

        const allJobs = [...waitingJobs, ...completedJobs, ...activeJobs];

        for (let job of allJobs) {
            if (job.data.characterName === characterName) {
                const jobState = await job.getState();
                const jobPosition = await getJobPosition(job, waitingJobs);
                return res.status(200).json({ jobState: jobState, jobPosition: jobPosition });
            }
        }
        res.status(404).json({ message: "Job not found" });
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
