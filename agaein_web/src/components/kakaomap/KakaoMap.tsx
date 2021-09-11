//@ts-nocheck
import { useEffect, useState } from 'react';
declare global {
    interface Window {
        kakao: any;
    }
}
const { kakao } = window;

const KakaoMap = (props) => {
    const [container, setContainer] = useState(null);
    console.log('🚀 OutPut is -->  ~ KakaoMap ~ container', container);
    const [map, setMap] = useState(null);
    console.log('🚀 OutPut is -->  ~ KakaoMap ~ map', map);
    const [markers, setMarkers] = useState([]);
    const [bounds, setBound] = useState(new kakao.maps.LatLngBounds());

    const addMarker = (position) => {
        // 마커를 생성합니다
        const marker = new kakao.maps.Marker({
            position: position,
        });
        setMarkers([...markers, marker]);
        bounds.extend(position);
    };

    const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
    };
    const addressSearch = (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            addMarker(coords);

            const infowindow = new kakao.maps.InfoWindow({
                content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>',
            });
            //infowindow.open(map, markers);
        }
    };

    useEffect(() => {
        setContainer(document.getElementById('map'));
    }, []);

    useEffect(() => {
        if (container !== null) {
            setMap(new kakao.maps.Map(container, options));
        }
    }, [container]);

    useEffect(() => {
        const geocoder = new kakao.maps.services.Geocoder();

        if (props.search !== '') {
            geocoder.addressSearch(props.search, addressSearch);
        }
    }, [props.search]);

    useEffect(() => {
        markers.map((item) => {
            item.setMap(map);
            map.setBounds(bounds);
        });
    }, [markers]);

    return (
        <>
            <div id="map" style={{ width: 1900, height: 500 }} />
        </>
    );
};

export default KakaoMap;
