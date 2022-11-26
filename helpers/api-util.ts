// import axios from 'axios';
import { IEvent } from '../types';

type EventsResponse = {
  [key: string]: Omit<IEvent, 'id'>;
};

export const getAllEvents = async () => {
  // const { data } = await axios.get<EventsResponse>(
  //   'https://nextjs-course-ef524-default-rtdb.firebaseio.com/events.json'
  // );
  const response = await fetch(
    'https://nextjs-course-ef524-default-rtdb.firebaseio.com/events.json'
  );
  const data = (await response.json()) as EventsResponse;
  const events: IEvent[] = [];
  for (const id in data) {
    events.push({ id, ...data[id] });
  }

  return events;
};

export const getFeaturedEvents = async () => {
  const data = await getAllEvents();

  return data.filter((e) => e.isFeatured);
};

export const getEventById = async (id: string) => {
  const data = await getAllEvents();
  const event = data.find((e) => e.id === id);

  return event ? event : null;
};

export const getFilteredEvents = async (dateFilter: {
  year: number;
  month: number;
}) => {
  const { year, month } = dateFilter;
  const events = await getAllEvents();

  let filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};
