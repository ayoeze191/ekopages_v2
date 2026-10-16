"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback } from "react";
import { EmptyState, Panel } from "@/components/dashboard/DashboardShell";
import { fetchCourseLessons, fetchEnrolledCourses } from "@/lib/dashboard";
import { useApiResource } from "@/lib/useApiResource";

type Lesson = { id?: number; title?: string; name?: string; completed?: boolean };

export default function CourseDetailPage() {
  const params = useParams<{ id: string }>();
  const courseId = Number(params?.id);

  const courses = useApiResource(fetchEnrolledCourses, [courseId]);
  const loadLessons = useCallback(() => fetchCourseLessons(courseId), [courseId]);
  const lessons = useApiResource(loadLessons, [courseId]);

  const course = (courses.data ?? []).find((item) => item.course_id === courseId);
  const lessonList = (lessons.data ?? []) as Lesson[];

  return (
    <div className="flex flex-col gap-6">
      <Link className="font-['Lato'] text-[14px] font-bold text-[#5A0C91]" href="/dashboard/courses">
        ← My courses
      </Link>

      <Panel title={course?.course_name ?? `Course #${courseId}`}>
        {course && (
          <>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#EFE7F4]">
              <div
                className="h-full rounded-full bg-[#5A0C91]"
                style={{ width: `${Math.min(100, Math.max(0, course.completion_percentage ?? 0))}%` }}
              />
            </div>
            <p className="mt-2 font-['Lato'] text-[13px] text-[#4A4A4A]">
              {course.completed_lessons ?? 0} of {course.total_lessons ?? 0} lessons ·{" "}
              {Math.round(course.completion_percentage ?? 0)}% complete
            </p>
          </>
        )}

        <h3 className="mt-7 mb-3 font-['Baloo_2'] text-[16px] font-bold text-[#1F0A33]">Lessons</h3>
        {lessons.loading ? (
          <EmptyState message="Loading lessons…" />
        ) : lessonList.length === 0 ? (
          <EmptyState message="No lessons are available for this course yet." />
        ) : (
          <ol className="flex flex-col gap-2">
            {lessonList.map((lesson, index) => (
              <li
                className="flex items-center justify-between gap-4 rounded-[12px] bg-[#faf7f2] px-4 py-3 font-['Lato'] text-[14px] text-[#1F0A33]"
                key={lesson.id ?? index}
              >
                <span>
                  <span className="mr-2 font-bold text-[#5A0C91]">{index + 1}.</span>
                  {lesson.title ?? lesson.name ?? `Lesson ${index + 1}`}
                </span>
                {lesson.completed && (
                  <span className="rounded-full bg-[#e7f5ec] px-3 py-1 text-[12px] font-bold text-[#247b53]">
                    Done
                  </span>
                )}
              </li>
            ))}
          </ol>
        )}
      </Panel>
    </div>
  );
}
