import React from "react";
import "./Style/Wordpage.css";
import NewWordHeader from "./NewWordHeader";

const ReadyPage: React.FC = () => {
    return (


        <div className="ready-page" >
            <NewWordHeader />
            <h2 >Are you ready for today’s Test!</h2>
            <button style={{ background: "orange", padding: "10px 20px", border: "none", borderRadius: "5px", marginTop: "20px" }}>
                Let’s go
            </button>

        </div>
    );
};

export default ReadyPage;
