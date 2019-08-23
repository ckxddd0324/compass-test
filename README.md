# compass-test

# Installation 
- Node is installed
	- To install Node for unix based OS [https://nodejs.org/en/download/package-manager/](https://nodejs.org/en/download/package-manager/)
	- To install Node on mac [https://nodejs.org/en/download/](https://nodejs.org/en/download/) OR
	- Install homebrew [https://brew.sh/](https://brew.sh/)
	- Run ``brew install node`` after homebrew installed
- Clone this repo or download the zip file(export to desired location)
- Open a new terminal
- Navigate to the exported folder directory/ repo directory
- Run command ``npm install`` in the folder directory

## Before running test
Please update the ``accountInfo.json`` file in ``/data`` with the user email and password included in the email.

## Start to run the tests
Run command ``npm test``to run the test

## Output file
After the test is ran, there will be two output files generated from the tests. The output files are located in the ``results`` folder
The file names are: 
1. ``topFiveListingWithClickingRows.json``
2. ``topFiveListingWithNextBtn.json``
