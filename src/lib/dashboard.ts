import { api } from "@/lib/api";

/** Shapes mirror v1's dashboard components, which name these fields exactly. */
export type EnrolledCourse = {
  course_id: number;
  course_name: string;
  completion_percentage: number;
  completed_lessons: number;
  total_lessons: number;
};

export type Certificate = {
  title: string;
  date_created: string;
  image_fmt?: string;
  pdf_fmt?: string;
};

export type Order = {
  id: number;
  date_created: string;
  paid_on?: string | null;
  completed?: boolean;
};

export type DashboardBook = {
  id?: number;
  name?: string;
  title?: string;
  image?: string;
  author?: string;
};

export async function fetchEnrolledCourses(): Promise<EnrolledCourse[]> {
  const payload = await api<{ courses_with_progress?: EnrolledCourse[] }>(
    "user_courses/courses_enrolled/",
    { auth: true },
  );
  return payload?.courses_with_progress ?? [];
}

export async function fetchCertificates(): Promise<Certificate[]> {
  const payload = await api<{ data?: Certificate[] }>("services/my_certificates", { auth: true });
  return payload?.data ?? [];
}

export async function fetchOrders(): Promise<Order[]> {
  const payload = await api<{ data?: { total?: Order[] } }>("history/all-history/", { auth: true });
  return payload?.data?.total ?? [];
}

export async function fetchDashboardBooks(): Promise<DashboardBook[]> {
  const payload = await api<{ data?: DashboardBook[] }>("dashboard-books/all_books/", { auth: true });
  return payload?.data ?? [];
}

/** Lessons for one course, used by the course detail page. */
export async function fetchCourseLessons(courseId: number): Promise<unknown[]> {
  const payload = await api<{ data?: unknown[] }>(`services/study_all/${courseId}`, { auth: true });
  if (Array.isArray(payload)) return payload;
  return payload?.data ?? [];
}
