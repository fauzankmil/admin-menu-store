"use client";

import * as z from "zod";
import axios from 'axios'

import { useState } from "react";
import { useStoreModal } from "@/hooks/use-store-modal";
import Modal from "../ui/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import toast from "react-hot-toast";


const formSchema = z.object({
  name: z.string().min(1),
});


export const StoreModal = () => {
const [loading, setLoading] = useState(false)

  const storeModal = useStoreModal();
  
  // Mengubah 'from' menjadi 'form'
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // TODO: Buat Toko
    try {
      setLoading(true)

      const response = await axios.post("/api/stores", values);

      console.log(response.data);
      toast.success("Berhasil Membuat Toko")
      window.location.assign(`/${response.data.id}`)
    } catch (error) {
      toast.error("Gagal Membuat Toko")
    } finally {
      setLoading(false)
    }
  };
  
  return (
    <Modal
      title="Buat Store"
      description="Tambahkan Store untuk membuat Produk dan kategori"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama Toko" {...field}
                      disabled={loading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button disabled={loading} variant="outline" onClick={storeModal.onClose}>
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">Continue</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
