import React, {useEffect, useState} from 'react';
import {Button, List, Typography} from 'antd';
import {
    CheckCircleTwoTone, CloseCircleTwoTone, RightCircleTwoTone,
} from '@ant-design/icons';
import QuizFinish from "./QuizFinish";


const {Title, Paragraph} = Typography;

const Quiz = ({data, isLoading, start}) => {

    const [desiredIndex, setDesiredIndex] = useState(0);
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [feedbackVisible, setFeedbackVisible] = useState(false);
    const [questionsAnswered, setQuestionsAnswered] = useState(0);
    const [finish, setFinish] = useState(false)
    useEffect(() => {
        if (isLoading) {
            shuffleAndSetAnswers(data[desiredIndex]);
        }
    }, [data, desiredIndex, isLoading]);
    const handleAnswerClick = (answer) => {
        if (selectedAnswer !== null) {
            return;
        }
        setSelectedAnswer(answer);

        console.log(desiredIndex)
        if (desiredIndex === data.length - 1) {
            setFinish(true);
        } else {
            if (answer === data[desiredIndex].correct_answer) {
                setCorrectAnswers(correctAnswers + 1);
            } else {
                setTimeout(() => {
                    setDesiredIndex(desiredIndex + 1);
                    setTimeout(() => {
                        shuffleAndSetAnswers(data[desiredIndex + 1]);
                    }, 150);
                    setSelectedAnswer(null);
                    setFeedbackVisible(false);
                }, 150);
            }
            setFeedbackVisible(true);
        }
    };



    const handleNextQuestion = () => {
        setQuestionsAnswered(questionsAnswered + 1);
        if (desiredIndex < data.length - 1) {
            setDesiredIndex(desiredIndex + 1);
            setTimeout(() => {
                shuffleAndSetAnswers(data[desiredIndex + 1]);
            }, 0);
            setSelectedAnswer(null);
            setFeedbackVisible(false);
        }

    };

    const shuffleAndSetAnswers = (question) => {
        const answers = [question.correct_answer, ...question.incorrect_answers];
        for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
        }
        setShuffledAnswers(answers);
    };
    const handleFinishQuiz = async () => {
        setFinish(true)
        start = false
    }


    return (
        !isLoading ?
            <><span>...Loading</span></> :
            <>
                {finish ? (<QuizFinish correctAnswers={correctAnswers}/>) : (<>

                        <Title level={2}>{data[desiredIndex].question}</Title>
                        <List
                            size="large"
                            bordered
                            dataSource={shuffledAnswers}
                            renderItem={(answer, i) => (<List.Item
                                onClick={() => handleAnswerClick(answer)}
                                className={`${selectedAnswer === answer ? 'selected-answer' : ''} ${feedbackVisible ? 'feedback-visible' : ''}`}
                            >
                                {answer}
                                {feedbackVisible && selectedAnswer === answer && (selectedAnswer === data[desiredIndex].correct_answer ? (
                                    <CheckCircleTwoTone className="feedback-icon correct"/>) : (
                                    <CloseCircleTwoTone className="feedback-icon incorrect"/>))}
                            </List.Item>)}
                        />

                        {feedbackVisible && (<div>
                            {selectedAnswer === data[desiredIndex].correct_answer ? (

                                <Title level={4} style={{color: '#52c41a'}}>
                                    Правильный ответ! <CheckCircleTwoTone/>
                                </Title>) : (<Title level={4} style={{color: '#eb2f96'}}>
                                Неправильный ответ! <CloseCircleTwoTone/>
                            </Title>)}
                        </div>)}
                        <Paragraph>Количество правильных ответов: {correctAnswers}</Paragraph>
                        <Button
                            onClick={handleNextQuestion}
                            type="primary"
                            icon={<RightCircleTwoTone/>}
                        >
                            Следующий вопрос
                        </Button>
                        <Button
                            onClick={handleFinishQuiz}
                            type="primary"
                        >
                            Завершить
                        </Button>
                    </>
                )}

            </>)
}
export default Quiz;
