import React from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import Hero from "../components/Hero";
import Loader from "../components/Loader";
import Card from "../components/Card";
import Error from "../components/Error";

//*TanStack query i axios ve fetch gibi isteklerin kod kalabalığını kısaltmak için kullanırız
//*state ile loading ve data kurmayı Tanstack kendsi yapıyor ve sürekli istek atıp durur otomatik şekilde
//KuLLANIMI AŞAĞIDADIR
const Main = () => {
  //127.0.0.1:5006/api/movies

  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: () => api.get("/movies").then((res) => res.data),
  });

  console.log(data);

  //* Error ün sebebi Cors hatasıdır yani(cross origin resourch sharing=Farklı adreslerden kaynak paylaşma)
  //*İki farklı domain arasında kaynak paylaşımı yapmaya çalıştığımızdan dolayı hata veriyor üzerinde çalıştığımız domain http://localhost:5173/  ama api'mız http://127.0.0.1:5006/api adresinde

  //! Çözüm:Backendden veriyi gönderirken doğru header'ı eklemelisin backend dosyasında
  //* Backend klasöründe server.js e git header yaz

  //*Hero dosyası tamamen görsel olucak
  return (
    <div>
      <Hero />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <div className='p-4 grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
          {data.movies.map((movie, key) => (
            <Card movie={movie} key={key} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Main;
