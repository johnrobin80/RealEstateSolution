// export class Country {
//   id!: number | null;
//   name!: string | null;
//   status!: string | null;
//   createdon!: Date | null;
//   lastupdatedon?: Date | null;
// }

export interface IResponseData {
  success: boolean;
  message: string;
  statusCode: number;
  validationErrors: string[];
  data: Countries[];
}

export interface Countries {
  countryid?: number | null;
  countryname?: string | null;
  countrycode?: string | null;
  createdon?: string | null;
  statusname?: string | null;
  isactive?: boolean | false;
}

export interface AddCountry {
  countryname: string | null;
  countrycode: string | null;
  isactive: boolean | false;
}

export interface UpdateCountry {
  countryid: number | null;
  countryname: string | null;
  countrycode: string | null;
  isactive: boolean | false;
}
