import { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../api/api";

const BUDGET_OPTIONS = ["Under $5k", "$5k-$20k", "$20k-$50k", "$50k+"];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LeadForm() {

  // use react hook form for form handling and validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      budgetRange: "",
      message: "",
    },
  });
  const [formError, setFormError] = useState("");
  const [showToast, setShowToast] = useState(false);

  async function onSubmit(values) {
    setFormError("");

    try {
      await api.post("/leads", values);
      reset();
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    } catch (err) {
      const serverErrors = err.response?.data?.errors;
      if (serverErrors && typeof serverErrors === "object") {
        setFormError(Object.values(serverErrors).join(" "));
      } else {
        setFormError("Something went wrong. Please try again.");
      }
    }
  }

  return (
    <div
      id="lead-form"
      className="mx-auto w-full max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-10 shadow-xl shadow-slate-200/70"
    >
      <div className="mb-10 max-w-xl">
        <p className="text-sm uppercase tracking-[0.2em] text-[#000fff] font-bold  mb-3">
          Contact
        </p>
        <h3 className="text-4xl font-semibold text-slate-950 mb-3">
          Let's talk.
        </h3>
        <p className="text-slate-500 leading-7">
          Tell us about your project. We reply to every serious inquiry in under
          24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="Jane Doe"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: EMAIL_REGEX,
                  message: "Please enter a valid email address",
                },
              })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="jane@company.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Budget range
          </label>
          <select
            {...register("budgetRange", {
              required: "Please select a budget range",
            })}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            <option value="">Select budget...</option>
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.budgetRange && (
            <p className="text-red-500 text-sm mt-2">
              {errors.budgetRange.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Message
          </label>
          <textarea
            {...register("message", {
              required: "Message is required",
            })}
            rows={6}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            placeholder="Briefly describe what you’re building and your timeline..."
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-2">
              {errors.message.message}
            </p>
          )}
        </div>

        {formError && <p className="text-red-500 text-sm">{formError}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-slate-950 px-8 py-3 text-base font-semibold text-white shadow-sm shadow-slate-400/20 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isSubmitting ? "Submitting..." : "Send message"}
        </button>
      </form>

      {showToast && (
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-slate-900/30">
          Thanks! We'll be in touch shortly.
        </div>
      )}
    </div>
  );
}
