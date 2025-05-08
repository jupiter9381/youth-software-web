import { useState } from 'react';
import Avatar from './Avatar';
import MetricsIcon from './MetricsIcon';
import SystemsIcon from './SystemIcon';
import MenuItem from './MenuItem';
import Breadcrumbs from './Breadcrumbs';
import ContextMenuItem from './ContextMenuItem';
import Steps from './Steps';
import Tabs from './NavigationBlocks/Tabs';
import AccountDropdown from './AccountDropdown';
import FloatingLabelInput from './FloatingLabelInput';

import WindowOutlined from '../assets/outline/Window.svg';
import WindowFilled from '../assets/outline/WindowColored.svg';
import dashboardIcon from '../assets/outline/Dashboard.svg';
import dashboardIconFilled from '../assets/filled/Dashboard.svg';
import FloatingLabelSelect from './FloatingLabelSelect';
import MnTextArea from './MnTextArea';
import ImageUpload from './ImageUpload';
// import ColorPicker from "./ColorPicker";
import Checkbox from './Checkbox';
// import RadioButton from "./RadioGroup";
// import Toggle from "./FormElements/Toggle";
import FieldEditsControl from './FieldEditsControl';
import StepAccordion from './StepsAccordion';
import VerticalTab from './VerticalTab';
import StatusChip from './ContentBlocks/StatusChip';
import DashboardMetrics from './ContentBlocks/DashboardMetrics';
import NotificationContent from './ContentBlocks/NotificationContent';
import SearchInput from './SearchInput';
import Components2 from './Components2';
// import Sidebar from "../pages/Dashboard/Sidebar";
// import AgencyProfile from "./AgencyProfile";
// import TopBar from "./TopBar";
// import { Column, RowData } from "./Table";
import AccountType from '../pages/loginSignup/components/AccountType';
import LivePreview from '../pages/loginSignup/components/LivePreview';
import DragImageUpload from './DragImageUpload';
import Banner from './Banner';
import RadioGroup from './RadioGroup';
// import Popup from "./Popup";
// import { menuItems } from "../pages/Home/menuItems";

const Components = () => {
  //tab
  const [activeTab, setActiveTab] = useState<string>('All');
  const tabs = [
    { label: 'All', count: 135 },
    { label: 'Unviewed', count: 3 },
    { label: 'Missed', count: 4 },
    { label: 'Unanswered', count: 1 },
    { label: 'Viewed', count: 127 },
  ];

  //input
  const [inputValue, setInputValue] = useState('');

  //select
  const [selectedOption, setSelectedOption] = useState('');
  const mockOptions = [
    { id: 1, label: 'Option 1' },
    { id: 2, label: 'Option 2' },
    { id: 3, label: 'Option 3' },
    { id: 4, label: 'Option 4' },
    { id: 5, label: 'Option 5' },
  ];

  //textArea
  const [message, setMessage] = useState('');

  //color picker
  // const [colors, setColors] = useState(["", "", "", ""]);
  // const [pickerStates, setPickerStates] = useState([false, false, false, false]);

  // const togglePicker = (index: number) => {
  //     setPickerStates((prevStates) => prevStates.map((state, i) => (i === index ? !state : state)));
  // };

  // const handleColorChange = (index: number, newColor: string) => {
  //     setColors((prevColors) => prevColors.map((color, i) => (i === index ? newColor : color)));
  // };

  //checkbox
  const [checkboxStates, setCheckboxStates] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [disabledStates, setDisabledStates] = useState([
    false,
    false,
    false,
    false,
  ]);

  const toggleCheckbox = (index: number) => {
    setCheckboxStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state)),
    );
  };

  const toggleDisableCheckbox = (index: number) => {
    setDisabledStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state)),
    );
  };

  //radio button
  const [selectedRadioButtonOption, setSelectedRadioButtonOption] =
    useState('all');

  const radioOptions = [
    { label: 'All agency activity feed', value: 'all' },
    { label: 'Only my activity', value: 'myActivity' },
    { label: 'None', value: 'none', disabled: false },
  ];

  //toggle button
  // const [toggleStates, setToggleStates] = useState([false, false, false, false]);
  // const [disabledStateToggle, setDisabledStatesToggle] = useState([false, false, false, false]);

  // const toggleSwitch = (index: number) => {
  //     setToggleStates((prev) => prev.map((state, i) => (i === index ? !state : state)));
  // };

  // const toggleDisableSwitch = (index: number) => {
  //     setDisabledStatesToggle((prev) => prev.map((state, i) => (i === index ? !state : state)));
  // };

  //field edits control
  interface Field {
    order: number;
    type: string;
    name: string;
  }

  const [fields, setFields] = useState<Field[]>([
    { order: 1, type: '', name: '' },
  ]);

  // const typeOptions = [
  //     { id: 1, label: "Input / Text" },
  //     { id: 2, label: "Input / URL" },
  //     { id: 3, label: "Input / Email" },
  //     { id: 4, label: "Input / Password" },
  //     { id: 5, label: "Textarea" },
  // ];

  const handleFieldsChange = (updatedFields: any) => {
    setFields(updatedFields);
  };

  // steps accordion
  const [currentStepAccordion, setCurrentStepAccordion] = useState(1);

  const stepsAccordionContent = [
    {
      stepNumber: 1,
      title: 'Add recipient',
      content: (
        <>
          <p>Who would you like to address your request to?</p>
          <input
            type="text"
            placeholder="Start typing in recipient’s email"
            className="w-full mt-2 p-3 border rounded-lg outline-none focus:border-pm-500"
          />
        </>
      ),
      isOpenInitially: true,
    },
    {
      stepNumber: 2,
      title: 'Craft your request',
      content: <p>Your content for crafting the request goes here.</p>,
      isOpenInitially: false,
    },
    {
      stepNumber: 3,
      title: 'Set up destruction time',
      content: <p>Content for setting up destruction time.</p>,
      isOpenInitially: false,
    },
  ];

  // vertical tabs
  const verticalTab = [
    { label: 'WORDPRESS', dotColor: '#0046FA' },
    { label: 'GOOGLE', dotColor: '#0046FA' },
    { label: 'CONTACTS', dotColor: '#8B5CF6' },
    { label: 'TEMPLATE NAME', dotColor: '#8B5CF6' },
    { label: 'TEMPLATE NAME', dotColor: '#8B5CF6' },
  ];

  //notifications
  // const notifications = [
  //     {
  //         firstName: "Jessica",
  //         lastName: "Whyte",
  //         action: "destroyed answer in request to Willie Simmons",
  //         timeAgo: "2 min ago",
  //         colorVariant: "lightblue",
  //     },
  //     {
  //         firstName: "Jessica",
  //         lastName: "Whyte",
  //         action: "viewed answered request from Willie Simmons",
  //         timeAgo: "3 min ago",
  //         colorVariant: "lightblue",
  //     },
  //     {
  //         firstName: "John",
  //         lastName: "Smith",
  //         action: "shared information with Ben Johnson",
  //         timeAgo: "1 hour ago",
  //         colorVariant: "red",
  //     },
  //     {
  //         firstName: "Jessica",
  //         lastName: "Whyte",
  //         action: "requested login details from Willie Simmons",
  //         timeAgo: "2 hours ago",
  //         colorVariant: "lightblue",
  //     },
  //     {
  //         firstName: "First",
  //         lastName: "Last",
  //         action: "requested login details from Billie Joel",
  //         timeAgo: "2 hours ago",
  //         colorVariant: "neutral",
  //         imgUrl: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //     },
  // ];

  // const data: RowData[] = [
  //     {
  //         name: "John Doe",
  //         recipient: "johndoe@example.com",
  //         totalForms: 12,
  //         unviewed: 4,
  //         missed: 1,
  //         unanswered: 2,
  //         accessor: "name",
  //     },
  //     {
  //         name: "Jane Smith",
  //         recipient: "janesmith@example.com",
  //         totalForms: 8,
  //         unviewed: 2,
  //         missed: 0,
  //         unanswered: 1,
  //         accessor: "name",
  //     },
  //     {
  //         name: "Alice Johnson",
  //         recipient: "alicej@example.com",
  //         totalForms: 5,
  //         unviewed: 1,
  //         missed: 0,
  //         unanswered: 0,
  //         accessor: "name",
  //     },
  // ];

  // const columns: Column[] = [
  //     {
  //         label: "Name",
  //         width: "%",
  //         sortable: true,
  //         isStatusChip: false,
  //         status: "custom",
  //         accessor: "name",
  //     },
  //     {
  //         label: "Recipient",
  //         width: "18.33%",
  //         sortable: true,
  //         isStatusChip: false,
  //         status: "custom",
  //         accessor: "recipient",
  //     },
  //     {
  //         label: "Total Forms",
  //         width: "18.33%",
  //         sortable: true,
  //         isStatusChip: false,
  //         status: "custom",
  //         accessor: "totalForms",
  //     },
  //     {
  //         label: "Unviewed",
  //         width: "15%",
  //         sortable: true,
  //         isStatusChip: true,
  //         status: "unviewed",
  //         accessor: "unviewed",
  //     },
  //     {
  //         label: "Missed",
  //         width: "15%",
  //         sortable: false,
  //         isStatusChip: true,
  //         status: "missed",
  //         accessor: "missed",
  //     },
  //     {
  //         label: "Unanswered",
  //         width: "15%",
  //         sortable: false,
  //         isStatusChip: true,
  //         status: "unanswered",
  //         accessor: "unanswered",
  //     },
  // ];

  return (
    <div className="p-5 grid gap-4 bg-nt-100">
      <h1 className="font-sans ">This is Heading H1</h1>
      <h2 className="font-sans">This is Heading H2</h2>
      <h3 className="font-sans">This is Heading H3</h3>
      <h4 className="font-sans">This is Heading H4</h4>
      <h5 className="text-h5 font-sans">This is Heading H5</h5>
      <h6 className="text-h6 font-sans">This is Heading H6</h6>
      <p> This is a paragraph with DM Sans.</p>
      <h1 className="text-body-big-reg">Big Regular (18/26)</h1>
      <strong className="text-body-big-str">Big Strong (18/26)</strong>
      <h2 className="text-body-base-reg">Base Regular (16/24)</h2>
      <h2 className="text-body-base-str">Base Strong (16/24)</h2>
      <h3 className="text-body-small-reg">Small Regular (14/20)</h3>
      <h3 className="text-body-small-str">Small Strong (14/20)</h3>
      <p className="text-caption-reg">Caption Regular (12/Auto)</p>
      <p className="text-caption-str">Caption Strong (12/Auto)</p>
      <p className="text-caption-all-caps uppercase">All Caps (9/Auto)</p>
      <div className="bg-white p-8 shadow-elevation-1 rounded-lg">
        This box has a custom elevation shadow!
      </div>
      <div className="bg-white p-8 shadow-elevation-2 rounded-lg">
        This box has Elevation 2 shadow!
      </div>
      <img src={dashboardIcon} alt="Dashboard" />
      <Avatar
        firstName="John"
        lastName="Doe"
        // imgUrl='https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      />
      <div className="flex items-center gap-4 bg-white p-8 shadow-elevation-2 rounded-lg">
        <MetricsIcon status="Unviewed" />
        <MetricsIcon status="Missed" />
        <MetricsIcon status="Unanswered" />
        <SystemsIcon status="Success" />
        <SystemsIcon status="Warning" />
      </div>
      {/* ----------------------Navigation blocks---------------------- */}
      {/* menu item */}
      <MenuItem
        label="Dashboard"
        iconOutLined={dashboardIcon}
        iconFilled={dashboardIconFilled}
        path={'/secret'}
      />
      {/* Breadcrumbs */}
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'test',
            path: 'test',
          },
          {
            label: 'test',
            path: 'test',
          },
        ]}
      />
      {/* ContextMenuItem */}
      <div className="flex items-center gap-4 bg-white p-8 shadow-elevation-2 rounded-lg">
        <h5 className="text-h5 font-sans w-[500px]">Context Menu Item</h5>
        <ContextMenuItem
          label="Test Item"
          handleClick={() => {}}
          icon={WindowOutlined}
          iconHovered={WindowFilled}
        />
        <ContextMenuItem label="Test Item" handleClick={() => {}} />
      </div>

      <Steps label="test" number={1} disabled={false} />
      <Tabs tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
      <AccountDropdown
        mainLabel="test"
        items={[
          {
            label: 'Profiles',
            icon: WindowOutlined,
            iconHovered: WindowFilled,
            action: () => alert('Profile clicked'),
          },
          {
            label: 'Logout',
            action: () => alert('Logout clicked'),
          },
        ]}
      />
      <div className="flex items-center gap-4 bg-white p-8 shadow-elevation-2 rounded-lg">
        <h5 className="text-h5 font-sans w-40">Primary Btn</h5>
        <button className="primary-btn base-btn">+ base btn</button>
        <button className="primary-btn base-btn" disabled>
          + dsbld base
        </button>
        <button className="primary-btn small-btn">+ sm btn</button>
        <button className="primary-btn small-btn" disabled>
          + dsbld sm
        </button>
        <button className="primary-btn ghost-btn">+ gh btn</button>
        <button className="primary-btn ghost-btn" disabled>
          + dsbld ghost
        </button>
      </div>
      <div className="flex items-center gap-4 bg-white p-8 shadow-elevation-2 rounded-lg">
        <h5 className="text-h5 font-sans w-40">Secondary Btn</h5>
        <button className="secondary-btn base-btn">+ base btn</button>
        <button className="secondary-btn base-btn" disabled>
          + dsbld base
        </button>
        <button className="secondary-btn small-btn">+ sm btn</button>
        <button className="secondary-btn small-btn" disabled>
          + sm btn
        </button>
        <button className="secondary-btn ghost-btn">+ gh btn</button>
        <button className="secondary-btn ghost-btn" disabled>
          + Button
        </button>
      </div>
      <div className="flex items-center gap-4 bg-white p-8 shadow-elevation-2 rounded-lg">
        <h5 className="text-h5 font-sans w-40">Tertiary Btn</h5>
        <button className="tertiary-btn base-btn">+ base btn</button>
        <button className="tertiary-btn base-btn" disabled>
          + dsbld base
        </button>
        <button className="tertiary-btn small-btn">+ sm btn</button>
        <button className="tertiary-btn small-btn" disabled>
          + Button
        </button>
      </div>
      <div className="flex items-center gap-4 bg-white p-8 shadow-elevation-2 rounded-lg">
        <h5 className="text-h5 font-sans w-40">Input</h5>
        <div className="flex flex-col w-full gap-4">
          <FloatingLabelSelect
            label="Label"
            value={selectedOption}
            onChange={setSelectedOption}
            options={mockOptions}
            searchable
          />
          <FloatingLabelSelect
            label="Label"
            value={selectedOption}
            onChange={setSelectedOption}
            options={mockOptions}
          />
          <FloatingLabelSelect
            label="Label"
            value={selectedOption}
            onChange={setSelectedOption}
            options={mockOptions}
            disabled
          />
          <FloatingLabelSelect
            label="Label"
            value={selectedOption}
            onChange={setSelectedOption}
            options={mockOptions}
            sideSelect
          />
        </div>
      </div>
      {/* <div className='flex items-start gap-4 bg-white p-8 shadow-elevation-2 rounded-lg'>
                <div className='flex flex-col gap-4 w-full'>
                    {colors.map((color, index) => (
                        <ColorPicker
                            key={index}
                            color={color}
                            onColorChange={(newColor) => handleColorChange(index, newColor)}
                            isPickerOpen={pickerStates[index]}
                            togglePicker={() => togglePicker(index)}
                            disabled={false}
                        />
                    ))}
                </div>
            </div> */}
      <div className="flex items-start gap-4 bg-white p-8 shadow-elevation-2 rounded-lg">
        <div className="space-y-4">
          {checkboxStates.map((checked, index) => (
            <Checkbox
              key={index}
              label={`Checkbox ${index + 1}`}
              checked={checked}
              onChange={() => toggleCheckbox(index)}
              disabled={disabledStates[index]}
            />
          ))}

          <div className="flex gap-4">
            {checkboxStates.map((_, index) => (
              <button
                key={index}
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => toggleDisableCheckbox(index)}
              >
                Toggle Disable Checkbox {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start gap-4 bg-white p-8 shadow-elevation-2 rounded-lg">
        <div className="space-y-4">
          <RadioGroup
            options={radioOptions}
            value={selectedRadioButtonOption}
            onChange={setSelectedRadioButtonOption}
          />
        </div>
      </div>
      {/* <div className='flex flex-col items-start gap-4 bg-white p-8 shadow-elevation-2 rounded-lg'>
                {toggleStates.map((checked, index) => (
                    <Toggle key={index} label={`Toggle ${index + 1}`} checked={checked} onChange={() => toggleSwitch(index)} disabled={disabledStateToggle[index]} />
                ))}

                <div className='flex gap-4 mt-4'>
                    {toggleStates.map((_, index) => (
                        <button key={index} className='px-4 py-2 bg-blue-500 text-white rounded' onClick={() => toggleDisableSwitch(index)}>
                            Toggle Disable {index + 1}
                        </button>
                    ))}
                </div>
            </div> */}
      <div className="flex flex-col items-start gap-4 bg-white p-8 shadow-elevation-2 rounded-lg">
        <FieldEditsControl
          initialFields={fields}
          addButtonLabel="Add another field"
          onFieldsChange={handleFieldsChange}
        />
      </div>

      <div className="flex items-center gap-4 bg-white p-8 shadow-elevation-2 rounded-lg">
        <h5 className="text-h5 font-sans w-40">Input</h5>
        <div className="flex flex-col gap-4 w-full">
          <FloatingLabelInput
            label="Normal Input"
            value={inputValue}
            onChange={setInputValue}
          />
          <FloatingLabelInput
            label="Error Input"
            value={inputValue}
            onChange={setInputValue}
            helperText="This is an error message."
            error={true}
          />
          <FloatingLabelInput
            label="Disabled Input"
            value={inputValue}
            onChange={setInputValue}
            disabled={true}
            helperText="This input is disabled."
          />

          <FloatingLabelInput
            label="Start typing in recipient’s email"
            value={inputValue}
            onChange={setInputValue}
          />
        </div>
      </div>
      <div className="flex items-start gap-4 bg-white p-8 shadow-elevation-2 rounded-lg">
        <h5 className="text-h5 font-sans w-40">Text Area</h5>
        <MnTextArea
          label="Your message"
          value={message}
          onChange={setMessage}
          error={true}
          errorMessage="This is an error message"
        />
        <MnTextArea
          label="Your message"
          value={message}
          onChange={setMessage}
        />
        <MnTextArea
          label="Your message"
          value={message}
          onChange={setMessage}
          disabled
        />
      </div>
      <div className="flex items-start gap-4 bg-white p-8 shadow-elevation-2 rounded-lg">
        <h5 className="text-h5 font-sans w-40">Status Chip</h5>
        <div className="flex space-x-2">
          <StatusChip label="Unviewed" status="unviewed" />
          <StatusChip label="Viewed" status="viewed" />
          <StatusChip label="Unanswered" status="unanswered" />
          <StatusChip label="Missed" status="missed" />
          <StatusChip label="System" status="system" />
          <StatusChip label="Custom" status="custom" />
        </div>
      </div>
      <div className="flex items-start gap-4 bg-white p-8 shadow-elevation-2 rounded-lg">
        <h5 className="text-h5 font-sans w-40">Notification Content</h5>
        <div className="p-8 pt-3 w-[400px]">
          <NotificationContent />
        </div>
      </div>
      <div className="flex items-start gap-4 bg-white p-8 shadow-elevation-2 rounded-lg">
        <h5 className="text-h5 font-sans w-40">Search Input</h5>
        <div className="flex items-center">
          <SearchInput width="sm" placeholder="search" type="global" />
          <SearchInput width="sm" placeholder="search templates" type="local" />
        </div>
      </div>
      <div className="flex items-start gap-4 bg-nt-50 p-8 shadow-elevation-2 rounded-lg">
        <div className="flex space-x-4">
          <DashboardMetrics
            count={3}
            label="Unviewed shares"
            status="Unviewed"
          />
          <DashboardMetrics count={3} label="Missed shares" status="Missed" />
        </div>
      </div>
      <div className="flex flex-col items-start bg-white p-8 shadow-elevation-2 rounded-lg">
        {stepsAccordionContent.map((step) => (
          <StepAccordion
            key={step.stepNumber}
            stepNumber={step.stepNumber}
            title={step.title}
            isOpenInitially={step.isOpenInitially}
            isActive={currentStepAccordion === step.stepNumber} // Pass whether the step is active
            onClickAction={() => setCurrentStepAccordion(step.stepNumber)} // Set the current step on click
          >
            {step.content}
          </StepAccordion>
        ))}
      </div>
      <div className="flex flex-col items-start bg-white p-8 shadow-elevation-2 rounded-lg">
        <VerticalTab tabs={verticalTab} />
      </div>
      <div className="flex items-start gap-4 bg-white p-8 shadow-elevation-2 rounded-lg">
        <ImageUpload
          label="Upload"
          onFileChange={(file) => console.log(file)}
        />
      </div>
      <div className="flex items-center gap-4 bg-white p-8 shadow-elevation-2 rounded-lg">
        <h5 className="text-h5 font-sans w-[500px]">User Menu </h5>

        <ContextMenuItem
          label="Test Item"
          handleClick={() => {}}
          icon={WindowOutlined}
          iconHovered={WindowFilled}
        />
        <ContextMenuItem label="Test Item" handleClick={() => {}} />
      </div>

      <div className="flex flex-col gap-4 bg-white p-8 shadow-elevation-2 rounded-lg">
        <h5 className="text-h5 font-sans w-[500px]">Drag Image Upload</h5>
        <div className="w-full">
          <DragImageUpload
            imageDetails={{
              data: null,
              setImageDetails: () => {},
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-white p-8 shadow-elevation-2 rounded-lg">
        <h5 className="text-h5 font-sans w-[500px]">Account Type </h5>
        <div className="w-full">
          <AccountType
            accountType="business"
            planPaid={{
              data: false,
              setPlanPaid: null,
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-white p-8 shadow-elevation-2 rounded-lg">
        <h5 className="text-h5 font-sans w-[500px]">Live Preview </h5>
        <div className="w-full">
          <LivePreview
            logoPreview={{ data: null, setLogoPreview: () => {} }}
            fullNamePreview=""
            agencyPreview=""
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-white p-8 shadow-elevation-2 rounded-lg">
        <h5 className="text-h5 font-sans w-[500px]">Topbar </h5>
        {/* <div className='w-full'>
                    <TopBar />
                </div> */}
      </div>

      {/* <div className='flex flex-col gap-4 bg-white p-8 shadow-elevation-2 rounded-lg'>
                <h5 className='text-h5 font-sans w-[500px]'>Sidebar </h5>
                <div className='w-full flex justify-center'>
                    <Sidebar isOpen={true} />
                </div>
            </div> */}

      {/* <div className='flex flex-col gap-4 bg-white p-8 shadow-elevation-2 rounded-lg'>
                <h5 className='text-h5 font-sans w-[500px]'>AgencyProfile </h5>
                <div className='w-full flex justify-center'>
                    <AgencyProfile />
                </div>
            </div> */}

      {/* <div className='flex flex-col gap-4 bg-white p-8 shadow-elevation-2 rounded-lg'>
                <h5 className='text-h5 font-sans w-[500px]'>Table </h5>
                <Table />
            </div> */}

      <div className="flex flex-col gap-4 bg-white p-8 shadow-elevation-2 rounded-lg">
        <h5 className="text-h5 font-sans w-[500px]">Banner </h5>
        <Banner
          orientation="horizontal"
          upgradeAction={() => {}}
          closeAction={() => {}}
        />
        <div className="w-[300px] p-10 relative h-full flex flex-col justify-between border-l">
          <Banner
            orientation="vertical"
            upgradeAction={() => {}}
            closeAction={() => {}}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-white p-8 shadow-elevation-2 rounded-lg">
        <h5 className="text-h5 font-sans w-[500px]">Popup </h5>
        {/* <Popup/> */}
      </div>

      <Components2 />
    </div>
  );
};

export default Components;
