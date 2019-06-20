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
    var FOLDER_NAMES = {
        COMPS: 'Comps',
        PRECOMPS: '_Precomps',
        SOLIDS: 'Solids',
        ASSETS: 'Assets'
    }

    function getAllItems()
    {
        var a = new Array();
        var proj = app.project;
        for (var i = 1; i <= proj.numItems; i++) {
            a.push(proj.item(i));
        }
        return a;
    };

    function getFolders(){
        var items = app.project.items;
        var folders = {};
        for(var k in FOLDER_NAMES) {
            var name = FOLDER_NAMES[k];
            folders[name] = (items.addFolder(name));
        }
        return folders;
    }

    function organize(){
        var folders = getFolders();
        var items = getAllItems();
        var sortItem = function (item) {
            if (item.typeName !== 'Folder') {
                var folderName = FOLDER_NAMES.COMPS
                if (item.typeName === 'Footage') {
                    folderName = item.mainSource instanceof SolidSource ? FOLDER_NAMES.SOLIDS : FOLDER_NAMES.ASSETS;
                }
                else if (item.typeName === 'Composition' && item.usedIn.length > 0) {
                    folderName = FOLDER_NAMES.PRECOMPS;
                }
                item.parentFolder = folders[folderName];
            }
        };
        for (var i = 0; i < items.length; i++) {
            sortItem(items[i]);
        }
    }

    function cleanUp(){
        var items = getAllItems();
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.typeName === "Folder" && item.numItems === 0) item.remove();
        }
    }

    function main()
    {
        app.beginUndoGroup("Sort Project");
        organize();
        cleanUp();

        app.endUndoGroup();
    }

    main();
}());
