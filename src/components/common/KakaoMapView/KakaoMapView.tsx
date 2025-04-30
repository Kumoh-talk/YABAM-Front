import { useEffect, useRef } from 'react';

export interface Props {
  className?: string;
  onLoad?: (map: kakao.maps.Map) => void;
}

export const KakaoMapView = (props: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<kakao.maps.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const options = {
      center: new kakao.maps.LatLng(36.142043, 128.394253),
      level: 3,
    };

    const map = new kakao.maps.Map(containerRef.current, options);
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    mapRef.current = map;
    props.onLoad?.(map);
  }, [containerRef.current]);
  return <div ref={containerRef} className={props.className}></div>;
};
