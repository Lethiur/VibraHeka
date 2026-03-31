import React, { useRef } from "react";
import PrimaryButton, { ButtonProps } from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import useCooldown from "@core/Presentation/Hooks/UseCooldown";
import useLocalStorage from "@core/Presentation/Hooks/UseLocalStorage";
import LocalStorageService from "@core/Infrastructure/Storage/LocalStorageService";

export type CooldownButtonProps = Omit<ButtonProps, "onClick" | "label" | "disabled"> & {
    label: React.ReactNode;
    cooldownSeconds: number;
    cooldownStorageKey: string;
    action: () => Promise<boolean> | boolean;
    disabled?: boolean;
    storageService?: LocalStorageService;
};

export default function CooldownButton({
    label,
    cooldownSeconds,
    cooldownStorageKey,
    action,
    disabled = false,
    storageService,
    ...buttonProps
}: CooldownButtonProps) {
    const contextStorage = useLocalStorage();
    const storage = storageService ?? contextStorage;

    const cooldown = useCooldown({
        durationSeconds: cooldownSeconds,
        storageKey: cooldownStorageKey,
        storage,
    });

    const inFlightRef = useRef(false);

    const handleClick = async () => {
        if (disabled || cooldown.isActive || inFlightRef.current) return;
        inFlightRef.current = true;
        try {
            const ok = await action();
            if (ok) cooldown.start();
        } finally {
            inFlightRef.current = false;
        }
    };

    const composedLabel = (
        <>
            {label}
            {cooldown.secondsLeft > 0 ? ` (${cooldown.secondsLeft}s)` : null}
        </>
    );

    return (
        <PrimaryButton
            {...buttonProps}
            label={composedLabel}
            onClick={handleClick}
            disabled={disabled || cooldown.isActive}
        />
    );
}

