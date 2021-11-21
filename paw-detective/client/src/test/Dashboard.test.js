import { render, screen } from '@testing-library/react';
import Dashboard from '../components/Dashboard/Dashboard';
import shallow from 'enzyme';

test('renders learn react link', () => {
  const wrapper = shallow(<Dashboard />);
  const uploadBtn = screen.getByText(/Upload Pet/i, {
      disableLifecycleMethods: true
  });
  expect(wrapper.containsMatchingElement(<button>Upload Pet</button>)).toBe(uploadBtn);
});
