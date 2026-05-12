export type Locale = "ja" | "en";

export const defaultLocale: Locale = "ja";

export function detectLocale(pathname: string): Locale {
  return pathname.startsWith("/en") ? "en" : "ja";
}

export function localizePath(path: string, locale: Locale): string {
  const [baseWithQuery, hash = ""] = path.split("#");
  const [base, query = ""] = baseWithQuery.split("?");
  const normalizedBase = base.startsWith("/") ? base : `/${base}`;

  const raw =
    locale === "en"
      ? normalizedBase.startsWith("/en")
        ? normalizedBase
        : normalizedBase === "/"
          ? "/en"
          : `/en${normalizedBase}`
      : normalizedBase.startsWith("/en/")
        ? normalizedBase.slice(3)
        : normalizedBase === "/en"
          ? "/"
          : normalizedBase;

  const withQuery = query ? `${raw}?${query}` : raw;
  return hash ? `${withQuery}#${hash}` : withQuery;
}

export function alternateLocale(locale: Locale): Locale {
  return locale === "ja" ? "en" : "ja";
}
