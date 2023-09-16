import Swal from 'sweetalert2';

export const SignedInMessage = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  const alert = Toast.fire({
    icon: 'success',
    title: 'Signed in successfully',
  });

  return alert();
};

export const FailedLogin = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3500,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  const alert = Toast.fire({
    icon: 'error',
    title: 'invalid password or username please try again',
  });

  return alert();
};

export const EmailError = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3500,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  const alert = Toast.fire({
    icon: 'error',
    title: 'this email already exists',
  });

  return alert();
};

export const AddToFavoriteMessage = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  const alert = Toast.fire({
    icon: 'success',
    title: 'Added to Favorites ',
  });

  return alert();
};

export const DeleteFavoriteMessage = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  const alert = Toast.fire({
    icon: 'success',
    title: 'Deleted from Favorites ',
  });

  return alert();
};
