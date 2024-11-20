module.exports = {
    async up() {
      // Add the script tag to the homepage content
      const homepage = await strapi.query('page').findOne({ slug: 'homepage' });
      const licenseKey = ''; // Replace with your actual license key
      const hexaColorCode = '420083'; // Replace with your actual color code
      const iconType = 'aioa-icon-type-1'; // You can set the desired icon type
      const iconSize = 'aioa-default-icon'; // You can set the desired icon size
      const iconPosition = 'bottom_right'; // You can set the desired icon position
      homepage.content += `<script id="aioa-adawidget" src="https://www.skynettechnologies.com/accessibility/js/all-in-one-accessibility-js-widget-minify.js?colorcode=${hexaColorCode}&token=${licenseKey}&position=${iconPosition}"></script>`;
      await strapi.query('page').update({ id: homepage.id }, { content: homepage.content });
    },
  
    async down() {
      // Define rollback logic if needed
    },
  };
  