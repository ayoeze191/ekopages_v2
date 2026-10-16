"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ApiError } from "@/lib/api";
import { enrolInCourse, fetchCourses } from "@/lib/courses";
import { useApiResource } from "@/lib/useApiResource";

export function CourseCatalogue() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { data, loading, failed } = useApiResource(fetchCourses, []);
  const [enrolling, setEnrolling] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const courses = data ?? [];

  const enrol = async (courseId: number) => {
    if (!isAuthenticated) {
      router.push(`/login?next=${encodeURIComponent("/courses")}`);
      return;
    }
    setEnrolling(courseId);
    setMessage(null);
    try {
      await enrolInCourse(courseId);
      router.push("/dashboard/courses");
    } catch (error) {
      setMessage(
        error instanceof ApiError ? error.messages[0] : "We couldn't enrol you. Please try again.",
      );
    } finally {
      setEnrolling(null);
    }
  };

  if (loading) {
    return <p className="font-['Lato'] text-[15px] text-[#6b646a]">Loading courses…</p>;
  }
  if (failed || courses.length === 0) {
    return (
      <p className="font-['Lato'] text-[15px] text-[#6b646a]">
        No courses are open for enrolment right now — check back soon.
      </p>
    );
  }

  return (
    <>
      {message && (
        <p
          className="mb-5 rounded-[10px] bg-[#fdeaea] px-4 py-3 font-['Lato'] text-[13px] text-[#9b1c1c]"
          role="alert"
        >
          {message}
        </p>
      )}
      <RevealGroup className="grid grid-cols-3 gap-6 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
        {courses.map((course) => (
          <RevealItem
            as="article"
            className="flex h-full flex-col rounded-2xl border border-[#E8E3DB] bg-white p-6 shadow-[0_8px_20px_rgb(50_32_18_/_8%)] transition-shadow duration-300 hover:shadow-[0_16px_30px_rgb(50_32_18_/_12%)]"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            key={course.id}
          >
            <span className="w-fit rounded-full bg-[#EFE6F5] px-2.5 py-[3px] font-['Lato'] text-[11px] leading-[12px] font-bold text-[#5A0C91]">
              {course.course_level}
            </span>
            <h3 className="mt-4 font-['Baloo_2'] text-[18px] leading-tight font-bold text-[#1F0A33]">
              {course.subject}
            </h3>
            <p className="mt-3 font-['Lato'] text-[14px] leading-[22.4px] text-[#4A4A4A]">
              {course.number_of_lessons} lessons · {course.Tutor}
            </p>
            <p className="mt-3 font-['Lato'] text-[14px] font-bold text-[#5A0C91]">{course.price}</p>
            <motion.button
              className="mt-auto pt-5"
              type="button"
              onClick={() => void enrol(course.id)}
              disabled={enrolling === course.id}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex h-10 w-full items-center justify-center rounded-lg bg-[#5A0C91] font-['Lato'] text-[14px] font-bold text-white">
                {enrolling === course.id
                  ? "Enrolling…"
                  : isAuthenticated
                    ? "Enrol now"
                    : "Sign in to enrol"}
              </span>
            </motion.button>
          </RevealItem>
        ))}
      </RevealGroup>
      <p className="mt-7 font-['Lato'] text-[14px] text-[#4A4A4A]">
        Already enrolled?{" "}
        <Link className="font-bold text-[#5A0C91] underline" href="/dashboard/courses">
          Go to my courses
        </Link>
        .
      </p>
    </>
  );
}
