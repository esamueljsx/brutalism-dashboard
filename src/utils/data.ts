import type { NavItem, Statistics } from "@/types";
import {
  BsCash,
  BsCheckCircle,
  BsCoin,
  BsPeople,
  BsBarChartFill,
  BsBriefcaseFill,
  BsCircleSquare,
  BsClipboardDataFill,
  BsDiagram3Fill,
  BsFileTextFill,
  BsFillFileEarmarkFontFill,
  BsFillFileEarmarkTextFill,
  BsLayersFill,
  BsMegaphoneFill,
  BsPersonFill,
  BsPuzzleFill,
  BsRocketTakeoffFill,
  BsFacebook, 
  BsGoogle,
  BsTwitterX,
  BsTiktok,
  BsBing,
} from "react-icons/bs";

export const statisticsData: Statistics[] = [
  {
    name: "Total Spend",
    value: "$8,765",
    icon: BsCash,
    previous: "$10,234",
    progress: "-14.32%",
    trend: "down",
  },
  {
    name: "Visitor",
    value: "14,321",
    icon: BsPeople,
    previous: "12,543",
    progress: "+14.23%",
    trend: "up",
  },
  {
    name: "Acquisition",
    value: "1,023",
    icon: BsCheckCircle,
    previous: "876",
    progress: "+16.73%",
    trend: "up",
  },
  {
    name: "Revenue",
    value: "$18,765",
    icon: BsCoin,
    previous: "$16,432",
    progress: "+21.67%",
    trend: "up",
  },
];

export const navItems: NavItem[] = [
  {
    name: "Marketing",
    href: "/",
    icon: BsMegaphoneFill,
  },
  { name: "Analytics", href: "#", icon: BsBarChartFill },
  { name: "Business", href: "#", icon: BsBriefcaseFill },
  { name: "Project", href: "#", icon: BsClipboardDataFill },
  { name: "HRM", href: "#", icon: BsDiagram3Fill },
  {
    name: "Mobile App",
    href: "#",
    icon: BsCircleSquare,
  },
  {
    name: "Landing page",
    href: "#",
    icon: BsRocketTakeoffFill,
  },
  {
    name: "Components",
    href: "#",
    icon: BsLayersFill,
    hasDropdown: true,
    subItems: [],
  },
  {
    name: "Pages",
    href: "#",
    icon: BsFillFileEarmarkTextFill,
    hasDropdown: true,
    subItems: [],
  },
  {
    name: "Apps",
    href: "/apps",
    icon: BsPuzzleFill,
    hasDropdown: true,
    subItems: [
      { name: "Calendar", href: "#" },
      { name: "Email", href: "/apps/email" },
      { name: "Invoice", href: "#" },
      { name: "Charts", href: "#" },
      { name: "Widgets", href: "#" },
    ],
  },
  {
    name: "Content",
    href: "#",
    icon: BsFillFileEarmarkFontFill,
    hasDropdown: true,
    subItems: [],
  },
  {
    name: "Users",
    href: "#",
    icon: BsPersonFill,
    hasDropdown: true,
    subItems: [],
  },
  {
    name: "Documentation",
    href: "#",
    icon: BsFileTextFill,
    hasDropdown: true,
    subItems: [],
  },
];

export const trafficSourceData = {
  labels: [
    "March 1",
    "March 2",
    "March 3",
    "March 4",
    "March 5",
    "March 6",
    "March 7",
  ],
  datasets: [
    {
      label: "Product A",
      data: [70, 40, 30, 80, 75, 65, 75],
      backgroundColor: "#83CC1C",
    },
    {
      label: "Product B",
      data: [25, 15, 20, 20, 10, 15, 10],
      backgroundColor: "#9ED655",
    },
    {
      label: "Product C",
      data: [25, 25, 35, 35, 20, 20, 15],
      backgroundColor: "#B7E183",
    },
    {
      label: "Product D",
      data: [10, 5, 10, 15, 20, 10, 10],
      backgroundColor: "#D0ECAE",
    },
    {
      label: "Product $",
      data: [30, 30, 35, 35, 30, 35, 30],
      backgroundColor: "#E7F5D7",
    },
  ],
};

export const acquisitionVersusCostData = {
  labels: [
    "March 1",
    "March 2",
    "March 3",
    "March 4",
    "March 5",
    "March 6",
    "March 7",
  ],
  datasets: [
    {
      label: "acquisition",
      data: [180, 310, 250, 370, 450, 320, 300],
      borderColor: "#64A30C",
      backgroundColor: "#64A30C",
    },
    {
      label: "cost",
      data: [1880, 1250, 2480, 3800, 1950, 4000, 3250],
      borderColor: "#60A5FA",
      backgroundColor: "#60A5FA",
    },
  ],
};

export const budgetByPlatform = [
  {
    name: "facebook",
    remaining: "$12,345",
    percentage: 60,
    icon: BsFacebook,
    color: "bg-primary/20",
  },
  {
    name: "twitter",
    remaining: "$15,432",
    percentage: 86,
    icon: BsTwitterX,
    color: "bg-primary/20",
  },
  {
    name: "google",
    remaining: "$5,678",
    percentage: 67,
    icon: BsGoogle,
    color: "bg-primary/20",
  },
  {
    name: "tiktok",
    remaining: "$3,456",
    percentage: 21,
    icon: BsTiktok,
    color: "bg-red-200/50",
    track: "bg-red-500",
  },
  {
    name: "bing",
    remaining: "$2,098",
    percentage: 35,
    icon: BsBing,
    color: "bg-yellow-200/50",
    track: "bg-yellow-500",
  },
];
