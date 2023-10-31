import { request } from "@strapi/helper-plugin";

const SettingsApiHandler = {

  getAllSettings: async () => {
    return await request("/all-in-one-accessibility/getsettings", {
      method: "GET",
    });
  },
  addSettings: async (data) => {
    return await request(`/all-in-one-accessibility/createsettings`, {
      method: "POST",
      body: { data: data },
    });
  },
  editSettings: async (id, data) => {
    return await request("/all-in-one-accessibility/updatesettings/"+id, {
      method: "PUT",
      body: { data: data },
    });
  },
  deleteSettings: async (id) => {
    return await request("/all-in-one-accessibility/deletesettings/"+id, {
      method: "DELETE",
    });
  },
};
export default SettingsApiHandler;
