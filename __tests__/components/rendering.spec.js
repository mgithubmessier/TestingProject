import React from 'react';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Parent } from '../../components/rendering/parent.component';
import { Child } from '../../components/rendering/child.component';

enzyme.configure({ adapter: new Adapter() });
const renderWithProps = (props = {}, method = 'shallow') => enzyme[method](<Parent {...props} />);

describe('Rendering Test', () => {
  describe('shallow', () => {
    it('should not render the contents on the child component', () => {
      const wrapper = renderWithProps({}, 'shallow');

      expect(wrapper.find('.child-item').length).toEqual(0);
    });
    it('should render the contents of a specific child component if we use dive', () => {
      const wrapper = renderWithProps({}, 'shallow');

      expect(wrapper.find(Child).dive().find('.child-item').length).toEqual(1);
    });
    it('should be able to get the topmost wrapping element, in this case, the parent container', () => {
      const wrapper = renderWithProps({}, 'shallow');

      const element = wrapper.getElement();

      expect(wrapper.find('.parent-container').getElement()).toEqual(element);
    });
  });
  describe('render', () => {

  });
  describe('mount', () => {
    // TODO find a way to stop the syntax problem that occurs when using enzyme.mount()
    const origConsole = console.error;
    beforeEach(() => {
      console.error = () => {};
    })
    afterEach(() => {
      console.error = origConsole;
    });


    it('should render the contents of the child component by default', () => {
      const wrapper = renderWithProps({}, 'mount');

      /**
       * need to use hostNodes here because rendered children have their higher order components
       * changed to the same element as their first child.
       * @see https://airbnb.io/enzyme/docs/api/ShallowWrapper/hostNodes.html
       */
      expect(wrapper.find('.child-item').hostNodes().length).toEqual(1);
    });
    it('should be able to retireve the outermost DOM node', () => {
      const wrapper = renderWithProps({}, 'mount');

      expect(wrapper.getDOMNode().className).toEqual('parent-container')
    });

    it('should be able to get a React Component instance from one that has the ref prop attached to it', () => {
      const wrapper = renderWithProps({}, 'mount');

      expect(wrapper.ref('child-ref').refFunction()).toEqual('ref-func');
    });
  });
});