import { useNavigate, Form, useActionData, redirect } from 'react-router-dom';
import { agregarCliente } from '../data/clientes';

//* Imports Components */
import Formulario from '../components/Fomulario';
import Error from '../components/Error';

export async function action({ request }) {
  const formData = await request.formData();
  const datos = Object.fromEntries(formData);
  const email = formData.get('email');

  //* VALIDACION DEL FORMULARIO */
  const errores = [];
  if (Object.values(datos).includes('')) {
    errores.push('Todos los campos son obligatorios');
  }

  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  if (!regex.test(email)) {
    errores.push('El email no es valido');
  }

  if (Object.keys(errores).length) {
    return errores;
  }

  await agregarCliente(datos);

  return redirect('/');
}

function NuevoCliente() {
  const errores = useActionData();
  const navigate = useNavigate();
  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Nuevo Cliente</h1>
      <p className='mt-3'>Carga de datos del Nuevo Cliente</p>
      <div className='flex justify-end'>
        <button
          className='bg-blue-800 text-white uppercase font-bold px-3 py-1 '
          onClick={() => navigate('/')}
        >
          VOLVER
        </button>
      </div>

      <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>
        {errores?.length &&
          errores.map((error, i) => <Error key={i}>{error}</Error>)}
        <Form method='post' noValidate>
          <Formulario />

          <input
            type='submit'
            className='mt-5 w-full bg-blue-800 uppercase p-3 font-bold text-white text-lg'
            value='Cargar Cliente'
          />
        </Form>
      </div>
    </>
  );
}

export default NuevoCliente;
