import LeadForm from "../components/LeadForm";
import Footer from "../components/Footer";

export default function LandingPage() {
  function scrollToForm() {
    document
      .getElementById("lead-form")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <nav className="border-b border-slate-200 bg-white/90 px-6 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <span className="text-xl font-bold tracking-tight">
            LeadDesk<span className="text-[#000fff]"> /mini</span>
          </span>
          <a
            href="/login"
            className="text-sm font-medium text-slate-700 transition hover:text-slate-950"
          >
            Admin login →
          </a>
        </div>
      </nav>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_right,_rgba(148,163,184,0.14),_transparent_30%)]" />
          <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
            <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] items-center">
              <div className="-mt-10">
                <p className="text-sm uppercase tracking-[0.3em] text-blue-600 font-bold mb-6">
                  Lead capture, done right
                </p>

                <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-950 leading-normal mb-6">
                  Turn visitors into <span className="font-mono italic sm:text-5xl ">qualified</span> conversations.
                </h1>

                <p className="max-w-2xl text-lg text-slate-600 leading-8 mb-10">
                  A no-nonsense lead capture surface with a clean admin console.
                  Ship a working funnel today — sort, filter, and close from a
                  single view.
                </p>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={scrollToForm}
                    className="inline-flex items-center justify-center rounded-full bg-slate-950 px-7 py-3 text-base font-semibold text-white shadow-sm shadow-slate-300/60 hover:bg-slate-800 transition"
                  >
                    Start capturing leads
                    <span className="text-xl">→</span>
                  </button>

                  <button
                    onClick={() =>
                      document
                        .getElementById("how-it-works")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-base font-semibold text-slate-700 hover:bg-blue-200 transition"
                  >
                    See how it works
                  </button>
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-slate-100 p-6 shadow-xl shadow-slate-200/70">
                <div className="rounded-[1.5rem] bg-white p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                        Live console
                      </p>
                      <p className="mt-1 text-lg font-semibold text-slate-950">
                        connected
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-700" />
                      connected
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold text-slate-950">
                          Priya S.
                        </p>
                        <p className="text-sm text-slate-500">
                          priya@northwind.io
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                        <span className="h-2 w-2 rounded-full bg-slate-500" />
                        New
                      </span>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold text-slate-950">
                          Marcus D.
                        </p>
                        <p className="text-sm text-slate-500">marcus@vega.co</p>
                      </div>
                      <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                        <span className="h-2 w-2 rounded-full bg-slate-500" />
                        Contacted
                      </span>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold text-slate-950">
                          Lin H.
                        </p>
                        <p className="text-sm text-slate-500">lin@stratum.ai</p>
                      </div>
                      <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                        <span className="h-2 w-2 rounded-full bg-slate-500" />
                        Closed
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="border-t border-slate-200 bg-slate-50"
        >
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <p className="text-sm uppercase tracking-[0.3em] text-[#000fff] font-bold mb-4">
                Simple workflow
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-slate-950">
                Built to help teams capture, qualify, and close faster.
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm shadow-slate-200/80">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500 mb-4">
                  01
                </p>
                <h3 className="text-xl font-semibold text-slate-950 mb-3">
                  Capture leads instantly
                </h3>
                <p className="text-slate-600 leading-7">
                  Put a polished lead form in front of prospects and collect
                  responses without friction.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm shadow-slate-200/80">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500 mb-4">
                  02
                </p>
                <h3 className="text-xl font-semibold text-slate-950 mb-3">
                  Qualify every contact
                </h3>
                <p className="text-slate-600 leading-7">
                  Set expectations with budget and message inputs, then review
                  leads in one clean panel.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm shadow-slate-200/80">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500 mb-4">
                  03
                </p>
                <h3 className="text-xl font-semibold text-slate-950 mb-3">
                  Close with confidence
                </h3>
                <p className="text-slate-600 leading-7">
                  Keep your admin flow focused so you can act on the best leads
                  and follow up quickly.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 pb-20 pt-10">
          <div className="max-w-7xl mx-auto px-6">
            <LeadForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
