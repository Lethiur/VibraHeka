import { useCallback, useEffect, useMemo, useState } from "react";

type UseCooldownOptions = {
    durationSeconds: number;
    storageKey?: string;
    storage?: {
        getString(key: string): string | null;
        setString(key: string, value: string): void;
        remove(key: string): void;
    };
};

function readStoredUntilMs(storageKey: string, storage?: UseCooldownOptions["storage"]): number | null {
    if (storage) {
        const raw = storage.getString(storageKey);
        const parsed = raw ? Number(raw) : NaN;
        if (!Number.isFinite(parsed)) return null;
        return parsed;
    }
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(storageKey);
    const parsed = raw ? Number(raw) : NaN;
    if (!Number.isFinite(parsed)) return null;
    return parsed;
}

export default function useCooldown({ durationSeconds, storageKey, storage }: UseCooldownOptions) {
    const [untilMs, setUntilMs] = useState<number | null>(() => (storageKey ? readStoredUntilMs(storageKey, storage) : null));
    const [nowMs, setNowMs] = useState<number>(() => Date.now());

    useEffect(() => {
        if (!untilMs) return;
        const id = window.setInterval(() => setNowMs(Date.now()), 250);
        return () => window.clearInterval(id);
    }, [untilMs]);

    const secondsLeft = useMemo(() => {
        if (!untilMs) return 0;
        const msLeft = untilMs - nowMs;
        return Math.max(0, Math.ceil(msLeft / 1000));
    }, [nowMs, untilMs]);

    const isActive = secondsLeft > 0;

    useEffect(() => {
        if (!untilMs) return;
        if (nowMs < untilMs) return;
        setUntilMs(null);
    }, [nowMs, untilMs]);

    useEffect(() => {
        if (!storageKey) return;
        if (!untilMs) {
            if (storage) storage.remove(storageKey);
            else if (typeof window !== "undefined") window.localStorage.removeItem(storageKey);
            return;
        }
        if (!isActive) {
            if (storage) storage.remove(storageKey);
            else if (typeof window !== "undefined") window.localStorage.removeItem(storageKey);
            return;
        }
        if (storage) storage.setString(storageKey, String(untilMs));
        else if (typeof window !== "undefined") window.localStorage.setItem(storageKey, String(untilMs));
    }, [isActive, storage, storageKey, untilMs]);

    const start = useCallback(
        (overrideDurationSeconds?: number) => {
            const duration = overrideDurationSeconds ?? durationSeconds;
            const nextUntil = Date.now() + duration * 1000;
            setUntilMs(nextUntil);
            setNowMs(Date.now());
            if (storageKey) {
                if (storage) storage.setString(storageKey, String(nextUntil));
                else if (typeof window !== "undefined") window.localStorage.setItem(storageKey, String(nextUntil));
            }
        },
        [durationSeconds, storage, storageKey],
    );

    const clear = useCallback(() => {
        setUntilMs(null);
        setNowMs(Date.now());
        if (storageKey) {
            if (storage) storage.remove(storageKey);
            else if (typeof window !== "undefined") window.localStorage.removeItem(storageKey);
        }
    }, [storage, storageKey]);

    return {
        secondsLeft,
        isActive,
        start,
        clear,
    };
}
