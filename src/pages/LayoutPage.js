import React from 'react';

import Chat from "../components/Chat/Chat";
import QuizStart from "../components/Quiz/QuizStart";

const LayoutPage = () => {

    return (
        <main className="w-100">
            <section className="w-100 ">
                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                        width: "100%",
                        height: "100vh",
                        background: `url("/pexels-antoni-shkraba-4348401.jpg") no-repeat center center`,
                        backgroundSize: "cover",
                    }}
                >
                    <div className="app w-100 h-75 d-flex justify-content-between">
                        <Chat/>
                        <QuizStart/>
                    </div>
                </div>

            </section>

        </main>
    );
};

export default LayoutPage;
