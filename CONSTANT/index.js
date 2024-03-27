import { Book, Home, LucideDollarSign, PieChart } from "lucide-react";

export const navBarOptions = [
    {
      label: "Analytics",
      icon: PieChart,
      iconColor: "transition ease-in-out hover:text-pink-600 duration-300",
      url: "/dashboard/analytic",
    },
    {
      label: "Payment",
      icon: LucideDollarSign,
      iconColor: "transition ease-in-out hover:text-emerald-600 duration-300",
      url: "/dashboard/payment",
    },
  ];

 export const SIDEBAROPTIONSFORCOMPANY = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: <Home />,
    color: "indigo",
  },  
  {
      title: "Parking Logs",
      href: "/dashboard/records",
      icon: <Book />,
      color: "red",
    },
  ];
 export const SIDEBAROPTIONSFORSOCIETY = [
    {
      title: "Entries",
      href: "/dashboard/records",
      icon: <Book />,
      color: "indigo",
    },
  ];