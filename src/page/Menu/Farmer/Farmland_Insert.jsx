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
import $ from 'jquery';


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
  const [cdtoken, setcdtoken] = useState("");
  const [jibunCd, setJibunCd] = useState("");
  const [adpnu, setPnu] = useState("");
  const [adlndpclAr, setlndpclAr] = useState("");

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
    pnu: adpnu,
    idCodeNm: "더미",
    mnnmSlno: "더미",
    regstrSeCodeNm: "더미",
    lndpclAr: adlndpclAr,
    posesnSeCodeNm: "더미",
    cnrsPsnCo: "더미",
    lastUpdtDt: "더미",
    landNickName: farmlandName,
    cropsInfo: plant,
    landOwner: "더미",
    anotherPhoneNum: "더미",
  };


  //농지 주소 -> PNU 정보 변환
  const get_pnu_api = async () => {
    const digitalTwin = "https://api.vworld.kr/req/search?key=6C934ED4-5978-324D-B7DE-AC3A0DDC3B38"
    $.ajax(
      {
        type: "GET",
        url: digitalTwin + "&request=search" + `&query=${window.addressInfo.jibunAddress}` + "&type=address" + "&category=parcel" + "&format=json",
        dataType: "jsonp",
        success: function (res) {
          //const data = res.json()
          //console.log(data)
          //console.log(res)
          console.log(res.response.result.items)
          setPnu(res.response.result.items[0].id)
        },
        error: function (e) {
          alert(e.responseText);
        }
      });
  };
  // 주소검색으로 농지 제곱미터 받는 api
  const search_area_api = async () => {
    const area_search = "https://api.vworld.kr/ned/data/ladfrlList?key=6C934ED4-5978-324D-B7DE-AC3A0DDC3B38"
    $.ajax(
      {
        type: "POST",
        url: area_search + `&pnu=${adpnu}` +"&format=json",
        dataType: "jsonp",
        success: function (respnu) {
          //const data = res.json()
          //console.log(data)
          //console.log(res)
          setlndpclAr(respnu.ladfrlVOList.ladfrlVOList[0].lndpclAr)
        },
        // 왜인지 모르겠으나 alert로 undefined가 뜨고 있음
        /*error: function (e) {
          alert(e.responseText);
        }*/
      });
  };
  // cd값을 받기 위한 엑세스토큰 발급 API
  const cd_for_accessToken = async () => {
    const acc = await fetch("https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json?consumer_key=fb0450ed86ba405ba3ec&consumer_secret=a7ec04e5c1f8401594d5", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const accres = await acc.json();
    const accessToken = accres.result.accessToken;
    setcdtoken(accessToken);
    return accessToken;
  }
  // 발급받은 토큰으로 주소검색하여 cd값 받기
  const get_cd_api = async (cdAccesstoken) => {
    const cdval = await fetch(`https://sgisapi.kostat.go.kr/OpenAPI3/addr/geocode.json?address=${farmlandAddr}&accessToken=${cdAccesstoken}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const cdres = await cdval.json();
    const addcd = cdres.result.resultdata[0].adm_cd;
    setJibunCd(addcd);
  };
  

  // 주소 찾기
  const search_addr_API = async() => {
    if (!farmlandAddr) {
      return alert("농지 주소를 입력하세요.");
    }

    if (globalSearchAddressToCoordinate) {
      globalSearchAddressToCoordinate(farmlandAddr); // Naver Map API를 통해 주소 검색
    }
  };

  // 농지 등록
  const insert_API = async () => {
    const userInfo = JSON.parse(localStorage.getItem('User_Credential'));
    const accessToken = userInfo.access_token;

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
  //주소찾기를 클릭하면 순차적으로 실행되도록 하는 함수
  const handleSearch = async () => {
    if (!farmlandAddr) {
      return alert("농지 주소를 입력하세요.");
    }
      await search_addr_API();
      const token = await cd_for_accessToken();
      await get_cd_api(token);
      await get_pnu_api();
      await search_area_api();
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

          <Btn className="small" onClick={cd_for_accessToken}>
            cd for accessToken
          </Btn>
          <Btn className="small" onClick={get_cd_api}>
            cd값 가져오기
          </Btn>
          <Btn className="small" onClick={get_pnu_api}>
            vworld PNU로 토지임야 주소, 평수 찾기
          </Btn>
          <Btn className="small" onClick={search_area_api}>
           네이버 주소 찾기
          </Btn>

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
                  handleSearch();
                }
              }}
            />
            <Btn className="small" onClick={handleSearch}>
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
            <InputDiv id="size" className="smallText" style={{ marginRight: "1rem" }}>
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
