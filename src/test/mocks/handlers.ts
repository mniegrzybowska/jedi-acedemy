import { http, HttpResponse } from "msw";

export const mockCourses = [
  {
    id: 1,
    title: "Lightsaber Combat Fundamentals",
    description: "Master the basics of lightsaber construction and Forms I-III.",
    maxCapacity: 15,
    schedule: "Mon & Wed, 09:00-11:00",
    instructorName: "Mace Windu",
    enrollmentCount: 10,
  },
  {
    id: 2,
    title: "Advanced Force Meditation",
    description: "Deepen your connection to the Force through ancient meditation techniques.",
    maxCapacity: 10,
    schedule: "Tue & Thu, 07:00-08:30",
    instructorName: "Yoda",
    enrollmentCount: 8,
  },
];

export const handlers = [
  http.get("/api/courses", () => HttpResponse.json(mockCourses)),
];
