import React, { useState, useEffect } from "react"
import { Form, Button, Image } from "react-bootstrap"
import { InputGroup, FormControl, Row, Col } from "react-bootstrap"

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

const HomePage = () => {
  const [isValid, setIsValid] = useState(false)
  const [message, setMessage] = useState("")
  const [parameters, setParameters] = useState({
    hexaColor: "",
    widget_size: "0",
    position: "bottom_right",
    icontype: "aioa-icon-type-1",
    iconsize: "aioa-default-icon"
  })

  const [widgetSettings, setWidgetSettings] = useState({
    widget_icon_size_custom: "",
    custom_position_x_value: "",
    custom_position_y_value: "",
    custom_position_left_right: "To the top",
    custom_position_top_bottom: "To the left"
  })

  const [isSwitcherEnabled, setSwitcherEnabled] = useState(false)

  const [isSizeSwitcherEnabled, setSizeSwitcherEnabled] = useState(false)
  const [iconsize, setIconSize] = useState(aioaicontype1)
  const [settingList, setSetting] = useState({})
  const [isChanged, setIsChanged] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    console.log("settingList (outside): ", settingList)
    if (Object.keys(settingList).length !== 0) {
      console.log("Color Code", settingList["Color_Code"])
      console.log("Icon Position", settingList["Icon_Position"])
      console.log("Icon Type", settingList["Icon_Type"])
      console.log("Icon Size", settingList["Icon_Size"])

      setParameters({
        hexaColor: settingList["Color_Code"],
        position: settingList["Icon_Position"],
        icontype: settingList["Icon_Type"],
        iconsize: settingList["Icon_Size"],
        widget_size: "0"
      })
      if (settingList["Icon_Type"] === "aioa-icon-type-2") {
        setIconSize(aioaicontype2)
      } else if (settingList["Icon_Type"] === "aioa-icon-type-3") {
        setIconSize(aioaicontype3)
      } else {
        setIconSize(aioaicontype1)
      }
    }
    // const user = useCurrentUser()
    // console.log('user', user?.name);
    // console.log('user', user?.email);

    // getAPIData()
    fetchApiData()
  }, [settingList])

  useEffect(() => {
    console.log(parameters)
    console.log(
      "parameters.position : ",
      parameters.position === "bottom_center"
    )
  }, [parameters])

  useEffect(() => {}, [])

  /**
   * Get All Settings from Database
   */

  /**
   * Save Changes is a function which used to click on Save Changes Button on UI
   */
  const onSaveChanges = async () => {
    saveData(parameters)
  }

  /**
   * Save the data on Dashboard from Settings UI
   */
  const saveData = data => {
    const formdata = new FormData()

    const widget_icon_size_custom =
      document.getElementById("widget_icon_size_custom")?.value || ""
    const custom_position_x_value =
      document.getElementById("custom_position_x_value")?.value || ""
    const custom_position_y_value =
      document.getElementById("custom_position_y_value")?.value || ""
    const custom_position_left_right =
      document.getElementById("custom_position_left_right")?.value || ""
    const custom_position_top_bottom =
      document.getElementById("custom_position_top_bottom")?.value || ""

    let widget_position_right = "",
      widget_position_left = "",
      widget_position_top = "",
      widget_position_bottom = ""
    if (custom_position_left_right == "To the right") {
      widget_position_right = custom_position_x_value
    } else {
      widget_position_left = custom_position_x_value
    }

    if (custom_position_left_right == "To the bottom") {
      widget_position_bottom = custom_position_y_value
    } else {
      widget_position_top = custom_position_y_value
    }

    formdata.append("u", window.location.hostname)
    formdata.append("widget_position", data.position)
    formdata.append("widget_color_code", data.hexaColor)
    formdata.append("widget_icon_type", data.icontype)
    formdata.append("widget_icon_size", data.iconsize)
    formdata.append("widget_size", data.widget_size)
    formdata.append(
      "is_widget_custom_position",
      isSwitcherEnabled == true ? "1" : "0"
    )
    formdata.append(
      "is_widget_custom_size",
      isSizeSwitcherEnabled == true ? "1" : "0"
    )
    formdata.append("widget_icon_size_custom", widget_icon_size_custom)
    formdata.append("widget_position_right", widget_position_right)
    formdata.append("widget_position_left", widget_position_left)
    formdata.append("widget_position_top", widget_position_top)
    formdata.append("widget_position_bottom", widget_position_bottom)

    /*
      widget_position_right: widget_position_right,
      widget_position_left: widget_position_left,
      widget_position_top: widget_position_top,
      widget_position_bottom: widget_position_bottom
    */
    const requestOptions = {
      method: "POST",
      body: formdata
    }

    fetch(
      "https://ada.skynettechnologies.us/api/widget-setting-update-platform",
      requestOptions
    )
      .then(response => response.json())
      .then(async response => {
        console.log("response Save Data", response)
        setShowSuccessMessage(true)

        setTimeout(() => {
          setShowSuccessMessage(false)
        }, 3000) // Reset message after 3 seconds
      })
      .catch(error => console.log("error", error))
  }

  /**
   * Get API data will get all details from Dashboard API to Settings UI
   */
  const getAPIData = () => {
    const formdata = new FormData()
    formdata.append("website_url", window.location.hostname)

    const requestOptions = {
      method: "POST",
      body: formdata
    }
    fetch(
      "https://ada.skynettechnologies.us/api/widget-settings",
      requestOptions
    )
      .then(response => response.json())
      .then(response => {
        if (Object.keys(response.Data).length !== 0) {
          setIsValid(true)
          setParameters({
            hexaColor: response.Data.widget_color_code,
            position: response.Data.widget_position,
            icontype: response.Data.widget_icon_type,
            iconsize: response.Data.widget_icon_size,
            widget_size: response.Data.widget_size
          })
          setSizeSwitcherEnabled(
            response.Data.is_widget_custom_size == "0" ? false : true
          )
          setSwitcherEnabled(
            response.Data.is_widget_custom_position == "0" ? false : true
          )
          setWidgetSettings({
            widget_icon_size_custom:
              response.Data.widget_icon_size_custom || "",
            custom_position_x_value:
              parseInt(response.Data.widget_position_left) > 0
                ? response.Data.widget_position_left
                : response.Data.widget_position_right,
            custom_position_y_value:
              parseInt(response.Data.widget_position_bottom) > 0
                ? response.Data.widget_position_bottom
                : response.Data.widget_position_top,
            custom_position_left_right:
              parseInt(response.Data.widget_position_left) > 0
                ? "To the left"
                : "To the right",
            custom_position_top_bottom:
              parseInt(response.Data.widget_position_bottom) > 0
                ? "To the bottom"
                : "To the top"
          })
          console.log("setWidgetSettings : ", widgetSettings)
        } else {
          setIsValid(false)
        }
      })
      .catch(error => console.log("error", error))
  }

  /**
   * Icon change event when user change Icon Type on Settings UI
   */

  const onIconChange = e => {
    setParameters({ ...parameters, icontype: e.target.value })
    switch (e.target.value) {
      case "aioa-icon-type-2":
        setIconSize(aioaicontype2)
        break
      case "aioa-icon-type-3":
        setIconSize(aioaicontype3)
        break
      case "aioa-icon-type-4":
        setIconSize(aioaicontype4)
        break
      case "aioa-icon-type-5":
        setIconSize(aioaicontype5)
        break
      case "aioa-icon-type-6":
        setIconSize(aioaicontype6)
        break
      case "aioa-icon-type-7":
        setIconSize(aioaicontype7)
        break
      case "aioa-icon-type-8":
        setIconSize(aioaicontype8)
        break
      case "aioa-icon-type-9":
        setIconSize(aioaicontype9)
        break
      case "aioa-icon-type-10":
        setIconSize(aioaicontype10)
        break
      case "aioa-icon-type-11":
        setIconSize(aioaicontype11)
        break
      case "aioa-icon-type-12":
        setIconSize(aioaicontype12)
        break
      case "aioa-icon-type-13":
        setIconSize(aioaicontype13)
        break
      case "aioa-icon-type-14":
        setIconSize(aioaicontype14)
        break
      case "aioa-icon-type-15":
        setIconSize(aioaicontype15)
        break
      case "aioa-icon-type-16":
        setIconSize(aioaicontype16)
        break
      case "aioa-icon-type-17":
        setIconSize(aioaicontype17)
        break
      case "aioa-icon-type-18":
        setIconSize(aioaicontype18)
        break
      case "aioa-icon-type-19":
        setIconSize(aioaicontype19)
        break
      case "aioa-icon-type-20":
        setIconSize(aioaicontype20)
        break
      case "aioa-icon-type-21":
        setIconSize(aioaicontype21)
        break
      case "aioa-icon-type-22":
        setIconSize(aioaicontype22)
        break
      case "aioa-icon-type-23":
        setIconSize(aioaicontype23)
        break
      case "aioa-icon-type-24":
        setIconSize(aioaicontype24)
        break
      case "aioa-icon-type-25":
        setIconSize(aioaicontype25)
        break
      case "aioa-icon-type-26":
        setIconSize(aioaicontype26)
        break
      case "aioa-icon-type-27":
        setIconSize(aioaicontype27)
        break
      case "aioa-icon-type-28":
        setIconSize(aioaicontype28)
        break
      case "aioa-icon-type-29":
        setIconSize(aioaicontype29)
        break
      default:
        setIconSize(aioaicontype1)
    }
  }

  const onIconChange1 = e => {
    setParameters({ ...parameters, icontype: e.target.value })
    switch (e.target.value) {
      case "aioa-icon-type-2":
        setIconSize(aioaicontype2)
        break
      case "aioa-icon-type-3":
        setIconSize(aioaicontype3)
        break
      case "aioa-icon-type-4":
        setIconSize(aioaicontype4)
        break
      case "aioa-icon-type-5":
        setIconSize(aioaicontype5)
        break
      case "aioa-icon-type-6":
        setIconSize(aioaicontype6)
        break
      case "aioa-icon-type-7":
        setIconSize(aioaicontype7)
        break
      case "aioa-icon-type-8":
        setIconSize(aioaicontype8)
        break
      case "aioa-icon-type-9":
        setIconSize(aioaicontype9)
        break
      case "aioa-icon-type-10":
        setIconSize(aioaicontype10)
        break
      case "aioa-icon-type-11":
        setIconSize(aioaicontype11)
        break
      case "aioa-icon-type-12":
        setIconSize(aioaicontype12)
        break
      case "aioa-icon-type-13":
        setIconSize(aioaicontype13)
        break
      case "aioa-icon-type-14":
        setIconSize(aioaicontype14)
        break
      case "aioa-icon-type-15":
        setIconSize(aioaicontype15)
        break
      case "aioa-icon-type-16":
        setIconSize(aioaicontype16)
        break
      case "aioa-icon-type-17":
        setIconSize(aioaicontype17)
        break
      case "aioa-icon-type-18":
        setIconSize(aioaicontype18)
        break
      case "aioa-icon-type-19":
        setIconSize(aioaicontype19)
        break
      case "aioa-icon-type-20":
        setIconSize(aioaicontype20)
        break
      case "aioa-icon-type-21":
        setIconSize(aioaicontype21)
        break
      case "aioa-icon-type-22":
        setIconSize(aioaicontype22)
        break
      case "aioa-icon-type-23":
        setIconSize(aioaicontype23)
        break
      case "aioa-icon-type-24":
        setIconSize(aioaicontype24)
        break
      case "aioa-icon-type-25":
        setIconSize(aioaicontype25)
        break
      case "aioa-icon-type-26":
        setIconSize(aioaicontype26)
        break
      case "aioa-icon-type-27":
        setIconSize(aioaicontype27)
        break
      case "aioa-icon-type-28":
        setIconSize(aioaicontype28)
        break
      case "aioa-icon-type-29":
        setIconSize(aioaicontype29)
        break
      default:
        setIconSize(aioaicontype1)
    }
  }

  function fetchApiData() {
    const username = window.location.hostname
    const useremail = "no-reply@" + window.location.hostname + ".com"
    // var website_name = window.location.hostname
    var website_name = btoa(window.location.hostname);

    const packageType = "free-widget"
    const arrDetails = {
      name: username,
      email: useremail,
      company_name: username,
      website: website_name,
      package_type: packageType,
      start_date: new Date().toISOString(),
      end_date: "",
      price: "",
      discount_price: "0",
      platform: "strapi",
      api_key: "",
      is_trial_period: "",
      is_free_widget: "1",
      bill_address: "",
      country: "",
      state: "",
      city: "",
      post_code: "",
      transaction_id: "",
      subscr_id: "",
      payment_source: ""
    }

    const apiUrl = "https://ada.skynettechnologies.us/api/get-autologin-link"

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ website: website_name })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then(result => {
        if (result && result.link) {
          // Handle valid link
          getAPIData()
        } else {
          const secondApiUrl =
            "https://ada.skynettechnologies.us/api/add-user-domain"

          fetch(secondApiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(arrDetails)
          })
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
              }
              getAPIData()
              return response.json()
            })
            .then(data => {
              if (data.success) {
                // Handle success
                getAPIData()
              } else {
                // Handle error
              }
            })
            .catch(error => {
              // Handle error
            })
        }
      })
      .catch(error => {
        // Handle error
      })
  }

  const elementStyle = {
    marginTop: "0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  }

  const labelStyle = {
    backgroundColor: ""
  }

  const handleInput = e => {
    e.target.value = Math.min(
      Math.max(Number(e.target.value), 0),
      250
    ).toString()
  }

  const handleInput2 = e => {
    e.target.value = Math.min(
      Math.max(Number(e.target.value), 0),
      250
    ).toString()
  }

  const handleInput1 = e => {
    e.target.value = Math.min(
      Math.max(Number(e.target.value), 20),
      150
    ).toString()
  }

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
        @import ("./assets/css/style.css");
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
                      display: "block",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      marginLeft: "auto",
                      marginRight: "auto",
                      width: "50%"
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
                              className={`form-text col-sm-12 col-form-label ${
                                isValid ? "d-none" : ""
                              }`}
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center"
                              }}
                            >
                              Please{" "}
                              <a
                                href="https://ada.skynettechnologies.us/trial-subscription"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                &nbsp;Upgrade&nbsp;
                              </a>{" "}
                              to the full version of All in One Accessibility
                              Pro.
                            </div>
                          </Form.Label>
                          {/* <div className="col-sm-9">
                        <Form.Control value={parameters.licenseKey} type="text" onChange={checkLicenseKey} />
                        
                        <div className="form-text text-danger">{message}</div>
                      </div> */}
                        </Form.Group>
                      )}

                      <Form.Group className={`mb-30 row`}>
                        <Form.Label
                          htmlFor="inputPassword"
                          className="col-sm-3 col-form-label"
                        >
                          Hex color code:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            value={parameters.hexaColor}
                            className="form-control"
                            id="colorcode"
                            name="colorcode"
                            onChange={e =>
                              setParameters({
                                ...parameters,
                                hexaColor: e.target.value
                              })
                            }
                          />
                        </div>
                        <div className="col-sm-3"></div>
                        <div className="form-text col-sm-9">
                          You can customize the ADA Widget color. For example:
                          FF5733
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
                              onChange={e =>
                                setParameters({
                                  ...parameters,
                                  widget_size: e.target.value
                                })
                              }
                              checked={
                                parameters.widget_size == "0" ? true : false
                              }
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
                              onChange={e =>
                                setParameters({
                                  ...parameters,
                                  widget_size: e.target.value
                                })
                              }
                              checked={
                                parameters.widget_size == "1" ? true : false
                              }
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
                                  Enable precise accessibility widget icon
                                  position:
                                </Form.Label>
                              </Col>
                              <Col xs="auto">
                                <Form.Check
                                  type="switch"
                                  id="custom-position-switcher"
                                  className="custom-switcher"
                                  checked={isSwitcherEnabled}
                                  onChange={() =>
                                    setSwitcherEnabled(!isSwitcherEnabled)
                                  }
                                  style={{
                                    transform: "scale(1.5)" // Increase the switch size
                                  }}
                                />
                              </Col>
                            </Row>

                            {!isSwitcherEnabled && (
                              <Form.Group
                                className={`mb-30 row widget-position`}
                              >
                                <Form.Label className="col-sm-12 col-form-label">
                                  Where would you like to place the
                                  accessibility icon on your site?:
                                </Form.Label>
                                <div className="col-sm-12 three-col">
                                  <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                    <Form.Check
                                      type="radio"
                                      id="edit-position-top-left"
                                      label="Top left"
                                      name="position"
                                      value="top_left"
                                      onChange={e =>
                                        setParameters({
                                          ...parameters,
                                          position: e.target.value
                                        })
                                      }
                                      checked={
                                        parameters.position == "top_left"
                                          ? true
                                          : false
                                      }
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
                                      onChange={e =>
                                        setParameters({
                                          ...parameters,
                                          position: e.target.value
                                        })
                                      }
                                      checked={
                                        parameters.position == "top_center"
                                          ? true
                                          : false
                                      }
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
                                      onChange={e =>
                                        setParameters({
                                          ...parameters,
                                          position: e.target.value
                                        })
                                      }
                                      checked={
                                        parameters.position == "top_right"
                                          ? true
                                          : false
                                      }
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
                                      onChange={e =>
                                        setParameters({
                                          ...parameters,
                                          position: e.target.value
                                        })
                                      }
                                      checked={
                                        parameters.position == "middle_left"
                                          ? true
                                          : false
                                      }
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
                                      onChange={e =>
                                        setParameters({
                                          ...parameters,
                                          position: e.target.value
                                        })
                                      }
                                      checked={
                                        parameters.position == "middle_right"
                                          ? true
                                          : false
                                      }
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
                                      onChange={e =>
                                        setParameters({
                                          ...parameters,
                                          position: e.target.value
                                        })
                                      }
                                      checked={
                                        parameters.position == "bottom_left"
                                          ? true
                                          : false
                                      }
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
                                      onChange={e =>
                                        setParameters({
                                          ...parameters,
                                          position: e.target.value
                                        })
                                      }
                                      checked={
                                        parameters.position == "bottom_center"
                                          ? true
                                          : false
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
                                      onChange={e =>
                                        setParameters({
                                          ...parameters,
                                          position: e.target.value
                                        })
                                      }
                                      checked={
                                        parameters.position == "bottom_right"
                                          ? true
                                          : false
                                      }
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
                                        onInput={handleInput}
                                        defaultValue={
                                          widgetSettings.custom_position_x_value
                                        }
                                      />
                                      <InputGroup.Text>PX</InputGroup.Text>
                                    </InputGroup>
                                  </Col>
                                  <Col xs="auto">
                                    <Form.Select
                                      id="custom_position_left_right"
                                      aria-label="Position select"
                                      value={
                                        widgetSettings.custom_position_left_right
                                      }
                                    >
                                      <option value="cust-pos-to-the-right">
                                        To the right
                                      </option>
                                      <option value="cust-pos-to-the-left">
                                        To the left
                                      </option>
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
                                        onInput={handleInput2}
                                        defaultValue={
                                          widgetSettings.custom_position_y_value
                                        }
                                      />
                                      <InputGroup.Text>PX</InputGroup.Text>
                                    </InputGroup>
                                  </Col>
                                  <Col xs="auto">
                                    <Form.Select
                                      id="custom_position_top_bottom"
                                      aria-label="Position select"
                                      value={
                                        widgetSettings.custom_position_top_bottom
                                      }
                                    >
                                      <option value="cust-pos-to-the-lower">
                                        To the bottom
                                      </option>
                                      <option value="cust-pos-to-the-upper">
                                        To the top
                                      </option>
                                    </Form.Select>
                                  </Col>
                                </Row>
                                <div className="description">
                                  0 - 250px are permitted values
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </Form.Group>

                      <Form.Group
                        className={`icon-type-wrapper row ${
                          isValid ? null : "d-none"
                        }`}
                      >
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
                                      parameters.icontype == "aioa-icon-type-1"
                                        ? true
                                        : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image
                                      src={aioaicontype1}
                                      alt=""
                                      width="65"
                                      height="65"
                                    />
                                  </Form.Check.Label>
                                </Form.Check>
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
                                      parameters.icontype == "aioa-icon-type-2"
                                        ? true
                                        : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image
                                      src={aioaicontype2}
                                      alt=""
                                      width="65"
                                      height="65"
                                    />
                                  </Form.Check.Label>
                                </Form.Check>
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
                                      parameters.icontype == "aioa-icon-type-3"
                                        ? true
                                        : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image
                                      src={aioaicontype3}
                                      alt=""
                                      width="65"
                                      height="65"
                                    />
                                  </Form.Check.Label>
                                </Form.Check>
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
                                      parameters.icontype == "aioa-icon-type-4"
                                        ? true
                                        : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image
                                      src={aioaicontype4}
                                      alt=""
                                      width="65"
                                      height="65"
                                    />
                                  </Form.Check.Label>
                                </Form.Check>
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
                                      parameters.icontype == "aioa-icon-type-5"
                                        ? true
                                        : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image
                                      src={aioaicontype5}
                                      alt=""
                                      width="65"
                                      height="65"
                                    />
                                  </Form.Check.Label>
                                </Form.Check>
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
                                      parameters.icontype == "aioa-icon-type-6"
                                        ? true
                                        : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image
                                      src={aioaicontype6}
                                      alt=""
                                      width="65"
                                      height="65"
                                    />
                                  </Form.Check.Label>
                                </Form.Check>
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
                                      parameters.icontype == "aioa-icon-type-7"
                                        ? true
                                        : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image
                                      src={aioaicontype7}
                                      alt=""
                                      width="65"
                                      height="65"
                                    />
                                  </Form.Check.Label>
                                </Form.Check>
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
                                      parameters.icontype == "aioa-icon-type-8"
                                        ? true
                                        : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image
                                      src={aioaicontype8}
                                      alt=""
                                      width="65"
                                      height="65"
                                    />
                                  </Form.Check.Label>
                                </Form.Check>
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
                                      parameters.icontype == "aioa-icon-type-9"
                                        ? true
                                        : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image
                                      src={aioaicontype9}
                                      alt=""
                                      width="65"
                                      height="65"
                                    />
                                  </Form.Check.Label>
                                </Form.Check>
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
                                      parameters.icontype == "aioa-icon-type-10"
                                        ? true
                                        : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image
                                      src={aioaicontype10}
                                      alt=""
                                      width="65"
                                      height="65"
                                    />
                                  </Form.Check.Label>
                                </Form.Check>
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
                                      parameters.icontype == "aioa-icon-type-11"
                                        ? true
                                        : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image
                                      src={aioaicontype11}
                                      alt=""
                                      width="65"
                                      height="65"
                                    />
                                  </Form.Check.Label>
                                </Form.Check>
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
                                      parameters.icontype == "aioa-icon-type-12"
                                        ? true
                                        : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image
                                      src={aioaicontype12}
                                      alt=""
                                      width="65"
                                      height="65"
                                    />
                                  </Form.Check.Label>
                                </Form.Check>
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
                                      parameters.icontype == "aioa-icon-type-13"
                                        ? true
                                        : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image
                                      src={aioaicontype13}
                                      alt=""
                                      width="65"
                                      height="65"
                                    />
                                  </Form.Check.Label>
                                </Form.Check>
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
                                      parameters.icontype == "aioa-icon-type-14"
                                        ? true
                                        : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image
                                      src={aioaicontype14}
                                      alt=""
                                      width="65"
                                      height="65"
                                    />
                                  </Form.Check.Label>
                                </Form.Check>
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
                                      parameters.icontype == "aioa-icon-type-15"
                                        ? true
                                        : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image
                                      src={aioaicontype15}
                                      alt=""
                                      width="65"
                                      height="65"
                                    />
                                  </Form.Check.Label>
                                </Form.Check>
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
                                      parameters.icontype == "aioa-icon-type-16"
                                        ? true
                                        : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image
                                      src={aioaicontype16}
                                      alt=""
                                      width="65"
                                      height="65"
                                    />
                                  </Form.Check.Label>
                                </Form.Check>
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
                                      parameters.icontype == "aioa-icon-type-17"
                                        ? true
                                        : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image
                                      src={aioaicontype17}
                                      alt=""
                                      width="65"
                                      height="65"
                                    />
                                  </Form.Check.Label>
                                </Form.Check>
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
                                      parameters.icontype == "aioa-icon-type-18"
                                        ? true
                                        : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image
                                      src={aioaicontype18}
                                      alt=""
                                      width="65"
                                      height="65"
                                    />
                                  </Form.Check.Label>
                                </Form.Check>
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
                                      parameters.icontype == "aioa-icon-type-19"
                                        ? true
                                        : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image
                                      src={aioaicontype19}
                                      alt=""
                                      width="65"
                                      height="65"
                                    />
                                  </Form.Check.Label>
                                </Form.Check>
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
                                      parameters.icontype == "aioa-icon-type-20"
                                        ? true
                                        : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image
                                      src={aioaicontype20}
                                      alt=""
                                      width="65"
                                      height="65"
                                    />
                                  </Form.Check.Label>
                                </Form.Check>
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
                                      parameters.icontype == "aioa-icon-type-21"
                                        ? true
                                        : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image
                                      src={aioaicontype21}
                                      alt=""
                                      width="65"
                                      height="65"
                                    />
                                  </Form.Check.Label>
                                </Form.Check>
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
                                      parameters.icontype == "aioa-icon-type-22"
                                        ? true
                                        : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image
                                      src={aioaicontype22}
                                      alt=""
                                      width="65"
                                      height="65"
                                    />
                                  </Form.Check.Label>
                                </Form.Check>
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
                                      parameters.icontype == "aioa-icon-type-23"
                                        ? true
                                        : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image
                                      src={aioaicontype23}
                                      alt=""
                                      width="65"
                                      height="65"
                                    />
                                  </Form.Check.Label>
                                </Form.Check>
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
                                      parameters.icontype == "aioa-icon-type-24"
                                        ? true
                                        : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image
                                      src={aioaicontype24}
                                      alt=""
                                      width="65"
                                      height="65"
                                    />
                                  </Form.Check.Label>
                                </Form.Check>
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
                                      parameters.icontype == "aioa-icon-type-25"
                                        ? true
                                        : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image
                                      src={aioaicontype25}
                                      alt=""
                                      width="65"
                                      height="65"
                                    />
                                  </Form.Check.Label>
                                </Form.Check>
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
                                      parameters.icontype == "aioa-icon-type-26"
                                        ? true
                                        : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image
                                      src={aioaicontype26}
                                      alt=""
                                      width="65"
                                      height="65"
                                    />
                                  </Form.Check.Label>
                                </Form.Check>
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
                                      parameters.icontype == "aioa-icon-type-27"
                                        ? true
                                        : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image
                                      src={aioaicontype27}
                                      alt=""
                                      width="65"
                                      height="65"
                                    />
                                  </Form.Check.Label>
                                </Form.Check>
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
                                      parameters.icontype == "aioa-icon-type-28"
                                        ? true
                                        : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image
                                      src={aioaicontype28}
                                      alt=""
                                      width="65"
                                      height="65"
                                    />
                                  </Form.Check.Label>
                                </Form.Check>
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
                                      parameters.icontype == "aioa-icon-type-29"
                                        ? true
                                        : false
                                    }
                                    className="form-radio"
                                  ></Form.Check.Input>
                                  <Form.Check.Label className="option">
                                    <Image
                                      src={aioaicontype29}
                                      alt=""
                                      width="65"
                                      height="65"
                                    />
                                  </Form.Check.Label>
                                </Form.Check>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Form.Group>

                      <Form.Group className={`mb-30 row`}>
                        <div className="icon-custom-size-wrapper mb-3">
                          <Row className="align-items-center mb-30">
                            <Col>
                              <Form.Label className="col-sm-12 col-form-label">
                                Enable icon custom size:
                              </Form.Label>
                            </Col>
                            <Col xs="auto">
                              <Form.Check
                                type="switch"
                                id="custom-size-switcher"
                                className="custom-switcher_inp_2"
                                checked={isSizeSwitcherEnabled}
                                onChange={() =>
                                  setSizeSwitcherEnabled(!isSizeSwitcherEnabled)
                                }
                                style={{
                                  transform: "scale(1.5)" // Increase the switch size
                                }}
                              />
                            </Col>
                          </Row>

                          {!isSizeSwitcherEnabled && (
                            <Form.Group
                              className={`icon-size-wrapper row ${
                                isValid ? null : "d-none"
                              }`}
                            >
                              <Form.Label className="fcol-sm-12 col-form-label">
                                Select icon size:
                              </Form.Label>
                              <div className="col-sm-12">
                                <div className="row">
                                  <div className="col-auto mb-30">
                                    <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                      <Form.Check
                                        type="radio"
                                        id="edit-size-big"
                                      >
                                        <Form.Check.Input
                                          type="radio"
                                          name="aioa_icon_size"
                                          value="aioa-big-icon"
                                          onChange={e =>
                                            setParameters({
                                              ...parameters,
                                              iconsize: e.target.value
                                            })
                                          }
                                          checked={
                                            parameters.iconsize ==
                                            "aioa-big-icon"
                                              ? true
                                              : false
                                          }
                                          className="form-radio"
                                        ></Form.Check.Input>
                                        <Form.Check.Label className="option">
                                          <Image
                                            src={iconsize}
                                            alt=""
                                            width="75"
                                            height="75"
                                          />
                                        </Form.Check.Label>
                                      </Form.Check>
                                    </div>
                                  </div>
                                  <div className="col-auto mb-30">
                                    <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                      <Form.Check
                                        type="radio"
                                        id="edit-size-medium"
                                      >
                                        <Form.Check.Input
                                          type="radio"
                                          name="aioa_icon_size"
                                          value="aioa-medium-icon"
                                          onChange={e =>
                                            setParameters({
                                              ...parameters,
                                              iconsize: e.target.value
                                            })
                                          }
                                          checked={
                                            parameters.iconsize ==
                                            "aioa-medium-icon"
                                              ? true
                                              : false
                                          }
                                          className="form-radio"
                                        ></Form.Check.Input>
                                        <Form.Check.Label className="option">
                                          <Image
                                            src={iconsize}
                                            alt=""
                                            width="65"
                                            height="65"
                                          />
                                        </Form.Check.Label>
                                      </Form.Check>
                                    </div>
                                  </div>
                                  <div className="col-auto mb-30">
                                    <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                      <Form.Check
                                        type="radio"
                                        id="edit-size-default"
                                      >
                                        <Form.Check.Input
                                          type="radio"
                                          name="aioa_icon_size"
                                          value="aioa-default-icon"
                                          onChange={e =>
                                            setParameters({
                                              ...parameters,
                                              iconsize: e.target.value
                                            })
                                          }
                                          checked={
                                            parameters.iconsize ==
                                            "aioa-default-icon"
                                              ? true
                                              : false
                                          }
                                          className="form-radio"
                                        ></Form.Check.Input>
                                        <Form.Check.Label className="option">
                                          <Image
                                            src={iconsize}
                                            alt=""
                                            width="55"
                                            height="55"
                                          />
                                        </Form.Check.Label>
                                      </Form.Check>
                                    </div>
                                  </div>
                                  <div className="col-auto mb-30">
                                    <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                      <Form.Check
                                        type="radio"
                                        id="edit-size-small"
                                      >
                                        <Form.Check.Input
                                          type="radio"
                                          name="aioa_icon_size"
                                          value="aioa-small-icon"
                                          onChange={e =>
                                            setParameters({
                                              ...parameters,
                                              iconsize: e.target.value
                                            })
                                          }
                                          checked={
                                            parameters.iconsize ==
                                            "aioa-small-icon"
                                              ? true
                                              : false
                                          }
                                          className="form-radio"
                                        ></Form.Check.Input>
                                        <Form.Check.Label className="option">
                                          <Image
                                            src={iconsize}
                                            alt=""
                                            width="45"
                                            height="45"
                                          />
                                        </Form.Check.Label>
                                      </Form.Check>
                                    </div>
                                  </div>
                                  <div className="col-auto mb-30">
                                    <div className="js-form-item form-item js-form-type-radio form-type-radio js-form-item-position form-item-position">
                                      <Form.Check
                                        type="radio"
                                        id="edit-size-extra-small"
                                      >
                                        <Form.Check.Input
                                          type="radio"
                                          name="aioa_icon_size"
                                          value="aioa-extra-small-icon"
                                          onChange={e =>
                                            setParameters({
                                              ...parameters,
                                              iconsize: e.target.value
                                            })
                                          }
                                          checked={
                                            parameters.iconsize ==
                                            "aioa-extra-small-icon"
                                              ? true
                                              : false
                                          }
                                          className="form-radio"
                                        ></Form.Check.Input>
                                        <Form.Check.Label className="option">
                                          <Image
                                            src={iconsize}
                                            alt=""
                                            width="35"
                                            height="35"
                                          />
                                        </Form.Check.Label>
                                      </Form.Check>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Form.Group>
                          )}

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
                                      style={{ height: "auto" }}
                                      min="20"
                                      max="150"
                                      onInput={handleInput1}
                                      defaultValue={
                                        widgetSettings.widget_icon_size_custom
                                      }
                                    />
                                    <InputGroup.Text
                                      style={{ height: "auto" }}
                                      id="size-value-input_1"
                                    >
                                      PX
                                    </InputGroup.Text>
                                  </InputGroup>
                                  <div className="description">
                                    20 - 150px are permitted values
                                  </div>
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
                            <div className="success-message">
                              Settings successfully saved!
                            </div>
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
  )
}
export { HomePage };