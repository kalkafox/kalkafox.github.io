import type { Dispatch, SetStateAction } from 'react'

export const setImageLoaded = (
  image: string,
  setLoadedImages: Dispatch<SetStateAction<string[]>>,
) => {
  setLoadedImages((loadedImages) => [...loadedImages, image])
}
