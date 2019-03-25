import React, { PureComponent } from 'react';
import { Linking, StyleSheet, Text } from 'react-native';
import { arrayOf, object, oneOfType, string } from 'prop-types';

const defaultStyle = StyleSheet.create({
  root: {
    flexWrap: 'wrap',
  },
});

export default class HyperlinkText extends PureComponent {

  static propTypes = {
    value: string,
    baseStyle: oneOfType(object, arrayOf(object)),
    linkStyle: oneOfType(object, arrayOf(object)),
    hyperlinks: arrayOf(object),
  };

  static defaultProps = {
    value: '',
    baseStyle: {},
    linkStyle: {},
    hyperlinks: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      output: [],
    }
  }

  componentDidMount() {
    if (this.props.value) {
      if (this.props.hyperlinks.length) {
        this.setState({ output: this.composeHyperlinkProvidedText(
          this.props.value,
          this.props.hyperlinks,
          this.props.linkStyle,
          this.props.openLink
        ) });
      } else {
        this.setState({ output: this.composeHyperlinkedText(
          this.props.value,
          this.props.linkStyle,
          this.props.openLink
        ) });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value ||
      this.props.baseStyle !== nextProps.baseStyle ||
      this.props.linkStyle !== nextProps.linkStyle ||
      this.props.hyperlinks !== nextProps.hyperlinks) {
      if (nextProps.hyperlinks.length) {
        this.setState({ output: this.composeHyperlinkProvidedText(
          nextProps.value,
          nextProps.hyperlinks,
          nextProps.linkStyle,
          nextProps.openLink
        ) });
      } else {
        this.setState({ output: this.composeHyperlinkedText(
          nextProps.value,
          nextProps.linkStyle,
          nextProps.openLink
        ) });
      }
    }
  }

  render() {
    const { baseStyle } = this.props;
    const { output } = this.state;
    return (
      <Text style={[defaultStyle.root, baseStyle]}>
        { output }
      </Text>
    );
  }

  composeHyperlinkedText(string, linkStyle = {}, openLink) {
    if (typeof string !== 'string') return null;
    const regex = /(((https?\:\/\/)|(www\.))(\S+))/gi;
    const linkExists = regex.test(string);
    if (linkExists) {
      // Reset the regex index because sometimes it starts off at a weird sequence.. 
      regex.lastIndex = 0;
      const startIndices = this.getStartIndices(regex, string);
      const endIndices = this.getEndIndices(string, startIndices);
      if (startIndices.length === endIndices.length) {
        const result = [];
        let noLinkString = string.substring(0, startIndices[0] !== undefined ? startIndices[0] : string.length);
        result.push(<Text key={noLinkString}>{ noLinkString }</Text>);
        for (let i = 0; i < startIndices.length; i += 1) {
          const linkString = string.substring(startIndices[i], endIndices[i]);
          result.push(
            <Text
              key={linkString}
              style={linkStyle}
              onPress={openLink ? () => openLink(linkString) : () => Linking.openURL(linkString)}
            >
              { linkString }
            </Text>
          );
          noLinkString = string.substring(endIndices[i], startIndices[i + 1] || string.length);
          if (noLinkString) {
            result.push(
              <Text key={noLinkString}>
                { noLinkString }
              </Text>
            );
          }
        }
        return result;
      }
    }
    return <Text>{ string }</Text>;
  }
  
  getStartIndices(regex, text) {
    const result = [];
    let match;
    do {
      match = regex.exec(text);
      if (match) result.push(match.index);
    } while (match);
    return result;
  }
  
  getEndIndices(text, startIndices) {
    const endIndices = [];
    for (let i = 0; i < startIndices.length; i += 1) {
      let j = startIndices[i] + 1;
      while (text[j] !== ' ' && text[j] !== undefined) {
        j += 1;
      }
      endIndices.push(j);
    }
    return endIndices;
  }

  composeHyperlinkProvidedText(string, hyperlinks = [], linkStyle = {}, openLink) {
    if (typeof string !== 'string') return null;
    const format = [];
    const startIndices = [];
    const endIndices = [];
    const keys = [];
    for (let i = 0; i < hyperlinks.length; i += 1) {
      const key = Object.keys(hyperlinks[i])[0];
      const regex = new RegExp(key, "g");
      const len = key.length;
      let match;
      regex.lastIndex = 0;
      do {
        match = regex.exec(string);
        if (match) {
          format.push(hyperlinks[i]);
          startIndices.push(match.index);
          endIndices.push(match.index + len);
          keys.push(key);
        }
      } while (match);
    }
    const result = [];
    let noLinkString = string.substring(0, startIndices[0] !== undefined ? startIndices[0] : string.length);
    result.push(<Text key={noLinkString}>{ noLinkString }</Text>);
    for (let i = 0; i < startIndices.length; i += 1) {
      const linkKey = keys[i];
      const hyperlink = format[i][keys[i]];
      result.push(
        <Text
          key={hyperlink}
          style={linkStyle}
          onPress={openLink ? () => openLink(hyperlink) : () => Linking.openURL(hyperlink)}
        >
          { linkKey }
        </Text>
      );
      noLinkString = string.substring(endIndices[i], startIndices[i + 1] || string.length);
      if (noLinkString) {
        result.push(
          <Text key={noLinkString}>
            { noLinkString }
          </Text>
        );
      }
    }
    return result;
  }
  
}
