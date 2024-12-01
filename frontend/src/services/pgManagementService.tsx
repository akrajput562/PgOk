
import apiClient from '../utils/axiosInstance';

const API_URL = process.env.API_URL;
export const savePGDetails = async (pgDetails: { pg_name: string; pg_address: string; pg_contact: string }) => {
  console.log('Sending PG details:', pgDetails); // Debug logging
  try {
    const response = await apiClient.post('/pgmgmt/SavePgDtls', pgDetails); // Remove extra object wrapper
    console.log('Response from server:', response.data); // Debug logging
    
  } catch (error:any) {
   
  }
};

export const getPgList = async () => {
  try {
    const response = await apiClient.get('/pgmgmt/GetPgList'); // Adjust endpoint to match your backend
    console.log(response)
    return response.data;
  } catch (error: any) {
    console.error('Front end  Error fetching PG list:', error.message);
    throw error;
  }
};

export const saveFloorDetails = async (floorDetails: { pg_id: string; floor_name: string }) => {
  try {
    const response = await apiClient.post('/pgmgmt/SaveFloorDetails', floorDetails);
    return response.data;
  } catch (error: any) {
    console.error('Error saving floor details:', error.message);
    throw error;
  }
};

