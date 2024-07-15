import React, { useEffect } from 'react';

const MapComponent = () => {
  useEffect(() => {
    const initMap = async () => {
      const { naver } = window; // 네이버 지도 객체
      const mapOptions = {
        center: new naver.maps.LatLng(37.3595316, 127.1052133), // 초기 중심 좌표
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
      map.addListener('click', function(e) {
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
        }, function(status, response) {
          if (status === naver.maps.Service.Status.ERROR) {
            return alert('Something Wrong!');
          }

          var items = response.v2.results,
              address = '',
              htmlAddresses = [];

          for (var i=0, ii=items.length, item, addrType; i<ii; i++) {
            item = items[i];
            address = makeAddress(item) || '';
            addrType = item.name === 'roadaddr' ? '[도로명 주소]' : '[지번 주소]';

            htmlAddresses.push((i+1) +'. '+ addrType +' '+ address);
          }

          infoWindow.setContent([
            '<div style="padding:10px;min-width:100px;line-height:100%;">',
            '<h3 style="margin-top:5px;">검색 좌표</h3><br />',
            htmlAddresses.join('<br />'),
            '</div>'
          ].join('\n'));

          infoWindow.open(map, latlng);
        });
      }

      function makeAddress(item) {
        if (!item) {
          return;
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

      function checkLastString (word, lastString) {
        return new RegExp(lastString + '$').test(word);
      }

      function hasAddition (addition) {
        return !!(addition && addition.value);
      }
    };

    // 네이버 지도 API 스크립트가 로드된 후에 initMap 함수 호출
    if (window.naver) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = 'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=YOUR_CLIENT_ID'; // 여기에 클라이언트 ID를 넣어주세요.
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
    <div id="map" style={{ width: '100%', height: '400px' }}></div>
  );
};

export default MapComponent;
