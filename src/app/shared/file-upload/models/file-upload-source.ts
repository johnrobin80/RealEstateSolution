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

export interface FileUploadEntity {
  attachid?: number;
  key?: number;
  name: string;
  size: number;
  filetype: string;
  photobinary?: string;
  isactive?: number;
  isdefault?: number;
  createdby?: string;
  updatedby?: string;
  updatedon?: string;
}
