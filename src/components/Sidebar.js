"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sidebar() {
    const router = useRouter();
    const [currentPath, setCurrentPath] = useState('');

    useEffect(() => {
        setCurrentPath(window.location.pathname);
    }, []);

    const handleClick = (path) => {
        router.push(path);
    }

    return (
        <div className="sidebar">
            <div
                className={`icon-container ${currentPath === '/modern' ? 'active' : ''}`}
                onClick={() => handleClick('/modern')}
            >
                <img
                    src="/images/folder/modern%20fu.PNG"
                    alt="Folder Icon"
                    className="icon"
                />
                {currentPath === '/modern' && <div className="red-dot"></div>}
            </div>
            <div
                className={`icon-container ${currentPath === '/another' ? 'active' : ''}`}
                onClick={() => handleClick('/another')}
            >
                <img
                    src="/images/folder/modern%20fu.PNG"
                    alt="Folder Icon"
                    className="icon"
                />
                {currentPath === '/another' && <div className="red-dot"></div>}
            </div>
        </div>
    );
}