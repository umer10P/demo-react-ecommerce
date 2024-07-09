const mockAxios = jest.createMockFromModule('axios');

let mockResponseData: any = null;
let mockError: any = null;

function __setMockResponse(data: any) {
  mockResponseData = data;
}

function __setMockError(error: any) {
  mockError = error;
}

mockAxios.get = jest.fn().mockImplementation((url: string) => {
  return new Promise((resolve, reject) => {
    if (mockError) {
      reject(mockError);
    } else {
      resolve({ data: mockResponseData });
    }
  });
});

mockAxios.__setMockResponse = __setMockResponse;
mockAxios.__setMockError = __setMockError;

export default mockAxios;
