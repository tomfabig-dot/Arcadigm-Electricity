import { useState, FormEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";

const EMAIL = "hello@arcadigm.net";
const WEB3FORMS_KEY = "72ad431e-b08d-4065-aee3-4dfedf0a7b7b";

type Topic = "general" | "pricing" | "project" | "press";
type Status = "idle" | "sending" | "sent" | "error";

const topics: { value: Topic; label: string }[] = [
  { value: "general", label: "General enquiry" },
  { value: "pricing", label: "Pricing & plans" },
  { value: "project", label: "Project delivery" },
  { value: "press", label: "Press / partnerships" },
];

export default function Contact() {
  return (
    <>
      <Header />
      <Form />
    </>
  );
}

function Header() {
  return (
    <section className="pt-xl-2 md:pt-2xl-2 pb-lg-2">
      <div className="container-edit">
        <p className="eyebrow animate-fade-up">Contact · say hello</p>
        <h1
          className="mt-md-2 font-display text-display-xl tracking-display text-ink max-w-3xl animate-fade-up"
          style={{
            fontVariationSettings: '"wght" 800, "opsz" 96, "GRAD" 25',
            animationDelay: "60ms",
          }}
        >
          Please get in touch.{" "}
          <span className="text-brand">We would love to help.</span>
        </h1>
        <p
          className="mt-md-2 text-body-l text-ink-muted max-prose leading-prose animate-fade-up"
          style={{ animationDelay: "120ms" }}
        >
          Just fill in the form and we'll reply as soon as possible. Prefer
          to email directly? Write to{" "}
          <a
            href={`mailto:${EMAIL}`}
            className="text-ink font-medium underline-offset-4 hover:underline"
          >
            {EMAIL}
          </a>
          .
        </p>
      </div>
    </section>
  );
}

function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [topic, setTopic] = useState<Topic>("general");
  const [sites, setSites] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const subjectLabel = topics.find((t) => t.value === topic)?.label ?? "";

    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: `Arcadigm enquiry · ${subjectLabel}`,
      from_name: `Arcadigm website · ${name}`,
      replyto: email,
      cc: email,
      name,
      email,
      company: company || "—",
      topic: subjectLabel,
      sites: sites || "—",
      message,
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("sent");
        setName("");
        setEmail("");
        setCompany("");
        setSites("");
        setMessage("");
        setTopic("general");
      } else {
        setStatus("error");
        setErrorMsg(
          data.message || "Something went wrong. Please try again or email us directly."
        );
      }
    } catch {
      setStatus("error");
      setErrorMsg(
        `Network error. Please try again or email us at ${EMAIL}.`
      );
    }
  }

  if (status === "sent") {
    return (
      <section className="pb-2xl-2">
        <div className="container-edit">
          <div className="max-w-3xl rounded-xl border border-ink-hairline bg-paper-card p-lg-2 shadow-ringed">
            <div className="flex items-center gap-md-2">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand text-brand-fore">
                <Check className="w-5 h-5" strokeWidth={2} />
              </span>
              <h2
                className="font-display text-display-s tracking-display text-ink"
                style={{ fontVariationSettings: '"wght" 700, "opsz" 64, "GRAD" 0' }}
              >
                Thanks, we've got it. We'll come back to you shortly.
              </h2>
            </div>
            <p className="mt-md-2 text-body-l text-ink-muted leading-prose">
              A copy has been sent to your inbox. We'll reply to{" "}
              {email ? (
                <span className="text-ink font-medium">{email}</span>
              ) : (
                "you"
              )}{" "}
              as soon as possible.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const sending = status === "sending";

  return (
    <section className="pb-2xl-2">
      <div className="container-edit">
        <div className="max-w-3xl">
          <form
            onSubmit={onSubmit}
            className="rounded-xl border border-ink-hairline bg-paper-card p-lg-2 shadow-ringed flex flex-col gap-md-2"
          >
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              style={{ display: "none" }}
              aria-hidden="true"
            />

            <Row>
              <Field label="Your name" required>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                  placeholder="Jane Smith"
                  disabled={sending}
                />
              </Field>
              <Field label="Email" required>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  placeholder="jane@company.com.au"
                  disabled={sending}
                />
              </Field>
            </Row>

            <Row>
              <Field label="Company">
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="input"
                  placeholder="Optional"
                  disabled={sending}
                />
              </Field>
              <Field label="Sites / meters">
                <input
                  type="text"
                  value={sites}
                  onChange={(e) => setSites(e.target.value)}
                  className="input"
                  placeholder="e.g. 3 sites"
                  disabled={sending}
                />
              </Field>
            </Row>

            <Field label="What's this about?" required>
              <div className="flex flex-wrap gap-2xs">
                {topics.map((t) => (
                  <label
                    key={t.value}
                    className={`chip cursor-pointer select-none ${
                      topic === t.value
                        ? "bg-brand text-brand-fore border-brand"
                        : ""
                    } ${sending ? "opacity-60 pointer-events-none" : ""}`}
                  >
                    <input
                      type="radio"
                      name="topic"
                      value={t.value}
                      checked={topic === t.value}
                      onChange={() => setTopic(t.value)}
                      className="sr-only"
                      disabled={sending}
                    />
                    {t.label}
                  </label>
                ))}
              </div>
            </Field>

            <Field label="Message" required>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="input resize-y min-h-[140px]"
                placeholder="A few sentences about what you're looking for."
                disabled={sending}
              />
            </Field>

            <div className="flex flex-wrap items-center gap-md-2 pt-xs">
              <button type="submit" className="btn-primary" disabled={sending}>
                {sending ? "Sending…" : "Send enquiry"}
                {!sending && (
                  <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
                )}
              </button>
              <p className="font-mono text-micro uppercase tracking-[0.16em] text-ink-faint">
                Sent to {EMAIL}
              </p>
            </div>

            {status === "error" && (
              <p className="text-ui text-[color:var(--color-danger,#b42318)] leading-prose">
                {errorMsg}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-md-2 sm:grid-cols-2">{children}</div>;
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2xs">
      <span className="eyebrow">
        {label}
        {required && <span className="text-brand"> *</span>}
      </span>
      {children}
    </label>
  );
}
