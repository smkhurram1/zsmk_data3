sap.ui.define(["sap/ui/core/mvc/Controller"], function(Controller) {
	"use strict";
	return Controller.extend("zsmk_data1.controller.v_detail", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf zsmk_data1.view.v_detail
		 **/

		onInit: function() {

			var oViewModel = new sap.ui.model.json.JSONModel({
				editable: false
			});
			
			this.getView().setModel(oViewModel, "itemDetailView");

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var oTarget = oRouter.getTarget("target_detail");
			oRouter.getRoute("rout_detail").attachMatched(this._onRouterFound,this);
			oTarget.attachDisplay(this._onTargetFound,this);

		},
		
		_onTargetFound:function(evt){
			this._evtData = evt.getParameter("data");

			var oViewModel = this.getView().getModel("itemDetailView");
			oViewModel.setProperty("/editable",true);

			this._bindView(this._evtData.soID);
		},
		
		_onRouterFound:function(evt){
			var oViewModel = this.getView().getModel("itemDetailView");
			oViewModel.setProperty("/editable",false);
			
			this._bindView(evt.getParameter("arguments").soID);
		},
		
		_bindView:function(ID){
			var oView = this.getView();
			oView.bindElement({
			path:"/HeaderSet('" + ID + "')"	
			});
			
		},
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf zsmk_data1.view.v_detail
		 */ //	onBeforeRendering: function() {
		//
		//	},
		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf zsmk_data1.view.v_detail
		 */ //	onAfterRendering: function() {
		//
		//	},
		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf zsmk_data1.view.v_detail
		 */ //	onExit: function() {
		//
		//	}
		/**
		 *@memberOf zsmk_data1.controller.v_detail
		 */
		onNavBack: function() {
			if(this._evtData && this._evtData.fromTarget){
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.getTargets().display(this._evtData.fromTarget);
				delete this._evtData.fromTarget;
				return;
			}
			var sprevHash = sap.ui.core.routing.History.getInstance().getPreviousHash();
			if (sprevHash !== undefined) {
				history.go(-1);
			} else {
				this.getOwnerComponent().getRouter().navTo("", {}, true);
			}

		}
	});
});