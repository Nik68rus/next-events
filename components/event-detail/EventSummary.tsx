import classes from './EventSummary.module.scss';

type Props = {
  title: string;
};

function EventSummary(props: Props) {
  const { title } = props;

  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
}

export default EventSummary;
