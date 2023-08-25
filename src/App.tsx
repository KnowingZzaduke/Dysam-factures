import { useEffect, useState } from "react";
import videoWater from "/onda.mp4";
import imgWater from "/img-water.webp";
import logoDysam from "/Dysam.jpg";
function App() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  useEffect(() => {
    const video = document.createElement("video");
    video.src = videoWater;

    video.onloadeddata = () => {
      setVideoLoaded(true);
    };
  }, []);
  return (
    <div
      className="position-relative d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", overflow: "hidden" }}
    >
      {videoLoaded === true ? (
        <video
          src={videoWater}
          autoPlay
          muted
          loop
          playsInline
          className="position-absolute top-0 left-0 w-100 h-100"
          style={{ objectFit: "cover", zIndex: "-1" }}
        />
      ) : (
        <img
          src={imgWater}
          alt="fondo de agua"
          className="position-absolute top-0 left-0 w-100 h-100"
          style={{ objectFit: "cover", zIndex: "-1" }}
        />
      )}

      <form className="h-50 border border-dark rounded p-5 shadow bg-white">
        <div className="text-center">
          <img src={logoDysam} alt="Lodo Dysam" className="my-3" style={{width: "150px"}}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Usuario
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            Ingresa tu nombre de usuario.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-3">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
