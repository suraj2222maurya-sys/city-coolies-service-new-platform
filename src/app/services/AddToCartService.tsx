"use client";

/**
 * CART CONNECTION GUIDE
 *
 * Purpose:
 * Display a draggable summary of confirmed services on /services.
 *
 * Data source:
 * @/app/services/serviceCart
 *
 * Confirmation source:
 * ./ServiceCartSidebar calls confirmSelectedServices()
 * when the customer clicks Add More Services.
 *
 * Subscription:
 * subscribeServiceCart() notifies this component of cart changes.
 * getConfirmedServicesSnapshot() provides the confirmed items.
 *
 * Actions:
 * - Drag the summary to move it within the screen.
 * - Go to Cart opens the selected-services dialog.
 * - Remove updates the shared cart.
 *
 * Styling:
 * Floating bar, dialog and responsive CSS are in this file.
 */

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

import {
  getServiceCartServerSnapshot,
  getServiceCartSnapshot,
  parseServiceCartSnapshot,
  removeServiceCartItem,
  subscribeServiceCart,
} from "@/app/services/serviceCart";

type Position = {
  x: number;
  y: number;
};

type DragState = {
  pointerId: number;
  offsetX: number;
  offsetY: number;
};

const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

// Show the floating cart only on the main services page.
// The sidebar's Add More Services button confirms the selected items.
export default function AddToCartService() {
  return <ConfirmedServiceCart />;
}

// Read confirmed services instead of selections still being edited.
function ConfirmedServiceCart() {
  const snapshot = useSyncExternalStore(
    subscribeServiceCart,
    getServiceCartSnapshot,
    getServiceCartServerSnapshot,
  );

  const items = useMemo(
    () =>
      parseServiceCartSnapshot(snapshot).filter(
        (item) =>
          item &&
          typeof item.id === "string" &&
          typeof item.serviceTitle === "string" &&
          Number.isFinite(item.price) &&
          item.price >= 0,
      ),
    [snapshot],
  );

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const barRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cartButtonRef = useRef<HTMLButtonElement>(null);
  const dragRef = useRef<DragState | null>(null);

  const [position, setPosition] = useState<Position | null>(null);
  const [dragging, setDragging] = useState(false);
  const [open, setOpen] = useState(false);

  // Keep the floating bar inside the visible screen.

  function clampPosition(x: number, y: number): Position {
    const rect = barRef.current?.getBoundingClientRect();
    const width = rect?.width ?? 0;
    const height = rect?.height ?? 0;
    const margin = 8;

    return {
      x: Math.max(
        margin,
        Math.min(x, window.innerWidth - width - margin),
      ),
      y: Math.max(
        margin,
        Math.min(y, window.innerHeight - height - margin),
      ),
    };
  }

  useEffect(() => {
    const bar = barRef.current;

    if (!bar) {
      return;
    }

    const keepVisible = () => {
      setPosition((current) =>
        current ? clampPosition(current.x, current.y) : null,
      );
    };

    const observer = new ResizeObserver(keepVisible);
    observer.observe(bar);
    window.addEventListener("resize", keepVisible);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", keepVisible);
    };
  }, [items.length]);

  // Lock background scrolling while the cart is open.

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function startDrag(event: PointerEvent<HTMLButtonElement>) {
    if (!event.isPrimary || event.button !== 0) {
      return;
    }

    const rect = barRef.current?.getBoundingClientRect();

    if (!rect) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);

    dragRef.current = {
      pointerId: event.pointerId,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
    };

    setPosition(clampPosition(rect.left, rect.top));
    setDragging(true);
  }

  function moveDrag(event: PointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    setPosition(
      clampPosition(
        event.clientX - drag.offsetX,
        event.clientY - drag.offsetY,
      ),
    );
  }

  function stopDrag() {
    dragRef.current = null;
    setDragging(false);
  }

  function moveWithKeyboard(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Home") {
      event.preventDefault();
      setPosition(null);
      return;
    }

    const directions: Record<string, Position> = {
      ArrowLeft: { x: -16, y: 0 },
      ArrowRight: { x: 16, y: 0 },
      ArrowUp: { x: 0, y: -16 },
      ArrowDown: { x: 0, y: 16 },
    };

    const direction = directions[event.key];
    const rect = barRef.current?.getBoundingClientRect();

    if (!direction || !rect) {
      return;
    }

    event.preventDefault();

    setPosition(
      clampPosition(
        rect.left + direction.x,
        rect.top + direction.y,
      ),
    );
  }

  function openCart() {
    const dialog = dialogRef.current;

    if (dialog && !dialog.open) {
      dialog.showModal();
      setOpen(true);
    }
  }

  function closeCart() {
    dialogRef.current?.close();
  }

  if (items.length === 0 && !open) {
    return null;
  }

  return (
    <>
      {items.length > 0 && (
        <div
          ref={barRef}
          className="cc-floating-cart"
          data-dragging={dragging}
          aria-label="Selected services summary"
          style={
            position
              ? {
                  left: position.x,
                  top: position.y,
                  bottom: "auto",
                  transform: "none",
                }
              : undefined
          }
        >
          <button
            type="button"
            className="cc-floating-cart__handle"
            aria-label="Move cart bar. Use arrow keys to move or Home to reset."
            title="Drag to move. Double-click to reset."
            onPointerDown={startDrag}
            onPointerMove={moveDrag}
            onPointerUp={stopDrag}
            onPointerCancel={stopDrag}
            onLostPointerCapture={stopDrag}
            onKeyDown={moveWithKeyboard}
            onDoubleClick={() => setPosition(null)}
          >
            <span className="cc-floating-cart__check" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                <path
                  d="m6 12 4 4 8-10"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <span className="cc-floating-cart__summary" aria-live="polite">
              <strong>
                {items.length} {items.length === 1 ? "service" : "services"} selected
              </strong>
              <small>Estimated total {money.format(total)}</small>
            </span>
          </button>

          <button
            type="button"
            className="cc-floating-cart__expand"
            aria-label="View selected services"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="cc-selected-services-dialog"
            onClick={openCart}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
              <path
                d="m6 9 6 6 6-6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            ref={cartButtonRef}
            type="button"
            className="cc-floating-cart__action"
            aria-haspopup="dialog"
            aria-controls="cc-selected-services-dialog"
            onClick={openCart}
          >
            Go to Cart
          </button>
        </div>
      )}

      <dialog
        ref={dialogRef}
        id="cc-selected-services-dialog"
        className="cc-service-cart-dialog"
        aria-labelledby="cc-service-cart-title"
        onClose={() => {
          setOpen(false);
          cartButtonRef.current?.focus();
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) {
            return;
          }

          const rect = event.currentTarget.getBoundingClientRect();

          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          ) {
            closeCart();
          }
        }}
      >
        <div className="cc-service-cart-dialog__header">
          <h2 id="cc-service-cart-title">Your services</h2>

          <button
            type="button"
            className="cc-service-cart-dialog__close"
            aria-label="Close cart"
            onClick={closeCart}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div className="cc-service-cart-dialog__items">
          {items.length === 0 ? (
            <p className="cc-service-cart-dialog__empty">
              No services selected yet.
            </p>
          ) : (
            items.map((item) => (
              <article className="cc-service-cart-dialog__item" key={item.id}>
                <div className="cc-service-cart-dialog__description">
                  <h3>{item.serviceTitle}</h3>
                  <p>
                    {[item.optionLabel, item.duration].filter(Boolean).join(" · ")}
                  </p>
                </div>

                <strong>{money.format(item.price)}</strong>

                <button
                  type="button"
                  className="cc-service-cart-dialog__remove"
                  aria-label={`Remove ${item.serviceTitle}`}
                  onClick={() => removeServiceCartItem(item.id)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </article>
            ))
          )}
        </div>

        <div className="cc-service-cart-dialog__footer">
          <div className="cc-service-cart-dialog__total">
            <span>Estimated total</span>
            <strong>{money.format(total)}</strong>
          </div>

          <Link
            href="/services"
            className="cc-service-cart-dialog__add-more"
            onClick={closeCart}
          >
            Add More Services
          </Link>
        </div>
      </dialog>

      <style>{CART_STYLES}</style>
    </>
  );
}

const CART_STYLES = `
  /* Floating cart bar */

  .cc-floating-cart,
  .cc-floating-cart *,
  .cc-service-cart-dialog,
  .cc-service-cart-dialog * {
    box-sizing: border-box;
  }

  .cc-floating-cart {
    position: fixed;
    z-index: 90;
    left: 50%;
    bottom: calc(24px + env(safe-area-inset-bottom, 0px));
    display: flex;
    align-items: center;
    gap: 4px;
    width: min(488px, calc(100vw - 16px));
    padding: 8px 10px;
    transform: translateX(-50%);
    border: 1px solid #f5cbd0;
    border-radius: 15px;
    background: #fff;
    color: #171717;
    box-shadow: 0 5px 24px rgb(0 0 0 / 8%);
    font-family: inherit;
  }

  .cc-floating-cart button,
  .cc-service-cart-dialog button {
    font: inherit;
    cursor: pointer;
  }

  .cc-floating-cart__handle {
    display: flex;
    flex: 1;
    align-items: center;
    gap: 9px;
    min-width: 0;
    min-height: 42px;
    padding: 0;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: inherit;
    text-align: left;
    touch-action: none;
    user-select: none;
    cursor: grab !important;
  }

  .cc-floating-cart[data-dragging="true"] .cc-floating-cart__handle {
    cursor: grabbing !important;
  }

  .cc-floating-cart__check {
    display: grid;
    flex: 0 0 36px;
    width: 36px;
    height: 36px;
    place-items: center;
    border-radius: 50%;
    background: #fff1f3;
    color: #ef1b23;
  }

  .cc-floating-cart__summary {
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: 2px;
  }

  .cc-floating-cart__summary strong {
    font-size: 15px;
    font-weight: 700;
    line-height: 1.25;
  }

  .cc-floating-cart__summary small {
    color: #00824b;
    font-size: 12px;
    line-height: 1.3;
  }

  .cc-floating-cart__expand {
    display: grid;
    flex: 0 0 36px;
    height: 44px;
    padding: 0;
    place-items: center;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: #ef1b23;
  }

  .cc-floating-cart__action {
    flex-shrink: 0;
    min-height: 40px;
    padding: 9px 14px;
    border: 0;
    border-radius: 11px;
    background: #ef1b23;
    color: #fff;
    font-size: 14px !important;
    font-weight: 700 !important;
    white-space: nowrap;
  }

  .cc-floating-cart button:focus-visible,
  .cc-service-cart-dialog button:focus-visible,
  .cc-service-cart-dialog a:focus-visible {
    outline: 2px solid #ef1b23;
    outline-offset: 3px;
  }

  /* Cart dialog */

  .cc-service-cart-dialog {
    position: fixed;
    inset: 0;
    width: min(520px, calc(100vw - 24px));
    max-height: calc(100dvh - 32px);
    margin: auto;
    padding: 0;
    overflow: hidden;
    border: 1px solid #f5cbd0;
    border-radius: 18px;
    background: #fff;
    color: #171717;
    font-family: inherit;
    box-shadow: 0 20px 70px rgb(0 0 0 / 20%);
  }

  .cc-service-cart-dialog[open] {
    display: flex;
    flex-direction: column;
  }

  .cc-service-cart-dialog::backdrop {
    background: rgb(0 0 0 / 38%);
  }

  .cc-service-cart-dialog__header {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 16px 20px;
    border-bottom: 1px solid #f3dce0;
  }

  .cc-service-cart-dialog__header h2 {
    margin: 0;
    font-size: 23px;
    font-weight: 700;
  }

  .cc-service-cart-dialog__close,
  .cc-service-cart-dialog__remove {
    display: grid;
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    padding: 0;
    place-items: center;
    border: 1px solid #f3cbd0;
    border-radius: 50%;
    background: #fff7f8;
    color: #ef1b23;
    font-size: 24px !important;
  }

  .cc-service-cart-dialog__items {
    min-height: 0;
    padding: 0 20px;
    overflow-y: auto;
    overscroll-behavior: contain;
  }

  .cc-service-cart-dialog__item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 18px 0;
    border-bottom: 1px solid #f3dce0;
  }

  .cc-service-cart-dialog__description {
    flex: 1;
    min-width: 0;
  }

  .cc-service-cart-dialog__description h3 {
    margin: 0;
    font-size: 15px;
    font-weight: 650;
    line-height: 1.4;
    overflow-wrap: anywhere;
  }

  .cc-service-cart-dialog__description p {
    margin: 5px 0 0;
    color: #666;
    font-size: 12px;
    line-height: 1.5;
  }

  .cc-service-cart-dialog__item > strong {
    padding-top: 2px;
    font-size: 14px;
    white-space: nowrap;
  }

  .cc-service-cart-dialog__empty {
    padding: 30px 0;
    color: #666;
    text-align: center;
  }

  .cc-service-cart-dialog__footer {
    flex-shrink: 0;
    padding: 20px;
  }

  .cc-service-cart-dialog__total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 18px;
  }

  .cc-service-cart-dialog__total strong {
    font-size: 22px;
  }

  .cc-service-cart-dialog__add-more {
    display: flex;
    min-height: 46px;
    align-items: center;
    justify-content: center;
    padding: 10px 16px;
    border: 1px solid #ef1b23;
    border-radius: 10px;
    color: #ef1b23;
    font-size: 15px;
    font-weight: 700;
    text-decoration: none;
  }

  /* Mobile layout */

  @media (max-width: 480px) {
    .cc-floating-cart {
      gap: 2px;
      padding: 7px;
    }

    .cc-floating-cart__handle {
      gap: 6px;
    }

    .cc-floating-cart__check {
      flex-basis: 28px;
      width: 28px;
      height: 28px;
    }

    .cc-floating-cart__summary strong {
      font-size: 12px;
    }

    .cc-floating-cart__summary small {
      font-size: 10px;
    }

    .cc-floating-cart__expand {
      flex-basis: 28px;
    }

    .cc-floating-cart__action {
      padding: 9px 10px;
      font-size: 12px !important;
    }

    .cc-service-cart-dialog__header,
    .cc-service-cart-dialog__footer {
      padding: 14px;
    }

    .cc-service-cart-dialog__items {
      padding: 0 14px;
    }

    .cc-service-cart-dialog__item {
      gap: 8px;
    }
  }
`;
