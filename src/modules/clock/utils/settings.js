import configs from '../configs/settings.config';
import { settingsFactory } from '@utils/settings.utils';

/**
 * Default settings
 * @type {Object}
 */
const defaults = {
    showClock: true,
    tewelveHourFormat: false,
    blinkForSeconds: false,
    showDate: true,
}

export default settingsFactory({ configs, defaults });
