import Title from "antd/es/skeleton/Title";
import React from "react";
import {Button} from "antd";

const QuizFinish = ({correctAnswers}) => {
    return (
        <div className="text-black">
            <Title style={{textAlign: 'center'}}> Quiz завершен</Title>
            <div className="d-flex justify-content-center">
                <h1>Вы закончили Quiz с результатом:{correctAnswers}</h1>
            </div>
        </div>
    )
}
export default QuizFinish