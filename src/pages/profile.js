import React, { useState } from 'react';
import '../css/profile.css'

import { Link } from 'react-router-dom'


const Profile = () => {

    const data = JSON.parse(localStorage.getItem('card-data'))

    return (
        <div className='profile-main-div'>

            <a href='/main'>Назад</a>
            <div className='profile'>
                <h1>Профиль</h1>
                <div>
                    <p><span>ФИО:</span> {data.fullname}</p>
                    <p><span>ИИН:</span> {data.IIN}</p>
                    <p><span>Номер телефона:</span> {data.phone}</p>
                </div>

            </div>
        </div>
    );
}

export default Profile;