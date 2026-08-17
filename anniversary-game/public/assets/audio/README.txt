HOW TO ADD REAL SONGS
=====================

1. Get the audio file (.mp3 or .m4a) for each song.
2. Drop it in this folder. Short, memorable filenames are easiest:

     die-with-a-smile.mp3
     sailor-song.mp3
     those-eyes.mp3

3. Open  src/data/relationshipData.ts  and find the `soundtrack` array.
   For each track, fill in the `audio` field with the path:

     {
       id: 's1',
       title: 'Die With A Smile',
       artist: 'Bruno Mars & Lady Gaga',
       why: 'your reason here',
       audio: 'assets/audio/die-with-a-smile.mp3',   <-- this line
     },

4. That's it. A player appears under the track automatically.
   Nothing autoplays; Anay has to press play.

NOTES
- Keep files reasonably small (a 4-minute MP3 at 128kbps is ~4 MB).
  The whole site should stay light enough to open quickly on mobile.
- These are copyrighted songs, so keep the site private/unlisted
  rather than publishing it publicly.
- If you would rather not host the audio, an alternative is to put a
  Spotify/YouTube link in the `why` text instead.
