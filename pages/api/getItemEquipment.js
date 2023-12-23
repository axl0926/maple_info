import getDate from "@/lib/getDate";
import { connectDB } from "@/lib/database.js";
import fetchData from "@/lib/fetchData";

const date = getDate();
const equipUrl = `${process.env.API_URL}/maplestory/v1/character/item-equipment`;
const androidUrl = `${process.env.API_URL}/maplestory/v1/character/android-equipment`;
const basicInfoUrl = `${process.env.API_URL}/maplestory/v1/character/basic`;

export default async function handler(req, res) {
    try {
        const ocid = req.query.ocid;

        const collection = (await connectDB).db("maplestory").collection("character");
        const existingItem = await collection.findOne({ ocid: ocid });

        const basicInfo = await getBasicInfo(ocid, date);
        const equip = await getEquip(ocid, date);
        const android = await getAndroid(ocid, date);

        equip.item_equipment.push({ item_equipment_slot: "안드로이드", item_icon: android.android_icon, item_namd: android.android_name, ...android });
        equip.ocid = ocid;

        const response = { ...equip, ...basicInfo };
        if (!existingItem) {
            let dbResult = await collection.insertOne(response);
            if (dbResult.insertedId) {
                console.log("Insert successful");
            } else {
                console.log("Insert failed");
            }
            res.status(200).json({ result: dbResult.insertedId });
        } else {
            res.status(200).json({ result: "Item already exists" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: " /getItemEquipment 오류 " });
    }
}

const getEquip = (ocid, date) => fetchData(equipUrl, ocid, date);
const getAndroid = (ocid, date) => fetchData(androidUrl, ocid, date);
const getBasicInfo = (ocid, date) => fetchData(basicInfoUrl, ocid, date);
