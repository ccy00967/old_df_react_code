import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

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
            '<div style="padding:10px;min-width:200px;line-height:150%;">',
            '<h4 style="margin-top:5px;">검색 좌표</h4><br />',
            htmlAddresses.join('<br />'),
            '</div>'
          ].join('\n'));

          infoWindow.open(map, latlng);
        });
      }

      function searchAddressToCoordinate(address) {
        naver.maps.Service.geocode({
          query: address
        }, function(status, response) {
          if (status === naver.maps.Service.Status.ERROR) {
            return alert('Something Wrong!');
          }

          if (response.v2.meta.totalCount === 0) {
            return alert('주소를 찾을 수 없습니다.');
          }

          var item = response.v2.addresses[0],
              point = new naver.maps.Point(item.x, item.y);

          infoWindow.setContent([
            '<div style="padding:10px;min-width:200px;line-height:150%;">',
            '<h4 style="margin-top:5px;">검색 주소 : '+ address +'</h4><br />',
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
        searchAddressToCoordinate(document.getElementById('address').value);
      };

      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          searchAddress(e);
        }
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        searchAddressToCoordinate(document.getElementById('address').value);
      };

      // HTML에 입력 필드와 버튼 추가
      const addressInput = (
        <div style={{ marginTop: '10px' }}>
          <input id="address" type="text" style={inputStyle} onKeyDown={handleKeyDown} placeholder="주소를 입력하세요" />
          <button id="submit" style={buttonStyle} onClick={handleSubmit}>주소 검색</button>
        </div>
      );

      // HTML을 설정할 때 JSX를 사용하여 React 컴포넌트에 주입
      ReactDOM.render(addressInput, document.getElementById('search'));
    };

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
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      <div id="search"></div>
    </div>
  );
};

export default MapComponent;
