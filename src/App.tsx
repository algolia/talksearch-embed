import 'react-instantsearch-theme-algolia/style.min.css';
import './style.scss';

import { h, Component } from 'preact';
import {
  InstantSearch,
  Hits,
  SearchBox,
  PoweredBy,
  Configure,
  Stats,
} from 'react-instantsearch/dom';
import { connectStateResults } from 'react-instantsearch/connectors';

import MainHits from './components/MainHits';
import Detail from './components/Detail';

const RefinedSearch = connectStateResults(
  ({ children, searchState: { query = '' } }) => {
    try {
      // todo: add the other factors when relevant
      return children({ isRefined: query.length > 0 });
    } catch (_) {
      return children({ isRefined: false });
    }
  }
);

export interface HighlightMatch {
  value: string;
  matchLevel: 'none' | 'partial' | 'full';
  matchedWords: string[];
}
export interface SingleHit {
  start: number;
  dur: string;
  text: string;
  videoId: string;
  videoTitle: string;
  videoDescription: string;
  videoThumbnails: {
    url: string;
    width: number;
    height: number;
  };
  videoRanking: number;
  channel: string;
  objectID: string;
  _highlightResult: {
    text: HighlightMatch;
    description: HighlightMatch;
    title: HighlightMatch;
  };
  _distinctSeqID?: number;
}

interface State {
  videoId: string;
  open: boolean;
}

interface Props {
  indexName: string;
}
export default class App extends Component<Props, State> {
  state = {
    videoId: '',
    open: false,
  };

  openDetail = (videoId: string) =>
    this.setState({
      videoId,
      open: true,
    });

  closeDetail = () =>
    this.setState({
      videoId: '',
      open: false,
    });

  render() {
    const { open, videoId } = this.state;
    const { indexName } = this.props;
    return (
      <div>
        <Detail
          open={open}
          videoId={videoId}
          onCloseDetail={this.closeDetail}
          indexName={indexName}
        />
        <InstantSearch
          appId="FOQUAZ6YNS"
          apiKey="72ee3a317835b8618eda01c6fcc88f77"
          indexName={indexName}
        >
          <RefinedSearch>
            {// todo: figure out why 0 doesn't apply
            ({ isRefined }) => (
              <Configure
                distinct={isRefined ? 3 : 0}
                attributesToSnippet={['videoDescription:30']}
                snippetEllipsisText="…"
              />
            )}
          </RefinedSearch>
          <SearchBox />
          <PoweredBy />
          <Stats />
          <MainHits openDetail={this.openDetail} />
        </InstantSearch>
      </div>
    );
  }
}
