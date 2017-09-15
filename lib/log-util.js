// Generated by CoffeeScript 1.12.6
(function() {
  var LogUtil,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    slice = [].slice;

  LogUtil = (function() {
    function LogUtil(config) {
      this._tpm = bind(this._tpm, this);
      this._tm = bind(this._tm, this);
      this._m = bind(this._m, this);
      this.tpdebug = bind(this.tpdebug, this);
      this.tdebug = bind(this.tdebug, this);
      this.debug = bind(this.debug, this);
      this._init_functions = bind(this._init_functions, this);
      this._fpid = bind(this._fpid, this);
      this._fts = bind(this._fts, this);
      var base, base1, base2, base3, base4, base5, ref, ref1, ref2, ref3;
      if (config == null) {
        config = {};
      }
      this.DEBUG = (ref = (ref1 = config.DEBUG) != null ? ref1 : config.debug) != null ? ref : false;
      this.logger = (ref2 = config.logger) != null ? ref2 : console;
      if ((this.logger.err != null) && (this.logger.error == null)) {
        if ((base = this.logger).error == null) {
          base.error = this.logger.err;
        }
      } else if ((this.logger.error != null) && (this.logger.err == null)) {
        if ((base1 = this.logger).err == null) {
          base1.err = this.logger.error;
        }
      }
      if ((base2 = this.logger).log == null) {
        base2.log = console.log;
      }
      if ((base3 = this.logger).error == null) {
        base3.error = console.error;
      }
      if ((base4 = this.logger).info == null) {
        base4.info = console.info;
      }
      if ((base5 = this.logger).warn == null) {
        base5.warn = console.warn;
      }
      this.prefix = (ref3 = config.prefix) != null ? ref3 : null;
      this._init_functions();
    }

    LogUtil.prototype._fts = function(d) {
      return "[" + ((d != null ? d : new Date()).toISOString()) + "]";
    };

    LogUtil.prototype._fpid = function(p) {
      var ref;
      return "[p:" + ((ref = p != null ? p : process.pid) != null ? ref : '?') + "]";
    };

    LogUtil.prototype._init_functions = function() {
      this.log = (function(_this) {
        return function() {
          var args;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return _this._m.apply(_this, ["log"].concat(slice.call(args)));
        };
      })(this);
      this.tlog = (function(_this) {
        return function() {
          var args;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return _this._tm.apply(_this, ["log"].concat(slice.call(args)));
        };
      })(this);
      this.tplog = (function(_this) {
        return function() {
          var args;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return _this._tpm.apply(_this, ["log"].concat(slice.call(args)));
        };
      })(this);
      this.err = this.error = (function(_this) {
        return function() {
          var args;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return _this._m.apply(_this, ["error"].concat(slice.call(args)));
        };
      })(this);
      this.terr = this.terror = (function(_this) {
        return function() {
          var args;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return _this._tm.apply(_this, ["error"].concat(slice.call(args)));
        };
      })(this);
      this.tperr = this.tperror = (function(_this) {
        return function() {
          var args;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return _this._tpm.apply(_this, ["error"].concat(slice.call(args)));
        };
      })(this);
      this.warn = (function(_this) {
        return function() {
          var args;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return _this._m.apply(_this, ["warn"].concat(slice.call(args)));
        };
      })(this);
      this.twarn = (function(_this) {
        return function() {
          var args;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return _this._tm.apply(_this, ["warn"].concat(slice.call(args)));
        };
      })(this);
      this.tpwarn = (function(_this) {
        return function() {
          var args;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return _this._tpm.apply(_this, ["warn"].concat(slice.call(args)));
        };
      })(this);
      this.info = (function(_this) {
        return function() {
          var args;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return _this._m.apply(_this, ["info"].concat(slice.call(args)));
        };
      })(this);
      this.tinfo = (function(_this) {
        return function() {
          var args;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return _this._tm.apply(_this, ["info"].concat(slice.call(args)));
        };
      })(this);
      return this.tpinfo = (function(_this) {
        return function() {
          var args;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return _this._tpm.apply(_this, ["info"].concat(slice.call(args)));
        };
      })(this);
    };

    LogUtil.prototype.debug = function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      if (this.DEBUG) {
        return this.log.apply(this, args);
      }
    };

    LogUtil.prototype.tdebug = function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      if (this.DEBUG) {
        return this.tlog.apply(this, args);
      }
    };

    LogUtil.prototype.tpdebug = function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      if (this.DEBUG) {
        return this.tplog.apply(this, args);
      }
    };

    LogUtil.prototype._m = function() {
      var args, method, ref, ref1;
      method = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      if (this.prefix != null) {
        return (ref = this.logger)[method].apply(ref, [this.prefix].concat(slice.call(args)));
      } else {
        return (ref1 = this.logger)[method].apply(ref1, args);
      }
    };

    LogUtil.prototype._tm = function() {
      var args, method, ref, ref1;
      method = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      if (this.prefix != null) {
        return (ref = this.logger)[method].apply(ref, [this._fts(), this.prefix].concat(slice.call(args)));
      } else {
        return (ref1 = this.logger)[method].apply(ref1, [this._fts()].concat(slice.call(args)));
      }
    };

    LogUtil.prototype._tpm = function() {
      var args, method, ref, ref1;
      method = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      if (this.prefix != null) {
        return (ref = this.logger)[method].apply(ref, [this._fts(), this._fpid(), this.prefix].concat(slice.call(args)));
      } else {
        return (ref1 = this.logger)[method].apply(ref1, [this._fts(), this._fpid()].concat(slice.call(args)));
      }
    };

    return LogUtil;

  })();

  exports.LogUtil = new LogUtil();

  exports.LogUtil.constructor = exports.LogUtil.LogUtil = LogUtil;

  exports.LogUtil.init = function(config) {
    return new LogUtil(config);
  };

}).call(this);

//# sourceMappingURL=log-util.js.map