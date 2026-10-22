"use client";

import { useId } from "react";
import CustomerAccountControl from "./CustomerAccountControl";

type IconProps = {
  className?: string;
};

function LocationIcon({
  className = "h-5 w-5",
}: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s7-5.686 7-12A7 7 0 1 0 5 9c0 6.314 7 12 7 12Z"
      />
      <circle cx="12" cy="9" r="2.4" />
    </svg>
  );
}

function SearchIcon({
  className = "h-5 w-5",
}: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="11" cy="11" r="7" />
      <path
        strokeLinecap="round"
        d="m20 20-4-4"
      />
    </svg>
  );
}

function CartIcon({
  className = "h-5 w-5",
}: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 4h2l1.6 10.1a2 2 0 0 0 2 1.7h7.8a2 2 0 0 0 2-1.6L20 7H6"
      />
      <circle cx="9" cy="20" r="1" />
      <circle cx="17" cy="20" r="1" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0 transition-transform duration-200"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m6 9 6 6 6-6"
      />
    </svg>
  );
}

export function ServicesMarketplaceSearchControls() {
  const searchId = useId();

  return (
    <div className="flex w-full min-w-0 items-center gap-2 sm:gap-3">
        <button
          type="button"
          aria-disabled="true"
          className="flex h-11 min-w-0 flex-[0.9] items-center gap-2 rounded-xl border bg-white px-3 text-left text-[13px] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef1b23] sm:flex-[0.75] sm:px-4 sm:text-[14px] lg:h-12 lg:max-w-[360px] border-[#dedede] text-[#666] hover:border-[#ef1b23]"
        >
          <LocationIcon className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />

          <span className="min-w-0 flex-1 truncate">
            Select location
          </span>

          <ChevronIcon />
        </button>

        <div
          className="relative min-w-0 flex-[1.1] lg:flex-1"
          role="search"
        >
          <label
            htmlFor={searchId}
            className="sr-only"
          >
            Search City Coolies services
          </label>

          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-[#666] sm:left-4 sm:h-5 sm:w-5" />

          <input
            id={searchId}
            type="text"
            value=""
            readOnly
            aria-disabled="true"
            placeholder="Search services"
            autoComplete="off"
            className="h-11 w-full rounded-xl border border-[#dedede] bg-white pl-9 pr-3 text-[16px] text-[#202124] outline-none transition-colors placeholder:text-[#777] focus:border-[#ef1b23] focus:ring-2 focus:ring-red-100 sm:pl-12 sm:pr-4 lg:h-12"
          />
        </div>
    </div>
  );
}

export default function ServicesMarketplaceNavbar() {

  return (
    <section
      aria-label="Services marketplace tools"
      className="relative border-b border-[#e8e8e8] bg-white shadow-[0_14px_35px_-30px_rgba(40,40,40,0.4)]"
    >
      <div className="mx-auto flex h-[72px] max-w-[1480px] items-center justify-end gap-2 px-3 sm:gap-3 sm:px-6 lg:h-[76px] lg:px-10">
        <button
          type="button"
          aria-label="Service cart"
          aria-disabled="true"
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#dedede] bg-white text-[#202124] transition-colors duration-200 hover:border-[#ef1b23] hover:bg-red-50 hover:text-[#ef1b23] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef1b23] sm:h-11 sm:w-11"
        >
          <CartIcon className="h-4 w-4 sm:h-5 sm:w-5" />

          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ef1b23] px-1 text-[10px] font-bold text-white">
            0
          </span>
        </button>

        <CustomerAccountControl variant="pill" />
      </div>
    </section>
  );
}
