const fetch = require('node-fetch');

async function run (){
  const res = await fetch('https://img0.baidu.com/it/u=3486467821,3996728349&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500');
  console.log('res :>> ', res.headers.get('content-type'));
}

run();