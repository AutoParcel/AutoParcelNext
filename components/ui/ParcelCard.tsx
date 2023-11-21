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
  return (
    <div
      className={`${
        status == "C" ? "bg-primary_beige opacity-50" : "bg-primary_white"
      } p-4 rounded-md shadow-md text-center mb-4`}
    >
      <div className="text-xl font-semibold mb-2">{id}</div>
      <div className="text-left mb-2">{name}</div>
      <div className="text-left mb-2">{shelf}</div>
      <div className="text-right mb-2">{date}</div>
      {status == "C" ? (
        <button className="bg-primary_black text-primary_white p-4 rounded-full w-full mt-2">
          Collected
        </button>
      ) : (
        <button className="bg-primary_black text-primary_white p-4 rounded-full w-full mt-2">
          Handover Parcel
        </button>
      )}
    </div>
  );
};

export default ParcelCard;
