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
  params: { lang: string };
}): Promise<React.ReactNode> {
  const lang = params.lang as "it" | "ro";
  const navDict = await getDictionary(lang, "nav");
  const footerDict = await getDictionary(lang, "footer");

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
