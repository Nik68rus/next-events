interface IEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
}

interface ICommentBody {
  email: string;
  name: string;
  text: string;
}
interface IComment extends ICommentBody {
  _id: string;
  eventId: string;
}

export type { IEvent, ICommentBody, IComment };
