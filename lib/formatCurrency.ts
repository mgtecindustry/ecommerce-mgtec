export function formatCurrency(
  amount: number,
  currencyCode: string = "RON"
): string {
  try {
    return new Intl.NumberFormat("ro-RO", {
      style: "currency",
      currency: currencyCode.toUpperCase(),
    }).format(amount);
  } catch (error) {
    console.error("Invalid currency code", currencyCode, error);
    return `${currencyCode.toUpperCase()} ${amount.toFixed(2)}`;
  }
}
