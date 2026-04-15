"use client";

import { IllustrationIcon } from "@/src/icons";
import { authRoutes } from "@/src/lib/auth/config";
import { getErrorMessage } from "@/src/lib/getErrorMessage";
import {
  useForgotPasswordMutation,
  useResendVerificationEmailMutation,
  useResetPasswordMutation,
} from "@/src/redux/features/auth/authapi";
import FooterLegal from "@/src/sharedComponents/shared/FooterLegal";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ClipboardEvent,
} from "react";
import { useForm, useWatch } from "react-hook-form";
import { GoEye, GoEyeClosed } from "react-icons/go";

type Step = "email" | "reset" | "success";

type ForgotPasswordForm = {
  email: string;
  code: string[];
  password: string;
  confirmPassword: string;
};

const CODE_LENGTH = 6;
const formInputClassName =
  "w-full rounded-2xl border border-[#D5DACE] bg-[#FCFDF9] px-4 py-3.5 text-sm text-[#2E332B] shadow-[0_12px_30px_rgba(54,63,44,0.08)] outline-none transition placeholder:text-[#98A091] hover:border-[#BAC2B2] focus:border-[#4A5640] focus:bg-white focus:ring-4 focus:ring-[#4A5640]/10";
const readOnlyInputClassName =
  "w-full rounded-2xl border border-[#D5DACE] bg-[#F2F5EE] px-4 py-3.5 text-sm text-[#4E5746] shadow-[0_12px_30px_rgba(54,63,44,0.06)] outline-none";
const passwordInputClassName = `${formInputClassName} pr-12`;
const primaryButtonClassName =
  "w-full rounded-xl bg-[#424A3B] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#32382D] disabled:cursor-not-allowed disabled:bg-[#9BA18F]";
const secondaryButtonClassName =
  "w-full rounded-xl border border-[#CCD4C3] bg-white/70 px-4 py-3 text-sm font-medium text-[#4A5640] transition hover:border-[#AEB8A3] hover:bg-white";
const stepOrder: Array<Exclude<Step, "success">> = ["email", "reset"];

const getStepFromQuery = (value: string | null, email: string): Step => {
  if (value === "reset" && email) {
    return "reset";
  }

  if (value === "success") {
    return "success";
  }

  return "email";
};

export default function ForgotPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryEmail = searchParams.get("email")?.trim() ?? "";
  const step = getStepFromQuery(searchParams.get("step"), queryEmail);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const [forgotPassword, forgotPasswordState] = useForgotPasswordMutation();
  const [resendVerificationEmail, resendVerificationEmailState] =
    useResendVerificationEmailMutation();
  const [resetPassword, resetPasswordState] = useResetPasswordMutation();

  const { register, handleSubmit, control, formState, setValue, getValues } =
    useForm<ForgotPasswordForm>({
      mode: "onChange",
      shouldUnregister: true,
      defaultValues: {
        email: "",
        code: Array(CODE_LENGTH).fill(""),
        password: "",
        confirmPassword: "",
      },
    });

  const emailValue = useWatch({ control, name: "email" });
  const codeValue = useWatch({ control, name: "code" });
  const passwordValue = useWatch({ control, name: "password" });
  const confirmPasswordValue = useWatch({
    control,
    name: "confirmPassword",
  });
  const joinedCode = (codeValue ?? []).join("");
  const codeInputs = useMemo(
    () => Array.from({ length: CODE_LENGTH }, (_, index) => index),
    [],
  );
  const codeInputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (!queryEmail) {
      return;
    }

    setValue("email", queryEmail, {
      shouldDirty: false,
      shouldValidate: step === "email",
    });
  }, [queryEmail, setValue, step]);

  const updateUrlState = (nextStep: Step, nextEmail = "") => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextStep === "email") {
      params.delete("step");
    } else {
      params.set("step", nextStep);
    }

    if (nextStep === "success") {
      params.delete("email");
    } else if (nextEmail) {
      params.set("email", nextEmail);
    } else {
      params.delete("email");
    }

    const query = params.toString();

    router.replace(
      query ? `${authRoutes.forgotPassword}?${query}` : authRoutes.forgotPassword,
      { scroll: false },
    );
  };

  const clearFeedback = () => {
    setServerError("");
    setStatusMessage("");
  };

  const assertSuccessfulResponse = (
    response: { success?: boolean; message?: string },
    fallbackMessage: string,
  ) => {
    if (response.success === false) {
      throw new Error(response.message || fallbackMessage);
    }

    return response;
  };

  const clearResetFields = () => {
    codeInputs.forEach((index) => {
      setValue(`code.${index}`, "", {
        shouldDirty: false,
        shouldValidate: false,
      });
    });

    setValue("password", "", {
      shouldDirty: false,
      shouldValidate: false,
    });
    setValue("confirmPassword", "", {
      shouldDirty: false,
      shouldValidate: false,
    });
  };

  const focusCodeInput = (index: number) => {
    codeInputRefs.current[index]?.focus();
    codeInputRefs.current[index]?.select();
  };

  const setCodeValue = (index: number, value: string) => {
    setValue(`code.${index}`, value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleCodeChange = (index: number, value: string) => {
    const digits = value.replace(/\D/g, "");

    if (digits.length === 0) {
      setCodeValue(index, "");
      return;
    }

    if (digits.length === 1) {
      setCodeValue(index, digits);

      if (index < CODE_LENGTH - 1) {
        focusCodeInput(index + 1);
      }

      return;
    }

    const maxFill = Math.min(digits.length, CODE_LENGTH - index);

    for (let i = 0; i < maxFill; i += 1) {
      setCodeValue(index + i, digits[i]);
    }

    const nextIndex = Math.min(index + maxFill, CODE_LENGTH - 1);
    focusCodeInput(nextIndex);
  };

  const handleCodeKeyDown = (index: number, key: string) => {
    if (key === "Backspace") {
      const currentValue = getValues(`code.${index}`);

      if (!currentValue && index > 0) {
        focusCodeInput(index - 1);
      }
    }

    if (key === "ArrowLeft" && index > 0) {
      focusCodeInput(index - 1);
    }

    if (key === "ArrowRight" && index < CODE_LENGTH - 1) {
      focusCodeInput(index + 1);
    }
  };

  const handleCodePaste = (
    event: ClipboardEvent<HTMLInputElement>,
    startIndex: number,
  ) => {
    event.preventDefault();
    const digits = event.clipboardData.getData("text").replace(/\D/g, "");

    if (!digits) {
      return;
    }

    const maxFill = Math.min(digits.length, CODE_LENGTH - startIndex);

    for (let i = 0; i < maxFill; i += 1) {
      setCodeValue(startIndex + i, digits[i]);
    }

    const nextIndex = Math.min(startIndex + maxFill, CODE_LENGTH - 1);
    focusCodeInput(nextIndex);
  };

  const handleSendCode = async ({ email }: ForgotPasswordForm) => {
    const normalizedEmail = email.trim();

    try {
      clearFeedback();

      const response = assertSuccessfulResponse(
        await forgotPassword({
          email: normalizedEmail,
        }).unwrap(),
        "We couldn't send the OTP right now. Please try again.",
      );

      setValue("email", normalizedEmail, {
        shouldDirty: true,
        shouldValidate: true,
      });
      clearResetFields();
      setStatusMessage(
        response.message || "A 6-digit OTP has been sent to your email.",
      );
      updateUrlState("reset", normalizedEmail);
    } catch (error) {
      setServerError(
        getErrorMessage(
          error,
          "We couldn't send the OTP right now. Please try again.",
        ),
      );
    }
  };

  const handlePasswordReset = async ({ password, code }: ForgotPasswordForm) => {
    if (!queryEmail) {
      setServerError("Please enter your email first.");
      updateUrlState("email");
      return;
    }

    const token = code.join("");

    if (token.length !== CODE_LENGTH) {
      setServerError("Please enter the complete 6-digit OTP.");
      return;
    }

    try {
      clearFeedback();

      const response = assertSuccessfulResponse(
        await resetPassword({
          email: queryEmail,
          token,
          password,
        }).unwrap(),
        "We couldn't reset your password. Please try again.",
      );

      clearResetFields();
      setStatusMessage(
        response.message || "Your password has been updated successfully.",
      );
      updateUrlState("success");
    } catch (error) {
      setServerError(
        getErrorMessage(
          error,
          "We couldn't reset your password. Please try again.",
        ),
      );
    }
  };

  const handleResendCode = async () => {
    if (!queryEmail) {
      setServerError("Please enter your email first.");
      updateUrlState("email");
      return;
    }

    try {
      clearFeedback();

      const response = assertSuccessfulResponse(
        await resendVerificationEmail({
          email: queryEmail,
        }).unwrap(),
        "We couldn't resend the OTP. Please try again.",
      );

      codeInputs.forEach((index) => {
        setValue(`code.${index}`, "", {
          shouldDirty: false,
          shouldValidate: false,
        });
      });
      setStatusMessage(response.message || "A new OTP has been sent to your email.");
      focusCodeInput(0);
    } catch (error) {
      setServerError(
        getErrorMessage(
          error,
          "We couldn't resend the OTP. Please try again.",
        ),
      );
    }
  };

  const handleUseAnotherEmail = () => {
    clearFeedback();
    clearResetFields();
    setValue("email", queryEmail, {
      shouldDirty: true,
      shouldValidate: true,
    });
    updateUrlState("email", queryEmail);
  };

  const currentStepIndex =
    step === "success" ? stepOrder.length : stepOrder.indexOf(step) + 1;

  const isEmailStepValid =
    Boolean(emailValue?.trim()) && !formState.errors.email;
  const isResetStepValid =
    Boolean(queryEmail) &&
    joinedCode.length === CODE_LENGTH &&
    Boolean(passwordValue) &&
    passwordValue.length >= 8 &&
    Boolean(confirmPasswordValue) &&
    confirmPasswordValue === passwordValue;

  const infoMessage =
    statusMessage ||
    (step === "reset" ? "Enter the OTP sent to your email to continue." : "");

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cover bg-bottom px-6 py-12"
      style={{
        backgroundImage: "url('/images/johnrayn_login_bg_image.png')",
      }}
    >
      <div className="relative z-10 w-full max-w-136 rounded-[28px] bg-white/90 px-6 py-8 shadow-[0_24px_80px_rgba(43,50,35,0.18)] backdrop-blur-md md:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6B755F]">
            Account Recovery
          </p>
          <div className="mt-4 flex gap-2">
            {stepOrder.map((item, index) => {
              const isFilled = step === "success" || index < currentStepIndex;

              return (
                <span
                  key={item}
                  className={`h-1.5 flex-1 rounded-full ${
                    isFilled ? "bg-[#424A3B]" : "bg-[#D9DED3]"
                  }`}
                />
              );
            })}
          </div>
          {step !== "success" && (
            <p className="mt-3 text-sm text-[#7A8074]">
              Step {currentStepIndex} of {stepOrder.length}
            </p>
          )}
        </div>

        {infoMessage && step !== "success" && (
          <p className="mb-5 rounded-2xl border border-[#DBE3D3] bg-[#F7FBF1] px-4 py-3 text-sm text-[#3F4937]">
            {infoMessage}
          </p>
        )}

        {serverError && (
          <p className="mb-5 rounded-2xl border border-[#F1D2D2] bg-[#FFF4F4] px-4 py-3 text-sm text-[#B53636]">
            {serverError}
          </p>
        )}

        {step === "email" && (
          <>
            <h1 className="text-2xl font-semibold text-[#20231D]">
              Forgot your password?
            </h1>
            <p className="mt-2 text-sm text-[#7A8074]">
              Enter your email and we&apos;ll send you a 6-digit OTP to reset
              your password.
            </p>

            <form
              className="mt-6 space-y-5"
              onSubmit={handleSubmit(handleSendCode)}
            >
              <div className="space-y-2">
                <label
                  htmlFor="forgot-email"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#5F6858]"
                >
                  Email Address
                </label>
                <input
                  id="forgot-email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  className={formInputClassName}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Enter a valid email address",
                    },
                  })}
                />
                {formState.errors.email && (
                  <p className="text-xs text-[#C64545]">
                    {formState.errors.email.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className={primaryButtonClassName}
                disabled={!isEmailStepValid || forgotPasswordState.isLoading}
              >
                {forgotPasswordState.isLoading ? "Sending OTP..." : "Send OTP"}
              </button>

              <Link href={authRoutes.login} className={secondaryButtonClassName}>
                Back to login
              </Link>
            </form>
          </>
        )}

        {step === "reset" && (
          <>
            <h1 className="text-2xl font-semibold text-[#20231D]">
              Enter OTP and new password
            </h1>
            <p className="mt-2 text-sm text-[#7A8074]">
              Use the OTP sent to your email, then set a new password for your
              account.
            </p>

            <form
              className="mt-6 space-y-5"
              onSubmit={handleSubmit(handlePasswordReset)}
            >
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#5F6858]">
                  Email Address
                </label>
                <input
                  type="text"
                  readOnly
                  value={queryEmail}
                  className={readOnlyInputClassName}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#5F6858]">
                  OTP Code
                </label>
                <div className="flex justify-between gap-2">
                  {codeInputs.map((index) => (
                    <input
                      key={index}
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={1}
                      aria-label={`OTP digit ${index + 1}`}
                      className="h-14 w-12 rounded-2xl border border-[#D5DACE] bg-[#FCFDF9] text-center text-xl font-semibold text-[#2E332B] outline-none transition hover:border-[#BAC2B2] focus:border-[#4A5640] focus:bg-white focus:ring-4 focus:ring-[#4A5640]/10 md:h-16 md:w-14"
                      onPaste={(event) => handleCodePaste(event, index)}
                      onKeyDown={(event) =>
                        handleCodeKeyDown(index, event.key)
                      }
                      {...(() => {
                        const registration = register(`code.${index}`, {
                          required: true,
                        });

                        return {
                          ...registration,
                          onChange: (event: ChangeEvent<HTMLInputElement>) => {
                            registration.onChange(event);
                            handleCodeChange(index, event.target.value);
                          },
                          ref: (element: HTMLInputElement | null) => {
                            registration.ref(element);
                            codeInputRefs.current[index] = element;
                          },
                        };
                      })()}
                    />
                  ))}
                </div>
                {joinedCode.length > 0 && joinedCode.length < CODE_LENGTH && (
                  <p className="text-xs text-[#C64545]">
                    Enter the full 6-digit OTP.
                  </p>
                )}
              </div>

              <div className="rounded-2xl bg-[#F7F8F4] p-4 text-sm text-[#5F6858]">
                <p>Didn&apos;t get the OTP?</p>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    className="text-left font-medium text-[#424A3B] transition hover:underline disabled:cursor-not-allowed disabled:text-[#98A091]"
                    onClick={handleResendCode}
                    disabled={resendVerificationEmailState.isLoading}
                  >
                    {resendVerificationEmailState.isLoading
                      ? "Resending OTP..."
                      : "Resend OTP"}
                  </button>
                  <button
                    type="button"
                    className="text-left font-medium text-[#424A3B] transition hover:underline"
                    onClick={handleUseAnotherEmail}
                  >
                    Use another email
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="forgot-password"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#5F6858]"
                >
                  New Password
                </label>
                <div className="relative">
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer rounded-full p-1 text-[#56604D] transition hover:bg-[#EEF1E8] hover:text-[#3F4937]"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <GoEyeClosed size={18} />
                    ) : (
                      <GoEye size={18} />
                    )}
                  </button>
                  <input
                    id="forgot-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    autoComplete="new-password"
                    className={passwordInputClassName}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                  />
                </div>
                {formState.errors.password && (
                  <p className="text-xs text-[#C64545]">
                    {formState.errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="forgot-confirm"
                  className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#5F6858]"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer rounded-full p-1 text-[#56604D] transition hover:bg-[#EEF1E8] hover:text-[#3F4937]"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <GoEyeClosed size={18} />
                    ) : (
                      <GoEye size={18} />
                    )}
                  </button>
                  <input
                    id="forgot-confirm"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    autoComplete="new-password"
                    className={passwordInputClassName}
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === passwordValue || "Passwords do not match",
                    })}
                  />
                </div>
                {formState.errors.confirmPassword && (
                  <p className="text-xs text-[#C64545]">
                    {formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className={primaryButtonClassName}
                disabled={!isResetStepValid || resetPasswordState.isLoading}
              >
                {resetPasswordState.isLoading
                  ? "Resetting password..."
                  : "Reset password"}
              </button>

              <Link href={authRoutes.login} className={secondaryButtonClassName}>
                Back to login
              </Link>
            </form>
          </>
        )}

        {step === "success" && (
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#F2F7ED]">
              <IllustrationIcon />
            </div>
            <h1 className="text-2xl font-semibold text-[#20231D]">
              Password updated
            </h1>
            <p className="mt-2 text-sm text-[#7A8074]">
              {statusMessage ||
                "Your password has been reset successfully. You can now sign in with your new password."}
            </p>

            <Link
              href={authRoutes.login}
              className={`mt-6 inline-flex ${primaryButtonClassName}`}
            >
              Back to login
            </Link>
          </div>
        )}
      </div>

      <FooterLegal />
    </div>
  );
}
