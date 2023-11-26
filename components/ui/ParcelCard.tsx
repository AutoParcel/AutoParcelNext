import { FaExternalLinkAlt } from "react-icons/fa";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
const ParcelCard = ({
  name,
  shelf,
  date,
  id,
  status,
}: {
  name: string;
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
      toast({
        title: "Parcel Handover",
        description: "Parcel Handover successfully!",
        duration: 3000,
      });
    } else {
      router.push("/parcels/" + id);
    }
    console.log(event, name);
  };
  return (
    <div
      className={`${
        status == "C" ? "bg-primary_beige opacity-50" : "bg-primary_white"
      } p-4 rounded-md shadow-md text-center`}
      onClick={(e) => CardClicked(e)}
    >
      <div className="flex justify-center">
        <div className="text-xl font-semibold mb-2">{id}</div>
      </div>
      <div className="text-left mb-2">{name}</div>
      <div className="text-left mb-2">{shelf}</div>
      <div className="text-right mb-2">
        {newdate.getDate().toString() +
          "-" +
          newdate.getMonth().toString() +
          "-" +
          newdate.getFullYear().toString()}
      </div>
      {status == "C" ? (
        <button
          className="bg-primary_black text-primary_white p-4 rounded-md w-full"
          onClick={(e) => CardClicked(e, "Collected")}
        >
          Collected
        </button>
      ) : (
        <button
          className="bg-primary_black text-primary_white p-4 rounded-md w-full"
          onClick={(e) => CardClicked(e, "Handover")}
        >
          Handover Parcel
        </button>
      )}
    </div>
  );
};

export default ParcelCard;
