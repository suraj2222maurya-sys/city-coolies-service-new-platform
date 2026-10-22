"use client";

import { useContactReveal } from "./useContactReveal";

function GoogleMark() {
  return (
    <span
      className="cc-ready-google-mark"
      aria-label="Google"
    >
      G
    </span>
  );
}

function Stars() {
  return (
    <span className="cc-ready-stars cc-ready-stars-preview">
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className="cc-ready-star">
          ★
        </span>
      ))}
    </span>
  );
}

function Arrow({
  side,
}: {
  side: "left" | "right";
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={
          side === "left"
            ? "m15 6-6 6 6 6"
            : "m9 6 6 6-6 6"
        }
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ReadyReviewSlot() {
  return (
    <article
      className="cc-ready-review-card cc-ready-review-placeholder"
      aria-hidden="true"
    >
      <div className="cc-ready-review-user">
        <GoogleMark />

        <div>
          <span className="cc-ready-skeleton cc-ready-skeleton-name" />
          <span className="cc-ready-skeleton cc-ready-skeleton-time" />
        </div>
      </div>

      <Stars />

      <div className="cc-ready-review-lines">
        <span />
        <span />
        <span />
      </div>
    </article>
  );
}

export default function ContactReviewsSection() {
  const sectionRef = useContactReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="cc-contact-section cc-ready-review-section"
      aria-labelledby="cc-ready-review-heading"
    >
      <div className="cc-ready-review-frame">
        <span
          className="cc-frame-sweep"
          aria-hidden="true"
        />

        <div className="cc-ready-review-intro">
          <div className="cc-kicker cc-step cc-delay-1">
            <i />

            <span>
              CUSTOMER EXPERIENCE
            </span>
          </div>

          <h2
            id="cc-ready-review-heading"
            className="cc-ready-review-heading cc-step cc-delay-2"
          >
            <span>
              See What Customers Say
            </span>

            <span>
              About{" "}
              <em>
                City Coolies.
              </em>
            </span>
          </h2>

          <div className="cc-ready-rating-block cc-step cc-delay-3">
            <div className="cc-ready-rating-line cc-ready-rating-preview">
              <strong>
                —
              </strong>

              <Stars />
            </div>

            <p className="cc-ready-count-preview">
              Google Reviews
            </p>
          </div>

          <span className="cc-ready-google-button cc-step cc-delay-4">
            <GoogleMark />

            <span>
              View on Google
            </span>

            <i>
              →
            </i>
          </span>
        </div>

        <div className="cc-ready-carousel cc-step cc-delay-4">
          <button
            type="button"
            aria-disabled="true"
            className="cc-ready-nav cc-ready-nav-left"
            aria-label="Previous Google review"
          >
            <Arrow side="left" />
          </button>

          <div className="cc-ready-review-cards cc-ready-review-count-3">
            <ReadyReviewSlot />
            <ReadyReviewSlot />
            <ReadyReviewSlot />
          </div>

          <button
            type="button"
            aria-disabled="true"
            className="cc-ready-nav cc-ready-nav-right"
            aria-label="Next Google review"
          >
            <Arrow side="right" />
          </button>

          <div className="cc-ready-dots">
            {Array.from({ length: 5 }, (_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Preview review position ${index + 1}`}
                className={
                  index === 0
                    ? "cc-ready-dot cc-ready-dot-active"
                    : "cc-ready-dot"
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}