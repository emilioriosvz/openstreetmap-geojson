const fetch = require('node-fetch')
const API_URL = 'http://polygons.openstreetmap.fr/get_geojson.py?params=0&id='
const wait = async time => new Promise(resolve => setTimeout(() => resolve(), time))

/**
 * Makes a resquest to the API with osm relation id and returns the Promise that resolves the GeoJSON.
 * @param  {number} relationId  - The Relation id.
 * @return {Promise<object>} - GeoJSON.
 */

const getGeoJSON = async relationId => {
  try {
    const res = await fetch(`${API_URL}${relationId}`)
    const text = await res.text()
    if (!res || res.status !== 200) throw new Error('Unable to fetch the GeoJSON')
    if (text === 'None\n') return {}
    const json = JSON.parse(text)
    return json
  } catch (error) {
    throw error
  }
}

/**
 * Waits for the indicated time and then makes a resquest to the API with osm relation id and returns
 * the Promise that resolves the GeoJSON.
 * @param  {number} relationId  - The Relation id.
 * @param  {number} timeBetweenCallsInMS - The milliseconds of waiting between calls.
 * @return {Promise<object>} - GeoJSON.
 */
const getGeoJSONPolitely = async (relationId, timeBetweenCallsInMS = 200) => {
  await wait(timeBetweenCallsInMS)

  try {
    const json = await getGeoJSON(relationId)
    return json
  } catch (error) {
    throw error
  }
}

module.exports = { getGeoJSON, getGeoJSONPolitely }
