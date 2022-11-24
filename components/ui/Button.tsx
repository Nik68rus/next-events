import Link from 'next/link';
import classes from './Button.module.scss';
type Props = {
  children: React.ReactNode;
  link?: string;
  onClick?: () => {};
};

function Button({ children, link, onClick }: Props) {
  if (link) {
    return (
      <Link href={link} className={classes.btn}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes.btn} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
