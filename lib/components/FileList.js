"use strict";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var classNames = require('classnames');

var _require = require('preact'),
    h = _require.h;

var FileItem = require('./FileItem/index.js');

var VirtualList = require('./VirtualList');

function chunks(list, size) {
  var chunked = [];
  var currentChunk = [];
  list.forEach(function (item) {
    if (currentChunk.length < size) {
      currentChunk.push(item);
    } else {
      chunked.push(currentChunk);
      currentChunk = [item];
    }
  });
  if (currentChunk.length) chunked.push(currentChunk);
  return chunked;
}

module.exports = function (props) {
  var noFiles = props.totalFileCount === 0;
  var dashboardFilesClass = classNames('uppy-Dashboard-files', {
    'uppy-Dashboard-files--noFiles': noFiles
  }); // It's not great that this is hardcoded!
  // It's ESPECIALLY not great that this is checking against `itemsPerRow`!

  var rowHeight = 71;
  var fileProps = {
    // FIXME This is confusing, it's actually the Dashboard's plugin ID
    id: props.id,
    error: props.error,
    // TODO move this to context
    i18n: props.i18n,
    uppy: props.uppy,
    // features
    acquirers: props.acquirers,
    resumableUploads: props.resumableUploads,
    individualCancellation: props.individualCancellation,
    // visual options
    hideRetryButton: props.hideRetryButton,
    hidePauseResumeButton: props.hidePauseResumeButton,
    hideCancelButton: props.hideCancelButton,
    showLinkToFileUploadResult: props.showLinkToFileUploadResult,
    showRemoveButtonAfterComplete: props.showRemoveButtonAfterComplete,
    isWide: props.isWide,
    metaFields: props.metaFields,
    recoveredState: props.recoveredState,
    // callbacks
    toggleFileCard: props.toggleFileCard,
    handleRequestThumbnail: props.handleRequestThumbnail,
    handleCancelThumbnail: props.handleCancelThumbnail
  };

  var sortByGhostComesFirst = function sortByGhostComesFirst(file1, file2) {
    return props.files[file2].isGhost - props.files[file1].isGhost;
  }; // Sort files by file.isGhost, ghost files first, only if recoveredState is present


  var files = Object.keys(props.files);
  if (props.recoveredState) files.sort(sortByGhostComesFirst);
  var rows = chunks(files, props.itemsPerRow);

  var renderRow = function renderRow(row) {
    return (// The `role="presentation` attribute ensures that the list items are properly
      // associated with the `VirtualList` element.
      // We use the first file ID as the key—this should not change across scroll rerenders
      h("div", {
        role: "presentation",
        key: row[0]
      }, row.map(function (fileID) {
        return h(FileItem, _extends({
          key: fileID,
          uppy: props.uppy
        }, fileProps, {
          role: "listitem",
          openFileEditor: props.openFileEditor,
          canEditFile: props.canEditFile,
          toggleAddFilesPanel: props.toggleAddFilesPanel,
          file: props.files[fileID]
        }));
      }))
    );
  };

  return h(VirtualList, {
    "class": dashboardFilesClass,
    role: "list",
    data: rows,
    renderRow: renderRow,
    rowHeight: rowHeight
  });
};