import { api } from "@/lib/api";

/** Course catalogue, from the endpoint v1's explore page used. */
export type Course = {
  id: number;
  subject: string;
  course_level: string;
  number_of_lessons: number;
  picture: string | null;
  price: string;
  Tutor: string;
};

export async function fetchCourses(): Promise<Course[]> {
  const payload = await api<{ data?: Course[] }>("services/all_courses/");
  return payload?.data ?? [];
}

export const enrolInCourse = (courseId: number) =>
  api(`services/enroll/${courseId}/`, { method: "POST", auth: true });
