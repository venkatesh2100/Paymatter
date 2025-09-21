"use client";

import { useState, useEffect } from "react";

type Props = {
  userId?: number | string;
  onClose: () => void;
};

type Step = {
  title: string;
  content: React.ReactNode;
};

export default function OnboardingModal({ userId, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const steps: Step[] = [
    {
      title: "Welcome to WellPay",
      content: (
        <div className="text-center py-4">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">🎮</span>
          </div>
          <p className="text-gray-600 text-lg">
            Lets get you set up with your account in just a few steps.
          </p>
        </div>
      ),
    },
    {
      title: "Your Age",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 text-center">How old are you?</p>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))}
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg"
            placeholder="Enter your age"
            min="13"
            max="120"
          />
        </div>
      ),
    },
    {
      title: "Your Gender",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 text-center">Whats your gender?</p>
          <div className="grid grid-cols-2 gap-3">
            {["MALE", "FEMALE", "OTHER"].map((g) => (
              <button
                key={g}
                onClick={() => {
                  setGender(g);
                  setError(null);
                }}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${gender === g
                  ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                  : "border-gray-200 bg-white text-gray-700 hover:border-blue-300"
                  }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Welcome Bonus",
      content: (
        <div className="text-center space-y-6 py-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl">🎁</span>
          </div>
          <div>
            <p className="text-gray-600 mb-3">Use this code to claim your bonus</p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-2xl font-bold text-blue-800 tracking-wider">WELL-PAY</p>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Youll receive 1000 bonus points after completing onboarding
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "All Set!",
      content: (
        <div className="text-center space-y-6 py-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Ready to Go!</h3>
            <p className="text-gray-600">
              Complete your setup and start using WellPay
            </p>
          </div>
        </div>
      ),
    },
  ];

  // Safely get current step data
  const currentStep = steps[step];
  const progress = steps.length > 0 ? ((step + 1) / steps.length) * 100 : 0;
  const isFirstStep = step === 0;
  const isLastStep = step === steps.length - 1;

  // Reset to step 0 if current step becomes invalid
  useEffect(() => {
    if (step >= steps.length && steps.length > 0) {
      setStep(0);
    }
  }, [step, steps.length]);

  const validateStep = (): boolean => {
    if (step === 1) {
      if (!age || age < 13 || age > 120) {
        setError("Please enter a valid age between 13 and 120");
        return false;
      }
    }
    if (step === 2 && !gender) {
      setError("Please select your gender");
      return false;
    }
    setError(null);
    return true;
  };

  const handleNext = () => {
    if (validateStep() && step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
      setError(null);
    }
  };

  async function handleSubmit() {
    if (!validateStep()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/user/${userId}/onboard`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ age, gender, onboarded: true }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to complete onboarding");
      }

      onClose();
    } catch (err) {
      console.error("Onboarding failed:", err);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Show loading if no current step (shouldn't happen with our safeguards)
  if (!currentStep) {
    return (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-8 pb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{currentStep.title}</h2>
            <span className="text-sm text-gray-500 font-medium">{step + 1}/{steps.length}</span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pb-8">
          {currentStep.content}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-between">
          {!isFirstStep ? (
            <button
              onClick={handlePrevious}
              className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors font-medium"
              disabled={isSubmitting}
            >
              Back
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors font-medium"
              disabled={isSubmitting}
            >
              Cancel
            </button>
          )}

          {!isLastStep ? (
            <button
              onClick={handleNext}
              className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
              disabled={isSubmitting}
            >
              Next
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="ml-auto px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center gap-2 disabled:bg-green-400"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  Complete
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
