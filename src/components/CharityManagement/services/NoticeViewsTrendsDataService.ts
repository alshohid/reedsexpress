export type TrendPoint = {
  day: string;
  thisWeek: number;
  lastWeek: number;
};

export class NoticeViewsTrendsDataService {
  static get7DayViews(): TrendPoint[] {
    return [
      { day: "Sat", thisWeek: 13, lastWeek: 6 },
      { day: "Sun", thisWeek: 8, lastWeek: 14 },
      { day: "Mon", thisWeek: 15, lastWeek: 21 },
      { day: "Tue", thisWeek: 25, lastWeek: 9 },
      { day: "Wed", thisWeek: 29, lastWeek: 16 },
      { day: "Thu", thisWeek: 19, lastWeek: 26 },
      { day: "Fri", thisWeek: 24, lastWeek: 31 },
    ];
  }
}
