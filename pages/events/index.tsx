import { useRouter } from 'next/router';
import { useState } from 'react';
import EventList from '../../components/events/EventList';
import EventsSearch from '../../components/events/EventsSearch';
import { getAllEvents } from '../../helpers/api-util';
import fs from 'fs/promises';
import path from 'path';
import { IEvent } from '../../types';

type Props = {
  events: IEvent[];
};

function AllEventsPage({ events }: Props) {
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

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 60,
  };
}

export default AllEventsPage;
