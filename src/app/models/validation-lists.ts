export interface ValidationDataList {
  header: ValidationHeaders;
  details: Array<ValidationDetails>;
}
export interface ValidationDetails {
  validationDetail: string;
}

export interface ValidationHeaders {
  validationHeader: string;
}
