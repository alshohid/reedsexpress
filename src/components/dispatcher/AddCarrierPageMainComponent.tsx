'use client';

import { useState } from 'react';
import TopTabs, { TabItem } from '@/src/components/common/TopTabs';
import CarrierInformationForm from './CarrierInformationForm';
import CarrierDocumentsForm from './CarrierDocumentsForm';
import SubmissionDoneModal from './SubmissionDoneModal';

type AddCarrierTabType = 'carrier-information' | 'documents';

const ADD_CARRIER_TABS: TabItem<AddCarrierTabType>[] = [
  { key: 'carrier-information', label: 'Carrier Information' },
  { key: 'documents', label: 'Documents' },
];

export default function AddCarrierPageMainComponent() {
  const [activeTab, setActiveTab] = useState<AddCarrierTabType>(
    'carrier-information',
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <main className="min-h-screen">
        <section className="space-y-4">
          <TopTabs
            tabs={ADD_CARRIER_TABS}
            activeKey={activeTab}
            onChange={setActiveTab}
          />

          {activeTab === 'carrier-information' && (
            <CarrierInformationForm
              onNext={() => setActiveTab('documents')}
              onCancel={() => window.history.back()}
            />
          )}

          {activeTab === 'documents' && (
            <CarrierDocumentsForm
              onBack={() => setActiveTab('carrier-information')}
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
