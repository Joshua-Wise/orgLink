# orgLink

orgLink is a Chrome extension designed to provide easy access to frequently used web resources. It allows organization to maintain and deploy an extension listing important links, allowing users to quickly access information about each resource.

![screenshot](https://github.com/Joshua-Wise/orgLink/blob/main/orgLink_Screenshot.png?raw=true)

## Features

- Display a customizable list of web resource links
- Favorite/unfavorite links for quick access
- Informational tooltips for each resource
- Clean user interface with responsive designed

## Installation

1. Clone this extension directory of this repository.
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.
5. Optionally, mass deploy via Google Workspace and the Chrome Web Store.

## Usage

After installation, click on the extension icon in your Chrome toolbar to open the popup. From there, you can:

- Click on any link to open it in a new tab
- Hover over the info icon to view more details about the resource
- Click the star icon to add or remove a resource from your favorites

Favorite resources will appear at the top of the list for easy access.

## Customization

To customize the list of resources:

1. Open the `links.json` file.
2. Modify the JSON array to include your desired links. Each link should have the following structure:

```json
{
  "id": 1,
  "title": "Resource Name",
  "url": "https://example.com",
  "tooltip": "Brief description of the resource"
}
```

3. Save the file and reload the extension in Chrome.

## Development

This extension is built using vanilla JavaScript, HTML, and CSS. It also utilizes Bootstrap icons for additional polish.

Key files:
- `popup.html`: The main HTML structure of the extension popup
- `popup.js`: Contains all the JavaScript logic for loading links, handling user interactions, and managing favorites
- `style.css`: Defines the styling for the extension
- `links.json`: Stores the list of resource links
