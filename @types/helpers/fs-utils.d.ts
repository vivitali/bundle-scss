export declare const isFile: (f: string) => boolean;
export declare const readSync: (filePath: string) => string;
export declare const cwDir: () => string;
export declare const resolveDirDest: (fileDest: string) => void;
export declare const writeAsync: (
  path: string,
  content: string
) => Promise<unknown>;
export declare const fileType: (fileName: string) => string;
export declare const defineExtension: (
  filePath: string,
  fileExtension: string
) => string;
