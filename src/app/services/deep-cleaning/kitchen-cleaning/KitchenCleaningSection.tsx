"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import ServiceCartSidebar from "@/app/services/ServiceCartSidebar";
import { getServiceCartServerSnapshot, getServiceCartSnapshot, parseServiceCartSnapshot, removeServiceCartItem, subscribeServiceCart, upsertServiceCartItem } from "@/app/services/serviceCart";
import { DEEP_CLEANING_INLINE_CSS, services, money, microwaveId, type Service, type Option } from "./KitchenServiceDetails";

function scrollToService(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY - 155;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

export default function KitchenCleaningSection() {
  const router = useRouter();

  useEffect(() => {
    if (!window.matchMedia("(max-width: 760px)").matches) {
      return;
    }

    if (window.sessionStorage.getItem("citycoolies:kitchen-scroll-cart") !== "1") {
      return;
    }

    const timer = window.setTimeout(() => {
      const sidebar = document.querySelector<HTMLElement>(
        "#panel-kitchen-cleaning .cc-dc-kitchen-sidebarColumn"
      );

      if (!sidebar) return;

      window.sessionStorage.removeItem("citycoolies:kitchen-scroll-cart");

      const top =
        sidebar.getBoundingClientRect().top +
        window.scrollY -
        80;

      window.scrollTo({
        top: Math.max(0, top),
        behavior: "smooth",
      });
    }, 250);

    return () => window.clearTimeout(timer);
  }, []);
  const openDetails = (id: string) => router.push(`/services/deep-cleaning?category=kitchen-cleaning&kitchenService=${encodeURIComponent(id)}`);
  const snapshot = useSyncExternalStore(
    subscribeServiceCart,
    getServiceCartSnapshot,
    getServiceCartServerSnapshot,
  );
  const cartItems = useMemo(() => parseServiceCartSnapshot(snapshot), [snapshot]);
  const microwaveItem = cartItems.find((item) => item.id === microwaveId);
  const microwaveQuantity = microwaveItem
    ? Math.max(1, Math.round(microwaveItem.price / 199))
    : 0;

  function setMicrowaveQuantity(quantity: number) {
    if (quantity <= 0) {
      removeServiceCartItem(microwaveId);
      return;
    }
    upsertServiceCartItem({
      id: microwaveId,
      serviceTitle: "Microwave Cleaning",
      optionLabel: `${quantity} \u00D7 Microwave Cleaning`,
      price: 199 * quantity,
      priceLabel: money(199 * quantity),
      duration: "Professional cleaning service",
    });
  }

  function addOption(service: Service, option: Option) {
    upsertServiceCartItem({
      id: `kitchen:${service.id}:${option.id}`,
      serviceTitle: service.title,
      optionLabel: option.label,
      price: option.price,
      priceLabel: money(option.price),
      duration: "Professional cleaning service",
    });
  }

  return (
    <>
      <style>{DEEP_CLEANING_INLINE_CSS}</style>
      <section
        id="panel-kitchen-cleaning"
        role="tabpanel"
        className={"cc-dc-kitchen-section"}
        aria-labelledby="kitchen-cleaning-heading"
      >
        <h1 id="kitchen-cleaning-heading" className={"cc-dc-kitchen-srOnly"}>
          Kitchen Cleaning
        </h1>

        <div className={"cc-dc-kitchen-container"}>
          <div className={"cc-dc-kitchen-contentLayout"}>
            <main className={"cc-dc-kitchen-mainColumn"}>
              <nav className={"cc-dc-kitchen-serviceSelector"} aria-label="Kitchen cleaning services">
                {services.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    className={"cc-dc-kitchen-selectorItem"}
                    onClick={() => scrollToService(`kitchen-${service.id}`)}
                  >
                    <span className={"cc-dc-kitchen-selectorImage"} aria-hidden="true" />
                    <span className={"cc-dc-kitchen-selectorLabel"}>{service.title}</span>
                  </button>
                ))}
              </nav>
              <div className={"cc-dc-kitchen-selectorDivider"} />

              {services.map((service) => (
                <section
                  key={service.id}
                  id={`kitchen-${service.id}`}
                  className={"cc-dc-kitchen-serviceGroup"}
                >
                  <h2>{service.title}</h2>
                  <div className={"cc-dc-kitchen-serviceList"}>
                    <article className={"cc-dc-kitchen-serviceCard"}>
                      <div className={"cc-dc-kitchen-bannerPlaceholder"} data-service-id={service.id} aria-hidden="true" />
                      <div className={"cc-dc-kitchen-serviceDetails"}>
                        <div className={"cc-dc-kitchen-serviceMainRow"}>
                          <div className={"cc-dc-kitchen-serviceInformation"}>
                            <h3 className={"cc-dc-kitchen-serviceTitle"}>{service.title}</h3>
                            <div className={"cc-dc-kitchen-ratingRow"}>
                              <span className={"cc-dc-kitchen-ratingIcon"} aria-hidden="true">{"\u2605"}</span>
                              <span>{service.rating.toFixed(1)}</span>
                              {service.reviews > 0 && (<span className={"cc-dc-kitchen-reviewText"}>({service.reviews.toLocaleString("en-IN")} reviews)</span>)}
                              <button
                                type="button"
                                className={"cc-dc-kitchen-detailsButton"}
                                onClick={() => openDetails(service.id)}
                              >
                                View details
                              </button>
                            </div>
                            <div className={"cc-dc-kitchen-priceRow"}>
                              <strong>{service.id === "commercial-kitchen-cleaning" ? `Site survey ${money(500)}` : `Starts at ${money(Math.min(...service.options.map((option) => option.price)))}`}</strong>
                            </div>
                          </div>

                          {service.directAdd && microwaveQuantity > 0 ? (
                            <div className={"cc-dc-kitchen-quantityControl"} aria-label="Microwave Cleaning quantity">
                              <button
                                type="button"
                                aria-label="Remove one Microwave Cleaning" onClick={() => setMicrowaveQuantity(microwaveQuantity - 1)}>{"\u2212"}</button>
                              <span>{microwaveQuantity}</span>
                              <button
                                type="button"
                                aria-label="Add one Microwave Cleaning"
                                onClick={() => setMicrowaveQuantity(microwaveQuantity + 1)}
                              >+</button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              className={"cc-dc-kitchen-addButton"}
                              onClick={() => {
                                if (service.id === "commercial-kitchen-cleaning") addOption(service, service.options[0]); else if (service.directAdd) setMicrowaveQuantity(1);
                                else openDetails(service.id);
                              }}
                            >
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  </div>
                </section>
              ))}
            </main>
            <aside className={"cc-dc-kitchen-sidebarColumn"}>
              <ServiceCartSidebar />
            </aside>
          </div>
        </div>
      </section>

    </>
  );
}