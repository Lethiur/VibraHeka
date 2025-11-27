import { ReactNode } from "react";
import "./SideImageBlock.scss";

interface SideImageBlockProps {
    image: string;
    imageLeft?: boolean;
    children: ReactNode;
}

export default function SideImageBlock({
    image,
    imageLeft = true,
    children,
}: SideImageBlockProps) {
    return (
        <div className={`side-block ${imageLeft ? "left" : "right"}`}>
            <div className="side-block__image">
                <img src={image} alt="" />
            </div>

            <div className="side-block__content">
                {children}
            </div>
        </div>
    );
}
