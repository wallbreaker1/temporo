import "server-only";

export const getDictionary = async (locale: "it" | "ro", page: string) =>
  import(`./dictionaries/${page}/${locale}.json`).then((m) => m.default);
