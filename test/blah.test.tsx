import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Accountable } from '../src';

function mockFetch(data: any) {
  return jest.fn().mockImplementation(() => {
    return Promise.resolve({
      ok: true,
      json: () => data,
    });
  });
}

let container: any;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

const Form = () => null;

describe('Accountable', () => {
  it('renders without crashing', () => {
    act(() => {
      window.fetch = mockFetch({}); // or window.fetch
      ReactDOM.render(
        <Accountable formComponent={Form} url="...">
          <div />
        </Accountable>,
        container
      );
    });
    expect(window.fetch).toHaveBeenCalledTimes(1);
  });
});
