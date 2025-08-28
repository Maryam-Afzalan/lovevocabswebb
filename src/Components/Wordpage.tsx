import React, { use } from "react";
import wordsData from "../Data/wordsData.json"
import { useState } from "react";
import "./Style/Wordpage.css";
import { useNavigate } from "react-router-dom";

interface Word {
    id: number;
    word: string;
    phonetic: string;
    type: string;
    meaning: string;
    translation: string;
}

const Wordpage: React.FC = () => {
    const [index, setIndex] = useState(0);
    const word: Word = wordsData[index];

    const nextWord = () => {
        if (index < wordsData.length - 1) {
            setIndex(index + 1);
        }
    }

    const prevWord = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };


    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/Mainpage");
    }

    return (
        <div className="container">
            <div className="header">
                <div className="flag">flag</div>
                <button onClick={handleClick}>
                    Back</button>
            </div>
            <div> <h3>The words you should learn today</h3></div>
            <div className="card">
                <h2 className="word">
                    {word.id}. {word.word}
                </h2>
                <p> <i>{word.phonetic}</i> | {word.type} </p>
                <p>{word.meaning}</p>
            </div>
            <div className="translation-card">
                <strong>{word.translation}</strong>
            </div>
            <div className="buttons">

                {index < wordsData.length - 1 && (
                    <button className="btn" onClick={nextWord}> Next word</button>
                )}
                {index > 0 && (
                    <button className="btn" onClick={prevWord}> Previous word</button>
                )}

            </div>

        </div>
    );
}



export default Wordpage;