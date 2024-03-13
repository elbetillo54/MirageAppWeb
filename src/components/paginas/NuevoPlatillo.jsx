import React, { useContext, useState } from 'react'
import { useFormik } from "formik"
import * as Yup from "yup"
import { FirebaseContext } from '../../firebase'
import { Navigate, useNavigate } from 'react-router'
import FileUploader from "react-firebase-file-uploader"

const NuevoPlatillo = () => {

    //State para las imagenes
    const [subiendo, guardarSubiendo] = useState(false);
    const [progreso, guardarProgreso] = useState(0);
    const [urlimagen, guardarUrlimagen] = useState("");

    //Context con las operaciones de firebase 
    const { firebase } = useContext(FirebaseContext);

    //Hook para redireccionar 
    const navigate = useNavigate();



    //validación y leer los datos del formulario
    const formik = useFormik({
        initialValues: {
            nombre: "",
            precio: "",
            categoria: "",
            imagen: "",
            descripcion: ""
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                .min(3, "Los Platillos deben de tener 3 caracteres")
                .required("El Nombre es obligatorio"),
            precio: Yup.number()
                .min(1, "Debes agregar un número")
                .required("El precio es obligatorio"),

            categoria: Yup.string()
                .required("La Categoria es Obligatoria"),
            descripcion: Yup.string()
                .required("Debes de agregar una descripción")
        }),
        onSubmit: datos => {
            try {
                datos.existencia = true;
                datos.imagen = urlimagen;
                firebase.db.collection('productos').add(datos)

                navigate("/menu");
            } catch (error) {
                console.log(error);

            }

        }
    });

    // Todo sobre las imagenes
    const handleUploadStart = () => {
        guardarProgreso(0);
        guardarSubiendo(true);
    }
    const handleUploadError = error => {
        guardarSubiendo(false);
        console.log(error);

    }
    const handleUploadSuccess = async (nombre) => {
        guardarProgreso(100);
        guardarSubiendo(false);
    
        //Almacenar la url de destino
        const url = await firebase.storage.ref("productos").child(nombre).getDownloadURL();
    
        console.log(url);
        guardarUrlimagen(url);
    };
    const handleProgress = progreso => {
        guardarProgreso(progreso)

        console.log(progreso);

    }

    return (
        <>
            <div className='md:p-7'>
                <h1 className='text-5xl font-light mb-4 text-center text-yellow-600'>Agregar Platillo</h1>

                <div className='flex justify-center mt-10 '>
                    <div className='w-full max-w-3xl bg-white rounded-md shadow-md '>
                        <form className='p-5' onSubmit={formik.handleSubmit}>
                            <div >
                                <label
                                    className='block text-gray-700 text-sm font-bold' htmlFor='nombre'>
                                    Nombre del Platillo</label>
                                <input
                                    type='text'
                                    className='shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3'
                                    id='nombre'
                                    placeholder='Introduce el nombre del platillo'
                                    value={formik.values.nombre}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {formik.touched.nombre && formik.errors.nombre ? (
                                <div role='alert'>
                                    <p className=' mb-2 text-sm text-red-600'>
                                        {formik.errors.nombre}
                                    </p>
                                </div>
                            ) : null}
                            <div className='mb-4'>
                                <label
                                    className='block text-gray-700 text-sm font-bold' htmlFor='precio'>
                                    Precio del Platillo</label>
                                <input
                                    type='text'
                                    className='shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    id='precio'
                                    placeholder='$20'
                                    min="0"
                                    value={formik.values.precio}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {formik.touched.precio && formik.errors.precio ? (
                                <div role='alert'>
                                    <p className='mt-1 mb-2 text-sm text-red-600'>
                                        {formik.errors.precio}
                                    </p>
                                </div>
                            ) : null}
                            <div className='mb-4'>
                                <label
                                    className='block text-gray-700 text-sm font-bold' htmlFor='categoria'>
                                    Categoría</label>
                                <select
                                    className='shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white'
                                    id='categoria'
                                    value={formik.values.categoria}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value=""> --Seleccione Una Opcion--</option>
                                    <option value="vinos-licores">Vinos y licores</option>
                                    <option value="tequila-c">Tequila-Copa</option>
                                    <option value="tequila-s">Tequila-Servicio</option>
                                    <option value="brandy-c">Brandy-Copa</option>
                                    <option value="brandy-s">Brandy-Servicio</option>
                                    <option value="whisky-c">Whisky-Copa</option>
                                    <option value="whisky-s">Whisky-Servicio</option>
                                    <option value="ron-c">Ron-Copa</option>
                                    <option value="ron-s">Ron-Servicio</option>
                                    <option value="vodka-c">Vodka-Copa</option>
                                    <option value="vodka-s">Vodka-Servicio</option>
                                    <option value="ginebra-c">Ginebra-Copa</option>
                                    <option value="ginebra-s">Ginebra-Servicio</option>
                                    <option value="cognac-c">Cognac-Copa</option>
                                    <option value="cognac-s">Cognac-Servicio</option>
                                    <option value="mixologia-tequila">Mixología-Tequila</option>
                                    <option value="mixologia-vodka">Mixología-Vodka</option>
                                    <option value="mixologia-ron">Mixología-Ron</option>
                                    <option value="mixologia-gin">Mixología-Gin</option>
                                    <option value="shots">Shots</option>
                                    <option value="shots-clasicos">Shots-Clasicos</option>
                                    <option value="shots-flameados">Shots-Flameados</option>
                                    <option value="cerveza">Cerveza</option>
                                    <option value="cocteles-bebidas-s/a">Cocteles-Bebidas-s/a</option>
                                    <option value="mezcal">Mezcal</option>
                                </select>
                            </div>
                            {formik.touched.categoria && formik.errors.categoria ? (
                                <div role='alert'>
                                    <p className='mt-1 mb-2 text-sm text-red-600'>
                                        {formik.errors.categoria}
                                    </p>
                                </div>
                            ) : null}
                            <div className='mb-4'>
                                <label
                                    className='block text-gray-700 text-sm font-bold' htmlFor='imagenplatillo'>
                                    Imagen del Platillo</label>
                                <FileUploader
                                    className="mt-2 w-full file:bg-yellow-600 text-gray-700 text-sm  border file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:hover:bg-gray-700 file:text-white rounded placeholder:text-gray-400"
                                    accept="image/*"
                                    id="imagenplatillo"
                                    name="imagenplatillo"
                                    randomizeFilename
                                    storageRef={firebase.storage.ref("productos")}
                                    onUploadStart={handleUploadStart}
                                    onUploadError={handleUploadError}
                                    onUploadSuccess={handleUploadSuccess} // Aquí corregido
                                    onProgress={handleProgress}
                                />
                            </div>

                                {subiendo && (
                                    <div  className='h-12 w-full border relative'>

                                        <div className='bg-green-500 absolute left-0 top-0 text-white text-sm px-2 h-12 flex items-center' style={{width: `${progreso}%`}}>
                                            {progreso} %
                                        </div>

                                    </div>
                                )}

                                {urlimagen && (
                                    <p className='mb-2 text-sm text-green-500 mt-3.5 font-bold'>La imagen se subió correctamente</p>
                                )}

                            {formik.touched.imagen && formik.errors.imagen ? (
                                <div role='alert'>
                                    <p className='mt-1 mb-2 text-sm text-red-600'>
                                        {formik.errors.imagen}
                                    </p>
                                </div>
                            ) : null}
                            <div className='mb-4'>
                                <label
                                    className='block text-gray-700 text-sm font-bold' htmlFor='descripcion'>
                                    Descripción</label>
                                <textarea
                                    type='text'
                                    className='shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none'
                                    id='descripcion'
                                    placeholder='Descripción de el platillo'
                                    value={formik.values.descripcion}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    rows="4"
                                ></textarea>
                            </div>
                            {formik.touched.descripcion && formik.errors.descripcion ? (
                                <div role='alert'>
                                    <p className='mt-1 mb-2 text-sm text-red-600'>
                                        {formik.errors.descripcion}
                                    </p>
                                </div>
                            ) : null}

                            <input
                                type='submit'
                                className='bg-yellow-600 hover:bg-gray-600 w-full mt-2 p-2 text-white rounded font-bold uppercase'
                                value="Agregar Platillo"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NuevoPlatillo;