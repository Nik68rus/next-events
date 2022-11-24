import { useRouter } from 'next/router';
import { isEmptyBindingElement } from 'typescript';
import EventContent from '../../components/event-detail/EventContent';
import EventLogistics from '../../components/event-detail/EventLogistics';
import EventSummary from '../../components/event-detail/EventSummary';
import ErrorAlert from '../../components/ui/ErrorAlert';
import { getEventById } from '../../dummy-data';

type Props = {};

function EventDetailPage({}: Props) {
  const router = useRouter();
  const eventId = router.query.eventId as string;

  const event = getEventById(eventId);

  if (!event) {
    return <ErrorAlert>Event not found!</ErrorAlert>;
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}

export default EventDetailPage;
