#target aftereffects

// - - - - - - - - - - - - - -
// File: "SortProject.jsx"
// Version: 2.0
// Author: Immanuel Morales
// Date: 6/11/2019
// - - - - - - - - - - - - - -


// Automatically sorts and organizes whichever
// After Effects Project file is open

(function()
{
	function getAllItems()
	{
		var a = new Array();
		var proj = app.project;
		var i = 0;
		if ( proj.selection.length > 0 )
		{
			while ( i < proj.selection.length )
			{
				a.push( proj.selection[i] );
				i += 1;
			}
		} else {
			i = 1;
			while ( i <= proj.numItems )
			{
				a.push( proj.item(i) );
				i += 1;
			}
		}
		return a;
	};
	function itemsByName( n, t )
	{
		var p = app.project;
		var a = [];
		var i = 1;
		while ( i <= p.numItems )
		{
			var item = p.item(i);
			if (!!t)
			{
				if (
					item.typeName == t &&
					item.name == n
				){
					a.push(item);
				}
			} else {
				if ( item.name == n )
				{
					a.push(item);
				}
			}
			i += 1;
		}
		if (a.length == 0)
		{
			if (t == "Folder")
			{
				a.push( p.items.addFolder(n) );
				return a;
			} else {
				return RETURN_CODE_FAIL;
			}
		} else {
			return a;
		}
	}
	function main()
	{
		app.beginUndoGroup("Sort Project");
		
		var RETURN_CODE_SUCCESS = 0;
		var RETURN_CODE_FAIL = 1;

		var item = {};
		var source = {};
		var tName = "";
		var name = "";
		var items = app.project.items;
		var itemsA = getAllItems();
		
		var i = 0;

		// setup the folder structure
		var fComps = itemsByName( "Comps", "Folder" )[0];
		var fPrecomps = itemsByName( "_Precomps", "Folder" )[0];
		var fAssets = itemsByName( "Assets", "Folder" )[0];
		var fSolids = itemsByName( "Solids", "Folder" )[0];
		fPrecomps.parentFolder = fComps;
		fComps.parentFolder = app.project.rootFolder;
		fAssets.parentFolder = app.project.rootFolder;
		fSolids.parentFolder = app.project.rootFolder;

		while ( i<itemsA.length )
		{
			item = itemsA[i];
			source = item.mainSource;
			tName = item.typeName;
			name = item.name;

			// if it's Footage
			if ( tName === "Footage" )
			{
				// and it's a Solid
				if ( source instanceof SolidSource )
				{
					// move it in "Solids"
					item.parentFolder = fSolids;
				} else {
					// put it in "Assets"
					item.parentFolder = fAssets;
				}
			// if it's a CompItem
			} else if ( tName === "Composition" ) {
				// and it's top-level
				if ( item.usedIn.length === 0 )
				{
					// put it in "Comps"
					item.parentFolder = fComps;
				} else {
					// put it in "_Precomps"
					item.parentFolder = fPrecomps;
				}
			}
			i += 1;
		}

		// Remove unused folders
		var i = 0;
		while ( i<itemsA.length )
		{
			item = itemsA[i];
			tName = item.typeName;
			if (
				tName === "Folder" &&
				item.numItems === 0
			)
			{
				item.remove();
			}
			i += 1;
		}

		app.endUndoGroup();
	}

	main();
}());
