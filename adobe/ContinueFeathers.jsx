#target aftereffects

// - - - - - - - - - - - - - -
// File: ContinueFeathers.jsx
// Version: 1.1
// Author: Immanuel Morales
// Date: 6/13/2019
// - - - - - - - - - - - - - -

// Applies per-vertex feathering of the selected keyframe to the rest

(function()
{
	app.beginUndoGroup( "Continue Feathers" );

	var RETURN_CODE_SUCCESS = 0;
	var RETURN_CODE_FAIL = 1;

	var comp = app.project.activeItem;
	var layer = comp.selectedLayers[0];
	var prop = layer.selectedProperties[0];
	var path = shape = key = null;
	var shape2 = new Shape();
	var i = 1;

	if (
		!prop.isMask ||
		path.numKeys > 0 ||
		path.selectedKeys.length > 0
	) {
		return RETURN_CODE_FAIL;
	}

	path = prop.property(1);
	shape = path.keyValue( path.selectedKeys[0] );
	
	while ( i <= path.numKeys )
	{
		shape2 = path.keyValue(i);
		shape2.featherIterps = shape.featherInterps;
		shape2.featherRadii = shape.featherRadii;
		shape2.featherRelCornerAngles = shape.featherRelCornerAngles;
		shape2.featherRelSegLocs = shape.featherRelSegLocs;
		shape2.featherSegLocs = shape.featherSegLocs;
		shape2.featherTensions = shape.featherTensions;
		shape2.featherTypes = shape.featherTypes;
		path.setValueAtTime
		(
			path.keyTime(i),
			shape2
		);
		i += 1;
	}

	app.endUndoGroup();
}());
