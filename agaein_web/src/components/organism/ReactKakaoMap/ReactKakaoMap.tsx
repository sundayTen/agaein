//@ts-nocheck
import Active from 'assets/image/Active.png';
import Default from 'assets/image/Default.png';
import Lost from 'assets/image/Lost.png';
import testgif from 'assets/image/testgif.gif';
import { Location } from 'graphql/generated/generated';
import { useEffect, useState } from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import { Category, Img, InfoWindow, MapContainer, Text } from './ReactKakaoMap.style';
interface ReactKakaoMapProps {
    search?: string | undefined;
    setAddress?: (value: Location) => void;
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
        roadAddress: string;
        address: string;
    };
    foundPosition?: Location[];
    listClickIdx?: number;
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
        missPosition,
        foundPosition = [],
        isCategory = false,
        noClick = false,
        listClickIdx,
    } = props;
    const [position, setPosition] = useState<{ lat: number; lng: number }>({
        lat: -1,
        lng: -1,
    });
    const [infoIdx, setInfoIdx] = useState(-1);
    const [mapCenter, setMapCenter] = useState({ lat: 37.51491382139469, lng: 127.10195359701143 });
    const [location, setLocation] = useState<{ address: string; roadAddress: string }>({
        address: '',
        roadAddress: '',
    });
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
        !!missPosition &&
            setMapCenter({
                lat: missPosition?.lat,
                lng: missPosition?.lng,
            });
    }, [map]);

    useEffect(() => {
        if (foundPosition) {
            for (let idx = 0; idx < foundPosition.length; idx++) {
                const item = foundPosition[idx];
                if (idx === listClickIdx) {
                    setMapCenter({
                        lat: item.lat,
                        lng: item.lng,
                    });
                    break;
                } else {
                    !!missPosition &&
                        setMapCenter({
                            lat: missPosition?.lat,
                            lng: missPosition?.lng,
                        });
                }
            }
        }
    }, [listClickIdx]);

    useEffect(() => {
        setAddress({ ...position, ...location } as Location);
    }, [position, location]);

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

            setLocation({ address: address.address_name, roadAddress: roadAddress?.address_name });
        }
    };

    const nullCheck = (value: any) => {
        return value === '' || value === undefined || value === null;
    };
    useEffect(() => {
        if (nullCheck(search)) return;
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
                            <InfoWindow type="miss" roadAddress={!nullCheck(missPosition.roadAddress)}>
                                <div>
                                    <b>지번 주소</b> : {missPosition.address}
                                    {!nullCheck(missPosition.roadAddress) && (
                                        <>
                                            <br /> <b>도로명 주소</b> : {missPosition.roadAddress}
                                        </>
                                    )}
                                </div>
                            </InfoWindow>
                        </CustomOverlayMap>
                    </>
                )}
                {foundPosition?.map((item, idx) => {
                    const position = { lat: item.lat, lng: item.lng };
                    const address = item.address;
                    return (
                        <div key={idx}>
                            <MapMarker
                                position={position}
                                image={idx === listClickIdx ? activeImg : defaultImg}
                                onMouseOver={() => {
                                    setInfoIdx(idx);
                                }}
                                onMouseOut={() => setInfoIdx(-1)}
                            />
                            <CustomOverlayMap position={position}>
                                {idx === infoIdx && (
                                    <InfoWindow type="witness" roadAddress={!nullCheck(item.roadAddress)}>
                                        <div>
                                            <b>지번 주소</b> : {address}
                                            {!nullCheck(item.roadAddress) && (
                                                <>
                                                    <br /> <b>도로명 주소</b> : {item.roadAddress}
                                                </>
                                            )}
                                        </div>
                                    </InfoWindow>
                                )}
                            </CustomOverlayMap>
                        </div>
                    );
                })}
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
