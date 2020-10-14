# battery-entity-row
Show battery states or attributes with dynamic icon on entity rows in Home Assistant's Lovelace UI

[![GH-release](https://img.shields.io/badge/version-1.0.0-red.svg?style=flat-square)](https://raw.githubusercontent.com/benct/lovelace-battery-entity-row/master/battery-entity-row.js)
[![GH-last-commit](https://img.shields.io/github/last-commit/benct/lovelace-battery-entity-row.svg?style=flat-square)](https://github.com/benct/lovelace-battery-entity-row/commits/master)
[![GH-code-size](https://img.shields.io/github/languages/code-size/benct/lovelace-battery-entity-row.svg?style=flat-square)](https://github.com/benct/lovelace-battery-entity-row)

**NOTE:** This is not a standalone lovelace card, but a row element for the [entities](https://www.home-assistant.io/lovelace/entities/) card.

Rewritten and improved version of cbulock's [battery-entity](https://github.com/cbulock/lovelace-battery-entity) card _(deprecated/unmaintained)_.

## Installation

Manually add [battery-entity-row.js](https://raw.githubusercontent.com/benct/lovelace-battery-entity-row/master/battery-entity-row.js)
to your `<config>/www/` folder and add the following to the `configuration.yaml` file:
```yaml
lovelace:
  resources:
    - url: /local/battery-entity-row.js?v=1.0.0
      type: module
```

The above configuration can be managed directly in the Configuration -> Lovelace Dashboards -> Resources panel when not using YAML mode.

## Configuration

This card produces an `entity-row` and must therefore be configured as an entity in an [entities](https://www.home-assistant.io/lovelace/entities/) card.

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `custom:battery-entity-row`
| entity | string | **Required** | `domain.my_entity_id`
| attribute | string | `battery_level` | Override battery level attribute
| name | string | `friendly_name` | Override entity `friendly_name`
| unit | string | `%` | Override battery unit of measurement
| icon | string | | Override dynamic battery `icon`
| warning | number | `35` | Level at which the icon will appear yellow
| critical | number | `15` | Level at which the icon will appear red

Currently limited support for `secondary_info` option only with value `last-changed`.

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
```

## My cards

[xiaomi-vacuum-card](https://github.com/benct/lovelace-xiaomi-vacuum-card) | 
[multiple-entity-row](https://github.com/benct/lovelace-multiple-entity-row) | 
[github-entity-row](https://github.com/benct/lovelace-github-entity-row) | 
[battery-entity-row](https://github.com/benct/lovelace-battery-entity-row) | 
[~~attribute-entity-row~~](https://github.com/benct/lovelace-attribute-entity-row)

[![BMC](https://www.buymeacoffee.com/assets/img/custom_images/white_img.png)](https://www.buymeacoff.ee/benct)