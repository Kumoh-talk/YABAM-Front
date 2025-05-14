import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { LocationPoint } from '@/types';
import { InputChangeHandler } from '@/hooks/useInputs';
import { KakaoMapView } from '../KakaoMapView/KakaoMapView';

export interface Props {
  className?: string;
  name?: string;
  onChange?: InputChangeHandler<LocationPoint>;
  value?: LocationPoint;
}

export const LocationInput = (props: Props) => {
  const [kakaoMap, setKakaoMap] = useState<kakao.maps.Map | null>(null);
  const pointMarker = useRef<kakao.maps.Marker | null>(null);

  const onClick = (mouseEvent: { latLng: kakao.maps.LatLng }) => {
    var latlng = mouseEvent.latLng;
    pointMarker.current?.setPosition(latlng);
    props.onChange?.({
      target: {
        name: props.name ?? '',
        value: {
          latitude: latlng.getLat(),
          longitude: latlng.getLng(),
        },
      },
    });
  };

  useEffect(() => {
    if (!kakaoMap) {
      return;
    }
    const marker = new kakao.maps.Marker({
      position: props.value
        ? new kakao.maps.LatLng(props.value.latitude, props.value.longitude)
        : kakaoMap.getCenter(),
    });
    marker.setMap(kakaoMap);
    pointMarker.current = marker;

    kakao.maps.event.addListener(kakaoMap, 'click', onClick);

    return () => {
      kakao.maps.event.removeListener(kakaoMap, 'click', onClick);
      pointMarker.current?.setMap(null);
    };
  }, [kakaoMap]);

  useEffect(() => {
    if (!pointMarker.current || !props.value || !kakaoMap) {
      return;
    }
    pointMarker.current.setPosition(
      new kakao.maps.LatLng(props.value.latitude, props.value.longitude),
    );
  }, [props.value, kakaoMap]);

  return (
    <div
      className={clsx(
        'flex rounded-lg border overflow-hidden border-gray-500',
        props.className,
      )}
    >
      <KakaoMapView className="w-full h-full" onLoad={setKakaoMap} />
    </div>
  );
};
