import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import styled from "styled-components";
import {
    BackgroundArea,
    GreenColor,
    hoverGreen,
    Icon,
    lightGreenColor,
    RowView2,
} from "../../../../Component/common_style";
import noScroll from "../../../../Component/function/noScroll";
import { server } from "../../../url";

const ModalBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 28rem;
  padding: 1.5rem;
  background-color: white;
  border-radius: 8px;
`;

const PASSBtn = styled.div`
  padding: 1rem 0rem;
  text-align: center;
  font-family: var(--font-Pretendard-SemiBold);
  color: ${GreenColor};
  background-color: ${lightGreenColor};
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #c4e6d2;
  }
`;

const Btn = styled.div`
  padding: 1rem 0rem;
  margin: 2rem 0 1rem 0;
  text-align: center;
  font-family: var(--font-Pretendard-SemiBold);
  color: white;
  background-color: ${GreenColor};
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${hoverGreen};
  }
`;

const NicePassModal = forwardRef((props, ref) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [tokenVersionId, setTokenVersionId] = useState("");
    const [encData, setEncData] = useState("");
    const [integrityValue, setIntegrityValue] = useState("");

    // 모달 제어 함수
    useImperativeHandle(ref, () => ({
        openModal: () => setModalOpen(true),
        closeModal: () => setModalOpen(false),
    }));

    noScroll(modalOpen);

    const requestNicePass = async () => {
        try {
            const response = await fetch(server + "/validation/callnicepass/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    returnURL: window.location.origin + "/SignUp",
                }),
            });

            const data = await response.json();

            if (data) {
                // 서버로부터 받은 데이터를 설정
                setTokenVersionId(data.token_version_id);
                setEncData(data.enc_data);
                setIntegrityValue(data.integrity_value);

                // 받은 데이터를 사용해 표준창을 바로 열기
                openNicePassWindow(data);
            }
        } catch (error) {
            console.error("본인인증 요청 실패:", error);
        }
    };

    // 표준창 열기
    const openNicePassWindow = (data) => {
        const { token_version_id, enc_data, integrity_value } = data;

        const form = document.forms.form_chk;
        //window.open('', '_self', 'width=480, height=812, top=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
        //console.log(this.box)

        document.form.action = "https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb";
        document.form.target = "nicepass";
        document.form.token_version_id.value = token_version_id;
        document.form.enc_data.value = enc_data;
        document.form.integrity_value.value = integrity_value;
        document.form.submit();
    };

    // 본인인증 완료 후 처리
    const validateSuccess = async () => {
        const form = document.forms.form_chk;

        const response = await fetch(server + "/validation/nicepasscallback/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                token_version_id: tokenVersionId,
                enc_data: encData,
                integrity_value: integrityValue,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            // 부모 컴포넌트에 본인인증 성공 데이터 전달
            props.onSuccess(data); // 인증 완료 후 데이터 전달
            setModalOpen(false);
        } else {
            console.error("본인인증 실패");
        }
    };

    return (
        modalOpen && (
            <BackgroundArea>
                <ModalBox name = "nicepass">
                    <RowView2 className="end">
                        <Icon
                            className="pointer"
                            onClick={() => setModalOpen(false)}
                            src={require("../../../../img/icon_close.png")}
                        />
                    </RowView2>

                    <h2>본인인증</h2>
                    <PASSBtn onClick={requestNicePass}>나이스 본인인증 요청</PASSBtn>

                    <form name="form_chk" method="post">
                        <input type="hidden" name="token_version_id" value={tokenVersionId} />
                        <input type="hidden" name="enc_data" value={encData} />
                        <input type="hidden" name="integrity_value" value={integrityValue} />
                    </form>

                    <Btn onClick={openNicePassWindow}>본인인증 창 열기</Btn>
                    <Btn onClick={validateSuccess}>본인인증 완료</Btn>
                </ModalBox>
            </BackgroundArea>
        )
    );
});

export default NicePassModal;
