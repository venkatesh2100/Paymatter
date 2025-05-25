"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textInput";
import CreateOnRampTractions from "../app/lib/actions/onRampTransactions";
import { Provider } from "../app/providers";

const SUPPORTED_BANKS = [
  { name: "HDFC Bank", redirectUrl: "https://netbanking.hdfcbank.com" },
  { name: "Axis Bank", redirectUrl: "https://www.axisbank.com/" },
];

export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl || "");
  const [amount, setAmount] = useState("");
  const [provider,setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");

  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          label={"Amount"}
          placeholder={"Amount"}
          onChange={(value) => setAmount(value)}
        />
        <div className="py-4 text-left">Bank</div>
        <Select
          onSelect={(value) => {
            const selected = SUPPORTED_BANKS.find((x) => x.name === value);
            setRedirectUrl(selected?.redirectUrl || "");
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        <div className="flex justify-center pt-4">
          <Button
            onClick={async() => {
              await CreateOnRampTractions(provider,amount)
              // console.log("Redirecting to:", redirectUrl);
              // if (!redirectUrl) return alert("No bank selected");
              window.open(redirectUrl, "_blank");
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
};
