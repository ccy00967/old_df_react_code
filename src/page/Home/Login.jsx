import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  GreenColor,
  hoverGreen,
  RowView,
  RowView2,
} from "../../Component/common_style";
import { useUser } from "../../Component/userContext";

const LoginBox = styled.div`
  box-sizing: border-box;
  width: 24rem;
  padding: 2rem;
  background-color: white;
  border-radius: 12px;
  div.label {
    color: #1d1d1d;
    margin: 1rem 0rem 0.5rem 0rem;
    font-family: var(--font-Pretendard-Medium);
  }
`;
const TypeBox = styled.div`
  flex: 1;
  padding: 1rem 0rem;
  text-align: center;
  color: gray;
  cursor: pointer;
  border: 1px solid #eeeeee;
  &.left {
    border-radius: 8px 0px 0px 8px;
  }
  &.center {
    border-right: 0;
    border-left: 0;
  }
  &.right {
    border-radius: 0px 8px 8px 0px;
  }
  &.this {
    color: ${GreenColor};
    border: 1px solid ${GreenColor};
    font-family: var(--font-Pretendard-Medium);
  }
`;
const InputBox = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 0.8rem 1rem;
  font-size: 16px;
  font-family: var(--font-Pretendard-Regular);
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  outline: 0;
  ::placeholder {
    color: gray;
  }
`;
const Btn = styled.div`
  padding: 0.8rem 0rem;
  margin-top: 0.5rem;
  text-align: center;
  font-family: var(--font-Pretendard-SemiBold);
  border-radius: 8px;
  cursor: pointer;
  transition: background-Color 0.3s;
  &.green {
    margin-top: 1.5rem;
    color: white;
    background-color: ${GreenColor};
    &:hover {
      background-color: ${hoverGreen};
    }
  }
  &.gray {
    color: gray;
    background-color: #e4e4e4;
    &:hover {
      background-color: #c6c6c6;
    }
  }
`;
const TextBtn = styled(RowView2)`
  margin-top: 0.5rem;
  color: #8e8e8e;
  font-size: 14px;
  span {
    cursor: pointer;
  }
  div.bar {
    width: 1px;
    height: 10px;
    margin: 0rem 0.5rem;
    background-color: #8e8e8e;
  }
`;
const Text = styled.div`
  color: #1d1d1d;
  font-size: 24px;
  font-family: var(--font-Pretendard-SemiBold);
  span {
    color: ${GreenColor};
  }
`;

const Login = (props) => {
  const Navigate = useNavigate();
  const { isLogin, User_info, setUser_info } = useUser();
  // 회원가입 버튼 보여줄지 말지
  const signUpNone = props.signUpNone;

  const [userType, setUserType] = useState("농업인");
  const [emaill, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setting_type1 = () => setUserType("농업인");
  const setting_type2 = () => setUserType("드론조종사");
  const setting_type3 = () => setUserType("농약상");
  const setting_email = (e) => setEmail(e.target.value);
  const setting_password = (e) => setPassword(e.target.value);

  const typeCss = (type) => {
    if (userType === type) return "this";
    return "";
  };

  const Login_API = async () => {
    // User_info 저장
    const userinfo = {
      access: "",
      refresh: "",
      uuid: "",
      userType: userType,
    };
    setUser_info(userinfo);
    localStorage.setItem("User_info", JSON.stringify(userinfo));
  
    // Prepare the data to be sent
    const data = {
      email: emaill,
      password: password,
    };
  
    try {
      const response = await fetch('https://junradodronefield.com:1337/user/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(data),
      });
  
      if (response.ok) {
        const resData = await response.json();
        console.log(resData);
        // Update userinfo with tokens if needed
        userinfo.access = resData.access;
        userinfo.refresh = resData.refresh;
        userinfo.uuid = resData.uuid;
        setUser_info(userinfo);
        localStorage.setItem("User_info", JSON.stringify(userinfo));
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Network error', error);
    }
  };
  const enterPress = (e) => {
    if (e.key === "Enter") {
      Login_API();
    }
  };

  const goFindEmail = () => Navigate("/findID");
  const goFindPassword = () => Navigate("/findPW");
  const goSignUp = () => Navigate("/signUp");
  const goSeriveStart = () => Navigate("/menu");

  return (
    <LoginBox>
      {isLogin ? (
        <>
          <Text>
            <span>홍길동 </span>
            {User_info.userType}님,
            <br />
            안녕하세요!
          </Text>
          <Btn className="green" onClick={goSeriveStart}>
            서비스 시작하기
          </Btn>
        </>
      ) : (
        <>
          <RowView>
            <TypeBox
              className={`left ${typeCss("농업인")}`}
              onClick={setting_type1}
            >
              농업인
            </TypeBox>
            <TypeBox
              className={`center ${typeCss("드론조종사")}`}
              onClick={setting_type2}
            >
              드론조종사
            </TypeBox>
            <TypeBox
              className={`right ${typeCss("농약상")}`}
              onClick={setting_type3}
            >
              농약상
            </TypeBox>
          </RowView>

          <div className="label">아이디</div>
          <InputBox
            placeholder="이메일을 입력해주세요."
            value={emaill}
            onChange={setting_email}
            onKeyPress={(e) => enterPress(e)}
          />

          <div className="label">비밀번호</div>
          <InputBox
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            maxLength={16}
            onChange={setting_password}
            onKeyPress={(e) => enterPress(e)}
          />

          <TextBtn className="end">
            <span onClick={goFindEmail}>아이디 찾기 </span>
            <div className="bar" />
            <span onClick={goFindPassword}> 비밀번호 찾기</span>
          </TextBtn>

          <Btn className="green" onClick={Login_API}>
            로그인
          </Btn>
          {!signUpNone && (
            <Btn className="gray" onClick={goSignUp}>
              회원가입
            </Btn>
          )}
        </>
      )}
    </LoginBox>
  );
};
export default Login;
