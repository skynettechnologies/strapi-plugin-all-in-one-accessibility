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
 * HomePage
 *
 */

import React, { useCallback, useState, useEffect, ChangeEvent } from 'react';
import { Form, Button, Image } from 'react-bootstrap';
import aioaicontype1 from '../../../assets/images/aioa-icon-type-1.svg';
import aioaicontype2 from '../../../assets/images/aioa-icon-type-2.svg';
import aioaicontype3 from '../../../assets/images/aioa-icon-type-3.svg';
import SettingsApiHandler from '../API/settings';
import { Tab } from 'bootstrap';
// import cssString from "../../../assets/css/style.css";

const HomePage = () => {
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState('');
  const [parameters, setParameters] = useState({
    licenseKey: '',
    hexaColor: '',
    position: 'bottom_right',
    icontype: 'aioa-icon-type-1',
    iconsize: 'aioa-default-icon',
  });

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
        licenseKey: "",
        hexaColor: settingList['Color_Code'],
        position: settingList['Icon_Position'],
        icontype: settingList['Icon_Type'],
        iconsize: settingList['Icon_Size'],
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

  async function updatesetting(id, data) {
    SettingsApiHandler.editSettings(id, {
      // 'License Key': data.licenseKey,
      'License Key': "",
      'Color_Code': data.hexaColor,
      'Icon_Position': data.position,
      'Icon_Type': data.icontype,
      'Icon_Size': data.iconsize,
    });
       Fetchsettings()
  }

  async function addsetting(data) {
    console.log('addsetting parameters', parameters);

    SettingsApiHandler.addSettings({
      // 'License Key': data.licenseKey,
      'License Key': "",
      'Color_Code': data.hexaColor,
      'Icon_Position': data.position,
      'Icon_Type': data.icontype,
      'Icon_Size': data.iconsize,
    });
    Fetchsettings();
  }

  const onSaveChanges = async () => {
    if (Object.keys(settingList).length !== 0) {
      await updatesetting(settingList.id, parameters);
      saveData(parameters);
    } else {
      await addsetting(parameters);
      saveData(parameters);
    }
  };

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
          console.log('setIsValid', isValid);
          if (Object.keys(settingList).length !== 0) {
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

            if (isChanged == true) {
              setParameters({
                // licenseKey: "settingList['License_Key']",
                licenseKey: "",
                hexaColor: response['Data']['widget_color_code'],
                position: response['Data']['widget_position'],
                icontype: response['Data']['widget_icon_type'],
                iconsize: response['Data']['widget_icon_size'],
              });

              SettingsApiHandler.editSettings(settingList.id, {
                // License_Key: settingList['License_Key'],
                License_Key: "",
                Color_Code: response['Data']['widget_color_code'],
                Icon_Position: response['Data']['widget_position'],
                Icon_Type: response['Data']['widget_icon_type'],
                Icon_Size: response['Data']['widget_icon_size'],
              });

              // setParameters({ licenseKey: settingList["License Key"], hexaColor: settingList["Color Code"], position: settingList["Icon Position"], icontype: settingList["Icon Type"], iconsize: settingList["Icon Size"] })
            }
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

  const onIconChange = (e) => {
    setParameters({ ...parameters, icontype: e.target.value });
    if (e.target.value == 'aioa-icon-type-2') {
      setIconSize(aioaicontype2);
    } else if (e.target.value == 'aioa-icon-type-3') {
      setIconSize(aioaicontype3);
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

  const elementStyle = {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
  };

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
                  <h3>
                    <b>All in One Accessibility Settings:</b>
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
                      </Form.Group>

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
                          </div>
                        </div>
                      </Form.Group>

                      <Form.Group className={`icon-size-wrapper row ${isValid ? null : 'd-none'}`}>
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
                                      setParameters({ ...parameters, iconsize: e.target.value })
                                    }
                                    checked={parameters.iconsize == 'aioa-big-icon' ? true : false}
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
                                      setParameters({ ...parameters, iconsize: e.target.value })
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
                                      setParameters({ ...parameters, iconsize: e.target.value })
                                    }
                                    checked={
                                      parameters.iconsize == 'aioa-default-icon' ? true : false
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
                                      setParameters({ ...parameters, iconsize: e.target.value })
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
                                      setParameters({ ...parameters, iconsize: e.target.value })
                                    }
                                    checked={
                                      parameters.iconsize == 'aioa-extra-small-icon' ? true : false
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
