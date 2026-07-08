import createImageUrlBuilder, {
  type SanityImageSource,
} from "@sanity/image-url";

import { dataset, projectId } from "@/sanity/env";

const builder = createImageUrlBuilder({ projectId, dataset });

/** Build a Sanity CDN image URL from an image field, e.g. urlFor(image).width(1600). */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
