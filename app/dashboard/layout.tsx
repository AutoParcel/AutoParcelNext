import TopNav from "@/components/Topnav";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

        <div>
          <TopNav />
          {children}
        </div>
  );
}
