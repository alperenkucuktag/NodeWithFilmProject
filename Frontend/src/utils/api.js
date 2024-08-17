import axios from "axios";

//*Axiosu kullanmannın en iyi yolu src e utils klasörü oluştur ve veriyi nerde çekmek istiyorsan api.js yi orda kullan
const api = axios.create({
  baseURL: "http://127.0.0.1:5006/api",
});

export default api;
