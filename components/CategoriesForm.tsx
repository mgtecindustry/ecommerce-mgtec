"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Category } from "@/sanity.types";
import { useEffect } from "react";

const FormSchema = z.object({
  categories: z.array(z.string()),
});

interface CheckboxReactHookFormMultipleProps {
  categories: Category[];
  onCategoriesChangeAction: (categories: string[]) => void;
}

export function CheckboxReactHookFormMultiple({
  categories,
  onCategoriesChangeAction,
}: CheckboxReactHookFormMultipleProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      categories: [],
    },
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.categories) {
        const validCategories = value.categories.filter(
          (category): category is string => category !== undefined
        );
        onCategoriesChangeAction(validCategories);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onCategoriesChangeAction]);

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="categories"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Categories</FormLabel>
                <FormDescription>
                  Select the categories you want to include.
                </FormDescription>
              </div>
              {categories.map((category) => (
                <FormField
                  key={category._id}
                  control={form.control}
                  name="categories"
                  render={({ field }) => (
                    <FormItem
                      key={category._id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(category._id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([...field.value, category._id]);
                            } else {
                              field.onChange(
                                field.value?.filter(
                                  (value) => value !== category._id
                                )
                              );
                            }
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {category.title || "Untitled"}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
