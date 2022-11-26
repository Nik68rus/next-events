import fs from 'fs/promises';
import path from 'path';
import EventList from '../components/events/EventList';
import { getFeaturedEvents } from '../helpers/api-util';
import { IEvent } from '../types';

type Props = {
  events: IEvent[];
};

function HomePage({ events }: Props) {
  return (
    <div>
      <EventList items={events} />
    </div>
  );
}

export async function getStaticProps() {
  const events = await getFeaturedEvents();

  return {
    props: {
      events,
    },
    revalidate: 1800,
  };
}

export default HomePage;
