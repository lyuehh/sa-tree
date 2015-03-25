'use strict';

Polymer({
    treeid: 'tree',
    created: function() {
        this.setting = {};
        this.nodes = [];
        this.tree = {};
    },
    ready: function() {
        var container = this.$.ztreeContainer;
        this.async(function() {

            // add onSelect callback
            if (!$.fn.zTree.oriInit) {
                $.fn.zTree.oriInit = $.fn.zTree.init;
                $.fn.zTree.init = function() {
                    var obj = $.fn.zTree.oriInit.apply(this, arguments);
                    return (function(t) {
                        t.oriSelectNode = t.selectNode;
                        t.selectNode = function(nd) {
                            t.oriSelectNode.apply(this, arguments);
                            if (this.setting.callback.onSelect) {
                                this.setting.callback.onSelect(null, this.setting.treeId, nd);
                            }
                        };
                        return t;
                    })(obj);
                };
            }

            this.tree = $.fn.zTree.init($(container.querySelector('.ztree')), this.setting, this.nodes);
            var nodes = this.tree.getNodes();
            this.tree.selectNode(nodes[0]);
        }, null, 0);
    },
    attached: function() {
    },
    domReady: function() {
    },
    detached: function() {
        this.tree.destroy();
    }
});

