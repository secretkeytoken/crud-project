import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const IS_PRODUCTION = process.env.NODE_ENV === "production";

export const transformIrysUrl = (url: string) => {
  return url.replace("arweave.net/", "gateway.irys.xyz/");
};