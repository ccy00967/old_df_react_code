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

  // 리덕스로 상태 체크하기 -> 본인인증 성공 상태 반영
  useEffect(() => {
    console.log("본인인증 완료")
    localStorage.setItem("niceValidate", true) // 리덕스로 바꿔서 상태오면 변경하기
    window.location.href = window.location.href + "/signUp";
  }, [])

  return (
    <div>

    </div>
  );
};

export default NicePassPopUp