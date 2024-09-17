/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import React, { useCallback, useRef } from "react";
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
import useUmi from "@/hooks/useUmi";

import { createGenericFileFromBrowserFile } from "@metaplex-foundation/umi";

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
  // const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const refInput = useRef<HTMLInputElement>(null);
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      website: "https://yourwebsite.com",
      image: "",
    },
  });
  const umi = useUmi();
  const handleSubmit = useCallback(
    async (values: FormSchemaType) => {
      console.log(values);
      const file = await createGenericFileFromBrowserFile(values.image);
      console.log(file);
      const x = await umi.uploader.upload([file]);
      console.log(x);
      callbackFn?.();
    },
    [callbackFn, umi.uploader]
  );

  const onUpload = () => {
    refInput?.current?.click();
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e?.target?.files?.[0];
  //   if (!file) return;
  //   setImageFile(file);
  //   const urlImage = URL.createObjectURL(file);
  //   console.log({ file, urlImage });
  // };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-5 flex flex-col h-full overflow-auto border ms:p-5 md:p-10 gap-5"
      >
        <div className="flex-grow">
          <div className="md:grid md:grid-cols-2 md:gap-10">
            <div>
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
                          placeholder="e.g. https://..."
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
              {form.getValues("image") ? (
                <div className="size-60 border border-lightGreen border-dashed flex justify-center items-center text-sm bg-lightGreen/10 cursor-pointer hover:bg-lightGreen/30 transition-colors duration-500">
                  <img
                    className="w-full h-full max-w-full object-cover"
                    src={URL.createObjectURL(form.getValues("image"))}
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
        <div className="flex-none border-t">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
};

export default NewCollectionForm;
