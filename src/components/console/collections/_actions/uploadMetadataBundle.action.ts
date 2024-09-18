'use server';

import { convertToNftMetadataJson } from "@/lib/utils";

export async function uploadMetadataBundle(formData: FormData) {
    // console.log(formData)
    // const umi = await getUmiServer();
    const metadataFile = formData.get("metadataFile") as File;
    // const mediaFiles = formData.getAll("mediaFiles") as unknown as FileList;
    const metadataJson = await convertToNftMetadataJson(metadataFile);
    console.log({ metadataJson })
    // const umiMetadataFile = await createGenericFileFromBrowserFile(metadataFile);

    // {
    //     umiMediaFilesUrl: [
    //         'https://arweave.net/EPuXBYh7JDpQhMWanmoSq3hfJ1qgCo5CrWHvjpQXAMhn',
    //         'https://arweave.net/Fog1c24ugqZEULVLzSkRDeg2edHw9Y9LnryHau3VcFTB',
    //         'https://arweave.net/5K5ijWRb5WZNyoWZkexwHvPWZwSwdJa2dtzGung4DC9q'
    //     ]
    // }
    // const umiMediaFiles = await Promise.all(
    //     Array.from(mediaFiles).map((file) => createGenericFileFromBrowserFile(file))
    // );


    // console.log({ umiMetadataFile, umiMediaFiles })

    // const umiMediaFilesUrl = await umi.uploader.upload(umiMediaFiles)

    // console.log({ umiMediaFilesUrl })
    return {
        success: true,
        message: "Metadata bundle uploaded successfully.",
        metadataJson
    }
}