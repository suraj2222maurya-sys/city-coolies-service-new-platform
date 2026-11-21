"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getCustomerAuthGateway, setAuthenticatedCustomer } from "./customerSession";

export default function ServicesLoginPage() {
  const router = useRouter();
  const otpRequestId = useRef(0);
  const loginMethod = "phone" as const;
  const [showPassword, setShowPassword] = useState(false);

  // Registration password is managed locally in the browser.
  const [registrationPassword, setRegistrationPassword] = useState("");
  const [showRegistrationPassword, setShowRegistrationPassword] = useState(false);

  // Confirm Password is validated locally against the registration password.
  const [confirmRegistrationPassword, setConfirmRegistrationPassword] = useState("");
  const [showConfirmRegistrationPassword, setShowConfirmRegistrationPassword] = useState(false);

  // Password: 8-15 characters, starts with uppercase, includes a number and symbol.
  const isRegistrationPasswordValid =
    /^(?=.{8,15}$)[A-Z](?=.*[0-9])(?=.*[^A-Za-z0-9]).*$/.test(
      registrationPassword
    );

  // Account views are displayed within the existing login page.
  const [accountView, setAccountView] = useState<"login" | "register">("login");
  const [registrationMethod, setRegistrationMethod] =
    useState<"phone" | "email">("phone");
  const [registrationFirstName, setRegistrationFirstName] = useState("");
  const [registrationLastName, setRegistrationLastName] = useState("");
  const [registrationContact, setRegistrationContact] = useState("");
  const [registrationOtp, setRegistrationOtp] = useState("");
  const [showRegistrationOtp, setShowRegistrationOtp] = useState(false);
  const [registrationError, setRegistrationError] = useState("");
  const [registrationAccountExists, setRegistrationAccountExists] = useState(false);

  // Login inputs and errors remain separate from registration state.
  const [loginIdentity, setLoginIdentity] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // The gateway controls verification; the browser controls only countdown UI.
  const OTP_VALIDITY_SECONDS = 600;
  type OtpStatus = "waiting" | "checking" | "verified" | "wrong" | "expired" | "unavailable";
  const [otpDeadline, setOtpDeadline] = useState<number | null>(null);
  const [otpSecondsRemaining, setOtpSecondsRemaining] = useState(OTP_VALIDITY_SECONDS);
  const [otpStatus, setOtpStatus] = useState<OtpStatus>("waiting");
  const isRegistrationOtpVerified = otpStatus === "verified";

  const resetRegistrationVerification = () => {
    otpRequestId.current += 1;
    setShowRegistrationOtp(false);
    setRegistrationOtp("");
    setRegistrationError("");
    setRegistrationAccountExists(false);
    setOtpDeadline(null);
    setOtpSecondsRemaining(OTP_VALIDITY_SECONDS);
    setOtpStatus("waiting");
  };

  const handleRegistrationMethodChange = (method: "phone" | "email") => {
    if (registrationMethod === method) return;

    setRegistrationMethod(method);
    setRegistrationContact("");
    resetRegistrationVerification();
  };

    // Update the OTP countdown and handle expiration inside the timer callback.
  // Keeping these updates outside the effect body satisfies React Hooks lint rules.
  useEffect(() => {
    if (!showRegistrationOtp || otpDeadline === null || isRegistrationOtpVerified) {
      return;
    }

    let hasExpired = false;

    const updateTime = () => {
      const secondsRemaining = Math.max(
        0,
        Math.ceil((otpDeadline - Date.now()) / 1000)
      );

      setOtpSecondsRemaining(secondsRemaining);

      if (secondsRemaining === 0 && !hasExpired) {
        hasExpired = true;
        window.clearInterval(intervalId);
        otpRequestId.current += 1;
        setOtpStatus("expired");
        setRegistrationError("Invalid OTP");
      }
    };

    const intervalId = window.setInterval(updateTime, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [showRegistrationOtp, otpDeadline, isRegistrationOtpVerified]);

  // Request an OTP through the authentication gateway when it is available.
  const handleRegistrationContactVerification = async () => {
    setRegistrationError("");
    setRegistrationAccountExists(false);
    if (!registrationFirstName.trim() || !registrationLastName.trim()) {
      setRegistrationError("Enter your first and last name.");
      return;
    }
    const identity = registrationContact.trim();
    if (registrationMethod === "phone") {
      if (!/^[0-9]{10}$/.test(identity)) {
        setRegistrationError("Enter a valid 10-digit mobile number.");
        return;
      }
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identity)) {
      setRegistrationError("Enter a valid email address.");
      return;
    }

    const gateway = getCustomerAuthGateway();
    if (gateway) {
      try {
        const response = await gateway.requestOtp({ method: registrationMethod, identity });
        if (!response.success) {
          if ("code" in response && response.code === "ACCOUNT_EXISTS") {
            setRegistrationAccountExists(true);
            return;
          }

          setRegistrationError(response.message || "Unable to request OTP.");
          return;
        }
      } catch {
        setRegistrationError("Unable to request OTP.");
        return;
      }
    }

    // Preserve the existing frontend Step 2 preview without claiming an OTP was sent.
    otpRequestId.current += 1;
    setRegistrationOtp("");
    setOtpStatus("waiting");
    setOtpSecondsRemaining(OTP_VALIDITY_SECONDS);
    setOtpDeadline(Date.now() + OTP_VALIDITY_SECONDS * 1000);
    setShowRegistrationOtp(true);
  };

  // A completed six-digit code is checked automatically. No Verify button is used.
  const handleRegistrationOtpChange = async (value: string) => {
    const code = value.replace(/\D/g, "").slice(0, 6);
    const currentRequestId = ++otpRequestId.current;
    setRegistrationOtp(code);
    setRegistrationError("");
    if (otpSecondsRemaining === 0 || otpStatus === "expired") {
      setOtpStatus("expired");
      setRegistrationError("Invalid OTP");
      return;
    }
    if (isRegistrationOtpVerified) return;
    if (code.length !== 6) {
      setOtpStatus("waiting");
      return;
    }
    const gateway = getCustomerAuthGateway();
    if (!gateway) {
      setOtpStatus("wrong");
      setRegistrationError("Wrong OTP");
      return;
    }
    setOtpStatus("checking");
    try {
      const result = await gateway.verifyOtp({ method: registrationMethod, identity: registrationContact.trim(), code });
      if (currentRequestId !== otpRequestId.current) return;
      if (otpDeadline === null || Date.now() >= otpDeadline) {
        setOtpStatus("expired");
        setRegistrationError("Invalid OTP");
      } else if (result === "verified") {
        setOtpStatus("verified");
        setRegistrationError("");
      } else if (result === "wrong") {
        setOtpStatus("wrong");
        setRegistrationError("Wrong OTP");
      } else {
        setOtpStatus("expired");
        setRegistrationError("Invalid OTP");
      }
    } catch {
      if (currentRequestId === otpRequestId.current) {
        setOtpStatus("unavailable");
        setRegistrationError("OTP verification is unavailable.");
      }
    }
  };

  // Resend cannot pretend to deliver an OTP; reset time only after confirmed resend.
  const handleResendRegistrationOtp = async () => {
    const gateway = getCustomerAuthGateway();
    if (!gateway) {
      setRegistrationError("OTP resend is not connected yet.");
      return;
    }
    try {
      const response = await gateway.resendOtp({ method: registrationMethod, identity: registrationContact.trim() });
      if (!response.success) {
        setRegistrationError(response.message || "Unable to resend OTP.");
        return;
      }
      otpRequestId.current += 1;
      setRegistrationOtp("");
      setRegistrationError("");
      setOtpStatus("waiting");
      setOtpSecondsRemaining(OTP_VALIDITY_SECONDS);
      setOtpDeadline(Date.now() + OTP_VALIDITY_SECONDS * 1000);
    } catch {
      setRegistrationError("Unable to resend OTP.");
    }
  };

  // Register only after verified OTP, valid passwords, and confirmed service response.
  const handleRegistrationSubmit = async () => {
    setRegistrationError("");
    if (!isRegistrationOtpVerified) {
      setRegistrationError("Verify your OTP before submitting.");
      return;
    }
    if (!isRegistrationPasswordValid) {
      setRegistrationError("Password does not meet the requirements.");
      return;
    }
    if (registrationPassword !== confirmRegistrationPassword) {
      setRegistrationError("Passwords do not match.");
      return;
    }
    const gateway = getCustomerAuthGateway();
    if (!gateway) {
      setRegistrationError("Account creation is not connected yet.");
      return;
    }
    try {
      const result = await gateway.register({
        method: registrationMethod,
        identity: registrationContact.trim(),
        firstName: registrationFirstName.trim(),
        lastName: registrationLastName.trim(),
        password: registrationPassword,
      });
      if (!result.success) {
        setRegistrationError(result.message);
        return;
      }
      setAuthenticatedCustomer(result.customer);
      router.replace("/services");
    } catch {
      setRegistrationError("Account creation is unavailable.");
    }
  };

  // Log in only when the authentication gateway confirms valid credentials.
  const handleCustomerLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError("");
    if (!loginIdentity.trim() || !loginPassword) {
      setLoginError("Enter your account details and password.");
      return;
    }
    const gateway = getCustomerAuthGateway();
    if (!gateway) {
      setLoginError("Login is not connected yet.");
      return;
    }
    try {
      const result = await gateway.login({ method: loginMethod, identity: loginIdentity.trim(), password: loginPassword });
      if (!result.success) {
        setLoginError(result.message);
        return;
      }
      setAuthenticatedCustomer(result.customer);
      router.replace("/services");
    } catch {
      setLoginError("Login is unavailable.");
    }
  };

  return (
    <main className="w-full overflow-hidden">
      <section
        aria-label="City Coolies login banner"
        className="relative w-full overflow-hidden"
      >
        <Image
          src="/service-icons/city-coolies-login-banner.png"
          alt="City Coolies 3D login banner"
          width={2112}
          height={928}
          priority
          sizes="100vw"
          className="relative left-[-5%] block h-[calc(100dvh-124px)] min-h-[400px] w-[106%] max-w-none object-fill"
        />
        {/* Login introduction: positioned over the existing banner image. */}
        <div
          data-city-coolies-login-intro
          className="pointer-events-none absolute inset-0 z-10"
        >
          <div className="absolute left-[9%] top-[4%] w-[32%] max-w-[430px] max-lg:left-[9%] max-lg:top-[3%] max-lg:w-[38%] max-sm:left-[8.5%] max-sm:right-[3%] max-sm:bottom-[7%] max-sm:top-[1%] max-sm:w-auto">
            {/* Welcome badge */}
            <span className="inline-flex items-center rounded-full border border-red-100 bg-[#fff0f2]/95 px-5 py-2 text-[clamp(12px,1vw,17px)] font-bold text-[#e71922] shadow-[0_5px_15px_rgba(224,37,54,0.15)]">
              Welcome to City Coolies
            </span>

            {/* Main heading */}
            <h1 className="mt-4 text-[clamp(28px,2.85vw,48px)] font-extrabold leading-[1.12] tracking-tight text-[#07111f] max-sm:mt-3">
              Login to Access
              <span className="block italic text-[#e71922]">
                Your Account
              </span>
            </h1>

            {/* Supporting description */}
            <p className="mt-4 max-w-[355px] text-[clamp(13px,1.15vw,18px)] font-bold leading-[1.4] text-[#5c6675] max-sm:mt-2 max-sm:max-w-[285px]">
              Book, track, and manage all your property maintenance and civil
              services in one place.
            </p>

            {/* Red decorative underline */}
            <div
              aria-hidden="true"
              className="mt-5 h-[5px] w-[82px] rounded-full bg-[#ef1b23] max-sm:mt-3 max-sm:w-[55px]"
            />

            {/* Service benefits */}
            <div className="mt-7 flex flex-col gap-5 max-sm:absolute max-sm:inset-x-0 max-sm:bottom-0 max-sm:mt-0 max-sm:grid max-sm:grid-cols-3 max-sm:gap-2">
              <div className="flex items-center gap-4 max-sm:flex-col max-sm:gap-1.5">
                <span className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-2xl border border-red-100 bg-[#fff3f5] text-[#ef1b23] shadow-[0_5px_12px_rgba(190,30,52,0.14)] max-sm:h-11 max-sm:w-11 max-sm:rounded-xl">
                  <svg
                    aria-hidden="true"
                    className="h-[29px] w-[29px] max-sm:h-[23px] max-sm:w-[23px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M7 3v4M17 3v4M3 10h18" />
                    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
                  </svg>
                </span>
                <span className="text-[clamp(14px,1.2vw,19px)] font-extrabold leading-[1.3] text-[#111827] max-sm:text-center max-sm:text-[12px]">
                  Book Services
                  <span className="block">Instantly</span>
                </span>
              </div>

              <div className="flex items-center gap-4 max-sm:flex-col max-sm:gap-1.5">
                <span className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-2xl border border-red-100 bg-[#fff3f5] text-[#ef1b23] shadow-[0_5px_12px_rgba(190,30,52,0.14)] max-sm:h-11 max-sm:w-11 max-sm:rounded-xl">
                  <svg
                    aria-hidden="true"
                    className="h-[29px] w-[29px] max-sm:h-[23px] max-sm:w-[23px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m12 2 9 5-9 5-9-5 9-5Z" />
                    <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
                  </svg>
                </span>
                <span className="text-[clamp(14px,1.2vw,19px)] font-extrabold leading-[1.3] text-[#111827] max-sm:text-center max-sm:text-[12px]">
                  Manage Your
                  <span className="block">Bookings</span>
                </span>
              </div>

              <div className="flex items-center gap-4 max-sm:flex-col max-sm:gap-1.5">
                <span className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-2xl border border-red-100 bg-[#fff3f5] text-[#ef1b23] shadow-[0_5px_12px_rgba(190,30,52,0.14)] max-sm:h-11 max-sm:w-11 max-sm:rounded-xl">
                  <svg
                    aria-hidden="true"
                    className="h-[29px] w-[29px] max-sm:h-[23px] max-sm:w-[23px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </span>
                <span className="text-[clamp(14px,1.2vw,19px)] font-extrabold leading-[1.3] text-[#111827] max-sm:text-center max-sm:text-[12px]">
                  Secure &amp;
                  <span className="block">Trusted</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Frontend-only account login interface. */}
        <div
          data-city-coolies-login-form
          className="absolute right-[5%] top-[10%] z-20 w-[32%] max-w-[510px] max-lg:right-[3%] max-lg:w-[43%] max-md:relative max-md:right-auto max-md:top-auto max-md:mx-auto max-md:my-8 max-md:w-[92%]"
        >
          <div className={`rounded-[30px] border border-white/80 bg-white/85 p-6 shadow-[0_18px_45px_rgba(49,30,53,0.16)] backdrop-blur-xl max-lg:p-5 max-sm:rounded-[26px] max-sm:p-5 ${accountView === "register" ? "max-h-[calc(100dvh-240px)] overflow-y-auto overscroll-contain max-md:max-h-none max-md:overflow-visible" : ""}`}>
            {accountView === "login" ? (
              <>
                

            <div className="mt-5">
              <h2 className="text-[clamp(22px,2vw,32px)] font-extrabold tracking-tight text-[#07111f]">
                Login to Your Account
              </h2>
              <p data-login-description className="mt-1 text-[clamp(13px,1.1vw,16px)] font-medium text-[#586476]">
                Enter your User ID and password to continue
              </p>
            </div>

            <form className="mt-4 space-y-2.5" onSubmit={handleCustomerLoginSubmit}>
              <div className="flex h-[49px] items-center rounded-2xl border border-[#dedce5] bg-white/80 px-4 focus-within:border-[#ef1b23] max-sm:px-3">
                
                <input
                  data-login-identity
                  type="text"
                    inputMode="text"
                    autoComplete="username"
                    aria-label="User ID"
                    placeholder="Enter your User ID"
                      value={loginIdentity}
                      onChange={(event) => setLoginIdentity(event.target.value)}
                      className="h-full w-full min-w-0 bg-transparent text-[15px] text-[#101827] outline-none placeholder:text-[#687487]"
                />
              </div>

              <div className="flex h-[49px] items-center rounded-2xl border border-[#dedce5] bg-white/80 px-4 focus-within:border-[#ef1b23]">
                <svg aria-hidden="true" className="h-6 w-6 shrink-0 text-[#687487]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="10" width="16" height="12" rx="2" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3M12 15v3" />
                </svg>
                <input
                  data-login-password
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  aria-label="Password"
                  placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(event) => setLoginPassword(event.target.value)}
                      className="h-full w-full min-w-0 bg-transparent px-4 text-[15px] text-[#101827] outline-none placeholder:text-[#687487]"
                />
                <button
                  type="button"
                  data-login-password-toggle
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="shrink-0 text-[#687487]"
                >
                  <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3 21 21M10.6 10.7a2 2 0 0 0 2.7 2.7" />
                    <path d="M9.9 5.3A11 11 0 0 1 12 5c5 0 9 4 10 7a13 13 0 0 1-3.1 4.3M6.1 6.1C4.2 7.4 2.8 9.4 2 12c1 3 5 7 10 7 1.4 0 2.8-.3 4-.9" />
                  </svg>
                </button>
              </div>

              <div className="flex justify-end pt-1">
                <button type="button" className="text-[14px] font-bold text-[#e60012]">
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="mt-2 flex h-[52px] w-full items-center justify-center gap-4 rounded-full bg-gradient-to-r from-[#ff2939] via-[#f00018] to-[#bd0008] text-[22px] font-bold text-white shadow-[0_8px_16px_rgba(220,0,20,0.2)]"
              >
                Login
              </button>
                {loginError && (<p role="alert" className="text-xs font-medium text-[#d71920]">{loginError}</p>)}
            </form>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 border-t border-[#e3e0e8] pt-5 text-[14px]">
              <span className="font-medium text-[#647084]">Don&apos;t have an account?</span>
              <button type="button" onClick={() => setAccountView("register")} className="font-bold text-[#e60012] underline underline-offset-2">
                Create Account
              </button>
            </div>
              </>
            ) : (
              <div data-city-coolies-registration>
                {!showRegistrationOtp && (
                  <div data-registration-step="contact">
                    {/* Registration introduction */}
                <div>
                  <h2 className="text-[clamp(23px,2vw,30px)] font-extrabold tracking-tight text-[#07111f]">
                    Create Your Account
                  </h2>
                  <p className="mt-1 text-sm font-medium text-[#586476]">
                    Join City Coolies and get started in minutes.
                  </p>
                </div>

                {/* Registration method selection */}
                <div
                  role="group"
                  aria-label="Registration method"
                  className="mt-3 flex rounded-full bg-white/90 p-1 shadow-[0_5px_20px_rgba(80,38,52,0.1)]"
                >
                  <button
                    type="button"
                    onClick={() => handleRegistrationMethodChange("phone")}
                    aria-pressed={registrationMethod === "phone"}
                    className={`flex h-10 flex-1 items-center justify-center gap-2 rounded-full text-sm font-bold transition-colors ${
                      registrationMethod === "phone"
                        ? "bg-gradient-to-r from-[#ff2939] to-[#cb000a] text-white shadow-[0_6px_14px_rgba(229,0,20,0.22)]"
                        : "text-[#101827]"
                    }`}
                  >
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="6" y="2" width="12" height="20" rx="2" />
                      <path d="M11 18h2" />
                    </svg>
                    Phone
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRegistrationMethodChange("email")}
                    aria-pressed={registrationMethod === "email"}
                    className={`flex h-10 flex-1 items-center justify-center gap-2 rounded-full text-sm font-bold transition-colors ${
                      registrationMethod === "email"
                        ? "bg-gradient-to-r from-[#ff2939] to-[#cb000a] text-white shadow-[0_6px_14px_rgba(229,0,20,0.22)]"
                        : "text-[#101827]"
                    }`}
                  >
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m3 6 9 7 9-7" />
                    </svg>
                    Email
                  </button>
                </div>

                {/* First and last name */}
                <div className="mt-3 grid grid-cols-2 gap-3 max-[360px]:grid-cols-1">
                  <div className="min-w-0">
                    <label
                      htmlFor="registration-first-name"
                      className="mb-1 block text-sm font-semibold text-[#111827]"
                    >
                      First Name
                    </label>
                    <input
                      id="registration-first-name"
                      value={registrationFirstName}
                      onChange={(event) => {
                        setRegistrationFirstName(event.target.value);
                        resetRegistrationVerification();
                      }}
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      placeholder="First name"
                      className="h-10 w-full min-w-0 rounded-2xl border border-[#dedce5] bg-white/80 px-3 text-sm text-[#101827] outline-none placeholder:text-[#687487] focus:border-[#ef1b23]"
                    />
                  </div>

                  <div className="min-w-0">
                    <label
                      htmlFor="registration-last-name"
                      className="mb-1 block text-sm font-semibold text-[#111827]"
                    >
                      Last Name
                    </label>
                    <input
                      id="registration-last-name"
                      value={registrationLastName}
                      onChange={(event) => {
                        setRegistrationLastName(event.target.value);
                        resetRegistrationVerification();
                      }}
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      placeholder="Last name"
                      className="h-10 w-full min-w-0 rounded-2xl border border-[#dedce5] bg-white/80 px-3 text-sm text-[#101827] outline-none placeholder:text-[#687487] focus:border-[#ef1b23]"
                    />
                  </div>
                </div>

                {/* Contact field follows the selected registration method. */}
                <div className="mt-3">
                  <label
                    htmlFor="registration-identity"
                    className="mb-1 block text-sm font-semibold text-[#111827]"
                  >
                    {registrationMethod === "phone"
                      ? "Phone Number"
                      : "Email Address"}
                  </label>

                  <div className="flex h-10 items-center rounded-2xl border border-[#dedce5] bg-white/80 px-3 focus-within:border-[#ef1b23]">
                    {registrationMethod === "phone" && (
                      <div className="mr-3 flex shrink-0 items-center gap-2.5 border-r border-[#c9c8d3] pr-3">
  {/* India flag */}
  <svg
    role="img"
    aria-label="India"
    viewBox="0 0 36 24"
    className="h-[22px] w-[32px] shrink-0 overflow-hidden rounded-[2px]"
  >
    <path d="M0 0h36v8H0z" fill="#FF9933" />
    <path d="M0 8h36v8H0z" fill="#FFFFFF" />
    <path d="M0 16h36v8H0z" fill="#138808" />
    <circle
      cx="18"
      cy="12"
      r="3.2"
      fill="none"
      stroke="#000080"
      strokeWidth="0.7"
    />
    <path
      d="M18 8.8v6.4M14.8 12h6.4M15.7 9.7l4.6 4.6M20.3 9.7l-4.6 4.6"
      fill="none"
      stroke="#000080"
      strokeWidth="0.5"
    />
  </svg>

  {/* Country dialing code */}
  <span className="text-sm font-bold text-[#111827]">
    +91
  </span>

  {/* Country code dropdown indicator */}
  <svg
    aria-hidden="true"
    className="h-4 w-4 shrink-0 text-[#111827]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
</div>
                    )}

                    <input
                      key={registrationMethod}
                      id="registration-identity"
                      value={registrationContact}
                      onChange={(event) => {
                        setRegistrationContact(event.target.value);
                        resetRegistrationVerification();
                      }}
                      name={registrationMethod === "phone" ? "phone" : "email"}
                      type={registrationMethod === "phone" ? "tel" : "email"}
                      inputMode={registrationMethod === "phone" ? "numeric" : "email"}
                      autoComplete={registrationMethod === "phone" ? "tel-national" : "email"}
                      placeholder={
                        registrationMethod === "phone"
                          ? "Enter your mobile number"
                          : "Enter your email address"
                      }
                      className="h-full w-full min-w-0 bg-transparent text-sm text-[#101827] outline-none placeholder:text-[#687487]"
                    />
                  </div>
                </div>

                                <div className="mt-3">
                  <button
                    type="button"
                    onClick={handleRegistrationContactVerification}
                    aria-expanded={showRegistrationOtp}
                    className="flex h-11 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#ff2939] via-[#f00018] to-[#bd0008] text-sm font-bold text-white shadow-[0_6px_14px_rgba(220,0,20,0.18)] transition-opacity hover:opacity-95"
                  >
                    {registrationMethod === "phone" ? "Verify Phone Number" : "Verify Email ID"}
                  </button>

                  {registrationError && (
                    <p
                      role="alert"
                      className="mt-2 text-xs font-medium text-[#d71920]"
                    >
                      {registrationError}
                    </p>
                  )}
                </div>

                                  </div>
                )}

                {showRegistrationOtp && (
                  <div data-registration-step="verification">
                  <div data-registration-otp className="mt-3">
                    <label
                      htmlFor="registration-otp"
                      className="mb-1 block text-sm font-semibold text-[#111827]"
                    >
                      Enter 6-Digit OTP
                    </label>

                    <p className="mb-2 break-words text-xs text-[#647084]">
                      {registrationMethod === "phone"
                        ? "Phone verification"
                        : "Email verification"}
                      : {registrationContact.trim()}
                    </p>

                    <input
                      id="registration-otp"
                      name="registrationOtp"
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={6}
                      value={registrationOtp}
                      onChange={(event) =>
                        handleRegistrationOtpChange(event.target.value)
                      }
                      placeholder="Enter 6-digit code"
                      aria-label="Six-digit verification code"
                      readOnly={isRegistrationOtpVerified}
                      className="h-11 w-full rounded-2xl border border-[#dedce5] bg-white/80 px-3 text-center text-base font-semibold tracking-[0.25em] text-[#101827] outline-none placeholder:text-sm placeholder:font-normal placeholder:tracking-normal placeholder:text-[#687487] focus:border-[#ef1b23]"
                    />
                  </div>

                                  <div className="mt-2 flex items-center justify-between gap-3 text-xs font-semibold">
                    <span className={otpStatus === "expired" ? "text-[#d71920]" : "text-[#647084]"}>
                      {isRegistrationOtpVerified
                        ? "OTP verified"
                        : otpStatus === "expired"
                          ? "Invalid OTP"
                          : `Time remaining: ${String(Math.floor(otpSecondsRemaining / 60)).padStart(2, "0")}:${String(otpSecondsRemaining % 60).padStart(2, "0")}`}
                    </span>
                    {otpStatus === "expired" && (
                      <button type="button" onClick={handleResendRegistrationOtp} className="font-bold text-[#e60012] underline underline-offset-2">
                        Resend OTP
                      </button>
                    )}
                  </div>
                  {registrationError && (
                    <p role="alert" className="mt-2 text-xs font-medium text-[#d71920]">{registrationError}</p>
                  )}

                  
{/* Registration password */}
                <div className="mt-4">
                  <label
                    htmlFor="registration-password"
                    className="mb-1.5 block text-sm font-semibold text-[#111827]"
                  >
                    Create Password
                  </label>

                  <div className="flex h-12 items-center rounded-2xl border border-[#dedce5] bg-white/80 px-3 focus-within:border-[#ef1b23]">
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-[#687487]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="4" y="10" width="16" height="12" rx="2" />
                      <path d="M8 10V7a4 4 0 0 1 8 0v3M12 15v3" />
                    </svg>

                    <input
                      id="registration-password"
                      name="registrationPassword"
                      type={showRegistrationPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Create a password"
                      value={registrationPassword}
                      onChange={(event) => {
                        setRegistrationPassword(event.target.value);
                        setRegistrationError("");
                      }}
                      minLength={8}
                      maxLength={15}
                      aria-describedby="registration-password-requirements"
                      aria-invalid={
                        registrationPassword.length > 0 &&
                        !isRegistrationPasswordValid
                      }
                      disabled={!isRegistrationOtpVerified}
                      className="h-full w-full min-w-0 bg-transparent px-3 text-sm text-[#101827] outline-none placeholder:text-[#687487]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowRegistrationPassword((current) => !current)
                      }
                      aria-label={
                        showRegistrationPassword
                          ? "Hide registration password"
                          : "Show registration password"
                      }
                      aria-pressed={showRegistrationPassword}
                      className="shrink-0 text-[#687487] transition-colors hover:text-[#111827]"
                    >
                      {showRegistrationPassword ? (
                        <svg
                          aria-hidden="true"
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      ) : (
                        <svg
                          aria-hidden="true"
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 3 21 21M10.6 10.7a2 2 0 0 0 2.7 2.7" />
                          <path d="M9.9 5.3A11 11 0 0 1 12 5c5 0 9 4 10 7a13 13 0 0 1-3.1 4.3M6.1 6.1C4.2 7.4 2.8 9.4 2 12c1 3 5 7 10 7 1.4 0 2.8-.3 4-.9" />
                        </svg>
                      )}
                    </button>
                  </div>

                  <p
                    id="registration-password-requirements"
                    className={`mt-2 text-xs font-medium leading-relaxed ${
                      registrationPassword.length === 0
                        ? "text-[#647084]"
                        : isRegistrationPasswordValid
                          ? "text-green-700"
                          : "text-[#d71920]"
                    }`}
                  >
                    {registrationPassword.length === 0
                      ? "8-15 characters, starting with a capital letter, including a number and special character."
                      : isRegistrationPasswordValid
                        ? "Password meets all requirements."
                        : "Use 8-15 characters, start with a capital letter, and include a number and special character."}
                  </p>
                </div>
                {/* Confirm registration password */}
                <div className="mt-4">
                  <label
                    htmlFor="registration-confirm-password"
                    className="mb-1.5 block text-sm font-semibold text-[#111827]"
                  >
                    Confirm Password
                  </label>

                  <div className="flex h-12 items-center rounded-2xl border border-[#dedce5] bg-white/80 px-3 focus-within:border-[#ef1b23]">
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-[#687487]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="4" y="10" width="16" height="12" rx="2" />
                      <path d="M8 10V7a4 4 0 0 1 8 0v3M12 15v3" />
                    </svg>

                    <input
                      id="registration-confirm-password"
                      name="confirmRegistrationPassword"
                      type={showConfirmRegistrationPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Confirm your password"
                      value={confirmRegistrationPassword}
                      onChange={(event) => {
                        setConfirmRegistrationPassword(event.target.value);
                        setRegistrationError("");
                      }}
                      minLength={8}
                      maxLength={15}
                      aria-describedby="registration-confirm-password-message"
                      aria-invalid={
                        confirmRegistrationPassword.length > 0 &&
                        confirmRegistrationPassword !== registrationPassword
                      }
                      disabled={!isRegistrationOtpVerified}
                      className="h-full w-full min-w-0 bg-transparent px-3 text-sm text-[#101827] outline-none placeholder:text-[#687487]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmRegistrationPassword((current) => !current)
                      }
                      aria-label={
                        showConfirmRegistrationPassword
                          ? "Hide confirmation password"
                          : "Show confirmation password"
                      }
                      aria-pressed={showConfirmRegistrationPassword}
                      className="shrink-0 text-[#687487] transition-colors hover:text-[#111827]"
                    >
                      {showConfirmRegistrationPassword ? (
                        <svg
                          aria-hidden="true"
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M2 12s3.5-7 10-7 10 7-3.5 7-10 7S2 12 2 12Z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      ) : (
                        <svg
                          aria-hidden="true"
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 3 21 21M10.6 10.7a2 2 0 0 0 2.7 2.7" />
                          <path d="M9.9 5.3A11 11 0 0 1 12 5c5 0 9 4 10 7a13 13 0 0 1-3.1 4.3M6.1 6.1C4.2 7.4 2.8 9.4 2 12c1 3 5 7 10 7 1.4 0 2.8-.3 4-.9" />
                        </svg>
                      )}
                    </button>
                  </div>

                  <p
                    id="registration-confirm-password-message"
                    aria-live="polite"
                    className={`mt-2 text-xs font-medium ${
                      confirmRegistrationPassword.length > 0 &&
                      confirmRegistrationPassword === registrationPassword &&
                      isRegistrationPasswordValid
                        ? "text-green-700"
                        : "text-[#d71920]"
                    }`}
                  >
                    {confirmRegistrationPassword.length === 0
                      ? ""
                      : confirmRegistrationPassword === registrationPassword &&
                          isRegistrationPasswordValid
                        ? "Passwords match."
                        : "Passwords do not match or do not meet the requirements."}
                  </p>
                </div>                  <button
                    type="button"
                    onClick={handleRegistrationSubmit}
                    disabled={!isRegistrationOtpVerified}
                    className="mt-4 flex h-11 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#ff2939] via-[#f00018] to-[#bd0008] text-sm font-bold text-white shadow-[0_6px_14px_rgba(220,0,20,0.18)] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Submit
                  </button>


                                  </div>
                )}

                {registrationAccountExists && (
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-2 border-t border-[#e3e0e8] pt-5 text-sm">
                  <span className="font-medium text-[#647084]">
                    Already have an account?
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                        resetRegistrationVerification();
                        setAccountView("login");
                      }}
                    className="font-bold text-[#e60012] underline underline-offset-2"
                  >
                    Login
                  </button>
                </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}