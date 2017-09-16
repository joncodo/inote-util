// Generated by CoffeeScript 1.12.6
(function() {
  var HOMEDIR, LIB_COV, LIB_DIR, ObjectUtil, assert, fs, path, should;

  should = require('should');

  fs = require('fs');

  path = require('path');

  HOMEDIR = path.join(__dirname, '..');

  LIB_COV = path.join(HOMEDIR, 'lib-cov');

  LIB_DIR = fs.existsSync(LIB_COV) ? LIB_COV : path.join(HOMEDIR, 'lib');

  ObjectUtil = require(path.join(LIB_DIR, 'object-util')).ObjectUtil;

  assert = require('assert');

  describe('ObjectUtil', function() {
    it("can identifiy true objects", function(done) {
      var j, len, test, tests;
      tests = [
        [null, false], [{}, true], [
          {
            foo: "bar"
          }, true
        ], [[], false], [[1], false], ["string", false], [3.14159, false], [console.log, false]
      ];
      for (j = 0, len = tests.length; j < len; j++) {
        test = tests[j];
        assert.equal(ObjectUtil.is_true_object(test[0]), test[1], JSON.stringify(test));
      }
      return done();
    });
    it("can compute deep-equal", function(done) {
      var expected, found, found2, j, len, test, tests, val_a, val_b;
      tests = [
        [void 0, void 0, true], [null, void 0, true], [void 0, null, true], [1, 1, true], ["X", "X", true], [true, true, true], [[], [], true], [[null], [void 0], true], [{}, {}, true], [[1], [1], true], [[1, 2], [1, 2], true], [[1, [2, 3]], [1, [2, 3]], true], [[1, {}, null], [1, {}, null], true], [
          {
            x: null
          }, {
            x: null
          }, true
        ], [
          {
            x: null
          }, {
            x: void 0
          }, true
        ], [
          {
            x: null
          }, {}, true
        ], [
          {
            x: 1,
            y: 2
          }, {
            y: 2,
            x: 1
          }, true
        ], [
          {
            x: []
          }, {
            x: []
          }, true
        ], [
          {
            x: [
              {
                y: [3]
              }
            ]
          }, {
            x: [
              {
                y: [3]
              }
            ]
          }, true
        ], [false, null, false], [null, false, false], [1, null, false], [null, 1, false], ["x", null, false], [null, "x", false], [{}, null, false], [null, {}, false], [[], null, false], [null, [], false], [false, void 0, false], [void 0, false, false], [1, void 0, false], [void 0, 1, false], ["x", void 0, false], [void 0, "x", false], [{}, void 0, false], [void 0, {}, false], [[], void 0, false], [void 0, [], false], [false, true, false], [true, false, false], [1, true, false], [1, 2, false], ["x", "y", false], ["", "  ", false], [1, "1", false], [[], {}, false], [[1], [], false], [[null], [], false], [
          {
            x: null
          }, [], false
        ], [
          {
            x: [
              {
                y: [3]
              }
            ]
          }, {
            x: [
              {
                y: [3, 4]
              }
            ]
          }, false
        ], [[null], [], false], [[1, 1], [1], false]
      ];
      for (j = 0, len = tests.length; j < len; j++) {
        test = tests[j];
        val_a = test[0];
        val_b = test[1];
        expected = test[2];
        found = ObjectUtil.deep_equal(val_a, val_b);
        assert.equal(expected, found, "deep_equal(" + (JSON.stringify(val_a)) + "," + (JSON.stringify(val_b)) + ") yielded '" + found + "' expected '" + expected + "'.");
        found2 = ObjectUtil.deep_equals(val_a, val_b);
        assert.equal(expected, found, "deep_equals(" + (JSON.stringify(val_a)) + "," + (JSON.stringify(val_b)) + ") yielded '" + found2 + "' expected '" + expected + "'.");
      }
      return done();
    });
    it("can diff two JSON/map objects", function(done) {
      var a, b, d;
      a = {
        "foo": {
          "bar": {
            "xyzzy": [1, 2, 3, 4],
            "nil": null,
            "cbaab": [1, 2, 3, 4],
            "z": {}
          },
          "foo": "1"
        }
      };
      b = {
        "foo": {
          "foo": 1,
          "bar": {
            "xyzzy": [1, 2, 3, 4],
            "cbaab": [4, 3, 2, 1]
          },
          "x": 3
        }
      };
      d = {
        foo: {
          foo: "c",
          x: "a",
          bar: {
            z: "d",
            cbaab: "c"
          }
        }
      };
      assert.deepEqual(ObjectUtil.json_diff(a, b), d);
      return done();
    });
    it("can diff two JSON/map objects - edge cases", function(done) {
      var expected, found, j, len, new_map, old_map, test, tests;
      tests = [
        [void 0, void 0, void 0], [null, void 0, void 0], [void 0, null, void 0], [1, 1, void 0], ["X", "X", void 0], [true, true, void 0], [[], [], void 0], [{}, {}, void 0], [[{}], [{}], void 0], [[1], [1], void 0], [[1, 2], [1, 2], void 0], [[1, [2, 3]], [1, [2, 3]], void 0], [[1, {}], [1, {}], void 0], [
          {
            x: [
              {
                y: [3]
              }
            ]
          }, {
            x: [
              {
                y: [3]
              }
            ]
          }, void 0
        ], [
          {
            x: null
          }, {}, void 0
        ], [
          [
            {}, [
              {
                x: null
              }
            ]
          ], [{}, [{}]], void 0
        ], [false, null, "d"], [null, false, "a"], [1, null, "d"], [null, 1, "a"], ["x", null, "d"], [null, "x", "a"], [{}, null, "d"], [null, {}, "a"], [[], null, "d"], [null, [], "a"], [false, true, "c"], [true, false, "c"], [1, true, "c"], [1, 2, "c"], ["x", "y", "c"], ["", "  ", "c"], [[], {}, "c"], [{}, [], "c"], [[], [[]], "c"], [[{}], [[]], "c"], [[{}], [], "c"], [1, null, "d"], [null, 1, "a"], ["x", null, "d"], [null, "x", "a"], [{}, null, "d"], [null, {}, "a"], [[], null, "d"], [null, [], "a"]
      ];
      for (j = 0, len = tests.length; j < len; j++) {
        test = tests[j];
        old_map = test[0];
        new_map = test[1];
        expected = test[2];
        found = ObjectUtil.json_diff(old_map, new_map);
        if (expected == null) {
          assert(found == null, JSON.stringify(test) + ("; found " + found));
        } else {
          assert.deepEqual(expected, found, JSON.stringify(test) + ("; found " + found));
        }
      }
      return done();
    });
    it("remove_null ignores non-array, non-map objects", function(done) {
      ObjectUtil.remove_null("foo").should.equal("foo");
      ObjectUtil.remove_null(8).should.equal(8);
      should.not.exist(ObjectUtil.remove_null(null));
      return done();
    });
    it("remove_null removes null values from maps", function(done) {
      var input, output;
      input = {
        foo: null,
        undef: void 0,
        bar: 0
      };
      output = ObjectUtil.remove_null(input);
      should.not.exist(output.foo);
      should.not.exist(output.undef);
      output.bar.should.equal(0);
      return done();
    });
    it("remove_null removes null values from arrays", function(done) {
      var input, output;
      input = [1, null, 2, void 0, 3, 0];
      output = ObjectUtil.remove_null(input);
      output.length.should.equal(4);
      output[0].should.equal(1);
      output[1].should.equal(2);
      output[2].should.equal(3);
      output[3].should.equal(0);
      return done();
    });
    it("merge combines two maps", function(done) {
      var a, b, c;
      a = {
        a: 1,
        b: 2,
        c: 3,
        e: 5
      };
      b = {
        b: "two",
        c: "three",
        d: "four",
        e: "five"
      };
      c = ObjectUtil.merge(a, b);
      c.a.should.equal(1);
      c.b.should.equal('two');
      c.c.should.equal('three');
      c.d.should.equal('four');
      c.e.should.equal('five');
      return done();
    });
    it("merge combines more than two maps", function(done) {
      var j, len, list, m, ref;
      list = [
        {
          a: 1,
          b: 2,
          c: 3,
          e: 5
        }, {
          b: "two",
          c: "three",
          d: "four",
          e: "five"
        }, {
          c: "iii",
          f: "vi"
        }
      ];
      ref = [ObjectUtil.merge(list), ObjectUtil.merge.apply(ObjectUtil, list)];
      for (j = 0, len = ref.length; j < len; j++) {
        m = ref[j];
        m.a.should.equal(1);
        m.b.should.equal('two');
        m.c.should.equal('iii');
        m.d.should.equal('four');
        m.e.should.equal('five');
        m.f.should.equal('vi');
      }
      return done();
    });
    it("merge skips null objects", function(done) {
      var j, len, list, m, ref;
      list = [
        {
          a: 1,
          b: 2,
          c: 3,
          e: 5
        }, null, {
          b: "two",
          c: "three",
          d: "four",
          e: "five"
        }, {
          c: "iii",
          f: "vi"
        }, null
      ];
      ref = [ObjectUtil.merge(list), ObjectUtil.merge.apply(ObjectUtil, list)];
      for (j = 0, len = ref.length; j < len; j++) {
        m = ref[j];
        m.a.should.equal(1);
        m.b.should.equal('two');
        m.c.should.equal('iii');
        m.d.should.equal('four');
        m.e.should.equal('five');
        m.f.should.equal('vi');
      }
      return done();
    });
    it("merge is shallow; deep_merge is deep", function(done) {
      var j, l, len, len1, list, m, ref, ref1;
      list = [
        {
          a: 1,
          b: {
            b0: "First",
            b1: [false, false]
          }
        }, {
          a: {
            a1: true,
            a2: {
              a21: true
            },
            a3: "X"
          },
          b: {
            b1: true,
            b2: {
              b21: true
            },
            b3: "X"
          },
          c: {
            c1: "SECOND"
          }
        }, {
          a: {
            a2: {
              a22: true
            }
          },
          b: {
            b2: {
              b22: 17
            },
            b3: "Y",
            b4: "Z"
          },
          c: {
            c1: {
              c11: "THIRD"
            }
          }
        }
      ];
      ref = [ObjectUtil.merge(list), ObjectUtil.merge.apply(ObjectUtil, list)];
      for (j = 0, len = ref.length; j < len; j++) {
        m = ref[j];
        should.not.exist(m.a.a1);
        should.not.exist(m.a.a2.a21);
        m.a.a2.a22.should.equal(true);
        should.not.exist(m.b.b0);
        should.not.exist(m.b.b1);
        should.not.exist(m.b.b2.b21);
        m.b.b2.b22.should.equal(17);
      }
      ref1 = [ObjectUtil.deep_merge(list), ObjectUtil.deep_merge.apply(ObjectUtil, list)];
      for (l = 0, len1 = ref1.length; l < len1; l++) {
        m = ref1[l];
        m.a.a1.should.equal(true);
        m.a.a2.a21.should.equal(true);
        m.a.a2.a22.should.equal(true);
        m.a.a2.a22.should.equal(true);
        m.b.b0.should.equal('First');
        m.b.b1.should.equal(true);
        m.b.b2.b21.should.equal(true);
        m.b.b2.b22.should.equal(17);
        m.b.b3.should.equal('Y');
        m.b.b4.should.equal('Z');
        m.c.c1.c11.should.equal('THIRD');
      }
      return done();
    });
    it("remove_falsey returns null for null", function(done) {
      should.not.exist(ObjectUtil.remove_falsey(null));
      return done();
    });
    it("remove_falsey strips null values from arrays", function(done) {
      var e, found, i, j, l, len, len1, test, tests;
      tests = [
        {
          "in": [1, 2, 3],
          out: [1, 2, 3]
        }, {
          "in": [],
          out: []
        }, {
          "in": [null, null, null],
          out: []
        }, {
          "in": [null],
          out: []
        }, {
          "in": [null, 1, 2, null],
          out: [1, 2]
        }, {
          "in": [null, 1, null, 2, null, null, 3],
          out: [1, 2, 3]
        }
      ];
      for (j = 0, len = tests.length; j < len; j++) {
        test = tests[j];
        found = ObjectUtil.remove_falsey(test["in"]);
        found.length.should.equal(test.out.length);
        for (i = l = 0, len1 = found.length; l < len1; i = ++l) {
          e = found[i];
          e.should.equal(test.out[i]);
        }
      }
      return done();
    });
    it("remove_falsey strips falsey values from arrays", function(done) {
      var e, found, i, j, l, len, len1, test, tests;
      tests = [
        {
          "in": [1, 2, 3],
          out: [1, 2, 3]
        }, {
          "in": [],
          out: []
        }, {
          "in": [null, null, null],
          out: []
        }, {
          "in": [null],
          out: []
        }, {
          "in": [null, 1, 2, null],
          out: [1, 2]
        }, {
          "in": [null, 1, null, 2, null, null, 3],
          out: [1, 2, 3]
        }, {
          "in": [null, '', 0, false],
          out: []
        }, {
          "in": [false],
          out: []
        }, {
          "in": ['', 1, 2, 0],
          out: [1, 2]
        }, {
          "in": [0, 1, null, 2, false, '', 3],
          out: [1, 2, 3]
        }
      ];
      for (j = 0, len = tests.length; j < len; j++) {
        test = tests[j];
        found = ObjectUtil.remove_falsey(test["in"]);
        found.length.should.equal(test.out.length);
        for (i = l = 0, len1 = found.length; l < len1; i = ++l) {
          e = found[i];
          e.should.equal(test.out[i]);
        }
      }
      return done();
    });
    it("remove_falsey strips falsey values from maps", function(done) {
      var found, j, len, n, test, tests, v;
      tests = [
        {
          "in": {
            a: 1,
            b: 2,
            c: 3
          },
          out: {
            a: 1,
            b: 2,
            c: 3
          }
        }, {
          "in": {},
          out: {}
        }, {
          "in": {
            a: null,
            b: null,
            c: null
          },
          out: {}
        }, {
          "in": {
            a: null
          },
          out: {}
        }, {
          "in": {
            a: null,
            b: 1,
            c: 2,
            d: null
          },
          out: {
            b: 1,
            c: 2
          }
        }, {
          "in": {
            a: null,
            b: 1,
            c: null,
            d: 2,
            e: null,
            f: null,
            g: 3
          },
          out: {
            b: 1,
            d: 2,
            g: 3
          }
        }, {
          "in": {
            a: false,
            b: 0,
            c: null
          },
          out: {}
        }, {
          "in": {
            a: 0
          },
          out: {}
        }, {
          "in": {
            a: false,
            b: 1,
            c: 2,
            d: 0
          },
          out: {
            b: 1,
            c: 2
          }
        }, {
          "in": {
            a: 0,
            b: 1,
            c: false,
            d: 2,
            e: null,
            f: '',
            g: 3
          },
          out: {
            b: 1,
            d: 2,
            g: 3
          }
        }
      ];
      for (j = 0, len = tests.length; j < len; j++) {
        test = tests[j];
        found = ObjectUtil.remove_falsey(test["in"]);
        Object.keys(found).length.should.equal(Object.keys(test.out).length);
        for (n in found) {
          v = found[n];
          v.should.equal(test.out[n]);
        }
      }
      return done();
    });
    it("remove_falsey returns input value for scalar types", function(done) {
      var j, len, ref, value;
      ref = [1, 3.14, 'string', true];
      for (j = 0, len = ref.length; j < len; j++) {
        value = ref[j];
        ObjectUtil.remove_falsey(value).should.equal(value);
      }
      return done();
    });
    it("remove_falsey returns null for falsey scalar types", function(done) {
      var j, len, ref, value;
      ref = [0, false, ''];
      for (j = 0, len = ref.length; j < len; j++) {
        value = ref[j];
        should.not.exist(ObjectUtil.remove_falsey(value));
      }
      return done();
    });
    it("object_array_to_map creates a map using the specified key", function(done) {
      var elt, expected, found, i, input, j, k, k2, key, l, len, len1, options, ref, ref1, v, v2;
      ref = [
        [
          [
            {
              a: 'X',
              b: 'X'
            }, {
              a: 'Y',
              b: 'Y'
            }, {
              a: 'X',
              b: 'Z'
            }
          ], 'a', null, {
            X: {
              a: 'X',
              b: 'Z'
            },
            Y: {
              a: 'Y',
              b: 'Y'
            }
          }
        ], [
          [
            {
              a: 'X',
              b: 'X'
            }, {
              a: 'Y',
              b: 'Y'
            }, {
              a: 'X',
              b: 'Z',
              c: 'C'
            }
          ], 'a', {
            duplicates: 'skip'
          }, {
            X: {
              a: 'X',
              b: 'X'
            },
            Y: {
              a: 'Y',
              b: 'Y'
            }
          }
        ], [
          [
            {
              a: 'X',
              b: 'X'
            }, {
              a: 'Y',
              b: 'Y'
            }, {
              a: 'X',
              c: 'C'
            }
          ], 'a', {
            duplicates: 'merge'
          }, {
            X: {
              a: 'X',
              b: 'X',
              c: 'C'
            },
            Y: {
              a: 'Y',
              b: 'Y'
            }
          }
        ], [
          [
            {
              a: 'X',
              b: 'X'
            }, {
              a: 'Y',
              b: 'Y'
            }, {
              a: 'X',
              c: 'C'
            }
          ], 'a', {
            duplicates: 'stack'
          }, {
            X: [
              {
                a: 'X',
                b: 'X'
              }, {
                a: 'X',
                c: 'C'
              }
            ],
            Y: {
              a: 'Y',
              b: 'Y'
            }
          }
        ], [
          [
            {
              a: 'X',
              b: 'X'
            }, {
              a: 'Y',
              b: 'Y'
            }, {
              a: 'X',
              c: 'C'
            }, {
              a: 'X',
              d: 'D'
            }
          ], 'a', {
            duplicates: 'stack'
          }, {
            X: [
              {
                a: 'X',
                b: 'X'
              }, {
                a: 'X',
                c: 'C'
              }, {
                a: 'X',
                d: 'D'
              }
            ],
            Y: {
              a: 'Y',
              b: 'Y'
            }
          }
        ]
      ];
      for (j = 0, len = ref.length; j < len; j++) {
        ref1 = ref[j], input = ref1[0], key = ref1[1], options = ref1[2], expected = ref1[3];
        found = ObjectUtil.object_array_to_map(input, key, options);
        for (k in expected) {
          v = expected[k];
          if (Array.isArray(v)) {
            for (i = l = 0, len1 = v.length; l < len1; i = ++l) {
              elt = v[i];
              for (k2 in elt) {
                v2 = elt[k2];
                found[k][i][k2].should.equal(v2);
              }
            }
          } else {
            for (k2 in v) {
              v2 = v[k2];
              found[k][k2].should.equal(v2);
            }
          }
        }
      }
      return done();
    });
    it("object_array_to_map throws error on unrecognzied duplicates policy", function(done) {
      var err;
      try {
        ObjectUtil.object_array_to_map([
          {
            a: 'X'
          }
        ], 'a', {
          duplicates: 'foo'
        });
        return "Expected error".should.not.exist;
      } catch (error) {
        err = error;
        return done();
      }
    });
    it("shallow_clone returns null for null", function(done) {
      should.not.exist(ObjectUtil.shallow_clone(null));
      return done();
    });
    it("shallow_clone returns source for string, boolean, number", function(done) {
      ObjectUtil.shallow_clone("a string").should.equal("a string");
      ObjectUtil.shallow_clone(false).should.equal(false);
      ObjectUtil.shallow_clone(17).should.equal(17);
      return done();
    });
    it("shallow_clone creates a shallow copy of a map", function(done) {
      var a, clone, f, i, map, o, s;
      i = 1;
      f = 1.234;
      s = "Lorem Ipsum";
      a = [
        1, "two", null, "four", {
          five: 5
        }
      ];
      o = {
        a: 1,
        b: 2,
        c: 3,
        meta: {
          d: 4,
          e: 5
        }
      };
      map = {
        int: i,
        float: f,
        string: s,
        array: a,
        obj: o
      };
      clone = ObjectUtil.shallow_clone(map);
      clone.int.should.equal(1);
      clone.float.should.equal(1.234);
      clone.string.should.equal("Lorem Ipsum");
      clone.array.length.should.equal(5);
      clone.array[0].should.equal(1);
      clone.array[1].should.equal("two");
      should.not.exist(clone.array[2]);
      clone.array[3].should.equal("four");
      clone.array[4].five.should.equal(5);
      clone.obj.a.should.equal(1);
      clone.obj.b.should.equal(2);
      clone.obj.c.should.equal(3);
      clone.obj.meta.d.should.equal(4);
      clone.obj.meta.e.should.equal(5);
      a.push("SIX");
      a[4].five = "V";
      o.meta.f = 6;
      o.g = 7;
      clone.int.should.equal(1);
      clone.float.should.equal(1.234);
      clone.string.should.equal("Lorem Ipsum");
      clone.array.length.should.equal(6);
      clone.array[0].should.equal(1);
      clone.array[1].should.equal("two");
      should.not.exist(clone.array[2]);
      clone.array[3].should.equal("four");
      clone.array[4].five.should.equal("V");
      clone.obj.meta.f.should.equal(6);
      clone.obj.g.should.equal(7);
      return done();
    });
    it("deep_clone creates a deep copy of an array", function(done) {
      var a, b;
      a = [
        1, true, {
          alpha: "A",
          beta: "B"
        }, [8, 6, 7, 5, 3, 0, 9], null, "end"
      ];
      b = ObjectUtil.deep_clone(a);
      b.length.should.equal(a.length);
      a.push("beyond the end");
      b.length.should.not.equal(a.length);
      b[0].should.equal(a[0]);
      b[1].should.equal(a[1]);
      b[2].alpha.should.equal(a[2].alpha);
      b[2].beta.should.equal(a[2].beta);
      a[2].gamma = "G";
      should.not.exist(b[2].gamma);
      b[3].length.should.equal(a[3].length);
      b[3][0].should.equal(a[3][0]);
      b[3][1].should.equal(a[3][1]);
      b[3][2].should.equal(a[3][2]);
      b[3][3].should.equal(a[3][3]);
      b[3][4].should.equal(a[3][4]);
      b[3][5].should.equal(a[3][5]);
      b[3][6].should.equal(a[3][6]);
      b[3][0] = "Eight";
      b[3][0].should.not.equal(a[3][0]);
      a[3][6] = "Nine";
      b[3][6].should.not.equal(a[3][6]);
      b[0].should.equal(a[0]);
      should.not.exist(b[4]);
      b[5].should.equal(a[5]);
      a[1] = "a different value";
      b[1].should.not.equal(a[1]);
      return done();
    });
    it("deep_clone returns null for null", function(done) {
      should.not.exist(ObjectUtil.deep_clone(null));
      return done();
    });
    it("deep_clone returns source for string, boolean, number", function(done) {
      ObjectUtil.deep_clone("a string").should.equal("a string");
      ObjectUtil.deep_clone(false).should.equal(false);
      ObjectUtil.deep_clone(17).should.equal(17);
      return done();
    });
    return it("can flatten maps", function(done) {
      var flat, src;
      src = {
        "A": {
          "b1": {
            "c1": 7,
            "c2": {
              "d": "X"
            }
          },
          "b2": 3,
          "": {
            "X": "y"
          }
        },
        "A2": "foo"
      };
      flat = ObjectUtil.flatten_map(src, ":");
      flat["A:b1:c1"].should.equal(7);
      flat["A:b1:c2:d"].should.equal("X");
      flat["A:b2"].should.equal(3);
      flat["A::X"].should.equal("y");
      flat['A2'].should.equal("foo");
      Object.keys(flat).length.should.equal(5);
      return done();
    });
  });

}).call(this);
