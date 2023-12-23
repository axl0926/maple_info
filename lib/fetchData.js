export default async function fetchData(url, ocid, date) {
    const response = await (
        await fetch(`${url}?ocid=${ocid}&date=${date}`, {
            headers: {
                "Content-Type": "application/json",
                "x-nxopen-api-key": process.env.API_KEY,
            },
        })
    ).json();
    return response;
}
