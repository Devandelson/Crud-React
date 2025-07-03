import imgNula from '../assets/nulo.png';
import { useState, useContext } from 'react';
import { dataContext } from './dataContext';
import Swal from 'sweetalert2'
import { motion, AnimatePresence } from "motion/react"

export default function Frm() {
    const [dataInput, setDataInput] = useState(['', '', '']);
    const [imagen, setImagen] = useState(null);
    const { setData } = useContext(dataContext);
    const [keyFrm, setKeyFrm] = useState('key1');

    function guardarDatos() {
        let validacionInput = true;
        dataInput.map((valor) => {
            if (valor == '') {
                validacionInput = false;
            }
        })

        if (imagen && validacionInput) {
            const structureData = {
                'id': '',
                'nombre': dataInput[0],
                'apellido': dataInput[1],
                'tel': dataInput[2],
                'img': imagen,
                'visible': true
            };

            setData((prev) => {
                const copyPrev = [...prev];
                let IdNext = copyPrev.length;
                structureData.id = IdNext;
                copyPrev.unshift(structureData);
                return copyPrev;
            })
            setKeyFrm((prev) => prev == 'key1' ? 'key2' : 'key1');
        } else {
            Swal.fire({
                title: 'Datos incompletos',
                text: 'Por favor completa todos los campos antes de guardar.',
                icon: 'error',
                confirmButtonText: 'Entendido'
            });
        }
    }

    function guardarInput(valor, indice) {
        setDataInput((prev) => {
            const copyPrev = [...prev];
            copyPrev[indice] = valor;
            return copyPrev;
        })
    }

    return (
        <section className='h-max bg-[#2D2F63] p-4 rounded-xl md:sticky sm:relative top-3.5' key={keyFrm}>
            <header className='w-full flex items-center gap-2 text-white font-bold text-3xl mb-6'>
                <i className="fa-solid fa-user-plus"></i>
                <h2>Crear usuario</h2>
            </header>

            <Input onInput={(e) => { guardarInput(e.target.value, 0) }} />
            <Input marcador='Apellido (s)' onInput={(e) => { guardarInput(e.target.value, 1) }} />
            <Input marcador='Telefono' onInput={(e) => { guardarInput(e.target.value, 2) }} />

            <Imagen funcionActualizarImg={setImagen} imgProp={imagen} />

            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-6 flex items-center gap-2.5" onClick={guardarDatos}>
                <i className="fa-solid fa-square-plus"></i> Crear usuario
            </button>
        </section>
    )
}

function Imagen({ funcionActualizarImg, imgProp }) {
    function cambiarImagen(e) {
        const evento = e.target.files[0];
        let size = evento.size;
        let type = evento.type;
        let typesPermitidos = ['image/jpg', 'image/jpeg', 'image/png'];


        if (evento) {
            if (size > 5 * 1024 * 1024) {
                Swal.fire({
                    title: 'Archivo demasiado grande',
                    text: 'El archivo no debe superar los 5 MB.',
                    icon: 'error',
                    confirmButtonText: 'Entendido'
                });
                return;
            }

            if (!typesPermitidos.includes(type)) {
                Swal.fire({
                    title: 'Formato no permitido',
                    text: 'Solo se permiten archivos con formato JPG, PNG o JPEG.',
                    icon: 'error',
                    confirmButtonText: 'Entendido'
                });
                return;
            }

            funcionActualizarImg(URL.createObjectURL(evento));
        }
    }

    return (
        <div className='w-full flex items-start gap-6 flex-wrap mt-5'>
            <div className='w-2/5 aspect-square p-3.5 border-2 border-dashed border-white rounded-lg'>
                <AnimatePresence>
                    {
                        imgProp
                            ? (<motion.img src={imgProp} alt="" className='w-full h-full object-cover'
                                initial={{ opacity: 0, y: -20, scale: 1.1 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 1.1 }}
                            />)
                            : (<motion.img src={imgNula} alt="" className='w-full h-full object-cover'
                                initial={{ opacity: 0, y: -20, scale: 1.1 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 1.1 }}
                            />)
                    }
                </AnimatePresence>

            </div>

            <label htmlFor="buscarImagen" className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800'>
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                    Buscar Imagen
                </span>
            </label>


            <input type="file" id="buscarImagen" className='hidden' onChange={(e) => { cambiarImagen(e) }} />
        </div>
    )
}

function Input({ marcador = 'Nombre', ...evento }) {
    return (
        <input type="text" placeholder={marcador} className='w-full p-2.5 outline-none text-white rounded-lg bg-amber-50/5 border-2 border-transparent focus:border-white focus:text-lg transition-all mb-2.5' {...evento} />
    )
}