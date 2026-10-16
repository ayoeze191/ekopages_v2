"use client";

import Link from "next/link";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { EmptyState, Panel } from "@/components/dashboard/DashboardShell";
import { DashboardIcon, type DashboardIconName } from "@/components/dashboard/icons";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { fetchCertificates, fetchEnrolledCourses, fetchOrders } from "@/lib/dashboard";
import { formatDate } from "@/lib/text";
import { useApiResource } from "@/lib/useApiResource";

/** Tile colours follow the Why Parents benefit tiles on the home page. */
const statTones: Record<string, { tile: string; icon: DashboardIconName }> = {
  "Courses enrolled": { tile: "bg-[#247b53]", icon: "courses" },
  "Lessons completed": { tile: "bg-[#4e80ca]", icon: "lessons" },
  Certificates: { tile: "bg-[#f9ad32]", icon: "certificate" },
  Orders: { tile: "bg-[#620a9d]", icon: "orders" },
};

export default function DashboardOverviewPage() {
  const courses = useApiResource(fetchEnrolledCourses, []);
  const certificates = useApiResource(fetchCertificates, []);
  const orders = useApiResource(fetchOrders, []);

  const courseList = courses.data ?? [];
  const orderList = orders.data ?? [];
  const lessonsDone = courseList.reduce((sum, course) => sum + (course.completed_lessons ?? 0), 0);

  const stats = [
    { label: "Courses enrolled", value: courseList.length },
    { label: "Lessons completed", value: lessonsDone },
    { label: "Certificates", value: certificates.data?.length ?? 0 },
    { label: "Orders", value: orderList.length },
  ];

  return (
    <div className="flex flex-col gap-7">
      <RevealGroup className="grid grid-cols-4 gap-4 max-[1000px]:grid-cols-2 max-[480px]:grid-cols-1" stagger={0.07}>
        {stats.map((stat) => {
          const tone = statTones[stat.label];
          return (
            <RevealItem
              className="rounded-[18px] border border-[#e8e3db] bg-white p-5 shadow-[0_14px_30px_rgb(31_10_51_/_8%)]"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              key={stat.label}
            >
              <span
                className={`grid h-11 w-11 place-items-center rounded-[14px] text-white ${tone.tile}`}
              >
                <DashboardIcon name={tone.icon} />
              </span>
              <p className="mt-4 font-['Baloo_2'] text-[30px] leading-none font-bold text-[#1F0A33] tabular-nums">
                <CountUp to={stat.value} />
              </p>
              <p className="mt-2 font-['Lato'] text-[13px] leading-none text-[#4A4A4A]">{stat.label}</p>
            </RevealItem>
          );
        })}
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
            <div className="grid grid-cols-2 gap-5 max-[760px]:grid-cols-1">
              {courseList.slice(0, 2).map((course) => (
                <CourseCard course={course} key={course.course_id} />
              ))}
            </div>
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
          ) : orderList.length === 0 ? (
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
              {[...orderList].reverse().slice(0, 4).map((order) => (
                <li
                  className="flex items-center gap-4 rounded-[14px] border border-[#efe9e0] bg-[#faf7f2] px-4 py-3"
                  key={order.id}
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-[#EFE7F4] text-[#5A0C91]">
                    <DashboardIcon name="orders" className="h-[18px] w-[18px]" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-['Baloo_2'] text-[15px] font-bold text-[#1F0A33]">
                      Order #{order.id}
                    </span>
                    <span className="block font-['Lato'] text-[12px] text-[#6b646a]">
                      {formatDate(order.date_created)}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 font-['Lato'] text-[12px] font-bold ${
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
