import { getDictionary } from "./dictionaries";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

export async function generateStaticParams() {
  return [{ lang: "it" }, { lang: "ro" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}): Promise<React.ReactNode> {
  const { lang } = await params;
  const navDict = await getDictionary(lang as "it" | "ro", "nav");
  const footerDict = await getDictionary(lang as "it" | "ro", "footer");

  return (
    <html lang={lang}>
      <body>
        <Nav dict={navDict} />
        {children}
        <Footer dict={footerDict} />
      </body>
    </html>
  );
}
