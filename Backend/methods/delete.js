const fs = require("fs");

module.exports = async (req, res) => {
  //İstek atılan temel adres
  const baseUrl = req.url.substring(0, req.url.lastIndexOf("/"));

  //Url'in sonundaki id'y, al
  const id = req.url.split("/")[3];

  if (baseUrl === "/api/movies" && id) {
    //bütün filmleri al
    const data = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));
    //id'li film dizide ara
    const isFound = data.movies.find((i) => i.id == id);

    //dizide id'si bilinen eleman yoksa hata yolla
    if (!isFound) {
      res.writeHead(404);
      return res.end("ID GEÇERSİZ");
    }
    console.log(data, id);

    //diziden id'si  bilinen elemanı kaldır
    const filtred = data.movies.filter((item) => item.id != id);
    //json dosyasına yeni diziyi aktar
    fs.writeFileSync("./data/movies.json", JSON.stringify({ movies: filtred }));
    //client'a cevap gönder
    res.writeHead(204, { "Content-Type": "application/json" });
    return res.end();
  } else {
    res.writeHead(404);
    return res.end("Yol Bulunamadı");
  }
};
