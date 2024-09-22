import React, { useEffect, useState, } from 'react';
import ReactDOM from 'react-dom';
//import { TextField, Button, Grid, Box, Stack } from '@mui/material';
import { createRoot } from 'react-dom/client';
//import { useSelector, useDispatch } from 'react-redux';
import initMap from './navermaps_func';


const NaverMaps = () => {

  //const addressInfo = useSelector((state) => state.address);

  useEffect(() => {
    // 네이버 지도 API 스크립트가 로드된 후에 initMap 함수 호출
    if (window.naver) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = 'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=jqfupb67n5'; // 여기에 클라이언트 ID를 넣어주세요.
      script.async = true;
      script.onload = initMap;
      document.head.appendChild(script);
    }

    return () => {
      // 컴포넌트가 언마운트될 때 정리 작업 수행
      if (window.naver && window.naver.maps) {
        window.naver.maps.Event.clearInstanceListeners(window.naver.maps.Marker);
      }
    };

  }, []); // [] 안에 있는 변수가 변할 때마다 useEffect가 호출됨


  return (
    <div>
      <div id="map" style={{ width: '400px', height: '400px' }} ></div>
      <div id="search" style={{ width: '400px', height: '400px' }} ></div>

      {/* <Grid container spacing={2} alignItems="center">

        <Grid xs={6}>
        </Grid>

        <Grid xs={0.5}>
        </Grid>

        <Grid xs={5.5} >
          <Stack spacing={3}>
            <div id="search"></div>
            <TextField
              disabled
              fullWidth
              id="jibunAddress"
              label="지번 주소"
              value={addressInfo.jibunAddress}
            />
            <TextField
              fullWidth
              id="DetailAddress"
              label="상세 주소"
              placeholder='상세 주소를 입력해주세요.'
            />
          </Stack>
        </Grid>
      </Grid> */}
    </div>
  );
}; // 검색한 주소 지번주소로 자동 입력

export default NaverMaps; 