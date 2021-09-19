import { useEffect, useRef, useState } from 'react';
declare global {
    interface Window {
        kakao: any;
    }
}
interface kakaoMapProps {
    search: string;
}
const { kakao } = window;

const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
};

const KakaoMap = (props: kakaoMapProps) => {
    const ref = useRef(null);
    const geocoder = new kakao.maps.services.Geocoder();
    const mapRef = useRef(null);
    const [map, setMap] = useState<any>(null);
    const [markers, setMarkers] = useState<Array<any>>([]);
    const [bounds, setBound] = useState(new kakao.maps.LatLngBounds());
    //const [customOverlays, setCustomOverlays] = useState(null);

    const addMarker = (position: any) => {
        // 마커를 생성합니다
        const marker = new kakao.maps.Marker({
            position: position,
        });
        const customOverlay = new kakao.maps.CustomOverlay({
            position: position,
            content: ref.current,
            yAnchor: 1.02,
            xAnchor: 0.3,
        });
        console.log(marker);
        kakao.maps.event.addListener(marker, 'click', clickMarker(customOverlay, position));
        setMarkers([...markers, marker]);
        bounds.extend(position);
    };

    const clickAddMarker = (position: any) => {
        const coords = position.latLng;
        addMarker(coords);
    };

    const clickMarker = (customOverlay: any, position: any) => {
        return function () {
            customOverlay.setMap(map);
            map.panTo(position);
        };
    };

    const addressSearch = (result: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            console.log(coords);
            addMarker(coords);
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
            <div ref={mapRef} style={{ width: 1900, height: 500 }} />
        </>
    )
};

export default KakaoMap;