'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import TopTabs, { TabItem } from '@/src/components/common/TopTabs';
import CarrierInformationForm from './CarrierInformationForm';
import CarrierDocumentsForm from './CarrierDocumentsForm';
import SubmissionDoneModal from './SubmissionDoneModal';
import { useState } from 'react';
import { InfoIconNew } from '@/src/icons';

type AddCarrierTabType = 'Onboard a Carrier' | 'documents';

const ADD_CARRIER_TABS: TabItem<AddCarrierTabType>[] = [
  { key: 'Onboard a Carrier', label: 'Onboard a Carrier' },
  { key: 'documents', label: 'Documents' },
];

export default function AddCarrierPageMainComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeTab =
    (searchParams.get('tab') as AddCarrierTabType) || 'Onboard a Carrier';

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
    params.set('tab', 'Onboard a Carrier');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <main className="min-h-screen">
        <section className="space-y-4">
          <div className="rounded-[8px] border border-[#C7D2FE] bg-[#EEF2FF] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-[14px] font-semibold text-[#111827]">
                  Note
                </h4>
                <p className="mt-1 text-[13px] leading-5 text-[#344054]">
                  Add a carrier first to send packet invitation. Upon accepting
                  the packet invitation, the Carrier will be activated.
                </p>
              </div>

              <div>
                <InfoIconNew/>
              </div>
            </div>
          </div>
          <TopTabs
            tabs={ADD_CARRIER_TABS}
            activeKey={activeTab}
            onChange={handleTabChange}
          />

          {activeTab === 'Onboard a Carrier' && (
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
