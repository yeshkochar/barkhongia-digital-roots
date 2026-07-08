let currentLanguage: "en" | "as" = "en";

export const setGlobalLanguage = (lang: "en" | "as") => {
  currentLanguage = lang;
};

export const getGlobalLanguage = () => currentLanguage;
