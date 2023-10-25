import { useState, useEffect } from 'react';
import React from 'react';
import '../css/transfer.css';
import InputMask from 'react-input-mask';



const Transfer = () => {
    const [selectedOption, setSelectedOption] = useState(0);

    let cardData = JSON.parse(localStorage.getItem('card-data')) || {}

    let otherCards = JSON.parse(localStorage.getItem('other-cards')) || []

    const [transferHistory, setTransferHistory] = useState([]);


    const [selectedAccount, setSelectedAccount] = useState(''); // Состояние для хранения выбранного аккаунта

    const [cardTitle, setCardTitle] = useState('')

    const handleAccountChange = (event) => {
        setSelectedAccount(event.target.value);
        setCardTitle(event.target.value)
    };

    const renderBalance = () => {
        const selectedAccountData = cardData.accounts.find(account => account.title === selectedAccount);
        if (selectedAccountData) {
            return (
                <div>Баланс: {selectedAccountData.balance} {selectedAccountData.currency}</div>
            );
        }
        return null;
    };


    const PhoneTransferContent = () => {
        const Send = () => {
            const inputBalance = document.getElementById('inputBalance')
            const inputByPhone = document.getElementById('inputByPhone').value
            for (let i = 0; i < otherCards.length; i++) {
                if (inputByPhone.value == otherCards[i].phone) {
                    if (cardData.accounts[0].balance > Number(inputBalance)) {
                        otherCards[i].accounts[0].balance += Number(inputBalance);
                        cardData.accounts[0].balance -= Number(inputBalance);


                        const transferRecord = {
                            sender: otherCards[i].phone,
                            recipient: inputByPhone.value,
                            amount: inputBalance,
                            date: new Date().toISOString(),
                            type: "По номеру телефона",
                        };

                        setTransferHistory([...transferHistory, transferRecord]);

                        localStorage.setItem("transfer-history", JSON.stringify(transferHistory));

                        localStorage.setItem('other-cards', JSON.stringify(otherCards))
                        localStorage.setItem('card-data', JSON.stringify(cardData))
                        window.location.reload();
                        alert('Перевод выполнен успешно.');
                    }
                    else {
                        alert('Недостаточно средств')
                    }
                }
            }
        }
        return (
            <div className='transfer-type'>
                <h2>Перевод по номеру телефона</h2>
                {renderBalance()}
                <select value={selectedAccount} onChange={handleAccountChange}>
                    <option value="">Выберите аккаунт</option>
                    {cardData.accounts?.map((account) => (
                        <option key={account.title} value={account.title}>{account.title}</option>
                    ))}
                </select>
                <input id='inputByPhone' placeholder='Введите номер телефона'></input>
                <input id='inputBalance' min="0" placeholder='0' type='number'></input>
                <button onClick={Send}>Отправить</button>
            </div>
        );
    };


    const CardTransferContent = () => {
        const Send = () => {
            const inputCardNumber = document.getElementById('cardNumber')
            const inputBalance = document.getElementById('inputBalance').value
            for (let i = 0; i < otherCards.length; i++) {
                for (let k = 0; k < otherCards[i].accounts.length; k++) {
                    if (inputCardNumber.value == otherCards[i].accounts[k].code) {
                        for (let j = 0; j < cardData.accounts.length; j++) {
                            if (cardData.accounts[j].title == cardTitle) {
                                if (cardData.accounts[j].balance > Number(inputBalance)) {
                                    otherCards[i].accounts[k].balance += Number(inputBalance);
                                    cardData.accounts[j].balance -= Number(inputBalance);

                                    const transferRecord = {
                                        sender: cardData.accounts[j].code,
                                        recipient: otherCards[i].accounts[k].code,
                                        amount: inputBalance,
                                        date: new Date().toISOString(),
                                        type: "По номеру карты",
                                    };

                                    setTransferHistory([...transferHistory, transferRecord]);

                                    localStorage.setItem("transfer-history", JSON.stringify([...transferHistory, transferRecord]));

                                    localStorage.setItem('other-cards', JSON.stringify(otherCards))
                                    localStorage.setItem('card-data', JSON.stringify(cardData))
                                    window.location.reload();
                                    alert('Перевод выполнен успешно.');
                                }
                                else {
                                    alert('Недостаточно средств')
                                }
                            }
                        }
                    }
                }
            }
        }

        return (
            <div className='transfer-type'>
                <h2>Перевод по номеру карты</h2>
                {renderBalance()}
                <select value={selectedAccount} onChange={handleAccountChange}>
                    <option value="">Выберите аккаунт</option>
                    {cardData.accounts?.map((account) => (
                        <option key={account.title} value={account.title}>{account.title}</option>
                    ))}
                </select>
                <InputMask
                    mask="9999 9999 9999 9999"
                    maskChar=" "
                    id="cardNumber"
                    placeholder="Введите номер карты"
                />
                <input id='inputBalance' min="0" placeholder='0' type='number'></input>
                <button onClick={Send}>Отправить</button>
            </div>
        );
    };

    const AnotherCardTransferContent = () => {


        const Send = () => {
            const inputCardNumber = document.getElementById('cardNumber')
            const inputBalance = document.getElementById('inputBalance').value
            for (let i = 0; i < otherCards.length; i++) {
                for (let k = 0; k < otherCards[i].accounts.length; k++)
                    if (inputCardNumber.value == otherCards[i].accounts[k].code) {
                        for (let j = 0; j < cardData.accounts.length; j++) {
                            if (cardData.accounts[j].title == cardTitle) {
                                if (cardData.accounts[j].balance > Number(inputBalance)) {
                                    otherCards[i].accounts[k].balance += Number(inputBalance);
                                    cardData.accounts[j].balance -= Number(inputBalance);

                                    const transferRecord = {
                                        sender: cardData.accounts[j].code,
                                        recipient: otherCards[i].accounts[k].code,
                                        amount: inputBalance,
                                        date: new Date().toISOString(),
                                        type: "По другому номеру карты",
                                    };

                                    setTransferHistory([...transferHistory, transferRecord]);

                                    localStorage.setItem("transfer-history", JSON.stringify([...transferHistory, transferRecord]));

                                    localStorage.setItem('other-cards', JSON.stringify(otherCards))
                                    localStorage.setItem('card-data', JSON.stringify(cardData))
                                    window.location.reload();
                                    alert('Перевод выполнен успешно.');
                                    break
                                }
                                else {
                                    alert('Недостаточно средств')
                                }
                            }
                        }
                    }
            }
        }

        return (
            <div className='transfer-type'>
                <h2>Перевод по номеру другой карты</h2>
                {renderBalance()}
                <select value={selectedAccount} onChange={handleAccountChange}>
                    <option value="">Выберите аккаунт</option>
                    {cardData.accounts?.map((account) => (
                        <option key={account.title} value={account.title}>{account.title}</option>
                    ))}
                </select>
                <InputMask
                    mask="9999 9999 9999 9999"
                    maskChar=" "
                    id="cardNumber"
                    placeholder="Введите номер карты"
                />
                <input id='inputBalance' min="0" placeholder='0' type='number'></input>
                <button onClick={Send}>Отправить</button>
            </div>
        );
    };


    const AccountsTransferContent = () => {
        const [senderAccount, setSenderAccount] = useState('');
        const [recipientAccount, setRecipientAccount] = useState('');
        const [inputBalance, setInputBalance] = useState(0);

        const handleSenderChange = (event) => {
            setSenderAccount(event.target.value);

        };

        const handleRecipientChange = (event) => {
            setRecipientAccount(event.target.value);
        };

        const handleInputBalanceChange = (event) => {
            setInputBalance(Number(event.target.value));
        };

        const senderAccounts = cardData.accounts;
        const recipientAccounts = cardData.accounts.filter(account => account.title !== senderAccount);

        const Send = () => {
            const sender = senderAccounts.find(account => account.title === senderAccount);
            const recipient = recipientAccounts.find(account => account.title === recipientAccount);

            if (sender.balance >= inputBalance) {
                sender.balance -= inputBalance;
                recipient.balance += inputBalance;

                const transferRecord = {
                    sender: senderAccount,
                    recipient: recipientAccount,
                    amount: inputBalance,
                    date: new Date().toISOString(),
                    type: "Между своими счетами",
                };

                setTransferHistory([...transferHistory, transferRecord]);

                localStorage.setItem("transfer-history", JSON.stringify([...transferHistory, transferRecord]));

                localStorage.setItem('card-data', JSON.stringify(cardData));

                window.location.reload();
                alert('Перевод выполнен успешно.');
            }
            else {
                alert('Недостаточно средств');
            }

        };


        return (
            <div className='transfer-type'>
                <div>
                    <label>Выберите отправителя:</label>
                    <select value={senderAccount} onChange={handleSenderChange}>
                        <option value="">Выберите отправителя</option>
                        {senderAccounts.map((account) => (
                            <option key={account.title} value={account.title}>{account.title}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Выберите получателя:</label>
                    <select value={recipientAccount} onChange={handleRecipientChange}>
                        <option value="">Выберите получателя</option>
                        {recipientAccounts.map((account) => (
                            <option key={account.title} value={account.title}>{account.title}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Сумма перевода:</label>
                    <input
                        min="0"
                        type="number"
                        // value={inputBalance}
                        placeholder='0'
                        onChange={handleInputBalanceChange}
                    />
                </div>
                <button onClick={Send}>Отправить</button>
            </div>
        );
    };


    return (
        <div className="transfer-div">
            <a href='/main'>Назад</a>
            <ul>
                <li onClick={() => setSelectedOption(1)}>По номеру телефона</li>
                <li onClick={() => setSelectedOption(2)}>По номеру карты</li>
                <li onClick={() => setSelectedOption(3)}>По номеру другой карты</li>
                <li onClick={() => setSelectedOption(4)}>Между своими счетами</li>
            </ul>
            {(
                <div className="content">
                    {selectedOption === 1 && <PhoneTransferContent />}
                    {selectedOption === 2 && <CardTransferContent />}
                    {selectedOption === 3 && <AnotherCardTransferContent />}
                    {selectedOption === 4 && <AccountsTransferContent />}
                </div>
            )}
        </div>
    );
};

export default Transfer;

