sc stop AGMService
sc stop AGSService
sc stop TabletInputService
sc stop AdobeARMservice
sc stop BTAGService
sc stop bthserv
sc stop wuauserv
taskkill -t -f -im Adobe*
taskkill -t -f -im Creative*
taskkill -t -f -im Acro*
taskkill -t -f -im acro*
taskkill -t -f -im Skype*
taskkill -t -f -im ctfmon*
taskkill -t -f -im Microsoft.Photos*
taskkill -t -f -im OneDrive*
taskkill -t -f -im WinStore*
pause