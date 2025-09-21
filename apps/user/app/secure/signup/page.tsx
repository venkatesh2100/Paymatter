"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    phonenumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(
    null
  );
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [otpSuccess, setOtpSuccess] = useState(false); // New state for success visual feedback
  const [resendTimer, setResendTimer] = useState(0);
  const [showOtpInput, setShowOtpInput] = useState(true);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset OTP state when email changes
  useEffect(() => {
    setOtpSent(false);
    setOtpVerified(false);
    setOtp(["", "", "", "", "", ""]);
    setResendTimer(0);
    setShowOtpInput(true);
    setOtpError(false);
    setOtpSuccess(false);
  }, [formData.email]);

  // Username availability check
  useEffect(() => {
    if (!formData.username) {
      setUsernameAvailable(null);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/check-username?username=${formData.username}`
        );
        const data = await res.json();
        setUsernameAvailable(data.available);
      } catch (err) {
        console.error("Error checking username", err);
        setUsernameAvailable(null);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [formData.username]);

  // Resend OTP timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const sendOtp = async () => {
    if (!formData.email) {
      setError("Please enter email first");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSendingOtp(true);
    setError("");

    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to send OTP");
        return;
      }

      setOtpSent(true);
      setShowOtpInput(true);
      setResendTimer(40); // 40 seconds countdown
    } catch (err) {
      console.error("sendOtp error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError(false);
    setOtpSuccess(false);

    // Auto-focus to next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    // Auto-submit if all fields are filled
    if (newOtp.every(digit => digit !== "") && index === 5) {
      // Small delay to ensure the last digit is properly set
      setTimeout(() => {
        verifyOtp(newOtp.join(''));
      }, 100);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace to move to previous input
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const verifyOtp = async (otpValue?: string) => {
    const otpToVerify = otpValue || otp.join('');
    if (otpToVerify.length !== 6) {
      setOtpError(true);
      return;
    }

    setIsVerifyingOtp(true);
    setError("");
    setOtpError(false);
    setOtpSuccess(false);

    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp: otpToVerify }),
      });

      const data = await res.json();

      if (!res.ok) {
        setOtpError(true);
        setError(data.error || "OTP verification failed");
        // Clear OTP inputs on error
        setOtp(["", "", "", "", "", ""]);
        otpInputRefs.current[0]?.focus();
        return;
      }

      // Success feedback
      setOtpSuccess(true);
      setOtpVerified(true);

      // Hide OTP inputs after a short delay to show success state
      setTimeout(() => {
        setShowOtpInput(false);
      }, 1500);

    } catch (err) {
      console.error("Verify OTP error:", err);
      setError("OTP verification failed");
      setOtpError(true);
      // Clear OTP inputs on error
      setOtp(["", "", "", "", "", ""]);
      otpInputRefs.current[0]?.focus();
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validation
    if (
      !formData.username ||
      !formData.phonenumber ||
      !formData.email ||
      !formData.password
    ) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }

    if (!otpVerified) {
      setError("Please verify your email first");
      setIsLoading(false);
      return;
    }

    try {
      // Create user
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          phonenumber: formData.phonenumber,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
        setIsLoading(false);
        return;
      }

      // Auto-login after successful signup
      const loginRes = await signIn("credentials", {
        login: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (loginRes?.error) {
        setError(loginRes.error);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Check form validity for submit button
  const isFormValid =
    formData.username &&
    formData.phonenumber &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword &&
    formData.password.length >= 8 &&
    otpVerified &&
    usernameAvailable === true;

  // Get OTP input styling based on state
  const getOtpInputClassName = () => {
    const baseClasses = "w-12 h-12 text-center text-xl border rounded-lg focus:outline-none transition-all duration-300";

    if (otpSuccess) {
      return `${baseClasses} border-green-500 ring-2 ring-green-300 bg-green-50 text-green-600`;
    } else if (otpError) {
      return `${baseClasses} border-red-500 ring-2 ring-red-300 bg-red-50 text-red-600`;
    } else if (isVerifyingOtp) {
      return `${baseClasses} border-blue-500 ring-2 ring-blue-300 bg-blue-50`;
    } else {
      return `${baseClasses} border-gray-300 focus:ring-2 focus:ring-blue-500`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            Create Your Account
          </h1>
          <p className="text-gray-600 mt-2">Join us today to get started</p>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-xl shadow-2xl p-8 sm:p-10">
          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Enter your username"
              />
              {usernameAvailable === true && (
                <p className="text-green-600 text-sm mt-1">
                  U are Special! I think u got it.
                </p>
              )}
              {usernameAvailable === false && (
                <p className="text-red-600 text-sm mt-1">
                  Need to Change your Name I think ?
                </p>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <div className="flex gap-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Enter your email"
                  />
                  <button
                    type="button"
                    onClick={sendOtp}
                    disabled={isSendingOtp || !formData.email || resendTimer > 0}
                    className={`px-4 py-3 rounded-lg font-medium text-sm min-w-[100px] transition-all ${isSendingOtp || !formData.email || resendTimer > 0
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-sm hover:shadow-md"
                      }`}
                  >
                    {isSendingOtp ? (
                      <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                    ) : resendTimer > 0 ? (
                      `${resendTimer}s`
                    ) : otpSent ? (
                      "Resend OTP"
                    ) : (
                      "Send OTP"
                    )}
                  </button>
                </div>
              </div>

              {otpSent && showOtpInput && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Enter verification code
                    </label>
                    <div className="flex justify-between space-x-2">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => { otpInputRefs.current[index] = el }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          className={getOtpInputClassName()}
                          disabled={isVerifyingOtp || otpVerified}
                        />
                      ))}
                    </div>

                    {isVerifyingOtp && (
                      <div className="mt-3 flex justify-center items-center">
                        <Loader2 className="h-5 w-5 animate-spin text-blue-500 mr-2" />
                        <span className="text-sm text-blue-600">Verifying...</span>
                      </div>
                    )}

                    {otpSuccess && (
                      <div className="mt-3 flex justify-center items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-green-500 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm text-green-600">OTP verified successfully!</span>
                      </div>
                    )}
                  </div>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={sendOtp}
                      disabled={resendTimer > 0}
                      className={`text-sm ${resendTimer > 0
                        ? "text-gray-400"
                        : "text-blue-600 hover:text-blue-800"
                        }`}
                    >
                      {resendTimer > 0
                        ? `Resend OTP in ${resendTimer}s`
                        : "Resend OTP"}
                    </button>
                  </div>
                </div>
              )}

              {otpVerified && !showOtpInput && (
                <p className="text-green-600 text-sm text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 inline mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Email verified successfully
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phonenumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <div className="relative">
                <input
                  id="phonenumber"
                  name="phonenumber"
                  type="tel"
                  value={formData.phonenumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pl-12"
                  placeholder="Enter phone number"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">+91</span>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-12"
                  placeholder="Enter your password (min 8 characters)"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-12"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !isFormValid}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition flex items-center justify-center ${isLoading || !isFormValid
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 hover:shadow-md"
                }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link
                href="/secure/login"
                className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
