import React, { useState } from 'react';
import '../css/login.css'

import { Link } from 'react-router-dom'


const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [smsCode, setSmsCode] = useState('');
    const [showCodeInput, setShowCodeInput] = useState(false);

    const dataAboutCards = [

        {
            id: 1,
            phone: '87784394541',
            fullname: 'Bolat Abdulaziz',
            IIN: '1234567890',
            accounts: [{
                title: 'Основной счет',
                code: '1234 1234 1234 1234',
                IBAN: 'KZ123456789012345678',
                BIC: '123456',
                endingDate: '02/10',
                CVV: '333',
                currency: 'KZT',
                balance: 10000
            },
            {
                title: 'На долги мафии',
                code: '4321 4321 4321 4321',
                IBAN: 'KZ123790035535678899',
                BIC: '123456',
                endingDate: '12/09',
                CVV: '444',
                currency: 'KZT',
                balance: 100000000
            }]
        },
        {
            id: 2,
            phone: '87017091646',
            fullname: 'Kasenov Alikhan',
            IIN: '1234567890',
            accounts: [{
                title: 'Основной счет',
                code: '5509 8506 0306 0987',
                IBAN: 'KZ634534576012345678',
                BIC: '729532',
                endingDate: '12/03',
                CVV: '111',
                currency: 'KZT',
                balance: 98002
            },
            {
                title: 'Сберегательный счет',
                code: '8652 2019 2888 6321',
                IBAN: 'KZ987654321098765432',
                BIC: '654321',
                endingDate: '27/08',
                CVV: '555',
                currency: 'KZT',
                balance: 5000
            }]
        },

    ];


    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const generateSmsCode = () => {
        const inputPhone = document.querySelector('.phone-input')
        if (phoneNumber[0] === '8') {
            inputPhone.setAttribute('readonly', true)
            const code = Math.floor(100000 + Math.random() * 900000);
            setSmsCode(code);
            console.log(`Отправлен SMS-код ${code}`);
            setShowCodeInput(true);
        }
        else {
            alert('Телефон был введен не праивльно!')
        }
    };


    const handleClickLogIn = () => {
        const codeInput = document.querySelector('.code-input')
        if (codeInput.value == smsCode) {
            // for(let i=0; i < dataAboutCards.length; i++){
            //     if(phoneNumber === dataAboutCards[i]){
            //         localStorage.removeItem('card-data')
            //         localStorage.setItem('card-data', JSON.stringify(dataAboutCards[i]))    
            //     }
            // }

            
            let foundUserData = null;
            for (const userData of dataAboutCards) {
                if (userData.phone === phoneNumber) {
                    foundUserData = userData;
                    break; 
                }
            }
            if (foundUserData) {
                localStorage.removeItem('card-data');
                localStorage.setItem('card-data', JSON.stringify(foundUserData));
                const filteredDataAboutCards = dataAboutCards.filter((user) => user.phone !== phoneNumber);
                localStorage.removeItem('other-cards');
                localStorage.setItem('other-cards', JSON.stringify(filteredDataAboutCards));
            } 
            else {
                alert('Данные не найдены');
            }
            


            // if (phoneNumber === '87784394541') {
            //     localStorage.removeItem('card-data')
            //     localStorage.setItem('card-data', JSON.stringify(dataAboutCards[0]))
            // }
            // else if (phoneNumber === '87017091646') {
            //     localStorage.removeItem('card-data')
            //     localStorage.setItem('card-data', JSON.stringify(dataAboutCards[1]))
            // }
            setShowCodeInput(false)
            window.location.assign('/main')
        }
        else {
            alert('Не правильный код!')
        }
    }

    return (
        <div className='container'>
            <h2>Log In</h2>
            <div>
                <label>Enter phone number: </label>
                <input
                    className='phone-input'
                    type="text"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                />
            </div>
            {!showCodeInput ? (
                <button className='' onClick={generateSmsCode}>Send code</button>
            ) : (
                <div>
                    <label>Enter SMS-code: </label>
                    <input
                        type="text"
                        className='code-input'
                    />
                    <br></br>
                    <button onClick={handleClickLogIn}>
                        Log In
                    </button>
                </div>
            )}
        </div>
    );
}

export default Login;