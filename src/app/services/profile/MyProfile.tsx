"use client";

import Image from "next/image";
import MyBookings from "./MyBookings";
import { useRef, useState, useSyncExternalStore, type ChangeEvent } from "react";

// Types and configuration: profile navigation.
export type ProfileSection =
  | "profile"
  | "bookings"
  | "addresses"
  | "payments"
  | "settings"
  | "support"
  | "logout";

type ProfileIconName =
  | "user"
  | "calendar"
  | "pin"
  | "card"
  | "settings"
  | "help"
  | "logout";

type NavigationItem = {
  id: ProfileSection;
  label: string;
  icon: ProfileIconName;
};

const navigationItems: NavigationItem[] = [
  { id: "profile", label: "My Profile", icon: "user" },
  { id: "bookings", label: "My Bookings", icon: "calendar" },
  { id: "addresses", label: "Saved Addresses", icon: "pin" },
  { id: "payments", label: "Payment Methods", icon: "card" },
  { id: "settings", label: "Account Settings", icon: "settings" },
  { id: "support", label: "Help & Support", icon: "help" },
  { id: "logout", label: "Logout", icon: "logout" },
];

// UI component: reusable profile navigation icons.
function ProfileIcon({ name }: { name: ProfileIconName }) {
  const paths: Record<ProfileIconName, React.ReactNode> = {
    user: (
      <>
        <circle cx="12" cy="7" r="4" />
        <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
      </>
    ),

    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4M17 3v4M3 10h18M8 14h3M14 14h3M8 18h3" />
      </>
    ),

    pin: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),

    card: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20M6 15h5" />
      </>
    ),

    settings: (
      <>
        <path
          d="M10 2h4l.6 2.3 1.7.8 2.1-1.2 2.8 2.8-1.2-2.1.8 1.7L23 11v4l-2.3.6-.8 1.7 1.2 2.1-2.8 2.8-2.1-1.2-1.7.8L14 24h-4l-.6-2.3-1.7-.8-2.1 1.2-2.8-2.8 1.2-2.1-.8-1.7L1 15v-4l2.3-.6.8-1.7-1.2-2.1 2.8-2.8 2.1 1.2 1.7-.8L10 2Z"
          transform="translate(0 -1) scale(1 .96)"
        />
        <circle cx="12" cy="12" r="3" />
      </>
    ),

    help: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M9.4 9a2.8 2.8 0 0 1 5.2 1.5c0 2-2.6 2.3-2.6 4.4M12 18h.01" />
      </>
    ),

    logout: (
      <>
        <path d="M11 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6M14 7l5 5-5 5M9 12h10" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="profile-nav-icon"
    >
      {paths[name]}
    </svg>
  );
}

// Frontend storage: profile photo and browser synchronization.
const CUSTOMER_PHOTO_STORAGE_KEY = "city-coolies:customer-profile-photo";
const CUSTOMER_PHOTO_CHANGED_EVENT = "city-coolies:customer-photo-changed";

function getSavedCustomerPhoto(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(CUSTOMER_PHOTO_STORAGE_KEY);
  } catch {
    return null;
  }
}

function subscribeToCustomerPhoto(onChange: () => void): () => void {
  window.addEventListener(CUSTOMER_PHOTO_CHANGED_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CUSTOMER_PHOTO_CHANGED_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function CustomerAvatar() {
  const photo = useSyncExternalStore(
    subscribeToCustomerPhoto,
    getSavedCustomerPhoto,
    () => null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoError, setPhotoError] = useState("");

  function handlePhotoSelection(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setPhotoError("Please select an image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setPhotoError("Please select an image smaller than 2 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") return;
      try {
        window.localStorage.setItem(CUSTOMER_PHOTO_STORAGE_KEY, reader.result);
        window.dispatchEvent(new Event(CUSTOMER_PHOTO_CHANGED_EVENT));
        setPhotoError("");
      } catch {
        setPhotoError("Could not save the photo in this browser.");
      }
    };
    reader.onerror = () => setPhotoError("Could not read the selected image.");
    reader.readAsDataURL(file);
  }

  function removePhoto() {
    try {
      window.localStorage.removeItem(CUSTOMER_PHOTO_STORAGE_KEY);
      window.dispatchEvent(new Event(CUSTOMER_PHOTO_CHANGED_EVENT));
      setPhotoError("");
    } catch {
      setPhotoError("Could not remove the photo from this browser.");
    }
  }

  return (
    <div className="customer-avatar-control">
      <button
        type="button"
        className="customer-avatar-button"
        aria-label="Choose customer profile photo"
        title="Choose profile photo"
        onClick={() => fileInputRef.current?.click()}
      >
        {photo ? (
          // Browser-stored data URL is selected by the customer; no remote image host is used.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt="Customer profile" className="profile-avatar" />
        ) : (
          <svg
            className="profile-avatar"
            viewBox="0 0 96 96"
            role="img"
            aria-label="Default customer avatar"
          >
            <circle cx="48" cy="48" r="48" fill="#ffe2e8" />
            <circle cx="48" cy="35" r="17" fill="#e7192a" />
            <path
              d="M15 87c2-20 16-31 33-31s31 11 33 31"
              fill="#e7192a"
            />
            <path
              d="M31 86c3-15 9-22 17-22s14 7 17 22"
              fill="#c90018"
              opacity=".35"
            />
          </svg>
        )}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="customer-avatar-file-input"
        aria-label="Upload customer profile photo"
        onChange={handlePhotoSelection}
      />

      {photo && (
        <button
          type="button"
          className="customer-avatar-remove"
          onClick={removePhoto}
          aria-label="Remove customer profile photo"
          title="Remove photo"
        >
          ×
        </button>
      )}

      {photoError && (
        <span className="customer-avatar-error" role="alert">
          {photoError}
        </span>
      )}
    </div>
  );
}

// Frontend storage: customer display name synchronization.
const CUSTOMER_NAME_STORAGE_KEY = "city-coolies:customer-display-name";
const CUSTOMER_NAME_CHANGED_EVENT = "city-coolies:customer-name-changed";

function getCustomerDisplayName(): string {
  if (typeof window === "undefined") return "Customer Name";

  try {
    return window.localStorage.getItem(CUSTOMER_NAME_STORAGE_KEY)?.trim() || "Customer Name";
  } catch {
    return "Customer Name";
  }
}

function subscribeToCustomerName(onChange: () => void): () => void {
  window.addEventListener("storage", onChange);
  window.addEventListener(CUSTOMER_NAME_CHANGED_EVENT, onChange);

  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CUSTOMER_NAME_CHANGED_EVENT, onChange);
  };
}
// Customer profile data types and frontend storage.
type CustomerDetails = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
};

const CUSTOMER_DETAILS_STORAGE_KEY = "city-coolies:customer-profile-details:v1";
const CUSTOMER_DETAILS_CHANGED_EVENT = "city-coolies:customer-profile-details-changed";

const EMPTY_CUSTOMER_DETAILS: CustomerDetails = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  emailAddress: "",
};

function readCustomerDetails(): string {
  if (typeof window === "undefined") return "";

  try {
    return window.localStorage.getItem(CUSTOMER_DETAILS_STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function subscribeToCustomerDetails(onChange: () => void): () => void {
  window.addEventListener("storage", onChange);
  window.addEventListener(CUSTOMER_DETAILS_CHANGED_EVENT, onChange);

  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CUSTOMER_DETAILS_CHANGED_EVENT, onChange);
  };
}

function parseCustomerDetails(value: string): CustomerDetails {
  if (!value) return EMPTY_CUSTOMER_DETAILS;

  try {
    const parsed: unknown = JSON.parse(value);

    if (!parsed || typeof parsed !== "object") {
      return EMPTY_CUSTOMER_DETAILS;
    }

    const record = parsed as Record<string, unknown>;

    return {
      firstName: typeof record.firstName === "string" ? record.firstName : "",
      lastName: typeof record.lastName === "string" ? record.lastName : "",
      phoneNumber: typeof record.phoneNumber === "string" ? record.phoneNumber : "",
      emailAddress: typeof record.emailAddress === "string" ? record.emailAddress : "",
    };
  } catch {
    return EMPTY_CUSTOMER_DETAILS;
  }
}

function ProfileDashboardIcon({
  name,
}: {
  name: "user" | "phone" | "shield" | "bell" | "card" | "pin" | "edit";
}) {
  const paths: Record<typeof name, React.ReactNode> = {
    user: <><circle cx="12" cy="7" r="4" /><path d="M4 21v-2a8 8 0 0 1 16 0v2" /></>,
    phone: <path d="M6 2h4l2 5-3 2a17 17 0 0 0 6 6l2-3 5 2v4a4 4 0 0 1-4 4A16 16 0 0 1 2 6a4 4 0 0 1 4-4Z" />,
    shield: <><path d="M12 2 21 6v6c0 6-4 9-9 11-5-2-9-5-9-11V6Z" /><path d="m8 12 3 3 5-6" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 10h18c0-3-3-3-3-10ZM10 21h4" /></>,
    card: <><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20M6 15h5" /></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    edit: <><path d="M12 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" /><path d="m10 14 2-.4L21 5l-2-2-9 9-.4 2Z" /></>,
  };

  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function CustomerProfileDashboard({
  customerDisplayName,
  onNavigate,
}: {
  customerDisplayName: string;
  onNavigate: (section: ProfileSection) => void;
}) {
  const savedDetails = useSyncExternalStore(
    subscribeToCustomerDetails,
    readCustomerDetails,
    () => ""
  );

  const details = parseCustomerDetails(savedDetails);
  const [editingSection, setEditingSection] = useState<"personal" | "contact" | null>(null);
  const [draft, setDraft] = useState<CustomerDetails>(EMPTY_CUSTOMER_DETAILS);
  const [saveError, setSaveError] = useState("");

  function startEditing(section: "personal" | "contact") {
    const fallbackNames = customerDisplayName === "Customer Name"
      ? []
      : customerDisplayName.trim().split(/\s+/);

    setDraft({
      ...details,
      firstName: details.firstName || fallbackNames[0] || "",
      lastName: details.lastName || fallbackNames.slice(1).join(" "),
    });

    setSaveError("");
    setEditingSection(section);
  }

  function updateField(field: keyof CustomerDetails, value: string) {
    setDraft((previous) => ({ ...previous, [field]: value }));
  }

  function saveDetails(section: "personal" | "contact") {
    const nextDetails: CustomerDetails = {
      ...details,
      ...(section === "personal"
        ? {
            firstName: draft.firstName.trim(),
            lastName: draft.lastName.trim(),
          }
        : {
            phoneNumber: draft.phoneNumber.trim(),
            emailAddress: draft.emailAddress.trim(),
          }),
    };

    if (section === "contact") {
      if (nextDetails.emailAddress && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextDetails.emailAddress)) {
        setSaveError("Please enter a valid email address.");
        return;
      }

      if (nextDetails.phoneNumber && !/^[+()\d\s-]{7,20}$/.test(nextDetails.phoneNumber)) {
        setSaveError("Please enter a valid phone number.");
        return;
      }
    }

    try {
      window.localStorage.setItem(
        CUSTOMER_DETAILS_STORAGE_KEY,
        JSON.stringify(nextDetails)
      );
      window.dispatchEvent(new Event(CUSTOMER_DETAILS_CHANGED_EVENT));

      if (section === "personal") {
        const fullName = [nextDetails.firstName, nextDetails.lastName]
          .filter(Boolean)
          .join(" ");

        if (fullName) {
          window.localStorage.setItem(CUSTOMER_NAME_STORAGE_KEY, fullName);
          window.dispatchEvent(new Event(CUSTOMER_NAME_CHANGED_EVENT));
        }
      }

      setEditingSection(null);
      setSaveError("");
    } catch {
      setSaveError("Unable to save details in this browser.");
    }
  }

  const nameParts = customerDisplayName === "Customer Name"
    ? []
    : customerDisplayName.trim().split(/\s+/);

  const firstName = details.firstName || nameParts[0] || "";
  const lastName = details.lastName || nameParts.slice(1).join(" ");

  const shortcuts: {
    title: string;
    description: string;
    icon: "shield" | "bell" | "card" | "pin";
    destination: ProfileSection;
  }[] = [
    {
      title: "Account Security",
      description: "Update password and keep your account safe",
      icon: "shield",
      destination: "settings",
    },
    {
      title: "Notifications",
      description: "Manage alerts and service updates",
      icon: "bell",
      destination: "settings",
    },
    {
      title: "Payment Methods",
      description: "Add or manage your payment options",
      icon: "card",
      destination: "payments",
    },
    {
      title: "Saved Addresses",
      description: "Manage your frequently used addresses",
      icon: "pin",
      destination: "addresses",
    },
  ];

  return (
    <div className="customer-profile-dashboard">
      <div className="customer-profile-information">
        <section className="customer-information-section">
          <div className="customer-information-heading">
            <span className="customer-heading-icon">
              <ProfileDashboardIcon name="user" />
            </span>
            <h2>Personal Information</h2>
            <button
              type="button"
              className="customer-edit-button"
              onClick={() =>
                editingSection === "personal"
                  ? setEditingSection(null)
                  : startEditing("personal")
              }
            >
              <ProfileDashboardIcon name="edit" />
              {editingSection === "personal" ? "Cancel" : "Edit"}
            </button>
          </div>

          <div className="customer-information-fields">
            <label className="customer-information-field">
              <span>First Name</span>
              <input
                type="text"
                autoComplete="given-name"
                placeholder="Not provided"
                readOnly={editingSection !== "personal"}
                value={editingSection === "personal" ? draft.firstName : firstName}
                onChange={(event) => updateField("firstName", event.target.value)}
              />
            </label>

            <label className="customer-information-field">
              <span>Last Name</span>
              <input
                type="text"
                autoComplete="family-name"
                placeholder="Not provided"
                readOnly={editingSection !== "personal"}
                value={editingSection === "personal" ? draft.lastName : lastName}
                onChange={(event) => updateField("lastName", event.target.value)}
              />
            </label>
          </div>

          {editingSection === "personal" && (
            <button
              type="button"
              className="customer-save-button"
              onClick={() => saveDetails("personal")}
            >
              Save Changes
            </button>
          )}
        </section>

        <section className="customer-information-section">
          <div className="customer-information-heading">
            <span className="customer-heading-icon">
              <ProfileDashboardIcon name="phone" />
            </span>
            <h2>Contact Information</h2>
            <button
              type="button"
              className="customer-edit-button"
              onClick={() =>
                editingSection === "contact"
                  ? setEditingSection(null)
                  : startEditing("contact")
              }
            >
              <ProfileDashboardIcon name="edit" />
              {editingSection === "contact" ? "Cancel" : "Edit"}
            </button>
          </div>

          <div className="customer-information-fields">
            <label className="customer-information-field">
              <span>Phone Number</span>
              <input
                type="tel"
                autoComplete="tel"
                placeholder="Not provided"
                readOnly={editingSection !== "contact"}
                value={editingSection === "contact" ? draft.phoneNumber : details.phoneNumber}
                onChange={(event) => updateField("phoneNumber", event.target.value)}
              />
            </label>

            <label className="customer-information-field">
              <span>Email Address</span>
              <input
                type="email"
                autoComplete="email"
                placeholder="Not provided"
                readOnly={editingSection !== "contact"}
                value={editingSection === "contact" ? draft.emailAddress : details.emailAddress}
                onChange={(event) => updateField("emailAddress", event.target.value)}
              />
            </label>
          </div>

          {editingSection === "contact" && (
            <button
              type="button"
              className="customer-save-button"
              onClick={() => saveDetails("contact")}
            >
              Save Changes
            </button>
          )}
        </section>

        {saveError && (
          <p className="customer-profile-error" role="alert">
            {saveError}
          </p>
        )}
      </div>

      <div className="customer-profile-shortcuts">
        {shortcuts.map((shortcut) => (
          <button
            key={shortcut.title}
            type="button"
            className="customer-shortcut-card"
            onClick={() => onNavigate(shortcut.destination)}
          >
            <span className="customer-shortcut-icon">
              <ProfileDashboardIcon name={shortcut.icon} />
            </span>
            <span className="customer-shortcut-arrow" aria-hidden="true">›</span>
            <strong>{shortcut.title}</strong>
            <span className="customer-shortcut-description">
              {shortcut.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function CustomerProfileLayout() {
  const [selectedSection, setSelectedSection] =
    useState<ProfileSection>("profile");
  const customerDisplayName = useSyncExternalStore(
    subscribeToCustomerName,
    getCustomerDisplayName,
    () => "Customer Name"
  );

  return (
    <main className="profile-page">
      <aside
        className="profile-sidebar"
        aria-label="Customer account navigation"
      >
        <div className="profile-customer">
          <CustomerAvatar />

          <div className="profile-customer-info">
            <span className="profile-greeting">
              Hello,
            </span>

            <strong className="profile-customer-name">
              {customerDisplayName}
            </strong>

            <span className="profile-customer-badge">
              <span aria-hidden="true">♛</span>
              Customer
            </span>
          </div>

          <svg
            className="profile-wave"
            viewBox="0 0 180 70"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0 70C53 66 85 27 180 13V70Z" fill="#ffe4ea" />
            <path d="M28 70C83 65 117 33 180 26V70Z" fill="#ff9bac" />
            <path d="M65 70C113 67 145 43 180 34V70Z" fill="#ff4052" />
            <path d="M98 70C132 67 159 53 180 47V70Z" fill="#e60018" />
          </svg>
        </div>

        <nav
          className="profile-navigation"
          aria-label="Profile sections"
        >
          {navigationItems.map((item) => {
            const isSelected = selectedSection === item.id;
            const isLogout = item.id === "logout";

            const buttonClassName = [
              "profile-navigation-button",
              isSelected ? "is-selected" : "",
              isLogout ? "is-logout" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <button
                key={item.id}
                type="button"
                className={buttonClassName}
                aria-current={isSelected ? "page" : undefined}
                onClick={() => setSelectedSection(item.id)}
              >
                <ProfileIcon name={item.icon} />

                <span>{item.label}</span>

                {!isLogout && (
                  <span
                    className="profile-chevron"
                    aria-hidden="true"
                  >
                    ›
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {selectedSection === "profile" && (
        <div className="customer-profile-main">
          <section
          className="profile-banner"
          aria-label="Customer profile banner"
        >
          <Image
            className="profile-banner-image"
            src="/service-icons/city-coolies-profile-banner-trimmed.png"
            alt="Modern residential property"
            width={2170}
            height={380}
          />
            <div className="profile-banner-content">
              <h1>My Profile</h1>
              <p>Manage your personal details and account information.</p>
            </div>
        </section>
          <CustomerProfileDashboard
            customerDisplayName={customerDisplayName}
            onNavigate={setSelectedSection}
          />
        </div>
      )}

      
      {selectedSection === "bookings" && (
        <div className="customer-profile-main">
          <section
          className="profile-banner"
          aria-label="Customer profile banner"
        >
          <Image
            className="profile-banner-image"
            src="/service-icons/city-coolies-profile-banner-trimmed.png"
            alt="Modern residential property"
            width={2170}
            height={380}
          />
            <div className="profile-banner-content">
              <h1>My Bookings</h1>
              <p>View your booked services and products, booking dates, and details.</p>
            </div>
        </section>
          <MyBookings />
        </div>
      )}
<style>{`
        /* Desktop profile sidebar and banner placement */
        @media (min-width: 641px) {
          .profile-page {
            display: grid;
            grid-template-columns: 310px minmax(0, 1fr);
            grid-template-rows: auto;
            align-items: start;
            column-gap: 16px;
            align-content: start;
            align-items: start;
          }

          .profile-banner {
            margin-top: 0;
          }
        }

        /* Responsive profile banner */
        .profile-banner {
          position: relative;
          z-index: 1;
          width: 100%;
          min-width: 0;
          overflow: hidden;
          border-radius: 18px;
        }

        .profile-banner-image {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
        }

        /* Profile banner heading and description */
        .profile-banner-content {
          position: absolute;
          z-index: 2;
          top: 50%;
          left: clamp(18px, 3vw, 42px);
          width: 54%;
          transform: translateY(-50%);
          color: #fff;
        }

        .profile-banner-content h1 {
          margin: 0 0 8px;
          color: #fff;
          font-size: clamp(24px, 2.6vw, 40px);
          font-weight: 800;
          line-height: 1.15;
        }

        .profile-banner-content p {
          margin: 0;
          color: #fff;
          font-size: clamp(13px, 1.1vw, 17px);
          line-height: 1.4;
        }

        /* Keep the complete image visible on narrow screens. */
        @media (max-width: 900px) {
          .profile-banner-content {
            position: static;
            width: 100%;
            padding: 14px 18px;
            transform: none;
            background: linear-gradient(110deg, #d00018, #f52435);
          }

          .profile-banner-content h1 {
            margin-bottom: 5px;
            font-size: clamp(20px, 4vw, 26px);
          }

          .profile-banner-content p {
            font-size: 13px;
          }
        }

        @media (max-width: 640px) {
          .profile-banner {
            margin-top: 16px;
            border-radius: 14px;
          }
        }

        .profile-page {
          position: relative;
          isolation: isolate;
          min-height: 100vh;
          padding: 30px 16px 100px 40px;
          overflow: hidden;
          background: linear-gradient(
            150deg,
            #fff8fa 0%,
            #fff 55%,
            #fff1f4 100%
          );
          color: #111827;
          font-family: Arial, Helvetica, sans-serif;
        }

        .profile-page::before,
        .profile-page::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          pointer-events: none;
          z-index: -1;
        }

        .profile-page::before {
          bottom: 12px;
          height: 92px;
          background: #ffc1cd;
          clip-path: polygon(0 22%, 12% 32%, 28% 76%, 50% 100%, 72% 85%, 88% 44%, 100% 20%, 100% 100%, 0 100%);
        }

        .profile-page::after {
          bottom: 0;
          height: 72px;
          background: linear-gradient(100deg, #f51d30, #db0015 45%, #ff566a);
          clip-path: polygon(0 38%, 15% 55%, 32% 100%, 68% 100%, 86% 55%, 100% 24%, 100% 100%, 0 100%);
        }

        .profile-sidebar {
          position: relative;
          z-index: 1;
          width: 310px;
          max-width: 100%;
          overflow: hidden;
          background: #fff;
          border-radius: 22px;
          box-shadow: 0 12px 30px rgba(99, 34, 50, .13);
        }

        .profile-customer {
          position: relative;
          display: flex;
          align-items: center;
          gap: 16px;
          min-height: 150px;
          padding: 22px 22px 28px;
          overflow: hidden;
          border-bottom: 1px solid #ececf0;
        }

        .profile-avatar {
          display: block;
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 50%;
        }

        .customer-avatar-control {
          position: relative;
          z-index: 1;
          flex: 0 0 80px;
          width: 80px;
          height: 80px;
        }

        .customer-avatar-button {
          display: block;
          width: 80px;
          height: 80px;
          padding: 0;
          border: 0;
          border-radius: 50%;
          overflow: hidden;
          background: transparent;
          cursor: pointer;
        }

        .customer-avatar-button:focus-visible,
        .customer-avatar-remove:focus-visible {
          outline: 2px solid #ed1725;
          outline-offset: 3px;
        }

        .customer-avatar-file-input {
          display: none;
        }

        .customer-avatar-remove {
          position: absolute;
          top: -5px;
          right: -5px;
          display: grid;
          place-items: center;
          width: 22px;
          height: 22px;
          border: 1px solid #fff;
          border-radius: 50%;
          background: #ed1725;
          color: #fff;
          font-size: 17px;
          cursor: pointer;
        }

        .customer-avatar-error {
          position: absolute;
          top: 85px;
          left: 0;
          width: 220px;
          padding: 5px;
          border-radius: 5px;
          background: #fff;
          color: #b91c1c;
          font-size: 11px;
        }

        .profile-customer-info {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 5px;
        }

        .profile-greeting {
          font-size: 15px;
          font-weight: 500;
        }

        .profile-customer-name {
          font-size: 19px;
          line-height: 1.25;
          font-weight: 800;
        }

        .profile-customer-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 13px;
          border-radius: 99px;
          background: #ffedc5;
          color: #663608;
          font-size: 13px;
          font-weight: 700;
        }

        .profile-customer-badge span {
          color: #c47a05;
          font-size: 18px;
          line-height: 1;
        }

        .profile-wave {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 180px;
          height: 70px;
          pointer-events: none;
        }

        .profile-navigation {
          padding: 12px 13px 17px;
        }

        .profile-navigation-button {
          display: flex;
          align-items: center;
          gap: 17px;
          width: 100%;
          min-height: 60px;
          padding: 11px 13px;
          border: 0;
          border-bottom: 1px solid #e9e9ee;
          border-radius: 0;
          background: transparent;
          color: #151c29;
          font: inherit;
          font-size: 15px;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          transition:
            background .18s ease,
            color .18s ease;
        }

        .profile-navigation-button .profile-nav-icon {
          width: 28px;
          height: 28px;
          flex: 0 0 28px;
          color: #ed1725;
        }

        .profile-navigation-button .profile-chevron {
          margin-left: auto;
          font-size: 28px;
          line-height: 1;
          font-weight: 400;
          color: #475569;
        }

        .profile-navigation-button.is-selected {
          min-height: 52px;
          margin: 4px 0;
          border-bottom-color: transparent;
          border-radius: 12px;
          background: linear-gradient(
            100deg,
            #ff2937,
            #d90012
          );
          color: #fff;
          box-shadow: 0 7px 15px rgba(238, 23, 39, .19);
        }

        .profile-navigation-button.is-selected .profile-nav-icon,
        .profile-navigation-button.is-selected .profile-chevron {
          color: #fff;
        }

        .profile-navigation-button:not(.is-selected):hover {
          background: #fff4f6;
        }

        .profile-navigation-button.is-logout {
          margin-top: 10px;
          border-bottom: 0;
        }

        .profile-navigation-button:focus-visible {
          outline: 3px solid #fb7185;
          outline-offset: -3px;
        }

        /* Mobile profile layout and navigation. */
        @media (max-width: 640px) {
          .profile-page {
            padding: 65px 12px 110px;
          }

          .profile-sidebar {
            width: 100%;
            max-width: none;
            margin: 0;
            overflow: visible;
            border-radius: 0;
            background: transparent;
            box-shadow: none;
          }

          .profile-customer {
            width: 100%;
            min-height: 116px;
            margin: 0 0 12px;
            padding: 14px 16px;
            gap: 14px;
            overflow: hidden;
            border: 0;
            border-radius: 18px;
            background: #fff;
            box-shadow: 0 6px 22px rgba(99, 34, 50, .09);
          }

          .profile-avatar {
            flex: 0 0 76px;
            width: 76px;
            height: 76px;
          }

          .profile-customer-info {
            min-width: 0;
          }

          .profile-customer-name {
            overflow-wrap: anywhere;
          }

          .profile-wave {
            width: 150px;
            height: 54px;
          }

          .profile-navigation {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 8px;
            padding: 0;
          }

          .profile-navigation-button {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 5px;
            min-width: 0;
            min-height: 64px;
            margin: 0;
            padding: 9px 2px;
            border: 0;
            border-radius: 12px;
            background: #fff;
            box-shadow: 0 4px 12px rgba(99, 34, 50, .08);
            font-size: 11px;
            font-weight: 600;
            line-height: 1.15;
            text-align: center;
          }

          .profile-navigation-button .profile-nav-icon {
            width: 23px;
            height: 23px;
            flex: 0 0 23px;
          }

          .profile-navigation-button .profile-chevron {
            display: none;
          }

          .profile-navigation-button.is-selected {
            min-height: 64px;
            margin: 0;
            border-radius: 12px;
          }

          .profile-navigation-button:nth-child(4),
          .profile-navigation-button:nth-child(6),
          .profile-navigation-button:nth-child(7) {
            display: none;
          }
        }
        /* Desktop-only right spacing */
        @media (min-width: 1024px) {
          .profile-page {
            padding-right: 90px;
          }
        }
        /* Customer profile dashboard */
        .customer-profile-main {
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 0;
        }

        .customer-profile-dashboard {
          display: flex;
          flex-direction: column;
          gap: 18px;
          min-width: 0;
        }

        .customer-profile-information {
          overflow: hidden;
          border-radius: 20px;
          background: #fff;
          box-shadow: 0 8px 24px rgba(99, 34, 50, .10);
        }

        .customer-information-section {
          padding: 20px 24px 24px;
        }

        .customer-information-section + .customer-information-section {
          border-top: 1px solid #f0e6e9;
        }

        .customer-information-heading {
          display: flex;
          align-items: center;
          gap: 12px;
          min-height: 48px;
          padding: 6px 10px;
          border-radius: 12px;
          background: linear-gradient(90deg, #ffe8ed, #fff2f5);
        }

        .customer-heading-icon {
          display: grid;
          place-items: center;
          color: #ed1725;
        }

        .customer-heading-icon svg {
          width: 30px;
          height: 30px;
        }

        .customer-information-heading h2 {
          flex: 1;
          min-width: 0;
          margin: 0;
          font-size: 21px;
          font-weight: 800;
          line-height: 1.3;
        }

        .customer-edit-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 6px 10px;
          border: 1px solid #ff4052;
          border-radius: 9px;
          background: #fff;
          color: #ed1725;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
        }

        .customer-edit-button svg {
          width: 18px;
          height: 18px;
        }

        .customer-information-fields {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px 38px;
          padding: 18px 16px 0;
        }

        .customer-information-field {
          display: flex;
          flex-direction: column;
          gap: 9px;
          min-width: 0;
          font-size: 15px;
          font-weight: 700;
        }

        .customer-information-field input {
          width: 100%;
          min-width: 0;
          height: 46px;
          padding: 0 15px;
          border: 1px solid #d7dce3;
          border-radius: 11px;
          background: #f3f4f6;
          color: #202938;
          font: inherit;
          font-size: 15px;
          font-weight: 400;
          outline-offset: 2px;
        }

        .customer-information-field input:not([readonly]) {
          border-color: #ed1725;
          background: #fff;
        }

        .customer-information-field input[readonly] {
          cursor: default;
        }

        .customer-save-button {
          display: block;
          margin: 18px 16px 0 auto;
          padding: 10px 18px;
          border: 0;
          border-radius: 10px;
          background: #ed1725;
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
        }

        .customer-profile-error {
          margin: 0 24px 15px;
          color: #b91c1c;
          font-size: 13px;
        }

        .customer-profile-shortcuts {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
        }

        .customer-shortcut-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
          min-width: 0;
          min-height: 154px;
          padding: 16px;
          border: 0;
          border-radius: 17px;
          background: #fff;
          box-shadow: 0 6px 18px rgba(99, 34, 50, .09);
          color: #111827;
          text-align: left;
          cursor: pointer;
        }

        .customer-shortcut-icon {
          display: grid;
          place-items: center;
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: #ffe8ed;
          color: #ed1725;
        }

        .customer-shortcut-icon svg {
          width: 30px;
          height: 30px;
        }

        .customer-shortcut-arrow {
          position: absolute;
          top: 22px;
          right: 14px;
          color: #ed1725;
          font-size: 28px;
          line-height: 1;
        }

        .customer-shortcut-card strong {
          font-size: 15px;
          line-height: 1.3;
        }

        .customer-shortcut-description {
          font-size: 13px;
          line-height: 1.4;
          color: #475569;
        }

        .customer-edit-button:focus-visible,
        .customer-save-button:focus-visible,
        .customer-shortcut-card:focus-visible {
          outline: 2px solid #ed1725;
          outline-offset: 3px;
        }

        @media (max-width: 1199px) and (min-width: 641px) {
          .customer-profile-shortcuts {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .customer-information-fields {
            gap: 16px;
          }
        }

        @media (max-width: 640px) {
          .customer-profile-main {
            gap: 12px;
          }

          .customer-profile-dashboard {
            gap: 14px;
          }

          .customer-information-section {
            padding: 12px 10px 18px;
          }

          .customer-information-heading {
            gap: 8px;
          }

          .customer-information-heading h2 {
            font-size: 16px;
          }

          .customer-heading-icon svg {
            width: 24px;
            height: 24px;
          }

          .customer-edit-button {
            padding: 5px 7px;
            font-size: 12px;
          }

          .customer-information-fields {
            grid-template-columns: 1fr;
            gap: 14px;
            padding: 14px 8px 0;
          }

          .customer-information-field {
            font-size: 13px;
          }

          .customer-information-field input {
            height: 42px;
            font-size: 13px;
          }

          .customer-profile-shortcuts {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }

          .customer-shortcut-card {
            padding: 12px;
            min-height: 145px;
          }

          .customer-shortcut-card strong {
            font-size: 13px;
          }

          .customer-shortcut-description {
            font-size: 12px;
          }
        }

        /* Phone-only banner text overlay */
        @media (max-width: 640px) {
          .profile-banner-content {
            position: absolute;
            z-index: 2;
            top: 50%;
            left: clamp(12px, 3.5vw, 18px);
            width: 52%;
            padding: 0;
            transform: translateY(-50%);
            background: transparent;
            color: #fff;
          }

          .profile-banner-content h1 {
            margin: 0 0 3px;
            font-size: clamp(15px, 3.8vw, 20px);
            font-weight: 800;
            line-height: 1.1;
          }

          .profile-banner-content p {
            margin: 0;
            font-size: clamp(8px, 2vw, 10px);
            line-height: 1.25;
          }
        }
      `}</style>
    </main>
  );
}