const localStorageMiddleware = store => next => action => {
    next(action);
    const state = store.getState();
    localStorage.setItem('reduxState', JSON.stringify(state));
};

export default localStorageMiddleware;