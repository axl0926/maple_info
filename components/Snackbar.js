"use client";
import { useState, useEffect } from "react";
import "@/public/fontello/css/fontello.css";

export default function Snackbar({ message, setSnackBar, timeout = 5000 }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            setSnackBar(false);
        }, timeout);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className="flex items-center p-2 fixed bg-white text-black rounded-md bottom-4 h-12 w-96 justify-between text-base ">
            <div className="flex items-center border-l-4 border-solid border-red-600 pl-2">{message}</div>
            <button onClick={() => setSnackBar(false)} className="flex items-center justify-center hover:bg-opacity-20 hover:bg-black p-1 h-[40px] w-[40px] rounded-full">
                <i className="icon-cancel-1 text-sm"></i>
            </button>
        </div>
    );
}
