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


// 나이스 본인인증 순서
// 백엔드에 필요정보 요청 -> form에 들어갈 3가지: token_version_id, enc_data, integrity
// 받으면 form에 넣어서 nice표준창 호출하기 -> 호출 완료

const NicePassBtn = ({ isOpen, closeModal, setNicepass }) => {
    const [token_version_id, settoken_version_id] = useState("");
    const [enc_data, setenc_data] = useState("");
    const [integrity_value, setintegrity_value] = useState("");

    //const [modalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [birth, setBirth] = useState("");
    const [gender, setGender] = useState("");
    const [nationalinfo, setNationalinfo] = useState("");
    const [mobileco, setMobileco] = useState("");
    const [phone_number, setPhone] = useState("");
    noScroll(isOpen);

    // useImperativeHandle(ref, () => ({
    //     visible: (data) => {
    //         data ? setData(data) : setData({});
    //         setModalOpen(true);
    //     },
    // }));
    // 모달 open시 스크롤방지
    // 정보넣기
    const info_push = () => {
        // nice_pass_model["name"] = name
        // nice_pass_model["birth"] = birth
        // nice_pass_model["gender"] = gender
        // nice_pass_model["nationalinfo"] = nationalinfo
        // nice_pass_model["mobileco"] = mobileco
        // nice_pass_model["phone_number"] = phone_number

        console.log(nice_pass_model);

        setNicepass(nice_pass_model);

        closeModal()
    };

    // 표준창을 띄우기
    const fnPopup = async () => {
        // 표준창 호출에 필요한 정보를 백엔드에서 가져오기
        const res = await fetch('https://192.168.0.28:443/validation/callnicepass/', {
            method: 'GET',
            headers: [["Content-Type", 'application/json'],
            ],
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                settoken_version_id(data.token_version_id)
                setenc_data(data.enc_data)
                setintegrity_value(data.integrity_value)
                return data
            })

        console.log(res)

        const nicePopUpWindow = window.open('', 'popupChk', 'width=480, height=812, top=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
        document.form_chk.action = "https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb";
        document.form_chk.target = "popupChk";
        document.form_chk.submit();

        console.log(nicePopUpWindow)
    }

    // 닫기
    // const closeModal = () => {
    //     setModalOpen(false);
    // };
    // useEscapeKey(closeModal);

    // 이게 작동하나?
    return (
        <div>
            <form name="form_chk" method="post">
                <input type="hidden" name="m" value="service" />
                <input type="hidden" name="token_version_id" value={token_version_id} />
                <input type="hidden" name="enc_data" value={enc_data} />
                <input type="hidden" name="integrity_value" value={integrity_value} />
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