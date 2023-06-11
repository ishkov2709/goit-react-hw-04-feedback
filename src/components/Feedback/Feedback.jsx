import { useReducer } from 'react';
import { Wrapper, NotificationMessage } from './Feedback.styled';
import Statistics from './Statistics';
import FeedbackOptions from './FeedbackOptions';
import Section from './Section';

const Feedback = () => {
  const initialState = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'good':
        return { ...state, good: state.good + 1 };

      case 'neutral':
        return { ...state, neutral: state.neutral + 1 };

      case 'bad':
        return { ...state, bad: state.bad + 1 };

      default:
        throw new Error();
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const { good, neutral, bad } = state;

  const countTotalFeedback = () => {
    return Object.values(state).reduce((total, value) => {
      return total + value;
    }, 0);
  };

  const countPositiveFeedbackPercentage = total => {
    return `${Math.round((good / total) * 100)}%`;
  };
  const total = countTotalFeedback();
  const res = countPositiveFeedbackPercentage(total);

  return (
    <Wrapper>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys(state)}
          onClick={dispatch}
        ></FeedbackOptions>
      </Section>

      <Section title="Statistics">
        {total > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={res}
          />
        ) : (
          <NotificationMessage>There is no feedback</NotificationMessage>
        )}
      </Section>
    </Wrapper>
  );
};

export default Feedback;
