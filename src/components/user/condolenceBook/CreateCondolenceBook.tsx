"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import TextInputField from "@/src/components/ui/input/TextInputField";
import SelectField, { SelectOption } from "@/src/components/ui/input/searchInput/SelectField";
import Switch from "@/src/components/ui/switch/Switch";
import UploadDropzoneField from "../../ui/input/UploadDropzoneField";
import { useModal } from "@/src/hooks/useModal";
import CondolenceModal from "./CondolenceModal";
import { useRouter } from "next/navigation";

type FormValues = {
    title: string;
    deceasedPerson: string;
    nee: string;
    from: string;
    to: string;
};

type PrefKey = "enableComments" | "condolenceMessageAlerts" | "public" | "enablePrint";

type PrefItem = {
    key: PrefKey;
    title: string;
    desc: string;
};

export default function CreateCondolenceBook() {
    const router = useRouter();
    const { isOpen: isCondolenceBookModalOpen, openModal: openCondolenceBookModal, closeModal: closeCondolenceBookModal } = useModal()
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            title: "",
            deceasedPerson: "",
            nee: "",
            from: "",
            to: "",
        },
        mode: "onSubmit",
    });

    const titleOptions: SelectOption[] = useMemo(
        () => [
            { label: "Condolence Book for", value: "condolence-book-for" },
            { label: "In Loving Memory of", value: "in-loving-memory-of" },
        ],
        []
    );

    const deceasedOptions: SelectOption[] = useMemo(
        () => [
            { label: "Isabel Pérez", value: "isabel-perez" },
            { label: "John Ryan", value: "john-ryan" },
            { label: "Rodríguez, Elena", value: "rodriguez-elena" },
        ],
        []
    );

    const onCreate = async (values: FormValues) => {
        try {
            openCondolenceBookModal()
            console.log("Create condolence:", values);
        } catch (error) {
            console.log(error)
        }
        // ✅ later: API call
    };


    const prefItems: PrefItem[] = useMemo(
        () => [
            {
                key: "enableComments",
                title: "Enable Comments",
                desc: "By enabling you let others to comment.",
            },
            {
                key: "condolenceMessageAlerts",
                title: "Condolence Message Alerts",
                desc: "Receive an email when a new message is posted to a Tribute Wall.",
            },
            {
                key: "public",
                title: "Public",
                desc: "By public mode, anyone can see the Condolence book otherwise Private.",
            },
            {
                key: "enablePrint",
                title: "Enable Print Option",
                desc: "By enabling the option, anyone can print the book",
            },
        ],
        []
    );

    const [prefs, setPrefs] = useState<Record<PrefKey, boolean>>({
        enableComments: false,
        condolenceMessageAlerts: false,
        public: false,
        enablePrint: false,
    });

    const updatePref = (key: PrefKey, value: boolean) => {
        setPrefs((prev) => ({ ...prev, [key]: value }));
    };

    const handlePrefsUpdate = () => {
        console.log("prefs:", prefs);
        // ✅ later: API call
    };
    const handlePreview = () => {
        console.log("Preview");
        router.push("/user/dashboard/condolence-book/perview");
    }
    const handleConfirm = () => {

        console.log("Confirm");
    }
    return (
        <div className="w-full">
            <div className="grid gap-8 grid-cols-[1fr_1fr]">
                {/* ================= LEFT CARD ================= */}
                <div className="w-full rounded-[12px] border border-[#E9E9EA] bg-white p-4 sm:p-6">
                    <form onSubmit={handleSubmit(onCreate)} className="space-y-5">
                        {/* Upload */}
                        <UploadDropzoneField
                            label="Upload an Image"
                            hint="JPG or PNG (max 3MB)"
                            maxSizeMb={3}
                            onFileChange={(file) => {
                                // ✅ If you want store file in RHF:
                                // setValue("image", file as any);
                                console.log("file:", file);
                            }}
                        />

                        {/* Title (SelectField) */}
                        <div>
                            <p className="mb-2 text-[14px] font-medium text-[#161721]">Title</p>
                            <SelectField
                                options={titleOptions}
                                placeholder="e.g. Condolence Book for"
                                value={""}
                                onChange={(v) => setValue("title", v, { shouldValidate: true })}
                                selectClassName="
                  h-12 bg-white border-[#CFCFD6] text-[#161721]
                  focus:border-[#8FA17E]
                "
                            />
                            {errors.title?.message ? (
                                <p className="mt-1 text-[12px] text-red-500">{errors.title.message}</p>
                            ) : null}
                        </div>

                        {/* Deceased Person Name (SelectField) */}
                        <div>
                            <p className="mb-2 text-[14px] font-medium text-[#161721]">
                                Deceased Person Name <span className="text-red-500">*</span>
                            </p>
                            <SelectField
                                options={deceasedOptions}
                                placeholder="e.g. Madrid"
                                value={""}
                                onChange={(v) => setValue("deceasedPerson", v, { shouldValidate: true })}
                                selectClassName="
                  h-12 bg-white border-[#CFCFD6] text-[#161721]
                  focus:border-[#8FA17E]
                "
                            />
                            {errors.deceasedPerson?.message ? (
                                <p className="mt-1 text-[12px] text-red-500">{errors.deceasedPerson.message}</p>
                            ) : null}
                        </div>

                        {/* Nee */}
                        <TextInputField
                            label="Née"
                            required
                            placeholder="e.g. Nee Blanca"
                            {...register("nee", { required: "Née is required" })}
                            error={errors.nee?.message as string}
                            inputClassName="h-12 bg-white border-[#CFCFD6] text-[#161721] focus:border-[#8FA17E]"
                        />

                        {/* Date range */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <TextInputField
                                label="From"
                                required
                                placeholder="DD/MM/YYYY"
                                type="date"
                                {...register("from", { required: "From date is required" })}
                                error={errors.from?.message as string}
                                inputClassName="h-12 bg-white border-[#CFCFD6] text-[#161721] focus:border-[#8FA17E]"
                            />
                            <TextInputField
                                label="To"
                                required
                                placeholder="DD/MM/YYYY"
                                type="date"
                                {...register("to", { required: "To date is required" })}
                                error={errors.to?.message as string}
                                inputClassName="h-12 bg-white border-[#CFCFD6] text-[#161721] focus:border-[#8FA17E]"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            disabled={false}
                            type="submit"
                            className="
                                mt-2
                                h-12 w-full sm:w-[260px]
                                rounded-[10px]
                                bg-[linear-gradient(180deg,#394034_0%,#4F5747_100%)]
                                text-white text-[14px] font-medium
                                hover:opacity-90 transition
                            "
                        >
                            Create Condolence Book
                        </button>
                    </form>
                </div>

                {/* ================= RIGHT CARD ================= */}
                <div className="w-full">
                    <div className="w-full ml-auto">
                        <h2 className="text-[28px] font-medium text-[#161721]">
                            Notification Preferences
                        </h2>

                        <div className="mt-6 divide-y divide-black/5">
                            {prefItems.map((item) => (
                                <div
                                    key={item.key}
                                    className="flex items-center justify-between gap-4 py-5"
                                >
                                    <div className="min-w-0">
                                        <p className="text-[18px] font-semibold text-[#161721]">
                                            {item.title}
                                        </p>
                                        <p className="mt-1 text-[14px] text-[#777980]">{item.desc}</p>
                                    </div>

                                    <div className="shrink-0">
                                        <Switch
                                            checked={prefs[item.key]}
                                            onCheckedChange={(v: boolean) => updatePref(item.key, v)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={handlePrefsUpdate}
                            className="
                mt-10
                h-12 w-full sm:w-[160px]
                rounded-[10px]
                bg-[linear-gradient(180deg,#394034_0%,#4F5747_100%)]
                text-white text-[14px] font-medium
                hover:opacity-90 transition
              "
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>

            <CondolenceModal
                isOpen={isCondolenceBookModalOpen}
                onClose={closeCondolenceBookModal}
                deceasedName="Isabel Pérez"
                onConfirm={handleConfirm}
                onPreview={handlePreview}
                confirmLabel="Confirm"
                previewLabel="Preview"
                isLoading={false}
            />
        </div>
    );
}