/**
 * Description: index.js
 * Author: crossjs <liwenfu@crossjs.com>
 * Date: 2014-12-15 21:20:26
 */

'use strict';

/*jshint maxparams:4*/

var $ = require('jquery'),
  Dialog = require('nd-dialog');

var template = require('./src/confirm.handlebars');

// Confirm
// -------
// Confirm 是一个有基础模板和样式的对话框组件。
var Confirm = Dialog.extend({

  attrs: {
    title: '默认标题',

    confirmTpl: '<a class="ui-dialog-button-orange" href="javascript:;">确定</a>',
    cancelTpl: '<a class="ui-dialog-button-white" href="javascript:;">取消</a>',

    message: '默认内容',

    afterHide: 'destroy'
  },

  setup: function() {
    Confirm.superclass.setup.call(this);

    var model = {
      classPrefix: this.get('classPrefix'),
      message: this.get('message'),
      title: this.get('title'),
      confirmTpl: this.get('confirmTpl'),
      cancelTpl: this.get('cancelTpl'),
      hasFoot: this.get('confirmTpl') || this.get('cancelTpl')
    };

    this.set('content', template(model));
  },

  events: {
    'click [data-role=confirm]': function(e) {
      e.preventDefault();
      this.trigger('confirm') !== false && this.hide();
    },
    'click [data-role=cancel]': function(e) {
      e.preventDefault();
      this.trigger('cancel') !== false && this.hide();
    }
  },

  _onChangeMessage: function(val) {
    this.$('[data-role=message]').html(val);
  },

  _onChangeTitle: function(val) {
    this.$('[data-role=title]').html(val);
  },

  _onChangeConfirmTpl: function(val) {
    this.$('[data-role=confirm]').html(val);
  },

  _onChangeCancelTpl: function(val) {
    this.$('[data-role=cancel]').html(val);
  }

});

var instance;

Confirm.show = function(message, onConfirm, onCancel, options) {
  var defaults = {
    message: message,
    title: '确认框'
  };

  defaults = $.extend(null, defaults, options);

  if (instance) {
    instance.set(defaults);
  } else {
    instance = new Confirm(defaults).after('hide', function() {
      // reset instance
      instance = null;
    });
  }

  if (onConfirm) {
    instance.off('confirm');
    instance.on('confirm', onConfirm);
  }

  if (onCancel) {
    instance.off('cancel');
    instance.on('cancel', onCancel);
  }

  return instance.show();
};

Confirm.hide = function() {
  if (instance) {
    instance.hide();
  }
};

module.exports = Confirm;
