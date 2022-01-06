"use strict";

var _require = require('preact'),
    h = _require.h;

var metaFieldIdToName = function metaFieldIdToName(metaFieldId, metaFields) {
  var field = metaFields.filter(function (f) {
    return f.id === metaFieldId;
  });
  return field[0].name;
};

module.exports = function renderMissingMetaFieldsError(props) {
  var file = props.file,
      toggleFileCard = props.toggleFileCard,
      i18n = props.i18n,
      metaFields = props.metaFields;
  var missingRequiredMetaFields = file.missingRequiredMetaFields;

  if (!(missingRequiredMetaFields != null && missingRequiredMetaFields.length)) {
    return null;
  }

  var metaFieldsString = missingRequiredMetaFields.map(function (missingMetaField) {
    return metaFieldIdToName(missingMetaField, metaFields);
  }).join(', ');
  return h("div", {
    className: "uppy-Dashboard-Item-errorMessage"
  }, i18n('missingRequiredMetaFields', {
    smart_count: missingRequiredMetaFields.length,
    fields: metaFieldsString
  }), ' ', h("button", {
    type: "button",
    "class": "uppy-u-reset uppy-Dashboard-Item-errorMessageBtn",
    onClick: function onClick() {
      return toggleFileCard(true, file.id);
    }
  }, i18n('editFile')));
};