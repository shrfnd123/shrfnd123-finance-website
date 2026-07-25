"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Area, AreaChart, ResponsiveContainer } from "recharts";

import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { loginSchema, LoginSchema } from "@/schemas/auth.schema";

import { login as loginService } from "@/services/auth.service";

import { useAuthStore } from "@/stores/auth.store";

const chartData = [
  { value: 24 },
  { value: 32 },
  { value: 29 },
  { value: 47 },
  { value: 43 },
  { value: 56 },
  { value: 49 },
  { value: 67 },
  { value: 64 },
  { value: 78 },
];

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const setAuth = useAuthStore((state) => state.setAuth);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginSchema) {
    try {
      const response = await loginService({
        email: data.email,

        password: data.password,
      });

      setAuth(response.user, response.token);

      setSubmitted(true);

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error: any) {
      alert(error.response?.data?.message ?? "Invalid email or password");
    }
  }

  return (
    <main className="min-h-screen bg-[#eef5f2] p-4 sm:p-7 lg:p-10">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-[0_28px_80px_rgba(20,56,48,0.12)] lg:min-h-[680px] lg:grid-cols-[1.03fr_0.97fr]">
        {/* LEFT SIDE */}

        <section className="relative hidden overflow-hidden bg-[#0b3028] px-11 py-10 text-white lg:flex lg:flex-col">
          <div className="absolute -left-24 top-32 size-72 rounded-full bg-[#1f7160] opacity-35 blur-3xl" />

          <div className="absolute -right-24 -bottom-28 size-80 rounded-full border-[36px] border-[#d2f1a6] opacity-90" />

          <div className="relative flex items-center gap-3 text-lg font-bold tracking-tight">
            <span className="grid size-9 place-items-center rounded-xl bg-[#d2f1a6] text-[#0b3028]">
              <Sparkles size={18} />
            </span>
            finta
          </div>

          <div className="relative mt-auto max-w-md pb-7">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium tracking-wide text-[#e7f7de]">
              <span className="size-1.5 rounded-full bg-[#d2f1a6]" />
              YOUR FINANCIAL HOME
            </p>

            <h1 className="text-5xl font-semibold leading-[1.06] tracking-[-0.055em]">
              A clearer view of your financial life.
            </h1>

            <p className="mt-5 max-w-sm text-[15px] leading-6 text-[#c6ddd6]">
              Make confident decisions with every account, goal, and opportunity
              in one calm, intelligent place.
            </p>

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.09] p-5 backdrop-blur-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-[#b9d2ca]">Your total balance</p>

                  <p className="mt-1 text-2xl font-semibold">$84,250.12</p>
                </div>

                <span className="rounded-lg bg-[#d2f1a6] px-2.5 py-1 text-xs font-semibold text-[#173a31]">
                  +12.4%
                </span>
              </div>

              <div className="mt-2 h-20">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor="#d2f1a6"
                          stopOpacity={0.5}
                        />

                        <stop
                          offset="100%"
                          stopColor="#d2f1a6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#d2f1a6"
                      strokeWidth={2.5}
                      fill="url(#area)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <p className="relative text-xs text-[#91b1a7]">
            © 2024 Finta, Inc. All rights reserved.
          </p>
        </section>

        {/* RIGHT SIDE */}

        <section className="flex flex-col px-6 py-7 sm:px-12 sm:py-10 lg:px-16 lg:py-12">
          <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center">
            {submitted ? (
              <SuccessState email={useAuthStore.getState().user?.email ?? ""} />
            ) : (
              <>
                <div>
                  <p className="text-sm font-medium text-[#16735f]">
                    WELCOME BACK
                  </p>

                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#13211e]">
                    Sign in to Finta
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Enter your details to access your workspace.
                  </p>
                </div>

                <form
                  className="mt-8 space-y-5"
                  onSubmit={form.handleSubmit(onSubmit)}
                  noValidate
                >
                  <FieldLabel
                    label="Email address"
                    error={form.formState.errors.email?.message}
                  >
                    <div className="relative">
                      <Mail
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        size={18}
                      />

                      <input
                        {...form.register("email")}
                        type="email"
                        placeholder="you@example.com"
                        className={inputClass(!!form.formState.errors.email)}
                      />
                    </div>
                  </FieldLabel>

                  <FieldLabel
                    label="Password"
                    error={form.formState.errors.password?.message}
                  >
                    <div className="relative">
                      <LockKeyhole
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        size={18}
                      />

                      <input
                        {...form.register("password")}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className={inputClass(!!form.formState.errors.password)}
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </FieldLabel>

                  <button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0b5a4b] text-sm font-semibold text-white"
                  >
                    {form.formState.isSubmitting ? (
                      "Signing in..."
                    ) : (
                      <>
                        Sign in
                        <ArrowRight size={17} />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck size={15} className="text-[#24836d]" />
            Your data is secured with bank-level encryption
          </div>
        </section>
      </div>
    </main>
  );
}

function FieldLabel({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      <span className="mb-2 block">{label}</span>

      {children}

      {error && (
        <span className="mt-1.5 block text-xs text-rose-600">{error}</span>
      )}
    </label>
  );
}

function inputClass(error: boolean) {
  return `
    h-12 w-full rounded-xl border bg-white pl-11 pr-11
    text-sm outline-none
    focus:border-[#16735f]
    ${error ? "border-rose-400" : "border-slate-200"}
    `;
}

function SuccessState({ email }: { email: string }) {
  return (
    <div className="text-center">
      <span className="mx-auto grid size-14 place-items-center rounded-full bg-[#e2f4df] text-[#16735f]">
        <Check size={27} />
      </span>

      <h2 className="mt-5 text-3xl font-semibold">You’re all set.</h2>

      <p className="mt-3 text-sm text-slate-500">
        Welcome back, {email}. Your workspace is ready.
      </p>
    </div>
  );
}
