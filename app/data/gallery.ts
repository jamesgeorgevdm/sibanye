// All gallery content lives here — images and videos.
// To add a photo: drop the file into public/images/gallery/life/ or /events/
// and add a new imagePath() call to the relevant album's images array below.
// To add a video: put the .mp4 in public/images/gallery/videos/ and add an
// entry to videoShowcase.videos (there's a commented example at the bottom).

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
  /** Short description used on-page and for VideoObject structured data (SEO). */
  description?: string
  /** ISO 8601 date the video was recorded/uploaded — required by Google's VideoObject. */
  uploadDate?: string
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
    {
      src: '/images/gallery/videos/classical-music-rhythm-little-ones.mp4',
      title: 'Little Ones: Classical Music Rhythm Exercise',
      poster: '/images/gallery/videos/Thumbnail_Classical.webp',
      description:
        'An age-appropriate rhythm activity that helps our youngest learners build attention, listening skills, and early musical and aural awareness.',
      uploadDate: '2024-11-01',
    },
    {
      src: '/images/gallery/videos/tchaikovsky-rhythm-game-little-ones.mp4',
      title: 'Little Ones: Tchaikovsky Rhythm Game',
      poster: '/images/gallery/videos/Thumbnail_Tchaikovsky.webp',
      description:
        'A higher-level rhythm game that adds body percussion, closer synchronisation with the beat, and quick adaptation between instruments.',
      uploadDate: '2024-11-01',
    },
    {
      src: '/images/gallery/videos/kheti-no-one-alicia-keys.mp4',
      title: 'Piano Learner: “No One” by Alicia Keys',
      poster: '/images/gallery/videos/Thumbnail_Kheti.webp',
      description:
        "A solo voice-and-piano performance showcasing one learner's grasp of chords and voicing while singing and playing at the same time.",
      uploadDate: '2024-11-01',
    },
    {
      src: '/images/gallery/videos/your-song-older-class.mp4',
      title: 'Older Class: Your Song',
      poster: '/images/gallery/videos/Thumbnail_YourSong.webp',
      description:
        'A vocal ensemble piece that nurtures social bonding, musical give-and-take, and memory through learning and performing the lyrics together.',
      uploadDate: '2024-11-01',
    },
    {
      src: '/images/gallery/videos/johnny-clegg-medley.mp4',
      title: 'Combined Classes: Johnny Clegg Medley',
      poster: '/images/gallery/videos/Thumbnail_Johnny.webp',
      description:
        'A combined-class medley showcasing our learners adapting to shifting styles and tempos, with an added body-percussion element.',
      uploadDate: '2024-11-01',
    },
  ],
}
