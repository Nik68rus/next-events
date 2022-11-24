import { useRouter } from 'next/router';
import { useState } from 'react';
import EventList from '../../components/events/EventList';
import EventsSearch from '../../components/events/EventsSearch';
import { getAllEvents } from '../../dummy-data';

type Props = {};

function AllEventsPage({}: Props) {
  const events = getAllEvents();
  const router = useRouter();

  const eventsSearchHandler = (year: string, month: string) => {
    router.push(`/events/${year}/${month}`);
  };

  return (
    <>
      <EventsSearch onSearch={eventsSearchHandler} />
      <EventList items={events} />
    </>
  );
}

export default AllEventsPage;
