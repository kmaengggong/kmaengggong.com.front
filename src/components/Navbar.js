"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
    const [currentTime, setCurrentTime] = useState('');

    const formatDate = (date) => {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${month}월 ${day}일 ${hours} : ${minutes}`;
    }

    useEffect(() => {
        const udpateTime = () => {
            setCurrentTime(formatDate(new Date()));
        };

        udpateTime();

        const intervalId = setInterval(udpateTime, 10000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <header className="header">
            <p>{currentTime}</p>
        </header>
    );
}