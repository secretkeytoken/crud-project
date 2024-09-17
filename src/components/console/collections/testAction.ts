'use server';

import { getUmiServer } from "@/lib/umi";
import { transformIrysUrl } from "@/lib/utils";
import { createGenericFileFromBrowserFile } from "@metaplex-foundation/umi";

export async function testAction(formData: FormData) {
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

    console.log({ imageUrl, uri: transformIrysUrl(uri) });
    return { success: true };
}