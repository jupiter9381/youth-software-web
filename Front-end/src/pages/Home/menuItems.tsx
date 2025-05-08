import DashboardIcon from '../../assets/outline/Dashboard.svg';
import DashboardIconFilled from '../../assets/filled/Dashboard.svg';
import RequestsIcon from '../../assets/outline/Request.svg';
import RequestsIconFilled from '../../assets/filled/Send.svg';
import SharesIcon from '../../assets/outline/Share.svg';
import SharesIconFilled from '../../assets/filled/Share.svg';
import AddressBookIcon from '../../assets/outline/Contacts.svg';
import AddressBookIconFilled from '../../assets/filled/Contacts.svg';
import TemplatesIcon from '../../assets/outline/Templates.svg';
import TemplatesIconFilled from '../../assets/filled/Templates.svg';
import SettingsIcon from '../../assets/outline/Settings.svg';
import SettingsIconFilled from '../../assets/filled/Settings.svg';

export const menuItems = [
  {
    label: 'Dashboard',
    iconOutlined: DashboardIcon,
    iconFilled: DashboardIconFilled,
    path: '/home',
  },
  {
    label: 'Requests',
    iconOutlined: RequestsIcon,
    iconFilled: RequestsIconFilled,
    path: '/home/requests',
  },
  {
    label: 'Shares',
    iconOutlined: SharesIcon,
    iconFilled: SharesIconFilled,
    path: '/home/shares',
  },
  {
    label: 'Address Book',
    iconOutlined: AddressBookIcon,
    iconFilled: AddressBookIconFilled,
    path: '/home/address-book/clients',
  },
  {
    label: 'Templates',
    iconOutlined: TemplatesIcon,
    iconFilled: TemplatesIconFilled,
    path: '/home/templates',
  },
  {
    label: 'Settings',
    iconOutlined: SettingsIcon,
    iconFilled: SettingsIconFilled,
    path: '/home/settings/general',
  },
];
