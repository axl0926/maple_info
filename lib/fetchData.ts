export default async function fetchData(url, ocid, date) {
    if (process.env.API_KEY) {
        const response = await (
            await fetch(`${url}?ocid=${ocid}&date=${date}`, {
                headers: {
                    "Content-Type": "application/json",
                    "x-nxopen-api-key": process.env.API_KEY,
                },
            })
        ).json();
        return response;
    } else {
        console.error("API_KEY오류.");
        return { error: "API_KEY오류." };
    }
}
