import * as Yup from 'yup';

export const userSchema = Yup.object().shape({
  dni: Yup.string()
    .required('El DNI es obligatorio')
    .matches(/^\d+$/, 'Solo se permiten números'),
  firstName: Yup.string()
    .required('El nombre es obligatorio')
    .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]+$/, 'Solo se permiten letras y acentos.'),
  lastName: Yup.string()
    .required('El apellido es obligatorio')
    .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]+$/, 'Solo se permiten letras y acentos.'),
  address: Yup.string()
    .required('La dirección es obligatoria'),
  email: Yup.string()
    .email('Debe ingresar un correo electrónico válido')
    .required('El correo electrónico es obligatorio'),
  phone: Yup.string()
    .required('El número de teléfono es obligatorio')
    .matches(/^\+56 9\d{8}$/, 'El número de teléfono debe estar en el formato +56 9 ########.'),
  deliverDate: Yup.string()
    .required('La fecha de entrega es requerida'),
  state: Yup.string()
    .required('El estado es obligatorio')

});
