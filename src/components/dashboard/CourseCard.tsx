import Link from "next/link";
import type { EnrolledCourse } from "@/lib/dashboard";

export function CourseProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#EFE7F4]">
      <div
        className="h-full rounded-full bg-[linear-gradient(90deg,#8027bb_0%,#5A0C91_100%)] transition-[width] duration-700 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

/** One enrolled course, shared by the dashboard overview and the courses page. */
export function CourseCard({ course }: { course: EnrolledCourse }) {
  const percentage = Math.round(course.completion_percentage ?? 0);

  return (
    <article className="overflow-hidden rounded-[16px] border border-[#e8e3db] bg-white">
      <div className="flex h-[86px] items-end bg-[linear-gradient(130deg,#8027bb_0%,#5e0b98_51%,#330052_100%)] p-4">
        <span className="rounded-full bg-white/15 px-3 py-1 font-['Lato'] text-[11px] font-bold text-white">
          {percentage}% complete
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-['Baloo_2'] text-[16px] leading-tight font-bold text-[#1F0A33]">
          {course.course_name}
        </h3>
        <div className="mt-4">
          <CourseProgressBar value={course.completion_percentage ?? 0} />
        </div>
        <p className="mt-2 font-['Lato'] text-[13px] text-[#4A4A4A]">
          {course.completed_lessons ?? 0} of {course.total_lessons ?? 0} lessons
        </p>
        <Link
          className="mt-4 inline-flex font-['Lato'] text-[14px] font-bold text-[#5A0C91]"
          href={`/dashboard/courses/${course.course_id}`}
        >
          Continue →
        </Link>
      </div>
    </article>
  );
}
