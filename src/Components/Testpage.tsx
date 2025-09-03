import React, { useEffect, useState } from "react";
import "./Style/Testpage.css";


interface Word {
    id: number;
    word: string;
    meaning: string;
    type: string;
    translation: string;
    boxnumber: number;
    nextreview: string;
}
let words: Word[] = [{
    id: 1,
    word: "house",
    meaning: "a building for human habitation",
    type: "noun",
    translation: "hus",
    boxnumber: 1,
    nextreview: "2023-10-01"

}, {
    id: 2,
    word: "car",
    type: "noun",
    meaning: "a road vehicle with an engine",
    translation: "bil",
    nextreview: "2023-10-01",
    boxnumber: 1

},
{
    id: 3,
    word: "tree",
    type: "noun",
    meaning: "a tall plant with leaves and branches",
    translation: "träd",
    nextreview: "2023-10-01",
    boxnumber: 1

}]

function addDays(date: Date, days: number): string {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString().split("T")[0]; // yyyy-mm-dd
}

function handleICan(wordId: number) {
    words = words.map(w => {
        if (w.id === wordId) {
            return {
                ...w,
                boxnumber: w.boxnumber + 1,        // flytta till nästa box
                nextreview: addDays(new Date(), 3) // exempel: om 3 dagar
            };
        }
        return w;
    });
}

function handleICannot(wordId: number) {
    words = words.map(w => {
        if (w.id === wordId) {
            return {
                ...w,
                boxnumber: 1,                      // tillbaka till första boxen
                nextreview: addDays(new Date(), 1) // imorgon
            };
        }
        return w;
    });
}
const PROGRESS_TIME = 10;

const Testpage: React.FC = () => {
    const [index, setIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [flipped, setFlipped] = useState(false);

    const word = words[index];

    useEffect(() => {
        setProgress(0);
        setFlipped(false);
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setFlipped(true);
                    return 100;
                }
                return prev + 100 / PROGRESS_TIME;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [index]);
    const handleICanClick = () => {
        handleICan(word.id);
        setIndex((i) => Math.min(i + 1, words.length - 1));
    };

    const handleICannotClick = () => {
        handleICannot(word.id);
        setIndex((i) => Math.min(i + 1, words.length - 1));
    };


    return (
        <div className="testpage-container">
            <div className="header-testpage">
                <div className="englishflag"><span className="fi fi-gb" style={{ fontSize: "2em" }}></span>
                </div>
                <div className="stopbtn">
                    <div><h3>stop</h3></div>
                    <div> <i className="bi bi-stop-circle"></i></div>
                </div>
            </div>
            <div className="test-container">
                <h3>Review word</h3>
                <p>{index + 1} / {words.length}</p>

                <div className={`word-card ${flipped ? "flipped" : ""}`}>
                    <div className="word-card-inner">
                        {/* Front */}
                        <div className="word-card-front">
                            <h2>{word.word}</h2>
                        </div>

                        {/* Back */}
                        <div className="word-card-back">
                            <div>
                                <h2>{word.translation}</h2>
                                <p>{word.meaning}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>

                <div className="answer-buttons">
                    <button className="btn success" onClick={handleICanClick}>I can</button>
                    <button className="btn danger" onClick={handleICannotClick}>I cannot</button>
                </div>
            </div>


        </div>
    );
}

export default Testpage;
