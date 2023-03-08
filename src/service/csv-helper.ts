import { stringify } from 'csv-stringify';
import { writeFile } from 'fs';

export function createCsvFile(filename, data) {
  return new Promise((resolve, reject) => {
    stringify(data, { header: true }, function (err, output) {
      writeFile(filename, output, 'utf8', function (err) {
        if (err) {
          reject(false);
          console.log(
            'Some error occured - file either not saved or corrupted file saved.',
          );
        } else {
          // resolve(true);
          console.log('file saved successfully');
        }
      });
    });
  });
}
