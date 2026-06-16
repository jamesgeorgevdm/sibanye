export type GalleryImage = {
  src: string
  alt: string
}

export type GalleryAlbum = {
  id: string
  title: string
  description: string
  images: GalleryImage[]
}

export type GalleryVideo = {
  src: string
  title: string
  poster?: string
}

export type VideoShowcase = {
  id: string
  title: string
  description: string
  videos: GalleryVideo[]
}

function imagePath(folder: 'life' | 'events', filename: string, alt: string): GalleryImage {
  return {
    src: `/images/gallery/${folder}/${filename}`,
    alt,
  }
}

export const galleryAlbums: GalleryAlbum[] = [
  {
    id: 'life-at-sibanye',
    title: 'Life at Sibanye',
    description: 'Everyday moments of learning, friendship, and growth.',
    images: [
      imagePath('life', 'sibanye_play_outside.jpg', 'Children playing outside'),
      imagePath('life', 'sibanye_lilitha_piano.jpg', 'Lilitha at the piano'),
      imagePath('life', 'sibanye_ceramic_bowl.jpg', 'Ceramic bowl artwork'),
      imagePath('life', 'sibanye_motor_exercise.jpg', 'Motor skills exercise'),
      imagePath('life', 'sibanye_art_heart.jpg', 'Heart art project'),
      imagePath('life', 'sibanye_mosaic.jpg', 'Mosaic artwork'),
      imagePath('life', 'sibanye_littleplay_outside.jpg', 'Little ones playing outdoors'),
      imagePath('life', 'sibanye_dad_art.jpg', 'Art with dad'),
      imagePath('life', 'sibanye_building_side.jpg', 'Sibanye building'),
      imagePath('life', 'sibanye_aidan_mosaic.jpg', 'Aidan with mosaic art'),
    ],
  },
  {
    id: 'events',
    title: 'Events & Celebrations',
    description: 'Special days, outings, and milestones we share together.',
    images: [
      imagePath('events', 'sibanye_christmas_joanne.jpg', 'Christmas with Joanne'),
      imagePath('events', 'sibanye_homeleigh.jpg', 'Homeleigh outing'),
      imagePath('events', 'sibanye_hemeleigh_bus.jpg', 'Hemeleigh bus trip'),
    ],
  },
]

/** Add .mp4 files under public/images/gallery/videos/ and list them here */
export const videoShowcase: VideoShowcase = {
  id: 'video-showcase',
  title: 'Video Showcase',
  description: 'Watch highlights from life at the centre.',
  videos: [
    // { src: '/images/gallery/videos/example.mp4', title: 'Centre highlights', poster: '/images/gallery/life/sibanye_play_outside.jpg' },
  ],
}
