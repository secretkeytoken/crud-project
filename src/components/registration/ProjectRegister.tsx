'use client';

import React from 'react';
import { useForm, Resolver } from 'react-hook-form';
import { UploadButton } from '@/utils/uploadthing';
import MarkDownEditor from './MarkDownEditor';
import NationSelector from './NationSelector';
import Image from 'next/image';
import { useCallback } from 'react';

type FormValues = {
  projectName: string;
  name: string;
  urlImage: string;
  nation: string;
  describle: string;
};

type ValidateForm = {
  projectName: {
    type: string;
    message: string;
  };
  name: {
    type: string;
    message: string;
  };
  urlImage: {
    type: string;
    message: string;
  };
  nation: {
    type: string;
    message: string;
  };
  describle: {
    type: string;
    message: string;
  };
};

const validateForm = (values: FormValues) => {
  const temp: ValidateForm = {
    projectName: {
      type: '',
      message: '',
    },
    name: {
      type: '',
      message: '',
    },
    urlImage: {
      type: '',
      message: '',
    },
    nation: {
      type: '',
      message: '',
    },
    describle: {
      type: '',
      message: '',
    },
  };

  Object.keys(values).forEach((key: string) => {
    if (!values[key as keyof ValidateForm]) {
      temp[key as keyof ValidateForm].type = 'required';
      temp[key as keyof ValidateForm].message = `Please enter your ${key}`;
    }
  });

  if (
    !values.projectName ||
    !values.name ||
    !values.urlImage ||
    !values.nation ||
    !values.describle
  ) {
    return temp;
  } else {
    return {};
  }
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values,
    errors: validateForm(values),
  };
};

export default function ProjectRegister() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver,
    defaultValues: {
      urlImage: '',
      nation: '',
      describle: '',
    },
  });
  const onSubmit = handleSubmit((data) => console.log(data));
  const [imageData, setImageData] = React.useState('');

  const handleSelectNation = useCallback(
    (nation: string) => {
      setValue('nation', nation, { shouldValidate: true, shouldDirty: true });
    },
    [setValue]
  );

  const handleDescrible = useCallback(
    (text: string) => {
      setValue('describle', text, { shouldValidate: true, shouldDirty: true });
    },
    [setValue]
  );

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5 justify-center items-center border border-lightGreen border-dashed text-sm bg-lightGreen/10 hover:bg-lightGreen/30 transition-colors duration-500 rounded-lg w-full h-full min-h-80"
    >
      <div className="w-11/12">
        <label className="leading-loose text-left block mb-3.5 mt-5 text-white font-extralight text-sm">
          Project Name
        </label>
        <input
          {...register('projectName')}
          placeholder="Enter your project name"
          className="d-block text-sm box-border mb-2.5 py-2.5 px-4 w-11/12 border border-lightGreen border-dashed rounded"
        />
        {errors?.projectName && <p>{errors.projectName.message}</p>}
      </div>
      <div className="w-11/12">
        <label className="leading-loose text-left block mb-3.5 mt-5 text-white font-extralight text-sm">
          Your Name
        </label>
        <input
          {...register('name')}
          placeholder="Enter your name"
          className="d-block text-sm box-border mb-2.5 py-2.5 px-4 w-11/12 border border-lightGreen border-dashed rounded"
        />
        {errors?.name && <p>{errors.name.message}</p>}
      </div>
      <div className="flex items-start w-11/12">
        <div className="grid grid-cols-1 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-gray-500 tracking-wide">
              Attach Image
            </label>
            {imageData && (
              <button
                type="button"
                onClick={() => {
                  setImageData('');
                  setValue('urlImage', '', {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                className="py-1 px-3 focus:outline-none hover:bg-gray-200"
              >
                + edit image
              </button>
            )}
          </div>
          {imageData ? (
            <div className="col-span-6 sm:col-span-4 shadow">
              <Image
                src={imageData}
                alt="productImage"
                width="1000"
                height="100"
                className="object-cover w-full h-[250px]"
              />
            </div>
          ) : (
            <div>
              <UploadButton
                endpoint="imageUploader"
                className="self-start"
                onClientUploadComplete={(url) => {
                  // Do something with the response
                  console.log('files', url);
                  setImageData(url?.[0].url);
                  setValue('urlImage', url?.[0].url, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });

                  window.alert('Upload completed');
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
              />
              {errors?.urlImage && (
                <p className="mt-2.5">{errors?.urlImage.message}</p>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-start w-11/12">
        <MarkDownEditor onChange={handleDescrible} />
        {errors?.describle && (
          <p className="mt-2.5">{errors?.describle.message}</p>
        )}
      </div>
      <div className="flex flex-col items-start w-11/12">
        <NationSelector
          data={['VietNammese', 'United State']}
          onChange={handleSelectNation}
        />
        {errors?.nation && <p className="mt-2.5">{errors?.nation.message}</p>}
      </div>
      <input
        type="submit"
        className="cursor-pointer bg-darkGreen text-white uppercase border-none my-10 p-5 text-base tracking-wider font-thin rounded w-11/12"
      />
    </form>
  );
}
