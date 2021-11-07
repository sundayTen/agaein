import { ReactElement, useState, useEffect } from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import testgif from 'assets/image/testgif.gif';
import Lost from 'assets/image/Lost.png';
import Active from 'assets/image/Active.png';
import Default from 'assets/image/Default.png';
import { Category, Img, MapContainer, Text, InfoWindow } from './ReactKakaoMap.style';
interface ReactKakaoMapProps {
    search?: string | undefined;
    setAddress?: (value: any) => void;
    isCategory?: boolean;
    noClick?: boolean;
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
        size = { width: 500, height: 500 },
        borderRadius = 5,
        missPosition = { lat: 37.52491382139469, lng: 127.11195359701143, address: 'aaa' },
        foundPosition = [
            { lat: 37.51491382139469, lng: 127.10195359701143, address: 'aaa', click: false },
            { lat: 37.52491382139469, lng: 127.10195359701143, address: 'aaa', click: false },
            { lat: 37.51491382139469, lng: 127.11195359701143, address: 'aaa', click: false },
        ],
        isCategory = false,
        noClick = false,
    } = props;
    const [position, setPosition] = useState<{ lat: number; lng: number }>({
        lat: -1,
        lng: -1,
    });
    const [info, setInfo] = useState(-1);
    const [mapCenter, setMapCenter] = useState({ lat: 37.51491382139469, lng: 127.10195359701143 });
    const [map, setMap] = useState<kakao.maps.Map>();
    const geocoder = new kakao.maps.services.Geocoder();
    const bounds = new kakao.maps.LatLngBounds();

    const activeImg = {
        src: testgif,
        size: {
            width: 30,
            height: 30,
        },
        options: {
            offset: {
                x: 15,
                y: 15,
            },
            style: {
                zIndex: 10,
            },
        },
    };
    const defaultImg = {
        src: Default,
        size: {
            width: 14,
            height: 14,
        },
        options: {
            offset: {
                x: 6,
                y: 11,
            },
        },
    };
    useEffect(() => {
        let clickList = false;
        foundPosition.map((item: { click: boolean; lat: number; lng: number; address: string }) => {
            if (item.click) {
                clickList = true;
                return setMapCenter({
                    lat: item.lat,
                    lng: item.lng,
                });
            }
        });
        if (clickList) {
            return;
        } else {
            //TODO : 발견 리스트 마커 전체 보이게 하는 코드
            // bounds.extend(new kakao.maps.LatLng(missPosition?.lat, missPosition?.lng));
            // foundPosition.map((item) => {
            //     return bounds.extend(new kakao.maps.LatLng(item.lat, item.lng));
            // });
            // map?.setBounds(bounds);
            return setMapCenter({
                lat: missPosition.lat,
                lng: missPosition.lng,
            });
        }
    }, [map]);

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

            setAddress({
                lat: position.lat,
                lng: position.lng,
                address: address.address_name,
            });
        }
    };

    const searchCheck = () => {
        return search === '' || search === undefined || search === null;
    };
    useEffect(() => {
        if (searchCheck()) return;
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
        <MapContainer>
            <Map
                center={mapCenter}
                level={6}
                style={{ ...size, borderRadius }}
                onClick={noClick ? undefined : mapClick}
                onCreate={setMap}
            >
                {position && (
                    <>
                        <MapMarker position={position} image={activeImg}></MapMarker>
                    </>
                )}
                {missPosition && (
                    <>
                        <MapMarker position={{ lat: missPosition.lat, lng: missPosition.lng }}></MapMarker>
                        <CustomOverlayMap position={{ lat: missPosition.lat, lng: missPosition.lng }}>
                            <InfoWindow type="miss" roadAddress={true}>
                                <div>
                                    <b>지번 주소</b> : {missPosition.address}
                                    <br />
                                    <b>도로명 주소</b> : ㅁ니ㅏㅇ런미ㅏ;런ㅁ리ㅏㅓ니ㅏㄹ
                                </div>
                            </InfoWindow>
                        </CustomOverlayMap>
                    </>
                )}
                {foundPosition.map(
                    (
                        item: {
                            click: boolean;
                            lat: number;
                            lng: number;
                            address: string;
                        },
                        idx: number,
                    ) => {
                        const position = { lat: item.lat, lng: item.lng };
                        const address = item.address;
                        return (
                            <>
                                <MapMarker
                                    key={idx}
                                    position={position}
                                    image={item.click ? activeImg : defaultImg}
                                    onMouseOver={(e) => {
                                        setInfo(idx);
                                    }}
                                    onMouseOut={() => setInfo(-1)}
                                />
                                <CustomOverlayMap position={position}>
                                    {idx === info && (
                                        <InfoWindow type="withess" roadAddress={false}>
                                            <div>
                                                <b>지번 주소</b> : {address}
                                            </div>
                                        </InfoWindow>
                                    )}
                                </CustomOverlayMap>
                            </>
                        );
                    },
                )}
            </Map>
            {isCategory && (
                <Category>
                    <Img src={Lost} alt="실종 위치" width={12} height={17.33} />
                    <Text> 실종 위치</Text>
                    <Img src={Active} alt="실종 위치" width={14} height={14} />
                    <Text> 선택 발견 위치</Text>
                    <Img src={Default} alt="실종 위치" width={14} height={14} />
                    <Text> 발견 위치</Text>
                </Category>
            )}
        </MapContainer>
    );
};
export default ReactKaKaoMap;
