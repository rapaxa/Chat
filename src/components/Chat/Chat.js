import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {
    collection,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    onSnapshot,
} from 'firebase/firestore';
import {db} from '../../firebase/firebase';

const Chat = () => {
    const userName = useSelector((state) => state.auth.name);
    const isLogin = useSelector((state) => state.auth.isLogin);
    const [users, setUsers] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const contentRef = useRef();

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const sendMessage = async () => {
        try {
            await addDoc(collection(db, 'messages'), {
                name: userName,
                message: inputValue,
                timestamp: serverTimestamp(),
            });
            setInputValue('');
        } catch (error) {
            console.error('Error adding document:', error);
        }
    };


    useEffect(() => {
        // Добавьте "подписку" на изменения в коллекции Firestore
        const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messagesData = [];
            querySnapshot.forEach((doc) => {
                messagesData.push(doc.data());
            });
            setUsers(messagesData.reverse());
            scrollToBottom();
        });

        return () => {
            // Отмените подписку при размонтировании компонента
            unsubscribe();
        };
    }, []);

    const scrollToBottom = () => {
        if (contentRef.current) {
            contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
    };

    return (
        <div
            style={{
                width: '20%',
                borderRadius: '20px',
                margin: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
            }}
            className="d-flex flex-column align-items-center w-25"

        >
            <h1 style={{textAlign: 'center'}}>Чатик Юзеров</h1>
            <div className="content d-flex flex-column w-100 p-4 h-75 overflow-auto" ref={contentRef}>
                {users.map((message, index) => (
                    <div className="d-flex w-100" key={index}>
                        <span>{message.name}: </span>
                        <p>{message.message}</p>
                    </div>
                ))}
            </div>
            <div className="d-flex p-4 w-100 justify-content-between">
                <input
                    className="w-100"
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button disabled={!isLogin} onClick={sendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
