import React, { use } from "react";
import "./Style/Mainepage.css";
import "./Style/Photos/logo.png"; // Adjust the path as necessary
import { useNavigate } from "react-router-dom";


function Mainpage() {

    type BoxProps = {
        number: number;
        color: string;
    }
    const Box: React.FC<BoxProps> = ({ number, color }) => {
        return (
            <div className={`box-container ${color}`}>
                <div className="circle">
                    <span className="circle-text">Box<br />{number}</span>
                </div>
            </div>
        );
    };

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/Wordpage");
    }
    const handleClickBox = () => {
        navigate("/Testpage");
    }

    return (
        <div className="mainpage">
            <div className="mainPagesHeader">

                <div className="logo">
                    <img src={require("./Style/Photos/logo.png")} />
                </div>
                <div className="new-words ">
                    <button onClick={handleClick} className="new-words-button">
                        Today new words

                    </button>
                </div>
                <div >
                    <button className="review-words" onClick={handleClickBox}>Review words</button>
                </div>
            </div>

            <h1>My Leitner Boxes</h1>

            <div className="app">
                <main className="content">
                    <Box number={1} color="red" />
                    <Box number={2} color="orange" />
                    <Box number={3} color="yellow" />
                    <Box number={4} color="green" />
                    <Box number={5} color="blue" />
                    <Box number={6} color="purple" />
                </main>
            </div>
        </div>
    )
}


export default Mainpage;