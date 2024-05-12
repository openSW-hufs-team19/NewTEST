import React, { useEffect } from "react";

const Timer = () => {
    useEffect(() => {
        const timer =setInterval(() => {
            console.log('타이머 돌아가요');
        }, 1000);

        return() => {
            clearInterval(timer);
            console.log('종료')
        }
    }, []);
    return(
    <div>타이머 시작 - 콘솔 출력</div>
    )
}

export default Timer;
