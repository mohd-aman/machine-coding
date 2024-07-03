import { useEffect, useRef, useState } from "react"
import "./MakeMyTrip.css"

export default function MakeMyTrip(){
    const [grid,setGrid] = useState(Array.from({length:3},()=>{return new Array(3).fill(false)}));
    const queue = useRef([]);
    const timerId = useRef([]);

    const handleClick = (rowNo,colNo,flag)=>{
        setGrid((prevGrid)=>{
            const copyGrid = prevGrid.map((row)=>{return row.map((cell)=>cell)})
        copyGrid[rowNo][colNo] = flag;
        if(flag)
            queue.current.push([rowNo,colNo]);
        return copyGrid;
        })
        
    }

    useEffect(()=>{
        console.log("useEffect")
        if(queue.current.length === 7){
            console.log(queue.current);
            queue.current.forEach(([rowNo,colNo],idx)=>{
                console.log([rowNo,colNo])
                timerId.current[idx] = setTimeout(()=>handleClick(rowNo,colNo,false),1000*(idx+1));
            })
            queue.current = [];
        }
    },[grid])

    useEffect(()=>{
        return ()=>{
            timerId.current.forEach((timer)=>clearTimeout(timer));
            timerId.current = [];  // Clearing timerId array to prevent memory leak.
        }
    },[]);

    return(
        <div className="container">
            {grid.map((row,rowNo)=>{
                return row.map((cell,colNo)=>{
                    if(rowNo === 1 && rowNo<=colNo){
                        return <div key={`${rowNo}-${colNo}`}></div>
                    }
                    return <div key={`${rowNo}-${colNo}`} onClick={()=>handleClick(rowNo,colNo,true)} className={`cell ${cell?"blue":""}`}></div>
                })
            })}
        </div>
        )
}