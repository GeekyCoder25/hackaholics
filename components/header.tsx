'use client';

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import showClicked from "./show-clicked";

const Header: React.FC = () => {
    const router = useRouter();
    const backBt = useRef<null | HTMLButtonElement>(null);

    const back = () => {
        if (backBt.current) showClicked(backBt.current);
        setTimeout(() => router.back(), 250);
    };

    return (
        <header className="fixed top-0 left-0 flex items-center justify-start gap-4 w-full px-2 pt-3 pb-2 border-b-2 border-b-gray-100 z-10">
            <button ref={backBt} onClick={back}>
                <FontAwesomeIcon icon={faArrowLeft} className="bg-green-500 p-2 text-white w-[1rem] h-[1rem] rounded-md" />
            </button>
        </header>
    )
}


export default Header;