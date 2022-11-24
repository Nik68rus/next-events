import classes from './ErrorAlert.module.scss';

type Props = {
  children: React.ReactNode;
};

function ErrorAlert(props: Props) {
  return <div className={classes.alert}>{props.children}</div>;
}

export default ErrorAlert;
