"use strict";

var _require = require('preact'),
    h = _require.h,
    Fragment = _require.Fragment;

var prettierBytes = require('@transloadit/prettier-bytes');

var truncateString = require('@uppy/utils/lib/truncateString');

var MetaErrorMessage = require('../MetaErrorMessage');

var renderFileName = function renderFileName(props) {
  var _props$file$meta = props.file.meta,
      author = _props$file$meta.author,
      name = _props$file$meta.name;

  function getMaxNameLength() {
    if (props.containerWidth <= 352) {
      return 35;
    }

    if (props.containerWidth <= 576) {
      return 60;
    } // When `author` is present, we want to make sure
    // the file name fits on one line so we can place
    // the author on the second line.


    return author ? 20 : 30;
  }

  return h("div", {
    className: "uppy-Dashboard-Item-name",
    title: name
  }, truncateString(name, getMaxNameLength()));
};

var renderAuthor = function renderAuthor(props) {
  var author = props.file.meta.author;
  var providerName = props.file.remote.providerName;
  var dot = "\xB7";

  if (!author) {
    return null;
  }

  return h("div", {
    className: "uppy-Dashboard-Item-author"
  }, h("a", {
    href: author.url + "?utm_source=Companion&utm_medium=referral",
    target: "_blank",
    rel: "noopener noreferrer"
  }, truncateString(author.name, 13)), providerName ? h(Fragment, null, " " + dot + " ", providerName) : null);
};

var renderFileSize = function renderFileSize(props) {
  return props.file.size && h("div", {
    className: "uppy-Dashboard-Item-statusSize"
  }, prettierBytes(props.file.size));
};

var ReSelectButton = function ReSelectButton(props) {
  return props.file.isGhost && h("span", null, " \u2022 ", h("button", {
    className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-reSelect",
    type: "button",
    onClick: props.toggleAddFilesPanel
  }, props.i18n('reSelect')));
};

var ErrorButton = function ErrorButton(_ref) {
  var file = _ref.file,
      onClick = _ref.onClick;

  if (file.error) {
    return h("button", {
      className: "uppy-u-reset uppy-Dashboard-Item-errorDetails",
      "aria-label": file.error,
      "data-microtip-position": "bottom",
      "data-microtip-size": "medium",
      onClick: onClick,
      type: "button"
    }, "?");
  }

  return null;
};

module.exports = function FileInfo(props) {
  var file = props.file;
  return h("div", {
    className: "uppy-Dashboard-Item-fileInfo",
    "data-uppy-file-source": file.source
  }, h("div", {
    className: "uppy-Dashboard-Item-fileName"
  }, renderFileName(props), h(ErrorButton, {
    file: props.file // eslint-disable-next-line no-alert
    ,
    onClick: function onClick() {
      return alert(props.file.error);
    } // TODO: move to a custom alert implementation

  })), h("div", {
    className: "uppy-Dashboard-Item-status"
  }, renderAuthor(props), renderFileSize(props), ReSelectButton(props)), h(MetaErrorMessage, {
    file: props.file,
    i18n: props.i18n,
    toggleFileCard: props.toggleFileCard,
    metaFields: props.metaFields
  }));
};