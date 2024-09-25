import { useState } from "react";
import styled from "styled-components";
import Common_Layout from "../../../Component/common_Layout";
import {
  CheckBox,
  GreenColor,
  hoverGreen,
  RowView2
} from "../../../Component/common_style";
import Component_mapList from "./Component_mapList";
import { globalSearchAddressToCoordinate } from "../../../Component/naver_maps/GWNaverMaps";

const InsertBox = styled.div`
  flex: 1;
  margin-right: 2rem;

  div.title {
    font-size: 28px;
    font-family: var(--font-Pretendard-SemiBold);
  }
  div.subtitle {
    margin-top: 1rem;
    font-family: var(--font-Pretendard-Medium);
  }
  span {
    font-size: 14px;
    color: gray;
  }
`;
const InputBox = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 0.8rem 1rem;
  margin: 0.5rem 0;
  font-size: 16px;
  outline: 0;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  &:focus {
    border: 1px solid ${GreenColor};
  }
`;
const InputDiv = styled(RowView2)`
  flex: 1;
  box-sizing: border-box;
  padding: 0.8rem 1rem;
  margin-top: 0.5rem;
  border: 1px solid;
  border-color: ${(props) =>
    props.$isfocused === "on" ? GreenColor : "#f0f0f0"};
  border-radius: 8px;
  input {
    font-size: 16px;
    width: 75%;
    margin-right: 0.5rem;
    outline: 0;
    border: 0;
  }
  &.smallText {
    font-size: 14px;
    color: gray;
    border: 0;
    margin: 0;
    padding: 0.5rem 1rem;
  }
`;
const Btn = styled.div`
  padding: 1rem;
  margin-top: 1rem;
  font-family: var(--font-Pretendard-SemiBold);
  text-align: center;
  color: white;
  background-color: ${GreenColor};
  border-radius: 8px;
  cursor: pointer;
  &.small {
    margin: 0 0 0 1rem;
    padding: 0.8rem 1rem;
    width: 10rem;
  }
  &:hover {
    background-color: ${hoverGreen};
  }
`;


const Farmland_Insert = () => {
  const [farmlandName, setFarmlandname] = useState("");
  const [farmlandAddr, setFarmlandAddr] = useState("");
  const [farmlandArea, setFarmlandArea] = useState("");
  const [farmlandm2, setFarmlandm2] = useState("");
  const [plant, setPlant] = useState("");
  const [check, setCheck] = useState(false);

  const setting_name = (e) => setFarmlandname(e.target.value);
  const setting_area = (e) => setFarmlandArea(e.target.value);
  const setting_m2 = (e) => setFarmlandm2(e.target.value);
  const setting_plant = (e) => setPlant(e.target.value);
  const setting_check = () => setCheck(!check);

  const postData = {
    address: {
      roadaddress: window.addressInfo.roadAddress,
      jibunAddress: window.addressInfo.jibunAddress,
      englishAddress: window.addressInfo.englishAddress,
      navermapsx: window.addressInfo.x,
      navermapsy: window.addressInfo.y,
      detailAddress: "더미 상세 주소",
    },
    pnu: "더미 Pnu",
    idCodeNm: "더미",
    mnnmSlno: "더미",
    regstrSeCodeNm: "더미",
    lndpclAr: farmlandArea,
    posesnSeCodeNm: "더미",
    cnrsPsnCo: "더미",
    lastUpdtDt: "더미",
    landNickName: farmlandName,
    cropsInfo: plant,
    landOwner: "더미",
    anotherPhoneNum: "더미",
  };
  // 주소 찾기
  const search_addr_API = () => {
    if (!farmlandAddr) {
      return alert("농지 주소를 입력하세요.");
    }

    if (globalSearchAddressToCoordinate) {
      globalSearchAddressToCoordinate(farmlandAddr); // Naver Map API를 통해 주소 검색
    } else {
      alert("지도가 아직 로드되지 않았습니다.");
    }
  };

  // 농지 등록
  const insert_API = async () => {
    const userInfo = JSON.parse(localStorage.getItem('User_info'));
    const accessToken = userInfo?.access;

    const res = await fetch("https://192.168.0.28/customer/lands/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(postData),
    });


    const result = await res.json();
    console.log("Success:", result);

  };

  // 면적 div태그 css
  const [isfocuse_area, setIsfocuse_area] = useState("off");
  const [isfocuse_m2, setIsfocuse_m2] = useState("off");
  const onFocus = () => setIsfocuse_area("on");
  const offFocus = () => setIsfocuse_area("off");
  const onFocus_m2 = () => setIsfocuse_m2("on");
  const offFocus_m2 = () => setIsfocuse_m2("off");

  return (
    <Common_Layout>
      <Component_mapList mainmenu={"마이페이지"} submenu={"농지등록"}>
        <InsertBox>
          <div className="title">농지등록</div>
          <div className="subtitle">농지 별명</div>
          <InputBox
            placeholder="농지 별명을 입력해주세요."
            value={farmlandName}
            onChange={setting_name}
          />

          <div className="subtitle">농지 주소</div>
          <RowView2>
            <InputBox
              placeholder="보유하신 농지 주소를 입력해주세요."
              value={farmlandAddr}
              onChange={(e) => setFarmlandAddr(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  search_addr_API();
                }
              }}
            />
            <Btn className="small" onClick={search_addr_API}>
              주소 찾기
            </Btn>
          </RowView2>

          <div className="subtitle">면적</div>
          <RowView2>
            <InputDiv
              style={{ marginRight: "1rem" }}
              $isfocused={isfocuse_area}
            >
              <input
                value={farmlandArea}
                onChange={setting_area}
                onFocus={onFocus}
                onBlur={offFocus}
              />
              평
            </InputDiv>
            <InputDiv $isfocused={isfocuse_m2}>
              <input
                value={farmlandm2}
                onChange={setting_m2}
                onFocus={onFocus_m2}
                onBlur={offFocus_m2}
              />
              m²
            </InputDiv>
          </RowView2>
          <RowView2>
            <InputDiv className="smallText" style={{ marginRight: "1rem" }}>
              평수를 입력해주세요.
            </InputDiv>
            <InputDiv className="smallText">m²평수를 입력해주세요.</InputDiv>
          </RowView2>

          <div className="subtitle">작물</div>
          <InputBox
            placeholder="작물을 입력해주세요. ex)벼,콩,보리,옥수수"
            value={plant}
            onChange={setting_plant}
          />

          <RowView2
            className="pointer wrap"
            style={{ marginTop: "2rem" }}
            onClick={setting_check}
          >
            <CheckBox type={"checkbox"} checked={check} readOnly />
            본인 토지가 아닌 경우 책임은 등록/신청자에게 있습니다.
            <span> (필수)</span>
          </RowView2>

          <Btn onClick={insert_API}>농지등록</Btn>
        </InsertBox>
      </Component_mapList>
    </Common_Layout>
  );
};

export default Farmland_Insert;
