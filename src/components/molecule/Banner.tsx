import "tailwindcss"
import Button from "../atomic/Button";
import { Link } from "react-router-dom"
import AgnesTachyon from "../images/AgnesTachyon1.jpg"


function Banner() {

    return(
        <section id="Banner" style= {{ backgroundImage:`url(${AgnesTachyon})`}}className="h-screen flex flex-col justify-center items-center text-center 
        bg-cover bg-center min-h-screen text-black">

            <h1 className="text-5xl font-bold mb-4">
                Donde el flow se entrena
            </h1>

            <p className="mb-6 text-lg">
                Sin excusas, solo progreso, esfuerzo y dedicación <br />
                y proteina
            </p>

            <Link to="/Register">
                <Button text="Registrate!">
            </Button>
            </Link>
        </section>
    )

}

export default Banner;