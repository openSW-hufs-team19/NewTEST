import React, {useState, useEffect} from "react";

function Effect() {

    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log("당신은 총 ${count}번 클릭했습니다.");
    });

    return (
        <div>
            <p>총 {count}번 클릭했습니다.</p>
            <button onClick={() => setCount(count + 1)}>
                클릭
            </button>
        </div>
    );

}

export default Effect;