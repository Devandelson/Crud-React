import imgNula from '../assets/nulo.png';
import { useContext } from "react";
import { dataContext } from "./dataContext.jsx";
import { motion, AnimatePresence, delay } from "motion/react"

export default function Info() {
    const { data } = useContext(dataContext);
    return (
        <AnimatePresence mode='wait' >
            <motion.section>
                <Buscador />
                {data && (
                    data.map((dataObject, index) => (
                        dataObject.visible && (
                            <CardUser key={dataObject.id}
                                nombre={dataObject.nombre}
                                apellido={dataObject.apellido}
                                tel={dataObject.tel}
                                img={dataObject.img}
                                indice={index}
                            />
                        )
                    ))
                )}

            </motion.section>
        </AnimatePresence>
    )
}

function Buscador() {
    const { data, setData } = useContext(dataContext);

    let p = '';
    p.startsWith

    function busqueda(valor) {
        setData((prev) => {
            const copyPrev = [...prev];

            // condicion para aplicar visible true o false (ocultar los elementos)
            function condicionFiltro(objecto) {
                if (valor == '') {
                    objecto.visible = true;
                    return true;
                } else if (objecto.nombre.toLocaleLowerCase().startsWith(valor.toLocaleLowerCase())) {
                    objecto.visible = true;
                    return true;
                } else {
                    objecto.visible = false;
                    return true;
                }
            }

            let condicionBusqueda = copyPrev.filter(condicionFiltro);
            return condicionBusqueda;
        })
    }

    return (
        <div className='w-full flex items-center gap-3.5 text-white text-lg p-3 bg-[#3C3F78] rounded-sm mb-8'>
            <i className="fa-solid fa-magnifying-glass fa-rotate-90 text-2xl"></i>
            <input type="text" placeholder='Buscar mediante el nombre' className='outline-none grow' onChange={(e) => { busqueda(e.target.value) }} />
        </div>
    )
}

function CardUser({
    img = imgNula,
    nombre = 'Andelson',
    apellido = 'Gonzalez Genao',
    tel = '+1 809-356-3071',
    indice,
}) {
    const { setData } = useContext(dataContext);

    const itemVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: {delay: 0.1 * indice} },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
    };


    function btnHandleclick() {
        setData((prev) => {
            const copyPrev = [...prev];
            copyPrev.splice(indice, 1);
            return copyPrev;
        })
    }

    return (
        <motion.article className='flex items-start h-auto gap-8 p-4 bg-amber-700 rounded-lg mb-3.5'
            variants={itemVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            layout
        >
            <div className='w-1/3 aspect-square min-h-full'>
                <img src={img} alt="imagen de perfil" className='rounded-lg object-cover' />
            </div>

            <div>
                <div className='text-white text-xl'>
                    <DataUser titulo={'Nombre'} info={nombre} />
                    <DataUser titulo={'Apellidos'} info={apellido} />
                    <DataUser titulo={'Tel'} info={tel} />
                </div>

                <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg p-3 py-2 text-center text-lg flex items-center gap-2.5 mt-6 cursor-pointer" onClick={btnHandleclick}>
                    <i className="fa-solid fa-trash"></i>
                    Eliminar
                </button>
            </div>
        </motion.article>
    )
}

function DataUser({ info, titulo }) {
    return (
        <span className='flex items-center gap-1.5'>
            <p className='font-bold'>{titulo}:</p>
            <p>{info} </p>
        </span>
    )
}