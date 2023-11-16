import {Button} from "antd";
import React, { useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Title from "antd/es/skeleton/Title";

import Quiz from "./Quiz";
import {fetchQuizData} from "../../redux/actions";
import {selectQuizData} from "../../redux/selectors";


const QuizStart = () => {
    const [start, setStart] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const dataS = useSelector(selectQuizData);
    const [data, setData] = useState('')

    const handleStart = async () => {
        setStart(!start)
        dispatch(fetchQuizData());
        setData(dataS);

        setIsLoading(true)

    };


return (
    <div style={{borderRadius: '20px', margin: '10px', opacity: '75%',}}
         className="d-flex text-white justify-content-center align-items-center flex-column w-75 bg-white">
        <div className="d-flex flex-column justify-content-center w-75 h-100 ">
            {start ? (
                    <>
                        <Title style={{textAlign: 'center'}}>Начинаем Quiz</Title>
                        <div className="d-flex justify-content-center">
                            <Button
                                type="primary"
                                onClick={handleStart}
                                className="btn-success"
                            >
                                Начать
                            </Button>
                        </div>
                    </>
                ) :
                <Quiz data={data} isLoading = {isLoading} start={start}/>
            }
        </div>
    </div>
)
}
export default QuizStart