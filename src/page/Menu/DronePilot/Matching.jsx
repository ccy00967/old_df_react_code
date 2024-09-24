import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Common_Layout from "../../../Component/common_Layout";
import {
  blueColor,
  CenterView,
  CheckBox,
  lightBlueColor,
  redColor,
  RowView,
  RowView2,
} from "../../../Component/common_style";
import PagingControl from "../../../Component/UI/PagingControl";
import SideMenuBar from "../SideMenuBar";

const TextSemiBold = styled.div`
  font-size: ${(props) => `${props.$size || 16}px`};
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
`;
const ContentArea = styled.div`
  flex: 1;
  padding: 2rem;
  border-left: 1px solid #f0f0f0;
  div.title > img {
    margin-left: 5px;
    cursor: pointer;
  }
`;
const FilterBox = styled(RowView2)`
  margin-top: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #f0f0f0;
  select {
    width: 15rem;
    padding: 1rem 0rem;
    margin-right: 1rem;
    text-align: center;
    font-size: 20px;
    color: #8e8e8e;
    outline: 0;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    cursor: pointer;
  }
`;
const SearchBox = styled.input`
  box-sizing: border-box;
  padding: 0.8rem 1rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  width: 25rem;
  font-size: 16px;
  outline: 0;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  &:focus {
    border: 1px solid #454545;
  }
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const Content = styled(RowView)`
  div.table {
    flex: 1;
  }
`;
const TableHeader = styled(RowView)`
  height: 3.8rem;
  background-color: ${lightBlueColor};
  font-size: 18px;
  font-family: var(--font-Pretendard-Medium);
  div {
    text-align: center;
    flex: 1;
  }
  div.long {
    flex: 2;
  }
  select {
    font-size: 18px;
    font-family: var(--font-Pretendard-Medium);
    background-color: ${lightBlueColor};
    border: 0;
    outline: 0;
    cursor: pointer;
  }
  input {
    margin-left: 2rem;
  }
`;
const TableList = styled(RowView)`
  height: 3.8rem;
  &.x2 {
    background-color: #f8f8f8;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
  }
  div {
    text-align: center;
    flex: 1;
  }
  div.long {
    flex: 2;
  }
  input {
    margin-left: 2rem;
  }
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
const Bill = styled(RowView)`
  box-sizing: border-box;
  width: 26rem;
  height: 42.5rem;
  padding: 1rem;
  margin-left: 1rem;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  div.btn {
    padding: 3rem 0.4rem;
    font-size: 14px;
    color: #555555;
    background-color: #f0f0f0;
    border-radius: 5px;
    box-shadow: 0px 0px 4px #c6c6c6;
    cursor: pointer;
  }
  div.content {
    box-sizing: border-box;
    width: 100%;
    padding: 1rem;
  }
`;
const Btn = styled.div`
  margin-top: 2rem;
  padding: 0.8rem 0rem;
  font-family: var(--font-Pretendard-SemiBold);
  text-align: center;
  color: white;
  background-color: ${blueColor};
  border-radius: 8px;
  cursor: pointer;
`;

const Matching = () => {
  const [cnt, setCnt] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // 단계별 주소찾기 accessToken
  const [sgisapiAccessToken, setSgisapiAccessToken] = useState("");

  // 단계별 주소 찾기 AccessToken 발급받기버튼
  const sgisapiAccessTokenFunc = async () => {
    const res = await fetch("https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json?consumer_key=a3d30c1dbf844d2596f6&consumer_secret=be8aac1489a6442ea2c4", {
      method: 'GET',
      //headers: [["Content-Type", 'application/json']],
      //credentials: 'include',
      // body: JSON.stringify({
      //   consumer_key: "a3d30c1dbf844d2596f6",
      //   consumer_secret: "be8aac1489a6442ea2c4"
      // }),
    })
      .then((res) => { return res.json(); })
      .then((data) => {
        return data
      });

    console.log(res)
    setSgisapiAccessToken(res.accessToken)
  }


  // 농지 데이터 load
  const [dataList, setDataList] = useState([]);
  // 이건 테스트 데이터
  const testData = Array(parseInt(perPage)).fill({
    name: "김가네벼",
    addr: "전북특별자치도 김제시 백산읍 공덕 2길",
    area: "20,000평/44,233.092m²",
    plant: "옥수수",
    pesticide: "튼튼농약",
  });
  const load_API = () => {
    // 호출 성공시
    setCnt(960);
    setDataList(testData);
  };
  useEffect(() => {
    load_API();
  }, [currentPage, perPage]);

  // 선택 게시글
  const [seqList, setSeqList] = useState([]);
  const selectSeq = (seq) => {
    if (seqList.includes(seq)) {
      setSeqList(seqList.filter((item) => item !== seq));
    } else {
      if (seqList.length < 10) {
        setSeqList([...seqList, seq]);
      }
    }
  };
  const all_selectSeq = () => {
    alert("api 연결먼저");
    return;
    // 서버에서 받은 데이터 목록에서 seq 추출
    const seqList = dataList.filter((item) => dataList.seq);
    setSeqList(seqList);
  };

  // 신청정보 seq
  const [see_seq, setSee_Seq] = useState(0);
  const setting_pre = () => {
    if (see_seq !== 0) {
      setSee_Seq(see_seq - 1);
    }
  };
  const setting_next = () => {
    if (see_seq + 1 !== seqList.length) {
      setSee_Seq(see_seq + 1);
    }
  };
  useEffect(() => {
    setSee_Seq(0);
  }, [seqList]);

  return (
    <Common_Layout minWidth={1400}>
      <RowView className="top">
        <SideMenuBar mainmenu={"방제/농지분석"} submenu={"거래매칭"} />

        <ContentArea>
          <TextSemiBold $size={28}>거래매칭</TextSemiBold>
          <Btn onClick={sgisapiAccessTokenFunc}>단계별 주소조회 AccessToken 발급받기</Btn>
          <FilterBox>
            <select>
              <option value={"1"}>시/도</option>
              <option value={"2"}>서울</option>
              <option value={"3"}>도쿄</option>
            </select>
            <select>
              <option value={""}>시/군/구</option>
            </select>
            <select>
              <option value={""}>읍/면/동</option>
            </select>
          </FilterBox>

          <SearchBox
            type={"number"}
            placeholder="원하시는 묶음의 숫자를 입력해주세요."
          />

          <Content className="top">
            <div className="table">
              <TableHeader>
                <CheckBox
                  type={"checkbox"}
                  $color={"#555555"}
                  onClick={all_selectSeq}
                />
                <div>농지별명</div>
                <div className="long">
                  <select>
                    <option value={""}>농지주소</option>
                  </select>
                </div>
                <div>면적</div>
                <div>작물</div>
                <div>
                  <select>
                    <option value={""}>농약</option>
                    <option value={"오름차순"}>오름</option>
                    <option value={"내림차순"}>내림</option>
                  </select>
                </div>
              </TableHeader>

              {dataList.map((data, idx) => {
                return (
                  <TableList
                    key={idx}
                    className={(idx + 1) % 2 === 0 ? "x2" : ""}
                  >
                    <CheckBox
                      type={"checkbox"}
                      $color={"#555555"}
                      onClick={() => selectSeq(idx)}
                    />
                    <div>{data.name}</div>
                    <div className="long">{data.addr}</div>
                    <div className="long">{data.area}</div>
                    <div>{data.plant}</div>
                    <div>{data.pesticide}</div>
                  </TableList>
                );
              })}

              <PagingControl
                cnt={cnt}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                perPage={perPage}
              />
            </div>

            {seqList.length !== 0 && (
              <Bill>
                <div className="btn" onClick={setting_pre}>
                  ◀︎
                </div>
                <div className="content">
                  <CenterView style={{ marginBottom: "2rem" }}>
                    <TextSemiBold $size={22}>신청정보</TextSemiBold>
                    <div style={{ color: "gray" }}>
                      ({see_seq + 1}/{seqList.length})
                    </div>
                  </CenterView>

                  <DataRow>
                    <TextMedium>이ㅤㅤ름</TextMedium>
                    <div className="gray">홍길동</div>
                  </DataRow>
                  <DataRow>
                    <TextMedium>전화번호</TextMedium>
                    <div className="gray">010-0101-1010</div>
                  </DataRow>

                  <Hr />

                  <DataRow>
                    <TextMedium>거래방식</TextMedium>
                    <div className="gray">일반거래</div>
                  </DataRow>
                  <DataRow>
                    <TextMedium>농ㅤㅤ지</TextMedium>
                    <div className="gray">김가네벼</div>
                  </DataRow>
                  <DataRow>
                    <TextMedium className="letter">평단가</TextMedium>
                    <div className="gray">직접입력</div>
                  </DataRow>
                  <DataRow>
                    <TextMedium className="letter">마감일</TextMedium>
                    <div className="gray">8/30</div>
                  </DataRow>
                  <DataRow>
                    <TextMedium>사용농약</TextMedium>
                    <RowView2 className="wrap top" style={{ flex: 1 }}>
                      <div className="gray_w">튼튼농약</div>
                    </RowView2>
                  </DataRow>

                  <Hr />

                  <DataRow>
                    <TextMedium className="auto">
                      개별 방제대금(받으실 돈)
                    </TextMedium>
                    <div className="gray">360,000원</div>
                  </DataRow>
                  <DataRow>
                    <TextMedium className="auto">서비스 이용금액</TextMedium>
                    <div className="gray">10,000원</div>
                  </DataRow>

                  <Hr className="black" />

                  <RowView>
                    <TextSemiBold $fontsize={20}>
                      총 방제대금(받으실 돈)
                    </TextSemiBold>
                    <TextMedium className="auto" $fontsize={20} $color={true}>
                      360,000원
                    </TextMedium>
                  </RowView>
                  <RowView>
                    <TextSemiBold $fontsize={20}>
                      총<span style={{ color: blueColor }}> {4}</span>건 서비스
                      이용금액
                    </TextSemiBold>
                    <TextMedium className="auto" $fontsize={20} $color={true}>
                      10,000원
                    </TextMedium>
                  </RowView>

                  <Btn>결제하기</Btn>
                </div>

                <div className="btn" onClick={setting_next}>
                  ▶︎
                </div>
              </Bill>
            )}
          </Content>
        </ContentArea>
      </RowView>
    </Common_Layout>
  );
};

export default Matching;
