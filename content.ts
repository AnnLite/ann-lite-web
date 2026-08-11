/**
 * Shared content types for Ann Lite.
 *
 * These types define the contract between ann-lite-web and ann-lite-api.
 * They are intentionally the single source of truth referenced from
 * docs/CONTRACTS.md — when the API repo is built, its response shapes
 * must match these types exactly, or this file (and CONTRACTS.md) must
 * be updated in a documented, versioned change.
 */

export type AppLocale = "ht" | "fr" | "en";

export interface LocalizedText {
  ht: string;
  fr: string;
  en: string;
}

export interface Prayer {
  id: string;
  slug: string;
  title: LocalizedText;
  body: LocalizedText;
  category: "morning" | "evening" | "gratitude" | "difficulty" | "hope";
  publishedAt: string; // ISO 8601
}

export interface Reflection {
  id: string;
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  body: LocalizedText;
  author: string;
  publishedAt: string; // ISO 8601
}

export interface BibleVerse {
  number: number;
  text: string;
}

export interface BibleChapter {
  translationId: string;
  book: string;
  chapter: number;
  verses: BibleVerse[];
  copyright: {
    owner: string;
    license: string;
    permissionStatus: "licensed" | "public-domain" | "pending-verification";
  };
}

export interface CharityProject {
  id: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  organization: string;
  goalAmountUsd: number;
  raisedAmountUsd: number;
}

export type DonationMethod = "card" | "celo" | "cusd";

export interface DonationIntentRequest {
  method: DonationMethod;
  amountUsd: number;
  projectId?: string;
  donorEmail?: string;
  anonymous: boolean;
}

export interface DonationIntentResponse {
  intentId: string;
  method: DonationMethod;
  status: "pending" | "requires_action";
  // For card: a provider-hosted payment URL/session token (never a raw secret).
  paymentSessionUrl?: string;
  // For crypto: the address/network to send funds to, and a reference memo.
  cryptoAddress?: string;
  cryptoNetwork?: "celo-mainnet" | "celo-alfajores";
  referenceMemo?: string;
}

export interface OnChainTransactionSummary {
  transactionHash: string;
  network: "celo-mainnet" | "celo-alfajores";
  token: "CELO" | "cUSD";
  amount: string;
  confirmedAt: string; // ISO 8601
  explorerUrl: string;
}

export interface TransparencySummary {
  totalDonationsUsd: number;
  totalDonationsVerifiedOnChain: number;
  activeProjects: number;
  lastReconciledAt: string; // ISO 8601
  recentTransactions: OnChainTransactionSummary[];
}

/** Generic envelope every ann-lite-api JSON response must follow. */
export interface ApiEnvelope<T> {
  data: T | null;
  error: { code: string; message: string } | null;
}
