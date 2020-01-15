interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },
  {
    title: true,
    name: 'Learning Management System'
  },

  {
    name: 'Upload Files',
    url: '/upload',
    icon: 'icon-cloud-upload',
    children: [
      {
        name: 'Upload',
        url: '/upload',
        icon: 'icon-cloud-upload'
      }
    ]
  },
  {
    name: 'Files',
    url: '/files',
    icon: 'icon-docs',
    children: [
      {
        name: 'Videos/Audios',
        url: '/files',
        icon: 'icon-music-tone-alt'
      },
      {
        name: 'Pdf',
        url: '/files/pdf',
        icon: 'icon-docs'
      },
      {
        name: 'Pictures',
        url: '/files/pictures',
        icon: 'icon-picture'
      },
      {
        name: 'Others',
        url: '/files/others',
        icon: 'icon-puzzle'
      },
      {
        name: 'Download',
        url: '/files/download',
        icon: 'icon-cloud-download'
      }
    ]
  }
];
