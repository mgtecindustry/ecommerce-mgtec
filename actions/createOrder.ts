"use server";

import { backendClient } from "@/sanity/lib/backendClient";

export async function createOrder(order: any, orderNumber: string) {
  try {
    const result = await backendClient.create(order);
    return { success: true, data: result };
  } catch (error) {
    console.error("Eroare la crearea comenzii:", error);
    return { success: false, error };
  }
}
