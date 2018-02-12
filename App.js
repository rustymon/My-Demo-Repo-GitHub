Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    launch: function() {
        //Write app code here
	//This is a comment to show the GitHub integration
        //This is another comment to show the GitHub integration

        this.iterationCombobox = this.add({
        	xtype: 'rallyiterationcombobox',
        	listeners: {
        		ready: this._onIterationComboboxLoad,
        		select: this._onIterationComboboxChanged,
        		scope: this
        	}
    	});
        console.log ('Created and Loaded ComboBox');
        //API Docs: https://help.rallydev.com/apps/2.1/doc/

    },

    _onIterationComboboxLoad: function() {
    	//Add New Component
    	var addNewConfig = {
	    	xtype: 'rallyaddnew',
	    	recordTypes: ['User Story', 'Defect'],
	    	ignoredRequiredFields: ['Name', 'ScheduleState', 'Project'],
	    	showAddWithDetails: false,
    		listeners: {
        		beforecreate: this._onBeforeCreate,
        		scope: this
    		}
		};

		this.addNew = this.add(addNewConfig);
		console.log ('Created and Loaded AddNew');

		//Add Cardboard Component
	    var cardBoardConfig = {
	        xtype: 'rallycardboard',
	        context: this.getContext(),
	        types: ['Defect', 'User Story'],
	        attribute: 'ScheduleState',
	        storeConfig: {
	            filters: [this.iterationCombobox.getQueryFromSelected()]
	        },
	        listeners: {
	        	load: this._onCardLoad,
	        	scope: this
	        }
	    };
    	this.cardBoard = this.add(cardBoardConfig);
    	console.log ('Created and Loaded Cardboard');

	},

	_onBeforeCreate: function(addNewComponent, record) {
    // record is the new item that is about to get created
    	record.set('Iteration', this.iterationCombobox.getValue());
    	console.log ('onBeforeCreate function creation');

	},

	_onCardLoad: function() {
    // what happens when cards get loaded onto the cardboard
    	console.log ('Card Loaded');
    	var cbCardObj = this.cardBoard.getCards();
    	var cNumber = this.cardBoard.getCardCount(cbCardObj); 
    	console.log ('Linked Combobox changes to Cardboard and loaded in ', cNumber, 'objects');
    	
	},

	_onIterationComboboxChanged: function() {
	    var config = {
	        storeConfig: {
	            filters: [this.iterationCombobox.getQueryFromSelected()]
	        }
	    };
    	this.cardBoard.refresh(config);

	}	

});
