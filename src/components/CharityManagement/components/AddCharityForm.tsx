"use client";

import { getErrorMessage } from "@/src/lib/getErrorMessage";
import { useCreateCharityMutation } from "@/src/redux/features/admin/charity/charityManagement";
import { Skeleton } from "@/src/components/ui/skeleton";
import type {
  ICreateCharityPayload,
  ICreateCharityResponse,
} from "@/src/types/adminCharityTypes";
import { useState } from "react";
import SelectField from "../../ui/input/searchInput/SelectField";
import TextInputField from "../../ui/input/TextInputField";
import UploadDropzoneField from "../../ui/input/UploadDropzoneField";
import LoadingButton from "../../ui/LoadingButton";
import {
  BASE_COUNTRY_OPTIONS,
  validateCharityUrl,
} from "./charityUtils";

type FormErrors = {
  charityName?: string;
  country?: string;
  url?: string;
  logo?: string;
};

const sectionClassName =
  "w-full max-w-[420px] rounded-[12px] border border-[#E9E9EA] bg-white p-5 sm:p-6";

function AddCharityFormSkeleton() {
  return (
    <section className={sectionClassName}>
      <Skeleton className="h-6 w-40 bg-[#E9EEE4]" />

      <div className="mt-6 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-28 bg-[#EEF2E8]" />
          <Skeleton className="h-12 w-full rounded-[10px] bg-[#F5F7F2]" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-32 bg-[#EEF2E8]" />
          <Skeleton className="h-12 w-full rounded-[10px] bg-[#F5F7F2]" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-24 bg-[#EEF2E8]" />
          <Skeleton className="h-[136px] w-full rounded-[10px] bg-[#F5F7F2]" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-28 bg-[#EEF2E8]" />
          <Skeleton className="h-12 w-full rounded-[10px] bg-[#F5F7F2]" />
        </div>

        <Skeleton className="mt-2 h-12 w-full rounded-[10px] bg-[#D7DDD0]" />
      </div>
    </section>
  );
}

export default function AddCharityForm() {
  const [charityName, setCharityName] = useState("");
  const [country, setCountry] = useState("");
  const [url, setUrl] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [uploadFieldKey, setUploadFieldKey] = useState(0);
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [createCharity, { isLoading }] = useCreateCharityMutation();

  const updateFieldError = (field: keyof FormErrors, value?: string) => {
    setFieldErrors((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

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

    if (!logo) {
      nextErrors.logo = "Please upload the charity logo.";
    }

    setFieldErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const assertSuccessfulResponse = (
    response: ICreateCharityResponse | null | undefined,
    fallbackMessage: string,
  ) => {
    if (!response || response.success !== true) {
      throw new Error(response?.message || fallbackMessage);
    }

    return response;
  };

  const resetForm = () => {
    setCharityName("");
    setCountry("");
    setUrl("");
    setLogo(null);
    setFieldErrors({});
    setUploadFieldKey((prev) => prev + 1);
  };

  const handleAddCharity = async () => {
    if (isLoading) {
      return;
    }

    setServerError("");
    setSuccessMessage("");

    if (!validateForm() || !logo) {
      return;
    }

    try {
      const payload: ICreateCharityPayload = {
        charity_name: charityName.trim(),
        country,
        url: url.trim(),
        logo,
      };

      const response = assertSuccessfulResponse(
        await createCharity(payload).unwrap(),
        "Failed to create the charity. Please try again.",
      );

      resetForm();
      setSuccessMessage(response.message || "Charity created successfully.");
    } catch (error) {
      setServerError(
        getErrorMessage(
          error,
          "Failed to create the charity. Please try again.",
        ),
      );
    }
  };

  // if (isLoading) {
  //   return <AddCharityFormSkeleton />;
  // }

  return (
    <section className={sectionClassName}>
      <h3 className="text-[1rem] font-medium text-[#161721]">
        Add a Charity Here
      </h3>

      {successMessage && (
        <p className="mt-4 rounded-[10px] border border-[#D6E9C6] bg-[#F5FBEE] px-4 py-3 text-[13px] text-[#355724]">
          {successMessage}
        </p>
      )}

      {serverError && (
        <p className="mt-4 rounded-[10px] border border-[#F1D2D2] bg-[#FFF4F4] px-4 py-3 text-[13px] text-[#B53636]">
          {serverError}
        </p>
      )}

      <form
        className="mt-4 space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          void handleAddCharity();
        }}
      >
        <TextInputField
          label="Charity Name"
          required
          value={charityName}
          error={fieldErrors.charityName}
          onChange={(event) => {
            setCharityName(event.target.value);
            updateFieldError("charityName");
            setServerError("");
            setSuccessMessage("");
          }}
          placeholder="Enter charity name"
        />

        <div>
          <label className="text-[13px] font-medium text-[#161721]">
            Set Country/Region <span className="text-red-500">*</span>
          </label>
          <div className="mt-2">
            <SelectField
              options={BASE_COUNTRY_OPTIONS}
              placeholder="Select Country"
              value={country}
              onChange={(value) => {
                setCountry(value);
                updateFieldError("country");
                setServerError("");
                setSuccessMessage("");
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

        <UploadDropzoneField
          key={uploadFieldKey}
          label="Upload Logo"
          hint="JPG or PNG (max 3MB)"
          maxSizeMb={3}
          required
          error={fieldErrors.logo}
          onFileChange={(file) => {
            setLogo(file);
            updateFieldError(
              "logo",
              file ? undefined : "Please upload the charity logo.",
            );
            setServerError("");
            setSuccessMessage("");
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
            setServerError("");
            setSuccessMessage("");
          }}
          placeholder="Paste associated link here"
        />

        <LoadingButton isLoading={isLoading} onClick={handleAddCharity} loadingText="Adding Charity...">
          Add Charity
        </LoadingButton>
      </form>
    </section>
  );
}
