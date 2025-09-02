import React from "react";
import { useNavigate } from "react-router-dom";
import "flag-icons/css/flag-icons.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Style/Wordpage.css";

function WordpageHeader() {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/Mainpage");
    }

    return (
        <div className="header">
            <div className="englishflag"><span className="fi fi-gb" style={{ fontSize: "2em" }}></span>
            </div>
            <i onClick={handleClick} className="bi bi-x-lg"></i>

        </div>
    )
}




export default WordpageHeader;