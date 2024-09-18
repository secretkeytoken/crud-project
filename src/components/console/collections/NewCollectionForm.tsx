/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import React, { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Loader2, Save } from "lucide-react";
import { createCollection } from "./_actions/createCollection.action";
import {
  SolanaChain,
  usePublicClient,
  useWallets,
} from "@particle-network/connectkit";
import { transformToVersionedTransaction } from "@/lib/utils";
import { toast } from "sonner";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(500),
  website: z.optional(z.string().url()),
  image: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});
type FormSchemaType = z.infer<typeof formSchema>;

type Props = {
  callbackFn?: () => void;
};
const NewCollectionForm: React.FC<Props> = ({ callbackFn }) => {
  const [primaryWallet] = useWallets();
  const publicClient = usePublicClient<SolanaChain>();
  const [loading, setLoading] = useState(false);
  const refInput = useRef<HTMLInputElement>(null);
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      website: "",
      image: "",
    },
  });

  const imageSelected = form.watch("image");

  const handleSubmit = useCallback(
    async (values: FormSchemaType) => {
      if (!publicClient) return;
      setLoading(true);
      toast.promise(
        new Promise(async (resolve, reject) => {
          try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("description", values.description);
            formData.append("website", "values.website");
            formData.append("image", values.image);
            const wallet = primaryWallet.getWalletClient<SolanaChain>();
            const { transaction } = await createCollection(
              wallet.publicKey.toString(),
              formData
            );

            const signedTx = await wallet.signTransaction(
              transformToVersionedTransaction(transaction)
            );
            const transactionResponse = await publicClient.sendTransaction(
              signedTx
            );

            resolve(transactionResponse);
          } catch (error) {
            reject(error);
          }
        }),
        {
          loading: "Creating collection...",
          success: (res) => {
            console.log("Transaction sent:", res);
            setLoading(false);
            callbackFn?.();
            return `Collection created successfully! tx: ${res}`;
          },
          error: () => {
            setLoading(false);
            return "Failed to create collection.";
          },
        }
      );
    },
    [callbackFn, primaryWallet, publicClient]
  );

  const onUpload = () => {
    refInput?.current?.click();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-5 flex flex-col h-full overflow-auto  border-lightGreen gap-5 rounded-lg"
      >
        <div className="flex-grow">
          <div className="lg:grid lg:grid-cols-3 md:gap-10">
            <div className="lg:col-span-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Collection name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. My collection" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={5}
                        placeholder="e.g. My collection description"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. https://..." {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-5">
              <div className="flex w-60">
                <FormField
                  control={form.control}
                  name="image"
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel>Collection image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          {...fieldProps}
                          className="hidden"
                          accept="image/png, image/jpeg, image/jpg"
                          ref={refInput}
                          onChange={(e) =>
                            onChange(e.target.files && e.target.files[0])
                          }
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {imageSelected ? (
                <div className="size-60 border border-lightGreen border-dashed flex justify-center items-center text-sm bg-lightGreen/10 cursor-pointer hover:bg-lightGreen/30 transition-colors duration-500">
                  <img
                    className="w-full h-full max-w-full object-cover"
                    src={URL.createObjectURL(imageSelected)}
                    alt="collection image"
                  />
                </div>
              ) : (
                <div
                  className="size-60 border border-lightGreen border-dashed flex justify-center items-center text-sm bg-lightGreen/20 cursor-pointer hover:bg-lightGreen/30 transition-colors duration-500"
                  onClick={onUpload}
                >
                  Choose image file
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-none">
          <div className="flex justify-end gap-5">
            <Button type="submit" disabled={loading} size={"lg"}>
              {loading ? (
                <Loader2 className="size-4 mr-2 animate-spin" />
              ) : (
                <Save className="size-4 mr-2" />
              )}
              Save
            </Button>
            <Button type="submit" disabled={loading} size={"lg"}>
              {loading ? (
                <Loader2 className="size-4 mr-2 animate-spin" />
              ) : (
                <Save className="size-4 mr-2" />
              )}
              Save
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default NewCollectionForm;
