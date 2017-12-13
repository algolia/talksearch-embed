import { h, Component } from 'preact';

export type OnRefine = ({ tag }: { tag: string }) => void;
interface Props {
  tags: string[];
  onRefine: OnRefine;
}
export default class Tags extends Component<Props, void> {
  render() {
    const { tags = [], onRefine } = this.props;
    return (
      <div className="flex overflow-auto f7 mb2">
        {tags.map(tag => (
          <button
            className="bn nowrap o-30 white bg-port-gore mr1 ph2 pv1 lh-solid br-pill pointer"
            onClick={() => onRefine({ tag })}
          >
            {tag}
          </button>
        ))}
      </div>
    );
  }
}
