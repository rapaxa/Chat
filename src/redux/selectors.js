// selectors.js
export const selectQuizData = (state) => state.quiz.data;
export const selectDesiredIndex = (state) => state.quiz.desiredIndex;
export const selectShuffledAnswers = (state) => state.quiz.shuffledAnswers;
export const selectSelectedAnswer = (state) => state.quiz.selectedAnswer;
export const selectCorrectAnswers = (state) => state.quiz.correctAnswers;
export const selectFeedbackVisible = (state) => state.quiz.feedbackVisible;
export const selectIsLogin = (state) => state.quiz.isLogin;
