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
    phonetic?: string;
    example?: string;
}
let words: Word[] = [{
    id: 1,
    word: "house",
    meaning: "a building for human habitation",
    type: "noun",
    translation: "hus",
    boxnumber: 1,
    nextreview: "2023-10-01",
    phonetic: "/haʊs/",
    example: "This is my house."

}, {
    id: 2,
    word: "car",
    type: "noun",
    meaning: "a road vehicle with an engine",
    translation: "bil",
    nextreview: "2023-10-01",
    boxnumber: 1,
    phonetic: "/kɑr/",
    example: "I drive a car to work."

},

{
    id: 3,
    word: "tree",
    type: "noun",
    meaning: "a tall plant with leaves and branches",
    translation: "träd",
    nextreview: "2023-10-01",
    boxnumber: 1,
    phonetic: "/triː/",
    example: "The tree is very tall."
},
{
    id: 4,
    word: "make",
    type: "verb",
    meaning: "to create or form something",
    translation: "göra",
    nextreview: "2025-10-01",
    boxnumber: 1,
    phonetic: "/meɪk/",
    example: "I will make a cake."
}
]
// helper for date
function addDays(date: Date, days: number): string {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString().split('T')[0]; // returnerar i formatet YYYY-MM-DD
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
    words = words.map(w => w.id === wordId
        ? { ...w, boxnumber: 1, nextreview: addDays(new Date(), 1) }
        : w
    );
}
const PROGRESS_TIME = 8;

const Testpage: React.FC = () => {
    const [index, setIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [mode, setMode] = useState<"review" | "details">("review");

    const word = words[index];

    useEffect(() => {
        if (mode !== "review") return;
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
    }, [index, mode]);

    const goToNextWord = () => {
        if (index < words.length - 1) {
            setIndex(i => i + 1);
            setMode("review");
        } else {
            alert("✅ Done! No more words.");
        }
    };

    const handleICanClick = () => {
        handleICan(word.id);
        goToNextWord();
    };

    const handleICannotClick = () => {
        handleICannot(word.id);
        setMode("details");
    };

    if (mode === "details") {
        return (
            <div className="details-container">
                <h3>The words you should learn</h3>
                <div className="details-card">
                    <h2>{word.word}</h2>
                    <p><i>{word.phonetic}</i> | {word.type}</p>
                    <p>{word.meaning}</p>
                    <p><b>Example:</b> {word.example}</p>
                </div>

                <div className="translation-card">
                    <h3>{word.translation}</h3>
                </div>

                <button className="btn back" onClick={goToNextWord}>
                    Back
                </button>
            </div>
        )
    }

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
            </div>

            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>

            <div className="answer-buttons">
                <button className="btn success" onClick={handleICanClick}>I can</button>
                <button className="btn danger" onClick={handleICannotClick}>I cannot</button>
            </div>
        </div>



    );
}

export default Testpage;
