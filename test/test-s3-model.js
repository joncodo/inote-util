// Generated by CoffeeScript 1.12.6
(function() {
  var HOME_DIR, LIB_COV, LIB_DIR, S3Model, S3_CONFIG, assert, config, fs, path, s3;

  fs = require('fs');

  path = require('path');

  HOME_DIR = path.join(__dirname, '..');

  LIB_COV = path.join(HOME_DIR, 'lib-cov');

  LIB_DIR = fs.existsSync(LIB_COV) ? LIB_COV : path.join(HOME_DIR, 'lib');

  S3Model = require(path.join(LIB_DIR, 's3-model')).S3Model;

  assert = require('assert');

  config = require(path.join(LIB_DIR, 'config')).config.init();

  S3_CONFIG = config.get("s3");

  if (S3_CONFIG == null) {
    console.warn("WARNING: S3 configuration not provided so S3Model tests will be skipped.\n         Set:\n           {s3:{access_key_id:\"\",secret_access_key:\"\",region:\"\"}}\n         in your configuration to avoid this warning.");
  } else {
    s3 = void 0;
    describe('S3Model', function() {
      before(function(done) {
        s3 = new S3Model(S3_CONFIG);
        return s3.create_folder('test_folder-7635364', function(err, results) {
          if (err) {
            return s3.delete_folder('test_folder-7635364', function(err, results) {
              return s3.create_folder('test_folder-7635364', function(err, results) {
                return done();
              });
            });
          } else {
            return done();
          }
        });
      });
      after(function(done) {
        return done();
      });
      describe('Folder Management', function() {
        it('should create a folder', function(done) {
          return s3.create_folder('sample_folder', function(err, results) {
            assert.equal(results.Location, '/sample_folder');
            return done();
          });
        });
        it('should list all folders', function(done) {
          return s3.get_all_folders(function(err, results) {
            var bucket_names;
            bucket_names = results.Buckets.map(function(bucket) {
              return bucket.Name;
            });
            assert(bucket_names.includes('sample_folder'));
            return done();
          });
        });
        it('should check if a folder exists', function(done) {
          return s3.folder_exists('test_folder-7635364', function(err, found_folder) {
            assert.equal(found_folder, true);
            return done();
          });
        });
        return it('should delete a folder', function(done) {
          return s3.delete_folder('sample_folder', function(err, results) {
            assert.deepEqual(results, {});
            return done();
          });
        });
      });
      return describe('File Management', function() {
        it('should create a file', function(done) {
          var body;
          body = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a]);
          return s3.create_file('test_folder-7635364', 'testFile123', 'image/png', body, function(err, created_file) {
            assert(created_file.ETag != null);
            return done();
          });
        });
        it('should create a file in a folder that does not exist and create that folder', function(done) {
          var body, contentType, filename, folder_name;
          folder_name = 'magically-created-folder-323';
          filename = 'testFile123';
          body = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a]);
          contentType = 'image/png';
          return s3.create_file(folder_name, filename, contentType, body, function(err, created_file) {
            assert(created_file.ETag != null);
            return s3.folder_exists(folder_name, function(err, found_folder) {
              assert(found_folder);
              return done();
            });
          });
        });
        it('should create a file in the default folder and then find it', function(done) {
          var body;
          body = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a]);
          return s3.create_file('my_folder', 'fake_file.png', 'image/png', body, function(err, created_file) {
            assert(created_file.ETag);
            return s3.get_file(null, 'fake_file.png', function(err, found_file) {
              assert(found_file.match(/.*Expires.*/).length > 0);
              assert(found_file.match(/https:\/\/.*s3\.amazonaws\.com.*\/fake_file\.png.*/).length > 0);
              return done();
            });
          });
        });
        it('should get the file', function(done) {
          return s3.get_file('test_folder-7635364', 'testFile123', function(err, found_file) {
            assert(found_file.match(/.*Expires.*/));
            return done();
          });
        });
        return it('should delete a file', function(done) {
          return s3.delete_file('test_folder-7635364', 'testFile123', function(err, deleted_file) {
            assert(deleted_file, {});
            return done();
          });
        });
      });
    });
  }

}).call(this);