'use client';

import React, { useEffect, useMemo, useState } from 'react';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import TopTabs from '@/src/components/common/TopTabs';

import { DetailsTab } from '@/src/components/dispatcher/loads/DetailsTab';
import { DocumentsTab } from '@/src/components/dispatcher/loads/DocumentsTab';
import { TrackLoadTab } from '@/src/components/dispatcher/loads/TrackLoadTab';
import { EditOptionIcon } from '@/src/icons';

export type LoadTabKey = 'details' | 'documents' | 'track-load';

export type DocumentItem = {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
  tag: string;
};

export type TimelineItem = {
  id: string;
  title: string;
  dateTime: string;
  completed: boolean;
  actionLabel?: string;
  actionDisabled?: boolean;
};

export type LoadFormData = {
  carrier: string;
  loadNumber: string;
  brokerName: string;
  brokerReferenceNumber: string;
  brokerEmail: string;
  brokerPhone: string;
  pickupCompanyName: string;
  pickupDate: string;
  pickupAddress: string;
  deliveryCompanyName: string;
  deliveryDate: string;
  deliveryTime: string;
  deliveryTimeType: 'AM' | 'PM';
  deliveryAddress: string;
  driver: string;
  truck: string;
  trailer: string;
  ratePerMile: string;
  totalMiles: string;
  deadheadMiles: string;
  loadedMiles: string;
  additionalNotes: string;
};

export const TABS: { key: LoadTabKey; label: string }[] = [
  { key: 'details', label: 'Details' },
  { key: 'documents', label: 'Documents' },
  { key: 'track-load', label: 'Track Load' },
];

export const MOCK_LOAD: LoadFormData = {
  carrier: 'Moon Delta LTD',
  loadNumber: 'RF-K243',
  brokerName: 'John Doe',
  brokerReferenceNumber: '53423',
  brokerEmail: 'yourmail@gmail.com',
  brokerPhone: '+9968632',
  pickupCompanyName: 'RF logistics',
  pickupDate: '23/04/2025',
  pickupAddress: 'Houston USA, 12 A Lane',
  deliveryCompanyName: 'RF logistics',
  deliveryDate: '23/04/2026',
  deliveryTime: '09:00',
  deliveryTimeType: 'AM',
  deliveryAddress: 'Houston USA, 12 A Lane',
  driver: 'John Doe',
  truck: 'RF-345',
  trailer: 'RF-345',
  ratePerMile: '2.5',
  totalMiles: '300',
  deadheadMiles: '30',
  loadedMiles: '270',
  additionalNotes:
    'Lorem ipsum dolor sit amet consectetur. Faucibus leo tempor in sapien ut quam pulvinar vulputate aliquam.',
};

export const RATE_CONFIRMATION_DOC: DocumentItem = {
  id: 'rate-confirmation',
  name: 'Rate Confirmation.pdf',
  size: '0.7 MB',
  uploadedAt: 'Mar 23, 2026, 09:06 PM',
  tag: 'Rate Confirmation',
};

export const DRIVER_DOCS: DocumentItem[] = [
  {
    id: 'pod',
    name: 'POD - Proof of Delivery.pdf',
    size: '0.7 MB',
    uploadedAt: 'Mar 23, 2026, 09:06 PM',
    tag: 'POD',
  },
  {
    id: 'bol',
    name: 'BOL - Bill of Lading.PDF',
    size: '0.7 MB',
    uploadedAt: 'Mar 23, 2026, 09:06 PM',
    tag: 'BOL',
  },
];

export const INITIAL_TIMELINE: TimelineItem[] = [
  {
    id: 'assigned',
    title: 'Assigned',
    dateTime: '12 Feb 2025 — 09:00',
    completed: true,
    actionLabel: 'Done',
    actionDisabled: true,
  },
  {
    id: 'pickup',
    title: 'Pickup',
    dateTime: '12 Feb 2025 — 09:00',
    completed: true,
    actionLabel: 'Done',
    actionDisabled: true,
  },
  {
    id: 'delivered',
    title: 'Delivered',
    dateTime: '12 Feb 2025 — 09:00',
    completed: true,
    actionLabel: 'Mark Done',
    actionDisabled: false,
  },
  {
    id: 'completed',
    title: 'Completed',
    dateTime: '12 Feb 2025 — 09:00',
    completed: false,
    actionLabel: 'Done',
    actionDisabled: true,
  },
];

export default function ViewLoadPage() {
  const router = useRouter();
  const params = useParams<{ loadId: string }>();
  const searchParams = useSearchParams();

  const activeTabFromUrl = searchParams.get('tab') as LoadTabKey | null;
  const [activeTab, setActiveTab] = useState<LoadTabKey>(
    activeTabFromUrl && TABS.some(tab => tab.key === activeTabFromUrl)
      ? activeTabFromUrl
      : 'details',
  );

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<LoadFormData>(MOCK_LOAD);
  const [savedData, setSavedData] = useState<LoadFormData>(MOCK_LOAD);
  const [showUploadBox, setShowUploadBox] = useState(false);
  const [timeline, setTimeline] = useState<TimelineItem[]>(INITIAL_TIMELINE);

  const loadId = useMemo(() => {
    return Array.isArray(params?.loadId) ? params.loadId[0] : params?.loadId;
  }, [params]);

  useEffect(() => {
    if (
      activeTabFromUrl &&
      TABS.some(tab => tab.key === activeTabFromUrl) &&
      activeTabFromUrl !== activeTab
    ) {
      setActiveTab(activeTabFromUrl);
    }
  }, [activeTabFromUrl, activeTab]);

  const handleTabChange = (key: LoadTabKey) => {
    setActiveTab(key);
    const query = new URLSearchParams(searchParams.toString());
    query.set('tab', key);
    router.replace(
      `/dispatcher/dashboard/loads/${loadId}?${query.toString()}`,
      { scroll: false },
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(savedData);
    setIsEditing(false);
  };

  const handleSave = () => {
    setSavedData(formData);
    setIsEditing(false);
  };

  const handleDeliveredDone = () => {
    setTimeline(prev =>
      prev.map(item => {
        if (item.id === 'delivered') {
          return {
            ...item,
            actionLabel: 'Done',
            actionDisabled: true,
          };
        }

        if (item.id === 'completed') {
          return {
            ...item,
            completed: true,
            actionDisabled: true,
          };
        }

        return item;
      }),
    );
  };

  return (
    <div className="w-full rounded-2xl border border-[#E7EAF3] bg-white p-4 sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <h1 className="text-[24px] font-bold  text-[#111827] ">
          {activeTab === 'documents'
            ? `Load Documents #${loadId}`
            : activeTab === 'track-load'
              ? `Track Load #${loadId}`
              : `Load Details #${loadId}`}
        </h1>

        {activeTab === 'details' && !isEditing && (
          <button
            type="button"
            onClick={handleEditToggle}
            className="inline-flex h-9  items-center justify-center rounded-lg  text-[#6B7280] transition hover:bg-[#F9FAFB]"
          >
            <EditOptionIcon />
          </button>
        )}

        {activeTab === 'documents' && (
          <button
            type="button"
            onClick={() => setShowUploadBox(prev => !prev)}
            className="inline-flex items-center gap-2 rounded-xl bg-[#2E3A83] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#26306d]"
          >
            <span className="text-base leading-none">+</span> Add New
          </button>
        )}
      </div>

      <div className="mb-6 max-w-95">
        <TopTabs<LoadTabKey>
          tabs={TABS}
          activeKey={activeTab}
          onChange={handleTabChange}
          className="border-none bg-transparent p-0 rounded-none gap-5 flex"
          activeColorClassName="bg-transparent text-[#2E3A83] border-b-1 border-gray-200 border-t-none px-0 py-2 shadow-none"
          inactiveColorClassName="bg-transparent text-[#7C8496] hover:bg-transparent rounded-none px-0 py-2"
        />
      </div>

      {activeTab === 'details' && (
        <DetailsTab
          formData={formData}
          isEditing={isEditing}
          onChange={handleInputChange}
          onCancel={handleCancel}
          onSave={handleSave}
        />
      )}

      {activeTab === 'documents' && (
        <DocumentsTab
          showUploadBox={showUploadBox}
          onDelete={() => {}}
          onDownload={() => {}}
        />
      )}

      {activeTab === 'track-load' && (
        <TrackLoadTab
          timeline={timeline}
          onDeliveredDone={handleDeliveredDone}
        />
      )}
    </div>
  );
}










