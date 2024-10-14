import styled from "styled-components";
import checkbackimg from "../img/Vector.png"

export const GreenColor = "#2dcc71";
export const lightGreenColor = "#DCF6E7";
export const hoverGreen = "#24A35A";
export const redColor = "#eb003b";
export const lightRedColor = "#FFE7EC";
export const hoverRed = "#ECC2CD";
export const blueColor = "#2768FF";
export const grayColor = "#E2E2E2";
export const lightBlueColor = "#DEE8FF";
export const yellowColor = "#FFD400";

/** 정중앙 배치 컴포넌트  */
export const CenterView = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  &.col {
    flex-direction: column;
  }
`;
/** 양극 배치 컴포넌트  */
export const RowView = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  &.top {
    align-items: flex-start;
  }
  &.bottom {
    align-items: flex-end;
  }
`;
/** 가로 배치 컴포넌트  */
export const RowView2 = styled.div`
  display: flex;
  align-items: center;
  &.top {
    align-items: flex-start;
  }
  &.end {
    justify-content: flex-end;
  }
  &.pointer {
    cursor: pointer;
  }
  &.wrap {
    flex-wrap: wrap;
  }
`;
/** 이미지 드래그 금지  */
export const Icon = styled.img`
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  &.pointer {
    cursor: pointer;
  }
`;
/** 커스텀 체크박스 css  */
export const CheckBox = styled.input`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 24px;
  height: 24px;
  margin-right: 0.5rem;
  border: 1px solid #e6e6e6;
  background-color: white;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  &:checked {
    background-color: ${(props) => props.color || GreenColor};
    border: 1px solid ${(props) => props.color || GreenColor};
    background-image: url(${checkbackimg});
    background-repeat: no-repeat;
    background-position: center;
  }
`;

/** 모달 검정 배경  */
export const BackgroundArea = styled.div`
  z-index: 99;
  background-color: #0000008c;
  position: fixed;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
`;
