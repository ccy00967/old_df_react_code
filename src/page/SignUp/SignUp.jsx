import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Common_Layout from "../../Component/common_Layout";
import {
  blueColor,
  CenterView,
  GreenColor,
  hoverGreen,
  Icon,
  lightGreenColor,
  redColor,
  RowView,
} from "../../Component/common_style";
import { ScrollToTop_smooth } from "../../Component/function/ScrollTop";
import TmpNicepassModal from "../Menu/Farmer/Modal/TmpNicepassModal";
import AddressModal from "../Menu/Farmer/Modal/AddressModal";
import { NaverMaps } from "../../Component/naver_maps/NaverMaps";

const LoginBox = styled(CenterView)`
  width: 100%;
  max-width: 40rem;
  box-sizing: border-box;
  padding: 0rem 1rem;
  margin: 2rem auto 8rem auto;
  div {
    width: 100%;
  }
  div.pageName {
    font-family: var(--font-Pretendard-Medium);
    font-size: 28px;
    margin-bottom: 1rem;
  }
  div.title {
    font-family: var(--font-Pretendard-Medium);
    margin: 1.5rem 0rem 0.5rem 0rem;
  }
`;
const AlertText = styled.div`
  font-size: 14px;
  margin-top: 0.5rem;
  margin-left: 2rem;
  color: gray;
  &.no {
    color: ${redColor};
  }
  &.ok {
    color: ${blueColor};
  }
`;
const TypeBox = styled(CenterView)`
  width: 30%;
  padding: 1rem 0rem;
  color: gray;
  text-align: center;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  cursor: pointer;
  &.center {
    margin: 0rem 0.5rem;
  }
  &.this {
    color: ${GreenColor};
    font-family: var(--font-Pretendard-SemiBold);
    border: 1px solid ${lightGreenColor};
    background-color: ${lightGreenColor};
  }
  img {
    margin-left: 3px;
  }
`;
const InputBox = styled.input`
  flex: 1;
  padding: 1rem;
  font-size: 16px;
  outline: 0;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  &:focus {
    border: 1px solid ${GreenColor};
  }
  &.no {
    border: 1px solid ${redColor};
  }
`;
const PASSBtn = styled.div`
  padding: 1rem 0rem;
  text-align: center;
  font-family: var(--font-Pretendard-SemiBold);
  color: ${GreenColor};
  background-color: ${lightGreenColor};
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #c4e6d2;
  }
`;
const Btn = styled.span`
  width: 9rem;
  padding: 1rem 0rem;
  margin-left: 1rem;
  font-family: var(--font-Pretendard-SemiBold);
  text-align: center;
  color: white;
  background-color: ${GreenColor};
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${hoverGreen};
  }
  &.signUp {
    width: 100%;
    max-width: 40rem;
    margin: 3rem 0rem;
  }
`;

// 로그인에 필요한 유저정보
const userModel = {
  name: "",
  birth: "",
  gender: "",
  nationalinfo: "",
  mobileco: "",
  phone_number: "",
  email: "",
  password: "",
  //role: "",
  address: {},
}

// address에 들어갈 객체
const Address = {
  roadaddress: "도로명",
  jibunAddress: "지번",
  englishAddress: "영어주소",
  navermapsx: "1234",
  navermapsy: "1234",
  detailAddress: "디테일",
}

const SignUp = () => {
  const Navigate = useNavigate();

  const [userType, setUserType] = useState("");
  const [id, setID] = useState("");
  const [otp, setOtp] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [addr, setAddr] = useState(Address);
  const [addrDetail, setAddrDetail] = useState("");

  // 네이버 지도 팝업 모달창
  const [addrmodalOpen, setAddrModalOpen] = useState(false);
  const closeAddrModal = () => { setAddrModalOpen(false) };

  // 임시 나이스 본인인증 - 모달창을 띄워서 필요정보 직접입력
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => { setModalOpen(false) }

  // 임시 본인인증 데이터 - 나이스에서는 토큰으로 넘어올 예정
  const [niceData, setNicepass] = useState({});

  const setting_type1 = () => setUserType("농업인");
  const setting_type2 = () => setUserType("드론조종사");
  const setting_type3 = () => setUserType("농약상");
  // 선택한 userType class명 바꾸기
  const typeClassName = (type) => {
    if (userType === type) return "this";
    return "";
  };

  const setting_id = (e) => setID(e.target.value);
  const setting_otp = (e) => setOtp(e.target.value);
  const setting_addrDetail = (e) => setAddrDetail(e.target.value);
  const setting_pw = (e) => {
    if (isOk_Pw(e.target.value)) {
      setAlert_pw("ok");
    } else {
      setAlert_pw("no");
    }
    setPw(e.target.value);
  };
  const setting_pwCheck = (e) => {
    if (pw === e.target.value && pw !== "") {
      setAlert_pwCheck("ok");
    } else {
      setAlert_pwCheck("no");
    }
    setPwCheck(e.target.value);
  };

  // (비밀번호 유효성검사) 영문/숫자/특수문자 포함 10~16자
  const isOk_Pw = (pw) => {
    const pattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,16}$/;
    return pattern.test(pw);
  };

  // 경고문 상태값 (빈문자열, ok, no 로 구분)
  const [alert_type, setAlert_type] = useState("");
  const [alert_pass, setAlert_pass] = useState("");
  const [alert_id, setAlert_id] = useState("");
  const [alert_otp, setAlert_otp] = useState("");
  const [alert_pw, setAlert_pw] = useState("");
  const [alert_pwCheck, setAlert_pwCheck] = useState("");

  const alert_type_message = {
    no: "회원선택을 먼저 해주세요.",
    ok: "",
    default: "회원선택을 해주세요.",
  };
  const alert_pass_message = {
    no: "본인인증을 먼저 해주세요.",
    ok: "본인인증이 완료되었습니다.",
    default: "",
  };
  const alert_id_message = {
    no: "이메일을 입력해주세요.",
    ok: "사용 가능한 이메일입니다.",
    default: "",
  };
  const alert_otp_message = {
    no: "인증번호가 일치하지 않습니다.",
    ok: "인증번호가 일치합니다.",
    default: "",
  };
  const alert_pw_message = {
    no: "비밀번호는 영문/숫자/특수문자 포함 10~16자를 포함해야 합니다.",
    ok: "사용가능한 비밀번호입니다.",
    default: "영문/숫자/특수문자 포함 8~16자",
  };
  const alert_pwCheck_message = {
    no: "비밀번호가 일치하지 않습니다.",
    ok: "입력한 비밀번호가 일치합니다.",
    default: "",
  };

  const click_PASS = () => {
    // 모달창 열기
    setModalOpen(true);
    console.log(modalOpen);
    setAlert_pass("ok"); // no 혹은 ok
  };

  const click_otp_send = async () => {
    if (id === "") {
      setAlert_id("no");
    } else {
<<<<<<< HEAD
<<<<<<< HEAD
=======

      await fetch('https://192.168.0.28:443/user/emailsend/', {
        method: 'POST',
        headers: [["Content-Type", 'application/json'],
        ],
        credentials: "include",
        body: JSON.stringify({ email: id }),
      });

>>>>>>> c868cce9c51360f293f5899238da30f80f4c1023
      setAlert_id("ok");
=======
>>>>>>> main
      try {
        const response = await fetch('https://junradodronefield.com:1337/user/emailsend/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: id }),
<<<<<<< HEAD
          credentials: 'include',
        });
  
        if (response.ok) {
          setAlert_type("ok");
          // Handle success (e.g., show a success message)
        } else {
          setAlert_type("no");
          // Handle error (e.g., show an error message)
        }
      } catch (error) {
        setAlert_type("no");
        // Handle network error
=======
        });
  
        if (response.ok) {
          setAlert_id("ok");
        } else {
          setAlert_id("no");
        }
      } catch (error) {
        console.error('Error sending OTP:', error);
        setAlert_id("no");
>>>>>>> main
      }
    }
  };
  const click_otp_check = async () => {
    if (otp === "") {
      setAlert_otp("no");
    } else {
<<<<<<< HEAD
<<<<<<< HEAD
      setAlert_otp("ok");
      try {
        const response = await fetch('https://junradodronefield.com:1337/user/validatekeycheck/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ validatekey: otp }),
          credentials: 'include',
        });
  
        if (response.ok) {
          // Handle success (e.g., show a success message)
          setAlert_otp("ok");
        } else {
          // Handle error (e.g., show an error message)
          setAlert_otp("no");
        }
      } catch (error) {
        // Handle network error
=======
      try {
        const response = await fetch('https://junradodronefield.com:1337/user/validatekeycheck/', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: new URLSearchParams({ validatekey: otp }),
        });
  
        if (response.ok) {
          alert('이메일 인증에 성공했습니다.');
          setAlert_otp("ok");
        } else {
          console.error('Error verifying email:', response.statusText);
          alert('인증번호가 일치하지 않습니다.');
          setAlert_otp("no");
        }
      } catch (error) {
        console.error('Error verifying email:', error);
        alert('인증번호가 일치하지 않습니다.');
>>>>>>> main
=======
      
      const res = await fetch('https://192.168.0.28:443/user/validatekeycheck/', {
        method: 'POST',
        headers: [["Content-Type", 'application/json']],
        credentials: "include",
        body: JSON.stringify({ validatekey: otp }),
      });

      console.log(res)

      if (res.ok) {
        setAlert_otp("ok");
      }
      else {
>>>>>>> c868cce9c51360f293f5899238da30f80f4c1023
        setAlert_otp("no");
      }
    }
  };

  /** 주소 찾기 API */
  const search_addr_API = () => {

    console.log(addrmodalOpen);
    setAddrModalOpen(true);
    // setAddr("API 연결");
  };

  /** 가입하기 버튼 - 로직은 수정 바랍니다. */
  const go_nextPage = () => {
    if (userType === "") {
      // 회원선택을 선택하지 않았다면 no
      ScrollToTop_smooth();
      return setAlert_type("no");
    }
    if (alert_pass === "") {
      // PASS 본인인증을 하지 않았다면 no
      ScrollToTop_smooth();
      return setAlert_pass("no");
    }
    if (id === "") {
      // 아이디가 없으면 no
      ScrollToTop_smooth();
      return setAlert_id("no");
    }
    if (alert_pw === "no" || alert_pwCheck === "no") {
      return;
    }

    // 약관 동의로 이동
    Navigate("rules", {
      state: {
        name: niceData.name,
        birth: niceData.birth,
        gender: niceData.gender,
        nationalinfo: niceData.nationalinfo,
        mobileco: niceData.mobileco,
        phone_number: niceData.phone_number,
        //email: id,
        password: pw,
        //role: userType,
        address: addr,
      }
    });
  };

  return (
    <Common_Layout minWidth={1}>
      <LoginBox className="col">
        <div className="pageName">기본정보입력</div>
        <div className="title">회원선택</div>
        <RowView>
          <TypeBox className={typeClassName("농업인")} onClick={setting_type1}>
            농업인
            {userType === "농업인" && (
              <Icon src={require("../../img/icon_check.png")} />
            )}
          </TypeBox>
          <TypeBox
            className={`center ${typeClassName("드론조종사")}`}
            onClick={setting_type2}
          >
            드론조종사
            {userType === "드론조종사" && (
              <Icon src={require("../../img/icon_check.png")} />
            )}
          </TypeBox>
          <TypeBox className={typeClassName("농약상")} onClick={setting_type3}>
            농약상
            {userType === "농약상" && (
              <Icon src={require("../../img/icon_check.png")} />
            )}
          </TypeBox>
        </RowView>
        {userType === "" && (
          <AlertText className={alert_type}>
            {alert_type_message[alert_type] || alert_type_message.default}
          </AlertText>
        )}

        <div className="title">본인인증</div>
        <PASSBtn onClick={click_PASS}>PASS로 본인인증하기</PASSBtn>
        <AlertText className={alert_pass}>
          {alert_pass_message[alert_pass] || alert_pass_message.default}
        </AlertText>

        <div className="title">아이디</div>
        <RowView>
          <InputBox
            placeholder="이메일을 입력해주세요."
            value={id}
            onChange={setting_id}
            className={alert_id}
          />
          <Btn onClick={click_otp_send}>인증번호 발송</Btn>
        </RowView>
        <AlertText className={alert_id}>
          {alert_id_message[alert_id] || alert_id_message.default}
        </AlertText>

        <div className="title">인증번호</div>
        <RowView>
          <InputBox
            //type={"password"}
            placeholder="인증번호를 입력해주세요.(유효시간 5분)"
            value={otp}
            onChange={setting_otp}
            className={alert_otp}
          />
          <Btn onClick={click_otp_check}>확인</Btn>
        </RowView>
        <AlertText className={alert_otp}>
          {alert_otp_message[alert_otp] || alert_otp_message.default}
        </AlertText>

        <div className="title">비밀번호</div>
        <RowView>
          <InputBox
            className={alert_pw}
            type={"password"}
            placeholder="비밀번호를 입력해주세요."
            maxLength={16}
            value={pw}
            onChange={setting_pw}
          />
        </RowView>
        <AlertText className={alert_pw}>
          {alert_pw_message[alert_pw] || alert_pw_message.default}
        </AlertText>

        <div className="title">비밀번호 확인</div>
        <RowView>
          <InputBox
            type={"password"}
            placeholder="비밀번호를 입력해주세요."
            maxLength={16}
            value={pwCheck}
            onChange={setting_pwCheck}
          />
        </RowView>
        <AlertText className={alert_pwCheck}>
          {alert_pwCheck_message[alert_pwCheck] ||
            alert_pwCheck_message.default}
        </AlertText>

        <div className="title">집 주소</div>
        <RowView>
          <InputBox
            placeholder="집 주소를 입력해주세요."
            value={addr.jibunAddress}
            readOnly
          />
          <Btn onClick={search_addr_API}>주소 찾기</Btn>
        </RowView>
        <RowView>
          <InputBox
            placeholder="상세 주소를 입력해주세요."
            value={addrDetail}
            onChange={setting_addrDetail}
            style={{ marginTop: "0.7rem" }}
          />
        </RowView>
        
        <Btn className="signUp" onClick={go_nextPage}>
          가입하기
        </Btn>
      </LoginBox>
      {
        modalOpen &&
        <TmpNicepassModal isOpen={modalOpen} closeModal={closeModal} setNicepass={setNicepass}></TmpNicepassModal>
      }

      {
        addrmodalOpen &&
        <AddressModal isOpen={addrmodalOpen} closeAddrModal={closeAddrModal} />
      }
    </Common_Layout>

  );
};

export default SignUp;
