import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/ResultsTitle';
import Button from '../../components/ui/Button';
import ErrorAlert from '../../components/ui/ErrorAlert';
import { getFilteredEvents } from '../../dummy-data';
import { IEvent } from '../../types';

type Props = {};

function FilteredEventsPage({}: Props) {
  const router = useRouter();

  const slug = router.query.slug as string[];

  if (!slug) {
    return <p className="center">Loading...</p>;
  }

  const [year, month] = slug;
  const yearNum = +year;
  const monthNum = +month;

  if (
    isNaN(yearNum) ||
    isNaN(monthNum) ||
    yearNum > 2030 ||
    yearNum < 2020 ||
    monthNum < 1 ||
    monthNum > 12
  ) {
    return (
      <div className="center">
        <ErrorAlert>Invalid filter!</ErrorAlert>
        <Button link="/events">Show All events</Button>
      </div>
    );
  }

  const events = getFilteredEvents({ year: yearNum, month: monthNum });
  const date = new Date(yearNum, monthNum - 1);

  if (!events.length) {
    return (
      <>
        <ResultsTitle date={date} />
        <ErrorAlert>No events this month!</ErrorAlert>
      </>
    );
  }

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={events} />
    </>
  );
}

export default FilteredEventsPage;
