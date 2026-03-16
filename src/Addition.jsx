import React, { useRef, useState } from 'react'

function Addition() {

    const num1ref = useRef();
    const num2ref = useRef();
    const [result, setResult] = useState(null);
    const resultRef = useRef();
    const addLogic = (e) => {
        console.log("Addition Logics Successfull...");
        e.preventDefault();

        let num1 = num1ref.current.value;
        let num2 = num2ref.current.value;

        let n1 = parseInt(num1);
        let n2 = parseInt(num2);

        const sum = n1 + n2;

        resultRef.current.value = sum;
        setResult(sum);

        // rest fields
        num1ref.current.value = "";
        num2ref.current.value = "";
    }

    return (
        <>
            <form onSubmit={addLogic} style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                width: "350px",
                margin: "20px auto",
                padding: "20px",
                background: "linear-gradient(135deg, #56ab2f, #a8e063)",
                borderRadius: "10px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.1)"
            }}>
                <input type="number" ref={num1ref} placeholder='Enter First Number' /> <br />
                <input type="number" ref={num2ref} placeholder='Enter Second Number' /> <br />
                <button type="submit" >
                    Add
                </button> <br /> <br />
                <input type="number" ref={resultRef} />
            </form>
            {
                (result !== null) &&
                <p>
                    <strong>Result: {result}</strong>
                </p>

            }
        </>
    )
}

export default Addition;