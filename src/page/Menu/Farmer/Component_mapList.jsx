import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  CenterView,
  GreenColor,
  hoverGreen,
  hoverRed,
  lightGreenColor,
  lightRedColor,
  redColor,
  RowView
} from "../../../Component/common_style";
import { ScrollToTop_smooth } from "../../../Component/function/ScrollTop";
import PagingControl from "../../../Component/UI/PagingControl";
import PerPageControl from "../../../Component/UI/PerPageControl";
import SideMenuBar from "../SideMenuBar";
import NaverMaps from "../../../Component/naver_maps/NaverMaps";

const ContentArea = styled.div`
  flex: 1;
  padding: 2rem;
  border-left: 1px solid #f0f0f0;
`;
const MapArea = styled(CenterView)`
  flex: 1.5;
  height: 600px;
  margin-top: 3rem;
  background-color: #f0f0f0;
  border-radius: 8px;
`;
const TableHeader = styled(RowView)`
  height: 4rem;
  margin-top: 0.5rem;
  background-color: ${lightGreenColor};
  font-size: 18px;
  font-family: var(--font-Pretendard-Medium);
  div {
    text-align: center;
    flex: 1;
  }
  div.addr {
    flex: 2;
  }
  span {
    opacity: 0;
    cursor: default;
  }
`;
const TableList = styled(RowView)`
  height: 4rem;
  &.x2 {
    background-color: #f8f8f8;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
  }
  div {
    text-align: center;
    flex: 1;
  }
  div.addr {
    flex: 2;
  }
`;
const MiniBtn = styled.span`
  margin: 0rem 1rem;
  padding: 0.4rem 1rem;
  font-family: var(--font-Pretendard-Medium);
  border-radius: 4px;
  cursor: pointer;
  &.delete {
    color: ${redColor};
    background-color: ${lightRedColor};
    &:hover {
      background-color: ${hoverRed};
    }
  }
  &.select {
    color: white;
    background-color: ${GreenColor};
    &:hover {
      background-color: ${hoverGreen};
    }
  }
`;

const Component_mapList = (props) => {
  const mainmenu = props.mainmenu || "";
  const submenu = props.submenu || "";
  const children = props.children || <></>;
  // 농지 전체보기 > 농지삭제 함수
  const delete_API = props.delete_API || null;
  // 방제신청 > 농지선택 함수
  const setSelectFarmland = props.setSelectFarmland || null;

  const [cnt, setCnt] = useState(0); // 전체 개시글 갯수
  const [perPage, setPerPage] = useState(20); // 페이지당 게시글 갯수 (디폴트:20)
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

  // 농지 데이터 load
  const [dataList, setDataList] = useState([]);
  // 이건 테스트 데이터
  const testData = Array(parseInt(perPage)).fill({
    name: "김가네벼",
    addr: "전북특별자치도 김제시 백산읍 공덕 2길",
    area: "2000평/66,112342m²",
    plant: "옥수수",
  });
  const load_API = () => {
    // 호출 성공시
    setCnt(960);
    setDataList(testData);
  };
  useEffect(() => {
    load_API();
  }, [currentPage, perPage]);

  // 방재신청 > 농지선택
  const selectFarmland = (name, addr) => {
    if (setSelectFarmland) {
      const farmland = `${name}(${addr})`;
      setSelectFarmland(farmland);
      ScrollToTop_smooth();
    }
  };

  return (
    <RowView className="top">
      <SideMenuBar mainmenu={mainmenu} submenu={submenu} />

      <ContentArea>
        <RowView className="top">
          {children}

          <MapArea id="map">
            
          </MapArea>
        </RowView>

        <PerPageControl
          perPage={perPage}
          setPerPage={setPerPage}
          setCurrentPage={setCurrentPage}
        />

        <TableHeader>
          <div>농지별명</div>
          <div className="addr">농지주소</div>
          <div>면적</div>
          <div>작물</div>
          {delete_API && <MiniBtn>삭제</MiniBtn>}
          {setSelectFarmland && <MiniBtn>선택</MiniBtn>}
        </TableHeader>

        {dataList.map((data, idx) => {
          return (
            <TableList key={idx} className={(idx + 1) % 2 === 0 ? "x2" : ""}>
              <div>{data.name}</div>
              <div className="addr"> {data.addr}</div>
              <div>{data.area}</div>
              <div>{data.plant}</div>

              {delete_API && (
                <MiniBtn
                  className="delete"
                  onClick={() => delete_API(load_API)}
                >
                  삭제
                </MiniBtn>
              )}
              {setSelectFarmland && (
                <MiniBtn
                  className="select"
                  onClick={() => selectFarmland(data.name, data.addr)}
                >
                  선택
                </MiniBtn>
              )}
            </TableList>
          );
        })}

        <PagingControl
          cnt={cnt}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          perPage={perPage}
        />
      </ContentArea>
    </RowView>
  );
};

export default Component_mapList;
