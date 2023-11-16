import {fetchDataSuccess, fetchDataFailure} from './slice/quizSlice'; // Импортируйте ваши действия

export const fetchQuizData = () => {
    return async (dispatch) => {
        try {
            const response = await fetch(
                'https://opentdb.com/api.php?amount=100&category=11&difficulty=easy'
            );

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            dispatch(fetchDataSuccess(data.results));
        } catch (error) {
            dispatch(fetchDataFailure(error.message));
        }
    };
};