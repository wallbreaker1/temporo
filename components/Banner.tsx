type BannerProps = { title: string; description: string };
export default function Banner({ title, description }: BannerProps) {
  return (
    <section>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}
