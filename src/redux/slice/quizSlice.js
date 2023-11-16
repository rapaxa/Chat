// slice.js
import {createSlice} from '@reduxjs/toolkit';

const quizSlice = createSlice({
    name: 'quiz',
    initialState: {
        data: [],
        desiredIndex: 0,
        shuffledAnswers: [],
        selectedAnswer: null,
        correctAnswers: 0,
        feedbackVisible: false,
    },
    reducers: {
        fetchDataSuccess: (state, action) => {
            state.data = action.payload;
        },
        fetchDataFailure: (state, action) => {
            // Обработка ошибки
        },
        startQuiz: (state) => {
            state.desiredIndex = 0;
            // Остальные действия по началу викторины
        },
        answerQuestion: (state, action) => {
            // Обработка выбора ответа
        },
        nextQuestion: (state) => {
            // Переход к следующему вопросу
        },
    },
});

export const {fetchDataSuccess, fetchDataFailure, startQuiz, answerQuestion, nextQuestion} = quizSlice.actions;
export default quizSlice.reducer;
