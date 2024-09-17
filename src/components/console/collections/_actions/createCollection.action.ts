'use server';

import { makeCreateCollectionInstruction } from "@/lib/contracts/agrotree.contract";
import { getUmiServer } from "@/lib/umi";
import { transformIrysUrl } from "@/lib/utils";
import { BN } from "@coral-xyz/anchor";
import { createGenericFileFromBrowserFile } from "@metaplex-foundation/umi";
import { randomBytes } from "tweetnacl";

export async function createCollection(creator: string, formData: FormData) {
    const umi = await getUmiServer();
    const image = formData.get('image') as File;
    const file = await createGenericFileFromBrowserFile(image);
    const [collectionImage] = await umi.uploader.upload([file], {
        onProgress: (percent) => {
            console.log(`${percent * 100}% uploaded...`);
        },
    });

    const imageUrl = transformIrysUrl(collectionImage)

    const uri = await umi.uploader.uploadJson({
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        website: formData.get('website') as string,
        image: imageUrl,
        attributes: [{
            trait_type: 'Rarity',
            value: 'Legendary',
        }, {
            trait_type: 'Type',
            value: 'Collection',
        }],
    })
    const seed = new BN(randomBytes(8));
    const transaction = await makeCreateCollectionInstruction({
        collectionId: seed.toString(),
        creator,
        name: formData.get('name') as string,
        uri: transformIrysUrl(uri),
    })

    console.log({ imageUrl, uri: transformIrysUrl(uri) });
    return { success: true, transaction };
}