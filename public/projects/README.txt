Project cover images
====================

Save your 5 project screenshots into THIS folder using these EXACT file names
(all lowercase, .png). The site reads them at /projects/<name>.png.

  adscular.png         -> Adscular (performance marketing agency screenshot)
  elevo.png            -> Elevo (the "Live Greener" green serum screenshot)
  student-portal.png   -> Student Portal (the space "STUDENT PORTAL" login)
  gym.png              -> GYM (the "Welcome back" workout sign-in)
  minigames.png        -> MiniGames Hub (the "MINI GAMES HUB" screen)

After adding the files:
  1. Restart the dev server (npm run dev) so they are served.
  2. In /admin, click "Seed sample projects" once to attach the covers
     (it only sets a cover where one is not already set).

Tip: if you saved an image as .jpg, either rename it to .png or update the
matching coverImage path in src/content/cv.ts to use .jpg.
