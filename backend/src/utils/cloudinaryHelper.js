export const getPublicIdFromUrl = (url) => {
  const parts = url.split("/");
  const filename = parts.pop(); // image.jpg
  const folder = parts.slice(parts.indexOf("upload") + 1).join("/");
  const publicId = folder + "/" + filename.split(".")[0];

  return publicId;
};
