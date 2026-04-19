import AddCarrierPageMainComponent from '@/src/components/dispatcher/AddCarrierPageMainComponent'
import React, { Suspense } from 'react'

export default function AddCarrierPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <AddCarrierPageMainComponent />
    </Suspense>
  );
}
