import { useEffect, useRef, useState, useCallback } from "react";
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
import { requestPayment } from "../../tosspayments/TossPayments_func";
import { server } from "../../url";
import { fetchToken } from "./pilotFetchFunc";


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
const SearchBtn = styled.div`
  width: 8rem;
  padding: 1rem 0rem;
  margin-left: 1rem;
  font-family: var(--font-Pretendard-SemiBold);
  text-align: center;
  color: white;
  background-color: ${blueColor};
  border-radius: 8px;
  cursor: pointer;
`;


const addressDepthServerModel = (json) => {
  return {
    code: json.cd,
    name: json.addr_name,
  };
};




const Matching = ({  }) => {
  const [cnt, setCnt] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [seqList, setSeqList] = useState([]);
  const [token, setToken] = useState(null);
  const [provinces, setProvinces] = useState([]); // 시/도 데이터
  const [cities, setCities] = useState([]); // 시/군/구 데이터
  const [towns, setTowns] = useState([]); // 읍/면/동 데이터
  const [selectedProvince, setSelectedProvince] = useState(""); // 선택한 시/도
  const [selectedCity, setSelectedCity] = useState(""); // 선택한 시/군/구
  const [selectedTown, setSelectedTown] = useState(""); // 선택한 읍/면/동
  const [errorMessage, setErrorMessage] = useState("");
  const [cdInfo, setCdInfo] = useState(""); //cd값 저장
  const [acceptOrderid, setAcceptOrderid] = useState("");
  const [checkedList, setCheckedList] = useState([]);
  const [isChecked, setIsChecked] = useState(false); //체크한 orderid
  const [selectData, setSelectData] = useState([]); // 체크한 데이터 신청정보창 정보
  const [pilotdata, setPilotdata] = useState([]); // pilot data 
  const [see_seq, setSee_Seq] = useState(0);
  const [dataList, setDataList] = useState([]);


  //방제사 정보 가져오기
  const fetchUserInfo = async () => {
    const User_Credential = JSON.parse(localStorage.getItem('User_Credential'));
    const uuid = User_Credential?.uuid
    const accessToken = User_Credential?.access_token;
    const res = await fetch(server+`/user/userinfo/${uuid}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`
      },
      credentials: 'include',
    })
    const data = await res.json();
    console.log(data)
   setPilotdata(data)
  };

  const name  = pilotdata?.name || "이름 없음";
  const phone  = pilotdata?.mobileno || "번호 없음";
  const amount = pilotdata?.requestAmount || 0;
  const email = pilotdata?.email || "이메일 없음";
  const serviceAmount = checkedList.length * 1000;
  const payorderid = checkedList[0] || "";

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("CARD");
  const totalAmount = amount + serviceAmount;



  //체크박스 로직
  const checkedItemHandler = (value, isChecked) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, value.orderid]);
      setSelectData((prev) => [...prev, value]);
      return;
    }

    if (!isChecked && checkedList.includes(value.orderid)) {
      if(see_seq +1 === selectData.length){setSee_Seq(see_seq -1);}
      setCheckedList(checkedList.filter((item) => item !== value.orderid));
      setSelectData(selectData.filter((item) => item.orderid !== value.orderid));
      return;
    }

    return;
  };

  const checkHandler = (e, value) => {
    setIsChecked(!isChecked);
    checkedItemHandler(value, e.target.checked);
    
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log('checkedList:', [...checkedList]);
      console.log('selectData', selectData)

    },
    [checkedList]
  );
  // 여기까지




  // 토큰을 먼저 받아오고, 받은 토큰을 사용해 데이터를 가져오는 함수
  useEffect(() => {
    const fetchData = async () => {
      // 토큰을 받아오는 로직
      const fetchedToken = await fetchToken();
      if (!fetchedToken) {
        setErrorMessage("Failed to fetch token");
        return;
      }

      setToken(fetchedToken); // 토큰 상태 설정

      // 시/도 데이터를 가져오는 함수 호출 (처음에는 code 없이 전체 시/도 데이터를 불러옴)
      fetchAddressData("", setProvinces, fetchedToken);
    };

    fetchData();
  }, []); // 최초 로드 시 호출

  // 시/군/구 데이터를 가져오는 로직
  useEffect(() => {
    if (selectedProvince) {
      fetchAddressData(selectedProvince, setCities, token);
      setSelectedCity("");
      setTowns([]);
    }
  }, [selectedProvince, token]);

  // 읍/면/동 데이터를 가져오는 로직
  useEffect(() => {
    if (selectedCity) {
      fetchAddressData(selectedCity, setTowns, token);
    }
  }, [selectedCity, token]);

  // 주소 데이터를 가져오는 함수
  const fetchAddressData = async (code, setData, token) => {
    try {
      const _code = code ? `&cd=${code}` : "";
      const apiUrl = `https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json?accessToken=${token}${_code}`;
      const response = await fetch(apiUrl);
      if (response.status === 200) {
        const data = await response.json();
        const result = data.result.map((item) => addressDepthServerModel(item));
        setData(result);
      } else {
        setData([]);
      }
    } catch (error) {
      setData([]);
    }
  };

  // 필터박스에서 선택될 때 cd 값을 출력하는 함수
  const handleProvinceChange = (e) => {
    const selectedCd = e.target.value;
    console.log(selectedCd); // 시/도 코드 출력
    setSelectedProvince(selectedCd);
    setCdInfo(selectedCd);
  };

  const handleCityChange = (e) => {
    const selectedCd = e.target.value;
    console.log(selectedCd); // 시/군/구 코드 출력
    setSelectedCity(selectedCd);
    setCdInfo(selectedCd);
  };

  const handleTownChange = (e) => {
    const selectedCd = e.target.value;
    console.log(selectedCd); // 읍/면/동 코드 출력
    setSelectedTown(selectedCd);
    setCdInfo(selectedCd);
  };




  const getfarmrequest = async () => {
    let length = 0;
    const User_Credential = JSON.parse(localStorage.getItem('User_Credential'));
    const accessToken = User_Credential?.access_token;

    const cdInfoURL = cdInfo == "" ? "" : cdInfo + "/"

    const res = await fetch(server+"/exterminator/getrequests/" + cdInfoURL, {

      
      method: 'GET',
      headers: {
        'Content-Type': "application/json",
        'authorization': `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        length = data.length;
        //console.log(length);
        setDataList(data)
        //return data
      });
    //console.log(res.endDate)
  }




  const putfarmrequest = async () => {
    const User_Credential = JSON.parse(localStorage.getItem('User_Credential'));
    const accessToken = User_Credential?.access_token;
    console.log(checkedList)
    const res = await fetch(server+`/exterminator/accept/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({orderidlist : checkedList}),
    })
      .then((res) => res.json())
      .then((data) => data)

    console.log(res)

  }

  useEffect(() => {
    getfarmrequest();
    setCnt(dataList.length);
    fetchUserInfo();
    //fetchLocation();

  }, []);



  // 농지 데이터 load
  // 이건 테스트 데이터
  // const testData = Array(parseInt(perPage)).fill({
  //   name: "김가네벼",
  //   addr: "전북특별자치도 김제시 백산읍 공덕 2길",
  //   area: "20,000평/44,233.092m²",
  //   plant: "옥수수",
  //   pesticide: "튼튼농약",
  // });
  const load_API = () => {
    // 호출 성공시
    setCnt(960);
    //setDataList(testData);
  };
  useEffect(() => {
    //load_API();
  }, [currentPage, perPage]);

  // 선택 게시글
  const selectSeq = (seq) => {
    if (seqList.includes(seq)) {
      {
        setSeqList(seqList.filter((item) => item !== seq));
      }
    } else {
      if (seqList.length < 10) {
        setSeqList([...seqList, seq]);
        //console.log(seqdata);
      }
    }
  };


  const all_selectSeq = () => {
    // alert("api 연결먼저");
    // return;
    // // 서버에서 받은 데이터 목록에서 seq 추출
    // const seqList = dataList.filter((item) => dataList.seq);
    // setSeqList(seqList);
  };

  // 신청정보 seq
  


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
          <form onSubmit={onSubmit}>
            <TextSemiBold $size={28}>거래매칭</TextSemiBold>

            <div>
              {errorMessage && <p>Error: {errorMessage}</p>}

              {/* 시/도 필터 */}
              <FilterBox>
                <select value={selectedProvince} onChange={handleProvinceChange}>
                  <option value="">시/도 선택</option>
                  {provinces.map((province) => (
                    <option key={province.code} value={province.code}>
                      {province.name}
                    </option>
                  ))}
                </select>

                {/* 시/군/구 필터 */}
                <select value={selectedCity} onChange={handleCityChange}>
                  <option value="">시/군/구 선택</option>
                  {cities.map((city) => (
                    <option key={city.code} value={city.code}>
                      {city.name}
                    </option>
                  ))}
                </select>


                {/* 읍/면/동 필터 */}
                <select value={selectedTown} onChange={handleTownChange}>
                  <option value="">읍/면/동 선택</option>
                  {towns.map((town) => (
                    <option key={town.code} value={town.code}>
                      {town.name}
                    </option>
                  ))}
                </select>


                <SearchBtn onClick={() => getfarmrequest()}>
                  검색하기
                </SearchBtn>
                
                

            </FilterBox>


          </div>

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
                if (data.exterminateState == 0) {
                  if (!data || data.length === 0) {
                    return [];  // data가 undefined 또는 빈 배열일 때 빈 배열 반환
                  }
                  return (
                    <TableList
                      key={idx}
                      className={(idx + 1) % 2 === 0 ? "x2" : ""}

                    >
                      <CheckBox
                        type={"checkbox"}
                        $color={"#555555"}
                        id={data.orderid}
                        checked={checkedList.includes(data.orderid)}
                        onClick={(e) => { selectSeq(idx); }}
                        onChange={(e) => checkHandler(e, data)}
                      // getCheckboxData(data.orderid);
                      />
                      <div>{data.landInfo.landNickName}</div>
                      <div className="long">{data.landInfo.address.jibunAddress}</div>
                      <div className="long">{data.landInfo.lndpclAr}</div>
                      <div>{data.landInfo.cropsInfo}</div>
                      <div>{data.pesticide}</div>
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
            </div>

            {selectData.length !== 0 && (

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
                    <div className="gray">{selectData[see_seq].owner.name}</div>
                  </DataRow>
                  <DataRow>
                    <TextMedium>전화번호</TextMedium>
                    <div className="gray">{selectData[see_seq].owner.mobileno}</div>
                  </DataRow>

                  <Hr />

                  <DataRow>
                    <TextMedium>거래방식</TextMedium>
                    <div className="gray">일반거래</div>
                  </DataRow>
                  <DataRow>
                    <TextMedium>농ㅤㅤ지</TextMedium>
                    <div className="gray">{selectData[see_seq].landInfo.landNickName}</div>
                  </DataRow>
                  <DataRow>
                    <TextMedium className="letter">평단가</TextMedium>
                    <div className="gray">{selectData[see_seq].setAmount}</div>
                  </DataRow>
                  <DataRow>
                    <TextMedium className="letter">마감일</TextMedium>
                    <div className="gray">{selectData[see_seq].endDate}</div>
                  </DataRow>
                  <DataRow>
                    <TextMedium>사용농약</TextMedium>
                    <RowView2 className="wrap top" style={{ flex: 1 }}>
                      <div className="gray_w">{selectData[see_seq].pesticide}</div>
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
                    <div className="gray">1,000원</div>
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
                      총<span style={{ color: blueColor }}> {selectData.length}</span>건 서비스
                      이용금액
                    </TextSemiBold>
                    <TextMedium className="auto" $fontsize={20} $color={true}>
                      {(seqList.length * 1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}

                    </TextMedium>
                  </RowView>

                  {/* <button type='submit' >콘솔 찍어보기</button>
                 
                  <Btn onClick={() => { putfarmrequest() }}>찍어</Btn> */}
                  <Btn onClick={() => { putfarmrequest();requestPayment(selectedPaymentMethod,totalAmount,name,phone,email,payorderid); }}>결제하기</Btn>

                </div>

                <div className="btn" onClick={setting_next}>
                  ▶︎
                </div>
              </Bill>
            )}
          </Content>
        </form>
      </ContentArea>
    </RowView>
    </Common_Layout >
  );
};

export default Matching;
