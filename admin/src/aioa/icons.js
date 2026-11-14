/** The 29 widget icons, bundled with the plugin (assets/images). */
import icon1 from '../../../assets/images/aioa-icon-type-1.svg';
import icon2 from '../../../assets/images/aioa-icon-type-2.svg';
import icon3 from '../../../assets/images/aioa-icon-type-3.svg';
import icon4 from '../../../assets/images/aioa-icon-type-4.svg';
import icon5 from '../../../assets/images/aioa-icon-type-5.svg';
import icon6 from '../../../assets/images/aioa-icon-type-6.svg';
import icon7 from '../../../assets/images/aioa-icon-type-7.svg';
import icon8 from '../../../assets/images/aioa-icon-type-8.svg';
import icon9 from '../../../assets/images/aioa-icon-type-9.svg';
import icon10 from '../../../assets/images/aioa-icon-type-10.svg';
import icon11 from '../../../assets/images/aioa-icon-type-11.svg';
import icon12 from '../../../assets/images/aioa-icon-type-12.svg';
import icon13 from '../../../assets/images/aioa-icon-type-13.svg';
import icon14 from '../../../assets/images/aioa-icon-type-14.svg';
import icon15 from '../../../assets/images/aioa-icon-type-15.svg';
import icon16 from '../../../assets/images/aioa-icon-type-16.svg';
import icon17 from '../../../assets/images/aioa-icon-type-17.svg';
import icon18 from '../../../assets/images/aioa-icon-type-18.svg';
import icon19 from '../../../assets/images/aioa-icon-type-19.svg';
import icon20 from '../../../assets/images/aioa-icon-type-20.svg';
import icon21 from '../../../assets/images/aioa-icon-type-21.svg';
import icon22 from '../../../assets/images/aioa-icon-type-22.svg';
import icon23 from '../../../assets/images/aioa-icon-type-23.svg';
import icon24 from '../../../assets/images/aioa-icon-type-24.svg';
import icon25 from '../../../assets/images/aioa-icon-type-25.svg';
import icon26 from '../../../assets/images/aioa-icon-type-26.svg';
import icon27 from '../../../assets/images/aioa-icon-type-27.svg';
import icon28 from '../../../assets/images/aioa-icon-type-28.svg';
import icon29 from '../../../assets/images/aioa-icon-type-29.svg';

const FILES = [
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  icon6,
  icon7,
  icon8,
  icon9,
  icon10,
  icon11,
  icon12,
  icon13,
  icon14,
  icon15,
  icon16,
  icon17,
  icon18,
  icon19,
  icon20,
  icon21,
  icon22,
  icon23,
  icon24,
  icon25,
  icon26,
  icon27,
  icon28,
  icon29,
];

/** "aioa-icon-type-5" -> bundled SVG url (falls back to type 1) */
export const iconSrc = (type) => {
  const n = parseInt(String(type || '').replace('aioa-icon-type-', ''), 10);
  return FILES[n - 1] || FILES[0];
};

export const ICON_TYPES = FILES.map((src, i) => ({ value: `aioa-icon-type-${i + 1}`, n: i + 1, src }));
