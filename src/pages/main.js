import { useState, useEffect } from 'react';
import React from 'react';
import '../css/main.css'
import logo from '../images/download.png'
import transfer from '../images/переводы.png'
import history from '../images/watch.png'

import { Link } from 'react-router-dom'


const Main = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('card-data')) || {}
        setData(data);
    }, []);

    // const handleSendByPhone = () => {

    //     // Предположим, что вы знаете сумму, которую вы хотите перевести
    //     const transferAmount = 500; // Сумма перевода

    //     // Проверка наличия достаточного баланса на отправителе
    //     const senderAccount = dataAboutCards[senderAccountIndex].accounts[0];
    //     if (senderAccount.balance < transferAmount) {
    //         alert('Недостаточно средств на счете для перевода.');
    //     } else {
    //         // Вычитание суммы перевода с баланса отправителя
    //         senderAccount.balance -= transferAmount;

    //         // Добавление суммы перевода к балансу получателя
    //         const recipientAccount = dataAboutCards[recipientAccountIndex].accounts[0];
    //         recipientAccount.balance += transferAmount;

    //         // Обновление данных в localStorage или на сервере
    //         // Пример обновления в localStorage:
    //         localStorage.setItem('dataAboutCards', JSON.stringify(dataAboutCards));

    //         alert(`Перевод успешно выполнен. Баланс отправителя: ${senderAccount.balance} ${senderAccount.currency}. Баланс получателя: ${recipientAccount.balance} ${recipientAccount.currency}.`);
    //     }
    // }

    return (
        <div className='main-box'>
            <div>
                <header className='header'>
                    <img src={logo} className='imgLogo'></img>
                    <ul class='menu'>
                        <li><Link>Main</Link></li>
                        <li><Link>Settings</Link></li>
                        <li><Link to={'/profile/'}>Profile</Link></li>
                    </ul>
                    {/* <Link className='login' to={"/login/"}>
                        Log In
                    </Link> */}
                    <a href='/login' className='login'>Log In</a>
                </header>
                <main className='main'>
                    <nav>
                        <Link className='links' to={'/history/'}>
                            <img src={history} />
                        </Link>
                        <Link className='links' to={'/transfer/'}>
                            <img src={transfer} />
                        </Link>
                    </nav>
                    <h2>Счета и карты</h2>
                    <div>
                        {/* <div>IIN: {data.IIN}</div>
                        <div>ФИО: {data.fullname}</div> */}
                        {data.accounts?.map((account, index) => (
                            <div className='cardinfo' key={index}>
                                <div><strong>Title: {account.title}</strong></div>
                                <div>Срок до: {account.endingDate}</div>
                                <div>Code: {account.code}</div>
                                <div>CVV: {account.CVV}</div>
                                <div>IBAN: {account.IBAN}</div>
                                <div>BIC: {account.BIC}</div>
                                <div>Валюта: {account.currency}</div>
                                <div>Баланс: {account.balance} {account.currency}</div>
                            </div>
                        ))}

                    </div>
                </main>
                <footer className='footer'>
                        
                </footer>
            </div>
        </div>
    );
}

export default Main;