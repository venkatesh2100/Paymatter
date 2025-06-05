"use client";
import { Button } from "@repo/ui/button";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textInput";
import { Card } from "@repo/ui/card";
import { useState } from "react";
import { P2Ptransactions } from "../app/lib/actions/p2pTranscations";

export default function SendCard() {
  const [phone_number, Setphone_number] = useState("");
  const [Amount, SetAmount] = useState("");
  return (
    <div className="h-[90vh] ">
      <Center>
        <Card title="Send Money">
          <div>
            <TextInput
              placeholder={phone_number}
              label="Account Number"
              onChange={(value) => Setphone_number(value)}
            />
            <TextInput
              placeholder={Amount}
              label="Amount "
              onChange={(value) => SetAmount(value)}
            />
            <div className="flex justify-center">
              <Button
                onClick={async () => {
                  await P2Ptransactions(Number(phone_number), Number(Amount));
                }}
              >
                Send
              </Button>
              {/* <Button onClick={()=>{alert('HI')}}>
                Code
              </Button> */}
            </div>
          </div>
        </Card>
      </Center>
    </div>
  );
}
