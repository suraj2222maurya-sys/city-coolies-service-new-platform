"use client";

import { useSyncExternalStore } from "react";

// This module stores only presentation state. It is not proof of authentication.
// The future authentication service must validate a session independently.
export type CustomerIdentityMethod = "phone" | "email";

export type AuthenticatedCustomer = {
  userId: string;
  method: CustomerIdentityMethod;
  createdAt: string;
};

export type OtpRequest = {
  method: CustomerIdentityMethod;
  identity: string;
};

export type AuthResult =
  | { success: true; customer: AuthenticatedCustomer }
  | { success: false; message: string };

export interface CustomerAuthGateway {
  requestOtp(input: OtpRequest): Promise<{ success: boolean; message?: string }>;
  resendOtp(input: OtpRequest): Promise<{ success: boolean; message?: string }>;
  verifyOtp(input: OtpRequest & { code: string }): Promise<"verified" | "wrong" | "invalid">;
  register(input: OtpRequest & {
    firstName: string;
    lastName: string;
    password: string;
  }): Promise<AuthResult>;
  login(input: OtpRequest & { password: string }): Promise<AuthResult>;
}

// Configure this adapter when the real authentication service is integrated.
// No OTP, email, SMS, or authentication is simulated here.
let authGateway: CustomerAuthGateway | null = null;
export function configureCustomerAuthGateway(gateway: CustomerAuthGateway | null): void {
  authGateway = gateway;
}
export function getCustomerAuthGateway(): CustomerAuthGateway | null {
  return authGateway;
}

const SESSION_KEY = "city-coolies:customer-session-ui:v1";
const SESSION_EVENT = "city-coolies:customer-session-ui-change";
let cachedRaw: string | null | undefined;
let cachedSession: AuthenticatedCustomer | null = null;

function readSessionSnapshot(): AuthenticatedCustomer | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(SESSION_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedSession = null;
    if (raw) {
      try {
        const value: unknown = JSON.parse(raw);
        if (value && typeof value === "object") {
          const candidate = value as Partial<AuthenticatedCustomer>;
          if (
            typeof candidate.userId === "string" &&
            (candidate.method === "phone" || candidate.method === "email") &&
            typeof candidate.createdAt === "string"
          ) {
            cachedSession = {
              userId: candidate.userId,
              method: candidate.method,
              createdAt: candidate.createdAt,
            };
          }
        }
      } catch {
        cachedSession = null;
      }
    }
  }
  return cachedSession;
}

function subscribeToSessionChanges(onChange: () => void): () => void {
  window.addEventListener(SESSION_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(SESSION_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function useCustomerSession(): AuthenticatedCustomer | null {
  return useSyncExternalStore(subscribeToSessionChanges, readSessionSnapshot, () => null);
}

// Call only after the authentication gateway confirms account/login success.
export function setAuthenticatedCustomer(customer: AuthenticatedCustomer): void {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(customer));
  window.dispatchEvent(new Event(SESSION_EVENT));
}

export function logoutCustomer(): void {
  window.localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event(SESSION_EVENT));
}
