import Link from "next/link";

type FooterDict = {
  copyright: string;
  privacy: string;
  terms?: string;
  contact?: string;
};

export default function Footer({ dict }: { dict: FooterDict }) {
  return (
    <footer className="border-t border-gray-800 py-8 mt-16">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-400 text-sm">{dict.copyright}</p>

        <div className="flex gap-6">
          <Link
            href="/privacy"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            {dict.privacy}
          </Link>
          {dict.terms && (
            <Link
              href="/terms"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              {dict.terms}
            </Link>
          )}
          {dict.contact && (
            <Link
              href="/contact"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              {dict.contact}
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}
