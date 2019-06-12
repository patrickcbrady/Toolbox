#target aftereffects

// - - - - - - - - - - - - - - 
// File: BGRender.jsx
// Version: 2.0.1
// Author: Immanuel Morales
// Date: 6/11/2019
// - - - - - - - - - - - - - -

// Begins rendering whatever renders are in the queue.
// Saves the project and clears the render queue on each run.

(function()
{
	var RETURN_CODE_SUCCESS = 0;
	var RETURN_CODE_FAIL = 1;
	var rq = app.project.renderQueue;
	var cmdF = {};
	var cmdS = "";
	var newS = "";
	var i = 0;

	function cString( s, a )
	// A String function like printf in C
	// variables are inserted using the `%` delimiter
	{
		i = 0;
		newS = s;
		while ( i < a.length )
		{
			newS = newS.replace( '%c', a[i] );
			i += 1;
		}
		return newS;
	}
	function sysCmd( s, f )
	// Writes files, then runs them, then deletes them
	// Useful for running non-locking external scripts
	{
		cmdF = new File(f);
		cmdF.open("w");
		cmdF.write(s);
		cmdF.close();

		// Executing File() without assigning it
		// a var allows the external script
		// to run without locking AE
		system.callSystem
		(
			cString
			(
				'chmod 755 "%c"',
				[ cmdF.fsName ]
			)
		);
		system.callSystem
		(
			cString
			(
				'open -a Terminal "%c"',
				[ cmdF.fsName ]
			)
		);
		// Optional cleanup 
		// cmdF.remove();
		return RETURN_CODE_SUCCESS;
  	}

	// If the project isn't saved,
	// it won't render the latest changes
	app.project.save();

	cmdS = cString
	(
		'"%c/aerender" -project "%c" %c/BGRenders.sh',
		[
			Folder.appPackage.parent.fsName,
			app.project.file.fsName,
			Folder.temp.fsName
		]
	);
	sysCmd( cmdS );
	
	// clear the render queue
	while ( rq.numItems > 0 )
	{
		rq.item(1).remove();
	}
}());
