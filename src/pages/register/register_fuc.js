import { persistor } from "../../";
import React, { useState } from 'react';
import { registerRoute, emailsendRoute, emailvalidateRoute } from "../../components/backend";
import userInfoSlice from "../../state/UserInfo";
import store from "../../state/store";
import { ToggleButtonGroup, ToggleButton, Button, TextField } from '@mui/material';

// 회원가입 요청
export const register = async function (password, nickname, name, phonenumber, birth, gender, nationalinfo) {
    const address = store.getState().address;
    let userData = {};

    try {
        const response = await fetch(registerRoute, {
            method: 'POST',
            headers: [["Content-Type", "application/json"]],
            credentials: "include",
            body: JSON.stringify({
                password: password,
                nickname: nickname,
                name: name,
                phone_number: phonenumber,
                birth: birth,
                gender: gender,
                nationalinfo: nationalinfo,
                address: address,
            })
        });

        if (response.ok) {
            const data = await response.json();
            userData = data;
            alert('회원가입이 완료되었습니다!');
            window.location.href = '/';
        } else {
            alert(`양식을 다시 확인해 주세요.`);
        }
    } catch (error) {
        alert(`양식을 다시 확인해 주세요.`);
    }

    return userData;
}

// 이메일 인증번호 전송
export const handleEmailVerification = async (userEmail, setShowVerification) => {
    try {
        const response = await fetch(emailsendRoute, {
            method: 'POST',

            headers: [["Content-Type", 'application/x-www-form-urlencoded'],
            ],
            credentials: "include",
            body: new URLSearchParams({ email: userEmail }),
        })
            ;


        if (response.ok) {
            setShowVerification(true);
        } else {
            console.error('Error sending email verification:', response.statusText);
        }
    } catch (error) {
        console.error('Error sending email verification:', error);
    }
};

// 이메일 인증번호 확인
export const handleVerificationCodeSubmit = async function(verificationCode) {
    try {
        const response = await fetch(emailvalidateRoute, {
            method: 'POST',
            mode: 'cors',
            headers: [["Content-Type", 'application/x-www-form-urlencoded']],
            body: new URLSearchParams({ validatekey: verificationCode }),
            credentials: "include",
        });

        if (response.ok) {
            alert('이메일 인증에 성공했습니다.');
        } else {
            console.error('Error verifying email:', response.statusText);
            alert('인증번호가 일치하지 않습니다.');
        }
    } catch (error) {
        console.error('Error verifying email:', error);
        alert('인증번호가 일치하지 않습니다.');
    }
};