export async function GET(request: Request) {
     // in this file you can write the logic
     console.log("Someone called me! cron job is running");
        return new Response("GET request received");
  }