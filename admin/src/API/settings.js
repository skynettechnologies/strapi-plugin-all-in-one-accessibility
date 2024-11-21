// import { request } from "@strapi/helper-plugin";
// After

import axios from 'axios';

const SettingsApiHandler = {
  /**
   * This API is used to Get All saved settings
   */
  getAllSettings: async () => {
    try {
      const response = await axios.get('/all-in-one-accessibility/getsettings');
      return response.data; // Adjust if the response format is different
    } catch (error) {
      console.error('Error fetching settings:', error);
      throw error;
    }
  },

  /**
   * This API is used to Add Settings 
   */
  addSettings: async (data) => {
    try {
      const response = await axios.post('/all-in-one-accessibility/createsettings', {
        data,
      });
      return response.data;
    } catch (error) {
      console.error('Error adding settings:', error);
      throw error;
    }
  },

  /**
   * This API is used to update settings
   */
  editSettings: async (id, data) => {
    try {
      const response = await axios.put(`/all-in-one-accessibility/updatesettings/${id}`, {
        data,
      });
      return response.data;
    } catch (error) {
      console.error('Error editing settings:', error);
      throw error;
    }
  },

  deleteSettings: async (id) => {
    try {
      const response = await axios.delete(`/all-in-one-accessibility/deletesettings/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting settings:', error);
      throw error;
    }
  },
};

export default SettingsApiHandler;


// import { request } from '@strapi/strapi/admin';

// const SettingsApiHandler = {

//   getAllSettings: async () => {
//     return await request("/all-in-one-accessibility/getsettings", {
//       method: "GET",
//     });
//   },
//   addSettings: async (data) => {
//     return await request(`/all-in-one-accessibility/createsettings`, {
//       method: "POST",
//       body: { data: data },
//     });
//   },
//   editSettings: async (id, data) => {
//     return await request("/all-in-one-accessibility/updatesettings/"+id, {
//       method: "PUT",
//       body: { data: data },
//     });
//   },
//   deleteSettings: async (id) => {
//     return await request("/all-in-one-accessibility/deletesettings/"+id, {
//       method: "DELETE",
//     });
//   },
// };
// export default SettingsApiHandler;
