import React, { useContext, useState } from 'react'
import { useFormik } from "formik"
import * as Yup from "yup"
import { FirebaseContext } from '../../firebase'
import { Navigate, useNavigate } from 'react-router'
import FileUploader from "react-firebase-file-uploader"

const NuevoActivo = () => {

    //State para las imagenes
    const [subiendo, guardarSubiendo] = useState(false);
    const [progreso, guardarProgreso] = useState(0);
    const [urlimagen, guardarUrlimagen] = useState("");
    const [resetUploader, setResetUploader] = useState(false);

    //Context con las operaciones de firebase 
    const { firebase } = useContext(FirebaseContext);

    //Hook para redireccionar 
    const navigate = useNavigate();



    //validación y leer los datos del formulario
    const formik = useFormik({
        initialValues: {
            nombre: "",
            cantidad: "",
            proveedor: "",
            imagen: "",
            descripcion: ""
        },
        validationSchema: Yup.object({ //Validación de los datos 
            nombre: Yup.string()
                .min(3, "Los Platillos deben de tener 3 caracteres")
                .required("El Nombre es obligatorio"),
            cantidad: Yup.number()
                .min(1, "Debes agregar un número")
                .required("El precio es obligatorio"),

            proveedor: Yup.string()
                .required("La Categoria es Obligatoria"),
            descripcion: Yup.string()
                .required("Debes de agregar una descripción")
        }),
        onSubmit: (datos, {resetForm}) => {
            try {
                datos.existencia = true;
                datos.imagen = urlimagen;
                firebase.db.collection('inventario').add(datos)
                
                resetForm();
                setResetUploader(true);
                guardarUrlimagen();
                
            } catch (error) {
                console.log(error);

            }

        }
    });

    // Carga de las imagenes
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
        const url = await firebase.storage.ref("inventario").child(nombre).getDownloadURL();
    
        console.log(url);
        guardarUrlimagen(url);
    };
    const handleProgress = progreso => {
        guardarProgreso(progreso)
    }

    return (
        <>
            <div >
                <h1 className='text-5xl font-light text-center text-yellow-600 uppercase'>Agregar Activo</h1>

                <div className='flex justify-center mt-5 '>
                    <div className='w-full max-w-3xl bg-white rounded-md shadow-md '>
                        <form className='p-5' onSubmit={formik.handleSubmit}>
                            <div >
                                <label
                                    className='block text-gray-700 text-sm font-bold' htmlFor='nombre'>
                                    Nombre del Activo</label>
                                <input
                                    type='text'
                                    className='shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3'
                                    id='nombre'
                                    placeholder='Introduce el nombre del activo'
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
                                    className='block text-gray-700 text-sm font-bold' htmlFor='cantidad'>
                                    Cantidad del activo</label>
                                <input
                                    type='text'
                                    className='shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    id='cantidad'
                                    placeholder='$20'
                                    min="0"
                                    value={formik.values.cantidad}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {formik.touched.cantidad && formik.errors.cantidad ? (
                                <div role='alert'>
                                    <p className='mt-1 mb-2 text-sm text-red-600'>
                                        {formik.errors.cantidad}
                                    </p>
                                </div>
                            ) : null}
                            <div className='mb-4'>
                                <label
                                    className='block text-gray-700 text-sm font-bold' htmlFor='proveedor'>
                                    Proveedor
                                </label>

                                <input
                                    type='text'
                                    className='shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    id='proveedor'
                                    placeholder='Introduce el nombre del Proveedor'
                                    value={formik.values.proveedor}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>

                            {formik.touched.proveedor && formik.errors.proveedor ? (
                                <div role='alert'>
                                    <p className='mt-1 mb-2 text-sm text-red-600'>
                                        {formik.errors.categoria}
                                    </p>
                                </div>
                            ) : null}

                            <div className='mb-4'>
                                <label
                                    className='block text-gray-700 text-sm font-bold' htmlFor='imageninventario'>
                                    Imagen del Activo</label>
                                <FileUploader
                                    className="mt-2 w-full file:bg-yellow-600 text-gray-700 text-sm  border file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:hover:bg-gray-700 file:text-white rounded placeholder:text-gray-400"
                                    key={resetUploader ? Date.now() : "uploader"}
                                    accept="image/*"
                                    id="imageninventario"
                                    name="imageninventario"
                                    randomizeFilename
                                    storageRef={firebase.storage.ref("inventario")}
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

export default NuevoActivo;