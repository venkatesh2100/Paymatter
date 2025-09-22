import express from "express";
import prisma from "@repo/db";
const app = express();

app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
  //TODO: Add zod validation here?
  //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
  const paymentInformation: {
    token: string;
    userId: string;
    amount: string;
  } = {
    token: req.body.token,
    userId: req.body.userId,
    amount: req.body.amount,
  };

  // console.log(paymentInformation);



  try {
    const t = await prisma.onRamptransactions.findFirst({
      where:{
        token:paymentInformation.token
      }
    })
    if(!t){
      throw new Error("TOken is diff");
    }

    await prisma.$transaction([
      prisma.balance.updateMany({
        where: {
          userId: Number(paymentInformation.userId),
        },
        data: {
          amount: {
            // You can also get this from your prisma
            increment: Number(paymentInformation.amount),
          },
        },
      }),
      prisma.onRamptransactions.updateMany({
        where: {
          token: paymentInformation.token,
        }
        ,
        data: {
          status: "Success",
        },
      }),
    ]);
    // console.log("success")
    res.json({
      message: "Captured",
    });
  } catch (e) {
    console.error("Webhook proc eessing error:", JSON.stringify(e, null, 2));
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.listen(3003);
