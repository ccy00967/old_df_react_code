import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import styled from "styled-components";
import {
    BackgroundArea,
    CenterView,
    GreenColor,
    hoverGreen,
    Icon,
    lightGreenColor,
    redColor,
    RowView,
    RowView2,
} from "../../../../Component/common_style";
import noScroll from "../../../../Component/function/noScroll";


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

const nice_pass_model = {
    name: "",
    birth: "",
    nationalinfo: "",
    mobileco: "",
    phone_number: "",
}


// 본인인증 성공
function validate_success() {
    console.log("본인인증 성공")
}

// 본인인증 실패
function validate_fail() {
    console.log("본인인증 실패")
}

// 나이스 본인인증 순서
// 백엔드에 필요정보 요청 -> form에 들어갈 3가지: token_version_id, enc_data, integrity
// 받으면 form에 넣어서 nice표준창 호출하기 -> 호출 완료

const NicePassBtn = ({ isOpen, closeModal, setNicepass }) => {

    //const [modalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [birth, setBirth] = useState("");
    const [gender, setGender] = useState("");
    const [nationalinfo, setNationalinfo] = useState("");
    const [mobileco, setMobileco] = useState("");
    const [phone_number, setPhone] = useState("");
    noScroll(isOpen);

    // 표준창을 띄우기
    const fnPopup = async () => {

        const { form_chk } = document;

        // 표준창 호출에 필요한 정보를 백엔드에서 가져오기
        const res = await fetch('https://192.168.0.28:443/validation/callnicepass/', {
            method: 'GET',
            headers: [["Content-Type", 'application/json'],
            ],
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => data)

        console.log(res)

        const nicePopUpWindow = window.open('', 'popupChk', 'width=480, height=812, top=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
        document.form_chk.action = "https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb";
        document.form_chk.target = "popupChk";
        form_chk.token_version_id.value = res.token_version_id;
        form_chk.enc_data.value = res.enc_data;
        form_chk.integrity_value.value = res.integrity_value;
        document.form_chk.submit();
    }

    return (
        <div>
            <form name="form_chk" method="post">
                <input type="hidden" name="m" value="service" />
                <input type="hidden" name="token_version_id" />
                <input type="hidden" name="enc_data" />
                <input type="hidden" name="integrity_value" />
                <PASSBtn onClick={fnPopup}>나이스 본인인증</PASSBtn>
            </form>
        </div>
    );

    // 원래는 form 아래 버튼이 존재
    /*
    return (
        <form name="form_chk" method="post">
            <input type="hidden" name="m" value="service" />
            <input type="hidden" name="token_version_id" value="{{token_version_id}}" />
            <input type="hidden" name="enc_data" value="{{enc_data}}" />
            <input type="hidden" name="integrity_value" value="{{integrity}}" />
            <PASSBtn onClick={fnPopup}>나이스 본인인증</PASSBtn>
        </form>
    );
    */
};

export default NicePassBtn