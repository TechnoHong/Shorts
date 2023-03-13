import { instance } from './CommonAxios';

export default {
  getSampleData() {
    return instance({
      url: '',
      method: 'GET',
    });
  },
};
