import { lookup } from 'dns';

lookup('example.com', (err, address, family) => {
  console.log('address: %j family: IPv%s', address, family);
});
