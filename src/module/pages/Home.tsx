import "tailwindcss";
import { useEffect, useState } from "react";
import { Navbar } from "../../design/molecule";
import { Card } from "../../design/atomic";
import { ClassItem, InfoItem, SectionHeader } from "../../design/molecule";
import { getClasses, getMembership, getActivity } from "../services/Homer.services";
import type { GymClass } from "../types/class.types";
import type { Membership, Activity } from "../types/user.types";
function Home() {
  const [classes, SetClasses] = useState<GymClass[]>([])
  const [membership, setMembership] = useState<Membership | null>(null)
  const [activity, setActivity] = useState<Activity | null>(null)

  useEffect(() =>{
    const fetchData = async () => {
      try {
        const classesData = await getClasses()
        const membershipData = await getMembership()
        const activityData = await getActivity()

        SetClasses(classesData)
        setMembership(membershipData)
        setActivity(activityData)
      } catch (error) {
        console.error("Error al cargar los datos:", error)
      }
    }

    fetchData();
  }, [])
  return (
    <>
      <Navbar />

      <div className="bg-orange-400 pl-6 pr-6">
        <div className="bg-white min-h-screen p-6 grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3">
          <h1 className="text-center text-3xl font-bold w-full bg-orange-400/50 rounded-2xl p-4 mb-10">
            Bienvenido!!
          </h1>

          <Card className="md:col-span-2 bg-orange-400">
            <SectionHeader tittle="Membresia" />
            <InfoItem label="Plan" value={membership?.plan ?? "Cargando..."} />
            <InfoItem label="Días restantes" value={membership?.dias_restantes ?? "..."} />
          </Card>

          <Card>
            <SectionHeader tittle="Clases disponibles" />
            
            {classes.length === 0 ?(
              <p>Cargando Clases...</p>
            ) : (
              classes.slice(0, 3). map((c) =>(
                <ClassItem 
                  key= {c.id} 
                  name= {c.nombre}
                  time= {c.hora_inicio} 
                  status= {c.estado} 
                />
              ))
            )}
          </Card>

          <Card>
            <SectionHeader tittle="Mis Clases" />

            {classes.length === 0 ?(
              <p>Cargando Clases...</p>
            ) : (
              classes.filter((c) => c.estado === "RESERVADA")
                .map((c) =>(
                <ClassItem 
                  key= {c.id} 
                  name= {c.nombre}
                  time= {c.hora_inicio} 
                  status= {c.estado} 
                />
              ))
            )}
          </Card>

          <Card className="md:col-span-1">
            <SectionHeader tittle="Mi actividad" />
            <InfoItem label="Visitas este mes" value={activity?.total_visitas ?? "..."} />
          </Card>
        </div>
      </div>
    </>
  );
}

export default Home;
