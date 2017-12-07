import { h, Component } from 'preact';
import { RefinementList } from 'react-instantsearch/dom';
import Media from 'react-media';

import './Refinement.scss';

interface Props {
  attribute: string;
  defaultRefinement?: string[];
  withSearchBox?: boolean;
  responsive?: boolean;
}
export default class Refinement extends Component<Props, void> {
  render() {
    const {
      attribute,
      defaultRefinement,
      withSearchBox = true,
      responsive = true,
    } = this.props;
    return (
      <Media query="(min-width: 40rem)">
        {big =>
          (responsive || big) && (
            <article>
              <h1 className="hide-40 f5">{attribute}</h1>
              <RefinementList
                attributeName={attribute}
                withSearchBox={withSearchBox && big}
                defaultRefinement={defaultRefinement}
              />
            </article>
          )
        }
      </Media>
    );
  }
}
