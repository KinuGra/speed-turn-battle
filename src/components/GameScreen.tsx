"use client"
import { useEffect, useState } from "react";

const question = [
    {
        question:"首都を10個答えてください",
        answer:["東京", "ソウル", "北京", "ワシントンD.C.", "ロンドン", "パリ", "バンコク", "カイロ", "ニューデリー", "モスクワ"],
    }
]



const GameScreen = () => {

    const [time,setTime] = useState(0);
    const [answer,setAnswer] = useState("");
    const handleClick = () => {
        window.alert("回答を送信しました。");
        setAnswer("");
    }

    useEffect(() => {
        // ストップウォッチを開始する処理0秒~
       const intervalId = setInterval(() => {
            setTime((pre) => pre+1);
       },1000);

       return () => {
            clearInterval(intervalId);
       }
    },[]);
    return (
        <div className="h-screen flex flex-col justify-between">
        <div className=" border-2 border-gray-300 rounded p-4 bg-cyan-50 shadow-md w-1/2 mx-auto mt-5">
            <div className="flex flex-col justify-center items-center ">
                <h1 className=" text-center font-bold text-2xl">問題</h1>
            </div>  
            <div>
                {question.map((item,idx) => (
                    <div key={idx} className="flex flex-col justify-center items-center mt-5">
                        <h2 className="text-center font-bold text-2xl">{item.question}</h2>
                    </div>
                ))}
            </div>
            <div>
                <p className=" text-center font-bold mt-3">経過時間：{time}秒</p>
            </div>
        </div>

        {/* 回答フォームを画面の下に表示したい */}
        <div className="border-2 border-gray-300 rounded p-4 bg-white shadow-md w-3/4 max-w-130 mx-auto mb-5">
            <div className="flex flex-col gap-4">
            <label htmlFor="answer" className="text-sm font-medium text-gray-700">回答</label>
            <div className="flex gap-2 items-center max-w-md w-full">
                <input
                id="answer"
                type="text"
                autoComplete="off"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="ここに入力"
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                />
                <button
                onClick={handleClick}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition whitespace-nowrap"
                >
                回答
                </button>
            </div>
            </div>
        </div>
        </div>
    )
}

export default GameScreen;