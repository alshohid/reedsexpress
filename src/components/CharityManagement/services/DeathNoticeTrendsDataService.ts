export type TrendPoint = {
  day: string;
  thisWeek: number;
  lastWeek: number;
};

export class DeathNoticeTrendsDataService {
  static get7DayTrends(): TrendPoint[] {
    return [
      { day: "Sat", thisWeek: 7, lastWeek: 3 },
      { day: "Sun", thisWeek: 4, lastWeek: 7 },
      { day: "Mon", thisWeek: 7, lastWeek: 11 },
      { day: "Tue", thisWeek: 13, lastWeek: 4 },
      { day: "Wed", thisWeek: 14, lastWeek: 8 },
      { day: "Thu", thisWeek: 10, lastWeek: 12 },
      { day: "Fri", thisWeek: 12, lastWeek: 15 },
    ];
  }
}
