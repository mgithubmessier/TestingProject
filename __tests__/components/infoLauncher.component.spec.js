import React from 'react';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { InfoLauncher } from '../../components/infoLauncher/infoLauncher.component';

enzyme.configure({ adapter: new Adapter() });
const renderWithProps = (props = {}, method = 'shallow') => enzyme[method](<InfoLauncher {...props} />);

describe('InfoLauncher', () => {
  describe('launchAlert', () => {
    it('should launch an alert containing the info property when pressed', () => {
      // arrange
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
      const wrapper = renderWithProps({ info: 'mockInfo' });
      expect(alertSpy).not.toHaveBeenCalled();

      // act
      wrapper.find('.clickable').simulate('press');

      // assert
      expect(alertSpy).toHaveBeenCalled();
    });
  });
});