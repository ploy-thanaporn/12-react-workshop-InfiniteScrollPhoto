import { useEffect, useState } from "react";
import "./App.css";
import Photo from "./components/Photo";

function App() {
  const apiKey = `iRrHU49bumESauVqWWOdfLC5GglBPjokFLeLOskJcKA`;
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fecthImage = async () => {
    setIsLoading(true);
    try {
      const apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&page=${page}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setPhotos((oldData) => {
        return [...oldData, ...data];
      });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fecthImage();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.scrollY >
          document.body.offsetHeight - 500 &&
        !isLoading
      ) {
        setPage((oldPage) => {
          return oldPage + 1;
        });
      }
    });
    return () => window.removeEventListener("scroll", event);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <h1>Infinie Scoll Photo | Unsplash API</h1>
      <section className="photos">
        <div className="display-photo">
          {photos.map((photo, index) => {
            return <Photo key={index} {...photo} />;
          })}
        </div>
      </section>
    </div>
  );
}

export default App;

// js ทำงานแบบ asynchronous ไม่มีกระบวนการรอ มันจะข้ามขั้นตอนไปเลย
