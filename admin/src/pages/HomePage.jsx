// import { Main } from '@strapi/design-system';
// import { useIntl } from 'react-intl';

// import { getTranslation } from '../utils/getTranslation';

// const HomePage = () => {
//   const { formatMessage } = useIntl();

//   return (
//     <Main>
//       <h1>Welcome to {formatMessage({ id: getTranslation('plugin.name') })}</h1>
//     </Main>
//   );
// };

// export { HomePage };

/*
 *
 * HomePage of All in One Accessibility Settings Page
 *
 */

import React, { useCallback, useState, useEffect, ChangeEvent } from 'react';
import { Form, Button, Image } from 'react-bootstrap';
import { InputGroup, FormControl, Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';

import aioaicontype1 from '../../../assets/images/aioa-icon-type-1.svg';
import aioaicontype2 from '../../../assets/images/aioa-icon-type-2.svg';
import aioaicontype3 from '../../../assets/images/aioa-icon-type-3.svg';
import aioaicontype4 from '../../../assets/images/aioa-icon-type-4.svg';
import aioaicontype5 from '../../../assets/images/aioa-icon-type-5.svg';
import aioaicontype6 from '../../../assets/images/aioa-icon-type-6.svg';
import aioaicontype7 from '../../../assets/images/aioa-icon-type-7.svg';
import aioaicontype8 from '../../../assets/images/aioa-icon-type-8.svg';
import aioaicontype9 from '../../../assets/images/aioa-icon-type-9.svg';
import aioaicontype10 from '../../../assets/images/aioa-icon-type-10.svg';
import aioaicontype11 from '../../../assets/images/aioa-icon-type-11.svg';
import aioaicontype12 from '../../../assets/images/aioa-icon-type-12.svg';
import aioaicontype13 from '../../../assets/images/aioa-icon-type-13.svg';
import aioaicontype14 from '../../../assets/images/aioa-icon-type-14.svg';
import aioaicontype15 from '../../../assets/images/aioa-icon-type-15.svg';
import aioaicontype16 from '../../../assets/images/aioa-icon-type-16.svg';
import aioaicontype17 from '../../../assets/images/aioa-icon-type-17.svg';
import aioaicontype18 from '../../../assets/images/aioa-icon-type-18.svg';
import aioaicontype19 from '../../../assets/images/aioa-icon-type-19.svg';
import aioaicontype20 from '../../../assets/images/aioa-icon-type-20.svg';
import aioaicontype21 from '../../../assets/images/aioa-icon-type-21.svg';
import aioaicontype22 from '../../../assets/images/aioa-icon-type-22.svg';
import aioaicontype23 from '../../../assets/images/aioa-icon-type-23.svg';
import aioaicontype24 from '../../../assets/images/aioa-icon-type-24.svg';
import aioaicontype25 from '../../../assets/images/aioa-icon-type-25.svg';
import aioaicontype26 from '../../../assets/images/aioa-icon-type-26.svg';
import aioaicontype27 from '../../../assets/images/aioa-icon-type-27.svg';
import aioaicontype28 from '../../../assets/images/aioa-icon-type-28.svg';
import aioaicontype29 from '../../../assets/images/aioa-icon-type-29.svg';
import allinoneaccessibilitylogo from '../../../assets/images/all-in-one-accessibility-logo.svg';
import SettingsApiHandler from '../API/settings';
import { Tab } from 'bootstrap';
// import cssString from "../../../assets/css/style.css";

const HomePage = () => {
  /**
   * Declare Variables
   */

  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState('');
  const [parameters, setParameters] = useState({
    licenseKey: '',
    hexaColor: '',
    widget_size: '0',
    position: 'bottom_right',
    icontype: 'aioa-icon-type-1',
    iconsize: 'aioa-default-icon',
  });

  const [isSwitcherEnabled, setSwitcherEnabled] = useState(false);

  const renderTooltip = (props) => <Tooltip {...props}></Tooltip>;

  const [isSizeSwitcherEnabled, setSizeSwitcherEnabled] = useState(false);

  const [iconsize, setIconSize] = useState(aioaicontype1);

  const [settingList, setSetting] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  // Step 1: Define a state variable to track the success message.
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    console.log('settingList (outside): ', settingList);
    if (Object.keys(settingList).length !== 0) {
      // console.log('License Key', settingList['License_Key']);
      console.log('Color Code', settingList['Color_Code']);
      console.log('Icon Position', settingList['Icon_Position']);
      console.log('Icon Type', settingList['Icon_Type']);
      console.log('Icon Size', settingList['Icon_Size']);

      // if (settingList['License_Key'].length > 0) {
      //   setIsValid(true);
      // }
      setParameters({
        // licenseKey: settingList['License_Key'],
        licenseKey: '',
        hexaColor: settingList['Color_Code'],
        position: settingList['Icon_Position'],
        icontype: settingList['Icon_Type'],
        iconsize: settingList['Icon_Size'],
        widget_size: '0',
      });
      if (settingList['Icon Type'] == 'aioa-icon-type-2') {
        setIconSize(aioaicontype2);
      } else if (settingList['Icon Type'] == 'aioa-icon-type-3') {
        setIconSize(aioaicontype3);
      } else {
        setIconSize(aioaicontype1);
      }
    }
    getAPIData();
  }, [settingList]);

  useEffect(() => {
    console.log(parameters);
    console.log('parameters.position : ', parameters.position == 'bottom_center');
  }, [parameters]);

  useEffect(() => {
    Fetchsettings();
  }, []);

  /**
   * Get All Settings from Database
   */
  async function Fetchsettings() {
    try {
      const settings = await SettingsApiHandler.getAllSettings();
      console.log('settings: ', settings);

      if (settings.length > 0) {
        setSetting(settings[0]);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  }

  async function Deletesettings(id) {
    const deleted = await SettingsApiHandler.deleteSettings(id);
    Fetchsettings();
  }

  /**
   * Update Settings when settings are already there
   */
  async function updatesetting(id, data) {
    SettingsApiHandler.editSettings(id, {
      // 'License Key': data.licenseKey,
      'License Key': '',
      Color_Code: data.hexaColor,
      Icon_Position: data.position,
      Icon_Type: data.icontype,
      Icon_Size: data.iconsize,
    });
    Fetchsettings();
  }

  /**
   * Add Settings function will save settings
   */
  async function addsetting(data) {
    console.log('addsetting parameters', parameters);

    SettingsApiHandler.addSettings({
      // 'License Key': data.licenseKey,
      'License Key': '',
      Color_Code: data.hexaColor,
      Icon_Position: data.position,
      Icon_Type: data.icontype,
      Icon_Size: data.iconsize,
    });
    Fetchsettings();
  }

  /**
   * Save Changes is a function which used to click on Save Changes Button on UI
   */
  const onSaveChanges = async () => {
    if (Object.keys(settingList).length !== 0) {
      await updatesetting(settingList.id, parameters);
      saveData(parameters);
    } else {
      await addsetting(parameters);
      saveData(parameters);
    }
  };

  /**
   * Save the data on Dashboard from Settings UI
   */
  const saveData = (data) => {
    var formdata = new FormData();
    console.log('window.location.origin : ', window.location.hostname);
    formdata.append('u', window.location.hostname);
    formdata.append('widget_position', data.position);
    formdata.append('widget_color_code', data.hexaColor);
    formdata.append('widget_icon_type', data.icontype);
    formdata.append('widget_icon_size', data.iconsize);
    // formdata.append("widget_position_top", "200");
    // formdata.append("widget_position_right", "10");
    // formdata.append("widget_position_bottom", "5");
    // formdata.append("widget_position_left", "120");
    // formdata.append("is_widget_custom_size", "1");
    // formdata.append("widget_icon_size_custom", "12");
    // formdata.append("is_widget_custom_position", "1");

    var requestOptions = {
      method: 'POST',
      body: formdata,
    };

    //http://stagingada.skynettechnologies.us/front/widget-settings
    fetch('https://ada.skynettechnologies.us/api/widget-setting-update-platform', requestOptions)
      .then((response) => response.json())
      .then(async (response) => {
        console.log('response Save Data', response);
        setShowSuccessMessage(true);

        // Optionally, you can reset the success message after a certain time period.
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000); // Reset message after 3 seconds
      })
      .catch((error) => console.log('error', error));
  };

  /**
   * Get API data will get all details from Dashboard API to Settings UI
   */
  const getAPIData = () => {
    var formdata = new FormData();
    formdata.append('website_url', window.location.hostname);

    var requestOptions = {
      method: 'POST',
      body: formdata,
    };

    fetch('https://ada.skynettechnologies.us/api/widget-settings', requestOptions)
      .then((response) => response.json())
      .then((response) => {
        if (Object.keys(response['Data']).length !== 0) {
          setIsValid(true);
          if (Object.keys(settingList).length !== 0) {
            console.log('getAPIData setIsValid', isValid);

            console.log('response Get Data', response['Data']['widget_color_code']);
            console.log('response Get Data', response['Data']['widget_position']);
            console.log('response Get Data', response['Data']['widget_icon_type']);
            console.log('response Get Data', response['Data']['widget_icon_size']);

            // console.log('License Key', settingList['License_Key']);
            console.log('Color Code', settingList['Color_Code']);
            console.log('Icon Position', settingList['Icon_Position']);
            console.log('Icon Type', settingList['Icon_Type']);
            console.log('Icon Size', settingList['Icon_Size']);

            if (response['Data']['widget_position'] !== settingList['Icon_Position']) {
              setIsChanged(true);
            }
            if (response['Data']['widget_color_code'] !== settingList['Color_Code']) {
              setIsChanged(true);
            }
            if (response['Data']['widget_icon_type'] !== settingList['Icon_Type']) {
              setIsChanged(true);
            }
            if (response['Data']['widget_icon_size'] !== settingList['Icon_Size']) {
              setIsChanged(true);
            }
            console.log('getAPIData isChanged', isChanged);

            // if (isChanged == true) {
            setParameters({
              // licenseKey: "settingList['License_Key']",
              licenseKey: '',
              hexaColor: response['Data']['widget_color_code'],
              position: response['Data']['widget_position'],
              icontype: response['Data']['widget_icon_type'],
              iconsize: response['Data']['widget_icon_size'],
              widget_size: '0',
            });

            SettingsApiHandler.editSettings(settingList.id, {
              // License_Key: settingList['License_Key'],
              License_Key: '',
              Color_Code: response['Data']['widget_color_code'],
              Icon_Position: response['Data']['widget_position'],
              Icon_Type: response['Data']['widget_icon_type'],
              Icon_Size: response['Data']['widget_icon_size'],
            });

            // setParameters({ licenseKey: settingList["License Key"], hexaColor: settingList["Color Code"], position: settingList["Icon Position"], icontype: settingList["Icon Type"], iconsize: settingList["Icon Size"] })
            // }
          } else {
            console.log('response Get Data', response['Data']['widget_color_code']);
            console.log('response Get Data', response['Data']['widget_position']);
            console.log('response Get Data', response['Data']['widget_icon_type']);
            console.log('response Get Data', response['Data']['widget_icon_size']);
          }
        } else {
          setIsValid(false);
        }
      })
      .catch((error) => console.log('error', error));
  };

  /**
   * Icon change event when user change Icon Type on Settings UI
   */
  const onIconChange = (e) => {
    setParameters({ ...parameters, icontype: e.target.value });
    if (e.target.value == 'aioa-icon-type-2') {
      setIconSize(aioaicontype2);
    } else if (e.target.value == 'aioa-icon-type-3') {
      setIconSize(aioaicontype3);
    } else if (e.target.value == 'aioa-icon-type-4') {
      setIconSize(aioaicontype4);
    } else if (e.target.value == 'aioa-icon-type-5') {
      setIconSize(aioaicontype5);
    } else if (e.target.value == 'aioa-icon-type-6') {
      setIconSize(aioaicontype6);
    } else if (e.target.value == 'aioa-icon-type-7') {
      setIconSize(aioaicontype7);
    } else if (e.target.value == 'aioa-icon-type-8') {
      setIconSize(aioaicontype8);
    } else if (e.target.value == 'aioa-icon-type-9') {
      setIconSize(aioaicontype9);
    } else if (e.target.value == 'aioa-icon-type-10') {
      setIconSize(aioaicontype10);
    } else if (e.target.value == 'aioa-icon-type-11') {
      setIconSize(aioaicontype11);
    } else if (e.target.value == 'aioa-icon-type-12') {
      setIconSize(aioaicontype12);
    } else if (e.target.value == 'aioa-icon-type-13') {
      setIconSize(aioaicontype13);
    } else if (e.target.value == 'aioa-icon-type-14') {
      setIconSize(aioaicontype14);
    } else if (e.target.value == 'aioa-icon-type-15') {
      setIconSize(aioaicontype15);
    } else if (e.target.value == 'aioa-icon-type-16') {
      setIconSize(aioaicontype16);
    } else if (e.target.value == 'aioa-icon-type-17') {
      setIconSize(aioaicontype17);
    } else if (e.target.value == 'aioa-icon-type-18') {
      setIconSize(aioaicontype18);
    } else if (e.target.value == 'aioa-icon-type-19') {
      setIconSize(aioaicontype19);
    } else if (e.target.value == 'aioa-icon-type-20') {
      setIconSize(aioaicontype20);
    } else if (e.target.value == 'aioa-icon-type-21') {
      setIconSize(aioaicontype21);
    } else if (e.target.value == 'aioa-icon-type-22') {
      setIconSize(aioaicontype22);
    } else if (e.target.value == 'aioa-icon-type-23') {
      setIconSize(aioaicontype23);
    } else if (e.target.value == 'aioa-icon-type-24') {
      setIconSize(aioaicontype24);
    } else if (e.target.value == 'aioa-icon-type-25') {
      setIconSize(aioaicontype25);
    } else if (e.target.value == 'aioa-icon-type-26') {
      setIconSize(aioaicontype26);
    } else if (e.target.value == 'aioa-icon-type-27') {
      setIconSize(aioaicontype27);
    } else if (e.target.value == 'aioa-icon-type-28') {
      setIconSize(aioaicontype28);
    } else if (e.target.value == 'aioa-icon-type-29') {
      setIconSize(aioaicontype29);
    } else {
      setIconSize(aioaicontype1);
    }
  };
  const checkLicenseKey = (e) => {
    setParameters({ ...parameters, licenseKey: e.target.value });
    setTimeout(function () {
      validateLicenseKey(e.target.value);
    }, 500);
  };
  const validateLicenseKey = (key) => {
    var formdata = new FormData();
    formdata.append('token', key);
    formdata.append('SERVER_NAME', '');
    const requestOptions = {
      method: 'post',
      body: formdata,
    };

    fetch('https://www.skynettechnologies.com/add-ons/license-api.php', requestOptions)
      .then((result) => result.json())
      .then((res) => {
        if (res.valid == true) {
          setIsValid(true);
          setMessage('');
        } else {
          setIsValid(false);
          if (key != '') setMessage('Invalid License Key');
          //setParameters({...parameters, position: ""});
        }
      });
  };

  function fetchApiData(website_name) {


    // console.log(document.getElementById('username').innerHTML);  // Access name
    // console.log(document.getElementById('useremail').innerHTML); // Access email
    var username = document.getElementById('username').innerHTML;
    var useremail = document.getElementById('useremail').innerHTML;


    var packageType = "free-widget";
    var arrDetails = {
        'name': username,
        'email': useremail,
        'company_name': username,
        'website': website_name,
        'package_type': packageType,
        'start_date': new Date().toISOString(),
        'end_date': '',
        'price': '',
        'discount_price': '0',
        'platform': 'webasyst',
        'api_key': '',
        'is_trial_period': '',
        'is_free_widget': '0',
        'bill_address': '',
        'country': '',
        'state': '',
        'city': '',
        'post_code': '',
        'transaction_id': '',
        'subscr_id': '',
        'payment_source': ''
    };

    // console.log('Details to send:', arrDetails);

    const apiUrl = "https://ada.skynettechnologies.us/api/get-autologin-link";
    // console.log("website url" + website_name);
    // Prepare the POST request
    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json" // Specify the content type
        },
        body: JSON.stringify({ website: website_name }) // Pass the encoded domain name in the request body
    })
        .then(response => {
            // Check if the response is okay (status code 200)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Parse the JSON response
        })
        .then(result => {
            // Log the result to check the response structure
            // console.log(result); // This will log the full response from the API

            // Check if the response contains a valid link
            if (result && result.link) {
                // console.log("Autologin Link:", result.link);  // Log the link
            } else {
                // console.error("Invalid response or missing link.");
                const secondApiUrl = "https://ada.skynettechnologies.us/api/add-user-domain";

                // Send the details to the second API
                fetch(secondApiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json" // Specify the content type
                    },
                    body: JSON.stringify(arrDetails) // Pass the array data to the second API
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        // console.log("Response from add-user-domain API:", data);

                        // Handle the response from the add-user-domain API (success/failure)
                        if (data.success) {
                            // console.log("User domain added successfully!");
                        } else {
                            // console.error("Error adding user domain.");
                        }
                    })
                    .catch(error => {
                        // console.error("Error sending data to add-user-domain API:", error);
                    });
            }
        })
        .catch(error => {
            // console.error("Error fetching API:", error); // Log any errors
        });
}

  const elementStyle = {
    marginTop: '0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  };

  const labelStyle = {
    backgrounColor: '',
  };

  /**
   * Settings UI
   */
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>All In One Accessibility Strapi</title>
      <meta name="description" content="Strapi App" />
      {/* <style>
          @import ("../../../assets/css/style.css");
      </style> */}

      <link
        rel="stylesheet"
        type="text/css"
        href="https://strapi.skynettechnologies.us/style.css"
      />
      <div style={elementStyle}>
        <div className="all-in-one-accessibility-strapi-container">
          <div className="container">
            <div className="set-width">
              <div className="all-in-one-accessibility-wrap">
                <div className="accessibility-settings">
                  <Image
                    src={allinoneaccessibilitylogo}
                    alt="All in One Accessibility - Skynet Technologies"
                    style={{
                      display: 'block',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      width: '50%',
                    }}
                  ></Image>
                  <h3>
                    <b></b>
                  </h3>
                  <div className="all-one-accessibility-form">
                    <Form onSubmit={onSaveChanges}>
                      {!isValid && ( // Conditionally render the view based on API data
                        <Form.Group className={`mb-30 row`}>
                          <Form.Label className="col-sm-12 col-form-label">
                            {/* License key required for full version: */}
                            <div
                              className={`form-text col-sm-12 col-form-label ${isValid ? 'd-none' : ''}`}
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                              }}
                            >
                              Please{' '}
                              <a
                                href="https://ada.skynettechnologies.us/trial-subscription"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                &nbsp;Upgrade&nbsp;
                              </a>{' '}
                              to the full version of All in One Accessibility Pro.
                            </div>
                          </Form.Label>
                          {/* <div className="col-sm-9">
                          <Form.Control value={parameters.licenseKey} type="text" onChange={checkLicenseKey} />
                          
                          <div className="form-text text-danger">{message}</div>
                        </div> */}
                        </Form.Group>
                      )}

                      <Form.Group className={`mb-30 row`}>
                        <Form.Label htmlFor="inputPassword" className="col-sm-3 col-form-label">
                          Hex color code:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            value={parameters.hexaColor}
                            className="form-control"
                            id="colorcode"
                            name="colorcode"
                            onChange={(e) =>
                              setParameters({ ...parameters, hexaColor: e.target.value })
                            }
                          />
                        </div>
                        <div className="col-sm-3"></div>
                        <div className="form-text col-sm-9">
                          You can customize the ADA Widget color. For example: FF5733
                        </div>
                      </Form.Group>

                      <Form.Group className={`mb-30 row`}>
                        <Form.Label className="col-sm-12 col-form-label">
                          Select Widget Size:
                        </Form.Label>
                        <div className="col-sm-12 three-col">
                          <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                            <Form.Check
                              type="radio"
                              id="edit-widget-size-regularsize"
                              label="Regular Size"
                              name="widget_size"
                              value="0"
                              onChange={(e) =>
                                setParameters({ ...parameters, widget_size: e.target.value })
                              }
                              checked={parameters.widget_size == '0' ? true : false}
                              className="form-radio"
                            />
                          </div>

                          <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                            <Form.Check
                              type="radio"
                              id="edit-widget-size-oversize"
                              label="Over Size"
                              name="widget_size"
                              value="1"
                              onChange={(e) =>
                                setParameters({ ...parameters, widget_size: e.target.value })
                              }
                              checked={parameters.widget_size == '1' ? true : false}
                              className="form-radio"
                            />
                          </div>
                        </div>
                      </Form.Group>

                      <Form.Group className={`mb-30 row`}>
                        <div className="icon-custom-position-wrapper mb-3">
                          <div className="mb-2">
                            <Row className="align-items-center mb-30">
                              <Col>
                                <Form.Label className="col-sm-12 col-form-label">
                                  Enable precise accessibility widget icon position:
                                </Form.Label>
                              </Col>
                              <Col xs="auto">
                                <OverlayTrigger placement="bottom" overlay={renderTooltip}>
                                  <Form.Check
                                    type="switch"
                                    id="custom-position-switcher"
                                    className="custom-switcher"
                                    checked={isSwitcherEnabled}
                                    onChange={() => setSwitcherEnabled(!isSwitcherEnabled)}
                                    style={{
                                      transform: 'scale(1.5)', // Increase the switch size
                                    }}
                                  />
                                </OverlayTrigger>
                              </Col>
                            </Row>
                            {/* Conditionally Hidden Form Group */}
                            {!isSwitcherEnabled && (
                              <Form.Group className={`mb-30 row widget-position`}>
                                <Form.Label className="col-sm-12 col-form-label">
                                  Where would you like to place the accessibility icon on your
                                  site?:
                                </Form.Label>
                                <div className="col-sm-12 three-col">
                                  <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                    <Form.Check
                                      type="radio"
                                      id="edit-position-top-left"
                                      label="Top left"
                                      name="position"
                                      value="top_left"
                                      onChange={(e) =>
                                        setParameters({ ...parameters, position: e.target.value })
                                      }
                                      checked={parameters.position == 'top_left' ? true : false}
                                      className="form-radio"
                                    />
                                  </div>

                                  <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                    <Form.Check
                                      type="radio"
                                      id="edit-position-top-center"
                                      label="Top Center"
                                      name="position"
                                      value="top_center"
                                      onChange={(e) =>
                                        setParameters({ ...parameters, position: e.target.value })
                                      }
                                      checked={parameters.position == 'top_center' ? true : false}
                                      className="form-radio"
                                    />
                                  </div>

                                  <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                    <Form.Check
                                      type="radio"
                                      id="edit-position-top-right"
                                      label="Top Right"
                                      name="position"
                                      value="top_right"
                                      onChange={(e) =>
                                        setParameters({ ...parameters, position: e.target.value })
                                      }
                                      checked={parameters.position == 'top_right' ? true : false}
                                      className="form-radio"
                                    />
                                  </div>

                                  <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                    <Form.Check
                                      type="radio"
                                      id="edit-position-middel-left"
                                      label="Middle left"
                                      name="position"
                                      value="middle_left"
                                      onChange={(e) =>
                                        setParameters({ ...parameters, position: e.target.value })
                                      }
                                      checked={parameters.position == 'middle_left' ? true : false}
                                      className="form-radio"
                                    />
                                  </div>

                                  <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                    <Form.Check
                                      type="radio"
                                      id="edit-position-middel-right"
                                      label="Middle Right"
                                      name="position"
                                      value="middle_right"
                                      onChange={(e) =>
                                        setParameters({ ...parameters, position: e.target.value })
                                      }
                                      checked={parameters.position == 'middle_right' ? true : false}
                                      className="form-radio"
                                    />
                                  </div>
                                  <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                    <Form.Check
                                      type="radio"
                                      id="edit-position-bottom-left"
                                      label="Bottom left"
                                      name="position"
                                      value="bottom_left"
                                      onChange={(e) =>
                                        setParameters({ ...parameters, position: e.target.value })
                                      }
                                      checked={parameters.position == 'bottom_left' ? true : false}
                                      className="form-radio"
                                    />
                                  </div>
                                  <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                    <Form.Check
                                      type="radio"
                                      id="edit-position-bottom-center"
                                      label="Bottom Center"
                                      name="position"
                                      value="bottom_center"
                                      onChange={(e) =>
                                        setParameters({ ...parameters, position: e.target.value })
                                      }
                                      checked={
                                        parameters.position == 'bottom_center' ? true : false
                                      }
                                      className="form-radio"
                                    />
                                  </div>
                                  <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                    <Form.Check
                                      type="radio"
                                      id="edit-position-bottom-right"
                                      label="Bottom Right"
                                      name="position"
                                      value="bottom_right"
                                      onChange={(e) =>
                                        setParameters({ ...parameters, position: e.target.value })
                                      }
                                      checked={parameters.position == 'bottom_right' ? true : false}
                                      className="form-radio"
                                    />
                                  </div>
                                </div>
                              </Form.Group>
                            )}
                            {isSwitcherEnabled && (
                              <div className="custom-position-controls">
                                <Row className="mb-3">
                                  <Col xs="auto">
                                    <InputGroup>
                                      <FormControl
                                        type="number"
                                        min="0"
                                        max="250"
                                        id="custom_position_x_value"
                                        aria-label="Value in pixels"
                                        onInput={(e) =>
                                          (e.target.value = Math.min(
                                            Math.max(e.target.value, 0),
                                            250
                                          ))
                                        }
                                      />
                                      <InputGroup.Text>PX</InputGroup.Text>
                                    </InputGroup>
                                  </Col>
                                  <Col xs="auto">
                                    <Form.Select aria-label="Position select">
                                      <option value="cust-pos-to-the-right">To the right</option>
                                      <option value="cust-pos-to-the-left">To the left</option>
                                    </Form.Select>
                                  </Col>
                                </Row>
                                <Row className="mb-3">
                                  <Col xs="auto">
                                    <InputGroup>
                                      <FormControl
                                        type="number"
                                        min="0"
                                        max="250"
                                        id="custom_position_y_value"
                                        aria-label="Value in pixels"
                                        onInput={(e) =>
                                          (e.target.value = Math.min(
                                            Math.max(e.target.value, 0),
                                            250
                                          ))
                                        }
                                      />
                                      <InputGroup.Text>PX</InputGroup.Text>
                                    </InputGroup>
                                  </Col>
                                  <Col xs="auto">
                                    <Form.Select aria-label="Position select">
                                      <option value="cust-pos-to-the-lower">To the bottom</option>
                                      <option value="cust-pos-to-the-upper">To the top</option>
                                    </Form.Select>
                                  </Col>
                                </Row>
                                <div className="description">0 - 250px are permitted values</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </Form.Group>

                      {/* <Form.Group className={`mb-30 row row widget-position`}>
                        <Form.Label className="col-sm-12 col-form-label">
                          Where would you like to place the accessibility icon on your site?:
                        </Form.Label>
                        <div className="col-sm-12 three-col">
                          <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                            <Form.Check
                              type="radio"
                              id="edit-position-top-left"
                              label="Top left"
                              name="position"
                              value="top_left"
                              onChange={(e) =>
                                setParameters({ ...parameters, position: e.target.value })
                              }
                              checked={parameters.position == 'top_left' ? true : false}
                              className="form-radio"
                            />
                          </div>

                          <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                            <Form.Check
                              type="radio"
                              id="edit-position-top-center"
                              label="Top Center"
                              name="position"
                              value="top_center"
                              onChange={(e) =>
                                setParameters({ ...parameters, position: e.target.value })
                              }
                              checked={parameters.position == 'top_center' ? true : false}
                              className="form-radio"
                            />
                          </div>

                          <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                            <Form.Check
                              type="radio"
                              id="edit-position-top-right"
                              label="Top Right"
                              name="position"
                              value="top_right"
                              onChange={(e) =>
                                setParameters({ ...parameters, position: e.target.value })
                              }
                              checked={parameters.position == 'top_right' ? true : false}
                              className="form-radio"
                            />
                          </div>

                          <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                            <Form.Check
                              type="radio"
                              id="edit-position-middel-left"
                              label="Middle left"
                              name="position"
                              value="middle_left"
                              onChange={(e) =>
                                setParameters({ ...parameters, position: e.target.value })
                              }
                              checked={parameters.position == 'middle_left' ? true : false}
                              className="form-radio"
                            />
                          </div>

                          <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                            <Form.Check
                              type="radio"
                              id="edit-position-middel-right"
                              label="Middle Right"
                              name="position"
                              value="middle_right"
                              onChange={(e) =>
                                setParameters({ ...parameters, position: e.target.value })
                              }
                              checked={parameters.position == 'middle_right' ? true : false}
                              className="form-radio"
                            />
                          </div>
                          <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                            <Form.Check
                              type="radio"
                              id="edit-position-bottom-left"
                              label="Bottom left"
                              name="position"
                              value="bottom_left"
                              onChange={(e) =>
                                setParameters({ ...parameters, position: e.target.value })
                              }
                              checked={parameters.position == 'bottom_left' ? true : false}
                              className="form-radio"
                            />
                          </div>
                          <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                            <Form.Check
                              type="radio"
                              id="edit-position-bottom-center"
                              label="Bottom Center"
                              name="position"
                              value="bottom_center"
                              onChange={(e) =>
                                setParameters({ ...parameters, position: e.target.value })
                              }
                              checked={parameters.position == 'bottom_center' ? true : false}
                              className="form-radio"
                            />
                          </div>
                          <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                            <Form.Check
                              type="radio"
                              id="edit-position-bottom-right"
                              label="Bottom Right"
                              name="position"
                              value="bottom_right"
                              onChange={(e) =>
                                setParameters({ ...parameters, position: e.target.value })
                              }
                              checked={parameters.position == 'bottom_right' ? true : false}
                              className="form-radio"
                            />
                          </div>
                        </div>
                      </Form.Group> */}

                      <Form.Group className={`icon-type-wrapper row ${isValid ? null : 'd-none'}`}>
                        <Form.Label className="fcol-sm-12 col-form-label">
                          Select icon type:
                        </Form.Label>
                        <div className="col-sm-12">
                          <div className="row">
                            <div className="col-auto mb-30">
                              <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                <Form.Check type="radio" id="edit-type-1">
                                  <Form.Check.Input
                                    type="radio"
                                    name="aioa_icon_type"
                                    value="aioa-icon-type-1"
                                    onChange={onIconChange}
                                    checked={
                                      parameters.icontype == 'aioa-icon-type-1' ? true : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image src={aioaicontype1} alt="" width="65" height="65" />
                                  </Form.Check.Label>
                                </Form.Check>

                                {/* <label class="option">
                            <Image src={aioaicontype1} alt="" width="65" height="65" />
                          </label> */}
                              </div>
                            </div>
                            <div className="col-auto mb-30">
                              <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                <Form.Check type="radio" id="edit-type-2">
                                  <Form.Check.Input
                                    type="radio"
                                    name="aioa_icon_type"
                                    value="aioa-icon-type-2"
                                    onChange={onIconChange}
                                    checked={
                                      parameters.icontype == 'aioa-icon-type-2' ? true : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image src={aioaicontype2} alt="" width="65" height="65" />
                                  </Form.Check.Label>
                                </Form.Check>
                                {/* <label class="option">
                            <Image src={aioaicontype2} alt="" width="65" height="65" />
                          </label> */}
                                {/* </Form.Check> */}
                              </div>
                            </div>

                            <div className="col-auto mb-30">
                              <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                <Form.Check type="radio" id="edit-type-3">
                                  <Form.Check.Input
                                    type="radio"
                                    name="aioa_icon_type"
                                    value="aioa-icon-type-3"
                                    onChange={onIconChange}
                                    checked={
                                      parameters.icontype == 'aioa-icon-type-3' ? true : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image src={aioaicontype3} alt="" width="65" height="65" />
                                  </Form.Check.Label>
                                </Form.Check>
                                {/*  <label class="option">
                            <Image src={aioaicontype3} alt="" width="65" height="65" />
                          </label> */}
                              </div>
                            </div>

                            <div className="col-auto mb-30">
                              <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                <Form.Check type="radio" id="edit-type-4">
                                  <Form.Check.Input
                                    type="radio"
                                    name="aioa_icon_type"
                                    value="aioa-icon-type-4"
                                    onChange={onIconChange}
                                    checked={
                                      parameters.icontype == 'aioa-icon-type-4' ? true : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image src={aioaicontype4} alt="" width="65" height="65" />
                                  </Form.Check.Label>
                                </Form.Check>
                                {/*  <label class="option">
                            <Image src={aioaicontype3} alt="" width="65" height="65" />
                          </label> */}
                              </div>
                            </div>

                            <div className="col-auto mb-30">
                              <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                <Form.Check type="radio" id="edit-type-5">
                                  <Form.Check.Input
                                    type="radio"
                                    name="aioa_icon_type"
                                    value="aioa-icon-type-5"
                                    onChange={onIconChange}
                                    checked={
                                      parameters.icontype == 'aioa-icon-type-5' ? true : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image src={aioaicontype5} alt="" width="65" height="65" />
                                  </Form.Check.Label>
                                </Form.Check>
                                {/*  <label class="option">
                            <Image src={aioaicontype3} alt="" width="65" height="65" />
                          </label> */}
                              </div>
                            </div>

                            <div className="col-auto mb-30">
                              <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                <Form.Check type="radio" id="edit-type-6">
                                  <Form.Check.Input
                                    type="radio"
                                    name="aioa_icon_type"
                                    value="aioa-icon-type-6"
                                    onChange={onIconChange}
                                    checked={
                                      parameters.icontype == 'aioa-icon-type-6' ? true : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image src={aioaicontype6} alt="" width="65" height="65" />
                                  </Form.Check.Label>
                                </Form.Check>
                                {/*  <label class="option">
                            <Image src={aioaicontype3} alt="" width="65" height="65" />
                          </label> */}
                              </div>
                            </div>

                            <div className="col-auto mb-30">
                              <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                <Form.Check type="radio" id="edit-type-7">
                                  <Form.Check.Input
                                    type="radio"
                                    name="aioa_icon_type"
                                    value="aioa-icon-type-7"
                                    onChange={onIconChange}
                                    checked={
                                      parameters.icontype == 'aioa-icon-type-7' ? true : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image src={aioaicontype7} alt="" width="65" height="65" />
                                  </Form.Check.Label>
                                </Form.Check>
                                {/*  <label class="option">
                            <Image src={aioaicontype3} alt="" width="65" height="65" />
                          </label> */}
                              </div>
                            </div>

                            <div className="col-auto mb-30">
                              <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                <Form.Check type="radio" id="edit-type-8">
                                  <Form.Check.Input
                                    type="radio"
                                    name="aioa_icon_type"
                                    value="aioa-icon-type-8"
                                    onChange={onIconChange}
                                    checked={
                                      parameters.icontype == 'aioa-icon-type-8' ? true : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image src={aioaicontype8} alt="" width="65" height="65" />
                                  </Form.Check.Label>
                                </Form.Check>
                                {/*  <label class="option">
                            <Image src={aioaicontype3} alt="" width="65" height="65" />
                          </label> */}
                              </div>
                            </div>

                            <div className="col-auto mb-30">
                              <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                <Form.Check type="radio" id="edit-type-9">
                                  <Form.Check.Input
                                    type="radio"
                                    name="aioa_icon_type"
                                    value="aioa-icon-type-9"
                                    onChange={onIconChange}
                                    checked={
                                      parameters.icontype == 'aioa-icon-type-9' ? true : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image src={aioaicontype9} alt="" width="65" height="65" />
                                  </Form.Check.Label>
                                </Form.Check>
                                {/*  <label class="option">
                            <Image src={aioaicontype3} alt="" width="65" height="65" />
                          </label> */}
                              </div>
                            </div>

                            <div className="col-auto mb-30">
                              <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                <Form.Check type="radio" id="edit-type-10">
                                  <Form.Check.Input
                                    type="radio"
                                    name="aioa_icon_type"
                                    value="aioa-icon-type-10"
                                    onChange={onIconChange}
                                    checked={
                                      parameters.icontype == 'aioa-icon-type-10' ? true : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image src={aioaicontype10} alt="" width="65" height="65" />
                                  </Form.Check.Label>
                                </Form.Check>
                                {/*  <label class="option">
                            <Image src={aioaicontype3} alt="" width="65" height="65" />
                          </label> */}
                              </div>
                            </div>

                            <div className="col-auto mb-30">
                              <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                <Form.Check type="radio" id="edit-type-11">
                                  <Form.Check.Input
                                    type="radio"
                                    name="aioa_icon_type"
                                    value="aioa-icon-type-11"
                                    onChange={onIconChange}
                                    checked={
                                      parameters.icontype == 'aioa-icon-type-11' ? true : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image src={aioaicontype11} alt="" width="65" height="65" />
                                  </Form.Check.Label>
                                </Form.Check>
                                {/*  <label class="option">
                            <Image src={aioaicontype3} alt="" width="65" height="65" />
                          </label> */}
                              </div>
                            </div>

                            <div className="col-auto mb-30">
                              <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                <Form.Check type="radio" id="edit-type-12">
                                  <Form.Check.Input
                                    type="radio"
                                    name="aioa_icon_type"
                                    value="aioa-icon-type-12"
                                    onChange={onIconChange}
                                    checked={
                                      parameters.icontype == 'aioa-icon-type-12' ? true : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image src={aioaicontype12} alt="" width="65" height="65" />
                                  </Form.Check.Label>
                                </Form.Check>
                                {/*  <label class="option">
                            <Image src={aioaicontype3} alt="" width="65" height="65" />
                          </label> */}
                              </div>
                            </div>

                            <div className="col-auto mb-30">
                              <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                <Form.Check type="radio" id="edit-type-13">
                                  <Form.Check.Input
                                    type="radio"
                                    name="aioa_icon_type"
                                    value="aioa-icon-type-13"
                                    onChange={onIconChange}
                                    checked={
                                      parameters.icontype == 'aioa-icon-type-13' ? true : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image src={aioaicontype13} alt="" width="65" height="65" />
                                  </Form.Check.Label>
                                </Form.Check>
                                {/*  <label class="option">
                            <Image src={aioaicontype3} alt="" width="65" height="65" />
                          </label> */}
                              </div>
                            </div>

                            <div className="col-auto mb-30">
                              <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                <Form.Check type="radio" id="edit-type-14">
                                  <Form.Check.Input
                                    type="radio"
                                    name="aioa_icon_type"
                                    value="aioa-icon-type-14"
                                    onChange={onIconChange}
                                    checked={
                                      parameters.icontype == 'aioa-icon-type-14' ? true : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image src={aioaicontype14} alt="" width="65" height="65" />
                                  </Form.Check.Label>
                                </Form.Check>
                                {/*  <label class="option">
                            <Image src={aioaicontype3} alt="" width="65" height="65" />
                          </label> */}
                              </div>
                            </div>

                            <div className="col-auto mb-30">
                              <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                <Form.Check type="radio" id="edit-type-15">
                                  <Form.Check.Input
                                    type="radio"
                                    name="aioa_icon_type"
                                    value="aioa-icon-type-15"
                                    onChange={onIconChange}
                                    checked={
                                      parameters.icontype == 'aioa-icon-type-15' ? true : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image src={aioaicontype15} alt="" width="65" height="65" />
                                  </Form.Check.Label>
                                </Form.Check>
                                {/*  <label class="option">
                            <Image src={aioaicontype3} alt="" width="65" height="65" />
                          </label> */}
                              </div>
                            </div>

                            <div className="col-auto mb-30">
                              <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                <Form.Check type="radio" id="edit-type-16">
                                  <Form.Check.Input
                                    type="radio"
                                    name="aioa_icon_type"
                                    value="aioa-icon-type-16"
                                    onChange={onIconChange}
                                    checked={
                                      parameters.icontype == 'aioa-icon-type-16' ? true : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image src={aioaicontype16} alt="" width="65" height="65" />
                                  </Form.Check.Label>
                                </Form.Check>
                                {/*  <label class="option">
                            <Image src={aioaicontype3} alt="" width="65" height="65" />
                          </label> */}
                              </div>
                            </div>

                            <div className="col-auto mb-30">
                              <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                <Form.Check type="radio" id="edit-type-17">
                                  <Form.Check.Input
                                    type="radio"
                                    name="aioa_icon_type"
                                    value="aioa-icon-type-17"
                                    onChange={onIconChange}
                                    checked={
                                      parameters.icontype == 'aioa-icon-type-17' ? true : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image src={aioaicontype17} alt="" width="65" height="65" />
                                  </Form.Check.Label>
                                </Form.Check>
                                {/*  <label class="option">
                            <Image src={aioaicontype3} alt="" width="65" height="65" />
                          </label> */}
                              </div>
                            </div>

                            <div className="col-auto mb-30">
                              <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                <Form.Check type="radio" id="edit-type-18">
                                  <Form.Check.Input
                                    type="radio"
                                    name="aioa_icon_type"
                                    value="aioa-icon-type-18"
                                    onChange={onIconChange}
                                    checked={
                                      parameters.icontype == 'aioa-icon-type-18' ? true : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image src={aioaicontype18} alt="" width="65" height="65" />
                                  </Form.Check.Label>
                                </Form.Check>
                                {/*  <label class="option">
                            <Image src={aioaicontype3} alt="" width="65" height="65" />
                          </label> */}
                              </div>
                            </div>

                            <div className="col-auto mb-30">
                              <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                <Form.Check type="radio" id="edit-type-19">
                                  <Form.Check.Input
                                    type="radio"
                                    name="aioa_icon_type"
                                    value="aioa-icon-type-19"
                                    onChange={onIconChange}
                                    checked={
                                      parameters.icontype == 'aioa-icon-type-19' ? true : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image src={aioaicontype19} alt="" width="65" height="65" />
                                  </Form.Check.Label>
                                </Form.Check>
                                {/*  <label class="option">
                            <Image src={aioaicontype3} alt="" width="65" height="65" />
                          </label> */}
                              </div>
                            </div>

                            <div className="col-auto mb-30">
                              <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                <Form.Check type="radio" id="edit-type-20">
                                  <Form.Check.Input
                                    type="radio"
                                    name="aioa_icon_type"
                                    value="aioa-icon-type-20"
                                    onChange={onIconChange}
                                    checked={
                                      parameters.icontype == 'aioa-icon-type-20' ? true : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image src={aioaicontype20} alt="" width="65" height="65" />
                                  </Form.Check.Label>
                                </Form.Check>
                                {/*  <label class="option">
                            <Image src={aioaicontype3} alt="" width="65" height="65" />
                          </label> */}
                              </div>
                            </div>

                            <div className="col-auto mb-30">
                              <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                <Form.Check type="radio" id="edit-type-21">
                                  <Form.Check.Input
                                    type="radio"
                                    name="aioa_icon_type"
                                    value="aioa-icon-type-21"
                                    onChange={onIconChange}
                                    checked={
                                      parameters.icontype == 'aioa-icon-type-21' ? true : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image src={aioaicontype21} alt="" width="65" height="65" />
                                  </Form.Check.Label>
                                </Form.Check>
                                {/*  <label class="option">
                            <Image src={aioaicontype3} alt="" width="65" height="65" />
                          </label> */}
                              </div>
                            </div>

                            <div className="col-auto mb-30">
                              <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                <Form.Check type="radio" id="edit-type-22">
                                  <Form.Check.Input
                                    type="radio"
                                    name="aioa_icon_type"
                                    value="aioa-icon-type-22"
                                    onChange={onIconChange}
                                    checked={
                                      parameters.icontype == 'aioa-icon-type-22' ? true : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image src={aioaicontype22} alt="" width="65" height="65" />
                                  </Form.Check.Label>
                                </Form.Check>
                                {/*  <label class="option">
                            <Image src={aioaicontype3} alt="" width="65" height="65" />
                          </label> */}
                              </div>
                            </div>

                            <div className="col-auto mb-30">
                              <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                <Form.Check type="radio" id="edit-type-23">
                                  <Form.Check.Input
                                    type="radio"
                                    name="aioa_icon_type"
                                    value="aioa-icon-type-23"
                                    onChange={onIconChange}
                                    checked={
                                      parameters.icontype == 'aioa-icon-type-23' ? true : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image src={aioaicontype23} alt="" width="65" height="65" />
                                  </Form.Check.Label>
                                </Form.Check>
                                {/*  <label class="option">
                            <Image src={aioaicontype3} alt="" width="65" height="65" />
                          </label> */}
                              </div>
                            </div>

                            <div className="col-auto mb-30">
                              <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                <Form.Check type="radio" id="edit-type-24">
                                  <Form.Check.Input
                                    type="radio"
                                    name="aioa_icon_type"
                                    value="aioa-icon-type-24"
                                    onChange={onIconChange}
                                    checked={
                                      parameters.icontype == 'aioa-icon-type-24' ? true : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image src={aioaicontype24} alt="" width="65" height="65" />
                                  </Form.Check.Label>
                                </Form.Check>
                                {/*  <label class="option">
                            <Image src={aioaicontype3} alt="" width="65" height="65" />
                          </label> */}
                              </div>
                            </div>

                            <div className="col-auto mb-30">
                              <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                <Form.Check type="radio" id="edit-type-25">
                                  <Form.Check.Input
                                    type="radio"
                                    name="aioa_icon_type"
                                    value="aioa-icon-type-25"
                                    onChange={onIconChange}
                                    checked={
                                      parameters.icontype == 'aioa-icon-type-25' ? true : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image src={aioaicontype25} alt="" width="65" height="65" />
                                  </Form.Check.Label>
                                </Form.Check>
                                {/*  <label class="option">
                            <Image src={aioaicontype3} alt="" width="65" height="65" />
                          </label> */}
                              </div>
                            </div>

                            <div className="col-auto mb-30">
                              <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                <Form.Check type="radio" id="edit-type-26">
                                  <Form.Check.Input
                                    type="radio"
                                    name="aioa_icon_type"
                                    value="aioa-icon-type-26"
                                    onChange={onIconChange}
                                    checked={
                                      parameters.icontype == 'aioa-icon-type-26' ? true : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image src={aioaicontype26} alt="" width="65" height="65" />
                                  </Form.Check.Label>
                                </Form.Check>
                                {/*  <label class="option">
                            <Image src={aioaicontype3} alt="" width="65" height="65" />
                          </label> */}
                              </div>
                            </div>

                            <div className="col-auto mb-30">
                              <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                <Form.Check type="radio" id="edit-type-27">
                                  <Form.Check.Input
                                    type="radio"
                                    name="aioa_icon_type"
                                    value="aioa-icon-type-27"
                                    onChange={onIconChange}
                                    checked={
                                      parameters.icontype == 'aioa-icon-type-27' ? true : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image src={aioaicontype27} alt="" width="65" height="65" />
                                  </Form.Check.Label>
                                </Form.Check>
                                {/*  <label class="option">
                            <Image src={aioaicontype3} alt="" width="65" height="65" />
                          </label> */}
                              </div>
                            </div>

                            <div className="col-auto mb-30">
                              <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                <Form.Check type="radio" id="edit-type-28">
                                  <Form.Check.Input
                                    type="radio"
                                    name="aioa_icon_type"
                                    value="aioa-icon-type-28"
                                    onChange={onIconChange}
                                    checked={
                                      parameters.icontype == 'aioa-icon-type-28' ? true : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image src={aioaicontype28} alt="" width="65" height="65" />
                                  </Form.Check.Label>
                                </Form.Check>
                                {/*  <label class="option">
                            <Image src={aioaicontype3} alt="" width="65" height="65" />
                          </label> */}
                              </div>
                            </div>

                            <div className="col-auto mb-30">
                              <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                <Form.Check type="radio" id="edit-type-29">
                                  <Form.Check.Input
                                    type="radio"
                                    name="aioa_icon_type"
                                    value="aioa-icon-type-29"
                                    onChange={onIconChange}
                                    checked={
                                      parameters.icontype == 'aioa-icon-type-29' ? true : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image src={aioaicontype29} alt="" width="65" height="65" />
                                  </Form.Check.Label>
                                </Form.Check>
                                {/*  <label class="option">
                            <Image src={aioaicontype3} alt="" width="65" height="65" />
                          </label> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Form.Group>

                      <Form.Group className={`mb-30 row`}>
                        <div className="icon-custom-size-wrapper mb-3">
                          {/* Switch with Tooltip */}
                          <Row className="align-items-center mb-30">
                            <Col>
                              <Form.Label className="col-sm-12 col-form-label">
                                Enable icon custom size:
                              </Form.Label>
                            </Col>
                            <Col xs="auto">
                              <OverlayTrigger placement="bottom" overlay={renderTooltip}>
                                <Form.Check
                                  type="switch"
                                  id="custom-size-switcher"
                                  className="custom-switcher_inp_2"
                                  checked={isSizeSwitcherEnabled}
                                  onChange={() => setSizeSwitcherEnabled(!isSizeSwitcherEnabled)}
                                  style={{
                                    transform: 'scale(1.5)', // Increase the switch size
                                  }}
                                />
                              </OverlayTrigger>
                            </Col>
                          </Row>

                          {!isSizeSwitcherEnabled && (
                            <Form.Group
                              className={`icon-size-wrapper row ${isValid ? null : 'd-none'}`}
                            >
                              <Form.Label className="fcol-sm-12 col-form-label">
                                Select icon size:
                              </Form.Label>
                              <div className="col-sm-12">
                                <div className="row">
                                  <div className="col-auto mb-30">
                                    <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                      <Form.Check type="radio" id="edit-size-big">
                                        <Form.Check.Input
                                          type="radio"
                                          name="aioa_icon_size"
                                          value="aioa-big-icon"
                                          onChange={(e) =>
                                            setParameters({
                                              ...parameters,
                                              iconsize: e.target.value,
                                            })
                                          }
                                          checked={
                                            parameters.iconsize == 'aioa-big-icon' ? true : false
                                          }
                                          className="form-radio"
                                        ></Form.Check.Input>
                                        <Form.Check.Label className="option">
                                          <Image src={iconsize} alt="" width="75" height="75" />
                                        </Form.Check.Label>
                                      </Form.Check>
                                    </div>
                                  </div>
                                  <div className="col-auto mb-30">
                                    <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                      <Form.Check type="radio" id="edit-size-medium">
                                        <Form.Check.Input
                                          type="radio"
                                          name="aioa_icon_size"
                                          value="aioa-medium-icon"
                                          onChange={(e) =>
                                            setParameters({
                                              ...parameters,
                                              iconsize: e.target.value,
                                            })
                                          }
                                          checked={
                                            parameters.iconsize == 'aioa-medium-icon' ? true : false
                                          }
                                          className="form-radio"
                                        ></Form.Check.Input>
                                        <Form.Check.Label className="option">
                                          <Image src={iconsize} alt="" width="65" height="65" />
                                        </Form.Check.Label>
                                      </Form.Check>
                                    </div>
                                  </div>
                                  <div className="col-auto mb-30">
                                    <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                      <Form.Check type="radio" id="edit-size-default">
                                        <Form.Check.Input
                                          type="radio"
                                          name="aioa_icon_size"
                                          value="aioa-default-icon"
                                          onChange={(e) =>
                                            setParameters({
                                              ...parameters,
                                              iconsize: e.target.value,
                                            })
                                          }
                                          checked={
                                            parameters.iconsize == 'aioa-default-icon'
                                              ? true
                                              : false
                                          }
                                          className="form-radio"
                                        ></Form.Check.Input>
                                        <Form.Check.Label className="option">
                                          <Image src={iconsize} alt="" width="55" height="55" />
                                        </Form.Check.Label>
                                      </Form.Check>
                                    </div>
                                  </div>
                                  <div className="col-auto mb-30">
                                    <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                      <Form.Check type="radio" id="edit-size-small">
                                        <Form.Check.Input
                                          type="radio"
                                          name="aioa_icon_size"
                                          value="aioa-small-icon"
                                          onChange={(e) =>
                                            setParameters({
                                              ...parameters,
                                              iconsize: e.target.value,
                                            })
                                          }
                                          checked={
                                            parameters.iconsize == 'aioa-small-icon' ? true : false
                                          }
                                          className="form-radio"
                                        ></Form.Check.Input>
                                        <Form.Check.Label className="option">
                                          <Image src={iconsize} alt="" width="45" height="45" />
                                        </Form.Check.Label>
                                      </Form.Check>
                                    </div>
                                  </div>
                                  <div className="col-auto mb-30">
                                    <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                      <Form.Check type="radio" id="edit-size-extra-small">
                                        <Form.Check.Input
                                          type="radio"
                                          name="aioa_icon_size"
                                          value="aioa-extra-small-icon"
                                          onChange={(e) =>
                                            setParameters({
                                              ...parameters,
                                              iconsize: e.target.value,
                                            })
                                          }
                                          checked={
                                            parameters.iconsize == 'aioa-extra-small-icon'
                                              ? true
                                              : false
                                          }
                                          className="form-radio"
                                        ></Form.Check.Input>
                                        <Form.Check.Label className="option">
                                          <Image src={iconsize} alt="" width="35" height="35" />
                                        </Form.Check.Label>
                                      </Form.Check>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Form.Group>
                          )}

                          {/* Custom Size Controls */}
                          {isSizeSwitcherEnabled && (
                            <div className="custom-size-controls mt-3">
                              <Row>
                                <Col xs="auto" className="controls">
                                  <Form.Label
                                    htmlFor="widget_icon_size_custom"
                                    className="fcol-sm-12 col-form-label"
                                  >
                                    Select exact icon size:
                                  </Form.Label>
                                  <InputGroup className="mb-2">
                                    <FormControl
                                      type="number"
                                      id="widget_icon_size_custom"
                                      name="widget_icon_size_custom"
                                      aria-label="Value in pixels"
                                      aria-describedby="size-value-input_1"
                                      style={{ height: 'auto' }}
                                      min="20"
                                      max="150"
                                      onInput={(e) =>
                                        (e.target.value = Math.min(
                                          Math.max(e.target.value, 20),
                                          150
                                        ))
                                      }
                                    />
                                    <InputGroup.Text
                                      style={{ height: 'auto' }}
                                      id="size-value-input_1"
                                    >
                                      PX
                                    </InputGroup.Text>
                                  </InputGroup>
                                  <div className="description">20 - 150px are permitted values</div>
                                </Col>
                              </Row>
                            </div>
                          )}
                        </div>
                      </Form.Group>

                      <div className="save-changes-btn">
                        <Button
                          variant="primary"
                          size="lg"
                          id="submit"
                          onClick={onSaveChanges}
                          className="btn btn-primary"
                        >
                          Save Changes
                        </Button>
                        <Form.Group className={`mt-30 row`}>
                          {showSuccessMessage && (
                            <div className="success-message">Settings successfully saved!</div>
                          )}
                        </Form.Group>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { HomePage };
