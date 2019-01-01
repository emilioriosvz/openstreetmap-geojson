# openstreetmap-geojson
Get the geojsons from openstreetmaps

## Install
```
npm install openstreetmap-geojson
```

## How to use?
If you just need one geojson you can do that:

```js
const osm = require('openstreetmap-geojson')

// 347950 is the osm relation id for Barcelona
const geojson = await osm.getGeoJSON(347950)
  .catch(console.error)
```

If you are going to need more than one Geojson, consider using this function so as not to abuse the api

```js
const osm = require('openstreetmap-geojson')

const ids = [340783, 342563, 3657693, 344522, 347950]

const geojsons = await Promise.all(ids.map(id => osm.getGeoJSONPolitely(id, 200)))
```

## API

### `.getGeoJSON(osmId)`
Given a osm relation id returns a Promise that resolves with the GeoJSON.

### `.getGeoJSONPolitely(osmId, milliseconds)`
Wait the indicated milliseconds and then Given a osm relation id returns a Promise that resolves with the GeoJSON.

## Todo
* Tests