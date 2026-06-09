
const englishFiles = import.meta.glob('./locales/en/**/*.json', { eager: true });
const spanishFiles = import.meta.glob('./locales/es/**/*.json', { eager: true });

const processNamespaces = (files: Record<string, any>) => {
  return Object.entries(files).reduce((acc, [path, module]) => {

    const fileName = path.split('/').pop()?.replace('.json', '');
    
    if (fileName) {
      acc[fileName] = (module as any).default;
    }
    
    return acc;
  }, {} as Record<string, any>);
};

const english = processNamespaces(englishFiles);
const spanish = processNamespaces(spanishFiles);

const LANG = {
  ENGLISH: "en",
  SPANISH: "es",
};

export const getI18N = ({
  currentLocale = "es",
}: {
  currentLocale: string | undefined;
}) => {
  if (currentLocale === LANG.ENGLISH) {
    return { ...spanish, ...english };
  }
  return spanish;
};