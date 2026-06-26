"use client";

import {
  FiMapPin,
  FiMail,
  FiPhone,
  FiClock,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiSend,
} from "react-icons/fi";

export default function ContactPage() {
  return (
    <main className="bg-slate-50">

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
            Contact Us
          </span>

          <h1 className="mt-5 text-5xl font-bold">
            We'd Love to Hear From You
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-blue-100">
            Have questions, feedback, or need assistance? Our team is always
            ready to help you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-12 lg:grid-cols-2">

          {/* Contact Info */}
          <div>

            <h2 className="text-4xl font-bold text-slate-900">
              Get In Touch
            </h2>

            <p className="mt-5 text-slate-600 leading-8">
              Whether you're a buyer or seller, we're here to answer your
              questions and provide the support you need.
            </p>

            <div className="mt-10 space-y-6">

              <div className="flex gap-5">
                <div className="rounded-xl bg-blue-100 p-4 text-blue-600">
                  <FiMapPin size={24} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-800">Address</h3>
                  <p className="text-slate-600">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="rounded-xl bg-green-100 p-4 text-green-600">
                  <FiMail size={24} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-800">Email</h3>
                  <p className="text-slate-600">
                    support@tradenest.com
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="rounded-xl bg-purple-100 p-4 text-purple-600">
                  <FiPhone size={24} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-800">Phone</h3>
                  <p className="text-slate-600">
                    +880 1767 148518
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="rounded-xl bg-orange-100 p-4 text-orange-600">
                  <FiClock size={24} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-800">
                    Business Hours
                  </h3>
                  <p className="text-slate-600">
                    Sat - Thu : 9:00 AM - 8:00 PM
                  </p>
                </div>
              </div>

            </div>

            {/* Social */}
            <div className="mt-10 flex gap-4">

              <button className="rounded-full bg-white p-4 shadow hover:bg-blue-600 hover:text-white transition">
                <FiFacebook size={20} />
              </button>

              <button className="rounded-full bg-white p-4 shadow hover:bg-sky-500 hover:text-white transition">
                <FiTwitter size={20} />
              </button>

              <button className="rounded-full bg-white p-4 shadow hover:bg-pink-500 hover:text-white transition">
                <FiInstagram size={20} />
              </button>

            </div>

          </div>

          {/* Contact Form */}
          <div className="rounded-3xl bg-white p-8 shadow-xl">

            <h2 className="text-3xl font-bold text-slate-900">
              Send Message
            </h2>

            <form className="mt-8 space-y-5">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none focus:border-blue-500"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none focus:border-blue-500"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none focus:border-blue-500"
              />

              <textarea
                rows={6}
                placeholder="Write your message..."
                className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none focus:border-blue-500"
              ></textarea>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700"
              >
                <FiSend />
                Send Message
              </button>

            </form>

          </div>

        </div>

      </section>

      {/* Google Map */}
      <section className="pb-20 px-6">

        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl shadow-xl">

          <iframe
            title="Google Map"
            src="https://www.google.com/maps?q=Dhaka,Bangladesh&output=embed"
            className="h-[450px] w-full"
            loading="lazy"
          ></iframe>

        </div>

      </section>

    </main>
  );
}