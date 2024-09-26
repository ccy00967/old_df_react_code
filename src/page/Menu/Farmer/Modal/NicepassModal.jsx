import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import styled from "styled-components";
import {
    BackgroundArea,
    CenterView,
    GreenColor,
    hoverGreen,
    Icon,
    redColor,
    RowView,
    RowView2,
} from "../../../../Component/common_style";
import noScroll from "../../../../Component/function/noScroll";


const nice_pass_model = {
    name: "",
    birth: "",
    nationalinfo: "",
    mobileco: "",
    phone_number: "",
}

const NicepassModal = ({ isOpen, closeModal, setNicepass }) => {
    //const [modalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [birth, setBirth] = useState("");
    const [gender, setGender] = useState("");
    const [nationalinfo, setNationalinfo] = useState("");
    const [mobileco, setMobileco] = useState("");
    const [phone_number, setPhone] = useState("");

    // useImperativeHandle(ref, () => ({
    //     visible: (data) => {
    //         data ? setData(data) : setData({});
    //         setModalOpen(true);
    //     },
    // }));
    // 모달 open시 스크롤방지
    noScroll(isOpen);

    useEffect(() => {
        const openNiceWindow = async () => {
            const { form } = document;
            //const left = screen.width / 2 - 500 / 2;
            //const top = screen.height / 2 - 800 / 2;
            const option = `status=no, menubar=no, toolbar=no, resizable=no, width=500, height=600`;
            const returnUrl = `${"nice 인증 완료 후 태울 API 주소가 들어갑니다"}`

            // 위에서 언급했던 token api가 요청 데이터를 암호화한 후 표준창 호출에 필요한 데이터를 응답해준다.
            //const res = await API.get(`${"api주소가 들어갑니다"}`, { returnUrl });
            const res = await "위에꺼로 바꾸기"

            if (form && res.data) {
                const { enc_data, integrity_value, token_version_id, req_no } = res.data.result;
                window.open('', 'nicePopup', option);
                form.target = 'nicePopup';
                form.enc_data.value = enc_data;
                form.token_version_id.value = token_version_id;
                form.integrity_value.value = integrity_value;
                form.submit();
            }
        };
    }, [])

    // 결제하기
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

    return (
        <form name="form" id="form" action="https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb">
            <input type="hidden" id="m" name="m" value="service" />
            <input type="hidden" id="token_version_id" name="token_version_id" value="" />
            <input type="hidden" id="enc_data" name="enc_data" />
            <input type="hidden" id="integrity_value" name="integrity_value" />
        </form>
    );
};

export default NicepassModal