import React from "react";
import "./Style/Wordpage.css";
import NewWordHeader from "./NewWordHeader";
import { useNavigate } from "react-router-dom";

const ReadyPage: React.FC = () => {
    const navigate = useNavigate();
    return (

        <div className="ready-page" >
            <NewWordHeader />
            <h2 >Are you ready for today’s Test!</h2>
            <button className="btn" onClick={() => navigate("/testpage")} >
                Let’s go
            </button>

        </div>
    );
};

export default ReadyPage;
