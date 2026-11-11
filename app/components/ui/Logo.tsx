import { site } from "../../content/site";

interface LogoProps {
  /** color = black + red (light backgrounds) · white = for dark backgrounds · black = one-colour */
  variant?: "color" | "white" | "black";
  /** Rendered height in px; width follows the logo's 720×366 shape */
  height?: number;
  className?: string;
}

/** CHS Tours logo. TODO: switch to SVG files once supplied (sharper at every size). */
export function Logo({ variant = "color", height = 44, className }: LogoProps) {
  const width = Math.round((height * 720) / 366);
  return (
    <img
      src={`/brand/chs-logo-${variant}.png`}
      alt={site.name}
      width={width}
      height={height}
      className={className}
      decoding="async"
    />
  );
}
