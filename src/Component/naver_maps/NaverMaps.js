import React, { useEffect, useRef } from "react";

const NaverMap = ({ center = { lat: 37.3595316, lng: 127.1052133 }, zoom = 15 }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const { naver } = window;

    if (!naver || !mapRef.current) return;

    const map = new naver.maps.Map(mapRef.current, {
      center: new naver.maps.LatLng(center.lat, center.lng),
      zoom,
      mapTypeControl: true,
    });

    // 지도 클릭 이벤트 추가
    naver.maps.Event.addListener(map, 'click', function(e) {
      const latlng = e.coord;

      if (naver.maps.Service) {
        // reverseGeocode 호출
        naver.maps.Service.reverseGeocode({
          coords: latlng,
          orders: [
            naver.maps.Service.OrderType.ADDR,
            naver.maps.Service.OrderType.ROAD_ADDR
          ].join(',')
        }, function(status, response) {
          if (status === naver.maps.Service.Status.ERROR) {
            return alert('Something went wrong!');
          }

          const items = response.v2.results;
          const address = items.length > 0 ? items[0].name : 'No address found';
          alert(`Address: ${address}`);
        });
      } else {
        alert('Geocoding service is not available.');
      }
    });
  }, [center, zoom]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
};

export default NaverMap;
