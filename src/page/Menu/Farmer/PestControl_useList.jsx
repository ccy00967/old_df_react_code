import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Common_Layout from "../../../Component/common_Layout";
import {
  blueColor,
  grayColor,
  GreenColor,
  Icon,
  lightGreenColor,
  RowView,
  RowView2,
  yellowColor,
} from "../../../Component/common_style";
import PagingControl from "../../../Component/UI/PagingControl";
import PerPageControl from "../../../Component/UI/PerPageControl";
import SideMenuBar from "../SideMenuBar";
import PestControl_useListModal from "./Modal/PestControl_useListModal";
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
    &:hover{
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
    background-color: ${GreenColor};
  }
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
  select {
    font-size: 18px;
    font-family: var(--font-Pretendard-Medium);
    background-color: ${lightGreenColor};
    border: 0;
    outline: 0;
    cursor: pointer;
  }
  span {
    width: 6rem;
  }
`;
const TableList = styled(RowView)`
  height: 4rem;
  cursor: pointer;
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
  span.gray {
    background-color: ${grayColor};
    cursor: pointer;
  }
  span.yellow {
  background-color: ${yellowColor};
  cursor: pointer;}
  }
`;

const PestControl_useList = () => {
  const [cnt, setCnt] = useState(0); // 전체 개시글 갯수
  const [perPage, setPerPage] = useState(20); // 페이지당 게시글 갯수 (디폴트:20)
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

  // const [count_매칭중, setCount_매칭중] = useState(12);
  // const [count_작업대기중, setCount_작업대기중] = useState(3);
  // const [count_작업중, setCount_작업중] = useState(3);
  // const [count_작업확인, setCount_작업확인] = useState(13);
  const [filter, setFilter] = useState("");
  const setting_reset = () => setFilter("");
  // const setting_매칭중 = () => setFilter("매칭중");
  // const setting_작업대기중 = () => setFilter("작업대기중");
  // const setting_작업중 = () => setFilter("작업중");
  // const setting_작업확인 = () => setFilter("작업확인");

  // 필터 선택 판별 className
  const isSelect = (menu) => {
    if (filter === menu) return "this";
    return "";
  };
  // 작업확인 버튼 state 판별 className
  const isFinalCheck = (state_btn) => {
    if (state_btn === "확인 완료") return "gray";
    return "blue";
  };

  // 농지 데이터 load
  const [dataList, setDataList] = useState([]);
  // 이건 테스트 데이터
  // const testData = Array(parseInt(perPage)).fill({
  //   name: "김가네벼",
  //   date: "2024.12.12",
  //   company: "홍길동 방제",
  //   addr: "전북특별자치도 김제시 백산읍 공덕 2길",
  //   tel: "010-1010-1010",
  //   state: "매칭중", // 매칭중/작업대기중/작업중/작업확인
  //   state_btn: "최종 확인", //최종 확인 / 확인 완료
  // });
  // const load_API = () => {
  //   // 호출 성공시
  //   setCnt(960);
  //   setDataList(testData);
  // };
  const load_API = async () => {
    // 액세스 토큰과 리프레시 토큰을 갱신하는 함수
    const refreshAccessToken = async () => {
      const userInfo = JSON.parse(localStorage.getItem('User_Credential'));
      const refreshToken = userInfo?.refresh_token;

      const res = await fetch(server+'/user/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        // 액세스 토큰과 리프레시 토큰을 로컬스토리지에 갱신
        userInfo.access_token = data.access;
        localStorage.setItem('User_Credential', JSON.stringify(userInfo));
        return data.access; // 새로운 액세스 토큰 반환
      } else {
        // 리프레시 토큰이 만료되었거나 유효하지 않을 경우 처리
        alert('다시 로그인해주세요'); // 경고창 표시
        localStorage.removeItem('User_Credential'); // 로컬 스토리지에서 정보 제거
        window.location.replace('/'); // 첫 페이지로 리다이렉트
        return null;
      }
    };

    const userInfo = JSON.parse(localStorage.getItem('User_Credential'));
    let accessToken = userInfo?.access_token;

    // 첫 번째 API 호출
    let res = await fetch(server+"/farmrequest/requests/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // 401 에러가 발생하면 리프레시 토큰으로 액세스 토큰 갱신 후 다시 시도
    if (res.status === 401) {
      accessToken = await refreshAccessToken();
      if (accessToken) {
        // 새로운 액세스 토큰으로 다시 시도
        res = await fetch(server+"/farmrequest/requests/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(res);
      }
    }

    // 응답이 성공했을 때 데이터 처리
    if (res.ok) {
      const data = await res.json();
      setCnt(data.length); // 전체 게시글 수 설정
      setDataList(data); // 데이터 목록 설정
      // console.log(data);
    } else {
      console.error('데이터 로드 실패');
    }
  };
  useEffect(() => {
    load_API();
  }, [currentPage, perPage]);

  //필터 로직
  const filterData = () => {
    if (!dataList || dataList.length === 0) {
      return [];  // data가 undefined 또는 빈 배열일 때 빈 배열 반환
    }
    if (filter === 0) {
      return dataList.filter((item) => item.exterminateState === 0);
    }
    else if (filter === 1) {
      return dataList.filter(item => item.exterminateState === 1);
    }
    else if (filter === 2) {
      return dataList.filter(item => item.exterminateState === 2);
    }
    else if (filter === 3) {
      return dataList.filter(item => item.exterminateState === 3);
    }
    else {
      return dataList;
    }
  };

  // 필터 후 카운트 로직
  const getcountlength = (filterType) => {
    if (filterType === 0) {
      return dataList.filter(item => item.exterminateSate === 0).length;
    }
    else if (filterType === 1) {
      return dataList.filter(item => item.exterminateSate === 1).length;
    } else if (filterType === 2) {
      return dataList.filter(item => item.exterminateSate === 2).length;
    } else if (filterType === 3) {
      return dataList.filter(item => item.exterminateSate === 3).length;
    }
    return dataList.length;
  };


  const refund_API = () => {
    alert("환불되었습니다.");
  };
  const final_check_API = (state_btn) => {
    if (state_btn === "확인 완료") {
      return;
    }
    alert("최종 확인 되었습니다.");
  };

  // 클릭시 열리는 모달
  const ModalRef = useRef();
  const openModal = (data) => {
    ModalRef.current.visible(data);
    console.log(data);
  };

  return (
    <Common_Layout>
      <RowView className="top">
        <SideMenuBar mainmenu={"방제"} submenu={"방제이용목록"} />

        <ContentArea>
          <RowView2 className="title">
            방제이용목록
            <Icon
              onClick={setting_reset}
              src={require("../../../img/icon_reset.png")}
            />
          </RowView2>

          <FilterBox>
            <div className={isSelect("매칭중")} onClick={() => setFilter(0)}>
              매칭중 ({getcountlength(0)})
            </div>
            <span>▶︎</span>
            <div
              className={isSelect("작업대기중")} onClick={() => setFilter(1)}>
              작업대기중({getcountlength(1)})
            </div>
            <span>▶︎</span>
            <div className={isSelect("작업중")} onClick={() => setFilter(2)}>
              작업중({getcountlength(2)})
            </div>
            <span>▶︎</span>
            <div className={isSelect("작업확인")} onClick={() => setFilter(3)}>
              작업확인({getcountlength(3)})
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
                <option value={""}>신청일자</option>
                <option value={"오름차순"}>오름차순</option>
                <option value={"내림차순"}>내림차순</option>
              </select>
            </div>
            <div>방제업체</div>
            <div>업체전화번호</div>
            <div className="addr">농지주소</div>
            <div>상태</div>
            {/* {filter !== "작업대기중" && filter !== "작업중" && <span />} */}
          </TableHeader>

          {filterData().map((data, idx) => {
            // 테스트용 state
            // const testState =
            //   filter !== ""
            //     ? filter
            //     : (idx + 1) % 3 === 0
            //       ? "매칭중"
            //       : (idx + 1) % 2 === 0
            //         ? "작업대기중"
            //         : "작업확인";
            // const testState_btn =
            //   idx === 0 || idx === 1 ? "확인 완료" : "최종 확인";

            // 필터가 작업대기중도, 작업중도 아니라면 버튼 보여줌
            // const isBtnShow = filter !== "작업대기중" && filter !== "작업중";

            return (
              <TableList
                key={idx}
                className={(idx + 1) % 2 === 0 ? "x2" : ""}
                onClick={() => openModal(data)}
              >
                <div>{data.landInfo.landNickName}</div>
                <div>{data.landInfo.lastUpdtDt}</div>
                <div>{data.exterminatorinfo != null ? data.exterminatorinfo.name : ""}</div>
                <div>{data.exterminatorinfo != null ? data.exterminatorinfo.phone_number : ""}</div>
                <div className="addr">{data.landInfo.address.jibunAddress}</div>
                <div>{data.exterminateSate}</div>


                <BtnArea>
                  {data.exterminateSate === 0 ? (
                    <span className="yellow">
                      매칭 중
                    </span>
                  ) : (
                    data.exterminateSate === 1 ? (
                      <span className="green" >
                        작업 대기
                      </span>
                    ) : (
                      data.exterminateSate === 2 ? (
                        <span className="blue" >
                          작업 중
                        </span>
                      ) : (
                        data.exterminateSate === 3 && (
                          <span className="gray">
                            작업 완료
                          </span>
                        )
                      )
                    ))}
                </BtnArea>

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

        <PestControl_useListModal ref={ModalRef} />
      </RowView>
    </Common_Layout>
  );
};

export default PestControl_useList;
