import { useReducer } from 'react';
import { Wrapper, NotificationMessage } from './App.styled';
import Statistics from './Statistics';
import FeedbackOptions from './FeedbackOptions';
import Section from './Section';

export const App = () => {
  const initialState = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  const reducer = (state, { type }) => {
    switch (type) {
      case 'good':
        return { ...state, [type]: state[type] + 1 };

      case 'neutral':
        return { ...state, [type]: state[type] + 1 };

      case 'bad':
        return { ...state, [type]: state[type] + 1 };

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
    <div
      style={{
        paddingTop: '60px',
        height: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
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
    </div>
  );
};
