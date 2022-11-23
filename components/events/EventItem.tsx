import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IEvent } from '../../types';

type Props = {
  event: IEvent;
};

function EventItem({ event }: Props) {
  const { id, image, title, location, date } = event;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formatedAddress = location.replace(', ', '\n');

  return (
    <li>
      <Image src={`/${image}`} alt={title} width={500} height={300} />
      <div>
        <div>
          <h2>{title}</h2>
          <div>
            <time>{humanReadableDate}</time>
          </div>
          <div>
            <address>{formatedAddress}</address>
          </div>
        </div>
        <div>
          <Link href={`/events/${id}`}>Explore Event</Link>
        </div>
      </div>
    </li>
  );
}

export default EventItem;
