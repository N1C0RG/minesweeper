import React, { createContext, useContext, useEffect } from 'react';
import io from 'socket.io-client';
import { AppContext } from "./appContext";

const URL = process.env.REACT_APP__BACKEND_URL; // URL del backend
const SocketContext = createContext();
const socket = io.connect(URL);


export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {

    const { setLeaderboardUsers } = useContext(AppContext);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Conectado al servidor Socket.IO');

            socket.on("receive_leaderBoard", (data) => 
            {
                console.log('se reciven los datos');
                setLeaderboardUsers(data);
            })
        });

        socket.on('disconnect', () => {
            console.log('Desconectado del servidor Socket.IO');
        });
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
