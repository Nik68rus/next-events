import classes from './LogisticsItem.module.scss';

type Props = {
  children: React.ReactNode;
  icon: React.ElementType;
};

function LogisticsItem(props: Props) {
  const { icon: Icon } = props;

  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{props.children}</span>
    </li>
  );
}

export default LogisticsItem;
