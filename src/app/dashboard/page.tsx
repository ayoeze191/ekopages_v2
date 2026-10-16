"use client";

import Link from "next/link";
import { EmptyState, Panel } from "@/components/dashboard/DashboardShell";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { fetchCertificates, fetchEnrolledCourses, fetchOrders } from "@/lib/dashboard";
import { useApiResource } from "@/lib/useApiResource";

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#EFE7F4]">
      <div
        className="h-full rounded-full bg-[#5A0C91] transition-[width] duration-700 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export default function DashboardOverviewPage() {
  const courses = useApiResource(fetchEnrolledCourses, []);
  const certificates = useApiResource(fetchCertificates, []);
  const orders = useApiResource(fetchOrders, []);

  const courseList = courses.data ?? [];
  const lessonsDone = courseList.reduce((sum, course) => sum + (course.completed_lessons ?? 0), 0);

  const stats = [
    { label: "Courses enrolled", value: courseList.length },
    { label: "Lessons completed", value: lessonsDone },
    { label: "Certificates", value: certificates.data?.length ?? 0 },
    { label: "Orders", value: orders.data?.length ?? 0 },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Reveal>
        <h1 className="font-['Baloo_2'] text-[32px] leading-tight font-bold text-[#1e0a39]">
          Your dashboard
        </h1>
        <p className="mt-2 font-['Lato'] text-[16px] text-[#4A4A4A]">
          Your courses, certificates and orders at a glance.
        </p>
      </Reveal>

      <RevealGroup className="grid grid-cols-4 gap-4 max-[900px]:grid-cols-2 max-[480px]:grid-cols-1">
        {stats.map((stat) => (
          <RevealItem
            className="rounded-[16px] border border-[#e8e3db] bg-white px-5 pt-5 pb-4 shadow-[0_7px_16px_rgb(50_32_18_/_8%)]"
            key={stat.label}
          >
            <p className="font-['Baloo_2'] text-[28px] leading-none font-bold text-[#5A0C91] tabular-nums">
              <CountUp to={stat.value} />
            </p>
            <p className="mt-3 font-['Lato'] text-[12px] leading-none font-bold tracking-[0.08em] text-[#4A4A4A] uppercase">
              {stat.label}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.05}>
        <Panel
          title="Continue learning"
          action={
            <Link className="font-['Lato'] text-[14px] font-bold text-[#5A0C91]" href="/dashboard/courses">
              All courses
            </Link>
          }
        >
          {courses.loading ? (
            <EmptyState message="Loading your courses…" />
          ) : courseList.length === 0 ? (
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
            <ul className="flex flex-col gap-4">
              {courseList.slice(0, 3).map((course) => (
                <li key={course.course_id}>
                  <div className="flex items-center justify-between gap-4">
                    <Link
                      className="font-['Baloo_2'] text-[16px] font-bold text-[#1F0A33] hover:text-[#5A0C91]"
                      href={`/dashboard/courses/${course.course_id}`}
                    >
                      {course.course_name}
                    </Link>
                    <span className="font-['Lato'] text-[13px] font-bold text-[#5A0C91]">
                      {Math.round(course.completion_percentage ?? 0)}%
                    </span>
                  </div>
                  <ProgressBar value={course.completion_percentage ?? 0} />
                  <p className="mt-1 font-['Lato'] text-[12px] text-[#6b646a]">
                    {course.completed_lessons ?? 0} of {course.total_lessons ?? 0} lessons
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </Reveal>

      <Reveal delay={0.1}>
        <Panel
          title="Recent orders"
          action={
            <Link className="font-['Lato'] text-[14px] font-bold text-[#5A0C91]" href="/dashboard/orders">
              All orders
            </Link>
          }
        >
          {orders.loading ? (
            <EmptyState message="Loading your orders…" />
          ) : (orders.data ?? []).length === 0 ? (
            <EmptyState
              message="You haven't placed an order yet."
              cta={
                <Link
                  className="inline-flex min-h-[46px] items-center justify-center rounded-full border-[2px] border-[#5A0C91] px-6 font-['Lato'] text-[14px] font-bold text-[#5A0C91]"
                  href="/store"
                >
                  Visit Eko Store
                </Link>
              }
            />
          ) : (
            <ul className="flex flex-col gap-3">
              {(orders.data ?? []).slice(-3).reverse().map((order) => (
                <li
                  className="flex items-center justify-between gap-4 rounded-[12px] bg-[#faf7f2] px-4 py-3 font-['Lato'] text-[14px]"
                  key={order.id}
                >
                  <span className="font-bold text-[#1F0A33]">Order #{order.id}</span>
                  <span
                    className={`rounded-full px-3 py-1 text-[12px] font-bold ${
                      order.completed ? "bg-[#e7f5ec] text-[#247b53]" : "bg-[#fdf1e3] text-[#9a6a1c]"
                    }`}
                  >
                    {order.completed ? "Completed" : "Pending"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </Reveal>
    </div>
  );
}
