import { GetServerSideProps } from 'next';
// import { useRouter } from 'next/router';
// import { useState, useEffect } from 'react';
import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/ResultsTitle';
import Button from '../../components/ui/Button';
import ErrorAlert from '../../components/ui/ErrorAlert';
import { getFilteredEvents } from '../../helpers/api-util';
import { IEvent } from '../../types';
import { ParsedUrlQuery } from 'querystring';

type Props = {
  events: IEvent[];
  badFilter: boolean;
  date: {
    year: number;
    month: number;
  };
};

interface Params extends ParsedUrlQuery {
  slug: string[];
}

function FilteredEventsPage({ events, badFilter, date }: Props) {
  if (!events) {
    return <p className="center">Loading...</p>;
  }

  if (badFilter) {
    return (
      <div className="center">
        <ErrorAlert>Invalid filter!</ErrorAlert>
        <Button link="/events">Show All events</Button>
      </div>
    );
  }

  const dateVal = new Date(date.year, date.month - 1);

  if (events && !events.length) {
    return (
      <>
        <ResultsTitle date={dateVal} />
        <ErrorAlert>No events this month!</ErrorAlert>
      </>
    );
  }

  return (
    <>
      <ResultsTitle date={dateVal} />
      <EventList items={events} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  context
) => {
  const { slug } = context.params!;
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
    monthNum > 12
  ) {
    badFilter = true;
    yearNum = 0;
    monthNum = 0;
  }

  const events: IEvent[] = badFilter
    ? []
    : await getFilteredEvents({ year: yearNum, month: monthNum });
  return {
    props: {
      events,
      badFilter,
      date: { year: yearNum, month: monthNum },
    },
  };
};

export default FilteredEventsPage;
