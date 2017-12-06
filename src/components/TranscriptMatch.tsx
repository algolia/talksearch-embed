import { h, Component } from 'preact';
import { Highlight } from 'react-instantsearch/dom';
import { Transcript } from './MainHits';

interface Props {
  hit: Transcript;
}
export default class TranscriptMatch extends Component<Props, void> {
  render() {
    return (
      <div>
        …<Highlight hit={this.props.hit} attributeName="text" tagName="mark" />…
      </div>
    );
  }
}
