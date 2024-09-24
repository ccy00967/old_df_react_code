import React, { useEffect } from 'react';

export let globalSearchAddressToCoordinate;

const NaverMap = () => {
  useEffect(() => {
    const { naver } = window;

    // 지도 생성
    const map = new naver.maps.Map('map', {
      center: new naver.maps.LatLng(37.3595316, 127.1052133),
      zoom: 15,
      mapTypeControl: true,
    });

    const infoWindow = new naver.maps.InfoWindow({
      anchorSkew: true,
    });

    // 좌표를 주소로 변환
    function searchCoordinateToAddress(latlng) {
      infoWindow.close();

      naver.maps.Service.reverseGeocode(
        {
          coords: latlng,
          orders: [
            naver.maps.Service.OrderType.ADDR,
            naver.maps.Service.OrderType.ROAD_ADDR,
          ].join(','),
        },
        (status, response) => {
          if (status === naver.maps.Service.Status.ERROR) {
            return alert('Something Wrong!');
          }

          const items = response.v2.results;
          const htmlAddresses = items.map((item, index) => {
            const address = makeAddress(item);
            const addrType =
              item.name === 'roadaddr' ? '[도로명 주소]' : '[지번 주소]';
            return `${index + 1}. ${addrType} ${address}`;
          });

          infoWindow.setContent(
            `
              <div style="padding:10px;min-width:200px;line-height:150%;">
                <h4 style="margin-top:5px;">검색 좌표</h4><br />
                ${htmlAddresses.join('<br />')}
              </div>
            `
          );

          infoWindow.open(map, latlng);
        }
      );
    }

    // 주소를 좌표로 변환
    function searchAddressToCoordinate(address) {
      naver.maps.Service.geocode(
        {
          query: address,
        },
        (status, response) => {
          if (status === naver.maps.Service.Status.ERROR) {
            return alert('Something Wrong!');
          }

          if (response.v2.meta.totalCount === 0) {
            return alert('주소가 올바르지 않습니다.');
          }

          const item = response.v2.addresses[0];
          const point = new naver.maps.Point(item.x, item.y);

          const htmlAddresses = [];
          if (item.roadAddress) htmlAddresses.push(`[도로명 주소] ${item.roadAddress}`);
          if (item.jibunAddress) htmlAddresses.push(`[지번 주소] ${item.jibunAddress}`);
          if (item.englishAddress) htmlAddresses.push(`[영문명 주소] ${item.englishAddress}`);

          infoWindow.setContent(
            `
              <div style="padding:10px;min-width:200px;line-height:150%;">
                <h4 style="margin-top:5px;">검색 주소 : ${address}</h4><br />
                ${htmlAddresses.join('<br />')}
              </div>
            `
          );

          map.setCenter(point);
          infoWindow.open(map, point);
        }
      );
    }

    // 지도 클릭 이벤트 설정
    map.addListener('click', (e) => {
      searchCoordinateToAddress(e.coord);
    });

    // 전역 변수에 searchAddressToCoordinate 함수 할당하여 주소검색 활성화
    globalSearchAddressToCoordinate = searchAddressToCoordinate;

    // 초기 주소 검색
    searchAddressToCoordinate('조선대길 146');

  // 주소를 변환하는 함수
  function makeAddress(item) {
    if (!item) return '';

    const { region, land, name } = item;
    const isRoadAddress = name === 'roadaddr';

    let sido = region.area1?.name || '';
    let sigugun = region.area2?.name || '';
    let dongmyun = region.area3?.name || '';
    let ri = region.area4?.name || '';
    let rest = '';

    if (land) {
      if (land.type === '2') rest += '산';
      rest += land.number1;
      if (land.number2) rest += `-${land.number2}`;
      if (isRoadAddress) {
        if (dongmyun.endsWith('면')) ri = land.name;
        else dongmyun = land.name;
        if (land.addition0) rest += ` ${land.addition0.value}`;
      }
    }

    return [sido, sigugun, dongmyun, ri, rest].join(' ');
  }
}, []); // 빈 배열로 설정하여 컴포넌트가 처음 렌더링될 때만 실행

return <div id="map" style={{ width: '100%', height: '100%' }}></div>;
};

export default NaverMap;