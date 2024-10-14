import { useState, useEffect, useRef } from "react";
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
import AddressModal from "../Menu/Farmer/Modal/AddressModal";
import NicePassModal from "../Menu/Farmer/Modal/NicePassModal"; // 통합한 본인인증 모달 가져오기
import { server } from "../url";
import { useDispatch, useSelector } from "react-redux";
import { nicePassFail, nicePassSuccess } from "../../state/niceSuccessState";

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
const TmpPASSBtn = styled.div`
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
  address: {},
};

// address에 들어갈 객체

const SignUp = () => {

  const Navigate = useNavigate();

  const [userType, setUserType] = useState("");
  const [id, setID] = useState("");
  const [otp, setOtp] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [addrDetail, setAddrDetail] = useState("");


  // 나이스 본인인증 현황
  const dispatch = useDispatch();
  const nicePassIsSuccess = useSelector(state => { return state.niceSuccessState.isSuccess; });


  const Address = {
    roadaddress: window.addressInfo.roadAddress,
    jibunAddress: window.addressInfo.jibunAddress,
    detailAddress: addrDetail,
  }

  // 네이버 지도 팝업 모달창
  const [addrmodalOpen, setAddrModalOpen] = useState(false);
  const closeAddrModal = () => { setAddrModalOpen(false) };

  // 경고문 상태값 (빈문자열, ok, no 로 구분)
  const [alert_type, setAlert_type] = useState("");
  //const [alert_pass, setAlert_pass] = useState("");
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

  const click_otp_send = async () => {
    if (id === "") {
      setAlert_id("no");
    } else {

      const res = await fetch(server + '/validation/emailsend/', {
        method: 'POST',
        headers: [["Content-Type", 'application/json']],
        credentials: "include",
        body: JSON.stringify({ email: id }),
      });

      if (res.ok) {
        setAlert_id("ok");
      }
    }
  };
  
  const click_otp_check = async () => {
    if (otp === "") {
      setAlert_otp("no");
    } else {


      const res = await fetch(server + '/validation/validatekeycheck/', {
        method: 'POST',
        headers: [["Content-Type", 'application/json']],
        credentials: "include",
        body: JSON.stringify({ validatekey: otp }),
      });

      if (res.ok) {
        setAlert_otp("ok");
      } else {
        setAlert_otp("no");
      }
    }
  };

  /** 주소 찾기 API */
  const search_addr_API = () => {
    setAddrModalOpen(true);
  };

  /** 가입하기 버튼 */
  const go_nextPage = () => {
    if (userType === "") {
      ScrollToTop_smooth();
      return setAlert_type("no");
    }

    //if (localStorage.getItem('niceValidate') !== true) {
    if (nicePassIsSuccess != "ok") {
      // PASS 본인인증을 하지 않았다면 no

      ScrollToTop_smooth();
      //return setAlert_pass("no");
      console.log(nicePassIsSuccess)
      return dispatch(nicePassFail())
    }

    if (id === "") {
      ScrollToTop_smooth();
      return setAlert_id("no");
    }

    if (alert_pw === "no" || alert_pwCheck === "no") {
      return;
    }

    // 기본값 4 == 농업인
    let roleSelect = 4
    if (userType === "드론조종사") { roleSelect = 3 } // * 나중에 3,4번으로 전부 수정하기 3==방제사, 4==농민

    // 약관 동의로 이동
    navigate("rules", {
      state: {
        ...niceData,
        email: id,
        password: pw,
        address: Address,
      },
    });
  };

  return (
    <Common_Layout minWidth={1}>
      <LoginBox className="col">
        <div className="pageName">기본정보입력</div>
        <div className="title">회원선택</div>
        <RowView>
          <TypeBox className={userType === "농업인" ? "this" : ""} onClick={() => setUserType("농업인")}>
            농업인
          </TypeBox>
          <TypeBox className={userType === "드론조종사" ? "center this" : "center"} onClick={() => setUserType("드론조종사")}>
            드론조종사
          </TypeBox>
        </RowView>
        {userType === "" && (
          <AlertText className={alert_type}>
            {alert_type_message[alert_type] || alert_type_message.default}
          </AlertText>
        )}

        <div className="title">본인인증</div>

        <NicePassBtn />
        <AlertText className={nicePassIsSuccess}>
          {alert_pass_message[nicePassIsSuccess] || alert_pass_message.default}
        </AlertText>

        <div className="title">아이디</div>
        <RowView>
          <InputBox placeholder="이메일을 입력해주세요." value={id} onChange={(e) => setID(e.target.value)} />
          <Btn onClick={click_otp_send}>인증번호 발송</Btn>
        </RowView>

        <div className="title">비밀번호</div>
        <RowView>
          <InputBox placeholder="비밀번호를 입력해주세요." type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
        </RowView>

        <div className="title">비밀번호 확인</div>
        <RowView>
          <InputBox placeholder="비밀번호를 입력해주세요." type="password" value={pwCheck} onChange={(e) => setPwCheck(e.target.value)} />
        </RowView>

        <div className="title">집 주소</div>
        <RowView>
          <InputBox placeholder="집 주소를 입력해주세요." value={window.addressInfo?.jibunAddress || ""} readOnly />
          <Btn onClick={search_addr_API}>주소 찾기</Btn>
        </RowView>
        <RowView>
          <InputBox placeholder="상세 주소를 입력해주세요." value={addrDetail} onChange={(e) => setAddrDetail(e.target.value)} />
        </RowView>

        <Btn className="signUp" onClick={go_nextPage}>
          가입하기
        </Btn>
      </LoginBox>
      
      {addrmodalOpen && <AddressModal isOpen={addrmodalOpen} closeAddrModal={closeAddrModal} />}
      
      <NicePassModal ref={nicePassRef} setNiceData={setNiceData} />
    </Common_Layout>
  );
};

export default SignUp;
