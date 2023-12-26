const url = `${process.env.API_URL}/maplestory/v1/id`;

export default async function handler(req, res) {
    try {
        if (process.env.API_KEY) {
            const response = await (
                await fetch(`${url}?character_name=${req.query.characterName}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "x-nxopen-api-key": process.env.API_KEY,
                    },
                })
            ).json();
            console.log(response);
            res.status(200).json(response.ocid);
        } else {
            res.status(500).json({ error: "API_KEY오류." });
        }
    } catch (error) {
        console.error("/getOcid 오류");
        res.status(500).json({ error: " /getOcid 오류 " });
    }
}
