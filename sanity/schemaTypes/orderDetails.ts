import { BasketIcon } from "@sanity/icons";
import { defineType, defineField, defineArrayMember } from "sanity";

export const orderDetailsType = defineType({
  name: "orderDetails",
  title: "Comenzi Plasate",
  type: "document",
  icon: BasketIcon,
  fields: [
    defineField({
      name: "orderNumber",
      title: "Numar Comanda",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "numeClient",
      title: "Nume Client",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "emailClient",
      title: "Email Client",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "adresaClient",
      title: "Adresa Client",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "orasClient",
      title: "Oras Client",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "telefonClient",
      title: "Telefon Client",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "judetClient",
      title: "Judet Client",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "codPostalClient",
      title: "Cod Postal Client",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tipCurier",
      title: "Curier Client",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "products",
      title: "Produse",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "product",
              title: "Produs",
              type: "reference",
              to: [{ type: "product" }],
            }),
            defineField({
              name: "quantity",
              title: "Cantitate Produse",
              type: "number",
            }),
          ],
          preview: {
            select: {
              product: "product.name",
              quantity: "quantity",
              image: "product.image",
              price: "product.price",
              currency: "product.currency",
            },
            prepare(select) {
              return {
                title: `${select.product} x ${select.quantity}`,
                subtitle: `Pret: ${select.price * select.quantity}RON`,
                media: select.image,
              };
            },
          },
        }),
      ],
    }),
  ],
});
