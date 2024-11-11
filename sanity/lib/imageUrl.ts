import  ImageUrlBuilder  from "@sanity/image-url";
import { client } from "./client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = ImageUrlBuilder(client);

export function imageUrl(source: SanityImageSource){
return builder.image(source);
}