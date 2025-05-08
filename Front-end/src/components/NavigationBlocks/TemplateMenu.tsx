import ContextMenuItem from '../ContextMenuItem';
import Request from '../../assets/outline/component_type/Request';
import Share from '../../assets/outline/component_type/Share';
import Duplicate from '../../assets/outline/component_type/Duplicate';
import Trash from '../../assets/outline/component_type/Trash';
import Pencil from '../../assets/outline/component_type/Pencil';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers/store';

interface TemplateMenuProps {
  onRequestTemplateClick?: () => void;
  onShareTemplateClick?: () => void;
  onDuplicateTemplateClick?: () => void;
  onDeleteTemplateClick?: () => void;
  onEditTemplateClick?: () => void;
  isSystem?: boolean;

  // for adding template
  addTemplate?: boolean;
  onLoginDetailsClick?: () => void;
  onPersonalDataClick?: () => void;
  onCustomClick?: () => void;
}

const TemplateMenu = ({
  onRequestTemplateClick = () => {},
  onShareTemplateClick = () => {},
  onDuplicateTemplateClick = () => {},
  onDeleteTemplateClick = () => {},
  onEditTemplateClick = () => {},
  addTemplate,
  onLoginDetailsClick = () => {},
  onPersonalDataClick = () => {},
  onCustomClick = () => {},
  isSystem,
}: TemplateMenuProps) => {
  const organisationType = useSelector(
    (state: RootState) => state.authReducer.organisationType,
  );

  const userRole = useSelector((state: RootState) => state.authReducer.role);

  return (
    <div
      className={`${
        addTemplate ? 'w-full' : 'w-max'
      } flex flex-col shadow-elevation-1 bg-white rounded-2xl gap-2 py-2`}
    >
      {addTemplate ? (
        <>
          {/* FOR ADDING TEMPLATE */}
          <ContextMenuItem
            label="Login Details"
            handleClick={onLoginDetailsClick}
          />
          <ContextMenuItem
            label="Personal Data"
            handleClick={onPersonalDataClick}
          />
          <ContextMenuItem label="Custom" handleClick={onCustomClick} />
        </>
      ) : (
        <>
          <ContextMenuItem
            label="Request From Template"
            handleClick={onRequestTemplateClick}
            customIcon={<Request color="#9497A3" hoverColor="#0046FA" />}
          />
          <ContextMenuItem
            label="Share from Template"
            handleClick={onShareTemplateClick}
            customIcon={<Share color="#9497A3" hoverColor="#0046FA" />}
          />

          <ContextMenuItem
            label="Duplicate Template"
            handleClick={onDuplicateTemplateClick}
            customIcon={<Duplicate color="#9497A3" hoverColor="#0046FA" />}
          />

          {!isSystem &&
            organisationType === 'BUSINESS' &&
            userRole !== 'MEMBER' && (
              <ContextMenuItem
                label="Edit"
                handleClick={onEditTemplateClick}
                customIcon={<Pencil color="#9497A3" hoverColor="#0046FA" />}
              />
            )}
          {!isSystem &&
            organisationType === 'BUSINESS' &&
            userRole !== 'MEMBER' && (
              <ContextMenuItem
                label="Delete"
                handleClick={onDeleteTemplateClick}
                customIcon={<Trash color="#9497A3" hoverColor="#0046FA" />}
              />
            )}
        </>
      )}
    </div>
  );
};

export default TemplateMenu;
