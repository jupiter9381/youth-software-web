import ContextMenuItem from './ContextMenuItem';
import UserCircleIcon from '../assets/outline/User-circle.svg';
import UserCircleHovIcon from '../assets/outline/hovered/User-circleHover.svg';
import LogOutIcon from '../assets/outline/Arrow-right-on-rectangle.svg';
import LogOutHovIcon from '../assets/outline/hovered/Arrow-right-on-rectangleHover.svg';
import Pagination from './NavigationBlocks/Pagination';
import AdditionalAction from './ContentBlocks/AdditionalActions';

import ModifyForm from '../assets/outline/Pencil-square.svg';
import Clock from '../assets/outline/Clock.svg';
import TextContent from './ContentBlocks/TextContent';

import GoogleLogo from '../assets/template_logo/Google.svg';
import MicrosoftLogo from '../assets/template_logo/Microsoft.svg';
import TemplateCard from './ContentBlocks/TemplateCard';

import PaymentMethod from './ContentBlocks/PaymentMethod';

import UserMenu from './NavigationBlocks/UserMenu';

interface TemplateField {
  type: string;
  name: string;
  order: number;
}

interface Template {
  name: string;
  logo: string;
  isSystem: boolean;
  fields: TemplateField[];
}

const Components2 = () => {
  const template: Template = {
    logo: GoogleLogo,
    name: 'Google',
    isSystem: true,
    fields: [
      {
        type: 'URL',
        name: 'URL',
        order: 1,
      },
      {
        type: 'Username',
        name: 'Username',
        order: 2,
      },
      {
        type: 'Password',
        name: 'Password',
        order: 3,
      },
    ],
  };
  const template2: Template = {
    logo: MicrosoftLogo,
    name: 'Microsoft',
    isSystem: true,
    fields: [
      {
        type: 'URL',
        name: 'URL',
        order: 1,
      },
      {
        type: 'Username',
        name: 'Username',
        order: 2,
      },
      {
        type: 'Password',
        name: 'Password',
        order: 3,
      },
    ],
  };
  return (
    <>
      <div className="flex items-center gap-4 bg-white p-8 shadow-elevation-2 rounded-lg">
        <h5 className="text-h5 font-sans w-[500px]">User Menu</h5>
        <ContextMenuItem
          label="My Profile"
          handleClick={() => {}}
          icon={UserCircleIcon}
          iconHovered={UserCircleHovIcon}
        />
        <ContextMenuItem
          label="Log Out"
          handleClick={() => {}}
          icon={LogOutIcon}
          iconHovered={LogOutHovIcon}
        />
      </div>
      <div className="flex items-center gap-4 bg-white p-8 shadow-elevation-2 rounded-lg">
        <h5 className="text-h5 font-sans w-[500px]">Pagination</h5>
        <Pagination
          totalItems={100}
          itemsPerPage={10}
          currentPage={1}
          onPageChange={(page) => console.log('Change to page:', page)}
          onItemsPerPageChange={(itemsPerPage) =>
            console.log('Change items per page:', itemsPerPage)
          }
        />
      </div>
      <div className="flex items-center gap-4 bg-white p-8 shadow-elevation-2 rounded-lg">
        <h5 className="text-h5 font-sans w-[500px]">Additional Actions</h5>
        <AdditionalAction label="Modify form" svgPath={ModifyForm} />
      </div>
      <div className="flex items-center gap-4 bg-white p-8 shadow-elevation-2 rounded-lg">
        <h5 className="text-h5 font-sans w-[500px]">Text Content</h5>
        <div className="flex flex-col gap-4">
          <TextContent
            caption="Vertical"
            content="This is the Vertical Text without icon"
            svgPath={Clock}
            layout="vertical"
            hoverColor="#FA1D6D" // Customize hover color if needed
          />
          <TextContent
            caption="Vertical"
            content="This is the Vertical Text"
            layout="vertical"
          />
          <TextContent
            caption="Horizontal"
            content="This is the Horizontal Text"
            layout="horizontal"
          />
        </div>
      </div>
      <div className="flex items-center gap-4 bg-nt-300 p-8 shadow-elevation-2 rounded-lg">
        <h5 className="text-h5 font-sans w-[500px]">Template Card</h5>
        <TemplateCard
          onClick={() => {}}
          logo={template.logo}
          isSystem={template.isSystem}
          fields={template.fields}
          name={template.name}
        />
        <TemplateCard
          onClick={() => {}}
          logo={template2.logo}
          isSystem={template2.isSystem}
          fields={template2.fields}
          name={template2.name}
        />
      </div>
      <div className="flex items-center gap-4 bg-white p-8 shadow-elevation-2 rounded-lg">
        <h5 className="text-h5 font-sans w-[500px]">Payment methods</h5>
        <PaymentMethod
          paymentMethod="mastercard"
          cardNumber="5555 5555 5555 4444"
          status="Primary"
        />
      </div>
      <div className="flex items-center gap-4 bg-white p-8 shadow-elevation-2 rounded-lg">
        <h5 className="text-h5 font-sans w-[500px]">User</h5>
        {/* <div className='w-40 flex flex-col shadow-elevation-1 rounded-3xl gap-2 py-2'>
                    <ContextMenuItem label='My Profile' handleClick={() => {}} icon={UserCircleIcon} iconHovered={UserCircleHovIcon} />
                    <ContextMenuItem label='Log Out' handleClick={() => {}} icon={LogOutIcon} iconHovered={LogOutHovIcon} />
                </div> */}
        <UserMenu isExpired={true} />
      </div>
    </>
  );
};

export default Components2;
