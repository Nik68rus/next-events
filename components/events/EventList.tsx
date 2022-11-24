import { IEvent } from '../../types';
import EventItem from './EventItem';
import classes from './EventList.module.scss';

type Props = {
  items: IEvent[];
};

function EventList({ items }: Props) {
  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  );
}

export default EventList;
