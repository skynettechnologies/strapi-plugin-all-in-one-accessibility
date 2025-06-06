// 'use strict';

/**
 *  service
 */

// const { createCoreService } = require('@strapi/strapi').factories;

// module.exports = createCoreService('plugin::all-in-one-accessibility.settings');

'use strict';
// import React, {document} from 'react';

// import SettingsApiHandler from '../../admin/src/API/settings';

module.exports = ({ strapi }) => ({
  /**
   * Get Settings from Strapi Database
   */
  async getSettings(query) {
    strapi.db.query('plugin::all-in-one-accessibility.settings')
    const q = strapi.entityService.findMany("plugin::all-in-one-accessibility.settings",);
    return await q;
  },
  async deleteSettings(id) {
    return await strapi.entityService.delete("plugin::all-in-one-accessibility.settings", id);
  },

  async createSettings(data) {
    return await strapi.entityService.create("plugin::all-in-one-accessibility.settings", data);
  },

  async updateSettings(id, data) {
    return await strapi.entityService.update("plugin::all-in-one-accessibility.settings", id, data);
  },

  async addScript() {
    // // Path to the public/index.html file
    // const indexPath = 'public/index.html';

    try {
      // // Read the content of the index.html file
      // let content = fs.readFileSync(indexPath, 'utf8');

      // Check if the script is already present in the file
      // Make an API request to your Strapi service to fetch the latest dynamic values
      const fs = require('fs');

      strapi.db.query('plugin::all-in-one-accessibility.settings')
      const q = strapi.entityService.findMany("plugin::all-in-one-accessibility.settings",);

      const settings = await q;
      console.log("settings: ", settings);
      var hexaColorCode = "420083", licensekey = "", IconPosition = "bottom_right", IconType = "aioa-icon-type-1", IconSize = "aioa-default-icon";

      if (settings.length > 0) {
        if (Object.keys(settings[0]).length !== 0) {

          // console.log("License Key", settings[0]["License_Key"]);
          console.log("Color Code", settings[0]["Color_Code"]);
          console.log("Icon Position", settings[0]["Icon_Position"]);
          console.log("Icon Type", settings[0]["Icon_Type"]);
          console.log("Icon Size", settings[0]["Icon_Size"]);

          hexaColorCode = settings[0]["Color_Code"];
          // licensekey = settings[0]["License_Key"];
          licensekey = "";
          IconPosition = settings[0]["Icon_Position"];
          IconType = settings[0]["Icon_Type"];
          IconSize = settings[0]["Icon_Size"];

        }
      }

      // Check if the public directory exists, and create it if not
      if (!fs.existsSync('public')) {
        fs.mkdirSync('public');
      }

      // Define the paths to your header, footer, and index files
      const headerPath = 'public/header.html'; // Update with your actual header path
      const footerPath = 'public/footer.html'; // Update with your actual footer path
      const indexPath = 'public/index.html'; // Update with your actual index path

      // Function to add the script to a file
      const addScriptToFile = (filePath) => {
        if (fs.existsSync(filePath)) {
          let content = fs.readFileSync(filePath, 'utf8');

          if (content.includes('aioa-adawidget')) {

            const scriptToAdd = `
<script id="aioa-adawidget" src="https://www.skynettechnologies.com/accessibility/js/all-in-one-accessibility-js-widget-minify.js?colorcode=${hexaColorCode}&token=${licensekey}&position=${IconPosition}.${IconType}.${IconSize}"></script>`;

            // Define the script with the dynamically fetched values
            //const scriptToAdd = `<script id="aioa-adawidget" src="https://www.skynettechnologies.com/accessibility/js/all-in-one-accessibility-js-widget-minify.js?colorcode=${hexaColorCode}&token=${licensekey}&position=${IconPosition}.${IconType}.${IconSize}"></script>`;

            // Update the script parameters in the HTML content
            content = content.replace(/<script id="aioa-adawidget".*<\/script>/, scriptToAdd);

            // Write the updated content back to the index.html file
            fs.writeFileSync(filePath, content, 'utf8');

            console.log('Script parameters updated in ',filePath);
          } else {
            const scriptToAdd = `
<script id="aioa-adawidget" src="https://www.skynettechnologies.com/accessibility/js/all-in-one-accessibility-js-widget-minify.js?colorcode=${hexaColorCode}&token=${licensekey}&position=${IconPosition}.${IconType}.${IconSize}"></script>`;
            //const scriptToAdd = `<script id="aioa-adawidget" src="https://www.skynettechnologies.com/accessibility/js/all-in-one-accessibility-js-widget-minify.js?colorcode=${hexaColorCode}&token=${licensekey}&position=${IconPosition}.${IconType}.${IconSize}"></script>`;

            content += scriptToAdd;
            // Write the updated content back to the index.html file
            fs.writeFileSync(filePath, content, 'utf8');

            console.log('Script is not present in ',filePath);
          }
        }
      };

      // Add the script to the header, footer, or index file if it exists
      if (fs.existsSync(headerPath)) {
        addScriptToFile(headerPath);
      } else if (fs.existsSync(footerPath)) {
        addScriptToFile(footerPath);
      } else if (fs.existsSync(indexPath)) {
        if (!fs.existsSync(indexPath)) {
          fs.writeFileSync(indexPath, '<!DOCTYPE html><html><head></head><body></body></html>', 'utf8');
        }
        addScriptToFile(indexPath);
      }
      console.log('Script added or updated in header, footer, or index file');

    } catch (err) {
      console.error('Error updating script parameters in public/index.html:', err);
    }
  },
  /*async MyComponent() {
    strapi.db.query('plugin::all-in-one-accessibility.settings')
  const q = strapi.entityService.findMany("plugin::all-in-one-accessibility.settings",);

  const settings = await q;
  console.log("settings: ", settings);
  var hexaColorCode = "420083", licensekey = "", IconPosition = "bottom_right", IconType = "aioa-icon-type-1", IconSize = "aioa-default-icon";

  if (settings.length > 0) {
    if (Object.keys(settings[0]).length !== 0) {

      console.log("License Key", settings[0]["License_Key"]);
      console.log("Color Code", settings[0]["Color_Code"]);
      console.log("Icon Position", settings[0]["Icon_Position"]);
      console.log("Icon Type", settings[0]["Icon_Type"]);
      console.log("Icon Size", settings[0]["Icon_Size"]);

      hexaColorCode = settings[0]["Color_Code"];
      licensekey = settings[0]["License_Key"];
      IconPosition = settings[0]["Icon_Position"];
      IconType = settings[0]["Icon_Type"];
      IconSize = settings[0]["Icon_Size"];

    }
  }
},
MyComponent: async (ctx) => {

  strapi.db.query('plugin::all-in-one-accessibility.settings')
  const q = strapi.entityService.findMany("plugin::all-in-one-accessibility.settings",);

  const settings = await q;
  console.log("settings: ", settings);
  var hexaColorCode = "420083", licensekey = "", IconPosition = "bottom_right", IconType = "aioa-icon-type-1", IconSize = "aioa-default-icon";

  if (settings.length > 0) {
    if (Object.keys(settings[0]).length !== 0) {

      console.log("License Key", settings[0]["License_Key"]);
      console.log("Color Code", settings[0]["Color_Code"]);
      console.log("Icon Position", settings[0]["Icon_Position"]);
      console.log("Icon Type", settings[0]["Icon_Type"]);
      console.log("Icon Size", settings[0]["Icon_Size"]);

      hexaColorCode = settings[0]["Color_Code"];
      licensekey = settings[0]["License_Key"];
      IconPosition = settings[0]["Icon_Position"];
      IconType = settings[0]["Icon_Type"];
      IconSize = settings[0]["Icon_Size"];

    }
  }
  const scriptUrl = `https://www.skynettechnologies.com/accessibility/js/all-in-one-accessibility-js-widget-minify.js?colorcode=${hexaColorCode}&token=${licensekey}&position=${IconPosition}.${IconType}.${IconSize}`;

  // Function to attach the script
  function attachScript(src, id, callback) {
    const existingScript = ctx.document.getElementById(id);

    if (!existingScript) {
      const script = ctx.document.createElement('script');
      script.src = src;
      script.id = id;

      script.onload = () => {
        if (callback) {
          callback();
        }
      };

      ctx.document.head.appendChild(script);
    } else if (callback) {
      callback();
    }
  }

  // Attach the script when the controller is called
  attachScript(scriptUrl, 'aioa-adawidget', () => {
    // The script has been successfully attached and loaded
    // You can use the script's functionality here

    // For example, you can send a response to the client:
    return ctx.send({ message: 'Script attached successfully' });
  });
},*/
});



// function attachScript(src, id, callback) {
//   const existingScript = document.getElementById(id);

//   if (!existingScript) {
//     const script = document.createElement('script');
//     script.src = src;
//     script.id = id;
//     script.async = true;

//     script.onload = () => {
//       if (callback) {
//         callback();
//       }
//     };

//     document.head.appendChild(script);
//   } else if (callback) {
//     callback();
//   }
// }

// function MyComponent() {
  
//   useEffect(async () => {

//     strapi.db.query('plugin::all-in-one-accessibility.settings')
//     const q = strapi.entityService.findMany("plugin::all-in-one-accessibility.settings",);

//     const settings = await q;
//     console.log("settings: ", settings);
//     var hexaColorCode = "420083", licensekey = "", IconPosition = "bottom_right", IconType = "aioa-icon-type-1", IconSize = "aioa-default-icon";

//     if (settings.length > 0) {
//       if (Object.keys(settings[0]).length !== 0) {

//         console.log("License Key", settings[0]["License Key"]);
//         console.log("Color Code", settings[0]["Color Code"]);
//         console.log("Icon Position", settings[0]["Icon Position"]);
//         console.log("Icon Type", settings[0]["Icon Type"]);
//         console.log("Icon Size", settings[0]["Icon Size"]);

//         hexaColorCode = settings[0]["Color Code"];
//         licensekey = settings[0]["License Key"];
//         IconPosition = settings[0]["Icon Position"];
//         IconType = settings[0]["Icon Type"];
//         IconSize = settings[0]["Icon Size"];

//       }
//     }

//     const scriptUrl = `https://www.skynettechnologies.com/accessibility/js/all-in-one-accessibility-js-widget-minify.js?colorcode=${hexaColorCode}&token=${licensekey}&position=${IconPosition}.${IconType}.${IconSize}`;

//     attachScript(scriptUrl, 'aioa-adawidget', () => {
//       // The script has been successfully attached and loaded
//       // You can use the script's functionality here
//     });
//   }, []);

//   return (
//     <div>
//       {/* Your component content */}
//     </div>
//   );
// }

// export default MyComponent;
