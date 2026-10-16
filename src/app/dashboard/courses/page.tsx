"use client";

import Link from "next/link";
import { EmptyState, Panel } from "@/components/dashboard/DashboardShell";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { fetchEnrolledCourses } from "@/lib/dashboard";
import { useApiResource } from "@/lib/useApiResource";

export default function MyCoursesPage() {
  const { data, loading, failed } = useApiResource(fetchEnrolledCourses, []);
  const courses = data ?? [];

  return (
    <Panel
      title="My courses"
      action={
        <Link className="font-['Lato'] text-[14px] font-bold text-[#5A0C91]" href="/dashboard/certificates">
          Certificates
        </Link>
      }
    >
      {loading ? (
        <EmptyState message="Loading your courses…" />
      ) : failed ? (
        <EmptyState message="We couldn't load your courses. Please try again." />
      ) : courses.length === 0 ? (
        <EmptyState
          message="You haven't enrolled in a course yet."
          cta={
            <Link
              className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-[#5A0C91] px-6 font-['Lato'] text-[14px] font-bold text-white"
              href="/courses"
            >
              Explore courses
            </Link>
          }
        />
      ) : (
        <RevealGroup className="grid grid-cols-2 gap-4 max-[640px]:grid-cols-1">
          {courses.map((course) => (
            <RevealItem
              as="article"
              className="rounded-[16px] border border-[#e8e3db] bg-[#faf7f2] p-5"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              key={course.course_id}
            >
              <h3 className="font-['Baloo_2'] text-[17px] leading-tight font-bold text-[#1F0A33]">
                {course.course_name}
              </h3>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#EFE7F4]">
                <div
                  className="h-full rounded-full bg-[#5A0C91]"
                  style={{ width: `${Math.min(100, Math.max(0, course.completion_percentage ?? 0))}%` }}
                />
              </div>
              <p className="mt-2 font-['Lato'] text-[13px] text-[#4A4A4A]">
                {course.completed_lessons ?? 0} of {course.total_lessons ?? 0} lessons ·{" "}
                {Math.round(course.completion_percentage ?? 0)}%
              </p>
              <Link
                className="mt-4 inline-flex font-['Lato'] text-[14px] font-bold text-[#5A0C91]"
                href={`/dashboard/courses/${course.course_id}`}
              >
                Continue →
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      )}
    </Panel>
  );
}
