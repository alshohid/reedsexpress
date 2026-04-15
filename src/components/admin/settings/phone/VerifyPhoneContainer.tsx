"use client";

import { useState } from "react";
import VerifyContactContainer from "../email/VerifyContactContainer";
import RegisteredPhone from "./RegisteredPhone";
import EnterPhone from "./EnterPhone";


export default function VerifyPhonePage({userType="user"}) {
    const registeredPhone = "+1******789";
    const actualPhone = "123456789";

    const [phone, setPhone] = useState("");

    return (
        <VerifyContactContainer
            title="Verify Registered Phone Number"
            description="We will send a one-time verification code to the phone number linked to your account."
            registeredValue={registeredPhone}
            actualValue={actualPhone}
            inputValue={phone}
            setInputValue={setPhone}
            validate={(val) => val === actualPhone}
            onSuccessRedirect={`/${userType}/dashboard/settings/security/2fa/otp-verify/?type=phone`}
            renderRegistered={(onContinue) => (
                <RegisteredPhone phone={registeredPhone} onContinue={onContinue} />
            )}
            renderInput={({ error, onSubmit }) => (
                <EnterPhone
                    value={phone}
                    onChange={setPhone}
                    error={error}
                    onSend={onSubmit}
                />
            )}
        />
    );
}
