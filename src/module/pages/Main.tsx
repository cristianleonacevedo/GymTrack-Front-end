import "tailwindcss";
import Navbar from "../../design/molecule/Navbar";
import Botton from "../../design/atomic/Button";
import Banner from "../../design/molecule/Banner";

function Main() {
  return (
    <div>
      <Navbar />
      <Banner />
      <div className="mx-auto  h-100 text-center">
        <b className="text-4xl">GymTrack</b>
        <p>
          este gym es un gym que tiene la mejor calidad <br />
          entre otros gyms claro que si
        </p>
      </div>
    </div>
  );
}

export default Main;
