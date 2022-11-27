import { useRef } from 'react';
import { isEmail } from '../../helpers/validator';
import classes from './NewsletterRegistration.module.scss';
import { toast } from 'react-toastify';

function NewsletterRegistration() {
  const emailInputRef = useRef<HTMLInputElement | null>(null);

  function registrationHandler(event: React.FormEvent<HTMLFormElement>) {
    const postSignup = async (email: string) => {
      if (!emailInputRef.current) return;
      try {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();

        if (data.ok) {
          toast('You are subscribed now');
          emailInputRef.current.value = '';
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        if (error instanceof Error) {
          toast(error.message);
        }
      }
    };
    event.preventDefault();
    const email = emailInputRef.current?.value;

    if (email && isEmail(email)) {
      postSignup(email);
    } else {
      toast('Wrong email format');
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            ref={emailInputRef}
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
