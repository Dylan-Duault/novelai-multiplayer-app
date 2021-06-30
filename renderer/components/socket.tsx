import React from 'react';
import socketIOClient from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { selectUserState } from '../store/User';
import { selectStoryState } from '../store/Story';
import { selectRoomState } from '../store/Room';
const ENDPOINT = 'http://127.0.0.1:3000';
const socket = socketIOClient(ENDPOINT);

const SocketIO = () => {
    const [response, setResponse] = useState('');
    const [userConnected, setUserConnected] = useState(false);
    const [lastText, setLastText] = useState('false');
    const [user, setUser] = useRecoilState(selectUserState);
    const [story, setStory] = useRecoilState(selectStoryState);
    const [room, setRoom] = useRecoilState(selectRoomState);

    useEffect(() => {
        if (user.loginData?.accessKey && !userConnected) {
            socket.emit('login', {
                accessKey: user.loginData.accessKey,
            });
            setUserConnected(true);
            setRoom({ ...room, identifier: user.loginData.accessKey });
        }
    }, [user.loginData?.accessKey]);

    useEffect(() => {
        if (lastText !== story.text) {
            socket.emit('editing', {
                room: room.identifier,
                text: story.text,
            });
            setUserConnected(true);
        }
    }, [story.text]);

    useEffect(() => {
        console.log('change room');
        socket.emit('room', room.identifier);
        setUserConnected(true);
    }, [room.identifier]);

    useEffect(() => {
        socket.on('editing', text => {
            setLastText(text);
            setStory({ ...story, text });
        });

        socket.on('room-text', text => {
            setLastText(text);
            setStory({ ...story, text });
        });
    }, []);

    return <></>;
};

export default SocketIO;
