import { h, Component } from 'preact';
import { SearchBox, PoweredBy } from 'react-instantsearch/dom';

interface Props {
  name: string;
}
export default class SearchBar extends Component<Props, void> {
  render() {
    return (
      <div className="flex flex-wrap flex-nowrap-ns items-center ma2">
        <span className="fln mv2 mv3-ns mh3-ns f6-ns">{this.props.name}</span>
        <div className="fla">
          <SearchBox
            translations={{
              placeholder: 'Search in this playlist',
            }}
          />
        </div>
        <div className="fln ma1 dn db-l">
          <PoweredBy />
        </div>
      </div>
    );
  }
}
