import Image from "next/image";
import Button from "./Button";
import Link from "next/link";

type ColumnWithImageProps = {
  subtitle?: string;
  title: string;
  description?: string;
  contentBlocks?: Array<{
    description: string;
    highlight?: boolean; // pentru border-left auriu
  }>;
  imageSrc?: string;
  imageAlt?: string;
  cta?: {
    text: string;
    href: string;
  };
  imagePosition?: "left" | "right";
  currentLang?: "ro" | "it";
};

export default function ColumnWithImage({
  subtitle,
  title,
  description,
  contentBlocks,
  imageSrc,
  imageAlt,
  cta,
  imagePosition = "right",
  currentLang = "ro",
}: ColumnWithImageProps) {
  const TextContent = () => (
    <div className="space-y-8">
      <div className="space-y-4">
        {subtitle && (
          <p className="text-[#D2A55D] text-sm lg:text-base font-medium uppercase tracking-wider">
            {subtitle}
          </p>
        )}
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
          {title}
        </h2>
      </div>

      {description && (
        <p className="text-base lg:text-lg text-gray-400 leading-relaxed">
          {description}
        </p>
      )}

      {contentBlocks && contentBlocks.length > 0 && (
        <div className="space-y-4">
          {contentBlocks.map((block, index) => (
            <p
              key={index}
              className={`text-base lg:text-lg text-gray-400 leading-relaxed ${
                block.highlight ? "pl-4 border-l-2 border-[#D2A55D]" : ""
              }`}
            >
              {block.description}
            </p>
          ))}
        </div>
      )}

      {cta && (
        <div className="pt-4">
          <Button variant="primary">
            <Link href={cta.href}>{cta.text}</Link>
          </Button>
        </div>
      )}
    </div>
  );

  const ImageContent = () =>
    imageSrc && (
      <div className="relative lg:sticky lg:top-24">
        <div className="aspect-[4/3] relative">
          <Image
            src={imageSrc}
            alt={imageAlt || ""}
            fill
            className="object-contain"
          />
        </div>
      </div>
    );

  return (
    <section className="py-16 lg:py-20">
      <div
        className={`grid ${
          imageSrc ? "lg:grid-cols-2" : "lg:grid-cols-1 max-w-4xl mx-auto"
        } gap-12 lg:gap-16 items-start`}
      >
        {imagePosition === "left" && <ImageContent />}
        <TextContent />
        {imagePosition === "right" && <ImageContent />}
      </div>
    </section>
  );
}
