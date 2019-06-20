import { get } from '../../services/content/content.service';
import axios from 'axios';

// mocking 3rd party libraries
jest.mock('axios');

describe('ContentService', () => {
  describe('get', () => {
    it('should map the data property to the resolution of the promise', (done) => {
      // unique mock value
      axios.get.mockReturnValue(Promise.resolve({ data: 'mockData'}));

      get('mockEndpoint').then(data => {
        expect(data).toEqual('mockData');
      }).catch(fail).finally(done);
    });
    it('should call alert when an error in the API occurs', (done) => {
      // unique mock value
      axios.get.mockReturnValue(Promise.reject());

      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
      get('mockEndpoint').then(() => {
        expect(alertSpy).toHaveBeenCalled();
      }).catch(fail).finally(done);
    });
  });
});