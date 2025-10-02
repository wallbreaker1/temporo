export default function Nav({ dict }: { dict: any }) {
  return (
    <nav>
      <a href="/">{dict.home}</a>
      <a href="/about">{dict.about}</a>
      <a href="/contact">{dict.contact}</a>
    </nav>
  );
}
