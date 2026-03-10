var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/dotenv/package.json
var require_package = __commonJS({
  "node_modules/dotenv/package.json"(exports, module) {
    module.exports = {
      name: "dotenv",
      version: "17.3.1",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          types: "./lib/main.d.ts",
          require: "./lib/main.js",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        pretest: "npm run lint && npm run dts-check",
        test: "tap run tests/**/*.js --allow-empty-coverage --disable-coverage --timeout=60000",
        "test:coverage": "tap run tests/**/*.js --show-full-coverage --timeout=60000 --coverage-report=text --coverage-report=lcov",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      homepage: "https://github.com/motdotla/dotenv#readme",
      funding: "https://dotenvx.com",
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@types/node": "^18.11.3",
        decache: "^4.6.2",
        sinon: "^14.0.1",
        standard: "^17.0.0",
        "standard-version": "^9.5.0",
        tap: "^19.2.0",
        typescript: "^4.8.4"
      },
      engines: {
        node: ">=12"
      },
      browser: {
        fs: false
      }
    };
  }
});

// node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/dotenv/lib/main.js"(exports, module) {
    var fs = __require("fs");
    var path = __require("path");
    var os = __require("os");
    var crypto = __require("crypto");
    var packageJson = require_package();
    var version = packageJson.version;
    var TIPS = [
      "\u{1F510} encrypt with Dotenvx: https://dotenvx.com",
      "\u{1F510} prevent committing .env to code: https://dotenvx.com/precommit",
      "\u{1F510} prevent building .env in docker: https://dotenvx.com/prebuild",
      "\u{1F916} agentic secret storage: https://dotenvx.com/as2",
      "\u26A1\uFE0F secrets for agents: https://dotenvx.com/as2",
      "\u{1F6E1}\uFE0F auth for agents: https://vestauth.com",
      "\u{1F6E0}\uFE0F  run anywhere with `dotenvx run -- yourcommand`",
      "\u2699\uFE0F  specify custom .env file path with { path: '/custom/path/.env' }",
      "\u2699\uFE0F  enable debug logging with { debug: true }",
      "\u2699\uFE0F  override existing env vars with { override: true }",
      "\u2699\uFE0F  suppress all logs with { quiet: true }",
      "\u2699\uFE0F  write to custom object with { processEnv: myObject }",
      "\u2699\uFE0F  load multiple .env files with { path: ['.env.local', '.env'] }"
    ];
    function _getRandomTip() {
      return TIPS[Math.floor(Math.random() * TIPS.length)];
    }
    function parseBoolean(value) {
      if (typeof value === "string") {
        return !["false", "0", "no", "off", ""].includes(value.toLowerCase());
      }
      return Boolean(value);
    }
    function supportsAnsi() {
      return process.stdout.isTTY;
    }
    function dim(text) {
      return supportsAnsi() ? `\x1B[2m${text}\x1B[0m` : text;
    }
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _parseVault(options) {
      options = options || {};
      const vaultPath = _vaultPath(options);
      options.path = vaultPath;
      const result = DotenvModule.configDotenv(options);
      if (!result.parsed) {
        const err = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
        err.code = "MISSING_DATA";
        throw err;
      }
      const keys = _dotenvKey(options).split(",");
      const length = keys.length;
      let decrypted;
      for (let i = 0; i < length; i++) {
        try {
          const key = keys[i].trim();
          const attrs = _instructions(result, key);
          decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
          break;
        } catch (error) {
          if (i + 1 >= length) {
            throw error;
          }
        }
      }
      return DotenvModule.parse(decrypted);
    }
    function _warn(message) {
      console.error(`[dotenv@${version}][WARN] ${message}`);
    }
    function _debug(message) {
      console.log(`[dotenv@${version}][DEBUG] ${message}`);
    }
    function _log(message) {
      console.log(`[dotenv@${version}] ${message}`);
    }
    function _dotenvKey(options) {
      if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
        return options.DOTENV_KEY;
      }
      if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
        return process.env.DOTENV_KEY;
      }
      return "";
    }
    function _instructions(result, dotenvKey) {
      let uri;
      try {
        uri = new URL(dotenvKey);
      } catch (error) {
        if (error.code === "ERR_INVALID_URL") {
          const err = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        }
        throw error;
      }
      const key = uri.password;
      if (!key) {
        const err = new Error("INVALID_DOTENV_KEY: Missing key part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environment = uri.searchParams.get("environment");
      if (!environment) {
        const err = new Error("INVALID_DOTENV_KEY: Missing environment part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
      const ciphertext = result.parsed[environmentKey];
      if (!ciphertext) {
        const err = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
        err.code = "NOT_FOUND_DOTENV_ENVIRONMENT";
        throw err;
      }
      return { ciphertext, key };
    }
    function _vaultPath(options) {
      let possibleVaultPath = null;
      if (options && options.path && options.path.length > 0) {
        if (Array.isArray(options.path)) {
          for (const filepath of options.path) {
            if (fs.existsSync(filepath)) {
              possibleVaultPath = filepath.endsWith(".vault") ? filepath : `${filepath}.vault`;
            }
          }
        } else {
          possibleVaultPath = options.path.endsWith(".vault") ? options.path : `${options.path}.vault`;
        }
      } else {
        possibleVaultPath = path.resolve(process.cwd(), ".env.vault");
      }
      if (fs.existsSync(possibleVaultPath)) {
        return possibleVaultPath;
      }
      return null;
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    function _configVault(options) {
      const debug = parseBoolean(process.env.DOTENV_CONFIG_DEBUG || options && options.debug);
      const quiet = parseBoolean(process.env.DOTENV_CONFIG_QUIET || options && options.quiet);
      if (debug || !quiet) {
        _log("Loading env from encrypted .env.vault");
      }
      const parsed = DotenvModule._parseVault(options);
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsed, options);
      return { parsed };
    }
    function configDotenv(options) {
      const dotenvPath = path.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      let debug = parseBoolean(processEnv.DOTENV_CONFIG_DEBUG || options && options.debug);
      let quiet = parseBoolean(processEnv.DOTENV_CONFIG_QUIET || options && options.quiet);
      if (options && options.encoding) {
        encoding = options.encoding;
      } else {
        if (debug) {
          _debug("No encoding is specified. UTF-8 is used by default");
        }
      }
      let optionPaths = [dotenvPath];
      if (options && options.path) {
        if (!Array.isArray(options.path)) {
          optionPaths = [_resolveHome(options.path)];
        } else {
          optionPaths = [];
          for (const filepath of options.path) {
            optionPaths.push(_resolveHome(filepath));
          }
        }
      }
      let lastError;
      const parsedAll = {};
      for (const path2 of optionPaths) {
        try {
          const parsed = DotenvModule.parse(fs.readFileSync(path2, { encoding }));
          DotenvModule.populate(parsedAll, parsed, options);
        } catch (e) {
          if (debug) {
            _debug(`Failed to load ${path2} ${e.message}`);
          }
          lastError = e;
        }
      }
      const populated = DotenvModule.populate(processEnv, parsedAll, options);
      debug = parseBoolean(processEnv.DOTENV_CONFIG_DEBUG || debug);
      quiet = parseBoolean(processEnv.DOTENV_CONFIG_QUIET || quiet);
      if (debug || !quiet) {
        const keysCount = Object.keys(populated).length;
        const shortPaths = [];
        for (const filePath of optionPaths) {
          try {
            const relative = path.relative(process.cwd(), filePath);
            shortPaths.push(relative);
          } catch (e) {
            if (debug) {
              _debug(`Failed to load ${filePath} ${e.message}`);
            }
            lastError = e;
          }
        }
        _log(`injecting env (${keysCount}) from ${shortPaths.join(",")} ${dim(`-- tip: ${_getRandomTip()}`)}`);
      }
      if (lastError) {
        return { parsed: parsedAll, error: lastError };
      } else {
        return { parsed: parsedAll };
      }
    }
    function config(options) {
      if (_dotenvKey(options).length === 0) {
        return DotenvModule.configDotenv(options);
      }
      const vaultPath = _vaultPath(options);
      if (!vaultPath) {
        _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`);
        return DotenvModule.configDotenv(options);
      }
      return DotenvModule._configVault(options);
    }
    function decrypt(encrypted, keyStr) {
      const key = Buffer.from(keyStr.slice(-64), "hex");
      let ciphertext = Buffer.from(encrypted, "base64");
      const nonce = ciphertext.subarray(0, 12);
      const authTag = ciphertext.subarray(-16);
      ciphertext = ciphertext.subarray(12, -16);
      try {
        const aesgcm = crypto.createDecipheriv("aes-256-gcm", key, nonce);
        aesgcm.setAuthTag(authTag);
        return `${aesgcm.update(ciphertext)}${aesgcm.final()}`;
      } catch (error) {
        const isRange = error instanceof RangeError;
        const invalidKeyLength = error.message === "Invalid key length";
        const decryptionFailed = error.message === "Unsupported state or unable to authenticate data";
        if (isRange || invalidKeyLength) {
          const err = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        } else if (decryptionFailed) {
          const err = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
          err.code = "DECRYPTION_FAILED";
          throw err;
        } else {
          throw error;
        }
      }
    }
    function populate(processEnv, parsed, options = {}) {
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      const populated = {};
      if (typeof parsed !== "object") {
        const err = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
        err.code = "OBJECT_REQUIRED";
        throw err;
      }
      for (const key of Object.keys(parsed)) {
        if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
          if (override === true) {
            processEnv[key] = parsed[key];
            populated[key] = parsed[key];
          }
          if (debug) {
            if (override === true) {
              _debug(`"${key}" is already defined and WAS overwritten`);
            } else {
              _debug(`"${key}" is already defined and was NOT overwritten`);
            }
          }
        } else {
          processEnv[key] = parsed[key];
          populated[key] = parsed[key];
        }
      }
      return populated;
    }
    var DotenvModule = {
      configDotenv,
      _configVault,
      _parseVault,
      config,
      decrypt,
      parse,
      populate
    };
    module.exports.configDotenv = DotenvModule.configDotenv;
    module.exports._configVault = DotenvModule._configVault;
    module.exports._parseVault = DotenvModule._parseVault;
    module.exports.config = DotenvModule.config;
    module.exports.decrypt = DotenvModule.decrypt;
    module.exports.parse = DotenvModule.parse;
    module.exports.populate = DotenvModule.populate;
    module.exports = DotenvModule;
  }
});

// node_modules/@shopify/graphql-client/dist/graphql-client/constants.mjs
var CLIENT = "GraphQL Client";
var MIN_RETRIES = 0;
var MAX_RETRIES = 3;
var GQL_API_ERROR = "An error occurred while fetching from the API. Review 'graphQLErrors' for details.";
var UNEXPECTED_CONTENT_TYPE_ERROR = "Response returned unexpected Content-Type:";
var NO_DATA_OR_ERRORS_ERROR = "An unknown error has occurred. The API did not return a data object or any errors in its response.";
var CONTENT_TYPES = {
  json: "application/json",
  multipart: "multipart/mixed"
};
var SDK_VARIANT_HEADER = "X-SDK-Variant";
var SDK_VERSION_HEADER = "X-SDK-Version";
var DEFAULT_SDK_VARIANT = "shopify-graphql-client";
var DEFAULT_CLIENT_VERSION = "1.4.1";
var RETRY_WAIT_TIME = 1e3;
var RETRIABLE_STATUS_CODES = [429, 503];
var DEFER_OPERATION_REGEX = /@(defer)\b/i;
var NEWLINE_SEPARATOR = "\r\n";
var BOUNDARY_HEADER_REGEX = /boundary="?([^=";]+)"?/i;
var HEADER_SEPARATOR = NEWLINE_SEPARATOR + NEWLINE_SEPARATOR;

// node_modules/@shopify/graphql-client/dist/graphql-client/utilities.mjs
function formatErrorMessage(message, client2 = CLIENT) {
  return message.startsWith(`${client2}`) ? message : `${client2}: ${message}`;
}
function getErrorMessage(error) {
  return error instanceof Error ? error.message : JSON.stringify(error);
}
function getErrorCause(error) {
  return error instanceof Error && error.cause ? error.cause : void 0;
}
function combineErrors(dataArray) {
  return dataArray.flatMap(({ errors }) => {
    return errors ?? [];
  });
}
function validateRetries({ client: client2, retries }) {
  if (retries !== void 0 && (typeof retries !== "number" || retries < MIN_RETRIES || retries > MAX_RETRIES)) {
    throw new Error(`${client2}: The provided "retries" value (${retries}) is invalid - it cannot be less than ${MIN_RETRIES} or greater than ${MAX_RETRIES}`);
  }
}
function getKeyValueIfValid(key, value) {
  return value && (typeof value !== "object" || Array.isArray(value) || typeof value === "object" && Object.keys(value).length > 0) ? { [key]: value } : {};
}
function buildDataObjectByPath(path, data) {
  if (path.length === 0) {
    return data;
  }
  const key = path.pop();
  const newData = {
    [key]: data
  };
  if (path.length === 0) {
    return newData;
  }
  return buildDataObjectByPath(path, newData);
}
function combineObjects(baseObject, newObject) {
  return Object.keys(newObject || {}).reduce((acc, key) => {
    if ((typeof newObject[key] === "object" || Array.isArray(newObject[key])) && baseObject[key]) {
      acc[key] = combineObjects(baseObject[key], newObject[key]);
      return acc;
    }
    acc[key] = newObject[key];
    return acc;
  }, Array.isArray(baseObject) ? [...baseObject] : { ...baseObject });
}
function buildCombinedDataObject([initialDatum, ...remainingData]) {
  return remainingData.reduce(combineObjects, { ...initialDatum });
}

// node_modules/@shopify/graphql-client/dist/graphql-client/http-fetch.mjs
function generateHttpFetch({ clientLogger, customFetchApi = fetch, client: client2 = CLIENT, defaultRetryWaitTime = RETRY_WAIT_TIME, retriableCodes = RETRIABLE_STATUS_CODES }) {
  const httpFetch = async (requestParams, count, maxRetries) => {
    const nextCount = count + 1;
    const maxTries = maxRetries + 1;
    let response;
    try {
      response = await customFetchApi(...requestParams);
      clientLogger({
        type: "HTTP-Response",
        content: {
          requestParams,
          response
        }
      });
      if (!response.ok && retriableCodes.includes(response.status) && nextCount <= maxTries) {
        throw new Error();
      }
      const deprecationNotice = response?.headers.get("X-Shopify-API-Deprecated-Reason") || "";
      if (deprecationNotice) {
        clientLogger({
          type: "HTTP-Response-GraphQL-Deprecation-Notice",
          content: {
            requestParams,
            deprecationNotice
          }
        });
      }
      return response;
    } catch (error) {
      if (nextCount <= maxTries) {
        const retryAfter = response?.headers.get("Retry-After");
        await sleep(retryAfter ? parseInt(retryAfter, 10) : defaultRetryWaitTime);
        clientLogger({
          type: "HTTP-Retry",
          content: {
            requestParams,
            lastResponse: response,
            retryAttempt: count,
            maxRetries
          }
        });
        return httpFetch(requestParams, nextCount, maxRetries);
      }
      throw new Error(formatErrorMessage(`${maxRetries > 0 ? `Attempted maximum number of ${maxRetries} network retries. Last message - ` : ""}${getErrorMessage(error)}`, client2));
    }
  };
  return httpFetch;
}
async function sleep(waitTime) {
  return new Promise((resolve) => setTimeout(resolve, waitTime));
}

// node_modules/@shopify/graphql-client/dist/graphql-client/graphql-client.mjs
function createGraphQLClient({ headers, url, customFetchApi = fetch, retries = 0, logger }) {
  validateRetries({ client: CLIENT, retries });
  const config = {
    headers,
    url,
    retries
  };
  const clientLogger = generateClientLogger(logger);
  const httpFetch = generateHttpFetch({
    customFetchApi,
    clientLogger,
    defaultRetryWaitTime: RETRY_WAIT_TIME
  });
  const fetchFn = generateFetch(httpFetch, config);
  const request = generateRequest(fetchFn);
  const requestStream = generateRequestStream(fetchFn);
  return {
    config,
    fetch: fetchFn,
    request,
    requestStream
  };
}
function generateClientLogger(logger) {
  return (logContent) => {
    if (logger) {
      logger(logContent);
    }
  };
}
async function processJSONResponse(response) {
  const { errors, data, extensions } = await response.json();
  return {
    ...getKeyValueIfValid("data", data),
    ...getKeyValueIfValid("extensions", extensions),
    headers: response.headers,
    ...errors || !data ? {
      errors: {
        networkStatusCode: response.status,
        message: formatErrorMessage(errors ? GQL_API_ERROR : NO_DATA_OR_ERRORS_ERROR),
        ...getKeyValueIfValid("graphQLErrors", errors),
        response
      }
    } : {}
  };
}
function generateFetch(httpFetch, { url, headers, retries }) {
  return async (operation, options = {}) => {
    const { variables, headers: overrideHeaders, url: overrideUrl, retries: overrideRetries, keepalive, signal } = options;
    const body = JSON.stringify({
      query: operation,
      variables
    });
    validateRetries({ client: CLIENT, retries: overrideRetries });
    const flatHeaders = Object.entries({
      ...headers,
      ...overrideHeaders
    }).reduce((headers2, [key, value]) => {
      headers2[key] = Array.isArray(value) ? value.join(", ") : value.toString();
      return headers2;
    }, {});
    if (!flatHeaders[SDK_VARIANT_HEADER] && !flatHeaders[SDK_VERSION_HEADER]) {
      flatHeaders[SDK_VARIANT_HEADER] = DEFAULT_SDK_VARIANT;
      flatHeaders[SDK_VERSION_HEADER] = DEFAULT_CLIENT_VERSION;
    }
    const fetchParams = [
      overrideUrl ?? url,
      {
        method: "POST",
        headers: flatHeaders,
        body,
        signal,
        keepalive
      }
    ];
    return httpFetch(fetchParams, 1, overrideRetries ?? retries);
  };
}
function generateRequest(fetchFn) {
  return async (...props) => {
    if (DEFER_OPERATION_REGEX.test(props[0])) {
      throw new Error(formatErrorMessage("This operation will result in a streamable response - use requestStream() instead."));
    }
    let response = null;
    try {
      response = await fetchFn(...props);
      const { status, statusText } = response;
      const contentType = response.headers.get("content-type") || "";
      if (!response.ok) {
        return {
          errors: {
            networkStatusCode: status,
            message: formatErrorMessage(statusText),
            response
          }
        };
      }
      if (!contentType.includes(CONTENT_TYPES.json)) {
        return {
          errors: {
            networkStatusCode: status,
            message: formatErrorMessage(`${UNEXPECTED_CONTENT_TYPE_ERROR} ${contentType}`),
            response
          }
        };
      }
      return await processJSONResponse(response);
    } catch (error) {
      return {
        errors: {
          message: getErrorMessage(error),
          ...response == null ? {} : {
            networkStatusCode: response.status,
            response
          }
        }
      };
    }
  };
}
async function* getStreamBodyIterator(response) {
  const decoder = new TextDecoder();
  if (response.body[Symbol.asyncIterator]) {
    for await (const chunk of response.body) {
      yield decoder.decode(chunk);
    }
  } else {
    const reader = response.body.getReader();
    let readResult;
    try {
      while (!(readResult = await reader.read()).done) {
        yield decoder.decode(readResult.value);
      }
    } finally {
      reader.cancel();
    }
  }
}
function readStreamChunk(streamBodyIterator, boundary) {
  return {
    async *[Symbol.asyncIterator]() {
      try {
        let buffer = "";
        for await (const textChunk of streamBodyIterator) {
          buffer += textChunk;
          if (buffer.indexOf(boundary) > -1) {
            const lastBoundaryIndex = buffer.lastIndexOf(boundary);
            const fullResponses = buffer.slice(0, lastBoundaryIndex);
            const chunkBodies = fullResponses.split(boundary).filter((chunk) => chunk.trim().length > 0).map((chunk) => {
              const body = chunk.slice(chunk.indexOf(HEADER_SEPARATOR) + HEADER_SEPARATOR.length).trim();
              return body;
            });
            if (chunkBodies.length > 0) {
              yield chunkBodies;
            }
            buffer = buffer.slice(lastBoundaryIndex + boundary.length);
            if (buffer.trim() === `--`) {
              buffer = "";
            }
          }
        }
      } catch (error) {
        throw new Error(`Error occured while processing stream payload - ${getErrorMessage(error)}`);
      }
    }
  };
}
function createJsonResponseAsyncIterator(response) {
  return {
    async *[Symbol.asyncIterator]() {
      const processedResponse = await processJSONResponse(response);
      yield {
        ...processedResponse,
        hasNext: false
      };
    }
  };
}
function getResponseDataFromChunkBodies(chunkBodies) {
  return chunkBodies.map((value) => {
    try {
      return JSON.parse(value);
    } catch (error) {
      throw new Error(`Error in parsing multipart response - ${getErrorMessage(error)}`);
    }
  }).map((payload) => {
    const { data, incremental, hasNext, extensions, errors } = payload;
    if (!incremental) {
      return {
        data: data || {},
        ...getKeyValueIfValid("errors", errors),
        ...getKeyValueIfValid("extensions", extensions),
        hasNext
      };
    }
    const incrementalArray = incremental.map(({ data: data2, path, errors: errors2 }) => {
      return {
        data: data2 && path ? buildDataObjectByPath(path, data2) : {},
        ...getKeyValueIfValid("errors", errors2)
      };
    });
    return {
      data: incrementalArray.length === 1 ? incrementalArray[0].data : buildCombinedDataObject([
        ...incrementalArray.map(({ data: data2 }) => data2)
      ]),
      ...getKeyValueIfValid("errors", combineErrors(incrementalArray)),
      hasNext
    };
  });
}
function validateResponseData(responseErrors, combinedData) {
  if (responseErrors.length > 0) {
    throw new Error(GQL_API_ERROR, {
      cause: {
        graphQLErrors: responseErrors
      }
    });
  }
  if (Object.keys(combinedData).length === 0) {
    throw new Error(NO_DATA_OR_ERRORS_ERROR);
  }
}
function createMultipartResponseAsyncInterator(response, responseContentType) {
  const boundaryHeader = (responseContentType ?? "").match(BOUNDARY_HEADER_REGEX);
  const boundary = `--${boundaryHeader ? boundaryHeader[1] : "-"}`;
  if (!response.body?.getReader && !response.body?.[Symbol.asyncIterator]) {
    throw new Error("API multipart response did not return an iterable body", {
      cause: response
    });
  }
  const streamBodyIterator = getStreamBodyIterator(response);
  let combinedData = {};
  let responseExtensions;
  return {
    async *[Symbol.asyncIterator]() {
      try {
        let streamHasNext = true;
        for await (const chunkBodies of readStreamChunk(streamBodyIterator, boundary)) {
          const responseData = getResponseDataFromChunkBodies(chunkBodies);
          responseExtensions = responseData.find((datum) => datum.extensions)?.extensions ?? responseExtensions;
          const responseErrors = combineErrors(responseData);
          combinedData = buildCombinedDataObject([
            combinedData,
            ...responseData.map(({ data }) => data)
          ]);
          streamHasNext = responseData.slice(-1)[0].hasNext;
          validateResponseData(responseErrors, combinedData);
          yield {
            ...getKeyValueIfValid("data", combinedData),
            ...getKeyValueIfValid("extensions", responseExtensions),
            hasNext: streamHasNext
          };
        }
        if (streamHasNext) {
          throw new Error(`Response stream terminated unexpectedly`);
        }
      } catch (error) {
        const cause = getErrorCause(error);
        yield {
          ...getKeyValueIfValid("data", combinedData),
          ...getKeyValueIfValid("extensions", responseExtensions),
          errors: {
            message: formatErrorMessage(getErrorMessage(error)),
            networkStatusCode: response.status,
            ...getKeyValueIfValid("graphQLErrors", cause?.graphQLErrors),
            response
          },
          hasNext: false
        };
      }
    }
  };
}
function generateRequestStream(fetchFn) {
  return async (...props) => {
    if (!DEFER_OPERATION_REGEX.test(props[0])) {
      throw new Error(formatErrorMessage("This operation does not result in a streamable response - use request() instead."));
    }
    try {
      const response = await fetchFn(...props);
      const { statusText } = response;
      if (!response.ok) {
        throw new Error(statusText, { cause: response });
      }
      const responseContentType = response.headers.get("content-type") || "";
      switch (true) {
        case responseContentType.includes(CONTENT_TYPES.json):
          return createJsonResponseAsyncIterator(response);
        case responseContentType.includes(CONTENT_TYPES.multipart):
          return createMultipartResponseAsyncInterator(response, responseContentType);
        default:
          throw new Error(`${UNEXPECTED_CONTENT_TYPE_ERROR} ${responseContentType}`, { cause: response });
      }
    } catch (error) {
      return {
        async *[Symbol.asyncIterator]() {
          const response = getErrorCause(error);
          yield {
            errors: {
              message: formatErrorMessage(getErrorMessage(error)),
              ...getKeyValueIfValid("networkStatusCode", response?.status),
              ...getKeyValueIfValid("response", response)
            },
            hasNext: false
          };
        }
      };
    }
  };
}

// node_modules/@shopify/graphql-client/dist/api-client-utilities/validations.mjs
function validateDomainAndGetStoreUrl({ client: client2, storeDomain }) {
  try {
    if (!storeDomain || typeof storeDomain !== "string") {
      throw new Error();
    }
    const trimmedDomain = storeDomain.trim();
    const protocolUrl = trimmedDomain.match(/^https?:/) ? trimmedDomain : `https://${trimmedDomain}`;
    const url = new URL(protocolUrl);
    url.protocol = "https";
    return url.origin;
  } catch (error) {
    throw new Error(`${client2}: a valid store domain ("${storeDomain}") must be provided`, { cause: error });
  }
}
function validateApiVersion({ client: client2, currentSupportedApiVersions, apiVersion, logger }) {
  const versionError = `${client2}: the provided apiVersion ("${apiVersion}")`;
  const supportedVersion = `Currently supported API versions: ${currentSupportedApiVersions.join(", ")}`;
  if (!apiVersion || typeof apiVersion !== "string") {
    throw new Error(`${versionError} is invalid. ${supportedVersion}`);
  }
  const trimmedApiVersion = apiVersion.trim();
  if (!currentSupportedApiVersions.includes(trimmedApiVersion)) {
    if (logger) {
      logger({
        type: "Unsupported_Api_Version",
        content: {
          apiVersion,
          supportedApiVersions: currentSupportedApiVersions
        }
      });
    } else {
      console.warn(`${versionError} is likely deprecated or not supported. ${supportedVersion}`);
    }
  }
}

// node_modules/@shopify/graphql-client/dist/api-client-utilities/api-versions.mjs
function getQuarterMonth(quarter) {
  const month = quarter * 3 - 2;
  return month === 10 ? month : `0${month}`;
}
function getPrevousVersion(year, quarter, nQuarter) {
  const versionQuarter = quarter - nQuarter;
  if (versionQuarter <= 0) {
    return `${year - 1}-${getQuarterMonth(versionQuarter + 4)}`;
  }
  return `${year}-${getQuarterMonth(versionQuarter)}`;
}
function getCurrentApiVersion() {
  const date = /* @__PURE__ */ new Date();
  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();
  const quarter = Math.floor(month / 3 + 1);
  return {
    year,
    quarter,
    version: `${year}-${getQuarterMonth(quarter)}`
  };
}
function getCurrentSupportedApiVersions() {
  const { year, quarter, version: currentVersion } = getCurrentApiVersion();
  const nextVersion = quarter === 4 ? `${year + 1}-01` : `${year}-${getQuarterMonth(quarter + 1)}`;
  return [
    getPrevousVersion(year, quarter, 3),
    getPrevousVersion(year, quarter, 2),
    getPrevousVersion(year, quarter, 1),
    currentVersion,
    nextVersion,
    "unstable"
  ];
}

// node_modules/@shopify/graphql-client/dist/api-client-utilities/utilities.mjs
function generateGetHeaders(config) {
  return (customHeaders) => {
    return { ...customHeaders ?? {}, ...config.headers };
  };
}
function generateGetGQLClientParams({ getHeaders, getApiUrl }) {
  return (operation, options) => {
    const props = [operation];
    if (options && Object.keys(options).length > 0) {
      const { variables, apiVersion: propApiVersion, headers, retries, signal } = options;
      props.push({
        ...variables ? { variables } : {},
        ...headers ? { headers: getHeaders(headers) } : {},
        ...propApiVersion ? { url: getApiUrl(propApiVersion) } : {},
        ...retries ? { retries } : {},
        ...signal ? { signal } : {}
      });
    }
    return props;
  };
}

// node_modules/@shopify/admin-api-client/dist/constants.mjs
var DEFAULT_CONTENT_TYPE = "application/json";
var DEFAULT_CLIENT_VERSION2 = "1.1.1";
var ACCESS_TOKEN_HEADER = "X-Shopify-Access-Token";
var CLIENT2 = "Admin API Client";

// node_modules/@shopify/admin-api-client/dist/validations.mjs
function validateRequiredAccessToken(accessToken) {
  if (!accessToken) {
    throw new Error(`${CLIENT2}: an access token must be provided`);
  }
}
function validateServerSideUsage(isTesting = false) {
  if (typeof window !== "undefined" && !isTesting) {
    throw new Error(`${CLIENT2}: this client should not be used in the browser`);
  }
}

// node_modules/@shopify/admin-api-client/dist/graphql/client.mjs
function createAdminApiClient({ storeDomain, apiVersion, accessToken, userAgentPrefix, retries = 0, customFetchApi, logger, isTesting }) {
  const currentSupportedApiVersions = getCurrentSupportedApiVersions();
  const storeUrl = validateDomainAndGetStoreUrl({
    client: CLIENT2,
    storeDomain
  });
  const baseApiVersionValidationParams = {
    client: CLIENT2,
    currentSupportedApiVersions,
    logger
  };
  validateServerSideUsage(isTesting);
  validateApiVersion({
    client: CLIENT2,
    currentSupportedApiVersions,
    apiVersion,
    logger
  });
  validateRequiredAccessToken(accessToken);
  const apiUrlFormatter = generateApiUrlFormatter(storeUrl, apiVersion, baseApiVersionValidationParams);
  const config = {
    storeDomain: storeUrl,
    apiVersion,
    accessToken,
    headers: {
      "Content-Type": DEFAULT_CONTENT_TYPE,
      Accept: DEFAULT_CONTENT_TYPE,
      [ACCESS_TOKEN_HEADER]: accessToken,
      "User-Agent": `${userAgentPrefix ? `${userAgentPrefix} | ` : ""}${CLIENT2} v${DEFAULT_CLIENT_VERSION2}`
    },
    apiUrl: apiUrlFormatter(),
    userAgentPrefix
  };
  const graphqlClient = createGraphQLClient({
    headers: config.headers,
    url: config.apiUrl,
    retries,
    customFetchApi,
    logger
  });
  const getHeaders = generateGetHeaders(config);
  const getApiUrl = generateGetApiUrl(config, apiUrlFormatter);
  const getGQLClientParams = generateGetGQLClientParams({
    getHeaders,
    getApiUrl
  });
  const client2 = {
    config,
    getHeaders,
    getApiUrl,
    fetch: (...props) => {
      return graphqlClient.fetch(...getGQLClientParams(...props));
    },
    request: (...props) => {
      return graphqlClient.request(...getGQLClientParams(...props));
    }
  };
  return Object.freeze(client2);
}
function generateApiUrlFormatter(storeUrl, defaultApiVersion, baseApiVersionValidationParams) {
  return (apiVersion) => {
    if (apiVersion) {
      validateApiVersion({
        ...baseApiVersionValidationParams,
        apiVersion
      });
    }
    const urlApiVersion = (apiVersion ?? defaultApiVersion).trim();
    return `${storeUrl}/admin/api/${urlApiVersion}/graphql.json`;
  };
}
function generateGetApiUrl(config, apiUrlFormatter) {
  return (propApiVersion) => {
    return propApiVersion ? apiUrlFormatter(propApiVersion) : config.apiUrl;
  };
}

// node_modules/@shopify/admin-api-client/dist/rest/types.mjs
var Method;
(function(Method2) {
  Method2["Get"] = "GET";
  Method2["Post"] = "POST";
  Method2["Put"] = "PUT";
  Method2["Delete"] = "DELETE";
})(Method || (Method = {}));

// scripts/import-products.js
var import_dotenv = __toESM(require_main(), 1);
import_dotenv.default.config();
var client = createAdminApiClient({
  storeDomain: process.env.VITE_SHOPIFY_STORE_DOMAIN,
  apiVersion: "2024-01",
  accessToken: process.env.SHOPIFY_ADMIN_ACCESS_TOKEN
});
var products = [
  {
    title: "VOID SHIFTER",
    body_html: "Seria emblematic\u0103 cu finisaj carbon mat \u0219i corzi din m\u0103tase violet\u0103.",
    vendor: "PANDAMA",
    product_type: "Legendary",
    status: "active",
    variants: [
      {
        price: "124.00",
        compare_at_price: "159.00",
        sku: "PN-VDS-04",
        inventory_management: "shopify"
      }
    ]
  },
  {
    title: "NEON KATANA",
    body_html: "Edi\u021Bie limitat\u0103 cu design cyberpunk \u0219i str\u0103lucire reactiv\u0103.",
    vendor: "PANDAMA",
    product_type: "Rare",
    status: "active",
    variants: [
      {
        price: "89.00",
        sku: "PN-NKT-02",
        inventory_management: "shopify"
      }
    ]
  },
  {
    title: "CHROME BAMBOO",
    body_html: "Sculptur\u0103 minimalist\u0103 din lemn fuzionat\u0103 cu performan\u021B\u0103 modern\u0103.",
    vendor: "PANDAMA",
    product_type: "Standard",
    status: "active",
    variants: [
      {
        price: "75.00",
        sku: "PN-CBM-01",
        inventory_management: "shopify"
      }
    ]
  },
  {
    title: "SPIRIT BLADE",
    body_html: "Serie ultrau\u0219oar\u0103 pentru joc rapid \u0219i dinamic.",
    vendor: "PANDAMA",
    product_type: "Limited",
    status: "active",
    variants: [
      {
        price: "95.00",
        sku: "PN-SBT-03",
        inventory_management: "shopify"
      }
    ]
  },
  {
    title: "GHOST PROTOCOL",
    body_html: "Seria stealth cu finisaj negru mat \u0219i rulment silen\u021Bios.",
    vendor: "PANDAMA",
    product_type: "Legendary",
    status: "active",
    variants: [
      {
        price: "145.00",
        compare_at_price: "189.00",
        sku: "PN-GHP-05",
        inventory_management: "shopify"
      }
    ],
    // This one has a public URL image
    images: [{ src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDB5A_3qQjckCcr8r5B3VYC_bHTv5zxfILtcTvqyMlU6cUoEaefG-iyKd_4juMQDObgGoU80XqGEUwZtFoqWe17m8HncnJVUr082sKcsyeq2A9MVtFXxKiMqymr_y2lQoYm7p7jhASb6YHHnOOxVOVvBV-umDbRq9mZkNaIPNknC6lyRcaQsdSaPs6ba4WtLtdyN_Z4Rgm8xzQATfvx8_H5uLhPV9LZiPcDVk-NUWyQY57-rTA-4dkpudqPyFrHTJ5HyuJMUH30HJIc" }]
  },
  {
    title: "SAKURA DRIFT",
    body_html: "Serie limitat\u0103 flori de cire\u0219. Motive japoneze pictate manual pe ar\u021Bar premium.",
    vendor: "PANDAMA",
    product_type: "Limited",
    status: "active",
    variants: [
      {
        price: "110.00",
        sku: "PN-SKD-06",
        inventory_management: "shopify"
      }
    ],
    images: [{ src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0U_GH6YVeYjZXJ1D7JLIjeutwAeRo0mJIvmdtY5n2Dq628THmxiWoHRPlIot_1Ky3bCDboFbkI52IFeVPCWHlUVr8kvNUswQ9rdTMYCl02EE_IPO_cuiLQUAwMoD5yE-FqA06KuXyeK_IIS0KNLpeVlSve8F8DfA1QxaN35G0UeunN37RYs0IxaYsEWNSjlrIav64oZ_jjJ4gSsGmV3MUSjDNeZicJ8tqzz9CkhgnOxgEdcCcxQP5penWJoTNeFUty2qwbeCliTB8" }]
  },
  {
    title: "TITANIUM APEX",
    body_html: "Nivel competi\u021Bie cu carcas\u0103 din titan aerospa\u021Bial. Creat pentru c\xE2\u0219tig\u0103tori.",
    vendor: "PANDAMA",
    product_type: "Legendary",
    status: "active",
    variants: [
      {
        price: "199.00",
        compare_at_price: "249.00",
        sku: "PN-TXA-07",
        inventory_management: "shopify"
      }
    ],
    images: [{ src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyYib6r47gUtIWuY4yJNcss-oG_VdVLAnnRsJvlGqezQhfsbkoR2BOfswBbM_Q5XMztmjLB8rbbiNKpT3SzRHnRUyZHgTm1UVJtV0mYchHTUv3kGu2ZjjbAeJmLfWmJeAlSvzDpbzMX4ITUUAXLbUqxkXRap9-KiXHu7LLhPbOxumb3OV3JAJZDdd0qYSZj9Rrh0VKY6Qt_ksU87ec3dPBSJRy-_mtPnrzfIHxty01BWU8YRQ_dM7jbeZZIQVQzF3HO8FumyXC1D4z" }]
  },
  {
    title: "PIXEL STORM",
    body_html: "Art\u0103 pixel retro \xEEnt\xE2lne\u0219te inginerie modern\u0103. Finisaj camuflaj digital.",
    vendor: "PANDAMA",
    product_type: "Standard",
    status: "active",
    variants: [
      {
        price: "68.00",
        sku: "PN-PXS-08",
        inventory_management: "shopify"
      }
    ]
  }
];
var CREATE_PRODUCT_MUTATION = `
  mutation productCreate($input: ProductInput!) {
    productCreate(input: $input) {
      product {
        id
        title
      }
      userErrors {
        field
        message
      }
    }
  }
`;
async function importProducts() {
  console.log("Starting product import...");
  for (const product of products) {
    try {
      console.log(`Creating ${product.title}...`);
      const { data, errors } = await client.request(CREATE_PRODUCT_MUTATION, {
        variables: {
          input: {
            title: product.title,
            descriptionHtml: product.body_html,
            vendor: product.vendor,
            productType: product.product_type,
            status: "ACTIVE",
            variants: product.variants.map((v) => ({
              price: v.price,
              compareAtPrice: v.compare_at_price || null,
              sku: v.sku,
              inventoryManagement: "SHOPIFY"
            })),
            // Map simple image URLs for the ones we have
            ...product.images ? { images: product.images.map((img) => ({ src: img.src })) } : {}
          }
        }
      });
      if (errors && errors.graphQLErrors && errors.graphQLErrors.length > 0) {
        console.error(`FAILED to create ${product.title}:`, errors.graphQLErrors);
      } else if (data.productCreate.userErrors.length > 0) {
        console.error(`FAILED to create ${product.title}:`, data.productCreate.userErrors);
      } else {
        console.log(`\u2705 Successfully created ${product.title}! ID: ${data.productCreate.product.id}`);
      }
    } catch (error) {
      console.error(`Error on ${product.title}:`, error);
    }
  }
  console.log("\nFinished importing products!");
  console.log("Note: Some products use local images. You might need to manually attach best-sellers[1-4].png in the Shopify Admin panel.");
}
importProducts();
