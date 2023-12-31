export interface Term {
  id: string;
  hour: string;
  dayOfWeek: string;
  numberDay: string;
  month: string;
  year: string;
  idDr: string;
  idPt?: string;
  nameDr: string;
  lastNameDr: string;
  namePt: string;
  lastNamePt: string;
}

export interface ScheduleHour {
  id?: string;
  idDr: string;
  day: string;
  hour: string;
  className?: string;
}
