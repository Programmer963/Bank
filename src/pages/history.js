import { useState, useEffect } from 'react';
import React from 'react';

const History = () => {
    const [transferHistory, setTransferHistory] = useState([]);

    useEffect(() => {
        const savedTransferHistory = JSON.parse(localStorage.getItem("transfer-history")) || [];
        setTransferHistory(savedTransferHistory);
    }, []);

    return (
        <div>
            <h2>История переводов</h2>
            <ul>
                {transferHistory.map((record, index) => (
                    <li key={index}>
                        {`Тип: ${record.type}, Отправитель: ${record.sender}, Получатель: ${record.recipient}, Сумма: ${record.amount} KZT, Дата: ${new Date(record.date).toLocaleString()}`}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default History;
