import axios from 'axios';

export const verifyAadharWithVendor = async (aadharNumber: string, aadharImage: Express.Multer.File) => {
  //1. Basic 12-digit format validation
  const aadharRegex = /^\d{12}$/;
  if (!aadharRegex.test(aadharNumber)) {
    throw new Error('Invalid Aadhar format: Must be a 12-digit number'); 
  }

  try {
    //2. Prepare data for external API call
    //Note: This usually requires a licensed 3rd-party vendor API key
    const formData = new FormData();
    formData.append('aadharNumber', aadharNumber);
    //In a real scenario, you'd send the image or its cloud storage URL [cite: 7, 8]

    //MOCK API CALL for the current development phase
    //In production, replace with: await axios.post('https://vendor-api.com/erify', formData, { ..config });
    const mockResponce = { data: { success: true, message: 'Aadhar Verified' } };

    if (!mockResponse.data.success) {
      throw new Error('Aadhar Verification Failed'); 
    }

    return mockResponse.data; 
  } catch (error) {
    console.error('External API Verification Error', error);
    throw new Error('Aadhar Verification Failed');
  } 
};
