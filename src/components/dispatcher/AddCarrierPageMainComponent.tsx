'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import TopTabs, { TabItem } from '@/src/components/common/TopTabs';
import CarrierInformationForm from './CarrierInformationForm';
import CarrierDocumentsForm from './CarrierDocumentsForm';
import SubmissionDoneModal from './SubmissionDoneModal';
import { useState } from 'react';

type AddCarrierTabType = 'carrier-information' | 'documents';

const ADD_CARRIER_TABS: TabItem<AddCarrierTabType>[] = [
  { key: 'carrier-information', label: 'Carrier Information' },
  { key: 'documents', label: 'Documents' },
];

export default function AddCarrierPageMainComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeTab =
    (searchParams.get('tab') as AddCarrierTabType) || 'carrier-information';

  const handleTabChange = (key: AddCarrierTabType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', key);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const goToDocumentsTab = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', 'documents');
    router.push(`${pathname}?${params.toString()}`, { scroll: true});
  };

  const goToInformationTab = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', 'carrier-information');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <main className="min-h-screen">
        <section className="space-y-4">
          <TopTabs
            tabs={ADD_CARRIER_TABS}
            activeKey={activeTab}
            onChange={handleTabChange}
          />

          {activeTab === 'carrier-information' && (
            <CarrierInformationForm
              onNext={goToDocumentsTab}
              onCancel={() => router.back()}
            />
          )}

          {activeTab === 'documents' && (
            <CarrierDocumentsForm
              onBack={goToInformationTab}
              onSubmit={() => setIsModalOpen(true)}
            />
          )}
        </section>
      </main>

      <SubmissionDoneModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
