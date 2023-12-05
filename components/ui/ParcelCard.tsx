import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./button";
import { Input } from "./input";
const ParcelCard = ({
  name,
  ownerid,
  shelf,
  date,
  id,
  status,
}: {
  name: string;
  ownerid: string;
  shelf: string;
  id: string;
  date: string;
  status: string;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const newdate = new Date(date);
  const CardClicked = (event: any, name = "") => {
    event.stopPropagation();
    if (name == "Collected") {
      toast({
        title: "Parcel Already Collected!",
        description: "",
        variant: "destructive",
        duration: 3000,
      });
    } else if (name == "Handover") {
      console.log("handover opened");
      toast({
        title: "Parcel Handover",
        description: "Parcel Handover successfully!",
        duration: 3000,
      });
    } else if (name == "epic") {
    } else {
      router.push("/parcels/" + id);
    }
    console.log(event, name);
  };
  return (
    <Dialog>
      <div
        className={`${
          status == "C" ? "opacity-50" : "hover:bg-primary_beige"
        } p-4 rounded-md shadow-md text-center bg-primary_white cursor-pointer flex flex-col justify-between`}
        onClick={(e) => CardClicked(e)}
      >
        <div className="h-full flex flex-col ">
          <div className="flex justify-center">
            <div className="text-xl font-semibold mb-2">{id}</div>
          </div>
          <div className="text-left mb-2">{name}</div>
          <div className="text-left -mt-3 mb-1 text-xs text-primary_yellow font-bold">
            {ownerid}
          </div>
          <div className="text-left mb-2">Shelf {shelf}</div>
          <div className="text-right mb-2 justify-self-end ">
            {newdate.getDate().toString() +
              "-" +
              newdate.getMonth().toString() +
              "-" +
              newdate.getFullYear().toString()}
          </div>
        </div>
        <div>
          {status == "C" ? (
            <button
              className="bg-primary_black text-primary_white p-4 rounded-md w-full"
              onClick={(e) => CardClicked(e, "Collected")}
            >
              Collected
            </button>
          ) : (
            <button
              className="bg-primary_black text-primary_white rounded-md w-full"
              onClick={(e) => CardClicked(e, "epic")}
            >
              <DialogTrigger className="p-4 w-full">
                Handover Parcel
              </DialogTrigger>
            </button>
          )}
        </div>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Please enter OTP to handover parcel</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col gap-5 mt-5">
              <div className="flex gap-4">
                <Input type="number" placeholder="OTP" />
                <Button className="w-full">Generate OTP</Button>
              </div>
              <Button onClick={(e) => CardClicked(e, "Handover")}>
                Handover Parcel
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ParcelCard;
