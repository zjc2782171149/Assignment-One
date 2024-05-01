import RSS3 from 'rss3';

const rss3 = new RSS3({
    endpoint: 'https://rpc.testnet.rss3.io',  // 这里假设RSS3的测试网络API端点是这个，实际情况请查阅官方文档
    privateKey: process.env.RSS3_PRIVATE_KEY,  // 你的私钥，不应该直接硬编码在代码中，应使用环境变量来管理
});

export default rss3;