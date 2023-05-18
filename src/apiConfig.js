const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "7778c33282d698526c38c8b3d1ec126f",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
