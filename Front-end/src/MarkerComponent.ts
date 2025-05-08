import { useEffect } from 'react';
import markerSDK from '@marker.io/browser';

export default function MarkerComponent() {
  useEffect(() => {
    markerSDK.loadWidget({
      project: '655894bebf2365992dbbf1cf',
    });
  }, []);

  return null;
}
