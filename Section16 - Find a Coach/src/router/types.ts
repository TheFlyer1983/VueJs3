export interface RouterPath {
  path: string;
  name: string;
}

export interface RouterPaths {
  [key: string]: RouterPath;
}
