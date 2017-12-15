import { h, Component } from 'preact';
import { Snippet } from 'react-instantsearch/dom';
import { Transcript } from './MainHits';

interface Props {
  hit: Transcript;
}
export default class TranscriptMatch extends Component<Props, void> {
  render() {
    return (
      <div className="f7 bunting">
        <Snippet hit={this.props.hit} attributeName="text" tagName="mark" />
      </div>
    );
  }
}
