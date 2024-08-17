const http = require("http");
const getRequest = require("./methods/get");
const deleteRequest = require("./methods/delete");
const postRequest = require("./methods/post");

// 1- Server oluştur
const Server = http.createServer((req, res) => {
  console.log(
    ">>>>>>>>>>>>>>>>>İSTEK GELDİ :D:D<<<<<<<<<<<<<<<<<<<<",
    req.method
  );
  //*Frontende gönderilecek bütün cevaplara eklenicek ve Cors hatasnı
  //*Engelliyecek Header:

  res.setHeader("Access-Control-Allow-Origin", "*");
  //*Yukarda(setHeader) bütün domain adreslerinden gelicek olan istekleri kabul et demiş oluyoruz

  //* İstek atılan method türüne göre client'a cevap verecek fonksiyonu belirledik.
  // Fonksiyonları module yapısı sayesinde kod kalabalığı olmaması için ayrı
  // dosyalarda tamamladık
  // req ve res response parantez içlerine yaz yok istekten cevap alamazsın

  switch (req.method) {
    //*Frontend'den bir post/put/patch/delete isteği atıldığı zaman
    //*tarayıcı öncelikle server'ın bu istek tiplerini kabul ettiğini
    //*kontrol etmek amacıyla options methoduyla istek atıyor
    //*Eğer  options isteği gelince cevap göndermezsek diğer isteği hiç atmıyor
    //*Ama options gelince  doğru headerlar ile cevap verirsek options'ın ardından asıl isteği gönderiyor
    case "OPTIONS":
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, PUT, PATCH, OPTIONS"
      );
      //*BÖYLECE CORS HATASI ÇÖZÜLMÜŞ OLUYOR
      res.end();
      break;
    case "GET":
      return getRequest(req, res);
    case "POST":
      return postRequest(req, res);
    case "DELETE":
      return deleteRequest(req, res);

    //*Status kod varsayılan olarak 200 olarak geliyor bunu bizm değiştirmemiz gerekiyor 404 yapmamız gerekiyor
    default:
      // Cevabın içeriğini belirlememizi sağladı

      //Gönderdiğimiz veri tipini clienttın haberi olması gerekir ve eğer sayfa bulunamışsa 404 hatası vermesini sağlamalıyız
      // Cevabın status kodunu belirleme
      res.statusCode = 404;
      //Gönderilecek cevaba içeriğin tipini headers olarak ekle
      //Content type'ını json çevirdik headerı değişti send yaptığımızda json veri tipi cevap döncek
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify({ message: "Sayfa Bulunmadı" }));
      //* Cevabı client a göndermemizi yarar
      res.end();
  }
});

// 2- Belirli porta gelen istekleri dinle
const port = 5006;

Server.listen(port, () => {
  console.log(`Server ${port} portunda dinleniyor...`);
});
