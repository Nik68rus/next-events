import React from 'react';
import EventList from '../components/events/EventList';
import { getFeaturedEvents } from '../dummy-data';

type Props = {};

function HomePage({}: Props) {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}

export default HomePage;
