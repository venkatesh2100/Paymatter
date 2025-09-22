"use client";

import { Button } from "@repo/ui/button";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textInput";
import { Card } from "@repo/ui/card";
import { useState } from "react";
import { P2Ptransactions } from "../app/lib/actions/p2pTranscations";
import { AnimatePresence, motion } from "framer-motion";
import successAnimation from "../public/animations/success.json";
import dynamic from "next/dynamic";
import { FaSpinner, FaTimesCircle } from "react-icons/fa";
import type { AnimationItem } from "lottie-web";

// Dynamically import Player so it won’t SSR
const PlayerSSR = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

export default function SendCard() {
  const [phone_number, Setphone_number] = useState("");
  const [Amount, SetAmount] = useState("");
  const [animationInstance, setAnimationInstance] = useState<AnimationItem | null>(null);
  const successAnimationLength = 90;

  const [status, setStatus] = useState<
    "idle" | "success" | "processing" | "failed"
  >("idle");

  const handleButton = async () => {
    setStatus("processing");
    try {
      const res = await P2Ptransactions(phone_number, Number(Amount));
      if (res?.msg.includes("Updated")) {
        setStatus("success");
      } else {
        throw new Error("Failed while Sending Money");
      }
    } catch {
      setStatus("failed");
    }
  };

  return (
    <div className="">
      <div className="h-[95vh]  w-[30vw] flex justify-center items-center ">
        <Card title="Send Money">
          <div >
            <TextInput
              placeholder="Account Number"
              label="Account Number"
              onChange={(value) => Setphone_number(value)}
            />
            <TextInput
              placeholder="Amount"
              label="Amount "
              onChange={(value) => SetAmount(value)}
            />
            <div className="flex pt-4   justify-center">
              <Button onClick={handleButton}>Send</Button>
            </div>
          </div>
        </Card>
      </div>

      <AnimatePresence>
        {status !== "idle" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 backdrop-blur-sm"
            onClick={() => setStatus("idle")}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center space-y-6 w-80 text-center relative"
              onClick={(e) => e.stopPropagation()}
            >
              {status === "processing" && (
                <>
                  <FaSpinner className="animate-spin text-blue-500 text-4xl" />
                  <p className="text-lg font-semibold text-blue-600">
                    Processing your payment...
                  </p>
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2 }}
                    className="h-1 w-full bg-blue-400 rounded-full"
                  />
                </>
              )}
              {status === "success" && (
                <>
                  <PlayerSSR
                    autoplay
                    loop={false}
                    speed={0.9}
                    src={successAnimation}
                    style={{ height: 250, width: 450 }}
                    lottieRef={(instance: AnimationItem) => {
                      setAnimationInstance(instance);
                    }}
                    onEvent={(event) => {
                      if (event === "complete" && animationInstance) {
                        animationInstance.goToAndStop(successAnimationLength, true);
                      }
                    }}
                  />
                  <p className="text-xl font-bold text-green-600">
                    Payment Successful!
                  </p>
                  <p className="text-sm text-gray-500">
                    Money sent Successfully! 🎉
                  </p>
                </>
              )}
              {status === "failed" && (
                <>
                  <FaTimesCircle className="text-red-500 text-5xl animate-pulse" />
                  <p className="text-xl font-bold text-red-600">
                    Payment Failed
                  </p>
                  <p className="text-sm text-gray-500">Please try again</p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
