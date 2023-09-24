"use client";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
    const [charName, setCharName] = useState("");

    return (
        <div>
            <h4 className="text-3xl font-bold underline">캐릭터 명 검색</h4>
            <form action="/api/search" method="POST">
                <input name="name" type="text" placeholder="name" className="text-black" />
                <button type="submit">검색</button>
            </form>

            <input type="text" value={charName} onChange={(e) => setCharName(e.target.value)} />
            <Link href={`/info/${charName}`}>검색</Link>
        </div>
    );
}
