"use client";

import { useState } from "react";

type BookingCategory = "all" | "service" | "product";
type BookingStatus = "Confirmed" | "In Progress" | "Delivered";

type Booking = {
  id: string;
  title: string;
  category: "service" | "product";
  description: string;
  image: string;
  bookedOn: string;
  scheduledOn: string;
  amount: number;
  status: BookingStatus;
  address: string;
};

const previewBookings: Booking[] = [];

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Converts a booking date into a local calendar date.
 * Supports YYYY-MM-DD and DD/MM/YYYY or DD-MM-YYYY.
 */
function parseBookingDate(value: string): Date | null {
  const text = value.trim();
  const isoMatch = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  const localMatch = text.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);

  if (!isoMatch && !localMatch) {
    return null;
  }

  const year = Number(isoMatch ? isoMatch[1] : localMatch![3]);
  const month = Number(isoMatch ? isoMatch[2] : localMatch![2]);
  const day = Number(isoMatch ? isoMatch[3] : localMatch![1]);

  const date = new Date(0);
  date.setFullYear(year, month - 1, day);
  date.setHours(0, 0, 0, 0);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

export default function MyBookings() {
  const [category, setCategory] = useState<BookingCategory>("all");
  const [status, setStatus] = useState("all");

  // Controls whether the booking filter panel is visible.
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  // Stores the selected booking time filter.
  const [bookingTime, setBookingTime] = useState("all");
  const [isCustomDateRangeOpen, setIsCustomDateRangeOpen] = useState(false);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Stores the date range after the customer applies the filter.
  const [appliedDateRange, setAppliedDateRange] = useState<{
    from: string;
    to: string;
  } | null>(null);

  // Applies the selected date range after validating both dates.
  const applyDateRange = () => {
    if (!fromDate || !toDate || fromDate > toDate) {
      return;
    }

    setAppliedDateRange({ from: fromDate, to: toDate });
  };

  // Opens or closes the booking filter panel.
  const toggleBookingFilterMenu = () => {
    setIsFilterMenuOpen((current) => !current);
  };
  const [expandedBookingId, setExpandedBookingId] = useState<string | null>(null);

  // Preview records only. Real bookings will be connected later.
  const bookings = previewBookings;

  const serviceCount = bookings.filter(
    (booking) => booking.category === "service"
  ).length;

  const productCount = bookings.filter(
    (booking) => booking.category === "product"
  ).length;

  const visibleBookings = bookings.filter((booking) => {
    const categoryMatches =
      category === "all" || booking.category === category;

    const statusMatches =
      status === "all" || booking.status === status;

    // Filters bookings using the date they were originally booked.
    let dateMatches = true;

    if (bookingTime !== "all") {
      const bookingDate = parseBookingDate(booking.bookedOn);

      if (!bookingDate) {
        dateMatches = false;
      } else if (bookingTime === "custom") {
        if (!appliedDateRange) {
          dateMatches = false;
        } else {
          const startDate = parseBookingDate(appliedDateRange.from);
          const endDate = parseBookingDate(appliedDateRange.to);

          dateMatches =
            startDate !== null &&
            endDate !== null &&
            bookingDate >= startDate &&
            bookingDate <= endDate;
        }
      } else {
        const now = new Date();
        const today = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        );

        const daysBack =
          bookingTime === "today" ? 0 :
          bookingTime === "week" ? 6 : 29;

        const startDate = new Date(today);
        startDate.setDate(today.getDate() - daysBack);

        dateMatches =
          bookingDate >= startDate &&
          bookingDate <= today;
      }
    }

    return categoryMatches && statusMatches && dateMatches;
  });

  return (
    <section className="cc-bookings" aria-label="Customer bookings">
      <div className="cc-bookings-toolbar">
        <div className="cc-bookings-tabs" role="group" aria-label="Booking category">
          <button
            type="button"
            className={category === "all" ? "active" : ""}
            aria-pressed={category === "all"}
            onClick={() => setCategory("all")}
          >
            <span aria-hidden="true">▤</span>
            All Bookings ({bookings.length})
          </button>

          <button
            type="button"
            className={category === "service" ? "active" : ""}
            aria-pressed={category === "service"}
            onClick={() => setCategory("service")}
          >
            <span aria-hidden="true">⚒</span>
            Services ({serviceCount})
          </button>

          <button
            type="button"
            className={category === "product" ? "active" : ""}
            aria-pressed={category === "product"}
            onClick={() => setCategory("product")}
          >
            <span aria-hidden="true">⬡</span>
            Products ({productCount})
          </button>
        </div>

        <div className="cc-bookings-filter">
          <button
            type="button"
            className="cc-bookings-filter-button"
            aria-expanded={isFilterMenuOpen}
            aria-controls="cc-bookings-filter-panel"
            onClick={toggleBookingFilterMenu}
          >
            Filter
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={isFilterMenuOpen ? "rotate-180" : ""}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {isFilterMenuOpen && (
            <div
              id="cc-bookings-filter-panel"
              className="cc-bookings-filter-panel"
            >
              <label htmlFor="cc-booking-status-filter">
                Booking Status
              </label>

              <select
                id="cc-booking-status-filter"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <option value="all">All Status</option>
                <option value="Confirmed">Confirmed</option>
                <option value="In Progress">In Progress</option>
                <option value="Delivered">Delivered</option>
              </select>

              <label htmlFor="cc-booking-time-filter">
                Booking Time
              </label>

              <select
                id="cc-booking-time-filter"
                value={bookingTime}
                onPointerDown={() => {
                  if (bookingTime === "custom") {
                    setIsCustomDateRangeOpen((isOpen) => !isOpen);
                  }
                }}
                onChange={(event) => {
                  const selectedTime = event.target.value;

                  setBookingTime(selectedTime);

                  if (selectedTime !== bookingTime) {
                    setIsCustomDateRangeOpen(selectedTime === "custom");
                  }

                  setAppliedDateRange(null);
                }}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="custom">Custom Date Range</option>
              </select>

              {bookingTime === "custom" && isCustomDateRangeOpen && (
                <div className="cc-bookings-custom-range">
                  <label htmlFor="cc-booking-from-date">
                    From Date
                  </label>

                  <input
                    id="cc-booking-from-date"
                    type="date"
                    value={fromDate}
                    onChange={(event) => {
                      setFromDate(event.target.value);
                      setAppliedDateRange(null);
                    }}
                  />

                  <label htmlFor="cc-booking-to-date">
                    To Date
                  </label>

                  <input
                    id="cc-booking-to-date"
                    type="date"
                    min={fromDate || undefined}
                    value={toDate}
                    onChange={(event) => {
                      setToDate(event.target.value);
                      setAppliedDateRange(null);
                    }}
                  />

                  {fromDate && toDate && fromDate > toDate && (
                    <p className="cc-bookings-date-error" role="alert">
                      To Date cannot be earlier than From Date.
                    </p>
                  )}

                  <button
                    type="button"
                    className="cc-bookings-apply-button"
                    disabled={
                      !fromDate ||
                      !toDate ||
                      fromDate > toDate
                    }
                    onClick={applyDateRange}
                  >
                    Apply Filter
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <p className="cc-bookings-preview-note">
        Design preview — sample bookings, not actual customer orders.
      </p>

      <div className="cc-bookings-list">
        {visibleBookings.length === 0 ? (
          <div className="cc-bookings-empty">
            <h2>No bookings found</h2>
            <p>Try selecting a different category or status.</p>
          </div>
        ) : (
          visibleBookings.map((booking) => {
            const expanded = expandedBookingId === booking.id;

            return (
              <article className="cc-booking-card" key={booking.id}>
                <div className="cc-booking-row">
                  <div className="cc-booking-service">
                    <div className="cc-booking-thumbnail" aria-hidden="true">
                      {booking.category === "service" ? "⚒" : "▣"}
                    </div>

                    <div className="cc-booking-service-text">
                      <h2>{booking.title}</h2>
                      <span className={`cc-booking-category ${booking.category}`}>
                        {booking.category === "service" ? "⚒ Service" : "⬡ Product"}
                      </span>
                      <p>{booking.description}</p>
                    </div>
                  </div>

                  <div className="cc-booking-field">
                    <span>Booking ID</span>
                    <strong>{booking.id}</strong>
                  </div>

                  <div className="cc-booking-field">
                    <span>Booked On</span>
                    <strong>{booking.bookedOn}</strong>
                  </div>

                  <div className="cc-booking-field">
                    <span>
                      {booking.category === "service"
                        ? "Service Date"
                        : "Delivery Date"}
                    </span>
                    <strong>{booking.scheduledOn}</strong>
                  </div>

                  <div className="cc-booking-field">
                    <span>Amount</span>
                    <strong>{formatPrice(booking.amount)}</strong>
                  </div>

                  <div className="cc-booking-field">
                    <span>Status</span>
                    <strong
                      className={`cc-booking-status ${
                        booking.status === "Confirmed"
                          ? "confirmed"
                          : booking.status === "Delivered"
                            ? "delivered"
                            : "progress"
                      }`}
                    >
                      {booking.status}
                    </strong>
                  </div>

                  <button
                    type="button"
                    className="cc-booking-details-button"
                    aria-expanded={expanded}
                    onClick={() =>
                      setExpandedBookingId(expanded ? null : booking.id)
                    }
                  >
                    {expanded ? "Hide Details" : "View Details"}
                    <span aria-hidden="true">{expanded ? "⌃" : "›"}</span>
                  </button>
                </div>

                {expanded && (
                  <div className="cc-booking-expanded">
                    <div>
                      <span>Booking Reference</span>
                      <strong>{booking.id}</strong>
                    </div>
                    <div>
                      <span>Booking Type</span>
                      <strong>
                        {booking.category === "service"
                          ? "Professional Service"
                          : "Product Order"}
                      </strong>
                    </div>
                    <div>
                      <span>Booking Status</span>
                      <strong>{booking.status}</strong>
                    </div>
                    <div>
                      <span>Total Amount</span>
                      <strong>{formatPrice(booking.amount)}</strong>
                    </div>
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>

      <style>{`
        .cc-bookings {
          width: 100%;
          min-width: 0;
          padding: 10px 10px 18px;
          border-radius: 20px;
          background: #fff;
          box-shadow: 0 7px 24px rgba(92, 23, 37, .07);
        }

        .cc-bookings-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding: 10px;
          border-radius: 17px;
          background: #fff0f2;
        }

        .cc-bookings-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
        }

        .cc-bookings-tabs button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 39px;
          padding: 9px 17px;
          border: 0;
          border-radius: 100px;
          background: #fff;
          color: #101827;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          transition: background .2s ease;
        }

        .cc-bookings-tabs button span {
          color: #ef1228;
          font-size: 16px;
        }

        .cc-bookings-tabs button.active {
          background: linear-gradient(115deg, #ff2339, #df0019);
          color: #fff;
          box-shadow: 0 4px 12px rgba(226, 0, 28, .16);
        }

        .cc-bookings-tabs button.active span {
          color: #fff;
        }

        .cc-bookings-filter {
          position: relative;
          margin-left: auto;
        }

        .cc-bookings-filter-button {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          min-height: 40px;
          min-width: 125px;
          padding: 0 15px;
          border: 1.5px solid #ff1833;
          border-radius: 100px;
          background: #fff;
          color: #101827;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.01em;
          cursor: pointer;
          transition: background 0.2s ease, box-shadow 0.2s ease;
        }
        .cc-bookings-filter-button:hover {
          background: #fff7f8;
          box-shadow: 0 4px 12px rgba(239, 27, 35, 0.10);
        }


        .cc-bookings-filter-panel {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          z-index: 30;
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 245px;
          padding: 16px;
          border: 1px solid #f0e3e6;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 12px 30px rgba(92, 23, 37, 0.14);
        }

        .cc-bookings-filter-panel label {
          color: #101827;
          font-size: 12px;
          font-weight: 700;
        }

        .cc-bookings-filter-panel select {
          width: 100%;
          min-width: 0;
        }
        .cc-bookings-toolbar select {
          min-height: 40px;
          min-width: 150px;
          padding: 0 14px;
          border: 1px solid #e7e7ec;
          border-radius: 100px;
          background: #fff;
          color: #202633;
          font-size: 13px;
          outline-color: #f01831;
        }

        .cc-bookings-custom-range {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-top: 6px;
        }

        .cc-bookings-custom-range input {
          width: 100%;
          min-width: 0;
          min-height: 40px;
          padding: 0 12px;
          border: 1px solid #e7e7ec;
          border-radius: 12px;
          background: #fff;
          color: #202633;
          font-size: 13px;
          outline-color: #f01831;
        }

        .cc-bookings-apply-button {
          min-height: 40px;
          margin-top: 4px;
          border: 0;
          border-radius: 12px;
          background: #ef1b23;
          color: #fff;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
        }

        .cc-bookings-apply-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .cc-bookings-date-error {
          margin: 0;
          color: #d8171f;
          font-size: 12px;
        }

        .cc-bookings-preview-note {
          margin: 10px 8px;
          color: #7b6470;
          font-size: 12px;
        }

        .cc-bookings-list {
          display: grid;
          gap: 9px;
        }

        .cc-booking-card {
          overflow: hidden;
          border: 1px solid #f0e3e6;
          border-radius: 18px;
          background: #fff;
        }

        .cc-booking-row {
          display: grid;
          grid-template-columns:
            minmax(205px, 2.5fr)
            minmax(82px, .8fr)
            minmax(100px, 1fr)
            minmax(100px, 1fr)
            minmax(70px, .7fr)
            minmax(95px, .9fr)
            auto;
          align-items: center;
          gap: 10px;
          padding: 15px 13px;
        }

        .cc-booking-service {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .cc-booking-thumbnail {
          display: grid;
          flex: 0 0 70px;
          width: 70px;
          height: 70px;
          place-items: center;
          border-radius: 13px;
          background: linear-gradient(145deg, #fff1f3, #ffdce2);
          color: #e50020;
          font-size: 29px;
        }

        .cc-booking-service-text {
          min-width: 0;
        }

        .cc-booking-service-text h2 {
          margin: 0 0 5px;
          color: #11182c;
          font-size: 13px;
          font-weight: 800;
          line-height: 1.35;
        }

        .cc-booking-category {
          display: inline-block;
          padding: 3px 8px;
          border-radius: 100px;
          background: #ffe6eb;
          color: #e20b25;
          font-size: 11px;
          font-weight: 700;
        }

        .cc-booking-category.product {
          background: #eeeaff;
          color: #5140b7;
        }

        .cc-booking-service-text p {
          margin: 6px 0 0;
          color: #354052;
          font-size: 11px;
          line-height: 1.45;
        }

        .cc-booking-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
          min-width: 0;
        }

        .cc-booking-field > span {
          color: #4b5563;
          font-size: 11px;
        }

        .cc-booking-field > strong {
          overflow-wrap: anywhere;
          color: #101827;
          font-size: 12px;
          font-weight: 750;
          line-height: 1.45;
        }

        .cc-booking-status {
          align-self: flex-start;
          padding: 5px 9px;
          border-radius: 100px;
          white-space: nowrap;
          font-size: 11px !important;
        }

        .cc-booking-status.confirmed,
        .cc-booking-status.delivered {
          background: #d9f9df;
          color: #078325;
        }

        .cc-booking-status.progress {
          background: #d8efff;
          color: #075ac0;
        }

        .cc-booking-details-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 36px;
          padding: 7px 12px;
          border: 1px solid #ff1833;
          border-radius: 100px;
          background: #fff;
          color: #e40020;
          font-size: 11px;
          font-weight: 800;
          white-space: nowrap;
          cursor: pointer;
        }

        .cc-booking-details-button:hover {
          background: #fff1f3;
        }

        .cc-booking-details-button span {
          font-size: 20px;
          line-height: 1;
        }

        .cc-booking-expanded {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
          padding: 17px;
          border-top: 1px solid #f0e3e6;
          background: #fff9fa;
        }

        .cc-booking-expanded div {
          display: flex;
          flex-direction: column;
          gap: 5px;
          min-width: 0;
        }

        .cc-booking-expanded span {
          color: #6b7280;
          font-size: 12px;
        }

        .cc-booking-expanded strong {
          overflow-wrap: anywhere;
          color: #172033;
          font-size: 13px;
        }

        .cc-bookings-empty {
          padding: 55px 18px;
          text-align: center;
        }

        .cc-bookings-empty h2 {
          margin: 0 0 8px;
          color: #111827;
        }

        .cc-bookings-empty p {
          color: #64748b;
        }

        @media (max-width: 1350px) {
          .cc-booking-row {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 17px;
          }

          .cc-booking-service {
            grid-column: 1 / -1;
          }

          .cc-booking-details-button {
            justify-self: start;
          }
        }

        @media (max-width: 700px) {
          .cc-bookings-filter {
            width: 100%;
            margin-left: 0;
          }

          .cc-bookings-filter-button {
            width: 100%;
          }

          .cc-bookings-filter-panel {
            width: 100%;
          }
        }
        @media (max-width: 700px) {
          .cc-bookings {
            padding: 7px;
            border-radius: 15px;
          }

          .cc-bookings-toolbar {
            align-items: stretch;
            padding: 8px;
          }

          .cc-bookings-tabs {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            width: 100%;
            gap: 5px;
          }

          .cc-bookings-tabs button {
            min-height: 39px;
            padding: 7px 5px;
            gap: 4px;
            font-size: 10px;
          }

          .cc-bookings-tabs button span {
            font-size: 13px;
          }

          .cc-bookings-toolbar select {
            width: 100%;
          }

          .cc-booking-row {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
            padding: 13px;
          }

          .cc-booking-service {
            grid-column: 1 / -1;
            align-items: flex-start;
            padding-bottom: 12px;
            border-bottom: 1px solid #f2e6e8;
          }

          .cc-booking-thumbnail {
            flex-basis: 65px;
            width: 65px;
            height: 65px;
          }

          .cc-booking-field > span {
            font-size: 11px;
          }

          .cc-booking-field > strong {
            font-size: 12px;
          }

          .cc-booking-details-button {
            grid-column: 1 / -1;
            width: 100%;
          }

          .cc-booking-expanded {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 360px) {
          .cc-bookings-tabs button {
            font-size: 9px;
          }
        }
      `}</style>
    </section>
  );
}