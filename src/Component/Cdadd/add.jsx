import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { RowView2 } from "../common_style";

// 스타일 컴포넌트 정의
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

// AddressDepthServerModel 형태의 데이터를 관리하는 함수
const addressDepthServerModel = (json) => {
    return {
        code: json.cd,
        name: json.addr_name,
    };
};

// 토큰을 받아오는 비동기 함수
const fetchToken = async () => {
    try {
        const response = await fetch(
            "https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json?consumer_key=a3d30c1dbf844d2596f6&consumer_secret=be8aac1489a6442ea2c4"
        );
        if (response.status === 200) {
            const data = await response.json();
            return data.result.accessToken; // 받아온 토큰 값
        } else {
            throw new Error("Failed to fetch token");
        }
    } catch (error) {
        console.error("Error fetching token:", error);
        return null;
    }
};

const DepthAddressInformation = ({ code }) => {
    const [token, setToken] = useState(null);
    const [provinces, setProvinces] = useState([]); // 시/도 데이터
    const [cities, setCities] = useState([]); // 시/군/구 데이터
    const [towns, setTowns] = useState([]); // 읍/면/동 데이터
    const [selectedProvince, setSelectedProvince] = useState(""); // 선택한 시/도
    const [selectedCity, setSelectedCity] = useState(""); // 선택한 시/군/구
    const [selectedTown, setSelectedTown] = useState(""); // 선택한 읍/면/동
    const [errorMessage, setErrorMessage] = useState("");
    const [cdInfo,setCdInfo] = useState(""); //cd값 저장


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

    return (
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
                
            </FilterBox>

            <button onClick={() =>console.log(cdInfo)}>
                cd값 확인
            </button>
        </div>
    );
};

export default DepthAddressInformation;
