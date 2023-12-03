import prisma from "@/prisma";
import axios from "axios";
const connectToDb = async () => {
  try {
    await prisma.$connect();
  } catch (err: any) {
    return new Error(err.message);
  }
};

const getParcels = async (func: string, query: any) => {
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
  var yyyy = String(today.getFullYear());
  var date = yyyy + mm + dd;
  let pid =
    "AP" +
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

const addVendor = async (vendor: any) => {
  const res = await axios.post("/api/add_vendor", { data: vendor });
  return res.data.vendor;
};

const getVendors = async (query: any) => {
  const receivers = await axios.post("/api/get_vendors", { query: query });
  return receivers.data.vendors;
};

const getReceivers = async (query: any) => {
  const receivers = await axios.post("/api/get_parcel_recievers", {
    query: query,
  });
  return receivers.data.parcelRecievers;
};

const getParcelOTP = async (len: number = 6) => {
  let char_set = "0123456789";
  const pid = Array.from({ length: len }, () =>
    char_set.charAt(Math.floor(Math.random() * char_set.length))
  ).join("");
  return pid;
};

const startOfWeekDate = (date: Date) => {
  var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? 0 : 1);
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
  status_filt: string
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
  // let sort_param_dict={"N":prisma.parcel}
  // N would be the ParcelOwner Field in the file
  // D would be the receivedAt Field in the file
  // S would be the status Field in the file

  interface time_filt_dictIn {
    [key: string]: { gte: Date } | {};
  }
  interface status_filt_dictIn {
    [key: string]: string[];
  }
  let obj = {
    where: {
      receivedAt: time_filt_dict[time_filt],
      status: {
        in: status_filt_dict[status_filt],
      },
    },
    orderBy: sort_param_dict[sort_param]
  }
  //

  return obj
}  


export {
  getParcels,
  getVendors,
  getReceivers,
  addParcel,
  addVendor,
  generatePID,
  connectToDb,
  getParcelOTP,
  filter_sort_query,
};
