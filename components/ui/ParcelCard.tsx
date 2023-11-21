const ParcelCard = ({
  name,
  shelf,
  date,
  id,
  index,
}: {
  name: string;
  shelf: string;
  id: string;
  date: string;
  index: number;
}) => {
  return (
    <div
      key={index}
      className="bg-gray-300 p-4 rounded-md shadow-md text-center mb-4"
    >
      <div className="text-xl font-semibold mb-2">{id}</div>
      <div className="text-left mb-2">{name}</div>
      <div className="text-left mb-2">{shelf}</div>
      <div className="text-right mb-2">{date}</div>
      <button className="bg-black text-white p-4 rounded-full w-full mt-2">
        Handover Parcel
      </button>
    </div>
  );
};

export default ParcelCard;
