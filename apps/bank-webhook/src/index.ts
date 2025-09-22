import express from "express";
import prisma from "@repo/db";

const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
  const paymentInformation = {
    token: req.body.token,
    userId: req.body.userId,
    amount: req.body.amount,
  };

  try {
    if (!paymentInformation.token || !paymentInformation.userId || !paymentInformation.amount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const t = await prisma.onRamptransactions.findFirst({
      where: { token: paymentInformation.token },
    });

    if (!t) return res.status(404).json({ message: "Token not found" });

    await prisma.$transaction([
      prisma.balance.updateMany({
        where: { userId: Number(paymentInformation.userId) },
        data: { amount: { increment: Number(paymentInformation.amount) } },
      }),
      prisma.onRamptransactions.updateMany({
        where: { token: paymentInformation.token },
        data: { status: "Success" },
      }),
    ]);

    res.json({ message: "Captured" });
  } catch (e: any) {
    // Return the error in response temporarily to debug on Render
    res.status(500).json({ message: "Error while processing webhook", error: e.message });
  }
});

const port = process.env.PORT || 3003;
app.listen(port, () => { });
