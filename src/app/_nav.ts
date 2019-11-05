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
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Learning Management System'
  },

  {
    name: 'Upload',
    url: '/upload',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Upload',
        url: '/upload',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Files',
    url: '/files',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Videos/Audios',
        url: '/files',
        icon: 'icon-puzzle'
      },
      {
        name: 'Download',
        url: '/files/download',
        icon: 'icon-puzzle'
      }
    ]
  }
];
