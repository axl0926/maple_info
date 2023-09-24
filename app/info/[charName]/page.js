import { connectDB } from "/util/database";

export default async function Info({ params }) {
    const charName = decodeURI(params.charName);
    const db = (await connectDB).db("maple");
    let result = await db.collection("char").findOne({ name: charName });
    return (
        <div>
            {result.equip.map((v, i) => {
                return (
                    <div>
                        <span>{v.title}</span>
                        <span>{v.starForce}</span>
                    </div>
                );
            })}
        </div>
    );
}
