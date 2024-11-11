import { TrolleyIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export const productType = defineType({
    name: "product",
    title: "Products",
    type: "document",
    icon: TrolleyIcon,
    fields: [
      defineField({
        name: "name",
        title: "Product name",
        type: "string",
        validation: (Rule) => Rule.required(),
      }) ,
      defineField({
        name: "slug",
        title: "slug",
        type: "slug",
        options: {
            source: "name",
            maxLength: 96,
        },
        validation: (Rule) => Rule.required(),
      }),

      defineField({
        name: "image",
        title: "Product image",
        type: "image",
            options:{
                hotspot: true,
            },
      }),

      defineField({
        name: "description",
        title: "description",
        type: "blockContent",
      }),

      defineField({
        name: "price",
        title: "Price",
        type: "number",
        validation: (Rule) => Rule.required().min(0),
        
      }),
      defineField({
        name: "currency",
        title: "Currency",
        type: "string",
        options: {
          list: [
            { title: "USD", value: "USD" },
            { title: "EUR", value: "EUR" },
            { title: "GBP", value: "GBP" },
            // Add more currencies as needed
          ],
        },
        initialValue: "USD", // Default currency if you like
        validation: (Rule) => Rule.required(),
      }),

      defineField({
        name: "categories",
        title: "Categories",
        type: "array",
        of: [{type: "reference", to: {type: "category"}}],
      }),
      defineField({
        name: "stock",
        title: "Stock",
        type: "number",
        validation: (Rule) => Rule.min(0)
      }),
    ],

    preview: {
        select: {
            title: "name",
            media: "image",
            price: "price",

    },

        prepare(select) {
            return {
                title: select.title,
                subtitle: `${select.price}`,
                media: select.media,
            };
        },
    },
})