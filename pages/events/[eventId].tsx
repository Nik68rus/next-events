import { GetStaticProps } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import EventContent from '../../components/event-detail/EventContent';
import EventLogistics from '../../components/event-detail/EventLogistics';
import EventSummary from '../../components/event-detail/EventSummary';
import ErrorAlert from '../../components/ui/ErrorAlert';
import { getFeaturedEvents, getEventById } from '../../helpers/api-util';
import { IEvent } from '../../types';

type Props = {
  event: IEvent | null;
};

interface Params extends ParsedUrlQuery {
  eventId: string;
}

function EventDetailPage({ event }: Props) {
  // const router = useRouter();
  // const eventId = router.query.eventId as string;

  // const event = getEventById(eventId);

  if (!event) {
    return <ErrorAlert>Loading...</ErrorAlert>;
  }

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>

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

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const { eventId } = context.params!;
  const event = await getEventById(eventId);

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      event,
    },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents();
  const ids = events.map((event) => event.id);
  const paths = ids.map((id) => ({ params: { eventId: id } }));

  return {
    paths,
    fallback: true,
  };
};

export default EventDetailPage;
