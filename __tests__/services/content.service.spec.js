import { get } from '../../services/content/content.service';
import axios from 'axios';

jest.mock('axios');

describe('ContentService', () => {
  describe('get', () => {
    it('should map the data property to the resolution of the promise', (done) => {
      axios.get.mockResolvedValue(Promise.resolve({ data: 'mockData'}));
      get('mockEndpoint').then(data => {
        try {
          expect(data).toEqual('mockData');
        } catch(error) {
          fail(error);
        } finally {
          done();
        }
      });
    });
    it('should call alert when an error in the API occurs', (done) => {
      axios.get.mockResolvedValue(Promise.reject());
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
      get('mockEndpoint').then(() => {
        try {
          expect(alertSpy).toHaveBeenCalled();
        } catch(error) {
          fail(error);
        } finally {
          done();
        }
      });
    });
  });
});