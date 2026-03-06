import { ReactNode } from "react";
import { Fade } from "react-bootstrap";
import { useInView } from "react-intersection-observer";
import "./Reveal.scss";

type RevealVariant = "up" | "left" | "right" | "scale";

interface RevealProps {
    children: ReactNode;
    delay?: number;
    variant?: RevealVariant;
    className?: string;
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
    timeout?: number;
}

export default function Reveal({
    children,
    delay = 0,
    variant = "up",
    className = "",
    threshold = 0.15,
    rootMargin = "0px 0px -8% 0px",
    triggerOnce = true,
    timeout = 620,
}: RevealProps) {
    const { ref, inView } = useInView({
        triggerOnce,
        threshold,
        rootMargin,
    });

    return (
        <Fade in={inView} timeout={timeout}>
            <div
                ref={ref}
                className={`vh-reveal ${inView ? "is-visible" : ""} ${className}`.trim()}
                data-reveal={variant}
                style={{ ["--vh-reveal-delay" as string]: `${delay}ms` }}
            >
                {children}
            </div>
        </Fade>
    );
}
