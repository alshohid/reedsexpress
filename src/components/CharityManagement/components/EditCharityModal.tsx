/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useMemo, useState } from "react";
import { Modal } from "../../ui/modal";
import TextInputField from "../../ui/input/TextInputField";
import SelectField from "../../ui/input/searchInput/SelectField";
import UploadDropzoneField from "../../ui/input/UploadDropzoneField";
import type {
  CharityData,
  IUpdateCharityPayload,
} from "@/src/types/adminCharityTypes";
import {
  formatCountryLabel,
  getCountryOptions,
  validateCharityUrl,
} from "./charityUtils";
import Image from "next/image";
import StatusNotice from "../../ui/StatusNotice";

type FormErrors = {
  charityName?: string;
  country?: string;
  url?: string;
};

type EditCharityModalProps = {
  isOpen: boolean;
  onClose: () => void;
  charity: CharityData | null;
  isLoading?: boolean;
  isSubmitting?: boolean;
  errorMessage?: string;
  onSubmit: (payload: IUpdateCharityPayload) => Promise<void> | void;
};

export default function EditCharityModal({
  isOpen,
  onClose,
  charity,
  isLoading = false,
  isSubmitting = false,
  errorMessage = "",
  onSubmit,
}: EditCharityModalProps) {
  const [charityName, setCharityName] = useState("");
  const [country, setCountry] = useState("");
  const [url, setUrl] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [uploadFieldKey, setUploadFieldKey] = useState(0);
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setCharityName(charity?.charity_name || "");
    setCountry(charity?.country || "");
    setUrl(charity?.url || "");
    setLogo(null);
    setFieldErrors({});
    setUploadFieldKey((prev) => prev + 1);
  }, [charity, isOpen]);

  const countryOptions = useMemo(
    () => getCountryOptions(charity?.country),
    [charity?.country],
  );

  const validateForm = () => {
    const nextErrors: FormErrors = {};

    if (!charityName.trim()) {
      nextErrors.charityName = "Charity name is required.";
    }

    if (!country) {
      nextErrors.country = "Please select a country or region.";
    }

    if (!url.trim()) {
      nextErrors.url = "Fundraiser URL is required.";
    } else if (!validateCharityUrl(url.trim())) {
      nextErrors.url = "Enter a valid URL including http:// or https://.";
    }

    setFieldErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const updateFieldError = (field: keyof FormErrors, value?: string) => {
    setFieldErrors((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!charity || isSubmitting) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    await onSubmit({
      charity_name: charityName.trim(),
      country,
      url: url.trim(),
      logo: logo ?? undefined,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="w-[calc(100%-24px)] max-w-[520px] rounded-[28px] border border-[#E4EBDD] bg-[#FCFDFB] p-6 sm:p-7"
    >
      <div className="space-y-5">
        <div>
          <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-[#7C8A72]">
            Edit Charity
          </p>
          <h3 className="mt-2 text-[1.25rem] font-semibold text-[#161721]">
            Update saved charity information
          </h3>
          {charity ? (
            <p className="mt-1 text-[13px] text-[#667164]">
              {formatCountryLabel(charity.country)} charity details can be updated
              here.
            </p>
          ) : null}
        </div>

        {isLoading ? (
          <div className="rounded-[18px] border border-[#E9EEE4] bg-white px-4 py-8 text-center text-sm text-[#667164]">
            Loading charity details...
          </div>
        ) : charity ? (
          <>
            {errorMessage ? (
              <StatusNotice
                variant="error"
                title="Update Failed"
                message={errorMessage}
              />
            ) : null}

            <div className="space-y-4">
              <TextInputField
                label="Charity Name"
                required
                value={charityName}
                error={fieldErrors.charityName}
                onChange={(event) => {
                  setCharityName(event.target.value);
                  updateFieldError("charityName");
                }}
                placeholder="Enter charity name"
              />

              <div>
                <label className="text-[13px] font-medium text-[#161721]">
                  Set Country/Region <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <SelectField
                    options={countryOptions}
                    placeholder="Select Country"
                    value={country}
                    onChange={(value) => {
                      setCountry(value);
                      updateFieldError("country");
                    }}
                    selectClassName="
                      h-12 bg-white border-[#CFCFD6] text-[#161721]
                      focus:border-[#8FA17E]
                    "
                  />
                </div>
                {fieldErrors.country ? (
                  <p className="mt-2 text-[12px] text-red-600">
                    {fieldErrors.country}
                  </p>
                ) : null}
              </div>

              {charity.logo_url ? (
                <div className="rounded-[16px] border border-[#E5ECDB] bg-[#F7FAF3] p-4">
                  <p className="text-[13px] font-medium text-[#161721]">
                    Current Logo
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <Image
                      src={charity.logo_url}
                      alt={charity.charity_name}
                      width={56}
                      height={56}
                      unoptimized
                      crossOrigin="anonymous"
                      className="h-14 w-14 rounded-[14px] border border-[#DCE7D1] object-cover"
                    />
                    <p className="text-[12px] text-[#667164]">
                      Upload a new logo only if you want to replace the current one.
                    </p>
                  </div>
                </div>
              ) : null}

              <UploadDropzoneField
                key={uploadFieldKey}
                label="Replace Logo"
                hint="Optional. JPG or PNG (max 3MB)"
                maxSizeMb={3}
                onFileChange={(file) => {
                  setLogo(file);
                }}
              />

              <TextInputField
                label="Fundraiser URL"
                required
                value={url}
                error={fieldErrors.url}
                onChange={(event) => {
                  setUrl(event.target.value);
                  updateFieldError("url");
                }}
                placeholder="Paste associated link here"
              />
            </div>

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 items-center justify-center rounded-[12px] border border-[#D7E3CC] bg-white px-5 text-sm font-medium text-[#3F4A3B] transition hover:bg-[#F6F9F2]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void handleSubmit()}
                disabled={isSubmitting}
                className="inline-flex h-11 items-center justify-center rounded-[12px] bg-[#3F4A3B] px-5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </>
        ) : (
          <StatusNotice
            variant="error"
            title="Unable To Load"
            message="Charity details could not be loaded for editing."
          />
        )}
      </div>
    </Modal>
  );
}
