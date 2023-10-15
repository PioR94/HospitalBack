export interface Term {
  id: string;
  hour: string;
  dayOfWeek: string;
  numberDay: string;
  month: string;
  year: string;
  idDr: string;
  loginDr: string;
  nameDr: string;
  lastNameDr: string;
  reservation?: number;
}

export interface FreeTerm {
  id: string;
  hour: string;
  numberDay: string;
  month: string;
  year: string;
  reservation?: number;
}
