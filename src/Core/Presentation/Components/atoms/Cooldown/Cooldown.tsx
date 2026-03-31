export type CooldownProps = {
    secondsLeft: number;
};

export default function Cooldown({ secondsLeft }: CooldownProps) {
    if (secondsLeft <= 0) return null;
    return <span>{` (${secondsLeft}s)`}</span>;
}
