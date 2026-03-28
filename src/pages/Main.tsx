import "tailwindcss"
import Navbar from "../components/molecule/Navbar";
import Botton from "../components/atomic/Button"
import Banner from "../components/molecule/Banner";

function Main() {
    return(
        
        <div className="pt-16">
            <Banner />
            <Navbar />
            <div className="mx-auto  h-100 text-center">
                
                <b className="text-4xl">GymTrack</b>
                <p>este gym es un gym que tiene la mejor calidad <br />entre otros gyms claro que si</p>
            </div>
        </div>
    )
}

export default Main;