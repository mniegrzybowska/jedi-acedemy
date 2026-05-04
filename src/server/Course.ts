export class Course {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly description: string,
    public readonly maxCapacity: number,
    public readonly schedule: string,
    public readonly instructorName: string,
    public readonly enrollmentCount: number
  ) {}

  get availableSpots(): number {
    return this.maxCapacity - this.enrollmentCount;
  }

  isFull(): boolean {
    return this.availableSpots <= 0;
  }
}
