const { Liquid } = require("liquidjs");
const path = require("path");

const template = new Liquid({
  root: path.resolve(__dirname, "templates/"),
  extname: ".tpl"
});

function renderMainJs() {
  return template.renderFile("main")
}

function renderInputJs() {
  return template.renderFile("input")
}

function renderIndexHtml() {
  return template.renderFile("index")
}

module.exports = {
  renderMainJs,
  renderInputJs,
  renderIndexHtml
}
