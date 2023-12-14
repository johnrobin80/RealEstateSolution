export interface FileUploadSource {
  key: number;
  lastModified: number;
  lastModifiedDate: string;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
  file?: string;
}
