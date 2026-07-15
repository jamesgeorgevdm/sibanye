// These two constants are shared between IntroSplash and SiteShell so that
// both sides of the intro handshake use exactly the same key/event name.
//
// INTRO_STORAGE_KEY  — localStorage flag set after the intro plays once.
//                      SiteShell reads it on mount; if it's already 'true'
//                      it skips waiting for the event and reveals the page immediately.
//
// INTRO_COMPLETE_EVENT — custom window event that IntroSplash fires when it
//                        starts fading out, signalling SiteShell to fade in.

export const INTRO_STORAGE_KEY = 'sibanye-intro-seen'
export const INTRO_COMPLETE_EVENT = 'sibanye-intro-complete'
