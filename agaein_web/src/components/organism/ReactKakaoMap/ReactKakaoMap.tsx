import { ReactElement, useState, useEffect } from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
interface ReactKakaoMapProps {
    search?: string | undefined;
    setAddress?: (value: object) => void;
    save?: boolean;
    size?: {
        width: number;
        height: number;
    };
    borderRadius?: number;
    missPosition?: {
        lat: number;
        lng: number;
        address: string;
    };
    foundPosition?: [
        {
            click: boolean;
            lat: number;
            lng: number;
            address: string;
        },
    ];
}
declare global {
    interface Window {
        kakao: any;
    }
}
const { kakao } = window;
const ReactKaKaoMap = (props: ReactKakaoMapProps) => {
    const {
        search = undefined,
        setAddress = () => {},
        save = false,
        size = { width: 500, height: 500 },
        borderRadius = 5,
        missPosition,
        foundPosition = [],
    } = props;
    const [position, setPosition] = useState<{ lat: number; lng: number }>({
        lat: -1,
        lng: -1,
    });
    const [markerInfo, setMarkerInfo] = useState<ReactElement>();
    const [addressValue, setAddressValue] = useState('');
    const [mapCenter, setMapCenter] = useState({ lat: 37.51491382139469, lng: 127.10195359701143 });
    const [infoPosition, setInfoPosition] = useState(false);
    const [map, setMap] = useState<kakao.maps.Map>();
    const geocoder = new kakao.maps.services.Geocoder();

    const testImg = {
        src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
        size: {
            width: 64,
            height: 69,
        },
        options: {
            offset: {
                x: 27,
                y: 69,
            },
        },
    };

    useEffect(() => {
        if (save) {
            const address = {
                lat: mapCenter.lat,
                lng: mapCenter.lng,
                address: addressValue,
            };
            setAddress(address);
        }
    }, [save]);

    const addMarker = (result: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
            if (result[0].y && result[0].x) {
                setPosition({
                    lat: result[0].y,
                    lng: result[0].x,
                });
                setMapCenter({
                    lat: result[0].y,
                    lng: result[0].x,
                });
            }

            const address = result[0].address;
            const roadAddress = result[0].road_address;
            setInfoPosition(!!roadAddress);
            const detailAddr = !!roadAddress ? (
                <>
                    <div>도로명 주소 : {roadAddress.address_name}</div>
                    <div>지번 주소 : {address.address_name}</div>
                </>
            ) : (
                <>
                    <div>지번 주소 : {address.address_name}</div>
                </>
            );

            setMarkerInfo(detailAddr);
            setAddressValue(address.address_name);
        }
    };
    useEffect(() => {
        if (search === '' || search === undefined || search === null) return;
        console.log(search);
        geocoder.addressSearch(search, addMarker);
    }, [search]);

    const mapClick = (_t: kakao.maps.Map, mouseEvent: kakao.maps.event.MouseEvent) => {
        geocoder.coord2Address(mouseEvent.latLng?.getLng(), mouseEvent.latLng?.getLat(), addMarker);
        setPosition({
            lat: mouseEvent.latLng?.getLat() ?? -1,
            lng: mouseEvent.latLng?.getLng() ?? -1,
        });
    };

    return (
        <div>
            <Map center={mapCenter} style={{ ...size, borderRadius }} onClick={mapClick} onCreate={setMap}>
                {markerInfo && (
                    <>
                        <MapMarker position={position} infoWindowOptions={{ className: 'test' }}>
                            {markerInfo}
                        </MapMarker>
                        {/* <CustomOverlayMap position={position}>{markerInfo}</CustomOverlayMap> */}
                    </>
                )}
                {missPosition && <MapMarker position={missPosition}>{missPosition.address}</MapMarker>}
                {foundPosition.map((item) => {
                    const position = { lat: item.lat, lng: item.lng };
                    const address = item.address;
                    return (
                        <MapMarker key={position.lat} position={position} image={testImg}>
                            {address}
                        </MapMarker>
                    );
                })}
            </Map>
        </div>
    );
};
export default ReactKaKaoMap;
