import { h, Component } from 'preact';
import { InfiniteHits } from 'react-instantsearch/dom';

import { SingleHit } from '../';
import MainHit from './MainHit';

interface Props {
  openDetail(videoId: string): void;
}
export default class MainHits extends Component<Props, null> {
  render() {
    return (
      <InfiniteHits
        hitComponent={({ hit }: { hit: SingleHit }) => (
          <MainHit hit={hit} onOpenDetail={this.props.openDetail} />
        )}
      />
    );
  }
}
