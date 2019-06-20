#target aftereffects

// - - - - - - - - - - - - - -
// File: "SortProject.jsx"
// Version: 3.0
// Author: Immanuel Morales and Patrick Brady
// Date: 6/20/2019
// - - - - - - - - - - - - - -


// Automatically sorts and organizes whichever
// After Effects Project file is open

(function()
{
	const FOLDER_NAMES = {
		COMPS: 'Comps',
		PRECOMPS: '_Precomps',
		SOLIDS: 'Solids',
		ASSETS: 'Assets'
	}

	function getAllItems()
	{
		const a = new Array();
		var proj = app.project;
		for (var i = 1; i <= proj.numItems; i++) {
			a.push(proj.item(i));
		}
		return a;
	};

	function getFolders(){
		const items = app.project.items;
		const folders = {};
		Object.keys(FOLDER_NAMES).map((key) => FOLDER_NAMES[key]).forEach((name) => {
			folders[name] = (items.addFolder(name));
		});
		return folders;
	}

	function organize(){
		const folders = getFolders();
		const items = getAllItems(); 
		items.forEach((item) => {
			if (!FOLDER_NAMES.includes(item.name)) {
				let folderName = FOLDER_NAMES.COMPS
				if (item.typeName === 'Footage') {
					folderName = item.mainSource instanceof SolidSource ? FOLDER_NAMES.SOLIDS : FOLDER_NAMES.ASSETS;
				}
				else if (item.typeName === 'Composition' && item.usedIn.length > 0) {
					folderName = FOLDER_NAMES.PRECOMPS;
				}
				item.parentFolder = folders[folderName]
			}
			
		});
	}

	function cleanUp(){
		getAllItems()
		.filter((item) => item.typeName === "Folder")
		.forEach((folder) => {
			if (folder.numItems === 0) folder.remove();
		})
	}

	function main()
	{
		app.beginUndoGroup("Sort Project");
		
		organize()
		cleanUp()

		app.endUndoGroup();
	}

	main();
}());
