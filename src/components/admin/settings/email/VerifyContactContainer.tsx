"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SecurityTip from "./SecurityTip";

type Step = "registered" | "enter" | "error";
const STEP_LIST: Step[] = ["registered", "enter", "error"];

type VerifyContactContainerProps<T> = {
    title: string;
    description: string;

    registeredValue: string;
    actualValue: string;

    inputValue: T;
    setInputValue: (v: T) => void;

    validate: (input: T) => boolean;
    onSuccessRedirect: string;

    renderRegistered: (onContinue: () => void) => React.ReactNode;
    renderInput: (props: {
        error: string;
        onSubmit: () => void;
    }) => React.ReactNode;
};

export default function VerifyContactContainer<T>({
    title,
    description,
    registeredValue,
    actualValue,
    inputValue,
    setInputValue,
    validate,
    onSuccessRedirect,
    renderRegistered,
    renderInput,
}: VerifyContactContainerProps<T>) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const stepFromUrl = searchParams.get("step") as Step | null;

    const initialStep = useMemo<Step>(() => {
        return STEP_LIST.includes(stepFromUrl as Step)
            ? (stepFromUrl as Step)
            : "registered";
    }, [stepFromUrl]);

    const [step, setStep] = useState<Step>(initialStep);
    const [error, setError] = useState("");

    useEffect(() => {
        if (initialStep !== step) {
            setStep(initialStep);
        }
    }, [initialStep]);

    const updateStepInUrl = (nextStep: Step) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("step", nextStep);
        router.replace(`?${params.toString()}`, { scroll: false });
        setStep(nextStep);
    };

    const handleContinue = () => updateStepInUrl("enter");

    const handleSubmit = () => {
        if (!validate(inputValue)) {
            setError("The value you entered does not match your registered information. Please check again.");
            updateStepInUrl("error");
            return;
        }

        setError("");
        router.push(onSuccessRedirect);
    };

    return (
        <section className="w-full rounded-xl border border-[#26344B] bg-[#18222A] px-6 py-6 sm:px-10">
            {/* Header */}
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <p className="mt-1 text-sm text-white/50">{description}</p>

            <div className="my-4 h-px w-full bg-white/10" />

            {/* Inner */}
            <div className="w-full rounded-lg border border-[#252528] bg-[rgba(8,14,30,0.60)] p-4 sm:p-6">
                {step === "registered" && renderRegistered(handleContinue)}

                {(step === "enter" || step === "error") &&
                    renderInput({
                        error,
                        onSubmit: handleSubmit,
                    })}
            </div>

            <SecurityTip />
        </section>
    );
}
