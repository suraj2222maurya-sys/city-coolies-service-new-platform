"use client";

type Variant = "icon" | "pill";

type Props = {
  variant?: Variant;
};

function UserIcon({
  className = "h-5 w-5",
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="8" r="4" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 21a7.5 7.5 0 0 1 15 0"
      />
    </svg>
  );
}

export default function CustomerAccountControl({
  variant = "icon",
}: Props) {
  return (
    <div className="relative shrink-0">
      {variant === "pill" ? (
        <button
          type="button"
          aria-label="Customer login"
          aria-disabled="true"
          className="flex min-h-12 items-center justify-center rounded-full border border-[#ef1b23] bg-[#ef1b23] px-8 text-[14px] font-extrabold tracking-[0.01em] text-white shadow-[0_10px_26px_-12px_rgba(239,27,35,0.8)] animate-[loginBlink_0.85s_ease-in-out_infinite] transition-all duration-200 hover:bg-[#d8171f] hover:shadow-[0_14px_32px_-12px_rgba(239,27,35,0.95)] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef1b23] disabled:cursor-wait disabled:opacity-70"
        >
          Login
        </button>
      ) : (
        <button
          type="button"
          aria-label="Customer login"
          aria-disabled="true"
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-white transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef1b23] disabled:cursor-wait disabled:opacity-70 sm:h-11 sm:w-11 border-[#dedede] text-[#202124] hover:border-[#ef1b23] hover:bg-red-50 hover:text-[#ef1b23]"
        >
          <UserIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      )}
    </div>
  );
}
