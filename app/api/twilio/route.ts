import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from "next/server";
import twilio from 'twilio';

// export const POST = (req: Request) => {
export const POST = (req: NextApiRequest, res: NextApiResponse) => {
    console.log("in sendMessageSuper")
    const accountSid = 'ACabcdafb0cabe490bac017324e60bd268';
    const token = 'eaaf744c3e060a675a8fc1b1bcaf2ab3';
    const client = twilio(accountSid, token);
    // const { phone, message } = req.body;
    // console.log(phone, message);
    try {
        client.messages
        .create({
            body: "test message",
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+917892564481',
        })
    //     return NextResponse.json({ success: true }, { status: 200 });
    // } catch (error) {
    //     console.log(error);
    //     return NextResponse.json({ success: false }, { status: 200 });
    // }
      .then((message) =>
        res.json({
          success: true,
        })
      )
      .catch((error) => {
        console.log(error);
        res.json({
          success: false,
        });
      });
    } catch (error) {
        console.log(error);

      }
}

// export const sendMessageSuper = (req: NextApiRequest, res: NextApiResponse) => {
//     console.log("in sendMessageSuper")
//     const accountSid = 'ACabcdafb0cabe490bac017324e60bd268';
//     const token = 'eaaf744c3e060a675a8fc1b1bcaf2ab3';
//     const client = twilio(accountSid, token);
//     // const { phone, message } = req.body;
//     // console.log(phone, message);
//     client.messages
//       .create({
//         body: "test message",
//         from: 'whatsapp:+14155238886',
//         to: 'whatsapp:+917892564481',
//       })
//       .then((message) =>
//         res.json({
//           success: true,
//         })
//       )
//       .catch((error) => {
//         console.log(error);
//         res.json({
//           success: false,
//         });
//       });
//   }