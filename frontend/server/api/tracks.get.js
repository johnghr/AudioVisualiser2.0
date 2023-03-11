import fs from "node:fs";
import { getAudioDurationInSeconds } from "get-audio-duration";

export default defineEventHandler(async (event) => {
  const directoryPath = `${process.cwd()}/server/api/uploads`;

  const generateFiles = async () =>
    await fs.promises
      .readdir(directoryPath, (error, files) => files)
      .catch((error) => console.log(error));

  const files = await generateFiles();

  const generateTracks = async () => {
    const promises = files.map((file) =>
      getAudioDurationInSeconds(`${directoryPath}/${file}`).then((duration) => {
        const minutes = Math.floor(duration / 60);
        const seconds = Math.round(duration - minutes * 60);
        return {
          title: file,
          duration: `${minutes}:${seconds}`,
          seconds: Math.round(duration),
        };
      })
    );
    return Promise.all(promises);
  };

  return await generateTracks();
});
