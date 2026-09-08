"use server";

import { createClient } from "./server";
import type { PriceBreakdown } from "@/static-data/flightDetailData";
import type { PayPlan } from "@/components/page/dashboard/flight/booking/paymentPlanSelector";

export interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  holderName: string;
}

interface PaymentMethodRow {
  id: string;
  brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
  holder_name: string;
}

export async function getPaymentMethods(): Promise<PaymentMethod[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("payment_methods")
    .select("id, brand, last4, exp_month, exp_year, holder_name")
    .order("created_at", { ascending: true });

  if (error) throw error;

  return ((data as PaymentMethodRow[]) ?? []).map((row) => ({
    id: row.id,
    brand: row.brand,
    last4: row.last4,
    expMonth: row.exp_month,
    expYear: row.exp_year,
    holderName: row.holder_name,
  }));
}

type ActionResult<T> = { error: string } | T;

const GENERIC_ERROR = "Something went wrong. Please try again.";

export async function addPaymentMethodAction(
  brand: string,
  last4: string,
  expMonth: number,
  expYear: number,
  holderName: string
): Promise<ActionResult<{ card: PaymentMethod }>> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: "You need to be signed in to save a card." };

    const { data, error } = await supabase
      .from("payment_methods")
      .insert({
        user_id: user.id,
        brand,
        last4,
        exp_month: expMonth,
        exp_year: expYear,
        holder_name: holderName,
      })
      .select("id, brand, last4, exp_month, exp_year, holder_name")
      .single();

    if (error) return { error: error.message };

    const row = data as PaymentMethodRow;
    return {
      card: {
        id: row.id,
        brand: row.brand,
        last4: row.last4,
        expMonth: row.exp_month,
        expYear: row.exp_year,
        holderName: row.holder_name,
      },
    };
  } catch {
    return { error: GENERIC_ERROR };
  }
}

export interface FlightBooking {
  id: string;
  bookingRef: string;
  seat: string;
  gate: string;
  createdAt: string;
}

interface CreateFlightBookingRow {
  id: string;
  booking_ref: string;
  seat: string;
  gate: string;
  created_at: string;
}

export async function createFlightBookingAction(
  flightId: string,
  payPlan: PayPlan,
  priceBreakdown: PriceBreakdown,
  fareClass: string = "Economy"
): Promise<ActionResult<{ booking: FlightBooking }>> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: "You need to be signed in to book a flight." };

    const { data, error } = await supabase
      .rpc("create_flight_booking", {
        p_flight_id: flightId,
        p_pay_plan: payPlan,
        p_base_fare_cents: Math.round(priceBreakdown.baseFare * 100),
        p_discount_cents: Math.round(priceBreakdown.discount * 100),
        p_taxes_cents: Math.round(priceBreakdown.taxes * 100),
        p_service_fee_cents: Math.round(priceBreakdown.serviceFee * 100),
        p_total_cents: Math.round(priceBreakdown.total * 100),
        p_fare_class: fareClass,
      })
      .single();

    if (error) return { error: error.message };

    const row = data as CreateFlightBookingRow;
    return {
      booking: {
        id: row.id,
        bookingRef: row.booking_ref,
        seat: row.seat,
        gate: row.gate,
        createdAt: row.created_at,
      },
    };
  } catch {
    return { error: GENERIC_ERROR };
  }
}
