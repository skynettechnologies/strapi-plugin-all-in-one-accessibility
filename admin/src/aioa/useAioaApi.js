/**
 * Requests made by the settings page.
 *
 *   route(action, body)  the plugin's admin routes (server/src/routes), through Strapi's
 *                        authenticated fetch client. Replaces the reference POST /route?action=.
 *   saveSettings(params) widget-setting-update-platform, straight from the browser (as the reference)
 *   noRequiredEu()       ipapi.co EU check, straight from the browser, only before a registration
 */
import { useCallback, useMemo } from 'react';
import { useFetchClient } from '@strapi/strapi/admin';

import { SERVER_PLUGIN_NAME } from '../pluginId';
import { API_UPDATE_URL, GEO_API_URL, GEO_TIMEOUT } from './constants';

const ACTIONS = {
  fetchWidgetSettings: 'widget-settings',
  registerDomain: 'register',
  getDashboardLink: 'dashboard-link',
  fetchScanDetails: 'scan-details',
};

/** A request that never reached the plugin route (network, session expired, server error) */
export class RouteError extends Error {}

/** Route answer -> result, or an Error (err.pending: the website is still being set up) */
export const checkResult = (result) => {
  if (!result || typeof result !== 'object') {
    throw new Error('Unexpected response from the server.');
  }
  if (result.error) {
    const err = new Error(result.error);
    err.pending = result.pending === true;
    throw err;
  }
  return result;
};

/** User-facing text for an error thrown by route() / checkResult() */
export const errorText = (err, fallback = 'Please try again.') => {
  if (err instanceof RouteError) {
    return err.status === 401 || err.status === 403
      ? 'Your Strapi session has expired or you do not have access. Please sign in again.'
      : 'Please check your connection and try again.';
  }
  return (err && err.message) || fallback;
};

export const useAioaApi = () => {
  const { get, post } = useFetchClient();

  const getConfig = useCallback(async () => {
    try {
      const { data } = await get(`/${SERVER_PLUGIN_NAME}/config`);
      return data || {};
    } catch (error) {
      const err = new RouteError(error?.message || 'Request failed');
      err.status = error?.status ?? error?.response?.status;
      throw err;
    }
  }, [get]);

  const route = useCallback(
    async (action, body = {}) => {
      try {
        const { data } = await post(`/${SERVER_PLUGIN_NAME}/${ACTIONS[action]}`, body);
        return data;
      } catch (error) {
        const err = new RouteError(error?.message || 'Request failed');
        err.status = error?.status ?? error?.response?.status;
        throw err;
      }
    },
    [post],
  );

  return useMemo(() => ({ getConfig, route }), [getConfig, route]);
};

/**
 * Save the settings (widget-setting-update-platform). null / undefined are sent as ''.
 * Any non-2xx answer is an error; the body is not read.
 */
export const saveSettings = async (params) => {
  const body = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    body.append(key, value === null || value === undefined ? '' : String(value));
  });
  const res = await fetch(API_UPDATE_URL, { method: 'POST', body });
  if (!res.ok) {
    throw new Error('Request failed (' + res.status + ')');
  }
};

/**
 * Is the admin in the EU? ipapi.co (in_eu). Resolves with no_required_eu:
 * 0 when in_eu is true, otherwise 1 (also when ipapi.co fails or takes over 8 s).
 */
export const fetchNoRequiredEu = () => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), GEO_TIMEOUT);
  return fetch(GEO_API_URL, { credentials: 'omit', signal: controller.signal })
    .then((res) => res.json())
    .then((data) => (data && data.in_eu === true ? 0 : 1))
    .catch(() => 1)
    .finally(() => clearTimeout(timer));
};
