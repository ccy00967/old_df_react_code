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
import GWNaverMap from "../../../../Component/naver_maps/GWNaverMaps";
import { globalSearchAddressToCoordinate } from "../../../../Component/naver_maps/GWNaverMaps";



const GWNaverMaps = styled.div`
  width: 400px;
  height: 400px;
  margin-top: 1rem;
  border: 1px solid #f0f0f0;
  `;

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

const AddressModal = ({ isOpen, closeAddrModal }) => {
  const [farmlandAddr, setHomeAddr] = useState("");
  const [searchAddr, setSearchAddr] = useState([]);

  const search_addr_API = () => {
    if (!farmlandAddr) {
      return alert("농지 주소를 입력하세요.");
    }

    if (globalSearchAddressToCoordinate) {
      globalSearchAddressToCoordinate(farmlandAddr);
      // Naver Map API를 통해 주소 검색
    } else {
      alert("지도가 아직 로드되지 않았습니다.");
    }
  };
  //네이버 지도 정보 들어올것들 입력하기

  noScroll(isOpen);

  const info_push = () => {
    //넘어갈 정보들 입력
    closeAddrModal()
  };
  return (
    <BackgroundArea style={isOpen ? {} : { display: "none" }}>
      <ModalBox>
        <RowView2 className="end">
          <Icon
            className="pointer"
            onClick={closeAddrModal}
            src={require("../../../../img/icon_close.png")}
          />
        </RowView2>

        <CenterView>
          <TextSemiBold className="title" $fontsize={22}>
            네이버 지도 API
            <GWNaverMaps>
              <GWNaverMap setValue={setSearchAddr} />
            </GWNaverMaps>
            <InputBox
              style={{ width: "100%", margin: "1rem 0 1rem 0", padding: '1rem 0rem', textAlign: 'left' }}
              placeholder="  자택 주소를 입력해 주세요."
              value={farmlandAddr}
              onChange={(e) => setHomeAddr(e.target.value)}
            />
            <Btn onClick={search_addr_API}>주소 검색</Btn>
          </TextSemiBold>
        </CenterView>

        <Btn onClick={info_push}>입력완료</Btn>
      </ModalBox>
    </BackgroundArea>
  );
};

export default AddressModal