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

const __hit = {
  start: 0,
  dur: '2.39',
  text: 'yes',
  videoId: '8jwGDHHLEpI',
  videoTitle: 'dotSwift 2017 - Drew McCormack - The Value in Trees',
  videoDescription:
    'Filmed at https://2017.dotswift.io on January 27th in Paris. More talks on http://thedotpost.com\n\nSwift introduces new ways to model data through value types like structs and enums. Drew discusses his experiences rewriting the data model of the vector graphics app Sketch to use value trees, and finishes off pondering whether future data modelling frameworks could be based on value trees, rather than entities and relationships. To that end, he also introduces the experimental project Impeller (https://github.com/mentalfaculty/impeller).',
  videoThumbnails: {
    url: 'https://i.ytimg.com/vi/8jwGDHHLEpI/mqdefault.jpg',
    width: 320,
    height: 180,
  },
  videoRanking: 446,
  channel: 'dotconferences',
  objectID: '8jwGDHHLEpI-0',
};
export interface SingleHit {
  videoId: string;
  start: number;
  videoThumbnails: { url: string };
  dur: string;
  text: string;
  videoTitle: string;
  videoDescription: string;
  objectID: string;
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
            isRefined => (
              <Configure
                distinct={isRefined ? 1 : 1}
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
