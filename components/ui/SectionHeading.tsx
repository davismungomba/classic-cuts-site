import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment =
    align === "center"
      ? "items-center text-center mx-auto"
      : "items-start text-left";

  return (
    <div className={`flex max-w-2xl flex-col gap-5 ${alignment}`}>
      <Reveal>
        <span className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.32em] text-brass">
          <span className="h-px w-8 bg-brass" aria-hidden />
          {eyebrow}
        </span>
      </Reveal>
      <RevealText
        as="h2"
        className="text-balance font-display text-4xl font-semibold leading-[1.1] text-bone sm:text-5xl"
      >
        {title}
      </RevealText>
      {description ? (
        <Reveal delay={0.15}>
          <p className="text-base leading-relaxed text-bone-dim sm:text-lg">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
