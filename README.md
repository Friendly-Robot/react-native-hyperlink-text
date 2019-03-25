# React Native Hyperlink Text :earth_americas:

[Text](https://facebook.github.io/react-native/docs/text) with [Linking](https://facebook.github.io/react-native/docs/linking)

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Build Status][travis-image]][travis-url]

## Usage
```javascript
import { StyleSheet } from 'react-native';
import HyperlinkText from 'react-native-hyperlink-text';

const styles = StyleSheet.create({
  link: {
    color: 'blue',
    fontSize: 22,
  },
  base: {
    color: 'black',
    fontSize: 18,
  },
});

<HyperlinkText
  value={'Visit my website and check out my portfolio @https://friendly-robot.netlify.com/portfolio'}
  baseStyle={styles.base}
  linkStyle={styles.link}
/>
```
## Props

### value
A string containing urls or not **(refer to hyperlinks)** that will be converted to a series of `<Text>`s wrapping the content.

### hyperlinks
An array of objects each with a key value pair for assigning urls to keywords.

For example: `[{ portfolio: 'https://friendly-robot.netlify.com/portfolio' }]`

This will map every instance of "portfolio" and transform it into a link that directs to that url. This means that the `value` and `hyperlinks` in the example above will look like this:

```javascript
<HyperlinkText
  value={'Vist my website and check out my portfolio!'}
  hyperlinks={[
    { website: 'https://friendly-robot.netlify.com' }
    { portfolio: 'https://friendly-robot.netlify.com/portfolio' }
  ]}
  baseStyle={styles.base}
  linkStyle={styles.link}
/>
```
### baseStyle
A style object to apply to all `<Text>` elements.

### linkStyle
A style object to apply only to hyperlink `<Text>` elements.

<p align="center">
  <img src="https://raw.githubusercontent.com/friendly-robot/react-native-hyperlink-text/master/screenshot.png" width="380" alt="React Native Hyperlink Text">
</p>

## TODO
Map `hyperlinks` backwards as well, meaning if the link is provided in the string so every instance of it will need to be shortened to a keyword instead, then do that as well as vice versa (which is does currently).

## License
License [The MIT License](http://opensource.org/licenses/MIT)
Copyright (c) 2019 Andy Li

[downloads-image]: https://img.shields.io/npm/dm/react-native-hyperlink-text.svg
[npm-url]: https://www.npmjs.com/package/react-native-hyperlink-text
[npm-image]: https://img.shields.io/npm/v/react-native-hyperlink-text.svg

[travis-url]: https://travis-ci.org/3axap4eHko/react-native-hyperlink-text
[travis-image]: https://img.shields.io/travis/3axap4eHko/react-native-hyperlink-text/master.svg
