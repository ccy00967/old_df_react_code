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
import useEscapeKey from "../../../../Component/function/useEscapeKey";

const ModalBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 28rem;
  padding: 1rem 1.5rem 1.5rem 1.5rem;
  margin: auto 0rem;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
`;
const Hr = styled.div`
  width: 100%;
  height: 1px;
  margin: 1.2rem 0rem;
  background-color: #f0f0f0;
  &.black {
    background-color: #1d1d1d;
  }
`;
const DataRow = styled(RowView2)`
  align-items: flex-start;
  margin-top: 0.7rem;
  div {
    width: 4rem;
  }
  div.letter {
    letter-spacing: 7px;
  }
  div.gray {
    flex: 1;
    margin-left: 1rem;
    color: #555555;
  }
  div.gray_w {
    width: auto;
    margin-left: 1rem;
    color: #555555;
  }
  div.bold {
    width: auto;
    margin-left: 1rem;
    color: #555555;
    font-family: var(--font-Pretendard-Bold);
  }
`;
const TextSemiBold = styled.div`
  &.title {
    margin-bottom: 2rem;
  }
  font-size: ${(props) => `${props.$fontsize || 16}px`};
  font-family: var(--font-Pretendard-SemiBold);
`;
const TextMedium = styled.div`
  color: ${(props) => (props.$color ? redColor : "#1d1d1d")};
  font-size: ${(props) => `${props.$fontsize || 16}px`};
  font-family: var(--font-Pretendard-Medium);
  width: 4rem;
  &.auto {
    width: auto;
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

const TmpNicepassModal = ({ isOpen, closeModal, nicepass_data }) => {
    //const [modalOpen, setModalOpen] = useState(false);
    const [data, setData] = useState({});

    // useImperativeHandle(ref, () => ({
    //     visible: (data) => {
    //         data ? setData(data) : setData({});
    //         setModalOpen(true);
    //     },
    // }));
    // 모달 open시 스크롤방지F
    noScroll(isOpen);

    // 결제하기
    const info_push = () => {
        console.log(data);
        nicepass_data(data);
    };

    // 닫기
    // const closeModal = () => {
    //     setModalOpen(false);
    // };
    // useEscapeKey(closeModal);

    return (
        <BackgroundArea style={isOpen ? {} : { display: "none" }}>
            <ModalBox>
                <RowView2 className="end">
                    <Icon
                        className="pointer"
                        onClick={closeModal}
                        src={require("../../../../img/icon_close.png")}
                    />
                </RowView2>

                <CenterView>
                    <TextSemiBold className="title" $fontsize={22}>
                        임시 본인인증 창 - 나이스 PASS 표준창 예정
                    </TextSemiBold>
                </CenterView>

                <div className="title">이름</div>
                <RowView>
                    <InputBox
                        placeholder="이름을 입력해주세요."
                        //value={id}
                        onChange={(name) => { setData({ name: name }) }}
                    //className={alert_id}
                    />
                </RowView>

                <div className="title">생년월일</div>
                <RowView>
                    <InputBox
                        placeholder="year-month-day."
                        //value={id}
                        onChange={(birth) => { setData({ birth: birth }) }}
                    //className={alert_id}
                    />
                </RowView>

                <div className="title">nationalinfo</div>
                <RowView>
                    <InputBox
                        placeholder="nationalinfo를 입력해주세요."
                        //value={id}
                        onChange={(nationalinfo) => { setData({ nationalinfo: nationalinfo }) }}
                    //className={alert_id}
                    />
                </RowView>

                <div className="title">통신사</div>
                <RowView>
                    <InputBox
                        placeholder="mobileco를 입력해주세요."
                        //value={id}
                        onChange={(mobileco) => { setData({ mobileco: mobileco }) }}
                    //className={alert_id}
                    />
                </RowView>

                <div className="title">휴대전화</div>
                <RowView>
                    <InputBox
                        placeholder="phone_number를 입력해주세요."
                        //value={id}
                        onChange={(phone_number) => { setData({ phone_number: phone_number }) }}
                    //className={alert_id}
                    />
                </RowView>

                <Btn onClick={info_push}>입력완료</Btn>
            </ModalBox>
        </BackgroundArea>
    );
};

export default TmpNicepassModal