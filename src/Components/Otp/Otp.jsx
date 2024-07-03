import './Otp.css';
import { useEffect, useRef, useState } from "react";

export default function Otp({ inputFields = 6 }) {
    const [otpFields, setOtpFields] = useState(new Array(inputFields).fill(""));
    const inputRefs = useRef([]);

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            if(index>0)
                inputRefs.current[index - 1].focus();
            setOtpFields(otpFields.map((value, i) => (i === index ? "" : value)));
            return;
        }

        if(e.key === 'ArrowLeft' && index>0){
            inputRefs.current[index - 1].focus();
            return;
        }
        if(e.key === 'ArrowRight' && index+1<otpFields.length){
            inputRefs.current[index + 1].focus();
            return;
        }

        if(isNaN(e.key)){
            return;
        }
        const otpFieldsCopy = [...otpFields];
        otpFieldsCopy[index] = e.key

        if (index + 1 < otpFieldsCopy.length) {
            inputRefs.current[index + 1].focus();
        }

        setOtpFields(otpFieldsCopy);
    };

    useEffect(() => {
        inputRefs.current[0].focus();
    }, []);

    return (
        <>
            {otpFields.map((otpField, index) => (
                <input
                    ref={(currentInput) => (inputRefs.current[index] = currentInput)}
                    value={otpField}
                    type="text"
                    key={index}
                    maxLength={1}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                />
            ))}
        </>
    );
}