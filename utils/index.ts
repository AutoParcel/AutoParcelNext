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

const generatePID = (len: number = 6) => {
  let char_set = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
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

export {
  getParcels,
  getVendors,
  getReceivers,
  addParcel,
  addVendor,
  generatePID,
  connectToDb,
};
