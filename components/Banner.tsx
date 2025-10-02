import Button from "./Button";

type BannerProps = { title: string; description: string };
export default function Banner({ title, description }: BannerProps) {
  return (
    <section className="text-center py-16">
      <h1 className="text-5xl font-bold text-white mb-6">{title}</h1>
      <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
        {description}
      </p>
      <Button variant="primary" href="#get-started">
        Get Started
      </Button>
    </section>
  );
}
