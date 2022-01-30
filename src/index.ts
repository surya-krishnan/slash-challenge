import { JSONObject } from './types';

/**
 * Validates 'string' type JSONObjects
 * @param data string data
 * @param schema the schema for this string
 * @returns true if valid string, false otherwise
 */
function stringHandler(data: string, schema: JSONObject): boolean {
  if ("enum" in schema) {
    if (schema.enum.includes(data)) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}

/**
 * Validates Record type JSONObjects
 * @param data Record data to check
 * @param schema the schema for this Record
 * @returns true if valid Record, false otherwise
 */
function dictHandler(data: Record<string, JSON>, schema: JSONObject): boolean {
  // Store all keys in the data
  let dataKeys = Object.keys(data);
  // Store all keys in the schema
  let schemaKeys = []
  if ("properties" in schema) {
    schemaKeys = Object.keys(schema.properties);

  }

  // Check required keys
  if ("required" in schema) {
    let requiredCheck = schema.required.every(reqElement => dataKeys.includes(reqElement));
    if (!requiredCheck) {
      return false;
    }
  }

  // Check if only valid keys are in the dictionary
  let allKeysCheck = dataKeys.every(dataElement => schemaKeys.includes(dataElement));
  if (!allKeysCheck) {
    return false;
  }

  // Send every value to the validate function
  let valueCheck = true;
  for (let key in data) {
    if ("properties" in schema && (!validateSchema(data[key], schema.properties[key]))) {
      valueCheck = false;
    }
  }

  return valueCheck;
}

/**
 * Validates array type JSONObjects
 * @param data array of JSONObjects to validate
 * @param schema schema to validate against
 * @returns true if array is valid, false otherwise
 */
function arrayHandler(data: Array<JSONObject>, schema: JSONObject): boolean {
  // Variable to determine if there are any false cases in stored data
  let arrayCheck = true;
  data.forEach(element => {
    if ("items" in schema && !validateSchema(element, schema.items)) {
      arrayCheck = false;
    }
  });
  return arrayCheck;
}

/**
 * This function validates whether or not JSON data fits a JSONObject schema
 * @param data the data we are validating
 * @param schema the schema we are validating against
 * @returns true if the data fits the schema, false otherwise
 */
export function validateSchema(data: any, schema: JSONObject): boolean {
  // Check if data is of same type of schema
  if (schema && (typeof data === schema.type || (Array.isArray(data) && schema.type === 'array'))) {
    if (schema.type === 'boolean') {
      return true;
    } else if (schema.type === 'number') {
      return true;
    } else if (schema.type === 'string') {
      return stringHandler(data, schema);
    } else if (schema.type === 'object') {
      return dictHandler(data, schema);
    } else if (schema.type === 'array') {
      return arrayHandler(data, schema);
    }
  } else {
    return false;
  }
}
