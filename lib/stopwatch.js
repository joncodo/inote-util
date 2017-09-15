// Generated by CoffeeScript 1.12.6
(function() {
  var Stopwatch;

  Stopwatch = (function() {
    function Stopwatch() {}

    Stopwatch.prototype.start = function(base) {
      var n, timer, v;
      if (base == null) {
        base = {};
      }
      timer = {};
      if (base != null) {
        for (n in base) {
          v = base[n];
          timer[n] = v;
        }
      }
      timer.start_time = new Date();
      timer.stop = function() {
        if (timer.laps != null) {
          timer.lap();
          timer.finish_time = timer.laps[timer.laps.length - 1].lap_finish_time;
        } else {
          timer.finish_time = new Date();
        }
        timer.elapsed_time = timer.finish_time - timer.start_time;
        delete timer.stop;
        delete timer.lap;
        return timer;
      };
      timer.lap = function(label) {
        var lap_finish, lap_start;
        lap_finish = new Date();
        if (timer.laps != null) {
          lap_start = timer.laps[timer.laps.length - 1].lap_finish_time;
        } else {
          lap_start = timer.start_time;
        }
        if (timer.laps == null) {
          timer.laps = [];
        }
        timer.laps.push({
          lap_start_time: lap_start,
          lap_finish_time: lap_finish,
          lap_time: lap_finish - lap_start,
          lap_elapsed_time: lap_finish - timer.start_time,
          label: label
        });
        return timer;
      };
      return timer;
    };

    Stopwatch.prototype.time = function(base, fn) {
      var timer;
      if (typeof base === 'function') {
        fn = base;
        base = fn;
      }
      timer = this.start(base);
      fn();
      return timer.stop();
    };

    return Stopwatch;

  })();

  exports.Stopwatch = new Stopwatch();

}).call(this);

//# sourceMappingURL=stopwatch.js.map