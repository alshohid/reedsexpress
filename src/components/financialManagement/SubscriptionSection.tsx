"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/src/lib/getErrorMessage";
import {
    useDeleteSubscriptionPlanByIdMutation,
    useGetAdminSubscriptionPlanQuery,
} from "@/src/redux/features/admin/subscriptionPlan/subscriptionPlan";
import { IAdminSubscriptionPlanData } from "@/src/types/adminSubscriptionPlanTypes";
import StatusNotice from "../ui/StatusNotice";
import PlansGrid, { SubscriptionPlanCardItem } from "./PlansGrid";

type FeedbackState = {
    variant: "success" | "error";
    title: string;
    message: string;
};

const formatCurrency = (price: string) => {
    const numericPrice = Number(price);

    if (Number.isNaN(numericPrice)) {
        return `£${price}`;
    }

    return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(numericPrice);
};

const getPeriodLabel = (plan: IAdminSubscriptionPlanData) => {
    if (plan.type === "PAY_AS_YOU_GO") {
        return plan.credits ? `/${plan.credits} credits` : "/post";
    }

    return `/${(plan.billing_period || "monthly").toLowerCase()}`;
};

export default function SubscriptionSection() {
    const router = useRouter();
    const [feedback, setFeedback] = useState<FeedbackState | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const {
        data: subscriptionPlanResponse,
        error,
        isLoading,
    } = useGetAdminSubscriptionPlanQuery();
    const [deleteSubscriptionPlan] = useDeleteSubscriptionPlanByIdMutation();

    const handleDelete = async (plan: IAdminSubscriptionPlanData) => {
        const shouldDelete = window.confirm(`Delete "${plan.name}"? This action cannot be undone.`);

        if (!shouldDelete) {
            return;
        }

        try {
            setDeletingId(plan.id);
            const response = await deleteSubscriptionPlan(plan.id).unwrap();

            setFeedback({
                variant: "success",
                title: "Plan Deleted",
                message: response.message || `${plan.name} has been deleted successfully.`,
            });
        } catch (deleteError) {
            setFeedback({
                variant: "error",
                title: "Delete Failed",
                message: getErrorMessage(deleteError, "Failed to delete the subscription plan."),
            });
        } finally {
            setDeletingId(null);
        }
    };

    const plans: SubscriptionPlanCardItem[] = (subscriptionPlanResponse?.data ?? []).map((plan) => ({
        id: plan.id,
        title: plan.name,
        price: formatCurrency(plan.price),
        periodLabel: getPeriodLabel(plan),
        features: plan.benefits ?? [],
        onEdit: () => router.push(`/admin/dashboard/financial-management/edit?planId=${plan.id}`),
        onDelete: () => handleDelete(plan),
        isDeleteLoading: deletingId === plan.id,
    }));

    const errorMessage = error
        ? getErrorMessage(error, "Failed to load subscription plans.")
        : "";

    return (
        <div className="w-full space-y-4">
            {feedback ? (
                <StatusNotice
                    variant={feedback.variant}
                    title={feedback.title}
                    message={feedback.message}
                />
            ) : null}

            {errorMessage ? (
                <StatusNotice
                    variant="error"
                    title="Unable To Load Subscription Plans"
                    message={errorMessage}
                />
            ) : null}

            <PlansGrid
                plans={plans}
                isLoading={isLoading}
                onAddPlan={() => router.push("/admin/dashboard/financial-management/edit?mode=create")}
            />
        </div>
    );
}
