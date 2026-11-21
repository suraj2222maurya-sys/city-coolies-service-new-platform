/**
 * Shared service item used by service selectors and both cart components.
 * The id identifies the service-and-option combination.
 * The numeric price is used for totals; priceLabel is the display text.
 */
export type ServiceCartItem = {
  id: string;
  serviceTitle: string;
  optionLabel: string;
  price: number;
  priceLabel: string;
  duration: string;
};

/**
 * Browser localStorage key for the current service selection.
 * ServiceCartSidebar.tsx reads this selection through the cart getters.
 * The legacy key is preserved so existing saved carts remain available.
 */
const CART_KEY = "city-coolies:deep-cleaning-cart:v1";
/**
 * Same-tab cart-change event consumed by subscribeServiceCart().
 * Cart writes dispatch this event to refresh subscribed components.
 * The historical event name is retained for compatibility.
 */
const CART_EVENT = "citycoolies:deep-cleaning-cart-change";

/**
 * Applies the existing car-rental and tent-rental exclusion rule.
 * Used while reading or parsing saved cart items.
 */
function isAvailableCartItem(item: ServiceCartItem): boolean {
  return !/^rental:(car-rental|tent-rental):/.test(item?.id ?? "");
}

/**
 * Internal environment check before using browser APIs.
 * Prevents browser-only operations during server rendering.
 */
function isBrowser(): boolean {
  return typeof window !== "undefined";
}

/**
 * Reads the current selected services from browser localStorage.
 * Used by add, remove and confirmation operations.
 * Returns an empty list when no readable selection is available.
 */
export function readServiceCart(): ServiceCartItem[] {
  if (!isBrowser()) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(CART_KEY);

    if (!raw) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is ServiceCartItem =>
        typeof item === "object" &&
        item !== null &&
        "id" in item &&
        typeof item.id === "string" &&
        "serviceTitle" in item &&
        typeof item.serviceTitle === "string" &&
        "optionLabel" in item &&
        typeof item.optionLabel === "string" &&
        "price" in item &&
        typeof item.price === "number" &&
        "priceLabel" in item &&
        typeof item.priceLabel === "string" &&
        "duration" in item &&
        typeof item.duration === "string",
    ).filter(isAvailableCartItem);
  } catch {
    return [];
  }
}

/**
 * Internal writer for the current service selection.
 * Saves the selected list and dispatches the cart-change event.
 * ServiceCartSidebar.tsx receives the update through its subscription.
 */
function writeServiceCart(
  items: ServiceCartItem[],
): void {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(
    CART_KEY,
    JSON.stringify(items),
  );

  window.dispatchEvent(
    new Event(CART_EVENT),
  );
}

/**
 * Called by service-selection components when adding an option.
 * Replaces an existing item with the same id, then saves the selection.
 * Emits the cart-added event used by the mobile sidebar scroll handler.
 * This operation does not confirm the list for the floating cart.
 */
export function upsertServiceCartItem(
  item: ServiceCartItem,
): void {
  const current = readServiceCart();

  const next = current.filter(
    (existingItem) => existingItem.id !== item.id,
  );

  next.push(item);

  writeServiceCart(next);

  window.dispatchEvent(
    new Event("citycoolies:deep-cleaning-cart-added"),
  );
}

/**
 * Called by service, sidebar and floating-cart remove actions.
 * Removes the id from the current selection and confirmed services.
 * Cart-change notifications refresh subscribed components.
 */
export function removeServiceCartItem(
  id: string,
): void {
  const next = readServiceCart().filter(
    (item) => item.id !== id,
  );

  writeServiceCart(next);
  removeConfirmedService(id);
}

/**
 * Client snapshot getter for the sidebar and service-selection components.
 * Use with subscribeServiceCart() and getServiceCartServerSnapshot()
 * inside React useSyncExternalStore().
 */
export function getServiceCartSnapshot(): string {
  if (!isBrowser()) {
    return "[]";
  }

  return window.localStorage.getItem(CART_KEY) ?? "[]";
}

/**
 * Server snapshot paired with getServiceCartSnapshot().
 * Returns an empty list because localStorage is a browser API.
 */
export function getServiceCartServerSnapshot(): string {
  return "[]";
}

/**
 * Converts a JSON snapshot into cart items for components and operations.
 * Handles invalid JSON and applies the existing availability filter.
 * Used for both selected and confirmed cart snapshots.
 */
export function parseServiceCartSnapshot(
  snapshot: string,
): ServiceCartItem[] {
  try {
    const parsed: unknown = JSON.parse(snapshot);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return (parsed as ServiceCartItem[]).filter(isAvailableCartItem);
  } catch {
    return [];
  }
}

/**
 * Connects cart-change notifications to React useSyncExternalStore().
 * Used by service selectors, ServiceCartSidebar.tsx and AddToCartService.tsx.
 * Registers same-tab and browser storage listeners.
 * Returns a cleanup function to remove those listeners.
 */
export function subscribeServiceCart(
  listener: () => void,
): () => void {
  if (!isBrowser()) {
    return () => undefined;
  }

  /**
   * Forwards a same-tab cart-change event to the subscriber.
   */
  const handleCustomEvent = () => {
    listener();
  };

  /**
   * Handles browser storage events from other tabs.
   * Notifies the subscriber when the condition below matches.
   */
  const handleStorage = (
    event: StorageEvent,
  ) => {
    if (event.key === CART_KEY) {
      listener();
    }
  };

  window.addEventListener(
    CART_EVENT,
    handleCustomEvent,
  );

  window.addEventListener(
    "storage",
    handleStorage,
  );

  return () => {
    window.removeEventListener(
      CART_EVENT,
      handleCustomEvent,
    );

    window.removeEventListener(
      "storage",
      handleStorage,
    );
  };
}

// CITY_COOLIES_COMMITTED_SERVICES_START
/**
 * Browser localStorage key for the confirmed service list.
 * AddToCartService.tsx reads this list through getConfirmedServicesSnapshot().
 * The sidebar confirms the selection when Add More Services is clicked.
 */
const CONFIRMED_SERVICES_KEY = "city-coolies:committed-services:v1";

/**
 * Client snapshot getter used by AddToCartService.tsx.
 * Reads services confirmed through the sidebar's Add More Services action.
 * Use with subscribeServiceCart() and the confirmed server getter.
 */
export function getConfirmedServicesSnapshot(): string {
  if (typeof window === "undefined") return "[]";
  return window.localStorage.getItem(CONFIRMED_SERVICES_KEY) ?? "[]";
}

/**
 * Server snapshot paired with getConfirmedServicesSnapshot().
 * Keeps the confirmed cart empty until browser data is available.
 */
export function getConfirmedServicesServerSnapshot(): string {
  return "[]";
}

/**
 * Internal writer for the confirmed service list.
 * Saves the list and notifies cart subscribers.
 */
function writeConfirmedServices(items: ServiceCartItem[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONFIRMED_SERVICES_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_EVENT));
}

/**
 * Called by ServiceCartSidebar.tsx when Add More Services is clicked.
 * Copies the current selection into the confirmed list, replacing that list.
 * AddToCartService.tsx reads the confirmed result on /services.
 * The sidebar Link handles navigation; this function handles cart data.
 */
export function confirmSelectedServices(): void {
  writeConfirmedServices(readServiceCart());
}

/**
 * Adds or replaces one service directly in the confirmed list.
 * Does not update the current selection.
 * The normal sidebar flow uses confirmSelectedServices() instead.
 */
export function appendConfirmedService(item: ServiceCartItem): void {
  const items = parseServiceCartSnapshot(getConfirmedServicesSnapshot());
  writeConfirmedServices([...items.filter((entry) => entry.id !== item.id), item]);
}

/**
 * Internal helper called by removeServiceCartItem().
 * Removes the matching id from the confirmed list.
 */
function removeConfirmedService(id: string): void {
  const items = parseServiceCartSnapshot(getConfirmedServicesSnapshot());
  writeConfirmedServices(items.filter((item) => item.id !== id));
}
// CITY_COOLIES_COMMITTED_SERVICES_END