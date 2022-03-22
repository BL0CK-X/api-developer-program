


class ResponseCode {

    // Read more here: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    // Most commonly used are: `HTTP_OK` and `HTTP_BAD_REQUEST`
    static HTTP_CONTINUE = 100;
    static HTTP_SWITCHING_PROTOCOLS = 101;
    static HTTP_PROCESSING = 102;
    static HTTP_EARLY_HINTS = 103;
    static HTTP_OK = 200;
    static HTTP_CREATED = 201;
    static HTTP_ACCEPTED = 202;
    static HTTP_NON_AUTHORITATIVE_INFORMATION = 203;
    static HTTP_NO_CONTENT = 204;
    static HTTP_RESET_CONTENT = 205;
    static HTTP_PARTIAL_CONTENT = 206;
    static HTTP_MULTI_STATUS = 207;
    static HTTP_ALREADY_REPORTED = 208;
    static HTTP_IM_USED = 226;
    static HTTP_MULTIPLE_CHOICE = 300;
    static HTTP_MOVED_PERMANENTLY = 301;
    static HTTP_FOUND = 302;
    static HTTP_SEE_OTHER = 303;
    static HTTP_NOT_MODIFIED = 304;
    static HTTP_USE_PROXY = 305;
    static HTTP_UNUSED = 306;
    static HTTP_TEMPORARY_REDIRECT = 307;
    static HTTP_PERMANENT_REDIRECT = 308;
    static HTTP_BAD_REQUEST = 400;
    static HTTP_UNAUTHORIZED = 401;
    static HTTP_PAYMENT_REQUIRED = 402;
    static HTTP_FORBIDDEN = 403;
    static HTTP_NOT_FOUND = 404;
    static HTTP_METHOD_NOT_ALLOWED = 405;
    static HTTP_NOT_ACCEPTABLE = 406;
    static HTTP_PROXY_AUTHENTICATION_REQUIRED = 407;
    static HTTP_REQUEST_TIMEOUT = 408;
    static HTTP_CONFLICT = 409;
    static HTTP_GONE = 410;
    static HTTP_LENGTH_REQUIRED = 411;
    static HTTP_PRECONDITION_FAILED = 412;
    static HTTP_PAYLOAD_TOO_LARGE = 413;
    static HTTP_URI_TOO_LONG = 414;
    static HTTP_UNSUPPORTED_MEDIA_TYPE = 415;
    static HTTP_RANGE_NOT_SATISFIABLE = 416;
    static HTTP_EXPECTATION_FAILED = 417;
    static HTTP_IM_A_TEAPOT = 418;
    static HTTP_MISDIRECTED_REQUEST = 421;
    static HTTP_UN_PROCESSABLE_ENTITY = 422;
    static HTTP_LOCKED = 423;
    static HTTP_FAILED_DEPENDENCY = 424;
    static HTTP_TOO_EARLY = 425;
    static HTTP_UPGRADE_REQUIRED = 426;
    static HTTP_PRECONDITION_REQUIRED = 428;
    static HTTP_TOO_MANY_REQUESTS = 429;
    static HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE = 431;
    static HTTP_UNAVAILABLE_FOR_LEGAL_REASONS = 451;
    static HTTP_INTERNAL_SERVER_ERROR = 500;
    static HTTP_NOT_IMPLEMENTED = 501;
    static HTTP_BAD_GATEWAY = 502;
    static HTTP_SERVICE_UNAVAILABLE = 503;
    static HTTP_GATEWAY_TIMEOUT = 504;
    static HTTP_VERSION_NOT_SUPPORTERD = 505;
    static HTTP_VARIANT_ALSO_NEGOTIATES = 506;
    static HTTP_INSUFFICIENT_STORAGE = 507;
    static HTTP_LOOP_DETECTED = 508;
    static HTTP_NOT_EXTENDED = 510;
    static HTTP_NETWORK_AUTHENTICATION_REQUIRED = 511;

}


class Response {

    constructor(data, responseCode) {

        if (!(typeof(data) == typeof(new Object()))) {
            throw new Error('`data` must be a dictionary.')
        }
        if (!(typeof(responseCode) == typeof(ResponseCode.HTTP_CONTINUE))) {
            throw new Error(
                '`response_code` must be of type `ResponseCode`, which is a class that you can import from `util.py`.'
            )
        }

        this.data = data
        this.responseCode = responseCode
    }

    getDict() {
        return {
            'data': this.data,
            'response_code': this.responseCode
        }
    }
    
    static getErrorResponse = (errorMessage, errorCode, responseCode) => {
        return new Response(
            {
                'error_message': errorMessage,
                'error_code': errorCode
            },
            responseCode
        )
    }
}


exports.Response = Response;
exports.ResponseCode = ResponseCode;
