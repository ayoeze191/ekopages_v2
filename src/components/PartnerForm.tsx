"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const PARTNER_EMAIL = "sales@ekopages.com";

/**
 * v1's partner form had no submit handler and the backend exposes no contact
 * endpoint, so this composes the message in the sender's own mail client.
 */
export function PartnerForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = `${message}\n\n—\n${name}${email ? ` (${email})` : ""}`;
    window.location.href = `mailto:${PARTNER_EMAIL}?subject=${encodeURIComponent(
      `Partnership enquiry from ${name || "a supporter"}`,
    )}&body=${encodeURIComponent(body)}`;
  };

  const field =
    "w-full rounded-[10px] border border-[#CCB4DD] bg-white px-4 py-3 font-['Lato'] text-[15px] text-[#1e0a39] outline-none placeholder:text-[#918993] focus:border-[#5A0C91]";

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <div>
        <label className="mb-2 block font-['Lato'] text-[14px] font-bold text-[#1F0A33]" htmlFor="partner-name">
          Name
        </label>
        <input
          className={field}
          id="partner-name"
          name="name"
          type="text"
          placeholder="Enter your name here"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>
      <div>
        <label className="mb-2 block font-['Lato'] text-[14px] font-bold text-[#1F0A33]" htmlFor="partner-email">
          Email address
        </label>
        <input
          className={field}
          id="partner-email"
          name="email"
          type="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <div>
        <label className="mb-2 block font-['Lato'] text-[14px] font-bold text-[#1F0A33]" htmlFor="partner-message">
          Message
        </label>
        <textarea
          className={`${field} min-h-[160px] resize-y`}
          id="partner-message"
          name="message"
          placeholder="Type your message here"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
        />
      </div>
      <motion.button
        className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#5A0C91] px-[26px] font-['Lato'] text-[15px] font-bold text-white shadow-[0_8px_14px_rgb(79_0_124_/_22%)]"
        type="submit"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 24 }}
      >
        Send message
      </motion.button>
      <p className="font-['Lato'] text-[13px] leading-[20px] text-[#6b646a]">
        This opens your email app with the message ready to send to {PARTNER_EMAIL}.
      </p>
    </form>
  );
}
