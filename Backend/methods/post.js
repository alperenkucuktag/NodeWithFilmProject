const bodyParser = require("../utils/bodyParser");
const crypto = require("crypto");
const fs = require("fs");
//*Backend kısmındaki uuid için npm paketi indirmemize gerek yok crypto metodunu random UUId metodunu kullanabiliriz

module.exports = async (req, res) => {
  if (req.url == "/api/movies") {
    try {
      //*1-iSTEĞİN BODY KISMINA ERİŞ.
      const body = await bodyParser(req);
      //*2-EKSİK İÇERİK VAR MI KONTROL ET VARSA HATA YOLLA
      if (
        !body.title ||
        !body.year ||
        !body.rating ||
        !body.genre ||
        !body.genre.length > 0
      ) {
        res.writeHead(404);
        res.end("LÜTFEN BÜTÜN ALANLARI TAMAMLAYIN");

        return;
      }

      //*3-KAYDEDİLECEK FİLME ID EKLE
      body.id = crypto.randomUUID();
      //*4-JSON DOSYASINDAKİ BÜTÜN VERİLERİ AL(JAVASCRİPT FORMATINDA)
      // console.log(body); //*Postmande post isteği at sonra id hemen terminalde belircektir
      let data = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));
      data = JSON.parse(data);

      //*5-MEVCUT FİLMLERİN ÜZERİNE YENİ FİLMLERİ EKLE
      console.log(data);
      data.movies.push(body);

      //*6-JSON DOSYASINI GÜNCELLE
      fs.writeFileSync("./data/movies.json", JSON.stringify(data));

      //*7-CLİENT'A CEVAP GÖNDERİCEZ VE İŞLEM BİTİCEK
      res.writeHead(201, { "Content-Type": "Application/json" });
      return res.end(JSON.stringify(body));
    } catch (error) {
      return res.end("HATA OLUŞTU");
    }
  }
};
