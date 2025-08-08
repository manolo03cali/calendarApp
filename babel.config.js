// module.exports = {
//   presets: [
//     ["@babel/preset-env", { targets: { esmodules: true } }],
//     ["@babel/preset-react", { runtime: "automatic" }],
//   ],
// };
export default {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
};
