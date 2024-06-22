import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { EmptyStateLayout as EmptyStateLayout$1, Flex, Alert, Loader, Dialog, Box, DialogBody, DialogFooter, Button, Typography, DateTimePicker, Tbody, Tr, Td, Table as Table$2, Thead, Th, BaseCheckbox, IconButton, Tooltip, VisuallyHidden, Tag, Popover, SingleSelect, SingleSelectOption, DatePicker, NumberInput, TimePicker, Field, FieldInput, TextInput, Textarea, Icon, Checkbox, ToggleInput, JSONInput, Pagination, PreviousLink, PageLink, Dots, NextLink, SearchForm, Searchbar } from "@strapi/design-system";
import { ExclamationMarkCircle, Trash, CarretDown, EmptyDocuments, EmptyPictures, EmptyPermissions, Cross, Plus, Eye, EyeStriked, Search, Refresh, Clock, Minus } from "@strapi/icons";
import { useIntl } from "react-intl";
import { useQuery as useQuery$1, useQueries } from "react-query";
import { Redirect, useLocation, useHistory, NavLink } from "react-router-dom";
import * as React from "react";
import { useMemo, useCallback, useState, useEffect, useRef } from "react";
import { Link as Link$1, LinkButton as LinkButton$1 } from "@strapi/design-system/v2";
import axios from "axios";
import qs, { parse, stringify } from "qs";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled, { useTheme, keyframes } from "styled-components";
import formatISO from "date-fns/formatISO";
import { useFormikContext, Form as Form$1 } from "formik";
import isEqual from "lodash/isEqual";
import Select, { components } from "react-select";
import { intervalToDuration, isPast } from "date-fns";
import { Helmet } from "react-helmet";
import get from "lodash/get";
import { createPortal } from "react-dom";
import isObject from "lodash/isObject";
import transform from "lodash/transform";
import startsWith from "lodash/startsWith";
const AnErrorOccurred = ({
  content = {
    id: "anErrorOccurred",
    defaultMessage: "Woops! Something went wrong. Please, try again.",
    values: {}
  },
  ...rest
}) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(
    EmptyStateLayout$1,
    {
      ...rest,
      icon: /* @__PURE__ */ jsx(ExclamationMarkCircle, { width: "10rem" }),
      content: formatMessage(
        { id: content.id, defaultMessage: content.defaultMessage },
        content.values
      )
    }
  );
};
const useCallbackRef = (callback) => {
  const callbackRef = React.useRef(callback);
  React.useEffect(() => {
    callbackRef.current = callback;
  });
  return React.useMemo(() => (...args) => callbackRef.current?.(...args), []);
};
const NotificationsContext = React.createContext({
  toggleNotification: () => {
  }
});
const NotificationsProvider = ({ children }) => {
  const notificationIdRef = React.useRef(0);
  const [notifications, setNotifications] = React.useState([]);
  const toggleNotification = React.useCallback(
    ({ type, message, link, timeout, blockTransition, onClose, title }) => {
      setNotifications((s) => [
        ...s,
        {
          id: notificationIdRef.current++,
          type,
          message,
          link,
          timeout,
          blockTransition,
          onClose,
          title
        }
      ]);
    },
    []
  );
  const clearNotification = React.useCallback((id) => {
    setNotifications((s) => s.filter((n) => n.id !== id));
  }, []);
  const value = React.useMemo(() => ({ toggleNotification }), [toggleNotification]);
  return /* @__PURE__ */ jsxs(NotificationsContext.Provider, { value, children: [
    /* @__PURE__ */ jsx(
      Flex,
      {
        left: "50%",
        marginLeft: "-250px",
        position: "fixed",
        direction: "column",
        alignItems: "stretch",
        gap: 2,
        top: `${46 / 16}rem`,
        width: `${500 / 16}rem`,
        zIndex: 10,
        children: notifications.map((notification) => {
          return /* @__PURE__ */ jsx(
            Notification,
            {
              ...notification,
              clearNotification
            },
            notification.id
          );
        })
      }
    ),
    children
  ] });
};
const Notification = ({
  clearNotification,
  blockTransition = false,
  id,
  link,
  message = {
    id: "notification.success.saved",
    defaultMessage: "Saved"
  },
  onClose,
  timeout = 2500,
  title,
  type
}) => {
  const { formatMessage } = useIntl();
  const onCloseCallback = useCallbackRef(onClose);
  const handleClose = React.useCallback(() => {
    onCloseCallback();
    clearNotification(id);
  }, [clearNotification, id, onCloseCallback]);
  React.useEffect(() => {
    if (!blockTransition) {
      const timeoutReference = setTimeout(() => {
        handleClose();
      }, timeout);
      return () => {
        clearTimeout(timeoutReference);
      };
    }
  }, [blockTransition, handleClose, timeout]);
  let variant;
  let alertTitle;
  if (type === "info") {
    variant = "default";
    alertTitle = formatMessage({
      id: "notification.default.title",
      defaultMessage: "Information:"
    });
  } else if (type === "warning") {
    variant = "danger";
    alertTitle = formatMessage({
      id: "notification.warning.title",
      defaultMessage: "Warning:"
    });
  } else if (type === "softWarning") {
    variant = "warning";
    alertTitle = formatMessage({
      id: "notification.warning.title",
      defaultMessage: "Warning:"
    });
  } else {
    variant = "success";
    alertTitle = formatMessage({
      id: "notification.success.title",
      defaultMessage: "Success:"
    });
  }
  if (title) {
    alertTitle = typeof title === "string" ? title : formatMessage(
      {
        id: title.id,
        defaultMessage: title.defaultMessage ?? title.id
      },
      title.values
    );
  }
  return /* @__PURE__ */ jsx(
    Alert,
    {
      action: link ? /* @__PURE__ */ jsx(Link$1, { href: link.url, isExternal: true, children: formatMessage({
        id: typeof link.label === "object" ? link.label.id : link.label,
        defaultMessage: typeof link.label === "object" ? link.label.defaultMessage ?? link.label.id : link.label
      }) }) : void 0,
      onClose: handleClose,
      closeLabel: formatMessage({
        id: "global.close",
        defaultMessage: "Close"
      }),
      title: alertTitle,
      variant,
      children: message && typeof message === "object" ? formatMessage(
        {
          id: message.id,
          defaultMessage: message.defaultMessage ?? message.id
        },
        message.values
      ) : message
    }
  );
};
/**
 * @preserve
 * @description Returns an object to interact with the notification
 * system. The callbacks are wrapped in `useCallback` for a stable
 * identity.
 *
 * @example
 * ```tsx
 * import { useNotification } from '@strapi/helper-plugin';
 *
 * const MyComponent = () => {
 *  const toggleNotification = useNotification();
 *
 *  return <button onClick={() => toggleNotification({ message: 'Hello world!' })}>Click me</button>;
 */
const useNotification = () => React.useContext(NotificationsContext).toggleNotification;
const RBACContext = React.createContext({
  allPermissions: [],
  refetchPermissions: async () => {
    throw new Error("RBACContext: refetchPermissions() not implemented");
  }
});
const RBACProviderContext = RBACContext;
const useRBAC$1 = () => React.useContext(RBACContext);
const useRBACProvider = useRBAC$1;
const TOKEN_KEY = "jwtToken";
const USER_INFO = "userInfo";
const CURRENT_STEP = "GUIDED_TOUR_CURRENT_STEP";
const COMPLETED_STEPS = "GUIDED_TOUR_COMPLETED_STEPS";
const SKIPPED = "GUIDED_TOUR_SKIPPED";
const THEME_KEY = "STRAPI_THEME";
const UPLOAD_MODAL_VIEW = "STRAPI_UPLOAD_MODAL_VIEW";
const UPLOAD_VIEW = "STRAPI_UPLOAD_LIBRARY_VIEW";
const auth = {
  clear(key) {
    if (localStorage.getItem(key)) {
      return localStorage.removeItem(key);
    }
    if (sessionStorage.getItem(key)) {
      return sessionStorage.removeItem(key);
    }
    return null;
  },
  clearAppStorage() {
    if (localStorage) {
      const videos = auth.get("videos");
      const onboarding = auth.get("onboarding");
      const strapiUpdateNotification = auth.get("STRAPI_UPDATE_NOTIF");
      const localeLang = localStorage.getItem("strapi-admin-language");
      const guidedTourCurrentStep = auth.get(CURRENT_STEP);
      const guidedTourState = auth.get(COMPLETED_STEPS);
      const guidedTourSkipped = auth.get(SKIPPED);
      const applicationTheme = auth.get(THEME_KEY);
      const uploadMediaLibraryView = auth.get(UPLOAD_VIEW);
      const uploadMediaLibraryModalView = auth.get(UPLOAD_MODAL_VIEW);
      localStorage.clear();
      localStorage.setItem("videos", JSON.stringify(videos));
      localStorage.setItem(CURRENT_STEP, JSON.stringify(guidedTourCurrentStep));
      localStorage.setItem(COMPLETED_STEPS, JSON.stringify(guidedTourState));
      localStorage.setItem(SKIPPED, JSON.stringify(guidedTourSkipped));
      localStorage.setItem("STRAPI_UPDATE_NOTIF", JSON.stringify(strapiUpdateNotification));
      if (onboarding) {
        localStorage.setItem("onboarding", JSON.stringify(onboarding));
      }
      if (localeLang) {
        localStorage.setItem("strapi-admin-language", localeLang);
      }
      if (applicationTheme) {
        localStorage.setItem(THEME_KEY, applicationTheme);
      }
      if (!isNil(uploadMediaLibraryView)) {
        localStorage.setItem(UPLOAD_VIEW, JSON.stringify(uploadMediaLibraryView));
      }
      if (!isNil(uploadMediaLibraryModalView)) {
        localStorage.setItem(UPLOAD_MODAL_VIEW, JSON.stringify(uploadMediaLibraryModalView));
      }
    }
    sessionStorage.clear();
  },
  get(key) {
    const item = localStorage.getItem(key) ?? sessionStorage.getItem(key);
    if (item) {
      try {
        const parsedItem = JSON.parse(item);
        return parsedItem;
      } catch (error) {
        return item;
      }
    }
    return null;
  },
  set(value, key, isLocalStorage) {
    if (isEmpty(value)) {
      return null;
    }
    if (isLocalStorage) {
      return localStorage.setItem(key, JSON.stringify(value));
    }
    return sessionStorage.setItem(key, JSON.stringify(value));
  },
  /**
   * @deprecated use auth.clear("jwtToken") instead
   */
  clearToken(tokenKey = TOKEN_KEY) {
    void auth.clear(tokenKey);
  },
  /**
   * @deprecated use auth.clear("userInfo") instead
   */
  clearUserInfo(userInfoKey = USER_INFO) {
    return auth.clear(userInfoKey);
  },
  /**
   * @deprecated use auth.get("jwtToken") instead
   */
  getToken(tokenKey = TOKEN_KEY) {
    return auth.get(tokenKey);
  },
  /**
   * @deprecated use auth.get("userInfo") instead
   */
  getUserInfo(userInfoKey = USER_INFO) {
    return auth.get(userInfoKey);
  },
  /**
   * @depreacted use auth.set(value, "jwtToken", true | false) instead
   */
  setToken(value = "", isLocalStorage = false, tokenKey = TOKEN_KEY) {
    void auth.set(value, tokenKey, isLocalStorage);
  },
  /**
   * @depreacted use auth.set(value, "userInfo", true | false) instead
   */
  setUserInfo(value, isLocalStorage = false, userInfo = USER_INFO) {
    void auth.set(value, userInfo, isLocalStorage);
  },
  /**
   * @depreacted use auth.set(value, "userInfo", true | false) instead
   */
  updateToken(value = "") {
    const isLocalStorage = Boolean(localStorage.getItem(TOKEN_KEY));
    void auth.setToken(value, isLocalStorage);
  }
};
const fetchClient = () => {
  const instance2 = axios.create({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { encode: false });
    }
  });
  instance2.interceptors.request.use(
    async (config) => {
      config.headers.Authorization = `Bearer ${auth.getToken()}`;
      return config;
    },
    (error) => Promise.reject(error)
  );
  instance2.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        auth.clearAppStorage();
        window.location.reload();
      }
      throw error;
    }
  );
  return instance2;
};
const instance = fetchClient();
const addPrependingSlash = (url) => url.charAt(0) !== "/" ? `/${url}` : url;
const hasProtocol = (url) => new RegExp("^(?:[a-z+]+:)?//", "i").test(url);
const normalizeUrl = (url) => hasProtocol(url) ? url : addPrependingSlash(url);
const getFetchClient = (defaultOptions = {}) => {
  instance.defaults.baseURL = window.strapi.backendURL;
  return {
    get: (url, config) => instance.get(normalizeUrl(url), {
      ...defaultOptions,
      ...config
    }),
    put: (url, data, config) => instance.put(normalizeUrl(url), data, { ...defaultOptions, ...config }),
    post: (url, data, config) => instance.post(normalizeUrl(url), data, { ...defaultOptions, ...config }),
    del: (url, config) => instance.delete(normalizeUrl(url), { ...defaultOptions, ...config })
  };
};
const findMatchingPermissions = (userPermissions, permissions) => userPermissions.reduce((acc, curr) => {
  const associatedPermission = permissions.find(
    (perm) => perm.action === curr.action && perm.subject === curr.subject
  );
  if (associatedPermission) {
    acc.push(curr);
  }
  return acc;
}, []);
const formatPermissionsForRequest = (permissions) => permissions.map((permission) => {
  if (!permission.action) {
    return {};
  }
  const returnedPermission = {
    action: permission.action
  };
  if (permission.subject) {
    returnedPermission.subject = permission.subject;
  }
  return returnedPermission;
});
const shouldCheckPermissions = (permissions) => permissions.length > 0 && permissions.every((perm) => Array.isArray(perm.conditions) && perm.conditions.length > 0);
const hasPermissions = async (userPermissions, permissions, signal) => {
  if (!permissions || !permissions.length) {
    return true;
  }
  const matchingPermissions = findMatchingPermissions(userPermissions, permissions);
  if (shouldCheckPermissions(matchingPermissions)) {
    let hasPermission = false;
    try {
      const {
        data: { data }
      } = await getFetchClient().post(
        "/admin/permissions/check",
        {
          permissions: formatPermissionsForRequest(matchingPermissions)
        },
        { signal }
      );
      hasPermission = data.every((v) => v === true);
    } catch (err) {
      console.error("Error while checking permissions", err);
    }
    return hasPermission;
  }
  return matchingPermissions.length > 0;
};
const Wrapper = styled(Flex)`
  height: 100vh;
`;
const LoadingIndicatorPage = ({
  children = "Loading content.",
  "data-testid": dataTestId = "loader"
}) => {
  return /* @__PURE__ */ jsx(Wrapper, { justifyContent: "space-around", "data-testid": dataTestId, children: /* @__PURE__ */ jsx(Loader, { children }) });
};
const CheckPagePermissions = ({
  permissions = [],
  children
}) => {
  const { allPermissions } = useRBACProvider();
  const toggleNotification = useNotification();
  const { data: canAccess, isLoading } = useQuery$1(
    ["checkPagePermissions", permissions, allPermissions],
    () => hasPermissions(allPermissions, permissions),
    {
      onError: () => {
        toggleNotification({
          type: "warning",
          message: { id: "notification.error" }
        });
      }
    }
  );
  if (isLoading) {
    return /* @__PURE__ */ jsx(LoadingIndicatorPage, {});
  }
  if (canAccess === false) {
    return /* @__PURE__ */ jsx(Redirect, { to: "/" });
  }
  return /* @__PURE__ */ jsx(Fragment, { children });
};
const CheckPermissions = ({ permissions = [], children }) => {
  const { allPermissions } = useRBACProvider();
  const toggleNotification = useNotification();
  const [state, setState] = React.useState({ isLoading: true, canAccess: false });
  const isMounted = React.useRef(true);
  const abortController = new AbortController();
  const { signal } = abortController;
  React.useEffect(() => {
    const checkPermission = async () => {
      try {
        setState({ isLoading: true, canAccess: false });
        const canAccess = await hasPermissions(allPermissions || [], permissions, signal);
        if (isMounted.current) {
          setState({ isLoading: false, canAccess });
        }
      } catch (err) {
        if (isMounted.current) {
          console.error(err);
          toggleNotification?.({
            type: "warning",
            message: { id: "notification.error" }
          });
          setState({ isLoading: false, canAccess: false });
        }
      }
    };
    checkPermission();
    return () => {
      abortController.abort();
    };
  }, [permissions]);
  React.useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  if (state.isLoading) {
    return null;
  }
  if (!state.canAccess) {
    return null;
  }
  return /* @__PURE__ */ jsx(Fragment, { children });
};
const Root$1 = ({
  children,
  iconRightButton,
  isConfirmButtonLoading = false,
  isOpen,
  onConfirm,
  onToggleDialog,
  leftButtonText = {
    id: "app.components.Button.cancel",
    defaultMessage: "Cancel"
  },
  rightButtonText = {
    id: "app.components.Button.confirm",
    defaultMessage: "Confirm"
  },
  title = {
    id: "app.components.ConfirmDialog.title",
    defaultMessage: "Confirmation"
  },
  variantRightButton = "danger-light",
  ...props
}) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(
    Dialog,
    {
      onClose: onToggleDialog,
      title: formatMessage({
        id: title.id,
        defaultMessage: title.defaultMessage
      }),
      isOpen,
      id: "confirmation",
      ...props,
      children: [
        /* @__PURE__ */ jsx(Box, { id: "confirm-description", children }),
        /* @__PURE__ */ jsx(
          Footer,
          {
            iconRightButton,
            isConfirmButtonLoading,
            leftButtonText,
            onConfirm,
            onToggleDialog,
            rightButtonText,
            variantRightButton
          }
        )
      ]
    }
  );
};
const Body$1 = ({ iconBody = /* @__PURE__ */ jsx(ExclamationMarkCircle, {}), children }) => {
  return /* @__PURE__ */ jsx(DialogBody, { icon: iconBody, children: /* @__PURE__ */ jsx(Flex, { direction: "column", alignItems: "stretch", gap: 2, children: /* @__PURE__ */ jsx(Flex, { justifyContent: "center", children }) }) });
};
const Footer = ({
  iconRightButton = /* @__PURE__ */ jsx(Trash, {}),
  isConfirmButtonLoading,
  leftButtonText,
  onConfirm,
  onToggleDialog,
  rightButtonText,
  variantRightButton
}) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(
    DialogFooter,
    {
      startAction: /* @__PURE__ */ jsx(Button, { onClick: onToggleDialog, variant: "tertiary", children: formatMessage({
        id: leftButtonText.id,
        defaultMessage: leftButtonText.defaultMessage
      }) }),
      endAction: /* @__PURE__ */ jsx(
        Button,
        {
          onClick: onConfirm,
          variant: variantRightButton,
          startIcon: iconRightButton,
          id: "confirm-delete",
          loading: isConfirmButtonLoading,
          children: formatMessage({
            id: rightButtonText.id,
            defaultMessage: rightButtonText.defaultMessage
          })
        }
      )
    }
  );
};
const ConfirmDialog = ({
  bodyText = {
    id: "components.popUpWarning.message",
    defaultMessage: "Are you sure you want to delete this?"
  },
  ...props
}) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(Root$1, { ...props, children: /* @__PURE__ */ jsx(Body$1, { children: /* @__PURE__ */ jsx(Typography, { variant: "omega", children: formatMessage({
    id: bodyText.id,
    defaultMessage: bodyText.defaultMessage
  }) }) }) });
};
ConfirmDialog.Root = Root$1;
ConfirmDialog.Body = Body$1;
const IconWrapper = styled(Flex)`
  margin-right: ${({ theme }) => theme.spaces[6]};

  svg {
    width: ${32 / 16}rem;
    height: ${32 / 16}rem;
  }
`;
const TypographyWordBreak = styled(Typography)`
  word-break: break-all;
`;
const ContentBox = ({
  title,
  subtitle,
  icon,
  iconBackground,
  endAction,
  titleEllipsis = false
}) => {
  if (title && title.length > 70 && titleEllipsis) {
    title = `${title.substring(0, 70)}...`;
  }
  return /* @__PURE__ */ jsxs(Flex, { shadow: "tableShadow", hasRadius: true, padding: 6, background: "neutral0", children: [
    /* @__PURE__ */ jsx(IconWrapper, { background: iconBackground, hasRadius: true, padding: 3, children: icon }),
    /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: endAction ? 0 : 1, children: [
      /* @__PURE__ */ jsxs(Flex, { children: [
        /* @__PURE__ */ jsx(TypographyWordBreak, { fontWeight: "semiBold", variant: "pi", children: title }),
        endAction
      ] }),
      /* @__PURE__ */ jsx(Typography, { textColor: "neutral600", children: subtitle })
    ] })
  ] });
};
const PREFIX = "[@strapi/helper-plugin]:";
const once = (fn) => {
  const func = fn;
  let called = false;
  if (typeof func !== "function") {
    throw new TypeError(`${PREFIX} once requires a function parameter`);
  }
  return (...args) => {
    if (!called) {
      func(...args);
      called = true;
    }
  };
};
const warnOnce$1 = once(console.warn);
const DateTimePickerLegacy = (props) => {
  warnOnce$1(
    `
      Deprecation warning: Usage of "DateTimePicker" component from the helper-plugin is deprecated and will be removed in the next major release. Instead, use the DateTimePicker from the Design System: import { DateTimePicker } from '@strapi/design-system';"
    `
  );
  return /* @__PURE__ */ jsx(DateTimePicker, { ...props });
};
const AppInfoContext = React.createContext({});
const AppInfoProvider = ({
  children,
  autoReload,
  communityEdition,
  currentEnvironment,
  dependencies,
  latestStrapiReleaseTag,
  nodeVersion,
  projectId,
  setUserDisplayName,
  shouldUpdateStrapi,
  strapiVersion,
  useYarn,
  userDisplayName,
  userId
}) => {
  const contextValue = React.useMemo(
    () => ({
      autoReload,
      communityEdition,
      currentEnvironment,
      dependencies,
      latestStrapiReleaseTag,
      nodeVersion,
      projectId,
      setUserDisplayName,
      shouldUpdateStrapi,
      strapiVersion,
      useYarn,
      userDisplayName,
      userId
    }),
    [
      autoReload,
      communityEdition,
      currentEnvironment,
      dependencies,
      latestStrapiReleaseTag,
      nodeVersion,
      projectId,
      setUserDisplayName,
      shouldUpdateStrapi,
      strapiVersion,
      useYarn,
      userDisplayName,
      userId
    ]
  );
  return /* @__PURE__ */ jsx(AppInfoContext.Provider, { value: contextValue, children });
};
const useAppInfo = () => React.useContext(AppInfoContext);
/**
 * @preserve
 * @deprecated use useAppInfo instead
 */
const useAppInfos = useAppInfo;
/**
 * @preserve
 * @deprecated use AppInfoProvider instead
 */
const AppInfosProvider = AppInfoProvider;
/**
 * @preserve
 * @deprecated use AppInfoContext instead
 */
const AppInfosContext = AppInfoContext;
const TrackingContext = React.createContext({
  uuid: false
});
const TrackingProvider = ({ value = { uuid: false }, children }) => {
  const memoizedValue = React.useMemo(() => value, [value]);
  return /* @__PURE__ */ jsx(TrackingContext.Provider, { value: memoizedValue, children });
};
const useTracking = () => {
  const { uuid, telemetryProperties, deviceId } = React.useContext(TrackingContext);
  const appInfo = useAppInfo();
  const userId = appInfo?.userId;
  const trackUsage = React.useCallback(
    async (event, properties) => {
      try {
        if (uuid && !window.strapi.telemetryDisabled) {
          const res = await axios.post(
            "https://analytics.strapi.io/api/v2/track",
            {
              event,
              userId,
              deviceId,
              eventProperties: { ...properties },
              userProperties: {},
              groupProperties: {
                ...telemetryProperties,
                projectId: uuid,
                projectType: window.strapi.projectType
              }
            },
            {
              headers: {
                "Content-Type": "application/json",
                "X-Strapi-Event": event
              }
            }
          );
          return res;
        }
      } catch (err) {
      }
      return null;
    },
    [deviceId, telemetryProperties, userId, uuid]
  );
  return { trackUsage };
};
const useQueryParams = (initialParams) => {
  const { search } = useLocation();
  const { push } = useHistory();
  const query = useMemo(() => {
    const searchQuery = search.substring(1);
    if (!search && initialParams) {
      return initialParams;
    }
    return parse(searchQuery);
  }, [search, initialParams]);
  const setQuery = useCallback(
    (nextParams, method = "push") => {
      let nextQuery = { ...query };
      if (method === "remove") {
        Object.keys(nextParams).forEach((key) => {
          if (Object.prototype.hasOwnProperty.call(nextQuery, key)) {
            delete nextQuery[key];
          }
        });
      } else {
        nextQuery = { ...query, ...nextParams };
      }
      push({ search: stringify(nextQuery, { encode: false }) });
    },
    [push, query]
  );
  return [{ query, rawQuery: search }, setQuery];
};
const transientProps = {
  isUp: true
};
const SortIcon = styled(CarretDown).withConfig({
  shouldForwardProp: (prop, defPropValFN) => !transientProps[prop] && defPropValFN(prop)
})`
  transform: ${({ isUp = false }) => `rotate(${isUp ? "180" : "0"}deg)`};
`;
const icons = {
  document: EmptyDocuments,
  media: EmptyPictures,
  permissions: EmptyPermissions
};
const EmptyStateLayout = ({
  action,
  content = {
    id: "app.components.EmptyStateLayout.content-document",
    defaultMessage: "No content found"
  },
  hasRadius = true,
  icon = "document",
  shadow = "tableShadow"
}) => {
  const Icon2 = icons[icon];
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(
    EmptyStateLayout$1,
    {
      action,
      content: formatMessage(
        { id: content.id, defaultMessage: content.defaultMessage },
        content.values
      ),
      hasRadius,
      icon: /* @__PURE__ */ jsx(Icon2, { width: "10rem" }),
      shadow
    }
  );
};
const EmptyBodyTable = ({ colSpan, isLoading = false, ...rest }) => {
  if (isLoading) {
    return /* @__PURE__ */ jsx(Tbody, { children: /* @__PURE__ */ jsx(Tr, { children: /* @__PURE__ */ jsx(Td, { colSpan, children: /* @__PURE__ */ jsx(Flex, { justifyContent: "center", children: /* @__PURE__ */ jsx(Box, { padding: 11, background: "neutral0", children: /* @__PURE__ */ jsx(Loader, { children: "Loading content..." }) }) }) }) }) });
  }
  return /* @__PURE__ */ jsx(Tbody, { children: /* @__PURE__ */ jsx(Tr, { children: /* @__PURE__ */ jsx(Td, { colSpan, children: /* @__PURE__ */ jsx(EmptyStateLayout, { ...rest, hasRadius: false }) }) }) });
};
const Table$1 = ({
  action,
  children,
  contentType,
  components: components2,
  footer,
  headers = [],
  isLoading = false,
  onConfirmDeleteAll,
  onConfirmDelete,
  rows = [],
  withBulkActions = false,
  withMainAction = false,
  renderBulkActionsBar,
  ...rest
}) => {
  const [selectedEntries, setSelectedEntries] = React.useState([]);
  const [showConfirmDeleteAll, setShowConfirmDeleteAll] = React.useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = React.useState(false);
  const [isConfirmButtonLoading, setIsConfirmButtonLoading] = React.useState(false);
  const [{ query }] = useQueryParams();
  const { formatMessage } = useIntl();
  const { trackUsage } = useTracking();
  const ROW_COUNT = rows.length + 1;
  const COL_COUNT = headers.length + (withBulkActions ? 1 : 0) + (withMainAction ? 1 : 0);
  const hasFilters = query?.filters !== void 0;
  const areAllEntriesSelected = selectedEntries.length === rows.length && rows.length > 0;
  const content = hasFilters ? {
    id: "content-manager.components.TableEmpty.withFilters",
    defaultMessage: "There are no {contentType} with the applied filters...",
    values: { contentType }
  } : void 0;
  const handleConfirmDeleteAll = async () => {
    try {
      setIsConfirmButtonLoading(true);
      await onConfirmDeleteAll?.(selectedEntries);
      handleToggleConfirmDeleteAll();
      setSelectedEntries([]);
      setIsConfirmButtonLoading(false);
    } catch (err) {
      setIsConfirmButtonLoading(false);
      handleToggleConfirmDeleteAll();
    }
  };
  const handleConfirmDelete = async () => {
    try {
      setIsConfirmButtonLoading(true);
      await onConfirmDelete?.(selectedEntries[0]);
      handleToggleConfirmDelete();
      setIsConfirmButtonLoading(false);
    } catch (err) {
      setIsConfirmButtonLoading(false);
      handleToggleConfirmDelete();
    }
  };
  const handleSelectAll = () => {
    if (!areAllEntriesSelected) {
      setSelectedEntries(rows.map((row) => row.id));
    } else {
      setSelectedEntries([]);
    }
  };
  const handleToggleConfirmDeleteAll = () => {
    if (!showConfirmDeleteAll) {
      trackUsage("willBulkDeleteEntries");
    }
    setShowConfirmDeleteAll((prev) => !prev);
  };
  const handleToggleConfirmDelete = () => {
    if (showConfirmDelete) {
      setSelectedEntries([]);
    }
    setShowConfirmDelete((prev) => !prev);
  };
  const handleClickDelete = (id) => {
    setSelectedEntries([id]);
    handleToggleConfirmDelete();
  };
  const handleSelectRow = ({ name, value }) => {
    setSelectedEntries((prev) => {
      if (value) {
        return prev.concat(name);
      }
      return prev.filter((id) => id !== name);
    });
  };
  const clearSelectedEntries = () => {
    setSelectedEntries([]);
  };
  const ConfirmDeleteAllComponent = components2?.ConfirmDialogDeleteAll ? components2.ConfirmDialogDeleteAll : ConfirmDialog;
  const ConfirmDeleteComponent = components2?.ConfirmDialogDelete ? components2.ConfirmDialogDelete : ConfirmDialog;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    selectedEntries.length > 0 && /* @__PURE__ */ jsxs(Flex, { gap: 3, children: [
      /* @__PURE__ */ jsx(Typography, { variant: "omega", textColor: "neutral500", children: formatMessage(
        {
          id: "content-manager.components.TableDelete.label",
          defaultMessage: "{number, plural, one {# entry} other {# entries}} selected"
        },
        { number: selectedEntries.length }
      ) }),
      renderBulkActionsBar ? renderBulkActionsBar({ selectedEntries, clearSelectedEntries }) : /* @__PURE__ */ jsx(
        Button,
        {
          onClick: handleToggleConfirmDeleteAll,
          startIcon: /* @__PURE__ */ jsx(Trash, {}),
          size: "L",
          variant: "danger-light",
          children: formatMessage({ id: "global.delete", defaultMessage: "Delete" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Table$2, { colCount: COL_COUNT, rowCount: ROW_COUNT, footer, children: [
      /* @__PURE__ */ jsx(
        TableHead,
        {
          areAllEntriesSelected,
          entriesToDelete: selectedEntries,
          headers,
          onSelectAll: handleSelectAll,
          withMainAction,
          withBulkActions
        }
      ),
      !rows.length || isLoading ? /* @__PURE__ */ jsx(
        EmptyBodyTable,
        {
          colSpan: COL_COUNT,
          content,
          isLoading,
          action
        }
      ) : React.Children.toArray(children).map(
        (child) => React.cloneElement(child, {
          entriesToDelete: selectedEntries,
          onClickDelete: handleClickDelete,
          onSelectRow: handleSelectRow,
          headers,
          rows,
          withBulkActions,
          withMainAction,
          ...rest
        })
      )
    ] }),
    /* @__PURE__ */ jsx(
      ConfirmDeleteAllComponent,
      {
        isConfirmButtonLoading,
        onConfirm: handleConfirmDeleteAll,
        onToggleDialog: handleToggleConfirmDeleteAll,
        isOpen: showConfirmDeleteAll
      }
    ),
    /* @__PURE__ */ jsx(
      ConfirmDeleteComponent,
      {
        isConfirmButtonLoading,
        onConfirm: handleConfirmDelete,
        onToggleDialog: handleToggleConfirmDelete,
        isOpen: showConfirmDelete
      }
    )
  ] });
};
const TableHead = ({
  areAllEntriesSelected = false,
  entriesToDelete = [],
  headers = [],
  onSelectAll,
  withMainAction,
  withBulkActions
}) => {
  const { formatMessage } = useIntl();
  const [{ query }, setQuery] = useQueryParams();
  const sort = query?.sort ?? "";
  const [sortBy, sortOrder] = sort.split(":");
  const isIndeterminate = !areAllEntriesSelected && entriesToDelete.length > 0;
  return /* @__PURE__ */ jsx(Thead, { children: /* @__PURE__ */ jsxs(Tr, { children: [
    withMainAction && /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(
      BaseCheckbox,
      {
        "aria-label": formatMessage({
          id: "global.select-all-entries",
          defaultMessage: "Select all entries"
        }),
        checked: areAllEntriesSelected,
        indeterminate: isIndeterminate,
        onChange: onSelectAll
      }
    ) }),
    headers.map(
      ({ fieldSchema, name, metadatas: { sortable: isSortable, label, mainField } }) => {
        let isSorted = sortBy === name;
        const isUp = sortOrder === "ASC";
        if (fieldSchema?.type === "relation" && mainField) {
          isSorted = sortBy === `${name.split(".")[0]}[${mainField.name}]`;
        }
        const sortLabel = formatMessage(
          { id: "components.TableHeader.sort", defaultMessage: "Sort on {label}" },
          { label }
        );
        const handleClickSort = (shouldAllowClick = true) => {
          if (isSortable && shouldAllowClick) {
            let nextSort = name;
            if (fieldSchema?.type === "relation" && mainField) {
              nextSort = `${name.split(".")[0]}[${mainField.name}]`;
            }
            setQuery({
              sort: `${nextSort}:${isSorted && sortOrder === "ASC" ? "DESC" : "ASC"}`
            });
          }
        };
        return /* @__PURE__ */ jsx(
          Th,
          {
            action: isSorted && /* @__PURE__ */ jsx(
              IconButton,
              {
                label: sortLabel,
                onClick: () => handleClickSort(),
                icon: isSorted && /* @__PURE__ */ jsx(SortIcon, { isUp }),
                noBorder: true
              }
            ),
            children: /* @__PURE__ */ jsx(Tooltip, { label: isSortable ? sortLabel : label, children: /* @__PURE__ */ jsx(
              Typography,
              {
                as: !isSorted && isSortable ? "button" : "span",
                textColor: "neutral600",
                onClick: () => handleClickSort(!isSorted),
                variant: "sigma",
                children: label
              }
            ) })
          },
          name
        );
      }
    ),
    withBulkActions && /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(VisuallyHidden, { children: formatMessage({
      id: "global.actions",
      defaultMessage: "Actions"
    }) }) })
  ] }) });
};
const TableContext = React.createContext(null);
const useTableContext = () => {
  const context = React.useContext(TableContext);
  if (!context) {
    throw new Error("useTableContext must be used within a TableProvider");
  }
  return context;
};
const ActionBar = ({ children }) => {
  const { formatMessage } = useIntl();
  const { selectedEntries } = useTableContext();
  if (selectedEntries.length === 0)
    return null;
  return /* @__PURE__ */ jsxs(Flex, { gap: 2, children: [
    /* @__PURE__ */ jsx(Typography, { variant: "omega", textColor: "neutral500", children: formatMessage(
      {
        id: "content-manager.components.TableDelete.label",
        defaultMessage: "{number, plural, one {# entry} other {# entries}} selected"
      },
      { number: selectedEntries.length }
    ) }),
    children
  ] });
};
const BulkDeleteButton = ({ onConfirmDeleteAll }) => {
  const { selectedEntries, setSelectedEntries } = useTableContext();
  const { formatMessage } = useIntl();
  const [showConfirmDeleteAll, setShowConfirmDeleteAll] = React.useState(false);
  const [isConfirmButtonLoading, setIsConfirmButtonLoading] = React.useState(false);
  const handleConfirmDeleteAll = async () => {
    try {
      setIsConfirmButtonLoading(true);
      await onConfirmDeleteAll(selectedEntries);
      setIsConfirmButtonLoading(false);
      handleToggleConfirmDeleteAll();
      setSelectedEntries([]);
    } catch (err) {
      setIsConfirmButtonLoading(false);
      handleToggleConfirmDeleteAll();
    }
  };
  const handleToggleConfirmDeleteAll = () => {
    setShowConfirmDeleteAll((prev) => !prev);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        onClick: handleToggleConfirmDeleteAll,
        startIcon: /* @__PURE__ */ jsx(Trash, {}),
        size: "L",
        variant: "danger-light",
        children: formatMessage({ id: "global.delete", defaultMessage: "Delete" })
      }
    ),
    /* @__PURE__ */ jsx(
      ConfirmDialog,
      {
        isConfirmButtonLoading,
        onConfirm: handleConfirmDeleteAll,
        onToggleDialog: handleToggleConfirmDeleteAll,
        isOpen: showConfirmDeleteAll
      }
    )
  ] });
};
const Head = ({ children }) => {
  return /* @__PURE__ */ jsx(Thead, { children: /* @__PURE__ */ jsx(Tr, { children }) });
};
const HeaderCheckboxCell = () => {
  const { selectedEntries, setSelectedEntries, rows } = useTableContext();
  const { formatMessage } = useIntl();
  const areAllEntriesSelected = selectedEntries.length === rows.length && rows.length > 0;
  const isIndeterminate = !areAllEntriesSelected && selectedEntries.length > 0;
  const handleSelectAll = () => {
    if (!areAllEntriesSelected) {
      setSelectedEntries(rows.map((row) => row.id));
    } else {
      setSelectedEntries([]);
    }
  };
  if (rows.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(
    BaseCheckbox,
    {
      "aria-label": formatMessage({
        id: "global.select-all-entries",
        defaultMessage: "Select all entries"
      }),
      checked: areAllEntriesSelected,
      indeterminate: isIndeterminate,
      onChange: handleSelectAll
    }
  ) });
};
const HeaderHiddenActionsCell = () => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(VisuallyHidden, { children: formatMessage({
    id: "global.actions",
    defaultMessage: "Actions"
  }) }) });
};
const HeaderCell = ({
  fieldSchemaType,
  name,
  relationFieldName,
  isSortable,
  label
}) => {
  const [{ query }, setQuery] = useQueryParams();
  const sort = typeof query?.sort === "string" ? query.sort : "";
  const [sortBy, sortOrder] = sort.split(":");
  const { formatMessage } = useIntl();
  let isSorted = sortBy === name;
  const isUp = sortOrder === "ASC";
  if (fieldSchemaType === "relation" && relationFieldName) {
    isSorted = sortBy === `${name.split(".")[0]}[${relationFieldName}]`;
  }
  const sortLabel = formatMessage(
    { id: "components.TableHeader.sort", defaultMessage: "Sort on {label}" },
    { label }
  );
  const handleClickSort = (shouldAllowClick = true) => {
    if (isSortable && shouldAllowClick) {
      let nextSort = name;
      if (fieldSchemaType === "relation" && relationFieldName) {
        nextSort = `${name.split(".")[0]}[${relationFieldName}]`;
      }
      setQuery({
        sort: `${nextSort}:${isSorted && sortOrder === "ASC" ? "DESC" : "ASC"}`
      });
    }
  };
  return /* @__PURE__ */ jsx(
    Th,
    {
      action: isSorted && isSortable && /* @__PURE__ */ jsx(
        IconButton,
        {
          label: sortLabel,
          onClick: () => handleClickSort(true),
          icon: /* @__PURE__ */ jsx(SortIcon, { isUp }),
          noBorder: true
        }
      ),
      children: /* @__PURE__ */ jsx(Tooltip, { label: isSortable ? sortLabel : label, children: /* @__PURE__ */ jsx(
        Typography,
        {
          textColor: "neutral600",
          as: !isSorted && isSortable ? "button" : "span",
          onClick: () => handleClickSort(),
          variant: "sigma",
          children: label
        }
      ) })
    },
    name
  );
};
const Root = ({
  children,
  defaultSelectedEntries = [],
  rows = [],
  colCount = 0,
  isLoading = false,
  isFetching = false
}) => {
  const [selectedEntries, setSelectedEntries] = React.useState(defaultSelectedEntries);
  const rowCount = rows.length + 1;
  const onSelectRow = React.useCallback(({ name, value }) => {
    setSelectedEntries((prev) => {
      if (value) {
        return prev.concat(name);
      }
      return prev.filter((id) => id !== name);
    });
  }, []);
  const context = React.useMemo(() => {
    return {
      selectedEntries,
      setSelectedEntries,
      onSelectRow,
      rows,
      isLoading,
      isFetching,
      colCount,
      rowCount
    };
  }, [
    onSelectRow,
    selectedEntries,
    setSelectedEntries,
    rows,
    isLoading,
    isFetching,
    colCount,
    rowCount
  ]);
  return /* @__PURE__ */ jsx(TableContext.Provider, { value: context, children });
};
const EmptyBody = ({ contentType, ...rest }) => {
  const { rows, colCount, isLoading } = useTableContext();
  const [{ query }] = useQueryParams();
  const hasFilters = query?.filters !== void 0;
  const content = hasFilters ? {
    id: "content-manager.components.TableEmpty.withFilters",
    defaultMessage: "There are no {contentType} with the applied filters...",
    values: { contentType }
  } : void 0;
  if (rows?.length > 0 || isLoading) {
    return null;
  }
  return /* @__PURE__ */ jsx(Tbody, { children: /* @__PURE__ */ jsx(Tr, { children: /* @__PURE__ */ jsx(Td, { colSpan: colCount, children: /* @__PURE__ */ jsx(EmptyStateLayout, { ...rest, content, hasRadius: false, shadow: void 0 }) }) }) });
};
const LoadingBody = () => {
  const { isLoading, colCount } = useTableContext();
  if (!isLoading) {
    return null;
  }
  return /* @__PURE__ */ jsx(Tbody, { children: /* @__PURE__ */ jsx(Tr, { children: /* @__PURE__ */ jsx(Td, { colSpan: colCount, children: /* @__PURE__ */ jsx(Flex, { justifyContent: "center", children: /* @__PURE__ */ jsx(Box, { padding: 11, background: "neutral0", children: /* @__PURE__ */ jsx(Loader, { children: "Loading content" }) }) }) }) }) });
};
const Body = ({ children }) => {
  const { rows, isLoading } = useTableContext();
  if (isLoading || rows.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsx(Tbody, { children });
};
const Content = ({ children, footer }) => {
  const { rowCount, colCount } = useTableContext();
  return /* @__PURE__ */ jsx(Table$2, { rowCount, colCount, footer, children });
};
const Table = {
  Content,
  Root,
  Body,
  ActionBar,
  Head,
  HeaderCell,
  HeaderHiddenActionsCell,
  HeaderCheckboxCell,
  LoadingBody,
  EmptyBody,
  BulkDeleteButton
};
const FilterListURLQuery = ({ filtersSchema = [] }) => {
  const [{ query }, setQuery] = useQueryParams();
  const handleClick = (filter) => {
    const nextFilters = (query?.filters?.$and || []).filter((prevFilter) => {
      const name = Object.keys(filter)[0];
      const filterType = Object.keys(filter[name])[0];
      const value = filter[name][filterType];
      return prevFilter[name]?.[filterType] !== value;
    });
    setQuery({ filters: { $and: nextFilters }, page: 1 });
  };
  if (!query?.filters?.$and?.length) {
    return null;
  }
  return /* @__PURE__ */ jsx(Fragment, { children: query?.filters?.$and?.map((filter, i) => {
    const attributeName = Object.keys(filter)[0];
    const attribute = filtersSchema.find(({ name }) => name === attributeName);
    if (!attribute) {
      return null;
    }
    if (attribute.fieldSchema.type === "relation") {
      const relationTargetAttribute = attribute?.fieldSchema?.mainField?.name;
      const filterObj = filter[attributeName][relationTargetAttribute];
      if (typeof filterObj === "object" && filterObj !== null) {
        const operator = Object.keys(filterObj)[0];
        const value = filterObj[operator] ?? "";
        return /* @__PURE__ */ jsx(
          AttributeTag,
          {
            attribute,
            filter,
            onClick: handleClick,
            operator,
            value
          },
          `${attributeName}-${i}`
        );
      }
      return null;
    } else {
      const filterObj = filter[attributeName];
      const operator = Object.keys(filterObj)[0];
      const value = filterObj[operator];
      if (typeof value === "string" || value === null) {
        return /* @__PURE__ */ jsx(
          AttributeTag,
          {
            attribute,
            filter,
            onClick: handleClick,
            operator,
            value: value ?? ""
          },
          `${attributeName}-${i}`
        );
      }
      return null;
    }
  }) });
};
const AttributeTag = ({ attribute, filter, onClick, operator, value }) => {
  const { formatMessage, formatDate, formatTime, formatNumber } = useIntl();
  const handleClick = () => {
    onClick(filter);
  };
  const { fieldSchema } = attribute;
  const type = fieldSchema.type === "relation" ? fieldSchema?.mainField?.type : fieldSchema.type;
  let formattedValue = value;
  switch (type) {
    case "date":
      formattedValue = formatDate(value, { dateStyle: "full" });
      break;
    case "datetime":
      formattedValue = formatDate(value, { dateStyle: "full", timeStyle: "short" });
      break;
    case "time":
      const [hour, minute] = value.split(":");
      const date = /* @__PURE__ */ new Date();
      date.setHours(Number(hour));
      date.setMinutes(Number(minute));
      formattedValue = formatTime(date, {
        hour: "numeric",
        minute: "numeric"
      });
      break;
    case "float":
    case "integer":
    case "biginteger":
    case "decimal":
      formattedValue = formatNumber(Number(value));
      break;
  }
  if (attribute.metadatas.customInput) {
    if (attribute.metadatas.options) {
      const selectedOption = attribute.metadatas.options.find((option) => {
        return option.customValue === value;
      });
      formattedValue = selectedOption?.label || value;
    }
  }
  const content = `${attribute.metadatas.label || attribute.name} ${formatMessage({
    id: `components.FilterOptions.FILTER_TYPES.${operator}`,
    defaultMessage: operator
  })} ${operator !== "$null" && operator !== "$notNull" ? formattedValue : ""}`;
  return /* @__PURE__ */ jsx(Box, { padding: 1, children: /* @__PURE__ */ jsx(Tag, { onClick: handleClick, icon: /* @__PURE__ */ jsx(Cross, {}), children: content }) });
};
const FilterPopoverURLQuery = ({
  displayedFilters,
  isVisible,
  onBlur,
  onToggle,
  source
}) => {
  const [{ query }, setQuery] = useQueryParams();
  const { formatMessage } = useIntl();
  const { trackUsage } = useTracking();
  const defaultFieldSchema = { fieldSchema: { type: "string" } };
  const [modifiedData, setModifiedData] = React.useState({
    name: displayedFilters[0]?.name || "",
    filter: getFilterList((displayedFilters[0] || defaultFieldSchema).fieldSchema)[0].value,
    value: ""
  });
  if (!isVisible) {
    return null;
  }
  if (displayedFilters.length === 0) {
    return null;
  }
  const handleChangeFilterField = (value) => {
    const nextField = displayedFilters.find((f) => f.name === value);
    if (!nextField)
      return;
    const {
      fieldSchema: { type, options }
    } = nextField;
    let filterValue = "";
    if (type === "boolean") {
      filterValue = "true";
    }
    if (type === "enumeration" && Array.isArray(options)) {
      filterValue = options[0];
    }
    const filter = getFilterList(nextField.fieldSchema)[0].value;
    setModifiedData({ name: value, filter, value: filterValue });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const hasFilter = query?.filters?.$and.find((filter) => {
      return filter[modifiedData.name] && filter[modifiedData.name]?.[modifiedData.filter] === modifiedData.value;
    }) !== void 0;
    if (modifiedData.value && !hasFilter) {
      const foundAttribute = displayedFilters.find(({ name }) => name === modifiedData.name);
      if (foundAttribute) {
        if (foundAttribute.trackedEvent) {
          trackUsage(foundAttribute.trackedEvent.name, foundAttribute.trackedEvent.properties);
        }
        let filterToAdd;
        if (foundAttribute.fieldSchema.type === "relation" && foundAttribute.fieldSchema.mainField) {
          filterToAdd = {
            [modifiedData.name]: {
              [foundAttribute.fieldSchema.mainField.name]: {
                [modifiedData.filter]: modifiedData.value
              }
            }
          };
        } else {
          filterToAdd = {
            [modifiedData.name]: { [modifiedData.filter]: modifiedData.value }
          };
        }
        const filters = [...query?.filters?.$and || [], filterToAdd];
        setQuery({ filters: { $and: filters }, page: 1 });
      }
    }
    onToggle();
  };
  const handleChangeOperator = (operator2) => {
    if (operator2 === "$null" || operator2 === "$notNull") {
      setModifiedData((prev) => ({
        ...prev,
        value: "true",
        filter: operator2
      }));
      return;
    }
    setModifiedData((prev) => ({ ...prev, filter: operator2, value: "" }));
  };
  const appliedFilter = displayedFilters.find((filter) => filter.name === modifiedData.name);
  const operator = modifiedData.filter;
  const filterList = appliedFilter.metadatas.customOperators || getFilterList(appliedFilter.fieldSchema);
  const Inputs = appliedFilter.metadatas.customInput || DefaultInputs;
  return /* @__PURE__ */ jsx(Popover, { source, onDismiss: onToggle, padding: 3, spacing: 4, onBlur, children: /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 1, style: { minWidth: 184 }, children: [
    /* @__PURE__ */ jsxs(SelectContainers, { direction: "column", alignItems: "stretch", gap: 1, children: [
      /* @__PURE__ */ jsx(
        SingleSelect,
        {
          label: formatMessage({
            id: "app.utils.select-field",
            defaultMessage: "Select field"
          }),
          name: "name",
          size: "M",
          onChange: handleChangeFilterField,
          value: modifiedData.name,
          children: displayedFilters.map((filter) => {
            return /* @__PURE__ */ jsx(SingleSelectOption, { value: filter.name, children: filter.metadatas.label }, filter.name);
          })
        }
      ),
      /* @__PURE__ */ jsx(
        SingleSelect,
        {
          label: formatMessage({
            id: "app.utils.select-filter",
            defaultMessage: "Select filter"
          }),
          name: "filter",
          size: "M",
          value: modifiedData.filter,
          onChange: (value) => (
            // TODO: we should do an assertion function to ensure the value is a valid operator
            handleChangeOperator(value)
          ),
          children: filterList.map((option) => {
            return /* @__PURE__ */ jsx(SingleSelectOption, { value: option.value, children: formatMessage(option.intlLabel) }, option.value);
          })
        }
      )
    ] }),
    operator !== "$null" && operator !== "$notNull" && /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(
      Inputs,
      {
        label: appliedFilter.metadatas.label,
        type: appliedFilter.fieldSchema.type,
        options: appliedFilter.fieldSchema.options ?? appliedFilter.metadatas.options,
        value: modifiedData.value,
        onChange: (value) => setModifiedData((prev) => ({ ...prev, value }))
      }
    ) }),
    /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(Button, { size: "L", variant: "secondary", startIcon: /* @__PURE__ */ jsx(Plus, {}), type: "submit", fullWidth: true, children: formatMessage({ id: "app.utils.add-filter", defaultMessage: "Add filter" }) }) })
  ] }) }) });
};
const SelectContainers = styled(Flex)`
  /* Hide the label, every input needs a label. */
  label {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
`;
const DefaultInputs = ({
  label = "",
  onChange,
  type,
  value = "",
  ...restProps
}) => {
  const { formatMessage } = useIntl();
  if (type === "boolean") {
    return /* @__PURE__ */ jsxs(SingleSelect, { "aria-label": label, onChange: (value2) => onChange(String(value2)), value, children: [
      /* @__PURE__ */ jsx(SingleSelectOption, { value: "true", children: "true" }),
      /* @__PURE__ */ jsx(SingleSelectOption, { value: "false", children: "false" })
    ] });
  }
  if (type === "date") {
    return (
      // @ts-expect-error – in V2 of the DS we won't pass label because this will become input only & a label breaks the design
      /* @__PURE__ */ jsx(
        DatePicker,
        {
          clearLabel: formatMessage({ id: "clearLabel", defaultMessage: "Clear" }),
          ariaLabel: label,
          name: "datepicker",
          onChange: (date) => onChange(date ? formatISO(date, { representation: "date" }) : null),
          onClear: () => onChange(null),
          selectedDate: value ? new Date(value) : void 0
        }
      )
    );
  }
  if (type === "datetime") {
    return (
      // @ts-expect-error – in V2 of the DS we won't pass label because this will become input only & a label breaks the design
      /* @__PURE__ */ jsx(
        DateTimePicker,
        {
          clearLabel: formatMessage({ id: "clearLabel", defaultMessage: "Clear" }),
          ariaLabel: label,
          name: "datetimepicker",
          onChange: (date) => onChange(date ? date.toISOString() : null),
          onClear: () => onChange(null),
          value: value ? new Date(value) : void 0
        }
      )
    );
  }
  if (type === "enumeration") {
    const options = restProps.options ?? [];
    return (
      // @ts-expect-error from the DS V2 this won't be needed because we're only returning strings.
      /* @__PURE__ */ jsx(SingleSelect, { "aria-label": label, onChange, value, children: options.map((optionValue) => {
        return /* @__PURE__ */ jsx(SingleSelectOption, { value: optionValue, children: optionValue }, optionValue);
      }) })
    );
  }
  if (["float", "integer", "biginteger", "decimal"].includes(type)) {
    return /* @__PURE__ */ jsx(
      NumberInput,
      {
        "aria-label": label,
        name: "filter-value",
        onValueChange: (value2) => onChange(value2 ? String(value2) : null),
        value: value || 0
      }
    );
  }
  if (type === "time") {
    return (
      // @ts-expect-error – in V2 of the DS we won't pass label because this will become input only & a label breaks the design
      /* @__PURE__ */ jsx(
        TimePicker,
        {
          "aria-label": label,
          onClear: () => onChange(""),
          onChange: (value2) => onChange(value2 ? value2 : null),
          value: value ?? void 0,
          clearLabel: "Clear the selected time picker value"
        }
      )
    );
  }
  return /* @__PURE__ */ jsx(Field, { children: /* @__PURE__ */ jsx(
    FieldInput,
    {
      "aria-label": formatMessage({ id: "app.utils.filter-value", defaultMessage: "Filter value" }),
      onChange: ({ target: { value: value2 } }) => onChange(value2),
      value: value ?? void 0,
      size: "M"
    }
  ) });
};
const getFilterList = (filterSchema) => {
  let type = filterSchema.type;
  if (filterSchema.type === "relation" && filterSchema?.mainField?.type) {
    type = filterSchema.mainField.type;
  }
  switch (type) {
    case "email":
    case "text":
    case "enumeration":
    case "string": {
      return [
        {
          intlLabel: { id: "components.FilterOptions.FILTER_TYPES.$eq", defaultMessage: "is" },
          value: "$eq"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$eqi",
            defaultMessage: "is (case insensitive)"
          },
          value: "$eqi"
        },
        {
          intlLabel: { id: "components.FilterOptions.FILTER_TYPES.$ne", defaultMessage: "is not" },
          value: "$ne"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$nei",
            defaultMessage: "is not (case insensitive)"
          },
          value: "$nei"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$null",
            defaultMessage: "is null"
          },
          value: "$null"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$notNull",
            defaultMessage: "is not null"
          },
          value: "$notNull"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$contains",
            defaultMessage: "contains"
          },
          value: "$contains"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$containsi",
            defaultMessage: "contains (case insensitive)"
          },
          value: "$containsi"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$notContains",
            defaultMessage: "not contains"
          },
          value: "$notContains"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$notContainsi",
            defaultMessage: "not contains (case insensitive)"
          },
          value: "$notContainsi"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$startsWith",
            defaultMessage: "starts with"
          },
          value: "$startsWith"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$startsWithi",
            defaultMessage: "starts with (case insensitive)"
          },
          value: "$startsWithi"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$endsWith",
            defaultMessage: "ends with"
          },
          value: "$endsWith"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$endsWithi",
            defaultMessage: "ends with (case insensitive)"
          },
          value: "$endsWithi"
        }
      ];
    }
    case "float":
    case "integer":
    case "biginteger":
    case "decimal": {
      return [
        {
          intlLabel: { id: "components.FilterOptions.FILTER_TYPES.$eq", defaultMessage: "is" },
          value: "$eq"
        },
        {
          intlLabel: { id: "components.FilterOptions.FILTER_TYPES.$ne", defaultMessage: "is not" },
          value: "$ne"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$null",
            defaultMessage: "is null"
          },
          value: "$null"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$notNull",
            defaultMessage: "is not null"
          },
          value: "$notNull"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$gt",
            defaultMessage: "is greater than"
          },
          value: "$gt"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$gte",
            defaultMessage: "is greater than or equal to"
          },
          value: "$gte"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$lt",
            defaultMessage: "is less than"
          },
          value: "$lt"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$lte",
            defaultMessage: "is less than or equal to"
          },
          value: "$lte"
        }
      ];
    }
    case "time":
    case "date": {
      return [
        {
          intlLabel: { id: "components.FilterOptions.FILTER_TYPES.$eq", defaultMessage: "is" },
          value: "$eq"
        },
        {
          intlLabel: { id: "components.FilterOptions.FILTER_TYPES.$ne", defaultMessage: "is not" },
          value: "$ne"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$null",
            defaultMessage: "is null"
          },
          value: "$null"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$notNull",
            defaultMessage: "is not null"
          },
          value: "$notNull"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$contains",
            defaultMessage: "contains (sensitive)"
          },
          value: "$contains"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$notContains",
            defaultMessage: "not contains (sensitive)"
          },
          value: "$notContains"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$gt",
            defaultMessage: "is greater than"
          },
          value: "$gt"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$gte",
            defaultMessage: "is greater than or equal to"
          },
          value: "$gte"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$lt",
            defaultMessage: "is less than"
          },
          value: "$lt"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$lte",
            defaultMessage: "is less than or equal to"
          },
          value: "$lte"
        }
      ];
    }
    case "datetime": {
      return [
        {
          intlLabel: { id: "components.FilterOptions.FILTER_TYPES.$eq", defaultMessage: "is" },
          value: "$eq"
        },
        {
          intlLabel: { id: "components.FilterOptions.FILTER_TYPES.$ne", defaultMessage: "is not" },
          value: "$ne"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$null",
            defaultMessage: "is null"
          },
          value: "$null"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$notNull",
            defaultMessage: "is not null"
          },
          value: "$notNull"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$gt",
            defaultMessage: "is greater than"
          },
          value: "$gt"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$gte",
            defaultMessage: "is greater than or equal to"
          },
          value: "$gte"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$lt",
            defaultMessage: "is less than"
          },
          value: "$lt"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$lte",
            defaultMessage: "is less than or equal to"
          },
          value: "$lte"
        }
      ];
    }
    default:
      return [
        {
          intlLabel: { id: "components.FilterOptions.FILTER_TYPES.$eq", defaultMessage: "is" },
          value: "$eq"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$eqi",
            defaultMessage: "is (case insensitive)"
          },
          value: "$eqi"
        },
        {
          intlLabel: { id: "components.FilterOptions.FILTER_TYPES.$ne", defaultMessage: "is not" },
          value: "$ne"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$null",
            defaultMessage: "is null"
          },
          value: "$null"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$notNull",
            defaultMessage: "is not null"
          },
          value: "$notNull"
        }
      ];
  }
};
const Form = ({ ...props }) => {
  const formRef = React.useRef(null);
  const { isSubmitting, isValidating, errors, touched } = useFormikContext();
  React.useEffect(() => {
    if (isSubmitting && !isValidating) {
      const errorsInForm = formRef.current.querySelectorAll("[data-strapi-field-error]");
      if (errorsInForm && errorsInForm.length > 0) {
        const firstError = errorsInForm[0];
        const describingId = firstError.getAttribute("id");
        const formElementInError = formRef.current.querySelector(
          `[aria-describedby="${describingId}"]`
        );
        if (formElementInError && formElementInError instanceof HTMLElement) {
          formElementInError.focus();
        }
      }
    }
    if (!isSubmitting && !isValidating && Object.keys(errors).length) {
      const el = document.getElementById("global-form-error");
      if (el) {
        el.focus();
      }
    }
  }, [errors, isSubmitting, isValidating, touched]);
  return /* @__PURE__ */ jsx(Form$1, { ref: formRef, ...props, noValidate: true });
};
const useFieldHint = ({ description, fieldSchema, type }) => {
  const { formatMessage } = useIntl();
  const buildDescription = () => description?.id ? formatMessage(
    { id: description.id, defaultMessage: description.defaultMessage },
    { ...description.values }
  ) : "";
  const buildHint = () => {
    const { maximum, minimum } = getMinMax(fieldSchema);
    const units = getFieldUnits({
      type,
      minimum,
      maximum
    });
    const minIsNumber = typeof minimum === "number";
    const maxIsNumber = typeof maximum === "number";
    const hasMinAndMax = maxIsNumber && minIsNumber;
    const hasMinOrMax = maxIsNumber || minIsNumber;
    if (!description?.id && !hasMinOrMax) {
      return "";
    }
    return formatMessage(
      {
        id: "content-manager.form.Input.hint.text",
        defaultMessage: "{min, select, undefined {} other {min. {min}}}{divider}{max, select, undefined {} other {max. {max}}}{unit}{br}{description}"
      },
      {
        min: minimum,
        max: maximum,
        description: buildDescription(),
        unit: units?.message && hasMinOrMax ? formatMessage(units.message, units.values) : null,
        divider: hasMinAndMax ? formatMessage({
          id: "content-manager.form.Input.hint.minMaxDivider",
          defaultMessage: " / "
        }) : null,
        br: hasMinOrMax ? /* @__PURE__ */ jsx("br", {}) : null
      }
    );
  };
  return { hint: buildHint() };
};
const getFieldUnits = ({
  type,
  minimum,
  maximum
}) => {
  if (type && ["biginteger", "integer", "number"].includes(type)) {
    return {};
  }
  const maxValue = Math.max(minimum || 0, maximum || 0);
  return {
    message: {
      id: "content-manager.form.Input.hint.character.unit",
      defaultMessage: "{maxValue, plural, one { character} other { characters}}"
    },
    values: {
      maxValue
    }
  };
};
const getMinMax = (fieldSchema) => {
  if (!fieldSchema) {
    return { maximum: void 0, minimum: void 0 };
  }
  const { minLength, maxLength, max, min } = fieldSchema;
  let minimum;
  let maximum;
  const parsedMin = Number(min);
  const parsedMinLength = Number(minLength);
  if (!Number.isNaN(parsedMin)) {
    minimum = parsedMin;
  } else if (!Number.isNaN(parsedMinLength)) {
    minimum = parsedMinLength;
  }
  const parsedMax = Number(max);
  const parsedMaxLength = Number(maxLength);
  if (!Number.isNaN(parsedMax)) {
    maximum = parsedMax;
  } else if (!Number.isNaN(parsedMaxLength)) {
    maximum = parsedMaxLength;
  }
  return { maximum, minimum };
};
const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};
const useFocusInputField = (name) => {
  const search = useQuery();
  const [field, setField] = useState(null);
  useEffect(() => {
    if (search.has("field") && search.get("field") === name && field) {
      if ("input" in field) {
        field.input.current.focus();
        field.input.current.scrollIntoView({
          block: "center"
        });
      } else {
        field.focus();
        field.scrollIntoView({
          block: "center"
        });
      }
    }
  }, [search, name, field]);
  return setField;
};
const pxToRem = (px) => `${px / 16}rem`;
const GenericInput = ({
  autoComplete,
  customInputs,
  description,
  disabled,
  intlLabel,
  labelAction,
  error,
  name,
  onChange,
  options = [],
  placeholder,
  required,
  step,
  type,
  value: defaultValue,
  isNullable,
  attribute,
  ...rest
}) => {
  const { formatMessage } = useIntl();
  const getFieldHintValue = (attribute2, key) => {
    if (!attribute2)
      return;
    if (key === "minLength" && key in attribute2) {
      return attribute2[key];
    }
    if (key === "maxLength" && key in attribute2) {
      return attribute2[key];
    }
    if (key === "max" && key in attribute2) {
      return attribute2[key];
    }
    if (key === "min" && key in attribute2) {
      return attribute2[key];
    }
  };
  const { hint } = useFieldHint({
    description,
    fieldSchema: {
      minLength: getFieldHintValue(attribute, "minLength"),
      maxLength: getFieldHintValue(attribute, "maxLength"),
      max: getFieldHintValue(attribute, "max"),
      min: getFieldHintValue(attribute, "min")
    },
    type: attribute?.type || type
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const fieldRef = useFocusInputField(name);
  const CustomInput = customInputs ? customInputs[type] : null;
  const value = defaultValue ?? void 0;
  const valueWithEmptyStringFallback = value ?? "";
  function getErrorMessage(error2) {
    if (!error2) {
      return null;
    }
    if (typeof error2 === "string") {
      return formatMessage({ id: error2, defaultMessage: error2 });
    }
    const values = {
      ...error2.values
    };
    return formatMessage(
      {
        id: error2.id,
        defaultMessage: error2?.defaultMessage ?? error2.id
      },
      values
    );
  }
  const errorMessage = getErrorMessage(error) ?? void 0;
  if (CustomInput) {
    return /* @__PURE__ */ jsx(
      CustomInput,
      {
        ...rest,
        ref: fieldRef,
        attribute,
        description,
        hint,
        disabled,
        intlLabel,
        labelAction,
        error: errorMessage || "",
        name,
        onChange,
        options,
        required,
        placeholder,
        type,
        value
      }
    );
  }
  const label = intlLabel.id ? formatMessage(
    { id: intlLabel.id, defaultMessage: intlLabel.defaultMessage },
    { ...intlLabel.values }
  ) : name;
  const formattedPlaceholder = placeholder ? formatMessage(
    { id: placeholder.id, defaultMessage: placeholder.defaultMessage },
    { ...placeholder.values }
  ) : "";
  switch (type) {
    case "json": {
      return /* @__PURE__ */ jsx(
        JSONInput,
        {
          ref: fieldRef,
          label,
          labelAction,
          value,
          error: errorMessage,
          disabled,
          hint,
          required,
          onChange: (json) => {
            const value2 = attribute && "required" in attribute && !attribute?.required && !json.length ? null : json;
            onChange({ target: { name, value: value2 } }, false);
          },
          minHeight: pxToRem(252),
          maxHeight: pxToRem(504)
        }
      );
    }
    case "bool": {
      return /* @__PURE__ */ jsx(
        ToggleInput,
        {
          ref: fieldRef,
          checked: defaultValue === null ? null : defaultValue || false,
          disabled,
          hint,
          label,
          error: errorMessage,
          labelAction,
          name,
          offLabel: formatMessage({
            id: "app.components.ToggleCheckbox.off-label",
            defaultMessage: "False"
          }),
          onLabel: formatMessage({
            id: "app.components.ToggleCheckbox.on-label",
            defaultMessage: "True"
          }),
          onChange: (e) => {
            onChange({ target: { name, value: e.target.checked } });
          },
          required,
          onClear: () => {
            onChange({ target: { name, value: null } });
          },
          clearLabel: isNullable ? formatMessage({
            id: "app.components.ToggleCheckbox.clear-label",
            defaultMessage: "Clear"
          }) : void 0
        }
      );
    }
    case "checkbox": {
      return /* @__PURE__ */ jsx(
        Checkbox,
        {
          ref: fieldRef,
          disabled,
          error: errorMessage,
          hint,
          id: name,
          name,
          onValueChange: (value2) => {
            onChange({ target: { name, value: value2 } });
          },
          required,
          value: Boolean(value),
          children: label
        }
      );
    }
    case "datetime": {
      return /* @__PURE__ */ jsx(
        DateTimePicker,
        {
          ref: fieldRef,
          clearLabel: formatMessage({ id: "clearLabel", defaultMessage: "Clear" }),
          disabled,
          error: errorMessage,
          label,
          labelAction,
          id: name,
          hint,
          name,
          onChange: (date) => {
            const formattedDate = date ? date.toISOString() : null;
            onChange({ target: { name, value: formattedDate, type } });
          },
          onClear: () => onChange({ target: { name, value: null, type } }),
          placeholder: formattedPlaceholder,
          required,
          value
        }
      );
    }
    case "date": {
      return /* @__PURE__ */ jsx(
        DatePicker,
        {
          ref: fieldRef,
          clearLabel: formatMessage({ id: "clearLabel", defaultMessage: "Clear" }),
          disabled,
          error: errorMessage,
          label,
          id: name,
          hint,
          name,
          onChange: (date) => {
            onChange({
              target: {
                name,
                value: date ? formatISO(date, { representation: "date" }) : null,
                type
              }
            });
          },
          onClear: () => onChange({ target: { name, value: null, type } }),
          placeholder: formattedPlaceholder,
          required,
          selectedDate: value
        }
      );
    }
    case "number": {
      return /* @__PURE__ */ jsx(
        NumberInput,
        {
          ref: fieldRef,
          disabled,
          error: errorMessage,
          label,
          labelAction,
          id: name,
          hint,
          name,
          onValueChange: (value2) => {
            onChange({ target: { name, value: value2, type } });
          },
          placeholder: formattedPlaceholder,
          required,
          step,
          value
        }
      );
    }
    case "email": {
      return /* @__PURE__ */ jsx(
        TextInput,
        {
          ref: fieldRef,
          autoComplete,
          disabled,
          error: errorMessage,
          label,
          labelAction,
          id: name,
          hint,
          name,
          onChange: (e) => {
            onChange({ target: { name, value: e.target.value, type } });
          },
          placeholder: formattedPlaceholder,
          required,
          type: "email",
          value: valueWithEmptyStringFallback
        }
      );
    }
    case "timestamp":
    case "text":
    case "string": {
      return /* @__PURE__ */ jsx(
        TextInput,
        {
          ref: fieldRef,
          autoComplete,
          disabled,
          error: errorMessage,
          label,
          labelAction,
          id: name,
          hint,
          name,
          onChange: (e) => {
            onChange({ target: { name, value: e.target.value, type } });
          },
          placeholder: formattedPlaceholder,
          required,
          type: "text",
          value: valueWithEmptyStringFallback
        }
      );
    }
    case "password": {
      return /* @__PURE__ */ jsx(
        TextInput,
        {
          ref: fieldRef,
          autoComplete,
          disabled,
          error: errorMessage,
          endAction: /* @__PURE__ */ jsx(
            "button",
            {
              "aria-label": formatMessage({
                id: "Auth.form.password.show-password",
                defaultMessage: "Show password"
              }),
              onClick: () => {
                setShowPassword((prev) => !prev);
              },
              style: {
                border: "none",
                padding: 0,
                background: "transparent"
              },
              type: "button",
              children: showPassword ? /* @__PURE__ */ jsx(Icon, { as: Eye, color: "neutral500" }) : /* @__PURE__ */ jsx(Icon, { as: EyeStriked, color: "neutral500" })
            }
          ),
          label,
          labelAction,
          id: name,
          hint,
          name,
          onChange: (e) => {
            onChange({ target: { name, value: e.target.value, type } });
          },
          placeholder: formattedPlaceholder,
          required,
          type: showPassword ? "text" : "password",
          value: valueWithEmptyStringFallback
        }
      );
    }
    case "select": {
      return /* @__PURE__ */ jsx(
        SingleSelect,
        {
          ref: fieldRef,
          disabled,
          error: errorMessage,
          label,
          labelAction,
          id: name,
          hint,
          name,
          onChange: (value2) => {
            onChange({ target: { name, value: value2, type: "select" } });
          },
          placeholder: formattedPlaceholder,
          required,
          value,
          children: options.map(({ metadatas: { intlLabel: intlLabel2, disabled: disabled2, hidden }, key, value: value2 }) => {
            return /* @__PURE__ */ jsx(SingleSelectOption, { value: value2, disabled: disabled2, hidden, children: formatMessage(intlLabel2) }, key);
          })
        }
      );
    }
    case "textarea": {
      return /* @__PURE__ */ jsx(
        Textarea,
        {
          ref: fieldRef,
          disabled,
          error: errorMessage,
          label,
          labelAction,
          id: name,
          hint,
          name,
          onChange: (event) => onChange({ target: { name, value: event.target.value, type } }),
          required,
          placeholder: formattedPlaceholder,
          value: valueWithEmptyStringFallback
        }
      );
    }
    case "time": {
      let time = value;
      if (typeof value === "string" && value.split(":").length > 2) {
        const [hour, minute] = value.split(":");
        time = `${hour}:${minute}`;
      }
      return /* @__PURE__ */ jsx(
        TimePicker,
        {
          ref: fieldRef,
          clearLabel: formatMessage({ id: "clearLabel", defaultMessage: "Clear" }),
          disabled,
          error: errorMessage,
          label,
          labelAction,
          id: name,
          hint,
          name,
          onChange: (time2) => {
            onChange({ target: { name, value: `${time2}`, type } });
          },
          onClear: () => {
            onChange({ target: { name, value: null, type } });
          },
          required,
          value: time
        }
      );
    }
    default: {
      return /* @__PURE__ */ jsx(
        TextInput,
        {
          disabled: true,
          error: errorMessage,
          label,
          labelAction,
          id: name,
          hint,
          name,
          placeholder: "Not supported",
          required,
          type: "text",
          value: ""
        }
      );
    }
  }
};
const MemoizedGenericInput = React.memo(GenericInput, isEqual);
const StrapiAppContext = React.createContext({
  getPlugin: () => void 0,
  getAdminInjectedComponents: () => [],
  menu: [],
  plugins: {},
  settings: {},
  // These functions are required but should not resolve to undefined as they do here
  runHookParallel: () => Promise.resolve(),
  runHookWaterfall: () => Promise.resolve(),
  // @ts-expect-error – TODO: fix this.
  runHookSeries: () => Promise.resolve()
});
const StrapiAppProvider = ({
  children,
  getPlugin,
  getAdminInjectedComponents,
  menu,
  plugins,
  runHookParallel,
  runHookSeries,
  runHookWaterfall,
  settings
}) => {
  const contextValue = React.useMemo(
    () => ({
      getPlugin,
      getAdminInjectedComponents,
      menu,
      plugins,
      runHookParallel,
      runHookSeries,
      runHookWaterfall,
      settings
    }),
    [
      getPlugin,
      getAdminInjectedComponents,
      menu,
      plugins,
      runHookParallel,
      runHookSeries,
      runHookWaterfall,
      settings
    ]
  );
  return /* @__PURE__ */ jsx(StrapiAppContext.Provider, { value: contextValue, children });
};
const useStrapiApp = () => React.useContext(StrapiAppContext);
const InjectionZone = ({
  area,
  ...props
}) => {
  const { getPlugin } = useStrapiApp();
  const [pluginName, page, position] = area.split(".");
  const plugin = getPlugin(pluginName);
  if (!plugin) {
    return null;
  }
  const components2 = plugin.getInjectedComponents(page, position);
  if (!components2) {
    return null;
  }
  return components2.map(({ name, Component }) => /* @__PURE__ */ jsx(Component, { ...props }, name));
};
/**
 * @preserve
 *
 * @deprecated Use @strapi/design-system LinkButton instead.
 */
const Link = (props) => /* @__PURE__ */ jsx(Link$1, { ...props, as: NavLink });
/**
 * @preserve
 *
 * @deprecated Use @strapi/design-system LinkButton instead.
 */
const LinkButton = (props) => /* @__PURE__ */ jsx(LinkButton$1, { ...props, as: NavLink });
const NoContent = ({
  content = {
    id: "app.components.EmptyStateLayout.content-document",
    defaultMessage: "No content found",
    values: {}
  },
  ...rest
}) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(
    EmptyStateLayout$1,
    {
      ...rest,
      icon: /* @__PURE__ */ jsx(EmptyDocuments, { width: "10rem" }),
      content: formatMessage(
        { id: content.id, defaultMessage: content.defaultMessage },
        content.values
      )
    }
  );
};
const NoMedia = (props) => {
  return /* @__PURE__ */ jsx(EmptyStateLayout$1, { ...props, icon: /* @__PURE__ */ jsx(EmptyPictures, { width: "10rem" }) });
};
const NoPermissions = ({ action }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(
    EmptyStateLayout$1,
    {
      icon: /* @__PURE__ */ jsx(EmptyPermissions, { width: "10rem" }),
      content: formatMessage({
        id: "app.components.EmptyStateLayout.content-permissions",
        defaultMessage: "You don't have the permissions to access that content"
      }),
      action
    }
  );
};
const NotAllowedInput = ({
  description,
  error,
  intlLabel,
  labelAction,
  name = ""
}) => {
  const { formatMessage } = useIntl();
  const label = intlLabel?.id ? formatMessage(
    { id: intlLabel.id, defaultMessage: intlLabel.defaultMessage },
    { ...intlLabel.values }
  ) : name;
  const hint = description?.id ? formatMessage(
    { id: description.id, defaultMessage: description.defaultMessage },
    { ...description.values }
  ) : "";
  const placeholder = formatMessage({
    id: "components.NotAllowedInput.text",
    defaultMessage: "No permissions to see this field"
  });
  const errorMessage = error ? formatMessage({ id: error, defaultMessage: error }) : "";
  return /* @__PURE__ */ jsx(
    TextInput,
    {
      disabled: true,
      error: errorMessage,
      label,
      labelAction,
      id: name,
      hint,
      name,
      placeholder,
      startAction: /* @__PURE__ */ jsx(StyledIcon, {}),
      type: "text",
      value: ""
    }
  );
};
const StyledIcon = styled(EyeStriked)`
  & > path {
    fill: ${({ theme }) => theme.colors.neutral600};
  }
`;
const PageSizeURLQuery = ({
  trackedEvent,
  options = ["10", "20", "50", "100"],
  defaultValue = "10"
}) => {
  const { formatMessage } = useIntl();
  const [{ query }, setQuery] = useQueryParams();
  const { trackUsage } = useTracking();
  const handleChange = (value) => {
    if (trackedEvent) {
      trackUsage(trackedEvent);
    }
    setQuery({
      pageSize: value,
      page: 1
    });
  };
  const pageSize = typeof query?.pageSize === "string" && query?.pageSize !== "" ? query.pageSize : defaultValue;
  return /* @__PURE__ */ jsxs(Flex, { gap: 2, children: [
    /* @__PURE__ */ jsx(
      SingleSelect,
      {
        size: "S",
        "aria-label": formatMessage({
          id: "components.PageFooter.select",
          defaultMessage: "Entries per page"
        }),
        onChange: handleChange,
        value: pageSize,
        children: options.map((option) => /* @__PURE__ */ jsx(SingleSelectOption, { value: option, children: option }, option))
      }
    ),
    /* @__PURE__ */ jsx(Typography, { textColor: "neutral600", as: "span", children: formatMessage({
      id: "components.PageFooter.select",
      defaultMessage: "Entries per page"
    }) })
  ] });
};
const PaginationURLQuery = ({
  pagination: { pageCount },
  boundaryCount = 1,
  siblingCount = 1
}) => {
  const [{ query }] = useQueryParams();
  const activePage = parseInt(query?.page || "1", 10);
  const { pathname } = useLocation();
  const { formatMessage } = useIntl();
  const makeSearch = (page) => stringify({ ...query, page }, { encode: false });
  const nextSearch = makeSearch(activePage + (pageCount > 1 ? 1 : 0));
  const previousSearch = makeSearch(activePage - 1);
  const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };
  const startPages = range(1, Math.min(boundaryCount, pageCount));
  const endPages = range(Math.max(pageCount - boundaryCount + 1, boundaryCount + 1), pageCount);
  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      activePage - siblingCount,
      // Lower boundary when page is high
      pageCount - boundaryCount - siblingCount * 2 - 1
    ),
    // Greater than startPages
    boundaryCount + 2
  );
  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      activePage + siblingCount,
      // Upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2
    ),
    // Less than endPages
    endPages.length > 0 ? endPages[0] - 2 : pageCount - 1
  );
  const items = [
    ...startPages,
    // Start ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...siblingsStart > boundaryCount + 2 ? ["start-ellipsis"] : boundaryCount + 1 < pageCount - boundaryCount ? [boundaryCount + 1] : [],
    // Sibling pages
    ...range(siblingsStart, siblingsEnd),
    // End ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...siblingsEnd < pageCount - boundaryCount - 1 ? ["end-ellipsis"] : pageCount - boundaryCount > boundaryCount ? [pageCount - boundaryCount] : [],
    ...endPages
  ];
  return /* @__PURE__ */ jsxs(Pagination, { activePage, pageCount, children: [
    /* @__PURE__ */ jsx(PreviousLink, { active: false, to: { pathname, search: previousSearch }, children: formatMessage({
      id: "components.pagination.go-to-previous",
      defaultMessage: "Go to previous page"
    }) }),
    items.map((item) => {
      if (typeof item === "number") {
        return /* @__PURE__ */ jsx(
          PageLink,
          {
            active: item === activePage,
            number: item,
            to: { pathname, search: makeSearch(item) },
            children: formatMessage(
              { id: "components.pagination.go-to", defaultMessage: "Go to page {page}" },
              { page: item }
            )
          },
          item
        );
      }
      return /* @__PURE__ */ jsx(Dots, {}, item);
    }),
    /* @__PURE__ */ jsx(NextLink, { active: false, to: { pathname, search: nextSearch }, children: formatMessage({
      id: "components.pagination.go-to-next",
      defaultMessage: "Go to next page"
    }) })
  ] });
};
const ReactSelect = ({
  components: components2,
  styles,
  error,
  ariaErrorMessage,
  ...props
}) => {
  const theme = useTheme();
  const customStyles = getSelectStyles(theme, error);
  return /* @__PURE__ */ jsx(
    Select,
    {
      menuPosition: "fixed",
      components: {
        ClearIndicator,
        DropdownIndicator,
        IndicatorSeparator: () => null,
        LoadingIndicator: () => null,
        ...components2
      },
      "aria-errormessage": error && ariaErrorMessage,
      "aria-invalid": !!error,
      styles: { ...customStyles, ...styles },
      ...props
    }
  );
};
const IconBox$1 = styled(Box)`
  background: transparent;
  border: none;
  position: relative;
  z-index: 1;

  svg {
    height: ${11 / 16}rem;
    width: ${11 / 16}rem;
  }

  svg path {
    fill: ${({ theme }) => theme.colors.neutral600};
  }
`;
const ClearIndicator = (props) => {
  const Component = components.ClearIndicator;
  return /* @__PURE__ */ jsx(Component, { ...props, children: /* @__PURE__ */ jsx(IconBox$1, { as: "button", type: "button", children: /* @__PURE__ */ jsx(Cross, {}) }) });
};
const CarretBox = styled(IconBox$1)`
  display: flex;
  background: none;
  border: none;

  svg {
    width: ${9 / 16}rem;
  }
`;
const DropdownIndicator = ({ innerProps }) => {
  return (
    // @ts-expect-error – issue with the ref attached to `innerProps`
    /* @__PURE__ */ jsx(CarretBox, { paddingRight: 3, ...innerProps, children: /* @__PURE__ */ jsx(CarretDown, {}) })
  );
};
const getSelectStyles = (theme, error) => {
  return {
    clearIndicator: (base) => ({ ...base, padding: 0, paddingRight: theme.spaces[3] }),
    container: (base) => ({
      ...base,
      background: theme.colors.neutral0,
      lineHeight: "normal"
    }),
    control(base, state) {
      let borderColor = theme.colors.neutral200;
      let boxShadowColor;
      let backgroundColor;
      if (state.isFocused) {
        borderColor = theme.colors.primary600;
        boxShadowColor = theme.colors.primary600;
      } else if (error) {
        borderColor = theme.colors.danger600;
      }
      if (state.isDisabled) {
        backgroundColor = `${theme.colors.neutral150} !important`;
      }
      return {
        ...base,
        fontSize: theme.fontSizes[2],
        height: 40,
        border: `1px solid ${borderColor} !important`,
        outline: 0,
        backgroundColor,
        borderRadius: theme.borderRadius,
        boxShadow: boxShadowColor ? `${boxShadowColor} 0px 0px 0px 2px` : ""
      };
    },
    indicatorsContainer: (base) => ({ ...base, padding: 0, paddingRight: theme.spaces[3] }),
    input: (base) => ({
      ...base,
      margin: 0,
      padding: 0,
      color: theme.colors.neutral800,
      gridTemplateColumns: "0 100%"
    }),
    menu(base) {
      return {
        ...base,
        width: "100%",
        marginTop: theme.spaces[1],
        backgroundColor: theme.colors.neutral0,
        color: theme.colors.neutral800,
        borderRadius: theme.borderRadius,
        border: `1px solid ${theme.colors.neutral200}`,
        boxShadow: theme.shadows.tableShadow,
        fontSize: theme.fontSizes[2],
        zIndex: 2
      };
    },
    menuList: (base) => ({
      ...base,
      paddingLeft: theme.spaces[1],
      paddingTop: theme.spaces[1],
      paddingRight: theme.spaces[1],
      paddingBottom: theme.spaces[1]
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 100
    }),
    option(base, state) {
      let backgroundColor = base.backgroundColor;
      if (state.isFocused || state.isSelected) {
        backgroundColor = theme.colors.primary100;
      }
      return {
        ...base,
        color: theme.colors.neutral800,
        lineHeight: theme.spaces[5],
        backgroundColor,
        borderRadius: theme.borderRadius,
        "&:active": {
          backgroundColor: theme.colors.primary100
        }
      };
    },
    placeholder: (base) => ({
      ...base,
      color: theme.colors.neutral600,
      marginLeft: 0,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      maxWidth: "80%"
    }),
    singleValue(base, state) {
      let color = theme.colors.neutral800;
      if (state.isDisabled) {
        color = theme.colors.neutral600;
      }
      return { ...base, marginLeft: 0, color };
    },
    valueContainer: (base) => ({
      ...base,
      cursor: "pointer",
      padding: 0,
      paddingLeft: theme.spaces[4],
      marginLeft: 0,
      marginRight: 0
    })
  };
};
const intervals = ["years", "months", "days", "hours", "minutes", "seconds"];
const RelativeTime = ({ timestamp, customIntervals = [], className }) => {
  const { formatRelativeTime, formatDate, formatTime } = useIntl();
  const interval = intervalToDuration({
    start: timestamp,
    end: Date.now()
    // see https://github.com/date-fns/date-fns/issues/2891 – No idea why it's all partial it returns it every time.
  });
  const unit = intervals.find((intervalUnit) => {
    return interval[intervalUnit] > 0 && Object.keys(interval).includes(intervalUnit);
  });
  const relativeTime = isPast(timestamp) ? -interval[unit] : interval[unit];
  const customInterval = customIntervals.find((custom) => interval[custom.unit] < custom.threshold);
  const displayText = customInterval ? customInterval.text : formatRelativeTime(relativeTime, unit, { numeric: "auto" });
  return /* @__PURE__ */ jsx(
    "time",
    {
      dateTime: timestamp.toISOString(),
      title: `${formatDate(timestamp)} ${formatTime(timestamp)}`,
      className,
      children: displayText
    }
  );
};
const SearchURLQuery = ({
  label,
  placeholder,
  trackedEvent,
  trackedEventDetails
}) => {
  const inputRef = React.useRef(null);
  const iconButtonRef = React.useRef(null);
  const [{ query }, setQuery] = useQueryParams();
  const [value, setValue] = React.useState(query?._q || "");
  const [isOpen, setIsOpen] = React.useState(!!value);
  const { formatMessage } = useIntl();
  const { trackUsage } = useTracking();
  const handleToggle = () => setIsOpen((prev) => !prev);
  React.useLayoutEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  const handleClear = () => {
    setValue("");
    setQuery({ _q: "" }, "remove");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      if (trackedEvent) {
        trackUsage(trackedEvent, trackedEventDetails);
      }
      setQuery({ _q: encodeURIComponent(value), page: 1 });
    } else {
      handleToggle();
      setQuery({ _q: "" }, "remove");
    }
  };
  if (isOpen) {
    return /* @__PURE__ */ jsx(SearchForm, { onSubmit: handleSubmit, children: /* @__PURE__ */ jsx(
      Searchbar,
      {
        ref: inputRef,
        name: "search",
        onChange: (e) => setValue(e.target.value),
        value,
        clearLabel: formatMessage({ id: "clearLabel", defaultMessage: "Clear" }),
        onClear: handleClear,
        size: "S",
        placeholder,
        children: label
      }
    ) });
  }
  return /* @__PURE__ */ jsx(
    IconButton,
    {
      ref: iconButtonRef,
      icon: /* @__PURE__ */ jsx(Icon, { as: Search, color: "neutral800" }),
      label: formatMessage({ id: "global.search", defaultMessage: "Search" }),
      onClick: handleToggle
    }
  );
};
const SettingsPageTitle = ({ name }) => {
  const { formatMessage } = useIntl();
  const text = formatMessage(
    { id: "Settings.PageTitle", defaultMessage: "Settings - {name}" },
    { name }
  );
  return /* @__PURE__ */ jsx(Helmet, { title: text });
};
const Bullet = styled.div`
  margin-right: ${({ theme }) => theme.spaces[3]};
  width: ${6 / 16}rem;
  height: ${6 / 16}rem;
  border-radius: 50%;
  background: ${({ theme, backgroundColor }) => theme.colors[backgroundColor]};
`;
const Status = ({ variant = "primary" }) => {
  const backgroundColor = `${variant}600`;
  return /* @__PURE__ */ jsx(Bullet, { backgroundColor });
};
const ContentManagerEditViewDataManagerContext = React.createContext({
  allLayoutData: {
    components: {}
  },
  createActionAllowedFields: [],
  formErrors: {},
  hasDraftAndPublish: false,
  initialData: {},
  isCreatingEntry: false,
  isSingleType: false,
  modifiedData: {},
  readActionAllowedFields: [],
  slug: void 0,
  updateActionAllowedFields: []
});
const useCMEditViewDataManager = () => React.useContext(ContentManagerEditViewDataManagerContext);
const getType = (schema, attrName) => get(schema, ["attributes", attrName, "type"], "");
const getOtherInfos = (schema, arr) => get(schema, ["attributes", ...arr], "");
const AutoReloadOverlayBlockerContext = React.createContext(
  {}
);
const MAX_ELAPSED_TIME = 30 * 1e3;
const AutoReloadOverlayBlockerProvider = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [config, setConfig] = React.useState({});
  const [failed, setFailed] = React.useState(false);
  const lockAppWithAutoreload = React.useCallback((config2 = {}) => {
    setIsOpen(true);
    setConfig(config2);
  }, []);
  const unlockAppWithAutoreload = React.useCallback(() => {
    setIsOpen(false);
    setConfig({});
  }, []);
  React.useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        setFailed(true);
      }, MAX_ELAPSED_TIME);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isOpen]);
  let displayedIcon = config?.icon || "reload";
  let description = {
    id: config?.description || "components.OverlayBlocker.description",
    defaultMessage: "You're using a feature that needs the server to restart. Please wait until the server is up."
  };
  let title = {
    id: config?.title || "components.OverlayBlocker.title",
    defaultMessage: "Waiting for restart"
  };
  if (failed) {
    displayedIcon = "time";
    description = {
      id: "components.OverlayBlocker.description.serverError",
      defaultMessage: "The server should have restarted, please check your logs in the terminal."
    };
    title = {
      id: "components.OverlayBlocker.title.serverError",
      defaultMessage: "The restart is taking longer than expected"
    };
  }
  const autoReloadValue = React.useMemo(
    () => ({
      lockAppWithAutoreload,
      unlockAppWithAutoreload
    }),
    [lockAppWithAutoreload, unlockAppWithAutoreload]
  );
  return /* @__PURE__ */ jsxs(AutoReloadOverlayBlockerContext.Provider, { value: autoReloadValue, children: [
    /* @__PURE__ */ jsx(
      Blocker,
      {
        displayedIcon,
        isOpen,
        description,
        title
      }
    ),
    children
  ] });
};
const Blocker = ({ displayedIcon, description, title, isOpen }) => {
  const { formatMessage } = useIntl();
  return isOpen && globalThis?.document?.body ? createPortal(
    /* @__PURE__ */ jsxs(Overlay$1, { id: "autoReloadOverlayBlocker", direction: "column", alignItems: "center", gap: 6, children: [
      /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "center", gap: 2, children: [
        /* @__PURE__ */ jsx(Typography, { as: "h1", variant: "alpha", children: formatMessage(title) }),
        /* @__PURE__ */ jsx(Typography, { as: "h2", textColor: "neutral600", fontSize: 4, fontWeight: "regular", children: formatMessage(description) })
      ] }),
      displayedIcon === "reload" && /* @__PURE__ */ jsx(IconBox, { padding: 6, background: "primary100", borderColor: "primary200", children: /* @__PURE__ */ jsx(LoaderReload, { width: pxToRem(36), height: pxToRem(36) }) }),
      displayedIcon === "time" && /* @__PURE__ */ jsx(IconBox, { padding: 6, background: "primary100", borderColor: "primary200", children: /* @__PURE__ */ jsx(Clock, { width: pxToRem(40), height: pxToRem(40) }) }),
      /* @__PURE__ */ jsx(Box, { marginTop: 2, children: /* @__PURE__ */ jsx(Link$1, { href: "https://docs.strapi.io", isExternal: true, children: formatMessage({
        id: "global.documentation",
        defaultMessage: "Read the documentation"
      }) }) })
    ] }),
    // eslint-disable-next-line no-undef
    globalThis.document.body
  ) : null;
};
const rotation = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  `;
const LoaderReload = styled(Refresh)`
  animation: ${rotation} 1s infinite linear;
`;
const Overlay$1 = styled(Flex)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  /* TODO: set this up in the theme for consistence z-index values */
  z-index: 1140;
  padding-top: ${pxToRem(160)};

  & > * {
    position: relative;
    z-index: 1;
  }

  &:before {
    content: '';
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: ${({ theme }) => theme.colors.neutral0};
    opacity: 0.9;
  }
`;
const IconBox = styled(Box)`
  border-radius: 50%;
  svg {
    > path {
      fill: ${({ theme }) => theme.colors.primary600} !important;
    }
  }
`;
const useAutoReloadOverlayBlocker = () => React.useContext(AutoReloadOverlayBlockerContext);
const CustomFieldsContext = React.createContext({
  get() {
    return void 0;
  },
  getAll() {
    return {};
  }
});
const CustomFieldsProvider = ({ children, customFields }) => {
  const get2 = customFields.get.bind(customFields);
  const getAll = customFields.getAll.bind(customFields);
  const value = React.useMemo(() => ({ get: get2, getAll }), [get2, getAll]);
  return /* @__PURE__ */ jsx(CustomFieldsContext.Provider, { value, children });
};
const useCustomFields = () => React.useContext(CustomFieldsContext);
const GuidedTourContext = React.createContext({
  currentStep: null,
  guidedTourState: {
    contentTypeBuilder: {
      create: false,
      success: false
    },
    contentManager: {
      create: false,
      success: false
    },
    apiTokens: {
      create: false,
      success: false
    },
    transferTokens: {
      create: false,
      success: false
    }
  },
  isGuidedTourVisible: false,
  isSkipped: true,
  setCurrentStep: () => null,
  setGuidedTourVisibility: () => null,
  setSkipped: () => null,
  setStepState: () => null,
  startSection: () => null
});
const GuidedTourProvider = ({
  children,
  currentStep = null,
  guidedTourState,
  isGuidedTourVisible = false,
  isSkipped,
  setCurrentStep,
  setGuidedTourVisibility,
  setSkipped,
  setStepState,
  startSection
}) => {
  const value = React.useMemo(
    () => ({
      currentStep,
      guidedTourState,
      isGuidedTourVisible,
      isSkipped,
      setCurrentStep,
      setGuidedTourVisibility,
      setSkipped,
      setStepState,
      startSection
    }),
    [
      currentStep,
      guidedTourState,
      isGuidedTourVisible,
      isSkipped,
      setCurrentStep,
      setGuidedTourVisibility,
      setSkipped,
      setStepState,
      startSection
    ]
  );
  return /* @__PURE__ */ jsx(GuidedTourContext.Provider, { value, children });
};
const useGuidedTour = () => React.useContext(GuidedTourContext);
const LibraryContext = React.createContext({});
const LibraryProvider = ({ children, fields, components: components2 }) => {
  const value = React.useMemo(() => ({ fields, components: components2 }), [fields, components2]);
  return /* @__PURE__ */ jsx(LibraryContext.Provider, { value, children });
};
const useLibrary = () => React.useContext(LibraryContext);
const OverlayBlockerContext = React.createContext({});
const OverlayBlockerProvider = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const lockApp = React.useCallback(() => {
    setIsOpen(true);
  }, []);
  const unlockApp = React.useCallback(() => {
    setIsOpen(false);
  }, []);
  const contextValue = React.useMemo(() => ({ lockApp, unlockApp }), [lockApp, unlockApp]);
  return /* @__PURE__ */ jsxs(OverlayBlockerContext.Provider, { value: contextValue, children: [
    children,
    isOpen && globalThis?.document?.body ? createPortal(/* @__PURE__ */ jsx(Overlay, { id: "overlayBlocker" }), globalThis.document.body) : null
  ] });
};
const Overlay = styled(Box)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  /* TODO: set this up in the theme for consistence z-index values */
  z-index: 1140;
`;
const useOverlayBlocker = () => React.useContext(OverlayBlockerContext);
const ERROR_PREFIX = "apiError.";
function getPrefixedId(message, callback) {
  const prefixedMessage = `${ERROR_PREFIX}${message}`;
  if (typeof callback === "function") {
    return callback(prefixedMessage);
  }
  return prefixedMessage;
}
function normalizeError(error, { name, intlMessagePrefixCallback }) {
  const { message } = error;
  const normalizedError = {
    id: getPrefixedId(message, intlMessagePrefixCallback),
    defaultMessage: message,
    name: error.name ?? name,
    values: {}
  };
  if ("path" in error) {
    normalizedError.values = { path: error.path.join(".") };
  }
  return normalizedError;
}
const validateErrorIsYupValidationError = (err) => typeof err.details === "object" && err.details !== null && "errors" in err.details;
function normalizeAPIError(apiError, intlMessagePrefixCallback) {
  const error = apiError.response?.data.error;
  if (error) {
    if (validateErrorIsYupValidationError(error)) {
      return {
        name: error.name,
        message: error?.message || null,
        errors: error.details.errors.map(
          (err) => normalizeError(err, { name: error.name, intlMessagePrefixCallback })
        )
      };
    }
    return normalizeError(error, { intlMessagePrefixCallback });
  }
  return null;
}
function useAPIErrorHandler(intlMessagePrefixCallback) {
  const { formatMessage } = useIntl();
  const formatError = (error) => {
    try {
      const formattedErr = formatAPIError(error, { intlMessagePrefixCallback, formatMessage });
      if (!formattedErr) {
        return formatAxiosError(error, { intlMessagePrefixCallback, formatMessage });
      }
      return formattedErr;
    } catch (_) {
      throw new Error("formatAPIError: Unknown error:", error);
    }
  };
  return {
    /**
     * @alpha
     * Convert ValidationErrors from the API into an object that can be used by forms.
     */
    _unstableFormatValidationErrors: (error) => {
      if (typeof error.details === "object" && error.details !== null) {
        if ("errors" in error.details && Array.isArray(error.details.errors)) {
          const validationErrors = error.details.errors;
          return validationErrors.reduce((acc, err) => {
            const { path, message } = err;
            return {
              ...acc,
              [path.join(".")]: message
            };
          }, {});
        } else {
          const details = error.details;
          return Object.keys(details).reduce((acc, key) => {
            const messages = details[key];
            return {
              ...acc,
              [key]: messages.join(", ")
            };
          }, {});
        }
      } else {
        return {};
      }
    },
    /**
     * @alpha
     * This handles the errors given from `redux-toolkit`'s axios based baseQuery function.
     */
    _unstableFormatAPIError: (error) => {
      const err = {
        response: {
          data: {
            error
          }
        }
      };
      if (!error.message) {
        return "Unknown error occured.";
      }
      return formatError(err);
    },
    formatAPIError: formatError
  };
}
function formatAxiosError(error, { intlMessagePrefixCallback, formatMessage }) {
  const { code, message } = error;
  return formatMessage(
    {
      id: getPrefixedId(message, intlMessagePrefixCallback),
      defaultMessage: message
    },
    {
      code
    }
  );
}
function formatAPIError(error, { formatMessage, intlMessagePrefixCallback }) {
  if (!formatMessage) {
    throw new Error("The formatMessage callback is a mandatory argument.");
  }
  const normalizedError = normalizeAPIError(error, intlMessagePrefixCallback);
  if (!normalizedError) {
    return null;
  }
  if ("message" in normalizedError && normalizedError.message !== null) {
    return normalizedError.message;
  }
  if ("errors" in normalizedError) {
    return normalizedError.errors.map(({ id, defaultMessage, values }) => formatMessage({ id, defaultMessage }, values)).join("\n");
  }
  return formatMessage(normalizedError);
}
const useClipboard = () => {
  const copy = useCallback(async (value) => {
    try {
      if (typeof value !== "string" && typeof value !== "number") {
        throw new Error(`Cannot copy typeof ${typeof value} to clipboard, must be a string`);
      } else if (value === "") {
        throw new Error(`Cannot copy empty string to clipboard.`);
      }
      const stringifiedValue = value.toString();
      await navigator.clipboard.writeText(stringifiedValue);
      return true;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.warn("Copy failed", error);
      }
      return false;
    }
  }, []);
  return { copy };
};
const cache = /* @__PURE__ */ new Map();
function useCollator(locale, options) {
  const cacheKey = locale + (options ? Object.entries(options).sort((a, b) => a[0] < b[0] ? -1 : 1).join() : "");
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  const formatter = new Intl.Collator(locale, options);
  cache.set(cacheKey, formatter);
  return formatter;
}
const useFetchClient = () => {
  const controller = useRef(null);
  if (controller.current === null) {
    controller.current = new AbortController();
  }
  useEffect(() => {
    return () => {
      controller.current.abort();
    };
  }, []);
  return useMemo(
    () => getFetchClient({
      signal: controller.current.signal
    }),
    []
  );
};
function useFilter(locale, options) {
  const collator = useCollator(locale, {
    usage: "search",
    ...options
  });
  return {
    startsWith(string, substring) {
      if (substring.length === 0) {
        return true;
      }
      string = string.normalize("NFC");
      substring = substring.normalize("NFC");
      return collator.compare(string.slice(0, substring.length), substring) === 0;
    },
    endsWith(string, substring) {
      if (substring.length === 0) {
        return true;
      }
      string = string.normalize("NFC");
      substring = substring.normalize("NFC");
      return collator.compare(string.slice(-substring.length), substring) === 0;
    },
    includes(string, substring) {
      if (substring.length === 0) {
        return true;
      }
      string = string.normalize("NFC");
      substring = substring.normalize("NFC");
      let scan = 0;
      const sliceLen = substring.length;
      for (; scan + sliceLen <= string.length; scan++) {
        const slice = string.slice(scan, scan + sliceLen);
        if (collator.compare(substring, slice) === 0) {
          return true;
        }
      }
      return false;
    }
  };
}
const useFocusWhenNavigate = ({
  selector = "main",
  dependencies = []
} = {}) => {
  React.useEffect(() => {
    const mainElement = document.querySelector(selector);
    if (mainElement) {
      mainElement.focus();
      window.scrollTo({ top: 0 });
    } else {
      console.warn(
        `[useFocusWhenNavigate] The page does not contain the selector "${selector}" and can't be focused.`
      );
    }
  }, dependencies);
};
const useLockScroll = ({ lockScroll }) => {
  React.useEffect(() => {
    if (lockScroll) {
      document.body.classList.add("lock-body-scroll");
    }
    return () => {
      document.body.classList.remove("lock-body-scroll");
    };
  }, [lockScroll]);
};
const usePersistentState = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    if (stickyValue !== null) {
      try {
        return JSON.parse(stickyValue);
      } catch {
        return stickyValue;
      }
    }
    return defaultValue;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};
const useRBAC = (permissionsToCheck = {}, passedPermissions) => {
  const [internalIsLoading, setInternalIsLoading] = useState(false);
  const defaultAllowedActions = useMemo(
    () => Object.keys(permissionsToCheck).map((name) => ({
      name,
      hasPermission: false
    })),
    [permissionsToCheck]
  );
  const { allPermissions } = useRBACProvider();
  const { post } = useFetchClient();
  const userPermissions = passedPermissions || allPermissions;
  const permissionsToCheckEntries = Object.entries(permissionsToCheck);
  const queryResults = useQueries(
    permissionsToCheckEntries.map(([name, permissions]) => ({
      queryKey: ["useRBAC", name, ...permissions, userPermissions],
      async queryFn() {
        if (!permissions || !permissions.length) {
          return { name, hasPermission: true };
        }
        if (!userPermissions)
          return;
        const matchingPermissions = userPermissions.filter((value) => {
          const associatedPermission = permissions.find(
            (perm) => perm.action === value.action && perm.subject === value.subject
          );
          return associatedPermission !== void 0;
        });
        if (matchingPermissions.length > 0 && matchingPermissions.every(
          (permission) => Array.isArray(permission.conditions) && permission.conditions.length > 0
        )) {
          try {
            const {
              data: { data: data2 }
            } = await post("/admin/permissions/check", {
              permissions: matchingPermissions.map(({ action, subject }) => ({
                action,
                subject
              }))
            });
            return { name, hasPermission: Array.isArray(data2) && data2.every((v) => v === true) };
          } catch (err) {
            return { name, hasPermission: false };
          }
        }
        return { name, hasPermission: matchingPermissions.length > 0 };
      }
    }))
  );
  const setIsLoading = useCallback(() => {
    setInternalIsLoading(true);
  }, []);
  const isLoading = internalIsLoading || queryResults.some((res) => res.isLoading);
  const data = queryResults.map((res) => res.data);
  const allowedActions = (data.some((res) => res === void 0) ? defaultAllowedActions : data).reduce((acc, permission) => {
    if (!permission)
      return acc;
    const { name, hasPermission } = permission;
    acc[`can${capitalize(name)}`] = hasPermission;
    return acc;
  }, {});
  return { allowedActions, isLoading, setIsLoading };
};
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const useSelectionState = (keys, initialValue) => {
  const [selections, setSelections] = useState(initialValue);
  const selectOne = (selection) => {
    const index = selections.findIndex(
      (currentSelection) => keys.every((key) => currentSelection[key] === selection[key])
    );
    if (index > -1) {
      setSelections((prevSelected) => [
        ...prevSelected.slice(0, index),
        ...prevSelected.slice(index + 1)
      ]);
    } else {
      setSelections((prevSelected) => [...prevSelected, selection]);
    }
  };
  const selectAll = (nextSelections) => {
    if (selections.length > 0) {
      setSelections([]);
    } else {
      setSelections(nextSelections);
    }
  };
  const selectOnly = (nextSelection) => {
    if (selections.indexOf(nextSelection) > -1) {
      setSelections([]);
    } else {
      setSelections([nextSelection]);
    }
  };
  const selectMultiple = (nextSelections) => {
    setSelections((currSelections) => [
      // already selected items
      ...currSelections,
      // filter out already selected items from nextSelections
      ...nextSelections.filter(
        (nextSelection) => currSelections.findIndex(
          (currentSelection) => keys.every((key) => currentSelection[key] === nextSelection[key])
        ) === -1
      )
    ]);
  };
  const deselectMultiple = (nextSelections) => {
    setSelections((currSelections) => [
      // filter out items in currSelections that are in nextSelections
      ...currSelections.filter(
        (currentSelection) => nextSelections.findIndex(
          (nextSelection) => keys.every((key) => currentSelection[key] === nextSelection[key])
        ) === -1
      )
    ]);
  };
  return [
    selections,
    { selectOne, selectAll, selectOnly, selectMultiple, deselectMultiple, setSelections }
  ];
};
const StyledIconButton = styled(IconButton)(
  ({ theme }) => `
  border-radius: ${pxToRem(30)};
  width: ${pxToRem(20)};
  height: ${pxToRem(20)};
  padding: ${pxToRem(3)};
  align-items: center;
  justify-content: center;
  svg {
    width: ${pxToRem(8)};
    rect {
      fill: ${theme.colors.primary600}
    }
  }
`
);
const RemoveRoundedButton = (props) => /* @__PURE__ */ jsx(StyledIconButton, { icon: /* @__PURE__ */ jsx(Minus, {}), ...props });
const defaultFields = ["createdBy", "updatedBy", "publishedAt", "id", "_id"];
const contentManagementUtilRemoveFieldsFromData = (data, contentTypeSchema, componentSchema, fields = defaultFields) => {
  const recursiveCleanData = (data2, schema) => {
    return Object.keys(data2).reduce((acc, current) => {
      const attrType = getType(schema, current);
      const value = get(data2, current);
      const component = getOtherInfos(schema, [current, "component"]);
      const isRepeatable = getOtherInfos(schema, [current, "repeatable"]);
      let timestamps = get(schema, ["options", "timestamps"]);
      if (!Array.isArray(timestamps)) {
        timestamps = [];
      }
      if ([...fields, ...timestamps].indexOf(current) !== -1) {
        delete acc[current];
        return acc;
      }
      if (!value) {
        return acc;
      }
      if (attrType === "dynamiczone" && Array.isArray(value)) {
        acc[current] = value.map((componentValue) => {
          const subCleanedData = recursiveCleanData(
            componentValue,
            componentSchema[componentValue.__component]
          );
          return subCleanedData;
        });
        return acc;
      }
      if (attrType === "component") {
        if (isRepeatable && Array.isArray(value)) {
          acc[current] = value.map((compoData) => {
            const subCleanedData = recursiveCleanData(compoData, componentSchema[component]);
            return subCleanedData;
          });
        } else {
          acc[current] = recursiveCleanData(value, componentSchema[component]);
        }
        return acc;
      }
      return acc;
    }, Object.assign({}, data2));
  };
  return recursiveCleanData(data, contentTypeSchema);
};
const formatContentTypeData = (data, ct, composSchema) => {
  const recursiveFormatData = (data2, schema) => {
    return Object.keys(data2).reduce((acc, current) => {
      const type = getType(schema, current);
      const value = get(data2, current);
      const compoUid = getOtherInfos(schema, [current, "component"]);
      const isRepeatable = getOtherInfos(schema, [current, "repeatable"]);
      if (type === "json" && value !== void 0) {
        acc[current] = JSON.stringify(value, null, 2);
        return acc;
      }
      if (!value) {
        acc[current] = value;
        return acc;
      }
      if (type === "dynamiczone" && Array.isArray(value)) {
        acc[current] = value.map((componentValue) => {
          const formattedData = recursiveFormatData(
            componentValue,
            composSchema[componentValue.__component]
          );
          return formattedData;
        });
        return acc;
      }
      if (type === "component") {
        let formattedValue;
        if (isRepeatable && Array.isArray(value)) {
          formattedValue = value.map((obj, i) => {
            const newObj = { ...obj, __temp_key__: i };
            return recursiveFormatData(newObj, composSchema[compoUid]);
          });
        } else {
          formattedValue = recursiveFormatData(value, composSchema[compoUid]);
        }
        acc[current] = formattedValue;
        return acc;
      }
      acc[current] = value;
      return acc;
    }, {});
  };
  return recursiveFormatData(data, ct);
};
const to = (promise, errorExt) => {
  return promise.then(function(data) {
    return [null, data];
  }).catch(function(err) {
    if (errorExt) {
      Object.assign(err, errorExt);
    }
    return [err, void 0];
  });
};
function difference(object, base) {
  function changes(object2, base2) {
    return transform(object2, (result, value, key) => {
      if (!isEqual(value, base2[key])) {
        result[key] = isObject(value) && isObject(base2[key]) ? changes(value, base2[key]) : value;
      }
      return result;
    });
  }
  return changes(object, base);
}
/**
 *
 * Returns a normalized error message
 *
 * @deprecated
 * @preserve
 */
function getAPIInnerErrors(error, { getTrad }) {
  const normalizedError = normalizeAPIError(error, getTrad);
  if (normalizedError && "errors" in normalizedError) {
    return normalizedError.errors.reduce((acc, error2) => {
      if ("path" in error2.values) {
        acc[error2.values.path] = {
          id: error2.id,
          defaultMessage: error2.defaultMessage
        };
      }
      return acc;
    }, {});
  }
  return normalizedError?.defaultMessage;
}
const getFileExtension = (ext) => ext && ext[0] === "." ? ext.substr(1) : ext;
const extractValuesFromYupError = (errorType, errorParams) => {
  if (!errorType || !errorParams) {
    return {};
  }
  return {
    [errorType]: errorParams[errorType]
  };
};
const getYupInnerErrors = (error) => (error?.inner || []).reduce((acc, currentError) => {
  if (currentError.path) {
    acc[currentError.path.split("[").join(".").split("]").join("")] = {
      id: currentError.message,
      defaultMessage: currentError.message,
      values: extractValuesFromYupError(currentError?.type, currentError?.params)
    };
  }
  return acc;
}, {});
const prefixFileUrlWithBackendUrl = (fileURL) => {
  return !!fileURL && fileURL.startsWith("/") ? `${window.strapi.backendURL}${fileURL}` : fileURL;
};
const prefixPluginTranslations = (trad, pluginId) => {
  if (!pluginId) {
    throw new TypeError("pluginId can't be empty");
  }
  return Object.keys(trad).reduce((acc, current) => {
    acc[`${pluginId}.${current}`] = trad[current];
    return acc;
  }, {});
};
async function parseJSON(response) {
  if (response instanceof Response) {
    return response.json();
  }
  return response;
}
async function checkStatus(response, checkToken = true) {
  if (response.status >= 200 && response.status < 300 || response.status === 0) {
    return response;
  }
  if (response.status === 401 && auth.getToken() && checkToken) {
    auth.clearAppStorage();
    window.location.reload();
  }
  return parseJSON(response).then((responseFormatted) => {
    const error = new Error(response.statusText);
    error.response = response;
    error.response.payload = responseFormatted;
    throw error;
  }).catch(() => {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  });
}
function formatQueryParams(params) {
  return Object.keys(params).map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join("&");
}
async function serverRestartWatcher(response) {
  return new Promise((resolve) => {
    fetch(`${window.strapi.backendURL}/_health`, {
      method: "HEAD",
      mode: "no-cors",
      keepalive: false,
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      if (res.status >= 400) {
        throw new Error("not available");
      }
      resolve(response);
    }).catch(() => {
      setTimeout(() => {
        return serverRestartWatcher(response).then(resolve);
      }, 100);
    });
  });
}
const warnOnce = once(console.warn);
async function request(url, options = {}, shouldWatchServerRestart, stringify2 = true, { noAuth } = { noAuth: false }) {
  warnOnce(
    "The `request` function is deprecated and will be removed in the next major version. Please use `useFetchClient` instead."
  );
  if (!options.headers) {
    options.headers = Object.assign(
      {
        "Content-Type": "application/json"
      },
      options.headers
    );
  }
  const token = auth.getToken();
  if (token && !noAuth) {
    options.headers = Object.assign(
      {
        Authorization: `Bearer ${token}`
      },
      options.headers
    );
  }
  url = startsWith(url, "/") ? `${window.strapi.backendURL}${url}` : url;
  if (options && options.params) {
    const params = formatQueryParams(options.params);
    url = `${url}?${params}`;
  }
  if (options && options.body && stringify2) {
    options.body = JSON.stringify(options.body);
  }
  return fetch(url, options).then(checkStatus).then(parseJSON).then((response) => {
    if (shouldWatchServerRestart) {
      return serverRestartWatcher(response);
    }
    return response;
  });
}
const setHexOpacity = (hex, alpha) => `${hex}${Math.floor(alpha * 255).toString(16).padStart(2, "0")}`;
const stopPropagation = {
  onClick: (e) => e.stopPropagation(),
  role: "button",
  "aria-hidden": true
};
const onRowClick = ({ fn, condition = true }) => {
  if (condition) {
    return {
      style: { cursor: "pointer" },
      onClick: fn
    };
  }
};
const StopPropagation = () => {
  return React.createElement("div", stopPropagation);
};
const errorsTrads = {
  email: "components.Input.error.validation.email",
  json: "components.Input.error.validation.json",
  lowercase: "components.Input.error.validation.lowercase",
  max: "components.Input.error.validation.max",
  maxLength: "components.Input.error.validation.maxLength",
  min: "components.Input.error.validation.min",
  minLength: "components.Input.error.validation.minLength",
  regex: "components.Input.error.validation.regex",
  required: "components.Input.error.validation.required",
  unique: "components.Input.error.validation.unique",
  integer: "component.Input.error.validation.integer"
};
function wrapAxiosInstance(instance2) {
  const isDevelopmentEnv = process.env.NODE_ENV === "development";
  const warn = () => {
    if (!isDevelopmentEnv)
      return;
    console.warn(
      'Deprecation warning: Usage of "axiosInstance" utility is deprecated and will be removed in the next major release. Instead, use the useFetchClient() hook, which is exported from the helper-plugin: { useFetchClient } from "@strapi/helper-plugin"'
    );
  };
  const wrapper = {
    request: (...args) => {
      warn();
      return instance2.request(...args);
    },
    get: (...args) => {
      warn();
      return instance2.get(...args);
    },
    head: (...args) => {
      warn();
      return instance2.head(...args);
    },
    delete: (...args) => {
      warn();
      return instance2.delete(...args);
    },
    options: (...args) => {
      warn();
      return instance2.options(...args);
    },
    post: (...args) => {
      warn();
      return instance2.post(...args);
    },
    put: (...args) => {
      warn();
      return instance2.put(...args);
    },
    patch: (...args) => {
      warn();
      return instance2.patch(...args);
    },
    getUri: (...args) => {
      warn();
      return instance2.getUri(...args);
    }
  };
  return wrapper;
}
export {
  AnErrorOccurred,
  AppInfoContext,
  AppInfoProvider,
  AppInfosContext,
  AppInfosProvider,
  AutoReloadOverlayBlockerContext,
  AutoReloadOverlayBlockerProvider,
  Body$1 as Body,
  CheckPagePermissions,
  CheckPermissions,
  ConfirmDialog,
  ContentBox,
  ContentManagerEditViewDataManagerContext,
  CustomFieldsContext,
  CustomFieldsProvider,
  DateTimePickerLegacy as DateTimePicker,
  Table$1 as DynamicTable,
  EmptyBodyTable,
  EmptyStateLayout,
  FilterListURLQuery,
  FilterPopoverURLQuery,
  Form,
  MemoizedGenericInput as GenericInput,
  GuidedTourContext,
  GuidedTourProvider,
  InjectionZone,
  LibraryContext,
  LibraryProvider,
  Link,
  LinkButton,
  LoadingIndicatorPage,
  NoContent,
  NoMedia,
  NoPermissions,
  NotAllowedInput,
  NotificationsContext,
  NotificationsProvider,
  OverlayBlockerContext,
  OverlayBlockerProvider,
  PageSizeURLQuery,
  PaginationURLQuery,
  RBACContext,
  RBACProviderContext,
  ReactSelect,
  RelativeTime,
  RemoveRoundedButton,
  Root$1 as Root,
  SearchURLQuery,
  SettingsPageTitle,
  SortIcon,
  Status,
  StopPropagation,
  StrapiAppContext,
  StrapiAppProvider,
  Table,
  TrackingContext,
  TrackingProvider,
  auth,
  contentManagementUtilRemoveFieldsFromData,
  difference,
  findMatchingPermissions,
  formatContentTypeData,
  formatPermissionsForRequest,
  getAPIInnerErrors,
  getFetchClient,
  getFileExtension,
  getOtherInfos,
  getType,
  getYupInnerErrors,
  hasPermissions,
  normalizeAPIError,
  onRowClick,
  prefixFileUrlWithBackendUrl,
  prefixPluginTranslations,
  pxToRem,
  request,
  setHexOpacity,
  shouldCheckPermissions,
  stopPropagation,
  to,
  errorsTrads as translatedErrors,
  useAPIErrorHandler,
  useAppInfo,
  useAppInfos,
  useAutoReloadOverlayBlocker,
  useCMEditViewDataManager,
  useCallbackRef,
  useClipboard,
  useCollator,
  useCustomFields,
  useFetchClient,
  useFilter,
  useFocusInputField,
  useFocusWhenNavigate,
  useGuidedTour,
  useLibrary,
  useLockScroll,
  useNotification,
  useOverlayBlocker,
  usePersistentState,
  useQuery,
  useQueryParams,
  useRBAC,
  useRBACProvider,
  useSelectionState,
  useStrapiApp,
  useTableContext,
  useTracking,
  wrapAxiosInstance
};
//# sourceMappingURL=index.mjs.map
