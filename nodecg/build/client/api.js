/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@nodecg/json-schema-defaults/dist/defaults.js":
/*!********************************************************************!*\
  !*** ./node_modules/@nodecg/json-schema-defaults/dist/defaults.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
/**
 * check whether item is plain object
 */
var isObject = function (item) {
    return typeof item === 'object' && item !== null && item.toString() === {}.toString();
};
/**
 * deep JSON object clone
 */
var cloneJSON = function (source) {
    return JSON.parse(JSON.stringify(source));
};
/**
 * returns a result of deep merge of two objects
 */
var merge = function (target, source) {
    target = cloneJSON(target);
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            if (isObject(target[key]) && isObject(source[key])) {
                target[key] = merge(target[key], source[key]);
            }
            else {
                target[key] = source[key];
            }
        }
    }
    return target;
};
/**
 * get object by reference. works only with local references that points on
 * definitions object
 */
var getLocalRef = function (path, definitions) {
    var pathArr = path.replace(/^#\/definitions\//, '').split('/');
    var find = function (path, root) {
        var key = path.shift();
        if (key === undefined || !root[key]) {
            return {};
        }
        else if (!path.length) {
            return root[key];
        }
        else {
            return find(path, root[key]);
        }
    };
    var result = find(pathArr, definitions);
    if (!isObject(result)) {
        return result;
    }
    return cloneJSON(result);
};
/**
 * merge list of objects from allOf properties
 * if some of objects contains $ref field extracts this reference and merge it
 */
var mergeAllOf = function (allOfList, definitions) {
    var length = allOfList.length;
    var index = -1;
    var result = {};
    while (++index < length) {
        var item = allOfList[index];
        item = typeof item.$ref !== 'undefined' ? getLocalRef(item.$ref, definitions) : item;
        result = merge(result, item);
    }
    return result;
};
/**
 * returns a object that built with default values from json schema
 */
var defaults = function (schema, definitions) {
    if (typeof schema['default'] !== 'undefined') {
        return schema['default'];
    }
    else if (typeof schema.allOf !== 'undefined') {
        var mergedItem = mergeAllOf(schema.allOf, definitions);
        return defaults(mergedItem, definitions);
    }
    else if (typeof schema.$ref !== 'undefined') {
        var reference = getLocalRef(schema.$ref, definitions);
        return defaults(reference, definitions);
    }
    else if (schema.type === 'object') {
        if (!schema.properties) {
            return {};
        }
        for (var key in schema.properties) {
            if (schema.properties.hasOwnProperty(key)) {
                schema.properties[key] = defaults(schema.properties[key], definitions);
                if (typeof schema.properties[key] === 'undefined') {
                    delete schema.properties[key];
                }
            }
        }
        return schema.properties;
    }
    else if (schema.type === 'array') {
        if (!schema.items) {
            return [];
        }
        // minimum item count
        var ct = schema.minItems || 0;
        // tuple-typed arrays
        if (schema.items.constructor === Array) {
            var values = schema.items.map(function (item) {
                return defaults(item, definitions);
            });
            // remove undefined items at the end (unless required by minItems)
            for (var i = values.length - 1; i >= 0; i--) {
                if (typeof values[i] !== 'undefined') {
                    break;
                }
                if (i + 1 > ct) {
                    values.pop();
                }
            }
            return values;
        }
        // object-typed arrays
        var value = defaults(schema.items, definitions);
        if (typeof value === 'undefined') {
            return [];
        }
        else {
            var values = [];
            for (var i = 0; i < Math.max(1, ct); i++) {
                values.push(cloneJSON(value));
            }
            return values;
        }
    }
};
/**
 * main function
 */
function default_1(schema, definitions) {
    var _a;
    if (typeof definitions === 'undefined') {
        definitions = (_a = schema.definitions) !== null && _a !== void 0 ? _a : {};
    }
    else if (isObject(schema.definitions)) {
        definitions = merge(definitions, schema.definitions);
    }
    return defaults(cloneJSON(schema), definitions);
}
exports["default"] = default_1;


/***/ }),

/***/ "./node_modules/@nodecg/json-schema-defaults/dist/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@nodecg/json-schema-defaults/dist/index.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports["default"] = void 0;
var defaults_1 = __webpack_require__(/*! ./defaults */ "./node_modules/@nodecg/json-schema-defaults/dist/defaults.js");
__createBinding(exports, defaults_1, "default", "default");


/***/ }),

/***/ "./node_modules/@sentry/browser/esm/client.js":
/*!****************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/client.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BrowserClient": () => (/* binding */ BrowserClient)
/* harmony export */ });
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/baseclient.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/version.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/hub.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/api.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/logger.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/clientreport.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/dsn.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/envelope.js");
/* harmony import */ var _eventbuilder_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eventbuilder.js */ "./node_modules/@sentry/browser/esm/eventbuilder.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers.js */ "./node_modules/@sentry/browser/esm/helpers.js");
/* harmony import */ var _integrations_breadcrumbs_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./integrations/breadcrumbs.js */ "./node_modules/@sentry/browser/esm/integrations/breadcrumbs.js");






/**
 * The Sentry Browser SDK Client.
 *
 * @see BrowserOptions for documentation on configuration options.
 * @see SentryClient for usage documentation.
 */
class BrowserClient extends _sentry_core__WEBPACK_IMPORTED_MODULE_0__.BaseClient {
  /**
   * Creates a new Browser SDK instance.
   *
   * @param options Configuration options for this SDK.
   */
   constructor(options) {
    options._metadata = options._metadata || {};
    options._metadata.sdk = options._metadata.sdk || {
      name: 'sentry.javascript.browser',
      packages: [
        {
          name: 'npm:@sentry/browser',
          version: _sentry_core__WEBPACK_IMPORTED_MODULE_1__.SDK_VERSION,
        },
      ],
      version: _sentry_core__WEBPACK_IMPORTED_MODULE_1__.SDK_VERSION,
    };

    super(options);

    if (options.sendClientReports && _helpers_js__WEBPACK_IMPORTED_MODULE_2__.WINDOW.document) {
      _helpers_js__WEBPACK_IMPORTED_MODULE_2__.WINDOW.document.addEventListener('visibilitychange', () => {
        if (_helpers_js__WEBPACK_IMPORTED_MODULE_2__.WINDOW.document.visibilityState === 'hidden') {
          this._flushOutcomes();
        }
      });
    }
  }

  /**
   * @inheritDoc
   */
   eventFromException(exception, hint) {
    return (0,_eventbuilder_js__WEBPACK_IMPORTED_MODULE_3__.eventFromException)(this._options.stackParser, exception, hint, this._options.attachStacktrace);
  }

  /**
   * @inheritDoc
   */
   eventFromMessage(
    message,
    // eslint-disable-next-line deprecation/deprecation
    level = 'info',
    hint,
  ) {
    return (0,_eventbuilder_js__WEBPACK_IMPORTED_MODULE_3__.eventFromMessage)(this._options.stackParser, message, level, hint, this._options.attachStacktrace);
  }

  /**
   * @inheritDoc
   */
   sendEvent(event, hint) {
    // We only want to add the sentry event breadcrumb when the user has the breadcrumb integration installed and
    // activated its `sentry` option.
    // We also do not want to use the `Breadcrumbs` class here directly, because we do not want it to be included in
    // bundles, if it is not used by the SDK.
    // This all sadly is a bit ugly, but we currently don't have a "pre-send" hook on the integrations so we do it this
    // way for now.
    const breadcrumbIntegration = this.getIntegrationById(_integrations_breadcrumbs_js__WEBPACK_IMPORTED_MODULE_4__.BREADCRUMB_INTEGRATION_ID) ;
    if (
      breadcrumbIntegration &&
      // We check for definedness of `options`, even though it is not strictly necessary, because that access to
      // `.sentry` below does not throw, in case users provided their own integration with id "Breadcrumbs" that does
      // not have an`options` field
      breadcrumbIntegration.options &&
      breadcrumbIntegration.options.sentry
    ) {
      (0,_sentry_core__WEBPACK_IMPORTED_MODULE_5__.getCurrentHub)().addBreadcrumb(
        {
          category: `sentry.${event.type === 'transaction' ? 'transaction' : 'event'}`,
          event_id: event.event_id,
          level: event.level,
          message: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_6__.getEventDescription)(event),
        },
        {
          event,
        },
      );
    }

    super.sendEvent(event, hint);
  }

  /**
   * @inheritDoc
   */
   _prepareEvent(event, hint, scope) {
    event.platform = event.platform || 'javascript';
    return super._prepareEvent(event, hint, scope);
  }

  /**
   * Sends client reports as an envelope.
   */
   _flushOutcomes() {
    const outcomes = this._clearOutcomes();

    if (outcomes.length === 0) {
      (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) && _sentry_utils__WEBPACK_IMPORTED_MODULE_7__.logger.log('No outcomes to send');
      return;
    }

    if (!this._dsn) {
      (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) && _sentry_utils__WEBPACK_IMPORTED_MODULE_7__.logger.log('No dsn provided, will not send outcomes');
      return;
    }

    (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) && _sentry_utils__WEBPACK_IMPORTED_MODULE_7__.logger.log('Sending outcomes:', outcomes);

    const url = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_8__.getEnvelopeEndpointWithUrlEncodedAuth)(this._dsn, this._options);
    const envelope = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_9__.createClientReportEnvelope)(outcomes, this._options.tunnel && (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_10__.dsnToString)(this._dsn));

    try {
      const isRealNavigator = Object.prototype.toString.call(_helpers_js__WEBPACK_IMPORTED_MODULE_2__.WINDOW && _helpers_js__WEBPACK_IMPORTED_MODULE_2__.WINDOW.navigator) === '[object Navigator]';
      const hasSendBeacon = isRealNavigator && typeof _helpers_js__WEBPACK_IMPORTED_MODULE_2__.WINDOW.navigator.sendBeacon === 'function';
      // Make sure beacon is not used if user configures custom transport options
      if (hasSendBeacon && !this._options.transportOptions) {
        // Prevent illegal invocations - https://xgwang.me/posts/you-may-not-know-beacon/#it-may-throw-error%2C-be-sure-to-catch
        const sendBeacon = _helpers_js__WEBPACK_IMPORTED_MODULE_2__.WINDOW.navigator.sendBeacon.bind(_helpers_js__WEBPACK_IMPORTED_MODULE_2__.WINDOW.navigator);
        sendBeacon(url, (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_11__.serializeEnvelope)(envelope));
      } else {
        // If beacon is not supported or if they are using the tunnel option
        // use our regular transport to send client reports to Sentry.
        this._sendEnvelope(envelope);
      }
    } catch (e) {
      (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) && _sentry_utils__WEBPACK_IMPORTED_MODULE_7__.logger.error(e);
    }
  }
}


//# sourceMappingURL=client.js.map


/***/ }),

/***/ "./node_modules/@sentry/browser/esm/eventbuilder.js":
/*!**********************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/eventbuilder.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eventFromError": () => (/* binding */ eventFromError),
/* harmony export */   "eventFromException": () => (/* binding */ eventFromException),
/* harmony export */   "eventFromMessage": () => (/* binding */ eventFromMessage),
/* harmony export */   "eventFromPlainObject": () => (/* binding */ eventFromPlainObject),
/* harmony export */   "eventFromString": () => (/* binding */ eventFromString),
/* harmony export */   "eventFromUnknownInput": () => (/* binding */ eventFromUnknownInput),
/* harmony export */   "exceptionFromError": () => (/* binding */ exceptionFromError),
/* harmony export */   "parseStackFrames": () => (/* binding */ parseStackFrames)
/* harmony export */ });
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/hub.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/is.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/object.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/normalize.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/syncpromise.js");



/**
 * This function creates an exception from a JavaScript Error
 */
function exceptionFromError(stackParser, ex) {
  // Get the frames first since Opera can lose the stack if we touch anything else first
  const frames = parseStackFrames(stackParser, ex);

  const exception = {
    type: ex && ex.name,
    value: extractMessage(ex),
  };

  if (frames.length) {
    exception.stacktrace = { frames };
  }

  if (exception.type === undefined && exception.value === '') {
    exception.value = 'Unrecoverable error caught';
  }

  return exception;
}

/**
 * @hidden
 */
function eventFromPlainObject(
  stackParser,
  exception,
  syntheticException,
  isUnhandledRejection,
) {
  const hub = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.getCurrentHub)();
  const client = hub.getClient();
  const normalizeDepth = client && client.getOptions().normalizeDepth;

  const event = {
    exception: {
      values: [
        {
          type: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.isEvent)(exception) ? exception.constructor.name : isUnhandledRejection ? 'UnhandledRejection' : 'Error',
          value: `Non-Error ${
            isUnhandledRejection ? 'promise rejection' : 'exception'
          } captured with keys: ${(0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.extractExceptionKeysForMessage)(exception)}`,
        },
      ],
    },
    extra: {
      __serialized__: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.normalizeToSize)(exception, normalizeDepth),
    },
  };

  if (syntheticException) {
    const frames = parseStackFrames(stackParser, syntheticException);
    if (frames.length) {
      // event.exception.values[0] has been set above
      (event.exception ).values[0].stacktrace = { frames };
    }
  }

  return event;
}

/**
 * @hidden
 */
function eventFromError(stackParser, ex) {
  return {
    exception: {
      values: [exceptionFromError(stackParser, ex)],
    },
  };
}

/** Parses stack frames from an error */
function parseStackFrames(
  stackParser,
  ex,
) {
  // Access and store the stacktrace property before doing ANYTHING
  // else to it because Opera is not very good at providing it
  // reliably in other circumstances.
  const stacktrace = ex.stacktrace || ex.stack || '';

  const popSize = getPopSize(ex);

  try {
    return stackParser(stacktrace, popSize);
  } catch (e) {
    // no-empty
  }

  return [];
}

// Based on our own mapping pattern - https://github.com/getsentry/sentry/blob/9f08305e09866c8bd6d0c24f5b0aabdd7dd6c59c/src/sentry/lang/javascript/errormapping.py#L83-L108
const reactMinifiedRegexp = /Minified React error #\d+;/i;

function getPopSize(ex) {
  if (ex) {
    if (typeof ex.framesToPop === 'number') {
      return ex.framesToPop;
    }

    if (reactMinifiedRegexp.test(ex.message)) {
      return 1;
    }
  }

  return 0;
}

/**
 * There are cases where stacktrace.message is an Event object
 * https://github.com/getsentry/sentry-javascript/issues/1949
 * In this specific case we try to extract stacktrace.message.error.message
 */
function extractMessage(ex) {
  const message = ex && ex.message;
  if (!message) {
    return 'No error message';
  }
  if (message.error && typeof message.error.message === 'string') {
    return message.error.message;
  }
  return message;
}

/**
 * Creates an {@link Event} from all inputs to `captureException` and non-primitive inputs to `captureMessage`.
 * @hidden
 */
function eventFromException(
  stackParser,
  exception,
  hint,
  attachStacktrace,
) {
  const syntheticException = (hint && hint.syntheticException) || undefined;
  const event = eventFromUnknownInput(stackParser, exception, syntheticException, attachStacktrace);
  (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_4__.addExceptionMechanism)(event); // defaults to { type: 'generic', handled: true }
  event.level = 'error';
  if (hint && hint.event_id) {
    event.event_id = hint.event_id;
  }
  return (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.resolvedSyncPromise)(event);
}

/**
 * Builds and Event from a Message
 * @hidden
 */
function eventFromMessage(
  stackParser,
  message,
  // eslint-disable-next-line deprecation/deprecation
  level = 'info',
  hint,
  attachStacktrace,
) {
  const syntheticException = (hint && hint.syntheticException) || undefined;
  const event = eventFromString(stackParser, message, syntheticException, attachStacktrace);
  event.level = level;
  if (hint && hint.event_id) {
    event.event_id = hint.event_id;
  }
  return (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.resolvedSyncPromise)(event);
}

/**
 * @hidden
 */
function eventFromUnknownInput(
  stackParser,
  exception,
  syntheticException,
  attachStacktrace,
  isUnhandledRejection,
) {
  let event;

  if ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.isErrorEvent)(exception ) && (exception ).error) {
    // If it is an ErrorEvent with `error` property, extract it to get actual Error
    const errorEvent = exception ;
    return eventFromError(stackParser, errorEvent.error );
  }

  // If it is a `DOMError` (which is a legacy API, but still supported in some browsers) then we just extract the name
  // and message, as it doesn't provide anything else. According to the spec, all `DOMExceptions` should also be
  // `Error`s, but that's not the case in IE11, so in that case we treat it the same as we do a `DOMError`.
  //
  // https://developer.mozilla.org/en-US/docs/Web/API/DOMError
  // https://developer.mozilla.org/en-US/docs/Web/API/DOMException
  // https://webidl.spec.whatwg.org/#es-DOMException-specialness
  if ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.isDOMError)(exception ) || (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.isDOMException)(exception )) {
    const domException = exception ;

    if ('stack' in (exception )) {
      event = eventFromError(stackParser, exception );
    } else {
      const name = domException.name || ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.isDOMError)(domException) ? 'DOMError' : 'DOMException');
      const message = domException.message ? `${name}: ${domException.message}` : name;
      event = eventFromString(stackParser, message, syntheticException, attachStacktrace);
      (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_4__.addExceptionTypeValue)(event, message);
    }
    if ('code' in domException) {
      event.tags = { ...event.tags, 'DOMException.code': `${domException.code}` };
    }

    return event;
  }
  if ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.isError)(exception)) {
    // we have a real Error object, do nothing
    return eventFromError(stackParser, exception);
  }
  if ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.isPlainObject)(exception) || (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.isEvent)(exception)) {
    // If it's a plain object or an instance of `Event` (the built-in JS kind, not this SDK's `Event` type), serialize
    // it manually. This will allow us to group events based on top-level keys which is much better than creating a new
    // group on any key/value change.
    const objectException = exception ;
    event = eventFromPlainObject(stackParser, objectException, syntheticException, isUnhandledRejection);
    (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_4__.addExceptionMechanism)(event, {
      synthetic: true,
    });
    return event;
  }

  // If none of previous checks were valid, then it means that it's not:
  // - an instance of DOMError
  // - an instance of DOMException
  // - an instance of Event
  // - an instance of Error
  // - a valid ErrorEvent (one with an error property)
  // - a plain Object
  //
  // So bail out and capture it as a simple message:
  event = eventFromString(stackParser, exception , syntheticException, attachStacktrace);
  (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_4__.addExceptionTypeValue)(event, `${exception}`, undefined);
  (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_4__.addExceptionMechanism)(event, {
    synthetic: true,
  });

  return event;
}

/**
 * @hidden
 */
function eventFromString(
  stackParser,
  input,
  syntheticException,
  attachStacktrace,
) {
  const event = {
    message: input,
  };

  if (attachStacktrace && syntheticException) {
    const frames = parseStackFrames(stackParser, syntheticException);
    if (frames.length) {
      event.exception = {
        values: [{ value: input, stacktrace: { frames } }],
      };
    }
  }

  return event;
}


//# sourceMappingURL=eventbuilder.js.map


/***/ }),

/***/ "./node_modules/@sentry/browser/esm/helpers.js":
/*!*****************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/helpers.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WINDOW": () => (/* binding */ WINDOW),
/* harmony export */   "ignoreNextOnError": () => (/* binding */ ignoreNextOnError),
/* harmony export */   "shouldIgnoreOnError": () => (/* binding */ shouldIgnoreOnError),
/* harmony export */   "wrap": () => (/* binding */ wrap)
/* harmony export */ });
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/exports.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/worldwide.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/object.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");



const WINDOW = _sentry_utils__WEBPACK_IMPORTED_MODULE_0__.GLOBAL_OBJ ;

let ignoreOnError = 0;

/**
 * @hidden
 */
function shouldIgnoreOnError() {
  return ignoreOnError > 0;
}

/**
 * @hidden
 */
function ignoreNextOnError() {
  // onerror should trigger before setTimeout
  ignoreOnError += 1;
  setTimeout(() => {
    ignoreOnError -= 1;
  });
}

/**
 * Instruments the given function and sends an event to Sentry every time the
 * function throws an exception.
 *
 * @param fn A function to wrap. It is generally safe to pass an unbound function, because the returned wrapper always
 * has a correct `this` context.
 * @returns The wrapped function.
 * @hidden
 */
function wrap(
  fn,
  options

 = {},
  before,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) {
  // for future readers what this does is wrap a function and then create
  // a bi-directional wrapping between them.
  //
  // example: wrapped = wrap(original);
  //  original.__sentry_wrapped__ -> wrapped
  //  wrapped.__sentry_original__ -> original

  if (typeof fn !== 'function') {
    return fn;
  }

  try {
    // if we're dealing with a function that was previously wrapped, return
    // the original wrapper.
    const wrapper = fn.__sentry_wrapped__;
    if (wrapper) {
      return wrapper;
    }

    // We don't wanna wrap it twice
    if ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.getOriginalFunction)(fn)) {
      return fn;
    }
  } catch (e) {
    // Just accessing custom props in some Selenium environments
    // can cause a "Permission denied" exception (see raven-js#495).
    // Bail on wrapping and return the function as-is (defers to window.onerror).
    return fn;
  }

  /* eslint-disable prefer-rest-params */
  // It is important that `sentryWrapped` is not an arrow function to preserve the context of `this`
  const sentryWrapped = function () {
    const args = Array.prototype.slice.call(arguments);

    try {
      if (before && typeof before === 'function') {
        before.apply(this, arguments);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      const wrappedArguments = args.map((arg) => wrap(arg, options));

      // Attempt to invoke user-land function
      // NOTE: If you are a Sentry user, and you are seeing this stack frame, it
      //       means the sentry.javascript SDK caught an error invoking your application code. This
      //       is expected behavior and NOT indicative of a bug with sentry.javascript.
      return fn.apply(this, wrappedArguments);
    } catch (ex) {
      ignoreNextOnError();

      (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.withScope)((scope) => {
        scope.addEventProcessor((event) => {
          if (options.mechanism) {
            (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.addExceptionTypeValue)(event, undefined, undefined);
            (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.addExceptionMechanism)(event, options.mechanism);
          }

          event.extra = {
            ...event.extra,
            arguments: args,
          };

          return event;
        });

        (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.captureException)(ex);
      });

      throw ex;
    }
  };
  /* eslint-enable prefer-rest-params */

  // Accessing some objects may throw
  // ref: https://github.com/getsentry/sentry-javascript/issues/1168
  try {
    for (const property in fn) {
      if (Object.prototype.hasOwnProperty.call(fn, property)) {
        sentryWrapped[property] = fn[property];
      }
    }
  } catch (_oO) {} // eslint-disable-line no-empty

  // Signal that this function has been wrapped/filled already
  // for both debugging and to prevent it to being wrapped/filled twice
  (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.markFunctionWrapped)(sentryWrapped, fn);

  (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.addNonEnumerableProperty)(fn, '__sentry_wrapped__', sentryWrapped);

  // Restore original function name (not all browsers allow that)
  try {
    const descriptor = Object.getOwnPropertyDescriptor(sentryWrapped, 'name') ;
    if (descriptor.configurable) {
      Object.defineProperty(sentryWrapped, 'name', {
        get() {
          return fn.name;
        },
      });
    }
    // eslint-disable-next-line no-empty
  } catch (_oO) {}

  return sentryWrapped;
}

/**
 * All properties the report dialog supports
 */


//# sourceMappingURL=helpers.js.map


/***/ }),

/***/ "./node_modules/@sentry/browser/esm/index.js":
/*!***************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Breadcrumbs": () => (/* reexport safe */ _integrations_breadcrumbs_js__WEBPACK_IMPORTED_MODULE_15__.Breadcrumbs),
/* harmony export */   "BrowserClient": () => (/* reexport safe */ _client_js__WEBPACK_IMPORTED_MODULE_8__.BrowserClient),
/* harmony export */   "Dedupe": () => (/* reexport safe */ _integrations_dedupe_js__WEBPACK_IMPORTED_MODULE_18__.Dedupe),
/* harmony export */   "FunctionToString": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_0__.FunctionToString),
/* harmony export */   "GlobalHandlers": () => (/* reexport safe */ _integrations_globalhandlers_js__WEBPACK_IMPORTED_MODULE_13__.GlobalHandlers),
/* harmony export */   "HttpContext": () => (/* reexport safe */ _integrations_httpcontext_js__WEBPACK_IMPORTED_MODULE_17__.HttpContext),
/* harmony export */   "Hub": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_1__.Hub),
/* harmony export */   "InboundFilters": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_2__.InboundFilters),
/* harmony export */   "Integrations": () => (/* binding */ INTEGRATIONS),
/* harmony export */   "LinkedErrors": () => (/* reexport safe */ _integrations_linkederrors_js__WEBPACK_IMPORTED_MODULE_16__.LinkedErrors),
/* harmony export */   "SDK_VERSION": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_3__.SDK_VERSION),
/* harmony export */   "Scope": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_4__.Scope),
/* harmony export */   "TryCatch": () => (/* reexport safe */ _integrations_trycatch_js__WEBPACK_IMPORTED_MODULE_14__.TryCatch),
/* harmony export */   "WINDOW": () => (/* reexport safe */ _helpers_js__WEBPACK_IMPORTED_MODULE_7__.WINDOW),
/* harmony export */   "addBreadcrumb": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_5__.addBreadcrumb),
/* harmony export */   "addGlobalEventProcessor": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_4__.addGlobalEventProcessor),
/* harmony export */   "captureEvent": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_5__.captureEvent),
/* harmony export */   "captureException": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_5__.captureException),
/* harmony export */   "captureMessage": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_5__.captureMessage),
/* harmony export */   "chromeStackLineParser": () => (/* reexport safe */ _stack_parsers_js__WEBPACK_IMPORTED_MODULE_11__.chromeStackLineParser),
/* harmony export */   "close": () => (/* reexport safe */ _sdk_js__WEBPACK_IMPORTED_MODULE_12__.close),
/* harmony export */   "configureScope": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_5__.configureScope),
/* harmony export */   "createTransport": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_6__.createTransport),
/* harmony export */   "defaultIntegrations": () => (/* reexport safe */ _sdk_js__WEBPACK_IMPORTED_MODULE_12__.defaultIntegrations),
/* harmony export */   "defaultStackLineParsers": () => (/* reexport safe */ _stack_parsers_js__WEBPACK_IMPORTED_MODULE_11__.defaultStackLineParsers),
/* harmony export */   "defaultStackParser": () => (/* reexport safe */ _stack_parsers_js__WEBPACK_IMPORTED_MODULE_11__.defaultStackParser),
/* harmony export */   "flush": () => (/* reexport safe */ _sdk_js__WEBPACK_IMPORTED_MODULE_12__.flush),
/* harmony export */   "forceLoad": () => (/* reexport safe */ _sdk_js__WEBPACK_IMPORTED_MODULE_12__.forceLoad),
/* harmony export */   "geckoStackLineParser": () => (/* reexport safe */ _stack_parsers_js__WEBPACK_IMPORTED_MODULE_11__.geckoStackLineParser),
/* harmony export */   "getCurrentHub": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_1__.getCurrentHub),
/* harmony export */   "getHubFromCarrier": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_1__.getHubFromCarrier),
/* harmony export */   "init": () => (/* reexport safe */ _sdk_js__WEBPACK_IMPORTED_MODULE_12__.init),
/* harmony export */   "lastEventId": () => (/* reexport safe */ _sdk_js__WEBPACK_IMPORTED_MODULE_12__.lastEventId),
/* harmony export */   "makeFetchTransport": () => (/* reexport safe */ _transports_fetch_js__WEBPACK_IMPORTED_MODULE_9__.makeFetchTransport),
/* harmony export */   "makeMain": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_1__.makeMain),
/* harmony export */   "makeXHRTransport": () => (/* reexport safe */ _transports_xhr_js__WEBPACK_IMPORTED_MODULE_10__.makeXHRTransport),
/* harmony export */   "onLoad": () => (/* reexport safe */ _sdk_js__WEBPACK_IMPORTED_MODULE_12__.onLoad),
/* harmony export */   "opera10StackLineParser": () => (/* reexport safe */ _stack_parsers_js__WEBPACK_IMPORTED_MODULE_11__.opera10StackLineParser),
/* harmony export */   "opera11StackLineParser": () => (/* reexport safe */ _stack_parsers_js__WEBPACK_IMPORTED_MODULE_11__.opera11StackLineParser),
/* harmony export */   "setContext": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_5__.setContext),
/* harmony export */   "setExtra": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_5__.setExtra),
/* harmony export */   "setExtras": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_5__.setExtras),
/* harmony export */   "setTag": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_5__.setTag),
/* harmony export */   "setTags": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_5__.setTags),
/* harmony export */   "setUser": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_5__.setUser),
/* harmony export */   "showReportDialog": () => (/* reexport safe */ _sdk_js__WEBPACK_IMPORTED_MODULE_12__.showReportDialog),
/* harmony export */   "startTransaction": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_5__.startTransaction),
/* harmony export */   "winjsStackLineParser": () => (/* reexport safe */ _stack_parsers_js__WEBPACK_IMPORTED_MODULE_11__.winjsStackLineParser),
/* harmony export */   "withScope": () => (/* reexport safe */ _sentry_core__WEBPACK_IMPORTED_MODULE_5__.withScope),
/* harmony export */   "wrap": () => (/* reexport safe */ _sdk_js__WEBPACK_IMPORTED_MODULE_12__.wrap)
/* harmony export */ });
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/integrations/index.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/integrations/functiontostring.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/hub.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/integrations/inboundfilters.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/version.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/scope.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/exports.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/transports/base.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./helpers.js */ "./node_modules/@sentry/browser/esm/helpers.js");
/* harmony import */ var _integrations_index_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./integrations/index.js */ "./node_modules/@sentry/browser/esm/integrations/index.js");
/* harmony import */ var _client_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./client.js */ "./node_modules/@sentry/browser/esm/client.js");
/* harmony import */ var _transports_fetch_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./transports/fetch.js */ "./node_modules/@sentry/browser/esm/transports/fetch.js");
/* harmony import */ var _transports_xhr_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./transports/xhr.js */ "./node_modules/@sentry/browser/esm/transports/xhr.js");
/* harmony import */ var _stack_parsers_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./stack-parsers.js */ "./node_modules/@sentry/browser/esm/stack-parsers.js");
/* harmony import */ var _sdk_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./sdk.js */ "./node_modules/@sentry/browser/esm/sdk.js");
/* harmony import */ var _integrations_globalhandlers_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./integrations/globalhandlers.js */ "./node_modules/@sentry/browser/esm/integrations/globalhandlers.js");
/* harmony import */ var _integrations_trycatch_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./integrations/trycatch.js */ "./node_modules/@sentry/browser/esm/integrations/trycatch.js");
/* harmony import */ var _integrations_breadcrumbs_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./integrations/breadcrumbs.js */ "./node_modules/@sentry/browser/esm/integrations/breadcrumbs.js");
/* harmony import */ var _integrations_linkederrors_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./integrations/linkederrors.js */ "./node_modules/@sentry/browser/esm/integrations/linkederrors.js");
/* harmony import */ var _integrations_httpcontext_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./integrations/httpcontext.js */ "./node_modules/@sentry/browser/esm/integrations/httpcontext.js");
/* harmony import */ var _integrations_dedupe_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./integrations/dedupe.js */ "./node_modules/@sentry/browser/esm/integrations/dedupe.js");


















let windowIntegrations = {};

// This block is needed to add compatibility with the integrations packages when used with a CDN
if (_helpers_js__WEBPACK_IMPORTED_MODULE_7__.WINDOW.Sentry && _helpers_js__WEBPACK_IMPORTED_MODULE_7__.WINDOW.Sentry.Integrations) {
  windowIntegrations = _helpers_js__WEBPACK_IMPORTED_MODULE_7__.WINDOW.Sentry.Integrations;
}

const INTEGRATIONS = {
  ...windowIntegrations,
  ..._sentry_core__WEBPACK_IMPORTED_MODULE_19__,
  ..._integrations_index_js__WEBPACK_IMPORTED_MODULE_20__,
};


//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/@sentry/browser/esm/integrations/breadcrumbs.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/integrations/breadcrumbs.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BREADCRUMB_INTEGRATION_ID": () => (/* binding */ BREADCRUMB_INTEGRATION_ID),
/* harmony export */   "Breadcrumbs": () => (/* binding */ Breadcrumbs)
/* harmony export */ });
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/hub.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/instrument.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/browser.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/severity.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/string.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/url.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../helpers.js */ "./node_modules/@sentry/browser/esm/helpers.js");




/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/** JSDoc */

const BREADCRUMB_INTEGRATION_ID = 'Breadcrumbs';

/**
 * Default Breadcrumbs instrumentations
 * TODO: Deprecated - with v6, this will be renamed to `Instrument`
 */
class Breadcrumbs  {
  /**
   * @inheritDoc
   */
   static __initStatic() {this.id = BREADCRUMB_INTEGRATION_ID;}

  /**
   * @inheritDoc
   */
   __init() {this.name = Breadcrumbs.id;}

  /**
   * Options of the breadcrumbs integration.
   */
  // This field is public, because we use it in the browser client to check if the `sentry` option is enabled.

  /**
   * @inheritDoc
   */
   constructor(options) {;Breadcrumbs.prototype.__init.call(this);
    this.options = {
      console: true,
      dom: true,
      fetch: true,
      history: true,
      sentry: true,
      xhr: true,
      ...options,
    };
  }

  /**
   * Instrument browser built-ins w/ breadcrumb capturing
   *  - Console API
   *  - DOM API (click/typing)
   *  - XMLHttpRequest API
   *  - Fetch API
   *  - History API
   */
   setupOnce() {
    if (this.options.console) {
      (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.addInstrumentationHandler)('console', _consoleBreadcrumb);
    }
    if (this.options.dom) {
      (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.addInstrumentationHandler)('dom', _domBreadcrumb(this.options.dom));
    }
    if (this.options.xhr) {
      (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.addInstrumentationHandler)('xhr', _xhrBreadcrumb);
    }
    if (this.options.fetch) {
      (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.addInstrumentationHandler)('fetch', _fetchBreadcrumb);
    }
    if (this.options.history) {
      (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.addInstrumentationHandler)('history', _historyBreadcrumb);
    }
  }
} Breadcrumbs.__initStatic();

/**
 * A HOC that creaes a function that creates breadcrumbs from DOM API calls.
 * This is a HOC so that we get access to dom options in the closure.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _domBreadcrumb(dom) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function _innerDomBreadcrumb(handlerData) {
    let target;
    let keyAttrs = typeof dom === 'object' ? dom.serializeAttribute : undefined;

    if (typeof keyAttrs === 'string') {
      keyAttrs = [keyAttrs];
    }

    // Accessing event.target can throw (see getsentry/raven-js#838, #768)
    try {
      target = handlerData.event.target
        ? (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.htmlTreeAsString)(handlerData.event.target , keyAttrs)
        : (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.htmlTreeAsString)(handlerData.event , keyAttrs);
    } catch (e) {
      target = '<unknown>';
    }

    if (target.length === 0) {
      return;
    }

    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.getCurrentHub)().addBreadcrumb(
      {
        category: `ui.${handlerData.name}`,
        message: target,
      },
      {
        event: handlerData.event,
        name: handlerData.name,
        global: handlerData.global,
      },
    );
  }

  return _innerDomBreadcrumb;
}

/**
 * Creates breadcrumbs from console API calls
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _consoleBreadcrumb(handlerData) {
  // This is a hack to fix a Vue3-specific bug that causes an infinite loop of
  // console warnings. This happens when a Vue template is rendered with
  // an undeclared variable, which we try to stringify, ultimately causing
  // Vue to issue another warning which repeats indefinitely.
  // see: https://github.com/getsentry/sentry-javascript/pull/6010
  // see: https://github.com/getsentry/sentry-javascript/issues/5916
  for (let i = 0; i < handlerData.args.length; i++) {
    if (handlerData.args[i] === 'ref=Ref<') {
      handlerData.args[i + 1] = 'viewRef';
      break;
    }
  }
  const breadcrumb = {
    category: 'console',
    data: {
      arguments: handlerData.args,
      logger: 'console',
    },
    level: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.severityLevelFromString)(handlerData.level),
    message: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_4__.safeJoin)(handlerData.args, ' '),
  };

  if (handlerData.level === 'assert') {
    if (handlerData.args[0] === false) {
      breadcrumb.message = `Assertion failed: ${(0,_sentry_utils__WEBPACK_IMPORTED_MODULE_4__.safeJoin)(handlerData.args.slice(1), ' ') || 'console.assert'}`;
      breadcrumb.data.arguments = handlerData.args.slice(1);
    } else {
      // Don't capture a breadcrumb for passed assertions
      return;
    }
  }

  (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.getCurrentHub)().addBreadcrumb(breadcrumb, {
    input: handlerData.args,
    level: handlerData.level,
  });
}

/**
 * Creates breadcrumbs from XHR API calls
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _xhrBreadcrumb(handlerData) {
  if (handlerData.endTimestamp) {
    // We only capture complete, non-sentry requests
    if (handlerData.xhr.__sentry_own_request__) {
      return;
    }

    const { method, url, status_code, body } = handlerData.xhr.__sentry_xhr__ || {};

    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.getCurrentHub)().addBreadcrumb(
      {
        category: 'xhr',
        data: {
          method,
          url,
          status_code,
        },
        type: 'http',
      },
      {
        xhr: handlerData.xhr,
        input: body,
      },
    );

    return;
  }
}

/**
 * Creates breadcrumbs from fetch API calls
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _fetchBreadcrumb(handlerData) {
  // We only capture complete fetch requests
  if (!handlerData.endTimestamp) {
    return;
  }

  if (handlerData.fetchData.url.match(/sentry_key/) && handlerData.fetchData.method === 'POST') {
    // We will not create breadcrumbs for fetch requests that contain `sentry_key` (internal sentry requests)
    return;
  }

  if (handlerData.error) {
    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.getCurrentHub)().addBreadcrumb(
      {
        category: 'fetch',
        data: handlerData.fetchData,
        level: 'error',
        type: 'http',
      },
      {
        data: handlerData.error,
        input: handlerData.args,
      },
    );
  } else {
    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.getCurrentHub)().addBreadcrumb(
      {
        category: 'fetch',
        data: {
          ...handlerData.fetchData,
          status_code: handlerData.response.status,
        },
        type: 'http',
      },
      {
        input: handlerData.args,
        response: handlerData.response,
      },
    );
  }
}

/**
 * Creates breadcrumbs from history API calls
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _historyBreadcrumb(handlerData) {
  let from = handlerData.from;
  let to = handlerData.to;
  const parsedLoc = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.parseUrl)(_helpers_js__WEBPACK_IMPORTED_MODULE_6__.WINDOW.location.href);
  let parsedFrom = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.parseUrl)(from);
  const parsedTo = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.parseUrl)(to);

  // Initial pushState doesn't provide `from` information
  if (!parsedFrom.path) {
    parsedFrom = parsedLoc;
  }

  // Use only the path component of the URL if the URL matches the current
  // document (almost all the time when using pushState)
  if (parsedLoc.protocol === parsedTo.protocol && parsedLoc.host === parsedTo.host) {
    to = parsedTo.relative;
  }
  if (parsedLoc.protocol === parsedFrom.protocol && parsedLoc.host === parsedFrom.host) {
    from = parsedFrom.relative;
  }

  (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.getCurrentHub)().addBreadcrumb({
    category: 'navigation',
    data: {
      from,
      to,
    },
  });
}


//# sourceMappingURL=breadcrumbs.js.map


/***/ }),

/***/ "./node_modules/@sentry/browser/esm/integrations/dedupe.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/integrations/dedupe.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Dedupe": () => (/* binding */ Dedupe)
/* harmony export */ });
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/logger.js");


/** Deduplication filter */
class Dedupe  {constructor() { Dedupe.prototype.__init.call(this); }
  /**
   * @inheritDoc
   */
   static __initStatic() {this.id = 'Dedupe';}

  /**
   * @inheritDoc
   */
   __init() {this.name = Dedupe.id;}

  /**
   * @inheritDoc
   */

  /**
   * @inheritDoc
   */
   setupOnce(addGlobalEventProcessor, getCurrentHub) {
    const eventProcessor = currentEvent => {
      const self = getCurrentHub().getIntegration(Dedupe);
      if (self) {
        // Juuust in case something goes wrong
        try {
          if (_shouldDropEvent(currentEvent, self._previousEvent)) {
            (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) && _sentry_utils__WEBPACK_IMPORTED_MODULE_0__.logger.warn('Event dropped due to being a duplicate of previously captured event.');
            return null;
          }
        } catch (_oO) {
          return (self._previousEvent = currentEvent);
        }

        return (self._previousEvent = currentEvent);
      }
      return currentEvent;
    };

    eventProcessor.id = this.name;
    addGlobalEventProcessor(eventProcessor);
  }
} Dedupe.__initStatic();

/** JSDoc */
function _shouldDropEvent(currentEvent, previousEvent) {
  if (!previousEvent) {
    return false;
  }

  if (_isSameMessageEvent(currentEvent, previousEvent)) {
    return true;
  }

  if (_isSameExceptionEvent(currentEvent, previousEvent)) {
    return true;
  }

  return false;
}

/** JSDoc */
function _isSameMessageEvent(currentEvent, previousEvent) {
  const currentMessage = currentEvent.message;
  const previousMessage = previousEvent.message;

  // If neither event has a message property, they were both exceptions, so bail out
  if (!currentMessage && !previousMessage) {
    return false;
  }

  // If only one event has a stacktrace, but not the other one, they are not the same
  if ((currentMessage && !previousMessage) || (!currentMessage && previousMessage)) {
    return false;
  }

  if (currentMessage !== previousMessage) {
    return false;
  }

  if (!_isSameFingerprint(currentEvent, previousEvent)) {
    return false;
  }

  if (!_isSameStacktrace(currentEvent, previousEvent)) {
    return false;
  }

  return true;
}

/** JSDoc */
function _isSameExceptionEvent(currentEvent, previousEvent) {
  const previousException = _getExceptionFromEvent(previousEvent);
  const currentException = _getExceptionFromEvent(currentEvent);

  if (!previousException || !currentException) {
    return false;
  }

  if (previousException.type !== currentException.type || previousException.value !== currentException.value) {
    return false;
  }

  if (!_isSameFingerprint(currentEvent, previousEvent)) {
    return false;
  }

  if (!_isSameStacktrace(currentEvent, previousEvent)) {
    return false;
  }

  return true;
}

/** JSDoc */
function _isSameStacktrace(currentEvent, previousEvent) {
  let currentFrames = _getFramesFromEvent(currentEvent);
  let previousFrames = _getFramesFromEvent(previousEvent);

  // If neither event has a stacktrace, they are assumed to be the same
  if (!currentFrames && !previousFrames) {
    return true;
  }

  // If only one event has a stacktrace, but not the other one, they are not the same
  if ((currentFrames && !previousFrames) || (!currentFrames && previousFrames)) {
    return false;
  }

  currentFrames = currentFrames ;
  previousFrames = previousFrames ;

  // If number of frames differ, they are not the same
  if (previousFrames.length !== currentFrames.length) {
    return false;
  }

  // Otherwise, compare the two
  for (let i = 0; i < previousFrames.length; i++) {
    const frameA = previousFrames[i];
    const frameB = currentFrames[i];

    if (
      frameA.filename !== frameB.filename ||
      frameA.lineno !== frameB.lineno ||
      frameA.colno !== frameB.colno ||
      frameA.function !== frameB.function
    ) {
      return false;
    }
  }

  return true;
}

/** JSDoc */
function _isSameFingerprint(currentEvent, previousEvent) {
  let currentFingerprint = currentEvent.fingerprint;
  let previousFingerprint = previousEvent.fingerprint;

  // If neither event has a fingerprint, they are assumed to be the same
  if (!currentFingerprint && !previousFingerprint) {
    return true;
  }

  // If only one event has a fingerprint, but not the other one, they are not the same
  if ((currentFingerprint && !previousFingerprint) || (!currentFingerprint && previousFingerprint)) {
    return false;
  }

  currentFingerprint = currentFingerprint ;
  previousFingerprint = previousFingerprint ;

  // Otherwise, compare the two
  try {
    return !!(currentFingerprint.join('') === previousFingerprint.join(''));
  } catch (_oO) {
    return false;
  }
}

/** JSDoc */
function _getExceptionFromEvent(event) {
  return event.exception && event.exception.values && event.exception.values[0];
}

/** JSDoc */
function _getFramesFromEvent(event) {
  const exception = event.exception;

  if (exception) {
    try {
      // @ts-ignore Object could be undefined
      return exception.values[0].stacktrace.frames;
    } catch (_oO) {
      return undefined;
    }
  }
  return undefined;
}


//# sourceMappingURL=dedupe.js.map


/***/ }),

/***/ "./node_modules/@sentry/browser/esm/integrations/globalhandlers.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/integrations/globalhandlers.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GlobalHandlers": () => (/* binding */ GlobalHandlers)
/* harmony export */ });
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/hub.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/instrument.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/is.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/browser.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/logger.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _eventbuilder_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../eventbuilder.js */ "./node_modules/@sentry/browser/esm/eventbuilder.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers.js */ "./node_modules/@sentry/browser/esm/helpers.js");





/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/** Global handlers */
class GlobalHandlers  {
  /**
   * @inheritDoc
   */
   static __initStatic() {this.id = 'GlobalHandlers';}

  /**
   * @inheritDoc
   */
   __init() {this.name = GlobalHandlers.id;}

  /** JSDoc */

  /**
   * Stores references functions to installing handlers. Will set to undefined
   * after they have been run so that they are not used twice.
   */
   __init2() {this._installFunc = {
    onerror: _installGlobalOnErrorHandler,
    onunhandledrejection: _installGlobalOnUnhandledRejectionHandler,
  };}

  /** JSDoc */
   constructor(options) {;GlobalHandlers.prototype.__init.call(this);GlobalHandlers.prototype.__init2.call(this);
    this._options = {
      onerror: true,
      onunhandledrejection: true,
      ...options,
    };
  }
  /**
   * @inheritDoc
   */
   setupOnce() {
    Error.stackTraceLimit = 50;
    const options = this._options;

    // We can disable guard-for-in as we construct the options object above + do checks against
    // `this._installFunc` for the property.
    // eslint-disable-next-line guard-for-in
    for (const key in options) {
      const installFunc = this._installFunc[key ];
      if (installFunc && options[key ]) {
        globalHandlerLog(key);
        installFunc();
        this._installFunc[key ] = undefined;
      }
    }
  }
} GlobalHandlers.__initStatic();

/** JSDoc */
function _installGlobalOnErrorHandler() {
  (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.addInstrumentationHandler)(
    'error',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (data) => {
      const [hub, stackParser, attachStacktrace] = getHubAndOptions();
      if (!hub.getIntegration(GlobalHandlers)) {
        return;
      }
      const { msg, url, line, column, error } = data;
      if ((0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.shouldIgnoreOnError)() || (error && error.__sentry_own_request__)) {
        return;
      }

      const event =
        error === undefined && (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.isString)(msg)
          ? _eventFromIncompleteOnError(msg, url, line, column)
          : _enhanceEventWithInitialFrame(
              (0,_eventbuilder_js__WEBPACK_IMPORTED_MODULE_3__.eventFromUnknownInput)(stackParser, error || msg, undefined, attachStacktrace, false),
              url,
              line,
              column,
            );

      event.level = 'error';

      addMechanismAndCapture(hub, error, event, 'onerror');
    },
  );
}

/** JSDoc */
function _installGlobalOnUnhandledRejectionHandler() {
  (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.addInstrumentationHandler)(
    'unhandledrejection',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e) => {
      const [hub, stackParser, attachStacktrace] = getHubAndOptions();
      if (!hub.getIntegration(GlobalHandlers)) {
        return;
      }
      let error = e;

      // dig the object of the rejection out of known event types
      try {
        // PromiseRejectionEvents store the object of the rejection under 'reason'
        // see https://developer.mozilla.org/en-US/docs/Web/API/PromiseRejectionEvent
        if ('reason' in e) {
          error = e.reason;
        }
        // something, somewhere, (likely a browser extension) effectively casts PromiseRejectionEvents
        // to CustomEvents, moving the `promise` and `reason` attributes of the PRE into
        // the CustomEvent's `detail` attribute, since they're not part of CustomEvent's spec
        // see https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent and
        // https://github.com/getsentry/sentry-javascript/issues/2380
        else if ('detail' in e && 'reason' in e.detail) {
          error = e.detail.reason;
        }
      } catch (_oO) {
        // no-empty
      }

      if ((0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.shouldIgnoreOnError)() || (error && error.__sentry_own_request__)) {
        return true;
      }

      const event = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.isPrimitive)(error)
        ? _eventFromRejectionWithPrimitive(error)
        : (0,_eventbuilder_js__WEBPACK_IMPORTED_MODULE_3__.eventFromUnknownInput)(stackParser, error, undefined, attachStacktrace, true);

      event.level = 'error';

      addMechanismAndCapture(hub, error, event, 'onunhandledrejection');
      return;
    },
  );
}

/**
 * Create an event from a promise rejection where the `reason` is a primitive.
 *
 * @param reason: The `reason` property of the promise rejection
 * @returns An Event object with an appropriate `exception` value
 */
function _eventFromRejectionWithPrimitive(reason) {
  return {
    exception: {
      values: [
        {
          type: 'UnhandledRejection',
          // String() is needed because the Primitive type includes symbols (which can't be automatically stringified)
          value: `Non-Error promise rejection captured with value: ${String(reason)}`,
        },
      ],
    },
  };
}

/**
 * This function creates a stack from an old, error-less onerror handler.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _eventFromIncompleteOnError(msg, url, line, column) {
  const ERROR_TYPES_RE =
    /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i;

  // If 'message' is ErrorEvent, get real message from inside
  let message = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.isErrorEvent)(msg) ? msg.message : msg;
  let name = 'Error';

  const groups = message.match(ERROR_TYPES_RE);
  if (groups) {
    name = groups[1];
    message = groups[2];
  }

  const event = {
    exception: {
      values: [
        {
          type: name,
          value: message,
        },
      ],
    },
  };

  return _enhanceEventWithInitialFrame(event, url, line, column);
}

/** JSDoc */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _enhanceEventWithInitialFrame(event, url, line, column) {
  // event.exception
  const e = (event.exception = event.exception || {});
  // event.exception.values
  const ev = (e.values = e.values || []);
  // event.exception.values[0]
  const ev0 = (ev[0] = ev[0] || {});
  // event.exception.values[0].stacktrace
  const ev0s = (ev0.stacktrace = ev0.stacktrace || {});
  // event.exception.values[0].stacktrace.frames
  const ev0sf = (ev0s.frames = ev0s.frames || []);

  const colno = isNaN(parseInt(column, 10)) ? undefined : column;
  const lineno = isNaN(parseInt(line, 10)) ? undefined : line;
  const filename = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.isString)(url) && url.length > 0 ? url : (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_4__.getLocationHref)();

  // event.exception.values[0].stacktrace.frames
  if (ev0sf.length === 0) {
    ev0sf.push({
      colno,
      filename,
      function: '?',
      in_app: true,
      lineno,
    });
  }

  return event;
}

function globalHandlerLog(type) {
  (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) && _sentry_utils__WEBPACK_IMPORTED_MODULE_5__.logger.log(`Global Handler attached: ${type}`);
}

function addMechanismAndCapture(hub, error, event, type) {
  (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_6__.addExceptionMechanism)(event, {
    handled: false,
    type,
  });
  hub.captureEvent(event, {
    originalException: error,
  });
}

function getHubAndOptions() {
  const hub = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_7__.getCurrentHub)();
  const client = hub.getClient();
  const options = (client && client.getOptions()) || {
    stackParser: () => [],
    attachStacktrace: false,
  };
  return [hub, options.stackParser, options.attachStacktrace];
}


//# sourceMappingURL=globalhandlers.js.map


/***/ }),

/***/ "./node_modules/@sentry/browser/esm/integrations/httpcontext.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/integrations/httpcontext.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HttpContext": () => (/* binding */ HttpContext)
/* harmony export */ });
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/scope.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/hub.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers.js */ "./node_modules/@sentry/browser/esm/helpers.js");



/** HttpContext integration collects information about HTTP request headers */
class HttpContext  {constructor() { HttpContext.prototype.__init.call(this); }
  /**
   * @inheritDoc
   */
   static __initStatic() {this.id = 'HttpContext';}

  /**
   * @inheritDoc
   */
   __init() {this.name = HttpContext.id;}

  /**
   * @inheritDoc
   */
   setupOnce() {
    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.addGlobalEventProcessor)((event) => {
      if ((0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.getCurrentHub)().getIntegration(HttpContext)) {
        // if none of the information we want exists, don't bother
        if (!_helpers_js__WEBPACK_IMPORTED_MODULE_2__.WINDOW.navigator && !_helpers_js__WEBPACK_IMPORTED_MODULE_2__.WINDOW.location && !_helpers_js__WEBPACK_IMPORTED_MODULE_2__.WINDOW.document) {
          return event;
        }

        // grab as much info as exists and add it to the event
        const url = (event.request && event.request.url) || (_helpers_js__WEBPACK_IMPORTED_MODULE_2__.WINDOW.location && _helpers_js__WEBPACK_IMPORTED_MODULE_2__.WINDOW.location.href);
        const { referrer } = _helpers_js__WEBPACK_IMPORTED_MODULE_2__.WINDOW.document || {};
        const { userAgent } = _helpers_js__WEBPACK_IMPORTED_MODULE_2__.WINDOW.navigator || {};

        const headers = {
          ...(event.request && event.request.headers),
          ...(referrer && { Referer: referrer }),
          ...(userAgent && { 'User-Agent': userAgent }),
        };
        const request = { ...(url && { url }), headers };

        return { ...event, request };
      }
      return event;
    });
  }
} HttpContext.__initStatic();


//# sourceMappingURL=httpcontext.js.map


/***/ }),

/***/ "./node_modules/@sentry/browser/esm/integrations/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/integrations/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Breadcrumbs": () => (/* reexport safe */ _breadcrumbs_js__WEBPACK_IMPORTED_MODULE_2__.Breadcrumbs),
/* harmony export */   "Dedupe": () => (/* reexport safe */ _dedupe_js__WEBPACK_IMPORTED_MODULE_5__.Dedupe),
/* harmony export */   "GlobalHandlers": () => (/* reexport safe */ _globalhandlers_js__WEBPACK_IMPORTED_MODULE_0__.GlobalHandlers),
/* harmony export */   "HttpContext": () => (/* reexport safe */ _httpcontext_js__WEBPACK_IMPORTED_MODULE_4__.HttpContext),
/* harmony export */   "LinkedErrors": () => (/* reexport safe */ _linkederrors_js__WEBPACK_IMPORTED_MODULE_3__.LinkedErrors),
/* harmony export */   "TryCatch": () => (/* reexport safe */ _trycatch_js__WEBPACK_IMPORTED_MODULE_1__.TryCatch)
/* harmony export */ });
/* harmony import */ var _globalhandlers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globalhandlers.js */ "./node_modules/@sentry/browser/esm/integrations/globalhandlers.js");
/* harmony import */ var _trycatch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./trycatch.js */ "./node_modules/@sentry/browser/esm/integrations/trycatch.js");
/* harmony import */ var _breadcrumbs_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./breadcrumbs.js */ "./node_modules/@sentry/browser/esm/integrations/breadcrumbs.js");
/* harmony import */ var _linkederrors_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./linkederrors.js */ "./node_modules/@sentry/browser/esm/integrations/linkederrors.js");
/* harmony import */ var _httpcontext_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./httpcontext.js */ "./node_modules/@sentry/browser/esm/integrations/httpcontext.js");
/* harmony import */ var _dedupe_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dedupe.js */ "./node_modules/@sentry/browser/esm/integrations/dedupe.js");






//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/@sentry/browser/esm/integrations/linkederrors.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/integrations/linkederrors.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LinkedErrors": () => (/* binding */ LinkedErrors),
/* harmony export */   "_handler": () => (/* binding */ _handler),
/* harmony export */   "_walkErrorTree": () => (/* binding */ _walkErrorTree)
/* harmony export */ });
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/hub.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/scope.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/is.js");
/* harmony import */ var _eventbuilder_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../eventbuilder.js */ "./node_modules/@sentry/browser/esm/eventbuilder.js");




const DEFAULT_KEY = 'cause';
const DEFAULT_LIMIT = 5;

/** Adds SDK info to an event. */
class LinkedErrors  {
  /**
   * @inheritDoc
   */
   static __initStatic() {this.id = 'LinkedErrors';}

  /**
   * @inheritDoc
   */
    __init() {this.name = LinkedErrors.id;}

  /**
   * @inheritDoc
   */

  /**
   * @inheritDoc
   */

  /**
   * @inheritDoc
   */
   constructor(options = {}) {;LinkedErrors.prototype.__init.call(this);
    this._key = options.key || DEFAULT_KEY;
    this._limit = options.limit || DEFAULT_LIMIT;
  }

  /**
   * @inheritDoc
   */
   setupOnce() {
    const client = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.getCurrentHub)().getClient();
    if (!client) {
      return;
    }
    (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.addGlobalEventProcessor)((event, hint) => {
      const self = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_0__.getCurrentHub)().getIntegration(LinkedErrors);
      return self ? _handler(client.getOptions().stackParser, self._key, self._limit, event, hint) : event;
    });
  }
} LinkedErrors.__initStatic();

/**
 * @inheritDoc
 */
function _handler(
  parser,
  key,
  limit,
  event,
  hint,
) {
  if (!event.exception || !event.exception.values || !hint || !(0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.isInstanceOf)(hint.originalException, Error)) {
    return event;
  }
  const linkedErrors = _walkErrorTree(parser, limit, hint.originalException , key);
  event.exception.values = [...linkedErrors, ...event.exception.values];
  return event;
}

/**
 * JSDOC
 */
function _walkErrorTree(
  parser,
  limit,
  error,
  key,
  stack = [],
) {
  if (!(0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.isInstanceOf)(error[key], Error) || stack.length + 1 >= limit) {
    return stack;
  }
  const exception = (0,_eventbuilder_js__WEBPACK_IMPORTED_MODULE_3__.exceptionFromError)(parser, error[key]);
  return _walkErrorTree(parser, limit, error[key], key, [exception, ...stack]);
}


//# sourceMappingURL=linkederrors.js.map


/***/ }),

/***/ "./node_modules/@sentry/browser/esm/integrations/trycatch.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/integrations/trycatch.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TryCatch": () => (/* binding */ TryCatch)
/* harmony export */ });
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/object.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/stacktrace.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers.js */ "./node_modules/@sentry/browser/esm/helpers.js");



const DEFAULT_EVENT_TARGET = [
  'EventTarget',
  'Window',
  'Node',
  'ApplicationCache',
  'AudioTrackList',
  'ChannelMergerNode',
  'CryptoOperation',
  'EventSource',
  'FileReader',
  'HTMLUnknownElement',
  'IDBDatabase',
  'IDBRequest',
  'IDBTransaction',
  'KeyOperation',
  'MediaController',
  'MessagePort',
  'ModalWindow',
  'Notification',
  'SVGElementInstance',
  'Screen',
  'TextTrack',
  'TextTrackCue',
  'TextTrackList',
  'WebSocket',
  'WebSocketWorker',
  'Worker',
  'XMLHttpRequest',
  'XMLHttpRequestEventTarget',
  'XMLHttpRequestUpload',
];

/** Wrap timer functions and event targets to catch errors and provide better meta data */
class TryCatch  {
  /**
   * @inheritDoc
   */
   static __initStatic() {this.id = 'TryCatch';}

  /**
   * @inheritDoc
   */
   __init() {this.name = TryCatch.id;}

  /** JSDoc */

  /**
   * @inheritDoc
   */
   constructor(options) {;TryCatch.prototype.__init.call(this);
    this._options = {
      XMLHttpRequest: true,
      eventTarget: true,
      requestAnimationFrame: true,
      setInterval: true,
      setTimeout: true,
      ...options,
    };
  }

  /**
   * Wrap timer functions and event targets to catch errors
   * and provide better metadata.
   */
   setupOnce() {
    if (this._options.setTimeout) {
      (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.fill)(_helpers_js__WEBPACK_IMPORTED_MODULE_1__.WINDOW, 'setTimeout', _wrapTimeFunction);
    }

    if (this._options.setInterval) {
      (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.fill)(_helpers_js__WEBPACK_IMPORTED_MODULE_1__.WINDOW, 'setInterval', _wrapTimeFunction);
    }

    if (this._options.requestAnimationFrame) {
      (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.fill)(_helpers_js__WEBPACK_IMPORTED_MODULE_1__.WINDOW, 'requestAnimationFrame', _wrapRAF);
    }

    if (this._options.XMLHttpRequest && "XMLHttpRequest" in _helpers_js__WEBPACK_IMPORTED_MODULE_1__.WINDOW) {
      (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.fill)(XMLHttpRequest.prototype, 'send', _wrapXHR);
    }

    const eventTargetOption = this._options.eventTarget;
    if (eventTargetOption) {
      const eventTarget = Array.isArray(eventTargetOption) ? eventTargetOption : DEFAULT_EVENT_TARGET;
      eventTarget.forEach(_wrapEventTarget);
    }
  }
} TryCatch.__initStatic();

/** JSDoc */
function _wrapTimeFunction(original) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function ( ...args) {
    const originalCallback = args[0];
    args[0] = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.wrap)(originalCallback, {
      mechanism: {
        data: { function: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.getFunctionName)(original) },
        handled: true,
        type: 'instrument',
      },
    });
    return original.apply(this, args);
  };
}

/** JSDoc */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _wrapRAF(original) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function ( callback) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return original.apply(this, [
      (0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.wrap)(callback, {
        mechanism: {
          data: {
            function: 'requestAnimationFrame',
            handler: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.getFunctionName)(original),
          },
          handled: true,
          type: 'instrument',
        },
      }),
    ]);
  };
}

/** JSDoc */
function _wrapXHR(originalSend) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function ( ...args) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const xhr = this;
    const xmlHttpRequestProps = ['onload', 'onerror', 'onprogress', 'onreadystatechange'];

    xmlHttpRequestProps.forEach(prop => {
      if (prop in xhr && typeof xhr[prop] === 'function') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.fill)(xhr, prop, function (original) {
          const wrapOptions = {
            mechanism: {
              data: {
                function: prop,
                handler: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.getFunctionName)(original),
              },
              handled: true,
              type: 'instrument',
            },
          };

          // If Instrument integration has been called before TryCatch, get the name of original function
          const originalFunction = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.getOriginalFunction)(original);
          if (originalFunction) {
            wrapOptions.mechanism.data.handler = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.getFunctionName)(originalFunction);
          }

          // Otherwise wrap directly
          return (0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.wrap)(original, wrapOptions);
        });
      }
    });

    return originalSend.apply(this, args);
  };
}

/** JSDoc */
function _wrapEventTarget(target) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globalObject = _helpers_js__WEBPACK_IMPORTED_MODULE_1__.WINDOW ;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const proto = globalObject[target] && globalObject[target].prototype;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, no-prototype-builtins
  if (!proto || !proto.hasOwnProperty || !proto.hasOwnProperty('addEventListener')) {
    return;
  }

  (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.fill)(proto, 'addEventListener', function (original)

 {
    return function (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any

      eventName,
      fn,
      options,
    ) {
      try {
        if (typeof fn.handleEvent === 'function') {
          // ESlint disable explanation:
          //  First, it is generally safe to call `wrap` with an unbound function. Furthermore, using `.bind()` would
          //  introduce a bug here, because bind returns a new function that doesn't have our
          //  flags(like __sentry_original__) attached. `wrap` checks for those flags to avoid unnecessary wrapping.
          //  Without those flags, every call to addEventListener wraps the function again, causing a memory leak.
          // eslint-disable-next-line @typescript-eslint/unbound-method
          fn.handleEvent = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.wrap)(fn.handleEvent, {
            mechanism: {
              data: {
                function: 'handleEvent',
                handler: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.getFunctionName)(fn),
                target,
              },
              handled: true,
              type: 'instrument',
            },
          });
        }
      } catch (err) {
        // can sometimes get 'Permission denied to access property "handle Event'
      }

      return original.apply(this, [
        eventName,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.wrap)(fn , {
          mechanism: {
            data: {
              function: 'addEventListener',
              handler: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.getFunctionName)(fn),
              target,
            },
            handled: true,
            type: 'instrument',
          },
        }),
        options,
      ]);
    };
  });

  (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.fill)(
    proto,
    'removeEventListener',
    function (
      originalRemoveEventListener,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) {
      return function (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any

        eventName,
        fn,
        options,
      ) {
        /**
         * There are 2 possible scenarios here:
         *
         * 1. Someone passes a callback, which was attached prior to Sentry initialization, or by using unmodified
         * method, eg. `document.addEventListener.call(el, name, handler). In this case, we treat this function
         * as a pass-through, and call original `removeEventListener` with it.
         *
         * 2. Someone passes a callback, which was attached after Sentry was initialized, which means that it was using
         * our wrapped version of `addEventListener`, which internally calls `wrap` helper.
         * This helper "wraps" whole callback inside a try/catch statement, and attached appropriate metadata to it,
         * in order for us to make a distinction between wrapped/non-wrapped functions possible.
         * If a function was wrapped, it has additional property of `__sentry_wrapped__`, holding the handler.
         *
         * When someone adds a handler prior to initialization, and then do it again, but after,
         * then we have to detach both of them. Otherwise, if we'd detach only wrapped one, it'd be impossible
         * to get rid of the initial handler and it'd stick there forever.
         */
        const wrappedEventHandler = fn ;
        try {
          const originalEventHandler = wrappedEventHandler && wrappedEventHandler.__sentry_wrapped__;
          if (originalEventHandler) {
            originalRemoveEventListener.call(this, eventName, originalEventHandler, options);
          }
        } catch (e) {
          // ignore, accessing __sentry_wrapped__ will throw in some Selenium environments
        }
        return originalRemoveEventListener.call(this, eventName, wrappedEventHandler, options);
      };
    },
  );
}


//# sourceMappingURL=trycatch.js.map


/***/ }),

/***/ "./node_modules/@sentry/browser/esm/sdk.js":
/*!*************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/sdk.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "close": () => (/* binding */ close),
/* harmony export */   "defaultIntegrations": () => (/* binding */ defaultIntegrations),
/* harmony export */   "flush": () => (/* binding */ flush),
/* harmony export */   "forceLoad": () => (/* binding */ forceLoad),
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "lastEventId": () => (/* binding */ lastEventId),
/* harmony export */   "onLoad": () => (/* binding */ onLoad),
/* harmony export */   "showReportDialog": () => (/* binding */ showReportDialog),
/* harmony export */   "wrap": () => (/* binding */ wrap)
/* harmony export */ });
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/integrations/inboundfilters.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/integrations/functiontostring.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/integration.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/sdk.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/hub.js");
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/api.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/stacktrace.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/supports.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/logger.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/syncpromise.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/instrument.js");
/* harmony import */ var _client_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./client.js */ "./node_modules/@sentry/browser/esm/client.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./helpers.js */ "./node_modules/@sentry/browser/esm/helpers.js");
/* harmony import */ var _stack_parsers_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./stack-parsers.js */ "./node_modules/@sentry/browser/esm/stack-parsers.js");
/* harmony import */ var _integrations_trycatch_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./integrations/trycatch.js */ "./node_modules/@sentry/browser/esm/integrations/trycatch.js");
/* harmony import */ var _integrations_breadcrumbs_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./integrations/breadcrumbs.js */ "./node_modules/@sentry/browser/esm/integrations/breadcrumbs.js");
/* harmony import */ var _integrations_globalhandlers_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./integrations/globalhandlers.js */ "./node_modules/@sentry/browser/esm/integrations/globalhandlers.js");
/* harmony import */ var _integrations_linkederrors_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./integrations/linkederrors.js */ "./node_modules/@sentry/browser/esm/integrations/linkederrors.js");
/* harmony import */ var _integrations_dedupe_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./integrations/dedupe.js */ "./node_modules/@sentry/browser/esm/integrations/dedupe.js");
/* harmony import */ var _integrations_httpcontext_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./integrations/httpcontext.js */ "./node_modules/@sentry/browser/esm/integrations/httpcontext.js");
/* harmony import */ var _transports_fetch_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./transports/fetch.js */ "./node_modules/@sentry/browser/esm/transports/fetch.js");
/* harmony import */ var _transports_xhr_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./transports/xhr.js */ "./node_modules/@sentry/browser/esm/transports/xhr.js");
















const defaultIntegrations = [
  new _sentry_core__WEBPACK_IMPORTED_MODULE_0__.InboundFilters(),
  new _sentry_core__WEBPACK_IMPORTED_MODULE_1__.FunctionToString(),
  new _integrations_trycatch_js__WEBPACK_IMPORTED_MODULE_2__.TryCatch(),
  new _integrations_breadcrumbs_js__WEBPACK_IMPORTED_MODULE_3__.Breadcrumbs(),
  new _integrations_globalhandlers_js__WEBPACK_IMPORTED_MODULE_4__.GlobalHandlers(),
  new _integrations_linkederrors_js__WEBPACK_IMPORTED_MODULE_5__.LinkedErrors(),
  new _integrations_dedupe_js__WEBPACK_IMPORTED_MODULE_6__.Dedupe(),
  new _integrations_httpcontext_js__WEBPACK_IMPORTED_MODULE_7__.HttpContext(),
];

/**
 * The Sentry Browser SDK Client.
 *
 * To use this SDK, call the {@link init} function as early as possible when
 * loading the web page. To set context information or send manual events, use
 * the provided methods.
 *
 * @example
 *
 * ```
 *
 * import { init } from '@sentry/browser';
 *
 * init({
 *   dsn: '__DSN__',
 *   // ...
 * });
 * ```
 *
 * @example
 * ```
 *
 * import { configureScope } from '@sentry/browser';
 * configureScope((scope: Scope) => {
 *   scope.setExtra({ battery: 0.7 });
 *   scope.setTag({ user_mode: 'admin' });
 *   scope.setUser({ id: '4711' });
 * });
 * ```
 *
 * @example
 * ```
 *
 * import { addBreadcrumb } from '@sentry/browser';
 * addBreadcrumb({
 *   message: 'My Breadcrumb',
 *   // ...
 * });
 * ```
 *
 * @example
 *
 * ```
 *
 * import * as Sentry from '@sentry/browser';
 * Sentry.captureMessage('Hello, world!');
 * Sentry.captureException(new Error('Good bye'));
 * Sentry.captureEvent({
 *   message: 'Manual',
 *   stacktrace: [
 *     // ...
 *   ],
 * });
 * ```
 *
 * @see {@link BrowserOptions} for documentation on configuration options.
 */
function init(options = {}) {
  if (options.defaultIntegrations === undefined) {
    options.defaultIntegrations = defaultIntegrations;
  }
  if (options.release === undefined) {
    // This supports the variable that sentry-webpack-plugin injects
    if (_helpers_js__WEBPACK_IMPORTED_MODULE_8__.WINDOW.SENTRY_RELEASE && _helpers_js__WEBPACK_IMPORTED_MODULE_8__.WINDOW.SENTRY_RELEASE.id) {
      options.release = _helpers_js__WEBPACK_IMPORTED_MODULE_8__.WINDOW.SENTRY_RELEASE.id;
    }
  }
  if (options.autoSessionTracking === undefined) {
    options.autoSessionTracking = true;
  }
  if (options.sendClientReports === undefined) {
    options.sendClientReports = true;
  }

  const clientOptions = {
    ...options,
    stackParser: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_9__.stackParserFromStackParserOptions)(options.stackParser || _stack_parsers_js__WEBPACK_IMPORTED_MODULE_10__.defaultStackParser),
    integrations: (0,_sentry_core__WEBPACK_IMPORTED_MODULE_11__.getIntegrationsToSetup)(options),
    transport: options.transport || ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_12__.supportsFetch)() ? _transports_fetch_js__WEBPACK_IMPORTED_MODULE_13__.makeFetchTransport : _transports_xhr_js__WEBPACK_IMPORTED_MODULE_14__.makeXHRTransport),
  };

  (0,_sentry_core__WEBPACK_IMPORTED_MODULE_15__.initAndBind)(_client_js__WEBPACK_IMPORTED_MODULE_16__.BrowserClient, clientOptions);

  if (options.autoSessionTracking) {
    startSessionTracking();
  }
}

/**
 * Present the user with a report dialog.
 *
 * @param options Everything is optional, we try to fetch all info need from the global scope.
 */
function showReportDialog(options = {}, hub = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_17__.getCurrentHub)()) {
  // doesn't work without a document (React Native)
  if (!_helpers_js__WEBPACK_IMPORTED_MODULE_8__.WINDOW.document) {
    (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) && _sentry_utils__WEBPACK_IMPORTED_MODULE_18__.logger.error('Global document not defined in showReportDialog call');
    return;
  }

  const { client, scope } = hub.getStackTop();
  const dsn = options.dsn || (client && client.getDsn());
  if (!dsn) {
    (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) && _sentry_utils__WEBPACK_IMPORTED_MODULE_18__.logger.error('DSN not configured for showReportDialog call');
    return;
  }

  if (scope) {
    options.user = {
      ...scope.getUser(),
      ...options.user,
    };
  }

  if (!options.eventId) {
    options.eventId = hub.lastEventId();
  }

  const script = _helpers_js__WEBPACK_IMPORTED_MODULE_8__.WINDOW.document.createElement('script');
  script.async = true;
  script.src = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_19__.getReportDialogEndpoint)(dsn, options);

  if (options.onLoad) {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    script.onload = options.onLoad;
  }

  const injectionPoint = _helpers_js__WEBPACK_IMPORTED_MODULE_8__.WINDOW.document.head || _helpers_js__WEBPACK_IMPORTED_MODULE_8__.WINDOW.document.body;
  if (injectionPoint) {
    injectionPoint.appendChild(script);
  } else {
    (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) && _sentry_utils__WEBPACK_IMPORTED_MODULE_18__.logger.error('Not injecting report dialog. No injection point found in HTML');
  }
}

/**
 * This is the getter for lastEventId.
 *
 * @returns The last event id of a captured event.
 */
function lastEventId() {
  return (0,_sentry_core__WEBPACK_IMPORTED_MODULE_17__.getCurrentHub)().lastEventId();
}

/**
 * This function is here to be API compatible with the loader.
 * @hidden
 */
function forceLoad() {
  // Noop
}

/**
 * This function is here to be API compatible with the loader.
 * @hidden
 */
function onLoad(callback) {
  callback();
}

/**
 * Call `flush()` on the current client, if there is one. See {@link Client.flush}.
 *
 * @param timeout Maximum time in ms the client should wait to flush its event queue. Omitting this parameter will cause
 * the client to wait until all events are sent before resolving the promise.
 * @returns A promise which resolves to `true` if the queue successfully drains before the timeout, or `false` if it
 * doesn't (or if there's no client defined).
 */
function flush(timeout) {
  const client = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_17__.getCurrentHub)().getClient();
  if (client) {
    return client.flush(timeout);
  }
  (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) && _sentry_utils__WEBPACK_IMPORTED_MODULE_18__.logger.warn('Cannot flush events. No client defined.');
  return (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_20__.resolvedSyncPromise)(false);
}

/**
 * Call `close()` on the current client, if there is one. See {@link Client.close}.
 *
 * @param timeout Maximum time in ms the client should wait to flush its event queue before shutting down. Omitting this
 * parameter will cause the client to wait until all events are sent before disabling itself.
 * @returns A promise which resolves to `true` if the queue successfully drains before the timeout, or `false` if it
 * doesn't (or if there's no client defined).
 */
function close(timeout) {
  const client = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_17__.getCurrentHub)().getClient();
  if (client) {
    return client.close(timeout);
  }
  (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) && _sentry_utils__WEBPACK_IMPORTED_MODULE_18__.logger.warn('Cannot flush events and disable SDK. No client defined.');
  return (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_20__.resolvedSyncPromise)(false);
}

/**
 * Wrap code within a try/catch block so the SDK is able to capture errors.
 *
 * @param fn A function to wrap.
 *
 * @returns The result of wrapped function call.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function wrap(fn) {
  return (0,_helpers_js__WEBPACK_IMPORTED_MODULE_8__.wrap)(fn)();
}

function startSessionOnHub(hub) {
  hub.startSession({ ignoreDuration: true });
  hub.captureSession();
}

/**
 * Enable automatic Session Tracking for the initial page load.
 */
function startSessionTracking() {
  if (typeof _helpers_js__WEBPACK_IMPORTED_MODULE_8__.WINDOW.document === 'undefined') {
    (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) &&
      _sentry_utils__WEBPACK_IMPORTED_MODULE_18__.logger.warn('Session tracking in non-browser environment with @sentry/browser is not supported.');
    return;
  }

  const hub = (0,_sentry_core__WEBPACK_IMPORTED_MODULE_17__.getCurrentHub)();

  // The only way for this to be false is for there to be a version mismatch between @sentry/browser (>= 6.0.0) and
  // @sentry/hub (< 5.27.0). In the simple case, there won't ever be such a mismatch, because the two packages are
  // pinned at the same version in package.json, but there are edge cases where it's possible. See
  // https://github.com/getsentry/sentry-javascript/issues/3207 and
  // https://github.com/getsentry/sentry-javascript/issues/3234 and
  // https://github.com/getsentry/sentry-javascript/issues/3278.
  if (!hub.captureSession) {
    return;
  }

  // The session duration for browser sessions does not track a meaningful
  // concept that can be used as a metric.
  // Automatically captured sessions are akin to page views, and thus we
  // discard their duration.
  startSessionOnHub(hub);

  // We want to create a session for every navigation as well
  (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_21__.addInstrumentationHandler)('history', ({ from, to }) => {
    // Don't create an additional session for the initial route or if the location did not change
    if (!(from === undefined || from === to)) {
      startSessionOnHub((0,_sentry_core__WEBPACK_IMPORTED_MODULE_17__.getCurrentHub)());
    }
  });
}


//# sourceMappingURL=sdk.js.map


/***/ }),

/***/ "./node_modules/@sentry/browser/esm/stack-parsers.js":
/*!***********************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/stack-parsers.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "chromeStackLineParser": () => (/* binding */ chromeStackLineParser),
/* harmony export */   "defaultStackLineParsers": () => (/* binding */ defaultStackLineParsers),
/* harmony export */   "defaultStackParser": () => (/* binding */ defaultStackParser),
/* harmony export */   "geckoStackLineParser": () => (/* binding */ geckoStackLineParser),
/* harmony export */   "opera10StackLineParser": () => (/* binding */ opera10StackLineParser),
/* harmony export */   "opera11StackLineParser": () => (/* binding */ opera11StackLineParser),
/* harmony export */   "winjsStackLineParser": () => (/* binding */ winjsStackLineParser)
/* harmony export */ });
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/stacktrace.js");


// global reference to slice
const UNKNOWN_FUNCTION = '?';

const OPERA10_PRIORITY = 10;
const OPERA11_PRIORITY = 20;
const CHROME_PRIORITY = 30;
const WINJS_PRIORITY = 40;
const GECKO_PRIORITY = 50;

function createFrame(filename, func, lineno, colno) {
  const frame = {
    filename,
    function: func,
    // All browser frames are considered in_app
    in_app: true,
  };

  if (lineno !== undefined) {
    frame.lineno = lineno;
  }

  if (colno !== undefined) {
    frame.colno = colno;
  }

  return frame;
}

// Chromium based browsers: Chrome, Brave, new Opera, new Edge
const chromeRegex =
  /^\s*at (?:(.*\).*?|.*?) ?\((?:address at )?)?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
const chromeEvalRegex = /\((\S*)(?::(\d+))(?::(\d+))\)/;

const chrome = line => {
  const parts = chromeRegex.exec(line);

  if (parts) {
    const isEval = parts[2] && parts[2].indexOf('eval') === 0; // start of line

    if (isEval) {
      const subMatch = chromeEvalRegex.exec(parts[2]);

      if (subMatch) {
        // throw out eval line/column and use top-most line/column number
        parts[2] = subMatch[1]; // url
        parts[3] = subMatch[2]; // line
        parts[4] = subMatch[3]; // column
      }
    }

    // Kamil: One more hack won't hurt us right? Understanding and adding more rules on top of these regexps right now
    // would be way too time consuming. (TODO: Rewrite whole RegExp to be more readable)
    const [func, filename] = extractSafariExtensionDetails(parts[1] || UNKNOWN_FUNCTION, parts[2]);

    return createFrame(filename, func, parts[3] ? +parts[3] : undefined, parts[4] ? +parts[4] : undefined);
  }

  return;
};

const chromeStackLineParser = [CHROME_PRIORITY, chrome];

// gecko regex: `(?:bundle|\d+\.js)`: `bundle` is for react native, `\d+\.js` also but specifically for ram bundles because it
// generates filenames without a prefix like `file://` the filenames in the stacktrace are just 42.js
// We need this specific case for now because we want no other regex to match.
const geckoREgex =
  /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension|safari-extension|safari-web-extension|capacitor)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i;
const geckoEvalRegex = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;

const gecko = line => {
  const parts = geckoREgex.exec(line);

  if (parts) {
    const isEval = parts[3] && parts[3].indexOf(' > eval') > -1;
    if (isEval) {
      const subMatch = geckoEvalRegex.exec(parts[3]);

      if (subMatch) {
        // throw out eval line/column and use top-most line number
        parts[1] = parts[1] || 'eval';
        parts[3] = subMatch[1];
        parts[4] = subMatch[2];
        parts[5] = ''; // no column when eval
      }
    }

    let filename = parts[3];
    let func = parts[1] || UNKNOWN_FUNCTION;
    [func, filename] = extractSafariExtensionDetails(func, filename);

    return createFrame(filename, func, parts[4] ? +parts[4] : undefined, parts[5] ? +parts[5] : undefined);
  }

  return;
};

const geckoStackLineParser = [GECKO_PRIORITY, gecko];

const winjsRegex =
  /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;

const winjs = line => {
  const parts = winjsRegex.exec(line);

  return parts
    ? createFrame(parts[2], parts[1] || UNKNOWN_FUNCTION, +parts[3], parts[4] ? +parts[4] : undefined)
    : undefined;
};

const winjsStackLineParser = [WINJS_PRIORITY, winjs];

const opera10Regex = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i;

const opera10 = line => {
  const parts = opera10Regex.exec(line);
  return parts ? createFrame(parts[2], parts[3] || UNKNOWN_FUNCTION, +parts[1]) : undefined;
};

const opera10StackLineParser = [OPERA10_PRIORITY, opera10];

const opera11Regex =
  / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^)]+))\(.*\))? in (.*):\s*$/i;

const opera11 = line => {
  const parts = opera11Regex.exec(line);
  return parts ? createFrame(parts[5], parts[3] || parts[4] || UNKNOWN_FUNCTION, +parts[1], +parts[2]) : undefined;
};

const opera11StackLineParser = [OPERA11_PRIORITY, opera11];

const defaultStackLineParsers = [chromeStackLineParser, geckoStackLineParser, winjsStackLineParser];

const defaultStackParser = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.createStackParser)(...defaultStackLineParsers);

/**
 * Safari web extensions, starting version unknown, can produce "frames-only" stacktraces.
 * What it means, is that instead of format like:
 *
 * Error: wat
 *   at function@url:row:col
 *   at function@url:row:col
 *   at function@url:row:col
 *
 * it produces something like:
 *
 *   function@url:row:col
 *   function@url:row:col
 *   function@url:row:col
 *
 * Because of that, it won't be captured by `chrome` RegExp and will fall into `Gecko` branch.
 * This function is extracted so that we can use it in both places without duplicating the logic.
 * Unfortunately "just" changing RegExp is too complicated now and making it pass all tests
 * and fix this case seems like an impossible, or at least way too time-consuming task.
 */
const extractSafariExtensionDetails = (func, filename) => {
  const isSafariExtension = func.indexOf('safari-extension') !== -1;
  const isSafariWebExtension = func.indexOf('safari-web-extension') !== -1;

  return isSafariExtension || isSafariWebExtension
    ? [
        func.indexOf('@') !== -1 ? func.split('@')[0] : UNKNOWN_FUNCTION,
        isSafariExtension ? `safari-extension:${filename}` : `safari-web-extension:${filename}`,
      ]
    : [func, filename];
};


//# sourceMappingURL=stack-parsers.js.map


/***/ }),

/***/ "./node_modules/@sentry/browser/esm/transports/fetch.js":
/*!**************************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/transports/fetch.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeFetchTransport": () => (/* binding */ makeFetchTransport)
/* harmony export */ });
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/transports/base.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/syncpromise.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@sentry/browser/esm/transports/utils.js");




/**
 * Creates a Transport that uses the Fetch API to send events to Sentry.
 */
function makeFetchTransport(
  options,
  nativeFetch = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getNativeFetchImplementation)(),
) {
  function makeRequest(request) {
    const requestOptions = {
      body: request.body,
      method: 'POST',
      referrerPolicy: 'origin',
      headers: options.headers,
      // Outgoing requests are usually cancelled when navigating to a different page, causing a "TypeError: Failed to
      // fetch" error and sending a "network_error" client-outcome - in Chrome, the request status shows "(cancelled)".
      // The `keepalive` flag keeps outgoing requests alive, even when switching pages. We want this since we're
      // frequently sending events right before the user is switching pages (eg. whenfinishing navigation transactions).
      // Gotchas:
      // - `keepalive` isn't supported by Firefox
      // - As per spec (https://fetch.spec.whatwg.org/#http-network-or-cache-fetch), a request with `keepalive: true`
      //   and a content length of > 64 kibibytes returns a network error. We will therefore only activate the flag when
      //   we're below that limit.
      keepalive: request.body.length <= 65536,
      ...options.fetchOptions,
    };

    try {
      return nativeFetch(options.url, requestOptions).then(response => ({
        statusCode: response.status,
        headers: {
          'x-sentry-rate-limits': response.headers.get('X-Sentry-Rate-Limits'),
          'retry-after': response.headers.get('Retry-After'),
        },
      }));
    } catch (e) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.clearCachedFetchImplementation)();
      return (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.rejectedSyncPromise)(e);
    }
  }

  return (0,_sentry_core__WEBPACK_IMPORTED_MODULE_2__.createTransport)(options, makeRequest);
}


//# sourceMappingURL=fetch.js.map


/***/ }),

/***/ "./node_modules/@sentry/browser/esm/transports/utils.js":
/*!**************************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/transports/utils.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clearCachedFetchImplementation": () => (/* binding */ clearCachedFetchImplementation),
/* harmony export */   "getNativeFetchImplementation": () => (/* binding */ getNativeFetchImplementation)
/* harmony export */ });
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/supports.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/logger.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers.js */ "./node_modules/@sentry/browser/esm/helpers.js");



let cachedFetchImpl = undefined;

/**
 * A special usecase for incorrectly wrapped Fetch APIs in conjunction with ad-blockers.
 * Whenever someone wraps the Fetch API and returns the wrong promise chain,
 * this chain becomes orphaned and there is no possible way to capture it's rejections
 * other than allowing it bubble up to this very handler. eg.
 *
 * const f = window.fetch;
 * window.fetch = function () {
 *   const p = f.apply(this, arguments);
 *
 *   p.then(function() {
 *     console.log('hi.');
 *   });
 *
 *   return p;
 * }
 *
 * `p.then(function () { ... })` is producing a completely separate promise chain,
 * however, what's returned is `p` - the result of original `fetch` call.
 *
 * This mean, that whenever we use the Fetch API to send our own requests, _and_
 * some ad-blocker blocks it, this orphaned chain will _always_ reject,
 * effectively causing another event to be captured.
 * This makes a whole process become an infinite loop, which we need to somehow
 * deal with, and break it in one way or another.
 *
 * To deal with this issue, we are making sure that we _always_ use the real
 * browser Fetch API, instead of relying on what `window.fetch` exposes.
 * The only downside to this would be missing our own requests as breadcrumbs,
 * but because we are already not doing this, it should be just fine.
 *
 * Possible failed fetch error messages per-browser:
 *
 * Chrome:  Failed to fetch
 * Edge:    Failed to Fetch
 * Firefox: NetworkError when attempting to fetch resource
 * Safari:  resource blocked by content blocker
 */
function getNativeFetchImplementation() {
  if (cachedFetchImpl) {
    return cachedFetchImpl;
  }

  /* eslint-disable @typescript-eslint/unbound-method */

  // Fast path to avoid DOM I/O
  if ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.isNativeFetch)(_helpers_js__WEBPACK_IMPORTED_MODULE_1__.WINDOW.fetch)) {
    return (cachedFetchImpl = _helpers_js__WEBPACK_IMPORTED_MODULE_1__.WINDOW.fetch.bind(_helpers_js__WEBPACK_IMPORTED_MODULE_1__.WINDOW));
  }

  const document = _helpers_js__WEBPACK_IMPORTED_MODULE_1__.WINDOW.document;
  let fetchImpl = _helpers_js__WEBPACK_IMPORTED_MODULE_1__.WINDOW.fetch;
  // eslint-disable-next-line deprecation/deprecation
  if (document && typeof document.createElement === 'function') {
    try {
      const sandbox = document.createElement('iframe');
      sandbox.hidden = true;
      document.head.appendChild(sandbox);
      const contentWindow = sandbox.contentWindow;
      if (contentWindow && contentWindow.fetch) {
        fetchImpl = contentWindow.fetch;
      }
      document.head.removeChild(sandbox);
    } catch (e) {
      (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) &&
        _sentry_utils__WEBPACK_IMPORTED_MODULE_2__.logger.warn('Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ', e);
    }
  }

  return (cachedFetchImpl = fetchImpl.bind(_helpers_js__WEBPACK_IMPORTED_MODULE_1__.WINDOW));
  /* eslint-enable @typescript-eslint/unbound-method */
}

/** Clears cached fetch impl */
function clearCachedFetchImplementation() {
  cachedFetchImpl = undefined;
}


//# sourceMappingURL=utils.js.map


/***/ }),

/***/ "./node_modules/@sentry/browser/esm/transports/xhr.js":
/*!************************************************************!*\
  !*** ./node_modules/@sentry/browser/esm/transports/xhr.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeXHRTransport": () => (/* binding */ makeXHRTransport)
/* harmony export */ });
/* harmony import */ var _sentry_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/core */ "./node_modules/@sentry/core/esm/transports/base.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/syncpromise.js");



/**
 * The DONE ready state for XmlHttpRequest
 *
 * Defining it here as a constant b/c XMLHttpRequest.DONE is not always defined
 * (e.g. during testing, it is `undefined`)
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState}
 */
const XHR_READYSTATE_DONE = 4;

/**
 * Creates a Transport that uses the XMLHttpRequest API to send events to Sentry.
 */
function makeXHRTransport(options) {
  function makeRequest(request) {
    return new _sentry_utils__WEBPACK_IMPORTED_MODULE_0__.SyncPromise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onerror = reject;

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XHR_READYSTATE_DONE) {
          resolve({
            statusCode: xhr.status,
            headers: {
              'x-sentry-rate-limits': xhr.getResponseHeader('X-Sentry-Rate-Limits'),
              'retry-after': xhr.getResponseHeader('Retry-After'),
            },
          });
        }
      };

      xhr.open('POST', options.url);

      for (const header in options.headers) {
        if (Object.prototype.hasOwnProperty.call(options.headers, header)) {
          xhr.setRequestHeader(header, options.headers[header]);
        }
      }

      xhr.send(request.body);
    });
  }

  return (0,_sentry_core__WEBPACK_IMPORTED_MODULE_1__.createTransport)(options, makeRequest);
}


//# sourceMappingURL=xhr.js.map


/***/ }),

/***/ "./node_modules/@sentry/core/esm/api.js":
/*!**********************************************!*\
  !*** ./node_modules/@sentry/core/esm/api.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getEnvelopeEndpointWithUrlEncodedAuth": () => (/* binding */ getEnvelopeEndpointWithUrlEncodedAuth),
/* harmony export */   "getReportDialogEndpoint": () => (/* binding */ getReportDialogEndpoint)
/* harmony export */ });
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/object.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/dsn.js");


const SENTRY_API_VERSION = '7';

/** Returns the prefix to construct Sentry ingestion API endpoints. */
function getBaseApiEndpoint(dsn) {
  const protocol = dsn.protocol ? `${dsn.protocol}:` : '';
  const port = dsn.port ? `:${dsn.port}` : '';
  return `${protocol}//${dsn.host}${port}${dsn.path ? `/${dsn.path}` : ''}/api/`;
}

/** Returns the ingest API endpoint for target. */
function _getIngestEndpoint(dsn) {
  return `${getBaseApiEndpoint(dsn)}${dsn.projectId}/envelope/`;
}

/** Returns a URL-encoded string with auth config suitable for a query string. */
function _encodedAuth(dsn, sdkInfo) {
  return (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.urlEncode)({
    // We send only the minimum set of required information. See
    // https://github.com/getsentry/sentry-javascript/issues/2572.
    sentry_key: dsn.publicKey,
    sentry_version: SENTRY_API_VERSION,
    ...(sdkInfo && { sentry_client: `${sdkInfo.name}/${sdkInfo.version}` }),
  });
}

/**
 * Returns the envelope endpoint URL with auth in the query string.
 *
 * Sending auth as part of the query string and not as custom HTTP headers avoids CORS preflight requests.
 */
function getEnvelopeEndpointWithUrlEncodedAuth(
  dsn,
  // TODO (v8): Remove `tunnelOrOptions` in favor of `options`, and use the substitute code below
  // options: ClientOptions = {} as ClientOptions,
  tunnelOrOptions = {} ,
) {
  // TODO (v8): Use this code instead
  // const { tunnel, _metadata = {} } = options;
  // return tunnel ? tunnel : `${_getIngestEndpoint(dsn)}?${_encodedAuth(dsn, _metadata.sdk)}`;

  const tunnel = typeof tunnelOrOptions === 'string' ? tunnelOrOptions : tunnelOrOptions.tunnel;
  const sdkInfo =
    typeof tunnelOrOptions === 'string' || !tunnelOrOptions._metadata ? undefined : tunnelOrOptions._metadata.sdk;

  return tunnel ? tunnel : `${_getIngestEndpoint(dsn)}?${_encodedAuth(dsn, sdkInfo)}`;
}

/** Returns the url to the report dialog endpoint. */
function getReportDialogEndpoint(
  dsnLike,
  dialogOptions

,
) {
  const dsn = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.makeDsn)(dsnLike);
  const endpoint = `${getBaseApiEndpoint(dsn)}embed/error-page/`;

  let encodedOptions = `dsn=${(0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.dsnToString)(dsn)}`;
  for (const key in dialogOptions) {
    if (key === 'dsn') {
      continue;
    }

    if (key === 'user') {
      const user = dialogOptions.user;
      if (!user) {
        continue;
      }
      if (user.name) {
        encodedOptions += `&name=${encodeURIComponent(user.name)}`;
      }
      if (user.email) {
        encodedOptions += `&email=${encodeURIComponent(user.email)}`;
      }
    } else {
      encodedOptions += `&${encodeURIComponent(key)}=${encodeURIComponent(dialogOptions[key] )}`;
    }
  }

  return `${endpoint}?${encodedOptions}`;
}


//# sourceMappingURL=api.js.map


/***/ }),

/***/ "./node_modules/@sentry/core/esm/baseclient.js":
/*!*****************************************************!*\
  !*** ./node_modules/@sentry/core/esm/baseclient.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseClient": () => (/* binding */ BaseClient)
/* harmony export */ });
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/dsn.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/logger.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/is.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/syncpromise.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/envelope.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/time.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/normalize.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/string.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/error.js");
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api.js */ "./node_modules/@sentry/core/esm/api.js");
/* harmony import */ var _envelope_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./envelope.js */ "./node_modules/@sentry/core/esm/envelope.js");
/* harmony import */ var _integration_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./integration.js */ "./node_modules/@sentry/core/esm/integration.js");
/* harmony import */ var _scope_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./scope.js */ "./node_modules/@sentry/core/esm/scope.js");
/* harmony import */ var _session_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./session.js */ "./node_modules/@sentry/core/esm/session.js");







const ALREADY_SEEN_ERROR = "Not capturing exception because it's already been captured.";

/**
 * Base implementation for all JavaScript SDK clients.
 *
 * Call the constructor with the corresponding options
 * specific to the client subclass. To access these options later, use
 * {@link Client.getOptions}.
 *
 * If a Dsn is specified in the options, it will be parsed and stored. Use
 * {@link Client.getDsn} to retrieve the Dsn at any moment. In case the Dsn is
 * invalid, the constructor will throw a {@link SentryException}. Note that
 * without a valid Dsn, the SDK will not send any events to Sentry.
 *
 * Before sending an event, it is passed through
 * {@link BaseClient._prepareEvent} to add SDK information and scope data
 * (breadcrumbs and context). To add more custom information, override this
 * method and extend the resulting prepared event.
 *
 * To issue automatically created events (e.g. via instrumentation), use
 * {@link Client.captureEvent}. It will prepare the event and pass it through
 * the callback lifecycle. To issue auto-breadcrumbs, use
 * {@link Client.addBreadcrumb}.
 *
 * @example
 * class NodeClient extends BaseClient<NodeOptions> {
 *   public constructor(options: NodeOptions) {
 *     super(options);
 *   }
 *
 *   // ...
 * }
 */
class BaseClient {
  /** Options passed to the SDK. */

  /** The client Dsn, if specified in options. Without this Dsn, the SDK will be disabled. */

  /** Array of set up integrations. */
   __init() {this._integrations = {};}

  /** Indicates whether this client's integrations have been set up. */
   __init2() {this._integrationsInitialized = false;}

  /** Number of calls being processed */
   __init3() {this._numProcessing = 0;}

  /** Holds flushable  */
   __init4() {this._outcomes = {};}

  /**
   * Initializes this client instance.
   *
   * @param options Options for the client.
   */
   constructor(options) {;BaseClient.prototype.__init.call(this);BaseClient.prototype.__init2.call(this);BaseClient.prototype.__init3.call(this);BaseClient.prototype.__init4.call(this);
    this._options = options;
    if (options.dsn) {
      this._dsn = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.makeDsn)(options.dsn);
      const url = (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.getEnvelopeEndpointWithUrlEncodedAuth)(this._dsn, options);
      this._transport = options.transport({
        recordDroppedEvent: this.recordDroppedEvent.bind(this),
        ...options.transportOptions,
        url,
      });
    } else {
      (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) && _sentry_utils__WEBPACK_IMPORTED_MODULE_2__.logger.warn('No DSN provided, client will not do anything.');
    }
  }

  /**
   * @inheritDoc
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
   captureException(exception, hint, scope) {
    // ensure we haven't captured this very object before
    if ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.checkOrSetAlreadyCaught)(exception)) {
      (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) && _sentry_utils__WEBPACK_IMPORTED_MODULE_2__.logger.log(ALREADY_SEEN_ERROR);
      return;
    }

    let eventId;
    this._process(
      this.eventFromException(exception, hint)
        .then(event => this._captureEvent(event, hint, scope))
        .then(result => {
          eventId = result;
        }),
    );

    return eventId;
  }

  /**
   * @inheritDoc
   */
   captureMessage(
    message,
    // eslint-disable-next-line deprecation/deprecation
    level,
    hint,
    scope,
  ) {
    let eventId;

    const promisedEvent = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_4__.isPrimitive)(message)
      ? this.eventFromMessage(String(message), level, hint)
      : this.eventFromException(message, hint);

    this._process(
      promisedEvent
        .then(event => this._captureEvent(event, hint, scope))
        .then(result => {
          eventId = result;
        }),
    );

    return eventId;
  }

  /**
   * @inheritDoc
   */
   captureEvent(event, hint, scope) {
    // ensure we haven't captured this very object before
    if (hint && hint.originalException && (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.checkOrSetAlreadyCaught)(hint.originalException)) {
      (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) && _sentry_utils__WEBPACK_IMPORTED_MODULE_2__.logger.log(ALREADY_SEEN_ERROR);
      return;
    }

    let eventId;

    this._process(
      this._captureEvent(event, hint, scope).then(result => {
        eventId = result;
      }),
    );

    return eventId;
  }

  /**
   * @inheritDoc
   */
   captureSession(session) {
    if (!this._isEnabled()) {
      (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) && _sentry_utils__WEBPACK_IMPORTED_MODULE_2__.logger.warn('SDK not enabled, will not capture session.');
      return;
    }

    if (!(typeof session.release === 'string')) {
      (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) && _sentry_utils__WEBPACK_IMPORTED_MODULE_2__.logger.warn('Discarded session because of missing or non-string release');
    } else {
      this.sendSession(session);
      // After sending, we set init false to indicate it's not the first occurrence
      (0,_session_js__WEBPACK_IMPORTED_MODULE_5__.updateSession)(session, { init: false });
    }
  }

  /**
   * @inheritDoc
   */
   getDsn() {
    return this._dsn;
  }

  /**
   * @inheritDoc
   */
   getOptions() {
    return this._options;
  }

  /**
   * @inheritDoc
   */
   getTransport() {
    return this._transport;
  }

  /**
   * @inheritDoc
   */
   flush(timeout) {
    const transport = this._transport;
    if (transport) {
      return this._isClientDoneProcessing(timeout).then(clientFinished => {
        return transport.flush(timeout).then(transportFlushed => clientFinished && transportFlushed);
      });
    } else {
      return (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_6__.resolvedSyncPromise)(true);
    }
  }

  /**
   * @inheritDoc
   */
   close(timeout) {
    return this.flush(timeout).then(result => {
      this.getOptions().enabled = false;
      return result;
    });
  }

  /**
   * Sets up the integrations
   */
   setupIntegrations() {
    if (this._isEnabled() && !this._integrationsInitialized) {
      this._integrations = (0,_integration_js__WEBPACK_IMPORTED_MODULE_7__.setupIntegrations)(this._options.integrations);
      this._integrationsInitialized = true;
    }
  }

  /**
   * Gets an installed integration by its `id`.
   *
   * @returns The installed integration or `undefined` if no integration with that `id` was installed.
   */
   getIntegrationById(integrationId) {
    return this._integrations[integrationId];
  }

  /**
   * @inheritDoc
   */
   getIntegration(integration) {
    try {
      return (this._integrations[integration.id] ) || null;
    } catch (_oO) {
      (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) && _sentry_utils__WEBPACK_IMPORTED_MODULE_2__.logger.warn(`Cannot retrieve integration ${integration.id} from the current Client`);
      return null;
    }
  }

  /**
   * @inheritDoc
   */
   sendEvent(event, hint = {}) {
    if (this._dsn) {
      let env = (0,_envelope_js__WEBPACK_IMPORTED_MODULE_8__.createEventEnvelope)(event, this._dsn, this._options._metadata, this._options.tunnel);

      for (const attachment of hint.attachments || []) {
        env = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_9__.addItemToEnvelope)(
          env,
          (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_9__.createAttachmentEnvelopeItem)(
            attachment,
            this._options.transportOptions && this._options.transportOptions.textEncoder,
          ),
        );
      }

      this._sendEnvelope(env);
    }
  }

  /**
   * @inheritDoc
   */
   sendSession(session) {
    if (this._dsn) {
      const env = (0,_envelope_js__WEBPACK_IMPORTED_MODULE_8__.createSessionEnvelope)(session, this._dsn, this._options._metadata, this._options.tunnel);
      this._sendEnvelope(env);
    }
  }

  /**
   * @inheritDoc
   */
   recordDroppedEvent(reason, category) {
    if (this._options.sendClientReports) {
      // We want to track each category (error, transaction, session) separately
      // but still keep the distinction between different type of outcomes.
      // We could use nested maps, but it's much easier to read and type this way.
      // A correct type for map-based implementation if we want to go that route
      // would be `Partial<Record<SentryRequestType, Partial<Record<Outcome, number>>>>`
      // With typescript 4.1 we could even use template literal types
      const key = `${reason}:${category}`;
      (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) && _sentry_utils__WEBPACK_IMPORTED_MODULE_2__.logger.log(`Adding outcome: "${key}"`);

      // The following works because undefined + 1 === NaN and NaN is falsy
      this._outcomes[key] = this._outcomes[key] + 1 || 1;
    }
  }

  /** Updates existing session based on the provided event */
   _updateSessionFromEvent(session, event) {
    let crashed = false;
    let errored = false;
    const exceptions = event.exception && event.exception.values;

    if (exceptions) {
      errored = true;

      for (const ex of exceptions) {
        const mechanism = ex.mechanism;
        if (mechanism && mechanism.handled === false) {
          crashed = true;
          break;
        }
      }
    }

    // A session is updated and that session update is sent in only one of the two following scenarios:
    // 1. Session with non terminal status and 0 errors + an error occurred -> Will set error count to 1 and send update
    // 2. Session with non terminal status and 1 error + a crash occurred -> Will set status crashed and send update
    const sessionNonTerminal = session.status === 'ok';
    const shouldUpdateAndSend = (sessionNonTerminal && session.errors === 0) || (sessionNonTerminal && crashed);

    if (shouldUpdateAndSend) {
      (0,_session_js__WEBPACK_IMPORTED_MODULE_5__.updateSession)(session, {
        ...(crashed && { status: 'crashed' }),
        errors: session.errors || Number(errored || crashed),
      });
      this.captureSession(session);
    }
  }

  /**
   * Determine if the client is finished processing. Returns a promise because it will wait `timeout` ms before saying
   * "no" (resolving to `false`) in order to give the client a chance to potentially finish first.
   *
   * @param timeout The time, in ms, after which to resolve to `false` if the client is still busy. Passing `0` (or not
   * passing anything) will make the promise wait as long as it takes for processing to finish before resolving to
   * `true`.
   * @returns A promise which will resolve to `true` if processing is already done or finishes before the timeout, and
   * `false` otherwise
   */
   _isClientDoneProcessing(timeout) {
    return new _sentry_utils__WEBPACK_IMPORTED_MODULE_6__.SyncPromise(resolve => {
      let ticked = 0;
      const tick = 1;

      const interval = setInterval(() => {
        if (this._numProcessing == 0) {
          clearInterval(interval);
          resolve(true);
        } else {
          ticked += tick;
          if (timeout && ticked >= timeout) {
            clearInterval(interval);
            resolve(false);
          }
        }
      }, tick);
    });
  }

  /** Determines whether this SDK is enabled and a valid Dsn is present. */
   _isEnabled() {
    return this.getOptions().enabled !== false && this._dsn !== undefined;
  }

  /**
   * Adds common information to events.
   *
   * The information includes release and environment from `options`,
   * breadcrumbs and context (extra, tags and user) from the scope.
   *
   * Information that is already present in the event is never overwritten. For
   * nested objects, such as the context, keys are merged.
   *
   * @param event The original event.
   * @param hint May contain additional information about the original exception.
   * @param scope A scope containing event metadata.
   * @returns A new event with more information.
   */
   _prepareEvent(event, hint, scope) {
    const { normalizeDepth = 3, normalizeMaxBreadth = 1000 } = this.getOptions();
    const prepared = {
      ...event,
      event_id: event.event_id || hint.event_id || (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.uuid4)(),
      timestamp: event.timestamp || (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_10__.dateTimestampInSeconds)(),
    };

    this._applyClientOptions(prepared);
    this._applyIntegrationsMetadata(prepared);

    // If we have scope given to us, use it as the base for further modifications.
    // This allows us to prevent unnecessary copying of data if `captureContext` is not provided.
    let finalScope = scope;
    if (hint.captureContext) {
      finalScope = _scope_js__WEBPACK_IMPORTED_MODULE_11__.Scope.clone(finalScope).update(hint.captureContext);
    }

    // We prepare the result here with a resolved Event.
    let result = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_6__.resolvedSyncPromise)(prepared);

    // This should be the last thing called, since we want that
    // {@link Hub.addEventProcessor} gets the finished prepared event.
    //
    // We need to check for the existence of `finalScope.getAttachments`
    // because `getAttachments` can be undefined if users are using an older version
    // of `@sentry/core` that does not have the `getAttachments` method.
    // See: https://github.com/getsentry/sentry-javascript/issues/5229
    if (finalScope && finalScope.getAttachments) {
      // Collect attachments from the hint and scope
      const attachments = [...(hint.attachments || []), ...finalScope.getAttachments()];

      if (attachments.length) {
        hint.attachments = attachments;
      }

      // In case we have a hub we reassign it.
      result = finalScope.applyToEvent(prepared, hint);
    }

    return result.then(evt => {
      if (typeof normalizeDepth === 'number' && normalizeDepth > 0) {
        return this._normalizeEvent(evt, normalizeDepth, normalizeMaxBreadth);
      }
      return evt;
    });
  }

  /**
   * Applies `normalize` function on necessary `Event` attributes to make them safe for serialization.
   * Normalized keys:
   * - `breadcrumbs.data`
   * - `user`
   * - `contexts`
   * - `extra`
   * @param event Event
   * @returns Normalized event
   */
   _normalizeEvent(event, depth, maxBreadth) {
    if (!event) {
      return null;
    }

    const normalized = {
      ...event,
      ...(event.breadcrumbs && {
        breadcrumbs: event.breadcrumbs.map(b => ({
          ...b,
          ...(b.data && {
            data: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_12__.normalize)(b.data, depth, maxBreadth),
          }),
        })),
      }),
      ...(event.user && {
        user: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_12__.normalize)(event.user, depth, maxBreadth),
      }),
      ...(event.contexts && {
        contexts: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_12__.normalize)(event.contexts, depth, maxBreadth),
      }),
      ...(event.extra && {
        extra: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_12__.normalize)(event.extra, depth, maxBreadth),
      }),
    };

    // event.contexts.trace stores information about a Transaction. Similarly,
    // event.spans[] stores information about child Spans. Given that a
    // Transaction is conceptually a Span, normalization should apply to both
    // Transactions and Spans consistently.
    // For now the decision is to skip normalization of Transactions and Spans,
    // so this block overwrites the normalized event to add back the original
    // Transaction information prior to normalization.
    if (event.contexts && event.contexts.trace && normalized.contexts) {
      normalized.contexts.trace = event.contexts.trace;

      // event.contexts.trace.data may contain circular/dangerous data so we need to normalize it
      if (event.contexts.trace.data) {
        normalized.contexts.trace.data = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_12__.normalize)(event.contexts.trace.data, depth, maxBreadth);
      }
    }

    // event.spans[].data may contain circular/dangerous data so we need to normalize it
    if (event.spans) {
      normalized.spans = event.spans.map(span => {
        // We cannot use the spread operator here because `toJSON` on `span` is non-enumerable
        if (span.data) {
          span.data = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_12__.normalize)(span.data, depth, maxBreadth);
        }
        return span;
      });
    }

    return normalized;
  }

  /**
   *  Enhances event using the client configuration.
   *  It takes care of all "static" values like environment, release and `dist`,
   *  as well as truncating overly long values.
   * @param event event instance to be enhanced
   */
   _applyClientOptions(event) {
    const options = this.getOptions();
    const { environment, release, dist, maxValueLength = 250 } = options;

    if (!('environment' in event)) {
      event.environment = 'environment' in options ? environment : 'production';
    }

    if (event.release === undefined && release !== undefined) {
      event.release = release;
    }

    if (event.dist === undefined && dist !== undefined) {
      event.dist = dist;
    }

    if (event.message) {
      event.message = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_13__.truncate)(event.message, maxValueLength);
    }

    const exception = event.exception && event.exception.values && event.exception.values[0];
    if (exception && exception.value) {
      exception.value = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_13__.truncate)(exception.value, maxValueLength);
    }

    const request = event.request;
    if (request && request.url) {
      request.url = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_13__.truncate)(request.url, maxValueLength);
    }
  }

  /**
   * This function adds all used integrations to the SDK info in the event.
   * @param event The event that will be filled with all integrations.
   */
   _applyIntegrationsMetadata(event) {
    const integrationsArray = Object.keys(this._integrations);
    if (integrationsArray.length > 0) {
      event.sdk = event.sdk || {};
      event.sdk.integrations = [...(event.sdk.integrations || []), ...integrationsArray];
    }
  }

  /**
   * Processes the event and logs an error in case of rejection
   * @param event
   * @param hint
   * @param scope
   */
   _captureEvent(event, hint = {}, scope) {
    return this._processEvent(event, hint, scope).then(
      finalEvent => {
        return finalEvent.event_id;
      },
      reason => {
        if ((typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__)) {
          // If something's gone wrong, log the error as a warning. If it's just us having used a `SentryError` for
          // control flow, log just the message (no stack) as a log-level log.
          const sentryError = reason ;
          if (sentryError.logLevel === 'log') {
            _sentry_utils__WEBPACK_IMPORTED_MODULE_2__.logger.log(sentryError.message);
          } else {
            _sentry_utils__WEBPACK_IMPORTED_MODULE_2__.logger.warn(sentryError);
          }
        }
        return undefined;
      },
    );
  }

  /**
   * Processes an event (either error or message) and sends it to Sentry.
   *
   * This also adds breadcrumbs and context information to the event. However,
   * platform specific meta data (such as the User's IP address) must be added
   * by the SDK implementor.
   *
   *
   * @param event The event to send to Sentry.
   * @param hint May contain additional information about the original exception.
   * @param scope A scope containing event metadata.
   * @returns A SyncPromise that resolves with the event or rejects in case event was/will not be send.
   */
   _processEvent(event, hint, scope) {
    const options = this.getOptions();
    const { sampleRate } = options;

    if (!this._isEnabled()) {
      return (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_6__.rejectedSyncPromise)(new _sentry_utils__WEBPACK_IMPORTED_MODULE_14__.SentryError('SDK not enabled, will not capture event.', 'log'));
    }

    const isTransaction = event.type === 'transaction';
    const beforeSendProcessorName = isTransaction ? 'beforeSendTransaction' : 'beforeSend';
    const beforeSendProcessor = options[beforeSendProcessorName];

    // 1.0 === 100% events are sent
    // 0.0 === 0% events are sent
    // Sampling for transaction happens somewhere else
    if (!isTransaction && typeof sampleRate === 'number' && Math.random() > sampleRate) {
      this.recordDroppedEvent('sample_rate', 'error');
      return (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_6__.rejectedSyncPromise)(
        new _sentry_utils__WEBPACK_IMPORTED_MODULE_14__.SentryError(
          `Discarding event because it's not included in the random sample (sampling rate = ${sampleRate})`,
          'log',
        ),
      );
    }

    return this._prepareEvent(event, hint, scope)
      .then(prepared => {
        if (prepared === null) {
          this.recordDroppedEvent('event_processor', event.type || 'error');
          throw new _sentry_utils__WEBPACK_IMPORTED_MODULE_14__.SentryError('An event processor returned `null`, will not send event.', 'log');
        }

        const isInternalException = hint.data && (hint.data ).__sentry__ === true;
        if (isInternalException || !beforeSendProcessor) {
          return prepared;
        }

        const beforeSendResult = beforeSendProcessor(prepared, hint);
        return _validateBeforeSendResult(beforeSendResult, beforeSendProcessorName);
      })
      .then(processedEvent => {
        if (processedEvent === null) {
          this.recordDroppedEvent('before_send', event.type || 'error');
          throw new _sentry_utils__WEBPACK_IMPORTED_MODULE_14__.SentryError(`\`${beforeSendProcessorName}\` returned \`null\`, will not send event.`, 'log');
        }

        const session = scope && scope.getSession();
        if (!isTransaction && session) {
          this._updateSessionFromEvent(session, processedEvent);
        }

        // None of the Sentry built event processor will update transaction name,
        // so if the transaction name has been changed by an event processor, we know
        // it has to come from custom event processor added by a user
        const transactionInfo = processedEvent.transaction_info;
        if (isTransaction && transactionInfo && processedEvent.transaction !== event.transaction) {
          const source = 'custom';
          processedEvent.transaction_info = {
            ...transactionInfo,
            source,
            changes: [
              ...transactionInfo.changes,
              {
                source,
                // use the same timestamp as the processed event.
                timestamp: processedEvent.timestamp ,
                propagations: transactionInfo.propagations,
              },
            ],
          };
        }

        this.sendEvent(processedEvent, hint);
        return processedEvent;
      })
      .then(null, reason => {
        if (reason instanceof _sentry_utils__WEBPACK_IMPORTED_MODULE_14__.SentryError) {
          throw reason;
        }

        this.captureException(reason, {
          data: {
            __sentry__: true,
          },
          originalException: reason ,
        });
        throw new _sentry_utils__WEBPACK_IMPORTED_MODULE_14__.SentryError(
          `Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: ${reason}`,
        );
      });
  }

  /**
   * Occupies the client with processing and event
   */
   _process(promise) {
    this._numProcessing += 1;
    void promise.then(
      value => {
        this._numProcessing -= 1;
        return value;
      },
      reason => {
        this._numProcessing -= 1;
        return reason;
      },
    );
  }

  /**
   * @inheritdoc
   */
   _sendEnvelope(envelope) {
    if (this._transport && this._dsn) {
      this._transport.send(envelope).then(null, reason => {
        (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) && _sentry_utils__WEBPACK_IMPORTED_MODULE_2__.logger.error('Error while sending event:', reason);
      });
    } else {
      (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) && _sentry_utils__WEBPACK_IMPORTED_MODULE_2__.logger.error('Transport disabled');
    }
  }

  /**
   * Clears outcomes on this client and returns them.
   */
   _clearOutcomes() {
    const outcomes = this._outcomes;
    this._outcomes = {};
    return Object.keys(outcomes).map(key => {
      const [reason, category] = key.split(':') ;
      return {
        reason,
        category,
        quantity: outcomes[key],
      };
    });
  }

  /**
   * @inheritDoc
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types

}

/**
 * Verifies that return value of configured `beforeSend` or `beforeSendTransaction` is of expected type, and returns the value if so.
 */
function _validateBeforeSendResult(
  beforeSendResult,
  beforeSendProcessorName,
) {
  const invalidValueError = `\`${beforeSendProcessorName}\` must return \`null\` or a valid event.`;
  if ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_4__.isThenable)(beforeSendResult)) {
    return beforeSendResult.then(
      event => {
        if (!(0,_sentry_utils__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(event) && event !== null) {
          throw new _sentry_utils__WEBPACK_IMPORTED_MODULE_14__.SentryError(invalidValueError);
        }
        return event;
      },
      e => {
        throw new _sentry_utils__WEBPACK_IMPORTED_MODULE_14__.SentryError(`\`${beforeSendProcessorName}\` rejected with ${e}`);
      },
    );
  } else if (!(0,_sentry_utils__WEBPACK_IMPORTED_MODULE_4__.isPlainObject)(beforeSendResult) && beforeSendResult !== null) {
    throw new _sentry_utils__WEBPACK_IMPORTED_MODULE_14__.SentryError(invalidValueError);
  }
  return beforeSendResult;
}


//# sourceMappingURL=baseclient.js.map


/***/ }),

/***/ "./node_modules/@sentry/core/esm/envelope.js":
/*!***************************************************!*\
  !*** ./node_modules/@sentry/core/esm/envelope.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createEventEnvelope": () => (/* binding */ createEventEnvelope),
/* harmony export */   "createSessionEnvelope": () => (/* binding */ createSessionEnvelope)
/* harmony export */ });
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/dsn.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/envelope.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/object.js");


/** Extract sdk info from from the API metadata */
function getSdkMetadataForEnvelopeHeader(metadata) {
  if (!metadata || !metadata.sdk) {
    return;
  }
  const { name, version } = metadata.sdk;
  return { name, version };
}

/**
 * Apply SdkInfo (name, version, packages, integrations) to the corresponding event key.
 * Merge with existing data if any.
 **/
function enhanceEventWithSdkInfo(event, sdkInfo) {
  if (!sdkInfo) {
    return event;
  }
  event.sdk = event.sdk || {};
  event.sdk.name = event.sdk.name || sdkInfo.name;
  event.sdk.version = event.sdk.version || sdkInfo.version;
  event.sdk.integrations = [...(event.sdk.integrations || []), ...(sdkInfo.integrations || [])];
  event.sdk.packages = [...(event.sdk.packages || []), ...(sdkInfo.packages || [])];
  return event;
}

/** Creates an envelope from a Session */
function createSessionEnvelope(
  session,
  dsn,
  metadata,
  tunnel,
) {
  const sdkInfo = getSdkMetadataForEnvelopeHeader(metadata);
  const envelopeHeaders = {
    sent_at: new Date().toISOString(),
    ...(sdkInfo && { sdk: sdkInfo }),
    ...(!!tunnel && { dsn: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.dsnToString)(dsn) }),
  };

  const envelopeItem =
    'aggregates' in session ? [{ type: 'sessions' }, session] : [{ type: 'session' }, session];

  return (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.createEnvelope)(envelopeHeaders, [envelopeItem]);
}

/**
 * Create an Envelope from an event.
 */
function createEventEnvelope(
  event,
  dsn,
  metadata,
  tunnel,
) {
  const sdkInfo = getSdkMetadataForEnvelopeHeader(metadata);
  const eventType = event.type || 'event';

  enhanceEventWithSdkInfo(event, metadata && metadata.sdk);

  const envelopeHeaders = createEventEnvelopeHeaders(event, sdkInfo, tunnel, dsn);

  // Prevent this data (which, if it exists, was used in earlier steps in the processing pipeline) from being sent to
  // sentry. (Note: Our use of this property comes and goes with whatever we might be debugging, whatever hacks we may
  // have temporarily added, etc. Even if we don't happen to be using it at some point in the future, let's not get rid
  // of this `delete`, lest we miss putting it back in the next time the property is in use.)
  delete event.sdkProcessingMetadata;

  const eventItem = [{ type: eventType }, event];
  return (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.createEnvelope)(envelopeHeaders, [eventItem]);
}

function createEventEnvelopeHeaders(
  event,
  sdkInfo,
  tunnel,
  dsn,
) {
  const dynamicSamplingContext = event.sdkProcessingMetadata && event.sdkProcessingMetadata.dynamicSamplingContext;

  return {
    event_id: event.event_id ,
    sent_at: new Date().toISOString(),
    ...(sdkInfo && { sdk: sdkInfo }),
    ...(!!tunnel && { dsn: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.dsnToString)(dsn) }),
    ...(event.type === 'transaction' &&
      dynamicSamplingContext && {
        trace: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.dropUndefinedKeys)({ ...dynamicSamplingContext }),
      }),
  };
}


//# sourceMappingURL=envelope.js.map


/***/ }),

/***/ "./node_modules/@sentry/core/esm/exports.js":
/*!**************************************************!*\
  !*** ./node_modules/@sentry/core/esm/exports.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addBreadcrumb": () => (/* binding */ addBreadcrumb),
/* harmony export */   "captureEvent": () => (/* binding */ captureEvent),
/* harmony export */   "captureException": () => (/* binding */ captureException),
/* harmony export */   "captureMessage": () => (/* binding */ captureMessage),
/* harmony export */   "configureScope": () => (/* binding */ configureScope),
/* harmony export */   "setContext": () => (/* binding */ setContext),
/* harmony export */   "setExtra": () => (/* binding */ setExtra),
/* harmony export */   "setExtras": () => (/* binding */ setExtras),
/* harmony export */   "setTag": () => (/* binding */ setTag),
/* harmony export */   "setTags": () => (/* binding */ setTags),
/* harmony export */   "setUser": () => (/* binding */ setUser),
/* harmony export */   "startTransaction": () => (/* binding */ startTransaction),
/* harmony export */   "withScope": () => (/* binding */ withScope)
/* harmony export */ });
/* harmony import */ var _hub_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hub.js */ "./node_modules/@sentry/core/esm/hub.js");


// Note: All functions in this file are typed with a return value of `ReturnType<Hub[HUB_FUNCTION]>`,
// where HUB_FUNCTION is some method on the Hub class.
//
// This is done to make sure the top level SDK methods stay in sync with the hub methods.
// Although every method here has an explicit return type, some of them (that map to void returns) do not
// contain `return` keywords. This is done to save on bundle size, as `return` is not minifiable.

/**
 * Captures an exception event and sends it to Sentry.
 *
 * @param exception An exception-like object.
 * @param captureContext Additional scope data to apply to exception event.
 * @returns The generated eventId.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
function captureException(exception, captureContext) {
  return (0,_hub_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentHub)().captureException(exception, { captureContext });
}

/**
 * Captures a message event and sends it to Sentry.
 *
 * @param message The message to send to Sentry.
 * @param Severity Define the level of the message.
 * @returns The generated eventId.
 */
function captureMessage(
  message,
  // eslint-disable-next-line deprecation/deprecation
  captureContext,
) {
  // This is necessary to provide explicit scopes upgrade, without changing the original
  // arity of the `captureMessage(message, level)` method.
  const level = typeof captureContext === 'string' ? captureContext : undefined;
  const context = typeof captureContext !== 'string' ? { captureContext } : undefined;
  return (0,_hub_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentHub)().captureMessage(message, level, context);
}

/**
 * Captures a manually created event and sends it to Sentry.
 *
 * @param event The event to send to Sentry.
 * @returns The generated eventId.
 */
function captureEvent(event, hint) {
  return (0,_hub_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentHub)().captureEvent(event, hint);
}

/**
 * Callback to set context information onto the scope.
 * @param callback Callback function that receives Scope.
 */
function configureScope(callback) {
  (0,_hub_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentHub)().configureScope(callback);
}

/**
 * Records a new breadcrumb which will be attached to future events.
 *
 * Breadcrumbs will be added to subsequent events to provide more context on
 * user's actions prior to an error or crash.
 *
 * @param breadcrumb The breadcrumb to record.
 */
function addBreadcrumb(breadcrumb) {
  (0,_hub_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentHub)().addBreadcrumb(breadcrumb);
}

/**
 * Sets context data with the given name.
 * @param name of the context
 * @param context Any kind of data. This data will be normalized.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setContext(name, context) {
  (0,_hub_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentHub)().setContext(name, context);
}

/**
 * Set an object that will be merged sent as extra data with the event.
 * @param extras Extras object to merge into current context.
 */
function setExtras(extras) {
  (0,_hub_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentHub)().setExtras(extras);
}

/**
 * Set key:value that will be sent as extra data with the event.
 * @param key String of extra
 * @param extra Any kind of data. This data will be normalized.
 */
function setExtra(key, extra) {
  (0,_hub_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentHub)().setExtra(key, extra);
}

/**
 * Set an object that will be merged sent as tags data with the event.
 * @param tags Tags context object to merge into current context.
 */
function setTags(tags) {
  (0,_hub_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentHub)().setTags(tags);
}

/**
 * Set key:value that will be sent as tags data with the event.
 *
 * Can also be used to unset a tag, by passing `undefined`.
 *
 * @param key String key of tag
 * @param value Value of tag
 */
function setTag(key, value) {
  (0,_hub_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentHub)().setTag(key, value);
}

/**
 * Updates user context information for future events.
 *
 * @param user User context object to be set in the current context. Pass `null` to unset the user.
 */
function setUser(user) {
  (0,_hub_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentHub)().setUser(user);
}

/**
 * Creates a new scope with and executes the given operation within.
 * The scope is automatically removed once the operation
 * finishes or throws.
 *
 * This is essentially a convenience function for:
 *
 *     pushScope();
 *     callback();
 *     popScope();
 *
 * @param callback that will be enclosed into push/popScope.
 */
function withScope(callback) {
  (0,_hub_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentHub)().withScope(callback);
}

/**
 * Starts a new `Transaction` and returns it. This is the entry point to manual tracing instrumentation.
 *
 * A tree structure can be built by adding child spans to the transaction, and child spans to other spans. To start a
 * new child span within the transaction or any span, call the respective `.startChild()` method.
 *
 * Every child span must be finished before the transaction is finished, otherwise the unfinished spans are discarded.
 *
 * The transaction must be finished with a call to its `.finish()` method, at which point the transaction with all its
 * finished child spans will be sent to Sentry.
 *
 * NOTE: This function should only be used for *manual* instrumentation. Auto-instrumentation should call
 * `startTransaction` directly on the hub.
 *
 * @param context Properties of the new `Transaction`.
 * @param customSamplingContext Information given to the transaction sampling function (along with context-dependent
 * default values). See {@link Options.tracesSampler}.
 *
 * @returns The transaction which was just started
 */
function startTransaction(
  context,
  customSamplingContext,
) {
  return (0,_hub_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentHub)().startTransaction({ ...context }, customSamplingContext);
}


//# sourceMappingURL=exports.js.map


/***/ }),

/***/ "./node_modules/@sentry/core/esm/hub.js":
/*!**********************************************!*\
  !*** ./node_modules/@sentry/core/esm/hub.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "API_VERSION": () => (/* binding */ API_VERSION),
/* harmony export */   "Hub": () => (/* binding */ Hub),
/* harmony export */   "getCurrentHub": () => (/* binding */ getCurrentHub),
/* harmony export */   "getHubFromCarrier": () => (/* binding */ getHubFromCarrier),
/* harmony export */   "getMainCarrier": () => (/* binding */ getMainCarrier),
/* harmony export */   "makeMain": () => (/* binding */ makeMain),
/* harmony export */   "setHubOnCarrier": () => (/* binding */ setHubOnCarrier)
/* harmony export */ });
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/time.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/logger.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/worldwide.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/node.js");
/* harmony import */ var _scope_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scope.js */ "./node_modules/@sentry/core/esm/scope.js");
/* harmony import */ var _session_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./session.js */ "./node_modules/@sentry/core/esm/session.js");




const NIL_EVENT_ID = '00000000000000000000000000000000';

/**
 * API compatibility version of this hub.
 *
 * WARNING: This number should only be increased when the global interface
 * changes and new methods are introduced.
 *
 * @hidden
 */
const API_VERSION = 4;

/**
 * Default maximum number of breadcrumbs added to an event. Can be overwritten
 * with {@link Options.maxBreadcrumbs}.
 */
const DEFAULT_BREADCRUMBS = 100;

/**
 * A layer in the process stack.
 * @hidden
 */

/**
 * @inheritDoc
 */
class Hub  {
  /** Is a {@link Layer}[] containing the client and scope */
    __init() {this._stack = [{}];}

  /** Contains the last event id of a captured event.  */

  /**
   * Creates a new instance of the hub, will push one {@link Layer} into the
   * internal stack on creation.
   *
   * @param client bound to the hub.
   * @param scope bound to the hub.
   * @param version number, higher number means higher priority.
   */
   constructor(client, scope = new _scope_js__WEBPACK_IMPORTED_MODULE_0__.Scope(),   _version = API_VERSION) {;this._version = _version;Hub.prototype.__init.call(this);
    this.getStackTop().scope = scope;
    if (client) {
      this.bindClient(client);
    }
  }

  /**
   * @inheritDoc
   */
   isOlderThan(version) {
    return this._version < version;
  }

  /**
   * @inheritDoc
   */
   bindClient(client) {
    const top = this.getStackTop();
    top.client = client;
    if (client && client.setupIntegrations) {
      client.setupIntegrations();
    }
  }

  /**
   * @inheritDoc
   */
   pushScope() {
    // We want to clone the content of prev scope
    const scope = _scope_js__WEBPACK_IMPORTED_MODULE_0__.Scope.clone(this.getScope());
    this.getStack().push({
      client: this.getClient(),
      scope,
    });
    return scope;
  }

  /**
   * @inheritDoc
   */
   popScope() {
    if (this.getStack().length <= 1) return false;
    return !!this.getStack().pop();
  }

  /**
   * @inheritDoc
   */
   withScope(callback) {
    const scope = this.pushScope();
    try {
      callback(scope);
    } finally {
      this.popScope();
    }
  }

  /**
   * @inheritDoc
   */
   getClient() {
    return this.getStackTop().client ;
  }

  /** Returns the scope of the top stack. */
   getScope() {
    return this.getStackTop().scope;
  }

  /** Returns the scope stack for domains or the process. */
   getStack() {
    return this._stack;
  }

  /** Returns the topmost scope layer in the order domain > local > process. */
   getStackTop() {
    return this._stack[this._stack.length - 1];
  }

  /**
   * @inheritDoc
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
   captureException(exception, hint) {
    const syntheticException = new Error('Sentry syntheticException');
    this._lastEventId =
      this._withClient((client, scope) => {
        return client.captureException(
          exception,
          {
            originalException: exception,
            syntheticException,
            ...hint,
          },
          scope,
        );
      }) || NIL_EVENT_ID;
    return this._lastEventId;
  }

  /**
   * @inheritDoc
   */
   captureMessage(
    message,
    // eslint-disable-next-line deprecation/deprecation
    level,
    hint,
  ) {
    const syntheticException = new Error(message);
    this._lastEventId =
      this._withClient((client, scope) => {
        return client.captureMessage(
          message,
          level,
          {
            originalException: message,
            syntheticException,
            ...hint,
          },
          scope,
        );
      }) || NIL_EVENT_ID;
    return this._lastEventId;
  }

  /**
   * @inheritDoc
   */
   captureEvent(event, hint) {
    const clientId =
      this._withClient((client, scope) => {
        return client.captureEvent(event, { ...hint }, scope);
      }) || NIL_EVENT_ID;

    if (event.type !== 'transaction') {
      this._lastEventId = clientId;
    }

    return clientId;
  }

  /**
   * @inheritDoc
   */
   lastEventId() {
    return this._lastEventId;
  }

  /**
   * @inheritDoc
   */
   addBreadcrumb(breadcrumb, hint) {
    const { scope, client } = this.getStackTop();

    if (!scope || !client) return;

    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { beforeBreadcrumb = null, maxBreadcrumbs = DEFAULT_BREADCRUMBS } =
      (client.getOptions && client.getOptions()) || {};

    if (maxBreadcrumbs <= 0) return;

    const timestamp = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.dateTimestampInSeconds)();
    const mergedBreadcrumb = { timestamp, ...breadcrumb };
    const finalBreadcrumb = beforeBreadcrumb
      ? ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.consoleSandbox)(() => beforeBreadcrumb(mergedBreadcrumb, hint)) )
      : mergedBreadcrumb;

    if (finalBreadcrumb === null) return;

    scope.addBreadcrumb(finalBreadcrumb, maxBreadcrumbs);
  }

  /**
   * @inheritDoc
   */
   setUser(user) {
    const scope = this.getScope();
    if (scope) scope.setUser(user);
  }

  /**
   * @inheritDoc
   */
   setTags(tags) {
    const scope = this.getScope();
    if (scope) scope.setTags(tags);
  }

  /**
   * @inheritDoc
   */
   setExtras(extras) {
    const scope = this.getScope();
    if (scope) scope.setExtras(extras);
  }

  /**
   * @inheritDoc
   */
   setTag(key, value) {
    const scope = this.getScope();
    if (scope) scope.setTag(key, value);
  }

  /**
   * @inheritDoc
   */
   setExtra(key, extra) {
    const scope = this.getScope();
    if (scope) scope.setExtra(key, extra);
  }

  /**
   * @inheritDoc
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
   setContext(name, context) {
    const scope = this.getScope();
    if (scope) scope.setContext(name, context);
  }

  /**
   * @inheritDoc
   */
   configureScope(callback) {
    const { scope, client } = this.getStackTop();
    if (scope && client) {
      callback(scope);
    }
  }

  /**
   * @inheritDoc
   */
   run(callback) {
    const oldHub = makeMain(this);
    try {
      callback(this);
    } finally {
      makeMain(oldHub);
    }
  }

  /**
   * @inheritDoc
   */
   getIntegration(integration) {
    const client = this.getClient();
    if (!client) return null;
    try {
      return client.getIntegration(integration);
    } catch (_oO) {
      (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) && _sentry_utils__WEBPACK_IMPORTED_MODULE_2__.logger.warn(`Cannot retrieve integration ${integration.id} from the current Hub`);
      return null;
    }
  }

  /**
   * @inheritDoc
   */
   startTransaction(context, customSamplingContext) {
    return this._callExtensionMethod('startTransaction', context, customSamplingContext);
  }

  /**
   * @inheritDoc
   */
   traceHeaders() {
    return this._callExtensionMethod('traceHeaders');
  }

  /**
   * @inheritDoc
   */
   captureSession(endSession = false) {
    // both send the update and pull the session from the scope
    if (endSession) {
      return this.endSession();
    }

    // only send the update
    this._sendSessionUpdate();
  }

  /**
   * @inheritDoc
   */
   endSession() {
    const layer = this.getStackTop();
    const scope = layer && layer.scope;
    const session = scope && scope.getSession();
    if (session) {
      (0,_session_js__WEBPACK_IMPORTED_MODULE_3__.closeSession)(session);
    }
    this._sendSessionUpdate();

    // the session is over; take it off of the scope
    if (scope) {
      scope.setSession();
    }
  }

  /**
   * @inheritDoc
   */
   startSession(context) {
    const { scope, client } = this.getStackTop();
    const { release, environment } = (client && client.getOptions()) || {};

    // Will fetch userAgent if called from browser sdk
    const { userAgent } = _sentry_utils__WEBPACK_IMPORTED_MODULE_4__.GLOBAL_OBJ.navigator || {};

    const session = (0,_session_js__WEBPACK_IMPORTED_MODULE_3__.makeSession)({
      release,
      environment,
      ...(scope && { user: scope.getUser() }),
      ...(userAgent && { userAgent }),
      ...context,
    });

    if (scope) {
      // End existing session if there's one
      const currentSession = scope.getSession && scope.getSession();
      if (currentSession && currentSession.status === 'ok') {
        (0,_session_js__WEBPACK_IMPORTED_MODULE_3__.updateSession)(currentSession, { status: 'exited' });
      }
      this.endSession();

      // Afterwards we set the new session on the scope
      scope.setSession(session);
    }

    return session;
  }

  /**
   * Returns if default PII should be sent to Sentry and propagated in ourgoing requests
   * when Tracing is used.
   */
   shouldSendDefaultPii() {
    const client = this.getClient();
    const options = client && client.getOptions();
    return Boolean(options && options.sendDefaultPii);
  }

  /**
   * Sends the current Session on the scope
   */
   _sendSessionUpdate() {
    const { scope, client } = this.getStackTop();
    if (!scope) return;

    const session = scope.getSession();
    if (session) {
      if (client && client.captureSession) {
        client.captureSession(session);
      }
    }
  }

  /**
   * Internal helper function to call a method on the top client if it exists.
   *
   * @param method The method to call on the client.
   * @param args Arguments to pass to the client function.
   */
   _withClient(callback) {
    const { scope, client } = this.getStackTop();
    return client && callback(client, scope);
  }

  /**
   * Calls global extension method and binding current instance to the function call
   */
  // @ts-ignore Function lacks ending return statement and return type does not include 'undefined'. ts(2366)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
   _callExtensionMethod(method, ...args) {
    const carrier = getMainCarrier();
    const sentry = carrier.__SENTRY__;
    if (sentry && sentry.extensions && typeof sentry.extensions[method] === 'function') {
      return sentry.extensions[method].apply(this, args);
    }
    (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) && _sentry_utils__WEBPACK_IMPORTED_MODULE_2__.logger.warn(`Extension method ${method} couldn't be found, doing nothing.`);
  }
}

/**
 * Returns the global shim registry.
 *
 * FIXME: This function is problematic, because despite always returning a valid Carrier,
 * it has an optional `__SENTRY__` property, which then in turn requires us to always perform an unnecessary check
 * at the call-site. We always access the carrier through this function, so we can guarantee that `__SENTRY__` is there.
 **/
function getMainCarrier() {
  _sentry_utils__WEBPACK_IMPORTED_MODULE_4__.GLOBAL_OBJ.__SENTRY__ = _sentry_utils__WEBPACK_IMPORTED_MODULE_4__.GLOBAL_OBJ.__SENTRY__ || {
    extensions: {},
    hub: undefined,
  };
  return _sentry_utils__WEBPACK_IMPORTED_MODULE_4__.GLOBAL_OBJ;
}

/**
 * Replaces the current main hub with the passed one on the global object
 *
 * @returns The old replaced hub
 */
function makeMain(hub) {
  const registry = getMainCarrier();
  const oldHub = getHubFromCarrier(registry);
  setHubOnCarrier(registry, hub);
  return oldHub;
}

/**
 * Returns the default hub instance.
 *
 * If a hub is already registered in the global carrier but this module
 * contains a more recent version, it replaces the registered version.
 * Otherwise, the currently registered hub will be returned.
 */
function getCurrentHub() {
  // Get main carrier (global for every environment)
  const registry = getMainCarrier();

  // If there's no hub, or its an old API, assign a new one
  if (!hasHubOnCarrier(registry) || getHubFromCarrier(registry).isOlderThan(API_VERSION)) {
    setHubOnCarrier(registry, new Hub());
  }

  // Prefer domains over global if they are there (applicable only to Node environment)
  if ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.isNodeEnv)()) {
    return getHubFromActiveDomain(registry);
  }
  // Return hub that lives on a global object
  return getHubFromCarrier(registry);
}

/**
 * Try to read the hub from an active domain, and fallback to the registry if one doesn't exist
 * @returns discovered hub
 */
function getHubFromActiveDomain(registry) {
  try {
    const sentry = getMainCarrier().__SENTRY__;
    const activeDomain = sentry && sentry.extensions && sentry.extensions.domain && sentry.extensions.domain.active;

    // If there's no active domain, just return global hub
    if (!activeDomain) {
      return getHubFromCarrier(registry);
    }

    // If there's no hub on current domain, or it's an old API, assign a new one
    if (!hasHubOnCarrier(activeDomain) || getHubFromCarrier(activeDomain).isOlderThan(API_VERSION)) {
      const registryHubTopStack = getHubFromCarrier(registry).getStackTop();
      setHubOnCarrier(activeDomain, new Hub(registryHubTopStack.client, _scope_js__WEBPACK_IMPORTED_MODULE_0__.Scope.clone(registryHubTopStack.scope)));
    }

    // Return hub that lives on a domain
    return getHubFromCarrier(activeDomain);
  } catch (_Oo) {
    // Return hub that lives on a global object
    return getHubFromCarrier(registry);
  }
}

/**
 * This will tell whether a carrier has a hub on it or not
 * @param carrier object
 */
function hasHubOnCarrier(carrier) {
  return !!(carrier && carrier.__SENTRY__ && carrier.__SENTRY__.hub);
}

/**
 * This will create a new {@link Hub} and add to the passed object on
 * __SENTRY__.hub.
 * @param carrier object
 * @hidden
 */
function getHubFromCarrier(carrier) {
  return (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_4__.getGlobalSingleton)('hub', () => new Hub(), carrier);
}

/**
 * This will set passed {@link Hub} on the passed object's __SENTRY__.hub attribute
 * @param carrier object
 * @param hub Hub
 * @returns A boolean indicating success or failure
 */
function setHubOnCarrier(carrier, hub) {
  if (!carrier) return false;
  const __SENTRY__ = (carrier.__SENTRY__ = carrier.__SENTRY__ || {});
  __SENTRY__.hub = hub;
  return true;
}


//# sourceMappingURL=hub.js.map


/***/ }),

/***/ "./node_modules/@sentry/core/esm/integration.js":
/*!******************************************************!*\
  !*** ./node_modules/@sentry/core/esm/integration.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getIntegrationsToSetup": () => (/* binding */ getIntegrationsToSetup),
/* harmony export */   "installedIntegrations": () => (/* binding */ installedIntegrations),
/* harmony export */   "setupIntegrations": () => (/* binding */ setupIntegrations)
/* harmony export */ });
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/logger.js");
/* harmony import */ var _hub_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hub.js */ "./node_modules/@sentry/core/esm/hub.js");
/* harmony import */ var _scope_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scope.js */ "./node_modules/@sentry/core/esm/scope.js");




const installedIntegrations = [];

/** Map of integrations assigned to a client */

/**
 * Remove duplicates from the given array, preferring the last instance of any duplicate. Not guaranteed to
 * preseve the order of integrations in the array.
 *
 * @private
 */
function filterDuplicates(integrations) {
  const integrationsByName = {};

  integrations.forEach(currentInstance => {
    const { name } = currentInstance;

    const existingInstance = integrationsByName[name];

    // We want integrations later in the array to overwrite earlier ones of the same type, except that we never want a
    // default instance to overwrite an existing user instance
    if (existingInstance && !existingInstance.isDefaultInstance && currentInstance.isDefaultInstance) {
      return;
    }

    integrationsByName[name] = currentInstance;
  });

  return Object.values(integrationsByName);
}

/** Gets integrations to install */
function getIntegrationsToSetup(options) {
  const defaultIntegrations = options.defaultIntegrations || [];
  const userIntegrations = options.integrations;

  // We flag default instances, so that later we can tell them apart from any user-created instances of the same class
  defaultIntegrations.forEach(integration => {
    integration.isDefaultInstance = true;
  });

  let integrations;

  if (Array.isArray(userIntegrations)) {
    integrations = [...defaultIntegrations, ...userIntegrations];
  } else if (typeof userIntegrations === 'function') {
    integrations = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.arrayify)(userIntegrations(defaultIntegrations));
  } else {
    integrations = defaultIntegrations;
  }

  const finalIntegrations = filterDuplicates(integrations);

  // The `Debug` integration prints copies of the `event` and `hint` which will be passed to `beforeSend` or
  // `beforeSendTransaction`. It therefore has to run after all other integrations, so that the changes of all event
  // processors will be reflected in the printed values. For lack of a more elegant way to guarantee that, we therefore
  // locate it and, assuming it exists, pop it out of its current spot and shove it onto the end of the array.
  const debugIndex = finalIntegrations.findIndex(integration => integration.name === 'Debug');
  if (debugIndex !== -1) {
    const [debugInstance] = finalIntegrations.splice(debugIndex, 1);
    finalIntegrations.push(debugInstance);
  }

  return finalIntegrations;
}

/**
 * Given a list of integration instances this installs them all. When `withDefaults` is set to `true` then all default
 * integrations are added unless they were already provided before.
 * @param integrations array of integration instances
 * @param withDefault should enable default integrations
 */
function setupIntegrations(integrations) {
  const integrationIndex = {};

  integrations.forEach(integration => {
    integrationIndex[integration.name] = integration;

    if (installedIntegrations.indexOf(integration.name) === -1) {
      integration.setupOnce(_scope_js__WEBPACK_IMPORTED_MODULE_1__.addGlobalEventProcessor, _hub_js__WEBPACK_IMPORTED_MODULE_2__.getCurrentHub);
      installedIntegrations.push(integration.name);
      (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) && _sentry_utils__WEBPACK_IMPORTED_MODULE_3__.logger.log(`Integration installed: ${integration.name}`);
    }
  });

  return integrationIndex;
}


//# sourceMappingURL=integration.js.map


/***/ }),

/***/ "./node_modules/@sentry/core/esm/integrations/functiontostring.js":
/*!************************************************************************!*\
  !*** ./node_modules/@sentry/core/esm/integrations/functiontostring.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FunctionToString": () => (/* binding */ FunctionToString)
/* harmony export */ });
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/object.js");


let originalFunctionToString;

/** Patch toString calls to return proper name for wrapped functions */
class FunctionToString  {constructor() { FunctionToString.prototype.__init.call(this); }
  /**
   * @inheritDoc
   */
   static __initStatic() {this.id = 'FunctionToString';}

  /**
   * @inheritDoc
   */
   __init() {this.name = FunctionToString.id;}

  /**
   * @inheritDoc
   */
   setupOnce() {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    originalFunctionToString = Function.prototype.toString;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Function.prototype.toString = function ( ...args) {
      const context = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.getOriginalFunction)(this) || this;
      return originalFunctionToString.apply(context, args);
    };
  }
} FunctionToString.__initStatic();


//# sourceMappingURL=functiontostring.js.map


/***/ }),

/***/ "./node_modules/@sentry/core/esm/integrations/inboundfilters.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@sentry/core/esm/integrations/inboundfilters.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InboundFilters": () => (/* binding */ InboundFilters),
/* harmony export */   "_mergeOptions": () => (/* binding */ _mergeOptions),
/* harmony export */   "_shouldDropEvent": () => (/* binding */ _shouldDropEvent)
/* harmony export */ });
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/logger.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/string.js");


// "Script error." is hard coded into browsers for errors that it can't read.
// this is the result of a script being pulled in from an external domain and CORS.
const DEFAULT_IGNORE_ERRORS = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/];

/** Options for the InboundFilters integration */

/** Inbound filters configurable by the user */
class InboundFilters  {
  /**
   * @inheritDoc
   */
   static __initStatic() {this.id = 'InboundFilters';}

  /**
   * @inheritDoc
   */
   __init() {this.name = InboundFilters.id;}

   constructor(  _options = {}) {;this._options = _options;InboundFilters.prototype.__init.call(this);}

  /**
   * @inheritDoc
   */
   setupOnce(addGlobalEventProcessor, getCurrentHub) {
    const eventProcess = (event) => {
      const hub = getCurrentHub();
      if (hub) {
        const self = hub.getIntegration(InboundFilters);
        if (self) {
          const client = hub.getClient();
          const clientOptions = client ? client.getOptions() : {};
          const options = _mergeOptions(self._options, clientOptions);
          return _shouldDropEvent(event, options) ? null : event;
        }
      }
      return event;
    };

    eventProcess.id = this.name;
    addGlobalEventProcessor(eventProcess);
  }
} InboundFilters.__initStatic();

/** JSDoc */
function _mergeOptions(
  internalOptions = {},
  clientOptions = {},
) {
  return {
    allowUrls: [...(internalOptions.allowUrls || []), ...(clientOptions.allowUrls || [])],
    denyUrls: [...(internalOptions.denyUrls || []), ...(clientOptions.denyUrls || [])],
    ignoreErrors: [
      ...(internalOptions.ignoreErrors || []),
      ...(clientOptions.ignoreErrors || []),
      ...DEFAULT_IGNORE_ERRORS,
    ],
    ignoreInternal: internalOptions.ignoreInternal !== undefined ? internalOptions.ignoreInternal : true,
  };
}

/** JSDoc */
function _shouldDropEvent(event, options) {
  if (options.ignoreInternal && _isSentryError(event)) {
    (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) &&
      _sentry_utils__WEBPACK_IMPORTED_MODULE_0__.logger.warn(`Event dropped due to being internal Sentry Error.\nEvent: ${(0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.getEventDescription)(event)}`);
    return true;
  }
  if (_isIgnoredError(event, options.ignoreErrors)) {
    (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) &&
      _sentry_utils__WEBPACK_IMPORTED_MODULE_0__.logger.warn(
        `Event dropped due to being matched by \`ignoreErrors\` option.\nEvent: ${(0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.getEventDescription)(event)}`,
      );
    return true;
  }
  if (_isDeniedUrl(event, options.denyUrls)) {
    (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) &&
      _sentry_utils__WEBPACK_IMPORTED_MODULE_0__.logger.warn(
        `Event dropped due to being matched by \`denyUrls\` option.\nEvent: ${(0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.getEventDescription)(
          event,
        )}.\nUrl: ${_getEventFilterUrl(event)}`,
      );
    return true;
  }
  if (!_isAllowedUrl(event, options.allowUrls)) {
    (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) &&
      _sentry_utils__WEBPACK_IMPORTED_MODULE_0__.logger.warn(
        `Event dropped due to not being matched by \`allowUrls\` option.\nEvent: ${(0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.getEventDescription)(
          event,
        )}.\nUrl: ${_getEventFilterUrl(event)}`,
      );
    return true;
  }
  return false;
}

function _isIgnoredError(event, ignoreErrors) {
  if (!ignoreErrors || !ignoreErrors.length) {
    return false;
  }

  return _getPossibleEventMessages(event).some(message => (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.stringMatchesSomePattern)(message, ignoreErrors));
}

function _isDeniedUrl(event, denyUrls) {
  // TODO: Use Glob instead?
  if (!denyUrls || !denyUrls.length) {
    return false;
  }
  const url = _getEventFilterUrl(event);
  return !url ? false : (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.stringMatchesSomePattern)(url, denyUrls);
}

function _isAllowedUrl(event, allowUrls) {
  // TODO: Use Glob instead?
  if (!allowUrls || !allowUrls.length) {
    return true;
  }
  const url = _getEventFilterUrl(event);
  return !url ? true : (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.stringMatchesSomePattern)(url, allowUrls);
}

function _getPossibleEventMessages(event) {
  if (event.message) {
    return [event.message];
  }
  if (event.exception) {
    try {
      const { type = '', value = '' } = (event.exception.values && event.exception.values[0]) || {};
      return [`${value}`, `${type}: ${value}`];
    } catch (oO) {
      (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) && _sentry_utils__WEBPACK_IMPORTED_MODULE_0__.logger.error(`Cannot extract message for event ${(0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.getEventDescription)(event)}`);
      return [];
    }
  }
  return [];
}

function _isSentryError(event) {
  try {
    // @ts-ignore can't be a sentry error if undefined
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return event.exception.values[0].type === 'SentryError';
  } catch (e) {
    // ignore
  }
  return false;
}

function _getLastValidUrl(frames = []) {
  for (let i = frames.length - 1; i >= 0; i--) {
    const frame = frames[i];

    if (frame && frame.filename !== '<anonymous>' && frame.filename !== '[native code]') {
      return frame.filename || null;
    }
  }

  return null;
}

function _getEventFilterUrl(event) {
  try {
    let frames;
    try {
      // @ts-ignore we only care about frames if the whole thing here is defined
      frames = event.exception.values[0].stacktrace.frames;
    } catch (e) {
      // ignore
    }
    return frames ? _getLastValidUrl(frames) : null;
  } catch (oO) {
    (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) && _sentry_utils__WEBPACK_IMPORTED_MODULE_0__.logger.error(`Cannot extract url for event ${(0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.getEventDescription)(event)}`);
    return null;
  }
}


//# sourceMappingURL=inboundfilters.js.map


/***/ }),

/***/ "./node_modules/@sentry/core/esm/integrations/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/@sentry/core/esm/integrations/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FunctionToString": () => (/* reexport safe */ _functiontostring_js__WEBPACK_IMPORTED_MODULE_0__.FunctionToString),
/* harmony export */   "InboundFilters": () => (/* reexport safe */ _inboundfilters_js__WEBPACK_IMPORTED_MODULE_1__.InboundFilters)
/* harmony export */ });
/* harmony import */ var _functiontostring_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functiontostring.js */ "./node_modules/@sentry/core/esm/integrations/functiontostring.js");
/* harmony import */ var _inboundfilters_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inboundfilters.js */ "./node_modules/@sentry/core/esm/integrations/inboundfilters.js");


//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/@sentry/core/esm/scope.js":
/*!************************************************!*\
  !*** ./node_modules/@sentry/core/esm/scope.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Scope": () => (/* binding */ Scope),
/* harmony export */   "addGlobalEventProcessor": () => (/* binding */ addGlobalEventProcessor)
/* harmony export */ });
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/is.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/time.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/syncpromise.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/logger.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/worldwide.js");
/* harmony import */ var _session_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./session.js */ "./node_modules/@sentry/core/esm/session.js");



/**
 * Default value for maximum number of breadcrumbs added to an event.
 */
const DEFAULT_MAX_BREADCRUMBS = 100;

/**
 * Holds additional event information. {@link Scope.applyToEvent} will be
 * called by the client before an event will be sent.
 */
class Scope  {
  /** Flag if notifying is happening. */

  /** Callback for client to receive scope changes. */

  /** Callback list that will be called after {@link applyToEvent}. */

  /** Array of breadcrumbs. */

  /** User */

  /** Tags */

  /** Extra */

  /** Contexts */

  /** Attachments */

  /**
   * A place to stash data which is needed at some point in the SDK's event processing pipeline but which shouldn't get
   * sent to Sentry
   */

  /** Fingerprint */

  /** Severity */
  // eslint-disable-next-line deprecation/deprecation

  /** Transaction Name */

  /** Span */

  /** Session */

  /** Request Mode Session Status */

  // NOTE: Any field which gets added here should get added not only to the constructor but also to the `clone` method.

   constructor() {
    this._notifyingListeners = false;
    this._scopeListeners = [];
    this._eventProcessors = [];
    this._breadcrumbs = [];
    this._attachments = [];
    this._user = {};
    this._tags = {};
    this._extra = {};
    this._contexts = {};
    this._sdkProcessingMetadata = {};
  }

  /**
   * Inherit values from the parent scope.
   * @param scope to clone.
   */
   static clone(scope) {
    const newScope = new Scope();
    if (scope) {
      newScope._breadcrumbs = [...scope._breadcrumbs];
      newScope._tags = { ...scope._tags };
      newScope._extra = { ...scope._extra };
      newScope._contexts = { ...scope._contexts };
      newScope._user = scope._user;
      newScope._level = scope._level;
      newScope._span = scope._span;
      newScope._session = scope._session;
      newScope._transactionName = scope._transactionName;
      newScope._fingerprint = scope._fingerprint;
      newScope._eventProcessors = [...scope._eventProcessors];
      newScope._requestSession = scope._requestSession;
      newScope._attachments = [...scope._attachments];
      newScope._sdkProcessingMetadata = { ...scope._sdkProcessingMetadata };
    }
    return newScope;
  }

  /**
   * Add internal on change listener. Used for sub SDKs that need to store the scope.
   * @hidden
   */
   addScopeListener(callback) {
    this._scopeListeners.push(callback);
  }

  /**
   * @inheritDoc
   */
   addEventProcessor(callback) {
    this._eventProcessors.push(callback);
    return this;
  }

  /**
   * @inheritDoc
   */
   setUser(user) {
    this._user = user || {};
    if (this._session) {
      (0,_session_js__WEBPACK_IMPORTED_MODULE_0__.updateSession)(this._session, { user });
    }
    this._notifyScopeListeners();
    return this;
  }

  /**
   * @inheritDoc
   */
   getUser() {
    return this._user;
  }

  /**
   * @inheritDoc
   */
   getRequestSession() {
    return this._requestSession;
  }

  /**
   * @inheritDoc
   */
   setRequestSession(requestSession) {
    this._requestSession = requestSession;
    return this;
  }

  /**
   * @inheritDoc
   */
   setTags(tags) {
    this._tags = {
      ...this._tags,
      ...tags,
    };
    this._notifyScopeListeners();
    return this;
  }

  /**
   * @inheritDoc
   */
   setTag(key, value) {
    this._tags = { ...this._tags, [key]: value };
    this._notifyScopeListeners();
    return this;
  }

  /**
   * @inheritDoc
   */
   setExtras(extras) {
    this._extra = {
      ...this._extra,
      ...extras,
    };
    this._notifyScopeListeners();
    return this;
  }

  /**
   * @inheritDoc
   */
   setExtra(key, extra) {
    this._extra = { ...this._extra, [key]: extra };
    this._notifyScopeListeners();
    return this;
  }

  /**
   * @inheritDoc
   */
   setFingerprint(fingerprint) {
    this._fingerprint = fingerprint;
    this._notifyScopeListeners();
    return this;
  }

  /**
   * @inheritDoc
   */
   setLevel(
    // eslint-disable-next-line deprecation/deprecation
    level,
  ) {
    this._level = level;
    this._notifyScopeListeners();
    return this;
  }

  /**
   * @inheritDoc
   */
   setTransactionName(name) {
    this._transactionName = name;
    this._notifyScopeListeners();
    return this;
  }

  /**
   * @inheritDoc
   */
   setContext(key, context) {
    if (context === null) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete this._contexts[key];
    } else {
      this._contexts[key] = context;
    }

    this._notifyScopeListeners();
    return this;
  }

  /**
   * @inheritDoc
   */
   setSpan(span) {
    this._span = span;
    this._notifyScopeListeners();
    return this;
  }

  /**
   * @inheritDoc
   */
   getSpan() {
    return this._span;
  }

  /**
   * @inheritDoc
   */
   getTransaction() {
    // Often, this span (if it exists at all) will be a transaction, but it's not guaranteed to be. Regardless, it will
    // have a pointer to the currently-active transaction.
    const span = this.getSpan();
    return span && span.transaction;
  }

  /**
   * @inheritDoc
   */
   setSession(session) {
    if (!session) {
      delete this._session;
    } else {
      this._session = session;
    }
    this._notifyScopeListeners();
    return this;
  }

  /**
   * @inheritDoc
   */
   getSession() {
    return this._session;
  }

  /**
   * @inheritDoc
   */
   update(captureContext) {
    if (!captureContext) {
      return this;
    }

    if (typeof captureContext === 'function') {
      const updatedScope = (captureContext )(this);
      return updatedScope instanceof Scope ? updatedScope : this;
    }

    if (captureContext instanceof Scope) {
      this._tags = { ...this._tags, ...captureContext._tags };
      this._extra = { ...this._extra, ...captureContext._extra };
      this._contexts = { ...this._contexts, ...captureContext._contexts };
      if (captureContext._user && Object.keys(captureContext._user).length) {
        this._user = captureContext._user;
      }
      if (captureContext._level) {
        this._level = captureContext._level;
      }
      if (captureContext._fingerprint) {
        this._fingerprint = captureContext._fingerprint;
      }
      if (captureContext._requestSession) {
        this._requestSession = captureContext._requestSession;
      }
    } else if ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.isPlainObject)(captureContext)) {
      // eslint-disable-next-line no-param-reassign
      captureContext = captureContext ;
      this._tags = { ...this._tags, ...captureContext.tags };
      this._extra = { ...this._extra, ...captureContext.extra };
      this._contexts = { ...this._contexts, ...captureContext.contexts };
      if (captureContext.user) {
        this._user = captureContext.user;
      }
      if (captureContext.level) {
        this._level = captureContext.level;
      }
      if (captureContext.fingerprint) {
        this._fingerprint = captureContext.fingerprint;
      }
      if (captureContext.requestSession) {
        this._requestSession = captureContext.requestSession;
      }
    }

    return this;
  }

  /**
   * @inheritDoc
   */
   clear() {
    this._breadcrumbs = [];
    this._tags = {};
    this._extra = {};
    this._user = {};
    this._contexts = {};
    this._level = undefined;
    this._transactionName = undefined;
    this._fingerprint = undefined;
    this._requestSession = undefined;
    this._span = undefined;
    this._session = undefined;
    this._notifyScopeListeners();
    this._attachments = [];
    return this;
  }

  /**
   * @inheritDoc
   */
   addBreadcrumb(breadcrumb, maxBreadcrumbs) {
    const maxCrumbs = typeof maxBreadcrumbs === 'number' ? maxBreadcrumbs : DEFAULT_MAX_BREADCRUMBS;

    // No data has been changed, so don't notify scope listeners
    if (maxCrumbs <= 0) {
      return this;
    }

    const mergedBreadcrumb = {
      timestamp: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.dateTimestampInSeconds)(),
      ...breadcrumb,
    };
    this._breadcrumbs = [...this._breadcrumbs, mergedBreadcrumb].slice(-maxCrumbs);
    this._notifyScopeListeners();

    return this;
  }

  /**
   * @inheritDoc
   */
   clearBreadcrumbs() {
    this._breadcrumbs = [];
    this._notifyScopeListeners();
    return this;
  }

  /**
   * @inheritDoc
   */
   addAttachment(attachment) {
    this._attachments.push(attachment);
    return this;
  }

  /**
   * @inheritDoc
   */
   getAttachments() {
    return this._attachments;
  }

  /**
   * @inheritDoc
   */
   clearAttachments() {
    this._attachments = [];
    return this;
  }

  /**
   * Applies data from the scope to the event and runs all event processors on it.
   *
   * @param event Event
   * @param hint Object containing additional information about the original exception, for use by the event processors.
   * @hidden
   */
   applyToEvent(event, hint = {}) {
    if (this._extra && Object.keys(this._extra).length) {
      event.extra = { ...this._extra, ...event.extra };
    }
    if (this._tags && Object.keys(this._tags).length) {
      event.tags = { ...this._tags, ...event.tags };
    }
    if (this._user && Object.keys(this._user).length) {
      event.user = { ...this._user, ...event.user };
    }
    if (this._contexts && Object.keys(this._contexts).length) {
      event.contexts = { ...this._contexts, ...event.contexts };
    }
    if (this._level) {
      event.level = this._level;
    }
    if (this._transactionName) {
      event.transaction = this._transactionName;
    }

    // We want to set the trace context for normal events only if there isn't already
    // a trace context on the event. There is a product feature in place where we link
    // errors with transaction and it relies on that.
    if (this._span) {
      event.contexts = { trace: this._span.getTraceContext(), ...event.contexts };
      const transactionName = this._span.transaction && this._span.transaction.name;
      if (transactionName) {
        event.tags = { transaction: transactionName, ...event.tags };
      }
    }

    this._applyFingerprint(event);

    event.breadcrumbs = [...(event.breadcrumbs || []), ...this._breadcrumbs];
    event.breadcrumbs = event.breadcrumbs.length > 0 ? event.breadcrumbs : undefined;

    event.sdkProcessingMetadata = { ...event.sdkProcessingMetadata, ...this._sdkProcessingMetadata };

    return this._notifyEventProcessors([...getGlobalEventProcessors(), ...this._eventProcessors], event, hint);
  }

  /**
   * Add data which will be accessible during event processing but won't get sent to Sentry
   */
   setSDKProcessingMetadata(newData) {
    this._sdkProcessingMetadata = { ...this._sdkProcessingMetadata, ...newData };

    return this;
  }

  /**
   * This will be called after {@link applyToEvent} is finished.
   */
   _notifyEventProcessors(
    processors,
    event,
    hint,
    index = 0,
  ) {
    return new _sentry_utils__WEBPACK_IMPORTED_MODULE_3__.SyncPromise((resolve, reject) => {
      const processor = processors[index];
      if (event === null || typeof processor !== 'function') {
        resolve(event);
      } else {
        const result = processor({ ...event }, hint) ;

        (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) &&
          processor.id &&
          result === null &&
          _sentry_utils__WEBPACK_IMPORTED_MODULE_4__.logger.log(`Event processor "${processor.id}" dropped event`);

        if ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.isThenable)(result)) {
          void result
            .then(final => this._notifyEventProcessors(processors, final, hint, index + 1).then(resolve))
            .then(null, reject);
        } else {
          void this._notifyEventProcessors(processors, result, hint, index + 1)
            .then(resolve)
            .then(null, reject);
        }
      }
    });
  }

  /**
   * This will be called on every set call.
   */
   _notifyScopeListeners() {
    // We need this check for this._notifyingListeners to be able to work on scope during updates
    // If this check is not here we'll produce endless recursion when something is done with the scope
    // during the callback.
    if (!this._notifyingListeners) {
      this._notifyingListeners = true;
      this._scopeListeners.forEach(callback => {
        callback(this);
      });
      this._notifyingListeners = false;
    }
  }

  /**
   * Applies fingerprint from the scope to the event if there's one,
   * uses message if there's one instead or get rid of empty fingerprint
   */
   _applyFingerprint(event) {
    // Make sure it's an array first and we actually have something in place
    event.fingerprint = event.fingerprint ? (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_5__.arrayify)(event.fingerprint) : [];

    // If we have something on the scope, then merge it with event
    if (this._fingerprint) {
      event.fingerprint = event.fingerprint.concat(this._fingerprint);
    }

    // If we have no data at all, remove empty array default
    if (event.fingerprint && !event.fingerprint.length) {
      delete event.fingerprint;
    }
  }
}

/**
 * Returns the global event processors.
 */
function getGlobalEventProcessors() {
  return (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_6__.getGlobalSingleton)('globalEventProcessors', () => []);
}

/**
 * Add a EventProcessor to be kept globally.
 * @param callback EventProcessor to add
 */
function addGlobalEventProcessor(callback) {
  getGlobalEventProcessors().push(callback);
}


//# sourceMappingURL=scope.js.map


/***/ }),

/***/ "./node_modules/@sentry/core/esm/sdk.js":
/*!**********************************************!*\
  !*** ./node_modules/@sentry/core/esm/sdk.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initAndBind": () => (/* binding */ initAndBind)
/* harmony export */ });
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/logger.js");
/* harmony import */ var _hub_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hub.js */ "./node_modules/@sentry/core/esm/hub.js");



/** A class object that can instantiate Client objects. */

/**
 * Internal function to create a new SDK client instance. The client is
 * installed and then bound to the current scope.
 *
 * @param clientClass The client class to instantiate.
 * @param options Options to pass to the client.
 */
function initAndBind(
  clientClass,
  options,
) {
  if (options.debug === true) {
    if ((typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__)) {
      _sentry_utils__WEBPACK_IMPORTED_MODULE_0__.logger.enable();
    } else {
      // use `console.warn` rather than `logger.warn` since by non-debug bundles have all `logger.x` statements stripped
      // eslint-disable-next-line no-console
      console.warn('[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.');
    }
  }
  const hub = (0,_hub_js__WEBPACK_IMPORTED_MODULE_1__.getCurrentHub)();
  const scope = hub.getScope();
  if (scope) {
    scope.update(options.initialScope);
  }

  const client = new clientClass(options);
  hub.bindClient(client);
}


//# sourceMappingURL=sdk.js.map


/***/ }),

/***/ "./node_modules/@sentry/core/esm/session.js":
/*!**************************************************!*\
  !*** ./node_modules/@sentry/core/esm/session.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeSession": () => (/* binding */ closeSession),
/* harmony export */   "makeSession": () => (/* binding */ makeSession),
/* harmony export */   "updateSession": () => (/* binding */ updateSession)
/* harmony export */ });
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/time.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/misc.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/object.js");


/**
 * Creates a new `Session` object by setting certain default parameters. If optional @param context
 * is passed, the passed properties are applied to the session object.
 *
 * @param context (optional) additional properties to be applied to the returned session object
 *
 * @returns a new `Session` object
 */
function makeSession(context) {
  // Both timestamp and started are in seconds since the UNIX epoch.
  const startingTime = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.timestampInSeconds)();

  const session = {
    sid: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.uuid4)(),
    init: true,
    timestamp: startingTime,
    started: startingTime,
    duration: 0,
    status: 'ok',
    errors: 0,
    ignoreDuration: false,
    toJSON: () => sessionToJSON(session),
  };

  if (context) {
    updateSession(session, context);
  }

  return session;
}

/**
 * Updates a session object with the properties passed in the context.
 *
 * Note that this function mutates the passed object and returns void.
 * (Had to do this instead of returning a new and updated session because closing and sending a session
 * makes an update to the session after it was passed to the sending logic.
 * @see BaseClient.captureSession )
 *
 * @param session the `Session` to update
 * @param context the `SessionContext` holding the properties that should be updated in @param session
 */
// eslint-disable-next-line complexity
function updateSession(session, context = {}) {
  if (context.user) {
    if (!session.ipAddress && context.user.ip_address) {
      session.ipAddress = context.user.ip_address;
    }

    if (!session.did && !context.did) {
      session.did = context.user.id || context.user.email || context.user.username;
    }
  }

  session.timestamp = context.timestamp || (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.timestampInSeconds)();

  if (context.ignoreDuration) {
    session.ignoreDuration = context.ignoreDuration;
  }
  if (context.sid) {
    // Good enough uuid validation. — Kamil
    session.sid = context.sid.length === 32 ? context.sid : (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.uuid4)();
  }
  if (context.init !== undefined) {
    session.init = context.init;
  }
  if (!session.did && context.did) {
    session.did = `${context.did}`;
  }
  if (typeof context.started === 'number') {
    session.started = context.started;
  }
  if (session.ignoreDuration) {
    session.duration = undefined;
  } else if (typeof context.duration === 'number') {
    session.duration = context.duration;
  } else {
    const duration = session.timestamp - session.started;
    session.duration = duration >= 0 ? duration : 0;
  }
  if (context.release) {
    session.release = context.release;
  }
  if (context.environment) {
    session.environment = context.environment;
  }
  if (!session.ipAddress && context.ipAddress) {
    session.ipAddress = context.ipAddress;
  }
  if (!session.userAgent && context.userAgent) {
    session.userAgent = context.userAgent;
  }
  if (typeof context.errors === 'number') {
    session.errors = context.errors;
  }
  if (context.status) {
    session.status = context.status;
  }
}

/**
 * Closes a session by setting its status and updating the session object with it.
 * Internally calls `updateSession` to update the passed session object.
 *
 * Note that this function mutates the passed session (@see updateSession for explanation).
 *
 * @param session the `Session` object to be closed
 * @param status the `SessionStatus` with which the session was closed. If you don't pass a status,
 *               this function will keep the previously set status, unless it was `'ok'` in which case
 *               it is changed to `'exited'`.
 */
function closeSession(session, status) {
  let context = {};
  if (status) {
    context = { status };
  } else if (session.status === 'ok') {
    context = { status: 'exited' };
  }

  updateSession(session, context);
}

/**
 * Serializes a passed session object to a JSON object with a slightly different structure.
 * This is necessary because the Sentry backend requires a slightly different schema of a session
 * than the one the JS SDKs use internally.
 *
 * @param session the session to be converted
 *
 * @returns a JSON object of the passed session
 */
function sessionToJSON(session) {
  return (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.dropUndefinedKeys)({
    sid: `${session.sid}`,
    init: session.init,
    // Make sure that sec is converted to ms for date constructor
    started: new Date(session.started * 1000).toISOString(),
    timestamp: new Date(session.timestamp * 1000).toISOString(),
    status: session.status,
    errors: session.errors,
    did: typeof session.did === 'number' || typeof session.did === 'string' ? `${session.did}` : undefined,
    duration: session.duration,
    attrs: {
      release: session.release,
      environment: session.environment,
      ip_address: session.ipAddress,
      user_agent: session.userAgent,
    },
  });
}


//# sourceMappingURL=session.js.map


/***/ }),

/***/ "./node_modules/@sentry/core/esm/transports/base.js":
/*!**********************************************************!*\
  !*** ./node_modules/@sentry/core/esm/transports/base.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEFAULT_TRANSPORT_BUFFER_SIZE": () => (/* binding */ DEFAULT_TRANSPORT_BUFFER_SIZE),
/* harmony export */   "createTransport": () => (/* binding */ createTransport)
/* harmony export */ });
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/promisebuffer.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/envelope.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/ratelimit.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/syncpromise.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/logger.js");
/* harmony import */ var _sentry_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sentry/utils */ "./node_modules/@sentry/utils/esm/error.js");


const DEFAULT_TRANSPORT_BUFFER_SIZE = 30;

/**
 * Creates an instance of a Sentry `Transport`
 *
 * @param options
 * @param makeRequest
 */
function createTransport(
  options,
  makeRequest,
  buffer = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_0__.makePromiseBuffer)(options.bufferSize || DEFAULT_TRANSPORT_BUFFER_SIZE),
) {
  let rateLimits = {};

  const flush = (timeout) => buffer.drain(timeout);

  function send(envelope) {
    const filteredEnvelopeItems = [];

    // Drop rate limited items from envelope
    (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.forEachEnvelopeItem)(envelope, (item, type) => {
      const envelopeItemDataCategory = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.envelopeItemTypeToDataCategory)(type);
      if ((0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.isRateLimited)(rateLimits, envelopeItemDataCategory)) {
        options.recordDroppedEvent('ratelimit_backoff', envelopeItemDataCategory);
      } else {
        filteredEnvelopeItems.push(item);
      }
    });

    // Skip sending if envelope is empty after filtering out rate limited events
    if (filteredEnvelopeItems.length === 0) {
      return (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.resolvedSyncPromise)();
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filteredEnvelope = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.createEnvelope)(envelope[0], filteredEnvelopeItems );

    // Creates client report for each item in an envelope
    const recordEnvelopeLoss = (reason) => {
      (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.forEachEnvelopeItem)(filteredEnvelope, (_, type) => {
        options.recordDroppedEvent(reason, (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.envelopeItemTypeToDataCategory)(type));
      });
    };

    const requestTask = () =>
      makeRequest({ body: (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_1__.serializeEnvelope)(filteredEnvelope, options.textEncoder) }).then(
        response => {
          // We don't want to throw on NOK responses, but we want to at least log them
          if (response.statusCode !== undefined && (response.statusCode < 200 || response.statusCode >= 300)) {
            (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) && _sentry_utils__WEBPACK_IMPORTED_MODULE_4__.logger.warn(`Sentry responded with status code ${response.statusCode} to sent event.`);
          }

          rateLimits = (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_2__.updateRateLimits)(rateLimits, response);
        },
        error => {
          (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) && _sentry_utils__WEBPACK_IMPORTED_MODULE_4__.logger.error('Failed while sending event:', error);
          recordEnvelopeLoss('network_error');
        },
      );

    return buffer.add(requestTask).then(
      result => result,
      error => {
        if (error instanceof _sentry_utils__WEBPACK_IMPORTED_MODULE_5__.SentryError) {
          (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) && _sentry_utils__WEBPACK_IMPORTED_MODULE_4__.logger.error('Skipped sending event because buffer is full.');
          recordEnvelopeLoss('queue_overflow');
          return (0,_sentry_utils__WEBPACK_IMPORTED_MODULE_3__.resolvedSyncPromise)();
        } else {
          throw error;
        }
      },
    );
  }

  return {
    send,
    flush,
  };
}


//# sourceMappingURL=base.js.map


/***/ }),

/***/ "./node_modules/@sentry/core/esm/version.js":
/*!**************************************************!*\
  !*** ./node_modules/@sentry/core/esm/version.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SDK_VERSION": () => (/* binding */ SDK_VERSION)
/* harmony export */ });
const SDK_VERSION = '7.21.1';


//# sourceMappingURL=version.js.map


/***/ }),

/***/ "./node_modules/@sentry/utils/esm/browser.js":
/*!***************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/browser.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDomElement": () => (/* binding */ getDomElement),
/* harmony export */   "getLocationHref": () => (/* binding */ getLocationHref),
/* harmony export */   "htmlTreeAsString": () => (/* binding */ htmlTreeAsString)
/* harmony export */ });
/* harmony import */ var _is_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is.js */ "./node_modules/@sentry/utils/esm/is.js");
/* harmony import */ var _worldwide_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./worldwide.js */ "./node_modules/@sentry/utils/esm/worldwide.js");



// eslint-disable-next-line deprecation/deprecation
const WINDOW = (0,_worldwide_js__WEBPACK_IMPORTED_MODULE_0__.getGlobalObject)();

/**
 * Given a child DOM element, returns a query-selector statement describing that
 * and its ancestors
 * e.g. [HTMLElement] => body > div > input#foo.btn[name=baz]
 * @returns generated DOM path
 */
function htmlTreeAsString(elem, keyAttrs) {

  // try/catch both:
  // - accessing event.target (see getsentry/raven-js#838, #768)
  // - `htmlTreeAsString` because it's complex, and just accessing the DOM incorrectly
  // - can throw an exception in some circumstances.
  try {
    let currentElem = elem ;
    const MAX_TRAVERSE_HEIGHT = 5;
    const MAX_OUTPUT_LEN = 80;
    const out = [];
    let height = 0;
    let len = 0;
    const separator = ' > ';
    const sepLength = separator.length;
    let nextStr;

    // eslint-disable-next-line no-plusplus
    while (currentElem && height++ < MAX_TRAVERSE_HEIGHT) {
      nextStr = _htmlElementAsString(currentElem, keyAttrs);
      // bail out if
      // - nextStr is the 'html' element
      // - the length of the string that would be created exceeds MAX_OUTPUT_LEN
      //   (ignore this limit if we are on the first iteration)
      if (nextStr === 'html' || (height > 1 && len + out.length * sepLength + nextStr.length >= MAX_OUTPUT_LEN)) {
        break;
      }

      out.push(nextStr);

      len += nextStr.length;
      currentElem = currentElem.parentNode;
    }

    return out.reverse().join(separator);
  } catch (_oO) {
    return '<unknown>';
  }
}

/**
 * Returns a simple, query-selector representation of a DOM element
 * e.g. [HTMLElement] => input#foo.btn[name=baz]
 * @returns generated DOM path
 */
function _htmlElementAsString(el, keyAttrs) {
  const elem = el

;

  const out = [];
  let className;
  let classes;
  let key;
  let attr;
  let i;

  if (!elem || !elem.tagName) {
    return '';
  }

  out.push(elem.tagName.toLowerCase());

  // Pairs of attribute keys defined in `serializeAttribute` and their values on element.
  const keyAttrPairs =
    keyAttrs && keyAttrs.length
      ? keyAttrs.filter(keyAttr => elem.getAttribute(keyAttr)).map(keyAttr => [keyAttr, elem.getAttribute(keyAttr)])
      : null;

  if (keyAttrPairs && keyAttrPairs.length) {
    keyAttrPairs.forEach(keyAttrPair => {
      out.push(`[${keyAttrPair[0]}="${keyAttrPair[1]}"]`);
    });
  } else {
    if (elem.id) {
      out.push(`#${elem.id}`);
    }

    // eslint-disable-next-line prefer-const
    className = elem.className;
    if (className && (0,_is_js__WEBPACK_IMPORTED_MODULE_1__.isString)(className)) {
      classes = className.split(/\s+/);
      for (i = 0; i < classes.length; i++) {
        out.push(`.${classes[i]}`);
      }
    }
  }
  const allowedAttrs = ['type', 'name', 'title', 'alt'];
  for (i = 0; i < allowedAttrs.length; i++) {
    key = allowedAttrs[i];
    attr = elem.getAttribute(key);
    if (attr) {
      out.push(`[${key}="${attr}"]`);
    }
  }
  return out.join('');
}

/**
 * A safe form of location.href
 */
function getLocationHref() {
  try {
    return WINDOW.document.location.href;
  } catch (oO) {
    return '';
  }
}

/**
 * Gets a DOM element by using document.querySelector.
 *
 * This wrapper will first check for the existance of the function before
 * actually calling it so that we don't have to take care of this check,
 * every time we want to access the DOM.
 *
 * Reason: DOM/querySelector is not available in all environments.
 *
 * We have to cast to any because utils can be consumed by a variety of environments,
 * and we don't want to break TS users. If you know what element will be selected by
 * `document.querySelector`, specify it as part of the generic call. For example,
 * `const element = getDomElement<Element>('selector');`
 *
 * @param selector the selector string passed on to document.querySelector
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getDomElement(selector) {
  if (WINDOW.document && WINDOW.document.querySelector) {
    return WINDOW.document.querySelector(selector) ;
  }
  return null;
}


//# sourceMappingURL=browser.js.map


/***/ }),

/***/ "./node_modules/@sentry/utils/esm/buildPolyfills/_optionalChain.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/buildPolyfills/_optionalChain.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_optionalChain": () => (/* binding */ _optionalChain)
/* harmony export */ });
/**
 * Polyfill for the optional chain operator, `?.`, given previous conversion of the expression into an array of values,
 * descriptors, and functions.
 *
 * Adapted from Sucrase (https://github.com/alangpierce/sucrase)
 * See https://github.com/alangpierce/sucrase/blob/265887868966917f3b924ce38dfad01fbab1329f/src/transformers/OptionalChainingNullishTransformer.ts#L15
 *
 * @param ops Array result of expression conversion
 * @returns The value of the expression
 */
function _optionalChain(ops) {
  let lastAccessLHS = undefined;
  let value = ops[0];
  let i = 1;
  while (i < ops.length) {
    const op = ops[i] ;
    const fn = ops[i + 1] ;
    i += 2;
    // by checking for loose equality to `null`, we catch both `null` and `undefined`
    if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) {
      // really we're meaning to return `undefined` as an actual value here, but it saves bytes not to write it
      return;
    }
    if (op === 'access' || op === 'optionalAccess') {
      lastAccessLHS = value;
      value = fn(value);
    } else if (op === 'call' || op === 'optionalCall') {
      value = fn((...args) => (value ).call(lastAccessLHS, ...args));
      lastAccessLHS = undefined;
    }
  }
  return value;
}

// Sucrase version
// function _optionalChain(ops) {
//   let lastAccessLHS = undefined;
//   let value = ops[0];
//   let i = 1;
//   while (i < ops.length) {
//     const op = ops[i];
//     const fn = ops[i + 1];
//     i += 2;
//     if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) {
//       return undefined;
//     }
//     if (op === 'access' || op === 'optionalAccess') {
//       lastAccessLHS = value;
//       value = fn(value);
//     } else if (op === 'call' || op === 'optionalCall') {
//       value = fn((...args) => value.call(lastAccessLHS, ...args));
//       lastAccessLHS = undefined;
//     }
//   }
//   return value;
// }


//# sourceMappingURL=_optionalChain.js.map


/***/ }),

/***/ "./node_modules/@sentry/utils/esm/clientreport.js":
/*!********************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/clientreport.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createClientReportEnvelope": () => (/* binding */ createClientReportEnvelope)
/* harmony export */ });
/* harmony import */ var _envelope_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./envelope.js */ "./node_modules/@sentry/utils/esm/envelope.js");
/* harmony import */ var _time_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./time.js */ "./node_modules/@sentry/utils/esm/time.js");



/**
 * Creates client report envelope
 * @param discarded_events An array of discard events
 * @param dsn A DSN that can be set on the header. Optional.
 */
function createClientReportEnvelope(
  discarded_events,
  dsn,
  timestamp,
) {
  const clientReportItem = [
    { type: 'client_report' },
    {
      timestamp: timestamp || (0,_time_js__WEBPACK_IMPORTED_MODULE_0__.dateTimestampInSeconds)(),
      discarded_events,
    },
  ];
  return (0,_envelope_js__WEBPACK_IMPORTED_MODULE_1__.createEnvelope)(dsn ? { dsn } : {}, [clientReportItem]);
}


//# sourceMappingURL=clientreport.js.map


/***/ }),

/***/ "./node_modules/@sentry/utils/esm/dsn.js":
/*!***********************************************!*\
  !*** ./node_modules/@sentry/utils/esm/dsn.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dsnFromString": () => (/* binding */ dsnFromString),
/* harmony export */   "dsnToString": () => (/* binding */ dsnToString),
/* harmony export */   "makeDsn": () => (/* binding */ makeDsn)
/* harmony export */ });
/* harmony import */ var _error_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./error.js */ "./node_modules/@sentry/utils/esm/error.js");


/** Regular expression used to parse a Dsn. */
const DSN_REGEX = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;

function isValidProtocol(protocol) {
  return protocol === 'http' || protocol === 'https';
}

/**
 * Renders the string representation of this Dsn.
 *
 * By default, this will render the public representation without the password
 * component. To get the deprecated private representation, set `withPassword`
 * to true.
 *
 * @param withPassword When set to true, the password will be included.
 */
function dsnToString(dsn, withPassword = false) {
  const { host, path, pass, port, projectId, protocol, publicKey } = dsn;
  return (
    `${protocol}://${publicKey}${withPassword && pass ? `:${pass}` : ''}` +
    `@${host}${port ? `:${port}` : ''}/${path ? `${path}/` : path}${projectId}`
  );
}

/**
 * Parses a Dsn from a given string.
 *
 * @param str A Dsn as string
 * @returns Dsn as DsnComponents
 */
function dsnFromString(str) {
  const match = DSN_REGEX.exec(str);

  if (!match) {
    throw new _error_js__WEBPACK_IMPORTED_MODULE_0__.SentryError(`Invalid Sentry Dsn: ${str}`);
  }

  const [protocol, publicKey, pass = '', host, port = '', lastPath] = match.slice(1);
  let path = '';
  let projectId = lastPath;

  const split = projectId.split('/');
  if (split.length > 1) {
    path = split.slice(0, -1).join('/');
    projectId = split.pop() ;
  }

  if (projectId) {
    const projectMatch = projectId.match(/^\d+/);
    if (projectMatch) {
      projectId = projectMatch[0];
    }
  }

  return dsnFromComponents({ host, pass, path, projectId, port, protocol: protocol , publicKey });
}

function dsnFromComponents(components) {
  return {
    protocol: components.protocol,
    publicKey: components.publicKey || '',
    pass: components.pass || '',
    host: components.host,
    port: components.port || '',
    path: components.path || '',
    projectId: components.projectId,
  };
}

function validateDsn(dsn) {
  if (!(typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__)) {
    return;
  }

  const { port, projectId, protocol } = dsn;

  const requiredComponents = ['protocol', 'publicKey', 'host', 'projectId'];
  requiredComponents.forEach(component => {
    if (!dsn[component]) {
      throw new _error_js__WEBPACK_IMPORTED_MODULE_0__.SentryError(`Invalid Sentry Dsn: ${component} missing`);
    }
  });

  if (!projectId.match(/^\d+$/)) {
    throw new _error_js__WEBPACK_IMPORTED_MODULE_0__.SentryError(`Invalid Sentry Dsn: Invalid projectId ${projectId}`);
  }

  if (!isValidProtocol(protocol)) {
    throw new _error_js__WEBPACK_IMPORTED_MODULE_0__.SentryError(`Invalid Sentry Dsn: Invalid protocol ${protocol}`);
  }

  if (port && isNaN(parseInt(port, 10))) {
    throw new _error_js__WEBPACK_IMPORTED_MODULE_0__.SentryError(`Invalid Sentry Dsn: Invalid port ${port}`);
  }

  return true;
}

/** The Sentry Dsn, identifying a Sentry instance and project. */
function makeDsn(from) {
  const components = typeof from === 'string' ? dsnFromString(from) : dsnFromComponents(from);
  validateDsn(components);
  return components;
}


//# sourceMappingURL=dsn.js.map


/***/ }),

/***/ "./node_modules/@sentry/utils/esm/env.js":
/*!***********************************************!*\
  !*** ./node_modules/@sentry/utils/esm/env.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isBrowserBundle": () => (/* binding */ isBrowserBundle)
/* harmony export */ });
/*
 * This module exists for optimizations in the build process through rollup and terser.  We define some global
 * constants, which can be overridden during build. By guarding certain pieces of code with functions that return these
 * constants, we can control whether or not they appear in the final bundle. (Any code guarded by a false condition will
 * never run, and will hence be dropped during treeshaking.) The two primary uses for this are stripping out calls to
 * `logger` and preventing node-related code from appearing in browser bundles.
 *
 * Attention:
 * This file should not be used to define constants/flags that are intended to be used for tree-shaking conducted by
 * users. These fags should live in their respective packages, as we identified user tooling (specifically webpack)
 * having issues tree-shaking these constants across package boundaries.
 * An example for this is the __SENTRY_DEBUG__ constant. It is declared in each package individually because we want
 * users to be able to shake away expressions that it guards.
 */

/**
 * Figures out if we're building a browser bundle.
 *
 * @returns true if this is a browser bundle build.
 */
function isBrowserBundle() {
  return typeof __SENTRY_BROWSER_BUNDLE__ !== 'undefined' && !!__SENTRY_BROWSER_BUNDLE__;
}


//# sourceMappingURL=env.js.map


/***/ }),

/***/ "./node_modules/@sentry/utils/esm/envelope.js":
/*!****************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/envelope.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addItemToEnvelope": () => (/* binding */ addItemToEnvelope),
/* harmony export */   "createAttachmentEnvelopeItem": () => (/* binding */ createAttachmentEnvelopeItem),
/* harmony export */   "createEnvelope": () => (/* binding */ createEnvelope),
/* harmony export */   "envelopeItemTypeToDataCategory": () => (/* binding */ envelopeItemTypeToDataCategory),
/* harmony export */   "forEachEnvelopeItem": () => (/* binding */ forEachEnvelopeItem),
/* harmony export */   "serializeEnvelope": () => (/* binding */ serializeEnvelope)
/* harmony export */ });
/* harmony import */ var _normalize_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./normalize.js */ "./node_modules/@sentry/utils/esm/normalize.js");
/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./object.js */ "./node_modules/@sentry/utils/esm/object.js");



/**
 * Creates an envelope.
 * Make sure to always explicitly provide the generic to this function
 * so that the envelope types resolve correctly.
 */
function createEnvelope(headers, items = []) {
  return [headers, items] ;
}

/**
 * Add an item to an envelope.
 * Make sure to always explicitly provide the generic to this function
 * so that the envelope types resolve correctly.
 */
function addItemToEnvelope(envelope, newItem) {
  const [headers, items] = envelope;
  return [headers, [...items, newItem]] ;
}

/**
 * Convenience function to loop through the items and item types of an envelope.
 * (This function was mostly created because working with envelope types is painful at the moment)
 */
function forEachEnvelopeItem(
  envelope,
  callback,
) {
  const envelopeItems = envelope[1];
  envelopeItems.forEach((envelopeItem) => {
    const envelopeItemType = envelopeItem[0].type;
    callback(envelopeItem, envelopeItemType);
  });
}

function encodeUTF8(input, textEncoder) {
  const utf8 = textEncoder || new TextEncoder();
  return utf8.encode(input);
}

/**
 * Serializes an envelope.
 */
function serializeEnvelope(envelope, textEncoder) {
  const [envHeaders, items] = envelope;

  // Initially we construct our envelope as a string and only convert to binary chunks if we encounter binary data
  let parts = JSON.stringify(envHeaders);

  function append(next) {
    if (typeof parts === 'string') {
      parts = typeof next === 'string' ? parts + next : [encodeUTF8(parts, textEncoder), next];
    } else {
      parts.push(typeof next === 'string' ? encodeUTF8(next, textEncoder) : next);
    }
  }

  for (const item of items) {
    const [itemHeaders, payload] = item;

    append(`\n${JSON.stringify(itemHeaders)}\n`);

    if (typeof payload === 'string' || payload instanceof Uint8Array) {
      append(payload);
    } else {
      let stringifiedPayload;
      try {
        stringifiedPayload = JSON.stringify(payload);
      } catch (e) {
        // In case, despite all our efforts to keep `payload` circular-dependency-free, `JSON.strinify()` still
        // fails, we try again after normalizing it again with infinite normalization depth. This of course has a
        // performance impact but in this case a performance hit is better than throwing.
        stringifiedPayload = JSON.stringify((0,_normalize_js__WEBPACK_IMPORTED_MODULE_0__.normalize)(payload));
      }
      append(stringifiedPayload);
    }
  }

  return typeof parts === 'string' ? parts : concatBuffers(parts);
}

function concatBuffers(buffers) {
  const totalLength = buffers.reduce((acc, buf) => acc + buf.length, 0);

  const merged = new Uint8Array(totalLength);
  let offset = 0;
  for (const buffer of buffers) {
    merged.set(buffer, offset);
    offset += buffer.length;
  }

  return merged;
}

/**
 * Creates attachment envelope items
 */
function createAttachmentEnvelopeItem(
  attachment,
  textEncoder,
) {
  const buffer = typeof attachment.data === 'string' ? encodeUTF8(attachment.data, textEncoder) : attachment.data;

  return [
    (0,_object_js__WEBPACK_IMPORTED_MODULE_1__.dropUndefinedKeys)({
      type: 'attachment',
      length: buffer.length,
      filename: attachment.filename,
      content_type: attachment.contentType,
      attachment_type: attachment.attachmentType,
    }),
    buffer,
  ];
}

const ITEM_TYPE_TO_DATA_CATEGORY_MAP = {
  session: 'session',
  sessions: 'session',
  attachment: 'attachment',
  transaction: 'transaction',
  event: 'error',
  client_report: 'internal',
  user_report: 'default',
};

/**
 * Maps the type of an envelope item to a data category.
 */
function envelopeItemTypeToDataCategory(type) {
  return ITEM_TYPE_TO_DATA_CATEGORY_MAP[type];
}


//# sourceMappingURL=envelope.js.map


/***/ }),

/***/ "./node_modules/@sentry/utils/esm/error.js":
/*!*************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/error.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SentryError": () => (/* binding */ SentryError)
/* harmony export */ });
/** An error emitted by Sentry SDKs and related utilities. */
class SentryError extends Error {
  /** Display name of this error instance. */

   constructor( message, logLevel = 'warn') {
    super(message);this.message = message;;

    this.name = new.target.prototype.constructor.name;
    // This sets the prototype to be `Error`, not `SentryError`. It's unclear why we do this, but commenting this line
    // out causes various (seemingly totally unrelated) playwright tests consistently time out. FYI, this makes
    // instances of `SentryError` fail `obj instanceof SentryError` checks.
    Object.setPrototypeOf(this, new.target.prototype);
    this.logLevel = logLevel;
  }
}


//# sourceMappingURL=error.js.map


/***/ }),

/***/ "./node_modules/@sentry/utils/esm/instrument.js":
/*!******************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/instrument.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addInstrumentationHandler": () => (/* binding */ addInstrumentationHandler)
/* harmony export */ });
/* harmony import */ var _is_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./is.js */ "./node_modules/@sentry/utils/esm/is.js");
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logger.js */ "./node_modules/@sentry/utils/esm/logger.js");
/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./object.js */ "./node_modules/@sentry/utils/esm/object.js");
/* harmony import */ var _stacktrace_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stacktrace.js */ "./node_modules/@sentry/utils/esm/stacktrace.js");
/* harmony import */ var _supports_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./supports.js */ "./node_modules/@sentry/utils/esm/supports.js");
/* harmony import */ var _worldwide_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./worldwide.js */ "./node_modules/@sentry/utils/esm/worldwide.js");







// eslint-disable-next-line deprecation/deprecation
const WINDOW = (0,_worldwide_js__WEBPACK_IMPORTED_MODULE_0__.getGlobalObject)();

/**
 * Instrument native APIs to call handlers that can be used to create breadcrumbs, APM spans etc.
 *  - Console API
 *  - Fetch API
 *  - XHR API
 *  - History API
 *  - DOM API (click/typing)
 *  - Error API
 *  - UnhandledRejection API
 */

const handlers = {};
const instrumented = {};

/** Instruments given API */
function instrument(type) {
  if (instrumented[type]) {
    return;
  }

  instrumented[type] = true;

  switch (type) {
    case 'console':
      instrumentConsole();
      break;
    case 'dom':
      instrumentDOM();
      break;
    case 'xhr':
      instrumentXHR();
      break;
    case 'fetch':
      instrumentFetch();
      break;
    case 'history':
      instrumentHistory();
      break;
    case 'error':
      instrumentError();
      break;
    case 'unhandledrejection':
      instrumentUnhandledRejection();
      break;
    default:
      (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) && _logger_js__WEBPACK_IMPORTED_MODULE_1__.logger.warn('unknown instrumentation type:', type);
      return;
  }
}

/**
 * Add handler that will be called when given type of instrumentation triggers.
 * Use at your own risk, this might break without changelog notice, only used internally.
 * @hidden
 */
function addInstrumentationHandler(type, callback) {
  handlers[type] = handlers[type] || [];
  (handlers[type] ).push(callback);
  instrument(type);
}

/** JSDoc */
function triggerHandlers(type, data) {
  if (!type || !handlers[type]) {
    return;
  }

  for (const handler of handlers[type] || []) {
    try {
      handler(data);
    } catch (e) {
      (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) &&
        _logger_js__WEBPACK_IMPORTED_MODULE_1__.logger.error(
          `Error while triggering instrumentation handler.\nType: ${type}\nName: ${(0,_stacktrace_js__WEBPACK_IMPORTED_MODULE_2__.getFunctionName)(handler)}\nError:`,
          e,
        );
    }
  }
}

/** JSDoc */
function instrumentConsole() {
  if (!('console' in WINDOW)) {
    return;
  }

  _logger_js__WEBPACK_IMPORTED_MODULE_1__.CONSOLE_LEVELS.forEach(function (level) {
    if (!(level in WINDOW.console)) {
      return;
    }

    (0,_object_js__WEBPACK_IMPORTED_MODULE_3__.fill)(WINDOW.console, level, function (originalConsoleMethod) {
      return function (...args) {
        triggerHandlers('console', { args, level });

        // this fails for some browsers. :(
        if (originalConsoleMethod) {
          originalConsoleMethod.apply(WINDOW.console, args);
        }
      };
    });
  });
}

/** JSDoc */
function instrumentFetch() {
  if (!(0,_supports_js__WEBPACK_IMPORTED_MODULE_4__.supportsNativeFetch)()) {
    return;
  }

  (0,_object_js__WEBPACK_IMPORTED_MODULE_3__.fill)(WINDOW, 'fetch', function (originalFetch) {
    return function (...args) {
      const handlerData = {
        args,
        fetchData: {
          method: getFetchMethod(args),
          url: getFetchUrl(args),
        },
        startTimestamp: Date.now(),
      };

      triggerHandlers('fetch', {
        ...handlerData,
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return originalFetch.apply(WINDOW, args).then(
        (response) => {
          triggerHandlers('fetch', {
            ...handlerData,
            endTimestamp: Date.now(),
            response,
          });
          return response;
        },
        (error) => {
          triggerHandlers('fetch', {
            ...handlerData,
            endTimestamp: Date.now(),
            error,
          });
          // NOTE: If you are a Sentry user, and you are seeing this stack frame,
          //       it means the sentry.javascript SDK caught an error invoking your application code.
          //       This is expected behavior and NOT indicative of a bug with sentry.javascript.
          throw error;
        },
      );
    };
  });
}

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/** Extract `method` from fetch call arguments */
function getFetchMethod(fetchArgs = []) {
  if ('Request' in WINDOW && (0,_is_js__WEBPACK_IMPORTED_MODULE_5__.isInstanceOf)(fetchArgs[0], Request) && fetchArgs[0].method) {
    return String(fetchArgs[0].method).toUpperCase();
  }
  if (fetchArgs[1] && fetchArgs[1].method) {
    return String(fetchArgs[1].method).toUpperCase();
  }
  return 'GET';
}

/** Extract `url` from fetch call arguments */
function getFetchUrl(fetchArgs = []) {
  if (typeof fetchArgs[0] === 'string') {
    return fetchArgs[0];
  }
  if ('Request' in WINDOW && (0,_is_js__WEBPACK_IMPORTED_MODULE_5__.isInstanceOf)(fetchArgs[0], Request)) {
    return fetchArgs[0].url;
  }
  return String(fetchArgs[0]);
}
/* eslint-enable @typescript-eslint/no-unsafe-member-access */

/** JSDoc */
function instrumentXHR() {
  if (!('XMLHttpRequest' in WINDOW)) {
    return;
  }

  const xhrproto = XMLHttpRequest.prototype;

  (0,_object_js__WEBPACK_IMPORTED_MODULE_3__.fill)(xhrproto, 'open', function (originalOpen) {
    return function ( ...args) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const xhr = this;
      const url = args[1];
      const xhrInfo = (xhr.__sentry_xhr__ = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        method: (0,_is_js__WEBPACK_IMPORTED_MODULE_5__.isString)(args[0]) ? args[0].toUpperCase() : args[0],
        url: args[1],
      });

      // if Sentry key appears in URL, don't capture it as a request
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if ((0,_is_js__WEBPACK_IMPORTED_MODULE_5__.isString)(url) && xhrInfo.method === 'POST' && url.match(/sentry_key/)) {
        xhr.__sentry_own_request__ = true;
      }

      const onreadystatechangeHandler = function () {
        if (xhr.readyState === 4) {
          try {
            // touching statusCode in some platforms throws
            // an exception
            xhrInfo.status_code = xhr.status;
          } catch (e) {
            /* do nothing */
          }

          triggerHandlers('xhr', {
            args,
            endTimestamp: Date.now(),
            startTimestamp: Date.now(),
            xhr,
          });
        }
      };

      if ('onreadystatechange' in xhr && typeof xhr.onreadystatechange === 'function') {
        (0,_object_js__WEBPACK_IMPORTED_MODULE_3__.fill)(xhr, 'onreadystatechange', function (original) {
          return function (...readyStateArgs) {
            onreadystatechangeHandler();
            return original.apply(xhr, readyStateArgs);
          };
        });
      } else {
        xhr.addEventListener('readystatechange', onreadystatechangeHandler);
      }

      return originalOpen.apply(xhr, args);
    };
  });

  (0,_object_js__WEBPACK_IMPORTED_MODULE_3__.fill)(xhrproto, 'send', function (originalSend) {
    return function ( ...args) {
      if (this.__sentry_xhr__ && args[0] !== undefined) {
        this.__sentry_xhr__.body = args[0];
      }

      triggerHandlers('xhr', {
        args,
        startTimestamp: Date.now(),
        xhr: this,
      });

      return originalSend.apply(this, args);
    };
  });
}

let lastHref;

/** JSDoc */
function instrumentHistory() {
  if (!(0,_supports_js__WEBPACK_IMPORTED_MODULE_4__.supportsHistory)()) {
    return;
  }

  const oldOnPopState = WINDOW.onpopstate;
  WINDOW.onpopstate = function ( ...args) {
    const to = WINDOW.location.href;
    // keep track of the current URL state, as we always receive only the updated state
    const from = lastHref;
    lastHref = to;
    triggerHandlers('history', {
      from,
      to,
    });
    if (oldOnPopState) {
      // Apparently this can throw in Firefox when incorrectly implemented plugin is installed.
      // https://github.com/getsentry/sentry-javascript/issues/3344
      // https://github.com/bugsnag/bugsnag-js/issues/469
      try {
        return oldOnPopState.apply(this, args);
      } catch (_oO) {
        // no-empty
      }
    }
  };

  /** @hidden */
  function historyReplacementFunction(originalHistoryFunction) {
    return function ( ...args) {
      const url = args.length > 2 ? args[2] : undefined;
      if (url) {
        // coerce to string (this is what pushState does)
        const from = lastHref;
        const to = String(url);
        // keep track of the current URL state, as we always receive only the updated state
        lastHref = to;
        triggerHandlers('history', {
          from,
          to,
        });
      }
      return originalHistoryFunction.apply(this, args);
    };
  }

  (0,_object_js__WEBPACK_IMPORTED_MODULE_3__.fill)(WINDOW.history, 'pushState', historyReplacementFunction);
  (0,_object_js__WEBPACK_IMPORTED_MODULE_3__.fill)(WINDOW.history, 'replaceState', historyReplacementFunction);
}

const debounceDuration = 1000;
let debounceTimerID;
let lastCapturedEvent;

/**
 * Decide whether the current event should finish the debounce of previously captured one.
 * @param previous previously captured event
 * @param current event to be captured
 */
function shouldShortcircuitPreviousDebounce(previous, current) {
  // If there was no previous event, it should always be swapped for the new one.
  if (!previous) {
    return true;
  }

  // If both events have different type, then user definitely performed two separate actions. e.g. click + keypress.
  if (previous.type !== current.type) {
    return true;
  }

  try {
    // If both events have the same type, it's still possible that actions were performed on different targets.
    // e.g. 2 clicks on different buttons.
    if (previous.target !== current.target) {
      return true;
    }
  } catch (e) {
    // just accessing `target` property can throw an exception in some rare circumstances
    // see: https://github.com/getsentry/sentry-javascript/issues/838
  }

  // If both events have the same type _and_ same `target` (an element which triggered an event, _not necessarily_
  // to which an event listener was attached), we treat them as the same action, as we want to capture
  // only one breadcrumb. e.g. multiple clicks on the same button, or typing inside a user input box.
  return false;
}

/**
 * Decide whether an event should be captured.
 * @param event event to be captured
 */
function shouldSkipDOMEvent(event) {
  // We are only interested in filtering `keypress` events for now.
  if (event.type !== 'keypress') {
    return false;
  }

  try {
    const target = event.target ;

    if (!target || !target.tagName) {
      return true;
    }

    // Only consider keypress events on actual input elements. This will disregard keypresses targeting body
    // e.g.tabbing through elements, hotkeys, etc.
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      return false;
    }
  } catch (e) {
    // just accessing `target` property can throw an exception in some rare circumstances
    // see: https://github.com/getsentry/sentry-javascript/issues/838
  }

  return true;
}

/**
 * Wraps addEventListener to capture UI breadcrumbs
 * @param handler function that will be triggered
 * @param globalListener indicates whether event was captured by the global event listener
 * @returns wrapped breadcrumb events handler
 * @hidden
 */
function makeDOMEventHandler(handler, globalListener = false) {
  return (event) => {
    // It's possible this handler might trigger multiple times for the same
    // event (e.g. event propagation through node ancestors).
    // Ignore if we've already captured that event.
    if (!event || lastCapturedEvent === event) {
      return;
    }

    // We always want to skip _some_ events.
    if (shouldSkipDOMEvent(event)) {
      return;
    }

    const name = event.type === 'keypress' ? 'input' : event.type;

    // If there is no debounce timer, it means that we can safely capture the new event and store it for future comparisons.
    if (debounceTimerID === undefined) {
      handler({
        event: event,
        name,
        global: globalListener,
      });
      lastCapturedEvent = event;
    }
    // If there is a debounce awaiting, see if the new event is different enough to treat it as a unique one.
    // If that's the case, emit the previous event and store locally the newly-captured DOM event.
    else if (shouldShortcircuitPreviousDebounce(lastCapturedEvent, event)) {
      handler({
        event: event,
        name,
        global: globalListener,
      });
      lastCapturedEvent = event;
    }

    // Start a new debounce timer that will prevent us from capturing multiple events that should be grouped together.
    clearTimeout(debounceTimerID);
    debounceTimerID = WINDOW.setTimeout(() => {
      debounceTimerID = undefined;
    }, debounceDuration);
  };
}

/** JSDoc */
function instrumentDOM() {
  if (!('document' in WINDOW)) {
    return;
  }

  // Make it so that any click or keypress that is unhandled / bubbled up all the way to the document triggers our dom
  // handlers. (Normally we have only one, which captures a breadcrumb for each click or keypress.) Do this before
  // we instrument `addEventListener` so that we don't end up attaching this handler twice.
  const triggerDOMHandler = triggerHandlers.bind(null, 'dom');
  const globalDOMEventHandler = makeDOMEventHandler(triggerDOMHandler, true);
  WINDOW.document.addEventListener('click', globalDOMEventHandler, false);
  WINDOW.document.addEventListener('keypress', globalDOMEventHandler, false);

  // After hooking into click and keypress events bubbled up to `document`, we also hook into user-handled
  // clicks & keypresses, by adding an event listener of our own to any element to which they add a listener. That
  // way, whenever one of their handlers is triggered, ours will be, too. (This is needed because their handler
  // could potentially prevent the event from bubbling up to our global listeners. This way, our handler are still
  // guaranteed to fire at least once.)
  ['EventTarget', 'Node'].forEach((target) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const proto = (WINDOW )[target] && (WINDOW )[target].prototype;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, no-prototype-builtins
    if (!proto || !proto.hasOwnProperty || !proto.hasOwnProperty('addEventListener')) {
      return;
    }

    (0,_object_js__WEBPACK_IMPORTED_MODULE_3__.fill)(proto, 'addEventListener', function (originalAddEventListener) {
      return function (

        type,
        listener,
        options,
      ) {
        if (type === 'click' || type == 'keypress') {
          try {
            const el = this ;
            const handlers = (el.__sentry_instrumentation_handlers__ = el.__sentry_instrumentation_handlers__ || {});
            const handlerForType = (handlers[type] = handlers[type] || { refCount: 0 });

            if (!handlerForType.handler) {
              const handler = makeDOMEventHandler(triggerDOMHandler);
              handlerForType.handler = handler;
              originalAddEventListener.call(this, type, handler, options);
            }

            handlerForType.refCount += 1;
          } catch (e) {
            // Accessing dom properties is always fragile.
            // Also allows us to skip `addEventListenrs` calls with no proper `this` context.
          }
        }

        return originalAddEventListener.call(this, type, listener, options);
      };
    });

    (0,_object_js__WEBPACK_IMPORTED_MODULE_3__.fill)(
      proto,
      'removeEventListener',
      function (originalRemoveEventListener) {
        return function (

          type,
          listener,
          options,
        ) {
          if (type === 'click' || type == 'keypress') {
            try {
              const el = this ;
              const handlers = el.__sentry_instrumentation_handlers__ || {};
              const handlerForType = handlers[type];

              if (handlerForType) {
                handlerForType.refCount -= 1;
                // If there are no longer any custom handlers of the current type on this element, we can remove ours, too.
                if (handlerForType.refCount <= 0) {
                  originalRemoveEventListener.call(this, type, handlerForType.handler, options);
                  handlerForType.handler = undefined;
                  delete handlers[type]; // eslint-disable-line @typescript-eslint/no-dynamic-delete
                }

                // If there are no longer any custom handlers of any type on this element, cleanup everything.
                if (Object.keys(handlers).length === 0) {
                  delete el.__sentry_instrumentation_handlers__;
                }
              }
            } catch (e) {
              // Accessing dom properties is always fragile.
              // Also allows us to skip `addEventListenrs` calls with no proper `this` context.
            }
          }

          return originalRemoveEventListener.call(this, type, listener, options);
        };
      },
    );
  });
}

let _oldOnErrorHandler = null;
/** JSDoc */
function instrumentError() {
  _oldOnErrorHandler = WINDOW.onerror;

  WINDOW.onerror = function (msg, url, line, column, error) {
    triggerHandlers('error', {
      column,
      error,
      line,
      msg,
      url,
    });

    if (_oldOnErrorHandler) {
      // eslint-disable-next-line prefer-rest-params
      return _oldOnErrorHandler.apply(this, arguments);
    }

    return false;
  };
}

let _oldOnUnhandledRejectionHandler = null;
/** JSDoc */
function instrumentUnhandledRejection() {
  _oldOnUnhandledRejectionHandler = WINDOW.onunhandledrejection;

  WINDOW.onunhandledrejection = function (e) {
    triggerHandlers('unhandledrejection', e);

    if (_oldOnUnhandledRejectionHandler) {
      // eslint-disable-next-line prefer-rest-params
      return _oldOnUnhandledRejectionHandler.apply(this, arguments);
    }

    return true;
  };
}


//# sourceMappingURL=instrument.js.map


/***/ }),

/***/ "./node_modules/@sentry/utils/esm/is.js":
/*!**********************************************!*\
  !*** ./node_modules/@sentry/utils/esm/is.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isDOMError": () => (/* binding */ isDOMError),
/* harmony export */   "isDOMException": () => (/* binding */ isDOMException),
/* harmony export */   "isElement": () => (/* binding */ isElement),
/* harmony export */   "isError": () => (/* binding */ isError),
/* harmony export */   "isErrorEvent": () => (/* binding */ isErrorEvent),
/* harmony export */   "isEvent": () => (/* binding */ isEvent),
/* harmony export */   "isInstanceOf": () => (/* binding */ isInstanceOf),
/* harmony export */   "isNaN": () => (/* binding */ isNaN),
/* harmony export */   "isPlainObject": () => (/* binding */ isPlainObject),
/* harmony export */   "isPrimitive": () => (/* binding */ isPrimitive),
/* harmony export */   "isRegExp": () => (/* binding */ isRegExp),
/* harmony export */   "isString": () => (/* binding */ isString),
/* harmony export */   "isSyntheticEvent": () => (/* binding */ isSyntheticEvent),
/* harmony export */   "isThenable": () => (/* binding */ isThenable)
/* harmony export */ });
// eslint-disable-next-line @typescript-eslint/unbound-method
const objectToString = Object.prototype.toString;

/**
 * Checks whether given value's type is one of a few Error or Error-like
 * {@link isError}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isError(wat) {
  switch (objectToString.call(wat)) {
    case '[object Error]':
    case '[object Exception]':
    case '[object DOMException]':
      return true;
    default:
      return isInstanceOf(wat, Error);
  }
}
/**
 * Checks whether given value is an instance of the given built-in class.
 *
 * @param wat The value to be checked
 * @param className
 * @returns A boolean representing the result.
 */
function isBuiltin(wat, className) {
  return objectToString.call(wat) === `[object ${className}]`;
}

/**
 * Checks whether given value's type is ErrorEvent
 * {@link isErrorEvent}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isErrorEvent(wat) {
  return isBuiltin(wat, 'ErrorEvent');
}

/**
 * Checks whether given value's type is DOMError
 * {@link isDOMError}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isDOMError(wat) {
  return isBuiltin(wat, 'DOMError');
}

/**
 * Checks whether given value's type is DOMException
 * {@link isDOMException}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isDOMException(wat) {
  return isBuiltin(wat, 'DOMException');
}

/**
 * Checks whether given value's type is a string
 * {@link isString}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isString(wat) {
  return isBuiltin(wat, 'String');
}

/**
 * Checks whether given value is a primitive (undefined, null, number, boolean, string, bigint, symbol)
 * {@link isPrimitive}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isPrimitive(wat) {
  return wat === null || (typeof wat !== 'object' && typeof wat !== 'function');
}

/**
 * Checks whether given value's type is an object literal
 * {@link isPlainObject}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isPlainObject(wat) {
  return isBuiltin(wat, 'Object');
}

/**
 * Checks whether given value's type is an Event instance
 * {@link isEvent}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isEvent(wat) {
  return typeof Event !== 'undefined' && isInstanceOf(wat, Event);
}

/**
 * Checks whether given value's type is an Element instance
 * {@link isElement}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isElement(wat) {
  return typeof Element !== 'undefined' && isInstanceOf(wat, Element);
}

/**
 * Checks whether given value's type is an regexp
 * {@link isRegExp}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isRegExp(wat) {
  return isBuiltin(wat, 'RegExp');
}

/**
 * Checks whether given value has a then function.
 * @param wat A value to be checked.
 */
function isThenable(wat) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return Boolean(wat && wat.then && typeof wat.then === 'function');
}

/**
 * Checks whether given value's type is a SyntheticEvent
 * {@link isSyntheticEvent}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isSyntheticEvent(wat) {
  return isPlainObject(wat) && 'nativeEvent' in wat && 'preventDefault' in wat && 'stopPropagation' in wat;
}

/**
 * Checks whether given value is NaN
 * {@link isNaN}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isNaN(wat) {
  return typeof wat === 'number' && wat !== wat;
}

/**
 * Checks whether given value's type is an instance of provided constructor.
 * {@link isInstanceOf}.
 *
 * @param wat A value to be checked.
 * @param base A constructor to be used in a check.
 * @returns A boolean representing the result.
 */
function isInstanceOf(wat, base) {
  try {
    return wat instanceof base;
  } catch (_e) {
    return false;
  }
}


//# sourceMappingURL=is.js.map


/***/ }),

/***/ "./node_modules/@sentry/utils/esm/logger.js":
/*!**************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/logger.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CONSOLE_LEVELS": () => (/* binding */ CONSOLE_LEVELS),
/* harmony export */   "consoleSandbox": () => (/* binding */ consoleSandbox),
/* harmony export */   "logger": () => (/* binding */ logger)
/* harmony export */ });
/* harmony import */ var _worldwide_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./worldwide.js */ "./node_modules/@sentry/utils/esm/worldwide.js");


/** Prefix for logging strings */
const PREFIX = 'Sentry Logger ';

const CONSOLE_LEVELS = ['debug', 'info', 'warn', 'error', 'log', 'assert', 'trace'] ;

/**
 * Temporarily disable sentry console instrumentations.
 *
 * @param callback The function to run against the original `console` messages
 * @returns The results of the callback
 */
function consoleSandbox(callback) {
  if (!("console" in _worldwide_js__WEBPACK_IMPORTED_MODULE_0__.GLOBAL_OBJ)) {
    return callback();
  }

  const originalConsole = _worldwide_js__WEBPACK_IMPORTED_MODULE_0__.GLOBAL_OBJ.console ;
  const wrappedLevels = {};

  // Restore all wrapped console methods
  CONSOLE_LEVELS.forEach(level => {
    // TODO(v7): Remove this check as it's only needed for Node 6
    const originalWrappedFunc =
      originalConsole[level] && (originalConsole[level] ).__sentry_original__;
    if (level in originalConsole && originalWrappedFunc) {
      wrappedLevels[level] = originalConsole[level] ;
      originalConsole[level] = originalWrappedFunc ;
    }
  });

  try {
    return callback();
  } finally {
    // Revert restoration to wrapped state
    Object.keys(wrappedLevels).forEach(level => {
      originalConsole[level] = wrappedLevels[level ];
    });
  }
}

function makeLogger() {
  let enabled = false;
  const logger = {
    enable: () => {
      enabled = true;
    },
    disable: () => {
      enabled = false;
    },
  };

  if ((typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__)) {
    CONSOLE_LEVELS.forEach(name => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      logger[name] = (...args) => {
        if (enabled) {
          consoleSandbox(() => {
            _worldwide_js__WEBPACK_IMPORTED_MODULE_0__.GLOBAL_OBJ.console[name](`${PREFIX}[${name}]:`, ...args);
          });
        }
      };
    });
  } else {
    CONSOLE_LEVELS.forEach(name => {
      logger[name] = () => undefined;
    });
  }

  return logger ;
}

// Ensure we only have a single logger instance, even if multiple versions of @sentry/utils are being used
let logger;
if ((typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__)) {
  logger = (0,_worldwide_js__WEBPACK_IMPORTED_MODULE_0__.getGlobalSingleton)('logger', makeLogger);
} else {
  logger = makeLogger();
}


//# sourceMappingURL=logger.js.map


/***/ }),

/***/ "./node_modules/@sentry/utils/esm/memo.js":
/*!************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/memo.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "memoBuilder": () => (/* binding */ memoBuilder)
/* harmony export */ });
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Helper to decycle json objects
 */
function memoBuilder() {
  const hasWeakSet = typeof WeakSet === 'function';
  const inner = hasWeakSet ? new WeakSet() : [];
  function memoize(obj) {
    if (hasWeakSet) {
      if (inner.has(obj)) {
        return true;
      }
      inner.add(obj);
      return false;
    }
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < inner.length; i++) {
      const value = inner[i];
      if (value === obj) {
        return true;
      }
    }
    inner.push(obj);
    return false;
  }

  function unmemoize(obj) {
    if (hasWeakSet) {
      inner.delete(obj);
    } else {
      for (let i = 0; i < inner.length; i++) {
        if (inner[i] === obj) {
          inner.splice(i, 1);
          break;
        }
      }
    }
  }
  return [memoize, unmemoize];
}


//# sourceMappingURL=memo.js.map


/***/ }),

/***/ "./node_modules/@sentry/utils/esm/misc.js":
/*!************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/misc.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addContextToFrame": () => (/* binding */ addContextToFrame),
/* harmony export */   "addExceptionMechanism": () => (/* binding */ addExceptionMechanism),
/* harmony export */   "addExceptionTypeValue": () => (/* binding */ addExceptionTypeValue),
/* harmony export */   "arrayify": () => (/* binding */ arrayify),
/* harmony export */   "checkOrSetAlreadyCaught": () => (/* binding */ checkOrSetAlreadyCaught),
/* harmony export */   "getEventDescription": () => (/* binding */ getEventDescription),
/* harmony export */   "parseSemver": () => (/* binding */ parseSemver),
/* harmony export */   "uuid4": () => (/* binding */ uuid4)
/* harmony export */ });
/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./object.js */ "./node_modules/@sentry/utils/esm/object.js");
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./string.js */ "./node_modules/@sentry/utils/esm/string.js");
/* harmony import */ var _worldwide_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./worldwide.js */ "./node_modules/@sentry/utils/esm/worldwide.js");




/**
 * UUID4 generator
 *
 * @returns string Generated UUID4.
 */
function uuid4() {
  const gbl = _worldwide_js__WEBPACK_IMPORTED_MODULE_0__.GLOBAL_OBJ ;
  const crypto = gbl.crypto || gbl.msCrypto;

  if (crypto && crypto.randomUUID) {
    return crypto.randomUUID().replace(/-/g, '');
  }

  const getRandomByte =
    crypto && crypto.getRandomValues ? () => crypto.getRandomValues(new Uint8Array(1))[0] : () => Math.random() * 16;

  // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
  // Concatenating the following numbers as strings results in '10000000100040008000100000000000'
  return (([1e7] ) + 1e3 + 4e3 + 8e3 + 1e11).replace(/[018]/g, c =>
    // eslint-disable-next-line no-bitwise
    ((c ) ^ ((getRandomByte() & 15) >> ((c ) / 4))).toString(16),
  );
}

function getFirstException(event) {
  return event.exception && event.exception.values ? event.exception.values[0] : undefined;
}

/**
 * Extracts either message or type+value from an event that can be used for user-facing logs
 * @returns event's description
 */
function getEventDescription(event) {
  const { message, event_id: eventId } = event;
  if (message) {
    return message;
  }

  const firstException = getFirstException(event);
  if (firstException) {
    if (firstException.type && firstException.value) {
      return `${firstException.type}: ${firstException.value}`;
    }
    return firstException.type || firstException.value || eventId || '<unknown>';
  }
  return eventId || '<unknown>';
}

/**
 * Adds exception values, type and value to an synthetic Exception.
 * @param event The event to modify.
 * @param value Value of the exception.
 * @param type Type of the exception.
 * @hidden
 */
function addExceptionTypeValue(event, value, type) {
  const exception = (event.exception = event.exception || {});
  const values = (exception.values = exception.values || []);
  const firstException = (values[0] = values[0] || {});
  if (!firstException.value) {
    firstException.value = value || '';
  }
  if (!firstException.type) {
    firstException.type = type || 'Error';
  }
}

/**
 * Adds exception mechanism data to a given event. Uses defaults if the second parameter is not passed.
 *
 * @param event The event to modify.
 * @param newMechanism Mechanism data to add to the event.
 * @hidden
 */
function addExceptionMechanism(event, newMechanism) {
  const firstException = getFirstException(event);
  if (!firstException) {
    return;
  }

  const defaultMechanism = { type: 'generic', handled: true };
  const currentMechanism = firstException.mechanism;
  firstException.mechanism = { ...defaultMechanism, ...currentMechanism, ...newMechanism };

  if (newMechanism && 'data' in newMechanism) {
    const mergedData = { ...(currentMechanism && currentMechanism.data), ...newMechanism.data };
    firstException.mechanism.data = mergedData;
  }
}

// https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
const SEMVER_REGEXP =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

/**
 * Represents Semantic Versioning object
 */

/**
 * Parses input into a SemVer interface
 * @param input string representation of a semver version
 */
function parseSemver(input) {
  const match = input.match(SEMVER_REGEXP) || [];
  const major = parseInt(match[1], 10);
  const minor = parseInt(match[2], 10);
  const patch = parseInt(match[3], 10);
  return {
    buildmetadata: match[5],
    major: isNaN(major) ? undefined : major,
    minor: isNaN(minor) ? undefined : minor,
    patch: isNaN(patch) ? undefined : patch,
    prerelease: match[4],
  };
}

/**
 * This function adds context (pre/post/line) lines to the provided frame
 *
 * @param lines string[] containing all lines
 * @param frame StackFrame that will be mutated
 * @param linesOfContext number of context lines we want to add pre/post
 */
function addContextToFrame(lines, frame, linesOfContext = 5) {
  const lineno = frame.lineno || 0;
  const maxLines = lines.length;
  const sourceLine = Math.max(Math.min(maxLines, lineno - 1), 0);

  frame.pre_context = lines
    .slice(Math.max(0, sourceLine - linesOfContext), sourceLine)
    .map((line) => (0,_string_js__WEBPACK_IMPORTED_MODULE_1__.snipLine)(line, 0));

  frame.context_line = (0,_string_js__WEBPACK_IMPORTED_MODULE_1__.snipLine)(lines[Math.min(maxLines - 1, sourceLine)], frame.colno || 0);

  frame.post_context = lines
    .slice(Math.min(sourceLine + 1, maxLines), sourceLine + 1 + linesOfContext)
    .map((line) => (0,_string_js__WEBPACK_IMPORTED_MODULE_1__.snipLine)(line, 0));
}

/**
 * Checks whether or not we've already captured the given exception (note: not an identical exception - the very object
 * in question), and marks it captured if not.
 *
 * This is useful because it's possible for an error to get captured by more than one mechanism. After we intercept and
 * record an error, we rethrow it (assuming we've intercepted it before it's reached the top-level global handlers), so
 * that we don't interfere with whatever effects the error might have had were the SDK not there. At that point, because
 * the error has been rethrown, it's possible for it to bubble up to some other code we've instrumented. If it's not
 * caught after that, it will bubble all the way up to the global handlers (which of course we also instrument). This
 * function helps us ensure that even if we encounter the same error more than once, we only record it the first time we
 * see it.
 *
 * Note: It will ignore primitives (always return `false` and not mark them as seen), as properties can't be set on
 * them. {@link: Object.objectify} can be used on exceptions to convert any that are primitives into their equivalent
 * object wrapper forms so that this check will always work. However, because we need to flag the exact object which
 * will get rethrown, and because that rethrowing happens outside of the event processing pipeline, the objectification
 * must be done before the exception captured.
 *
 * @param A thrown exception to check or flag as having been seen
 * @returns `true` if the exception has already been captured, `false` if not (with the side effect of marking it seen)
 */
function checkOrSetAlreadyCaught(exception) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (exception && (exception ).__sentry_captured__) {
    return true;
  }

  try {
    // set it this way rather than by assignment so that it's not ennumerable and therefore isn't recorded by the
    // `ExtraErrorData` integration
    (0,_object_js__WEBPACK_IMPORTED_MODULE_2__.addNonEnumerableProperty)(exception , '__sentry_captured__', true);
  } catch (err) {
    // `exception` is a primitive, so we can't mark it seen
  }

  return false;
}

/**
 * Checks whether the given input is already an array, and if it isn't, wraps it in one.
 *
 * @param maybeArray Input to turn into an array, if necessary
 * @returns The input, if already an array, or an array with the input as the only element, if not
 */
function arrayify(maybeArray) {
  return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
}


//# sourceMappingURL=misc.js.map


/***/ }),

/***/ "./node_modules/@sentry/utils/esm/node.js":
/*!************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/node.js ***!
  \************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dynamicRequire": () => (/* binding */ dynamicRequire),
/* harmony export */   "isNodeEnv": () => (/* binding */ isNodeEnv),
/* harmony export */   "loadModule": () => (/* binding */ loadModule)
/* harmony export */ });
/* harmony import */ var _env_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./env.js */ "./node_modules/@sentry/utils/esm/env.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* provided dependency */ var process = __webpack_require__(/*! process/browser */ "./node_modules/process/browser.js");


/**
 * NOTE: In order to avoid circular dependencies, if you add a function to this module and it needs to print something,
 * you must either a) use `console.log` rather than the logger, or b) put your function elsewhere.
 */

/**
 * Checks whether we're in the Node.js or Browser environment
 *
 * @returns Answer to given question
 */
function isNodeEnv() {
  // explicitly check for browser bundles as those can be optimized statically
  // by terser/rollup.
  return (
    !(0,_env_js__WEBPACK_IMPORTED_MODULE_0__.isBrowserBundle)() &&
    Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]'
  );
}

/**
 * Requires a module which is protected against bundler minification.
 *
 * @param request The module path to resolve
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
function dynamicRequire(mod, request) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return mod.require(request);
}

/**
 * Helper for dynamically loading module that should work with linked dependencies.
 * The problem is that we _should_ be using `require(require.resolve(moduleName, { paths: [cwd()] }))`
 * However it's _not possible_ to do that with Webpack, as it has to know all the dependencies during
 * build time. `require.resolve` is also not available in any other way, so we cannot create,
 * a fake helper like we do with `dynamicRequire`.
 *
 * We always prefer to use local package, thus the value is not returned early from each `try/catch` block.
 * That is to mimic the behavior of `require.resolve` exactly.
 *
 * @param moduleName module name to require
 * @returns possibly required module
 */
function loadModule(moduleName) {
  let mod;

  try {
    mod = dynamicRequire(module, moduleName);
  } catch (e) {
    // no-empty
  }

  try {
    const { cwd } = dynamicRequire(module, 'process');
    mod = dynamicRequire(module, `${cwd()}/node_modules/${moduleName}`) ;
  } catch (e) {
    // no-empty
  }

  return mod;
}


//# sourceMappingURL=node.js.map


/***/ }),

/***/ "./node_modules/@sentry/utils/esm/normalize.js":
/*!*****************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/normalize.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "normalize": () => (/* binding */ normalize),
/* harmony export */   "normalizeToSize": () => (/* binding */ normalizeToSize),
/* harmony export */   "walk": () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var _is_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is.js */ "./node_modules/@sentry/utils/esm/is.js");
/* harmony import */ var _memo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./memo.js */ "./node_modules/@sentry/utils/esm/memo.js");
/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./object.js */ "./node_modules/@sentry/utils/esm/object.js");
/* harmony import */ var _stacktrace_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stacktrace.js */ "./node_modules/@sentry/utils/esm/stacktrace.js");





/**
 * Recursively normalizes the given object.
 *
 * - Creates a copy to prevent original input mutation
 * - Skips non-enumerable properties
 * - When stringifying, calls `toJSON` if implemented
 * - Removes circular references
 * - Translates non-serializable values (`undefined`/`NaN`/functions) to serializable format
 * - Translates known global objects/classes to a string representations
 * - Takes care of `Error` object serialization
 * - Optionally limits depth of final output
 * - Optionally limits number of properties/elements included in any single object/array
 *
 * @param input The object to be normalized.
 * @param depth The max depth to which to normalize the object. (Anything deeper stringified whole.)
 * @param maxProperties The max number of elements or properties to be included in any single array or
 * object in the normallized output.
 * @returns A normalized version of the object, or `"**non-serializable**"` if any errors are thrown during normalization.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalize(input, depth = +Infinity, maxProperties = +Infinity) {
  try {
    // since we're at the outermost level, we don't provide a key
    return visit('', input, depth, maxProperties);
  } catch (err) {
    return { ERROR: `**non-serializable** (${err})` };
  }
}

/** JSDoc */
function normalizeToSize(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  object,
  // Default Node.js REPL depth
  depth = 3,
  // 100kB, as 200kB is max payload size, so half sounds reasonable
  maxSize = 100 * 1024,
) {
  const normalized = normalize(object, depth);

  if (jsonSize(normalized) > maxSize) {
    return normalizeToSize(object, depth - 1, maxSize);
  }

  return normalized ;
}

/**
 * Visits a node to perform normalization on it
 *
 * @param key The key corresponding to the given node
 * @param value The node to be visited
 * @param depth Optional number indicating the maximum recursion depth
 * @param maxProperties Optional maximum number of properties/elements included in any single object/array
 * @param memo Optional Memo class handling decycling
 */
function visit(
  key,
  value,
  depth = +Infinity,
  maxProperties = +Infinity,
  memo = (0,_memo_js__WEBPACK_IMPORTED_MODULE_0__.memoBuilder)(),
) {
  const [memoize, unmemoize] = memo;

  // Get the simple cases out of the way first
  if (value === null || (['number', 'boolean', 'string'].includes(typeof value) && !(0,_is_js__WEBPACK_IMPORTED_MODULE_1__.isNaN)(value))) {
    return value ;
  }

  const stringified = stringifyValue(key, value);

  // Anything we could potentially dig into more (objects or arrays) will have come back as `"[object XXXX]"`.
  // Everything else will have already been serialized, so if we don't see that pattern, we're done.
  if (!stringified.startsWith('[object ')) {
    return stringified;
  }

  // From here on, we can assert that `value` is either an object or an array.

  // Do not normalize objects that we know have already been normalized. As a general rule, the
  // "__sentry_skip_normalization__" property should only be used sparingly and only should only be set on objects that
  // have already been normalized.
  if ((value )['__sentry_skip_normalization__']) {
    return value ;
  }

  // We're also done if we've reached the max depth
  if (depth === 0) {
    // At this point we know `serialized` is a string of the form `"[object XXXX]"`. Clean it up so it's just `"[XXXX]"`.
    return stringified.replace('object ', '');
  }

  // If we've already visited this branch, bail out, as it's circular reference. If not, note that we're seeing it now.
  if (memoize(value)) {
    return '[Circular ~]';
  }

  // If the value has a `toJSON` method, we call it to extract more information
  const valueWithToJSON = value ;
  if (valueWithToJSON && typeof valueWithToJSON.toJSON === 'function') {
    try {
      const jsonValue = valueWithToJSON.toJSON();
      // We need to normalize the return value of `.toJSON()` in case it has circular references
      return visit('', jsonValue, depth - 1, maxProperties, memo);
    } catch (err) {
      // pass (The built-in `toJSON` failed, but we can still try to do it ourselves)
    }
  }

  // At this point we know we either have an object or an array, we haven't seen it before, and we're going to recurse
  // because we haven't yet reached the max depth. Create an accumulator to hold the results of visiting each
  // property/entry, and keep track of the number of items we add to it.
  const normalized = (Array.isArray(value) ? [] : {}) ;
  let numAdded = 0;

  // Before we begin, convert`Error` and`Event` instances into plain objects, since some of each of their relevant
  // properties are non-enumerable and otherwise would get missed.
  const visitable = (0,_object_js__WEBPACK_IMPORTED_MODULE_2__.convertToPlainObject)(value );

  for (const visitKey in visitable) {
    // Avoid iterating over fields in the prototype if they've somehow been exposed to enumeration.
    if (!Object.prototype.hasOwnProperty.call(visitable, visitKey)) {
      continue;
    }

    if (numAdded >= maxProperties) {
      normalized[visitKey] = '[MaxProperties ~]';
      break;
    }

    // Recursively visit all the child nodes
    const visitValue = visitable[visitKey];
    normalized[visitKey] = visit(visitKey, visitValue, depth - 1, maxProperties, memo);

    numAdded += 1;
  }

  // Once we've visited all the branches, remove the parent from memo storage
  unmemoize(value);

  // Return accumulated values
  return normalized;
}

/**
 * Stringify the given value. Handles various known special values and types.
 *
 * Not meant to be used on simple primitives which already have a string representation, as it will, for example, turn
 * the number 1231 into "[Object Number]", nor on `null`, as it will throw.
 *
 * @param value The value to stringify
 * @returns A stringified representation of the given value
 */
function stringifyValue(
  key,
  // this type is a tiny bit of a cheat, since this function does handle NaN (which is technically a number), but for
  // our internal use, it'll do
  value,
) {
  try {
    if (key === 'domain' && value && typeof value === 'object' && (value )._events) {
      return '[Domain]';
    }

    if (key === 'domainEmitter') {
      return '[DomainEmitter]';
    }

    // It's safe to use `global`, `window`, and `document` here in this manner, as we are asserting using `typeof` first
    // which won't throw if they are not present.

    if (typeof __webpack_require__.g !== 'undefined' && value === __webpack_require__.g) {
      return '[Global]';
    }

    // eslint-disable-next-line no-restricted-globals
    if (typeof window !== 'undefined' && value === window) {
      return '[Window]';
    }

    // eslint-disable-next-line no-restricted-globals
    if (typeof document !== 'undefined' && value === document) {
      return '[Document]';
    }

    // React's SyntheticEvent thingy
    if ((0,_is_js__WEBPACK_IMPORTED_MODULE_1__.isSyntheticEvent)(value)) {
      return '[SyntheticEvent]';
    }

    if (typeof value === 'number' && value !== value) {
      return '[NaN]';
    }

    // this catches `undefined` (but not `null`, which is a primitive and can be serialized on its own)
    if (value === void 0) {
      return '[undefined]';
    }

    if (typeof value === 'function') {
      return `[Function: ${(0,_stacktrace_js__WEBPACK_IMPORTED_MODULE_3__.getFunctionName)(value)}]`;
    }

    if (typeof value === 'symbol') {
      return `[${String(value)}]`;
    }

    // stringified BigInts are indistinguishable from regular numbers, so we need to label them to avoid confusion
    if (typeof value === 'bigint') {
      return `[BigInt: ${String(value)}]`;
    }

    // Now that we've knocked out all the special cases and the primitives, all we have left are objects. Simply casting
    // them to strings means that instances of classes which haven't defined their `toStringTag` will just come out as
    // `"[object Object]"`. If we instead look at the constructor's name (which is the same as the name of the class),
    // we can make sure that only plain objects come out that way.
    return `[object ${(Object.getPrototypeOf(value) ).constructor.name}]`;
  } catch (err) {
    return `**non-serializable** (${err})`;
  }
}

/** Calculates bytes size of input string */
function utf8Length(value) {
  // eslint-disable-next-line no-bitwise
  return ~-encodeURI(value).split(/%..|./).length;
}

/** Calculates bytes size of input object */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function jsonSize(value) {
  return utf8Length(JSON.stringify(value));
}


//# sourceMappingURL=normalize.js.map


/***/ }),

/***/ "./node_modules/@sentry/utils/esm/object.js":
/*!**************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/object.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addNonEnumerableProperty": () => (/* binding */ addNonEnumerableProperty),
/* harmony export */   "convertToPlainObject": () => (/* binding */ convertToPlainObject),
/* harmony export */   "dropUndefinedKeys": () => (/* binding */ dropUndefinedKeys),
/* harmony export */   "extractExceptionKeysForMessage": () => (/* binding */ extractExceptionKeysForMessage),
/* harmony export */   "fill": () => (/* binding */ fill),
/* harmony export */   "getOriginalFunction": () => (/* binding */ getOriginalFunction),
/* harmony export */   "markFunctionWrapped": () => (/* binding */ markFunctionWrapped),
/* harmony export */   "objectify": () => (/* binding */ objectify),
/* harmony export */   "urlEncode": () => (/* binding */ urlEncode)
/* harmony export */ });
/* harmony import */ var _browser_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./browser.js */ "./node_modules/@sentry/utils/esm/browser.js");
/* harmony import */ var _is_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is.js */ "./node_modules/@sentry/utils/esm/is.js");
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./string.js */ "./node_modules/@sentry/utils/esm/string.js");




/**
 * Replace a method in an object with a wrapped version of itself.
 *
 * @param source An object that contains a method to be wrapped.
 * @param name The name of the method to be wrapped.
 * @param replacementFactory A higher-order function that takes the original version of the given method and returns a
 * wrapped version. Note: The function returned by `replacementFactory` needs to be a non-arrow function, in order to
 * preserve the correct value of `this`, and the original method must be called using `origMethod.call(this, <other
 * args>)` or `origMethod.apply(this, [<other args>])` (rather than being called directly), again to preserve `this`.
 * @returns void
 */
function fill(source, name, replacementFactory) {
  if (!(name in source)) {
    return;
  }

  const original = source[name] ;
  const wrapped = replacementFactory(original) ;

  // Make sure it's a function first, as we need to attach an empty prototype for `defineProperties` to work
  // otherwise it'll throw "TypeError: Object.defineProperties called on non-object"
  if (typeof wrapped === 'function') {
    try {
      markFunctionWrapped(wrapped, original);
    } catch (_Oo) {
      // This can throw if multiple fill happens on a global object like XMLHttpRequest
      // Fixes https://github.com/getsentry/sentry-javascript/issues/2043
    }
  }

  source[name] = wrapped;
}

/**
 * Defines a non-enumerable property on the given object.
 *
 * @param obj The object on which to set the property
 * @param name The name of the property to be set
 * @param value The value to which to set the property
 */
function addNonEnumerableProperty(obj, name, value) {
  Object.defineProperty(obj, name, {
    // enumerable: false, // the default, so we can save on bundle size by not explicitly setting it
    value: value,
    writable: true,
    configurable: true,
  });
}

/**
 * Remembers the original function on the wrapped function and
 * patches up the prototype.
 *
 * @param wrapped the wrapper function
 * @param original the original function that gets wrapped
 */
function markFunctionWrapped(wrapped, original) {
  const proto = original.prototype || {};
  wrapped.prototype = original.prototype = proto;
  addNonEnumerableProperty(wrapped, '__sentry_original__', original);
}

/**
 * This extracts the original function if available.  See
 * `markFunctionWrapped` for more information.
 *
 * @param func the function to unwrap
 * @returns the unwrapped version of the function if available.
 */
function getOriginalFunction(func) {
  return func.__sentry_original__;
}

/**
 * Encodes given object into url-friendly format
 *
 * @param object An object that contains serializable values
 * @returns string Encoded
 */
function urlEncode(object) {
  return Object.keys(object)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`)
    .join('&');
}

/**
 * Transforms any `Error` or `Event` into a plain object with all of their enumerable properties, and some of their
 * non-enumerable properties attached.
 *
 * @param value Initial source that we have to transform in order for it to be usable by the serializer
 * @returns An Event or Error turned into an object - or the value argurment itself, when value is neither an Event nor
 *  an Error.
 */
function convertToPlainObject(
  value,
)

 {
  if ((0,_is_js__WEBPACK_IMPORTED_MODULE_0__.isError)(value)) {
    return {
      message: value.message,
      name: value.name,
      stack: value.stack,
      ...getOwnProperties(value),
    };
  } else if ((0,_is_js__WEBPACK_IMPORTED_MODULE_0__.isEvent)(value)) {
    const newObj

 = {
      type: value.type,
      target: serializeEventTarget(value.target),
      currentTarget: serializeEventTarget(value.currentTarget),
      ...getOwnProperties(value),
    };

    if (typeof CustomEvent !== 'undefined' && (0,_is_js__WEBPACK_IMPORTED_MODULE_0__.isInstanceOf)(value, CustomEvent)) {
      newObj.detail = value.detail;
    }

    return newObj;
  } else {
    return value;
  }
}

/** Creates a string representation of the target of an `Event` object */
function serializeEventTarget(target) {
  try {
    return (0,_is_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(target) ? (0,_browser_js__WEBPACK_IMPORTED_MODULE_1__.htmlTreeAsString)(target) : Object.prototype.toString.call(target);
  } catch (_oO) {
    return '<unknown>';
  }
}

/** Filters out all but an object's own properties */
function getOwnProperties(obj) {
  if (typeof obj === 'object' && obj !== null) {
    const extractedProps = {};
    for (const property in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, property)) {
        extractedProps[property] = (obj )[property];
      }
    }
    return extractedProps;
  } else {
    return {};
  }
}

/**
 * Given any captured exception, extract its keys and create a sorted
 * and truncated list that will be used inside the event message.
 * eg. `Non-error exception captured with keys: foo, bar, baz`
 */
function extractExceptionKeysForMessage(exception, maxLength = 40) {
  const keys = Object.keys(convertToPlainObject(exception));
  keys.sort();

  if (!keys.length) {
    return '[object has no keys]';
  }

  if (keys[0].length >= maxLength) {
    return (0,_string_js__WEBPACK_IMPORTED_MODULE_2__.truncate)(keys[0], maxLength);
  }

  for (let includedKeys = keys.length; includedKeys > 0; includedKeys--) {
    const serialized = keys.slice(0, includedKeys).join(', ');
    if (serialized.length > maxLength) {
      continue;
    }
    if (includedKeys === keys.length) {
      return serialized;
    }
    return (0,_string_js__WEBPACK_IMPORTED_MODULE_2__.truncate)(serialized, maxLength);
  }

  return '';
}

/**
 * Given any object, return a new object having removed all fields whose value was `undefined`.
 * Works recursively on objects and arrays.
 *
 * Attention: This function keeps circular references in the returned object.
 */
function dropUndefinedKeys(inputValue) {
  // This map keeps track of what already visited nodes map to.
  // Our Set - based memoBuilder doesn't work here because we want to the output object to have the same circular
  // references as the input object.
  const memoizationMap = new Map();

  // This function just proxies `_dropUndefinedKeys` to keep the `memoBuilder` out of this function's API
  return _dropUndefinedKeys(inputValue, memoizationMap);
}

function _dropUndefinedKeys(inputValue, memoizationMap) {
  if ((0,_is_js__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(inputValue)) {
    // If this node has already been visited due to a circular reference, return the object it was mapped to in the new object
    const memoVal = memoizationMap.get(inputValue);
    if (memoVal !== undefined) {
      return memoVal ;
    }

    const returnValue = {};
    // Store the mapping of this value in case we visit it again, in case of circular data
    memoizationMap.set(inputValue, returnValue);

    for (const key of Object.keys(inputValue)) {
      if (typeof inputValue[key] !== 'undefined') {
        returnValue[key] = _dropUndefinedKeys(inputValue[key], memoizationMap);
      }
    }

    return returnValue ;
  }

  if (Array.isArray(inputValue)) {
    // If this node has already been visited due to a circular reference, return the array it was mapped to in the new object
    const memoVal = memoizationMap.get(inputValue);
    if (memoVal !== undefined) {
      return memoVal ;
    }

    const returnValue = [];
    // Store the mapping of this value in case we visit it again, in case of circular data
    memoizationMap.set(inputValue, returnValue);

    inputValue.forEach((item) => {
      returnValue.push(_dropUndefinedKeys(item, memoizationMap));
    });

    return returnValue ;
  }

  return inputValue;
}

/**
 * Ensure that something is an object.
 *
 * Turns `undefined` and `null` into `String`s and all other primitives into instances of their respective wrapper
 * classes (String, Boolean, Number, etc.). Acts as the identity function on non-primitives.
 *
 * @param wat The subject of the objectification
 * @returns A version of `wat` which can safely be used with `Object` class methods
 */
function objectify(wat) {
  let objectified;
  switch (true) {
    case wat === undefined || wat === null:
      objectified = new String(wat);
      break;

    // Though symbols and bigints do have wrapper classes (`Symbol` and `BigInt`, respectively), for whatever reason
    // those classes don't have constructors which can be used with the `new` keyword. We therefore need to cast each as
    // an object in order to wrap it.
    case typeof wat === 'symbol' || typeof wat === 'bigint':
      objectified = Object(wat);
      break;

    // this will catch the remaining primitives: `String`, `Number`, and `Boolean`
    case (0,_is_js__WEBPACK_IMPORTED_MODULE_0__.isPrimitive)(wat):
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      objectified = new (wat ).constructor(wat);
      break;

    // by process of elimination, at this point we know that `wat` must already be an object
    default:
      objectified = wat;
      break;
  }
  return objectified;
}


//# sourceMappingURL=object.js.map


/***/ }),

/***/ "./node_modules/@sentry/utils/esm/promisebuffer.js":
/*!*********************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/promisebuffer.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makePromiseBuffer": () => (/* binding */ makePromiseBuffer)
/* harmony export */ });
/* harmony import */ var _error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error.js */ "./node_modules/@sentry/utils/esm/error.js");
/* harmony import */ var _syncpromise_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./syncpromise.js */ "./node_modules/@sentry/utils/esm/syncpromise.js");



/**
 * Creates an new PromiseBuffer object with the specified limit
 * @param limit max number of promises that can be stored in the buffer
 */
function makePromiseBuffer(limit) {
  const buffer = [];

  function isReady() {
    return limit === undefined || buffer.length < limit;
  }

  /**
   * Remove a promise from the queue.
   *
   * @param task Can be any PromiseLike<T>
   * @returns Removed promise.
   */
  function remove(task) {
    return buffer.splice(buffer.indexOf(task), 1)[0];
  }

  /**
   * Add a promise (representing an in-flight action) to the queue, and set it to remove itself on fulfillment.
   *
   * @param taskProducer A function producing any PromiseLike<T>; In previous versions this used to be `task:
   *        PromiseLike<T>`, but under that model, Promises were instantly created on the call-site and their executor
   *        functions therefore ran immediately. Thus, even if the buffer was full, the action still happened. By
   *        requiring the promise to be wrapped in a function, we can defer promise creation until after the buffer
   *        limit check.
   * @returns The original promise.
   */
  function add(taskProducer) {
    if (!isReady()) {
      return (0,_syncpromise_js__WEBPACK_IMPORTED_MODULE_0__.rejectedSyncPromise)(new _error_js__WEBPACK_IMPORTED_MODULE_1__.SentryError('Not adding Promise because buffer limit was reached.'));
    }

    // start the task and add its promise to the queue
    const task = taskProducer();
    if (buffer.indexOf(task) === -1) {
      buffer.push(task);
    }
    void task
      .then(() => remove(task))
      // Use `then(null, rejectionHandler)` rather than `catch(rejectionHandler)` so that we can use `PromiseLike`
      // rather than `Promise`. `PromiseLike` doesn't have a `.catch` method, making its polyfill smaller. (ES5 didn't
      // have promises, so TS has to polyfill when down-compiling.)
      .then(null, () =>
        remove(task).then(null, () => {
          // We have to add another catch here because `remove()` starts a new promise chain.
        }),
      );
    return task;
  }

  /**
   * Wait for all promises in the queue to resolve or for timeout to expire, whichever comes first.
   *
   * @param timeout The time, in ms, after which to resolve to `false` if the queue is still non-empty. Passing `0` (or
   * not passing anything) will make the promise wait as long as it takes for the queue to drain before resolving to
   * `true`.
   * @returns A promise which will resolve to `true` if the queue is already empty or drains before the timeout, and
   * `false` otherwise
   */
  function drain(timeout) {
    return new _syncpromise_js__WEBPACK_IMPORTED_MODULE_0__.SyncPromise((resolve, reject) => {
      let counter = buffer.length;

      if (!counter) {
        return resolve(true);
      }

      // wait for `timeout` ms and then resolve to `false` (if not cancelled first)
      const capturedSetTimeout = setTimeout(() => {
        if (timeout && timeout > 0) {
          resolve(false);
        }
      }, timeout);

      // if all promises resolve in time, cancel the timer and resolve to `true`
      buffer.forEach(item => {
        void (0,_syncpromise_js__WEBPACK_IMPORTED_MODULE_0__.resolvedSyncPromise)(item).then(() => {
          // eslint-disable-next-line no-plusplus
          if (!--counter) {
            clearTimeout(capturedSetTimeout);
            resolve(true);
          }
        }, reject);
      });
    });
  }

  return {
    $: buffer,
    add,
    drain,
  };
}


//# sourceMappingURL=promisebuffer.js.map


/***/ }),

/***/ "./node_modules/@sentry/utils/esm/ratelimit.js":
/*!*****************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/ratelimit.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEFAULT_RETRY_AFTER": () => (/* binding */ DEFAULT_RETRY_AFTER),
/* harmony export */   "disabledUntil": () => (/* binding */ disabledUntil),
/* harmony export */   "isRateLimited": () => (/* binding */ isRateLimited),
/* harmony export */   "parseRetryAfterHeader": () => (/* binding */ parseRetryAfterHeader),
/* harmony export */   "updateRateLimits": () => (/* binding */ updateRateLimits)
/* harmony export */ });
// Intentionally keeping the key broad, as we don't know for sure what rate limit headers get returned from backend

const DEFAULT_RETRY_AFTER = 60 * 1000; // 60 seconds

/**
 * Extracts Retry-After value from the request header or returns default value
 * @param header string representation of 'Retry-After' header
 * @param now current unix timestamp
 *
 */
function parseRetryAfterHeader(header, now = Date.now()) {
  const headerDelay = parseInt(`${header}`, 10);
  if (!isNaN(headerDelay)) {
    return headerDelay * 1000;
  }

  const headerDate = Date.parse(`${header}`);
  if (!isNaN(headerDate)) {
    return headerDate - now;
  }

  return DEFAULT_RETRY_AFTER;
}

/**
 * Gets the time that given category is disabled until for rate limiting
 */
function disabledUntil(limits, category) {
  return limits[category] || limits.all || 0;
}

/**
 * Checks if a category is rate limited
 */
function isRateLimited(limits, category, now = Date.now()) {
  return disabledUntil(limits, category) > now;
}

/**
 * Update ratelimits from incoming headers.
 * Returns true if headers contains a non-empty rate limiting header.
 */
function updateRateLimits(
  limits,
  { statusCode, headers },
  now = Date.now(),
) {
  const updatedRateLimits = {
    ...limits,
  };

  // "The name is case-insensitive."
  // https://developer.mozilla.org/en-US/docs/Web/API/Headers/get
  const rateLimitHeader = headers && headers['x-sentry-rate-limits'];
  const retryAfterHeader = headers && headers['retry-after'];

  if (rateLimitHeader) {
    /**
     * rate limit headers are of the form
     *     <header>,<header>,..
     * where each <header> is of the form
     *     <retry_after>: <categories>: <scope>: <reason_code>
     * where
     *     <retry_after> is a delay in seconds
     *     <categories> is the event type(s) (error, transaction, etc) being rate limited and is of the form
     *         <category>;<category>;...
     *     <scope> is what's being limited (org, project, or key) - ignored by SDK
     *     <reason_code> is an arbitrary string like "org_quota" - ignored by SDK
     */
    for (const limit of rateLimitHeader.trim().split(',')) {
      const [retryAfter, categories] = limit.split(':', 2);
      const headerDelay = parseInt(retryAfter, 10);
      const delay = (!isNaN(headerDelay) ? headerDelay : 60) * 1000; // 60sec default
      if (!categories) {
        updatedRateLimits.all = now + delay;
      } else {
        for (const category of categories.split(';')) {
          updatedRateLimits[category] = now + delay;
        }
      }
    }
  } else if (retryAfterHeader) {
    updatedRateLimits.all = now + parseRetryAfterHeader(retryAfterHeader, now);
  } else if (statusCode === 429) {
    updatedRateLimits.all = now + 60 * 1000;
  }

  return updatedRateLimits;
}


//# sourceMappingURL=ratelimit.js.map


/***/ }),

/***/ "./node_modules/@sentry/utils/esm/severity.js":
/*!****************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/severity.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "severityFromString": () => (/* binding */ severityFromString),
/* harmony export */   "severityLevelFromString": () => (/* binding */ severityLevelFromString),
/* harmony export */   "validSeverityLevels": () => (/* binding */ validSeverityLevels)
/* harmony export */ });
// Note: Ideally the `SeverityLevel` type would be derived from `validSeverityLevels`, but that would mean either
//
// a) moving `validSeverityLevels` to `@sentry/types`,
// b) moving the`SeverityLevel` type here, or
// c) importing `validSeverityLevels` from here into `@sentry/types`.
//
// Option A would make `@sentry/types` a runtime dependency of `@sentry/utils` (not good), and options B and C would
// create a circular dependency between `@sentry/types` and `@sentry/utils` (also not good). So a TODO accompanying the
// type, reminding anyone who changes it to change this list also, will have to do.

const validSeverityLevels = ['fatal', 'error', 'warning', 'log', 'info', 'debug'];

/**
 * Converts a string-based level into a member of the deprecated {@link Severity} enum.
 *
 * @deprecated `severityFromString` is deprecated. Please use `severityLevelFromString` instead.
 *
 * @param level String representation of Severity
 * @returns Severity
 */
function severityFromString(level) {
  return severityLevelFromString(level) ;
}

/**
 * Converts a string-based level into a `SeverityLevel`, normalizing it along the way.
 *
 * @param level String representation of desired `SeverityLevel`.
 * @returns The `SeverityLevel` corresponding to the given string, or 'log' if the string isn't a valid level.
 */
function severityLevelFromString(level) {
  return (level === 'warn' ? 'warning' : validSeverityLevels.includes(level) ? level : 'log') ;
}


//# sourceMappingURL=severity.js.map


/***/ }),

/***/ "./node_modules/@sentry/utils/esm/stacktrace.js":
/*!******************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/stacktrace.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createStackParser": () => (/* binding */ createStackParser),
/* harmony export */   "getFunctionName": () => (/* binding */ getFunctionName),
/* harmony export */   "nodeStackLineParser": () => (/* binding */ nodeStackLineParser),
/* harmony export */   "stackParserFromStackParserOptions": () => (/* binding */ stackParserFromStackParserOptions),
/* harmony export */   "stripSentryFramesAndReverse": () => (/* binding */ stripSentryFramesAndReverse)
/* harmony export */ });
/* harmony import */ var _buildPolyfills__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buildPolyfills */ "./node_modules/@sentry/utils/esm/buildPolyfills/_optionalChain.js");


const STACKTRACE_LIMIT = 50;

/**
 * Creates a stack parser with the supplied line parsers
 *
 * StackFrames are returned in the correct order for Sentry Exception
 * frames and with Sentry SDK internal frames removed from the top and bottom
 *
 */
function createStackParser(...parsers) {
  const sortedParsers = parsers.sort((a, b) => a[0] - b[0]).map(p => p[1]);

  return (stack, skipFirst = 0) => {
    const frames = [];

    for (const line of stack.split('\n').slice(skipFirst)) {
      // https://github.com/getsentry/sentry-javascript/issues/5459
      // Remove webpack (error: *) wrappers
      const cleanedLine = line.replace(/\(error: (.*)\)/, '$1');

      for (const parser of sortedParsers) {
        const frame = parser(cleanedLine);

        if (frame) {
          frames.push(frame);
          break;
        }
      }
    }

    return stripSentryFramesAndReverse(frames);
  };
}

/**
 * Gets a stack parser implementation from Options.stackParser
 * @see Options
 *
 * If options contains an array of line parsers, it is converted into a parser
 */
function stackParserFromStackParserOptions(stackParser) {
  if (Array.isArray(stackParser)) {
    return createStackParser(...stackParser);
  }
  return stackParser;
}

/**
 * @hidden
 */
function stripSentryFramesAndReverse(stack) {
  if (!stack.length) {
    return [];
  }

  let localStack = stack;

  const firstFrameFunction = localStack[0].function || '';
  const lastFrameFunction = localStack[localStack.length - 1].function || '';

  // If stack starts with one of our API calls, remove it (starts, meaning it's the top of the stack - aka last call)
  if (firstFrameFunction.indexOf('captureMessage') !== -1 || firstFrameFunction.indexOf('captureException') !== -1) {
    localStack = localStack.slice(1);
  }

  // If stack ends with one of our internal API calls, remove it (ends, meaning it's the bottom of the stack - aka top-most call)
  if (lastFrameFunction.indexOf('sentryWrapped') !== -1) {
    localStack = localStack.slice(0, -1);
  }

  // The frame where the crash happened, should be the last entry in the array
  return localStack
    .slice(0, STACKTRACE_LIMIT)
    .map(frame => ({
      ...frame,
      filename: frame.filename || localStack[0].filename,
      function: frame.function || '?',
    }))
    .reverse();
}

const defaultFunctionName = '<anonymous>';

/**
 * Safely extract function name from itself
 */
function getFunctionName(fn) {
  try {
    if (!fn || typeof fn !== 'function') {
      return defaultFunctionName;
    }
    return fn.name || defaultFunctionName;
  } catch (e) {
    // Just accessing custom props in some Selenium environments
    // can cause a "Permission denied" exception (see raven-js#495).
    return defaultFunctionName;
  }
}

// eslint-disable-next-line complexity
function node(getModule) {
  const FILENAME_MATCH = /^\s*[-]{4,}$/;
  const FULL_MATCH = /at (?:async )?(?:(.+?)\s+\()?(?:(.+):(\d+):(\d+)?|([^)]+))\)?/;

  // eslint-disable-next-line complexity
  return (line) => {
    if (line.match(FILENAME_MATCH)) {
      return {
        filename: line,
      };
    }

    const lineMatch = line.match(FULL_MATCH);
    if (!lineMatch) {
      return undefined;
    }

    let object;
    let method;
    let functionName;
    let typeName;
    let methodName;

    if (lineMatch[1]) {
      functionName = lineMatch[1];

      let methodStart = functionName.lastIndexOf('.');
      if (functionName[methodStart - 1] === '.') {
        // eslint-disable-next-line no-plusplus
        methodStart--;
      }

      if (methodStart > 0) {
        object = functionName.substr(0, methodStart);
        method = functionName.substr(methodStart + 1);
        const objectEnd = object.indexOf('.Module');
        if (objectEnd > 0) {
          functionName = functionName.substr(objectEnd + 1);
          object = object.substr(0, objectEnd);
        }
      }
      typeName = undefined;
    }

    if (method) {
      typeName = object;
      methodName = method;
    }

    if (method === '<anonymous>') {
      methodName = undefined;
      functionName = undefined;
    }

    if (functionName === undefined) {
      methodName = methodName || '<anonymous>';
      functionName = typeName ? `${typeName}.${methodName}` : methodName;
    }

    const filename = (0,_buildPolyfills__WEBPACK_IMPORTED_MODULE_0__._optionalChain)([lineMatch, 'access', _ => _[2], 'optionalAccess', _2 => _2.startsWith, 'call', _3 => _3('file://')]) ? lineMatch[2].substr(7) : lineMatch[2];
    const isNative = lineMatch[5] === 'native';
    const isInternal =
      isNative || (filename && !filename.startsWith('/') && !filename.startsWith('.') && filename.indexOf(':\\') !== 1);

    // in_app is all that's not an internal Node function or a module within node_modules
    // note that isNative appears to return true even for node core libraries
    // see https://github.com/getsentry/raven-node/issues/176
    const in_app = !isInternal && filename !== undefined && !filename.includes('node_modules/');

    return {
      filename,
      module: (0,_buildPolyfills__WEBPACK_IMPORTED_MODULE_0__._optionalChain)([getModule, 'optionalCall', _4 => _4(filename)]),
      function: functionName,
      lineno: parseInt(lineMatch[3], 10) || undefined,
      colno: parseInt(lineMatch[4], 10) || undefined,
      in_app,
    };
  };
}

/**
 * Node.js stack line parser
 *
 * This is in @sentry/utils so it can be used from the Electron SDK in the browser for when `nodeIntegration == true`.
 * This allows it to be used without referencing or importing any node specific code which causes bundlers to complain
 */
function nodeStackLineParser(getModule) {
  return [90, node(getModule)];
}


//# sourceMappingURL=stacktrace.js.map


/***/ }),

/***/ "./node_modules/@sentry/utils/esm/string.js":
/*!**************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/string.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "escapeStringForRegex": () => (/* binding */ escapeStringForRegex),
/* harmony export */   "isMatchingPattern": () => (/* binding */ isMatchingPattern),
/* harmony export */   "safeJoin": () => (/* binding */ safeJoin),
/* harmony export */   "snipLine": () => (/* binding */ snipLine),
/* harmony export */   "stringMatchesSomePattern": () => (/* binding */ stringMatchesSomePattern),
/* harmony export */   "truncate": () => (/* binding */ truncate)
/* harmony export */ });
/* harmony import */ var _is_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is.js */ "./node_modules/@sentry/utils/esm/is.js");


/**
 * Truncates given string to the maximum characters count
 *
 * @param str An object that contains serializable values
 * @param max Maximum number of characters in truncated string (0 = unlimited)
 * @returns string Encoded
 */
function truncate(str, max = 0) {
  if (typeof str !== 'string' || max === 0) {
    return str;
  }
  return str.length <= max ? str : `${str.substr(0, max)}...`;
}

/**
 * This is basically just `trim_line` from
 * https://github.com/getsentry/sentry/blob/master/src/sentry/lang/javascript/processor.py#L67
 *
 * @param str An object that contains serializable values
 * @param max Maximum number of characters in truncated string
 * @returns string Encoded
 */
function snipLine(line, colno) {
  let newLine = line;
  const lineLength = newLine.length;
  if (lineLength <= 150) {
    return newLine;
  }
  if (colno > lineLength) {
    // eslint-disable-next-line no-param-reassign
    colno = lineLength;
  }

  let start = Math.max(colno - 60, 0);
  if (start < 5) {
    start = 0;
  }

  let end = Math.min(start + 140, lineLength);
  if (end > lineLength - 5) {
    end = lineLength;
  }
  if (end === lineLength) {
    start = Math.max(end - 140, 0);
  }

  newLine = newLine.slice(start, end);
  if (start > 0) {
    newLine = `'{snip} ${newLine}`;
  }
  if (end < lineLength) {
    newLine += ' {snip}';
  }

  return newLine;
}

/**
 * Join values in array
 * @param input array of values to be joined together
 * @param delimiter string to be placed in-between values
 * @returns Joined values
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function safeJoin(input, delimiter) {
  if (!Array.isArray(input)) {
    return '';
  }

  const output = [];
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < input.length; i++) {
    const value = input[i];
    try {
      output.push(String(value));
    } catch (e) {
      output.push('[value cannot be serialized]');
    }
  }

  return output.join(delimiter);
}

/**
 * Checks if the given value matches a regex or string
 *
 * @param value The string to test
 * @param pattern Either a regex or a string against which `value` will be matched
 * @param requireExactStringMatch If true, `value` must match `pattern` exactly. If false, `value` will match
 * `pattern` if it contains `pattern`. Only applies to string-type patterns.
 */
function isMatchingPattern(
  value,
  pattern,
  requireExactStringMatch = false,
) {
  if (!(0,_is_js__WEBPACK_IMPORTED_MODULE_0__.isString)(value)) {
    return false;
  }

  if ((0,_is_js__WEBPACK_IMPORTED_MODULE_0__.isRegExp)(pattern)) {
    return pattern.test(value);
  }
  if ((0,_is_js__WEBPACK_IMPORTED_MODULE_0__.isString)(pattern)) {
    return requireExactStringMatch ? value === pattern : value.includes(pattern);
  }

  return false;
}

/**
 * Test the given string against an array of strings and regexes. By default, string matching is done on a
 * substring-inclusion basis rather than a strict equality basis
 *
 * @param testString The string to test
 * @param patterns The patterns against which to test the string
 * @param requireExactStringMatch If true, `testString` must match one of the given string patterns exactly in order to
 * count. If false, `testString` will match a string pattern if it contains that pattern.
 * @returns
 */
function stringMatchesSomePattern(
  testString,
  patterns = [],
  requireExactStringMatch = false,
) {
  return patterns.some(pattern => isMatchingPattern(testString, pattern, requireExactStringMatch));
}

/**
 * Given a string, escape characters which have meaning in the regex grammar, such that the result is safe to feed to
 * `new RegExp()`.
 *
 * Based on https://github.com/sindresorhus/escape-string-regexp. Vendored to a) reduce the size by skipping the runtime
 * type-checking, and b) ensure it gets down-compiled for old versions of Node (the published package only supports Node
 * 12+).
 *
 * @param regexString The string to escape
 * @returns An version of the string with all special regex characters escaped
 */
function escapeStringForRegex(regexString) {
  // escape the hyphen separately so we can also replace it with a unicode literal hyphen, to avoid the problems
  // discussed in https://github.com/sindresorhus/escape-string-regexp/issues/20.
  return regexString.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
}


//# sourceMappingURL=string.js.map


/***/ }),

/***/ "./node_modules/@sentry/utils/esm/supports.js":
/*!****************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/supports.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isNativeFetch": () => (/* binding */ isNativeFetch),
/* harmony export */   "supportsDOMError": () => (/* binding */ supportsDOMError),
/* harmony export */   "supportsDOMException": () => (/* binding */ supportsDOMException),
/* harmony export */   "supportsErrorEvent": () => (/* binding */ supportsErrorEvent),
/* harmony export */   "supportsFetch": () => (/* binding */ supportsFetch),
/* harmony export */   "supportsHistory": () => (/* binding */ supportsHistory),
/* harmony export */   "supportsNativeFetch": () => (/* binding */ supportsNativeFetch),
/* harmony export */   "supportsReferrerPolicy": () => (/* binding */ supportsReferrerPolicy),
/* harmony export */   "supportsReportingObserver": () => (/* binding */ supportsReportingObserver)
/* harmony export */ });
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logger.js */ "./node_modules/@sentry/utils/esm/logger.js");
/* harmony import */ var _worldwide_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./worldwide.js */ "./node_modules/@sentry/utils/esm/worldwide.js");



// eslint-disable-next-line deprecation/deprecation
const WINDOW = (0,_worldwide_js__WEBPACK_IMPORTED_MODULE_0__.getGlobalObject)();

/**
 * Tells whether current environment supports ErrorEvent objects
 * {@link supportsErrorEvent}.
 *
 * @returns Answer to the given question.
 */
function supportsErrorEvent() {
  try {
    new ErrorEvent('');
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Tells whether current environment supports DOMError objects
 * {@link supportsDOMError}.
 *
 * @returns Answer to the given question.
 */
function supportsDOMError() {
  try {
    // Chrome: VM89:1 Uncaught TypeError: Failed to construct 'DOMError':
    // 1 argument required, but only 0 present.
    // @ts-ignore It really needs 1 argument, not 0.
    new DOMError('');
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Tells whether current environment supports DOMException objects
 * {@link supportsDOMException}.
 *
 * @returns Answer to the given question.
 */
function supportsDOMException() {
  try {
    new DOMException('');
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Tells whether current environment supports Fetch API
 * {@link supportsFetch}.
 *
 * @returns Answer to the given question.
 */
function supportsFetch() {
  if (!('fetch' in WINDOW)) {
    return false;
  }

  try {
    new Headers();
    new Request('http://www.example.com');
    new Response();
    return true;
  } catch (e) {
    return false;
  }
}
/**
 * isNativeFetch checks if the given function is a native implementation of fetch()
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function isNativeFetch(func) {
  return func && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(func.toString());
}

/**
 * Tells whether current environment supports Fetch API natively
 * {@link supportsNativeFetch}.
 *
 * @returns true if `window.fetch` is natively implemented, false otherwise
 */
function supportsNativeFetch() {
  if (!supportsFetch()) {
    return false;
  }

  // Fast path to avoid DOM I/O
  // eslint-disable-next-line @typescript-eslint/unbound-method
  if (isNativeFetch(WINDOW.fetch)) {
    return true;
  }

  // window.fetch is implemented, but is polyfilled or already wrapped (e.g: by a chrome extension)
  // so create a "pure" iframe to see if that has native fetch
  let result = false;
  const doc = WINDOW.document;
  // eslint-disable-next-line deprecation/deprecation
  if (doc && typeof (doc.createElement ) === 'function') {
    try {
      const sandbox = doc.createElement('iframe');
      sandbox.hidden = true;
      doc.head.appendChild(sandbox);
      if (sandbox.contentWindow && sandbox.contentWindow.fetch) {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        result = isNativeFetch(sandbox.contentWindow.fetch);
      }
      doc.head.removeChild(sandbox);
    } catch (err) {
      (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) &&
        _logger_js__WEBPACK_IMPORTED_MODULE_1__.logger.warn('Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ', err);
    }
  }

  return result;
}

/**
 * Tells whether current environment supports ReportingObserver API
 * {@link supportsReportingObserver}.
 *
 * @returns Answer to the given question.
 */
function supportsReportingObserver() {
  return 'ReportingObserver' in WINDOW;
}

/**
 * Tells whether current environment supports Referrer Policy API
 * {@link supportsReferrerPolicy}.
 *
 * @returns Answer to the given question.
 */
function supportsReferrerPolicy() {
  // Despite all stars in the sky saying that Edge supports old draft syntax, aka 'never', 'always', 'origin' and 'default'
  // (see https://caniuse.com/#feat=referrer-policy),
  // it doesn't. And it throws an exception instead of ignoring this parameter...
  // REF: https://github.com/getsentry/raven-js/issues/1233

  if (!supportsFetch()) {
    return false;
  }

  try {
    new Request('_', {
      referrerPolicy: 'origin' ,
    });
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Tells whether current environment supports History API
 * {@link supportsHistory}.
 *
 * @returns Answer to the given question.
 */
function supportsHistory() {
  // NOTE: in Chrome App environment, touching history.pushState, *even inside
  //       a try/catch block*, will cause Chrome to output an error to console.error
  // borrowed from: https://github.com/angular/angular.js/pull/13945/files
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chrome = (WINDOW ).chrome;
  const isChromePackagedApp = chrome && chrome.app && chrome.app.runtime;
  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
  const hasHistoryApi = 'history' in WINDOW && !!WINDOW.history.pushState && !!WINDOW.history.replaceState;

  return !isChromePackagedApp && hasHistoryApi;
}


//# sourceMappingURL=supports.js.map


/***/ }),

/***/ "./node_modules/@sentry/utils/esm/syncpromise.js":
/*!*******************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/syncpromise.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SyncPromise": () => (/* binding */ SyncPromise),
/* harmony export */   "rejectedSyncPromise": () => (/* binding */ rejectedSyncPromise),
/* harmony export */   "resolvedSyncPromise": () => (/* binding */ resolvedSyncPromise)
/* harmony export */ });
/* harmony import */ var _is_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is.js */ "./node_modules/@sentry/utils/esm/is.js");


/* eslint-disable @typescript-eslint/explicit-function-return-type */

/** SyncPromise internal states */
var States; (function (States) {
  /** Pending */
  const PENDING = 0; States[States["PENDING"] = PENDING] = "PENDING";
  /** Resolved / OK */
  const RESOLVED = 1; States[States["RESOLVED"] = RESOLVED] = "RESOLVED";
  /** Rejected / Error */
  const REJECTED = 2; States[States["REJECTED"] = REJECTED] = "REJECTED";
})(States || (States = {}));

// Overloads so we can call resolvedSyncPromise without arguments and generic argument

/**
 * Creates a resolved sync promise.
 *
 * @param value the value to resolve the promise with
 * @returns the resolved sync promise
 */
function resolvedSyncPromise(value) {
  return new SyncPromise(resolve => {
    resolve(value);
  });
}

/**
 * Creates a rejected sync promise.
 *
 * @param value the value to reject the promise with
 * @returns the rejected sync promise
 */
function rejectedSyncPromise(reason) {
  return new SyncPromise((_, reject) => {
    reject(reason);
  });
}

/**
 * Thenable class that behaves like a Promise and follows it's interface
 * but is not async internally
 */
class SyncPromise {
   __init() {this._state = States.PENDING;}
   __init2() {this._handlers = [];}

   constructor(
    executor,
  ) {;SyncPromise.prototype.__init.call(this);SyncPromise.prototype.__init2.call(this);SyncPromise.prototype.__init3.call(this);SyncPromise.prototype.__init4.call(this);SyncPromise.prototype.__init5.call(this);SyncPromise.prototype.__init6.call(this);
    try {
      executor(this._resolve, this._reject);
    } catch (e) {
      this._reject(e);
    }
  }

  /** JSDoc */
   then(
    onfulfilled,
    onrejected,
  ) {
    return new SyncPromise((resolve, reject) => {
      this._handlers.push([
        false,
        result => {
          if (!onfulfilled) {
            // TODO: ¯\_(ツ)_/¯
            // TODO: FIXME
            resolve(result );
          } else {
            try {
              resolve(onfulfilled(result));
            } catch (e) {
              reject(e);
            }
          }
        },
        reason => {
          if (!onrejected) {
            reject(reason);
          } else {
            try {
              resolve(onrejected(reason));
            } catch (e) {
              reject(e);
            }
          }
        },
      ]);
      this._executeHandlers();
    });
  }

  /** JSDoc */
   catch(
    onrejected,
  ) {
    return this.then(val => val, onrejected);
  }

  /** JSDoc */
   finally(onfinally) {
    return new SyncPromise((resolve, reject) => {
      let val;
      let isRejected;

      return this.then(
        value => {
          isRejected = false;
          val = value;
          if (onfinally) {
            onfinally();
          }
        },
        reason => {
          isRejected = true;
          val = reason;
          if (onfinally) {
            onfinally();
          }
        },
      ).then(() => {
        if (isRejected) {
          reject(val);
          return;
        }

        resolve(val );
      });
    });
  }

  /** JSDoc */
    __init3() {this._resolve = (value) => {
    this._setResult(States.RESOLVED, value);
  };}

  /** JSDoc */
    __init4() {this._reject = (reason) => {
    this._setResult(States.REJECTED, reason);
  };}

  /** JSDoc */
    __init5() {this._setResult = (state, value) => {
    if (this._state !== States.PENDING) {
      return;
    }

    if ((0,_is_js__WEBPACK_IMPORTED_MODULE_0__.isThenable)(value)) {
      void (value ).then(this._resolve, this._reject);
      return;
    }

    this._state = state;
    this._value = value;

    this._executeHandlers();
  };}

  /** JSDoc */
    __init6() {this._executeHandlers = () => {
    if (this._state === States.PENDING) {
      return;
    }

    const cachedHandlers = this._handlers.slice();
    this._handlers = [];

    cachedHandlers.forEach(handler => {
      if (handler[0]) {
        return;
      }

      if (this._state === States.RESOLVED) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        handler[1](this._value );
      }

      if (this._state === States.REJECTED) {
        handler[2](this._value);
      }

      handler[0] = true;
    });
  };}
}


//# sourceMappingURL=syncpromise.js.map


/***/ }),

/***/ "./node_modules/@sentry/utils/esm/time.js":
/*!************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/time.js ***!
  \************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_browserPerformanceTimeOriginMode": () => (/* binding */ _browserPerformanceTimeOriginMode),
/* harmony export */   "browserPerformanceTimeOrigin": () => (/* binding */ browserPerformanceTimeOrigin),
/* harmony export */   "dateTimestampInSeconds": () => (/* binding */ dateTimestampInSeconds),
/* harmony export */   "timestampInSeconds": () => (/* binding */ timestampInSeconds),
/* harmony export */   "timestampWithMs": () => (/* binding */ timestampWithMs),
/* harmony export */   "usingPerformanceAPI": () => (/* binding */ usingPerformanceAPI)
/* harmony export */ });
/* harmony import */ var _node_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node.js */ "./node_modules/@sentry/utils/esm/node.js");
/* harmony import */ var _worldwide_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./worldwide.js */ "./node_modules/@sentry/utils/esm/worldwide.js");
/* module decorator */ module = __webpack_require__.hmd(module);



// eslint-disable-next-line deprecation/deprecation
const WINDOW = (0,_worldwide_js__WEBPACK_IMPORTED_MODULE_0__.getGlobalObject)();

/**
 * An object that can return the current timestamp in seconds since the UNIX epoch.
 */

/**
 * A TimestampSource implementation for environments that do not support the Performance Web API natively.
 *
 * Note that this TimestampSource does not use a monotonic clock. A call to `nowSeconds` may return a timestamp earlier
 * than a previously returned value. We do not try to emulate a monotonic behavior in order to facilitate debugging. It
 * is more obvious to explain "why does my span have negative duration" than "why my spans have zero duration".
 */
const dateTimestampSource = {
  nowSeconds: () => Date.now() / 1000,
};

/**
 * A partial definition of the [Performance Web API]{@link https://developer.mozilla.org/en-US/docs/Web/API/Performance}
 * for accessing a high-resolution monotonic clock.
 */

/**
 * Returns a wrapper around the native Performance API browser implementation, or undefined for browsers that do not
 * support the API.
 *
 * Wrapping the native API works around differences in behavior from different browsers.
 */
function getBrowserPerformance() {
  const { performance } = WINDOW;
  if (!performance || !performance.now) {
    return undefined;
  }

  // Replace performance.timeOrigin with our own timeOrigin based on Date.now().
  //
  // This is a partial workaround for browsers reporting performance.timeOrigin such that performance.timeOrigin +
  // performance.now() gives a date arbitrarily in the past.
  //
  // Additionally, computing timeOrigin in this way fills the gap for browsers where performance.timeOrigin is
  // undefined.
  //
  // The assumption that performance.timeOrigin + performance.now() ~= Date.now() is flawed, but we depend on it to
  // interact with data coming out of performance entries.
  //
  // Note that despite recommendations against it in the spec, browsers implement the Performance API with a clock that
  // might stop when the computer is asleep (and perhaps under other circumstances). Such behavior causes
  // performance.timeOrigin + performance.now() to have an arbitrary skew over Date.now(). In laptop computers, we have
  // observed skews that can be as long as days, weeks or months.
  //
  // See https://github.com/getsentry/sentry-javascript/issues/2590.
  //
  // BUG: despite our best intentions, this workaround has its limitations. It mostly addresses timings of pageload
  // transactions, but ignores the skew built up over time that can aversely affect timestamps of navigation
  // transactions of long-lived web pages.
  const timeOrigin = Date.now() - performance.now();

  return {
    now: () => performance.now(),
    timeOrigin,
  };
}

/**
 * Returns the native Performance API implementation from Node.js. Returns undefined in old Node.js versions that don't
 * implement the API.
 */
function getNodePerformance() {
  try {
    const perfHooks = (0,_node_js__WEBPACK_IMPORTED_MODULE_1__.dynamicRequire)(module, 'perf_hooks') ;
    return perfHooks.performance;
  } catch (_) {
    return undefined;
  }
}

/**
 * The Performance API implementation for the current platform, if available.
 */
const platformPerformance = (0,_node_js__WEBPACK_IMPORTED_MODULE_1__.isNodeEnv)() ? getNodePerformance() : getBrowserPerformance();

const timestampSource =
  platformPerformance === undefined
    ? dateTimestampSource
    : {
        nowSeconds: () => (platformPerformance.timeOrigin + platformPerformance.now()) / 1000,
      };

/**
 * Returns a timestamp in seconds since the UNIX epoch using the Date API.
 */
const dateTimestampInSeconds = dateTimestampSource.nowSeconds.bind(dateTimestampSource);

/**
 * Returns a timestamp in seconds since the UNIX epoch using either the Performance or Date APIs, depending on the
 * availability of the Performance API.
 *
 * See `usingPerformanceAPI` to test whether the Performance API is used.
 *
 * BUG: Note that because of how browsers implement the Performance API, the clock might stop when the computer is
 * asleep. This creates a skew between `dateTimestampInSeconds` and `timestampInSeconds`. The
 * skew can grow to arbitrary amounts like days, weeks or months.
 * See https://github.com/getsentry/sentry-javascript/issues/2590.
 */
const timestampInSeconds = timestampSource.nowSeconds.bind(timestampSource);

// Re-exported with an old name for backwards-compatibility.
const timestampWithMs = timestampInSeconds;

/**
 * A boolean that is true when timestampInSeconds uses the Performance API to produce monotonic timestamps.
 */
const usingPerformanceAPI = platformPerformance !== undefined;

/**
 * Internal helper to store what is the source of browserPerformanceTimeOrigin below. For debugging only.
 */
let _browserPerformanceTimeOriginMode;

/**
 * The number of milliseconds since the UNIX epoch. This value is only usable in a browser, and only when the
 * performance API is available.
 */
const browserPerformanceTimeOrigin = (() => {
  // Unfortunately browsers may report an inaccurate time origin data, through either performance.timeOrigin or
  // performance.timing.navigationStart, which results in poor results in performance data. We only treat time origin
  // data as reliable if they are within a reasonable threshold of the current time.

  const { performance } = WINDOW;
  if (!performance || !performance.now) {
    _browserPerformanceTimeOriginMode = 'none';
    return undefined;
  }

  const threshold = 3600 * 1000;
  const performanceNow = performance.now();
  const dateNow = Date.now();

  // if timeOrigin isn't available set delta to threshold so it isn't used
  const timeOriginDelta = performance.timeOrigin
    ? Math.abs(performance.timeOrigin + performanceNow - dateNow)
    : threshold;
  const timeOriginIsReliable = timeOriginDelta < threshold;

  // While performance.timing.navigationStart is deprecated in favor of performance.timeOrigin, performance.timeOrigin
  // is not as widely supported. Namely, performance.timeOrigin is undefined in Safari as of writing.
  // Also as of writing, performance.timing is not available in Web Workers in mainstream browsers, so it is not always
  // a valid fallback. In the absence of an initial time provided by the browser, fallback to the current time from the
  // Date API.
  // eslint-disable-next-line deprecation/deprecation
  const navigationStart = performance.timing && performance.timing.navigationStart;
  const hasNavigationStart = typeof navigationStart === 'number';
  // if navigationStart isn't available set delta to threshold so it isn't used
  const navigationStartDelta = hasNavigationStart ? Math.abs(navigationStart + performanceNow - dateNow) : threshold;
  const navigationStartIsReliable = navigationStartDelta < threshold;

  if (timeOriginIsReliable || navigationStartIsReliable) {
    // Use the more reliable time origin
    if (timeOriginDelta <= navigationStartDelta) {
      _browserPerformanceTimeOriginMode = 'timeOrigin';
      return performance.timeOrigin;
    } else {
      _browserPerformanceTimeOriginMode = 'navigationStart';
      return navigationStart;
    }
  }

  // Either both timeOrigin and navigationStart are skewed or neither is available, fallback to Date.
  _browserPerformanceTimeOriginMode = 'dateNow';
  return dateNow;
})();


//# sourceMappingURL=time.js.map


/***/ }),

/***/ "./node_modules/@sentry/utils/esm/url.js":
/*!***********************************************!*\
  !*** ./node_modules/@sentry/utils/esm/url.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getNumberOfUrlSegments": () => (/* binding */ getNumberOfUrlSegments),
/* harmony export */   "parseUrl": () => (/* binding */ parseUrl),
/* harmony export */   "stripUrlQueryAndFragment": () => (/* binding */ stripUrlQueryAndFragment)
/* harmony export */ });
/**
 * Parses string form of URL into an object
 * // borrowed from https://tools.ietf.org/html/rfc3986#appendix-B
 * // intentionally using regex and not <a/> href parsing trick because React Native and other
 * // environments where DOM might not be available
 * @returns parsed URL object
 */
function parseUrl(url)

 {
  if (!url) {
    return {};
  }

  const match = url.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);

  if (!match) {
    return {};
  }

  // coerce to undefined values to empty string so we don't get 'undefined'
  const query = match[6] || '';
  const fragment = match[8] || '';
  return {
    host: match[4],
    path: match[5],
    protocol: match[2],
    relative: match[5] + query + fragment, // everything minus origin
  };
}

/**
 * Strip the query string and fragment off of a given URL or path (if present)
 *
 * @param urlPath Full URL or path, including possible query string and/or fragment
 * @returns URL or path without query string or fragment
 */
function stripUrlQueryAndFragment(urlPath) {
  // eslint-disable-next-line no-useless-escape
  return urlPath.split(/[\?#]/, 1)[0];
}

/**
 * Returns number of URL segments of a passed string URL.
 */
function getNumberOfUrlSegments(url) {
  // split at '/' or at '\/' to split regex urls correctly
  return url.split(/\\?\//).filter(s => s.length > 0 && s !== ',').length;
}


//# sourceMappingURL=url.js.map


/***/ }),

/***/ "./node_modules/@sentry/utils/esm/worldwide.js":
/*!*****************************************************!*\
  !*** ./node_modules/@sentry/utils/esm/worldwide.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GLOBAL_OBJ": () => (/* binding */ GLOBAL_OBJ),
/* harmony export */   "getGlobalObject": () => (/* binding */ getGlobalObject),
/* harmony export */   "getGlobalSingleton": () => (/* binding */ getGlobalSingleton)
/* harmony export */ });
/** Internal global with common properties and Sentry extensions  */

// The code below for 'isGlobalObj' and 'GLOBAL_OBJ' was copied from core-js before modification
// https://github.com/zloirock/core-js/blob/1b944df55282cdc99c90db5f49eb0b6eda2cc0a3/packages/core-js/internals/global.js
// core-js has the following licence:
//
// Copyright (c) 2014-2022 Denis Pushkarev
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/** Returns 'obj' if it's the global object, otherwise returns undefined */
function isGlobalObj(obj) {
  return obj && obj.Math == Math ? obj : undefined;
}

/** Get's the global object for the current JavaScript runtime */
const GLOBAL_OBJ =
  (typeof globalThis == 'object' && isGlobalObj(globalThis)) ||
  // eslint-disable-next-line no-restricted-globals
  (typeof window == 'object' && isGlobalObj(window)) ||
  (typeof self == 'object' && isGlobalObj(self)) ||
  (typeof __webpack_require__.g == 'object' && isGlobalObj(__webpack_require__.g)) ||
  (function () {
    return this;
  })() ||
  {};

/**
 * @deprecated Use GLOBAL_OBJ instead or WINDOW from @sentry/browser. This will be removed in v8
 */
function getGlobalObject() {
  return GLOBAL_OBJ ;
}

/**
 * Returns a global singleton contained in the global `__SENTRY__` object.
 *
 * If the singleton doesn't already exist in `__SENTRY__`, it will be created using the given factory
 * function and added to the `__SENTRY__` object.
 *
 * @param name name of the global singleton on __SENTRY__
 * @param creator creator Factory function to create the singleton if it doesn't already exist on `__SENTRY__`
 * @param obj (Optional) The global object on which to look for `__SENTRY__`, if not `GLOBAL_OBJ`'s return value
 * @returns the singleton
 */
function getGlobalSingleton(name, creator, obj) {
  const gbl = (obj || GLOBAL_OBJ) ;
  const __SENTRY__ = (gbl.__SENTRY__ = gbl.__SENTRY__ || {});
  const singleton = __SENTRY__[name] || (__SENTRY__[name] = creator());
  return singleton;
}


//# sourceMappingURL=worldwide.js.map


/***/ }),

/***/ "./node_modules/ajv-draft-04/dist/index.js":
/*!*************************************************!*\
  !*** ./node_modules/ajv-draft-04/dist/index.js ***!
  \*************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
const core_1 = __webpack_require__(/*! ajv/dist/core */ "./node_modules/ajv/dist/core.js");
const draft4_1 = __webpack_require__(/*! ./vocabulary/draft4 */ "./node_modules/ajv-draft-04/dist/vocabulary/draft4.js");
const discriminator_1 = __webpack_require__(/*! ajv/dist/vocabularies/discriminator */ "./node_modules/ajv/dist/vocabularies/discriminator/index.js");
const draft4MetaSchema = __webpack_require__(/*! ./refs/json-schema-draft-04.json */ "./node_modules/ajv-draft-04/dist/refs/json-schema-draft-04.json");
const META_SUPPORT_DATA = ["/properties"];
const META_SCHEMA_ID = "http://json-schema.org/draft-04/schema";
class Ajv extends core_1.default {
    constructor(opts = {}) {
        super({
            ...opts,
            schemaId: "id",
        });
    }
    _addVocabularies() {
        super._addVocabularies();
        draft4_1.default.forEach((v) => this.addVocabulary(v));
        if (this.opts.discriminator)
            this.addKeyword(discriminator_1.default);
    }
    _addDefaultMetaSchema() {
        super._addDefaultMetaSchema();
        if (!this.opts.meta)
            return;
        const metaSchema = this.opts.$data
            ? this.$dataMetaSchema(draft4MetaSchema, META_SUPPORT_DATA)
            : draft4MetaSchema;
        this.addMetaSchema(metaSchema, META_SCHEMA_ID, false);
        this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
    }
    defaultMeta() {
        return (this.opts.defaultMeta =
            super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : undefined));
    }
}
module.exports = exports = Ajv;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = Ajv;
var core_2 = __webpack_require__(/*! ajv/dist/core */ "./node_modules/ajv/dist/core.js");
Object.defineProperty(exports, "KeywordCxt", ({ enumerable: true, get: function () { return core_2.KeywordCxt; } }));
var core_3 = __webpack_require__(/*! ajv/dist/core */ "./node_modules/ajv/dist/core.js");
Object.defineProperty(exports, "_", ({ enumerable: true, get: function () { return core_3._; } }));
Object.defineProperty(exports, "str", ({ enumerable: true, get: function () { return core_3.str; } }));
Object.defineProperty(exports, "stringify", ({ enumerable: true, get: function () { return core_3.stringify; } }));
Object.defineProperty(exports, "nil", ({ enumerable: true, get: function () { return core_3.nil; } }));
Object.defineProperty(exports, "Name", ({ enumerable: true, get: function () { return core_3.Name; } }));
Object.defineProperty(exports, "CodeGen", ({ enumerable: true, get: function () { return core_3.CodeGen; } }));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv-draft-04/dist/vocabulary/core.js":
/*!***********************************************************!*\
  !*** ./node_modules/ajv-draft-04/dist/vocabulary/core.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const ref_1 = __webpack_require__(/*! ajv/dist/vocabularies/core/ref */ "./node_modules/ajv/dist/vocabularies/core/ref.js");
const core = [
    "$schema",
    "id",
    "$defs",
    { keyword: "$comment" },
    "definitions",
    ref_1.default,
];
exports["default"] = core;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ "./node_modules/ajv-draft-04/dist/vocabulary/draft4.js":
/*!*************************************************************!*\
  !*** ./node_modules/ajv-draft-04/dist/vocabulary/draft4.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! ./core */ "./node_modules/ajv-draft-04/dist/vocabulary/core.js");
const validation_1 = __webpack_require__(/*! ./validation */ "./node_modules/ajv-draft-04/dist/vocabulary/validation/index.js");
const applicator_1 = __webpack_require__(/*! ajv/dist/vocabularies/applicator */ "./node_modules/ajv/dist/vocabularies/applicator/index.js");
const format_1 = __webpack_require__(/*! ajv/dist/vocabularies/format */ "./node_modules/ajv/dist/vocabularies/format/index.js");
const metadataVocabulary = ["title", "description", "default"];
const draft4Vocabularies = [
    core_1.default,
    validation_1.default,
    applicator_1.default(),
    format_1.default,
    metadataVocabulary,
];
exports["default"] = draft4Vocabularies;
//# sourceMappingURL=draft4.js.map

/***/ }),

/***/ "./node_modules/ajv-draft-04/dist/vocabulary/validation/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/ajv-draft-04/dist/vocabulary/validation/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const limitNumber_1 = __webpack_require__(/*! ./limitNumber */ "./node_modules/ajv-draft-04/dist/vocabulary/validation/limitNumber.js");
const limitNumberExclusive_1 = __webpack_require__(/*! ./limitNumberExclusive */ "./node_modules/ajv-draft-04/dist/vocabulary/validation/limitNumberExclusive.js");
const multipleOf_1 = __webpack_require__(/*! ajv/dist/vocabularies/validation/multipleOf */ "./node_modules/ajv/dist/vocabularies/validation/multipleOf.js");
const limitLength_1 = __webpack_require__(/*! ajv/dist/vocabularies/validation/limitLength */ "./node_modules/ajv/dist/vocabularies/validation/limitLength.js");
const pattern_1 = __webpack_require__(/*! ajv/dist/vocabularies/validation/pattern */ "./node_modules/ajv/dist/vocabularies/validation/pattern.js");
const limitProperties_1 = __webpack_require__(/*! ajv/dist/vocabularies/validation/limitProperties */ "./node_modules/ajv/dist/vocabularies/validation/limitProperties.js");
const required_1 = __webpack_require__(/*! ajv/dist/vocabularies/validation/required */ "./node_modules/ajv/dist/vocabularies/validation/required.js");
const limitItems_1 = __webpack_require__(/*! ajv/dist/vocabularies/validation/limitItems */ "./node_modules/ajv/dist/vocabularies/validation/limitItems.js");
const uniqueItems_1 = __webpack_require__(/*! ajv/dist/vocabularies/validation/uniqueItems */ "./node_modules/ajv/dist/vocabularies/validation/uniqueItems.js");
const const_1 = __webpack_require__(/*! ajv/dist/vocabularies/validation/const */ "./node_modules/ajv/dist/vocabularies/validation/const.js");
const enum_1 = __webpack_require__(/*! ajv/dist/vocabularies/validation/enum */ "./node_modules/ajv/dist/vocabularies/validation/enum.js");
const validation = [
    // number
    limitNumber_1.default,
    limitNumberExclusive_1.default,
    multipleOf_1.default,
    // string
    limitLength_1.default,
    pattern_1.default,
    // object
    limitProperties_1.default,
    required_1.default,
    // array
    limitItems_1.default,
    uniqueItems_1.default,
    // any
    { keyword: "type", schemaType: ["string", "array"] },
    { keyword: "nullable", schemaType: "boolean" },
    const_1.default,
    enum_1.default,
];
exports["default"] = validation;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv-draft-04/dist/vocabulary/validation/limitNumber.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/ajv-draft-04/dist/vocabulary/validation/limitNumber.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! ajv/dist/core */ "./node_modules/ajv/dist/core.js");
const codegen_1 = __webpack_require__(/*! ajv/dist/compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const ops = codegen_1.operators;
const KWDs = {
    maximum: {
        exclusive: "exclusiveMaximum",
        ops: [
            { okStr: "<=", ok: ops.LTE, fail: ops.GT },
            { okStr: "<", ok: ops.LT, fail: ops.GTE },
        ],
    },
    minimum: {
        exclusive: "exclusiveMinimum",
        ops: [
            { okStr: ">=", ok: ops.GTE, fail: ops.LT },
            { okStr: ">", ok: ops.GT, fail: ops.LTE },
        ],
    },
};
const error = {
    message: (cxt) => core_1.str `must be ${kwdOp(cxt).okStr} ${cxt.schemaCode}`,
    params: (cxt) => core_1._ `{comparison: ${kwdOp(cxt).okStr}, limit: ${cxt.schemaCode}}`,
};
const def = {
    keyword: Object.keys(KWDs),
    type: "number",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { data, schemaCode } = cxt;
        cxt.fail$data(core_1._ `${data} ${kwdOp(cxt).fail} ${schemaCode} || isNaN(${data})`);
    },
};
function kwdOp(cxt) {
    var _a;
    const keyword = cxt.keyword;
    const opsIdx = ((_a = cxt.parentSchema) === null || _a === void 0 ? void 0 : _a[KWDs[keyword].exclusive]) ? 1 : 0;
    return KWDs[keyword].ops[opsIdx];
}
exports["default"] = def;
//# sourceMappingURL=limitNumber.js.map

/***/ }),

/***/ "./node_modules/ajv-draft-04/dist/vocabulary/validation/limitNumberExclusive.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/ajv-draft-04/dist/vocabulary/validation/limitNumberExclusive.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const KWDs = {
    exclusiveMaximum: "maximum",
    exclusiveMinimum: "minimum",
};
const def = {
    keyword: Object.keys(KWDs),
    type: "number",
    schemaType: "boolean",
    code({ keyword, parentSchema }) {
        const limitKwd = KWDs[keyword];
        if (parentSchema[limitKwd] === undefined) {
            throw new Error(`${keyword} can only be used with ${limitKwd}`);
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=limitNumberExclusive.js.map

/***/ }),

/***/ "./node_modules/ajv-formats/dist/formats.js":
/*!**************************************************!*\
  !*** ./node_modules/ajv-formats/dist/formats.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.formatNames = exports.fastFormats = exports.fullFormats = void 0;
function fmtDef(validate, compare) {
    return { validate, compare };
}
exports.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: fmtDef(date, compareDate),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: fmtDef(time, compareTime),
    "date-time": fmtDef(date_time, compareDateTime),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri,
    "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
    // uri-template: https://tools.ietf.org/html/rfc6570
    "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
    // For the source: https://gist.github.com/dperini/729294
    // For test cases: https://mathiasbynens.be/demo/url-regex
    url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
    email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
    hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
    // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
    ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
    ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
    regex,
    // uuid: http://tools.ietf.org/html/rfc4122
    uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
    // JSON-pointer: https://tools.ietf.org/html/rfc6901
    // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
    "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
    "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
    // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
    "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
    // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
    // byte: https://github.com/miguelmota/is-base64
    byte,
    // signed 32 bit integer
    int32: { type: "number", validate: validateInt32 },
    // signed 64 bit integer
    int64: { type: "number", validate: validateInt64 },
    // C-type float
    float: { type: "number", validate: validateNumber },
    // C-type double
    double: { type: "number", validate: validateNumber },
    // hint to the UI to hide input strings
    password: true,
    // unchecked string payload
    binary: true,
};
exports.fastFormats = {
    ...exports.fullFormats,
    date: fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, compareDate),
    time: fmtDef(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, compareTime),
    "date-time": fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, compareDateTime),
    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    // email (sources from jsen validator):
    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i,
};
exports.formatNames = Object.keys(exports.fullFormats);
function isLeapYear(year) {
    // https://tools.ietf.org/html/rfc3339#appendix-C
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
const DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
const DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function date(str) {
    // full-date from http://tools.ietf.org/html/rfc3339#section-5.6
    const matches = DATE.exec(str);
    if (!matches)
        return false;
    const year = +matches[1];
    const month = +matches[2];
    const day = +matches[3];
    return (month >= 1 &&
        month <= 12 &&
        day >= 1 &&
        day <= (month === 2 && isLeapYear(year) ? 29 : DAYS[month]));
}
function compareDate(d1, d2) {
    if (!(d1 && d2))
        return undefined;
    if (d1 > d2)
        return 1;
    if (d1 < d2)
        return -1;
    return 0;
}
const TIME = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
function time(str, withTimeZone) {
    const matches = TIME.exec(str);
    if (!matches)
        return false;
    const hour = +matches[1];
    const minute = +matches[2];
    const second = +matches[3];
    const timeZone = matches[5];
    return (((hour <= 23 && minute <= 59 && second <= 59) ||
        (hour === 23 && minute === 59 && second === 60)) &&
        (!withTimeZone || timeZone !== ""));
}
function compareTime(t1, t2) {
    if (!(t1 && t2))
        return undefined;
    const a1 = TIME.exec(t1);
    const a2 = TIME.exec(t2);
    if (!(a1 && a2))
        return undefined;
    t1 = a1[1] + a1[2] + a1[3] + (a1[4] || "");
    t2 = a2[1] + a2[2] + a2[3] + (a2[4] || "");
    if (t1 > t2)
        return 1;
    if (t1 < t2)
        return -1;
    return 0;
}
const DATE_TIME_SEPARATOR = /t|\s/i;
function date_time(str) {
    // http://tools.ietf.org/html/rfc3339#section-5.6
    const dateTime = str.split(DATE_TIME_SEPARATOR);
    return dateTime.length === 2 && date(dateTime[0]) && time(dateTime[1], true);
}
function compareDateTime(dt1, dt2) {
    if (!(dt1 && dt2))
        return undefined;
    const [d1, t1] = dt1.split(DATE_TIME_SEPARATOR);
    const [d2, t2] = dt2.split(DATE_TIME_SEPARATOR);
    const res = compareDate(d1, d2);
    if (res === undefined)
        return undefined;
    return res || compareTime(t1, t2);
}
const NOT_URI_FRAGMENT = /\/|:/;
const URI = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
function uri(str) {
    // http://jmrware.com/articles/2009/uri_regexp/URI_regex.html + optional protocol + required "."
    return NOT_URI_FRAGMENT.test(str) && URI.test(str);
}
const BYTE = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
function byte(str) {
    BYTE.lastIndex = 0;
    return BYTE.test(str);
}
const MIN_INT32 = -(2 ** 31);
const MAX_INT32 = 2 ** 31 - 1;
function validateInt32(value) {
    return Number.isInteger(value) && value <= MAX_INT32 && value >= MIN_INT32;
}
function validateInt64(value) {
    // JSON and javascript max Int is 2**53, so any int that passes isInteger is valid for Int64
    return Number.isInteger(value);
}
function validateNumber() {
    return true;
}
const Z_ANCHOR = /[^\\]\\Z/;
function regex(str) {
    if (Z_ANCHOR.test(str))
        return false;
    try {
        new RegExp(str);
        return true;
    }
    catch (e) {
        return false;
    }
}
//# sourceMappingURL=formats.js.map

/***/ }),

/***/ "./node_modules/ajv-formats/dist/index.js":
/*!************************************************!*\
  !*** ./node_modules/ajv-formats/dist/index.js ***!
  \************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const formats_1 = __webpack_require__(/*! ./formats */ "./node_modules/ajv-formats/dist/formats.js");
const limit_1 = __webpack_require__(/*! ./limit */ "./node_modules/ajv-formats/dist/limit.js");
const codegen_1 = __webpack_require__(/*! ajv/dist/compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const fullName = new codegen_1.Name("fullFormats");
const fastName = new codegen_1.Name("fastFormats");
const formatsPlugin = (ajv, opts = { keywords: true }) => {
    if (Array.isArray(opts)) {
        addFormats(ajv, opts, formats_1.fullFormats, fullName);
        return ajv;
    }
    const [formats, exportName] = opts.mode === "fast" ? [formats_1.fastFormats, fastName] : [formats_1.fullFormats, fullName];
    const list = opts.formats || formats_1.formatNames;
    addFormats(ajv, list, formats, exportName);
    if (opts.keywords)
        limit_1.default(ajv);
    return ajv;
};
formatsPlugin.get = (name, mode = "full") => {
    const formats = mode === "fast" ? formats_1.fastFormats : formats_1.fullFormats;
    const f = formats[name];
    if (!f)
        throw new Error(`Unknown format "${name}"`);
    return f;
};
function addFormats(ajv, list, fs, exportName) {
    var _a;
    var _b;
    (_a = (_b = ajv.opts.code).formats) !== null && _a !== void 0 ? _a : (_b.formats = codegen_1._ `require("ajv-formats/dist/formats").${exportName}`);
    for (const f of list)
        ajv.addFormat(f, fs[f]);
}
module.exports = exports = formatsPlugin;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = formatsPlugin;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv-formats/dist/limit.js":
/*!************************************************!*\
  !*** ./node_modules/ajv-formats/dist/limit.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.formatLimitDefinition = void 0;
const ajv_1 = __webpack_require__(/*! ajv */ "./node_modules/ajv/dist/ajv.js");
const codegen_1 = __webpack_require__(/*! ajv/dist/compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const ops = codegen_1.operators;
const KWDs = {
    formatMaximum: { okStr: "<=", ok: ops.LTE, fail: ops.GT },
    formatMinimum: { okStr: ">=", ok: ops.GTE, fail: ops.LT },
    formatExclusiveMaximum: { okStr: "<", ok: ops.LT, fail: ops.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: ops.GT, fail: ops.LTE },
};
const error = {
    message: ({ keyword, schemaCode }) => codegen_1.str `should be ${KWDs[keyword].okStr} ${schemaCode}`,
    params: ({ keyword, schemaCode }) => codegen_1._ `{comparison: ${KWDs[keyword].okStr}, limit: ${schemaCode}}`,
};
exports.formatLimitDefinition = {
    keyword: Object.keys(KWDs),
    type: "string",
    schemaType: "string",
    $data: true,
    error,
    code(cxt) {
        const { gen, data, schemaCode, keyword, it } = cxt;
        const { opts, self } = it;
        if (!opts.validateFormats)
            return;
        const fCxt = new ajv_1.KeywordCxt(it, self.RULES.all.format.definition, "format");
        if (fCxt.$data)
            validate$DataFormat();
        else
            validateFormat();
        function validate$DataFormat() {
            const fmts = gen.scopeValue("formats", {
                ref: self.formats,
                code: opts.code.formats,
            });
            const fmt = gen.const("fmt", codegen_1._ `${fmts}[${fCxt.schemaCode}]`);
            cxt.fail$data(codegen_1.or(codegen_1._ `typeof ${fmt} != "object"`, codegen_1._ `${fmt} instanceof RegExp`, codegen_1._ `typeof ${fmt}.compare != "function"`, compareCode(fmt)));
        }
        function validateFormat() {
            const format = fCxt.schema;
            const fmtDef = self.formats[format];
            if (!fmtDef || fmtDef === true)
                return;
            if (typeof fmtDef != "object" ||
                fmtDef instanceof RegExp ||
                typeof fmtDef.compare != "function") {
                throw new Error(`"${keyword}": format "${format}" does not define "compare" function`);
            }
            const fmt = gen.scopeValue("formats", {
                key: format,
                ref: fmtDef,
                code: opts.code.formats ? codegen_1._ `${opts.code.formats}${codegen_1.getProperty(format)}` : undefined,
            });
            cxt.fail$data(compareCode(fmt));
        }
        function compareCode(fmt) {
            return codegen_1._ `${fmt}.compare(${data}, ${schemaCode}) ${KWDs[keyword].fail} 0`;
        }
    },
    dependencies: ["format"],
};
const formatLimitPlugin = (ajv) => {
    ajv.addKeyword(exports.formatLimitDefinition);
    return ajv;
};
exports["default"] = formatLimitPlugin;
//# sourceMappingURL=limit.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/2019.js":
/*!***************************************!*\
  !*** ./node_modules/ajv/dist/2019.js ***!
  \***************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MissingRefError = exports.ValidationError = exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
const core_1 = __webpack_require__(/*! ./core */ "./node_modules/ajv/dist/core.js");
const draft7_1 = __webpack_require__(/*! ./vocabularies/draft7 */ "./node_modules/ajv/dist/vocabularies/draft7.js");
const dynamic_1 = __webpack_require__(/*! ./vocabularies/dynamic */ "./node_modules/ajv/dist/vocabularies/dynamic/index.js");
const next_1 = __webpack_require__(/*! ./vocabularies/next */ "./node_modules/ajv/dist/vocabularies/next.js");
const unevaluated_1 = __webpack_require__(/*! ./vocabularies/unevaluated */ "./node_modules/ajv/dist/vocabularies/unevaluated/index.js");
const discriminator_1 = __webpack_require__(/*! ./vocabularies/discriminator */ "./node_modules/ajv/dist/vocabularies/discriminator/index.js");
const json_schema_2019_09_1 = __webpack_require__(/*! ./refs/json-schema-2019-09 */ "./node_modules/ajv/dist/refs/json-schema-2019-09/index.js");
const META_SCHEMA_ID = "https://json-schema.org/draft/2019-09/schema";
class Ajv2019 extends core_1.default {
    constructor(opts = {}) {
        super({
            ...opts,
            dynamicRef: true,
            next: true,
            unevaluated: true,
        });
    }
    _addVocabularies() {
        super._addVocabularies();
        this.addVocabulary(dynamic_1.default);
        draft7_1.default.forEach((v) => this.addVocabulary(v));
        this.addVocabulary(next_1.default);
        this.addVocabulary(unevaluated_1.default);
        if (this.opts.discriminator)
            this.addKeyword(discriminator_1.default);
    }
    _addDefaultMetaSchema() {
        super._addDefaultMetaSchema();
        const { $data, meta } = this.opts;
        if (!meta)
            return;
        json_schema_2019_09_1.default.call(this, $data);
        this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
    }
    defaultMeta() {
        return (this.opts.defaultMeta =
            super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : undefined));
    }
}
module.exports = exports = Ajv2019;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = Ajv2019;
var validate_1 = __webpack_require__(/*! ./compile/validate */ "./node_modules/ajv/dist/compile/validate/index.js");
Object.defineProperty(exports, "KeywordCxt", ({ enumerable: true, get: function () { return validate_1.KeywordCxt; } }));
var codegen_1 = __webpack_require__(/*! ./compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
Object.defineProperty(exports, "_", ({ enumerable: true, get: function () { return codegen_1._; } }));
Object.defineProperty(exports, "str", ({ enumerable: true, get: function () { return codegen_1.str; } }));
Object.defineProperty(exports, "stringify", ({ enumerable: true, get: function () { return codegen_1.stringify; } }));
Object.defineProperty(exports, "nil", ({ enumerable: true, get: function () { return codegen_1.nil; } }));
Object.defineProperty(exports, "Name", ({ enumerable: true, get: function () { return codegen_1.Name; } }));
Object.defineProperty(exports, "CodeGen", ({ enumerable: true, get: function () { return codegen_1.CodeGen; } }));
var validation_error_1 = __webpack_require__(/*! ./runtime/validation_error */ "./node_modules/ajv/dist/runtime/validation_error.js");
Object.defineProperty(exports, "ValidationError", ({ enumerable: true, get: function () { return validation_error_1.default; } }));
var ref_error_1 = __webpack_require__(/*! ./compile/ref_error */ "./node_modules/ajv/dist/compile/ref_error.js");
Object.defineProperty(exports, "MissingRefError", ({ enumerable: true, get: function () { return ref_error_1.default; } }));
//# sourceMappingURL=2019.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/2020.js":
/*!***************************************!*\
  !*** ./node_modules/ajv/dist/2020.js ***!
  \***************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MissingRefError = exports.ValidationError = exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
const core_1 = __webpack_require__(/*! ./core */ "./node_modules/ajv/dist/core.js");
const draft2020_1 = __webpack_require__(/*! ./vocabularies/draft2020 */ "./node_modules/ajv/dist/vocabularies/draft2020.js");
const discriminator_1 = __webpack_require__(/*! ./vocabularies/discriminator */ "./node_modules/ajv/dist/vocabularies/discriminator/index.js");
const json_schema_2020_12_1 = __webpack_require__(/*! ./refs/json-schema-2020-12 */ "./node_modules/ajv/dist/refs/json-schema-2020-12/index.js");
const META_SCHEMA_ID = "https://json-schema.org/draft/2020-12/schema";
class Ajv2020 extends core_1.default {
    constructor(opts = {}) {
        super({
            ...opts,
            dynamicRef: true,
            next: true,
            unevaluated: true,
        });
    }
    _addVocabularies() {
        super._addVocabularies();
        draft2020_1.default.forEach((v) => this.addVocabulary(v));
        if (this.opts.discriminator)
            this.addKeyword(discriminator_1.default);
    }
    _addDefaultMetaSchema() {
        super._addDefaultMetaSchema();
        const { $data, meta } = this.opts;
        if (!meta)
            return;
        json_schema_2020_12_1.default.call(this, $data);
        this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
    }
    defaultMeta() {
        return (this.opts.defaultMeta =
            super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : undefined));
    }
}
module.exports = exports = Ajv2020;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = Ajv2020;
var validate_1 = __webpack_require__(/*! ./compile/validate */ "./node_modules/ajv/dist/compile/validate/index.js");
Object.defineProperty(exports, "KeywordCxt", ({ enumerable: true, get: function () { return validate_1.KeywordCxt; } }));
var codegen_1 = __webpack_require__(/*! ./compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
Object.defineProperty(exports, "_", ({ enumerable: true, get: function () { return codegen_1._; } }));
Object.defineProperty(exports, "str", ({ enumerable: true, get: function () { return codegen_1.str; } }));
Object.defineProperty(exports, "stringify", ({ enumerable: true, get: function () { return codegen_1.stringify; } }));
Object.defineProperty(exports, "nil", ({ enumerable: true, get: function () { return codegen_1.nil; } }));
Object.defineProperty(exports, "Name", ({ enumerable: true, get: function () { return codegen_1.Name; } }));
Object.defineProperty(exports, "CodeGen", ({ enumerable: true, get: function () { return codegen_1.CodeGen; } }));
var validation_error_1 = __webpack_require__(/*! ./runtime/validation_error */ "./node_modules/ajv/dist/runtime/validation_error.js");
Object.defineProperty(exports, "ValidationError", ({ enumerable: true, get: function () { return validation_error_1.default; } }));
var ref_error_1 = __webpack_require__(/*! ./compile/ref_error */ "./node_modules/ajv/dist/compile/ref_error.js");
Object.defineProperty(exports, "MissingRefError", ({ enumerable: true, get: function () { return ref_error_1.default; } }));
//# sourceMappingURL=2020.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/ajv.js":
/*!**************************************!*\
  !*** ./node_modules/ajv/dist/ajv.js ***!
  \**************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MissingRefError = exports.ValidationError = exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
const core_1 = __webpack_require__(/*! ./core */ "./node_modules/ajv/dist/core.js");
const draft7_1 = __webpack_require__(/*! ./vocabularies/draft7 */ "./node_modules/ajv/dist/vocabularies/draft7.js");
const discriminator_1 = __webpack_require__(/*! ./vocabularies/discriminator */ "./node_modules/ajv/dist/vocabularies/discriminator/index.js");
const draft7MetaSchema = __webpack_require__(/*! ./refs/json-schema-draft-07.json */ "./node_modules/ajv/dist/refs/json-schema-draft-07.json");
const META_SUPPORT_DATA = ["/properties"];
const META_SCHEMA_ID = "http://json-schema.org/draft-07/schema";
class Ajv extends core_1.default {
    _addVocabularies() {
        super._addVocabularies();
        draft7_1.default.forEach((v) => this.addVocabulary(v));
        if (this.opts.discriminator)
            this.addKeyword(discriminator_1.default);
    }
    _addDefaultMetaSchema() {
        super._addDefaultMetaSchema();
        if (!this.opts.meta)
            return;
        const metaSchema = this.opts.$data
            ? this.$dataMetaSchema(draft7MetaSchema, META_SUPPORT_DATA)
            : draft7MetaSchema;
        this.addMetaSchema(metaSchema, META_SCHEMA_ID, false);
        this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
    }
    defaultMeta() {
        return (this.opts.defaultMeta =
            super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : undefined));
    }
}
module.exports = exports = Ajv;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = Ajv;
var validate_1 = __webpack_require__(/*! ./compile/validate */ "./node_modules/ajv/dist/compile/validate/index.js");
Object.defineProperty(exports, "KeywordCxt", ({ enumerable: true, get: function () { return validate_1.KeywordCxt; } }));
var codegen_1 = __webpack_require__(/*! ./compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
Object.defineProperty(exports, "_", ({ enumerable: true, get: function () { return codegen_1._; } }));
Object.defineProperty(exports, "str", ({ enumerable: true, get: function () { return codegen_1.str; } }));
Object.defineProperty(exports, "stringify", ({ enumerable: true, get: function () { return codegen_1.stringify; } }));
Object.defineProperty(exports, "nil", ({ enumerable: true, get: function () { return codegen_1.nil; } }));
Object.defineProperty(exports, "Name", ({ enumerable: true, get: function () { return codegen_1.Name; } }));
Object.defineProperty(exports, "CodeGen", ({ enumerable: true, get: function () { return codegen_1.CodeGen; } }));
var validation_error_1 = __webpack_require__(/*! ./runtime/validation_error */ "./node_modules/ajv/dist/runtime/validation_error.js");
Object.defineProperty(exports, "ValidationError", ({ enumerable: true, get: function () { return validation_error_1.default; } }));
var ref_error_1 = __webpack_require__(/*! ./compile/ref_error */ "./node_modules/ajv/dist/compile/ref_error.js");
Object.defineProperty(exports, "MissingRefError", ({ enumerable: true, get: function () { return ref_error_1.default; } }));
//# sourceMappingURL=ajv.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/codegen/code.js":
/*!*******************************************************!*\
  !*** ./node_modules/ajv/dist/compile/codegen/code.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.regexpCode = exports.getEsmExportName = exports.getProperty = exports.safeStringify = exports.stringify = exports.strConcat = exports.addCodeArg = exports.str = exports._ = exports.nil = exports._Code = exports.Name = exports.IDENTIFIER = exports._CodeOrName = void 0;
class _CodeOrName {
}
exports._CodeOrName = _CodeOrName;
exports.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
class Name extends _CodeOrName {
    constructor(s) {
        super();
        if (!exports.IDENTIFIER.test(s))
            throw new Error("CodeGen: name must be a valid identifier");
        this.str = s;
    }
    toString() {
        return this.str;
    }
    emptyStr() {
        return false;
    }
    get names() {
        return { [this.str]: 1 };
    }
}
exports.Name = Name;
class _Code extends _CodeOrName {
    constructor(code) {
        super();
        this._items = typeof code === "string" ? [code] : code;
    }
    toString() {
        return this.str;
    }
    emptyStr() {
        if (this._items.length > 1)
            return false;
        const item = this._items[0];
        return item === "" || item === '""';
    }
    get str() {
        var _a;
        return ((_a = this._str) !== null && _a !== void 0 ? _a : (this._str = this._items.reduce((s, c) => `${s}${c}`, "")));
    }
    get names() {
        var _a;
        return ((_a = this._names) !== null && _a !== void 0 ? _a : (this._names = this._items.reduce((names, c) => {
            if (c instanceof Name)
                names[c.str] = (names[c.str] || 0) + 1;
            return names;
        }, {})));
    }
}
exports._Code = _Code;
exports.nil = new _Code("");
function _(strs, ...args) {
    const code = [strs[0]];
    let i = 0;
    while (i < args.length) {
        addCodeArg(code, args[i]);
        code.push(strs[++i]);
    }
    return new _Code(code);
}
exports._ = _;
const plus = new _Code("+");
function str(strs, ...args) {
    const expr = [safeStringify(strs[0])];
    let i = 0;
    while (i < args.length) {
        expr.push(plus);
        addCodeArg(expr, args[i]);
        expr.push(plus, safeStringify(strs[++i]));
    }
    optimize(expr);
    return new _Code(expr);
}
exports.str = str;
function addCodeArg(code, arg) {
    if (arg instanceof _Code)
        code.push(...arg._items);
    else if (arg instanceof Name)
        code.push(arg);
    else
        code.push(interpolate(arg));
}
exports.addCodeArg = addCodeArg;
function optimize(expr) {
    let i = 1;
    while (i < expr.length - 1) {
        if (expr[i] === plus) {
            const res = mergeExprItems(expr[i - 1], expr[i + 1]);
            if (res !== undefined) {
                expr.splice(i - 1, 3, res);
                continue;
            }
            expr[i++] = "+";
        }
        i++;
    }
}
function mergeExprItems(a, b) {
    if (b === '""')
        return a;
    if (a === '""')
        return b;
    if (typeof a == "string") {
        if (b instanceof Name || a[a.length - 1] !== '"')
            return;
        if (typeof b != "string")
            return `${a.slice(0, -1)}${b}"`;
        if (b[0] === '"')
            return a.slice(0, -1) + b.slice(1);
        return;
    }
    if (typeof b == "string" && b[0] === '"' && !(a instanceof Name))
        return `"${a}${b.slice(1)}`;
    return;
}
function strConcat(c1, c2) {
    return c2.emptyStr() ? c1 : c1.emptyStr() ? c2 : str `${c1}${c2}`;
}
exports.strConcat = strConcat;
// TODO do not allow arrays here
function interpolate(x) {
    return typeof x == "number" || typeof x == "boolean" || x === null
        ? x
        : safeStringify(Array.isArray(x) ? x.join(",") : x);
}
function stringify(x) {
    return new _Code(safeStringify(x));
}
exports.stringify = stringify;
function safeStringify(x) {
    return JSON.stringify(x)
        .replace(/\u2028/g, "\\u2028")
        .replace(/\u2029/g, "\\u2029");
}
exports.safeStringify = safeStringify;
function getProperty(key) {
    return typeof key == "string" && exports.IDENTIFIER.test(key) ? new _Code(`.${key}`) : _ `[${key}]`;
}
exports.getProperty = getProperty;
//Does best effort to format the name properly
function getEsmExportName(key) {
    if (typeof key == "string" && exports.IDENTIFIER.test(key)) {
        return new _Code(`${key}`);
    }
    throw new Error(`CodeGen: invalid export name: ${key}, use explicit $id name mapping`);
}
exports.getEsmExportName = getEsmExportName;
function regexpCode(rx) {
    return new _Code(rx.toString());
}
exports.regexpCode = regexpCode;
//# sourceMappingURL=code.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/codegen/index.js":
/*!********************************************************!*\
  !*** ./node_modules/ajv/dist/compile/codegen/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.or = exports.and = exports.not = exports.CodeGen = exports.operators = exports.varKinds = exports.ValueScopeName = exports.ValueScope = exports.Scope = exports.Name = exports.regexpCode = exports.stringify = exports.getProperty = exports.nil = exports.strConcat = exports.str = exports._ = void 0;
const code_1 = __webpack_require__(/*! ./code */ "./node_modules/ajv/dist/compile/codegen/code.js");
const scope_1 = __webpack_require__(/*! ./scope */ "./node_modules/ajv/dist/compile/codegen/scope.js");
var code_2 = __webpack_require__(/*! ./code */ "./node_modules/ajv/dist/compile/codegen/code.js");
Object.defineProperty(exports, "_", ({ enumerable: true, get: function () { return code_2._; } }));
Object.defineProperty(exports, "str", ({ enumerable: true, get: function () { return code_2.str; } }));
Object.defineProperty(exports, "strConcat", ({ enumerable: true, get: function () { return code_2.strConcat; } }));
Object.defineProperty(exports, "nil", ({ enumerable: true, get: function () { return code_2.nil; } }));
Object.defineProperty(exports, "getProperty", ({ enumerable: true, get: function () { return code_2.getProperty; } }));
Object.defineProperty(exports, "stringify", ({ enumerable: true, get: function () { return code_2.stringify; } }));
Object.defineProperty(exports, "regexpCode", ({ enumerable: true, get: function () { return code_2.regexpCode; } }));
Object.defineProperty(exports, "Name", ({ enumerable: true, get: function () { return code_2.Name; } }));
var scope_2 = __webpack_require__(/*! ./scope */ "./node_modules/ajv/dist/compile/codegen/scope.js");
Object.defineProperty(exports, "Scope", ({ enumerable: true, get: function () { return scope_2.Scope; } }));
Object.defineProperty(exports, "ValueScope", ({ enumerable: true, get: function () { return scope_2.ValueScope; } }));
Object.defineProperty(exports, "ValueScopeName", ({ enumerable: true, get: function () { return scope_2.ValueScopeName; } }));
Object.defineProperty(exports, "varKinds", ({ enumerable: true, get: function () { return scope_2.varKinds; } }));
exports.operators = {
    GT: new code_1._Code(">"),
    GTE: new code_1._Code(">="),
    LT: new code_1._Code("<"),
    LTE: new code_1._Code("<="),
    EQ: new code_1._Code("==="),
    NEQ: new code_1._Code("!=="),
    NOT: new code_1._Code("!"),
    OR: new code_1._Code("||"),
    AND: new code_1._Code("&&"),
    ADD: new code_1._Code("+"),
};
class Node {
    optimizeNodes() {
        return this;
    }
    optimizeNames(_names, _constants) {
        return this;
    }
}
class Def extends Node {
    constructor(varKind, name, rhs) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.rhs = rhs;
    }
    render({ es5, _n }) {
        const varKind = es5 ? scope_1.varKinds.var : this.varKind;
        const rhs = this.rhs === undefined ? "" : ` = ${this.rhs}`;
        return `${varKind} ${this.name}${rhs};` + _n;
    }
    optimizeNames(names, constants) {
        if (!names[this.name.str])
            return;
        if (this.rhs)
            this.rhs = optimizeExpr(this.rhs, names, constants);
        return this;
    }
    get names() {
        return this.rhs instanceof code_1._CodeOrName ? this.rhs.names : {};
    }
}
class Assign extends Node {
    constructor(lhs, rhs, sideEffects) {
        super();
        this.lhs = lhs;
        this.rhs = rhs;
        this.sideEffects = sideEffects;
    }
    render({ _n }) {
        return `${this.lhs} = ${this.rhs};` + _n;
    }
    optimizeNames(names, constants) {
        if (this.lhs instanceof code_1.Name && !names[this.lhs.str] && !this.sideEffects)
            return;
        this.rhs = optimizeExpr(this.rhs, names, constants);
        return this;
    }
    get names() {
        const names = this.lhs instanceof code_1.Name ? {} : { ...this.lhs.names };
        return addExprNames(names, this.rhs);
    }
}
class AssignOp extends Assign {
    constructor(lhs, op, rhs, sideEffects) {
        super(lhs, rhs, sideEffects);
        this.op = op;
    }
    render({ _n }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + _n;
    }
}
class Label extends Node {
    constructor(label) {
        super();
        this.label = label;
        this.names = {};
    }
    render({ _n }) {
        return `${this.label}:` + _n;
    }
}
class Break extends Node {
    constructor(label) {
        super();
        this.label = label;
        this.names = {};
    }
    render({ _n }) {
        const label = this.label ? ` ${this.label}` : "";
        return `break${label};` + _n;
    }
}
class Throw extends Node {
    constructor(error) {
        super();
        this.error = error;
    }
    render({ _n }) {
        return `throw ${this.error};` + _n;
    }
    get names() {
        return this.error.names;
    }
}
class AnyCode extends Node {
    constructor(code) {
        super();
        this.code = code;
    }
    render({ _n }) {
        return `${this.code};` + _n;
    }
    optimizeNodes() {
        return `${this.code}` ? this : undefined;
    }
    optimizeNames(names, constants) {
        this.code = optimizeExpr(this.code, names, constants);
        return this;
    }
    get names() {
        return this.code instanceof code_1._CodeOrName ? this.code.names : {};
    }
}
class ParentNode extends Node {
    constructor(nodes = []) {
        super();
        this.nodes = nodes;
    }
    render(opts) {
        return this.nodes.reduce((code, n) => code + n.render(opts), "");
    }
    optimizeNodes() {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
            const n = nodes[i].optimizeNodes();
            if (Array.isArray(n))
                nodes.splice(i, 1, ...n);
            else if (n)
                nodes[i] = n;
            else
                nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : undefined;
    }
    optimizeNames(names, constants) {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
            // iterating backwards improves 1-pass optimization
            const n = nodes[i];
            if (n.optimizeNames(names, constants))
                continue;
            subtractNames(names, n.names);
            nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : undefined;
    }
    get names() {
        return this.nodes.reduce((names, n) => addNames(names, n.names), {});
    }
}
class BlockNode extends ParentNode {
    render(opts) {
        return "{" + opts._n + super.render(opts) + "}" + opts._n;
    }
}
class Root extends ParentNode {
}
class Else extends BlockNode {
}
Else.kind = "else";
class If extends BlockNode {
    constructor(condition, nodes) {
        super(nodes);
        this.condition = condition;
    }
    render(opts) {
        let code = `if(${this.condition})` + super.render(opts);
        if (this.else)
            code += "else " + this.else.render(opts);
        return code;
    }
    optimizeNodes() {
        super.optimizeNodes();
        const cond = this.condition;
        if (cond === true)
            return this.nodes; // else is ignored here
        let e = this.else;
        if (e) {
            const ns = e.optimizeNodes();
            e = this.else = Array.isArray(ns) ? new Else(ns) : ns;
        }
        if (e) {
            if (cond === false)
                return e instanceof If ? e : e.nodes;
            if (this.nodes.length)
                return this;
            return new If(not(cond), e instanceof If ? [e] : e.nodes);
        }
        if (cond === false || !this.nodes.length)
            return undefined;
        return this;
    }
    optimizeNames(names, constants) {
        var _a;
        this.else = (_a = this.else) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
        if (!(super.optimizeNames(names, constants) || this.else))
            return;
        this.condition = optimizeExpr(this.condition, names, constants);
        return this;
    }
    get names() {
        const names = super.names;
        addExprNames(names, this.condition);
        if (this.else)
            addNames(names, this.else.names);
        return names;
    }
}
If.kind = "if";
class For extends BlockNode {
}
For.kind = "for";
class ForLoop extends For {
    constructor(iteration) {
        super();
        this.iteration = iteration;
    }
    render(opts) {
        return `for(${this.iteration})` + super.render(opts);
    }
    optimizeNames(names, constants) {
        if (!super.optimizeNames(names, constants))
            return;
        this.iteration = optimizeExpr(this.iteration, names, constants);
        return this;
    }
    get names() {
        return addNames(super.names, this.iteration.names);
    }
}
class ForRange extends For {
    constructor(varKind, name, from, to) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.from = from;
        this.to = to;
    }
    render(opts) {
        const varKind = opts.es5 ? scope_1.varKinds.var : this.varKind;
        const { name, from, to } = this;
        return `for(${varKind} ${name}=${from}; ${name}<${to}; ${name}++)` + super.render(opts);
    }
    get names() {
        const names = addExprNames(super.names, this.from);
        return addExprNames(names, this.to);
    }
}
class ForIter extends For {
    constructor(loop, varKind, name, iterable) {
        super();
        this.loop = loop;
        this.varKind = varKind;
        this.name = name;
        this.iterable = iterable;
    }
    render(opts) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(opts);
    }
    optimizeNames(names, constants) {
        if (!super.optimizeNames(names, constants))
            return;
        this.iterable = optimizeExpr(this.iterable, names, constants);
        return this;
    }
    get names() {
        return addNames(super.names, this.iterable.names);
    }
}
class Func extends BlockNode {
    constructor(name, args, async) {
        super();
        this.name = name;
        this.args = args;
        this.async = async;
    }
    render(opts) {
        const _async = this.async ? "async " : "";
        return `${_async}function ${this.name}(${this.args})` + super.render(opts);
    }
}
Func.kind = "func";
class Return extends ParentNode {
    render(opts) {
        return "return " + super.render(opts);
    }
}
Return.kind = "return";
class Try extends BlockNode {
    render(opts) {
        let code = "try" + super.render(opts);
        if (this.catch)
            code += this.catch.render(opts);
        if (this.finally)
            code += this.finally.render(opts);
        return code;
    }
    optimizeNodes() {
        var _a, _b;
        super.optimizeNodes();
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNodes();
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNodes();
        return this;
    }
    optimizeNames(names, constants) {
        var _a, _b;
        super.optimizeNames(names, constants);
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNames(names, constants);
        return this;
    }
    get names() {
        const names = super.names;
        if (this.catch)
            addNames(names, this.catch.names);
        if (this.finally)
            addNames(names, this.finally.names);
        return names;
    }
}
class Catch extends BlockNode {
    constructor(error) {
        super();
        this.error = error;
    }
    render(opts) {
        return `catch(${this.error})` + super.render(opts);
    }
}
Catch.kind = "catch";
class Finally extends BlockNode {
    render(opts) {
        return "finally" + super.render(opts);
    }
}
Finally.kind = "finally";
class CodeGen {
    constructor(extScope, opts = {}) {
        this._values = {};
        this._blockStarts = [];
        this._constants = {};
        this.opts = { ...opts, _n: opts.lines ? "\n" : "" };
        this._extScope = extScope;
        this._scope = new scope_1.Scope({ parent: extScope });
        this._nodes = [new Root()];
    }
    toString() {
        return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(prefix) {
        return this._scope.name(prefix);
    }
    // reserves unique name in the external scope
    scopeName(prefix) {
        return this._extScope.name(prefix);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(prefixOrName, value) {
        const name = this._extScope.value(prefixOrName, value);
        const vs = this._values[name.prefix] || (this._values[name.prefix] = new Set());
        vs.add(name);
        return name;
    }
    getScopeValue(prefix, keyOrRef) {
        return this._extScope.getValue(prefix, keyOrRef);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(scopeName) {
        return this._extScope.scopeRefs(scopeName, this._values);
    }
    scopeCode() {
        return this._extScope.scopeCode(this._values);
    }
    _def(varKind, nameOrPrefix, rhs, constant) {
        const name = this._scope.toName(nameOrPrefix);
        if (rhs !== undefined && constant)
            this._constants[name.str] = rhs;
        this._leafNode(new Def(varKind, name, rhs));
        return name;
    }
    // `const` declaration (`var` in es5 mode)
    const(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.const, nameOrPrefix, rhs, _constant);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.let, nameOrPrefix, rhs, _constant);
    }
    // `var` declaration with optional assignment
    var(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.var, nameOrPrefix, rhs, _constant);
    }
    // assignment code
    assign(lhs, rhs, sideEffects) {
        return this._leafNode(new Assign(lhs, rhs, sideEffects));
    }
    // `+=` code
    add(lhs, rhs) {
        return this._leafNode(new AssignOp(lhs, exports.operators.ADD, rhs));
    }
    // appends passed SafeExpr to code or executes Block
    code(c) {
        if (typeof c == "function")
            c();
        else if (c !== code_1.nil)
            this._leafNode(new AnyCode(c));
        return this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...keyValues) {
        const code = ["{"];
        for (const [key, value] of keyValues) {
            if (code.length > 1)
                code.push(",");
            code.push(key);
            if (key !== value || this.opts.es5) {
                code.push(":");
                (0, code_1.addCodeArg)(code, value);
            }
        }
        code.push("}");
        return new code_1._Code(code);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(condition, thenBody, elseBody) {
        this._blockNode(new If(condition));
        if (thenBody && elseBody) {
            this.code(thenBody).else().code(elseBody).endIf();
        }
        else if (thenBody) {
            this.code(thenBody).endIf();
        }
        else if (elseBody) {
            throw new Error('CodeGen: "else" body without "then" body');
        }
        return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(condition) {
        return this._elseNode(new If(condition));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
        return this._elseNode(new Else());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
        return this._endBlockNode(If, Else);
    }
    _for(node, forBody) {
        this._blockNode(node);
        if (forBody)
            this.code(forBody).endFor();
        return this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(iteration, forBody) {
        return this._for(new ForLoop(iteration), forBody);
    }
    // `for` statement for a range of values
    forRange(nameOrPrefix, from, to, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.let) {
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForRange(varKind, name, from, to), () => forBody(name));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(nameOrPrefix, iterable, forBody, varKind = scope_1.varKinds.const) {
        const name = this._scope.toName(nameOrPrefix);
        if (this.opts.es5) {
            const arr = iterable instanceof code_1.Name ? iterable : this.var("_arr", iterable);
            return this.forRange("_i", 0, (0, code_1._) `${arr}.length`, (i) => {
                this.var(name, (0, code_1._) `${arr}[${i}]`);
                forBody(name);
            });
        }
        return this._for(new ForIter("of", varKind, name, iterable), () => forBody(name));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(nameOrPrefix, obj, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.const) {
        if (this.opts.ownProperties) {
            return this.forOf(nameOrPrefix, (0, code_1._) `Object.keys(${obj})`, forBody);
        }
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForIter("in", varKind, name, obj), () => forBody(name));
    }
    // end `for` loop
    endFor() {
        return this._endBlockNode(For);
    }
    // `label` statement
    label(label) {
        return this._leafNode(new Label(label));
    }
    // `break` statement
    break(label) {
        return this._leafNode(new Break(label));
    }
    // `return` statement
    return(value) {
        const node = new Return();
        this._blockNode(node);
        this.code(value);
        if (node.nodes.length !== 1)
            throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode(Return);
    }
    // `try` statement
    try(tryBody, catchCode, finallyCode) {
        if (!catchCode && !finallyCode)
            throw new Error('CodeGen: "try" without "catch" and "finally"');
        const node = new Try();
        this._blockNode(node);
        this.code(tryBody);
        if (catchCode) {
            const error = this.name("e");
            this._currNode = node.catch = new Catch(error);
            catchCode(error);
        }
        if (finallyCode) {
            this._currNode = node.finally = new Finally();
            this.code(finallyCode);
        }
        return this._endBlockNode(Catch, Finally);
    }
    // `throw` statement
    throw(error) {
        return this._leafNode(new Throw(error));
    }
    // start self-balancing block
    block(body, nodeCount) {
        this._blockStarts.push(this._nodes.length);
        if (body)
            this.code(body).endBlock(nodeCount);
        return this;
    }
    // end the current self-balancing block
    endBlock(nodeCount) {
        const len = this._blockStarts.pop();
        if (len === undefined)
            throw new Error("CodeGen: not in self-balancing block");
        const toClose = this._nodes.length - len;
        if (toClose < 0 || (nodeCount !== undefined && toClose !== nodeCount)) {
            throw new Error(`CodeGen: wrong number of nodes: ${toClose} vs ${nodeCount} expected`);
        }
        this._nodes.length = len;
        return this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(name, args = code_1.nil, async, funcBody) {
        this._blockNode(new Func(name, args, async));
        if (funcBody)
            this.code(funcBody).endFunc();
        return this;
    }
    // end function definition
    endFunc() {
        return this._endBlockNode(Func);
    }
    optimize(n = 1) {
        while (n-- > 0) {
            this._root.optimizeNodes();
            this._root.optimizeNames(this._root.names, this._constants);
        }
    }
    _leafNode(node) {
        this._currNode.nodes.push(node);
        return this;
    }
    _blockNode(node) {
        this._currNode.nodes.push(node);
        this._nodes.push(node);
    }
    _endBlockNode(N1, N2) {
        const n = this._currNode;
        if (n instanceof N1 || (N2 && n instanceof N2)) {
            this._nodes.pop();
            return this;
        }
        throw new Error(`CodeGen: not in block "${N2 ? `${N1.kind}/${N2.kind}` : N1.kind}"`);
    }
    _elseNode(node) {
        const n = this._currNode;
        if (!(n instanceof If)) {
            throw new Error('CodeGen: "else" without "if"');
        }
        this._currNode = n.else = node;
        return this;
    }
    get _root() {
        return this._nodes[0];
    }
    get _currNode() {
        const ns = this._nodes;
        return ns[ns.length - 1];
    }
    set _currNode(node) {
        const ns = this._nodes;
        ns[ns.length - 1] = node;
    }
}
exports.CodeGen = CodeGen;
function addNames(names, from) {
    for (const n in from)
        names[n] = (names[n] || 0) + (from[n] || 0);
    return names;
}
function addExprNames(names, from) {
    return from instanceof code_1._CodeOrName ? addNames(names, from.names) : names;
}
function optimizeExpr(expr, names, constants) {
    if (expr instanceof code_1.Name)
        return replaceName(expr);
    if (!canOptimize(expr))
        return expr;
    return new code_1._Code(expr._items.reduce((items, c) => {
        if (c instanceof code_1.Name)
            c = replaceName(c);
        if (c instanceof code_1._Code)
            items.push(...c._items);
        else
            items.push(c);
        return items;
    }, []));
    function replaceName(n) {
        const c = constants[n.str];
        if (c === undefined || names[n.str] !== 1)
            return n;
        delete names[n.str];
        return c;
    }
    function canOptimize(e) {
        return (e instanceof code_1._Code &&
            e._items.some((c) => c instanceof code_1.Name && names[c.str] === 1 && constants[c.str] !== undefined));
    }
}
function subtractNames(names, from) {
    for (const n in from)
        names[n] = (names[n] || 0) - (from[n] || 0);
}
function not(x) {
    return typeof x == "boolean" || typeof x == "number" || x === null ? !x : (0, code_1._) `!${par(x)}`;
}
exports.not = not;
const andCode = mappend(exports.operators.AND);
// boolean AND (&&) expression with the passed arguments
function and(...args) {
    return args.reduce(andCode);
}
exports.and = and;
const orCode = mappend(exports.operators.OR);
// boolean OR (||) expression with the passed arguments
function or(...args) {
    return args.reduce(orCode);
}
exports.or = or;
function mappend(op) {
    return (x, y) => (x === code_1.nil ? y : y === code_1.nil ? x : (0, code_1._) `${par(x)} ${op} ${par(y)}`);
}
function par(x) {
    return x instanceof code_1.Name ? x : (0, code_1._) `(${x})`;
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/codegen/scope.js":
/*!********************************************************!*\
  !*** ./node_modules/ajv/dist/compile/codegen/scope.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValueScope = exports.ValueScopeName = exports.Scope = exports.varKinds = exports.UsedValueState = void 0;
const code_1 = __webpack_require__(/*! ./code */ "./node_modules/ajv/dist/compile/codegen/code.js");
class ValueError extends Error {
    constructor(name) {
        super(`CodeGen: "code" for ${name} not defined`);
        this.value = name.value;
    }
}
var UsedValueState;
(function (UsedValueState) {
    UsedValueState[UsedValueState["Started"] = 0] = "Started";
    UsedValueState[UsedValueState["Completed"] = 1] = "Completed";
})(UsedValueState = exports.UsedValueState || (exports.UsedValueState = {}));
exports.varKinds = {
    const: new code_1.Name("const"),
    let: new code_1.Name("let"),
    var: new code_1.Name("var"),
};
class Scope {
    constructor({ prefixes, parent } = {}) {
        this._names = {};
        this._prefixes = prefixes;
        this._parent = parent;
    }
    toName(nameOrPrefix) {
        return nameOrPrefix instanceof code_1.Name ? nameOrPrefix : this.name(nameOrPrefix);
    }
    name(prefix) {
        return new code_1.Name(this._newName(prefix));
    }
    _newName(prefix) {
        const ng = this._names[prefix] || this._nameGroup(prefix);
        return `${prefix}${ng.index++}`;
    }
    _nameGroup(prefix) {
        var _a, _b;
        if (((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a._prefixes) === null || _b === void 0 ? void 0 : _b.has(prefix)) || (this._prefixes && !this._prefixes.has(prefix))) {
            throw new Error(`CodeGen: prefix "${prefix}" is not allowed in this scope`);
        }
        return (this._names[prefix] = { prefix, index: 0 });
    }
}
exports.Scope = Scope;
class ValueScopeName extends code_1.Name {
    constructor(prefix, nameStr) {
        super(nameStr);
        this.prefix = prefix;
    }
    setValue(value, { property, itemIndex }) {
        this.value = value;
        this.scopePath = (0, code_1._) `.${new code_1.Name(property)}[${itemIndex}]`;
    }
}
exports.ValueScopeName = ValueScopeName;
const line = (0, code_1._) `\n`;
class ValueScope extends Scope {
    constructor(opts) {
        super(opts);
        this._values = {};
        this._scope = opts.scope;
        this.opts = { ...opts, _n: opts.lines ? line : code_1.nil };
    }
    get() {
        return this._scope;
    }
    name(prefix) {
        return new ValueScopeName(prefix, this._newName(prefix));
    }
    value(nameOrPrefix, value) {
        var _a;
        if (value.ref === undefined)
            throw new Error("CodeGen: ref must be passed in value");
        const name = this.toName(nameOrPrefix);
        const { prefix } = name;
        const valueKey = (_a = value.key) !== null && _a !== void 0 ? _a : value.ref;
        let vs = this._values[prefix];
        if (vs) {
            const _name = vs.get(valueKey);
            if (_name)
                return _name;
        }
        else {
            vs = this._values[prefix] = new Map();
        }
        vs.set(valueKey, name);
        const s = this._scope[prefix] || (this._scope[prefix] = []);
        const itemIndex = s.length;
        s[itemIndex] = value.ref;
        name.setValue(value, { property: prefix, itemIndex });
        return name;
    }
    getValue(prefix, keyOrRef) {
        const vs = this._values[prefix];
        if (!vs)
            return;
        return vs.get(keyOrRef);
    }
    scopeRefs(scopeName, values = this._values) {
        return this._reduceValues(values, (name) => {
            if (name.scopePath === undefined)
                throw new Error(`CodeGen: name "${name}" has no value`);
            return (0, code_1._) `${scopeName}${name.scopePath}`;
        });
    }
    scopeCode(values = this._values, usedValues, getCode) {
        return this._reduceValues(values, (name) => {
            if (name.value === undefined)
                throw new Error(`CodeGen: name "${name}" has no value`);
            return name.value.code;
        }, usedValues, getCode);
    }
    _reduceValues(values, valueCode, usedValues = {}, getCode) {
        let code = code_1.nil;
        for (const prefix in values) {
            const vs = values[prefix];
            if (!vs)
                continue;
            const nameSet = (usedValues[prefix] = usedValues[prefix] || new Map());
            vs.forEach((name) => {
                if (nameSet.has(name))
                    return;
                nameSet.set(name, UsedValueState.Started);
                let c = valueCode(name);
                if (c) {
                    const def = this.opts.es5 ? exports.varKinds.var : exports.varKinds.const;
                    code = (0, code_1._) `${code}${def} ${name} = ${c};${this.opts._n}`;
                }
                else if ((c = getCode === null || getCode === void 0 ? void 0 : getCode(name))) {
                    code = (0, code_1._) `${code}${c}${this.opts._n}`;
                }
                else {
                    throw new ValueError(name);
                }
                nameSet.set(name, UsedValueState.Completed);
            });
        }
        return code;
    }
}
exports.ValueScope = ValueScope;
//# sourceMappingURL=scope.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/errors.js":
/*!*************************************************!*\
  !*** ./node_modules/ajv/dist/compile/errors.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.extendErrors = exports.resetErrorsCount = exports.reportExtraError = exports.reportError = exports.keyword$DataError = exports.keywordError = void 0;
const codegen_1 = __webpack_require__(/*! ./codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ./util */ "./node_modules/ajv/dist/compile/util.js");
const names_1 = __webpack_require__(/*! ./names */ "./node_modules/ajv/dist/compile/names.js");
exports.keywordError = {
    message: ({ keyword }) => (0, codegen_1.str) `must pass "${keyword}" keyword validation`,
};
exports.keyword$DataError = {
    message: ({ keyword, schemaType }) => schemaType
        ? (0, codegen_1.str) `"${keyword}" keyword must be ${schemaType} ($data)`
        : (0, codegen_1.str) `"${keyword}" keyword is invalid ($data)`,
};
function reportError(cxt, error = exports.keywordError, errorPaths, overrideAllErrors) {
    const { it } = cxt;
    const { gen, compositeRule, allErrors } = it;
    const errObj = errorObjectCode(cxt, error, errorPaths);
    if (overrideAllErrors !== null && overrideAllErrors !== void 0 ? overrideAllErrors : (compositeRule || allErrors)) {
        addError(gen, errObj);
    }
    else {
        returnErrors(it, (0, codegen_1._) `[${errObj}]`);
    }
}
exports.reportError = reportError;
function reportExtraError(cxt, error = exports.keywordError, errorPaths) {
    const { it } = cxt;
    const { gen, compositeRule, allErrors } = it;
    const errObj = errorObjectCode(cxt, error, errorPaths);
    addError(gen, errObj);
    if (!(compositeRule || allErrors)) {
        returnErrors(it, names_1.default.vErrors);
    }
}
exports.reportExtraError = reportExtraError;
function resetErrorsCount(gen, errsCount) {
    gen.assign(names_1.default.errors, errsCount);
    gen.if((0, codegen_1._) `${names_1.default.vErrors} !== null`, () => gen.if(errsCount, () => gen.assign((0, codegen_1._) `${names_1.default.vErrors}.length`, errsCount), () => gen.assign(names_1.default.vErrors, null)));
}
exports.resetErrorsCount = resetErrorsCount;
function extendErrors({ gen, keyword, schemaValue, data, errsCount, it, }) {
    /* istanbul ignore if */
    if (errsCount === undefined)
        throw new Error("ajv implementation error");
    const err = gen.name("err");
    gen.forRange("i", errsCount, names_1.default.errors, (i) => {
        gen.const(err, (0, codegen_1._) `${names_1.default.vErrors}[${i}]`);
        gen.if((0, codegen_1._) `${err}.instancePath === undefined`, () => gen.assign((0, codegen_1._) `${err}.instancePath`, (0, codegen_1.strConcat)(names_1.default.instancePath, it.errorPath)));
        gen.assign((0, codegen_1._) `${err}.schemaPath`, (0, codegen_1.str) `${it.errSchemaPath}/${keyword}`);
        if (it.opts.verbose) {
            gen.assign((0, codegen_1._) `${err}.schema`, schemaValue);
            gen.assign((0, codegen_1._) `${err}.data`, data);
        }
    });
}
exports.extendErrors = extendErrors;
function addError(gen, errObj) {
    const err = gen.const("err", errObj);
    gen.if((0, codegen_1._) `${names_1.default.vErrors} === null`, () => gen.assign(names_1.default.vErrors, (0, codegen_1._) `[${err}]`), (0, codegen_1._) `${names_1.default.vErrors}.push(${err})`);
    gen.code((0, codegen_1._) `${names_1.default.errors}++`);
}
function returnErrors(it, errs) {
    const { gen, validateName, schemaEnv } = it;
    if (schemaEnv.$async) {
        gen.throw((0, codegen_1._) `new ${it.ValidationError}(${errs})`);
    }
    else {
        gen.assign((0, codegen_1._) `${validateName}.errors`, errs);
        gen.return(false);
    }
}
const E = {
    keyword: new codegen_1.Name("keyword"),
    schemaPath: new codegen_1.Name("schemaPath"),
    params: new codegen_1.Name("params"),
    propertyName: new codegen_1.Name("propertyName"),
    message: new codegen_1.Name("message"),
    schema: new codegen_1.Name("schema"),
    parentSchema: new codegen_1.Name("parentSchema"),
};
function errorObjectCode(cxt, error, errorPaths) {
    const { createErrors } = cxt.it;
    if (createErrors === false)
        return (0, codegen_1._) `{}`;
    return errorObject(cxt, error, errorPaths);
}
function errorObject(cxt, error, errorPaths = {}) {
    const { gen, it } = cxt;
    const keyValues = [
        errorInstancePath(it, errorPaths),
        errorSchemaPath(cxt, errorPaths),
    ];
    extraErrorProps(cxt, error, keyValues);
    return gen.object(...keyValues);
}
function errorInstancePath({ errorPath }, { instancePath }) {
    const instPath = instancePath
        ? (0, codegen_1.str) `${errorPath}${(0, util_1.getErrorPath)(instancePath, util_1.Type.Str)}`
        : errorPath;
    return [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, instPath)];
}
function errorSchemaPath({ keyword, it: { errSchemaPath } }, { schemaPath, parentSchema }) {
    let schPath = parentSchema ? errSchemaPath : (0, codegen_1.str) `${errSchemaPath}/${keyword}`;
    if (schemaPath) {
        schPath = (0, codegen_1.str) `${schPath}${(0, util_1.getErrorPath)(schemaPath, util_1.Type.Str)}`;
    }
    return [E.schemaPath, schPath];
}
function extraErrorProps(cxt, { params, message }, keyValues) {
    const { keyword, data, schemaValue, it } = cxt;
    const { opts, propertyName, topSchemaRef, schemaPath } = it;
    keyValues.push([E.keyword, keyword], [E.params, typeof params == "function" ? params(cxt) : params || (0, codegen_1._) `{}`]);
    if (opts.messages) {
        keyValues.push([E.message, typeof message == "function" ? message(cxt) : message]);
    }
    if (opts.verbose) {
        keyValues.push([E.schema, schemaValue], [E.parentSchema, (0, codegen_1._) `${topSchemaRef}${schemaPath}`], [names_1.default.data, data]);
    }
    if (propertyName)
        keyValues.push([E.propertyName, propertyName]);
}
//# sourceMappingURL=errors.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/index.js":
/*!************************************************!*\
  !*** ./node_modules/ajv/dist/compile/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveSchema = exports.getCompilingSchema = exports.resolveRef = exports.compileSchema = exports.SchemaEnv = void 0;
const codegen_1 = __webpack_require__(/*! ./codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const validation_error_1 = __webpack_require__(/*! ../runtime/validation_error */ "./node_modules/ajv/dist/runtime/validation_error.js");
const names_1 = __webpack_require__(/*! ./names */ "./node_modules/ajv/dist/compile/names.js");
const resolve_1 = __webpack_require__(/*! ./resolve */ "./node_modules/ajv/dist/compile/resolve.js");
const util_1 = __webpack_require__(/*! ./util */ "./node_modules/ajv/dist/compile/util.js");
const validate_1 = __webpack_require__(/*! ./validate */ "./node_modules/ajv/dist/compile/validate/index.js");
class SchemaEnv {
    constructor(env) {
        var _a;
        this.refs = {};
        this.dynamicAnchors = {};
        let schema;
        if (typeof env.schema == "object")
            schema = env.schema;
        this.schema = env.schema;
        this.schemaId = env.schemaId;
        this.root = env.root || this;
        this.baseId = (_a = env.baseId) !== null && _a !== void 0 ? _a : (0, resolve_1.normalizeId)(schema === null || schema === void 0 ? void 0 : schema[env.schemaId || "$id"]);
        this.schemaPath = env.schemaPath;
        this.localRefs = env.localRefs;
        this.meta = env.meta;
        this.$async = schema === null || schema === void 0 ? void 0 : schema.$async;
        this.refs = {};
    }
}
exports.SchemaEnv = SchemaEnv;
// let codeSize = 0
// let nodeCount = 0
// Compiles schema in SchemaEnv
function compileSchema(sch) {
    // TODO refactor - remove compilations
    const _sch = getCompilingSchema.call(this, sch);
    if (_sch)
        return _sch;
    const rootId = (0, resolve_1.getFullPath)(this.opts.uriResolver, sch.root.baseId); // TODO if getFullPath removed 1 tests fails
    const { es5, lines } = this.opts.code;
    const { ownProperties } = this.opts;
    const gen = new codegen_1.CodeGen(this.scope, { es5, lines, ownProperties });
    let _ValidationError;
    if (sch.$async) {
        _ValidationError = gen.scopeValue("Error", {
            ref: validation_error_1.default,
            code: (0, codegen_1._) `require("ajv/dist/runtime/validation_error").default`,
        });
    }
    const validateName = gen.scopeName("validate");
    sch.validateName = validateName;
    const schemaCxt = {
        gen,
        allErrors: this.opts.allErrors,
        data: names_1.default.data,
        parentData: names_1.default.parentData,
        parentDataProperty: names_1.default.parentDataProperty,
        dataNames: [names_1.default.data],
        dataPathArr: [codegen_1.nil],
        dataLevel: 0,
        dataTypes: [],
        definedProperties: new Set(),
        topSchemaRef: gen.scopeValue("schema", this.opts.code.source === true
            ? { ref: sch.schema, code: (0, codegen_1.stringify)(sch.schema) }
            : { ref: sch.schema }),
        validateName,
        ValidationError: _ValidationError,
        schema: sch.schema,
        schemaEnv: sch,
        rootId,
        baseId: sch.baseId || rootId,
        schemaPath: codegen_1.nil,
        errSchemaPath: sch.schemaPath || (this.opts.jtd ? "" : "#"),
        errorPath: (0, codegen_1._) `""`,
        opts: this.opts,
        self: this,
    };
    let sourceCode;
    try {
        this._compilations.add(sch);
        (0, validate_1.validateFunctionCode)(schemaCxt);
        gen.optimize(this.opts.code.optimize);
        // gen.optimize(1)
        const validateCode = gen.toString();
        sourceCode = `${gen.scopeRefs(names_1.default.scope)}return ${validateCode}`;
        // console.log((codeSize += sourceCode.length), (nodeCount += gen.nodeCount))
        if (this.opts.code.process)
            sourceCode = this.opts.code.process(sourceCode, sch);
        // console.log("\n\n\n *** \n", sourceCode)
        const makeValidate = new Function(`${names_1.default.self}`, `${names_1.default.scope}`, sourceCode);
        const validate = makeValidate(this, this.scope.get());
        this.scope.value(validateName, { ref: validate });
        validate.errors = null;
        validate.schema = sch.schema;
        validate.schemaEnv = sch;
        if (sch.$async)
            validate.$async = true;
        if (this.opts.code.source === true) {
            validate.source = { validateName, validateCode, scopeValues: gen._values };
        }
        if (this.opts.unevaluated) {
            const { props, items } = schemaCxt;
            validate.evaluated = {
                props: props instanceof codegen_1.Name ? undefined : props,
                items: items instanceof codegen_1.Name ? undefined : items,
                dynamicProps: props instanceof codegen_1.Name,
                dynamicItems: items instanceof codegen_1.Name,
            };
            if (validate.source)
                validate.source.evaluated = (0, codegen_1.stringify)(validate.evaluated);
        }
        sch.validate = validate;
        return sch;
    }
    catch (e) {
        delete sch.validate;
        delete sch.validateName;
        if (sourceCode)
            this.logger.error("Error compiling schema, function code:", sourceCode);
        // console.log("\n\n\n *** \n", sourceCode, this.opts)
        throw e;
    }
    finally {
        this._compilations.delete(sch);
    }
}
exports.compileSchema = compileSchema;
function resolveRef(root, baseId, ref) {
    var _a;
    ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, ref);
    const schOrFunc = root.refs[ref];
    if (schOrFunc)
        return schOrFunc;
    let _sch = resolve.call(this, root, ref);
    if (_sch === undefined) {
        const schema = (_a = root.localRefs) === null || _a === void 0 ? void 0 : _a[ref]; // TODO maybe localRefs should hold SchemaEnv
        const { schemaId } = this.opts;
        if (schema)
            _sch = new SchemaEnv({ schema, schemaId, root, baseId });
    }
    if (_sch === undefined)
        return;
    return (root.refs[ref] = inlineOrCompile.call(this, _sch));
}
exports.resolveRef = resolveRef;
function inlineOrCompile(sch) {
    if ((0, resolve_1.inlineRef)(sch.schema, this.opts.inlineRefs))
        return sch.schema;
    return sch.validate ? sch : compileSchema.call(this, sch);
}
// Index of schema compilation in the currently compiled list
function getCompilingSchema(schEnv) {
    for (const sch of this._compilations) {
        if (sameSchemaEnv(sch, schEnv))
            return sch;
    }
}
exports.getCompilingSchema = getCompilingSchema;
function sameSchemaEnv(s1, s2) {
    return s1.schema === s2.schema && s1.root === s2.root && s1.baseId === s2.baseId;
}
// resolve and compile the references ($ref)
// TODO returns AnySchemaObject (if the schema can be inlined) or validation function
function resolve(root, // information about the root schema for the current schema
ref // reference to resolve
) {
    let sch;
    while (typeof (sch = this.refs[ref]) == "string")
        ref = sch;
    return sch || this.schemas[ref] || resolveSchema.call(this, root, ref);
}
// Resolve schema, its root and baseId
function resolveSchema(root, // root object with properties schema, refs TODO below SchemaEnv is assigned to it
ref // reference to resolve
) {
    const p = this.opts.uriResolver.parse(ref);
    const refPath = (0, resolve_1._getFullPath)(this.opts.uriResolver, p);
    let baseId = (0, resolve_1.getFullPath)(this.opts.uriResolver, root.baseId, undefined);
    // TODO `Object.keys(root.schema).length > 0` should not be needed - but removing breaks 2 tests
    if (Object.keys(root.schema).length > 0 && refPath === baseId) {
        return getJsonPointer.call(this, p, root);
    }
    const id = (0, resolve_1.normalizeId)(refPath);
    const schOrRef = this.refs[id] || this.schemas[id];
    if (typeof schOrRef == "string") {
        const sch = resolveSchema.call(this, root, schOrRef);
        if (typeof (sch === null || sch === void 0 ? void 0 : sch.schema) !== "object")
            return;
        return getJsonPointer.call(this, p, sch);
    }
    if (typeof (schOrRef === null || schOrRef === void 0 ? void 0 : schOrRef.schema) !== "object")
        return;
    if (!schOrRef.validate)
        compileSchema.call(this, schOrRef);
    if (id === (0, resolve_1.normalizeId)(ref)) {
        const { schema } = schOrRef;
        const { schemaId } = this.opts;
        const schId = schema[schemaId];
        if (schId)
            baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
        return new SchemaEnv({ schema, schemaId, root, baseId });
    }
    return getJsonPointer.call(this, p, schOrRef);
}
exports.resolveSchema = resolveSchema;
const PREVENT_SCOPE_CHANGE = new Set([
    "properties",
    "patternProperties",
    "enum",
    "dependencies",
    "definitions",
]);
function getJsonPointer(parsedRef, { baseId, schema, root }) {
    var _a;
    if (((_a = parsedRef.fragment) === null || _a === void 0 ? void 0 : _a[0]) !== "/")
        return;
    for (const part of parsedRef.fragment.slice(1).split("/")) {
        if (typeof schema === "boolean")
            return;
        const partSchema = schema[(0, util_1.unescapeFragment)(part)];
        if (partSchema === undefined)
            return;
        schema = partSchema;
        // TODO PREVENT_SCOPE_CHANGE could be defined in keyword def?
        const schId = typeof schema === "object" && schema[this.opts.schemaId];
        if (!PREVENT_SCOPE_CHANGE.has(part) && schId) {
            baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
        }
    }
    let env;
    if (typeof schema != "boolean" && schema.$ref && !(0, util_1.schemaHasRulesButRef)(schema, this.RULES)) {
        const $ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schema.$ref);
        env = resolveSchema.call(this, root, $ref);
    }
    // even though resolution failed we need to return SchemaEnv to throw exception
    // so that compileAsync loads missing schema.
    const { schemaId } = this.opts;
    env = env || new SchemaEnv({ schema, schemaId, root, baseId });
    if (env.schema !== env.root.schema)
        return env;
    return undefined;
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/names.js":
/*!************************************************!*\
  !*** ./node_modules/ajv/dist/compile/names.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ./codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const names = {
    // validation function arguments
    data: new codegen_1.Name("data"),
    // args passed from referencing schema
    valCxt: new codegen_1.Name("valCxt"),
    instancePath: new codegen_1.Name("instancePath"),
    parentData: new codegen_1.Name("parentData"),
    parentDataProperty: new codegen_1.Name("parentDataProperty"),
    rootData: new codegen_1.Name("rootData"),
    dynamicAnchors: new codegen_1.Name("dynamicAnchors"),
    // function scoped variables
    vErrors: new codegen_1.Name("vErrors"),
    errors: new codegen_1.Name("errors"),
    this: new codegen_1.Name("this"),
    // "globals"
    self: new codegen_1.Name("self"),
    scope: new codegen_1.Name("scope"),
    // JTD serialize/parse name for JSON string and position
    json: new codegen_1.Name("json"),
    jsonPos: new codegen_1.Name("jsonPos"),
    jsonLen: new codegen_1.Name("jsonLen"),
    jsonPart: new codegen_1.Name("jsonPart"),
};
exports["default"] = names;
//# sourceMappingURL=names.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/ref_error.js":
/*!****************************************************!*\
  !*** ./node_modules/ajv/dist/compile/ref_error.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const resolve_1 = __webpack_require__(/*! ./resolve */ "./node_modules/ajv/dist/compile/resolve.js");
class MissingRefError extends Error {
    constructor(resolver, baseId, ref, msg) {
        super(msg || `can't resolve reference ${ref} from id ${baseId}`);
        this.missingRef = (0, resolve_1.resolveUrl)(resolver, baseId, ref);
        this.missingSchema = (0, resolve_1.normalizeId)((0, resolve_1.getFullPath)(resolver, this.missingRef));
    }
}
exports["default"] = MissingRefError;
//# sourceMappingURL=ref_error.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/resolve.js":
/*!**************************************************!*\
  !*** ./node_modules/ajv/dist/compile/resolve.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSchemaRefs = exports.resolveUrl = exports.normalizeId = exports._getFullPath = exports.getFullPath = exports.inlineRef = void 0;
const util_1 = __webpack_require__(/*! ./util */ "./node_modules/ajv/dist/compile/util.js");
const equal = __webpack_require__(/*! fast-deep-equal */ "./node_modules/fast-deep-equal/index.js");
const traverse = __webpack_require__(/*! json-schema-traverse */ "./node_modules/json-schema-traverse/index.js");
// TODO refactor to use keyword definitions
const SIMPLE_INLINED = new Set([
    "type",
    "format",
    "pattern",
    "maxLength",
    "minLength",
    "maxProperties",
    "minProperties",
    "maxItems",
    "minItems",
    "maximum",
    "minimum",
    "uniqueItems",
    "multipleOf",
    "required",
    "enum",
    "const",
]);
function inlineRef(schema, limit = true) {
    if (typeof schema == "boolean")
        return true;
    if (limit === true)
        return !hasRef(schema);
    if (!limit)
        return false;
    return countKeys(schema) <= limit;
}
exports.inlineRef = inlineRef;
const REF_KEYWORDS = new Set([
    "$ref",
    "$recursiveRef",
    "$recursiveAnchor",
    "$dynamicRef",
    "$dynamicAnchor",
]);
function hasRef(schema) {
    for (const key in schema) {
        if (REF_KEYWORDS.has(key))
            return true;
        const sch = schema[key];
        if (Array.isArray(sch) && sch.some(hasRef))
            return true;
        if (typeof sch == "object" && hasRef(sch))
            return true;
    }
    return false;
}
function countKeys(schema) {
    let count = 0;
    for (const key in schema) {
        if (key === "$ref")
            return Infinity;
        count++;
        if (SIMPLE_INLINED.has(key))
            continue;
        if (typeof schema[key] == "object") {
            (0, util_1.eachItem)(schema[key], (sch) => (count += countKeys(sch)));
        }
        if (count === Infinity)
            return Infinity;
    }
    return count;
}
function getFullPath(resolver, id = "", normalize) {
    if (normalize !== false)
        id = normalizeId(id);
    const p = resolver.parse(id);
    return _getFullPath(resolver, p);
}
exports.getFullPath = getFullPath;
function _getFullPath(resolver, p) {
    const serialized = resolver.serialize(p);
    return serialized.split("#")[0] + "#";
}
exports._getFullPath = _getFullPath;
const TRAILING_SLASH_HASH = /#\/?$/;
function normalizeId(id) {
    return id ? id.replace(TRAILING_SLASH_HASH, "") : "";
}
exports.normalizeId = normalizeId;
function resolveUrl(resolver, baseId, id) {
    id = normalizeId(id);
    return resolver.resolve(baseId, id);
}
exports.resolveUrl = resolveUrl;
const ANCHOR = /^[a-z_][-a-z0-9._]*$/i;
function getSchemaRefs(schema, baseId) {
    if (typeof schema == "boolean")
        return {};
    const { schemaId, uriResolver } = this.opts;
    const schId = normalizeId(schema[schemaId] || baseId);
    const baseIds = { "": schId };
    const pathPrefix = getFullPath(uriResolver, schId, false);
    const localRefs = {};
    const schemaRefs = new Set();
    traverse(schema, { allKeys: true }, (sch, jsonPtr, _, parentJsonPtr) => {
        if (parentJsonPtr === undefined)
            return;
        const fullPath = pathPrefix + jsonPtr;
        let baseId = baseIds[parentJsonPtr];
        if (typeof sch[schemaId] == "string")
            baseId = addRef.call(this, sch[schemaId]);
        addAnchor.call(this, sch.$anchor);
        addAnchor.call(this, sch.$dynamicAnchor);
        baseIds[jsonPtr] = baseId;
        function addRef(ref) {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            const _resolve = this.opts.uriResolver.resolve;
            ref = normalizeId(baseId ? _resolve(baseId, ref) : ref);
            if (schemaRefs.has(ref))
                throw ambiguos(ref);
            schemaRefs.add(ref);
            let schOrRef = this.refs[ref];
            if (typeof schOrRef == "string")
                schOrRef = this.refs[schOrRef];
            if (typeof schOrRef == "object") {
                checkAmbiguosRef(sch, schOrRef.schema, ref);
            }
            else if (ref !== normalizeId(fullPath)) {
                if (ref[0] === "#") {
                    checkAmbiguosRef(sch, localRefs[ref], ref);
                    localRefs[ref] = sch;
                }
                else {
                    this.refs[ref] = fullPath;
                }
            }
            return ref;
        }
        function addAnchor(anchor) {
            if (typeof anchor == "string") {
                if (!ANCHOR.test(anchor))
                    throw new Error(`invalid anchor "${anchor}"`);
                addRef.call(this, `#${anchor}`);
            }
        }
    });
    return localRefs;
    function checkAmbiguosRef(sch1, sch2, ref) {
        if (sch2 !== undefined && !equal(sch1, sch2))
            throw ambiguos(ref);
    }
    function ambiguos(ref) {
        return new Error(`reference "${ref}" resolves to more than one schema`);
    }
}
exports.getSchemaRefs = getSchemaRefs;
//# sourceMappingURL=resolve.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/rules.js":
/*!************************************************!*\
  !*** ./node_modules/ajv/dist/compile/rules.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRules = exports.isJSONType = void 0;
const _jsonTypes = ["string", "number", "integer", "boolean", "null", "object", "array"];
const jsonTypes = new Set(_jsonTypes);
function isJSONType(x) {
    return typeof x == "string" && jsonTypes.has(x);
}
exports.isJSONType = isJSONType;
function getRules() {
    const groups = {
        number: { type: "number", rules: [] },
        string: { type: "string", rules: [] },
        array: { type: "array", rules: [] },
        object: { type: "object", rules: [] },
    };
    return {
        types: { ...groups, integer: true, boolean: true, null: true },
        rules: [{ rules: [] }, groups.number, groups.string, groups.array, groups.object],
        post: { rules: [] },
        all: {},
        keywords: {},
    };
}
exports.getRules = getRules;
//# sourceMappingURL=rules.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/util.js":
/*!***********************************************!*\
  !*** ./node_modules/ajv/dist/compile/util.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkStrictMode = exports.getErrorPath = exports.Type = exports.useFunc = exports.setEvaluated = exports.evaluatedPropsToName = exports.mergeEvaluated = exports.eachItem = exports.unescapeJsonPointer = exports.escapeJsonPointer = exports.escapeFragment = exports.unescapeFragment = exports.schemaRefOrVal = exports.schemaHasRulesButRef = exports.schemaHasRules = exports.checkUnknownRules = exports.alwaysValidSchema = exports.toHash = void 0;
const codegen_1 = __webpack_require__(/*! ./codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const code_1 = __webpack_require__(/*! ./codegen/code */ "./node_modules/ajv/dist/compile/codegen/code.js");
// TODO refactor to use Set
function toHash(arr) {
    const hash = {};
    for (const item of arr)
        hash[item] = true;
    return hash;
}
exports.toHash = toHash;
function alwaysValidSchema(it, schema) {
    if (typeof schema == "boolean")
        return schema;
    if (Object.keys(schema).length === 0)
        return true;
    checkUnknownRules(it, schema);
    return !schemaHasRules(schema, it.self.RULES.all);
}
exports.alwaysValidSchema = alwaysValidSchema;
function checkUnknownRules(it, schema = it.schema) {
    const { opts, self } = it;
    if (!opts.strictSchema)
        return;
    if (typeof schema === "boolean")
        return;
    const rules = self.RULES.keywords;
    for (const key in schema) {
        if (!rules[key])
            checkStrictMode(it, `unknown keyword: "${key}"`);
    }
}
exports.checkUnknownRules = checkUnknownRules;
function schemaHasRules(schema, rules) {
    if (typeof schema == "boolean")
        return !schema;
    for (const key in schema)
        if (rules[key])
            return true;
    return false;
}
exports.schemaHasRules = schemaHasRules;
function schemaHasRulesButRef(schema, RULES) {
    if (typeof schema == "boolean")
        return !schema;
    for (const key in schema)
        if (key !== "$ref" && RULES.all[key])
            return true;
    return false;
}
exports.schemaHasRulesButRef = schemaHasRulesButRef;
function schemaRefOrVal({ topSchemaRef, schemaPath }, schema, keyword, $data) {
    if (!$data) {
        if (typeof schema == "number" || typeof schema == "boolean")
            return schema;
        if (typeof schema == "string")
            return (0, codegen_1._) `${schema}`;
    }
    return (0, codegen_1._) `${topSchemaRef}${schemaPath}${(0, codegen_1.getProperty)(keyword)}`;
}
exports.schemaRefOrVal = schemaRefOrVal;
function unescapeFragment(str) {
    return unescapeJsonPointer(decodeURIComponent(str));
}
exports.unescapeFragment = unescapeFragment;
function escapeFragment(str) {
    return encodeURIComponent(escapeJsonPointer(str));
}
exports.escapeFragment = escapeFragment;
function escapeJsonPointer(str) {
    if (typeof str == "number")
        return `${str}`;
    return str.replace(/~/g, "~0").replace(/\//g, "~1");
}
exports.escapeJsonPointer = escapeJsonPointer;
function unescapeJsonPointer(str) {
    return str.replace(/~1/g, "/").replace(/~0/g, "~");
}
exports.unescapeJsonPointer = unescapeJsonPointer;
function eachItem(xs, f) {
    if (Array.isArray(xs)) {
        for (const x of xs)
            f(x);
    }
    else {
        f(xs);
    }
}
exports.eachItem = eachItem;
function makeMergeEvaluated({ mergeNames, mergeToName, mergeValues, resultToName, }) {
    return (gen, from, to, toName) => {
        const res = to === undefined
            ? from
            : to instanceof codegen_1.Name
                ? (from instanceof codegen_1.Name ? mergeNames(gen, from, to) : mergeToName(gen, from, to), to)
                : from instanceof codegen_1.Name
                    ? (mergeToName(gen, to, from), from)
                    : mergeValues(from, to);
        return toName === codegen_1.Name && !(res instanceof codegen_1.Name) ? resultToName(gen, res) : res;
    };
}
exports.mergeEvaluated = {
    props: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if((0, codegen_1._) `${to} !== true && ${from} !== undefined`, () => {
            gen.if((0, codegen_1._) `${from} === true`, () => gen.assign(to, true), () => gen.assign(to, (0, codegen_1._) `${to} || {}`).code((0, codegen_1._) `Object.assign(${to}, ${from})`));
        }),
        mergeToName: (gen, from, to) => gen.if((0, codegen_1._) `${to} !== true`, () => {
            if (from === true) {
                gen.assign(to, true);
            }
            else {
                gen.assign(to, (0, codegen_1._) `${to} || {}`);
                setEvaluated(gen, to, from);
            }
        }),
        mergeValues: (from, to) => (from === true ? true : { ...from, ...to }),
        resultToName: evaluatedPropsToName,
    }),
    items: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if((0, codegen_1._) `${to} !== true && ${from} !== undefined`, () => gen.assign(to, (0, codegen_1._) `${from} === true ? true : ${to} > ${from} ? ${to} : ${from}`)),
        mergeToName: (gen, from, to) => gen.if((0, codegen_1._) `${to} !== true`, () => gen.assign(to, from === true ? true : (0, codegen_1._) `${to} > ${from} ? ${to} : ${from}`)),
        mergeValues: (from, to) => (from === true ? true : Math.max(from, to)),
        resultToName: (gen, items) => gen.var("items", items),
    }),
};
function evaluatedPropsToName(gen, ps) {
    if (ps === true)
        return gen.var("props", true);
    const props = gen.var("props", (0, codegen_1._) `{}`);
    if (ps !== undefined)
        setEvaluated(gen, props, ps);
    return props;
}
exports.evaluatedPropsToName = evaluatedPropsToName;
function setEvaluated(gen, props, ps) {
    Object.keys(ps).forEach((p) => gen.assign((0, codegen_1._) `${props}${(0, codegen_1.getProperty)(p)}`, true));
}
exports.setEvaluated = setEvaluated;
const snippets = {};
function useFunc(gen, f) {
    return gen.scopeValue("func", {
        ref: f,
        code: snippets[f.code] || (snippets[f.code] = new code_1._Code(f.code)),
    });
}
exports.useFunc = useFunc;
var Type;
(function (Type) {
    Type[Type["Num"] = 0] = "Num";
    Type[Type["Str"] = 1] = "Str";
})(Type = exports.Type || (exports.Type = {}));
function getErrorPath(dataProp, dataPropType, jsPropertySyntax) {
    // let path
    if (dataProp instanceof codegen_1.Name) {
        const isNumber = dataPropType === Type.Num;
        return jsPropertySyntax
            ? isNumber
                ? (0, codegen_1._) `"[" + ${dataProp} + "]"`
                : (0, codegen_1._) `"['" + ${dataProp} + "']"`
            : isNumber
                ? (0, codegen_1._) `"/" + ${dataProp}`
                : (0, codegen_1._) `"/" + ${dataProp}.replace(/~/g, "~0").replace(/\\//g, "~1")`; // TODO maybe use global escapePointer
    }
    return jsPropertySyntax ? (0, codegen_1.getProperty)(dataProp).toString() : "/" + escapeJsonPointer(dataProp);
}
exports.getErrorPath = getErrorPath;
function checkStrictMode(it, msg, mode = it.opts.strictSchema) {
    if (!mode)
        return;
    msg = `strict mode: ${msg}`;
    if (mode === true)
        throw new Error(msg);
    it.self.logger.warn(msg);
}
exports.checkStrictMode = checkStrictMode;
//# sourceMappingURL=util.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/validate/applicability.js":
/*!*****************************************************************!*\
  !*** ./node_modules/ajv/dist/compile/validate/applicability.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.shouldUseRule = exports.shouldUseGroup = exports.schemaHasRulesForType = void 0;
function schemaHasRulesForType({ schema, self }, type) {
    const group = self.RULES.types[type];
    return group && group !== true && shouldUseGroup(schema, group);
}
exports.schemaHasRulesForType = schemaHasRulesForType;
function shouldUseGroup(schema, group) {
    return group.rules.some((rule) => shouldUseRule(schema, rule));
}
exports.shouldUseGroup = shouldUseGroup;
function shouldUseRule(schema, rule) {
    var _a;
    return (schema[rule.keyword] !== undefined ||
        ((_a = rule.definition.implements) === null || _a === void 0 ? void 0 : _a.some((kwd) => schema[kwd] !== undefined)));
}
exports.shouldUseRule = shouldUseRule;
//# sourceMappingURL=applicability.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/validate/boolSchema.js":
/*!**************************************************************!*\
  !*** ./node_modules/ajv/dist/compile/validate/boolSchema.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.boolOrEmptySchema = exports.topBoolOrEmptySchema = void 0;
const errors_1 = __webpack_require__(/*! ../errors */ "./node_modules/ajv/dist/compile/errors.js");
const codegen_1 = __webpack_require__(/*! ../codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const names_1 = __webpack_require__(/*! ../names */ "./node_modules/ajv/dist/compile/names.js");
const boolError = {
    message: "boolean schema is false",
};
function topBoolOrEmptySchema(it) {
    const { gen, schema, validateName } = it;
    if (schema === false) {
        falseSchemaError(it, false);
    }
    else if (typeof schema == "object" && schema.$async === true) {
        gen.return(names_1.default.data);
    }
    else {
        gen.assign((0, codegen_1._) `${validateName}.errors`, null);
        gen.return(true);
    }
}
exports.topBoolOrEmptySchema = topBoolOrEmptySchema;
function boolOrEmptySchema(it, valid) {
    const { gen, schema } = it;
    if (schema === false) {
        gen.var(valid, false); // TODO var
        falseSchemaError(it);
    }
    else {
        gen.var(valid, true); // TODO var
    }
}
exports.boolOrEmptySchema = boolOrEmptySchema;
function falseSchemaError(it, overrideAllErrors) {
    const { gen, data } = it;
    // TODO maybe some other interface should be used for non-keyword validation errors...
    const cxt = {
        gen,
        keyword: "false schema",
        data,
        schema: false,
        schemaCode: false,
        schemaValue: false,
        params: {},
        it,
    };
    (0, errors_1.reportError)(cxt, boolError, undefined, overrideAllErrors);
}
//# sourceMappingURL=boolSchema.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/validate/dataType.js":
/*!************************************************************!*\
  !*** ./node_modules/ajv/dist/compile/validate/dataType.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.reportTypeError = exports.checkDataTypes = exports.checkDataType = exports.coerceAndCheckDataType = exports.getJSONTypes = exports.getSchemaTypes = exports.DataType = void 0;
const rules_1 = __webpack_require__(/*! ../rules */ "./node_modules/ajv/dist/compile/rules.js");
const applicability_1 = __webpack_require__(/*! ./applicability */ "./node_modules/ajv/dist/compile/validate/applicability.js");
const errors_1 = __webpack_require__(/*! ../errors */ "./node_modules/ajv/dist/compile/errors.js");
const codegen_1 = __webpack_require__(/*! ../codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../util */ "./node_modules/ajv/dist/compile/util.js");
var DataType;
(function (DataType) {
    DataType[DataType["Correct"] = 0] = "Correct";
    DataType[DataType["Wrong"] = 1] = "Wrong";
})(DataType = exports.DataType || (exports.DataType = {}));
function getSchemaTypes(schema) {
    const types = getJSONTypes(schema.type);
    const hasNull = types.includes("null");
    if (hasNull) {
        if (schema.nullable === false)
            throw new Error("type: null contradicts nullable: false");
    }
    else {
        if (!types.length && schema.nullable !== undefined) {
            throw new Error('"nullable" cannot be used without "type"');
        }
        if (schema.nullable === true)
            types.push("null");
    }
    return types;
}
exports.getSchemaTypes = getSchemaTypes;
function getJSONTypes(ts) {
    const types = Array.isArray(ts) ? ts : ts ? [ts] : [];
    if (types.every(rules_1.isJSONType))
        return types;
    throw new Error("type must be JSONType or JSONType[]: " + types.join(","));
}
exports.getJSONTypes = getJSONTypes;
function coerceAndCheckDataType(it, types) {
    const { gen, data, opts } = it;
    const coerceTo = coerceToTypes(types, opts.coerceTypes);
    const checkTypes = types.length > 0 &&
        !(coerceTo.length === 0 && types.length === 1 && (0, applicability_1.schemaHasRulesForType)(it, types[0]));
    if (checkTypes) {
        const wrongType = checkDataTypes(types, data, opts.strictNumbers, DataType.Wrong);
        gen.if(wrongType, () => {
            if (coerceTo.length)
                coerceData(it, types, coerceTo);
            else
                reportTypeError(it);
        });
    }
    return checkTypes;
}
exports.coerceAndCheckDataType = coerceAndCheckDataType;
const COERCIBLE = new Set(["string", "number", "integer", "boolean", "null"]);
function coerceToTypes(types, coerceTypes) {
    return coerceTypes
        ? types.filter((t) => COERCIBLE.has(t) || (coerceTypes === "array" && t === "array"))
        : [];
}
function coerceData(it, types, coerceTo) {
    const { gen, data, opts } = it;
    const dataType = gen.let("dataType", (0, codegen_1._) `typeof ${data}`);
    const coerced = gen.let("coerced", (0, codegen_1._) `undefined`);
    if (opts.coerceTypes === "array") {
        gen.if((0, codegen_1._) `${dataType} == 'object' && Array.isArray(${data}) && ${data}.length == 1`, () => gen
            .assign(data, (0, codegen_1._) `${data}[0]`)
            .assign(dataType, (0, codegen_1._) `typeof ${data}`)
            .if(checkDataTypes(types, data, opts.strictNumbers), () => gen.assign(coerced, data)));
    }
    gen.if((0, codegen_1._) `${coerced} !== undefined`);
    for (const t of coerceTo) {
        if (COERCIBLE.has(t) || (t === "array" && opts.coerceTypes === "array")) {
            coerceSpecificType(t);
        }
    }
    gen.else();
    reportTypeError(it);
    gen.endIf();
    gen.if((0, codegen_1._) `${coerced} !== undefined`, () => {
        gen.assign(data, coerced);
        assignParentData(it, coerced);
    });
    function coerceSpecificType(t) {
        switch (t) {
            case "string":
                gen
                    .elseIf((0, codegen_1._) `${dataType} == "number" || ${dataType} == "boolean"`)
                    .assign(coerced, (0, codegen_1._) `"" + ${data}`)
                    .elseIf((0, codegen_1._) `${data} === null`)
                    .assign(coerced, (0, codegen_1._) `""`);
                return;
            case "number":
                gen
                    .elseIf((0, codegen_1._) `${dataType} == "boolean" || ${data} === null
              || (${dataType} == "string" && ${data} && ${data} == +${data})`)
                    .assign(coerced, (0, codegen_1._) `+${data}`);
                return;
            case "integer":
                gen
                    .elseIf((0, codegen_1._) `${dataType} === "boolean" || ${data} === null
              || (${dataType} === "string" && ${data} && ${data} == +${data} && !(${data} % 1))`)
                    .assign(coerced, (0, codegen_1._) `+${data}`);
                return;
            case "boolean":
                gen
                    .elseIf((0, codegen_1._) `${data} === "false" || ${data} === 0 || ${data} === null`)
                    .assign(coerced, false)
                    .elseIf((0, codegen_1._) `${data} === "true" || ${data} === 1`)
                    .assign(coerced, true);
                return;
            case "null":
                gen.elseIf((0, codegen_1._) `${data} === "" || ${data} === 0 || ${data} === false`);
                gen.assign(coerced, null);
                return;
            case "array":
                gen
                    .elseIf((0, codegen_1._) `${dataType} === "string" || ${dataType} === "number"
              || ${dataType} === "boolean" || ${data} === null`)
                    .assign(coerced, (0, codegen_1._) `[${data}]`);
        }
    }
}
function assignParentData({ gen, parentData, parentDataProperty }, expr) {
    // TODO use gen.property
    gen.if((0, codegen_1._) `${parentData} !== undefined`, () => gen.assign((0, codegen_1._) `${parentData}[${parentDataProperty}]`, expr));
}
function checkDataType(dataType, data, strictNums, correct = DataType.Correct) {
    const EQ = correct === DataType.Correct ? codegen_1.operators.EQ : codegen_1.operators.NEQ;
    let cond;
    switch (dataType) {
        case "null":
            return (0, codegen_1._) `${data} ${EQ} null`;
        case "array":
            cond = (0, codegen_1._) `Array.isArray(${data})`;
            break;
        case "object":
            cond = (0, codegen_1._) `${data} && typeof ${data} == "object" && !Array.isArray(${data})`;
            break;
        case "integer":
            cond = numCond((0, codegen_1._) `!(${data} % 1) && !isNaN(${data})`);
            break;
        case "number":
            cond = numCond();
            break;
        default:
            return (0, codegen_1._) `typeof ${data} ${EQ} ${dataType}`;
    }
    return correct === DataType.Correct ? cond : (0, codegen_1.not)(cond);
    function numCond(_cond = codegen_1.nil) {
        return (0, codegen_1.and)((0, codegen_1._) `typeof ${data} == "number"`, _cond, strictNums ? (0, codegen_1._) `isFinite(${data})` : codegen_1.nil);
    }
}
exports.checkDataType = checkDataType;
function checkDataTypes(dataTypes, data, strictNums, correct) {
    if (dataTypes.length === 1) {
        return checkDataType(dataTypes[0], data, strictNums, correct);
    }
    let cond;
    const types = (0, util_1.toHash)(dataTypes);
    if (types.array && types.object) {
        const notObj = (0, codegen_1._) `typeof ${data} != "object"`;
        cond = types.null ? notObj : (0, codegen_1._) `!${data} || ${notObj}`;
        delete types.null;
        delete types.array;
        delete types.object;
    }
    else {
        cond = codegen_1.nil;
    }
    if (types.number)
        delete types.integer;
    for (const t in types)
        cond = (0, codegen_1.and)(cond, checkDataType(t, data, strictNums, correct));
    return cond;
}
exports.checkDataTypes = checkDataTypes;
const typeError = {
    message: ({ schema }) => `must be ${schema}`,
    params: ({ schema, schemaValue }) => typeof schema == "string" ? (0, codegen_1._) `{type: ${schema}}` : (0, codegen_1._) `{type: ${schemaValue}}`,
};
function reportTypeError(it) {
    const cxt = getTypeErrorContext(it);
    (0, errors_1.reportError)(cxt, typeError);
}
exports.reportTypeError = reportTypeError;
function getTypeErrorContext(it) {
    const { gen, data, schema } = it;
    const schemaCode = (0, util_1.schemaRefOrVal)(it, schema, "type");
    return {
        gen,
        keyword: "type",
        data,
        schema: schema.type,
        schemaCode,
        schemaValue: schemaCode,
        parentSchema: schema,
        params: {},
        it,
    };
}
//# sourceMappingURL=dataType.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/validate/defaults.js":
/*!************************************************************!*\
  !*** ./node_modules/ajv/dist/compile/validate/defaults.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.assignDefaults = void 0;
const codegen_1 = __webpack_require__(/*! ../codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../util */ "./node_modules/ajv/dist/compile/util.js");
function assignDefaults(it, ty) {
    const { properties, items } = it.schema;
    if (ty === "object" && properties) {
        for (const key in properties) {
            assignDefault(it, key, properties[key].default);
        }
    }
    else if (ty === "array" && Array.isArray(items)) {
        items.forEach((sch, i) => assignDefault(it, i, sch.default));
    }
}
exports.assignDefaults = assignDefaults;
function assignDefault(it, prop, defaultValue) {
    const { gen, compositeRule, data, opts } = it;
    if (defaultValue === undefined)
        return;
    const childData = (0, codegen_1._) `${data}${(0, codegen_1.getProperty)(prop)}`;
    if (compositeRule) {
        (0, util_1.checkStrictMode)(it, `default is ignored for: ${childData}`);
        return;
    }
    let condition = (0, codegen_1._) `${childData} === undefined`;
    if (opts.useDefaults === "empty") {
        condition = (0, codegen_1._) `${condition} || ${childData} === null || ${childData} === ""`;
    }
    // `${childData} === undefined` +
    // (opts.useDefaults === "empty" ? ` || ${childData} === null || ${childData} === ""` : "")
    gen.if(condition, (0, codegen_1._) `${childData} = ${(0, codegen_1.stringify)(defaultValue)}`);
}
//# sourceMappingURL=defaults.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/validate/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/ajv/dist/compile/validate/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getData = exports.KeywordCxt = exports.validateFunctionCode = void 0;
const boolSchema_1 = __webpack_require__(/*! ./boolSchema */ "./node_modules/ajv/dist/compile/validate/boolSchema.js");
const dataType_1 = __webpack_require__(/*! ./dataType */ "./node_modules/ajv/dist/compile/validate/dataType.js");
const applicability_1 = __webpack_require__(/*! ./applicability */ "./node_modules/ajv/dist/compile/validate/applicability.js");
const dataType_2 = __webpack_require__(/*! ./dataType */ "./node_modules/ajv/dist/compile/validate/dataType.js");
const defaults_1 = __webpack_require__(/*! ./defaults */ "./node_modules/ajv/dist/compile/validate/defaults.js");
const keyword_1 = __webpack_require__(/*! ./keyword */ "./node_modules/ajv/dist/compile/validate/keyword.js");
const subschema_1 = __webpack_require__(/*! ./subschema */ "./node_modules/ajv/dist/compile/validate/subschema.js");
const codegen_1 = __webpack_require__(/*! ../codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const names_1 = __webpack_require__(/*! ../names */ "./node_modules/ajv/dist/compile/names.js");
const resolve_1 = __webpack_require__(/*! ../resolve */ "./node_modules/ajv/dist/compile/resolve.js");
const util_1 = __webpack_require__(/*! ../util */ "./node_modules/ajv/dist/compile/util.js");
const errors_1 = __webpack_require__(/*! ../errors */ "./node_modules/ajv/dist/compile/errors.js");
// schema compilation - generates validation function, subschemaCode (below) is used for subschemas
function validateFunctionCode(it) {
    if (isSchemaObj(it)) {
        checkKeywords(it);
        if (schemaCxtHasRules(it)) {
            topSchemaObjCode(it);
            return;
        }
    }
    validateFunction(it, () => (0, boolSchema_1.topBoolOrEmptySchema)(it));
}
exports.validateFunctionCode = validateFunctionCode;
function validateFunction({ gen, validateName, schema, schemaEnv, opts }, body) {
    if (opts.code.es5) {
        gen.func(validateName, (0, codegen_1._) `${names_1.default.data}, ${names_1.default.valCxt}`, schemaEnv.$async, () => {
            gen.code((0, codegen_1._) `"use strict"; ${funcSourceUrl(schema, opts)}`);
            destructureValCxtES5(gen, opts);
            gen.code(body);
        });
    }
    else {
        gen.func(validateName, (0, codegen_1._) `${names_1.default.data}, ${destructureValCxt(opts)}`, schemaEnv.$async, () => gen.code(funcSourceUrl(schema, opts)).code(body));
    }
}
function destructureValCxt(opts) {
    return (0, codegen_1._) `{${names_1.default.instancePath}="", ${names_1.default.parentData}, ${names_1.default.parentDataProperty}, ${names_1.default.rootData}=${names_1.default.data}${opts.dynamicRef ? (0, codegen_1._) `, ${names_1.default.dynamicAnchors}={}` : codegen_1.nil}}={}`;
}
function destructureValCxtES5(gen, opts) {
    gen.if(names_1.default.valCxt, () => {
        gen.var(names_1.default.instancePath, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.instancePath}`);
        gen.var(names_1.default.parentData, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.parentData}`);
        gen.var(names_1.default.parentDataProperty, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.parentDataProperty}`);
        gen.var(names_1.default.rootData, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.rootData}`);
        if (opts.dynamicRef)
            gen.var(names_1.default.dynamicAnchors, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.dynamicAnchors}`);
    }, () => {
        gen.var(names_1.default.instancePath, (0, codegen_1._) `""`);
        gen.var(names_1.default.parentData, (0, codegen_1._) `undefined`);
        gen.var(names_1.default.parentDataProperty, (0, codegen_1._) `undefined`);
        gen.var(names_1.default.rootData, names_1.default.data);
        if (opts.dynamicRef)
            gen.var(names_1.default.dynamicAnchors, (0, codegen_1._) `{}`);
    });
}
function topSchemaObjCode(it) {
    const { schema, opts, gen } = it;
    validateFunction(it, () => {
        if (opts.$comment && schema.$comment)
            commentKeyword(it);
        checkNoDefault(it);
        gen.let(names_1.default.vErrors, null);
        gen.let(names_1.default.errors, 0);
        if (opts.unevaluated)
            resetEvaluated(it);
        typeAndKeywords(it);
        returnResults(it);
    });
    return;
}
function resetEvaluated(it) {
    // TODO maybe some hook to execute it in the end to check whether props/items are Name, as in assignEvaluated
    const { gen, validateName } = it;
    it.evaluated = gen.const("evaluated", (0, codegen_1._) `${validateName}.evaluated`);
    gen.if((0, codegen_1._) `${it.evaluated}.dynamicProps`, () => gen.assign((0, codegen_1._) `${it.evaluated}.props`, (0, codegen_1._) `undefined`));
    gen.if((0, codegen_1._) `${it.evaluated}.dynamicItems`, () => gen.assign((0, codegen_1._) `${it.evaluated}.items`, (0, codegen_1._) `undefined`));
}
function funcSourceUrl(schema, opts) {
    const schId = typeof schema == "object" && schema[opts.schemaId];
    return schId && (opts.code.source || opts.code.process) ? (0, codegen_1._) `/*# sourceURL=${schId} */` : codegen_1.nil;
}
// schema compilation - this function is used recursively to generate code for sub-schemas
function subschemaCode(it, valid) {
    if (isSchemaObj(it)) {
        checkKeywords(it);
        if (schemaCxtHasRules(it)) {
            subSchemaObjCode(it, valid);
            return;
        }
    }
    (0, boolSchema_1.boolOrEmptySchema)(it, valid);
}
function schemaCxtHasRules({ schema, self }) {
    if (typeof schema == "boolean")
        return !schema;
    for (const key in schema)
        if (self.RULES.all[key])
            return true;
    return false;
}
function isSchemaObj(it) {
    return typeof it.schema != "boolean";
}
function subSchemaObjCode(it, valid) {
    const { schema, gen, opts } = it;
    if (opts.$comment && schema.$comment)
        commentKeyword(it);
    updateContext(it);
    checkAsyncSchema(it);
    const errsCount = gen.const("_errs", names_1.default.errors);
    typeAndKeywords(it, errsCount);
    // TODO var
    gen.var(valid, (0, codegen_1._) `${errsCount} === ${names_1.default.errors}`);
}
function checkKeywords(it) {
    (0, util_1.checkUnknownRules)(it);
    checkRefsAndKeywords(it);
}
function typeAndKeywords(it, errsCount) {
    if (it.opts.jtd)
        return schemaKeywords(it, [], false, errsCount);
    const types = (0, dataType_1.getSchemaTypes)(it.schema);
    const checkedTypes = (0, dataType_1.coerceAndCheckDataType)(it, types);
    schemaKeywords(it, types, !checkedTypes, errsCount);
}
function checkRefsAndKeywords(it) {
    const { schema, errSchemaPath, opts, self } = it;
    if (schema.$ref && opts.ignoreKeywordsWithRef && (0, util_1.schemaHasRulesButRef)(schema, self.RULES)) {
        self.logger.warn(`$ref: keywords ignored in schema at path "${errSchemaPath}"`);
    }
}
function checkNoDefault(it) {
    const { schema, opts } = it;
    if (schema.default !== undefined && opts.useDefaults && opts.strictSchema) {
        (0, util_1.checkStrictMode)(it, "default is ignored in the schema root");
    }
}
function updateContext(it) {
    const schId = it.schema[it.opts.schemaId];
    if (schId)
        it.baseId = (0, resolve_1.resolveUrl)(it.opts.uriResolver, it.baseId, schId);
}
function checkAsyncSchema(it) {
    if (it.schema.$async && !it.schemaEnv.$async)
        throw new Error("async schema in sync schema");
}
function commentKeyword({ gen, schemaEnv, schema, errSchemaPath, opts }) {
    const msg = schema.$comment;
    if (opts.$comment === true) {
        gen.code((0, codegen_1._) `${names_1.default.self}.logger.log(${msg})`);
    }
    else if (typeof opts.$comment == "function") {
        const schemaPath = (0, codegen_1.str) `${errSchemaPath}/$comment`;
        const rootName = gen.scopeValue("root", { ref: schemaEnv.root });
        gen.code((0, codegen_1._) `${names_1.default.self}.opts.$comment(${msg}, ${schemaPath}, ${rootName}.schema)`);
    }
}
function returnResults(it) {
    const { gen, schemaEnv, validateName, ValidationError, opts } = it;
    if (schemaEnv.$async) {
        // TODO assign unevaluated
        gen.if((0, codegen_1._) `${names_1.default.errors} === 0`, () => gen.return(names_1.default.data), () => gen.throw((0, codegen_1._) `new ${ValidationError}(${names_1.default.vErrors})`));
    }
    else {
        gen.assign((0, codegen_1._) `${validateName}.errors`, names_1.default.vErrors);
        if (opts.unevaluated)
            assignEvaluated(it);
        gen.return((0, codegen_1._) `${names_1.default.errors} === 0`);
    }
}
function assignEvaluated({ gen, evaluated, props, items }) {
    if (props instanceof codegen_1.Name)
        gen.assign((0, codegen_1._) `${evaluated}.props`, props);
    if (items instanceof codegen_1.Name)
        gen.assign((0, codegen_1._) `${evaluated}.items`, items);
}
function schemaKeywords(it, types, typeErrors, errsCount) {
    const { gen, schema, data, allErrors, opts, self } = it;
    const { RULES } = self;
    if (schema.$ref && (opts.ignoreKeywordsWithRef || !(0, util_1.schemaHasRulesButRef)(schema, RULES))) {
        gen.block(() => keywordCode(it, "$ref", RULES.all.$ref.definition)); // TODO typecast
        return;
    }
    if (!opts.jtd)
        checkStrictTypes(it, types);
    gen.block(() => {
        for (const group of RULES.rules)
            groupKeywords(group);
        groupKeywords(RULES.post);
    });
    function groupKeywords(group) {
        if (!(0, applicability_1.shouldUseGroup)(schema, group))
            return;
        if (group.type) {
            gen.if((0, dataType_2.checkDataType)(group.type, data, opts.strictNumbers));
            iterateKeywords(it, group);
            if (types.length === 1 && types[0] === group.type && typeErrors) {
                gen.else();
                (0, dataType_2.reportTypeError)(it);
            }
            gen.endIf();
        }
        else {
            iterateKeywords(it, group);
        }
        // TODO make it "ok" call?
        if (!allErrors)
            gen.if((0, codegen_1._) `${names_1.default.errors} === ${errsCount || 0}`);
    }
}
function iterateKeywords(it, group) {
    const { gen, schema, opts: { useDefaults }, } = it;
    if (useDefaults)
        (0, defaults_1.assignDefaults)(it, group.type);
    gen.block(() => {
        for (const rule of group.rules) {
            if ((0, applicability_1.shouldUseRule)(schema, rule)) {
                keywordCode(it, rule.keyword, rule.definition, group.type);
            }
        }
    });
}
function checkStrictTypes(it, types) {
    if (it.schemaEnv.meta || !it.opts.strictTypes)
        return;
    checkContextTypes(it, types);
    if (!it.opts.allowUnionTypes)
        checkMultipleTypes(it, types);
    checkKeywordTypes(it, it.dataTypes);
}
function checkContextTypes(it, types) {
    if (!types.length)
        return;
    if (!it.dataTypes.length) {
        it.dataTypes = types;
        return;
    }
    types.forEach((t) => {
        if (!includesType(it.dataTypes, t)) {
            strictTypesError(it, `type "${t}" not allowed by context "${it.dataTypes.join(",")}"`);
        }
    });
    it.dataTypes = it.dataTypes.filter((t) => includesType(types, t));
}
function checkMultipleTypes(it, ts) {
    if (ts.length > 1 && !(ts.length === 2 && ts.includes("null"))) {
        strictTypesError(it, "use allowUnionTypes to allow union type keyword");
    }
}
function checkKeywordTypes(it, ts) {
    const rules = it.self.RULES.all;
    for (const keyword in rules) {
        const rule = rules[keyword];
        if (typeof rule == "object" && (0, applicability_1.shouldUseRule)(it.schema, rule)) {
            const { type } = rule.definition;
            if (type.length && !type.some((t) => hasApplicableType(ts, t))) {
                strictTypesError(it, `missing type "${type.join(",")}" for keyword "${keyword}"`);
            }
        }
    }
}
function hasApplicableType(schTs, kwdT) {
    return schTs.includes(kwdT) || (kwdT === "number" && schTs.includes("integer"));
}
function includesType(ts, t) {
    return ts.includes(t) || (t === "integer" && ts.includes("number"));
}
function strictTypesError(it, msg) {
    const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
    msg += ` at "${schemaPath}" (strictTypes)`;
    (0, util_1.checkStrictMode)(it, msg, it.opts.strictTypes);
}
class KeywordCxt {
    constructor(it, def, keyword) {
        (0, keyword_1.validateKeywordUsage)(it, def, keyword);
        this.gen = it.gen;
        this.allErrors = it.allErrors;
        this.keyword = keyword;
        this.data = it.data;
        this.schema = it.schema[keyword];
        this.$data = def.$data && it.opts.$data && this.schema && this.schema.$data;
        this.schemaValue = (0, util_1.schemaRefOrVal)(it, this.schema, keyword, this.$data);
        this.schemaType = def.schemaType;
        this.parentSchema = it.schema;
        this.params = {};
        this.it = it;
        this.def = def;
        if (this.$data) {
            this.schemaCode = it.gen.const("vSchema", getData(this.$data, it));
        }
        else {
            this.schemaCode = this.schemaValue;
            if (!(0, keyword_1.validSchemaType)(this.schema, def.schemaType, def.allowUndefined)) {
                throw new Error(`${keyword} value must be ${JSON.stringify(def.schemaType)}`);
            }
        }
        if ("code" in def ? def.trackErrors : def.errors !== false) {
            this.errsCount = it.gen.const("_errs", names_1.default.errors);
        }
    }
    result(condition, successAction, failAction) {
        this.failResult((0, codegen_1.not)(condition), successAction, failAction);
    }
    failResult(condition, successAction, failAction) {
        this.gen.if(condition);
        if (failAction)
            failAction();
        else
            this.error();
        if (successAction) {
            this.gen.else();
            successAction();
            if (this.allErrors)
                this.gen.endIf();
        }
        else {
            if (this.allErrors)
                this.gen.endIf();
            else
                this.gen.else();
        }
    }
    pass(condition, failAction) {
        this.failResult((0, codegen_1.not)(condition), undefined, failAction);
    }
    fail(condition) {
        if (condition === undefined) {
            this.error();
            if (!this.allErrors)
                this.gen.if(false); // this branch will be removed by gen.optimize
            return;
        }
        this.gen.if(condition);
        this.error();
        if (this.allErrors)
            this.gen.endIf();
        else
            this.gen.else();
    }
    fail$data(condition) {
        if (!this.$data)
            return this.fail(condition);
        const { schemaCode } = this;
        this.fail((0, codegen_1._) `${schemaCode} !== undefined && (${(0, codegen_1.or)(this.invalid$data(), condition)})`);
    }
    error(append, errorParams, errorPaths) {
        if (errorParams) {
            this.setParams(errorParams);
            this._error(append, errorPaths);
            this.setParams({});
            return;
        }
        this._error(append, errorPaths);
    }
    _error(append, errorPaths) {
        ;
        (append ? errors_1.reportExtraError : errors_1.reportError)(this, this.def.error, errorPaths);
    }
    $dataError() {
        (0, errors_1.reportError)(this, this.def.$dataError || errors_1.keyword$DataError);
    }
    reset() {
        if (this.errsCount === undefined)
            throw new Error('add "trackErrors" to keyword definition');
        (0, errors_1.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(cond) {
        if (!this.allErrors)
            this.gen.if(cond);
    }
    setParams(obj, assign) {
        if (assign)
            Object.assign(this.params, obj);
        else
            this.params = obj;
    }
    block$data(valid, codeBlock, $dataValid = codegen_1.nil) {
        this.gen.block(() => {
            this.check$data(valid, $dataValid);
            codeBlock();
        });
    }
    check$data(valid = codegen_1.nil, $dataValid = codegen_1.nil) {
        if (!this.$data)
            return;
        const { gen, schemaCode, schemaType, def } = this;
        gen.if((0, codegen_1.or)((0, codegen_1._) `${schemaCode} === undefined`, $dataValid));
        if (valid !== codegen_1.nil)
            gen.assign(valid, true);
        if (schemaType.length || def.validateSchema) {
            gen.elseIf(this.invalid$data());
            this.$dataError();
            if (valid !== codegen_1.nil)
                gen.assign(valid, false);
        }
        gen.else();
    }
    invalid$data() {
        const { gen, schemaCode, schemaType, def, it } = this;
        return (0, codegen_1.or)(wrong$DataType(), invalid$DataSchema());
        function wrong$DataType() {
            if (schemaType.length) {
                /* istanbul ignore if */
                if (!(schemaCode instanceof codegen_1.Name))
                    throw new Error("ajv implementation error");
                const st = Array.isArray(schemaType) ? schemaType : [schemaType];
                return (0, codegen_1._) `${(0, dataType_2.checkDataTypes)(st, schemaCode, it.opts.strictNumbers, dataType_2.DataType.Wrong)}`;
            }
            return codegen_1.nil;
        }
        function invalid$DataSchema() {
            if (def.validateSchema) {
                const validateSchemaRef = gen.scopeValue("validate$data", { ref: def.validateSchema }); // TODO value.code for standalone
                return (0, codegen_1._) `!${validateSchemaRef}(${schemaCode})`;
            }
            return codegen_1.nil;
        }
    }
    subschema(appl, valid) {
        const subschema = (0, subschema_1.getSubschema)(this.it, appl);
        (0, subschema_1.extendSubschemaData)(subschema, this.it, appl);
        (0, subschema_1.extendSubschemaMode)(subschema, appl);
        const nextContext = { ...this.it, ...subschema, items: undefined, props: undefined };
        subschemaCode(nextContext, valid);
        return nextContext;
    }
    mergeEvaluated(schemaCxt, toName) {
        const { it, gen } = this;
        if (!it.opts.unevaluated)
            return;
        if (it.props !== true && schemaCxt.props !== undefined) {
            it.props = util_1.mergeEvaluated.props(gen, schemaCxt.props, it.props, toName);
        }
        if (it.items !== true && schemaCxt.items !== undefined) {
            it.items = util_1.mergeEvaluated.items(gen, schemaCxt.items, it.items, toName);
        }
    }
    mergeValidEvaluated(schemaCxt, valid) {
        const { it, gen } = this;
        if (it.opts.unevaluated && (it.props !== true || it.items !== true)) {
            gen.if(valid, () => this.mergeEvaluated(schemaCxt, codegen_1.Name));
            return true;
        }
    }
}
exports.KeywordCxt = KeywordCxt;
function keywordCode(it, keyword, def, ruleType) {
    const cxt = new KeywordCxt(it, def, keyword);
    if ("code" in def) {
        def.code(cxt, ruleType);
    }
    else if (cxt.$data && def.validate) {
        (0, keyword_1.funcKeywordCode)(cxt, def);
    }
    else if ("macro" in def) {
        (0, keyword_1.macroKeywordCode)(cxt, def);
    }
    else if (def.compile || def.validate) {
        (0, keyword_1.funcKeywordCode)(cxt, def);
    }
}
const JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/;
const RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function getData($data, { dataLevel, dataNames, dataPathArr }) {
    let jsonPointer;
    let data;
    if ($data === "")
        return names_1.default.rootData;
    if ($data[0] === "/") {
        if (!JSON_POINTER.test($data))
            throw new Error(`Invalid JSON-pointer: ${$data}`);
        jsonPointer = $data;
        data = names_1.default.rootData;
    }
    else {
        const matches = RELATIVE_JSON_POINTER.exec($data);
        if (!matches)
            throw new Error(`Invalid JSON-pointer: ${$data}`);
        const up = +matches[1];
        jsonPointer = matches[2];
        if (jsonPointer === "#") {
            if (up >= dataLevel)
                throw new Error(errorMsg("property/index", up));
            return dataPathArr[dataLevel - up];
        }
        if (up > dataLevel)
            throw new Error(errorMsg("data", up));
        data = dataNames[dataLevel - up];
        if (!jsonPointer)
            return data;
    }
    let expr = data;
    const segments = jsonPointer.split("/");
    for (const segment of segments) {
        if (segment) {
            data = (0, codegen_1._) `${data}${(0, codegen_1.getProperty)((0, util_1.unescapeJsonPointer)(segment))}`;
            expr = (0, codegen_1._) `${expr} && ${data}`;
        }
    }
    return expr;
    function errorMsg(pointerType, up) {
        return `Cannot access ${pointerType} ${up} levels up, current level is ${dataLevel}`;
    }
}
exports.getData = getData;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/validate/keyword.js":
/*!***********************************************************!*\
  !*** ./node_modules/ajv/dist/compile/validate/keyword.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateKeywordUsage = exports.validSchemaType = exports.funcKeywordCode = exports.macroKeywordCode = void 0;
const codegen_1 = __webpack_require__(/*! ../codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const names_1 = __webpack_require__(/*! ../names */ "./node_modules/ajv/dist/compile/names.js");
const code_1 = __webpack_require__(/*! ../../vocabularies/code */ "./node_modules/ajv/dist/vocabularies/code.js");
const errors_1 = __webpack_require__(/*! ../errors */ "./node_modules/ajv/dist/compile/errors.js");
function macroKeywordCode(cxt, def) {
    const { gen, keyword, schema, parentSchema, it } = cxt;
    const macroSchema = def.macro.call(it.self, schema, parentSchema, it);
    const schemaRef = useKeyword(gen, keyword, macroSchema);
    if (it.opts.validateSchema !== false)
        it.self.validateSchema(macroSchema, true);
    const valid = gen.name("valid");
    cxt.subschema({
        schema: macroSchema,
        schemaPath: codegen_1.nil,
        errSchemaPath: `${it.errSchemaPath}/${keyword}`,
        topSchemaRef: schemaRef,
        compositeRule: true,
    }, valid);
    cxt.pass(valid, () => cxt.error(true));
}
exports.macroKeywordCode = macroKeywordCode;
function funcKeywordCode(cxt, def) {
    var _a;
    const { gen, keyword, schema, parentSchema, $data, it } = cxt;
    checkAsyncKeyword(it, def);
    const validate = !$data && def.compile ? def.compile.call(it.self, schema, parentSchema, it) : def.validate;
    const validateRef = useKeyword(gen, keyword, validate);
    const valid = gen.let("valid");
    cxt.block$data(valid, validateKeyword);
    cxt.ok((_a = def.valid) !== null && _a !== void 0 ? _a : valid);
    function validateKeyword() {
        if (def.errors === false) {
            assignValid();
            if (def.modifying)
                modifyData(cxt);
            reportErrs(() => cxt.error());
        }
        else {
            const ruleErrs = def.async ? validateAsync() : validateSync();
            if (def.modifying)
                modifyData(cxt);
            reportErrs(() => addErrs(cxt, ruleErrs));
        }
    }
    function validateAsync() {
        const ruleErrs = gen.let("ruleErrs", null);
        gen.try(() => assignValid((0, codegen_1._) `await `), (e) => gen.assign(valid, false).if((0, codegen_1._) `${e} instanceof ${it.ValidationError}`, () => gen.assign(ruleErrs, (0, codegen_1._) `${e}.errors`), () => gen.throw(e)));
        return ruleErrs;
    }
    function validateSync() {
        const validateErrs = (0, codegen_1._) `${validateRef}.errors`;
        gen.assign(validateErrs, null);
        assignValid(codegen_1.nil);
        return validateErrs;
    }
    function assignValid(_await = def.async ? (0, codegen_1._) `await ` : codegen_1.nil) {
        const passCxt = it.opts.passContext ? names_1.default.this : names_1.default.self;
        const passSchema = !(("compile" in def && !$data) || def.schema === false);
        gen.assign(valid, (0, codegen_1._) `${_await}${(0, code_1.callValidateCode)(cxt, validateRef, passCxt, passSchema)}`, def.modifying);
    }
    function reportErrs(errors) {
        var _a;
        gen.if((0, codegen_1.not)((_a = def.valid) !== null && _a !== void 0 ? _a : valid), errors);
    }
}
exports.funcKeywordCode = funcKeywordCode;
function modifyData(cxt) {
    const { gen, data, it } = cxt;
    gen.if(it.parentData, () => gen.assign(data, (0, codegen_1._) `${it.parentData}[${it.parentDataProperty}]`));
}
function addErrs(cxt, errs) {
    const { gen } = cxt;
    gen.if((0, codegen_1._) `Array.isArray(${errs})`, () => {
        gen
            .assign(names_1.default.vErrors, (0, codegen_1._) `${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`)
            .assign(names_1.default.errors, (0, codegen_1._) `${names_1.default.vErrors}.length`);
        (0, errors_1.extendErrors)(cxt);
    }, () => cxt.error());
}
function checkAsyncKeyword({ schemaEnv }, def) {
    if (def.async && !schemaEnv.$async)
        throw new Error("async keyword in sync schema");
}
function useKeyword(gen, keyword, result) {
    if (result === undefined)
        throw new Error(`keyword "${keyword}" failed to compile`);
    return gen.scopeValue("keyword", typeof result == "function" ? { ref: result } : { ref: result, code: (0, codegen_1.stringify)(result) });
}
function validSchemaType(schema, schemaType, allowUndefined = false) {
    // TODO add tests
    return (!schemaType.length ||
        schemaType.some((st) => st === "array"
            ? Array.isArray(schema)
            : st === "object"
                ? schema && typeof schema == "object" && !Array.isArray(schema)
                : typeof schema == st || (allowUndefined && typeof schema == "undefined")));
}
exports.validSchemaType = validSchemaType;
function validateKeywordUsage({ schema, opts, self, errSchemaPath }, def, keyword) {
    /* istanbul ignore if */
    if (Array.isArray(def.keyword) ? !def.keyword.includes(keyword) : def.keyword !== keyword) {
        throw new Error("ajv implementation error");
    }
    const deps = def.dependencies;
    if (deps === null || deps === void 0 ? void 0 : deps.some((kwd) => !Object.prototype.hasOwnProperty.call(schema, kwd))) {
        throw new Error(`parent schema must have dependencies of ${keyword}: ${deps.join(",")}`);
    }
    if (def.validateSchema) {
        const valid = def.validateSchema(schema[keyword]);
        if (!valid) {
            const msg = `keyword "${keyword}" value is invalid at path "${errSchemaPath}": ` +
                self.errorsText(def.validateSchema.errors);
            if (opts.validateSchema === "log")
                self.logger.error(msg);
            else
                throw new Error(msg);
        }
    }
}
exports.validateKeywordUsage = validateKeywordUsage;
//# sourceMappingURL=keyword.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/validate/subschema.js":
/*!*************************************************************!*\
  !*** ./node_modules/ajv/dist/compile/validate/subschema.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.extendSubschemaMode = exports.extendSubschemaData = exports.getSubschema = void 0;
const codegen_1 = __webpack_require__(/*! ../codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../util */ "./node_modules/ajv/dist/compile/util.js");
function getSubschema(it, { keyword, schemaProp, schema, schemaPath, errSchemaPath, topSchemaRef }) {
    if (keyword !== undefined && schema !== undefined) {
        throw new Error('both "keyword" and "schema" passed, only one allowed');
    }
    if (keyword !== undefined) {
        const sch = it.schema[keyword];
        return schemaProp === undefined
            ? {
                schema: sch,
                schemaPath: (0, codegen_1._) `${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}`,
                errSchemaPath: `${it.errSchemaPath}/${keyword}`,
            }
            : {
                schema: sch[schemaProp],
                schemaPath: (0, codegen_1._) `${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}${(0, codegen_1.getProperty)(schemaProp)}`,
                errSchemaPath: `${it.errSchemaPath}/${keyword}/${(0, util_1.escapeFragment)(schemaProp)}`,
            };
    }
    if (schema !== undefined) {
        if (schemaPath === undefined || errSchemaPath === undefined || topSchemaRef === undefined) {
            throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
        }
        return {
            schema,
            schemaPath,
            topSchemaRef,
            errSchemaPath,
        };
    }
    throw new Error('either "keyword" or "schema" must be passed');
}
exports.getSubschema = getSubschema;
function extendSubschemaData(subschema, it, { dataProp, dataPropType: dpType, data, dataTypes, propertyName }) {
    if (data !== undefined && dataProp !== undefined) {
        throw new Error('both "data" and "dataProp" passed, only one allowed');
    }
    const { gen } = it;
    if (dataProp !== undefined) {
        const { errorPath, dataPathArr, opts } = it;
        const nextData = gen.let("data", (0, codegen_1._) `${it.data}${(0, codegen_1.getProperty)(dataProp)}`, true);
        dataContextProps(nextData);
        subschema.errorPath = (0, codegen_1.str) `${errorPath}${(0, util_1.getErrorPath)(dataProp, dpType, opts.jsPropertySyntax)}`;
        subschema.parentDataProperty = (0, codegen_1._) `${dataProp}`;
        subschema.dataPathArr = [...dataPathArr, subschema.parentDataProperty];
    }
    if (data !== undefined) {
        const nextData = data instanceof codegen_1.Name ? data : gen.let("data", data, true); // replaceable if used once?
        dataContextProps(nextData);
        if (propertyName !== undefined)
            subschema.propertyName = propertyName;
        // TODO something is possibly wrong here with not changing parentDataProperty and not appending dataPathArr
    }
    if (dataTypes)
        subschema.dataTypes = dataTypes;
    function dataContextProps(_nextData) {
        subschema.data = _nextData;
        subschema.dataLevel = it.dataLevel + 1;
        subschema.dataTypes = [];
        it.definedProperties = new Set();
        subschema.parentData = it.data;
        subschema.dataNames = [...it.dataNames, _nextData];
    }
}
exports.extendSubschemaData = extendSubschemaData;
function extendSubschemaMode(subschema, { jtdDiscriminator, jtdMetadata, compositeRule, createErrors, allErrors }) {
    if (compositeRule !== undefined)
        subschema.compositeRule = compositeRule;
    if (createErrors !== undefined)
        subschema.createErrors = createErrors;
    if (allErrors !== undefined)
        subschema.allErrors = allErrors;
    subschema.jtdDiscriminator = jtdDiscriminator; // not inherited
    subschema.jtdMetadata = jtdMetadata; // not inherited
}
exports.extendSubschemaMode = extendSubschemaMode;
//# sourceMappingURL=subschema.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/core.js":
/*!***************************************!*\
  !*** ./node_modules/ajv/dist/core.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
var validate_1 = __webpack_require__(/*! ./compile/validate */ "./node_modules/ajv/dist/compile/validate/index.js");
Object.defineProperty(exports, "KeywordCxt", ({ enumerable: true, get: function () { return validate_1.KeywordCxt; } }));
var codegen_1 = __webpack_require__(/*! ./compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
Object.defineProperty(exports, "_", ({ enumerable: true, get: function () { return codegen_1._; } }));
Object.defineProperty(exports, "str", ({ enumerable: true, get: function () { return codegen_1.str; } }));
Object.defineProperty(exports, "stringify", ({ enumerable: true, get: function () { return codegen_1.stringify; } }));
Object.defineProperty(exports, "nil", ({ enumerable: true, get: function () { return codegen_1.nil; } }));
Object.defineProperty(exports, "Name", ({ enumerable: true, get: function () { return codegen_1.Name; } }));
Object.defineProperty(exports, "CodeGen", ({ enumerable: true, get: function () { return codegen_1.CodeGen; } }));
const validation_error_1 = __webpack_require__(/*! ./runtime/validation_error */ "./node_modules/ajv/dist/runtime/validation_error.js");
const ref_error_1 = __webpack_require__(/*! ./compile/ref_error */ "./node_modules/ajv/dist/compile/ref_error.js");
const rules_1 = __webpack_require__(/*! ./compile/rules */ "./node_modules/ajv/dist/compile/rules.js");
const compile_1 = __webpack_require__(/*! ./compile */ "./node_modules/ajv/dist/compile/index.js");
const codegen_2 = __webpack_require__(/*! ./compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const resolve_1 = __webpack_require__(/*! ./compile/resolve */ "./node_modules/ajv/dist/compile/resolve.js");
const dataType_1 = __webpack_require__(/*! ./compile/validate/dataType */ "./node_modules/ajv/dist/compile/validate/dataType.js");
const util_1 = __webpack_require__(/*! ./compile/util */ "./node_modules/ajv/dist/compile/util.js");
const $dataRefSchema = __webpack_require__(/*! ./refs/data.json */ "./node_modules/ajv/dist/refs/data.json");
const uri_1 = __webpack_require__(/*! ./runtime/uri */ "./node_modules/ajv/dist/runtime/uri.js");
const defaultRegExp = (str, flags) => new RegExp(str, flags);
defaultRegExp.code = "new RegExp";
const META_IGNORE_OPTIONS = ["removeAdditional", "useDefaults", "coerceTypes"];
const EXT_SCOPE_NAMES = new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error",
]);
const removedOptions = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now.",
};
const deprecatedOptions = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.',
};
const MAX_EXPRESSION = 200;
// eslint-disable-next-line complexity
function requiredOptions(o) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
    const s = o.strict;
    const _optz = (_a = o.code) === null || _a === void 0 ? void 0 : _a.optimize;
    const optimize = _optz === true || _optz === undefined ? 1 : _optz || 0;
    const regExp = (_c = (_b = o.code) === null || _b === void 0 ? void 0 : _b.regExp) !== null && _c !== void 0 ? _c : defaultRegExp;
    const uriResolver = (_d = o.uriResolver) !== null && _d !== void 0 ? _d : uri_1.default;
    return {
        strictSchema: (_f = (_e = o.strictSchema) !== null && _e !== void 0 ? _e : s) !== null && _f !== void 0 ? _f : true,
        strictNumbers: (_h = (_g = o.strictNumbers) !== null && _g !== void 0 ? _g : s) !== null && _h !== void 0 ? _h : true,
        strictTypes: (_k = (_j = o.strictTypes) !== null && _j !== void 0 ? _j : s) !== null && _k !== void 0 ? _k : "log",
        strictTuples: (_m = (_l = o.strictTuples) !== null && _l !== void 0 ? _l : s) !== null && _m !== void 0 ? _m : "log",
        strictRequired: (_p = (_o = o.strictRequired) !== null && _o !== void 0 ? _o : s) !== null && _p !== void 0 ? _p : false,
        code: o.code ? { ...o.code, optimize, regExp } : { optimize, regExp },
        loopRequired: (_q = o.loopRequired) !== null && _q !== void 0 ? _q : MAX_EXPRESSION,
        loopEnum: (_r = o.loopEnum) !== null && _r !== void 0 ? _r : MAX_EXPRESSION,
        meta: (_s = o.meta) !== null && _s !== void 0 ? _s : true,
        messages: (_t = o.messages) !== null && _t !== void 0 ? _t : true,
        inlineRefs: (_u = o.inlineRefs) !== null && _u !== void 0 ? _u : true,
        schemaId: (_v = o.schemaId) !== null && _v !== void 0 ? _v : "$id",
        addUsedSchema: (_w = o.addUsedSchema) !== null && _w !== void 0 ? _w : true,
        validateSchema: (_x = o.validateSchema) !== null && _x !== void 0 ? _x : true,
        validateFormats: (_y = o.validateFormats) !== null && _y !== void 0 ? _y : true,
        unicodeRegExp: (_z = o.unicodeRegExp) !== null && _z !== void 0 ? _z : true,
        int32range: (_0 = o.int32range) !== null && _0 !== void 0 ? _0 : true,
        uriResolver: uriResolver,
    };
}
class Ajv {
    constructor(opts = {}) {
        this.schemas = {};
        this.refs = {};
        this.formats = {};
        this._compilations = new Set();
        this._loading = {};
        this._cache = new Map();
        opts = this.opts = { ...opts, ...requiredOptions(opts) };
        const { es5, lines } = this.opts.code;
        this.scope = new codegen_2.ValueScope({ scope: {}, prefixes: EXT_SCOPE_NAMES, es5, lines });
        this.logger = getLogger(opts.logger);
        const formatOpt = opts.validateFormats;
        opts.validateFormats = false;
        this.RULES = (0, rules_1.getRules)();
        checkOptions.call(this, removedOptions, opts, "NOT SUPPORTED");
        checkOptions.call(this, deprecatedOptions, opts, "DEPRECATED", "warn");
        this._metaOpts = getMetaSchemaOptions.call(this);
        if (opts.formats)
            addInitialFormats.call(this);
        this._addVocabularies();
        this._addDefaultMetaSchema();
        if (opts.keywords)
            addInitialKeywords.call(this, opts.keywords);
        if (typeof opts.meta == "object")
            this.addMetaSchema(opts.meta);
        addInitialSchemas.call(this);
        opts.validateFormats = formatOpt;
    }
    _addVocabularies() {
        this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
        const { $data, meta, schemaId } = this.opts;
        let _dataRefSchema = $dataRefSchema;
        if (schemaId === "id") {
            _dataRefSchema = { ...$dataRefSchema };
            _dataRefSchema.id = _dataRefSchema.$id;
            delete _dataRefSchema.$id;
        }
        if (meta && $data)
            this.addMetaSchema(_dataRefSchema, _dataRefSchema[schemaId], false);
    }
    defaultMeta() {
        const { meta, schemaId } = this.opts;
        return (this.opts.defaultMeta = typeof meta == "object" ? meta[schemaId] || meta : undefined);
    }
    validate(schemaKeyRef, // key, ref or schema object
    data // to be validated
    ) {
        let v;
        if (typeof schemaKeyRef == "string") {
            v = this.getSchema(schemaKeyRef);
            if (!v)
                throw new Error(`no schema with key or ref "${schemaKeyRef}"`);
        }
        else {
            v = this.compile(schemaKeyRef);
        }
        const valid = v(data);
        if (!("$async" in v))
            this.errors = v.errors;
        return valid;
    }
    compile(schema, _meta) {
        const sch = this._addSchema(schema, _meta);
        return (sch.validate || this._compileSchemaEnv(sch));
    }
    compileAsync(schema, meta) {
        if (typeof this.opts.loadSchema != "function") {
            throw new Error("options.loadSchema should be a function");
        }
        const { loadSchema } = this.opts;
        return runCompileAsync.call(this, schema, meta);
        async function runCompileAsync(_schema, _meta) {
            await loadMetaSchema.call(this, _schema.$schema);
            const sch = this._addSchema(_schema, _meta);
            return sch.validate || _compileAsync.call(this, sch);
        }
        async function loadMetaSchema($ref) {
            if ($ref && !this.getSchema($ref)) {
                await runCompileAsync.call(this, { $ref }, true);
            }
        }
        async function _compileAsync(sch) {
            try {
                return this._compileSchemaEnv(sch);
            }
            catch (e) {
                if (!(e instanceof ref_error_1.default))
                    throw e;
                checkLoaded.call(this, e);
                await loadMissingSchema.call(this, e.missingSchema);
                return _compileAsync.call(this, sch);
            }
        }
        function checkLoaded({ missingSchema: ref, missingRef }) {
            if (this.refs[ref]) {
                throw new Error(`AnySchema ${ref} is loaded but ${missingRef} cannot be resolved`);
            }
        }
        async function loadMissingSchema(ref) {
            const _schema = await _loadSchema.call(this, ref);
            if (!this.refs[ref])
                await loadMetaSchema.call(this, _schema.$schema);
            if (!this.refs[ref])
                this.addSchema(_schema, ref, meta);
        }
        async function _loadSchema(ref) {
            const p = this._loading[ref];
            if (p)
                return p;
            try {
                return await (this._loading[ref] = loadSchema(ref));
            }
            finally {
                delete this._loading[ref];
            }
        }
    }
    // Adds schema to the instance
    addSchema(schema, // If array is passed, `key` will be ignored
    key, // Optional schema key. Can be passed to `validate` method instead of schema object or id/ref. One schema per instance can have empty `id` and `key`.
    _meta, // true if schema is a meta-schema. Used internally, addMetaSchema should be used instead.
    _validateSchema = this.opts.validateSchema // false to skip schema validation. Used internally, option validateSchema should be used instead.
    ) {
        if (Array.isArray(schema)) {
            for (const sch of schema)
                this.addSchema(sch, undefined, _meta, _validateSchema);
            return this;
        }
        let id;
        if (typeof schema === "object") {
            const { schemaId } = this.opts;
            id = schema[schemaId];
            if (id !== undefined && typeof id != "string") {
                throw new Error(`schema ${schemaId} must be string`);
            }
        }
        key = (0, resolve_1.normalizeId)(key || id);
        this._checkUnique(key);
        this.schemas[key] = this._addSchema(schema, _meta, key, _validateSchema, true);
        return this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(schema, key, // schema key
    _validateSchema = this.opts.validateSchema // false to skip schema validation, can be used to override validateSchema option for meta-schema
    ) {
        this.addSchema(schema, key, true, _validateSchema);
        return this;
    }
    //  Validate schema against its meta-schema
    validateSchema(schema, throwOrLogError) {
        if (typeof schema == "boolean")
            return true;
        let $schema;
        $schema = schema.$schema;
        if ($schema !== undefined && typeof $schema != "string") {
            throw new Error("$schema must be a string");
        }
        $schema = $schema || this.opts.defaultMeta || this.defaultMeta();
        if (!$schema) {
            this.logger.warn("meta-schema not available");
            this.errors = null;
            return true;
        }
        const valid = this.validate($schema, schema);
        if (!valid && throwOrLogError) {
            const message = "schema is invalid: " + this.errorsText();
            if (this.opts.validateSchema === "log")
                this.logger.error(message);
            else
                throw new Error(message);
        }
        return valid;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(keyRef) {
        let sch;
        while (typeof (sch = getSchEnv.call(this, keyRef)) == "string")
            keyRef = sch;
        if (sch === undefined) {
            const { schemaId } = this.opts;
            const root = new compile_1.SchemaEnv({ schema: {}, schemaId });
            sch = compile_1.resolveSchema.call(this, root, keyRef);
            if (!sch)
                return;
            this.refs[keyRef] = sch;
        }
        return (sch.validate || this._compileSchemaEnv(sch));
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(schemaKeyRef) {
        if (schemaKeyRef instanceof RegExp) {
            this._removeAllSchemas(this.schemas, schemaKeyRef);
            this._removeAllSchemas(this.refs, schemaKeyRef);
            return this;
        }
        switch (typeof schemaKeyRef) {
            case "undefined":
                this._removeAllSchemas(this.schemas);
                this._removeAllSchemas(this.refs);
                this._cache.clear();
                return this;
            case "string": {
                const sch = getSchEnv.call(this, schemaKeyRef);
                if (typeof sch == "object")
                    this._cache.delete(sch.schema);
                delete this.schemas[schemaKeyRef];
                delete this.refs[schemaKeyRef];
                return this;
            }
            case "object": {
                const cacheKey = schemaKeyRef;
                this._cache.delete(cacheKey);
                let id = schemaKeyRef[this.opts.schemaId];
                if (id) {
                    id = (0, resolve_1.normalizeId)(id);
                    delete this.schemas[id];
                    delete this.refs[id];
                }
                return this;
            }
            default:
                throw new Error("ajv.removeSchema: invalid parameter");
        }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(definitions) {
        for (const def of definitions)
            this.addKeyword(def);
        return this;
    }
    addKeyword(kwdOrDef, def // deprecated
    ) {
        let keyword;
        if (typeof kwdOrDef == "string") {
            keyword = kwdOrDef;
            if (typeof def == "object") {
                this.logger.warn("these parameters are deprecated, see docs for addKeyword");
                def.keyword = keyword;
            }
        }
        else if (typeof kwdOrDef == "object" && def === undefined) {
            def = kwdOrDef;
            keyword = def.keyword;
            if (Array.isArray(keyword) && !keyword.length) {
                throw new Error("addKeywords: keyword must be string or non-empty array");
            }
        }
        else {
            throw new Error("invalid addKeywords parameters");
        }
        checkKeyword.call(this, keyword, def);
        if (!def) {
            (0, util_1.eachItem)(keyword, (kwd) => addRule.call(this, kwd));
            return this;
        }
        keywordMetaschema.call(this, def);
        const definition = {
            ...def,
            type: (0, dataType_1.getJSONTypes)(def.type),
            schemaType: (0, dataType_1.getJSONTypes)(def.schemaType),
        };
        (0, util_1.eachItem)(keyword, definition.type.length === 0
            ? (k) => addRule.call(this, k, definition)
            : (k) => definition.type.forEach((t) => addRule.call(this, k, definition, t)));
        return this;
    }
    getKeyword(keyword) {
        const rule = this.RULES.all[keyword];
        return typeof rule == "object" ? rule.definition : !!rule;
    }
    // Remove keyword
    removeKeyword(keyword) {
        // TODO return type should be Ajv
        const { RULES } = this;
        delete RULES.keywords[keyword];
        delete RULES.all[keyword];
        for (const group of RULES.rules) {
            const i = group.rules.findIndex((rule) => rule.keyword === keyword);
            if (i >= 0)
                group.rules.splice(i, 1);
        }
        return this;
    }
    // Add format
    addFormat(name, format) {
        if (typeof format == "string")
            format = new RegExp(format);
        this.formats[name] = format;
        return this;
    }
    errorsText(errors = this.errors, // optional array of validation errors
    { separator = ", ", dataVar = "data" } = {} // optional options with properties `separator` and `dataVar`
    ) {
        if (!errors || errors.length === 0)
            return "No errors";
        return errors
            .map((e) => `${dataVar}${e.instancePath} ${e.message}`)
            .reduce((text, msg) => text + separator + msg);
    }
    $dataMetaSchema(metaSchema, keywordsJsonPointers) {
        const rules = this.RULES.all;
        metaSchema = JSON.parse(JSON.stringify(metaSchema));
        for (const jsonPointer of keywordsJsonPointers) {
            const segments = jsonPointer.split("/").slice(1); // first segment is an empty string
            let keywords = metaSchema;
            for (const seg of segments)
                keywords = keywords[seg];
            for (const key in rules) {
                const rule = rules[key];
                if (typeof rule != "object")
                    continue;
                const { $data } = rule.definition;
                const schema = keywords[key];
                if ($data && schema)
                    keywords[key] = schemaOrData(schema);
            }
        }
        return metaSchema;
    }
    _removeAllSchemas(schemas, regex) {
        for (const keyRef in schemas) {
            const sch = schemas[keyRef];
            if (!regex || regex.test(keyRef)) {
                if (typeof sch == "string") {
                    delete schemas[keyRef];
                }
                else if (sch && !sch.meta) {
                    this._cache.delete(sch.schema);
                    delete schemas[keyRef];
                }
            }
        }
    }
    _addSchema(schema, meta, baseId, validateSchema = this.opts.validateSchema, addSchema = this.opts.addUsedSchema) {
        let id;
        const { schemaId } = this.opts;
        if (typeof schema == "object") {
            id = schema[schemaId];
        }
        else {
            if (this.opts.jtd)
                throw new Error("schema must be object");
            else if (typeof schema != "boolean")
                throw new Error("schema must be object or boolean");
        }
        let sch = this._cache.get(schema);
        if (sch !== undefined)
            return sch;
        baseId = (0, resolve_1.normalizeId)(id || baseId);
        const localRefs = resolve_1.getSchemaRefs.call(this, schema, baseId);
        sch = new compile_1.SchemaEnv({ schema, schemaId, meta, baseId, localRefs });
        this._cache.set(sch.schema, sch);
        if (addSchema && !baseId.startsWith("#")) {
            // TODO atm it is allowed to overwrite schemas without id (instead of not adding them)
            if (baseId)
                this._checkUnique(baseId);
            this.refs[baseId] = sch;
        }
        if (validateSchema)
            this.validateSchema(schema, true);
        return sch;
    }
    _checkUnique(id) {
        if (this.schemas[id] || this.refs[id]) {
            throw new Error(`schema with key or id "${id}" already exists`);
        }
    }
    _compileSchemaEnv(sch) {
        if (sch.meta)
            this._compileMetaSchema(sch);
        else
            compile_1.compileSchema.call(this, sch);
        /* istanbul ignore if */
        if (!sch.validate)
            throw new Error("ajv implementation error");
        return sch.validate;
    }
    _compileMetaSchema(sch) {
        const currentOpts = this.opts;
        this.opts = this._metaOpts;
        try {
            compile_1.compileSchema.call(this, sch);
        }
        finally {
            this.opts = currentOpts;
        }
    }
}
exports["default"] = Ajv;
Ajv.ValidationError = validation_error_1.default;
Ajv.MissingRefError = ref_error_1.default;
function checkOptions(checkOpts, options, msg, log = "error") {
    for (const key in checkOpts) {
        const opt = key;
        if (opt in options)
            this.logger[log](`${msg}: option ${key}. ${checkOpts[opt]}`);
    }
}
function getSchEnv(keyRef) {
    keyRef = (0, resolve_1.normalizeId)(keyRef); // TODO tests fail without this line
    return this.schemas[keyRef] || this.refs[keyRef];
}
function addInitialSchemas() {
    const optsSchemas = this.opts.schemas;
    if (!optsSchemas)
        return;
    if (Array.isArray(optsSchemas))
        this.addSchema(optsSchemas);
    else
        for (const key in optsSchemas)
            this.addSchema(optsSchemas[key], key);
}
function addInitialFormats() {
    for (const name in this.opts.formats) {
        const format = this.opts.formats[name];
        if (format)
            this.addFormat(name, format);
    }
}
function addInitialKeywords(defs) {
    if (Array.isArray(defs)) {
        this.addVocabulary(defs);
        return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const keyword in defs) {
        const def = defs[keyword];
        if (!def.keyword)
            def.keyword = keyword;
        this.addKeyword(def);
    }
}
function getMetaSchemaOptions() {
    const metaOpts = { ...this.opts };
    for (const opt of META_IGNORE_OPTIONS)
        delete metaOpts[opt];
    return metaOpts;
}
const noLogs = { log() { }, warn() { }, error() { } };
function getLogger(logger) {
    if (logger === false)
        return noLogs;
    if (logger === undefined)
        return console;
    if (logger.log && logger.warn && logger.error)
        return logger;
    throw new Error("logger must implement log, warn and error methods");
}
const KEYWORD_NAME = /^[a-z_$][a-z0-9_$:-]*$/i;
function checkKeyword(keyword, def) {
    const { RULES } = this;
    (0, util_1.eachItem)(keyword, (kwd) => {
        if (RULES.keywords[kwd])
            throw new Error(`Keyword ${kwd} is already defined`);
        if (!KEYWORD_NAME.test(kwd))
            throw new Error(`Keyword ${kwd} has invalid name`);
    });
    if (!def)
        return;
    if (def.$data && !("code" in def || "validate" in def)) {
        throw new Error('$data keyword must have "code" or "validate" function');
    }
}
function addRule(keyword, definition, dataType) {
    var _a;
    const post = definition === null || definition === void 0 ? void 0 : definition.post;
    if (dataType && post)
        throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES } = this;
    let ruleGroup = post ? RULES.post : RULES.rules.find(({ type: t }) => t === dataType);
    if (!ruleGroup) {
        ruleGroup = { type: dataType, rules: [] };
        RULES.rules.push(ruleGroup);
    }
    RULES.keywords[keyword] = true;
    if (!definition)
        return;
    const rule = {
        keyword,
        definition: {
            ...definition,
            type: (0, dataType_1.getJSONTypes)(definition.type),
            schemaType: (0, dataType_1.getJSONTypes)(definition.schemaType),
        },
    };
    if (definition.before)
        addBeforeRule.call(this, ruleGroup, rule, definition.before);
    else
        ruleGroup.rules.push(rule);
    RULES.all[keyword] = rule;
    (_a = definition.implements) === null || _a === void 0 ? void 0 : _a.forEach((kwd) => this.addKeyword(kwd));
}
function addBeforeRule(ruleGroup, rule, before) {
    const i = ruleGroup.rules.findIndex((_rule) => _rule.keyword === before);
    if (i >= 0) {
        ruleGroup.rules.splice(i, 0, rule);
    }
    else {
        ruleGroup.rules.push(rule);
        this.logger.warn(`rule ${before} is not defined`);
    }
}
function keywordMetaschema(def) {
    let { metaSchema } = def;
    if (metaSchema === undefined)
        return;
    if (def.$data && this.opts.$data)
        metaSchema = schemaOrData(metaSchema);
    def.validateSchema = this.compile(metaSchema, true);
}
const $dataRef = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",
};
function schemaOrData(schema) {
    return { anyOf: [schema, $dataRef] };
}
//# sourceMappingURL=core.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/refs/json-schema-2019-09/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/ajv/dist/refs/json-schema-2019-09/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const metaSchema = __webpack_require__(/*! ./schema.json */ "./node_modules/ajv/dist/refs/json-schema-2019-09/schema.json");
const applicator = __webpack_require__(/*! ./meta/applicator.json */ "./node_modules/ajv/dist/refs/json-schema-2019-09/meta/applicator.json");
const content = __webpack_require__(/*! ./meta/content.json */ "./node_modules/ajv/dist/refs/json-schema-2019-09/meta/content.json");
const core = __webpack_require__(/*! ./meta/core.json */ "./node_modules/ajv/dist/refs/json-schema-2019-09/meta/core.json");
const format = __webpack_require__(/*! ./meta/format.json */ "./node_modules/ajv/dist/refs/json-schema-2019-09/meta/format.json");
const metadata = __webpack_require__(/*! ./meta/meta-data.json */ "./node_modules/ajv/dist/refs/json-schema-2019-09/meta/meta-data.json");
const validation = __webpack_require__(/*! ./meta/validation.json */ "./node_modules/ajv/dist/refs/json-schema-2019-09/meta/validation.json");
const META_SUPPORT_DATA = ["/properties"];
function addMetaSchema2019($data) {
    ;
    [
        metaSchema,
        applicator,
        content,
        core,
        with$data(this, format),
        metadata,
        with$data(this, validation),
    ].forEach((sch) => this.addMetaSchema(sch, undefined, false));
    return this;
    function with$data(ajv, sch) {
        return $data ? ajv.$dataMetaSchema(sch, META_SUPPORT_DATA) : sch;
    }
}
exports["default"] = addMetaSchema2019;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/refs/json-schema-2020-12/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/ajv/dist/refs/json-schema-2020-12/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const metaSchema = __webpack_require__(/*! ./schema.json */ "./node_modules/ajv/dist/refs/json-schema-2020-12/schema.json");
const applicator = __webpack_require__(/*! ./meta/applicator.json */ "./node_modules/ajv/dist/refs/json-schema-2020-12/meta/applicator.json");
const unevaluated = __webpack_require__(/*! ./meta/unevaluated.json */ "./node_modules/ajv/dist/refs/json-schema-2020-12/meta/unevaluated.json");
const content = __webpack_require__(/*! ./meta/content.json */ "./node_modules/ajv/dist/refs/json-schema-2020-12/meta/content.json");
const core = __webpack_require__(/*! ./meta/core.json */ "./node_modules/ajv/dist/refs/json-schema-2020-12/meta/core.json");
const format = __webpack_require__(/*! ./meta/format-annotation.json */ "./node_modules/ajv/dist/refs/json-schema-2020-12/meta/format-annotation.json");
const metadata = __webpack_require__(/*! ./meta/meta-data.json */ "./node_modules/ajv/dist/refs/json-schema-2020-12/meta/meta-data.json");
const validation = __webpack_require__(/*! ./meta/validation.json */ "./node_modules/ajv/dist/refs/json-schema-2020-12/meta/validation.json");
const META_SUPPORT_DATA = ["/properties"];
function addMetaSchema2020($data) {
    ;
    [
        metaSchema,
        applicator,
        unevaluated,
        content,
        core,
        with$data(this, format),
        metadata,
        with$data(this, validation),
    ].forEach((sch) => this.addMetaSchema(sch, undefined, false));
    return this;
    function with$data(ajv, sch) {
        return $data ? ajv.$dataMetaSchema(sch, META_SUPPORT_DATA) : sch;
    }
}
exports["default"] = addMetaSchema2020;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/runtime/equal.js":
/*!************************************************!*\
  !*** ./node_modules/ajv/dist/runtime/equal.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
// https://github.com/ajv-validator/ajv/issues/889
const equal = __webpack_require__(/*! fast-deep-equal */ "./node_modules/fast-deep-equal/index.js");
equal.code = 'require("ajv/dist/runtime/equal").default';
exports["default"] = equal;
//# sourceMappingURL=equal.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/runtime/ucs2length.js":
/*!*****************************************************!*\
  !*** ./node_modules/ajv/dist/runtime/ucs2length.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
// https://mathiasbynens.be/notes/javascript-encoding
// https://github.com/bestiejs/punycode.js - punycode.ucs2.decode
function ucs2length(str) {
    const len = str.length;
    let length = 0;
    let pos = 0;
    let value;
    while (pos < len) {
        length++;
        value = str.charCodeAt(pos++);
        if (value >= 0xd800 && value <= 0xdbff && pos < len) {
            // high surrogate, and there is a next character
            value = str.charCodeAt(pos);
            if ((value & 0xfc00) === 0xdc00)
                pos++; // low surrogate
        }
    }
    return length;
}
exports["default"] = ucs2length;
ucs2length.code = 'require("ajv/dist/runtime/ucs2length").default';
//# sourceMappingURL=ucs2length.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/runtime/uri.js":
/*!**********************************************!*\
  !*** ./node_modules/ajv/dist/runtime/uri.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const uri = __webpack_require__(/*! uri-js */ "./node_modules/uri-js/dist/es5/uri.all.js");
uri.code = 'require("ajv/dist/runtime/uri").default';
exports["default"] = uri;
//# sourceMappingURL=uri.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/runtime/validation_error.js":
/*!***********************************************************!*\
  !*** ./node_modules/ajv/dist/runtime/validation_error.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class ValidationError extends Error {
    constructor(errors) {
        super("validation failed");
        this.errors = errors;
        this.ajv = this.validation = true;
    }
}
exports["default"] = ValidationError;
//# sourceMappingURL=validation_error.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/additionalItems.js":
/*!**************************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/additionalItems.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateAdditionalItems = void 0;
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const error = {
    message: ({ params: { len } }) => (0, codegen_1.str) `must NOT have more than ${len} items`,
    params: ({ params: { len } }) => (0, codegen_1._) `{limit: ${len}}`,
};
const def = {
    keyword: "additionalItems",
    type: "array",
    schemaType: ["boolean", "object"],
    before: "uniqueItems",
    error,
    code(cxt) {
        const { parentSchema, it } = cxt;
        const { items } = parentSchema;
        if (!Array.isArray(items)) {
            (0, util_1.checkStrictMode)(it, '"additionalItems" is ignored when "items" is not an array of schemas');
            return;
        }
        validateAdditionalItems(cxt, items);
    },
};
function validateAdditionalItems(cxt, items) {
    const { gen, schema, data, keyword, it } = cxt;
    it.items = true;
    const len = gen.const("len", (0, codegen_1._) `${data}.length`);
    if (schema === false) {
        cxt.setParams({ len: items.length });
        cxt.pass((0, codegen_1._) `${len} <= ${items.length}`);
    }
    else if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
        const valid = gen.var("valid", (0, codegen_1._) `${len} <= ${items.length}`); // TODO var
        gen.if((0, codegen_1.not)(valid), () => validateItems(valid));
        cxt.ok(valid);
    }
    function validateItems(valid) {
        gen.forRange("i", items.length, len, (i) => {
            cxt.subschema({ keyword, dataProp: i, dataPropType: util_1.Type.Num }, valid);
            if (!it.allErrors)
                gen.if((0, codegen_1.not)(valid), () => gen.break());
        });
    }
}
exports.validateAdditionalItems = validateAdditionalItems;
exports["default"] = def;
//# sourceMappingURL=additionalItems.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const names_1 = __webpack_require__(/*! ../../compile/names */ "./node_modules/ajv/dist/compile/names.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const error = {
    message: "must NOT have additional properties",
    params: ({ params }) => (0, codegen_1._) `{additionalProperty: ${params.additionalProperty}}`,
};
const def = {
    keyword: "additionalProperties",
    type: ["object"],
    schemaType: ["boolean", "object"],
    allowUndefined: true,
    trackErrors: true,
    error,
    code(cxt) {
        const { gen, schema, parentSchema, data, errsCount, it } = cxt;
        /* istanbul ignore if */
        if (!errsCount)
            throw new Error("ajv implementation error");
        const { allErrors, opts } = it;
        it.props = true;
        if (opts.removeAdditional !== "all" && (0, util_1.alwaysValidSchema)(it, schema))
            return;
        const props = (0, code_1.allSchemaProperties)(parentSchema.properties);
        const patProps = (0, code_1.allSchemaProperties)(parentSchema.patternProperties);
        checkAdditionalProperties();
        cxt.ok((0, codegen_1._) `${errsCount} === ${names_1.default.errors}`);
        function checkAdditionalProperties() {
            gen.forIn("key", data, (key) => {
                if (!props.length && !patProps.length)
                    additionalPropertyCode(key);
                else
                    gen.if(isAdditional(key), () => additionalPropertyCode(key));
            });
        }
        function isAdditional(key) {
            let definedProp;
            if (props.length > 8) {
                // TODO maybe an option instead of hard-coded 8?
                const propsSchema = (0, util_1.schemaRefOrVal)(it, parentSchema.properties, "properties");
                definedProp = (0, code_1.isOwnProperty)(gen, propsSchema, key);
            }
            else if (props.length) {
                definedProp = (0, codegen_1.or)(...props.map((p) => (0, codegen_1._) `${key} === ${p}`));
            }
            else {
                definedProp = codegen_1.nil;
            }
            if (patProps.length) {
                definedProp = (0, codegen_1.or)(definedProp, ...patProps.map((p) => (0, codegen_1._) `${(0, code_1.usePattern)(cxt, p)}.test(${key})`));
            }
            return (0, codegen_1.not)(definedProp);
        }
        function deleteAdditional(key) {
            gen.code((0, codegen_1._) `delete ${data}[${key}]`);
        }
        function additionalPropertyCode(key) {
            if (opts.removeAdditional === "all" || (opts.removeAdditional && schema === false)) {
                deleteAdditional(key);
                return;
            }
            if (schema === false) {
                cxt.setParams({ additionalProperty: key });
                cxt.error();
                if (!allErrors)
                    gen.break();
                return;
            }
            if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
                const valid = gen.name("valid");
                if (opts.removeAdditional === "failing") {
                    applyAdditionalSchema(key, valid, false);
                    gen.if((0, codegen_1.not)(valid), () => {
                        cxt.reset();
                        deleteAdditional(key);
                    });
                }
                else {
                    applyAdditionalSchema(key, valid);
                    if (!allErrors)
                        gen.if((0, codegen_1.not)(valid), () => gen.break());
                }
            }
        }
        function applyAdditionalSchema(key, valid, errors) {
            const subschema = {
                keyword: "additionalProperties",
                dataProp: key,
                dataPropType: util_1.Type.Str,
            };
            if (errors === false) {
                Object.assign(subschema, {
                    compositeRule: true,
                    createErrors: false,
                    allErrors: false,
                });
            }
            cxt.subschema(subschema, valid);
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=additionalProperties.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/allOf.js":
/*!****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/allOf.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const def = {
    keyword: "allOf",
    schemaType: "array",
    code(cxt) {
        const { gen, schema, it } = cxt;
        /* istanbul ignore if */
        if (!Array.isArray(schema))
            throw new Error("ajv implementation error");
        const valid = gen.name("valid");
        schema.forEach((sch, i) => {
            if ((0, util_1.alwaysValidSchema)(it, sch))
                return;
            const schCxt = cxt.subschema({ keyword: "allOf", schemaProp: i }, valid);
            cxt.ok(valid);
            cxt.mergeEvaluated(schCxt);
        });
    },
};
exports["default"] = def;
//# sourceMappingURL=allOf.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/anyOf.js":
/*!****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/anyOf.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const def = {
    keyword: "anyOf",
    schemaType: "array",
    trackErrors: true,
    code: code_1.validateUnion,
    error: { message: "must match a schema in anyOf" },
};
exports["default"] = def;
//# sourceMappingURL=anyOf.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/contains.js":
/*!*******************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/contains.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const error = {
    message: ({ params: { min, max } }) => max === undefined
        ? (0, codegen_1.str) `must contain at least ${min} valid item(s)`
        : (0, codegen_1.str) `must contain at least ${min} and no more than ${max} valid item(s)`,
    params: ({ params: { min, max } }) => max === undefined ? (0, codegen_1._) `{minContains: ${min}}` : (0, codegen_1._) `{minContains: ${min}, maxContains: ${max}}`,
};
const def = {
    keyword: "contains",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    trackErrors: true,
    error,
    code(cxt) {
        const { gen, schema, parentSchema, data, it } = cxt;
        let min;
        let max;
        const { minContains, maxContains } = parentSchema;
        if (it.opts.next) {
            min = minContains === undefined ? 1 : minContains;
            max = maxContains;
        }
        else {
            min = 1;
        }
        const len = gen.const("len", (0, codegen_1._) `${data}.length`);
        cxt.setParams({ min, max });
        if (max === undefined && min === 0) {
            (0, util_1.checkStrictMode)(it, `"minContains" == 0 without "maxContains": "contains" keyword ignored`);
            return;
        }
        if (max !== undefined && min > max) {
            (0, util_1.checkStrictMode)(it, `"minContains" > "maxContains" is always invalid`);
            cxt.fail();
            return;
        }
        if ((0, util_1.alwaysValidSchema)(it, schema)) {
            let cond = (0, codegen_1._) `${len} >= ${min}`;
            if (max !== undefined)
                cond = (0, codegen_1._) `${cond} && ${len} <= ${max}`;
            cxt.pass(cond);
            return;
        }
        it.items = true;
        const valid = gen.name("valid");
        if (max === undefined && min === 1) {
            validateItems(valid, () => gen.if(valid, () => gen.break()));
        }
        else if (min === 0) {
            gen.let(valid, true);
            if (max !== undefined)
                gen.if((0, codegen_1._) `${data}.length > 0`, validateItemsWithCount);
        }
        else {
            gen.let(valid, false);
            validateItemsWithCount();
        }
        cxt.result(valid, () => cxt.reset());
        function validateItemsWithCount() {
            const schValid = gen.name("_valid");
            const count = gen.let("count", 0);
            validateItems(schValid, () => gen.if(schValid, () => checkLimits(count)));
        }
        function validateItems(_valid, block) {
            gen.forRange("i", 0, len, (i) => {
                cxt.subschema({
                    keyword: "contains",
                    dataProp: i,
                    dataPropType: util_1.Type.Num,
                    compositeRule: true,
                }, _valid);
                block();
            });
        }
        function checkLimits(count) {
            gen.code((0, codegen_1._) `${count}++`);
            if (max === undefined) {
                gen.if((0, codegen_1._) `${count} >= ${min}`, () => gen.assign(valid, true).break());
            }
            else {
                gen.if((0, codegen_1._) `${count} > ${max}`, () => gen.assign(valid, false).break());
                if (min === 1)
                    gen.assign(valid, true);
                else
                    gen.if((0, codegen_1._) `${count} >= ${min}`, () => gen.assign(valid, true));
            }
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=contains.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/dependencies.js":
/*!***********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/dependencies.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateSchemaDeps = exports.validatePropertyDeps = exports.error = void 0;
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
exports.error = {
    message: ({ params: { property, depsCount, deps } }) => {
        const property_ies = depsCount === 1 ? "property" : "properties";
        return (0, codegen_1.str) `must have ${property_ies} ${deps} when property ${property} is present`;
    },
    params: ({ params: { property, depsCount, deps, missingProperty } }) => (0, codegen_1._) `{property: ${property},
    missingProperty: ${missingProperty},
    depsCount: ${depsCount},
    deps: ${deps}}`, // TODO change to reference
};
const def = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: exports.error,
    code(cxt) {
        const [propDeps, schDeps] = splitDependencies(cxt);
        validatePropertyDeps(cxt, propDeps);
        validateSchemaDeps(cxt, schDeps);
    },
};
function splitDependencies({ schema }) {
    const propertyDeps = {};
    const schemaDeps = {};
    for (const key in schema) {
        if (key === "__proto__")
            continue;
        const deps = Array.isArray(schema[key]) ? propertyDeps : schemaDeps;
        deps[key] = schema[key];
    }
    return [propertyDeps, schemaDeps];
}
function validatePropertyDeps(cxt, propertyDeps = cxt.schema) {
    const { gen, data, it } = cxt;
    if (Object.keys(propertyDeps).length === 0)
        return;
    const missing = gen.let("missing");
    for (const prop in propertyDeps) {
        const deps = propertyDeps[prop];
        if (deps.length === 0)
            continue;
        const hasProperty = (0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties);
        cxt.setParams({
            property: prop,
            depsCount: deps.length,
            deps: deps.join(", "),
        });
        if (it.allErrors) {
            gen.if(hasProperty, () => {
                for (const depProp of deps) {
                    (0, code_1.checkReportMissingProp)(cxt, depProp);
                }
            });
        }
        else {
            gen.if((0, codegen_1._) `${hasProperty} && (${(0, code_1.checkMissingProp)(cxt, deps, missing)})`);
            (0, code_1.reportMissingProp)(cxt, missing);
            gen.else();
        }
    }
}
exports.validatePropertyDeps = validatePropertyDeps;
function validateSchemaDeps(cxt, schemaDeps = cxt.schema) {
    const { gen, data, keyword, it } = cxt;
    const valid = gen.name("valid");
    for (const prop in schemaDeps) {
        if ((0, util_1.alwaysValidSchema)(it, schemaDeps[prop]))
            continue;
        gen.if((0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties), () => {
            const schCxt = cxt.subschema({ keyword, schemaProp: prop }, valid);
            cxt.mergeValidEvaluated(schCxt, valid);
        }, () => gen.var(valid, true) // TODO var
        );
        cxt.ok(valid);
    }
}
exports.validateSchemaDeps = validateSchemaDeps;
exports["default"] = def;
//# sourceMappingURL=dependencies.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/dependentSchemas.js":
/*!***************************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/dependentSchemas.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const dependencies_1 = __webpack_require__(/*! ./dependencies */ "./node_modules/ajv/dist/vocabularies/applicator/dependencies.js");
const def = {
    keyword: "dependentSchemas",
    type: "object",
    schemaType: "object",
    code: (cxt) => (0, dependencies_1.validateSchemaDeps)(cxt),
};
exports["default"] = def;
//# sourceMappingURL=dependentSchemas.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/if.js":
/*!*************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/if.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const error = {
    message: ({ params }) => (0, codegen_1.str) `must match "${params.ifClause}" schema`,
    params: ({ params }) => (0, codegen_1._) `{failingKeyword: ${params.ifClause}}`,
};
const def = {
    keyword: "if",
    schemaType: ["object", "boolean"],
    trackErrors: true,
    error,
    code(cxt) {
        const { gen, parentSchema, it } = cxt;
        if (parentSchema.then === undefined && parentSchema.else === undefined) {
            (0, util_1.checkStrictMode)(it, '"if" without "then" and "else" is ignored');
        }
        const hasThen = hasSchema(it, "then");
        const hasElse = hasSchema(it, "else");
        if (!hasThen && !hasElse)
            return;
        const valid = gen.let("valid", true);
        const schValid = gen.name("_valid");
        validateIf();
        cxt.reset();
        if (hasThen && hasElse) {
            const ifClause = gen.let("ifClause");
            cxt.setParams({ ifClause });
            gen.if(schValid, validateClause("then", ifClause), validateClause("else", ifClause));
        }
        else if (hasThen) {
            gen.if(schValid, validateClause("then"));
        }
        else {
            gen.if((0, codegen_1.not)(schValid), validateClause("else"));
        }
        cxt.pass(valid, () => cxt.error(true));
        function validateIf() {
            const schCxt = cxt.subschema({
                keyword: "if",
                compositeRule: true,
                createErrors: false,
                allErrors: false,
            }, schValid);
            cxt.mergeEvaluated(schCxt);
        }
        function validateClause(keyword, ifClause) {
            return () => {
                const schCxt = cxt.subschema({ keyword }, schValid);
                gen.assign(valid, schValid);
                cxt.mergeValidEvaluated(schCxt, valid);
                if (ifClause)
                    gen.assign(ifClause, (0, codegen_1._) `${keyword}`);
                else
                    cxt.setParams({ ifClause: keyword });
            };
        }
    },
};
function hasSchema(it, keyword) {
    const schema = it.schema[keyword];
    return schema !== undefined && !(0, util_1.alwaysValidSchema)(it, schema);
}
exports["default"] = def;
//# sourceMappingURL=if.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const additionalItems_1 = __webpack_require__(/*! ./additionalItems */ "./node_modules/ajv/dist/vocabularies/applicator/additionalItems.js");
const prefixItems_1 = __webpack_require__(/*! ./prefixItems */ "./node_modules/ajv/dist/vocabularies/applicator/prefixItems.js");
const items_1 = __webpack_require__(/*! ./items */ "./node_modules/ajv/dist/vocabularies/applicator/items.js");
const items2020_1 = __webpack_require__(/*! ./items2020 */ "./node_modules/ajv/dist/vocabularies/applicator/items2020.js");
const contains_1 = __webpack_require__(/*! ./contains */ "./node_modules/ajv/dist/vocabularies/applicator/contains.js");
const dependencies_1 = __webpack_require__(/*! ./dependencies */ "./node_modules/ajv/dist/vocabularies/applicator/dependencies.js");
const propertyNames_1 = __webpack_require__(/*! ./propertyNames */ "./node_modules/ajv/dist/vocabularies/applicator/propertyNames.js");
const additionalProperties_1 = __webpack_require__(/*! ./additionalProperties */ "./node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js");
const properties_1 = __webpack_require__(/*! ./properties */ "./node_modules/ajv/dist/vocabularies/applicator/properties.js");
const patternProperties_1 = __webpack_require__(/*! ./patternProperties */ "./node_modules/ajv/dist/vocabularies/applicator/patternProperties.js");
const not_1 = __webpack_require__(/*! ./not */ "./node_modules/ajv/dist/vocabularies/applicator/not.js");
const anyOf_1 = __webpack_require__(/*! ./anyOf */ "./node_modules/ajv/dist/vocabularies/applicator/anyOf.js");
const oneOf_1 = __webpack_require__(/*! ./oneOf */ "./node_modules/ajv/dist/vocabularies/applicator/oneOf.js");
const allOf_1 = __webpack_require__(/*! ./allOf */ "./node_modules/ajv/dist/vocabularies/applicator/allOf.js");
const if_1 = __webpack_require__(/*! ./if */ "./node_modules/ajv/dist/vocabularies/applicator/if.js");
const thenElse_1 = __webpack_require__(/*! ./thenElse */ "./node_modules/ajv/dist/vocabularies/applicator/thenElse.js");
function getApplicator(draft2020 = false) {
    const applicator = [
        // any
        not_1.default,
        anyOf_1.default,
        oneOf_1.default,
        allOf_1.default,
        if_1.default,
        thenElse_1.default,
        // object
        propertyNames_1.default,
        additionalProperties_1.default,
        dependencies_1.default,
        properties_1.default,
        patternProperties_1.default,
    ];
    // array
    if (draft2020)
        applicator.push(prefixItems_1.default, items2020_1.default);
    else
        applicator.push(additionalItems_1.default, items_1.default);
    applicator.push(contains_1.default);
    return applicator;
}
exports["default"] = getApplicator;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/items.js":
/*!****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/items.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateTuple = void 0;
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const def = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "array", "boolean"],
    before: "uniqueItems",
    code(cxt) {
        const { schema, it } = cxt;
        if (Array.isArray(schema))
            return validateTuple(cxt, "additionalItems", schema);
        it.items = true;
        if ((0, util_1.alwaysValidSchema)(it, schema))
            return;
        cxt.ok((0, code_1.validateArray)(cxt));
    },
};
function validateTuple(cxt, extraItems, schArr = cxt.schema) {
    const { gen, parentSchema, data, keyword, it } = cxt;
    checkStrictTuple(parentSchema);
    if (it.opts.unevaluated && schArr.length && it.items !== true) {
        it.items = util_1.mergeEvaluated.items(gen, schArr.length, it.items);
    }
    const valid = gen.name("valid");
    const len = gen.const("len", (0, codegen_1._) `${data}.length`);
    schArr.forEach((sch, i) => {
        if ((0, util_1.alwaysValidSchema)(it, sch))
            return;
        gen.if((0, codegen_1._) `${len} > ${i}`, () => cxt.subschema({
            keyword,
            schemaProp: i,
            dataProp: i,
        }, valid));
        cxt.ok(valid);
    });
    function checkStrictTuple(sch) {
        const { opts, errSchemaPath } = it;
        const l = schArr.length;
        const fullTuple = l === sch.minItems && (l === sch.maxItems || sch[extraItems] === false);
        if (opts.strictTuples && !fullTuple) {
            const msg = `"${keyword}" is ${l}-tuple, but minItems or maxItems/${extraItems} are not specified or different at path "${errSchemaPath}"`;
            (0, util_1.checkStrictMode)(it, msg, opts.strictTuples);
        }
    }
}
exports.validateTuple = validateTuple;
exports["default"] = def;
//# sourceMappingURL=items.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/items2020.js":
/*!********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/items2020.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const additionalItems_1 = __webpack_require__(/*! ./additionalItems */ "./node_modules/ajv/dist/vocabularies/applicator/additionalItems.js");
const error = {
    message: ({ params: { len } }) => (0, codegen_1.str) `must NOT have more than ${len} items`,
    params: ({ params: { len } }) => (0, codegen_1._) `{limit: ${len}}`,
};
const def = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    error,
    code(cxt) {
        const { schema, parentSchema, it } = cxt;
        const { prefixItems } = parentSchema;
        it.items = true;
        if ((0, util_1.alwaysValidSchema)(it, schema))
            return;
        if (prefixItems)
            (0, additionalItems_1.validateAdditionalItems)(cxt, prefixItems);
        else
            cxt.ok((0, code_1.validateArray)(cxt));
    },
};
exports["default"] = def;
//# sourceMappingURL=items2020.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/not.js":
/*!**************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/not.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const def = {
    keyword: "not",
    schemaType: ["object", "boolean"],
    trackErrors: true,
    code(cxt) {
        const { gen, schema, it } = cxt;
        if ((0, util_1.alwaysValidSchema)(it, schema)) {
            cxt.fail();
            return;
        }
        const valid = gen.name("valid");
        cxt.subschema({
            keyword: "not",
            compositeRule: true,
            createErrors: false,
            allErrors: false,
        }, valid);
        cxt.failResult(valid, () => cxt.reset(), () => cxt.error());
    },
    error: { message: "must NOT be valid" },
};
exports["default"] = def;
//# sourceMappingURL=not.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/oneOf.js":
/*!****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/oneOf.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const error = {
    message: "must match exactly one schema in oneOf",
    params: ({ params }) => (0, codegen_1._) `{passingSchemas: ${params.passing}}`,
};
const def = {
    keyword: "oneOf",
    schemaType: "array",
    trackErrors: true,
    error,
    code(cxt) {
        const { gen, schema, parentSchema, it } = cxt;
        /* istanbul ignore if */
        if (!Array.isArray(schema))
            throw new Error("ajv implementation error");
        if (it.opts.discriminator && parentSchema.discriminator)
            return;
        const schArr = schema;
        const valid = gen.let("valid", false);
        const passing = gen.let("passing", null);
        const schValid = gen.name("_valid");
        cxt.setParams({ passing });
        // TODO possibly fail straight away (with warning or exception) if there are two empty always valid schemas
        gen.block(validateOneOf);
        cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
        function validateOneOf() {
            schArr.forEach((sch, i) => {
                let schCxt;
                if ((0, util_1.alwaysValidSchema)(it, sch)) {
                    gen.var(schValid, true);
                }
                else {
                    schCxt = cxt.subschema({
                        keyword: "oneOf",
                        schemaProp: i,
                        compositeRule: true,
                    }, schValid);
                }
                if (i > 0) {
                    gen
                        .if((0, codegen_1._) `${schValid} && ${valid}`)
                        .assign(valid, false)
                        .assign(passing, (0, codegen_1._) `[${passing}, ${i}]`)
                        .else();
                }
                gen.if(schValid, () => {
                    gen.assign(valid, true);
                    gen.assign(passing, i);
                    if (schCxt)
                        cxt.mergeEvaluated(schCxt, codegen_1.Name);
                });
            });
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=oneOf.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/patternProperties.js":
/*!****************************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/patternProperties.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const util_2 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const def = {
    keyword: "patternProperties",
    type: "object",
    schemaType: "object",
    code(cxt) {
        const { gen, schema, data, parentSchema, it } = cxt;
        const { opts } = it;
        const patterns = (0, code_1.allSchemaProperties)(schema);
        const alwaysValidPatterns = patterns.filter((p) => (0, util_1.alwaysValidSchema)(it, schema[p]));
        if (patterns.length === 0 ||
            (alwaysValidPatterns.length === patterns.length &&
                (!it.opts.unevaluated || it.props === true))) {
            return;
        }
        const checkProperties = opts.strictSchema && !opts.allowMatchingProperties && parentSchema.properties;
        const valid = gen.name("valid");
        if (it.props !== true && !(it.props instanceof codegen_1.Name)) {
            it.props = (0, util_2.evaluatedPropsToName)(gen, it.props);
        }
        const { props } = it;
        validatePatternProperties();
        function validatePatternProperties() {
            for (const pat of patterns) {
                if (checkProperties)
                    checkMatchingProperties(pat);
                if (it.allErrors) {
                    validateProperties(pat);
                }
                else {
                    gen.var(valid, true); // TODO var
                    validateProperties(pat);
                    gen.if(valid);
                }
            }
        }
        function checkMatchingProperties(pat) {
            for (const prop in checkProperties) {
                if (new RegExp(pat).test(prop)) {
                    (0, util_1.checkStrictMode)(it, `property ${prop} matches pattern ${pat} (use allowMatchingProperties)`);
                }
            }
        }
        function validateProperties(pat) {
            gen.forIn("key", data, (key) => {
                gen.if((0, codegen_1._) `${(0, code_1.usePattern)(cxt, pat)}.test(${key})`, () => {
                    const alwaysValid = alwaysValidPatterns.includes(pat);
                    if (!alwaysValid) {
                        cxt.subschema({
                            keyword: "patternProperties",
                            schemaProp: pat,
                            dataProp: key,
                            dataPropType: util_2.Type.Str,
                        }, valid);
                    }
                    if (it.opts.unevaluated && props !== true) {
                        gen.assign((0, codegen_1._) `${props}[${key}]`, true);
                    }
                    else if (!alwaysValid && !it.allErrors) {
                        // can short-circuit if `unevaluatedProperties` is not supported (opts.next === false)
                        // or if all properties were evaluated (props === true)
                        gen.if((0, codegen_1.not)(valid), () => gen.break());
                    }
                });
            });
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=patternProperties.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/prefixItems.js":
/*!**********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/prefixItems.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const items_1 = __webpack_require__(/*! ./items */ "./node_modules/ajv/dist/vocabularies/applicator/items.js");
const def = {
    keyword: "prefixItems",
    type: "array",
    schemaType: ["array"],
    before: "uniqueItems",
    code: (cxt) => (0, items_1.validateTuple)(cxt, "items"),
};
exports["default"] = def;
//# sourceMappingURL=prefixItems.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/properties.js":
/*!*********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/properties.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const validate_1 = __webpack_require__(/*! ../../compile/validate */ "./node_modules/ajv/dist/compile/validate/index.js");
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const additionalProperties_1 = __webpack_require__(/*! ./additionalProperties */ "./node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js");
const def = {
    keyword: "properties",
    type: "object",
    schemaType: "object",
    code(cxt) {
        const { gen, schema, parentSchema, data, it } = cxt;
        if (it.opts.removeAdditional === "all" && parentSchema.additionalProperties === undefined) {
            additionalProperties_1.default.code(new validate_1.KeywordCxt(it, additionalProperties_1.default, "additionalProperties"));
        }
        const allProps = (0, code_1.allSchemaProperties)(schema);
        for (const prop of allProps) {
            it.definedProperties.add(prop);
        }
        if (it.opts.unevaluated && allProps.length && it.props !== true) {
            it.props = util_1.mergeEvaluated.props(gen, (0, util_1.toHash)(allProps), it.props);
        }
        const properties = allProps.filter((p) => !(0, util_1.alwaysValidSchema)(it, schema[p]));
        if (properties.length === 0)
            return;
        const valid = gen.name("valid");
        for (const prop of properties) {
            if (hasDefault(prop)) {
                applyPropertySchema(prop);
            }
            else {
                gen.if((0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties));
                applyPropertySchema(prop);
                if (!it.allErrors)
                    gen.else().var(valid, true);
                gen.endIf();
            }
            cxt.it.definedProperties.add(prop);
            cxt.ok(valid);
        }
        function hasDefault(prop) {
            return it.opts.useDefaults && !it.compositeRule && schema[prop].default !== undefined;
        }
        function applyPropertySchema(prop) {
            cxt.subschema({
                keyword: "properties",
                schemaProp: prop,
                dataProp: prop,
            }, valid);
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=properties.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/propertyNames.js":
/*!************************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/propertyNames.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const error = {
    message: "property name must be valid",
    params: ({ params }) => (0, codegen_1._) `{propertyName: ${params.propertyName}}`,
};
const def = {
    keyword: "propertyNames",
    type: "object",
    schemaType: ["object", "boolean"],
    error,
    code(cxt) {
        const { gen, schema, data, it } = cxt;
        if ((0, util_1.alwaysValidSchema)(it, schema))
            return;
        const valid = gen.name("valid");
        gen.forIn("key", data, (key) => {
            cxt.setParams({ propertyName: key });
            cxt.subschema({
                keyword: "propertyNames",
                data: key,
                dataTypes: ["string"],
                propertyName: key,
                compositeRule: true,
            }, valid);
            gen.if((0, codegen_1.not)(valid), () => {
                cxt.error(true);
                if (!it.allErrors)
                    gen.break();
            });
        });
        cxt.ok(valid);
    },
};
exports["default"] = def;
//# sourceMappingURL=propertyNames.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/thenElse.js":
/*!*******************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/thenElse.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const def = {
    keyword: ["then", "else"],
    schemaType: ["object", "boolean"],
    code({ keyword, parentSchema, it }) {
        if (parentSchema.if === undefined)
            (0, util_1.checkStrictMode)(it, `"${keyword}" without "if" is ignored`);
    },
};
exports["default"] = def;
//# sourceMappingURL=thenElse.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/code.js":
/*!****************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/code.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateUnion = exports.validateArray = exports.usePattern = exports.callValidateCode = exports.schemaProperties = exports.allSchemaProperties = exports.noPropertyInData = exports.propertyInData = exports.isOwnProperty = exports.hasPropFunc = exports.reportMissingProp = exports.checkMissingProp = exports.checkReportMissingProp = void 0;
const codegen_1 = __webpack_require__(/*! ../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const names_1 = __webpack_require__(/*! ../compile/names */ "./node_modules/ajv/dist/compile/names.js");
const util_2 = __webpack_require__(/*! ../compile/util */ "./node_modules/ajv/dist/compile/util.js");
function checkReportMissingProp(cxt, prop) {
    const { gen, data, it } = cxt;
    gen.if(noPropertyInData(gen, data, prop, it.opts.ownProperties), () => {
        cxt.setParams({ missingProperty: (0, codegen_1._) `${prop}` }, true);
        cxt.error();
    });
}
exports.checkReportMissingProp = checkReportMissingProp;
function checkMissingProp({ gen, data, it: { opts } }, properties, missing) {
    return (0, codegen_1.or)(...properties.map((prop) => (0, codegen_1.and)(noPropertyInData(gen, data, prop, opts.ownProperties), (0, codegen_1._) `${missing} = ${prop}`)));
}
exports.checkMissingProp = checkMissingProp;
function reportMissingProp(cxt, missing) {
    cxt.setParams({ missingProperty: missing }, true);
    cxt.error();
}
exports.reportMissingProp = reportMissingProp;
function hasPropFunc(gen) {
    return gen.scopeValue("func", {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        ref: Object.prototype.hasOwnProperty,
        code: (0, codegen_1._) `Object.prototype.hasOwnProperty`,
    });
}
exports.hasPropFunc = hasPropFunc;
function isOwnProperty(gen, data, property) {
    return (0, codegen_1._) `${hasPropFunc(gen)}.call(${data}, ${property})`;
}
exports.isOwnProperty = isOwnProperty;
function propertyInData(gen, data, property, ownProperties) {
    const cond = (0, codegen_1._) `${data}${(0, codegen_1.getProperty)(property)} !== undefined`;
    return ownProperties ? (0, codegen_1._) `${cond} && ${isOwnProperty(gen, data, property)}` : cond;
}
exports.propertyInData = propertyInData;
function noPropertyInData(gen, data, property, ownProperties) {
    const cond = (0, codegen_1._) `${data}${(0, codegen_1.getProperty)(property)} === undefined`;
    return ownProperties ? (0, codegen_1.or)(cond, (0, codegen_1.not)(isOwnProperty(gen, data, property))) : cond;
}
exports.noPropertyInData = noPropertyInData;
function allSchemaProperties(schemaMap) {
    return schemaMap ? Object.keys(schemaMap).filter((p) => p !== "__proto__") : [];
}
exports.allSchemaProperties = allSchemaProperties;
function schemaProperties(it, schemaMap) {
    return allSchemaProperties(schemaMap).filter((p) => !(0, util_1.alwaysValidSchema)(it, schemaMap[p]));
}
exports.schemaProperties = schemaProperties;
function callValidateCode({ schemaCode, data, it: { gen, topSchemaRef, schemaPath, errorPath }, it }, func, context, passSchema) {
    const dataAndSchema = passSchema ? (0, codegen_1._) `${schemaCode}, ${data}, ${topSchemaRef}${schemaPath}` : data;
    const valCxt = [
        [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, errorPath)],
        [names_1.default.parentData, it.parentData],
        [names_1.default.parentDataProperty, it.parentDataProperty],
        [names_1.default.rootData, names_1.default.rootData],
    ];
    if (it.opts.dynamicRef)
        valCxt.push([names_1.default.dynamicAnchors, names_1.default.dynamicAnchors]);
    const args = (0, codegen_1._) `${dataAndSchema}, ${gen.object(...valCxt)}`;
    return context !== codegen_1.nil ? (0, codegen_1._) `${func}.call(${context}, ${args})` : (0, codegen_1._) `${func}(${args})`;
}
exports.callValidateCode = callValidateCode;
const newRegExp = (0, codegen_1._) `new RegExp`;
function usePattern({ gen, it: { opts } }, pattern) {
    const u = opts.unicodeRegExp ? "u" : "";
    const { regExp } = opts.code;
    const rx = regExp(pattern, u);
    return gen.scopeValue("pattern", {
        key: rx.toString(),
        ref: rx,
        code: (0, codegen_1._) `${regExp.code === "new RegExp" ? newRegExp : (0, util_2.useFunc)(gen, regExp)}(${pattern}, ${u})`,
    });
}
exports.usePattern = usePattern;
function validateArray(cxt) {
    const { gen, data, keyword, it } = cxt;
    const valid = gen.name("valid");
    if (it.allErrors) {
        const validArr = gen.let("valid", true);
        validateItems(() => gen.assign(validArr, false));
        return validArr;
    }
    gen.var(valid, true);
    validateItems(() => gen.break());
    return valid;
    function validateItems(notValid) {
        const len = gen.const("len", (0, codegen_1._) `${data}.length`);
        gen.forRange("i", 0, len, (i) => {
            cxt.subschema({
                keyword,
                dataProp: i,
                dataPropType: util_1.Type.Num,
            }, valid);
            gen.if((0, codegen_1.not)(valid), notValid);
        });
    }
}
exports.validateArray = validateArray;
function validateUnion(cxt) {
    const { gen, schema, keyword, it } = cxt;
    /* istanbul ignore if */
    if (!Array.isArray(schema))
        throw new Error("ajv implementation error");
    const alwaysValid = schema.some((sch) => (0, util_1.alwaysValidSchema)(it, sch));
    if (alwaysValid && !it.opts.unevaluated)
        return;
    const valid = gen.let("valid", false);
    const schValid = gen.name("_valid");
    gen.block(() => schema.forEach((_sch, i) => {
        const schCxt = cxt.subschema({
            keyword,
            schemaProp: i,
            compositeRule: true,
        }, schValid);
        gen.assign(valid, (0, codegen_1._) `${valid} || ${schValid}`);
        const merged = cxt.mergeValidEvaluated(schCxt, schValid);
        // can short-circuit if `unevaluatedProperties/Items` not supported (opts.unevaluated !== true)
        // or if all properties and items were evaluated (it.props === true && it.items === true)
        if (!merged)
            gen.if((0, codegen_1.not)(valid));
    }));
    cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
}
exports.validateUnion = validateUnion;
//# sourceMappingURL=code.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/core/id.js":
/*!*******************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/core/id.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const def = {
    keyword: "id",
    code() {
        throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
    },
};
exports["default"] = def;
//# sourceMappingURL=id.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/core/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/core/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const id_1 = __webpack_require__(/*! ./id */ "./node_modules/ajv/dist/vocabularies/core/id.js");
const ref_1 = __webpack_require__(/*! ./ref */ "./node_modules/ajv/dist/vocabularies/core/ref.js");
const core = [
    "$schema",
    "$id",
    "$defs",
    "$vocabulary",
    { keyword: "$comment" },
    "definitions",
    id_1.default,
    ref_1.default,
];
exports["default"] = core;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/core/ref.js":
/*!********************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/core/ref.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.callRef = exports.getValidate = void 0;
const ref_error_1 = __webpack_require__(/*! ../../compile/ref_error */ "./node_modules/ajv/dist/compile/ref_error.js");
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const names_1 = __webpack_require__(/*! ../../compile/names */ "./node_modules/ajv/dist/compile/names.js");
const compile_1 = __webpack_require__(/*! ../../compile */ "./node_modules/ajv/dist/compile/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const def = {
    keyword: "$ref",
    schemaType: "string",
    code(cxt) {
        const { gen, schema: $ref, it } = cxt;
        const { baseId, schemaEnv: env, validateName, opts, self } = it;
        const { root } = env;
        if (($ref === "#" || $ref === "#/") && baseId === root.baseId)
            return callRootRef();
        const schOrEnv = compile_1.resolveRef.call(self, root, baseId, $ref);
        if (schOrEnv === undefined)
            throw new ref_error_1.default(it.opts.uriResolver, baseId, $ref);
        if (schOrEnv instanceof compile_1.SchemaEnv)
            return callValidate(schOrEnv);
        return inlineRefSchema(schOrEnv);
        function callRootRef() {
            if (env === root)
                return callRef(cxt, validateName, env, env.$async);
            const rootName = gen.scopeValue("root", { ref: root });
            return callRef(cxt, (0, codegen_1._) `${rootName}.validate`, root, root.$async);
        }
        function callValidate(sch) {
            const v = getValidate(cxt, sch);
            callRef(cxt, v, sch, sch.$async);
        }
        function inlineRefSchema(sch) {
            const schName = gen.scopeValue("schema", opts.code.source === true ? { ref: sch, code: (0, codegen_1.stringify)(sch) } : { ref: sch });
            const valid = gen.name("valid");
            const schCxt = cxt.subschema({
                schema: sch,
                dataTypes: [],
                schemaPath: codegen_1.nil,
                topSchemaRef: schName,
                errSchemaPath: $ref,
            }, valid);
            cxt.mergeEvaluated(schCxt);
            cxt.ok(valid);
        }
    },
};
function getValidate(cxt, sch) {
    const { gen } = cxt;
    return sch.validate
        ? gen.scopeValue("validate", { ref: sch.validate })
        : (0, codegen_1._) `${gen.scopeValue("wrapper", { ref: sch })}.validate`;
}
exports.getValidate = getValidate;
function callRef(cxt, v, sch, $async) {
    const { gen, it } = cxt;
    const { allErrors, schemaEnv: env, opts } = it;
    const passCxt = opts.passContext ? names_1.default.this : codegen_1.nil;
    if ($async)
        callAsyncRef();
    else
        callSyncRef();
    function callAsyncRef() {
        if (!env.$async)
            throw new Error("async schema referenced by sync schema");
        const valid = gen.let("valid");
        gen.try(() => {
            gen.code((0, codegen_1._) `await ${(0, code_1.callValidateCode)(cxt, v, passCxt)}`);
            addEvaluatedFrom(v); // TODO will not work with async, it has to be returned with the result
            if (!allErrors)
                gen.assign(valid, true);
        }, (e) => {
            gen.if((0, codegen_1._) `!(${e} instanceof ${it.ValidationError})`, () => gen.throw(e));
            addErrorsFrom(e);
            if (!allErrors)
                gen.assign(valid, false);
        });
        cxt.ok(valid);
    }
    function callSyncRef() {
        cxt.result((0, code_1.callValidateCode)(cxt, v, passCxt), () => addEvaluatedFrom(v), () => addErrorsFrom(v));
    }
    function addErrorsFrom(source) {
        const errs = (0, codegen_1._) `${source}.errors`;
        gen.assign(names_1.default.vErrors, (0, codegen_1._) `${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`); // TODO tagged
        gen.assign(names_1.default.errors, (0, codegen_1._) `${names_1.default.vErrors}.length`);
    }
    function addEvaluatedFrom(source) {
        var _a;
        if (!it.opts.unevaluated)
            return;
        const schEvaluated = (_a = sch === null || sch === void 0 ? void 0 : sch.validate) === null || _a === void 0 ? void 0 : _a.evaluated;
        // TODO refactor
        if (it.props !== true) {
            if (schEvaluated && !schEvaluated.dynamicProps) {
                if (schEvaluated.props !== undefined) {
                    it.props = util_1.mergeEvaluated.props(gen, schEvaluated.props, it.props);
                }
            }
            else {
                const props = gen.var("props", (0, codegen_1._) `${source}.evaluated.props`);
                it.props = util_1.mergeEvaluated.props(gen, props, it.props, codegen_1.Name);
            }
        }
        if (it.items !== true) {
            if (schEvaluated && !schEvaluated.dynamicItems) {
                if (schEvaluated.items !== undefined) {
                    it.items = util_1.mergeEvaluated.items(gen, schEvaluated.items, it.items);
                }
            }
            else {
                const items = gen.var("items", (0, codegen_1._) `${source}.evaluated.items`);
                it.items = util_1.mergeEvaluated.items(gen, items, it.items, codegen_1.Name);
            }
        }
    }
}
exports.callRef = callRef;
exports["default"] = def;
//# sourceMappingURL=ref.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/discriminator/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/discriminator/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const types_1 = __webpack_require__(/*! ../discriminator/types */ "./node_modules/ajv/dist/vocabularies/discriminator/types.js");
const compile_1 = __webpack_require__(/*! ../../compile */ "./node_modules/ajv/dist/compile/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const error = {
    message: ({ params: { discrError, tagName } }) => discrError === types_1.DiscrError.Tag
        ? `tag "${tagName}" must be string`
        : `value of tag "${tagName}" must be in oneOf`,
    params: ({ params: { discrError, tag, tagName } }) => (0, codegen_1._) `{error: ${discrError}, tag: ${tagName}, tagValue: ${tag}}`,
};
const def = {
    keyword: "discriminator",
    type: "object",
    schemaType: "object",
    error,
    code(cxt) {
        const { gen, data, schema, parentSchema, it } = cxt;
        const { oneOf } = parentSchema;
        if (!it.opts.discriminator) {
            throw new Error("discriminator: requires discriminator option");
        }
        const tagName = schema.propertyName;
        if (typeof tagName != "string")
            throw new Error("discriminator: requires propertyName");
        if (schema.mapping)
            throw new Error("discriminator: mapping is not supported");
        if (!oneOf)
            throw new Error("discriminator: requires oneOf keyword");
        const valid = gen.let("valid", false);
        const tag = gen.const("tag", (0, codegen_1._) `${data}${(0, codegen_1.getProperty)(tagName)}`);
        gen.if((0, codegen_1._) `typeof ${tag} == "string"`, () => validateMapping(), () => cxt.error(false, { discrError: types_1.DiscrError.Tag, tag, tagName }));
        cxt.ok(valid);
        function validateMapping() {
            const mapping = getMapping();
            gen.if(false);
            for (const tagValue in mapping) {
                gen.elseIf((0, codegen_1._) `${tag} === ${tagValue}`);
                gen.assign(valid, applyTagSchema(mapping[tagValue]));
            }
            gen.else();
            cxt.error(false, { discrError: types_1.DiscrError.Mapping, tag, tagName });
            gen.endIf();
        }
        function applyTagSchema(schemaProp) {
            const _valid = gen.name("valid");
            const schCxt = cxt.subschema({ keyword: "oneOf", schemaProp }, _valid);
            cxt.mergeEvaluated(schCxt, codegen_1.Name);
            return _valid;
        }
        function getMapping() {
            var _a;
            const oneOfMapping = {};
            const topRequired = hasRequired(parentSchema);
            let tagRequired = true;
            for (let i = 0; i < oneOf.length; i++) {
                let sch = oneOf[i];
                if ((sch === null || sch === void 0 ? void 0 : sch.$ref) && !(0, util_1.schemaHasRulesButRef)(sch, it.self.RULES)) {
                    sch = compile_1.resolveRef.call(it.self, it.schemaEnv.root, it.baseId, sch === null || sch === void 0 ? void 0 : sch.$ref);
                    if (sch instanceof compile_1.SchemaEnv)
                        sch = sch.schema;
                }
                const propSch = (_a = sch === null || sch === void 0 ? void 0 : sch.properties) === null || _a === void 0 ? void 0 : _a[tagName];
                if (typeof propSch != "object") {
                    throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${tagName}"`);
                }
                tagRequired = tagRequired && (topRequired || hasRequired(sch));
                addMappings(propSch, i);
            }
            if (!tagRequired)
                throw new Error(`discriminator: "${tagName}" must be required`);
            return oneOfMapping;
            function hasRequired({ required }) {
                return Array.isArray(required) && required.includes(tagName);
            }
            function addMappings(sch, i) {
                if (sch.const) {
                    addMapping(sch.const, i);
                }
                else if (sch.enum) {
                    for (const tagValue of sch.enum) {
                        addMapping(tagValue, i);
                    }
                }
                else {
                    throw new Error(`discriminator: "properties/${tagName}" must have "const" or "enum"`);
                }
            }
            function addMapping(tagValue, i) {
                if (typeof tagValue != "string" || tagValue in oneOfMapping) {
                    throw new Error(`discriminator: "${tagName}" values must be unique strings`);
                }
                oneOfMapping[tagValue] = i;
            }
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/discriminator/types.js":
/*!*******************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/discriminator/types.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DiscrError = void 0;
var DiscrError;
(function (DiscrError) {
    DiscrError["Tag"] = "tag";
    DiscrError["Mapping"] = "mapping";
})(DiscrError = exports.DiscrError || (exports.DiscrError = {}));
//# sourceMappingURL=types.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/draft2020.js":
/*!*********************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/draft2020.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! ./core */ "./node_modules/ajv/dist/vocabularies/core/index.js");
const validation_1 = __webpack_require__(/*! ./validation */ "./node_modules/ajv/dist/vocabularies/validation/index.js");
const applicator_1 = __webpack_require__(/*! ./applicator */ "./node_modules/ajv/dist/vocabularies/applicator/index.js");
const dynamic_1 = __webpack_require__(/*! ./dynamic */ "./node_modules/ajv/dist/vocabularies/dynamic/index.js");
const next_1 = __webpack_require__(/*! ./next */ "./node_modules/ajv/dist/vocabularies/next.js");
const unevaluated_1 = __webpack_require__(/*! ./unevaluated */ "./node_modules/ajv/dist/vocabularies/unevaluated/index.js");
const format_1 = __webpack_require__(/*! ./format */ "./node_modules/ajv/dist/vocabularies/format/index.js");
const metadata_1 = __webpack_require__(/*! ./metadata */ "./node_modules/ajv/dist/vocabularies/metadata.js");
const draft2020Vocabularies = [
    dynamic_1.default,
    core_1.default,
    validation_1.default,
    (0, applicator_1.default)(true),
    format_1.default,
    metadata_1.metadataVocabulary,
    metadata_1.contentVocabulary,
    next_1.default,
    unevaluated_1.default,
];
exports["default"] = draft2020Vocabularies;
//# sourceMappingURL=draft2020.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/draft7.js":
/*!******************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/draft7.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! ./core */ "./node_modules/ajv/dist/vocabularies/core/index.js");
const validation_1 = __webpack_require__(/*! ./validation */ "./node_modules/ajv/dist/vocabularies/validation/index.js");
const applicator_1 = __webpack_require__(/*! ./applicator */ "./node_modules/ajv/dist/vocabularies/applicator/index.js");
const format_1 = __webpack_require__(/*! ./format */ "./node_modules/ajv/dist/vocabularies/format/index.js");
const metadata_1 = __webpack_require__(/*! ./metadata */ "./node_modules/ajv/dist/vocabularies/metadata.js");
const draft7Vocabularies = [
    core_1.default,
    validation_1.default,
    (0, applicator_1.default)(),
    format_1.default,
    metadata_1.metadataVocabulary,
    metadata_1.contentVocabulary,
];
exports["default"] = draft7Vocabularies;
//# sourceMappingURL=draft7.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/dynamic/dynamicAnchor.js":
/*!*********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/dynamic/dynamicAnchor.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.dynamicAnchor = void 0;
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const names_1 = __webpack_require__(/*! ../../compile/names */ "./node_modules/ajv/dist/compile/names.js");
const compile_1 = __webpack_require__(/*! ../../compile */ "./node_modules/ajv/dist/compile/index.js");
const ref_1 = __webpack_require__(/*! ../core/ref */ "./node_modules/ajv/dist/vocabularies/core/ref.js");
const def = {
    keyword: "$dynamicAnchor",
    schemaType: "string",
    code: (cxt) => dynamicAnchor(cxt, cxt.schema),
};
function dynamicAnchor(cxt, anchor) {
    const { gen, it } = cxt;
    it.schemaEnv.root.dynamicAnchors[anchor] = true;
    const v = (0, codegen_1._) `${names_1.default.dynamicAnchors}${(0, codegen_1.getProperty)(anchor)}`;
    const validate = it.errSchemaPath === "#" ? it.validateName : _getValidate(cxt);
    gen.if((0, codegen_1._) `!${v}`, () => gen.assign(v, validate));
}
exports.dynamicAnchor = dynamicAnchor;
function _getValidate(cxt) {
    const { schemaEnv, schema, self } = cxt.it;
    const { root, baseId, localRefs, meta } = schemaEnv.root;
    const { schemaId } = self.opts;
    const sch = new compile_1.SchemaEnv({ schema, schemaId, root, baseId, localRefs, meta });
    compile_1.compileSchema.call(self, sch);
    return (0, ref_1.getValidate)(cxt, sch);
}
exports["default"] = def;
//# sourceMappingURL=dynamicAnchor.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/dynamic/dynamicRef.js":
/*!******************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/dynamic/dynamicRef.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.dynamicRef = void 0;
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const names_1 = __webpack_require__(/*! ../../compile/names */ "./node_modules/ajv/dist/compile/names.js");
const ref_1 = __webpack_require__(/*! ../core/ref */ "./node_modules/ajv/dist/vocabularies/core/ref.js");
const def = {
    keyword: "$dynamicRef",
    schemaType: "string",
    code: (cxt) => dynamicRef(cxt, cxt.schema),
};
function dynamicRef(cxt, ref) {
    const { gen, keyword, it } = cxt;
    if (ref[0] !== "#")
        throw new Error(`"${keyword}" only supports hash fragment reference`);
    const anchor = ref.slice(1);
    if (it.allErrors) {
        _dynamicRef();
    }
    else {
        const valid = gen.let("valid", false);
        _dynamicRef(valid);
        cxt.ok(valid);
    }
    function _dynamicRef(valid) {
        // TODO the assumption here is that `recursiveRef: #` always points to the root
        // of the schema object, which is not correct, because there may be $id that
        // makes # point to it, and the target schema may not contain dynamic/recursiveAnchor.
        // Because of that 2 tests in recursiveRef.json fail.
        // This is a similar problem to #815 (`$id` doesn't alter resolution scope for `{ "$ref": "#" }`).
        // (This problem is not tested in JSON-Schema-Test-Suite)
        if (it.schemaEnv.root.dynamicAnchors[anchor]) {
            const v = gen.let("_v", (0, codegen_1._) `${names_1.default.dynamicAnchors}${(0, codegen_1.getProperty)(anchor)}`);
            gen.if(v, _callRef(v, valid), _callRef(it.validateName, valid));
        }
        else {
            _callRef(it.validateName, valid)();
        }
    }
    function _callRef(validate, valid) {
        return valid
            ? () => gen.block(() => {
                (0, ref_1.callRef)(cxt, validate);
                gen.let(valid, true);
            })
            : () => (0, ref_1.callRef)(cxt, validate);
    }
}
exports.dynamicRef = dynamicRef;
exports["default"] = def;
//# sourceMappingURL=dynamicRef.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/dynamic/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/dynamic/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const dynamicAnchor_1 = __webpack_require__(/*! ./dynamicAnchor */ "./node_modules/ajv/dist/vocabularies/dynamic/dynamicAnchor.js");
const dynamicRef_1 = __webpack_require__(/*! ./dynamicRef */ "./node_modules/ajv/dist/vocabularies/dynamic/dynamicRef.js");
const recursiveAnchor_1 = __webpack_require__(/*! ./recursiveAnchor */ "./node_modules/ajv/dist/vocabularies/dynamic/recursiveAnchor.js");
const recursiveRef_1 = __webpack_require__(/*! ./recursiveRef */ "./node_modules/ajv/dist/vocabularies/dynamic/recursiveRef.js");
const dynamic = [dynamicAnchor_1.default, dynamicRef_1.default, recursiveAnchor_1.default, recursiveRef_1.default];
exports["default"] = dynamic;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/dynamic/recursiveAnchor.js":
/*!***********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/dynamic/recursiveAnchor.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const dynamicAnchor_1 = __webpack_require__(/*! ./dynamicAnchor */ "./node_modules/ajv/dist/vocabularies/dynamic/dynamicAnchor.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const def = {
    keyword: "$recursiveAnchor",
    schemaType: "boolean",
    code(cxt) {
        if (cxt.schema)
            (0, dynamicAnchor_1.dynamicAnchor)(cxt, "");
        else
            (0, util_1.checkStrictMode)(cxt.it, "$recursiveAnchor: false is ignored");
    },
};
exports["default"] = def;
//# sourceMappingURL=recursiveAnchor.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/dynamic/recursiveRef.js":
/*!********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/dynamic/recursiveRef.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const dynamicRef_1 = __webpack_require__(/*! ./dynamicRef */ "./node_modules/ajv/dist/vocabularies/dynamic/dynamicRef.js");
const def = {
    keyword: "$recursiveRef",
    schemaType: "string",
    code: (cxt) => (0, dynamicRef_1.dynamicRef)(cxt, cxt.schema),
};
exports["default"] = def;
//# sourceMappingURL=recursiveRef.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/format/format.js":
/*!*************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/format/format.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const error = {
    message: ({ schemaCode }) => (0, codegen_1.str) `must match format "${schemaCode}"`,
    params: ({ schemaCode }) => (0, codegen_1._) `{format: ${schemaCode}}`,
};
const def = {
    keyword: "format",
    type: ["number", "string"],
    schemaType: "string",
    $data: true,
    error,
    code(cxt, ruleType) {
        const { gen, data, $data, schema, schemaCode, it } = cxt;
        const { opts, errSchemaPath, schemaEnv, self } = it;
        if (!opts.validateFormats)
            return;
        if ($data)
            validate$DataFormat();
        else
            validateFormat();
        function validate$DataFormat() {
            const fmts = gen.scopeValue("formats", {
                ref: self.formats,
                code: opts.code.formats,
            });
            const fDef = gen.const("fDef", (0, codegen_1._) `${fmts}[${schemaCode}]`);
            const fType = gen.let("fType");
            const format = gen.let("format");
            // TODO simplify
            gen.if((0, codegen_1._) `typeof ${fDef} == "object" && !(${fDef} instanceof RegExp)`, () => gen.assign(fType, (0, codegen_1._) `${fDef}.type || "string"`).assign(format, (0, codegen_1._) `${fDef}.validate`), () => gen.assign(fType, (0, codegen_1._) `"string"`).assign(format, fDef));
            cxt.fail$data((0, codegen_1.or)(unknownFmt(), invalidFmt()));
            function unknownFmt() {
                if (opts.strictSchema === false)
                    return codegen_1.nil;
                return (0, codegen_1._) `${schemaCode} && !${format}`;
            }
            function invalidFmt() {
                const callFormat = schemaEnv.$async
                    ? (0, codegen_1._) `(${fDef}.async ? await ${format}(${data}) : ${format}(${data}))`
                    : (0, codegen_1._) `${format}(${data})`;
                const validData = (0, codegen_1._) `(typeof ${format} == "function" ? ${callFormat} : ${format}.test(${data}))`;
                return (0, codegen_1._) `${format} && ${format} !== true && ${fType} === ${ruleType} && !${validData}`;
            }
        }
        function validateFormat() {
            const formatDef = self.formats[schema];
            if (!formatDef) {
                unknownFormat();
                return;
            }
            if (formatDef === true)
                return;
            const [fmtType, format, fmtRef] = getFormat(formatDef);
            if (fmtType === ruleType)
                cxt.pass(validCondition());
            function unknownFormat() {
                if (opts.strictSchema === false) {
                    self.logger.warn(unknownMsg());
                    return;
                }
                throw new Error(unknownMsg());
                function unknownMsg() {
                    return `unknown format "${schema}" ignored in schema at path "${errSchemaPath}"`;
                }
            }
            function getFormat(fmtDef) {
                const code = fmtDef instanceof RegExp
                    ? (0, codegen_1.regexpCode)(fmtDef)
                    : opts.code.formats
                        ? (0, codegen_1._) `${opts.code.formats}${(0, codegen_1.getProperty)(schema)}`
                        : undefined;
                const fmt = gen.scopeValue("formats", { key: schema, ref: fmtDef, code });
                if (typeof fmtDef == "object" && !(fmtDef instanceof RegExp)) {
                    return [fmtDef.type || "string", fmtDef.validate, (0, codegen_1._) `${fmt}.validate`];
                }
                return ["string", fmtDef, fmt];
            }
            function validCondition() {
                if (typeof formatDef == "object" && !(formatDef instanceof RegExp) && formatDef.async) {
                    if (!schemaEnv.$async)
                        throw new Error("async format in sync schema");
                    return (0, codegen_1._) `await ${fmtRef}(${data})`;
                }
                return typeof format == "function" ? (0, codegen_1._) `${fmtRef}(${data})` : (0, codegen_1._) `${fmtRef}.test(${data})`;
            }
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=format.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/format/index.js":
/*!************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/format/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const format_1 = __webpack_require__(/*! ./format */ "./node_modules/ajv/dist/vocabularies/format/format.js");
const format = [format_1.default];
exports["default"] = format;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/metadata.js":
/*!********************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/metadata.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.contentVocabulary = exports.metadataVocabulary = void 0;
exports.metadataVocabulary = [
    "title",
    "description",
    "default",
    "deprecated",
    "readOnly",
    "writeOnly",
    "examples",
];
exports.contentVocabulary = [
    "contentMediaType",
    "contentEncoding",
    "contentSchema",
];
//# sourceMappingURL=metadata.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/next.js":
/*!****************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/next.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const dependentRequired_1 = __webpack_require__(/*! ./validation/dependentRequired */ "./node_modules/ajv/dist/vocabularies/validation/dependentRequired.js");
const dependentSchemas_1 = __webpack_require__(/*! ./applicator/dependentSchemas */ "./node_modules/ajv/dist/vocabularies/applicator/dependentSchemas.js");
const limitContains_1 = __webpack_require__(/*! ./validation/limitContains */ "./node_modules/ajv/dist/vocabularies/validation/limitContains.js");
const next = [dependentRequired_1.default, dependentSchemas_1.default, limitContains_1.default];
exports["default"] = next;
//# sourceMappingURL=next.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/unevaluated/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/unevaluated/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const unevaluatedProperties_1 = __webpack_require__(/*! ./unevaluatedProperties */ "./node_modules/ajv/dist/vocabularies/unevaluated/unevaluatedProperties.js");
const unevaluatedItems_1 = __webpack_require__(/*! ./unevaluatedItems */ "./node_modules/ajv/dist/vocabularies/unevaluated/unevaluatedItems.js");
const unevaluated = [unevaluatedProperties_1.default, unevaluatedItems_1.default];
exports["default"] = unevaluated;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/unevaluated/unevaluatedItems.js":
/*!****************************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/unevaluated/unevaluatedItems.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const error = {
    message: ({ params: { len } }) => (0, codegen_1.str) `must NOT have more than ${len} items`,
    params: ({ params: { len } }) => (0, codegen_1._) `{limit: ${len}}`,
};
const def = {
    keyword: "unevaluatedItems",
    type: "array",
    schemaType: ["boolean", "object"],
    error,
    code(cxt) {
        const { gen, schema, data, it } = cxt;
        const items = it.items || 0;
        if (items === true)
            return;
        const len = gen.const("len", (0, codegen_1._) `${data}.length`);
        if (schema === false) {
            cxt.setParams({ len: items });
            cxt.fail((0, codegen_1._) `${len} > ${items}`);
        }
        else if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
            const valid = gen.var("valid", (0, codegen_1._) `${len} <= ${items}`);
            gen.if((0, codegen_1.not)(valid), () => validateItems(valid, items));
            cxt.ok(valid);
        }
        it.items = true;
        function validateItems(valid, from) {
            gen.forRange("i", from, len, (i) => {
                cxt.subschema({ keyword: "unevaluatedItems", dataProp: i, dataPropType: util_1.Type.Num }, valid);
                if (!it.allErrors)
                    gen.if((0, codegen_1.not)(valid), () => gen.break());
            });
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=unevaluatedItems.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/unevaluated/unevaluatedProperties.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/unevaluated/unevaluatedProperties.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const names_1 = __webpack_require__(/*! ../../compile/names */ "./node_modules/ajv/dist/compile/names.js");
const error = {
    message: "must NOT have unevaluated properties",
    params: ({ params }) => (0, codegen_1._) `{unevaluatedProperty: ${params.unevaluatedProperty}}`,
};
const def = {
    keyword: "unevaluatedProperties",
    type: "object",
    schemaType: ["boolean", "object"],
    trackErrors: true,
    error,
    code(cxt) {
        const { gen, schema, data, errsCount, it } = cxt;
        /* istanbul ignore if */
        if (!errsCount)
            throw new Error("ajv implementation error");
        const { allErrors, props } = it;
        if (props instanceof codegen_1.Name) {
            gen.if((0, codegen_1._) `${props} !== true`, () => gen.forIn("key", data, (key) => gen.if(unevaluatedDynamic(props, key), () => unevaluatedPropCode(key))));
        }
        else if (props !== true) {
            gen.forIn("key", data, (key) => props === undefined
                ? unevaluatedPropCode(key)
                : gen.if(unevaluatedStatic(props, key), () => unevaluatedPropCode(key)));
        }
        it.props = true;
        cxt.ok((0, codegen_1._) `${errsCount} === ${names_1.default.errors}`);
        function unevaluatedPropCode(key) {
            if (schema === false) {
                cxt.setParams({ unevaluatedProperty: key });
                cxt.error();
                if (!allErrors)
                    gen.break();
                return;
            }
            if (!(0, util_1.alwaysValidSchema)(it, schema)) {
                const valid = gen.name("valid");
                cxt.subschema({
                    keyword: "unevaluatedProperties",
                    dataProp: key,
                    dataPropType: util_1.Type.Str,
                }, valid);
                if (!allErrors)
                    gen.if((0, codegen_1.not)(valid), () => gen.break());
            }
        }
        function unevaluatedDynamic(evaluatedProps, key) {
            return (0, codegen_1._) `!${evaluatedProps} || !${evaluatedProps}[${key}]`;
        }
        function unevaluatedStatic(evaluatedProps, key) {
            const ps = [];
            for (const p in evaluatedProps) {
                if (evaluatedProps[p] === true)
                    ps.push((0, codegen_1._) `${key} !== ${p}`);
            }
            return (0, codegen_1.and)(...ps);
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=unevaluatedProperties.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/const.js":
/*!****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/const.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const equal_1 = __webpack_require__(/*! ../../runtime/equal */ "./node_modules/ajv/dist/runtime/equal.js");
const error = {
    message: "must be equal to constant",
    params: ({ schemaCode }) => (0, codegen_1._) `{allowedValue: ${schemaCode}}`,
};
const def = {
    keyword: "const",
    $data: true,
    error,
    code(cxt) {
        const { gen, data, $data, schemaCode, schema } = cxt;
        if ($data || (schema && typeof schema == "object")) {
            cxt.fail$data((0, codegen_1._) `!${(0, util_1.useFunc)(gen, equal_1.default)}(${data}, ${schemaCode})`);
        }
        else {
            cxt.fail((0, codegen_1._) `${schema} !== ${data}`);
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=const.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/dependentRequired.js":
/*!****************************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/dependentRequired.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const dependencies_1 = __webpack_require__(/*! ../applicator/dependencies */ "./node_modules/ajv/dist/vocabularies/applicator/dependencies.js");
const def = {
    keyword: "dependentRequired",
    type: "object",
    schemaType: "object",
    error: dependencies_1.error,
    code: (cxt) => (0, dependencies_1.validatePropertyDeps)(cxt),
};
exports["default"] = def;
//# sourceMappingURL=dependentRequired.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/enum.js":
/*!***************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/enum.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const equal_1 = __webpack_require__(/*! ../../runtime/equal */ "./node_modules/ajv/dist/runtime/equal.js");
const error = {
    message: "must be equal to one of the allowed values",
    params: ({ schemaCode }) => (0, codegen_1._) `{allowedValues: ${schemaCode}}`,
};
const def = {
    keyword: "enum",
    schemaType: "array",
    $data: true,
    error,
    code(cxt) {
        const { gen, data, $data, schema, schemaCode, it } = cxt;
        if (!$data && schema.length === 0)
            throw new Error("enum must have non-empty array");
        const useLoop = schema.length >= it.opts.loopEnum;
        let eql;
        const getEql = () => (eql !== null && eql !== void 0 ? eql : (eql = (0, util_1.useFunc)(gen, equal_1.default)));
        let valid;
        if (useLoop || $data) {
            valid = gen.let("valid");
            cxt.block$data(valid, loopEnum);
        }
        else {
            /* istanbul ignore if */
            if (!Array.isArray(schema))
                throw new Error("ajv implementation error");
            const vSchema = gen.const("vSchema", schemaCode);
            valid = (0, codegen_1.or)(...schema.map((_x, i) => equalCode(vSchema, i)));
        }
        cxt.pass(valid);
        function loopEnum() {
            gen.assign(valid, false);
            gen.forOf("v", schemaCode, (v) => gen.if((0, codegen_1._) `${getEql()}(${data}, ${v})`, () => gen.assign(valid, true).break()));
        }
        function equalCode(vSchema, i) {
            const sch = schema[i];
            return typeof sch === "object" && sch !== null
                ? (0, codegen_1._) `${getEql()}(${data}, ${vSchema}[${i}])`
                : (0, codegen_1._) `${data} === ${sch}`;
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=enum.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const limitNumber_1 = __webpack_require__(/*! ./limitNumber */ "./node_modules/ajv/dist/vocabularies/validation/limitNumber.js");
const multipleOf_1 = __webpack_require__(/*! ./multipleOf */ "./node_modules/ajv/dist/vocabularies/validation/multipleOf.js");
const limitLength_1 = __webpack_require__(/*! ./limitLength */ "./node_modules/ajv/dist/vocabularies/validation/limitLength.js");
const pattern_1 = __webpack_require__(/*! ./pattern */ "./node_modules/ajv/dist/vocabularies/validation/pattern.js");
const limitProperties_1 = __webpack_require__(/*! ./limitProperties */ "./node_modules/ajv/dist/vocabularies/validation/limitProperties.js");
const required_1 = __webpack_require__(/*! ./required */ "./node_modules/ajv/dist/vocabularies/validation/required.js");
const limitItems_1 = __webpack_require__(/*! ./limitItems */ "./node_modules/ajv/dist/vocabularies/validation/limitItems.js");
const uniqueItems_1 = __webpack_require__(/*! ./uniqueItems */ "./node_modules/ajv/dist/vocabularies/validation/uniqueItems.js");
const const_1 = __webpack_require__(/*! ./const */ "./node_modules/ajv/dist/vocabularies/validation/const.js");
const enum_1 = __webpack_require__(/*! ./enum */ "./node_modules/ajv/dist/vocabularies/validation/enum.js");
const validation = [
    // number
    limitNumber_1.default,
    multipleOf_1.default,
    // string
    limitLength_1.default,
    pattern_1.default,
    // object
    limitProperties_1.default,
    required_1.default,
    // array
    limitItems_1.default,
    uniqueItems_1.default,
    // any
    { keyword: "type", schemaType: ["string", "array"] },
    { keyword: "nullable", schemaType: "boolean" },
    const_1.default,
    enum_1.default,
];
exports["default"] = validation;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/limitContains.js":
/*!************************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/limitContains.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const def = {
    keyword: ["maxContains", "minContains"],
    type: "array",
    schemaType: "number",
    code({ keyword, parentSchema, it }) {
        if (parentSchema.contains === undefined) {
            (0, util_1.checkStrictMode)(it, `"${keyword}" without "contains" is ignored`);
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=limitContains.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/limitItems.js":
/*!*********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/limitItems.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const error = {
    message({ keyword, schemaCode }) {
        const comp = keyword === "maxItems" ? "more" : "fewer";
        return (0, codegen_1.str) `must NOT have ${comp} than ${schemaCode} items`;
    },
    params: ({ schemaCode }) => (0, codegen_1._) `{limit: ${schemaCode}}`,
};
const def = {
    keyword: ["maxItems", "minItems"],
    type: "array",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        const op = keyword === "maxItems" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data((0, codegen_1._) `${data}.length ${op} ${schemaCode}`);
    },
};
exports["default"] = def;
//# sourceMappingURL=limitItems.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/limitLength.js":
/*!**********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/limitLength.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const ucs2length_1 = __webpack_require__(/*! ../../runtime/ucs2length */ "./node_modules/ajv/dist/runtime/ucs2length.js");
const error = {
    message({ keyword, schemaCode }) {
        const comp = keyword === "maxLength" ? "more" : "fewer";
        return (0, codegen_1.str) `must NOT have ${comp} than ${schemaCode} characters`;
    },
    params: ({ schemaCode }) => (0, codegen_1._) `{limit: ${schemaCode}}`,
};
const def = {
    keyword: ["maxLength", "minLength"],
    type: "string",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { keyword, data, schemaCode, it } = cxt;
        const op = keyword === "maxLength" ? codegen_1.operators.GT : codegen_1.operators.LT;
        const len = it.opts.unicode === false ? (0, codegen_1._) `${data}.length` : (0, codegen_1._) `${(0, util_1.useFunc)(cxt.gen, ucs2length_1.default)}(${data})`;
        cxt.fail$data((0, codegen_1._) `${len} ${op} ${schemaCode}`);
    },
};
exports["default"] = def;
//# sourceMappingURL=limitLength.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/limitNumber.js":
/*!**********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/limitNumber.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const ops = codegen_1.operators;
const KWDs = {
    maximum: { okStr: "<=", ok: ops.LTE, fail: ops.GT },
    minimum: { okStr: ">=", ok: ops.GTE, fail: ops.LT },
    exclusiveMaximum: { okStr: "<", ok: ops.LT, fail: ops.GTE },
    exclusiveMinimum: { okStr: ">", ok: ops.GT, fail: ops.LTE },
};
const error = {
    message: ({ keyword, schemaCode }) => (0, codegen_1.str) `must be ${KWDs[keyword].okStr} ${schemaCode}`,
    params: ({ keyword, schemaCode }) => (0, codegen_1._) `{comparison: ${KWDs[keyword].okStr}, limit: ${schemaCode}}`,
};
const def = {
    keyword: Object.keys(KWDs),
    type: "number",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        cxt.fail$data((0, codegen_1._) `${data} ${KWDs[keyword].fail} ${schemaCode} || isNaN(${data})`);
    },
};
exports["default"] = def;
//# sourceMappingURL=limitNumber.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/limitProperties.js":
/*!**************************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/limitProperties.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const error = {
    message({ keyword, schemaCode }) {
        const comp = keyword === "maxProperties" ? "more" : "fewer";
        return (0, codegen_1.str) `must NOT have ${comp} than ${schemaCode} properties`;
    },
    params: ({ schemaCode }) => (0, codegen_1._) `{limit: ${schemaCode}}`,
};
const def = {
    keyword: ["maxProperties", "minProperties"],
    type: "object",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        const op = keyword === "maxProperties" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data((0, codegen_1._) `Object.keys(${data}).length ${op} ${schemaCode}`);
    },
};
exports["default"] = def;
//# sourceMappingURL=limitProperties.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/multipleOf.js":
/*!*********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/multipleOf.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const error = {
    message: ({ schemaCode }) => (0, codegen_1.str) `must be multiple of ${schemaCode}`,
    params: ({ schemaCode }) => (0, codegen_1._) `{multipleOf: ${schemaCode}}`,
};
const def = {
    keyword: "multipleOf",
    type: "number",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { gen, data, schemaCode, it } = cxt;
        // const bdt = bad$DataType(schemaCode, <string>def.schemaType, $data)
        const prec = it.opts.multipleOfPrecision;
        const res = gen.let("res");
        const invalid = prec
            ? (0, codegen_1._) `Math.abs(Math.round(${res}) - ${res}) > 1e-${prec}`
            : (0, codegen_1._) `${res} !== parseInt(${res})`;
        cxt.fail$data((0, codegen_1._) `(${schemaCode} === 0 || (${res} = ${data}/${schemaCode}, ${invalid}))`);
    },
};
exports["default"] = def;
//# sourceMappingURL=multipleOf.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/pattern.js":
/*!******************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/pattern.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const error = {
    message: ({ schemaCode }) => (0, codegen_1.str) `must match pattern "${schemaCode}"`,
    params: ({ schemaCode }) => (0, codegen_1._) `{pattern: ${schemaCode}}`,
};
const def = {
    keyword: "pattern",
    type: "string",
    schemaType: "string",
    $data: true,
    error,
    code(cxt) {
        const { data, $data, schema, schemaCode, it } = cxt;
        // TODO regexp should be wrapped in try/catchs
        const u = it.opts.unicodeRegExp ? "u" : "";
        const regExp = $data ? (0, codegen_1._) `(new RegExp(${schemaCode}, ${u}))` : (0, code_1.usePattern)(cxt, schema);
        cxt.fail$data((0, codegen_1._) `!${regExp}.test(${data})`);
    },
};
exports["default"] = def;
//# sourceMappingURL=pattern.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/required.js":
/*!*******************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/required.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const error = {
    message: ({ params: { missingProperty } }) => (0, codegen_1.str) `must have required property '${missingProperty}'`,
    params: ({ params: { missingProperty } }) => (0, codegen_1._) `{missingProperty: ${missingProperty}}`,
};
const def = {
    keyword: "required",
    type: "object",
    schemaType: "array",
    $data: true,
    error,
    code(cxt) {
        const { gen, schema, schemaCode, data, $data, it } = cxt;
        const { opts } = it;
        if (!$data && schema.length === 0)
            return;
        const useLoop = schema.length >= opts.loopRequired;
        if (it.allErrors)
            allErrorsMode();
        else
            exitOnErrorMode();
        if (opts.strictRequired) {
            const props = cxt.parentSchema.properties;
            const { definedProperties } = cxt.it;
            for (const requiredKey of schema) {
                if ((props === null || props === void 0 ? void 0 : props[requiredKey]) === undefined && !definedProperties.has(requiredKey)) {
                    const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
                    const msg = `required property "${requiredKey}" is not defined at "${schemaPath}" (strictRequired)`;
                    (0, util_1.checkStrictMode)(it, msg, it.opts.strictRequired);
                }
            }
        }
        function allErrorsMode() {
            if (useLoop || $data) {
                cxt.block$data(codegen_1.nil, loopAllRequired);
            }
            else {
                for (const prop of schema) {
                    (0, code_1.checkReportMissingProp)(cxt, prop);
                }
            }
        }
        function exitOnErrorMode() {
            const missing = gen.let("missing");
            if (useLoop || $data) {
                const valid = gen.let("valid", true);
                cxt.block$data(valid, () => loopUntilMissing(missing, valid));
                cxt.ok(valid);
            }
            else {
                gen.if((0, code_1.checkMissingProp)(cxt, schema, missing));
                (0, code_1.reportMissingProp)(cxt, missing);
                gen.else();
            }
        }
        function loopAllRequired() {
            gen.forOf("prop", schemaCode, (prop) => {
                cxt.setParams({ missingProperty: prop });
                gen.if((0, code_1.noPropertyInData)(gen, data, prop, opts.ownProperties), () => cxt.error());
            });
        }
        function loopUntilMissing(missing, valid) {
            cxt.setParams({ missingProperty: missing });
            gen.forOf(missing, schemaCode, () => {
                gen.assign(valid, (0, code_1.propertyInData)(gen, data, missing, opts.ownProperties));
                gen.if((0, codegen_1.not)(valid), () => {
                    cxt.error();
                    gen.break();
                });
            }, codegen_1.nil);
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=required.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/uniqueItems.js":
/*!**********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/uniqueItems.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const dataType_1 = __webpack_require__(/*! ../../compile/validate/dataType */ "./node_modules/ajv/dist/compile/validate/dataType.js");
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const equal_1 = __webpack_require__(/*! ../../runtime/equal */ "./node_modules/ajv/dist/runtime/equal.js");
const error = {
    message: ({ params: { i, j } }) => (0, codegen_1.str) `must NOT have duplicate items (items ## ${j} and ${i} are identical)`,
    params: ({ params: { i, j } }) => (0, codegen_1._) `{i: ${i}, j: ${j}}`,
};
const def = {
    keyword: "uniqueItems",
    type: "array",
    schemaType: "boolean",
    $data: true,
    error,
    code(cxt) {
        const { gen, data, $data, schema, parentSchema, schemaCode, it } = cxt;
        if (!$data && !schema)
            return;
        const valid = gen.let("valid");
        const itemTypes = parentSchema.items ? (0, dataType_1.getSchemaTypes)(parentSchema.items) : [];
        cxt.block$data(valid, validateUniqueItems, (0, codegen_1._) `${schemaCode} === false`);
        cxt.ok(valid);
        function validateUniqueItems() {
            const i = gen.let("i", (0, codegen_1._) `${data}.length`);
            const j = gen.let("j");
            cxt.setParams({ i, j });
            gen.assign(valid, true);
            gen.if((0, codegen_1._) `${i} > 1`, () => (canOptimize() ? loopN : loopN2)(i, j));
        }
        function canOptimize() {
            return itemTypes.length > 0 && !itemTypes.some((t) => t === "object" || t === "array");
        }
        function loopN(i, j) {
            const item = gen.name("item");
            const wrongType = (0, dataType_1.checkDataTypes)(itemTypes, item, it.opts.strictNumbers, dataType_1.DataType.Wrong);
            const indices = gen.const("indices", (0, codegen_1._) `{}`);
            gen.for((0, codegen_1._) `;${i}--;`, () => {
                gen.let(item, (0, codegen_1._) `${data}[${i}]`);
                gen.if(wrongType, (0, codegen_1._) `continue`);
                if (itemTypes.length > 1)
                    gen.if((0, codegen_1._) `typeof ${item} == "string"`, (0, codegen_1._) `${item} += "_"`);
                gen
                    .if((0, codegen_1._) `typeof ${indices}[${item}] == "number"`, () => {
                    gen.assign(j, (0, codegen_1._) `${indices}[${item}]`);
                    cxt.error();
                    gen.assign(valid, false).break();
                })
                    .code((0, codegen_1._) `${indices}[${item}] = ${i}`);
            });
        }
        function loopN2(i, j) {
            const eql = (0, util_1.useFunc)(gen, equal_1.default);
            const outer = gen.name("outer");
            gen.label(outer).for((0, codegen_1._) `;${i}--;`, () => gen.for((0, codegen_1._) `${j} = ${i}; ${j}--;`, () => gen.if((0, codegen_1._) `${eql}(${data}[${i}], ${data}[${j}])`, () => {
                cxt.error();
                gen.assign(valid, false).break(outer);
            })));
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=uniqueItems.js.map

/***/ }),

/***/ "./node_modules/call-bind/callBound.js":
/*!*********************************************!*\
  !*** ./node_modules/call-bind/callBound.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var callBind = __webpack_require__(/*! ./ */ "./node_modules/call-bind/index.js");

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};


/***/ }),

/***/ "./node_modules/call-bind/index.js":
/*!*****************************************!*\
  !*** ./node_modules/call-bind/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");
var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
var $max = GetIntrinsic('%Math.max%');

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

module.exports = function callBind(originalFunction) {
	var func = $reflectApply(bind, $call, arguments);
	if ($gOPD && $defineProperty) {
		var desc = $gOPD(func, 'length');
		if (desc.configurable) {
			// original length, plus the receiver, minus any additional arguments (after the receiver)
			$defineProperty(
				func,
				'length',
				{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
			);
		}
	}
	return func;
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}


/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ "./node_modules/fast-deep-equal/index.js":
/*!***********************************************!*\
  !*** ./node_modules/fast-deep-equal/index.js ***!
  \***********************************************/
/***/ ((module) => {

"use strict";


// do not edit .js files directly - edit src/index.jst



module.exports = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }



    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      var key = keys[i];

      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a!==a && b!==b;
};


/***/ }),

/***/ "./node_modules/for-each/index.js":
/*!****************************************!*\
  !*** ./node_modules/for-each/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isCallable = __webpack_require__(/*! is-callable */ "./node_modules/is-callable/index.js");

var toStr = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

var forEachArray = function forEachArray(array, iterator, receiver) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            if (receiver == null) {
                iterator(array[i], i, array);
            } else {
                iterator.call(receiver, array[i], i, array);
            }
        }
    }
};

var forEachString = function forEachString(string, iterator, receiver) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        if (receiver == null) {
            iterator(string.charAt(i), i, string);
        } else {
            iterator.call(receiver, string.charAt(i), i, string);
        }
    }
};

var forEachObject = function forEachObject(object, iterator, receiver) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            if (receiver == null) {
                iterator(object[k], k, object);
            } else {
                iterator.call(receiver, object[k], k, object);
            }
        }
    }
};

var forEach = function forEach(list, iterator, thisArg) {
    if (!isCallable(iterator)) {
        throw new TypeError('iterator must be a function');
    }

    var receiver;
    if (arguments.length >= 3) {
        receiver = thisArg;
    }

    if (toStr.call(list) === '[object Array]') {
        forEachArray(list, iterator, receiver);
    } else if (typeof list === 'string') {
        forEachString(list, iterator, receiver);
    } else {
        forEachObject(list, iterator, receiver);
    }
};

module.exports = forEach;


/***/ }),

/***/ "./node_modules/function-bind/implementation.js":
/*!******************************************************!*\
  !*** ./node_modules/function-bind/implementation.js ***!
  \******************************************************/
/***/ ((module) => {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),

/***/ "./node_modules/function-bind/index.js":
/*!*********************************************!*\
  !*** ./node_modules/function-bind/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/function-bind/implementation.js");

module.exports = Function.prototype.bind || implementation;


/***/ }),

/***/ "./node_modules/get-intrinsic/index.js":
/*!*********************************************!*\
  !*** ./node_modules/get-intrinsic/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var undefined;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = __webpack_require__(/*! has-symbols */ "./node_modules/has-symbols/index.js")();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");
var hasOwn = __webpack_require__(/*! has */ "./node_modules/has/src/index.js");
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);
var $exec = bind.call(Function.call, RegExp.prototype.exec);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	if ($exec(/^%?[^%]*%?$/, name) === null) {
		throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
	}
	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};


/***/ }),

/***/ "./node_modules/gopd/index.js":
/*!************************************!*\
  !*** ./node_modules/gopd/index.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);

if ($gOPD) {
	try {
		$gOPD([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD = null;
	}
}

module.exports = $gOPD;


/***/ }),

/***/ "./node_modules/has-symbols/index.js":
/*!*******************************************!*\
  !*** ./node_modules/has-symbols/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = __webpack_require__(/*! ./shams */ "./node_modules/has-symbols/shams.js");

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};


/***/ }),

/***/ "./node_modules/has-symbols/shams.js":
/*!*******************************************!*\
  !*** ./node_modules/has-symbols/shams.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";


/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};


/***/ }),

/***/ "./node_modules/has-tostringtag/shams.js":
/*!***********************************************!*\
  !*** ./node_modules/has-tostringtag/shams.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var hasSymbols = __webpack_require__(/*! has-symbols/shams */ "./node_modules/has-symbols/shams.js");

module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};


/***/ }),

/***/ "./node_modules/has/src/index.js":
/*!***************************************!*\
  !*** ./node_modules/has/src/index.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);


/***/ }),

/***/ "./node_modules/inherits/inherits_browser.js":
/*!***************************************************!*\
  !*** ./node_modules/inherits/inherits_browser.js ***!
  \***************************************************/
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ "./node_modules/is-arguments/index.js":
/*!********************************************!*\
  !*** ./node_modules/is-arguments/index.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");

var $toString = callBound('Object.prototype.toString');

var isStandardArguments = function isArguments(value) {
	if (hasToStringTag && value && typeof value === 'object' && Symbol.toStringTag in value) {
		return false;
	}
	return $toString(value) === '[object Arguments]';
};

var isLegacyArguments = function isArguments(value) {
	if (isStandardArguments(value)) {
		return true;
	}
	return value !== null &&
		typeof value === 'object' &&
		typeof value.length === 'number' &&
		value.length >= 0 &&
		$toString(value) !== '[object Array]' &&
		$toString(value.callee) === '[object Function]';
};

var supportsStandardArguments = (function () {
	return isStandardArguments(arguments);
}());

isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;


/***/ }),

/***/ "./node_modules/is-callable/index.js":
/*!*******************************************!*\
  !*** ./node_modules/is-callable/index.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";


var fnToStr = Function.prototype.toString;
var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;
if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
	try {
		badArrayLike = Object.defineProperty({}, 'length', {
			get: function () {
				throw isCallableMarker;
			}
		});
		isCallableMarker = {};
		// eslint-disable-next-line no-throw-literal
		reflectApply(function () { throw 42; }, null, badArrayLike);
	} catch (_) {
		if (_ !== isCallableMarker) {
			reflectApply = null;
		}
	}
} else {
	reflectApply = null;
}

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var objectClass = '[object Object]';
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var ddaClass = '[object HTMLAllCollection]'; // IE 11
var ddaClass2 = '[object HTML document.all class]';
var ddaClass3 = '[object HTMLCollection]'; // IE 9-10
var hasToStringTag = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`

var isIE68 = !(0 in [,]); // eslint-disable-line no-sparse-arrays, comma-spacing

var isDDA = function isDocumentDotAll() { return false; };
if (typeof document === 'object') {
	// Firefox 3 canonicalizes DDA to undefined when it's not accessed directly
	var all = document.all;
	if (toStr.call(all) === toStr.call(document.all)) {
		isDDA = function isDocumentDotAll(value) {
			/* globals document: false */
			// in IE 6-8, typeof document.all is "object" and it's truthy
			if ((isIE68 || !value) && (typeof value === 'undefined' || typeof value === 'object')) {
				try {
					var str = toStr.call(value);
					return (
						str === ddaClass
						|| str === ddaClass2
						|| str === ddaClass3 // opera 12.16
						|| str === objectClass // IE 6-8
					) && value('') == null; // eslint-disable-line eqeqeq
				} catch (e) { /**/ }
			}
			return false;
		};
	}
}

module.exports = reflectApply
	? function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) { return false; }
		}
		return !isES6ClassFn(value) && tryFunctionObject(value);
	}
	: function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr.call(value);
		if (strClass !== fnClass && strClass !== genClass && !(/^\[object HTML/).test(strClass)) { return false; }
		return tryFunctionObject(value);
	};


/***/ }),

/***/ "./node_modules/is-generator-function/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/is-generator-function/index.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var toStr = Object.prototype.toString;
var fnToStr = Function.prototype.toString;
var isFnRegex = /^\s*(?:function)?\*/;
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();
var getProto = Object.getPrototypeOf;
var getGeneratorFunc = function () { // eslint-disable-line consistent-return
	if (!hasToStringTag) {
		return false;
	}
	try {
		return Function('return function*() {}')();
	} catch (e) {
	}
};
var GeneratorFunction;

module.exports = function isGeneratorFunction(fn) {
	if (typeof fn !== 'function') {
		return false;
	}
	if (isFnRegex.test(fnToStr.call(fn))) {
		return true;
	}
	if (!hasToStringTag) {
		var str = toStr.call(fn);
		return str === '[object GeneratorFunction]';
	}
	if (!getProto) {
		return false;
	}
	if (typeof GeneratorFunction === 'undefined') {
		var generatorFunc = getGeneratorFunc();
		GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
	}
	return getProto(fn) === GeneratorFunction;
};


/***/ }),

/***/ "./node_modules/is-typed-array/index.js":
/*!**********************************************!*\
  !*** ./node_modules/is-typed-array/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var forEach = __webpack_require__(/*! for-each */ "./node_modules/for-each/index.js");
var availableTypedArrays = __webpack_require__(/*! available-typed-arrays */ "./node_modules/available-typed-arrays/index.js");
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");

var $toString = callBound('Object.prototype.toString');
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();
var gOPD = __webpack_require__(/*! gopd */ "./node_modules/gopd/index.js");

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;
var typedArrays = availableTypedArrays();

var $indexOf = callBound('Array.prototype.indexOf', true) || function indexOf(array, value) {
	for (var i = 0; i < array.length; i += 1) {
		if (array[i] === value) {
			return i;
		}
	}
	return -1;
};
var $slice = callBound('String.prototype.slice');
var toStrTags = {};
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		var arr = new g[typedArray]();
		if (Symbol.toStringTag in arr) {
			var proto = getPrototypeOf(arr);
			var descriptor = gOPD(proto, Symbol.toStringTag);
			if (!descriptor) {
				var superProto = getPrototypeOf(proto);
				descriptor = gOPD(superProto, Symbol.toStringTag);
			}
			toStrTags[typedArray] = descriptor.get;
		}
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	var anyTrue = false;
	forEach(toStrTags, function (getter, typedArray) {
		if (!anyTrue) {
			try {
				anyTrue = getter.call(value) === typedArray;
			} catch (e) { /**/ }
		}
	});
	return anyTrue;
};

module.exports = function isTypedArray(value) {
	if (!value || typeof value !== 'object') { return false; }
	if (!hasToStringTag || !(Symbol.toStringTag in value)) {
		var tag = $slice($toString(value), 8, -1);
		return $indexOf(typedArrays, tag) > -1;
	}
	if (!gOPD) { return false; }
	return tryTypedArrays(value);
};


/***/ }),

/***/ "./node_modules/json-schema-traverse/index.js":
/*!****************************************************!*\
  !*** ./node_modules/json-schema-traverse/index.js ***!
  \****************************************************/
/***/ ((module) => {

"use strict";


var traverse = module.exports = function (schema, opts, cb) {
  // Legacy support for v0.3.1 and earlier.
  if (typeof opts == 'function') {
    cb = opts;
    opts = {};
  }

  cb = opts.cb || cb;
  var pre = (typeof cb == 'function') ? cb : cb.pre || function() {};
  var post = cb.post || function() {};

  _traverse(opts, pre, post, schema, '', schema);
};


traverse.keywords = {
  additionalItems: true,
  items: true,
  contains: true,
  additionalProperties: true,
  propertyNames: true,
  not: true,
  if: true,
  then: true,
  else: true
};

traverse.arrayKeywords = {
  items: true,
  allOf: true,
  anyOf: true,
  oneOf: true
};

traverse.propsKeywords = {
  $defs: true,
  definitions: true,
  properties: true,
  patternProperties: true,
  dependencies: true
};

traverse.skipKeywords = {
  default: true,
  enum: true,
  const: true,
  required: true,
  maximum: true,
  minimum: true,
  exclusiveMaximum: true,
  exclusiveMinimum: true,
  multipleOf: true,
  maxLength: true,
  minLength: true,
  pattern: true,
  format: true,
  maxItems: true,
  minItems: true,
  uniqueItems: true,
  maxProperties: true,
  minProperties: true
};


function _traverse(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
  if (schema && typeof schema == 'object' && !Array.isArray(schema)) {
    pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
    for (var key in schema) {
      var sch = schema[key];
      if (Array.isArray(sch)) {
        if (key in traverse.arrayKeywords) {
          for (var i=0; i<sch.length; i++)
            _traverse(opts, pre, post, sch[i], jsonPtr + '/' + key + '/' + i, rootSchema, jsonPtr, key, schema, i);
        }
      } else if (key in traverse.propsKeywords) {
        if (sch && typeof sch == 'object') {
          for (var prop in sch)
            _traverse(opts, pre, post, sch[prop], jsonPtr + '/' + key + '/' + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
        }
      } else if (key in traverse.keywords || (opts.allKeys && !(key in traverse.skipKeywords))) {
        _traverse(opts, pre, post, sch, jsonPtr + '/' + key, rootSchema, jsonPtr, key, schema);
      }
    }
    post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
  }
}


function escapeJsonPtr(str) {
  return str.replace(/~/g, '~0').replace(/\//g, '~1');
}


/***/ }),

/***/ "./node_modules/klona/json/index.js":
/*!******************************************!*\
  !*** ./node_modules/klona/json/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {

function klona(val) {
	var k, out, tmp;

	if (Array.isArray(val)) {
		out = Array(k=val.length);
		while (k--) out[k] = (tmp=val[k]) && typeof tmp === 'object' ? klona(tmp) : tmp;
		return out;
	}

	if (Object.prototype.toString.call(val) === '[object Object]') {
		out = {}; // null
		for (k in val) {
			if (k === '__proto__') {
				Object.defineProperty(out, k, {
					value: klona(val[k]),
					configurable: true,
					enumerable: true,
					writable: true,
				});
			} else {
				out[k] = (tmp=val[k]) && typeof tmp === 'object' ? klona(tmp) : tmp;
			}
		}
		return out;
	}

	return val;
}

exports.klona = klona;

/***/ }),

/***/ "./node_modules/object-path/index.js":
/*!*******************************************!*\
  !*** ./node_modules/object-path/index.js ***!
  \*******************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
  'use strict'

  /*istanbul ignore next:cant test*/
  if ( true && typeof module.exports === 'object') {
    module.exports = factory()
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
  } else {}
})(this, function () {
  'use strict'

  var toStr = Object.prototype.toString

  function hasOwnProperty (obj, prop) {
    if (obj == null) {
      return false
    }
    //to handle objects with null prototypes (too edge case?)
    return Object.prototype.hasOwnProperty.call(obj, prop)
  }

  function isEmpty (value) {
    if (!value) {
      return true
    }
    if (isArray(value) && value.length === 0) {
      return true
    } else if (typeof value !== 'string') {
      for (var i in value) {
        if (hasOwnProperty(value, i)) {
          return false
        }
      }
      return true
    }
    return false
  }

  function toString (type) {
    return toStr.call(type)
  }

  function isObject (obj) {
    return typeof obj === 'object' && toString(obj) === '[object Object]'
  }

  var isArray = Array.isArray || function (obj) {
    /*istanbul ignore next:cant test*/
    return toStr.call(obj) === '[object Array]'
  }

  function isBoolean (obj) {
    return typeof obj === 'boolean' || toString(obj) === '[object Boolean]'
  }

  function getKey (key) {
    var intKey = parseInt(key)
    if (intKey.toString() === key) {
      return intKey
    }
    return key
  }

  function factory (options) {
    options = options || {}

    var objectPath = function (obj) {
      return Object.keys(objectPath).reduce(function (proxy, prop) {
        if (prop === 'create') {
          return proxy
        }

        /*istanbul ignore else*/
        if (typeof objectPath[prop] === 'function') {
          proxy[prop] = objectPath[prop].bind(objectPath, obj)
        }

        return proxy
      }, {})
    }

    var hasShallowProperty
    if (options.includeInheritedProps) {
      hasShallowProperty = function () {
        return true
      }
    } else {
      hasShallowProperty = function (obj, prop) {
        return (typeof prop === 'number' && Array.isArray(obj)) || hasOwnProperty(obj, prop)
      }
    }

    function getShallowProperty (obj, prop) {
      if (hasShallowProperty(obj, prop)) {
        return obj[prop]
      }
    }

    var getShallowPropertySafely
    if (options.includeInheritedProps) {
      getShallowPropertySafely = function (obj, currentPath) {
        if (typeof currentPath !== 'string' && typeof currentPath !== 'number') {
          currentPath = String(currentPath)
        }
        var currentValue = getShallowProperty(obj, currentPath)
        if (currentPath === '__proto__' || currentPath === 'prototype' ||
          (currentPath === 'constructor' && typeof currentValue === 'function')) {
          throw new Error('For security reasons, object\'s magic properties cannot be set')
        }
        return currentValue
      }
    } else {
      getShallowPropertySafely = function (obj, currentPath) {
        return getShallowProperty(obj, currentPath)
      }
    }

    function set (obj, path, value, doNotReplace) {
      if (typeof path === 'number') {
        path = [path]
      }
      if (!path || path.length === 0) {
        return obj
      }
      if (typeof path === 'string') {
        return set(obj, path.split('.').map(getKey), value, doNotReplace)
      }
      var currentPath = path[0]
      var currentValue = getShallowPropertySafely(obj, currentPath)
      if (path.length === 1) {
        if (currentValue === void 0 || !doNotReplace) {
          obj[currentPath] = value
        }
        return currentValue
      }

      if (currentValue === void 0) {
        //check if we assume an array
        if (typeof path[1] === 'number') {
          obj[currentPath] = []
        } else {
          obj[currentPath] = {}
        }
      }

      return set(obj[currentPath], path.slice(1), value, doNotReplace)
    }

    objectPath.has = function (obj, path) {
      if (typeof path === 'number') {
        path = [path]
      } else if (typeof path === 'string') {
        path = path.split('.')
      }

      if (!path || path.length === 0) {
        return !!obj
      }

      for (var i = 0; i < path.length; i++) {
        var j = getKey(path[i])

        if ((typeof j === 'number' && isArray(obj) && j < obj.length) ||
          (options.includeInheritedProps ? (j in Object(obj)) : hasOwnProperty(obj, j))) {
          obj = obj[j]
        } else {
          return false
        }
      }

      return true
    }

    objectPath.ensureExists = function (obj, path, value) {
      return set(obj, path, value, true)
    }

    objectPath.set = function (obj, path, value, doNotReplace) {
      return set(obj, path, value, doNotReplace)
    }

    objectPath.insert = function (obj, path, value, at) {
      var arr = objectPath.get(obj, path)
      at = ~~at
      if (!isArray(arr)) {
        arr = []
        objectPath.set(obj, path, arr)
      }
      arr.splice(at, 0, value)
    }

    objectPath.empty = function (obj, path) {
      if (isEmpty(path)) {
        return void 0
      }
      if (obj == null) {
        return void 0
      }

      var value, i
      if (!(value = objectPath.get(obj, path))) {
        return void 0
      }

      if (typeof value === 'string') {
        return objectPath.set(obj, path, '')
      } else if (isBoolean(value)) {
        return objectPath.set(obj, path, false)
      } else if (typeof value === 'number') {
        return objectPath.set(obj, path, 0)
      } else if (isArray(value)) {
        value.length = 0
      } else if (isObject(value)) {
        for (i in value) {
          if (hasShallowProperty(value, i)) {
            delete value[i]
          }
        }
      } else {
        return objectPath.set(obj, path, null)
      }
    }

    objectPath.push = function (obj, path /*, values */) {
      var arr = objectPath.get(obj, path)
      if (!isArray(arr)) {
        arr = []
        objectPath.set(obj, path, arr)
      }

      arr.push.apply(arr, Array.prototype.slice.call(arguments, 2))
    }

    objectPath.coalesce = function (obj, paths, defaultValue) {
      var value

      for (var i = 0, len = paths.length; i < len; i++) {
        if ((value = objectPath.get(obj, paths[i])) !== void 0) {
          return value
        }
      }

      return defaultValue
    }

    objectPath.get = function (obj, path, defaultValue) {
      if (typeof path === 'number') {
        path = [path]
      }
      if (!path || path.length === 0) {
        return obj
      }
      if (obj == null) {
        return defaultValue
      }
      if (typeof path === 'string') {
        return objectPath.get(obj, path.split('.'), defaultValue)
      }

      var currentPath = getKey(path[0])
      var nextObj = getShallowPropertySafely(obj, currentPath)
      if (nextObj === void 0) {
        return defaultValue
      }

      if (path.length === 1) {
        return nextObj
      }

      return objectPath.get(obj[currentPath], path.slice(1), defaultValue)
    }

    objectPath.del = function del (obj, path) {
      if (typeof path === 'number') {
        path = [path]
      }

      if (obj == null) {
        return obj
      }

      if (isEmpty(path)) {
        return obj
      }
      if (typeof path === 'string') {
        return objectPath.del(obj, path.split('.'))
      }

      var currentPath = getKey(path[0])
      getShallowPropertySafely(obj, currentPath)
      if (!hasShallowProperty(obj, currentPath)) {
        return obj
      }

      if (path.length === 1) {
        if (isArray(obj)) {
          obj.splice(currentPath, 1)
        } else {
          delete obj[currentPath]
        }
      } else {
        return objectPath.del(obj[currentPath], path.slice(1))
      }

      return obj
    }

    return objectPath
  }

  var mod = factory()
  mod.create = factory
  mod.withInheritedProps = factory({includeInheritedProps: true})
  return mod
})


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./src/client/api/config.ts":
/*!**********************************!*\
  !*** ./src/client/api/config.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "filteredConfig": () => (/* binding */ filteredConfig)
/* harmony export */ });
const filteredConfig = globalThis.ncgConfig;


/***/ }),

/***/ "./src/client/api/logger/index.ts":
/*!****************************************!*\
  !*** ./src/client/api/logger/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Logger": () => (/* binding */ Logger),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _sentry_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/browser */ "./node_modules/@sentry/browser/esm/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/client/api/config.ts");
/* harmony import */ var _logger_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logger.client */ "./src/client/api/logger/logger.client.ts");
// Packages

// Ours


let Logger;
if (_config__WEBPACK_IMPORTED_MODULE_0__.filteredConfig.sentry.enabled) {
    Logger = (0,_logger_client__WEBPACK_IMPORTED_MODULE_1__["default"])(_config__WEBPACK_IMPORTED_MODULE_0__.filteredConfig.logging, _sentry_browser__WEBPACK_IMPORTED_MODULE_2__);
}
else {
    Logger = (0,_logger_client__WEBPACK_IMPORTED_MODULE_1__["default"])(_config__WEBPACK_IMPORTED_MODULE_0__.filteredConfig.logging);
}
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name) {
    return new Logger(name);
}


/***/ }),

/***/ "./src/client/api/logger/logger.client.ts":
/*!************************************************!*\
  !*** ./src/client/api/logger/logger.client.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! util */ "./node_modules/util/util.js");
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_logger_interface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/logger-interface */ "./src/shared/logger-interface.ts");
// Native


const OrderedLogLevels = {
    verbose: 0,
    debug: 1,
    info: 2,
    warn: 3,
    error: 4,
    silent: 5,
};
/**
 * A factory that configures and returns a Logger constructor.
 *
 * @returns  A constructor used to create discrete logger instances.
 */
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(initialOpts = {}, sentry = undefined) {
    var _a, _b, _c, _d;
    var _e;
    /**
     * Constructs a new Logger instance that prefixes all output with the given name.
     * @param name {String} - The label to prefix all output of this logger with.
     * @returns {Object} - A Logger instance.
     * @constructor
     */
    return _e = class Logger {
            constructor(name) {
                this.name = name;
                this.name = name;
            }
            trace(...args) {
                if (Logger._silent) {
                    return;
                }
                if (OrderedLogLevels[Logger._level] > OrderedLogLevels.verbose) {
                    return;
                }
                console.info(`[${this.name}]`, ...args);
            }
            debug(...args) {
                if (Logger._silent) {
                    return;
                }
                if (OrderedLogLevels[Logger._level] > OrderedLogLevels.debug) {
                    return;
                }
                console.info(`[${this.name}]`, ...args);
            }
            info(...args) {
                if (Logger._silent) {
                    return;
                }
                if (OrderedLogLevels[Logger._level] > OrderedLogLevels.info) {
                    return;
                }
                console.info(`[${this.name}]`, ...args);
            }
            warn(...args) {
                if (Logger._silent) {
                    return;
                }
                if (OrderedLogLevels[Logger._level] > OrderedLogLevels.warn) {
                    return;
                }
                console.warn(`[${this.name}]`, ...args);
            }
            error(...args) {
                if (Logger._silent) {
                    return;
                }
                if (OrderedLogLevels[Logger._level] > OrderedLogLevels.error) {
                    return;
                }
                console.error(`[${this.name}]`, ...args);
                if (sentry) {
                    const formattedArgs = args.map((argument) => typeof argument === 'object' ? (0,util__WEBPACK_IMPORTED_MODULE_0__.inspect)(argument, { depth: null, showProxy: true }) : argument);
                    sentry.captureException(new Error(`[${this.name}] ` + (0,util__WEBPACK_IMPORTED_MODULE_0__.format)(formattedArgs[0], ...formattedArgs.slice(1))));
                }
            }
            replicants(...args) {
                if (Logger._silent) {
                    return;
                }
                if (!Logger._shouldLogReplicants) {
                    return;
                }
                console.info(`[${this.name}]`, ...args);
            }
        },
        // A messy bit of internal state used to determine if the special-case "replicants" logging level is active.
        _e._shouldLogReplicants = Boolean((_a = initialOpts.console) === null || _a === void 0 ? void 0 : _a.replicants),
        _e._silent = !((_b = initialOpts.console) === null || _b === void 0 ? void 0 : _b.enabled),
        _e._level = (_d = (_c = initialOpts.console) === null || _c === void 0 ? void 0 : _c.level) !== null && _d !== void 0 ? _d : _shared_logger_interface__WEBPACK_IMPORTED_MODULE_1__.LogLevel.Info,
        _e;
}


/***/ }),

/***/ "./src/client/api/replicant.ts":
/*!*************************************!*\
  !*** ./src/client/api/replicant.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ClientReplicant)
/* harmony export */ });
/* harmony import */ var fast_equals__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! fast-equals */ "./node_modules/fast-equals/dist/esm/index.mjs");
/* harmony import */ var klona_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! klona/json */ "./node_modules/klona/json/index.mjs");
/* harmony import */ var _shared_replicants_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/replicants.shared */ "./src/shared/replicants.shared.ts");
/* harmony import */ var _shared_replicants_shared__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_shared_replicants_shared__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logger */ "./src/client/api/logger/index.ts");
/* eslint-disable no-constructor-return */
// Packages


// Ours


const declaredReplicants = new Map();
const REPLICANT_HANDLER = {
    get(target, prop) {
        if (prop === 'value' && target.status !== 'declared') {
            target.log.warn('Attempted to get value before Replicant had finished declaring. ' +
                'This will always return undefined.');
        }
        return target[prop];
    },
    set(target, prop, newValue) {
        if (prop !== 'value' || (0,_shared_replicants_shared__WEBPACK_IMPORTED_MODULE_1__.isIgnoringProxy)(target)) {
            target[prop] = newValue;
            return true;
        }
        if (newValue === target[prop]) {
            return true;
        }
        target.validate(newValue);
        target.log.replicants('running setter with', newValue);
        target._addOperation({
            path: '/',
            method: 'overwrite',
            args: { newValue: (0,klona_json__WEBPACK_IMPORTED_MODULE_0__.klona)(newValue) },
        });
        return true;
    },
};
class ClientReplicant extends _shared_replicants_shared__WEBPACK_IMPORTED_MODULE_1__.AbstractReplicant {
    constructor(name, namespace, opts, socket = window.socket) {
        super(name, namespace, opts);
        this.value = undefined;
        /**
         * When running in the browser, we have to wait until the socket joins the room
         * and the replicant is fully declared before running any additional commands.
         * After this time, commands do not need to be added to the queue and are simply executed immediately.
         */
        this._actionQueue = [];
        // Load logger
        this.log = (0,_logger__WEBPACK_IMPORTED_MODULE_2__["default"])(`Replicant/${namespace}.${name}`);
        // If replicant already exists, return that.
        const nsp = declaredReplicants.get(namespace);
        if (nsp) {
            const existing = nsp.get(name);
            if (existing) {
                existing.log.replicants('Existing replicant found, returning that instead of creating a new one.');
                return existing;
            }
        }
        else {
            declaredReplicants.set(namespace, new Map());
        }
        this._socket = socket;
        // Initialize the Replicant.
        this._declare();
        socket.on('replicant:operations', (data) => {
            this._handleOperations({
                ...data,
                operations: data.operations,
            });
        });
        // If we lose connection, redeclare everything on reconnect
        socket.on('disconnect', () => {
            this._handleDisconnect();
        });
        socket.io.on('reconnect', () => {
            this._declare();
        });
        const thisProxy = new Proxy(this, REPLICANT_HANDLER);
        declaredReplicants.get(namespace).set(name, thisProxy);
        return thisProxy;
    }
    /**
     * A map of all Replicants declared in this context. Top-level keys are namespaces,
     * child keys are Replicant names.
     */
    static get declaredReplicants() {
        const foo = {};
        for (const [key, nsp] of declaredReplicants) {
            foo[key] = Object.fromEntries(Object.entries(nsp));
        }
        return foo;
    }
    /**
     * Adds an operation to the operation queue, to be flushed at the end of the current tick.
     * @param path {string} - The object path to where this operation took place.
     * @param method {string} - The name of the operation.
     * @param args {array} - The arguments provided to this operation
     * @private
     */
    _addOperation(operation) {
        this._operationQueue.push(operation);
        if (!this._pendingOperationFlush) {
            this._pendingOperationFlush = true;
            if (this.status === 'declared') {
                setTimeout(() => {
                    this._flushOperations();
                }, 0);
            }
            else {
                this._queueAction(this._flushOperations);
            }
        }
    }
    /**
     * Emits all queued operations via Socket.IO & empties this._operationQueue.
     * @private
     */
    _flushOperations() {
        this._pendingOperationFlush = false;
        if (this._operationQueue.length <= 0)
            return;
        this._socket.emit('replicant:proposeOperations', {
            name: this.name,
            namespace: this.namespace,
            operations: this._operationQueue,
            revision: this.revision,
            schemaSum: this.schemaSum,
            opts: this.opts,
        }, (rejectReason, data) => {
            if (data === null || data === void 0 ? void 0 : data.schema) {
                this.schema = data.schema;
                this.schemaSum = data.schemaSum;
            }
            if (data && data.revision !== this.revision) {
                this.log.warn('Not at head revision (ours %s, theirs %s). Change aborted & head revision applied.', this.revision, data.revision);
                this._assignValue(data.value, data.revision);
            }
            if (rejectReason) {
                if (this.listenerCount('operationsRejected') > 0) {
                    this.emit('operationsRejected', rejectReason);
                }
                else {
                    this.log.error(rejectReason);
                }
            }
        });
        this._operationQueue = [];
    }
    /**
     * Adds an "action" to the action queue. Actions are method calls on the Replicant object itself.
     * @param fn
     * @param args
     * @private
     */
    _queueAction(fn, args) {
        this._actionQueue.push({
            fn,
            args,
        });
    }
    /**
     * Emits "declareReplicant" via the socket.
     * @private
     */
    _declare() {
        if (this.status === 'declared' || this.status === 'declaring') {
            return;
        }
        this.status = 'declaring';
        this._socket.emit('joinRoom', `replicant:${this.namespace}:${this.name}`, () => {
            this._socket.emit('replicant:declare', {
                name: this.name,
                namespace: this.namespace,
                opts: this.opts,
            }, (rejectReason, data) => {
                if (rejectReason) {
                    if (this.listenerCount('declarationRejected') > 0) {
                        this.emit('declarationRejected', rejectReason);
                        return;
                    }
                    throw new Error(rejectReason);
                }
                if (!data) {
                    if (this.listenerCount('declarationRejected') > 0) {
                        this.emit('declarationRejected', 'data unexpectedly falsey');
                        return;
                    }
                    throw new Error('data unexpectedly falsey');
                }
                this.log.replicants('declareReplicant callback (value: %s, revision: %s)', data.value, data.revision);
                this.status = 'declared';
                /* If the revision we get in the response doesn't match the revision we have locally,
                 * then we need to just assign the authoritative value we got back from the Replicator.
                 * Likewise, if our local value isn't an exact match to what we got back from the Replicator,
                 * just assume that the Replicator is correct and take the value it gave us.
                 */
                if (this.revision !== data.revision || !(0,fast_equals__WEBPACK_IMPORTED_MODULE_3__.deepEqual)(this.value, data.value)) {
                    this._assignValue(data.value, data.revision);
                }
                if ('schema' in data) {
                    this.schema = data.schema;
                    this.schemaSum = data.schemaSum;
                    this.validate = this._generateValidator();
                }
                // Let listeners know that this Replicant has been successfully declared.
                this.emit('declared', data);
                /* If a replicant is declared with no defaultValue and has not yet been given a value, then `change`
                 * listeners added before declaration has completed will not fire when declaration completes, because
                 * `undefined` === `undefined`, meaning that the above `_assignValue` call won't get run.
                 *
                 * To ensure consistent behavior, we manually emit a `change` event in this case.
                 */
                if (this.value === undefined && this.revision === 0) {
                    this.emit('change', undefined, undefined, []);
                }
                // If there were any pre-declare actions queued, execute them.
                if (this._actionQueue.length > 0) {
                    this._actionQueue.forEach((item) => {
                        var _a;
                        item.fn.apply(this, (_a = item.args) !== null && _a !== void 0 ? _a : []);
                    });
                    this._actionQueue = [];
                }
            });
        });
    }
    /**
     * Overwrites the value completely, and assigns a new one.
     * @param newValue {*} - The value to assign.
     * @param revision {number} - The new revision number.
     * @private
     */
    _assignValue(newValue, revision) {
        const oldValue = (0,klona_json__WEBPACK_IMPORTED_MODULE_0__.klona)(this.value);
        const op = {
            path: '/',
            method: 'overwrite',
            args: { newValue },
        };
        this._applyOperation(op);
        if (typeof revision !== 'undefined') {
            this.revision = revision;
        }
        this.emit('change', this.value, oldValue, [op]);
    }
    /**
     * Handles incoming operations performed on Array and Object Replicants.
     * Requests a fullUpdate if it determines that we're not at the latest revision of this Replicant.
     * @param data {object} - A record of operations to perform.
     * @private
     */
    _handleOperations(data) {
        if (this.status !== 'declared') {
            return;
        }
        const expectedRevision = this.revision + 1;
        if (data.name !== this.name || data.namespace !== this.namespace) {
            return;
        }
        if (data.revision !== expectedRevision) {
            this.log.warn('Not at head revision (ours: "%s", expected theirs to be "%s" but got "%s"), fetching latest...', this.revision, expectedRevision, data.revision);
            this._fullUpdate(data.revision);
            return;
        }
        this.log.replicants('received replicantOperations', data);
        const oldValue = (0,klona_json__WEBPACK_IMPORTED_MODULE_0__.klona)(this.value);
        data.operations.forEach((operation) => {
            this._applyOperation(operation);
        });
        this.revision = data.revision;
        this.emit('change', this.value, oldValue, data.operations);
    }
    _handleDisconnect() {
        this.status = 'undeclared';
        this._operationQueue.length = 0;
        this._actionQueue.length = 0;
    }
    /**
     * Requests the latest value from the Replicator, discarding the local value.
     * @private
     */
    _fullUpdate(revision) {
        window.NodeCG.readReplicant(this.name, this.namespace, (data) => {
            this.emit('fullUpdate', data);
            this._assignValue(data, revision);
        });
    }
}


/***/ }),

/***/ "./src/shared/api.base.ts":
/*!********************************!*\
  !*** ./src/shared/api.base.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NodeCGAPIBase = void 0;
// Ours
const { version } = __webpack_require__(/*! ../../package.json */ "./package.json");
const typed_emitter_1 = __webpack_require__(/*! ./typed-emitter */ "./src/shared/typed-emitter.ts");
class NodeCGAPIBase extends typed_emitter_1.TypedEmitter {
    /**
     * Lets you easily wait for a group of Replicants to finish declaring.
     *
     * Returns a promise which is resolved once all provided Replicants
     * have emitted a `change` event, which is indicates that they must
     * have finished declaring.
     *
     * This method is only useful in client-side code.
     * Server-side code never has to wait for Replicants.
     *
     * @param replicants {Replicant}
     * @returns {Promise<any>}
     *
     * @example <caption>From a graphic or dashboard panel:</caption>
     * const rep1 = nodecg.Replicant('rep1');
     * const rep2 = nodecg.Replicant('rep2');
     *
     * // You can provide as many Replicant arguments as you want,
     * // this example just uses two Replicants.
     * NodeCG.waitForReplicants(rep1, rep2).then(() => {
     *     console.log('rep1 and rep2 are fully declared and ready to use!');
     * });
     */
    static waitForReplicants(...replicants) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                const numReplicants = replicants.length;
                let declaredReplicants = 0;
                replicants.forEach((replicant) => {
                    replicant.once('change', () => {
                        declaredReplicants++;
                        if (declaredReplicants >= numReplicants) {
                            resolve();
                        }
                    });
                });
            });
        });
    }
    constructor(bundle) {
        super();
        this._messageHandlers = [];
        this.bundleName = bundle.name;
        this.bundleConfig = bundle.config;
        this.bundleVersion = bundle.version;
        this.bundleGit = bundle.git;
    }
    listenFor(messageName, bundleNameOrHandlerFunc, handlerFunc) {
        let bundleName;
        if (typeof bundleNameOrHandlerFunc === 'string') {
            bundleName = bundleNameOrHandlerFunc;
        }
        else {
            bundleName = this.bundleName;
            handlerFunc = bundleNameOrHandlerFunc;
        }
        if (typeof handlerFunc !== 'function') {
            throw new Error(`argument "handler" must be a function, but you provided a(n) ${typeof handlerFunc}`);
        }
        this.log.trace('Listening for %s from bundle %s', messageName, bundleNameOrHandlerFunc);
        this._messageHandlers.push({
            messageName,
            bundleName,
            func: handlerFunc,
        });
    }
    unlisten(messageName, bundleNameOrHandler, maybeHandler) {
        let { bundleName } = this;
        let handlerFunc = maybeHandler;
        if (typeof bundleNameOrHandler === 'string') {
            bundleName = bundleNameOrHandler;
        }
        else {
            handlerFunc = bundleNameOrHandler;
        }
        if (typeof handlerFunc !== 'function') {
            throw new Error(`argument "handler" must be a function, but you provided a(n) ${typeof handlerFunc}`);
        }
        this.log.trace('[%s] Removing listener for %s from bundle %s', this.bundleName, messageName, bundleName);
        // Find the index of this handler in the array.
        const index = this._messageHandlers.findIndex((handler) => handler.messageName === messageName &&
            handler.bundleName === bundleName &&
            handler.func === handlerFunc);
        // If the handler exists, remove it and return true.
        if (index >= 0) {
            this._messageHandlers.splice(index, 1);
            return true;
        }
        // Else, return false.
        return false;
    }
    Replicant(name, namespaceOrOpts, opts) {
        let namespace;
        if (typeof namespaceOrOpts === 'string') {
            namespace = namespaceOrOpts;
        }
        else {
            namespace = this.bundleName;
        }
        if (typeof namespaceOrOpts !== 'string') {
            opts = namespaceOrOpts;
        }
        const defaultOpts = {};
        opts = opts !== null && opts !== void 0 ? opts : defaultOpts;
        if (typeof opts.schemaPath === 'undefined') {
            opts.schemaPath = `bundles/${encodeURIComponent(namespace)}/schemas/${encodeURIComponent(name)}.json`;
        }
        return this._replicantFactory(name, namespace, opts);
    }
}
exports.NodeCGAPIBase = NodeCGAPIBase;
NodeCGAPIBase.version = version;


/***/ }),

/***/ "./src/shared/logger-interface.ts":
/*!****************************************!*\
  !*** ./src/shared/logger-interface.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel["Trace"] = "verbose";
    LogLevel["Debug"] = "debug";
    LogLevel["Info"] = "info";
    LogLevel["Warn"] = "warn";
    LogLevel["Error"] = "error";
    LogLevel["Silent"] = "silent";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));


/***/ }),

/***/ "./src/shared/replicants.shared.ts":
/*!*****************************************!*\
  !*** ./src/shared/replicants.shared.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.proxyRecursive = exports.isIgnoringProxy = exports.resumeProxy = exports.ignoreProxy = exports.ARRAY_MUTATOR_METHODS = exports.AbstractReplicant = void 0;
const json_1 = __webpack_require__(/*! klona/json */ "./node_modules/klona/json/index.js");
const object_path_1 = __importDefault(__webpack_require__(/*! object-path */ "./node_modules/object-path/index.js"));
const typed_emitter_1 = __webpack_require__(/*! ../shared/typed-emitter */ "./src/shared/typed-emitter.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/shared/utils/index.ts");
/**
 * If you're wondering why some things are prefixed with "_",
 * but not marked as protected or private, this is because our Proxy
 * trap handlers need to access these parts of the Replicant internals,
 * but don't have access to private or protected members.
 *
 * So, we code this like its 2010 and just use "_" on some public members.
 */
class AbstractReplicant extends typed_emitter_1.TypedEmitter {
    constructor(name, namespace, opts = {}) {
        super();
        this.revision = 0;
        this.status = 'undeclared';
        // eslint-disable-next-line @typescript-eslint/ban-types
        this.validationErrors = [];
        this._operationQueue = [];
        this._pendingOperationFlush = false;
        /**
         * Used to validate the new value of a replicant.
         *
         * This is a stub that will be replaced if a Schema is available.
         */
        this.validate = () => true;
        if (!name || typeof name !== 'string') {
            throw new Error('Must supply a name when instantiating a Replicant');
        }
        if (!namespace || typeof namespace !== 'string') {
            throw new Error('Must supply a namespace when instantiating a Replicant');
        }
        if (typeof opts.persistent === 'undefined') {
            opts.persistent = true;
        }
        if (typeof opts.persistenceInterval === 'undefined') {
            opts.persistenceInterval = DEFAULT_PERSISTENCE_INTERVAL;
        }
        this.name = name;
        this.namespace = namespace;
        this.opts = opts;
        // Prevents one-time change listeners from potentially being called twice.
        // https://github.com/nodecg/nodecg/issues/296
        const originalOnce = this.once.bind(this);
        this.once = (event, listener) => {
            if (event === 'change' && this.status === 'declared') {
                listener(this.value);
                return;
            }
            // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
            return originalOnce(event, listener);
        };
        /**
         * When a new "change" listener is added, chances are that the developer wants it to be initialized ASAP.
         * However, if this replicant has already been declared previously in this context, their "change"
         * handler will *not* get run until another change comes in, which may never happen for Replicants
         * that change very infrequently.
         * To resolve this, we immediately invoke all new "change" handlers if appropriate.
         */
        this.on('newListener', (event, listener) => {
            if (event === 'change' && this.status === 'declared') {
                listener(this.value);
            }
        });
    }
    /**
     * If the operation is an array mutator method, call it on the target array with the operation arguments.
     * Else, handle it with objectPath.
     */
    _applyOperation(operation) {
        ignoreProxy(this);
        let result;
        const path = pathStrToPathArr(operation.path);
        if (exports.ARRAY_MUTATOR_METHODS.includes(operation.method)) {
            if (typeof this.value !== 'object' || this.value === null) {
                throw new Error(`expected replicant "${this.namespace}:${this.name}" to have a value with type "object", got "${typeof this.value}" instead`);
            }
            const arr = object_path_1.default.get(this.value, path);
            if (!Array.isArray(arr)) {
                throw new Error(`expected to find an array in replicant "${this.namespace}:${this.name}" at path "${operation.path}"`);
            }
            // eslint-disable-next-line prefer-spread
            result = arr[operation.method].apply(arr, 'args' in operation && 'mutatorArgs' in operation.args ? operation.args.mutatorArgs : []);
            // Recursively check for any objects that may have been added by the above method
            // and that need to be Proxied.
            proxyRecursive(this, arr, operation.path);
        }
        else {
            switch (operation.method) {
                case 'overwrite': {
                    const { newValue } = operation.args;
                    this[(0, utils_1.isBrowser)() ? 'value' : '_value'] = proxyRecursive(this, newValue, operation.path);
                    result = true;
                    break;
                }
                case 'add':
                case 'update': {
                    path.push(operation.args.prop);
                    let { newValue } = operation.args;
                    if (typeof newValue === 'object') {
                        newValue = proxyRecursive(this, newValue, pathArrToPathStr(path));
                    }
                    result = object_path_1.default.set(this.value, path, newValue);
                    break;
                }
                case 'delete':
                    // Workaround for https://github.com/mariocasciaro/object-path/issues/69
                    if (path.length === 0 || object_path_1.default.has(this.value, path)) {
                        const target = object_path_1.default.get(this.value, path);
                        result = delete target[operation.args.prop];
                    }
                    break;
                /* istanbul ignore next */
                default:
                    /* istanbul ignore next */
                    throw new Error(`Unexpected operation method "${operation.method}"`);
            }
        }
        resumeProxy(this);
        return result;
    }
    /**
     * Generates a JSON Schema validator function from the `schema` property of the provided replicant.
     * @param replicant {object} - The Replicant to perform the operation on.
     * @returns {function} - The generated validator function.
     */
    _generateValidator() {
        const { schema } = this;
        if (!schema) {
            throw new Error("can't generate a validator for a replicant which lacks a schema");
        }
        let validate;
        try {
            validate = (0, utils_1.compileJsonSchema)(schema);
        }
        catch (error) {
            throw new Error(`Error compiling JSON Schema for Replicant "${this.namespace}:${this.name}":\n\t${(0, utils_1.stringifyError)(error)}`);
        }
        /**
         * Validates a value against the current Replicant's schema.
         * Throws when the value fails validation.
         * @param [value=replicant.value] {*} - The value to validate. Defaults to the replicant's current value.
         * @param [opts] {Object}
         * @param [opts.throwOnInvalid = true] {Boolean} - Whether or not to immediately throw when the provided value fails validation against the schema.
         */
        return function (value = this.value, { throwOnInvalid = true } = {}) {
            const valid = validate(value);
            if (!valid) {
                this.validationErrors = validate.errors;
                if (throwOnInvalid) {
                    throw new Error(`Invalid value rejected for replicant "${this.name}" in namespace "${this.namespace}":\n${(0, utils_1.formatJsonSchemaErrors)(schema, validate.errors)}`);
                }
            }
            return valid;
        };
    }
}
exports.AbstractReplicant = AbstractReplicant;
const proxyMetadataMap = new WeakMap();
const metadataMap = new WeakMap();
const proxySet = new WeakSet();
const ignoringProxy = new WeakSet();
exports.ARRAY_MUTATOR_METHODS = [
    'copyWithin',
    'fill',
    'pop',
    'push',
    'reverse',
    'shift',
    'sort',
    'splice',
    'unshift',
];
/**
 * The default persistence interval, in milliseconds.
 */
const DEFAULT_PERSISTENCE_INTERVAL = 100;
function ignoreProxy(replicant) {
    ignoringProxy.add(replicant);
}
exports.ignoreProxy = ignoreProxy;
function resumeProxy(replicant) {
    ignoringProxy.delete(replicant);
}
exports.resumeProxy = resumeProxy;
function isIgnoringProxy(replicant) {
    return ignoringProxy.has(replicant);
}
exports.isIgnoringProxy = isIgnoringProxy;
const deleteTrap = function (target, prop) {
    const metadata = metadataMap.get(target);
    if (!metadata) {
        throw new Error('arrived at delete trap without any metadata');
    }
    const { replicant } = metadata;
    if (isIgnoringProxy(replicant)) {
        return delete target[prop];
    }
    // If the target doesn't have this prop, return true.
    if (!{}.hasOwnProperty.call(target, prop)) {
        return true;
    }
    if (replicant.schema) {
        const valueClone = (0, json_1.klona)(replicant.value);
        const targetClone = object_path_1.default.get(valueClone, pathStrToPathArr(metadata.path));
        delete targetClone[prop];
        replicant.validate(valueClone);
    }
    replicant._addOperation({ path: metadata.path, method: 'delete', args: { prop } });
    if (!(0, utils_1.isBrowser)()) {
        return delete target[prop];
    }
};
const CHILD_ARRAY_HANDLER = {
    get(target, prop) {
        const metadata = metadataMap.get(target);
        if (!metadata) {
            throw new Error('arrived at get trap without any metadata');
        }
        const { replicant } = metadata;
        if (isIgnoringProxy(replicant)) {
            return target[prop];
        }
        if ({}.hasOwnProperty.call(Array.prototype, prop) &&
            typeof Array.prototype[prop] === 'function' &&
            target[prop] === Array.prototype[prop] &&
            exports.ARRAY_MUTATOR_METHODS.includes(prop)) {
            return (...args) => {
                if (replicant.schema) {
                    const valueClone = (0, json_1.klona)(replicant.value);
                    const targetClone = object_path_1.default.get(valueClone, pathStrToPathArr(metadata.path));
                    // eslint-disable-next-line prefer-spread
                    targetClone[prop].apply(targetClone, args);
                    replicant.validate(valueClone);
                }
                if ((0, utils_1.isBrowser)()) {
                    metadata.replicant._addOperation({
                        path: metadata.path,
                        method: prop,
                        args: {
                            mutatorArgs: Array.prototype.slice.call(args),
                        },
                    });
                }
                else {
                    ignoreProxy(replicant);
                    metadata.replicant._addOperation({
                        path: metadata.path,
                        method: prop,
                        args: {
                            mutatorArgs: Array.prototype.slice.call(args),
                        },
                    });
                    const retValue = target[prop].apply(target, args);
                    resumeProxy(replicant);
                    // We have to re-proxy the target because the items could have been inserted.
                    proxyRecursive(replicant, target, metadata.path);
                    // TODO: This could leak a non-proxied object and cause bugs!
                    return retValue;
                }
            };
        }
        return target[prop];
    },
    set(target, prop, newValue) {
        if (target[prop] === newValue) {
            return true;
        }
        const metadata = metadataMap.get(target);
        if (!metadata) {
            throw new Error('arrived at set trap without any metadata');
        }
        const { replicant } = metadata;
        if (isIgnoringProxy(replicant)) {
            target[prop] = newValue;
            return true;
        }
        if (replicant.schema) {
            const valueClone = (0, json_1.klona)(replicant.value);
            const targetClone = object_path_1.default.get(valueClone, pathStrToPathArr(metadata.path));
            targetClone[prop] = newValue;
            replicant.validate(valueClone);
        }
        // It is crucial that this happen *before* the assignment below.
        if ({}.hasOwnProperty.call(target, prop)) {
            replicant._addOperation({
                path: metadata.path,
                method: 'update',
                args: {
                    prop: prop,
                    newValue,
                },
            });
        }
        else {
            replicant._addOperation({
                path: metadata.path,
                method: 'add',
                args: {
                    prop: prop,
                    newValue,
                },
            });
        }
        // If this Replicant is running in the server context, immediately apply the value.
        if (!(0, utils_1.isBrowser)()) {
            target[prop] = proxyRecursive(metadata.replicant, newValue, joinPathParts(metadata.path, prop));
        }
        return true;
    },
    deleteProperty: deleteTrap,
};
const CHILD_OBJECT_HANDLER = {
    get(target, prop) {
        const value = target[prop];
        const tag = Object.prototype.toString.call(value);
        const shouldBindProperty = prop !== 'constructor' &&
            (tag === '[object Function]' || tag === '[object AsyncFunction]' || tag === '[object GeneratorFunction]');
        if (shouldBindProperty) {
            return value.bind(target);
        }
        return value;
    },
    set(target, prop, newValue) {
        if (target[prop] === newValue) {
            return true;
        }
        const metadata = metadataMap.get(target);
        if (!metadata) {
            throw new Error('arrived at set trap without any metadata');
        }
        const { replicant } = metadata;
        if (isIgnoringProxy(replicant)) {
            target[prop] = newValue;
            return true;
        }
        if (replicant.schema) {
            const valueClone = (0, json_1.klona)(replicant.value);
            const targetClone = object_path_1.default.get(valueClone, pathStrToPathArr(metadata.path));
            targetClone[prop] = newValue;
            replicant.validate(valueClone);
        }
        // It is crucial that this happen *before* the assignment below.
        if ({}.hasOwnProperty.call(target, prop)) {
            replicant._addOperation({
                path: metadata.path,
                method: 'update',
                args: {
                    prop: prop,
                    newValue,
                },
            });
        }
        else {
            replicant._addOperation({
                path: metadata.path,
                method: 'add',
                args: {
                    prop: prop,
                    newValue,
                },
            });
        }
        // If this Replicant is running in the server context, immediately apply the value.
        if (!(0, utils_1.isBrowser)()) {
            target[prop] = proxyRecursive(metadata.replicant, newValue, joinPathParts(metadata.path, prop));
        }
        return true;
    },
    deleteProperty: deleteTrap,
};
/**
 * Recursively Proxies an Array or Object. Does nothing to primitive values.
 * @param replicant {object} - The Replicant in which to do the work.
 * @param value {*} - The value to recursively Proxy.
 * @param path {string} - The objectPath to this value.
 * @returns {*} - The recursively Proxied value (or just `value` unchanged, if `value` is a primitive)
 * @private
 */
function proxyRecursive(replicant, value, path) {
    if (typeof value === 'object' && value !== null) {
        let p;
        assertSingleOwner(replicant, value);
        // If "value" is already a Proxy, don't re-proxy it.
        if (proxySet.has(value)) {
            p = value;
            const metadata = proxyMetadataMap.get(value);
            metadata.path = path; // Update the path, as it may have changed.
        }
        else if (metadataMap.has(value)) {
            const metadata = metadataMap.get(value);
            if (!metadata) {
                throw new Error('metadata unexpectedly not found');
            }
            p = metadata.proxy;
            metadata.path = path; // Update the path, as it may have changed.
        }
        else {
            const handler = Array.isArray(value) ? CHILD_ARRAY_HANDLER : CHILD_OBJECT_HANDLER;
            p = new Proxy(value, handler);
            proxySet.add(p);
            const metadata = {
                replicant,
                path,
                proxy: p,
            };
            metadataMap.set(value, metadata);
            proxyMetadataMap.set(p, metadata);
        }
        for (const key in value) {
            /* istanbul ignore if */
            if (!{}.hasOwnProperty.call(value, key)) {
                continue;
            }
            const escapedKey = key.replace(/\//g, '~1');
            if (path) {
                const joinedPath = joinPathParts(path, escapedKey);
                value[key] = proxyRecursive(replicant, value[key], joinedPath);
            }
            else {
                value[key] = proxyRecursive(replicant, value[key], escapedKey);
            }
        }
        return p;
    }
    return value;
}
exports.proxyRecursive = proxyRecursive;
function joinPathParts(part1, part2) {
    return part1.endsWith('/') ? `${part1}${part2}` : `${part1}/${part2}`;
}
/**
 * Converts a string path (/a/b/c) to an array path ['a', 'b', 'c']
 * @param path {String} - The path to convert.
 * @returns {Array} - The converted path.
 */
function pathStrToPathArr(path) {
    const pathArr = path
        .substr(1)
        .split('/')
        .map((part) => 
    // De-tokenize '/' characters in path name
    part.replace(/~1/g, '/'));
    // For some reason, path arrays whose only item is an empty string cause errors.
    // In this case, we replace the path with an empty array, which seems to be fine.
    if (pathArr.length === 1 && pathArr[0] === '') {
        return [];
    }
    return pathArr;
}
/**
 * Converts an array path ['a', 'b', 'c'] to a string path /a/b/c)
 * @param path {Array} - The path to convert.
 * @returns {String} - The converted path.
 */
function pathArrToPathStr(path) {
    const strPath = path.join('/');
    if (!strPath.startsWith('/')) {
        return `/${strPath}`;
    }
    return strPath;
}
/**
 * Throws an exception if an object belongs to more than one Replicant.
 * @param replicant {object} - The Replicant that this value should belong to.
 * @param value {*} - The value to check ownership of.
 */
function assertSingleOwner(replicant, value) {
    let metadata;
    if (proxySet.has(value)) {
        metadata = proxyMetadataMap.get(value);
    }
    else if (metadataMap.has(value)) {
        metadata = metadataMap.get(value);
    }
    else {
        // If there's no metadata for this value, then it doesn't belong to any Replicants yet,
        // and we're okay to continue.
        return;
    }
    if (metadata.replicant !== replicant) {
        throw new Error(`This object belongs to another Replicant, ${metadata.replicant.namespace}::${metadata.replicant.name}.` +
            `\nA given object cannot belong to multiple Replicants. Object value:\n${JSON.stringify(value, null, 2)}`);
    }
}


/***/ }),

/***/ "./src/shared/typed-emitter.ts":
/*!*************************************!*\
  !*** ./src/shared/typed-emitter.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypedEmitter = void 0;
// Native
const events_1 = __webpack_require__(/*! events */ "./node_modules/events/events.js");
class TypedEmitter {
    constructor() {
        this._emitter = new events_1.EventEmitter();
        // We intentionally don't expose removeAllListeners because it would break Replicants when used.
    }
    addListener(eventName, fn) {
        this._emitter.addListener(eventName, fn);
    }
    on(eventName, fn) {
        this._emitter.on(eventName, fn);
    }
    off(eventName, fn) {
        this._emitter.off(eventName, fn);
    }
    removeListener(eventName, fn) {
        this._emitter.removeListener(eventName, fn);
    }
    emit(eventName, ...params) {
        this._emitter.emit(eventName, ...params);
    }
    once(eventName, fn) {
        this._emitter.once(eventName, fn);
    }
    setMaxListeners(max) {
        this._emitter.setMaxListeners(max);
    }
    listenerCount(eventName) {
        return this._emitter.listenerCount(eventName);
    }
    listeners(eventName) {
        return this._emitter.listeners(eventName);
    }
}
exports.TypedEmitter = TypedEmitter;


/***/ }),

/***/ "./src/shared/utils/compileJsonSchema.ts":
/*!***********************************************!*\
  !*** ./src/shared/utils/compileJsonSchema.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSchemaDefault = exports.formatJsonSchemaErrors = exports.compileJsonSchema = void 0;
// Packages
const ajv_1 = __importDefault(__webpack_require__(/*! ajv */ "./node_modules/ajv/dist/ajv.js"));
const ajv_draft_04_1 = __importDefault(__webpack_require__(/*! ajv-draft-04 */ "./node_modules/ajv-draft-04/dist/index.js"));
const _2019_1 = __importDefault(__webpack_require__(/*! ajv/dist/2019 */ "./node_modules/ajv/dist/2019.js"));
const _2020_1 = __importDefault(__webpack_require__(/*! ajv/dist/2020 */ "./node_modules/ajv/dist/2020.js"));
const ajv_formats_1 = __importDefault(__webpack_require__(/*! ajv-formats */ "./node_modules/ajv-formats/dist/index.js"));
const json_schema_defaults_1 = __importDefault(__webpack_require__(/*! @nodecg/json-schema-defaults */ "./node_modules/@nodecg/json-schema-defaults/dist/index.js"));
const _1 = __webpack_require__(/*! . */ "./src/shared/utils/index.ts");
const options = {
    allErrors: true,
    verbose: true,
    strict: undefined,
    strictSchema: true,
    strictNumbers: true,
    strictTypes: true,
    strictTuples: true,
    strictRequired: false,
};
const ajv = {
    draft04: (0, ajv_formats_1.default)(new ajv_draft_04_1.default(options)),
    draft07: (0, ajv_formats_1.default)(new ajv_1.default(options)),
    'draft2019-09': (0, ajv_formats_1.default)(new _2019_1.default(options)),
    'draft2020-12': (0, ajv_formats_1.default)(new _2020_1.default(options)),
};
function compileJsonSchema(schema) {
    const schemaVersion = extractSchemaVersion(schema);
    if (schemaVersion.includes('draft-04')) {
        return ajv.draft04.compile(schema);
    }
    if (schemaVersion.includes('draft-07')) {
        return ajv.draft07.compile(schema);
    }
    if (schemaVersion.includes('draft/2019-09')) {
        return ajv['draft2019-09'].compile(schema);
    }
    if (schemaVersion.includes('draft/2020-12')) {
        return ajv['draft2020-12'].compile(schema);
    }
    throw new Error(`Unsupported JSON Schema version "${schemaVersion}"`);
}
exports.compileJsonSchema = compileJsonSchema;
// eslint-disable-next-line @typescript-eslint/ban-types
function formatJsonSchemaErrors(schema, errors) {
    const schemaVersion = extractSchemaVersion(schema);
    if (schemaVersion.includes('draft-04')) {
        return ajv.draft04.errorsText(errors).replace(/^data\//gm, '');
    }
    if (schemaVersion.includes('draft-07')) {
        return ajv.draft07.errorsText(errors).replace(/^data\//gm, '');
    }
    if (schemaVersion.includes('draft/2019-09')) {
        return ajv['draft2019-09'].errorsText(errors).replace(/^data\//gm, '');
    }
    if (schemaVersion.includes('draft/2020-12')) {
        return ajv['draft2020-12'].errorsText(errors).replace(/^data\//gm, '');
    }
    throw new Error(`Unsupported JSON Schema version "${schemaVersion}"`);
}
exports.formatJsonSchemaErrors = formatJsonSchemaErrors;
function getSchemaDefault(schema, labelForDebugging) {
    try {
        return (0, json_schema_defaults_1.default)(schema);
    }
    catch (error) {
        throw new Error(`Error generating default value(s) for schema "${labelForDebugging}":\n\t${(0, _1.stringifyError)(error)}`);
    }
}
exports.getSchemaDefault = getSchemaDefault;
function extractSchemaVersion(schema) {
    // For backwards compat, we default to draft-04.
    const defaultVersion = 'https://json-schema.org/draft-04/schema';
    const extractedVersion = schema.$schema;
    return typeof extractedVersion === 'string' ? extractedVersion : defaultVersion;
}


/***/ }),

/***/ "./src/shared/utils/index.ts":
/*!***********************************!*\
  !*** ./src/shared/utils/index.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isBrowser = exports.stringifyErrorInner = exports.stringifyError = void 0;
__exportStar(__webpack_require__(/*! ./compileJsonSchema */ "./src/shared/utils/compileJsonSchema.ts"), exports);
/**
 * Make a string out of an error (or other equivalents),
 * including any additional data such as stack trace if available.
 * Safe to use on unknown inputs.
 */
function stringifyError(error, noStack = false) {
    const o = stringifyErrorInner(error);
    if (noStack || !o.stack) {
        return o.message;
    }
    return `${o.message}, ${o.stack}`;
}
exports.stringifyError = stringifyError;
function stringifyErrorInner(error) {
    let message;
    let stack;
    if (typeof error === 'string') {
        message = error;
    }
    else if (error === null) {
        message = 'null';
    }
    else if (error === undefined) {
        message = 'undefined';
    }
    else if (error && typeof error === 'object') {
        if (typeof error.error === 'object' && error.error.message) {
            message = error.error.message;
            stack = error.error.stack;
        }
        else if (error.reason) {
            if (error.reason.message) {
                message = error.reason.message;
                stack = error.reason.stack || error.reason.reason;
            }
            else {
                // Is a Meteor.Error
                message = error.reason;
                stack = error.stack;
            }
        }
        else if (error.message) {
            // Is an Error
            message = error.message;
            stack = error.stack;
        }
        else if (error.details) {
            message = error.details;
        }
        else {
            try {
                // Try to stringify the object:
                message = JSON.stringify(error);
            }
            catch (e) {
                // eslint-disable-next-line @typescript-eslint/no-base-to-string
                message = `${error} (stringifyError: ${e})`;
            }
        }
    }
    else {
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        message = `${error}`;
    }
    message = `${message}`;
    return {
        message,
        stack,
    };
}
exports.stringifyErrorInner = stringifyErrorInner;
function isBrowser() {
    return typeof globalThis.window !== 'undefined';
}
exports.isBrowser = isBrowser;


/***/ }),

/***/ "./node_modules/uri-js/dist/es5/uri.all.js":
/*!*************************************************!*\
  !*** ./node_modules/uri-js/dist/es5/uri.all.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports) {

/** @license URI.js v4.4.1 (c) 2011 Gary Court. License: http://github.com/garycourt/uri-js */
(function (global, factory) {
	 true ? factory(exports) :
	0;
}(this, (function (exports) { 'use strict';

function merge() {
    for (var _len = arguments.length, sets = Array(_len), _key = 0; _key < _len; _key++) {
        sets[_key] = arguments[_key];
    }

    if (sets.length > 1) {
        sets[0] = sets[0].slice(0, -1);
        var xl = sets.length - 1;
        for (var x = 1; x < xl; ++x) {
            sets[x] = sets[x].slice(1, -1);
        }
        sets[xl] = sets[xl].slice(1);
        return sets.join('');
    } else {
        return sets[0];
    }
}
function subexp(str) {
    return "(?:" + str + ")";
}
function typeOf(o) {
    return o === undefined ? "undefined" : o === null ? "null" : Object.prototype.toString.call(o).split(" ").pop().split("]").shift().toLowerCase();
}
function toUpperCase(str) {
    return str.toUpperCase();
}
function toArray(obj) {
    return obj !== undefined && obj !== null ? obj instanceof Array ? obj : typeof obj.length !== "number" || obj.split || obj.setInterval || obj.call ? [obj] : Array.prototype.slice.call(obj) : [];
}
function assign(target, source) {
    var obj = target;
    if (source) {
        for (var key in source) {
            obj[key] = source[key];
        }
    }
    return obj;
}

function buildExps(isIRI) {
    var ALPHA$$ = "[A-Za-z]",
        CR$ = "[\\x0D]",
        DIGIT$$ = "[0-9]",
        DQUOTE$$ = "[\\x22]",
        HEXDIG$$ = merge(DIGIT$$, "[A-Fa-f]"),
        //case-insensitive
    LF$$ = "[\\x0A]",
        SP$$ = "[\\x20]",
        PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$)),
        //expanded
    GEN_DELIMS$$ = "[\\:\\/\\?\\#\\[\\]\\@]",
        SUB_DELIMS$$ = "[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]",
        RESERVED$$ = merge(GEN_DELIMS$$, SUB_DELIMS$$),
        UCSCHAR$$ = isIRI ? "[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]" : "[]",
        //subset, excludes bidi control characters
    IPRIVATE$$ = isIRI ? "[\\uE000-\\uF8FF]" : "[]",
        //subset
    UNRESERVED$$ = merge(ALPHA$$, DIGIT$$, "[\\-\\.\\_\\~]", UCSCHAR$$),
        SCHEME$ = subexp(ALPHA$$ + merge(ALPHA$$, DIGIT$$, "[\\+\\-\\.]") + "*"),
        USERINFO$ = subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:]")) + "*"),
        DEC_OCTET$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("[1-9]" + DIGIT$$) + "|" + DIGIT$$),
        DEC_OCTET_RELAXED$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("0?[1-9]" + DIGIT$$) + "|0?0?" + DIGIT$$),
        //relaxed parsing rules
    IPV4ADDRESS$ = subexp(DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$),
        H16$ = subexp(HEXDIG$$ + "{1,4}"),
        LS32$ = subexp(subexp(H16$ + "\\:" + H16$) + "|" + IPV4ADDRESS$),
        IPV6ADDRESS1$ = subexp(subexp(H16$ + "\\:") + "{6}" + LS32$),
        //                           6( h16 ":" ) ls32
    IPV6ADDRESS2$ = subexp("\\:\\:" + subexp(H16$ + "\\:") + "{5}" + LS32$),
        //                      "::" 5( h16 ":" ) ls32
    IPV6ADDRESS3$ = subexp(subexp(H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{4}" + LS32$),
        //[               h16 ] "::" 4( h16 ":" ) ls32
    IPV6ADDRESS4$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,1}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{3}" + LS32$),
        //[ *1( h16 ":" ) h16 ] "::" 3( h16 ":" ) ls32
    IPV6ADDRESS5$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,2}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{2}" + LS32$),
        //[ *2( h16 ":" ) h16 ] "::" 2( h16 ":" ) ls32
    IPV6ADDRESS6$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,3}" + H16$) + "?\\:\\:" + H16$ + "\\:" + LS32$),
        //[ *3( h16 ":" ) h16 ] "::"    h16 ":"   ls32
    IPV6ADDRESS7$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,4}" + H16$) + "?\\:\\:" + LS32$),
        //[ *4( h16 ":" ) h16 ] "::"              ls32
    IPV6ADDRESS8$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,5}" + H16$) + "?\\:\\:" + H16$),
        //[ *5( h16 ":" ) h16 ] "::"              h16
    IPV6ADDRESS9$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,6}" + H16$) + "?\\:\\:"),
        //[ *6( h16 ":" ) h16 ] "::"
    IPV6ADDRESS$ = subexp([IPV6ADDRESS1$, IPV6ADDRESS2$, IPV6ADDRESS3$, IPV6ADDRESS4$, IPV6ADDRESS5$, IPV6ADDRESS6$, IPV6ADDRESS7$, IPV6ADDRESS8$, IPV6ADDRESS9$].join("|")),
        ZONEID$ = subexp(subexp(UNRESERVED$$ + "|" + PCT_ENCODED$) + "+"),
        //RFC 6874
    IPV6ADDRZ$ = subexp(IPV6ADDRESS$ + "\\%25" + ZONEID$),
        //RFC 6874
    IPV6ADDRZ_RELAXED$ = subexp(IPV6ADDRESS$ + subexp("\\%25|\\%(?!" + HEXDIG$$ + "{2})") + ZONEID$),
        //RFC 6874, with relaxed parsing rules
    IPVFUTURE$ = subexp("[vV]" + HEXDIG$$ + "+\\." + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:]") + "+"),
        IP_LITERAL$ = subexp("\\[" + subexp(IPV6ADDRZ_RELAXED$ + "|" + IPV6ADDRESS$ + "|" + IPVFUTURE$) + "\\]"),
        //RFC 6874
    REG_NAME$ = subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$)) + "*"),
        HOST$ = subexp(IP_LITERAL$ + "|" + IPV4ADDRESS$ + "(?!" + REG_NAME$ + ")" + "|" + REG_NAME$),
        PORT$ = subexp(DIGIT$$ + "*"),
        AUTHORITY$ = subexp(subexp(USERINFO$ + "@") + "?" + HOST$ + subexp("\\:" + PORT$) + "?"),
        PCHAR$ = subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@]")),
        SEGMENT$ = subexp(PCHAR$ + "*"),
        SEGMENT_NZ$ = subexp(PCHAR$ + "+"),
        SEGMENT_NZ_NC$ = subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\@]")) + "+"),
        PATH_ABEMPTY$ = subexp(subexp("\\/" + SEGMENT$) + "*"),
        PATH_ABSOLUTE$ = subexp("\\/" + subexp(SEGMENT_NZ$ + PATH_ABEMPTY$) + "?"),
        //simplified
    PATH_NOSCHEME$ = subexp(SEGMENT_NZ_NC$ + PATH_ABEMPTY$),
        //simplified
    PATH_ROOTLESS$ = subexp(SEGMENT_NZ$ + PATH_ABEMPTY$),
        //simplified
    PATH_EMPTY$ = "(?!" + PCHAR$ + ")",
        PATH$ = subexp(PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$),
        QUERY$ = subexp(subexp(PCHAR$ + "|" + merge("[\\/\\?]", IPRIVATE$$)) + "*"),
        FRAGMENT$ = subexp(subexp(PCHAR$ + "|[\\/\\?]") + "*"),
        HIER_PART$ = subexp(subexp("\\/\\/" + AUTHORITY$ + PATH_ABEMPTY$) + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$),
        URI$ = subexp(SCHEME$ + "\\:" + HIER_PART$ + subexp("\\?" + QUERY$) + "?" + subexp("\\#" + FRAGMENT$) + "?"),
        RELATIVE_PART$ = subexp(subexp("\\/\\/" + AUTHORITY$ + PATH_ABEMPTY$) + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_EMPTY$),
        RELATIVE$ = subexp(RELATIVE_PART$ + subexp("\\?" + QUERY$) + "?" + subexp("\\#" + FRAGMENT$) + "?"),
        URI_REFERENCE$ = subexp(URI$ + "|" + RELATIVE$),
        ABSOLUTE_URI$ = subexp(SCHEME$ + "\\:" + HIER_PART$ + subexp("\\?" + QUERY$) + "?"),
        GENERIC_REF$ = "^(" + SCHEME$ + ")\\:" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?" + subexp("\\#(" + FRAGMENT$ + ")") + "?$",
        RELATIVE_REF$ = "^(){0}" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?" + subexp("\\#(" + FRAGMENT$ + ")") + "?$",
        ABSOLUTE_REF$ = "^(" + SCHEME$ + ")\\:" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?$",
        SAMEDOC_REF$ = "^" + subexp("\\#(" + FRAGMENT$ + ")") + "?$",
        AUTHORITY_REF$ = "^" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?$";
    return {
        NOT_SCHEME: new RegExp(merge("[^]", ALPHA$$, DIGIT$$, "[\\+\\-\\.]"), "g"),
        NOT_USERINFO: new RegExp(merge("[^\\%\\:]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_HOST: new RegExp(merge("[^\\%\\[\\]\\:]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_PATH: new RegExp(merge("[^\\%\\/\\:\\@]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_PATH_NOSCHEME: new RegExp(merge("[^\\%\\/\\@]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_QUERY: new RegExp(merge("[^\\%]", UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@\\/\\?]", IPRIVATE$$), "g"),
        NOT_FRAGMENT: new RegExp(merge("[^\\%]", UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@\\/\\?]"), "g"),
        ESCAPE: new RegExp(merge("[^]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        UNRESERVED: new RegExp(UNRESERVED$$, "g"),
        OTHER_CHARS: new RegExp(merge("[^\\%]", UNRESERVED$$, RESERVED$$), "g"),
        PCT_ENCODED: new RegExp(PCT_ENCODED$, "g"),
        IPV4ADDRESS: new RegExp("^(" + IPV4ADDRESS$ + ")$"),
        IPV6ADDRESS: new RegExp("^\\[?(" + IPV6ADDRESS$ + ")" + subexp(subexp("\\%25|\\%(?!" + HEXDIG$$ + "{2})") + "(" + ZONEID$ + ")") + "?\\]?$") //RFC 6874, with relaxed parsing rules
    };
}
var URI_PROTOCOL = buildExps(false);

var IRI_PROTOCOL = buildExps(true);

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/** Highest positive signed 32-bit float value */

var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

/** Bootstring parameters */
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80
var delimiter = '-'; // '\x2D'

/** Regular expressions */
var regexPunycode = /^xn--/;
var regexNonASCII = /[^\0-\x7E]/; // non-ASCII chars
var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

/** Error messages */
var errors = {
	'overflow': 'Overflow: input needs wider integers to process',
	'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
	'invalid-input': 'Invalid input'
};

/** Convenience shortcuts */
var baseMinusTMin = base - tMin;
var floor = Math.floor;
var stringFromCharCode = String.fromCharCode;

/*--------------------------------------------------------------------------*/

/**
 * A generic error utility function.
 * @private
 * @param {String} type The error type.
 * @returns {Error} Throws a `RangeError` with the applicable error message.
 */
function error$1(type) {
	throw new RangeError(errors[type]);
}

/**
 * A generic `Array#map` utility function.
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} callback The function that gets called for every array
 * item.
 * @returns {Array} A new array of values returned by the callback function.
 */
function map(array, fn) {
	var result = [];
	var length = array.length;
	while (length--) {
		result[length] = fn(array[length]);
	}
	return result;
}

/**
 * A simple `Array#map`-like wrapper to work with domain name strings or email
 * addresses.
 * @private
 * @param {String} domain The domain name or email address.
 * @param {Function} callback The function that gets called for every
 * character.
 * @returns {Array} A new string of characters returned by the callback
 * function.
 */
function mapDomain(string, fn) {
	var parts = string.split('@');
	var result = '';
	if (parts.length > 1) {
		// In email addresses, only the domain name should be punycoded. Leave
		// the local part (i.e. everything up to `@`) intact.
		result = parts[0] + '@';
		string = parts[1];
	}
	// Avoid `split(regex)` for IE8 compatibility. See #17.
	string = string.replace(regexSeparators, '\x2E');
	var labels = string.split('.');
	var encoded = map(labels, fn).join('.');
	return result + encoded;
}

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 * @see `punycode.ucs2.encode`
 * @see <https://mathiasbynens.be/notes/javascript-encoding>
 * @memberOf punycode.ucs2
 * @name decode
 * @param {String} string The Unicode input string (UCS-2).
 * @returns {Array} The new array of code points.
 */
function ucs2decode(string) {
	var output = [];
	var counter = 0;
	var length = string.length;
	while (counter < length) {
		var value = string.charCodeAt(counter++);
		if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
			// It's a high surrogate, and there is a next character.
			var extra = string.charCodeAt(counter++);
			if ((extra & 0xFC00) == 0xDC00) {
				// Low surrogate.
				output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
			} else {
				// It's an unmatched surrogate; only append this code unit, in case the
				// next code unit is the high surrogate of a surrogate pair.
				output.push(value);
				counter--;
			}
		} else {
			output.push(value);
		}
	}
	return output;
}

/**
 * Creates a string based on an array of numeric code points.
 * @see `punycode.ucs2.decode`
 * @memberOf punycode.ucs2
 * @name encode
 * @param {Array} codePoints The array of numeric code points.
 * @returns {String} The new Unicode string (UCS-2).
 */
var ucs2encode = function ucs2encode(array) {
	return String.fromCodePoint.apply(String, toConsumableArray(array));
};

/**
 * Converts a basic code point into a digit/integer.
 * @see `digitToBasic()`
 * @private
 * @param {Number} codePoint The basic numeric code point value.
 * @returns {Number} The numeric value of a basic code point (for use in
 * representing integers) in the range `0` to `base - 1`, or `base` if
 * the code point does not represent a value.
 */
var basicToDigit = function basicToDigit(codePoint) {
	if (codePoint - 0x30 < 0x0A) {
		return codePoint - 0x16;
	}
	if (codePoint - 0x41 < 0x1A) {
		return codePoint - 0x41;
	}
	if (codePoint - 0x61 < 0x1A) {
		return codePoint - 0x61;
	}
	return base;
};

/**
 * Converts a digit/integer into a basic code point.
 * @see `basicToDigit()`
 * @private
 * @param {Number} digit The numeric value of a basic code point.
 * @returns {Number} The basic code point whose value (when used for
 * representing integers) is `digit`, which needs to be in the range
 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
 * used; else, the lowercase form is used. The behavior is undefined
 * if `flag` is non-zero and `digit` has no uppercase form.
 */
var digitToBasic = function digitToBasic(digit, flag) {
	//  0..25 map to ASCII a..z or A..Z
	// 26..35 map to ASCII 0..9
	return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
};

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 * @private
 */
var adapt = function adapt(delta, numPoints, firstTime) {
	var k = 0;
	delta = firstTime ? floor(delta / damp) : delta >> 1;
	delta += floor(delta / numPoints);
	for (; /* no initialization */delta > baseMinusTMin * tMax >> 1; k += base) {
		delta = floor(delta / baseMinusTMin);
	}
	return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

/**
 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
 * symbols.
 * @memberOf punycode
 * @param {String} input The Punycode string of ASCII-only symbols.
 * @returns {String} The resulting string of Unicode symbols.
 */
var decode = function decode(input) {
	// Don't use UCS-2.
	var output = [];
	var inputLength = input.length;
	var i = 0;
	var n = initialN;
	var bias = initialBias;

	// Handle the basic code points: let `basic` be the number of input code
	// points before the last delimiter, or `0` if there is none, then copy
	// the first basic code points to the output.

	var basic = input.lastIndexOf(delimiter);
	if (basic < 0) {
		basic = 0;
	}

	for (var j = 0; j < basic; ++j) {
		// if it's not a basic code point
		if (input.charCodeAt(j) >= 0x80) {
			error$1('not-basic');
		}
		output.push(input.charCodeAt(j));
	}

	// Main decoding loop: start just after the last delimiter if any basic code
	// points were copied; start at the beginning otherwise.

	for (var index = basic > 0 ? basic + 1 : 0; index < inputLength;) /* no final expression */{

		// `index` is the index of the next character to be consumed.
		// Decode a generalized variable-length integer into `delta`,
		// which gets added to `i`. The overflow checking is easier
		// if we increase `i` as we go, then subtract off its starting
		// value at the end to obtain `delta`.
		var oldi = i;
		for (var w = 1, k = base;; /* no condition */k += base) {

			if (index >= inputLength) {
				error$1('invalid-input');
			}

			var digit = basicToDigit(input.charCodeAt(index++));

			if (digit >= base || digit > floor((maxInt - i) / w)) {
				error$1('overflow');
			}

			i += digit * w;
			var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

			if (digit < t) {
				break;
			}

			var baseMinusT = base - t;
			if (w > floor(maxInt / baseMinusT)) {
				error$1('overflow');
			}

			w *= baseMinusT;
		}

		var out = output.length + 1;
		bias = adapt(i - oldi, out, oldi == 0);

		// `i` was supposed to wrap around from `out` to `0`,
		// incrementing `n` each time, so we'll fix that now:
		if (floor(i / out) > maxInt - n) {
			error$1('overflow');
		}

		n += floor(i / out);
		i %= out;

		// Insert `n` at position `i` of the output.
		output.splice(i++, 0, n);
	}

	return String.fromCodePoint.apply(String, output);
};

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 * @memberOf punycode
 * @param {String} input The string of Unicode symbols.
 * @returns {String} The resulting Punycode string of ASCII-only symbols.
 */
var encode = function encode(input) {
	var output = [];

	// Convert the input in UCS-2 to an array of Unicode code points.
	input = ucs2decode(input);

	// Cache the length.
	var inputLength = input.length;

	// Initialize the state.
	var n = initialN;
	var delta = 0;
	var bias = initialBias;

	// Handle the basic code points.
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = input[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var _currentValue2 = _step.value;

			if (_currentValue2 < 0x80) {
				output.push(stringFromCharCode(_currentValue2));
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	var basicLength = output.length;
	var handledCPCount = basicLength;

	// `handledCPCount` is the number of code points that have been handled;
	// `basicLength` is the number of basic code points.

	// Finish the basic string with a delimiter unless it's empty.
	if (basicLength) {
		output.push(delimiter);
	}

	// Main encoding loop:
	while (handledCPCount < inputLength) {

		// All non-basic code points < n have been handled already. Find the next
		// larger one:
		var m = maxInt;
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = input[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var currentValue = _step2.value;

				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow.
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}

		var handledCPCountPlusOne = handledCPCount + 1;
		if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
			error$1('overflow');
		}

		delta += (m - n) * handledCPCountPlusOne;
		n = m;

		var _iteratorNormalCompletion3 = true;
		var _didIteratorError3 = false;
		var _iteratorError3 = undefined;

		try {
			for (var _iterator3 = input[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
				var _currentValue = _step3.value;

				if (_currentValue < n && ++delta > maxInt) {
					error$1('overflow');
				}
				if (_currentValue == n) {
					// Represent delta as a generalized variable-length integer.
					var q = delta;
					for (var k = base;; /* no condition */k += base) {
						var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
						if (q < t) {
							break;
						}
						var qMinusT = q - t;
						var baseMinusT = base - t;
						output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}
		} catch (err) {
			_didIteratorError3 = true;
			_iteratorError3 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion3 && _iterator3.return) {
					_iterator3.return();
				}
			} finally {
				if (_didIteratorError3) {
					throw _iteratorError3;
				}
			}
		}

		++delta;
		++n;
	}
	return output.join('');
};

/**
 * Converts a Punycode string representing a domain name or an email address
 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
 * it doesn't matter if you call it on a string that has already been
 * converted to Unicode.
 * @memberOf punycode
 * @param {String} input The Punycoded domain name or email address to
 * convert to Unicode.
 * @returns {String} The Unicode representation of the given Punycode
 * string.
 */
var toUnicode = function toUnicode(input) {
	return mapDomain(input, function (string) {
		return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
	});
};

/**
 * Converts a Unicode string representing a domain name or an email address to
 * Punycode. Only the non-ASCII parts of the domain name will be converted,
 * i.e. it doesn't matter if you call it with a domain that's already in
 * ASCII.
 * @memberOf punycode
 * @param {String} input The domain name or email address to convert, as a
 * Unicode string.
 * @returns {String} The Punycode representation of the given domain name or
 * email address.
 */
var toASCII = function toASCII(input) {
	return mapDomain(input, function (string) {
		return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
	});
};

/*--------------------------------------------------------------------------*/

/** Define the public API */
var punycode = {
	/**
  * A string representing the current Punycode.js version number.
  * @memberOf punycode
  * @type String
  */
	'version': '2.1.0',
	/**
  * An object of methods to convert from JavaScript's internal character
  * representation (UCS-2) to Unicode code points, and back.
  * @see <https://mathiasbynens.be/notes/javascript-encoding>
  * @memberOf punycode
  * @type Object
  */
	'ucs2': {
		'decode': ucs2decode,
		'encode': ucs2encode
	},
	'decode': decode,
	'encode': encode,
	'toASCII': toASCII,
	'toUnicode': toUnicode
};

/**
 * URI.js
 *
 * @fileoverview An RFC 3986 compliant, scheme extendable URI parsing/validating/resolving library for JavaScript.
 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
 * @see http://github.com/garycourt/uri-js
 */
/**
 * Copyright 2011 Gary Court. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are
 * permitted provided that the following conditions are met:
 *
 *    1. Redistributions of source code must retain the above copyright notice, this list of
 *       conditions and the following disclaimer.
 *
 *    2. Redistributions in binary form must reproduce the above copyright notice, this list
 *       of conditions and the following disclaimer in the documentation and/or other materials
 *       provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY GARY COURT ``AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL GARY COURT OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * The views and conclusions contained in the software and documentation are those of the
 * authors and should not be interpreted as representing official policies, either expressed
 * or implied, of Gary Court.
 */
var SCHEMES = {};
function pctEncChar(chr) {
    var c = chr.charCodeAt(0);
    var e = void 0;
    if (c < 16) e = "%0" + c.toString(16).toUpperCase();else if (c < 128) e = "%" + c.toString(16).toUpperCase();else if (c < 2048) e = "%" + (c >> 6 | 192).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();else e = "%" + (c >> 12 | 224).toString(16).toUpperCase() + "%" + (c >> 6 & 63 | 128).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
    return e;
}
function pctDecChars(str) {
    var newStr = "";
    var i = 0;
    var il = str.length;
    while (i < il) {
        var c = parseInt(str.substr(i + 1, 2), 16);
        if (c < 128) {
            newStr += String.fromCharCode(c);
            i += 3;
        } else if (c >= 194 && c < 224) {
            if (il - i >= 6) {
                var c2 = parseInt(str.substr(i + 4, 2), 16);
                newStr += String.fromCharCode((c & 31) << 6 | c2 & 63);
            } else {
                newStr += str.substr(i, 6);
            }
            i += 6;
        } else if (c >= 224) {
            if (il - i >= 9) {
                var _c = parseInt(str.substr(i + 4, 2), 16);
                var c3 = parseInt(str.substr(i + 7, 2), 16);
                newStr += String.fromCharCode((c & 15) << 12 | (_c & 63) << 6 | c3 & 63);
            } else {
                newStr += str.substr(i, 9);
            }
            i += 9;
        } else {
            newStr += str.substr(i, 3);
            i += 3;
        }
    }
    return newStr;
}
function _normalizeComponentEncoding(components, protocol) {
    function decodeUnreserved(str) {
        var decStr = pctDecChars(str);
        return !decStr.match(protocol.UNRESERVED) ? str : decStr;
    }
    if (components.scheme) components.scheme = String(components.scheme).replace(protocol.PCT_ENCODED, decodeUnreserved).toLowerCase().replace(protocol.NOT_SCHEME, "");
    if (components.userinfo !== undefined) components.userinfo = String(components.userinfo).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_USERINFO, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    if (components.host !== undefined) components.host = String(components.host).replace(protocol.PCT_ENCODED, decodeUnreserved).toLowerCase().replace(protocol.NOT_HOST, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    if (components.path !== undefined) components.path = String(components.path).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(components.scheme ? protocol.NOT_PATH : protocol.NOT_PATH_NOSCHEME, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    if (components.query !== undefined) components.query = String(components.query).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_QUERY, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    if (components.fragment !== undefined) components.fragment = String(components.fragment).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_FRAGMENT, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    return components;
}

function _stripLeadingZeros(str) {
    return str.replace(/^0*(.*)/, "$1") || "0";
}
function _normalizeIPv4(host, protocol) {
    var matches = host.match(protocol.IPV4ADDRESS) || [];

    var _matches = slicedToArray(matches, 2),
        address = _matches[1];

    if (address) {
        return address.split(".").map(_stripLeadingZeros).join(".");
    } else {
        return host;
    }
}
function _normalizeIPv6(host, protocol) {
    var matches = host.match(protocol.IPV6ADDRESS) || [];

    var _matches2 = slicedToArray(matches, 3),
        address = _matches2[1],
        zone = _matches2[2];

    if (address) {
        var _address$toLowerCase$ = address.toLowerCase().split('::').reverse(),
            _address$toLowerCase$2 = slicedToArray(_address$toLowerCase$, 2),
            last = _address$toLowerCase$2[0],
            first = _address$toLowerCase$2[1];

        var firstFields = first ? first.split(":").map(_stripLeadingZeros) : [];
        var lastFields = last.split(":").map(_stripLeadingZeros);
        var isLastFieldIPv4Address = protocol.IPV4ADDRESS.test(lastFields[lastFields.length - 1]);
        var fieldCount = isLastFieldIPv4Address ? 7 : 8;
        var lastFieldsStart = lastFields.length - fieldCount;
        var fields = Array(fieldCount);
        for (var x = 0; x < fieldCount; ++x) {
            fields[x] = firstFields[x] || lastFields[lastFieldsStart + x] || '';
        }
        if (isLastFieldIPv4Address) {
            fields[fieldCount - 1] = _normalizeIPv4(fields[fieldCount - 1], protocol);
        }
        var allZeroFields = fields.reduce(function (acc, field, index) {
            if (!field || field === "0") {
                var lastLongest = acc[acc.length - 1];
                if (lastLongest && lastLongest.index + lastLongest.length === index) {
                    lastLongest.length++;
                } else {
                    acc.push({ index: index, length: 1 });
                }
            }
            return acc;
        }, []);
        var longestZeroFields = allZeroFields.sort(function (a, b) {
            return b.length - a.length;
        })[0];
        var newHost = void 0;
        if (longestZeroFields && longestZeroFields.length > 1) {
            var newFirst = fields.slice(0, longestZeroFields.index);
            var newLast = fields.slice(longestZeroFields.index + longestZeroFields.length);
            newHost = newFirst.join(":") + "::" + newLast.join(":");
        } else {
            newHost = fields.join(":");
        }
        if (zone) {
            newHost += "%" + zone;
        }
        return newHost;
    } else {
        return host;
    }
}
var URI_PARSE = /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i;
var NO_MATCH_IS_UNDEFINED = "".match(/(){0}/)[1] === undefined;
function parse(uriString) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var components = {};
    var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
    if (options.reference === "suffix") uriString = (options.scheme ? options.scheme + ":" : "") + "//" + uriString;
    var matches = uriString.match(URI_PARSE);
    if (matches) {
        if (NO_MATCH_IS_UNDEFINED) {
            //store each component
            components.scheme = matches[1];
            components.userinfo = matches[3];
            components.host = matches[4];
            components.port = parseInt(matches[5], 10);
            components.path = matches[6] || "";
            components.query = matches[7];
            components.fragment = matches[8];
            //fix port number
            if (isNaN(components.port)) {
                components.port = matches[5];
            }
        } else {
            //IE FIX for improper RegExp matching
            //store each component
            components.scheme = matches[1] || undefined;
            components.userinfo = uriString.indexOf("@") !== -1 ? matches[3] : undefined;
            components.host = uriString.indexOf("//") !== -1 ? matches[4] : undefined;
            components.port = parseInt(matches[5], 10);
            components.path = matches[6] || "";
            components.query = uriString.indexOf("?") !== -1 ? matches[7] : undefined;
            components.fragment = uriString.indexOf("#") !== -1 ? matches[8] : undefined;
            //fix port number
            if (isNaN(components.port)) {
                components.port = uriString.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/) ? matches[4] : undefined;
            }
        }
        if (components.host) {
            //normalize IP hosts
            components.host = _normalizeIPv6(_normalizeIPv4(components.host, protocol), protocol);
        }
        //determine reference type
        if (components.scheme === undefined && components.userinfo === undefined && components.host === undefined && components.port === undefined && !components.path && components.query === undefined) {
            components.reference = "same-document";
        } else if (components.scheme === undefined) {
            components.reference = "relative";
        } else if (components.fragment === undefined) {
            components.reference = "absolute";
        } else {
            components.reference = "uri";
        }
        //check for reference errors
        if (options.reference && options.reference !== "suffix" && options.reference !== components.reference) {
            components.error = components.error || "URI is not a " + options.reference + " reference.";
        }
        //find scheme handler
        var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
        //check if scheme can't handle IRIs
        if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport)) {
            //if host component is a domain name
            if (components.host && (options.domainHost || schemeHandler && schemeHandler.domainHost)) {
                //convert Unicode IDN -> ASCII IDN
                try {
                    components.host = punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase());
                } catch (e) {
                    components.error = components.error || "Host's domain name can not be converted to ASCII via punycode: " + e;
                }
            }
            //convert IRI -> URI
            _normalizeComponentEncoding(components, URI_PROTOCOL);
        } else {
            //normalize encodings
            _normalizeComponentEncoding(components, protocol);
        }
        //perform scheme specific parsing
        if (schemeHandler && schemeHandler.parse) {
            schemeHandler.parse(components, options);
        }
    } else {
        components.error = components.error || "URI can not be parsed.";
    }
    return components;
}

function _recomposeAuthority(components, options) {
    var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
    var uriTokens = [];
    if (components.userinfo !== undefined) {
        uriTokens.push(components.userinfo);
        uriTokens.push("@");
    }
    if (components.host !== undefined) {
        //normalize IP hosts, add brackets and escape zone separator for IPv6
        uriTokens.push(_normalizeIPv6(_normalizeIPv4(String(components.host), protocol), protocol).replace(protocol.IPV6ADDRESS, function (_, $1, $2) {
            return "[" + $1 + ($2 ? "%25" + $2 : "") + "]";
        }));
    }
    if (typeof components.port === "number" || typeof components.port === "string") {
        uriTokens.push(":");
        uriTokens.push(String(components.port));
    }
    return uriTokens.length ? uriTokens.join("") : undefined;
}

var RDS1 = /^\.\.?\//;
var RDS2 = /^\/\.(\/|$)/;
var RDS3 = /^\/\.\.(\/|$)/;
var RDS5 = /^\/?(?:.|\n)*?(?=\/|$)/;
function removeDotSegments(input) {
    var output = [];
    while (input.length) {
        if (input.match(RDS1)) {
            input = input.replace(RDS1, "");
        } else if (input.match(RDS2)) {
            input = input.replace(RDS2, "/");
        } else if (input.match(RDS3)) {
            input = input.replace(RDS3, "/");
            output.pop();
        } else if (input === "." || input === "..") {
            input = "";
        } else {
            var im = input.match(RDS5);
            if (im) {
                var s = im[0];
                input = input.slice(s.length);
                output.push(s);
            } else {
                throw new Error("Unexpected dot segment condition");
            }
        }
    }
    return output.join("");
}

function serialize(components) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var protocol = options.iri ? IRI_PROTOCOL : URI_PROTOCOL;
    var uriTokens = [];
    //find scheme handler
    var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
    //perform scheme specific serialization
    if (schemeHandler && schemeHandler.serialize) schemeHandler.serialize(components, options);
    if (components.host) {
        //if host component is an IPv6 address
        if (protocol.IPV6ADDRESS.test(components.host)) {}
        //TODO: normalize IPv6 address as per RFC 5952

        //if host component is a domain name
        else if (options.domainHost || schemeHandler && schemeHandler.domainHost) {
                //convert IDN via punycode
                try {
                    components.host = !options.iri ? punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase()) : punycode.toUnicode(components.host);
                } catch (e) {
                    components.error = components.error || "Host's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
                }
            }
    }
    //normalize encoding
    _normalizeComponentEncoding(components, protocol);
    if (options.reference !== "suffix" && components.scheme) {
        uriTokens.push(components.scheme);
        uriTokens.push(":");
    }
    var authority = _recomposeAuthority(components, options);
    if (authority !== undefined) {
        if (options.reference !== "suffix") {
            uriTokens.push("//");
        }
        uriTokens.push(authority);
        if (components.path && components.path.charAt(0) !== "/") {
            uriTokens.push("/");
        }
    }
    if (components.path !== undefined) {
        var s = components.path;
        if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
            s = removeDotSegments(s);
        }
        if (authority === undefined) {
            s = s.replace(/^\/\//, "/%2F"); //don't allow the path to start with "//"
        }
        uriTokens.push(s);
    }
    if (components.query !== undefined) {
        uriTokens.push("?");
        uriTokens.push(components.query);
    }
    if (components.fragment !== undefined) {
        uriTokens.push("#");
        uriTokens.push(components.fragment);
    }
    return uriTokens.join(""); //merge tokens into a string
}

function resolveComponents(base, relative) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var skipNormalization = arguments[3];

    var target = {};
    if (!skipNormalization) {
        base = parse(serialize(base, options), options); //normalize base components
        relative = parse(serialize(relative, options), options); //normalize relative components
    }
    options = options || {};
    if (!options.tolerant && relative.scheme) {
        target.scheme = relative.scheme;
        //target.authority = relative.authority;
        target.userinfo = relative.userinfo;
        target.host = relative.host;
        target.port = relative.port;
        target.path = removeDotSegments(relative.path || "");
        target.query = relative.query;
    } else {
        if (relative.userinfo !== undefined || relative.host !== undefined || relative.port !== undefined) {
            //target.authority = relative.authority;
            target.userinfo = relative.userinfo;
            target.host = relative.host;
            target.port = relative.port;
            target.path = removeDotSegments(relative.path || "");
            target.query = relative.query;
        } else {
            if (!relative.path) {
                target.path = base.path;
                if (relative.query !== undefined) {
                    target.query = relative.query;
                } else {
                    target.query = base.query;
                }
            } else {
                if (relative.path.charAt(0) === "/") {
                    target.path = removeDotSegments(relative.path);
                } else {
                    if ((base.userinfo !== undefined || base.host !== undefined || base.port !== undefined) && !base.path) {
                        target.path = "/" + relative.path;
                    } else if (!base.path) {
                        target.path = relative.path;
                    } else {
                        target.path = base.path.slice(0, base.path.lastIndexOf("/") + 1) + relative.path;
                    }
                    target.path = removeDotSegments(target.path);
                }
                target.query = relative.query;
            }
            //target.authority = base.authority;
            target.userinfo = base.userinfo;
            target.host = base.host;
            target.port = base.port;
        }
        target.scheme = base.scheme;
    }
    target.fragment = relative.fragment;
    return target;
}

function resolve(baseURI, relativeURI, options) {
    var schemelessOptions = assign({ scheme: 'null' }, options);
    return serialize(resolveComponents(parse(baseURI, schemelessOptions), parse(relativeURI, schemelessOptions), schemelessOptions, true), schemelessOptions);
}

function normalize(uri, options) {
    if (typeof uri === "string") {
        uri = serialize(parse(uri, options), options);
    } else if (typeOf(uri) === "object") {
        uri = parse(serialize(uri, options), options);
    }
    return uri;
}

function equal(uriA, uriB, options) {
    if (typeof uriA === "string") {
        uriA = serialize(parse(uriA, options), options);
    } else if (typeOf(uriA) === "object") {
        uriA = serialize(uriA, options);
    }
    if (typeof uriB === "string") {
        uriB = serialize(parse(uriB, options), options);
    } else if (typeOf(uriB) === "object") {
        uriB = serialize(uriB, options);
    }
    return uriA === uriB;
}

function escapeComponent(str, options) {
    return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.ESCAPE : IRI_PROTOCOL.ESCAPE, pctEncChar);
}

function unescapeComponent(str, options) {
    return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.PCT_ENCODED : IRI_PROTOCOL.PCT_ENCODED, pctDecChars);
}

var handler = {
    scheme: "http",
    domainHost: true,
    parse: function parse(components, options) {
        //report missing host
        if (!components.host) {
            components.error = components.error || "HTTP URIs must have a host.";
        }
        return components;
    },
    serialize: function serialize(components, options) {
        var secure = String(components.scheme).toLowerCase() === "https";
        //normalize the default port
        if (components.port === (secure ? 443 : 80) || components.port === "") {
            components.port = undefined;
        }
        //normalize the empty path
        if (!components.path) {
            components.path = "/";
        }
        //NOTE: We do not parse query strings for HTTP URIs
        //as WWW Form Url Encoded query strings are part of the HTML4+ spec,
        //and not the HTTP spec.
        return components;
    }
};

var handler$1 = {
    scheme: "https",
    domainHost: handler.domainHost,
    parse: handler.parse,
    serialize: handler.serialize
};

function isSecure(wsComponents) {
    return typeof wsComponents.secure === 'boolean' ? wsComponents.secure : String(wsComponents.scheme).toLowerCase() === "wss";
}
//RFC 6455
var handler$2 = {
    scheme: "ws",
    domainHost: true,
    parse: function parse(components, options) {
        var wsComponents = components;
        //indicate if the secure flag is set
        wsComponents.secure = isSecure(wsComponents);
        //construct resouce name
        wsComponents.resourceName = (wsComponents.path || '/') + (wsComponents.query ? '?' + wsComponents.query : '');
        wsComponents.path = undefined;
        wsComponents.query = undefined;
        return wsComponents;
    },
    serialize: function serialize(wsComponents, options) {
        //normalize the default port
        if (wsComponents.port === (isSecure(wsComponents) ? 443 : 80) || wsComponents.port === "") {
            wsComponents.port = undefined;
        }
        //ensure scheme matches secure flag
        if (typeof wsComponents.secure === 'boolean') {
            wsComponents.scheme = wsComponents.secure ? 'wss' : 'ws';
            wsComponents.secure = undefined;
        }
        //reconstruct path from resource name
        if (wsComponents.resourceName) {
            var _wsComponents$resourc = wsComponents.resourceName.split('?'),
                _wsComponents$resourc2 = slicedToArray(_wsComponents$resourc, 2),
                path = _wsComponents$resourc2[0],
                query = _wsComponents$resourc2[1];

            wsComponents.path = path && path !== '/' ? path : undefined;
            wsComponents.query = query;
            wsComponents.resourceName = undefined;
        }
        //forbid fragment component
        wsComponents.fragment = undefined;
        return wsComponents;
    }
};

var handler$3 = {
    scheme: "wss",
    domainHost: handler$2.domainHost,
    parse: handler$2.parse,
    serialize: handler$2.serialize
};

var O = {};
var isIRI = true;
//RFC 3986
var UNRESERVED$$ = "[A-Za-z0-9\\-\\.\\_\\~" + (isIRI ? "\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF" : "") + "]";
var HEXDIG$$ = "[0-9A-Fa-f]"; //case-insensitive
var PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$)); //expanded
//RFC 5322, except these symbols as per RFC 6068: @ : / ? # [ ] & ; =
//const ATEXT$$ = "[A-Za-z0-9\\!\\#\\$\\%\\&\\'\\*\\+\\-\\/\\=\\?\\^\\_\\`\\{\\|\\}\\~]";
//const WSP$$ = "[\\x20\\x09]";
//const OBS_QTEXT$$ = "[\\x01-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]";  //(%d1-8 / %d11-12 / %d14-31 / %d127)
//const QTEXT$$ = merge("[\\x21\\x23-\\x5B\\x5D-\\x7E]", OBS_QTEXT$$);  //%d33 / %d35-91 / %d93-126 / obs-qtext
//const VCHAR$$ = "[\\x21-\\x7E]";
//const WSP$$ = "[\\x20\\x09]";
//const OBS_QP$ = subexp("\\\\" + merge("[\\x00\\x0D\\x0A]", OBS_QTEXT$$));  //%d0 / CR / LF / obs-qtext
//const FWS$ = subexp(subexp(WSP$$ + "*" + "\\x0D\\x0A") + "?" + WSP$$ + "+");
//const QUOTED_PAIR$ = subexp(subexp("\\\\" + subexp(VCHAR$$ + "|" + WSP$$)) + "|" + OBS_QP$);
//const QUOTED_STRING$ = subexp('\\"' + subexp(FWS$ + "?" + QCONTENT$) + "*" + FWS$ + "?" + '\\"');
var ATEXT$$ = "[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]";
var QTEXT$$ = "[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]";
var VCHAR$$ = merge(QTEXT$$, "[\\\"\\\\]");
var SOME_DELIMS$$ = "[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]";
var UNRESERVED = new RegExp(UNRESERVED$$, "g");
var PCT_ENCODED = new RegExp(PCT_ENCODED$, "g");
var NOT_LOCAL_PART = new RegExp(merge("[^]", ATEXT$$, "[\\.]", '[\\"]', VCHAR$$), "g");
var NOT_HFNAME = new RegExp(merge("[^]", UNRESERVED$$, SOME_DELIMS$$), "g");
var NOT_HFVALUE = NOT_HFNAME;
function decodeUnreserved(str) {
    var decStr = pctDecChars(str);
    return !decStr.match(UNRESERVED) ? str : decStr;
}
var handler$4 = {
    scheme: "mailto",
    parse: function parse$$1(components, options) {
        var mailtoComponents = components;
        var to = mailtoComponents.to = mailtoComponents.path ? mailtoComponents.path.split(",") : [];
        mailtoComponents.path = undefined;
        if (mailtoComponents.query) {
            var unknownHeaders = false;
            var headers = {};
            var hfields = mailtoComponents.query.split("&");
            for (var x = 0, xl = hfields.length; x < xl; ++x) {
                var hfield = hfields[x].split("=");
                switch (hfield[0]) {
                    case "to":
                        var toAddrs = hfield[1].split(",");
                        for (var _x = 0, _xl = toAddrs.length; _x < _xl; ++_x) {
                            to.push(toAddrs[_x]);
                        }
                        break;
                    case "subject":
                        mailtoComponents.subject = unescapeComponent(hfield[1], options);
                        break;
                    case "body":
                        mailtoComponents.body = unescapeComponent(hfield[1], options);
                        break;
                    default:
                        unknownHeaders = true;
                        headers[unescapeComponent(hfield[0], options)] = unescapeComponent(hfield[1], options);
                        break;
                }
            }
            if (unknownHeaders) mailtoComponents.headers = headers;
        }
        mailtoComponents.query = undefined;
        for (var _x2 = 0, _xl2 = to.length; _x2 < _xl2; ++_x2) {
            var addr = to[_x2].split("@");
            addr[0] = unescapeComponent(addr[0]);
            if (!options.unicodeSupport) {
                //convert Unicode IDN -> ASCII IDN
                try {
                    addr[1] = punycode.toASCII(unescapeComponent(addr[1], options).toLowerCase());
                } catch (e) {
                    mailtoComponents.error = mailtoComponents.error || "Email address's domain name can not be converted to ASCII via punycode: " + e;
                }
            } else {
                addr[1] = unescapeComponent(addr[1], options).toLowerCase();
            }
            to[_x2] = addr.join("@");
        }
        return mailtoComponents;
    },
    serialize: function serialize$$1(mailtoComponents, options) {
        var components = mailtoComponents;
        var to = toArray(mailtoComponents.to);
        if (to) {
            for (var x = 0, xl = to.length; x < xl; ++x) {
                var toAddr = String(to[x]);
                var atIdx = toAddr.lastIndexOf("@");
                var localPart = toAddr.slice(0, atIdx).replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_LOCAL_PART, pctEncChar);
                var domain = toAddr.slice(atIdx + 1);
                //convert IDN via punycode
                try {
                    domain = !options.iri ? punycode.toASCII(unescapeComponent(domain, options).toLowerCase()) : punycode.toUnicode(domain);
                } catch (e) {
                    components.error = components.error || "Email address's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
                }
                to[x] = localPart + "@" + domain;
            }
            components.path = to.join(",");
        }
        var headers = mailtoComponents.headers = mailtoComponents.headers || {};
        if (mailtoComponents.subject) headers["subject"] = mailtoComponents.subject;
        if (mailtoComponents.body) headers["body"] = mailtoComponents.body;
        var fields = [];
        for (var name in headers) {
            if (headers[name] !== O[name]) {
                fields.push(name.replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFNAME, pctEncChar) + "=" + headers[name].replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFVALUE, pctEncChar));
            }
        }
        if (fields.length) {
            components.query = fields.join("&");
        }
        return components;
    }
};

var URN_PARSE = /^([^\:]+)\:(.*)/;
//RFC 2141
var handler$5 = {
    scheme: "urn",
    parse: function parse$$1(components, options) {
        var matches = components.path && components.path.match(URN_PARSE);
        var urnComponents = components;
        if (matches) {
            var scheme = options.scheme || urnComponents.scheme || "urn";
            var nid = matches[1].toLowerCase();
            var nss = matches[2];
            var urnScheme = scheme + ":" + (options.nid || nid);
            var schemeHandler = SCHEMES[urnScheme];
            urnComponents.nid = nid;
            urnComponents.nss = nss;
            urnComponents.path = undefined;
            if (schemeHandler) {
                urnComponents = schemeHandler.parse(urnComponents, options);
            }
        } else {
            urnComponents.error = urnComponents.error || "URN can not be parsed.";
        }
        return urnComponents;
    },
    serialize: function serialize$$1(urnComponents, options) {
        var scheme = options.scheme || urnComponents.scheme || "urn";
        var nid = urnComponents.nid;
        var urnScheme = scheme + ":" + (options.nid || nid);
        var schemeHandler = SCHEMES[urnScheme];
        if (schemeHandler) {
            urnComponents = schemeHandler.serialize(urnComponents, options);
        }
        var uriComponents = urnComponents;
        var nss = urnComponents.nss;
        uriComponents.path = (nid || options.nid) + ":" + nss;
        return uriComponents;
    }
};

var UUID = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/;
//RFC 4122
var handler$6 = {
    scheme: "urn:uuid",
    parse: function parse(urnComponents, options) {
        var uuidComponents = urnComponents;
        uuidComponents.uuid = uuidComponents.nss;
        uuidComponents.nss = undefined;
        if (!options.tolerant && (!uuidComponents.uuid || !uuidComponents.uuid.match(UUID))) {
            uuidComponents.error = uuidComponents.error || "UUID is not valid.";
        }
        return uuidComponents;
    },
    serialize: function serialize(uuidComponents, options) {
        var urnComponents = uuidComponents;
        //normalize UUID
        urnComponents.nss = (uuidComponents.uuid || "").toLowerCase();
        return urnComponents;
    }
};

SCHEMES[handler.scheme] = handler;
SCHEMES[handler$1.scheme] = handler$1;
SCHEMES[handler$2.scheme] = handler$2;
SCHEMES[handler$3.scheme] = handler$3;
SCHEMES[handler$4.scheme] = handler$4;
SCHEMES[handler$5.scheme] = handler$5;
SCHEMES[handler$6.scheme] = handler$6;

exports.SCHEMES = SCHEMES;
exports.pctEncChar = pctEncChar;
exports.pctDecChars = pctDecChars;
exports.parse = parse;
exports.removeDotSegments = removeDotSegments;
exports.serialize = serialize;
exports.resolveComponents = resolveComponents;
exports.resolve = resolve;
exports.normalize = normalize;
exports.equal = equal;
exports.escapeComponent = escapeComponent;
exports.unescapeComponent = unescapeComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=uri.all.js.map


/***/ }),

/***/ "./node_modules/util/support/isBufferBrowser.js":
/*!******************************************************!*\
  !*** ./node_modules/util/support/isBufferBrowser.js ***!
  \******************************************************/
/***/ ((module) => {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ "./node_modules/util/support/types.js":
/*!********************************************!*\
  !*** ./node_modules/util/support/types.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/util/types.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9



var isArgumentsObject = __webpack_require__(/*! is-arguments */ "./node_modules/is-arguments/index.js");
var isGeneratorFunction = __webpack_require__(/*! is-generator-function */ "./node_modules/is-generator-function/index.js");
var whichTypedArray = __webpack_require__(/*! which-typed-array */ "./node_modules/which-typed-array/index.js");
var isTypedArray = __webpack_require__(/*! is-typed-array */ "./node_modules/is-typed-array/index.js");

function uncurryThis(f) {
  return f.call.bind(f);
}

var BigIntSupported = typeof BigInt !== 'undefined';
var SymbolSupported = typeof Symbol !== 'undefined';

var ObjectToString = uncurryThis(Object.prototype.toString);

var numberValue = uncurryThis(Number.prototype.valueOf);
var stringValue = uncurryThis(String.prototype.valueOf);
var booleanValue = uncurryThis(Boolean.prototype.valueOf);

if (BigIntSupported) {
  var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
}

if (SymbolSupported) {
  var symbolValue = uncurryThis(Symbol.prototype.valueOf);
}

function checkBoxedPrimitive(value, prototypeValueOf) {
  if (typeof value !== 'object') {
    return false;
  }
  try {
    prototypeValueOf(value);
    return true;
  } catch(e) {
    return false;
  }
}

exports.isArgumentsObject = isArgumentsObject;
exports.isGeneratorFunction = isGeneratorFunction;
exports.isTypedArray = isTypedArray;

// Taken from here and modified for better browser support
// https://github.com/sindresorhus/p-is-promise/blob/cda35a513bda03f977ad5cde3a079d237e82d7ef/index.js
function isPromise(input) {
	return (
		(
			typeof Promise !== 'undefined' &&
			input instanceof Promise
		) ||
		(
			input !== null &&
			typeof input === 'object' &&
			typeof input.then === 'function' &&
			typeof input.catch === 'function'
		)
	);
}
exports.isPromise = isPromise;

function isArrayBufferView(value) {
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    return ArrayBuffer.isView(value);
  }

  return (
    isTypedArray(value) ||
    isDataView(value)
  );
}
exports.isArrayBufferView = isArrayBufferView;


function isUint8Array(value) {
  return whichTypedArray(value) === 'Uint8Array';
}
exports.isUint8Array = isUint8Array;

function isUint8ClampedArray(value) {
  return whichTypedArray(value) === 'Uint8ClampedArray';
}
exports.isUint8ClampedArray = isUint8ClampedArray;

function isUint16Array(value) {
  return whichTypedArray(value) === 'Uint16Array';
}
exports.isUint16Array = isUint16Array;

function isUint32Array(value) {
  return whichTypedArray(value) === 'Uint32Array';
}
exports.isUint32Array = isUint32Array;

function isInt8Array(value) {
  return whichTypedArray(value) === 'Int8Array';
}
exports.isInt8Array = isInt8Array;

function isInt16Array(value) {
  return whichTypedArray(value) === 'Int16Array';
}
exports.isInt16Array = isInt16Array;

function isInt32Array(value) {
  return whichTypedArray(value) === 'Int32Array';
}
exports.isInt32Array = isInt32Array;

function isFloat32Array(value) {
  return whichTypedArray(value) === 'Float32Array';
}
exports.isFloat32Array = isFloat32Array;

function isFloat64Array(value) {
  return whichTypedArray(value) === 'Float64Array';
}
exports.isFloat64Array = isFloat64Array;

function isBigInt64Array(value) {
  return whichTypedArray(value) === 'BigInt64Array';
}
exports.isBigInt64Array = isBigInt64Array;

function isBigUint64Array(value) {
  return whichTypedArray(value) === 'BigUint64Array';
}
exports.isBigUint64Array = isBigUint64Array;

function isMapToString(value) {
  return ObjectToString(value) === '[object Map]';
}
isMapToString.working = (
  typeof Map !== 'undefined' &&
  isMapToString(new Map())
);

function isMap(value) {
  if (typeof Map === 'undefined') {
    return false;
  }

  return isMapToString.working
    ? isMapToString(value)
    : value instanceof Map;
}
exports.isMap = isMap;

function isSetToString(value) {
  return ObjectToString(value) === '[object Set]';
}
isSetToString.working = (
  typeof Set !== 'undefined' &&
  isSetToString(new Set())
);
function isSet(value) {
  if (typeof Set === 'undefined') {
    return false;
  }

  return isSetToString.working
    ? isSetToString(value)
    : value instanceof Set;
}
exports.isSet = isSet;

function isWeakMapToString(value) {
  return ObjectToString(value) === '[object WeakMap]';
}
isWeakMapToString.working = (
  typeof WeakMap !== 'undefined' &&
  isWeakMapToString(new WeakMap())
);
function isWeakMap(value) {
  if (typeof WeakMap === 'undefined') {
    return false;
  }

  return isWeakMapToString.working
    ? isWeakMapToString(value)
    : value instanceof WeakMap;
}
exports.isWeakMap = isWeakMap;

function isWeakSetToString(value) {
  return ObjectToString(value) === '[object WeakSet]';
}
isWeakSetToString.working = (
  typeof WeakSet !== 'undefined' &&
  isWeakSetToString(new WeakSet())
);
function isWeakSet(value) {
  return isWeakSetToString(value);
}
exports.isWeakSet = isWeakSet;

function isArrayBufferToString(value) {
  return ObjectToString(value) === '[object ArrayBuffer]';
}
isArrayBufferToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  isArrayBufferToString(new ArrayBuffer())
);
function isArrayBuffer(value) {
  if (typeof ArrayBuffer === 'undefined') {
    return false;
  }

  return isArrayBufferToString.working
    ? isArrayBufferToString(value)
    : value instanceof ArrayBuffer;
}
exports.isArrayBuffer = isArrayBuffer;

function isDataViewToString(value) {
  return ObjectToString(value) === '[object DataView]';
}
isDataViewToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  typeof DataView !== 'undefined' &&
  isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1))
);
function isDataView(value) {
  if (typeof DataView === 'undefined') {
    return false;
  }

  return isDataViewToString.working
    ? isDataViewToString(value)
    : value instanceof DataView;
}
exports.isDataView = isDataView;

// Store a copy of SharedArrayBuffer in case it's deleted elsewhere
var SharedArrayBufferCopy = typeof SharedArrayBuffer !== 'undefined' ? SharedArrayBuffer : undefined;
function isSharedArrayBufferToString(value) {
  return ObjectToString(value) === '[object SharedArrayBuffer]';
}
function isSharedArrayBuffer(value) {
  if (typeof SharedArrayBufferCopy === 'undefined') {
    return false;
  }

  if (typeof isSharedArrayBufferToString.working === 'undefined') {
    isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
  }

  return isSharedArrayBufferToString.working
    ? isSharedArrayBufferToString(value)
    : value instanceof SharedArrayBufferCopy;
}
exports.isSharedArrayBuffer = isSharedArrayBuffer;

function isAsyncFunction(value) {
  return ObjectToString(value) === '[object AsyncFunction]';
}
exports.isAsyncFunction = isAsyncFunction;

function isMapIterator(value) {
  return ObjectToString(value) === '[object Map Iterator]';
}
exports.isMapIterator = isMapIterator;

function isSetIterator(value) {
  return ObjectToString(value) === '[object Set Iterator]';
}
exports.isSetIterator = isSetIterator;

function isGeneratorObject(value) {
  return ObjectToString(value) === '[object Generator]';
}
exports.isGeneratorObject = isGeneratorObject;

function isWebAssemblyCompiledModule(value) {
  return ObjectToString(value) === '[object WebAssembly.Module]';
}
exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;

function isNumberObject(value) {
  return checkBoxedPrimitive(value, numberValue);
}
exports.isNumberObject = isNumberObject;

function isStringObject(value) {
  return checkBoxedPrimitive(value, stringValue);
}
exports.isStringObject = isStringObject;

function isBooleanObject(value) {
  return checkBoxedPrimitive(value, booleanValue);
}
exports.isBooleanObject = isBooleanObject;

function isBigIntObject(value) {
  return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
}
exports.isBigIntObject = isBigIntObject;

function isSymbolObject(value) {
  return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
}
exports.isSymbolObject = isSymbolObject;

function isBoxedPrimitive(value) {
  return (
    isNumberObject(value) ||
    isStringObject(value) ||
    isBooleanObject(value) ||
    isBigIntObject(value) ||
    isSymbolObject(value)
  );
}
exports.isBoxedPrimitive = isBoxedPrimitive;

function isAnyArrayBuffer(value) {
  return typeof Uint8Array !== 'undefined' && (
    isArrayBuffer(value) ||
    isSharedArrayBuffer(value)
  );
}
exports.isAnyArrayBuffer = isAnyArrayBuffer;

['isProxy', 'isExternal', 'isModuleNamespaceObject'].forEach(function(method) {
  Object.defineProperty(exports, method, {
    enumerable: false,
    value: function() {
      throw new Error(method + ' is not supported in userland');
    }
  });
});


/***/ }),

/***/ "./node_modules/util/util.js":
/*!***********************************!*\
  !*** ./node_modules/util/util.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* provided dependency */ var process = __webpack_require__(/*! process/browser */ "./node_modules/process/browser.js");
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnvRegex = /^$/;

if (process.env.NODE_DEBUG) {
  var debugEnv = process.env.NODE_DEBUG;
  debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
    .replace(/\*/g, '.*')
    .replace(/,/g, '$|^')
    .toUpperCase();
  debugEnvRegex = new RegExp('^' + debugEnv + '$', 'i');
}
exports.debuglog = function(set) {
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (debugEnvRegex.test(set)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').slice(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.slice(1, -1);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
exports.types = __webpack_require__(/*! ./support/types */ "./node_modules/util/support/types.js");

function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;
exports.types.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;
exports.types.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;
exports.types.isNativeError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ "./node_modules/util/support/isBufferBrowser.js");

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
}

exports.promisify.custom = kCustomPromisifiedSymbol

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb.bind(null, null, ret)) },
            function(rej) { process.nextTick(callbackifyOnRejected.bind(null, rej, cb)) });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;


/***/ }),

/***/ "./node_modules/which-typed-array/index.js":
/*!*************************************************!*\
  !*** ./node_modules/which-typed-array/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var forEach = __webpack_require__(/*! for-each */ "./node_modules/for-each/index.js");
var availableTypedArrays = __webpack_require__(/*! available-typed-arrays */ "./node_modules/available-typed-arrays/index.js");
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");
var gOPD = __webpack_require__(/*! gopd */ "./node_modules/gopd/index.js");

var $toString = callBound('Object.prototype.toString');
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;
var typedArrays = availableTypedArrays();

var $slice = callBound('String.prototype.slice');
var toStrTags = {};
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		if (typeof g[typedArray] === 'function') {
			var arr = new g[typedArray]();
			if (Symbol.toStringTag in arr) {
				var proto = getPrototypeOf(arr);
				var descriptor = gOPD(proto, Symbol.toStringTag);
				if (!descriptor) {
					var superProto = getPrototypeOf(proto);
					descriptor = gOPD(superProto, Symbol.toStringTag);
				}
				toStrTags[typedArray] = descriptor.get;
			}
		}
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	var foundName = false;
	forEach(toStrTags, function (getter, typedArray) {
		if (!foundName) {
			try {
				var name = getter.call(value);
				if (name === typedArray) {
					foundName = name;
				}
			} catch (e) {}
		}
	});
	return foundName;
};

var isTypedArray = __webpack_require__(/*! is-typed-array */ "./node_modules/is-typed-array/index.js");

module.exports = function whichTypedArray(value) {
	if (!isTypedArray(value)) { return false; }
	if (!hasToStringTag || !(Symbol.toStringTag in value)) { return $slice($toString(value), 8, -1); }
	return tryTypedArrays(value);
};


/***/ }),

/***/ "./node_modules/available-typed-arrays/index.js":
/*!******************************************************!*\
  !*** ./node_modules/available-typed-arrays/index.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var possibleNames = [
	'BigInt64Array',
	'BigUint64Array',
	'Float32Array',
	'Float64Array',
	'Int16Array',
	'Int32Array',
	'Int8Array',
	'Uint16Array',
	'Uint32Array',
	'Uint8Array',
	'Uint8ClampedArray'
];

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;

module.exports = function availableTypedArrays() {
	var out = [];
	for (var i = 0; i < possibleNames.length; i++) {
		if (typeof g[possibleNames[i]] === 'function') {
			out[out.length] = possibleNames[i];
		}
	}
	return out;
};


/***/ }),

/***/ "./node_modules/fast-equals/dist/esm/index.mjs":
/*!*****************************************************!*\
  !*** ./node_modules/fast-equals/dist/esm/index.mjs ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "circularDeepEqual": () => (/* binding */ circularDeepEqual),
/* harmony export */   "circularShallowEqual": () => (/* binding */ circularShallowEqual),
/* harmony export */   "createCustomEqual": () => (/* binding */ createCustomEqual),
/* harmony export */   "deepEqual": () => (/* binding */ deepEqual),
/* harmony export */   "sameValueZeroEqual": () => (/* binding */ sameValueZeroEqual),
/* harmony export */   "shallowEqual": () => (/* binding */ shallowEqual),
/* harmony export */   "strictCircularDeepEqual": () => (/* binding */ strictCircularDeepEqual),
/* harmony export */   "strictCircularShallowEqual": () => (/* binding */ strictCircularShallowEqual),
/* harmony export */   "strictDeepEqual": () => (/* binding */ strictDeepEqual),
/* harmony export */   "strictShallowEqual": () => (/* binding */ strictShallowEqual)
/* harmony export */ });
var getOwnPropertyNames = Object.getOwnPropertyNames, getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * Combine two comparators into a single comparators.
 */
function combineComparators(comparatorA, comparatorB) {
    return function isEqual(a, b, state) {
        return comparatorA(a, b, state) && comparatorB(a, b, state);
    };
}
/**
 * Wrap the provided `areItemsEqual` method to manage the circular state, allowing
 * for circular references to be safely included in the comparison without creating
 * stack overflows.
 */
function createIsCircular(areItemsEqual) {
    return function isCircular(a, b, state) {
        if (!a || !b || typeof a !== 'object' || typeof b !== 'object') {
            return areItemsEqual(a, b, state);
        }
        var cache = state.cache;
        var cachedA = cache.get(a);
        var cachedB = cache.get(b);
        if (cachedA && cachedB) {
            return cachedA === b && cachedB === a;
        }
        cache.set(a, b);
        cache.set(b, a);
        var result = areItemsEqual(a, b, state);
        cache.delete(a);
        cache.delete(b);
        return result;
    };
}
/**
 * Get the properties to strictly examine, which include both own properties that are
 * not enumerable and symbol properties.
 */
function getStrictProperties(object) {
    return getOwnPropertyNames(object).concat(getOwnPropertySymbols(object));
}
/**
 * Whether the object contains the property passed as an own property.
 */
var hasOwn = Object.hasOwn ||
    (function (object, property) {
        return hasOwnProperty.call(object, property);
    });
/**
 * Whether the values passed are strictly equal or both NaN.
 */
function sameValueZeroEqual(a, b) {
    return a || b ? a === b : a === b || (a !== a && b !== b);
}

var OWNER = '_owner';
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor, keys = Object.keys;
/**
 * Whether the arrays are equal in value.
 */
function areArraysEqual(a, b, state) {
    var index = a.length;
    if (b.length !== index) {
        return false;
    }
    while (index-- > 0) {
        if (!state.equals(a[index], b[index], index, index, a, b, state)) {
            return false;
        }
    }
    return true;
}
/**
 * Whether the dates passed are equal in value.
 */
function areDatesEqual(a, b) {
    return sameValueZeroEqual(a.getTime(), b.getTime());
}
/**
 * Whether the `Map`s are equal in value.
 */
function areMapsEqual(a, b, state) {
    if (a.size !== b.size) {
        return false;
    }
    var matchedIndices = {};
    var aIterable = a.entries();
    var index = 0;
    var aResult;
    var bResult;
    while ((aResult = aIterable.next())) {
        if (aResult.done) {
            break;
        }
        var bIterable = b.entries();
        var hasMatch = false;
        var matchIndex = 0;
        while ((bResult = bIterable.next())) {
            if (bResult.done) {
                break;
            }
            var _a = aResult.value, aKey = _a[0], aValue = _a[1];
            var _b = bResult.value, bKey = _b[0], bValue = _b[1];
            if (!hasMatch &&
                !matchedIndices[matchIndex] &&
                (hasMatch =
                    state.equals(aKey, bKey, index, matchIndex, a, b, state) &&
                        state.equals(aValue, bValue, aKey, bKey, a, b, state))) {
                matchedIndices[matchIndex] = true;
            }
            matchIndex++;
        }
        if (!hasMatch) {
            return false;
        }
        index++;
    }
    return true;
}
/**
 * Whether the objects are equal in value.
 */
function areObjectsEqual(a, b, state) {
    var properties = keys(a);
    var index = properties.length;
    if (keys(b).length !== index) {
        return false;
    }
    var property;
    // Decrementing `while` showed faster results than either incrementing or
    // decrementing `for` loop and than an incrementing `while` loop. Declarative
    // methods like `some` / `every` were not used to avoid incurring the garbage
    // cost of anonymous callbacks.
    while (index-- > 0) {
        property = properties[index];
        if (property === OWNER &&
            (a.$$typeof || b.$$typeof) &&
            a.$$typeof !== b.$$typeof) {
            return false;
        }
        if (!hasOwn(b, property) ||
            !state.equals(a[property], b[property], property, property, a, b, state)) {
            return false;
        }
    }
    return true;
}
/**
 * Whether the objects are equal in value with strict property checking.
 */
function areObjectsEqualStrict(a, b, state) {
    var properties = getStrictProperties(a);
    var index = properties.length;
    if (getStrictProperties(b).length !== index) {
        return false;
    }
    var property;
    var descriptorA;
    var descriptorB;
    // Decrementing `while` showed faster results than either incrementing or
    // decrementing `for` loop and than an incrementing `while` loop. Declarative
    // methods like `some` / `every` were not used to avoid incurring the garbage
    // cost of anonymous callbacks.
    while (index-- > 0) {
        property = properties[index];
        if (property === OWNER &&
            (a.$$typeof || b.$$typeof) &&
            a.$$typeof !== b.$$typeof) {
            return false;
        }
        if (!hasOwn(b, property)) {
            return false;
        }
        if (!state.equals(a[property], b[property], property, property, a, b, state)) {
            return false;
        }
        descriptorA = getOwnPropertyDescriptor(a, property);
        descriptorB = getOwnPropertyDescriptor(b, property);
        if ((descriptorA || descriptorB) &&
            (!descriptorA ||
                !descriptorB ||
                descriptorA.configurable !== descriptorB.configurable ||
                descriptorA.enumerable !== descriptorB.enumerable ||
                descriptorA.writable !== descriptorB.writable)) {
            return false;
        }
    }
    return true;
}
/**
 * Whether the primitive wrappers passed are equal in value.
 */
function arePrimitiveWrappersEqual(a, b) {
    return sameValueZeroEqual(a.valueOf(), b.valueOf());
}
/**
 * Whether the regexps passed are equal in value.
 */
function areRegExpsEqual(a, b) {
    return a.source === b.source && a.flags === b.flags;
}
/**
 * Whether the `Set`s are equal in value.
 */
function areSetsEqual(a, b, state) {
    if (a.size !== b.size) {
        return false;
    }
    var matchedIndices = {};
    var aIterable = a.values();
    var aResult;
    var bResult;
    while ((aResult = aIterable.next())) {
        if (aResult.done) {
            break;
        }
        var bIterable = b.values();
        var hasMatch = false;
        var matchIndex = 0;
        while ((bResult = bIterable.next())) {
            if (bResult.done) {
                break;
            }
            if (!hasMatch &&
                !matchedIndices[matchIndex] &&
                (hasMatch = state.equals(aResult.value, bResult.value, aResult.value, bResult.value, a, b, state))) {
                matchedIndices[matchIndex] = true;
            }
            matchIndex++;
        }
        if (!hasMatch) {
            return false;
        }
    }
    return true;
}
/**
 * Whether the TypedArray instances are equal in value.
 */
function areTypedArraysEqual(a, b) {
    var index = a.length;
    if (b.length !== index) {
        return false;
    }
    while (index-- > 0) {
        if (a[index] !== b[index]) {
            return false;
        }
    }
    return true;
}

var ARGUMENTS_TAG = '[object Arguments]';
var BOOLEAN_TAG = '[object Boolean]';
var DATE_TAG = '[object Date]';
var MAP_TAG = '[object Map]';
var NUMBER_TAG = '[object Number]';
var OBJECT_TAG = '[object Object]';
var REG_EXP_TAG = '[object RegExp]';
var SET_TAG = '[object Set]';
var STRING_TAG = '[object String]';
var isArray = Array.isArray;
var isTypedArray = typeof ArrayBuffer === 'function' && ArrayBuffer.isView
    ? ArrayBuffer.isView
    : null;
var assign = Object.assign;
var getTag = Object.prototype.toString.call.bind(Object.prototype.toString);
/**
 * Create a comparator method based on the type-specific equality comparators passed.
 */
function createEqualityComparator(_a) {
    var areArraysEqual = _a.areArraysEqual, areDatesEqual = _a.areDatesEqual, areMapsEqual = _a.areMapsEqual, areObjectsEqual = _a.areObjectsEqual, arePrimitiveWrappersEqual = _a.arePrimitiveWrappersEqual, areRegExpsEqual = _a.areRegExpsEqual, areSetsEqual = _a.areSetsEqual, areTypedArraysEqual = _a.areTypedArraysEqual;
    /**
     * compare the value of the two objects and return true if they are equivalent in values
     */
    return function comparator(a, b, state) {
        // If the items are strictly equal, no need to do a value comparison.
        if (a === b) {
            return true;
        }
        // If the items are not non-nullish objects, then the only possibility
        // of them being equal but not strictly is if they are both `NaN`. Since
        // `NaN` is uniquely not equal to itself, we can use self-comparison of
        // both objects, which is faster than `isNaN()`.
        if (a == null ||
            b == null ||
            typeof a !== 'object' ||
            typeof b !== 'object') {
            return a !== a && b !== b;
        }
        var constructor = a.constructor;
        // Checks are listed in order of commonality of use-case:
        //   1. Common complex object types (plain object, array)
        //   2. Common data values (date, regexp)
        //   3. Less-common complex object types (map, set)
        //   4. Less-common data values (promise, primitive wrappers)
        // Inherently this is both subjective and assumptive, however
        // when reviewing comparable libraries in the wild this order
        // appears to be generally consistent.
        // Constructors should match, otherwise there is potential for false positives
        // between class and subclass or custom object and POJO.
        if (constructor !== b.constructor) {
            return false;
        }
        // `isPlainObject` only checks against the object's own realm. Cross-realm
        // comparisons are rare, and will be handled in the ultimate fallback, so
        // we can avoid capturing the string tag.
        if (constructor === Object) {
            return areObjectsEqual(a, b, state);
        }
        // `isArray()` works on subclasses and is cross-realm, so we can avoid capturing
        // the string tag or doing an `instanceof` check.
        if (isArray(a)) {
            return areArraysEqual(a, b, state);
        }
        // `isTypedArray()` works on all possible TypedArray classes, so we can avoid
        // capturing the string tag or comparing against all possible constructors.
        if (isTypedArray != null && isTypedArray(a)) {
            return areTypedArraysEqual(a, b, state);
        }
        // Try to fast-path equality checks for other complex object types in the
        // same realm to avoid capturing the string tag. Strict equality is used
        // instead of `instanceof` because it is more performant for the common
        // use-case. If someone is subclassing a native class, it will be handled
        // with the string tag comparison.
        if (constructor === Date) {
            return areDatesEqual(a, b, state);
        }
        if (constructor === RegExp) {
            return areRegExpsEqual(a, b, state);
        }
        if (constructor === Map) {
            return areMapsEqual(a, b, state);
        }
        if (constructor === Set) {
            return areSetsEqual(a, b, state);
        }
        // Since this is a custom object, capture the string tag to determing its type.
        // This is reasonably performant in modern environments like v8 and SpiderMonkey.
        var tag = getTag(a);
        if (tag === DATE_TAG) {
            return areDatesEqual(a, b, state);
        }
        if (tag === REG_EXP_TAG) {
            return areRegExpsEqual(a, b, state);
        }
        if (tag === MAP_TAG) {
            return areMapsEqual(a, b, state);
        }
        if (tag === SET_TAG) {
            return areSetsEqual(a, b, state);
        }
        if (tag === OBJECT_TAG) {
            // The exception for value comparison is custom `Promise`-like class instances. These should
            // be treated the same as standard `Promise` objects, which means strict equality, and if
            // it reaches this point then that strict equality comparison has already failed.
            return (typeof a.then !== 'function' &&
                typeof b.then !== 'function' &&
                areObjectsEqual(a, b, state));
        }
        // If an arguments tag, it should be treated as a standard object.
        if (tag === ARGUMENTS_TAG) {
            return areObjectsEqual(a, b, state);
        }
        // As the penultimate fallback, check if the values passed are primitive wrappers. This
        // is very rare in modern JS, which is why it is deprioritized compared to all other object
        // types.
        if (tag === BOOLEAN_TAG || tag === NUMBER_TAG || tag === STRING_TAG) {
            return arePrimitiveWrappersEqual(a, b, state);
        }
        // If not matching any tags that require a specific type of comparison, then we hard-code false because
        // the only thing remaining is strict equality, which has already been compared. This is for a few reasons:
        //   - Certain types that cannot be introspected (e.g., `WeakMap`). For these types, this is the only
        //     comparison that can be made.
        //   - For types that can be introspected, but rarely have requirements to be compared
        //     (`ArrayBuffer`, `DataView`, etc.), the cost is avoided to prioritize the common
        //     use-cases (may be included in a future release, if requested enough).
        //   - For types that can be introspected but do not have an objective definition of what
        //     equality is (`Error`, etc.), the subjective decision is to be conservative and strictly compare.
        // In all cases, these decisions should be reevaluated based on changes to the language and
        // common development practices.
        return false;
    };
}
/**
 * Create the configuration object used for building comparators.
 */
function createEqualityComparatorConfig(_a) {
    var circular = _a.circular, createCustomConfig = _a.createCustomConfig, strict = _a.strict;
    var config = {
        areArraysEqual: strict
            ? areObjectsEqualStrict
            : areArraysEqual,
        areDatesEqual: areDatesEqual,
        areMapsEqual: strict
            ? combineComparators(areMapsEqual, areObjectsEqualStrict)
            : areMapsEqual,
        areObjectsEqual: strict
            ? areObjectsEqualStrict
            : areObjectsEqual,
        arePrimitiveWrappersEqual: arePrimitiveWrappersEqual,
        areRegExpsEqual: areRegExpsEqual,
        areSetsEqual: strict
            ? combineComparators(areSetsEqual, areObjectsEqualStrict)
            : areSetsEqual,
        areTypedArraysEqual: strict
            ? areObjectsEqualStrict
            : areTypedArraysEqual,
    };
    if (createCustomConfig) {
        config = assign({}, config, createCustomConfig(config));
    }
    if (circular) {
        var areArraysEqual$1 = createIsCircular(config.areArraysEqual);
        var areMapsEqual$1 = createIsCircular(config.areMapsEqual);
        var areObjectsEqual$1 = createIsCircular(config.areObjectsEqual);
        var areSetsEqual$1 = createIsCircular(config.areSetsEqual);
        config = assign({}, config, {
            areArraysEqual: areArraysEqual$1,
            areMapsEqual: areMapsEqual$1,
            areObjectsEqual: areObjectsEqual$1,
            areSetsEqual: areSetsEqual$1,
        });
    }
    return config;
}
/**
 * Default equality comparator pass-through, used as the standard `isEqual` creator for
 * use inside the built comparator.
 */
function createInternalEqualityComparator(compare) {
    return function (a, b, _indexOrKeyA, _indexOrKeyB, _parentA, _parentB, state) {
        return compare(a, b, state);
    };
}
/**
 * Create the `isEqual` function used by the consuming application.
 */
function createIsEqual(_a) {
    var circular = _a.circular, comparator = _a.comparator, createState = _a.createState, equals = _a.equals, strict = _a.strict;
    if (createState) {
        return function isEqual(a, b) {
            var _a = createState(), _b = _a.cache, cache = _b === void 0 ? circular ? new WeakMap() : undefined : _b, meta = _a.meta;
            return comparator(a, b, {
                cache: cache,
                equals: equals,
                meta: meta,
                strict: strict,
            });
        };
    }
    if (circular) {
        return function isEqual(a, b) {
            return comparator(a, b, {
                cache: new WeakMap(),
                equals: equals,
                meta: undefined,
                strict: strict,
            });
        };
    }
    var state = {
        cache: undefined,
        equals: equals,
        meta: undefined,
        strict: strict,
    };
    return function isEqual(a, b) {
        return comparator(a, b, state);
    };
}

/**
 * Whether the items passed are deeply-equal in value.
 */
var deepEqual = createCustomEqual();
/**
 * Whether the items passed are deeply-equal in value based on strict comparison.
 */
var strictDeepEqual = createCustomEqual({ strict: true });
/**
 * Whether the items passed are deeply-equal in value, including circular references.
 */
var circularDeepEqual = createCustomEqual({ circular: true });
/**
 * Whether the items passed are deeply-equal in value, including circular references,
 * based on strict comparison.
 */
var strictCircularDeepEqual = createCustomEqual({
    circular: true,
    strict: true,
});
/**
 * Whether the items passed are shallowly-equal in value.
 */
var shallowEqual = createCustomEqual({
    createInternalComparator: function () { return sameValueZeroEqual; },
});
/**
 * Whether the items passed are shallowly-equal in value based on strict comparison
 */
var strictShallowEqual = createCustomEqual({
    strict: true,
    createInternalComparator: function () { return sameValueZeroEqual; },
});
/**
 * Whether the items passed are shallowly-equal in value, including circular references.
 */
var circularShallowEqual = createCustomEqual({
    circular: true,
    createInternalComparator: function () { return sameValueZeroEqual; },
});
/**
 * Whether the items passed are shallowly-equal in value, including circular references,
 * based on strict comparison.
 */
var strictCircularShallowEqual = createCustomEqual({
    circular: true,
    createInternalComparator: function () { return sameValueZeroEqual; },
    strict: true,
});
/**
 * Create a custom equality comparison method.
 *
 * This can be done to create very targeted comparisons in extreme hot-path scenarios
 * where the standard methods are not performant enough, but can also be used to provide
 * support for legacy environments that do not support expected features like
 * `RegExp.prototype.flags` out of the box.
 */
function createCustomEqual(options) {
    if (options === void 0) { options = {}; }
    var _a = options.circular, circular = _a === void 0 ? false : _a, createCustomInternalComparator = options.createInternalComparator, createState = options.createState, _b = options.strict, strict = _b === void 0 ? false : _b;
    var config = createEqualityComparatorConfig(options);
    var comparator = createEqualityComparator(config);
    var equals = createCustomInternalComparator
        ? createCustomInternalComparator(comparator)
        : createInternalEqualityComparator(comparator);
    return createIsEqual({ circular: circular, comparator: comparator, createState: createState, equals: equals, strict: strict });
}


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "./node_modules/klona/json/index.mjs":
/*!*******************************************!*\
  !*** ./node_modules/klona/json/index.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "klona": () => (/* binding */ klona)
/* harmony export */ });
function klona(val) {
	var k, out, tmp;

	if (Array.isArray(val)) {
		out = Array(k=val.length);
		while (k--) out[k] = (tmp=val[k]) && typeof tmp === 'object' ? klona(tmp) : tmp;
		return out;
	}

	if (Object.prototype.toString.call(val) === '[object Object]') {
		out = {}; // null
		for (k in val) {
			if (k === '__proto__') {
				Object.defineProperty(out, k, {
					value: klona(val[k]),
					configurable: true,
					enumerable: true,
					writable: true,
				});
			} else {
				out[k] = (tmp=val[k]) && typeof tmp === 'object' ? klona(tmp) : tmp;
			}
		}
		return out;
	}

	return val;
}


/***/ }),

/***/ "./node_modules/ajv-draft-04/dist/refs/json-schema-draft-04.json":
/*!***********************************************************************!*\
  !*** ./node_modules/ajv-draft-04/dist/refs/json-schema-draft-04.json ***!
  \***********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"id":"http://json-schema.org/draft-04/schema#","$schema":"http://json-schema.org/draft-04/schema#","description":"Core schema meta-schema","definitions":{"schemaArray":{"type":"array","minItems":1,"items":{"$ref":"#"}},"positiveInteger":{"type":"integer","minimum":0},"positiveIntegerDefault0":{"allOf":[{"$ref":"#/definitions/positiveInteger"},{"default":0}]},"simpleTypes":{"enum":["array","boolean","integer","null","number","object","string"]},"stringArray":{"type":"array","items":{"type":"string"},"minItems":1,"uniqueItems":true}},"type":"object","properties":{"id":{"type":"string","format":"uri"},"$schema":{"type":"string","format":"uri"},"title":{"type":"string"},"description":{"type":"string"},"default":{},"multipleOf":{"type":"number","minimum":0,"exclusiveMinimum":true},"maximum":{"type":"number"},"exclusiveMaximum":{"type":"boolean","default":false},"minimum":{"type":"number"},"exclusiveMinimum":{"type":"boolean","default":false},"maxLength":{"$ref":"#/definitions/positiveInteger"},"minLength":{"$ref":"#/definitions/positiveIntegerDefault0"},"pattern":{"type":"string","format":"regex"},"additionalItems":{"anyOf":[{"type":"boolean"},{"$ref":"#"}],"default":{}},"items":{"anyOf":[{"$ref":"#"},{"$ref":"#/definitions/schemaArray"}],"default":{}},"maxItems":{"$ref":"#/definitions/positiveInteger"},"minItems":{"$ref":"#/definitions/positiveIntegerDefault0"},"uniqueItems":{"type":"boolean","default":false},"maxProperties":{"$ref":"#/definitions/positiveInteger"},"minProperties":{"$ref":"#/definitions/positiveIntegerDefault0"},"required":{"$ref":"#/definitions/stringArray"},"additionalProperties":{"anyOf":[{"type":"boolean"},{"$ref":"#"}],"default":{}},"definitions":{"type":"object","additionalProperties":{"$ref":"#"},"default":{}},"properties":{"type":"object","additionalProperties":{"$ref":"#"},"default":{}},"patternProperties":{"type":"object","additionalProperties":{"$ref":"#"},"default":{}},"dependencies":{"type":"object","additionalProperties":{"anyOf":[{"$ref":"#"},{"$ref":"#/definitions/stringArray"}]}},"enum":{"type":"array","minItems":1,"uniqueItems":true},"type":{"anyOf":[{"$ref":"#/definitions/simpleTypes"},{"type":"array","items":{"$ref":"#/definitions/simpleTypes"},"minItems":1,"uniqueItems":true}]},"allOf":{"$ref":"#/definitions/schemaArray"},"anyOf":{"$ref":"#/definitions/schemaArray"},"oneOf":{"$ref":"#/definitions/schemaArray"},"not":{"$ref":"#"}},"dependencies":{"exclusiveMaximum":["maximum"],"exclusiveMinimum":["minimum"]},"default":{}}');

/***/ }),

/***/ "./node_modules/ajv/dist/refs/data.json":
/*!**********************************************!*\
  !*** ./node_modules/ajv/dist/refs/data.json ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"$id":"https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#","description":"Meta-schema for $data reference (JSON AnySchema extension proposal)","type":"object","required":["$data"],"properties":{"$data":{"type":"string","anyOf":[{"format":"relative-json-pointer"},{"format":"json-pointer"}]}},"additionalProperties":false}');

/***/ }),

/***/ "./node_modules/ajv/dist/refs/json-schema-2019-09/meta/applicator.json":
/*!*****************************************************************************!*\
  !*** ./node_modules/ajv/dist/refs/json-schema-2019-09/meta/applicator.json ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"$schema":"https://json-schema.org/draft/2019-09/schema","$id":"https://json-schema.org/draft/2019-09/meta/applicator","$vocabulary":{"https://json-schema.org/draft/2019-09/vocab/applicator":true},"$recursiveAnchor":true,"title":"Applicator vocabulary meta-schema","type":["object","boolean"],"properties":{"additionalItems":{"$recursiveRef":"#"},"unevaluatedItems":{"$recursiveRef":"#"},"items":{"anyOf":[{"$recursiveRef":"#"},{"$ref":"#/$defs/schemaArray"}]},"contains":{"$recursiveRef":"#"},"additionalProperties":{"$recursiveRef":"#"},"unevaluatedProperties":{"$recursiveRef":"#"},"properties":{"type":"object","additionalProperties":{"$recursiveRef":"#"},"default":{}},"patternProperties":{"type":"object","additionalProperties":{"$recursiveRef":"#"},"propertyNames":{"format":"regex"},"default":{}},"dependentSchemas":{"type":"object","additionalProperties":{"$recursiveRef":"#"}},"propertyNames":{"$recursiveRef":"#"},"if":{"$recursiveRef":"#"},"then":{"$recursiveRef":"#"},"else":{"$recursiveRef":"#"},"allOf":{"$ref":"#/$defs/schemaArray"},"anyOf":{"$ref":"#/$defs/schemaArray"},"oneOf":{"$ref":"#/$defs/schemaArray"},"not":{"$recursiveRef":"#"}},"$defs":{"schemaArray":{"type":"array","minItems":1,"items":{"$recursiveRef":"#"}}}}');

/***/ }),

/***/ "./node_modules/ajv/dist/refs/json-schema-2019-09/meta/content.json":
/*!**************************************************************************!*\
  !*** ./node_modules/ajv/dist/refs/json-schema-2019-09/meta/content.json ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"$schema":"https://json-schema.org/draft/2019-09/schema","$id":"https://json-schema.org/draft/2019-09/meta/content","$vocabulary":{"https://json-schema.org/draft/2019-09/vocab/content":true},"$recursiveAnchor":true,"title":"Content vocabulary meta-schema","type":["object","boolean"],"properties":{"contentMediaType":{"type":"string"},"contentEncoding":{"type":"string"},"contentSchema":{"$recursiveRef":"#"}}}');

/***/ }),

/***/ "./node_modules/ajv/dist/refs/json-schema-2019-09/meta/core.json":
/*!***********************************************************************!*\
  !*** ./node_modules/ajv/dist/refs/json-schema-2019-09/meta/core.json ***!
  \***********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"$schema":"https://json-schema.org/draft/2019-09/schema","$id":"https://json-schema.org/draft/2019-09/meta/core","$vocabulary":{"https://json-schema.org/draft/2019-09/vocab/core":true},"$recursiveAnchor":true,"title":"Core vocabulary meta-schema","type":["object","boolean"],"properties":{"$id":{"type":"string","format":"uri-reference","$comment":"Non-empty fragments not allowed.","pattern":"^[^#]*#?$"},"$schema":{"type":"string","format":"uri"},"$anchor":{"type":"string","pattern":"^[A-Za-z][-A-Za-z0-9.:_]*$"},"$ref":{"type":"string","format":"uri-reference"},"$recursiveRef":{"type":"string","format":"uri-reference"},"$recursiveAnchor":{"type":"boolean","default":false},"$vocabulary":{"type":"object","propertyNames":{"type":"string","format":"uri"},"additionalProperties":{"type":"boolean"}},"$comment":{"type":"string"},"$defs":{"type":"object","additionalProperties":{"$recursiveRef":"#"},"default":{}}}}');

/***/ }),

/***/ "./node_modules/ajv/dist/refs/json-schema-2019-09/meta/format.json":
/*!*************************************************************************!*\
  !*** ./node_modules/ajv/dist/refs/json-schema-2019-09/meta/format.json ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"$schema":"https://json-schema.org/draft/2019-09/schema","$id":"https://json-schema.org/draft/2019-09/meta/format","$vocabulary":{"https://json-schema.org/draft/2019-09/vocab/format":true},"$recursiveAnchor":true,"title":"Format vocabulary meta-schema","type":["object","boolean"],"properties":{"format":{"type":"string"}}}');

/***/ }),

/***/ "./node_modules/ajv/dist/refs/json-schema-2019-09/meta/meta-data.json":
/*!****************************************************************************!*\
  !*** ./node_modules/ajv/dist/refs/json-schema-2019-09/meta/meta-data.json ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"$schema":"https://json-schema.org/draft/2019-09/schema","$id":"https://json-schema.org/draft/2019-09/meta/meta-data","$vocabulary":{"https://json-schema.org/draft/2019-09/vocab/meta-data":true},"$recursiveAnchor":true,"title":"Meta-data vocabulary meta-schema","type":["object","boolean"],"properties":{"title":{"type":"string"},"description":{"type":"string"},"default":true,"deprecated":{"type":"boolean","default":false},"readOnly":{"type":"boolean","default":false},"writeOnly":{"type":"boolean","default":false},"examples":{"type":"array","items":true}}}');

/***/ }),

/***/ "./node_modules/ajv/dist/refs/json-schema-2019-09/meta/validation.json":
/*!*****************************************************************************!*\
  !*** ./node_modules/ajv/dist/refs/json-schema-2019-09/meta/validation.json ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"$schema":"https://json-schema.org/draft/2019-09/schema","$id":"https://json-schema.org/draft/2019-09/meta/validation","$vocabulary":{"https://json-schema.org/draft/2019-09/vocab/validation":true},"$recursiveAnchor":true,"title":"Validation vocabulary meta-schema","type":["object","boolean"],"properties":{"multipleOf":{"type":"number","exclusiveMinimum":0},"maximum":{"type":"number"},"exclusiveMaximum":{"type":"number"},"minimum":{"type":"number"},"exclusiveMinimum":{"type":"number"},"maxLength":{"$ref":"#/$defs/nonNegativeInteger"},"minLength":{"$ref":"#/$defs/nonNegativeIntegerDefault0"},"pattern":{"type":"string","format":"regex"},"maxItems":{"$ref":"#/$defs/nonNegativeInteger"},"minItems":{"$ref":"#/$defs/nonNegativeIntegerDefault0"},"uniqueItems":{"type":"boolean","default":false},"maxContains":{"$ref":"#/$defs/nonNegativeInteger"},"minContains":{"$ref":"#/$defs/nonNegativeInteger","default":1},"maxProperties":{"$ref":"#/$defs/nonNegativeInteger"},"minProperties":{"$ref":"#/$defs/nonNegativeIntegerDefault0"},"required":{"$ref":"#/$defs/stringArray"},"dependentRequired":{"type":"object","additionalProperties":{"$ref":"#/$defs/stringArray"}},"const":true,"enum":{"type":"array","items":true},"type":{"anyOf":[{"$ref":"#/$defs/simpleTypes"},{"type":"array","items":{"$ref":"#/$defs/simpleTypes"},"minItems":1,"uniqueItems":true}]}},"$defs":{"nonNegativeInteger":{"type":"integer","minimum":0},"nonNegativeIntegerDefault0":{"$ref":"#/$defs/nonNegativeInteger","default":0},"simpleTypes":{"enum":["array","boolean","integer","null","number","object","string"]},"stringArray":{"type":"array","items":{"type":"string"},"uniqueItems":true,"default":[]}}}');

/***/ }),

/***/ "./node_modules/ajv/dist/refs/json-schema-2019-09/schema.json":
/*!********************************************************************!*\
  !*** ./node_modules/ajv/dist/refs/json-schema-2019-09/schema.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"$schema":"https://json-schema.org/draft/2019-09/schema","$id":"https://json-schema.org/draft/2019-09/schema","$vocabulary":{"https://json-schema.org/draft/2019-09/vocab/core":true,"https://json-schema.org/draft/2019-09/vocab/applicator":true,"https://json-schema.org/draft/2019-09/vocab/validation":true,"https://json-schema.org/draft/2019-09/vocab/meta-data":true,"https://json-schema.org/draft/2019-09/vocab/format":false,"https://json-schema.org/draft/2019-09/vocab/content":true},"$recursiveAnchor":true,"title":"Core and Validation specifications meta-schema","allOf":[{"$ref":"meta/core"},{"$ref":"meta/applicator"},{"$ref":"meta/validation"},{"$ref":"meta/meta-data"},{"$ref":"meta/format"},{"$ref":"meta/content"}],"type":["object","boolean"],"properties":{"definitions":{"$comment":"While no longer an official keyword as it is replaced by $defs, this keyword is retained in the meta-schema to prevent incompatible extensions as it remains in common use.","type":"object","additionalProperties":{"$recursiveRef":"#"},"default":{}},"dependencies":{"$comment":"\\"dependencies\\" is no longer a keyword, but schema authors should avoid redefining it to facilitate a smooth transition to \\"dependentSchemas\\" and \\"dependentRequired\\"","type":"object","additionalProperties":{"anyOf":[{"$recursiveRef":"#"},{"$ref":"meta/validation#/$defs/stringArray"}]}}}}');

/***/ }),

/***/ "./node_modules/ajv/dist/refs/json-schema-2020-12/meta/applicator.json":
/*!*****************************************************************************!*\
  !*** ./node_modules/ajv/dist/refs/json-schema-2020-12/meta/applicator.json ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"https://json-schema.org/draft/2020-12/meta/applicator","$vocabulary":{"https://json-schema.org/draft/2020-12/vocab/applicator":true},"$dynamicAnchor":"meta","title":"Applicator vocabulary meta-schema","type":["object","boolean"],"properties":{"prefixItems":{"$ref":"#/$defs/schemaArray"},"items":{"$dynamicRef":"#meta"},"contains":{"$dynamicRef":"#meta"},"additionalProperties":{"$dynamicRef":"#meta"},"properties":{"type":"object","additionalProperties":{"$dynamicRef":"#meta"},"default":{}},"patternProperties":{"type":"object","additionalProperties":{"$dynamicRef":"#meta"},"propertyNames":{"format":"regex"},"default":{}},"dependentSchemas":{"type":"object","additionalProperties":{"$dynamicRef":"#meta"},"default":{}},"propertyNames":{"$dynamicRef":"#meta"},"if":{"$dynamicRef":"#meta"},"then":{"$dynamicRef":"#meta"},"else":{"$dynamicRef":"#meta"},"allOf":{"$ref":"#/$defs/schemaArray"},"anyOf":{"$ref":"#/$defs/schemaArray"},"oneOf":{"$ref":"#/$defs/schemaArray"},"not":{"$dynamicRef":"#meta"}},"$defs":{"schemaArray":{"type":"array","minItems":1,"items":{"$dynamicRef":"#meta"}}}}');

/***/ }),

/***/ "./node_modules/ajv/dist/refs/json-schema-2020-12/meta/content.json":
/*!**************************************************************************!*\
  !*** ./node_modules/ajv/dist/refs/json-schema-2020-12/meta/content.json ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"https://json-schema.org/draft/2020-12/meta/content","$vocabulary":{"https://json-schema.org/draft/2020-12/vocab/content":true},"$dynamicAnchor":"meta","title":"Content vocabulary meta-schema","type":["object","boolean"],"properties":{"contentEncoding":{"type":"string"},"contentMediaType":{"type":"string"},"contentSchema":{"$dynamicRef":"#meta"}}}');

/***/ }),

/***/ "./node_modules/ajv/dist/refs/json-schema-2020-12/meta/core.json":
/*!***********************************************************************!*\
  !*** ./node_modules/ajv/dist/refs/json-schema-2020-12/meta/core.json ***!
  \***********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"https://json-schema.org/draft/2020-12/meta/core","$vocabulary":{"https://json-schema.org/draft/2020-12/vocab/core":true},"$dynamicAnchor":"meta","title":"Core vocabulary meta-schema","type":["object","boolean"],"properties":{"$id":{"$ref":"#/$defs/uriReferenceString","$comment":"Non-empty fragments not allowed.","pattern":"^[^#]*#?$"},"$schema":{"$ref":"#/$defs/uriString"},"$ref":{"$ref":"#/$defs/uriReferenceString"},"$anchor":{"$ref":"#/$defs/anchorString"},"$dynamicRef":{"$ref":"#/$defs/uriReferenceString"},"$dynamicAnchor":{"$ref":"#/$defs/anchorString"},"$vocabulary":{"type":"object","propertyNames":{"$ref":"#/$defs/uriString"},"additionalProperties":{"type":"boolean"}},"$comment":{"type":"string"},"$defs":{"type":"object","additionalProperties":{"$dynamicRef":"#meta"}}},"$defs":{"anchorString":{"type":"string","pattern":"^[A-Za-z_][-A-Za-z0-9._]*$"},"uriString":{"type":"string","format":"uri"},"uriReferenceString":{"type":"string","format":"uri-reference"}}}');

/***/ }),

/***/ "./node_modules/ajv/dist/refs/json-schema-2020-12/meta/format-annotation.json":
/*!************************************************************************************!*\
  !*** ./node_modules/ajv/dist/refs/json-schema-2020-12/meta/format-annotation.json ***!
  \************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"https://json-schema.org/draft/2020-12/meta/format-annotation","$vocabulary":{"https://json-schema.org/draft/2020-12/vocab/format-annotation":true},"$dynamicAnchor":"meta","title":"Format vocabulary meta-schema for annotation results","type":["object","boolean"],"properties":{"format":{"type":"string"}}}');

/***/ }),

/***/ "./node_modules/ajv/dist/refs/json-schema-2020-12/meta/meta-data.json":
/*!****************************************************************************!*\
  !*** ./node_modules/ajv/dist/refs/json-schema-2020-12/meta/meta-data.json ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"https://json-schema.org/draft/2020-12/meta/meta-data","$vocabulary":{"https://json-schema.org/draft/2020-12/vocab/meta-data":true},"$dynamicAnchor":"meta","title":"Meta-data vocabulary meta-schema","type":["object","boolean"],"properties":{"title":{"type":"string"},"description":{"type":"string"},"default":true,"deprecated":{"type":"boolean","default":false},"readOnly":{"type":"boolean","default":false},"writeOnly":{"type":"boolean","default":false},"examples":{"type":"array","items":true}}}');

/***/ }),

/***/ "./node_modules/ajv/dist/refs/json-schema-2020-12/meta/unevaluated.json":
/*!******************************************************************************!*\
  !*** ./node_modules/ajv/dist/refs/json-schema-2020-12/meta/unevaluated.json ***!
  \******************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"https://json-schema.org/draft/2020-12/meta/unevaluated","$vocabulary":{"https://json-schema.org/draft/2020-12/vocab/unevaluated":true},"$dynamicAnchor":"meta","title":"Unevaluated applicator vocabulary meta-schema","type":["object","boolean"],"properties":{"unevaluatedItems":{"$dynamicRef":"#meta"},"unevaluatedProperties":{"$dynamicRef":"#meta"}}}');

/***/ }),

/***/ "./node_modules/ajv/dist/refs/json-schema-2020-12/meta/validation.json":
/*!*****************************************************************************!*\
  !*** ./node_modules/ajv/dist/refs/json-schema-2020-12/meta/validation.json ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"https://json-schema.org/draft/2020-12/meta/validation","$vocabulary":{"https://json-schema.org/draft/2020-12/vocab/validation":true},"$dynamicAnchor":"meta","title":"Validation vocabulary meta-schema","type":["object","boolean"],"properties":{"type":{"anyOf":[{"$ref":"#/$defs/simpleTypes"},{"type":"array","items":{"$ref":"#/$defs/simpleTypes"},"minItems":1,"uniqueItems":true}]},"const":true,"enum":{"type":"array","items":true},"multipleOf":{"type":"number","exclusiveMinimum":0},"maximum":{"type":"number"},"exclusiveMaximum":{"type":"number"},"minimum":{"type":"number"},"exclusiveMinimum":{"type":"number"},"maxLength":{"$ref":"#/$defs/nonNegativeInteger"},"minLength":{"$ref":"#/$defs/nonNegativeIntegerDefault0"},"pattern":{"type":"string","format":"regex"},"maxItems":{"$ref":"#/$defs/nonNegativeInteger"},"minItems":{"$ref":"#/$defs/nonNegativeIntegerDefault0"},"uniqueItems":{"type":"boolean","default":false},"maxContains":{"$ref":"#/$defs/nonNegativeInteger"},"minContains":{"$ref":"#/$defs/nonNegativeInteger","default":1},"maxProperties":{"$ref":"#/$defs/nonNegativeInteger"},"minProperties":{"$ref":"#/$defs/nonNegativeIntegerDefault0"},"required":{"$ref":"#/$defs/stringArray"},"dependentRequired":{"type":"object","additionalProperties":{"$ref":"#/$defs/stringArray"}}},"$defs":{"nonNegativeInteger":{"type":"integer","minimum":0},"nonNegativeIntegerDefault0":{"$ref":"#/$defs/nonNegativeInteger","default":0},"simpleTypes":{"enum":["array","boolean","integer","null","number","object","string"]},"stringArray":{"type":"array","items":{"type":"string"},"uniqueItems":true,"default":[]}}}');

/***/ }),

/***/ "./node_modules/ajv/dist/refs/json-schema-2020-12/schema.json":
/*!********************************************************************!*\
  !*** ./node_modules/ajv/dist/refs/json-schema-2020-12/schema.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"https://json-schema.org/draft/2020-12/schema","$vocabulary":{"https://json-schema.org/draft/2020-12/vocab/core":true,"https://json-schema.org/draft/2020-12/vocab/applicator":true,"https://json-schema.org/draft/2020-12/vocab/unevaluated":true,"https://json-schema.org/draft/2020-12/vocab/validation":true,"https://json-schema.org/draft/2020-12/vocab/meta-data":true,"https://json-schema.org/draft/2020-12/vocab/format-annotation":true,"https://json-schema.org/draft/2020-12/vocab/content":true},"$dynamicAnchor":"meta","title":"Core and Validation specifications meta-schema","allOf":[{"$ref":"meta/core"},{"$ref":"meta/applicator"},{"$ref":"meta/unevaluated"},{"$ref":"meta/validation"},{"$ref":"meta/meta-data"},{"$ref":"meta/format-annotation"},{"$ref":"meta/content"}],"type":["object","boolean"],"$comment":"This meta-schema also defines keywords that have appeared in previous drafts in order to prevent incompatible extensions as they remain in common use.","properties":{"definitions":{"$comment":"\\"definitions\\" has been replaced by \\"$defs\\".","type":"object","additionalProperties":{"$dynamicRef":"#meta"},"deprecated":true,"default":{}},"dependencies":{"$comment":"\\"dependencies\\" has been split and replaced by \\"dependentSchemas\\" and \\"dependentRequired\\" in order to serve their differing semantics.","type":"object","additionalProperties":{"anyOf":[{"$dynamicRef":"#meta"},{"$ref":"meta/validation#/$defs/stringArray"}]},"deprecated":true,"default":{}},"$recursiveAnchor":{"$comment":"\\"$recursiveAnchor\\" has been replaced by \\"$dynamicAnchor\\".","$ref":"meta/core#/$defs/anchorString","deprecated":true},"$recursiveRef":{"$comment":"\\"$recursiveRef\\" has been replaced by \\"$dynamicRef\\".","$ref":"meta/core#/$defs/uriReferenceString","deprecated":true}}}');

/***/ }),

/***/ "./node_modules/ajv/dist/refs/json-schema-draft-07.json":
/*!**************************************************************!*\
  !*** ./node_modules/ajv/dist/refs/json-schema-draft-07.json ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"$schema":"http://json-schema.org/draft-07/schema#","$id":"http://json-schema.org/draft-07/schema#","title":"Core schema meta-schema","definitions":{"schemaArray":{"type":"array","minItems":1,"items":{"$ref":"#"}},"nonNegativeInteger":{"type":"integer","minimum":0},"nonNegativeIntegerDefault0":{"allOf":[{"$ref":"#/definitions/nonNegativeInteger"},{"default":0}]},"simpleTypes":{"enum":["array","boolean","integer","null","number","object","string"]},"stringArray":{"type":"array","items":{"type":"string"},"uniqueItems":true,"default":[]}},"type":["object","boolean"],"properties":{"$id":{"type":"string","format":"uri-reference"},"$schema":{"type":"string","format":"uri"},"$ref":{"type":"string","format":"uri-reference"},"$comment":{"type":"string"},"title":{"type":"string"},"description":{"type":"string"},"default":true,"readOnly":{"type":"boolean","default":false},"examples":{"type":"array","items":true},"multipleOf":{"type":"number","exclusiveMinimum":0},"maximum":{"type":"number"},"exclusiveMaximum":{"type":"number"},"minimum":{"type":"number"},"exclusiveMinimum":{"type":"number"},"maxLength":{"$ref":"#/definitions/nonNegativeInteger"},"minLength":{"$ref":"#/definitions/nonNegativeIntegerDefault0"},"pattern":{"type":"string","format":"regex"},"additionalItems":{"$ref":"#"},"items":{"anyOf":[{"$ref":"#"},{"$ref":"#/definitions/schemaArray"}],"default":true},"maxItems":{"$ref":"#/definitions/nonNegativeInteger"},"minItems":{"$ref":"#/definitions/nonNegativeIntegerDefault0"},"uniqueItems":{"type":"boolean","default":false},"contains":{"$ref":"#"},"maxProperties":{"$ref":"#/definitions/nonNegativeInteger"},"minProperties":{"$ref":"#/definitions/nonNegativeIntegerDefault0"},"required":{"$ref":"#/definitions/stringArray"},"additionalProperties":{"$ref":"#"},"definitions":{"type":"object","additionalProperties":{"$ref":"#"},"default":{}},"properties":{"type":"object","additionalProperties":{"$ref":"#"},"default":{}},"patternProperties":{"type":"object","additionalProperties":{"$ref":"#"},"propertyNames":{"format":"regex"},"default":{}},"dependencies":{"type":"object","additionalProperties":{"anyOf":[{"$ref":"#"},{"$ref":"#/definitions/stringArray"}]}},"propertyNames":{"$ref":"#"},"const":true,"enum":{"type":"array","items":true,"minItems":1,"uniqueItems":true},"type":{"anyOf":[{"$ref":"#/definitions/simpleTypes"},{"type":"array","items":{"$ref":"#/definitions/simpleTypes"},"minItems":1,"uniqueItems":true}]},"format":{"type":"string"},"contentMediaType":{"type":"string"},"contentEncoding":{"type":"string"},"if":{"$ref":"#"},"then":{"$ref":"#"},"else":{"$ref":"#"},"allOf":{"$ref":"#/definitions/schemaArray"},"anyOf":{"$ref":"#/definitions/schemaArray"},"oneOf":{"$ref":"#/definitions/schemaArray"},"not":{"$ref":"#"}},"default":true}');

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"nodecg","description":"Dynamic broadcast graphics rendered in a browser","main":"index.js","version":"2.1.11","repository":{"type":"git","url":"https://github.com/nodecg/nodecg.git"},"bugs":"https://github.com/nodecg/nodecg/issues","homepage":"https://nodecg.dev/","license":"MIT","keywords":["graphics","nodecg","node","dynamic","broadcast"],"sideEffects":false,"dependencies":{"@nodecg/json-schema-defaults":"^1.0.4","@polymer/app-layout":"^3.0.0","@polymer/app-route":"^3.0.0","@polymer/iron-collapse":"^3.0.0","@polymer/iron-flex-layout":"^3.0.0","@polymer/iron-icons":"^3.0.0","@polymer/iron-image":"^3.0.0","@polymer/iron-localstorage":"^3.0.0","@polymer/iron-pages":"^3.0.0","@polymer/iron-selector":"^3.0.0","@polymer/paper-button":"^3.0.0","@polymer/paper-card":"^3.0.0","@polymer/paper-dialog":"^3.0.0","@polymer/paper-dialog-behavior":"^3.0.0","@polymer/paper-dialog-scrollable":"^3.0.0","@polymer/paper-icon-button":"^3.0.0","@polymer/paper-item":"^3.0.0","@polymer/paper-slider":"^3.0.0","@polymer/paper-spinner":"^3.0.0","@polymer/paper-styles":"^3.0.0","@polymer/paper-tabs":"^3.0.0","@polymer/paper-toast":"^3.0.0","@polymer/paper-toolbar":"^3.0.0","@polymer/polymer":"^3.0.0","@sentry/browser":"^7.21.1","@sentry/node":"^7.21.1","@vaadin/vaadin-upload":"^4.2.2","@webcomponents/webcomponentsjs":"^2.2.10","ajv":"^8.11.2","ajv-draft-04":"^1.0.0","ajv-formats":"^2.1.1","app-root-path":"^3.0.0","better-sqlite3":"^8.4.0","body-parser":"^1.18.3","cheerio":"^1.0.0-rc.2","chokidar":"^3.3.1","clipboard":"^2.0.4","compression":"^1.7.4","connect-typeorm":"^2.0.0","cookie-parser":"^1.4.5","cookies-js":"^1.2.3","copy-webpack-plugin":"^11.0.0","cosmiconfig":"^8.0.0","draggabilly":"^2.4.1","express":"^4.17.1","express-session":"^1.17.0","express-transform-bare-module-specifiers":"^1.0.4","extend":"^3.0.2","fast-equals":"^5.0.1","fast-memoize":"^2.5.1","fp-ts":"^2.1.2","fs-extra":"^10.1.0","git-rev-sync":"^3.0.2","httpolyglot":"^0.1.2","iframe-resizer":"^4.1.1","io-ts":"^2.0.1","is-error":"^2.2.2","joi":"^17.7.0","json-ptr":"^3.1.1","json-schema-lib":"github:nodecg/json-schema-lib#dcb89d670c2b15cd398916209bb806b2e100f95f","klona":"^2.0.6","lodash.debounce":"^4.0.8","lodash.template":"^4.4.0","multer":"^1.4.5-lts.1","node-fetch-commonjs":"^3.2.4","object-path":"^0.11.5","packery":"^2.1.2","passport":"^0.6.0","passport-discord":"^0.1.4","passport-local":"^1.0.0","passport-steam":"^1.0.10","passport-twitch-helix":"^1.1.0","process":"^0.11.10","semver":"^7.3.8","serialize-error":"^8.1.0","sha1":"^1.1.1","sha1-file":"^2.0.1","socket.io":"^4.5.4","socket.io-client":"^4.5.4","soundjs":"^1.0.1","tslib":"^2.4.1","typeorm":"0.3.11","util":"^0.12.5","uuid":"^9.0.0","webpack-node-externals":"^3.0.0","winston":"^3.8.2","yargs":"^15.3.1"},"scripts":{"prepare":"(npm ls husky && husky install) || echo \\"Skipping husky.\\"","start":"node index.js","dev":"concurrently --kill-others \\"npm run build:watch:browser\\" \\"nodemon\\"","pretest":"trash .nyc_output coverage","test":"nyc --instrument=false --reporter=none ava --config ava.config.js && nyc report --reporter=html --reporter=text --include=\\"src/**\\"","test:debug":"ava --config ava.config.js --verbose -- --debug-tests","test:no-coverage":"ava --config ava.config.js","test:types":"cd typetest/fake-bundle && npm run build","report-coverage":"nyc report --reporter=text-lcov --include=\\"src/**\\" > coverage.lcov && codecov","lint":"npm-run-all -s lint:*","lint:prettier":"prettier --check \\"**/*.{json,md,yml,ts,tsx,js,jsx}\\"","lint:eslint":"eslint \\"{src,test}/**/*.ts\\"","fix":"npm-run-all -s fix:*","fix:prettier":"prettier --write \\"**/*.{json,md,yml,ts,tsx,js,jsx}\\"","fix:eslint":"npm run lint:eslint -- --fix ","prebuild":"trash build && trash build-types","build":"cross-env TS_NODE_PROJECT=build-tools/tsconfig.json NODE_ENV=development webpack --progress --color --config build-tools/webpack.config.ts","pregenerate-types-package":"trash generated-types","generate-types-package":"cross-env TS_NODE_PROJECT=build-tools/tsconfig.json ts-node build-tools/generate-typings-package.ts","build:watch:browser":"cross-env TS_NODE_PROJECT=build-tools/tsconfig.json NODE_ENV=development webpack --color --config build-tools/webpack.config.ts --watch --env skipServer --env skipTypeORM","build:server":"cross-env TS_NODE_PROJECT=build-tools/tsconfig.json NODE_ENV=development webpack --color --config build-tools/webpack.config.ts --env skipBrowser","instrument":"cross-env NODECG_INSTRUMENT=true npm run build","postinstrument":"node test/helpers/retarget-browser-coverage.js","prerelease":"npm t","release":"standard-version","postrelease":"npm publish && git push --follow-tags","generate-migrations":"cd src/server && typeorm-ts-node-commonjs migration:generate ./database/migration/rename-me -d ./database/datasource.ts","predev":"trash build && trash build-types","postinstall":"node scripts/warn-engines.js"},"files":["build","scripts","bundles/.empty_directory","db/.empty_directory","schemas","AUTHORS"],"devDependencies":{"@babel/core":"^7.20.2","@babel/preset-env":"^7.20.2","@ephesoft/webpack.istanbul.loader":"^2.2.0","@istanbuljs/nyc-config-typescript":"^1.0.2","@semantic-release/changelog":"^6.0.1","@semantic-release/git":"^10.0.1","@types/app-root-path":"^1.2.4","@types/cheerio":"^0.22.16","@types/clone":"^2.1.1","@types/compression":"^1.7.0","@types/cookie-parser":"^1.4.2","@types/deep-equal":"^1.0.1","@types/express":"^4.17.4","@types/express-session":"^1.17.0","@types/extend":"^3.0.1","@types/fs-extra":"^9.0.13","@types/git-rev-sync":"^2.0.0","@types/glob":"^8.0.0","@types/is-ci":"^3.0.0","@types/lodash.debounce":"^4.0.6","@types/lodash.template":"^4.4.6","@types/make-fetch-happen":"^10.0.0","@types/multer":"^1.4.2","@types/node":"^18.11.9","@types/object-path":"^0.11.0","@types/passport":"^1.0.3","@types/passport-local":"^1.0.33","@types/passport-steam":"^1.0.1","@types/semver":"^7.1.0","@types/sha1":"^1.1.2","@types/sinon":"^10.0.13","@types/soundjs":"^0.6.27","@types/uuid":"^8.3.4","@types/webpack":"^5.28.0","@types/webpack-node-externals":"^2.5.3","@types/yargs":"^15.0.0","@typescript-eslint/eslint-plugin":"^5.44.0","@typescript-eslint/parser":"^5.44.0","ava":"^5.2.0","babel-loader":"^9.1.0","concurrently":"^7.6.0","cpy":"8","cross-env":"^7.0.2","eslint":"^8.28.0","eslint-config-prettier":"^8.5.0","eslint-config-xo":"^0.43.1","eslint-config-xo-typescript":"^0.55.0","eslint-plugin-ava":"^13.2.0","fork-ts-checker-webpack-plugin":"^7.2.13","husky":"^8.0.2","is-builtin-module":"^3.2.0","is-ci":"^3.0.1","is-windows":"^1.0.2","lint-staged":"^13.0.4","nodemon":"^2.0.20","npm-run-all":"^4.1.5","nyc":"^15.1.0","prettier":"^2.8.0","puppeteer":"^19.3.0","replace-in-file":"^6.3.5","semantic-release":"^19.0.5","simple-git":"^3.15.0","sinon":"^14.0.2","standard-version":"^9.0.0","tmp-promise":"^3.0.3","trash-cli":"^5.0.0","ts-essentials":"^9.3.0","ts-loader":"^9.4.1","ts-node":"^10.9.1","typescript":"~4.9.3","webpack":"^5.75.0","webpack-cli":"^5.0.0"},"browserslist":["last 2 chrome versions","last 2 firefox versions","last 2 safari versions","last 2 edge versions"],"lint-staged":{"*.{json,md,yml}":["prettier --write"],"{src,test}/**/*.{ts}":["eslint --fix","prettier --write"]}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**************************************!*\
  !*** ./src/client/api/api.client.ts ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NodeCGAPIClient": () => (/* binding */ NodeCGAPIClient)
/* harmony export */ });
/* harmony import */ var _shared_api_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/api.base */ "./src/shared/api.base.ts");
/* harmony import */ var _shared_api_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_shared_api_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _replicant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./replicant */ "./src/client/api/replicant.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config */ "./src/client/api/config.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logger */ "./src/client/api/logger/index.ts");
// Ours




const soundMetadata = new WeakMap();
const apiContexts = new Set();
/**
 * This is what enables intra-context messaging.
 * I.e., passing messages from one extension to another in the same Node.js context.
 */
function _forwardMessageToContext(messageName, bundleName, data) {
    setTimeout(() => {
        apiContexts.forEach((ctx) => {
            ctx._messageHandlers.forEach((handler) => {
                if (messageName === handler.messageName && bundleName === handler.bundleName) {
                    handler.func(data);
                }
            });
        });
    }, 0);
}
class NodeCGAPIClient extends _shared_api_base__WEBPACK_IMPORTED_MODULE_0__.NodeCGAPIBase {
    static Replicant(name, namespace, opts = {}) {
        return new _replicant__WEBPACK_IMPORTED_MODULE_1__["default"](name, namespace, opts, window.socket);
    }
    static sendMessageToBundle(messageName, bundleName, dataOrCb, cb) {
        let data = null;
        if (typeof dataOrCb === 'function') {
            cb = dataOrCb;
        }
        else {
            data = dataOrCb;
        }
        _forwardMessageToContext(messageName, bundleName, data);
        if (typeof cb === 'function') {
            globalThis.socket.emit('message', {
                bundleName,
                messageName,
                content: data,
            }, (err, response) => {
                if (response) {
                    cb(err, response);
                }
                else {
                    cb(err);
                }
            });
        }
        else {
            return new Promise((resolve, reject) => {
                globalThis.socket.emit('message', {
                    bundleName,
                    messageName,
                    content: data,
                }, (err, response) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(response);
                    }
                });
            });
        }
    }
    /* eslint-enable no-dupe-class-members */
    static readReplicant(name, namespace, cb) {
        globalThis.socket.emit('replicant:read', { name, namespace }, (error, value) => {
            if (error) {
                console.error(error);
            }
            else {
                cb(value);
            }
        });
    }
    get Logger() {
        return _logger__WEBPACK_IMPORTED_MODULE_2__.Logger;
    }
    get log() {
        if (this._memoizedLogger) {
            return this._memoizedLogger;
        }
        this._memoizedLogger = new _logger__WEBPACK_IMPORTED_MODULE_2__.Logger(this.bundleName);
        return this._memoizedLogger;
    }
    /**
     * A filtered copy of the NodeCG server config with some sensitive keys removed.
     */
    get config() {
        return Object.freeze(JSON.parse(JSON.stringify(_config__WEBPACK_IMPORTED_MODULE_3__.filteredConfig)));
    }
    constructor(bundle, socket) {
        super(bundle);
        this.soundsReady = false;
        this._soundCues = [];
        /* eslint-enable no-dupe-class-members */
        this._replicantFactory = (name, namespace, opts) => new _replicant__WEBPACK_IMPORTED_MODULE_1__["default"](name, namespace, opts, this.socket);
        apiContexts.add(this);
        // If title isn't set, set it to the bundle name
        if (globalThis.document) {
            document.addEventListener('DOMContentLoaded', () => {
                if (document.title === '') {
                    document.title = this.bundleName;
                }
            }, false);
        }
        // Make socket accessible to public methods
        this.socket = socket;
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        this.socket.emit('joinRoom', bundle.name, () => { });
        if (globalThis.window && bundle._hasSounds && window.createjs && window.createjs.Sound) {
            const soundCuesRep = new _replicant__WEBPACK_IMPORTED_MODULE_1__["default"]('soundCues', this.bundleName, {}, socket);
            this._soundFiles = new _replicant__WEBPACK_IMPORTED_MODULE_1__["default"]('assets:sounds', this.bundleName, {}, socket);
            this._bundleVolume = new _replicant__WEBPACK_IMPORTED_MODULE_1__["default"](`volume:${this.bundleName}`, '_sounds', {}, socket);
            this._masterVolume = new _replicant__WEBPACK_IMPORTED_MODULE_1__["default"]('volume:master', '_sounds', {}, socket);
            this._soundCues = [];
            const loadedSums = new Set();
            window.createjs.Sound.on('fileload', (e) => {
                if (this.soundsReady || !e.data.sum) {
                    return;
                }
                loadedSums.add(e.data.sum);
                const foundUnloaded = this._soundCues.some((cue) => {
                    if (cue.file) {
                        return !loadedSums.has(cue.file.sum);
                    }
                    return false;
                });
                if (!foundUnloaded && !this.soundsReady) {
                    this.soundsReady = true;
                    window.dispatchEvent(new CustomEvent('ncgSoundsReady'));
                }
            });
            const handleAnyCuesRepChange = () => {
                var _a;
                this._soundCues = (_a = soundCuesRep.value) !== null && _a !== void 0 ? _a : [];
                this._updateInstanceVolumes();
                this._registerSounds();
            };
            soundCuesRep.on('change', handleAnyCuesRepChange);
            this._soundFiles.on('change', () => this._registerSounds.bind(this));
            this._bundleVolume.on('change', () => this._updateInstanceVolumes.bind(this));
            this._masterVolume.on('change', () => this._updateInstanceVolumes.bind(this));
        }
        // Upon receiving a message, execute any handlers for it
        socket.on('message', (data) => {
            this.log.trace('Received message %s (sent to bundle %s) with data:', data.messageName, data.bundleName, data.content);
            this._messageHandlers.forEach((handler) => {
                if (data.messageName === handler.messageName && data.bundleName === handler.bundleName) {
                    handler.func(data.content);
                }
            });
        });
        socket.io.on('error', (err) => {
            this.log.warn('Unhandled socket connection error:', err);
        });
        socket.on('protocol_error', (err) => {
            if (err.type === 'UnauthorizedError') {
                if (globalThis.window) {
                    const url = [location.protocol, '//', location.host, location.pathname].join('');
                    window.location.href = `/authError?code=${err.code}&message=${err.message}&viewUrl=${url}`;
                }
                else {
                    globalThis.close();
                }
            }
            else {
                this.log.error('Unhandled socket protocol error:', err);
            }
        });
    }
    /**
     * _Browser only, except workers_<br/>
     * Returns the specified dialog element.
     * @param {string} name - The desired dialog's name.
     * @param {string} [bundle=CURR_BNDL] - The bundle from which to select the dialog.
     * @returns {object}
     */
    getDialog(name, bundle) {
        var _a, _b, _c, _d;
        if (!globalThis.window) {
            return undefined;
        }
        bundle = bundle !== null && bundle !== void 0 ? bundle : this.bundleName;
        const topDoc = (_a = window.top) === null || _a === void 0 ? void 0 : _a.document;
        if (!topDoc) {
            return undefined;
        }
        const dialog = (_c = (_b = topDoc.querySelector('ncg-dashboard')) === null || _b === void 0 ? void 0 : _b.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector(`#dialogs #${bundle}_${name}`);
        return (_d = dialog) !== null && _d !== void 0 ? _d : undefined;
    }
    /**
     * _Browser only, except workers_<br/>
     * Returns the specified dialog's iframe document.
     * @param {string} name - The desired dialog's name.
     * @param {string} [bundle=CURR_BNDL] - The bundle from which to select the dialog.
     * @returns {object}
     */
    getDialogDocument(name, bundle) {
        var _a, _b, _c;
        if (!globalThis.window) {
            return undefined;
        }
        bundle = bundle !== null && bundle !== void 0 ? bundle : this.bundleName;
        return (_c = (_b = (_a = this.getDialog(name, bundle)) === null || _a === void 0 ? void 0 : _a.querySelector('iframe')) === null || _b === void 0 ? void 0 : _b.contentWindow) === null || _c === void 0 ? void 0 : _c.document;
    }
    /**
     * Returns the sound cue of the provided `cueName` in the current bundle.
     * Returns undefined if a cue by that name cannot be found in this bundle.
     */
    findCue(cueName) {
        return this._soundCues.find((cue) => cue.name === cueName);
    }
    /**
     * Plays the sound cue of the provided `cueName` in the current bundle.
     * Does nothing if the cue doesn't exist or if the cue has no assigned file to play.
     * @param cueName {String}
     * @param [opts] {Object}
     * @param [opts.updateVolume=true] - Whether or not to let NodeCG automatically update this instance's volume
     * when the user changes it on the dashboard.
     * @returns {Object|undefined} - A SoundJS AbstractAudioInstance.
     */
    playSound(cueName, { updateVolume = true } = { updateVolume: true }) {
        var _a;
        if (!globalThis.window) {
            throw new Error('NodeCG Sound API methods are not available in workers');
        }
        if (!this._soundCues) {
            throw new Error(`Bundle "${this.bundleName}" has no soundCues`);
        }
        const cue = this.findCue(cueName);
        if (!cue) {
            throw new Error(`Cue "${cueName}" does not exist in bundle "${this.bundleName}"`);
        }
        if (!((_a = window.createjs) === null || _a === void 0 ? void 0 : _a.Sound)) {
            throw new Error("NodeCG Sound API methods are not available when SoundJS isn't present");
        }
        if (!cue.file) {
            throw new Error(`Cue $"{cueName}" does not have a file specified.`);
        }
        // Create an instance of the sound, which begins playing immediately.
        const instance = window.createjs.Sound.play(cueName);
        // Set the volume.
        this._setInstanceVolume(instance, cue);
        soundMetadata.set(instance, { cueName, updateVolume });
        return instance;
    }
    /**
     * Stops all currently playing instances of the provided `cueName`.
     * @param cueName {String}
     */
    stopSound(cueName) {
        var _a;
        if (!globalThis.window) {
            throw new Error('NodeCG Sound API methods are not available in workers');
        }
        if (!this._soundCues) {
            throw new Error(`Bundle "${this.bundleName}" has no soundCues`);
        }
        if (!this._soundCues.find((cue) => cue.name === cueName)) {
            throw new Error(`Cue "${cueName}" does not exist in bundle "${this.bundleName}"`);
        }
        if (!((_a = window.createjs) === null || _a === void 0 ? void 0 : _a.Sound)) {
            throw new Error("NodeCG Sound API methods are not available when SoundJS isn't present");
        }
        const instancesArr = window.createjs.Sound._instances;
        for (let i = instancesArr.length - 1; i >= 0; i--) {
            const instance = instancesArr[i];
            const meta = soundMetadata.get(instance);
            if (meta && meta.cueName === cueName) {
                instance.stop();
            }
        }
    }
    /**
     * Stops all currently playing sounds on the page.
     */
    stopAllSounds() {
        var _a;
        if (!globalThis.window) {
            throw new Error('NodeCG Sound API methods are not available in workers');
        }
        if (!((_a = window.createjs) === null || _a === void 0 ? void 0 : _a.Sound)) {
            throw new Error("NodeCG Sound API methods are not available when SoundJS isn't present");
        }
        window.createjs.Sound.stop();
    }
    sendMessageToBundle(messageName, bundleName, dataOrCb, cb) {
        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
        return NodeCGAPIClient.sendMessageToBundle(messageName, bundleName, dataOrCb, cb);
    }
    sendMessage(messageName, dataOrCb, cb) {
        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
        return this.sendMessageToBundle(messageName, this.bundleName, dataOrCb, cb);
    }
    readReplicant(name, nspOrCb, maybeCb) {
        let namespace = this.bundleName;
        let cb;
        if (typeof nspOrCb === 'string') {
            namespace = nspOrCb;
            cb = maybeCb;
        }
        else {
            cb = nspOrCb;
        }
        NodeCGAPIClient.readReplicant(name, namespace, cb);
    }
    _registerSounds() {
        this._soundCues.forEach((cue) => {
            if (!cue.file) {
                return;
            }
            window.createjs.Sound.registerSound(`${cue.file.url}?sum=${cue.file.sum}`, cue.name, {
                channels: typeof cue.channels === 'undefined' ? 100 : cue.channels,
                sum: cue.file.sum,
            });
        });
    }
    _setInstanceVolume(instance, cue) {
        var _a, _b;
        if (((_a = this._masterVolume) === null || _a === void 0 ? void 0 : _a.status) !== 'declared' ||
            typeof this._masterVolume.value !== 'number' ||
            ((_b = this._bundleVolume) === null || _b === void 0 ? void 0 : _b.status) !== 'declared' ||
            typeof this._bundleVolume.value !== 'number') {
            return;
        }
        const volume = (this._masterVolume.value / 100) * (this._bundleVolume.value / 100) * (cue.volume / 100);
        // Volue value must be finite or SoundJS throws error
        instance.volume = isFinite(volume) ? volume : 0;
    }
    _updateInstanceVolumes() {
        const instancesArr = window.createjs.Sound._instances;
        // Update the volume of any playing instances that haven't opted out of automatic volume updates.
        this._soundCues.forEach((cue) => {
            instancesArr.forEach((instance) => {
                const meta = soundMetadata.get(instance);
                if (meta && meta.cueName === cue.name && meta.updateVolume) {
                    this._setInstanceVolume(instance, cue);
                }
            });
        });
    }
}
window.NodeCG = NodeCGAPIClient;

})();

/******/ })()
;
//# sourceMappingURL=api.js.map