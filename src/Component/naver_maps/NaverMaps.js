import React, { useEffect, useRef } from 'react';

export function NaverMap({ center = { lat: 37.3595316, lng: 127.1052133 }, zoom = 15, address }) {
    const mapRef = useRef(null);

    useEffect(() => {
        const { naver } = window;

        if (!naver) return;

        const map = new naver.maps.Map(mapRef.current, {
            center: new naver.maps.LatLng(center.lat, center.lng),
            zoom,
            mapTypeControl: true,
        });

        const infoWindow = new naver.maps.InfoWindow({
            anchorSkew: true,
        });

        // 클릭 이벤트 등록
        naver.maps.Event.addListener(map, 'click', function (e) {
            searchCoordinateToAddress(e.coord, map, infoWindow);
        });

        // 주소로 좌표 검색 및 지도 업데이트
        if (address) {
            searchAddressToCoordinate(address, map, infoWindow);
        }
    }, [center, zoom, address]);

    // 좌표 -> 주소 검색 함수
    const searchCoordinateToAddress = (latlng, map, infoWindow) => {
        infoWindow.close();

        window.naver.maps.Service.reverseGeocode({
            coords: latlng,
            orders: [
                window.naver.maps.Service.OrderType.ADDR,
                window.naver.maps.Service.OrderType.ROAD_ADDR
            ].join(','),
        }, function (status, response) {
            if (status === window.naver.maps.Service.Status.ERROR) {
                return alert('Something went wrong!');
            }

            const items = response.v2.results;
            let address = '';
            let htmlAddresses = [];

            for (let i = 0, ii = items.length; i < ii; i++) {
                const item = items[i];
                address = makeAddress(item) || '';
                const addrType = item.name === 'roadaddr' ? '[도로명 주소]' : '[지번 주소]';
                htmlAddresses.push((i + 1) + '. ' + addrType + ' ' + address);
            }

            infoWindow.setContent([
                '<div style="padding:10px;min-width:200px;line-height:150%;">',
                '<h4 style="margin-top:5px;">검색 좌표</h4><br />',
                htmlAddresses.join('<br />'),
                '</div>'
            ].join('\n'));

            infoWindow.open(map, latlng);
        });
    };

    // 주소 -> 좌표 검색 함수
    const searchAddressToCoordinate = (address, map, infoWindow) => {
        window.naver.maps.Service.geocode({
            query: address
        }, function (status, response) {
            if (status === window.naver.maps.Service.Status.ERROR) {
                return alert('Something went wrong!');
            }

            if (response.v2.meta.totalCount === 0) {
                return alert('No results found');
            }

            const item = response.v2.addresses[0];
            const point = new window.naver.maps.Point(item.x, item.y);

            const htmlAddresses = [];
            if (item.roadAddress) htmlAddresses.push('[도로명 주소] ' + item.roadAddress);
            if (item.jibunAddress) htmlAddresses.push('[지번 주소] ' + item.jibunAddress);
            if (item.englishAddress) htmlAddresses.push('[영문 주소] ' + item.englishAddress);

            infoWindow.setContent([
                '<div style="padding:10px;min-width:200px;line-height:150%;">',
                '<h4 style="margin-top:5px;">검색 주소 : ' + address + '</h4><br />',
                htmlAddresses.join('<br />'),
                '</div>'
            ].join('\n'));

            map.setCenter(point);
            infoWindow.open(map, point);
        });
    };

    // 주소 만들기 함수
    const makeAddress = (item) => {
        if (!item) return '';

        const { region, land } = item;
        let address = '';
        if (region.area1.name) address += region.area1.name;
        if (region.area2.name) address += ' ' + region.area2.name;
        if (region.area3.name) address += ' ' + region.area3.name;
        if (land && land.number1) {
            address += ' ' + land.number1;
            if (land.number2) address += '-' + land.number2;
        }

        return address;
    };

    return (
        <div ref={mapRef} style={{ width: '100%', height: '400px' }} />
    );
}

export default NaverMap;