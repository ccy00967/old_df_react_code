import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import styled from "styled-components";
import {
  BackgroundArea,
  CenterView,
  GreenColor,
  hoverGreen,
  Icon,
  lightGreenColor,
  redColor,
  RowView,
  RowView2,
} from "../../../../Component/common_style";
import noScroll from "../../../../Component/function/noScroll";
import { useLocation } from "react-router-dom";
import { server } from "../../../url";


const PASSBtn = styled.div`
  padding: 1rem 0rem;
  text-align: center;
  font-family: var(--font-Pretendard-SemiBold);
  color: ${GreenColor};
  background-color: ${lightGreenColor};
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #c4e6d2;
  }
`;

const NicePassPopUp = () => {
  const location = useLocation();

  // 리덕스로 상태 체크하기 -> 본인인증 성공 상태 반영
  useEffect(async () => {
    const queryParams = new URLSearchParams(location.search);
    const token_version_id = queryParams.get("token_version_id");
    const enc_data = queryParams.get("enc_data");
    const integrity_value = queryParams.get("integrity_value");

    const requestData = {
      token_version_id,
      enc_data,
      integrity_value,
    };

    if (token_version_id && enc_data && integrity_value) {
      fetch(server + "/validation/nicepasscallback/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          if (!response.ok) {
            window.opener.postMessage("no", window.location.origin + "/signUp");
            window.close()
            return; // 오류 처리 후 종료
          }
          return response.json();
        })
        .then((data) => {
          if (data) {
            window.opener.postMessage("ok", window.location.origin + "/signUp");
            window.close()
          }
        })
        .catch((error) => {
          console.error("본인인증 요청 에러:", error);
        });
    } else {
      console.error("필요한 인증 데이터가 누락되었습니다.");
    }
  }, [location]);

  return (
    <div>

    </div>
  );
};

export default NicePassPopUp