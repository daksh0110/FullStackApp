import React, { Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';

const AdsList = React.lazy(() => import('./AdsList'));

const AdsListWrapper: React.FC = () => {
  return (
    <Suspense fallback={<Skeleton height={300} width="100%" />}>
      <AdsList />
    </Suspense>
  );
};

export default AdsListWrapper;