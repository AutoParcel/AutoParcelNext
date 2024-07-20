import prisma from "@/prisma";
import axios from "axios";
// import {Twilio} from "twilio";
// import twilio from "twilio";
const connectToDb = async () => {
  try {
    await prisma.$connect();
  } catch (err: any) {
    return new Error(err.message);
  }
};

const getParcels = async (func: string, query: any) => {
  console.log(query);
  const res = await axios.post("/api/get_parcels", {
    func: func,
    query: query,
  });
  return res.data.parcels;
};

const generatePID = async (len: number = 4) => {
  // let char_set = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let char_set = "0123456789";
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yy = String(today.getFullYear() % 100);
  var date = yy + mm + dd;
  let pid =
    "PLU" +
    date +
    Array.from({ length: len }, () =>
      char_set.charAt(Math.floor(Math.random() * char_set.length))
    ).join("");
  while (
    (await getParcels("findUnique", { where: { ParcelID: pid } })) != null
  ) {
    pid = Array.from({ length: len }, () =>
      char_set.charAt(Math.floor(Math.random() * char_set.length))
    ).join("");
  }
  return pid;
};

const addParcel = async (parcel: any) => {
  const res = await axios.post("/api/add_parcel", { data: parcel });
  return res.data.parcel;
};


const getReceivers = async (query: any) => {
  const receivers = await axios.post("/api/get_parcel_recievers", {
    query: query,
  });
  return receivers.data.parcelRecievers;
};

const getUsers = async (query: any) => {
  const users = await axios.post("/api/get_users", {
    query: query,
  });
  return users.data;
};


const getParcelOTP = (len: number = 6) => {
  let char_set = "0123456789";
  const pid: any = Array.from({ length: len }, () =>
    char_set.charAt(Math.floor(Math.random() * char_set.length))
  ).join("");
  console.log(pid);
  return pid;
};

const startOfWeekDate = (date: Date) => {
  var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
};

const startOfMonthDate = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

const startOfDayDate = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const filter_sort_query = (
  time_filt: string,
  sort_param: string,
  status_filt: string,
  sort_direction: string = 'asc'
) => {
  // let time_filt_dict = {"T":startOfDayDate, "W":startOfWeekDate, "M":startOfMonthDate, "A":}
  let time_filt_dict: time_filt_dictIn = {
    T: { gte: startOfDayDate(new Date()) },
    W: { gte: startOfWeekDate(new Date()) },
    M: { gte: startOfMonthDate(new Date()) },
    A: {},
  };
  let status_filt_dict: status_filt_dictIn = {
    NC: ["NC"],
    C: ["C"],
    A: ["NC", "C"],
  };
  // add desc and asc for sorting
  let sort_param_dict: sort_param_dictIn = {
    N: { OwnerName: sort_direction },
    D: { ReceivedAt: sort_direction },
    S: { Status: sort_direction },
    Sh: { Shelf: sort_direction },
    P: { ParcelID: sort_direction },
  };

  interface time_filt_dictIn {
    [key: string]: { gte: Date } | {};
  }
  interface status_filt_dictIn {
    [key: string]: string[];
  }
  interface sort_param_dictIn {
    [key: string]: {};
  }
  let obj = {
    where: {
      ReceivedAt: time_filt_dict[time_filt],
      Status: {
        in: status_filt_dict[status_filt],
      },
    },
    orderBy: sort_param_dict[sort_param],
    include: { ParcelReceiver: true },
  };
  //

  return obj;
};

const sendMessage = async () => {
  const res = await fetch('/api/sendMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });
  const apiResponse = await res.json();
};

// const sendMessage = (parcel_obj:Object, otp: string,type:string) =>
// {  const accountSid = 'ACabcdafb0cabe490bac017324e60bd268';
//   const authToken = 'eaaf744c3e060a675a8fc1b1bcaf2ab3';
//   const client = new Twilio(accountSid, authToken);
//   // const client = twilio(accountSid, authToken);
//   // const client = require('twilio')(accountSid, authToken);
//   let body=''

//   if(type.toLowerCase().trim()=="c"){ //@ts-ignore
//     body=`Dear ${parcel_obj.OwnerName},\nYour parcel ${parcel_obj.id} has arrived at Gate 1 at ${parcel_obj.ReceivedAt}.\n Kindly use ${otp} as your AutoParcel One Time Password (OTP) to collect your parcel.`
//   } else if(type.toLowerCase().trim()=="h") { //@ts-ignore
//     body=`Dear ${parcel_obj.OwnerName},\nYour parcel has been collected from Gate 1 at ${parcel_obj.CollectedAt}.\n Thank you for using AutoParcel :)`
//   } else {
//     body='AutoParcel OTP'
//   }

//   client.messages.create({ //@ts-ignore
//           body: `Dear ${parcel_obj.OwnerName},\nYour parcel ${parcel_obj.id} has arrived at Gate 1.\n Kindly use ${otp} as your One Time Password (OTP) to collect your parcel.`,
//           from: 'whatsapp:+14155238886',
//           to: 'whatsapp:+917892564481'
//       }) //@ts-ignore
//       .then(message => console.log(message.sid))
//       // .done();}
//     }



    
// const sendMessage = (req: NextApiRequest, res: NextApiResponse) => {
//   const accountSid = 'ACabcdafb0cabe490bac017324e60bd268';
//   const token = 'eaaf744c3e060a675a8fc1b1bcaf2ab3';
//   const client = twilio(accountSid, token);
//   // const { phone, message } = req.body;
//   // console.log(phone, message);
//   client.messages
//     .create({
//       body: "test message",
//       from: 'whatsapp:+14155238886',
//       to: 'whatsapp:+917892564481',
//     })
//     .then((message) =>
//       res.json({
//         success: true,
//       })
//     )
//     .catch((error) => {
//       console.log(error);
//       res.json({
//         success: false,
//       });
//     });
// }
const getDate = (olddate: string= "") => {
  let date = new Date();
  if (olddate != "") {
    date = new Date(olddate); //in UTC
  }
  const istOffset = 5 * 60 * 60 * 1000 + 30 * 60 * 1000; // 5 hours 30 minutes in milliseconds
  const istDate = new Date(date.getTime() + istOffset); //in IST

  let currentDayOrdinal = getOrdinalNum(istDate.getDate());
  let currentMonth = istDate.toLocaleString("default", { month: "long" });
  let currentYear = istDate.getFullYear();
  let currentTime = istDate.getUTCHours() + ":" + istDate.getUTCMinutes();
  let currentDate = `${currentDayOrdinal} ${currentMonth} ${currentYear} at ${currentTime}`;
  return currentDate;
};
function getOrdinalNum(n: number) {
  return (
    n +
    (n > 0
      ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : "")
  );
}

export {
  getParcels,
  getUsers,
  getReceivers,
  addParcel,
  generatePID,
  connectToDb,
  getParcelOTP,
  filter_sort_query,
  sendMessage,
  getDate,
};
