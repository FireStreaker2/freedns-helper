![freedns-helper](https://socialify.git.ci/FireStreaker2/freedns-helper/image?description=1&forks=1&issues=1&language=1&name=1&owner=1&pulls=1&stargazers=1&theme=Dark)

# About
Freedns helper is a chrome extension that helps categorize sites on [freedns](https://freedns.afraid.org/). It allows for quick selection of appropriate sites in order to save time.

# Usage
In order to use freedns-helper, make sure you have [Node.js](https://nodejs.org/) and [sed](https://www.gnu.org/software/sed/manual/sed.html) installed.
```bash
$ git clone https://github.com/FireStreaker2/freedns-helper.git
$ cd freedns-helper
$ npm i
$ npm run build
```

After building, you can now head over to ``chrome://extensions`` and click on ``Load unpacked``.

# Note
Currently, there is no way to display category names when directly sending an HTTP request to the Lightspeed API. This is because their data is not publicly released, leaving users only able to see the category number.  

However, if you would like to see these category names, you can introduce a third-party API like the [unofficial Lightspeed API](https://github.com/FireStreaker2/LightspeedAPI), and integrate it yourself.

# License
[MIT](https://github.com/FireStreaker2/freedns-helper/blob/main/README.md)