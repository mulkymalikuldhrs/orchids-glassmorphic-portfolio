'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function TrackerInner() {
  const searchParams = useSearchParams();
  const clickId = searchParams.get('click_id') || searchParams.get('cid') || searchParams.get('clickid');

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        await fetch('/api/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ clickId }),
        });
      } catch (error) {
        console.error('Failed to track visitor:', error);
      }
    };

    trackVisitor();
  }, [clickId]);

  return null;
}

export function VisitorTracker() {
  return (
    <Suspense fallback={null}>
      <TrackerInner />
    </Suspense>
  );
}
