# battery-entity-row

Show battery states or attributes with dynamic icon on entity rows in Home Assistant's Lovelace UI

[![GH-release](https://img.shields.io/github/v/release/benct/lovelace-battery-entity-row.svg?style=flat-square)](https://github.com/benct/lovelace-battery-entity-row/releases)
[![GH-downloads](https://img.shields.io/github/downloads/benct/lovelace-battery-entity-row/total?style=flat-square)](https://github.com/benct/lovelace-battery-entity-row/releases)
[![GH-last-commit](https://img.shields.io/github/last-commit/benct/lovelace-battery-entity-row.svg?style=flat-square)](https://github.com/benct/lovelace-battery-entity-row/commits/master)
[![GH-code-size](https://img.shields.io/github/languages/code-size/benct/lovelace-battery-entity-row.svg?color=red&style=flat-square)](https://github.com/benct/lovelace-battery-entity-row)
[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg?style=flat-square)](https://github.com/hacs)

Rewritten and improved version of cbulock's [battery-entity](https://github.com/cbulock/lovelace-battery-entity) card _(deprecated/unmaintained)_.

**NOTE:** This is not a standalone lovelace card, but a row element for the [entities](https://www.home-assistant.io/lovelace/entities/) card.
If you need a standalone card or want _a lot_ more customizability, check out maxwroc's [battery-state-card](https://github.com/maxwroc/battery-state-card).

## Installation

Manually add [battery-entity-row.js](https://raw.githubusercontent.com/benct/lovelace-battery-entity-row/master/battery-entity-row.js)
to your `<config>/www/` folder and add the following to the `configuration.yaml` file:

```yaml
lovelace:
  resources:
    - url: /local/battery-entity-row.js?v=1.3.1
      type: module
```

_OR_ install using [HACS](https://hacs.xyz/) and add this (if in YAML mode):

```yaml
lovelace:
  resources:
    - url: /hacsfiles/lovelace-battery-entity-row/battery-entity-row.js
      type: module
```

The above configuration can be managed directly in the Configuration -> Lovelace Dashboards -> Resources panel when not using YAML mode,
or added by clicking the "Add to lovelace" button on the HACS dashboard after installing the plugin.

## Configuration

This card produces an `entity-row` and must therefore be configured as an entity in an [entities](https://www.home-assistant.io/lovelace/entities/) card.

The battery level value is fetched from the entity `state`, from the attribute `battery` or `battery_level`,
or from a custom attribute defined with the `attribute` option. Numeric values (`0-100`) and some predefined
string values (`high`, `normal`, `low`, etc..) are supported as a battery level value.

| Name            | Type        | Default         | Description                                                                    |
| --------------- | ----------- | --------------- | ------------------------------------------------------------------------------ |
| type            | string      | **Required**    | `custom:battery-entity-row`                                                    |
| entity          | string      | **Required**    | `domain.my_entity_id`                                                          |
| attribute       | string      | `battery_level` | Override battery level attribute                                               |
| name            | string      | `friendly_name` | Override entity `friendly_name`                                                |
| secondary\_info | string      |                 | `last-changed`, `last-updated` or an attribute of the entity.                  |
| unit            | string/bool | `%`             | Override default `unit`, or hide with `false`                                  |
| icon            | string      |                 | Override dynamic battery `icon`                                                |
| warning         | number      | `35`            | Level at which the icon will appear yellow                                     |
| critical        | number      | `15`            | Level at which the icon will appear red                                        |
| charging        | bool/object | `false`         | Indicate charging based on entity state. See charging object for more options. |

Currently limited support for `secondary_info` option with value `last-changed`.

### Charging object

| Name      | Type        | Default              | Description                                          |
| --------- | ----------- | -------------------- | ---------------------------------------------------- |
| entity    | string      | `main entity`        | Get charging state from another entity               |
| attribute | string      |                      | Get charging state from an attribute                 |
| state     | string/list | `"on"`, `"charging"` | Add values that indicate charging (case insensitive) |

## Examples

![battery-entity-row](https://raw.githubusercontent.com/benct/lovelace-battery-entity-row/master/example.png)

```yaml
type: entities
entities:
  - type: custom:battery-entity-row
    entity: sensor.bedroom_temperature

  - type: custom:battery-entity-row
    entity: sensor.bedroom_temperature
    attribute: battery_percent
    name: Some battery
    unit: percent
    icon: mdi:battery-alert
    secondary_info: last-changed
    warning: 50
    critical: 25
    charging: true

  - type: custom:battery-entity-row
    entity: sensor.bedroom_temperature
    name: Charging battery
    charging:
      entity: binary_sensor.bedroom_temperature_charger
      attribute: charging
      state:
        - Enabled
        - is_charging
```

Usage in [auto-entities](https://github.com/thomasloven/lovelace-auto-entities) card:

```yaml
type: custom:auto-entities
card:
  type: entities
filter:
  include:
    - entity_id: sensor.battery*   # or use other matchers
      options:
        type: custom:battery-entity-row
        <battery-entity-row options>
```

## My cards

[xiaomi-vacuum-card](https://github.com/benct/lovelace-xiaomi-vacuum-card) |
[multiple-entity-row](https://github.com/benct/lovelace-multiple-entity-row) |
[github-entity-row](https://github.com/benct/lovelace-github-entity-row) |
[battery-entity-row](https://github.com/benct/lovelace-battery-entity-row) |
[~~attribute-entity-row~~](https://github.com/benct/lovelace-attribute-entity-row)

[![BMC](https://www.buymeacoffee.com/assets/img/custom_images/white_img.png)](https://www.buymeacoff.ee/benct)
