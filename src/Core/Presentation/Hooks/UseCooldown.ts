import { useCallback, useEffect, useMemo, useState } from "react";

type UseCooldownOptions = {
    durationSeconds: number;
    storageKey?: string;
};

function readStoredUntilMs(storageKey: string): number | null {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(storageKey);
    const parsed = raw ? Number(raw) : NaN;
    if (!Number.isFinite(parsed)) return null;
    return parsed;
}

export default function useCooldown({ durationSeconds, storageKey }: UseCooldownOptions) {
    const [untilMs, setUntilMs] = useState<number | null>(() => (storageKey ? readStoredUntilMs(storageKey) : null));
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
        if (typeof window === "undefined") return;
        if (!untilMs) {
            window.localStorage.removeItem(storageKey);
            return;
        }
        if (!isActive) {
            window.localStorage.removeItem(storageKey);
            return;
        }
        window.localStorage.setItem(storageKey, String(untilMs));
    }, [isActive, storageKey, untilMs]);

    const start = useCallback(
        (overrideDurationSeconds?: number) => {
            const duration = overrideDurationSeconds ?? durationSeconds;
            const nextUntil = Date.now() + duration * 1000;
            setUntilMs(nextUntil);
            setNowMs(Date.now());
            if (storageKey && typeof window !== "undefined") {
                window.localStorage.setItem(storageKey, String(nextUntil));
            }
        },
        [durationSeconds, storageKey],
    );

    const clear = useCallback(() => {
        setUntilMs(null);
        setNowMs(Date.now());
        if (storageKey && typeof window !== "undefined") {
            window.localStorage.removeItem(storageKey);
        }
    }, [storageKey]);

    return {
        secondsLeft,
        isActive,
        start,
        clear,
    };
}
