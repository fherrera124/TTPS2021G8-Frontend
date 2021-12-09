export const DynamicAsideMenuConfig = {
  items: [
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
        {
          title: 'Estudios Demorados',
          page: '/studies/studies-delayed'
        },
        {
          title: 'Estudios Cancelados',
          page: '/studies/studies-canceled'
        }
      ]
    },
    {
      title: 'Lotes',
      root: true,
      bullet: 'dot',
      icon: 'flaticon2-user-outline-symbol',
      svg: './assets/media/svg/icons/General/User.svg',
      page: '/studies',
      roles: ['EMPLOYEE'],
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
          title: 'Lista de médicos informantes',
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
