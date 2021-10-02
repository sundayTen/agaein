import { useEffect, useRef, useState } from 'react';
declare global {
    interface Window {
        kakao: any;
    }
}
interface kakaoMapProps {
    search: string;
    setAddress: (value: string) => void;
    save: boolean;
}
const { kakao } = window;

let options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
};

const KakaoMap = ({ search, setAddress, save }: kakaoMapProps) => {
    //const ref = useRef(null);
    const geocoder = new kakao.maps.services.Geocoder();
    const mapRef = useRef(null);
    const marker = new kakao.maps.Marker();
    const [map, setMap] = useState<any>(null);
    const infowindow = new kakao.maps.InfoWindow({ zindex: 1 });
    const [addressValue, setAddressValue] = useState('');
    // const [markers, setMarkers] = useState<Array<any>>([]);
    // const [bounds, setBound] = useState(new kakao.maps.LatLngBounds());
    //const [customOverlays, setCustomOverlays] = useState(null);
    if (save === true) {
        setAddress(addressValue);
    }

    const coordinateConversion = (result: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
            const detailAddr = !!result[0].road_address
                ? '<div>도로명 주소 : ' +
                  result[0].road_address.address_name +
                  '</div>' +
                  '<div>지번 주소 : ' +
                  result[0].address.address_name +
                  '</div>'
                : '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
            infowindow.setContent(detailAddr);
            infowindow.open(map, marker);
            setAddressValue(result[0].address.address_name);
        }
    };

    const addMarker = (position: any) => {
        // 마커를 생성합니다
        marker.setPosition(position);
        marker.setMap(map);
        geocoder.coord2Address(position.getLng(), position.getLat(), coordinateConversion);
        // const customOverlay = new kakao.maps.CustomOverlay({
        //     position: position,
        //     content: ref.current,
        //     yAnchor: 1.02,
        //     xAnchor: 0.3,
        // });
        //console.log(marker);
        //kakao.maps.event.addListener(marker, 'click', clickMarker(customOverlay, position));
        //setMarkers([...markers, marker]);
        //bounds.extend(position);
    };

    const clickAddMarker = (position: any) => {
        const coords = position.latLng;

        addMarker(coords);
        // var detailAddr = !!result[0].road_address
        //     ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>'
        //     : '';
        // detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
    };

    // const clickMarker = (customOverlay: any, position: any) => {
    //     return function () {
    //         customOverlay.setMap(map);
    //         map.panTo(position);
    //     };
    // };

    const addressSearch = (result: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            map?.panTo(coords);
            options.center = coords;
            //addMarker(coords);
        }
    };

    useEffect(() => {
        setMap(new kakao.maps.Map(mapRef.current, options));
    }, []);

    useEffect(() => {
        if (map !== null) {
            kakao.maps.event.addListener(map, 'click', clickAddMarker);

            return () => {
                kakao.maps.event.removeListener(map, 'click', clickAddMarker);
                //kakao.maps.event.removeListener(marker, 'click', clickMarker);
            };
        }
    }, [map]);

    useEffect(() => {
        if (search !== '') {
            geocoder.addressSearch(search, addressSearch);
        }
    }, [search]);

    // useEffect(() => {
    //     markers.map((item) => {
    //         item.setMap(map);
    //         map.setBounds(bounds);
    //     });
    // }, [markers]);

    return (
        <>
            <div ref={mapRef} style={{ width: 500, height: 500 }} />
        </>
    );
};

export default KakaoMap;
