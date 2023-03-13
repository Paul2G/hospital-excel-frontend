import React from "react";

import "../assets/css/footer.css";

function Footer() {
    return (
        <footer className="footbar">
            <div className="foot-container">
                <section>
                    <h3>Hospital Excel - Pacientes</h3>
                    <p className="block-content">
                        Proyecto lanzado y desplegado como prueba prueba técnica para
                        desarrollador web jr.
                    </p>
                </section>
                <section>
                    <h3>Realizado por</h3>
                    <ul className="block-content">
                        <li>
                            <i class="bi bi-person-fill"></i>
                            Paul García Galeana
                        </li>
                        <li>
                        <i class="bi bi-envelope-fill"></i>
                            <a href="mailto:paulgaleana87@gmail.com"  target="_blank" rel="noreferrer" >
                                paulgaleana87@gmail.com
                            </a>
                        </li>
                        <li>
                            <i class="bi bi-linkedin"></i>
                            <a href="https://www.linkedin.com/in/paul2g/"  target="_blank" rel="noreferrer" >
                                LinkedIn/paul2g
                            </a>
                        </li>
                        <li>
                            <i class="bi bi-github"></i>
                            <a href="https://github.com/Paul2G" target="_blank" rel="noreferrer" >
                                Github/Paul2G
                            </a>
                        </li>
                    </ul>
                </section>
            </div>
        </footer>
    );
}

export default Footer;
