import classes from './EventContent.module.scss';

type Props = {
  children: React.ReactNode;
};

function EventContent(props: Props) {
  return <section className={classes.content}>{props.children}</section>;
}

export default EventContent;
