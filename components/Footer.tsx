type FooterDict = {
  copyright: string;
  privacy: string;
};

export default function Footer({ dict }: { dict: FooterDict }) {
  return (
    <footer>
      <p>{dict.copyright}</p>
      <a href="/privacy">{dict.privacy}</a>
    </footer>
  );
}
