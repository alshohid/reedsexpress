"use client";

import { useState } from "react";
import VerifyContactContainer from "./VerifyContactContainer";
import RegisteredEmail from "./RegisteredEmail";
import EnterEmail from "./EnterEmail";

export default function VerifyEmailContainer({userType="user"}:any) {
    const registeredEmail = "jann***ha@gmail.com";
    const actualEmail = "jannatulfarinha@gmail.com";

    const [email, setEmail] = useState("");

    return (
        <VerifyContactContainer
            title="Verify Registered Email"
            description="We will send a one-time verification code to the email address linked to your account."
            registeredValue={registeredEmail}
            actualValue={actualEmail}
            inputValue={email}
            setInputValue={setEmail}
            validate={(val) => val === actualEmail}
            onSuccessRedirect={`/${userType}/dashboard/settings/security/2fa/otp-verify/?type=email `}
            renderRegistered={(onContinue) => (
                <RegisteredEmail email={registeredEmail} onContinue={onContinue} />
            )}
            renderInput={({ error, onSubmit }) => (
                <EnterEmail
                    value={email}
                    onChange={setEmail}
                    error={error}
                    onSend={onSubmit}
                />
            )}
        />
    );
}
