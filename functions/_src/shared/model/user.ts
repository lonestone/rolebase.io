export interface UserMetadata {
  calendarShowWeekend?: boolean
  ratedApp?: boolean
  // RRULE of digsst or false if disabled
  digestRrule?: string | false
  // Date of last digest
  digestLastDate?: string
}
