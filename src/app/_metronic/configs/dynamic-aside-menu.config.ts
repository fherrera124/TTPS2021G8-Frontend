export const DynamicAsideMenuConfig = {
  items: [
<<<<<<< HEAD
    {
      title: 'Home',
      root: true,
      icon: 'flaticon2-architecture-and-city',
      svg: './assets/media/svg/icons/Design/Layers.svg',
      page: '/dashboard',
      roles: ['ANONYMOUS'],
      translate: 'MENU.DASHBOARD',
      bullet: 'dot',
    },
=======
>>>>>>> 3c367c1303791638e8b8d9832dc12117f0615a5a
    { section: 'Applications', roles: ['ANONYMOUS'] },
    {
      title: 'Pacientes',
      root: true,
      bullet: 'dot',
      icon: 'flaticon2-user-outline-symbol',
      svg: './assets/media/svg/icons/General/User.svg',
      page: '/patients',
      roles: ['EMPLOYEE'],
      submenu: [
        {
          title: 'Lista de Pacientes',
          page: '/patients/patients'
        },
      ]
    },
    ,
    {
      title: 'Empleados',
      root: true,
      bullet: 'dot',
      icon: 'flaticon2-user-outline-symbol',
      svg: './assets/media/svg/icons/General/User.svg',
      page: '/employees',
      roles: ['ADMIN'],
      submenu: [
        {
          title: 'Lista de Empleado',
          page: '/employees/employees'
        },
      ]
    },
    {
      title: 'Estudios',
      root: true,
      bullet: 'dot',
      icon: 'flaticon2-user-outline-symbol',
      svg: './assets/media/svg/icons/General/User.svg',
      page: '/studies',
      roles: ['EMPLOYEE','REPORTING_PHYSICIAN'],
      submenu: [
        {
          title: 'Lista de Estudios',
          page: '/studies/studies'
        },
<<<<<<< HEAD
=======
        {
          title: 'Estudios Demorados',
          page: '/studies/studies-delayed'
        }
>>>>>>> 3c367c1303791638e8b8d9832dc12117f0615a5a
      ]
    },
    {
      title: 'Lotes',
      root: true,
      bullet: 'dot',
      icon: 'flaticon2-user-outline-symbol',
      svg: './assets/media/svg/icons/General/User.svg',
      page: '/studies',
<<<<<<< HEAD
      roles: ['EMPLOYEE','ADMIN'],
=======
      roles: ['EMPLOYEE'],
>>>>>>> 3c367c1303791638e8b8d9832dc12117f0615a5a
      submenu: [
        {
          title: 'Lista de Lotes',
          page: '/sample-batches/sample-batches'
        },
      ]
    },
    {
          title: 'Extracciones',
          root: true,
          bullet: 'dot',
          icon: 'flaticon2-user-outline-symbol',
          svg: './assets/media/svg/icons/General/User.svg',
          page: '/studies',
          roles: ['EMPLOYEE'],
          submenu: [
            {
              title: 'Liquidación de extracciones',
              page: '/sample-clearance/sample-clearance'
            },
          ]
     },
     {
      title: 'Médico derivante',
      root: true,
      bullet: 'dot',
      icon: 'flaticon2-user-outline-symbol',
      svg: './assets/media/svg/icons/General/User.svg',
      page: '/studies',
      roles: ['EMPLOYEE'],
      submenu: [
        {
          title: 'Lista de médicos derivantes',
          page: '/referring-physician/referring-physician'
        },
      ]
 },
 ,
     {
      title: 'Médico informante',
      root: true,
      bullet: 'dot',
      icon: 'flaticon2-user-outline-symbol',
      svg: './assets/media/svg/icons/General/User.svg',
      page: '/studies',
      roles: ['ADMIN'],
      submenu: [
        {
<<<<<<< HEAD
          title: 'Lista de médicos derivantes',
=======
          title: 'Lista de médicos informantes',
>>>>>>> 3c367c1303791638e8b8d9832dc12117f0615a5a
          page: '/referring-physician/referring-physician'
        },
      ]
 },
    {
      title: 'Tipo de estudios',
      root: true,
      bullet: 'dot',
      icon: 'flaticon2-user-outline-symbol',
      svg: './assets/media/svg/icons/General/User.svg',
      page: '/type-studies',
      roles: ['CONFIGURATOR'],
      submenu: [
        {
          title: 'Lista de tipo de estudios',
          page: '/type-studies/type-studies'
        },
      ]
    }
  ]
};
