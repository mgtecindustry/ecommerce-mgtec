"use client";

import formSchema from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { defaultValues } from "@/lib/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CheckoutStore } from "@/store/checkoutStore";
import { useToast } from "@/hooks/use-toast";

export function CheckoutForm({
  onFormSubmitAction,
}: {
  onFormSubmitAction: () => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const { toast } = useToast();
  const isFormComplete = () => {
    const values = form.getValues();
    return (
      values.nume?.trim() &&
      values.telefon?.trim() &&
      values.email?.trim() &&
      values.adresa?.trim() &&
      values.oras?.trim() &&
      values.codPostal?.trim() &&
      values.judet?.trim()
    );
  };
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    CheckoutStore.getState().setFormData(values);
    localStorage.setItem("formData", JSON.stringify(values));
    toast({
      title: "Detalii de livrare salvate",
      description: "Detalii de livrare salvate cu succes",
    });
    onFormSubmitAction();
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nume</FormLabel>
              <FormControl>
                <Input placeholder="Introduceți numele complet" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="telefon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefon</FormLabel>
              <FormControl>
                <Input
                  placeholder="Introduceți numărul de telefon"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Introduceți emailul" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="adresa"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresa</FormLabel>
              <FormControl>
                <Input
                  placeholder="Strada, număr, bloc, scară, apartament"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="judet"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Judet</FormLabel>
              <FormControl>
                <Input placeholder="Introduceți județul" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="oras"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Oras</FormLabel>
              <FormControl>
                <Input placeholder="Introduceți orașul" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="codPostal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cod Postal</FormLabel>
              <FormControl>
                <Input placeholder="Introduceți codul poștal" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={!isFormComplete()}
          className="bg-blue-500 hover:bg-blue-700"
        >
          Salveaza detalii de livrare
        </Button>
      </form>
    </Form>
  );
}
