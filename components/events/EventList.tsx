import { IEvent } from '../../types';
import EventItem from './EventItem';

type Props = {
  items: IEvent[];
};

function EventList({ items }: Props) {
  return (
    <ul>
      {items.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  );
}

export default EventList;
