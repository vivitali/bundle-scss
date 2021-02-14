export declare const removeImports: (
  content: string,
  fileType: string
) => string;
export declare const getUniqueStyleFiles: (
  files: Array<string>,
  fileExtension: string
) => string[];
export declare const getImports: (
  content: string,
  baseDir: string,
  fileExtension: string,
  imports?: Array<string>
) => string[];
