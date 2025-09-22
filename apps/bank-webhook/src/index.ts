import express from "express";
import prisma from "@repo/db";

const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
  const paymentInformation: {
    token: string;
    userId: string;
    amount: string;
  } = {
    token: req.body.token,
    userId: req.body.userId,
    amount: req.body.amount,
  };

  try {
    const t = await prisma.onRamptransactions.findFirst({
      where: { token: paymentInformation.token },
    });
    if (!t) throw new Error("Token mismatch");

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
  } catch (e) {
    // No logs here
    res.status(411).json({ message: "Error while processing webhook" });
  }
});

const port = process.env.PORT || 3003;
app.listen(port, () => { });
