import { getDictionary } from "./dictionaries";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import "../globals.css";

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
        <div>
          <div className="max-w-6xl mx-auto px-4">
            <Nav dict={navDict} />
          </div>
          <div className="pt-20">{children}</div>
          <Footer dict={footerDict} currentLang={lang as "it" | "ro"} />
        </div>
      </body>
    </html>
  );
}
