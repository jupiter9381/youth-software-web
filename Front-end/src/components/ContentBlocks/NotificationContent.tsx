import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import Avatar, { avatarColors } from '../Avatar';
import { RootState } from '../../reducers/store';
import { useActivityLogs } from '../../services/activityLogs/use-activityLogsAPI';
import { formatDate } from '../../pages/Requests/pages/RequestsViewing';

interface NotificationItem {
  firstName: string;
  lastName: string;
  imgUrl?: string;
  colorVariant: keyof typeof avatarColors | string;
  action: string;
  timeAgo: string;
  number: number;
}

const NotificationContent = () => {
  // RTK slice
  const user = useSelector((state: RootState) => state.authReducer.user);
  const organisationId = useSelector(
    (state: RootState) => state.authReducer.userOrganisationId,
  );
  const token = useSelector((state: RootState) => state.authReducer.token);

  // RTK hook
  const { generalAction } = useActivityLogs({});

  // State
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10;

  // Helper function to transform backend data
  const transformData = (
    data: any[],
    startIndex: number,
  ): NotificationItem[] => {
    return data.map((item, index) => ({
      firstName: item.user?.firstName || 'Unknown',
      lastName: item.user?.lastName || 'User',
      imgUrl: item.contact?.imgUrl || undefined, // If you have profile pictures from contacts
      colorVariant: 'neutral', // Adjust logic if needed
      action: item.message,
      timeAgo: formatTimeAgo(new Date(item.date)), // Format the date into time ago
      number: startIndex + index + 1, // Calculate the number based on the start index
    }));
  };

  // Function to calculate "time ago" format
  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (seconds < 60) return `${seconds} seconds ago`;
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;

    // More than 24 hours ago: return formatted date and time.
    return formatDate(date.toString());
  };

  // Fetch Activity Logs
  const fetchActivityLogs = async () => {
    if (user) {
      const result = await generalAction({
        queryParameters: `/query`,
        method: 'POST',
        body: {
          page,
          limit,
          sort: 'DESC',
          filters: {
            userId: user.id,
          },
        },
      });

      if (result.data) {
        const startIndex = (page - 1) * limit; // Calculate the starting index for this page
        const transformedData = transformData(result.data.data, startIndex);
        setNotifications((prev) => {
          // Filter out duplicates by checking unique identifiers (e.g., a notification ID)
          const uniqueNewData = transformedData.filter(
            (newItem) =>
              !prev.some(
                (existingItem) => existingItem.number === newItem.number,
              ),
          );
          return [...prev, ...uniqueNewData];
        });
        setHasMore(result.data.data.length === limit);
      }
    }
  };

  useEffect(() => {
    fetchActivityLogs();
  }, [page]);
  useEffect(() => {
    if (user && organisationId && token) {
      fetchActivityLogs();
    }
  }, [user, organisationId, token]);

  return (
    <div
      id="scrollableDiv"
      className="h-[85vh] overflow-auto"
      style={{ overflowY: 'auto', scrollbarWidth: 'thin' }}
    >
      <InfiniteScroll
        dataLength={notifications.length}
        next={() => setPage((prev) => prev + 1)}
        hasMore={hasMore}
        loader={
          <p className="text-center text-caption-all-caps uppercase text-nt-500 py-4 ">
            Loading...
          </p>
        } // Loader for fetching more items
        endMessage={
          <p className="text-center text-caption-all-caps uppercase text-nt-500 py-4">
            No More Activity
          </p>
        }
        scrollableTarget="scrollableDiv"
      >
        {notifications.map((notification, index) => (
          <div
            key={index}
            className={`flex flex-col items-start gap-3 py-2.5 px-5 cursor-pointer `}
          >
            {/* <p className='text-caption-all-caps uppercase text-nt-300'>#{notification.number}</p> */}
            {/* Time Ago */}
            <p className="text-caption-all-caps uppercase text-nt-300">
              {notification.timeAgo}
            </p>

            {/* Avatar */}
            <div className="flex gap-3">
              <div>
                <Avatar
                  firstName={notification.firstName}
                  lastName={notification.lastName}
                  imgUrl={notification.imgUrl}
                  colorVariant={notification.colorVariant}
                />
              </div>

              {/* Notification Text */}
              <p className="text-body-small-reg">
                {/* <span className='text-body-small-str'>
                                    {notification.firstName} {notification.lastName}{" "}
                                </span> */}
                {notification.action}
              </p>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default NotificationContent;
