import React, { useEffect, useState,  } from 'react';
import ReactDOM from 'react-dom';
import { TextField, Button, Grid, Box, Stack } from '@mui/material';
import { createRoot } from 'react-dom/client';
import { useSelector, useDispatch } from 'react-redux';
import userSlice from '../state/UserSlice';
import store from '../state/store';



const initMap = async () => {
  const { naver } = window; // 네이버 지도 객체
  const mapOptions = {
    center: new naver.maps.LatLng(35.1409402, 126.925774), // 초기 중심 좌표
    zoom: 15, // 초기 줌 레벨
    mapTypeControl: true
  };

  // 네이버 지도 인스턴스 생성
  const map = new naver.maps.Map('map', mapOptions);

  // 정보 창 생성
  const infoWindow = new naver.maps.InfoWindow({
    anchorSkew: true
  });

  // 클릭 이벤트 리스너 등록
  map.addListener('click', function (e) {
    searchCoordinateToAddress(e.coord);
  });

  function searchCoordinateToAddress(latlng) {
    infoWindow.close();

    naver.maps.Service.reverseGeocode({
      coords: latlng,
      orders: [
        naver.maps.Service.OrderType.ADDR,
        naver.maps.Service.OrderType.ROAD_ADDR
      ].join(',')
    }, function (status, response) {
      if (status === naver.maps.Service.Status.ERROR) {
        return alert('Something Wrong!');
      }

      var items = response.v2.results,
        address = '',
        htmlAddresses = [];

      for (var i = 0, ii = items.length, item, addrType; i < ii; i++) {
        item = items[i];
        address = makeAddress(item) || '';
        addrType = item.name === 'roadaddr' ? '[도로명 주소]' : '[지번 주소]';

        //htmlAddresses.push((i + 1) + '. ' + addrType + ' ' + address);
        htmlAddresses.push(address);
      }

      console.log(htmlAddresses)
      searchAddressToCoordinate(htmlAddresses[0]);

      // infoWindow.setContent([
      //   '<div style="padding:10px;min-width:200px;line-height:150%;">',
      //   '<h4 style="margin-top:5px;">검색 좌표</h4><br />',
      //   htmlAddresses.join('<br />'),
      //   '</div>'
      // ].join('\n'));

      // infoWindow.open(map, latlng);
    });
  }

  function searchAddressToCoordinate(address) {
    naver.maps.Service.geocode({
      query: address
    }, function (status, response) {
      if (status === naver.maps.Service.Status.ERROR) {
        return alert('Something Wrong!');
      }

      if (response.v2.meta.totalCount === 0) {
        return alert('주소를 찾을 수 없습니다.');
      }

      var item = response.v2.addresses[0],
        point = new naver.maps.Point(item.x, item.y);

      // setAddressInfo({
      //   roadAddress: item.roadAddress,
      //   jibunAddress: item.jibunAddress,
      //   englishAddress: item.englishAddress,
      //   navermapsx: item.x,
      //   navermapsy: item.y,
      // });     // 주소 정보 저장

      store.dispatch(userSlice.actions.setAddress({
        roadAddress: item.roadAddress,
        jibunAddress: item.jibunAddress,
        englishAddress: item.englishAddress,
        navermapsx: item.x,
        navermapsy: item.y,
      }))

      infoWindow.setContent([
        '<div style="padding:10px;min-width:200px;line-height:150%;">',
        '<h4 style="margin-top:5px;">검색 주소 : ' + address + '</h4><br />',
        (item.roadAddress ? '[도로명 주소] ' + item.roadAddress + '<br />' : ''),
        (item.jibunAddress ? '[지번 주소] ' + item.jibunAddress + '<br />' : ''),
        (item.englishAddress ? '[영문명 주소] ' + item.englishAddress + '<br />' : ''),
        '</div>'
      ].join('\n'));

      map.setCenter(point);
      infoWindow.open(map, point);
    });
  }

  function makeAddress(item) {
    if (!item) {
      return '';
    }

    var name = item.name,
      region = item.region,
      land = item.land,
      isRoadAddress = name === 'roadaddr';

    var sido = '', sigugun = '', dongmyun = '', ri = '', rest = '';

    if (hasArea(region.area1)) {
      sido = region.area1.name;
    }

    if (hasArea(region.area2)) {
      sigugun = region.area2.name;
    }

    if (hasArea(region.area3)) {
      dongmyun = region.area3.name;
    }

    if (hasArea(region.area4)) {
      ri = region.area4.name;
    }

    if (land) {
      if (hasData(land.number1)) {
        if (hasData(land.type) && land.type === '2') {
          rest += '산';
        }

        rest += land.number1;

        if (hasData(land.number2)) {
          rest += ('-' + land.number2);
        }
      }

      if (isRoadAddress === true) {
        if (checkLastString(dongmyun, '면')) {
          ri = land.name;
        } else {
          dongmyun = land.name;
          ri = '';
        }

        if (hasAddition(land.addition0)) {
          rest += ' ' + land.addition0.value;
        }
      }
    }

    return [sido, sigugun, dongmyun, ri, rest].join(' ');
  }

  function hasArea(area) {
    return !!(area && area.name && area.name !== '');
  }

  function hasData(data) {
    return !!(data && data !== '');
  }

  function checkLastString(word, lastString) {
    return new RegExp(lastString + '$').test(word);
  }

  function hasAddition(addition) {
    return !!(addition && addition.value);
  }

  // 검색 주소 입력과 버튼 추가
  const inputStyle = { marginRight: '10px' };
  const buttonStyle = { cursor: 'pointer' };

  const searchAddress = (e) => {
    e.preventDefault();
    const address = document.getElementById('address').value.trim(); // trim 처리
    if (address) {
      searchAddressToCoordinate(address);
    } else {
      alert('주소를 입력하세요.');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const address = document.getElementById('address').value.trim(); // trim 처리
      if (address) {
        searchAddressToCoordinate(address);
      } else {
        alert('주소를 입력하세요.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const address = document.getElementById('address').value.trim(); // trim 처리
    if (address) {
      searchAddressToCoordinate(address);
    } else {
      alert('주소를 입력하세요.');
    }
  };

  // MUI로 구현한 주소 검색창
  const addressInput = (
    <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="address"
        label="주소"
        name="address"
        autoComplete="address"
        placeholder="주소를 입력해 주세요."
        onKeyDown={handleKeyDown}
      />
      <Button
        id="submit"
        variant="contained"
        color="primary"
        style={{ marginLeft: '10px', borderRadius: '5px', backgroundColor: '#999191', height: '40px', minWidth: '100px' }}
        onClick={handleSubmit}
      >
        주소 찾기
      </Button>
    </div>
  );

  // HTML을 설정할 때 JSX를 사용하여 React 컴포넌트에 주입
  const root = createRoot(document.getElementById('search'))
  root.render(addressInput);
  //ReactDOM.render(addressInput, document.getElementById('search'));
};



const MapComponent = () => {

  const addressInfo = useSelector((state) => state.address);

  useEffect(() => {
    //initMap()
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

    console.log(addressInfo);
    
    return () => {
      // 컴포넌트가 언마운트될 때 정리 작업 수행
      if (window.naver && window.naver.maps) {
        window.naver.maps.Event.clearInstanceListeners(window.naver.maps.Marker);
      }
    };
    
  }, []); // [] 안에 있는 변수가 변할 때마다 useEffect가 호출됨




  return (
    <div>
      <Grid container spacing={2} alignItems="center">

        <Grid xs={6}>
          <div id="map" style={{ width: '100%', height: '400px' }}></div>
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
      </Grid>
    </div>
  );
}; // 검색한 주소 지번주소로 자동 입력

export default MapComponent;
