import React, { use } from "react";
import wordsData from "../Data/wordsData.json"
import { useState } from "react";
import "./Style/Wordpage.css";
import { useNavigate } from "react-router-dom";
import "flag-icons/css/flag-icons.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import NewWordHeader from "./NewWordHeader";



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
    // const handleClick = () => {
    //     navigate("/Mainpage");
    // }

    return (
        <div className="container">

            <NewWordHeader />
            <section>
                <div> <h3>The words you should learn today.</h3></div>

                <div className="card">
                    <div className="card-word">
                        <h2 >
                            {word.id}. {word.word}
                        </h2>
                        <h3> <i>{word.phonetic}</i> | {word.type} </h3>
                        <i className="bi bi-volume-up-fill"></i>
                        <p>{word.meaning}</p>
                        <i className="bi bi-trash3"></i>
                    </div>

                </div>
                <div className="translation-card">
                    <strong>{word.translation}</strong>
                </div>
                <div className="buttons">
                    {index > 0 && (
                        <button className="btn" onClick={prevWord}> Previous word</button>
                    )}
                    {index < wordsData.length - 1 ? (
                        <button className="btn" onClick={nextWord}> Next word</button>
                    ) : (<button className="btn" onClick={() => navigate("/ready")}> Continue</button>)
                    }
                </div>
            </section>
        </div>
    );
}



export default Wordpage;