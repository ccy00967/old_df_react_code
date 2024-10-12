import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Common_Layout from "../../../Component/common_Layout";
import {
  blueColor,
  GreenColor,
  Icon,
  lightBlueColor,
  RowView,
  RowView2,
} from "../../../Component/common_style";
import PagingControl from "../../../Component/UI/PagingControl";
import PerPageControl from "../../../Component/UI/PerPageControl";
import SideMenuBar from "../SideMenuBar";
import { server } from "../../url";

const ContentArea = styled.div`
  flex: 1;
  padding: 2rem;
  border-left: 1px solid #f0f0f0;
  div.title {
    font-size: 28px;
    font-family: var(--font-Pretendard-SemiBold);
  }
  div.title > img {
    margin-left: 5px;
    cursor: pointer;
  }
`;
const FilterBox = styled(RowView)`
  margin: 2rem 0rem;
  div {
    flex: 1;
    padding: 1rem 0rem;
    text-align: center;
    font-size: 20px;
    color: #8e8e8e;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      background-color: #f0f0f0;
    }
  }
  span {
    color: #d8d8d8;
    margin: 0rem 1rem;
  }
  div.this {
    font-family: var(--font-Pretendard-SemiBold);
    color: white;
    background-color: ${blueColor};
  }
`;
const TableHeader = styled(RowView)`
  height: 4rem;
  margin-top: 0.5rem;
  background-color: ${lightBlueColor};
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
    width: 6rem;
  }
  select {
    background-color: ${lightBlueColor};
    font-size: 18px;
    font-family: var(--font-Pretendard-Medium);
    outline: 0;
    border: 0;
    cursor: pointer;
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
const BtnArea = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6rem;
  font-family: var(--font-Pretendard-Medium);
  color: white;
  span {
    padding: 0.4rem 1rem;
    border-radius: 4px;
  }
  span.green {
    background-color: ${GreenColor};
    cursor: pointer;
  }
  span.blue {
    background-color: ${blueColor};
    cursor: pointer;
  }
`;

const Adjustment = () => {
  const [cnt, setCnt] = useState(0); // 전체 개시글 갯수
  const [perPage, setPerPage] = useState(20); // 페이지당 게시글 갯수 (디폴트:20)
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

  // const [count_매칭완료, setCount_매칭완료] = useState(12);
  // const [count_미정산, setCount_미정산] = useState(3);
  // const [count_정산완료, setCount_정산완료] = useState(13);
  const [filter, setFilter] = useState([]);
  const setting_reset = () => setFilter("");
  // const setting_매칭완료 = () => setFilter("매칭완료");
  // const setting_미정산 = () => setFilter("미정산");
  // const setting_정산완료 = () => setFilter("정산완료");

  const getWorkStatus = async () => {
    let length = 0;
    const userInfo = JSON.parse(localStorage.getItem('User_Credential'));
    const accessToken = userInfo.access_token;

    const res = await fetch(server+"/exterminator/workinglist/3/", {
      
      method: 'GET',
      headers: {
        'Content-Type': "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        length = data.length;
        //console.log(length);
        console.log(data)
        setDataList(data)
        //return data
      });
    //console.log(res.endDate)
  }



  useEffect(() => {
    getWorkStatus()
  }, []);


  // 필터 선택 판별 className
  const isSelect = (menu) => {
    if (filter === menu) return "this";
    return "";
  };
  // 정산완료 버튼 state 판별 className
  const isFinalCheck = (state_btn) => {
    if (state_btn === "확인 완료") return "gray";
    return "blue";
  };

  // 농지 데이터 load
  const [dataList, setDataList] = useState([]);
  // 이건 테스트 데이터
  // const testData = Array(parseInt(perPage)).fill({
  //   farmland: "김가네벼",
  //   date: "2020.02.02",
  //   name: "홍길동",
  //   tel: "010-2020-2020",
  //   addr: "전북특별자치도 김제시 백산읍 공덕 2길",
  //   state: "미정산",
  // });
  const filterData = () => {
    if (!dataList || dataList.length === 0) {
      return [];  // data가 undefined 또는 빈 배열일 때 빈 배열 반환
    }
    if (filter === 0) {
      return dataList.filter(item => item.calculation === 0);
    } else if (filter === 1) {
      return dataList.filter(item => item.calculation === 1);
    }
    else {
      return dataList;
    }
  };

  const getcountlength = (filterType) => {
      if (filterType === 0) {
        return dataList.filter(item => item.calculation === 0).length;
      } else if (filterType === 1) {
        return dataList.filter(item => item.calculation === 1).length;
      }
      return dataList.length;
   
    

  };

  const load_API = () => {
    // 호출 성공시
    setCnt(dataList.length);

  };
  useEffect(() => {
    load_API();
  }, [currentPage, perPage]);

  const Fin_API = () => {
    alert("정산완료");
  };
  const Str_API = () => {
    alert("정산대기")
  };


  return (
    <Common_Layout>
      <RowView className="top">
        <SideMenuBar mainmenu={"방제/농지분석"} submenu={"정산"} />

        <ContentArea>
          <RowView2 className="title">
            정산
            <Icon
              onClick={setting_reset}
              src={require("../../../img/icon_reset.png")}
            />
          </RowView2>

          <FilterBox>
            <div className={isSelect("미정산")} onClick={() => setFilter(0)}>
              미정산({getcountlength(0)})
            </div>
            <span>▶︎</span>
            <div className={isSelect("정산완료")} onClick={() => setFilter(1)}>
              정산 완료({getcountlength(1)})
            </div>
          </FilterBox>

          <PerPageControl
            perPage={perPage}
            setPerPage={setPerPage}
            setCurrentPage={setCurrentPage}
          />

          <TableHeader>
            <div>농지별명</div>
            <div>
              <select>
                <option value={""}>수락일자</option>
                <option value={"오름차순"}>오름차순</option>
                <option value={"내림차순"}>내림차순</option>
              </select>
            </div>
            <div>농업인</div>
            <div>농업인 전화번호</div>
            <div className="addr">농지주소</div>
            <div>상태</div>
            {filter !== "정산완료" && <span />}
          </TableHeader>

          {filterData().map((data, idx) => {
            if (data.exterminateState === 3) {
              if (!data || data.length === 0) {
                return [];
              }


              // 테스트용 state

              // 필터가 미정산이 아니라면 버튼 보여줌
              //const isBtnShow = filter !== "정산완료";

              return (
                <TableList key={idx} className={(idx + 1) % 2 === 0 ? "x2" : ""}>
                  <div>{data.landInfo.landNickName}</div>
                  <div>{data.startDate}</div>
                  <div>{data.owner.name}</div>
                  <div>{data.owner.mobileno}</div>
                  <div className="addr">{data.owner.address.jibunAddress}</div>
                  <div>{data.calculation ===0 ?("정산대기"):data.calculation ===1&&("정산완료")}</div>


                  <BtnArea>
                    {data.calculation === 0 ? (
                      <span className="green" onClick={Str_API}>
                        정산대기
                      </span>
                    ) : (data.calculation === 1 && (
                      <span className="blue" onClick={Fin_API}>
                        정산완료
                      </span>
                    ))}
                  </BtnArea>

                </TableList>
              );
            }
          })}

          <PagingControl
            cnt={cnt}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPage={perPage}
          />
        </ContentArea>
      </RowView>
    </Common_Layout>
  );
};

export default Adjustment;
