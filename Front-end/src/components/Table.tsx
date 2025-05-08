import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRequest } from '../services/transfers/requests/use-request';

import StatusChip from './ContentBlocks/StatusChip';
import ContextMenuItem from './ContextMenuItem';
import Trash from '../assets/outline/component_type/Trash';
import DeletePopup from '../pages/Requests/components/DeletePopup';
import LoadingScreen from './LoadingScreen';
import { formatDateToTodayOrMonth } from '../pages/Dashboard';
import { formatTimeAgo } from '../pages/AddressBook/pages/ClientProfile';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/store';
import { formatDate } from '../functions/formatDate';

// Define allowed status types
type StatusType =
  | 'unviewed'
  | 'viewed'
  | 'unanswered'
  | 'missed'
  | 'system'
  | 'custom';

// Define types for column and data props
export interface Column {
  label: string;
  width: string;
  sortable?: boolean;
  isStatusChip?: boolean;
  status: StatusType;
}

export interface RowData {
  id?: number | string;
  name: string;
  recipient: string;
  totalForms: number;
  unviewed?: number;
  missed?: number;
  unanswered?: number;
  path?: string;
}

interface TableProps {
  columns: Column[];
  data: any[];
  fetchRequestData: any;
}

const Table = ({ columns, data, fetchRequestData }: TableProps) => {
  const navigate = useNavigate();

  const [showRowOptions, setShowRowOptions] = useState<any[] | null>(null);

  const [toDeleteEditDetails, setToDeleteEditDetails] = useState<any | null>(
    null,
  );

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const { generalAction } = useRequest({
    disableFetch: true,
  });

  const dateFormat = useSelector(
    (state: RootState) => state.authReducer.dateFormat,
  );

  const updateDropdownRowStatus = (id: string, newStatus: boolean) => {
    setShowRowOptions(
      (prevOptions) =>
        prevOptions?.map(
          (option) =>
            option.id === id
              ? { ...option, status: newStatus } // Update the specific row's status
              : { ...option, status: false }, // Set all other rows' status to false
        ) || null,
    );
  };

  const deleteItem = async () => {
    setLoading(true);
    await generalAction({
      queryParameters: `/${toDeleteEditDetails.id}`,
      method: 'DELETE',
    });
    setLoading(false);
    setOpenDeleteModal(false);
    setShowSuccessPopup(true);

    fetchRequestData();
  };

  useEffect(() => {
    if (data) {
      const rowPopupdata = data.map((item: any) => {
        return {
          id: item.id,
          status: false,
        };
      });
      setShowRowOptions(rowPopupdata);
    }
  }, [data]);

  return (
    <>
      <div
        className=" w-full rounded-3xl bg-white overflow-auto h-auto h-[21.8rem] scrollbar-transparent "
        style={{
          overflowY: 'auto',
          overflowX: 'auto',
          scrollbarWidth: 'thin', // For Firefox
        }}
      >
        <table className="table-auto relative w-full rounded-lg border-b border-nt-150">
          <thead className="w-full">
            <tr className="w-full sticky top-0 z-20 border-b border-nt-150 bg-white ">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="p-4"
                  style={{ width: `${column.width}` }}
                >
                  <div className="flex items-center justify-start">
                    {column.isStatusChip ? (
                      <StatusChip label={column.label} status={column.status} />
                    ) : (
                      <>
                        <p className="text-caption-all-caps uppercase text-nt-300">
                          {column.label}
                        </p>
                        {/* {column.sortable && <img src={ChevronUpDown} alt='Sort' />} */}
                      </>
                    )}
                  </div>
                </th>
              ))}
              <th
                className="p-3 sticky top-0 z-20 border-b-1 border-nt-150 bg-white"
                style={{ width: '8%' }}
              ></th>
            </tr>
          </thead>
          <tbody className="bg-white relative z-10">
            {data &&
              showRowOptions &&
              data.map((row, rowIndex) => {
                const transformedData = {
                  status: row.status,
                  name: row.title,
                  recipient: `${row.contact.firstName} ${row.contact.lastName}`,
                  // author: `${row.createdBy.firstName} ${row.createdBy.lastName}`,
                  answered: row.answeredOn
                    ? dateFormat
                      ? formatDate(row.answeredOn, dateFormat)
                      : formatDateToTodayOrMonth(row.answeredOn)
                    : `---`,
                  destroyed: row.isDataDestroyed
                    ? dateFormat
                      ? formatDate(row.destroyedOn, dateFormat)
                      : formatTimeAgo(row.destroyedOn)
                    : `---`,
                  // unviewed: row.status === "UNVIEWED" ? 1 : 0,
                  // missed: row.status === "MISSED" ? 1 : 0,
                  // unanswered: row.status === "UNANSWERED" ? 1 : 0,
                };

                return (
                  <tr
                    key={rowIndex}
                    className={`border-b p-2 bg-white hover:bg-nt-50 cursor-pointer ${
                      row.status === 'UNVIEWED'
                        ? 'text-body-small-str text-nt-900'
                        : 'text-body-small-reg text-nt-700'
                    }`}
                    onClick={() => {
                      row.id &&
                        navigate(`/home/requests/${row.id}/${row.name}`);
                    }}
                  >
                    {Object.entries(transformedData).map(
                      ([key, value], idx) => {
                        // Check if this key should be centered
                        const isCenteredKey = [
                          'unviewed',
                          'unanswered',
                          'missed',
                        ].includes(key);
                        const cellClass = `body-small-reg p-3 ${
                          isCenteredKey ? 'text-center' : ''
                        }`;

                        // Conditionally render the status as a <StatusChip>
                        let cellContent = value ?? '---';
                        if (key === 'status') {
                          cellContent = (
                            <StatusChip
                              label={
                                value.charAt(0).toUpperCase() +
                                value.slice(1).toLowerCase()
                              }
                              status={value.toLowerCase()}
                            />
                          );
                        }

                        return (
                          <td key={idx} className={cellClass}>
                            {cellContent}
                          </td>
                        );
                      },
                    )}

                    <td className="p-4 text-right">
                      <button
                        className="text-body-small-reg text-nt-700 hover:text-pm-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateDropdownRowStatus(
                            showRowOptions[rowIndex].id,
                            !showRowOptions[rowIndex].status,
                          );
                        }}
                      >
                        •••
                      </button>
                      {showRowOptions[rowIndex].status && (
                        <div
                          className="absolute right-0 w-40 mt-1 flex flex-col shadow-elevation-2 bg-white rounded-2xl gap-2 py-2 z-20"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <ContextMenuItem
                            label="Delete"
                            handleClick={() => {
                              setToDeleteEditDetails(row);
                              setOpenDeleteModal(true);
                              updateDropdownRowStatus(
                                showRowOptions[rowIndex].id,
                                !showRowOptions[rowIndex].status,
                              );
                            }}
                            customIcon={<Trash hoverColor="#0046FA" />}
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <DeletePopup
        isOpen={openDeleteModal}
        closeAction={() => {
          setToDeleteEditDetails(null);
          setOpenDeleteModal(false);
        }}
        message={'Warning'}
        subMessage={`Are you sure you want to delete ${toDeleteEditDetails && `${toDeleteEditDetails.title}`} 
                from the Address book?`}
        deleteItem={() => {
          deleteItem();
        }}
        showSuccessPopup={showSuccessPopup}
        closeActionSuccessPopup={() => {
          setToDeleteEditDetails(null);
          setShowSuccessPopup(false);
        }}
      />

      {loading && <LoadingScreen />}
    </>
  );
};

export default Table;
