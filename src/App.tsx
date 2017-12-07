import 'react-instantsearch-theme-algolia/style.min.css';
import './style.scss';

import { h, Component } from 'preact';
import Helmet from 'preact-helmet';
import { InstantSearch, Configure, Stats } from 'react-instantsearch/dom';
import { connectStateResults } from 'react-instantsearch/connectors';

import MainHits from './components/MainHits';
import Detail from './components/Detail';
import SearchBar from './components/SearchBar';
import Refinement from './components/Refinement';

const RefinedSearch = connectStateResults(
  ({ children, searchState: { query = '' } }) => {
    try {
      return children({ hasQuery: query.length > 0 });
    } catch (_) {
      return children({ hasQuery: false });
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
  duration: number;
  year: number;
  speaker: string;
  text: string;
  videoId: string;
  title: string;
  description: string;
  thumbnails: {
    url: string;
    width: number;
    height: number;
  };
  ranking: number;
  channel: string;
  objectID: string;
  _highlightResult: {
    text: HighlightMatch;
    description: HighlightMatch;
    title: HighlightMatch;
  };
  _distinctSeqID?: number;
}

export type OpenDetail = (
  {
    videoId,
    title,
    description,
    speaker,
    year,
    start,
  }: {
    videoId: string;
    title: string;
    description: string;
    speaker: string;
    year: number;
    start?: number;
  }
) => void;

interface State {
  videoId: string;
  start: number;
  title: string;
  description: string;
  speaker: string;
  year: number;
  open: boolean;
}

const defaultState = {
  videoId: '',
  start: 0,
  title: '',
  description: '',
  speaker: '',
  year: 2017,
  open: false,
};

export interface Metadata {
  objectID: string;
  name: string;
  youtubeURL: string;
  avatar: string;
  accentColor?: string;
}
interface Props {
  indexName: string;
  metadata: Metadata;
}
export default class App extends Component<Props, State> {
  state = defaultState;

  openDetail: OpenDetail = ({
    videoId,
    title,
    description,
    start,
    speaker,
    year,
  }) =>
    this.setState({
      videoId,
      title,
      description,
      speaker,
      year,
      start,
      open: true,
    });

  closeDetail = () =>
    this.setState({
      videoId: '',
      start: 0,
      description: '',
      title: '',
      open: false,
    });

  render() {
    const {
      open,
      videoId,
      start,
      description,
      title,
      speaker,
      year,
    } = this.state;
    const { indexName, metadata: { name } } = this.props;
    return (
      <div className="montserrat bg-athens-gray ma0">
        <Helmet
          htmlAttributes={{ lang: 'en', class:'bg-athens-gray' }}
          link={[
            {
              rel: 'stylesheet',
              href:
                'https://unpkg.com/@haroenv/tachyons-algolia/tachyons-algolia.min.css',
            },
          ]}
          title={`${open ? title : name} | TalkSearch`}
        />
        <Detail
          open={open}
          videoId={videoId}
          title={title}
          description={description}
          year={year}
          speaker={speaker}
          start={start}
          onCloseDetail={this.closeDetail}
          indexName={indexName}
          metadata={this.props.metadata}
        />

        {!open && (
          <InstantSearch
            appId="FOQUAZ6YNS"
            apiKey="72ee3a317835b8618eda01c6fcc88f77"
            indexName={indexName}
          >
            <RefinedSearch>
              {({ hasQuery }) => (
                <Configure
                  distinct={hasQuery ? 3 : 0}
                  attributesToSnippet={['description:30']}
                  hitsPerPage={10}
                  snippetEllipsisText="…"
                />
              )}
            </RefinedSearch>
            <SearchBar name={name} />
            <div className="mb2 ml2 dn db-l">
              <Stats />
            </div>
            <div className="bg-athens-gray flex flex-nowrap flex-row">
              <div className="mb4 mb0-l mr4-l shadow-0 bg-athens-gray-l fln">
                <Refinement attribute="tags" />
              </div>
              <div className="fla pa2-l">
                <MainHits openDetail={this.openDetail} />
              </div>
            </div>
          </InstantSearch>
        )}
      </div>
    );
  }
}
