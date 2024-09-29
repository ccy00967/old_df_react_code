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

// 표준창을 띄우기
async function fnPopup(setEncData) {

    // 표준창 호출에 필요한 정보를 백엔드에서 가져오기
    const res = await fetch('https://192.168.0.28:443/validation/callnicepass/', {
        method: 'GET',
        headers: [["Content-Type", 'application/json'],
        ],
        credentials: "include",
    })
        .then((res) => res.json())
    //.then((data) => data)

    setEncData(res)
    console.log(res)

    window.open('', 'popupChk', 'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
    document.form_chk.action = "https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb";
    document.form_chk.target = "popupChk";
    document.form_chk.submit();
}
// 나이스 본인인증 순서
// 백엔드에 필요정보 요청 -> form에 들어갈 3가지: token_version_id, enc_data, integrity
// 받으면 form에 넣어서 nice표준창 호출하기 -> 호출 완료

const NicePassBtn = ({ isOpen, closeModal, setNicepass }) => {
    //const [modalOpen, setModalOpen] = useState(false);
    const [enc_data, setEncData] = useState("");

    const [name, setName] = useState("");
    const [birth, setBirth] = useState("");
    const [gender, setGender] = useState("");
    const [nationalinfo, setNationalinfo] = useState("");
    const [mobileco, setMobileco] = useState("");
    const [phone_number, setPhone] = useState("");
    //noScroll(isOpen);

    // useImperativeHandle(ref, () => ({
    //     visible: (data) => {
    //         data ? setData(data) : setData({});
    //         setModalOpen(true);
    //     },
    // }));
    // 모달 open시 스크롤방지
    // 정보넣기
    const info_push = () => {
        nice_pass_model["name"] = name
        nice_pass_model["birth"] = birth
        nice_pass_model["gender"] = gender
        nice_pass_model["nationalinfo"] = nationalinfo
        nice_pass_model["mobileco"] = mobileco
        nice_pass_model["phone_number"] = phone_number

        console.log(nice_pass_model);

        setNicepass(nice_pass_model);

        closeModal()
    };

    // 닫기
    // const closeModal = () => {
    //     setModalOpen(false);
    // };
    // useEscapeKey(closeModal);

    // 이게 작동하나?
    return (
        <div>
            <form name="form_chk" method="post">
                <input type="hidden" name="m" value="checkplusSerivce" />
                <input type="hidden" name="EncodeData" value={enc_data} />
                <PASSBtn onClick={() => { fnPopup(setEncData) }}>나이스 본인인증</PASSBtn>
            </form>
        </div>
    );
};

export default NicePassBtn