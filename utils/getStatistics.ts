
//number of parcels per company
interface ParcelReceiver {
    OwnerID: string;
    OwnerName: string;
    Batch: string;
    PhoneNumber: string;
    Email: string;
  }
  
  
  interface Parcel {
    Comment: string | null;
    OwnerID: string;
    OwnerName: string;
    ParcelID: string;
    CollectedAt: string | null;
    ParcelNumber: string | null;
    ParcelReceiver: ParcelReceiver
    ReceivedAt: string;
    Shelf: string;
    Status: string;
    spare: any | null;
    ParcelCompany: string;
    Reminders: string[]
  }
  
  const getChartData_company = (parcels: Parcel[]) => {
    const countPerCompany = parcels.reduce((acc: Record<string, number>, parcel: Parcel) => {
      const companyName = parcel.ParcelCompany;
      if (!acc[companyName]) {
        acc[companyName] = 0;
      }
      acc[companyName] += 1;
      return acc;
    }, {});
  
    return {
      labels: Object.keys(countPerCompany),
      datasets: [{
        label: 'Number of Parcels',
        data: Object.values(countPerCompany),
        backgroundColor: '#ef6461ff',
        borderColor: '#ef6461ff',
        borderWidth: 1,
      }],
    };
  };

//number of parcels per day
// Define a type for the days of the week
type DayOfWeek = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

const getChartData_day = (parcels: Parcel[]) => {
  const daysOfWeek: DayOfWeek[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  // Initialize an object to count parcels received on each day of the week
  const dayCounts: { [key in DayOfWeek]: number } = { Sunday: 0, Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0 };

  parcels?.forEach(parcel => {
    const date = new Date(parcel.ReceivedAt); // Convert ReceivedAt to a Date object
    const dayOfWeekNumber = date.getUTCDay(); // Get the day of week as a number
    const dayOfWeekName = daysOfWeek[dayOfWeekNumber]; // Get the name of the day

    // Assert dayOfWeekName as a key of dayCounts to satisfy TypeScript's type checking
    dayCounts[dayOfWeekName as DayOfWeek] += 1; // Increment count for that day
  });

  return {
    labels: daysOfWeek,
    datasets: [{
      label: 'Number of Parcels',
      data: Object.values(dayCounts), // Get counts for each day in order
      backgroundColor: '#ef6461ff',
      borderColor: '#ef6461ff',
      borderWidth: 1,
    }],
  };
}

//number of collected and uncollected parcels all time
const getStatus = (parcels: Parcel[]) => {
    var collected_count = 0
    var uncollected_count = 0
    parcels?.forEach(parcel => {
        const status = parcel.Status;

        if (status == 'NC')
            uncollected_count += 1
        else
            collected_count += 1  
    })
    return (
        {collected_count, uncollected_count}
    )
}


const getStaffBatch = (parcels: Parcel[]) => {
    var staff_count = 0
    var batch_count = 0
    parcels?.forEach(parcel => {
        const batch = parcel.ParcelReceiver.Batch;
        if (batch.startsWith("UG") || batch.startsWith("TLP"))
          batch_count += 1
          else 
          staff_count += 1
    })
    return {staff_count, batch_count}
}

const avgTime = (parcels: Parcel[]) => {
    let totalDifferenceinDays = 0;
    let collectedParcelsCount = 0;
    parcels?.forEach(parcel => {
        if (parcel.Status == "C" && parcel.CollectedAt != null) {
            const receivedAt = new Date(parcel.ReceivedAt); // Convert ReceivedAt to a Date object
            const collectedAt = new Date(parcel.CollectedAt); // Convert CollectedAt to a Date object
        const differenceInMilliseconds = collectedAt.getTime() - receivedAt.getTime();
        const differenceInDays = differenceInMilliseconds / (1000 * 3600 * 24);
        totalDifferenceinDays += differenceInDays;
        collectedParcelsCount += 1;
          }
});
    console.log("totalDifferenceinDays", totalDifferenceinDays, "collectedParcelsCount", collectedParcelsCount)
    if (collectedParcelsCount == 0) return null;
    return Math.round(totalDifferenceinDays / collectedParcelsCount)
};

export{ getChartData_company, getChartData_day, getStatus, getStaffBatch, avgTime } 