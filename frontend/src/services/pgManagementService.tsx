
import apiClient from '../utils/axiosInstance';


export const savePGDetails = async (pgDetails: { name: string; location: string; contact: string }) => {
  try {
    const response = await apiClient.post('/pgmgmt/SavePgDtls', { pgDetails });
    console.log('PG Details Saved:', response.data);
    alert('PG details saved successfully!');
  } catch (error) {
    console.error('Error saving PG details:', error);
    alert('Failed to save PG details. Please try again.');
  }
};

// Example of a service to fetch PG details for editing
// export const fetchPGDetails = async (pgId: number) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/pg/${pgId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Service Error:", error.response || error);
//     throw error.response ? error.response.data : new Error("Failed to fetch PG details.");
//   }
// };
