import { persistor } from "../../";
import React,{ useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerRoute, emailsendRoute, emailvalidateRoute } from "../../components/backend";
import userInfoSlice from "../../state/UserInfo";
import store from "../../state/store";
import { setEmail, setGender, setNationalinfo } from '../../state/UserSlice';
import {ToggleButtonGroup, ToggleButton, Button, TextField } from '@mui/material';
import { name } from "dayjs/locale/ko";

export const register = async function (userEmail, password, userName, userPhone, userGender, userNation, userNickname) {
    //const dispatch = useDispatch();
    // 로그인 버튼을 클릭하면 백엔드 서버에 요청을 보낸다
    // 이때 body에 필요한 정보가 할당된다
    // 데이터를 다른곳에 리턴하고 싶다면 fetch앞에 return 필요

    let userData = {};

    await fetch(registerRoute, {
        method: 'POST',
        headers: [["Content-Type", "application/x-www-form-urlencoded"]],
        body: JSON.stringify({
            name: userName,
            phone_number: userPhone,
            nationalinfo: userNation,
            nickname: userNickname,
            gender: userGender,
            email: userEmail,
            password: password,
        })
    })
        .then((res) => res.json())
        .then((data) => {
            //store.dispatch(userInfoSlice.actions.getUserInfo(data));
            //console.log(data)
            //logIn(userEmail, password);
            userData = data;
        });

    return userData
}

export const handleEmailChange = (e, dispatch, setEmailError) => {
    const value = e.target.value;
    dispatch(setEmail(value));
    //console.log(store.getState().user.email);

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
        setEmailError('이메일 형식이 올바르지 않습니다.');
    } else {
        setEmailError('');
    }
};


export const handleEmailVerification = async (userEmail, setShowVerification) => {
    try {
        const response = await fetch(emailsendRoute, {
            method: 'POST',

            headers: [["Content-Type", 'application/x-www-form-urlencoded'],
                // ["Access-Control-Allow-Origin", "*"],
                // ["Access-Control-Allow-Credentials", 'true'],
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

export const RegisterComponent = () => {
    const [verificationCode, setVerificationCode] = useState('');

    const handleVerificationCodeChange = (e) => {
        setVerificationCode(e.target.value);
    };

    const handleVerificationCodeSubmit = async () => {
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

    return (
        <div>
            <TextField
                label="인증번호 입력"
                variant="outlined"
                value={verificationCode}
                onChange={handleVerificationCodeChange}
                fullWidth
                margin="normal"
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleVerificationCodeSubmit}
            >
                인증번호 확인
            </Button>
        </div>
    );
};

export default RegisterComponent;
// 성별 토글 버튼
export const GenderToggleButton = () => {
    const dispatch = useDispatch();
    const userGender = useSelector((state) => state.user.userGender) || '1'; // 현재 성별 상태를 가져오고, 기본값을 '1'로 설정

    const handleChange = (event, newAlignment) => {
        if (newAlignment !== null) {
            dispatch(setGender(newAlignment)); // 성별 상태를 업데이트
        }
    };

    return (
        <ToggleButtonGroup
            color="primary"
            exclusive
            value={userGender} // 현재 성별 상태를 value로 설정
            onChange={handleChange} // 변경 이벤트 핸들러를 설정
            aria-label="Platform"
            fullWidth
        >
            <ToggleButton value='1'>남자</ToggleButton>
            <ToggleButton value='0'>여자</ToggleButton>
        </ToggleButtonGroup>
    );
};

// 국적 토글 버튼
export const NationToggleButton = () => {
    const dispatch = useDispatch();
    const userNation = useSelector((state) => state.user.userNation) || '0'; // 현재 성별 상태를 가져오고, 기본값을 '1'로 설정

    const handleChange = (event, newAlignment) => {
        if (newAlignment !== null) {
            dispatch(setNationalinfo(newAlignment)); // 국적 상태를 업데이트
        }
    };

    return (
        <ToggleButtonGroup
            color="primary"
            exclusive
            value={userNation} // 현재 국적 상태를 value로 설정
            onChange={handleChange} 
            aria-label="Platform"
            fullWidth
        >
            <ToggleButton value='0'>내국인</ToggleButton>
            <ToggleButton value='1'>외국인</ToggleButton>
        </ToggleButtonGroup>
    );
};
