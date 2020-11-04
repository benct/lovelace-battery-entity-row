((LitElement) => {
    console.info(
        '%c BATTERY-ENTITY-ROW %c 1.1.0 ',
        'color: cyan; background: black; font-weight: bold;',
        'color: darkblue; background: white; font-weight: bold;',
    );
    const {html, css} = LitElement.prototype;

    const defaultOnStates = ['on', 'charging'];

    class BatteryEntityRow extends LitElement {

        static get properties() {
            return {
                _hass: Object,
                _config: Object,
                stateObj: Object
            }
        }

        static get styles() {
            return css`
          :host {
            display: flex;
            align-items: center;
          }
          .flex {
            flex: 1;
            margin-left: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            min-width: 0;
          }
          .info, state-badge {
            cursor: pointer;
          }
          .secondary {
            color: var(--secondary-text-color);
          }
          .good {
            color: var(--label-badge-green);
          }
          .warning {
            color: var(--label-badge-yellow);
          }
          .critical {
            color: var(--label-badge-red);
          }`;
        }

        render() {
            if (!this._hass || !this._config) return html``;
            if (!this.stateObj) return this.renderWarning();

            const charging = this.getChargingState(this._config.charging)
            const batteryLevel = this.getBatteryLevel(this._config.attribute);
            const icon = this._config.icon || this.getIcon(batteryLevel, charging);
            const color = this.getColor(batteryLevel);

            const name = this._config.name || this.stateObj.attributes.friendly_name;
            const unit = this._config.unit === false ? null : (this._config.unit || '%');
            const state = batteryLevel !== null
                ? html`${batteryLevel}${unit && html`&nbsp;${unit}`}`
                : this._hass.localize('state.default.unknown');

            return html`
            <state-badge
                .stateObj="${this.stateObj}"
                .overrideIcon="${icon}"
                @click="${this.moreInfo}"
                class="pointer ${color}">
            </state-badge>
            <div class="flex" @click="${this.moreInfo}">
                <div class="info">${name}${this.renderSecondaryInfo()}</div>
                <div class="state">${state}</div>
            </div>`;
        }

        renderSecondaryInfo() {
            return this._config.secondary_info === 'last-changed' ?
                html`<div class="secondary">
                    <ha-relative-time datetime="${this.stateObj.last_changed}" .hass="${this._hass}"></ha-relative-time>
                </div>` : null;
        }

        renderWarning() {
            return html`<hui-warning>
                ${this._hass.localize('ui.panel.lovelace.warning.entity_not_found', 'entity', this._config.entity)}
            </hui-warning>`;
        }

        setConfig(config) {
            if (!config.entity) throw new Error('Please define a valid entity.');

            this.moreInfo = () => this.fireEvent(this, 'hass-more-info', {entityId: config.entity});
            this._config = config;
        }

        shouldUpdate(changedProps) {
            return changedProps.has('stateObj');
        }

        set hass(hass) {
            this._hass = hass;

            if (hass && this._config) {
                this.stateObj = this._config.entity in hass.states ? hass.states[this._config.entity] : null;
            }
        }

        getBatteryLevel(attribute) {
            let batteryValue = this.stateObj.state;
            if (this.stateObj.attributes.battery) batteryValue = this.stateObj.attributes.battery;
            if (this.stateObj.attributes.battery_level) batteryValue = this.stateObj.attributes.battery_level;
            if (this.stateObj.attributes[attribute]) batteryValue = this.stateObj.attributes[attribute];
            return Number.isFinite(parseInt(batteryValue)) ? Math.round(parseInt(batteryValue, 10)) : null;
        }

        getChargingState(chargingConfig) {
            if (!chargingConfig) return false;
            if (chargingConfig === true) {
                return defaultOnStates.includes(this.stateObj.state.toString().toLowerCase());
            }

            const additionalStates = chargingConfig.state || [];
            const onStates = defaultOnStates.concat(additionalStates).map(value => value.toString().toLowerCase());

            const entity = (chargingConfig.entity && chargingConfig.entity in this._hass.states)
                ? this._hass.states[chargingConfig.entity] : this.stateObj;
            const state = chargingConfig.attribute ? entity.attributes[chargingConfig.attribute] : entity.state;
            return onStates.includes(state.toString().toLowerCase());
        }

        getIcon(batteryLevel, charging) {
            if (!batteryLevel) return 'mdi:battery-unknown';
            const roundedLevel = Math.round(batteryLevel / 10) * 10;
            return roundedLevel >= 100
                ? (charging ? 'mdi:battery-charging-100' : 'mdi:battery')
                : roundedLevel === 0
                    ? (charging ? 'mdi:battery-charging-outline' : 'mdi:battery-outline')
                    : (charging ? 'mdi:battery-charging-' : 'mdi:battery-') + roundedLevel;
        }

        getColor(batteryLevel) {
            if (!batteryLevel) return 'unknown';
            const warning = this._config.warning || 35;
            const critical = this._config.critical || 15;
            return (batteryLevel > warning)
                ? 'good'
                : (batteryLevel > critical)
                    ? 'warning'
                    : 'critical';
        }

        fireEvent(node, type, detail = {}, options = {}) {
            const event = new Event(type, {
                bubbles: options.bubbles || true,
                cancelable: options.cancelable || true,
                composed: options.composed || true,
            });
            event.detail = detail;
            node.dispatchEvent(event);
        }
    }

    customElements.define('battery-entity-row', BatteryEntityRow);
})(window.LitElement || Object.getPrototypeOf(customElements.get('hui-masonry-view') || customElements.get('hui-view')));
