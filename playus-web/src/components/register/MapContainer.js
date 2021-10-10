import React, { useEffect, useState } from "react";
import styled from "styled-components";

const { kakao } = window;

let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

let address = null;

const Map = styled.div`
  width: 450px;
  height: 450px;
  margin: 20px;
  @media screen and (max-width: 615px) {
    width: 350px;
    height: 350px;
  }
`;

const MapContainer = ({ searchPlace }) => {
  useEffect(() => {
    const container = document.getElementById("Map");
    const options = {
      center: new kakao.maps.LatLng(37.5666805, 126.9784147),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchPlace, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
      // 마커에 클릭이벤트를 등록
      kakao.maps.event.addListener(marker, "click", function () {
        address = place.address_name;
        console.log(address);
        // 마커를 클릭하면 장소명이 인포윈도우에 표출
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    }
  }, [searchPlace]);

  return (
    <div>
      <Map id="Map"></Map>
    </div>
  );
};

export default MapContainer;
