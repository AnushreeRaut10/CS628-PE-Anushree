import React from "react";
import "./Resume.css";

const Resume = () => {
    return (
        <div className="resume">
            <header className="header">
                <h1>AnushreeRaut</h1>
                <p>Mill Creek, WA-98012, USA | (480) 289-8225 | rautanushree10@gmail.com</p>
            </header>

            <section className="section">
                <h2>Education</h2>
                <div className="education">
                    <h3>Master of Science in Computer Science</h3>
                    <p>City University of Seattle, WA, USA | Current</p>
                    <h3>Bachelor of Engineering in Electronics Engineering</h3>
                    <p>Nagpur University, India | June 2015</p>
                </div>
            </section>
            <section className="section">
                <h2>Projects</h2>
                <div className="projects">
                    <h3>Personal Website</h3>
                    <p>
                        Built a personal website using React and deployed it on Github Pages
                    </p>
                    <p>
                        Source code:{" "}
                        <a
                        href="https://github.com/AnushreeRaut10/CS628-PE-ANUSHREE"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                            https://github.com/AnushreeRaut10/CS628-PE-ANUSHREE
                        </a>
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Resume;

