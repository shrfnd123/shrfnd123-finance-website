"use client";

import React, { useState } from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { loginSchema, loginSchemaResponse } from "@/schemas/auth.schema";
import api from "@/api/axios";
import axios from "axios";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

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

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const result = loginSchema.safeParse({
      email,
      password,
    });

    if (!result.success) {
      console.log(result.error.flatten().fieldErrors);
      return;
    }

    try {
      const response = await api.post(
        "/login",
        result.data
      );

      const parsedResponse = loginSchemaResponse.safeParse(
        response.data
      );

      if (!parsedResponse.success) {
        console.error(
          "Invalid login response:",
          parsedResponse.error
        );

        return;
      }

      const { access_token } = parsedResponse.data;

      localStorage.setItem("token", access_token);

      console.log("Login successful");

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Login failed:",
          error.response?.data
        );
      } else {
        console.error("Login failed:", error);
      }
    }
  };

  return (
    <main className="login-form">
      <div className="login-form__container">
        {/* =========================================
            LEFT SIDE
        ========================================= */}
        <section className="login-form__container__left-side">
          {/* Decorative elements */}
          <div className="login-form__container__glow-left" />
          <div className="login-form__container__glow-right" />

          {/* Logo */}
          <div className="login-form__container__left-side__logo">
            <span className="login-form__container__left-side__logo__icon">
              <Sparkles size={18} />
            </span>

            <span>finta</span>
          </div>
          <div className="login-form__container__left-side__content">
            <p className="login-form__container__left-side__content__header">
              <span className="login-form__container__left-side__content__header__title" />
              YOUR FINANCIAL HOME
            </p>
            <h1 className="login-form__container__left-side__content__heading">
              A clearer view of your financial life.
            </h1>
            <p className="login-form__container__left-side__content__description">
              Make confident decisions with every account, goal, and
              opportunity in one calm, intelligent place.
            </p>
            <div className="login-form__container__left-side__content__balance-card">
              <div className="login-form__container__left-side__content__balance-card__header">
                <div>
                  <p className="login-form__container__left-side__content__balance-card__label">
                    Your total balance
                  </p>

                  <p className="login-form__container__left-side__content__balance-card__balance">
                    $84,250.12
                  </p>
                </div>

                <span className="login-form__container__left-side__content__balance-card__growth">
                  +12.4%
                </span>
              </div>
              <div className="login-form__container__left-side__content__balance-card__chart">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{
                      top: 5,
                      right: 0,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <defs>
                      <linearGradient
                        id="balance-area"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
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
                      fill="url(#balance-area)"
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>
        <section className="login-form__container__right-side">
          <div className="login-form__container__form">
            <div className="login-form__container__form-header">
              <h2 className="login-form__container__form-title">
                Welcome back
              </h2>

              <p className="login-form__container__form-description">
                Sign in to continue to your financial dashboard.
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="login-form__container__field">
                <label
                  htmlFor="email"
                  className="login-form__container__label"
                >
                  Email address
                </label>

                <div className="login-form__container__input-wrapper">
                  <Mail
                    size={18}
                    aria-hidden="true"
                    className="login-form__container__input-icon"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="login-form__container__input"
                    required
                  />
                </div>
              </div>
              <div className="login-form__container__field">
                <label
                  htmlFor="password"
                  className="login-form__container__label"
                >
                  Password
                </label>

                <div className="login-form__container__input-wrapper">
                  <LockKeyhole
                    size={18}
                    aria-hidden="true"
                    className="login-form__container__input-icon"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="login-form__container__input"
                    required
                  />
                  <button
                    type="button"
                    className="login-form__container__password-toggle"
                    onClick={() => setShowPassword((previous) => !previous)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
              <div className="login-form__container__forgot-password">
                <a
                  href="#"
                  className="login-form__container__forgot-password-link"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="login-form__container__submit"
              >
                <span>Sign in</span>

                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="login-form__container__submit-icon"
                />
              </button>
            </form>
            <div className="login-form__container__social-login">
              <button
                type="button"
                className="login-form__container__social-button"
              >
                <span>Continue with Google</span>
              </button>
            </div>
            <div className="login-form__container__security">
              <ShieldCheck
                size={15}
                aria-hidden="true"
                className="login-form__container__security-icon"
              />

              <span>Secure and encrypted connection</span>
            </div>
            <p className="login-form__container__sign-up">
              Don't have an account?{" "}
              <a
                href="#"
                className="login-form__container__sign-up-link"
              >
                Create one
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default LoginForm;