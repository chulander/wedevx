"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { route: "/dashboard/leads", name: "Leads" },
  { route: "/dashboard/settings", name: "Settings" },
];
const isActive = (path: string, route: string) => {
  console.log("what is path", path);
  console.log("what is route", route);
  // all routes other than auth routes include "/dashboard"
  // so handle that first
  if (route === "/dashboard") {
    return path === "/dashboard";
  } else {
    const result = path.includes(route);
    console.log("result", result);
    return path.includes(route);
  }
};

export default function Sidebar() {
  const path = usePathname();
  const activeClass = "font-bold hover:bg-primary";
  return (
    <aside className="flex w-64 flex-col px-4 py-8 text-white">
      {/* Branding */}
      <div className="mb-8 text-2xl font-bold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 59 18"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
          role="img"
        >
          <path
            d="M16.4837 0C16.2308 0 16.0258 0.204991 16.0258 0.45786V17.5472C16.0258 17.8001 16.2308 18.0051 16.4837 18.0051H19.2012C19.454 18.0051 19.659 17.8001 19.659 17.5472V0.45786C19.659 0.204991 19.454 0 19.2012 0H16.4837Z"
            fill="currentColor"
          ></path>
          <path
            d="M22.2069 17.5513C22.2069 17.8042 22.4119 18.0092 22.6648 18.0092H25.4393C25.6922 18.0092 25.8972 17.8042 25.8972 17.5513V10.3026C25.8972 9.90375 25.9941 9.54622 26.1837 9.22795C26.3734 8.89316 26.6352 8.62242 26.9692 8.41576C27.3197 8.20909 27.7073 8.10576 28.1361 8.10576C28.5649 8.10576 28.9442 8.20909 29.2782 8.41576C29.6287 8.62242 29.8987 8.89316 30.0884 9.22795C30.2945 9.54622 30.3976 9.90582 30.3976 10.3026V17.5513C30.3976 17.8042 30.6026 18.0092 30.8555 18.0092H33.63C33.8829 18.0092 34.0879 17.8042 34.0879 17.5513V10.3026C34.0879 9.90375 34.1848 9.54622 34.3744 9.22795C34.5641 8.89316 34.8259 8.62242 35.1599 8.41576C35.5104 8.20909 35.8979 8.10576 36.3268 8.10576C36.7556 8.10576 37.1349 8.20909 37.4689 8.41576C37.8028 8.62242 38.0647 8.89316 38.2543 9.22795C38.4605 9.54622 38.5636 9.90582 38.5636 10.3026V17.5513C38.5636 17.8042 38.7686 18.0092 39.0214 18.0092H41.8186C42.0715 18.0092 42.2765 17.8042 42.2765 17.5513V10.1827C42.2765 9.18042 42.0394 8.28143 41.5632 7.48576C41.087 6.67357 40.4108 6.03704 39.5387 5.57617C38.6646 5.11531 37.6255 4.88384 36.4195 4.88384C35.8155 4.88384 35.2469 4.92423 34.7233 5.06683C34.2161 5.19496 33.7539 5.41084 33.3251 5.64851C32.9889 5.83049 32.6842 6.14592 32.4111 6.42871C32.3493 6.49276 32.289 6.55514 32.2304 6.61392H32.183C32.1465 6.57534 32.1091 6.53521 32.0707 6.49407C31.7926 6.19582 31.4651 5.84465 31.0883 5.64851C30.6759 5.40878 30.2141 5.22691 29.707 5.09878C29.1998 4.95618 28.6453 4.88384 28.0412 4.88384C26.8352 4.88384 25.7941 5.11531 24.9221 5.57617C24.0479 6.03704 23.3738 6.67357 22.8976 7.48576C22.4378 8.28143 22.2069 9.18042 22.2069 10.1827V17.5513Z"
            fill="currentColor"
          ></path>
          <path
            d="M8.70567 17.5257C8.70512 17.7781 8.50093 17.9827 8.24844 17.9827C7.61685 17.9828 6.54026 17.9822 6.4226 17.9763C2.73585 17.7845 -0.133219 15.0697 0.00477629 11.3421C0.124235 8.10951 2.54843 5.36379 5.74292 4.8852C9.9384 4.25808 13.5592 7.51333 13.5592 11.5979C13.5592 12.0373 13.551 12.9944 13.5407 14.1022C13.5384 14.3675 13.5359 14.6395 13.5333 14.9123C13.5247 15.8544 13.5159 16.8061 13.513 17.5207C13.5119 17.7736 13.3069 17.9784 13.054 17.9784H10.3448C10.0919 17.9784 9.88692 17.7736 9.88784 17.5208C9.89125 16.586 9.9035 15.2603 9.91574 14.0671C9.92604 13.0151 9.93428 12.0208 9.93428 11.5979C9.93428 9.54322 7.96733 7.94035 5.81913 8.57985C4.84286 8.87072 4.06226 9.6443 3.76979 10.6221C3.14572 12.7056 4.61012 14.6365 6.58943 14.752L7.41329 14.7623C8.1321 14.7706 8.7088 15.3565 8.7088 16.0764L8.70567 17.5257Z"
            fill="currentColor"
          ></path>
          <path
            d="M52.8142 17.9827C53.0667 17.9827 53.2709 17.7781 53.2714 17.5257L53.2746 16.0764C53.2746 15.3565 52.6978 14.7706 51.979 14.7623L51.1552 14.752C49.1759 14.6365 47.7115 12.7056 48.3355 10.6221C48.628 9.6443 49.4086 8.87072 50.3849 8.57985C52.5331 7.94035 54.5 9.54322 54.5 11.5979C54.5 12.0208 54.4918 13.0151 54.4815 14.0671C54.4692 15.2603 54.457 16.586 54.4536 17.5208C54.4527 17.7736 54.6577 17.9784 54.9105 17.9784H57.6198C57.8726 17.9784 58.0776 17.7736 58.0787 17.5207C58.0817 16.8064 58.0904 15.8552 58.0991 14.9135C58.1016 14.6403 58.1041 14.3678 58.1065 14.1022C58.1168 12.9944 58.125 12.0373 58.125 11.5979C58.125 7.51333 54.5042 4.25808 50.3087 4.8852C47.1142 5.36379 44.69 8.10951 44.5705 11.3421C44.4325 15.0697 47.3016 17.7845 50.9883 17.9763C51.106 17.9822 52.1826 17.9828 52.8142 17.9827Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>

      {/* Navigation */}

      <nav className="flex flex-col gap-4 text-xl text-black">
        {links.map((link) => (
          <Link
            key={link.route}
            href={link.route}
            className={`hover:underline ${
              isActive(path, link.route) ? activeClass : ""
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Footer (Admin Label) */}
      <div className="mt-auto flex items-center gap-2">
        <span className="text-sm text-black">Admin</span>
      </div>
    </aside>
  );
}
