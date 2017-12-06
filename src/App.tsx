import 'react-instantsearch-theme-algolia/style.min.css';
import './style.scss';

import { h, Component } from 'preact';
import Helmet from 'preact-helmet';
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
  title: string;
  description: string;
  // todo: change
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
  start: number;
  open: boolean;
}

interface Props {
  indexName: string;
}
export default class App extends Component<Props, State> {
  state = {
    videoId: '',
    start: 0,
    open: false,
  };

  openDetail = ({ videoId, start }: { videoId: string; start?: number }) =>
    this.setState({
      videoId,
      start,
      open: true,
    });

  closeDetail = () =>
    this.setState({
      videoId: '',
      start: 0,
      open: false,
    });

  render() {
    const { open, videoId, start } = this.state;
    const { indexName } = this.props;
    return (
      <div className="montserrat">
        <Helmet
          link={[
            {
              rel: 'stylesheet',
              href:
                'https://unpkg.com/@haroenv/tachyons-algolia@0.0.0-beta.2/tachyons-algolia.min.css',
            },
          ]}
        />
        <Detail
          open={open}
          videoId={videoId}
          start={start}
          onCloseDetail={this.closeDetail}
          indexName={indexName}
        />
        <InstantSearch
          appId="FOQUAZ6YNS"
          apiKey="72ee3a317835b8618eda01c6fcc88f77"
          indexName={indexName}
        >
          <RefinedSearch>
            {({ isRefined }) => (
              <Configure
                distinct={isRefined ? 3 : 0}
                attributesToSnippet={['description:30']}
                hitsPerPage={10}
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
