import React from 'react';
import "../assets/css/offcanvas.css";

function Offcanvas(props) {
    function closeOffcanvas(){
        let canvasContainer  = document.getElementById("offcanvasContainer");

        canvasContainer.classList.remove("displayed");
        document.body.classList.remove("noscroll");
    }

    return (
        <div className="offcanvas-container" id="offcanvasContainer">
            <div className="offcanvas">
                <button type="button" className="close-btn" onClick={closeOffcanvas} />
                <div className={"offcanvas-content " + props.content}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

function openOffcanvas(){
    let canvasContainer  = document.getElementById("offcanvasContainer");

    canvasContainer.classList.add("displayed");
    document.body.classList.add("noscroll");
}

export default Offcanvas;
export {openOffcanvas};