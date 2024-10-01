import { useEffect, useState } from "react";
import styled from "styled-components";
import Common_Layout from "../../../Component/common_Layout";
import {
  CenterView,
  Icon,
  lightGreenColor,
} from "../../../Component/common_style";
import Component_mapList from "./Component_mapList";

const InsertBox = styled.div`
  flex: 1;
  margin-right: 2rem;
  div.title {
    margin-bottom: 2rem;
    font-size: 28px;
    font-family: var(--font-Pretendard-SemiBold);
  }
`;
const DataBox = styled(CenterView)`
  flex-direction: column;
  padding: 2rem 1rem;
  margin-top: 1rem;
  font-size: 20px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
`;
const TitleBox = styled.div`
  position: relative;
  margin-bottom: 1rem;
  div.subtitle {
    position: relative;
    z-index: 2;
    font-size: 22px;
    font-family: var(--font-Pretendard-SemiBold);
  }
  div.hightLight {
    position: absolute;
    bottom: -25%;
    width: 100%;
    height: 1rem;
    background-color: ${lightGreenColor};
  }
`;

const Farmland_All = () => {
  const [totalArea, setTotalArea] = useState("");
  const [plantRate, setPlantRate] = useState("");
  const [count, setCount] = useState(0);
  const [searchAddr, setSearchAddrr] = useState("");

  // 농지 전체보기 로드
  // const load_API = () => {
  //   setTotalArea("100,000평 / 330578.5m");
  //   setPlantRate("벼 70% / 콩 20% / 고추 10%");
  //   setCount(2);
  // };
  // useEffect(() => {
  //   load_API();
  // }, []);

  const delete_API = async (uuid, loadAPI) => {
    if (window.confirm("삭제하시겠습니까?")) {
      alert("삭제가 완료되었습니다.");


      const userInfo = JSON.parse(localStorage.getItem('User_Credential'));
      const accessToken = userInfo.access_token;

      await fetch(`https://192.168.0.28/customer/landinfo/${uuid}/`, {

        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }).then(() => {
        // 삭제 후 Component_mapList 에서 load_API를 호출하는 삼수
        loadAPI();
      });
    }
  };

  return (
    <Common_Layout>
      <Component_mapList
        mainmenu={"마이페이지"}
        submenu={"농지 전체보기"}
        delete_API={delete_API}
        setSearchAddr={setSearchAddrr}
        // setCount={setCount}
      >
        <InsertBox>
          <div className="title">농지 전체보기</div>

          <DataBox>
            <Icon src={require("../../../img/icon_area.png")} />
            <TitleBox>
              <div className="subtitle">총 면적</div>
              <div className="hightLight" />
            </TitleBox>

            <div>{totalArea}㎡</div>
          </DataBox>
          <DataBox>
            <Icon src={require("../../../img/icon_plant_rate.png")} />
            <TitleBox>
              <div className="subtitle">작물 비율</div>
              <div className="hightLight" />
            </TitleBox>

            <div>{plantRate}</div>
          </DataBox>
          <DataBox>
            <Icon src={require("../../../img/icon_area_count.png")} />
            <TitleBox>
              <div className="subtitle">개수</div>
              <div className="hightLight" />
            </TitleBox>

            <div>{count}필지</div>
          </DataBox>
        </InsertBox>
      </Component_mapList>
    </Common_Layout>
  );
};

export default Farmland_All;
