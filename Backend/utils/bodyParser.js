module.exports = (request) => {
  return new Promise((resolve, reject) => {
    try {
      //*1-Fonksiyonun göndericeği cevabı tanımla
      //*2-Backend den client'a veriler parça gider biz herbir veri parçasına "chunck deriz"
      //*3-isteğin içerisindeki verileri "on" metodu ile okuruz
      let body = "";
      //*Frontend'den body'nin herparçası gelidğinde onu al ve yukarıdaki değişkene ekle
      request.on("data", (chunck) => {
        //*Chunck ları body'e yükleyip verileri birleştiriyoruz ve postmanden istek gönderiyoruz (Postmande raw kısmında) yazdığımız verileri
        body += chunck;
      });

      //*Yüklenme bittiğinde json verisini javascript verisine çevir
      request.on("end", () => {
        //*Jsonparse metodu ile body 'i javascript formatına çeviriyoruz tarayıcıda gözükmesi için
        //*Postmanden istek gönder

        //*Fonksiyonu çağrıldığı yere body kısmını return ediyoruz
        resolve(JSON.parse(body));
      });
    } catch (error) {
      //*Hata oluşursa hatyı döndür
      reject(error);
    }
  });
};
