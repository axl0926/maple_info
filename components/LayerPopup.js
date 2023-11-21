import { useState, useEffect, useRef } from "react";

export default function LayerPopup({ itemInfo, onClose }) {
    const [isOpen, setIsOpen] = useState(true);
    const ref = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                onClose();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return isOpen ? (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50" >
            <div ref={ref} className="bg-white p-4 rounded-md w-[50vh] h-[50vh]">
                <div className="  flex w-full h-[10%]">
                    <div>
                        <img src={itemInfo.imageUrl} alt="" />
                    </div>
                    <div className="pl-2">{itemInfo.title}</div>
                </div>
                <div className="flex flex-col w-full">
                    {Object.entries(itemInfo.stat).map(([key, value]) => (
                        <div key={key}>
                            {key}: {value}
                        </div>
                    ))}
                </div>
                {itemInfo.potential.tier && (
                    <div className="flex flex-col w-full">
                        <div>{itemInfo.potential.tier}</div>
                        <div>
                            {itemInfo.potential.statList.map((v, i) => (
                                <div key={i}>{v}</div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    ) : null;
}
