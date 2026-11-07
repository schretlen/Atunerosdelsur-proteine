FONTS
=====
The site loads its three typefaces from Google Fonts in each page <head>:

  Plus Jakarta Sans  — display / headings
  IBM Plex Sans      — body copy
  IBM Plex Mono      — labels, data, eyebrows

To self-host (recommended for production or offline use):
1. Download the families from https://fonts.google.com
2. Place the .woff2 files in this folder.
3. Replace the Google Fonts <link> tags in every HTML page with a local
   @font-face block added at the top of css/style.css, e.g.

   @font-face {
     font-family: 'Plus Jakarta Sans';
     src: url('../assets/fonts/PlusJakartaSans-ExtraBold.woff2') format('woff2');
     font-weight: 800;
     font-display: swap;
   }
