import { GetServerSideProps } from 'next';
import useSwr from 'swr';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/ResultsTitle';
import Button from '../../components/ui/Button';
import ErrorAlert from '../../components/ui/ErrorAlert';
import { getFilteredEvents } from '../../helpers/api-util';
import { IEvent } from '../../types';
import { ParsedUrlQuery } from 'querystring';
import Head from 'next/head';

type Props = {};

interface Params extends ParsedUrlQuery {
  slug: string[];
}

function FilteredEventsPage({}: Props) {
  const router = useRouter();

  const slug = router.query.slug as string[];

  const [fetchedEvents, setFetchedEvents] = useState<IEvent[]>([]);

  const { data, error } = useSwr(
    'https://nextjs-course-ef524-default-rtdb.firebaseio.com/events.json',
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const events: IEvent[] = [];
      for (const id in data) {
        events.push({ id, ...data[id] });
      }

      setFetchedEvents(events);
    }
  }, [data]);

  if (!fetchedEvents || !slug) {
    return <p className="center">Loading...</p>;
  }

  const [year, month] = slug;
  let yearNum = +year;
  let monthNum = +month;
  let badFilter = false;

  if (
    isNaN(yearNum) ||
    isNaN(monthNum) ||
    yearNum > 2030 ||
    yearNum < 2020 ||
    monthNum < 1 ||
    monthNum > 12 ||
    error
  ) {
    return (
      <div className="center">
        <ErrorAlert>Invalid filter!</ErrorAlert>
        <Button link="/events">Show All events</Button>
      </div>
    );
  }

  const dateVal = new Date(yearNum, monthNum - 1);

  let filteredEvents = fetchedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === yearNum &&
      eventDate.getMonth() === monthNum - 1
    );
  });

  if (fetchedEvents.length && !filteredEvents.length) {
    return (
      <>
        <ResultsTitle date={dateVal} />
        <ErrorAlert>No events this month!</ErrorAlert>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Filtered Events</title>
        <meta name="description" content="Plenty of events to join" />
      </Head>

      <ResultsTitle date={dateVal} />
      <EventList items={filteredEvents} />
    </>
  );
}

// export const getServerSideProps: GetServerSideProps<Props, Params> = async (
//   context
// ) => {
//   const { slug } = context.params!;
//   const [year, month] = slug;
//   let yearNum = +year;
//   let monthNum = +month;
//   let badFilter = false;

//   if (
//     isNaN(yearNum) ||
//     isNaN(monthNum) ||
//     yearNum > 2030 ||
//     yearNum < 2020 ||
//     monthNum < 1 ||
//     monthNum > 12
//   ) {
//     badFilter = true;
//     yearNum = 0;
//     monthNum = 0;
//   }

//   const events: IEvent[] = badFilter
//     ? []
//     : await getFilteredEvents({ year: yearNum, month: monthNum });
//   return {
//     props: {
//       events,
//       badFilter,
//       date: { year: yearNum, month: monthNum },
//     },
//   };
// };

export default FilteredEventsPage;
