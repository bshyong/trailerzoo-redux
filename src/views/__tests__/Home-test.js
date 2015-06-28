var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils');
var Home = require('../Home');

describe('Home', () => {
  it('renders', () => {
    var element = TestUtils.renderIntoDocument(<Home />);
    expect(element).toBeTruthy();
  });
});
