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
    .required('El correo electrónico es obligatorio')

});
