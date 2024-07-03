import data from './data.json'
import './Accordion.css'
import { useState } from 'react';

export default function Accordion(){
    const [toggleAnsArray,setToggleAnsArray] = useState(new Array(data.faqs.length).fill(false));
    const toggle = (index)=>{
        const updatedArray = [...toggleAnsArray];
        updatedArray[index] =!updatedArray[index];
        setToggleAnsArray(updatedArray);
    }

    return(
        <div className='container'>
        <h1>FAQ's</h1>
            {data.faqs.map((obj,index)=>{
                return <div className='faq-container'>
                    <h3>{obj.question} <span onClick={()=>toggle(index)}>{toggleAnsArray[index]?"-":"+"}</span></h3>
                    {toggleAnsArray[index]?<p>{obj.answer}</p>:""}
                </div>
            })}
        </div>
    )
}