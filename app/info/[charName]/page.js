import { connectDB } from "/lib/database";

export default async function Info({ params }) {
    const charName = decodeURI(params.charName);
    const db = (await connectDB).db("maple");
    let result = await db.collection("char").findOne({ name: charName });
    return (
        <div>
            <h1>{result.name}</h1>
            <p>서버 : {result.world}</p>
            <p>직업 : {result.job}</p>
            <p>길드 : {result.guild}</p>
            <img src={result.imageUrl} alt="Example Image"  />
            {result.equip.map((v, i) => {
                return (
                    <div key={i}>
                        <img src={v.imageUrl} alt="Example Image"  />
                        <span>{v.title}</span>
                        <span>{v.starForce}</span>
                    </div>
                );
            })}
        </div>
    );
}
