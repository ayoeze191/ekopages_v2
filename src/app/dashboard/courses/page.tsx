"use client";

import Link from "next/link";
import { CourseCard } from "@/components/dashboard/CourseCard";
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
            <RevealItem key={course.course_id}>
              <CourseCard course={course} />
            </RevealItem>
          ))}
        </RevealGroup>
      )}
    </Panel>
  );
}
