import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllBrands = async () => {
  const ALL_BRANDS_QUERY = defineQuery(
    `
    *[_type == "product"]{
      brand
    } | order(brand asc)
  `
  );

  try {
    // Execută interogarea
    const response = await sanityFetch({ query: ALL_BRANDS_QUERY });

    // Returnează datele obținute, sau un array gol în caz de eroare
    return response.data || [];
  } catch (error) {
    console.error("Error fetching all brands:", error);
    return [];
  }
};
