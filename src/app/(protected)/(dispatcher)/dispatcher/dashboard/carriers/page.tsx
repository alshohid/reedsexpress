import CarriersPageMainComponent from '@/src/components/dispatcher/CarriersPageMainComponent'
import React, { Suspense } from 'react'

export default function CarriesPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <CarriersPageMainComponent/>
    </Suspense>
  )
}
