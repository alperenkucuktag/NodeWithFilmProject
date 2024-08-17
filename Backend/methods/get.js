const fs = require("fs").promises;
const path = require("path");
const url = require("url");

module.exports = async (req, res) => {
  try {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const baseUrl = pathname.substring(0, pathname.lastIndexOf("/"));
    const id = pathname.split("/")[3];

    console.log(id);
    console.log(baseUrl);

    if (pathname === "/api/movies") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");

      const movies = await fs.readFile(
        path.join(__dirname, "../data/movies.json"),
        "utf-8"
      );

      res.end(movies);
    } else if (baseUrl === "/api/movies" && id) {
      const data = JSON.parse(
        await fs.readFile(path.join(__dirname, "../data/movies.json"), "utf-8")
      );

      const movie = data.movies.find((movie) => movie.id === id);
      console.log(movie);

      if (movie) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(movie));
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Geçersiz id");
      }
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Yol bulunmadı");
    }
  } catch (error) {
    console.error("Sunucu hatası:", error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Sunucu hatası");
  }
};

// const fs = require("fs").promises;
// const path = require("path");

// /*
// Eğerki clent'tan gelen istek
// *"/api/movies" > adresine gelirse bütün filmleri gönder
// *"/api/movies/10" > adresine gelirse url'in sonundaki id değerine göre filmi gönder

// */

// module.exports = async (req, res) => {

//   //??YAPILAN İSTEĞİN BASEURL'İ
//   console.log(req.url);
//   //*Substring string olan verileri 0 veya 10 gibi vb kesmeye yarar sadece /api/movie aldı postmanda /api/movie(20 yazdığımızda doğru sonucu aldık)
//   //*Ama eğer sUBSTRİNG İN İÇİNDE SON slaştan sonraki karakterleri getir diyorsak LastIndexOf kullanırız
//   //*baseurl için lastındexof kullanılır sabit
//   const baseUrl = req.url.substring(0, req.url.lastIndexOf("/"));
//   //url'nin sonundaki id değerini bir deiğşkene atar ardından bir diziye atar split
//   const id = req.url.split("/")[3];
//   console.log(id);
//   console.log(baseUrl);
//   if (req.url == "/api/movies") {
//     //*1- durum kodu belirle

//     res.statusCode = 200;

//     //*2-Headerları belirle

//     res.setHeader("Content-Type", "application/json");

//     //*3-Json dosyasından bütün filmleri al
//     const movies = fs.readFileSync(
//       path.join(__dirname, "../data/movies.json"),
//       "utf-8"
//     );

//     //*4- Client'a cevapları gönder

//     return res.end(movies);
//   } else if (baseUrl === "/api/movies" && id) {
//     //*1-Bütün filmleri al(javascript ) formatında.

//     const data = JSON.parse(
//       fs.readFileSync(path.join(__dirname, "../data/movies.json"), "utf-8")
//     );

//     //!Uyarı bir başka işlemi kontrol ederken bir önceki console.log() u "SİL"
//     // console.log(data); //*İstek gönder Terminali kontrol et id ve diğerlerinin başında tırnak işareti yoksa Javascript formatına dönmüş demektir
//     //*2-Url'e eklenen  id'ye  karşılık gelen filmi dizide bul(Find metodunu kullan bunun için url deki id ile burdaki json verisinin id aynı olması gerekiyor)
//     //*MOVİE.JSON DAN İD Yİ AL POSTMAN DE EN DIŞ SLASH IN YANINA YAPIŞTIR DENE
//     //* data movies.json dosyasındaki en dış parantez yani object
//     const movie = data.movies.find((movie) => movie.id === id);
//     console.log(movie);
//     if (movie) {
//       //*3-Eğerki film bulunursa client'a gönder
//       //*Hem status kodunu hemde headerı belirlememizi sağlayan writehead metodunu kullanırız
//       res.writeHead(200, { "Content-Type": "application/json" });
//       //*Client'a cevap gönderirken JSON.parse(javascript) formatında olan datayı tekrar Json stringfy(string) formatına çeviririz
//       res.end(JSON.stringify(movie));
//     } else {
//       //*4-Film bulunamazsa client'a hata gönder
//       return res.end("Geçersiz ıd");
//     }

//     return res.end("Sadece 1 filmi gönder");
//   } else {
//     return res.end("Yol bulunmadı");
//   }
// };
