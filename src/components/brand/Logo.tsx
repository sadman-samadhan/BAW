import { ApeMark } from "./ApeMark";

type Props = {
  tone?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: { mark: 34, word: "text-[1.35rem]", web: "text-[0.6rem]", gap: "gap-2.5" },
  md: { mark: 44, word: "text-[1.75rem]", web: "text-[0.7rem]", gap: "gap-3" },
  lg: { mark: 96, word: "text-[3.25rem]", web: "text-[0.95rem]", gap: "gap-5" },
};

/**
 * Mark + "Big Ape" wordmark + "WEB", matching logo concept A.
 * Rendered as real text so it stays crisp and readable by screen readers.
 */
export function Logo({ tone = "light", size = "sm", className = "" }: Props) {
  const s = sizes[size];
  return (
    <span className={`inline-flex items-center ${s.gap} ${className}`} translate="no">
      <ApeMark size={s.mark} variant={tone === "dark" ? "dark" : "light"} />
      <span className="flex flex-col leading-none">
        <span
          className={`${s.word} font-display font-extrabold`}
          style={{ letterSpacing: "-0.045em", lineHeight: 0.85 }}
        >
          Big Ape
        </span>{" "}
        <span
          className={`${s.web} mt-1 font-mono font-bold ${tone === "dark" ? "text-banana" : ""}`}
          style={{ letterSpacing: "0.42em" }}
        >
          WEB
        </span>
      </span>
    </span>
  );
}
