module.exports = (env) => {
  console.log(env);
  return require(`./build/webpack.${env}.js`)
}